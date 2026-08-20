# Phase 5 — Lint/debt clearing, conformance renames, E2E relocation, full verification

> **Owner:** Forge 🔨 (Implementation Agent)
> **Pre:** Phase 4 complete (all module specs green, Crucible audit "All checks passed"). G5 requires `pnpm vitest`, `pnpm lint`, `pnpm build` all exit 0 — DEBT-001 (8 pre-existing lint errors), 6 new-file lint errors, and DEBT-002 (`button.test.tsx` failure) must be cleared in this phase.
> **Reads:** `playwright.config.ts`, `src/shared/components/ui/button.tsx`, existing test/e2e file paths
> **Writes:** 11 test-file renames (`.test.*` → `.spec.*`), 3 e2e moves into `e2e/__tests__/`, `playwright.config.ts` (edit), lint fixes across 14 files, `button.test.tsx` fix

## Steps

0. **Clear DEBT-001 (8 pre-existing import-sort errors) + 6 new-file lint errors** — run `pnpm exec eslint --fix` on the 8 pre-existing DEBT-001 files:
   - `src/modules/navigation/components/AppBar.tsx`
   - `src/modules/projects/components/ProjectCard.tsx`
   - `src/modules/projects/hooks/use-project-list.ts`
   - `src/modules/skills/components/SkillList.tsx`
   - `src/modules/skills/hooks/use-skill-list.ts`
   - `src/modules/social-links/components/SocialList.tsx`
   - `src/modules/social-links/hooks/use-social-list.ts`
   - `src/shared/utils/resolve-icon.tsx`
   Then fix the 6 new-file errors manually (NOT autofixable / correctness-relevant):
   - `src/modules/{projects,skills,social-links}/__tests__/components/{project-list,skill-list,social-list}.spec.tsx` — 3× `'mock' is defined but never used` (remove `mock` from the `vitest-mock-extended` import — Crucible confirmed the pattern stays conformant without it) + 3× `'mockedService' is never reassigned. Use 'const' instead` (change `let mockedService` → `const mockedService`; the guideline's `let` is only required when reassigned, which never happens here).
   Then `pnpm lint` → exit 0 (record in the phase Output; verify the Guideline consistency rule is unaffected: `MockProxy` still used, no `vi.mocked()`).
1. **Fix DEBT-002** (`src/shared/components/ui/__tests__/button.test.tsx:47`): the `renders icon size` test asserts `className` contains `aspect-square`, but `src/shared/components/ui/button.tsx`'s `size: 'icon'` variant no longer emits that class. Read `button.tsx` to find the actual icon-size class emitted and update the assertion to the real value. Then `pnpm vitest` → exit 0 (this was the only failing test).
2. Rename shared/theme tests (plain `mv`; git picks up renames at commit time — no `git mv`):
   - `src/shared/components/__tests__/Heading.test.tsx` → `Heading.spec.tsx`
   - `src/shared/components/__tests__/Highlight.test.tsx` → `Highlight.spec.tsx`
   - `src/shared/components/__tests__/Icon.test.tsx` → `Icon.spec.tsx`
   - `src/shared/components/__tests__/Text.test.tsx` → `Text.spec.tsx`
   - `src/shared/components/ui/__tests__/button.test.tsx` → `button.spec.tsx`
   - `src/shared/components/ui/__tests__/separator.test.tsx` → `separator.spec.tsx`
   - `src/shared/utils/__tests__/cn.test.ts` → `cn.spec.ts`
   - `src/shared/utils/__tests__/enumType.test.ts` → `enumType.spec.ts`
   - `src/theme/__tests__/colors.test.ts` → `colors.spec.ts`
3. Create `e2e/__tests__/` and move: `e2e/home.spec.ts`, `e2e/locale-switcher.spec.ts`, `e2e/navigation.spec.ts` → `e2e/__tests__/` (smoke phase — no seeded-data/data-mutation specs exist; pageerror listener exempt per spec).
4. Edit `playwright.config.ts:4`: `testDir: './e2e'` → `testDir: './e2e/__tests__'`. No other config change.
5. Run `find src e2e -name "*.test.*"` → must return nothing.
6. Run `pnpm vitest` → exit 0 (all specs, incl. renamed).
7. Run `pnpm e2e --list` → all relocated specs listed (listing only; no browser run required).
8. Run `pnpm lint` → exit 0 (post-rename re-verify).
9. Run `pnpm build` → exit 0.
10. Report the three command outputs to Cipher 🔓 (L2 Lead) for the goals resume.

## Output

- **Artifact:** renamed/moved files + edited `playwright.config.ts` + lint/test fixes
- **Schema / shape:** zero `.test.*` files repo-wide; all e2e specs under `e2e/__tests__/`; `testDir` points there; `pnpm vitest`/`pnpm lint`/`pnpm build` all exit 0.

## Verify commands

- ⬜ Gate 1: `find src e2e -name "*.test.*" | wc -l` → `0`
- ⬜ Gate 2: `pnpm e2e --list` → 3 spec files listed from `e2e/__tests__/`
- ⬜ Gate 3: `pnpm vitest` → exit 0 (no DEBT-002)
- ⬜ Gate 4: `pnpm lint` → exit 0 (no DEBT-001, no new-file errors)
- ⬜ Gate 5: `pnpm build` → exit 0

## Gate

- ⬜ All five verify commands green
- ⬜ Goals resume presented to the user (G1–G5 with ✅/❌ + evidence)

## Abort conditions

- `pnpm e2e --list` fails to resolve `e2e/__tests__/` after the testDir edit — halt; report Playwright's error output.
- Any of vitest/lint/build regresses after renames — halt; report which rename broke it (renamed-file content must NOT change — moves only).
- DEBT-002's actual icon-size class cannot be determined from `button.tsx` (no `aspect-square` or equivalent in any variant) — halt; escalate to Cipher 🔓 (L2 Lead) for a test-design decision rather than inventing a class.
