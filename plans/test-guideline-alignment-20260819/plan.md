# Plan — Align testing suite with Crucible guidelines (async data layer + module tests)

> **Status:** active
> **Started:** 2026-08-19 23:16
> **Subject:** Make the portfolio's test suite fully conform to Crucible 🔥 (Test Architect)'s guidelines: install required tooling, refactor module services to async fetch, add guideline-conformant module tests, and conform naming/structure.
> **Layout:** subfolder pattern

## Context

> Why is this being done? What prompted it? What is the intended outcome?

- Prompted by: user audit request ("the current project maybe dont't follow the sub agent guidelines for testing"). Cipher's audit against `.opencode/agents/crucible.md` found: missing tooling (`vitest-mock-extended`, `faker`), zero tests for `src/modules/*`, no test factories, no `renderWithQueryClient` helper, sync static services incompatible with the fetch-mock service-integration rule, `.test.*` naming, and e2e specs outside `e2e/__tests__/`.
- Goal: full guideline alignment — the user chose "Full alignment" + "Refactor services to async fetch" + "follow agent guidelines" (no exceptions).
- Outcome: an async fetch-backed module data layer with React Query hooks, a conformant test suite per module, and conventional naming/structure — verified by `pnpm vitest`, `pnpm lint`, `pnpm build`.

## Goals

> Every programming goal carries a `Done when:` criterion — the observable condition that proves the goal is met.

- ⬜ **G1:** All required tooling installed — `vitest-mock-extended` + `faker` as test devDependencies, `@tanstack/react-query` as a runtime dependency, lockfile updated.
  - Done when: `pnpm install` exits 0 and all three packages resolve in `pnpm-lock.yaml`.
- ⬜ **G2:** Async data layer — projects/skills/social-links services fetch from API route handlers and return typed entities or typed errors (never throw); hooks use React Query with `QueryClientProvider` wired in the app.
  - Done when: `pnpm build` passes with the async layer and the home page renders identical content.
- ⬜ **G3:** Guideline-conformant module tests for navigation/projects/skills/social-links — unit specs (component + hook together, `MockProxy` service mocks, `renderWithQueryClient`, faker factories) and service integration specs (`vi.stubGlobal` fetch, typed-error-returned assertions).
  - Done when: `pnpm vitest` passes and Crucible's audit returns "All checks passed."
- ⬜ **G4:** Naming/structure conformance — 11 existing tests renamed `.spec.*`, e2e specs relocated to `e2e/__tests__/` with Playwright `testDir` updated.
  - Done when: no `.test.*` files remain and Playwright resolves the new testDir.
- ⬜ **G5:** Full verification — `pnpm vitest`, `pnpm lint`, `pnpm build` all exit 0.
  - Done when: all three commands exit 0 in sequence after the final phase.

## Current state

> REQUIRED. Evidence table of the codebase state this plan starts from.

| Area | Current file / behavior | Evidence (file + line / command output) |
|---|---|---|
| Test deps | `vitest-mock-extended` and `faker` absent | `package.json:32-52` (devDependencies); grep of `pnpm-lock.yaml` → no matches |
| Runtime deps | `@tanstack/react-query` absent | `package.json:14-31` |
| Projects service | Synchronous, hardcoded data, no fetch | `src/modules/projects/services/projects.service.ts:4-111` |
| Skills service | Synchronous, returns static `skillList` | `src/modules/skills/services/skills.service.ts:5-15` |
| Social-links service | Synchronous, maps static `socialList` | `src/modules/social-links/services/social-links.service.ts:5-19` |
| Navigation service | Synchronous (compile-time enum + env URL) | `src/modules/navigation/services/navigation.service.ts:7-23` |
| Hooks | Call services synchronously; no React Query | `src/modules/projects/hooks/use-project-list.ts:7-26`, `src/modules/skills/hooks/use-skill-list.ts:5-13`, `src/modules/social-links/hooks/use-social-list.ts:5-13` |
| Hook consumers | `useProjectList` consumed directly in page | `src/app/[locale]/page.tsx:51,176-183` |
| Layout | `NextIntlClientProvider` only, no QueryClientProvider | `src/app/[locale]/layout.tsx:111-115` |
| Module tests | Zero test files under `src/modules/` | `find src/modules -name "*.spec.*" -o -name "*.test.*"` → empty |
| Existing tests | 11 files, all `.test.tsx`/`.test.ts` | `src/shared/components/__tests__/` (4), `src/shared/components/ui/__tests__/` (2), `src/shared/utils/__tests__/` (2), `src/theme/__tests__/` (1)… (11 total incl. `Highlight`, `Icon`, `Text`) |
| E2E layout | Flat `e2e/*.spec.ts`, testDir `./e2e` | `e2e/home.spec.ts`, `e2e/locale-switcher.spec.ts`, `e2e/navigation.spec.ts`; `playwright.config.ts:4` |
| Vitest aliases | `@/modules` and `@/i18n` aliases missing; bare `@` catch-all would mis-resolve `@/modules/...` | `vitest.config.ts:12-26` vs `tsconfig.json:27-46` (`@/modules/*` → `src/modules/*`) |
| JSON imports | `resolveJsonModule` enabled | `tsconfig.json:17` |

