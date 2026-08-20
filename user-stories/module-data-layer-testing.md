# User story — module-data-layer-testing

> **Created:** 2026-08-19
> **Title:** Module data layer & guideline-conformant tests
> **Status:** active
> **Epic:** portfolio-core
> **Affected areas:** `src/modules/`, `src/app/`, `src/shared/`, `e2e/`

## Persona

> Who is the feature for? One actor, with their role in context.

- A visitor viewing the portfolio home page, whose content is now delivered through the async module data layer.

## Goal

> What must be true when this feature is done — the observable condition, not the activity.

- **G:** The portfolio's module data (projects, skills, social links) loads through async `fetch` services backed by API route handlers, and every module carries a test suite that conforms to Crucible 🔥 (Test Architect)'s guidelines.
  - Done when: the home page renders identical content as before the refactor, `pnpm vitest` passes, and Crucible's audit returns "All checks passed."

## Scenario

> The concrete situation the persona is in and the behavior the feature must provide.

- Visitor opens `/es` (or `/en`); the page fetches `/api/projects`, `/api/skills`, `/api/social-links` via React Query hooks; all sections render the same content as the previous synchronous implementation; a failed fetch surfaces a typed service error (returned, never thrown) instead of crashing the page.

## Acceptance criteria

- ⬜ Projects, skills, and social-links services are async, fetch-backed, and return typed entities or typed service errors — never throw.
- ⬜ API route handlers serve the data previously hardcoded in services / shared data files.
- ⬜ Hooks consume services via React Query under a `QueryClientProvider`; page content is unchanged.
- ⬜ Navigation module keeps its synchronous service (compile-time enum, no data source) with direct unit coverage.
- ⬜ Each module has `__tests__/helpers/{feature}.factory.ts` (faker, `create`/`createMany`) and guideline-conformant component + service specs.
- ⬜ Existing tests renamed to `.spec.*`; e2e specs live under `e2e/__tests__/` (smoke phase).
- ⬜ `pnpm vitest`, `pnpm lint`, `pnpm build` all exit 0.

## Change log

- 2026-08-19 — test-guideline-alignment-20260819: story created; captures the async data-layer refactor + full test-suite alignment driven by Crucible's guidelines.

## Resolved decisions

- 2026-08-19 — services refactored to async `fetch` (route-handler backed) per user decision, instead of keeping synchronous static services.
- 2026-08-19 — one consolidated story for all 4 modules instead of per-module stories, per user decision.
