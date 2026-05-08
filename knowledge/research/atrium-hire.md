# Augur Brief — Atrium 🏛️ (Frontend Architect) Hire Requirements

## Objective
Establish a strict frontend clean architecture verifier for the portfolio project. Rulebook content was absorbed from a since-removed import; current authoritative source is `.claude/agents/atrium.md`.

## Key Findings
- **Fact**: Imported runtime spec describes feature-modular Next.js app with React Query + Zod + monorepo shared package + sonner + AlertDialog/Dialog patterns.
- **Fact**: Current portfolio src/ structure does NOT match — app/, i18n/, projects/, shared/, theme/ instead of modules/{feature}/. No modules/ directory exists.
- **Fact**: package.json lacks React Query, sonner, Zod, faker, vitest-mock-extended.
- **Fact**: tsconfig.json and vitest.config.ts confirm @/projects, @/shared, @/theme, @/i18n path aliases are in place. The verifier import path rules will partially apply — @/shared is present; @/modules does not yet exist.
- **Fact**: .claude/skills/clean-architecture-frontend/SKILL.md does NOT exist in this repo — the .claude/skills/ directory is absent entirely. The original draft reference to this file was a dead pointer.
- **Hypothesis**: Portfolio will migrate toward the imported architecture (per Curator 🗝️ (Project Lead) decision).

## Sources
- package.json
- tsconfig.json
- src\ directory listing (Glob)

## Recommendations
- Hire as **Atrium 🏛️ (Frontend Architect)** — single-noun + structural emoji matches roster pattern
- Persona: layer-strict, convention-anchored, read-only auditor
- Tools: Read, Glob, Grep (read-only — reports never edits)
- Model: sonnet
- Trigger: auto-run after every .tsx/.ts/.jsx/.js edit in src/ or e2e/ (non-test files)
- Rulebook: keep import body verbatim (aspirational target)

## Specialist Requirements Spec
- **Role title**: Frontend Architect
- **Required expertise**: Next.js App Router, React Query, Zod, clean architecture (component/hook/service/domain layers), tsconfig path aliases, monorepo shared-package patterns
- **Codebase patterns**: current src/ layout uses app/, projects/, shared/, theme/, i18n/ top-level folders; tsconfig aliases @/projects, @/shared, @/theme, @/i18n are live; no modules/ directory yet exists
- **Workflow integration**: invoked by Curator 🗝️ (Project Lead) after frontend code edits; reports routed back to Curator 🗝️ (Project Lead)
- **Risks**: rule mismatch with current portfolio code (mitigation: explicit aspirational target framing); confusion between domain Architecture and roster meta-roles (mitigation: Atrium owns code-architecture only, never roster-architecture)

## Gaps
- **Unknown**: When migration begins (no timeline). Verifier will fire many [FAIL] reports until first feature module is created.
- **Unknown**: Verifier rulebook has a monorepo-vs-no-shared-package branch. This portfolio has no shared package, so Atrium should always follow the no-shared-package path (entity types in domain/entities/). Curator 🗝️ (Project Lead) should confirm this explicitly before first verification run to avoid [UNCERTAIN] noise on every module.
- **Unknown**: The verifier import alias examples use @/modules/... which does not exist in tsconfig yet. Whether @/modules will be added to tsconfig when migration begins — or whether @/projects will serve as the equivalent — is undecided. Atrium needs this resolved before it can verify import paths in migrated code.