## Behavior change

> Before → after per goal. Interface contracts (public API, file paths, exports) are part of the behavior.

| Goal | Before | After | Interface contracts | Do-not-break |
|---|---|---|---|---|
| G1 | No mocking/factory/query libs | `vitest-mock-extended`, `faker` (devDeps); `@tanstack/react-query` (dep) | exact-pinned versions per repo convention (`package.json` style) | existing deps untouched; no version bumps of unrelated packages |
| G2 | Sync services returning static unions; hooks sync; no providers | `GET /api/projects`, `/api/skills`, `/api/social-links` route handlers; async `getAll(): Promise<T[] \| XServiceError>` via `fetch`; hooks via `useQuery`; `src/app/providers.tsx` adds `QueryClientProvider`; new `ProjectList` component owns the hook | new exports: `rawProjectList` (`src/shared/data/projects.ts`), `ProjectList`, `providers`; changed signatures: the three `getAll()`s become async, the three hooks keep their current return shapes | home page renders identical content (all sections, both locales); services still RETURN typed errors, never throw; navigation module unchanged |
| G3 | No module tests, no factories, no render helper | Per-module `__tests__/helpers/{feature}.factory.ts` (faker, `create`/`createMany`), `renderWithQueryClient` helper, component specs (service mocked via `vi.mock` + `MockProxy`), service integration specs (`vi.stubGlobal('fetch', …)`), navigation service unit spec | helper path `src/shared/__tests__/helpers/renderWithQueryClient.tsx`; spec naming `*.spec.ts(x)` | shared/theme existing tests keep passing |
| G4 | `.test.*` names; e2e flat; testDir `./e2e` | `.spec.*` names; `e2e/__tests__/`; testDir `./e2e/__tests__` | file moves only — no content changes | all 11 renamed tests still discovered by Vitest; e2e specs still listed by Playwright |
| G5 | (final gate) | all three commands exit 0 | — | no lint/build regressions |

## Design decisions

- Route handlers over static JSON in `public/` — real fetch endpoints keep the guideline's "raw JSON → typed output" pipeline literal; `next.config.mjs` sets no `output: 'export'`, so route handlers are safe (simplest alternative considered: `public/data/*.json`, rejected: weaker contract, no server-side source of truth).
- React Query over `useEffect`/`useState` — the guideline mandates `renderWithQueryClient`; without React Query that rule is meaningless, and the hooks need an async state layer anyway (alternative rejected: plain effect hooks would leave the render-helper rule unsatisfiable).
- Navigation service stays synchronous — its sections are a compile-time `EnumType` with no external data source; the fetch-mock rule is N/A there (documented exception, not a rule trim); it gets direct unit tests.
- Extract `ProjectList` component — guideline requires hook + component tested together; `useProjectList` is currently consumed only in `page.tsx`, which is too heavy to unit test; a dedicated component gives the hook its test surface and shrinks the page.
- Hooks keep their current public return shapes (`Project[] | ProjectsServiceError`, `Skill[]`, `SocialLink[]`) — minimizes page changes and preserves behavior; the service contract (typed errors returned, never thrown) is preserved inside `queryFn` by throwing the typed error for React Query to capture.
- Consolidated user story (one file for all 4 modules) per user decision at the goals gate.
- Vitest alias fix (`@/modules`, `@/i18n`) — discovered during planning: `tsconfig.json:40` has the mapping but `vitest.config.ts` doesn't; without it every new module spec import fails to resolve.
- Reduction pass: E2E phase files beyond smoke and any backend/NestJS work were cut (no goal demands them); verification folded into phase-05's gate + this file's Verification section instead of a sixth phase.

