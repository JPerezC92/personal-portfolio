# Phase 4 — Module tests

> **Owner:** Forge 🔨 (Implementation Agent); Crucible 🔥 (Test Architect) audits every spec file
> **Pre:** Phase 3 complete (helper + factories + aliases usable).
> **Reads:** `.opencode/agents/crucible.md` (Frontend unit + service integration sections), `src/shared/__tests__/helpers/renderWithQueryClient.tsx`, all `src/modules/**/helpers/*.factory.ts`, all module services/hooks/components/entities/errors
> **Writes:** `src/modules/projects/__tests__/components/project-card.spec.tsx`, `src/modules/projects/__tests__/components/project-list.spec.tsx`, `src/modules/projects/__tests__/services/projects.service.integration.spec.ts`, `src/modules/skills/__tests__/components/skill-list.spec.tsx`, `src/modules/skills/__tests__/services/skills.service.integration.spec.ts`, `src/modules/social-links/__tests__/components/social-list.spec.tsx`, `src/modules/social-links/__tests__/services/social-links.service.integration.spec.ts`, `src/modules/navigation/__tests__/components/app-bar.spec.tsx`, `src/modules/navigation/__tests__/components/locale-switcher.spec.tsx`, `src/modules/navigation/__tests__/services/navigation.service.spec.ts`

## Steps

1. **Component unit specs (pattern for all):** `vi.mock('<service-path>')`; import the service; `let mockedService: MockProxy<typeof xService>; mockedService = xService as MockProxy<typeof xService>;` (vitest-mock-extended auto-mock); mock resolved values come from the module factory — never inline objects; render via `renderWithQueryClient(<Component />)`; assert via `screen.findByText` / `screen.getByRole`; never `renderHook`, never mock a hook file, never `vi.mocked()`.
2. `project-card.spec.tsx`: render `ProjectCard` with `createProject()` data; assert title, type badge, technology chips, link buttons; override with a `createMany`-built link list edge case (unknown link name renders no button).
3. `project-list.spec.tsx`: mock `@/modules/projects/services/projects.service`; happy path — `getAll` resolves `createMany(2)` raw projects; assert 2 cards' titles on screen (hook + component together, loading state resolved via `findBy*`). Error path — `getAll` resolves `new ProjectsServiceError(...)`; assert no cards render.
4. `skill-list.spec.tsx`: mock skills service; `createMany(3)` skills; assert 3 descriptions rendered; error/empty path renders no `<li>`.
5. `social-list.spec.tsx`: mock social-links service; `createMany(3)` links (valid icons); assert 3 aria-labelled link buttons; one entry with invalid icon name renders nothing for it.
6. `app-bar.spec.tsx`: sections via `createMany(3)` from the nav factory; assert branding, 3 nav links with hrefs, mobile toggle aria-label flips after click (`userEvent`).
7. `locale-switcher.spec.tsx`: `vi.mock('next/navigation', () => ({ usePathname: () => '/es' }))` (module mock, not a service/hook-rule conflict — navigation router context); assert ES indicator present / EN absent, both locale links visible.
8. **Service integration specs (pattern for all three):** `vi.stubGlobal('fetch', mockFetch)`; build `Response` objects with `new Response(JSON.stringify(payload), { status: 200 })`; call the service method directly (`const result = await xService.getAll()`); happy path asserts raw JSON → typed output (data transformation); error paths — fetch rejection AND `status: 500` — assert `result` `toBeInstanceOf(XServiceError)` (returned, not thrown); `afterEach`: `vi.unstubAllGlobals()` + `vi.clearAllMocks()`.
9. `navigation.service.spec.ts` (sync, direct): `getSections()` returns the section enum values; `homeSection(key)` returns `${WEB_URL}#${key}` with `NEXT_PUBLIC_WEB_URL` set; unset case — `vi.resetModules()` + stub `process.env.NEXT_PUBLIC_WEB_URL` to `''` + dynamic `import()` of the service → returns `NavigationServiceError` instance; restore env + modules after.
10. Run `pnpm vitest` → exit 0.
11. Dispatch Crucible 🔥 (Test Architect) on all 10 spec files. Fix violations, re-run, re-audit until the report ends "All checks passed."

## Output

- **Artifact:** the 10 spec files listed in Writes + final Crucible report
- **Schema / shape:** component specs follow the step-1 pattern exactly; integration specs follow the step-8 pattern exactly; navigation service spec per step 9; all data from factories.

## Verify commands

- ⬜ Gate 1: `pnpm vitest` → exit 0, all module specs pass
- ⬜ Gate 2: Crucible audit output ends with "All checks passed."

## Gate

- ⬜ Both verify commands green
- ⬜ Crucible report archived in the dispatch output (no FAIL items outstanding)

## Abort conditions

- Crucible reports a violation that cannot be fixed without contradicting another hard rule — halt; escalate to Cipher 🔓 (L2 Lead) with both rule citations.
- A spec cannot pass because the production code from phase 2 deviates from its contract — halt; report the file:line mismatch.
