# Augur Brief — Crucible 🔥 (Test Architect) Hire Requirements

## Objective
Establish a strict test architecture verifier for the portfolio project. Rulebook content was absorbed from a since-removed import; current authoritative source is `.claude/agents/crucible.md`.

## Key Findings
- **Fact**: Imported runtime spec describes test pyramid with backend unit/integration/E2E + frontend unit (Hook + Component + mock Service via vitest-mock-extended) + service integration (mock fetch) + E2E (Playwright).
- **Fact**: Current portfolio uses Vitest + Playwright + @testing-library/react, but has no vitest-mock-extended or faker in package.json.
- **Fact**: Existing unit tests live at src/shared/components/__tests__/*.test.tsx, src/shared/utils/__tests__/*.test.ts, and src/theme/__tests__/*.test.ts. All use .test. extension. The verifier spec expects .spec.tsx files under modules/{module}/__tests__/components/ — both the location pattern and file extension differ from current reality.
- **Fact**: No frontend service integration tests exist anywhere in src/. No __tests__/services/ subdirectories exist.
- **Fact**: No test helper factories exist (__tests__/helpers/*.factory.ts — required by verifier spec). No faker usage anywhere in the codebase.
- **Fact**: No renderWithQueryClient test helper exists. All current tests use raw render() from @testing-library/react. This will be a violation once React Query is introduced.
- **Fact**: E2E files live at e2e/home.spec.ts, e2e/locale-switcher.spec.ts, e2e/navigation.spec.ts — flat structure directly under e2e/. The verifier spec expects e2e/__tests__/ with phase subdirectories (smoke.spec.ts, seeded-data phase, data-mutation phase). Both directory layout and phase-file naming convention are mismatched. playwright.config.ts sets testDir: ./e2e with no subdirectory enforcement.
- **Fact**: None of the three existing e2e spec files include pageerror listeners. The verifier spec requires these in all non-smoke phase files. This is a concrete existing violation that Crucible will report on its first run.
- **Hypothesis**: Portfolio will adopt the imported test conventions alongside the architectural migration.

## Sources
- package.json
- vitest.config.ts
- playwright.config.ts
- src\shared\components\__tests__\Heading.test.tsx (representative unit test)
- src\shared\components\ui\__tests__\button.test.tsx (representative unit test)
- e2e\home.spec.ts (representative e2e spec)
- e2e\locale-switcher.spec.ts (representative e2e spec)

## Recommendations
- Hire as **Crucible 🔥 (Test Architect)** — single-noun + fire emoji (testing-fire metaphor) matches roster pattern
- Persona: pyramid-strict, tool-consistent, TDD-friendly, read-only auditor
- Tools: Read, Glob, Grep (read-only)
- Model: sonnet
- Trigger: auto-run after every *.spec.* or *.test.* edit
- Rulebook: keep import body verbatim (aspirational target)

## Specialist Requirements Spec
- **Role title**: Test Architect
- **Required expertise**: Vitest, Playwright, @testing-library/react, vitest-mock-extended (MockProxy), test pyramid, TDD red-green-refactor, test factory pattern
- **Codebase patterns**: unit tests currently in src/**/__tests__/*.test.{tsx,ts} (flat naming, .test. extension); e2e specs in e2e/*.spec.ts (flat, no phase subdirectories); no service tests, no factories, no renderWithQueryClient helper currently present
- **Workflow integration**: invoked by Curator 🗝️ (Project Lead) after test edits; reports routed back to Curator 🗝️ (Project Lead)
- **Risks**: portfolio does not have vitest-mock-extended installed (mitigation: Crucible 🔥 (Test Architect) reports [FAIL] on inconsistent mocking; package addition deferred until an implementing specialist is hired — Curator 🗝️ (Project Lead) is pure orchestrator and never edits code); rule mismatch with current minimal test suite (mitigation: aspirational target framing); Crucible will immediately [FAIL] all three existing e2e files for missing pageerror listeners — Curator 🗝️ (Project Lead) should expect this on first invocation

## Gaps
- **Unknown**: Whether portfolio test suite will adopt the full pyramid (currently only component tests + e2e exist; no service tests).
- **Unknown**: Whether vitest-mock-extended and faker will be added to package.json. Crucible rules will [FAIL] until then.
- **Unknown**: Whether existing e2e files will be restructured into e2e/__tests__/ with phase subdirectories as the verifier expects, or whether the verifier e2e section will be treated as aspirational-only for a static portfolio (which has no seeded-data or data-mutation phases). Curator 🗝️ (Project Lead) must decide — it determines whether every existing e2e file is permanently non-compliant on structure.
- **Unknown**: Whether test files will migrate to .spec.tsx extension and modules/{module}/__tests__/components/ path layout (as verifier expects), or stay as .test.tsx in current locations. Curator 🗝️ (Project Lead) should clarify naming convention before the first verification run.
- **Unknown**: Whether a renderWithQueryClient test helper will be created before React Query is introduced. Absence is not currently a violation (React Query is not installed), but will become one immediately upon React Query adoption.