## Phase index — dispatch table

| # | Phase | Owner | Runbook | Output | Goals |
|---|---|---|---|---|---|
| 1 | Tooling install | Crucible 🔥 (Test Architect), Warden 🔒 gate | `phase-01-crucible.md` | updated `package.json` + `pnpm-lock.yaml` | G1 |
| 2 | Async data layer refactor | Forge 🔨 (Implementation Agent), Atrium 🏛️ gate | `phase-02-forge.md` | API routes, async services, RQ hooks, providers, `ProjectList` | G2 |
| 3 | Test infrastructure | Forge 🔨 (Implementation Agent) | `phase-03-forge.md` | vitest aliases, `renderWithQueryClient`, 4 factories | G3 |
| 4 | Module tests | Forge 🔨 (Implementation Agent), Crucible 🔥 audit | `phase-04-forge.md` | 10 spec files, Crucible report | G3 |
| 5 | Conformance renames + E2E relocation + full verification | Forge 🔨 (Implementation Agent) | `phase-05-forge.md` | `.spec.*` names, `e2e/__tests__/`, updated `playwright.config.ts` | G4, G5 |

> Every phase traces to ≥ 1 goal ID.

## Critical files / tools

- `.opencode/agents/crucible.md` — the guideline source of truth this plan aligns to.
- `vitest.config.ts` — alias fix required before any module spec runs.
- `playwright.config.ts` — testDir change in phase 5.
- `tsconfig.json:27-46` — path-mapping reference for the vitest alias fix.
- User story: `user-stories/module-data-layer-testing.md` (consolidated story for all touched modules).

## Verification

> Runnable command + expected output, each traced to the goal it proves.

- ✅ G1: `pnpm install && pnpm list vitest-mock-extended faker @tanstack/react-query` → exit 0, all three listed. (Verified 2026-08-20: install exit 0, +5 packages; `pnpm list` shows `@tanstack/react-query@5.101.4`, `@faker-js/faker@10.6.0` — Warden-approved substitution for dead `faker@6.6.6` — and `vitest-mock-extended@5.1.1`. Downstream lockfile gate: changeset verified clean; BLOCK on pre-existing advisories overridden → DEBT-003, override annotated in `output/audits/2026-08-19-lockfile-phase01-tooling.md`. Also: `@playwright/test` 1.58.2→1.62.1 (Ubuntu 26.04 fix, Warden APPROVE + ADVISORY, recorded 2026-08-20).)
- ✅ G3: `pnpm vitest` → exit 0, all module specs pass; Crucible audit ends "All checks passed." (Verified 2026-08-20: infra + 10 module specs done; Crucible full audit of all 10 files returned "All checks passed"; vitest 66/1 where the 1 is pre-existing DEBT-002, cleared in phase 5.)
- ✅ G2: `pnpm build` → exit 0 (async services + RQ hooks compile; home page prerenders). (Verified 2026-08-20: build exit 0, 9/9 pages, `ƒ /api/projects|skills|social-links`; Atrium audit All checks passed after query-keys fix; e2e smoke 16/16 after async-aware spec fixes.)
- ⬜ G3: `pnpm vitest` → exit 0, all module specs pass; Crucible audit ends "All checks passed."
- ✅ G4: `find src e2e -name "*.test.*" | wc -l` → `0`; `pnpm e2e --list` → specs listed from `e2e/__tests__/`. (Verified 2026-08-20: `find` → 0; `pnpm e2e --list` → 16 tests under `e2e/__tests__/` (3 relocated specs) and a full passing run; `playwright.config.ts` testDir updated to `./e2e/__tests__`.)
- ✅ G5: `pnpm vitest && pnpm lint && pnpm build` → all exit 0. (Verified 2026-08-20 by Cipher: vitest 67/67 exit 0; lint exit 0 (14 errors cleared — 8 DEBT-001 + 6 new-file); build exit 0, 9/9 pages. DEBT-001, DEBT-002 resolved in debt register; DEBT-003 stays deferred; DEBT-004 stays open.)
## Out of scope / Do-not-touch

