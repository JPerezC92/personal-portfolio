# Phase 3 — Test infrastructure

> **Owner:** Forge 🔨 (Implementation Agent)
> **Pre:** Phase 1 complete (tooling installed); Phase 2 complete (async services + RQ hooks exist to be mocked).
> **Reads:** `vitest.config.ts`, `tsconfig.json` (paths), `messages/es.json`, `src/modules/*/domain/entities/*`, `src/modules/*/domain/errors/*`, `.opencode/agents/crucible.md` (Frontend unit + Test factories sections)
> **Writes:** `vitest.config.ts` (edit), `src/shared/__tests__/helpers/renderWithQueryClient.tsx` (new), `src/modules/projects/__tests__/helpers/project.factory.ts` (new), `src/modules/skills/__tests__/helpers/skill.factory.ts` (new), `src/modules/social-links/__tests__/helpers/social-link.factory.ts` (new), `src/modules/navigation/__tests__/helpers/nav-section.factory.ts` (new)

## Steps

1. Edit `vitest.config.ts` alias array: insert BEFORE the bare `@` catch-all — `{ find: '@/modules', replacement: path.resolve(__dirname, './src/modules') }` and `{ find: '@/i18n', replacement: path.resolve(__dirname, './src/i18n') }` (mirrors `tsconfig.json:38-42`; without this, `@/modules/...` resolves to nonexistent `<root>/modules`).
2. Create `src/shared/__tests__/helpers/renderWithQueryClient.tsx`:
   - Export `renderWithQueryClient(ui, { locale = 'es', messages = esMessages, ...renderOptions } = {})`.
   - `esMessages` imported from `../../../../messages/es.json` (`resolveJsonModule` is on — `tsconfig.json:17`).
   - Wrapper: `QueryClientProvider` (fresh `QueryClient` per call, `defaultOptions.queries.retry: false`) nested inside `NextIntlClientProvider` (`locale`, `messages`).
   - Delegates to `@testing-library/react` `render` with the wrapper; returns its result.
3. Create `src/modules/projects/__tests__/helpers/project.factory.ts`: faker-based; `createProject(overrides?: Partial<Project>): Project`, `createRawProject(overrides?: Partial<RawProject>): RawProject`, `createMany(count = 3, overrides?: Partial<Project>): Project[]`. Type/enum fields (`type`, `linkList[].name`) drawn from their literal unions; no hardcoded prose values elsewhere.
4. Create `src/modules/skills/__tests__/helpers/skill.factory.ts`: `createSkill(overrides?)` / `createMany(count?, overrides?)` typed `Skill`; `icon` defaults to a valid `resolveIcon` key (e.g. `'SiReact'`), `color`/`background` faker-prefixed hex.
5. Create `src/modules/social-links/__tests__/helpers/social-link.factory.ts`: `createSocialLink(overrides?)` / `createMany(...)`; `icon` drawn from `['Code', 'Briefcase', 'Mail']` (valid `SocialList` keys — `SocialList.tsx:10-14`).
6. Create `src/modules/navigation/__tests__/helpers/nav-section.factory.ts`: `createNavSection(overrides?)` / `createMany(...)` typed `NavSection` (`{ title, link }`).
7. Run `pnpm exec tsc --noEmit` → exit 0.
8. Run `pnpm vitest` → existing suite still green (factories/helper compile, nothing broken).

## Output

- **Artifact:** the 6 files listed in Writes
- **Schema / shape:** every factory exposes `create*(overrides?)` + `createMany(count?, overrides?)`, builds data with `faker` (no hardcoded inline objects), imports entity types from `domain/entities/`. Helper renders through QueryClient + NextIntl providers.

## Verify commands

- ⬜ Gate 1: `pnpm exec tsc --noEmit` → exit 0
- ⬜ Gate 2: `pnpm vitest` → exit 0

## Gate

- ⬜ Both verify commands green
- ⬜ Crucible 🔥 spot-audit of the helper + factories: faker used, `create`/`createMany` present, no `vi.mocked()`/manual casts introduced

## Abort conditions

- `tsc --noEmit` reports errors in the new files after one fix pass — halt; report errors.
- Crucible spot-audit reports a factory/helper rule violation that requires redesign — halt; escalate to Cipher 🔓 (L2 Lead).
