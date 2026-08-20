# Accepted Debt Register

Records of deferred technical or process debt that are **non-blocking** for release.

## Entry format

Each entry MUST include:

- **ID** — unique identifier (e.g. `DEBT-001`)
- **Date** — when the deferral decision was made
- **Description** — what is deferred
- **Direct evidence** — the evidence that justifies deferral
- **Resolution criteria** — what must be true for the debt to be cleared
- **Explicit deferral decision** — who decided, and when

## Rules

- An accepted debt is nonblocking only when its record here carries direct evidence, resolution criteria, and an explicit deferral decision.
- Disclose the ID and unresolved criteria in any operation report that touches it.
- Clearing a debt updates the record with the resolution.

## Register

### DEBT-001

- **ID:** DEBT-001
- **Date:** 2026-08-19
- **Description:** `pnpm lint` fails with 7 `simple-import-sort/imports` errors across `src/modules/*/components`, `src/modules/*/hooks`, and `src/shared/utils/resolve-icon.tsx`.
- **Direct evidence:** `pnpm lint` → 7 errors, all "Run autofix to sort these imports!"; failures reproduce identically on `main` (dependency versions identical in `pnpm-lock.yaml`; no `src/` files changed by the tooling-swap PR).
- **Resolution criteria:** `pnpm lint` exits 0 (run `eslint --fix` on the 7 files, then re-verify with `pnpm lint`).
- **Explicit deferral decision:** deferred 2026-08-19 by the user during the tooling-swap PR; out of scope for that change.
- **RESOLVED 2026-08-20:** cleared in phase-05 of `plans/test-guideline-alignment-20260819/` — `pnpm exec eslint --fix` on the 8 files (7 original + AppBar) + 6 new-file lint fixes; `pnpm lint` exits 0 (verified by Cipher, 67/67 vitest).

### DEBT-002

- **ID:** DEBT-002
- **Date:** 2026-08-19
- **Description:** `pnpm vitest` fails on one test: `src/shared/components/ui/__tests__/button.test.tsx` → `Button > renders icon size`.
- **Direct evidence:** `pnpm vitest run` → 1 failed / 43 passed; failure reproduces identically on `main` (dependency versions identical; file untouched by the tooling-swap PR).
- **Resolution criteria:** `pnpm vitest` exits 0 with all tests passing.
- **Explicit deferral decision:** deferred 2026-08-19 by the user during the tooling-swap PR; out of scope for that change.
- **RESOLVED 2026-08-20:** cleared in phase-05 — assertion updated from stale `aspect-square` to the real `size-11` emitted by `button.tsx:25` (`size: 'icon'` variant); `pnpm vitest` exits 0 (67/67, verified by Cipher).

### DEBT-003

- **ID:** DEBT-003
- **Date:** 2026-08-20
- **Description:** 22 pre-existing high-severity + 19 moderate + 3 low audit advisories in the dependency tree (runtime: `next` 16.2.6 < 16.2.11 — middleware bypass + 2× SSRF; `sharp` 0.34.5 < 0.35.0; `postcss` < 8.5.23; `nanoid` 3.3.11; dev-side: vite/undici/js-yaml/brace-expansion). Surfaced by Warden 🔒 (Dependency Warden)'s first baseline audit during phase-01 of `plans/test-guideline-alignment-20260819/`.
- **Direct evidence:** `pnpm audit --json` 2026-08-19 → 0 critical / 22 high / 19 moderate / 3 low; Warden baseline `output/audits/2026-08-19-baseline.md` findings #1–#16; attribution matrix in `output/audits/2026-08-19-lockfile-phase01-tooling.md` proves zero findings attributable to the phase-01 changeset.
- **Resolution criteria:** `pnpm audit` reports 0 high (runtime advisories at minimum: `next` ≥ 16.2.11, `sharp` ≥ 0.35.0); each bump passes its own Warden upstream review; `pnpm build` + `pnpm vitest` + `pnpm lint` exit 0 after the bumps.
- **Explicit deferral decision:** deferred 2026-08-20 by the user ("deliver it to debts and fix later") to keep the test-guideline-alignment plan scoped; override annotation applied per Warden's template. Remediation is a separate dependency-maintenance task; Warden recommends next/sharp first.

### DEBT-004

- **ID:** DEBT-004
- **Date:** 2026-08-20
- **Description:** The 3 async module services (`projects`/`skills`/`social-links`) parse fetch responses with `as T[]` TypeScript casts instead of runtime schema validation at the service boundary (Atrium 🏛️ (Frontend Architect) clean-arch rule: apiClient + zod parse, no `as T` casts). The casts were prescribed verbatim by `plans/test-guideline-alignment-20260819/phase-02-forge.md` steps 5-6 — Forge followed the plan; the plan chose the simplest contract for a static portfolio.
- **Direct evidence:** Atrium phase-2 audit `[UNCERTAIN]` service-layer finding (2026-08-20): "All 3 services use plain fetch() + `as T[]` — the rule's prescribed tooling (apiClient wrapper, JSend envelope, zod) does not exist in this project… conformant path is runtime schema validation… or registering the cast as accepted debt."
- **Resolution criteria:** services validate responses at the boundary (e.g. zod schema parse replacing each `as T[]` cast); zod addition routes through Atrium's dependency domain + Warden 🔒 (Dependency Warden) upstream review; `pnpm build` + `pnpm vitest` exit 0 after.
- **Explicit deferral decision:** deferred 2026-08-20 by Cipher 🔓 (L2 Lead) on the user's established debt-preference pattern ("deliver it to debts and fix later", DEBT-003); keeps the plan free of a new dependency round. Endpoints are first-party route handlers serving static typed arrays — not untrusted external input.
- **Status:** OPEN as of 2026-08-20 — the `as T[]` service casts were not changed by `plans/test-guideline-alignment-20260819/`; resolution criteria stand for the separate runtime-validation task.