- `.opencode/agents/crucible.md` and all agent specs/CVs — no rule trimming or editing.
- Navigation service fetch-ification (documented exception: no external data source).
- E2E seeded-data / data-mutation phase files — no seeded DB or mutations exist; smoke phase only.
- Any backend/NestJS structure — Bastion 🧱 (Backend Architect) stays inactive.
- Git operations (branch/commit/PR) — Herald 📯's domain, dispatched only on explicit user authorization.
- Stash mutation of any kind — user-only.

## Pending

- **All 5 phases complete (2026-08-20).** Implementation done; G1–G5 all ✅. Awaiting: user confirmation of PR merge (then goals resume → `## Outcome` → archive to `plans/.completed/` per plan-enforce).
- [parked by user 2026-08-20] Symptom-knowledge-base proposal — discuss after this plan completes; write-up at the session's proposal parking file.
- [deferred to separate task] DEBT-003 remediation (next ≥ 16.2.11, sharp ≥ 0.35.0, postcss, nanoid) — each bump gets its own Warden review. DEBT-004 (service-boundary runtime validation) also separate.
- [deferred to separate task] DEBT-003 remediation (next ≥ 16.2.11, sharp ≥ 0.35.0, postcss, nanoid) — not this plan's scope; each bump gets its own Warden review.
- [known pre-existing] DEBT-001 (7 lint sort errors) and DEBT-002 (`button.test.tsx` "renders icon size" fails) — predate this plan; G5's `pnpm lint` + `pnpm vitest` green requires clearing both before phase 5's final gate.

## Resolved decisions

- 2026-08-19 — goals G1–G5 confirmed at the goals gate; no bloat flag (5 goals).
- 2026-08-19 — programming template selected (writes under `src/`, `e2e/`, configs).
- 2026-08-19 — one consolidated user story for all 4 modules (user decision).
- 2026-08-19 — services go async fetch backed by API route handlers (user decision: "follow agent guidelines").
- 2026-08-19 — `.test.*` → `.spec.*` rename in scope (user decision: "follow agent guidelines").
- 2026-08-20 — `faker@6.6.6` REJECTED by Warden upstream (dead 4.5 yrs, hollow 3.8 KB tarball); substituted `@faker-js/faker@10.6.0` (pre-cleared; user confirmed). Phase 3–4 factories target v10 API (`faker.person.*`, `faker.location.*`).
- 2026-08-20 — Warden downstream BLOCK (22 pre-existing highs, none from this changeset) overridden by user decision → DEBT-003; remediation deferred to a separate dependency-maintenance task.
- 2026-08-20 — `@playwright/test` 1.58.2 → 1.62.1 (user-directed: "you didn't try updating the dependencies"). Root cause: 1.58 predates Ubuntu 26.04 support (added v1.61); 1.62.1 verified to carry ubuntu26.04 chromium artifacts. Warden upstream APPROVE + downstream ADVISORY (DEBT-003 override applies, zero audit delta). Chromium rev 1234 installed; e2e now runs (16/16 after fixing 3 async-unaware spec assertions).
- 2026-08-20 — Gate 3 e2e: 13→16 pass after fixing `e2e/home.spec.ts` (stale `'NextJs'`→`'Next.js'`; social-links + footer assertions made async-aware/auto-waiting; hero-scoped locators to avoid Playwright strict-mode on hero+footer duplicate links).
- 2026-08-20 — Navigation-service error branch (dead code, `envVariables.ts:2` fallback): user chose option B — make the branch live. Removed `|| 'http://localhost:3000'` fallback (`?? ''` for tsc-clean typing), added gitignored `.env.development` (`http://localhost:3000`) + `.env.test` (`https://example.com`), wired `dotenv-cli@11.0.0` (Warden APPROVE→ADVISORY, zero audit delta) into all scripts (`dev/build/start/e2e/e2e:ui` → `.env.development`; `vitest` → `.env.test`). Nav spec's dead "falls back" test replaced with live error-branch test (dynamic-import error class for module-registry identity). Verified: vitest 66/1 (DEBT-002 only), build exit 0 (9/9), e2e 16/16. **Prod deploy now REQUIRES `NEXT_PUBLIC_WEB_URL` set** (metadataBase throws otherwise) — documented accepted risk.
- 2026-08-20 — Forge deviations accepted: `?? ''` over bare env (tsc-clean without touching layout.tsx; behavior identical); dynamic-import of error class in the nav error test (resetModules changes class identity).
