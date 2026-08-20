# Phase 2 — Async data layer refactor

> **Owner:** Forge 🔨 (Implementation Agent); Atrium 🏛️ (Frontend Architect) gates every written file
> **Pre:** Phase 1 complete — `@tanstack/react-query` installed and resolvable.
> **Reads:** `src/modules/projects/services/projects.service.ts`, `src/modules/skills/services/skills.service.ts`, `src/modules/social-links/services/social-links.service.ts`, `src/modules/projects/hooks/use-project-list.ts`, `src/modules/skills/hooks/use-skill-list.ts`, `src/modules/social-links/hooks/use-social-list.ts`, `src/app/[locale]/page.tsx`, `src/app/[locale]/layout.tsx`, `src/shared/data/skills.ts`, `src/shared/data/socialList.ts`, `src/modules/projects/domain/entities/project.ts`
> **Writes:** `src/shared/data/projects.ts` (new), `src/app/api/projects/route.ts` (new), `src/app/api/skills/route.ts` (new), `src/app/api/social-links/route.ts` (new), `src/app/providers.tsx` (new), `src/modules/projects/components/ProjectList.tsx` (new), `src/modules/projects/services/projects.service.ts`, `src/modules/skills/services/skills.service.ts`, `src/modules/social-links/services/social-links.service.ts`, `src/modules/projects/hooks/use-project-list.ts`, `src/modules/skills/hooks/use-skill-list.ts`, `src/modules/social-links/hooks/use-social-list.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

## Steps

1. Create `src/shared/data/projects.ts`: export `const rawProjectList: RawProject[]` — move the 4-entry array verbatim from `projects.service.ts:4-100`. No other export.
2. Create `src/app/api/projects/route.ts`: `export async function GET()` → `NextResponse.json(rawProjectList)` (import from `@/shared/data/projects`).
3. Create `src/app/api/skills/route.ts`: `GET()` → `NextResponse.json(skillList)` (import from `@/shared/data/skills`).
4. Create `src/app/api/social-links/route.ts`: `GET()` → `NextResponse.json(socialList.map(({ link, icon, title }) => ({ link, icon, title })))` — preserve the projection currently in `social-links.service.ts:8-12`.
5. Rewrite `projects.service.ts`: remove inline data; `async getAll(): Promise<RawProject[] | ProjectsServiceError>` — `const res = await fetch('/api/projects')`; `if (!res.ok) return new ProjectsServiceError(...)`; `return (await res.json()) as RawProject[]` in try/catch; catch returns `new ProjectsServiceError(...)`. Errors are RETURNED, never thrown.
6. Rewrite `skills.service.ts` and `social-links.service.ts` with the identical pattern against their endpoints (`/api/skills`, `/api/social-links`), preserving their typed error classes.
7. Create `src/app/providers.tsx`: `'use client'`; export `Providers` wrapping children in `QueryClientProvider` with a `QueryClient` created via `useState(() => new QueryClient({ defaultOptions: { queries: { retry: false } } }))`.
8. Edit `src/app/[locale]/layout.tsx`: import `Providers` and wrap `{children}` inside the existing `NextIntlClientProvider` (layout.tsx:111-115). No other change.
9. Rewrite `use-project-list.ts` with `useQuery({ queryKey: ['projects'], queryFn: async () => { const r = await projectsService.getAll(); if (r instanceof ProjectsServiceError) throw r; return r; } })`. Preserve the hook's public signature `Project[] | ProjectsServiceError` and the index-based description mapping (lines 15-25) applied to `data`; on `error instanceof ProjectsServiceError` return it; `data` undefined during load → return `[]`. `useTranslations` stays.
10. Rewrite `use-skill-list.ts` and `use-social-list.ts` with the same `useQuery` pattern (queryKeys `['skills']`, `['social-links']`); preserve current behavior: return `[]` on error or while loading.
11. Create `src/modules/projects/components/ProjectList.tsx`: `'use client'`; calls `useProjectList()`; renders the `<ul>…<ProjectCard/></ul>` block currently at `page.tsx:175-183` (returns `null` when the result is a `ProjectsServiceError`).
12. Edit `src/app/[locale]/page.tsx`: replace the inline project-list block (lines 175-183) with `<ProjectList />`; remove the now-unused `useProjectList` and `ProjectsServiceError` imports; `useNavigation` and everything else stay untouched.
13. Run `pnpm build` → must exit 0.
14. Dispatch Atrium 🏛️ (Frontend Architect) on all 14 written files. Fix reported violations, re-run build, re-audit until PASS.

## Output

- **Artifact:** the 14 files listed in Writes
- **Schema / shape:** 3 JSON GET endpoints; 3 async services with `Promise<T[] | XServiceError>` returns; 3 `useQuery` hooks with unchanged public signatures; `Providers` + `ProjectList` components; page delegating to `ProjectList`.

## Verify commands

- ⬜ Gate 1: `pnpm build` → exit 0
- ⬜ Gate 2: `pnpm vitest` → existing tests still exit 0
- ⬜ Gate 3: manual smoke via `pnpm dev` — `/es` renders hero, skills, projects, footer links identically to pre-refactor

## Gate

- ⬜ Atrium audit PASS on all written files
- ⬜ All three verify commands green

## Abort conditions

- Atrium reports a violation that cannot be fixed without violating the service contract (typed errors returned, never thrown) — halt; escalate to Cipher 🔓 (L2 Lead).
- `pnpm build` fails after two fix attempts — halt; report the exact error output.
- Any home-page content regression spotted in the manual smoke check — halt; report the diff in rendered content.
