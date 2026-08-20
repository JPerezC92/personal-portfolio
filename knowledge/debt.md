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

### DEBT-002

- **ID:** DEBT-002
- **Date:** 2026-08-19
- **Description:** `pnpm vitest` fails on one test: `src/shared/components/ui/__tests__/button.test.tsx` → `Button > renders icon size`.
- **Direct evidence:** `pnpm vitest run` → 1 failed / 43 passed; failure reproduces identically on `main` (dependency versions identical; file untouched by the tooling-swap PR).
- **Resolution criteria:** `pnpm vitest` exits 0 with all tests passing.
- **Explicit deferral decision:** deferred 2026-08-19 by the user during the tooling-swap PR; out of scope for that change.
