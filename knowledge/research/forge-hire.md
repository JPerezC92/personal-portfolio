# Augur Brief — Forge 🔨 (Implementation Specialist) Hire Requirements

## Objective

Identify the role, scope, constraints, required expertise, and workflow integration for a dedicated implementation specialist to write TypeScript/Next.js application code in `src/`. No current roster member writes application code. Atrium 🏛️ (Frontend Architect) defines the architectural rules but is read-only. Crucible 🔥 (Test Architect) audits test files but does not write them. The roster has a structural gap: zero code-authoring capability exists. This brief formalises the requirements for the specialist who closes that gap — specifically to execute the clean architecture migration documented in `knowledge/design/migration-clean-arch-brief.md`.

---

## Key Findings

- **Fact**: No current specialist writes application code. Atrium 🏛️ (Frontend Architect), Crucible 🔥 (Test Architect), Sentinel 🛡️ (Quality Guardian), Lumen ✨ (Visual Director), and Warden 🔒 (Dependency Warden) are all read-only auditors. Herald 📯 (Release Manager) runs git operations only. Augur 🔮 (Senior Research Analyst) and Marshal 🎖️ (HR Director) are non-coding roles. Curator 🗝️ (Project Lead) is a pure orchestrator. (Source: `agents/*/profile.md`, `CLAUDE.md`.)

- **Fact**: The clean architecture migration requires creating approximately 25 new files across 4 feature modules (`skills`, `social-links`, `navigation`, `projects`) plus one prerequisite `tsconfig.json` alias update. All files land under `src/modules/` (a directory that does not yet exist). (Source: `knowledge/design/migration-clean-arch-brief.md` §4.)

- **Fact**: The migration is sequenced in 5 steps: tsconfig alias update (prerequisite), then skills → social-links → navigation → projects, ordered by coupling complexity and blast radius. (Source: `knowledge/design/migration-clean-arch-brief.md` §4.)

- **Fact**: Each feature module requires exactly 5 file types: `domain/entities/<entity>.ts`, `domain/errors/<feature>-service.error.ts`, `services/<feature>.service.ts`, `hooks/use-<feature>.ts`, and `components/<Component>.tsx`. This is the Atrium-mandated layer structure. (Source: `knowledge/design/migration-clean-arch-brief.md` §1; `.claude/agents/atrium.md` rulebook.)

- **Fact**: The static data service pattern is synchronous — return type `T | FeatureServiceError`, no `Promise`, no HTTP. Services wrap local TypeScript arrays. (Source: `knowledge/design/migration-clean-arch-brief.md` §3.)

- **Fact**: `tsconfig.json` currently has no `@/modules` alias. The alias must be added before any module file is written, or all new module imports will be unresolvable. (Source: `knowledge/design/migration-clean-arch-brief.md` §6.4.)

- **Fact**: The `projects` module carries the highest coupling risk: `Project.description` is typed `ReactNode` in `src/projects/models/project.model.ts` line 7, embedding JSX (`<Highlight>`) and i18n calls inside a domain entity. Curator 🗝️ (Project Lead) must resolve this architectural decision (Option A: plain string; Option B: documented deviation) before Forge can begin Step 4. (Source: `knowledge/design/migration-clean-arch-brief.md` §6.2.)

- **Fact**: `src/shared/data/projectList.tsx` is dead code — not imported anywhere in the codebase. It must be deleted during Step 4, not migrated. (Source: `knowledge/design/migration-clean-arch-brief.md` §6.1.)

- **Fact**: `AppBar.tsx` imports `./AppBar.css` as a sibling file. When the component moves to `src/modules/navigation/components/`, the CSS file must move with it. The relative import remains valid as a same-folder sibling, which is the one permitted relative import form per Atrium's rulebook. (Source: `knowledge/design/migration-clean-arch-brief.md` §6.3.)

- **Fact**: After migration, `src/shared/data/` dissolves entirely (all three files migrate to their respective modules). Files in `src/shared/components/`, `src/shared/utils/`, and `src/theme/` remain — they are cross-cutting utilities with no single feature owner. (Source: `knowledge/design/migration-clean-arch-brief.md` §2.)

- **Fact**: The tech stack is Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Vanilla Extract CSS, next-intl (i18n), Vitest + Testing Library. No backend, no HTTP calls, no async data fetching. (Source: `package.json`.)

- **Fact**: Five specialists hold Bash access on the current roster. Forge does not need Bash — TypeScript refactoring requires only file reads and writes. No terminal commands are necessary for pure module scaffolding and import path updates. (Source: `CLAUDE.md` Bash grant registry; `knowledge/design/migration-clean-arch-brief.md` §4.)

- **Hypothesis**: Forge will be the first and, for the near term, only code-authoring specialist. If the portfolio expands to include a backend, CMS integration, or animation-heavy UI work, additional domain specialists may be needed. Forge's scope should be bounded to `src/` application code to avoid overlap with future hires.

---

## Sources

- `knowledge/design/migration-clean-arch-brief.md` — full migration plan, module inventory, sequencing, risks, static service pattern
- `agents/atrium/profile.md` — Atrium's read-only constraint; layer structure enforced
- `agents/herald/profile.md` — Herald owns all git operations; Forge must not run git
- `agents/warden/profile.md` — Warden upstream approval required before any `pnpm install`
- `agents/crucible/profile.md` — Crucible audits test files; Forge triggers Crucible after test edits
- `agents/curator/profile.md` (via `CLAUDE.md`) — Curator auto-invokes Atrium after every `src/` edit
- `knowledge/research/atrium-hire.md` — confirms no `@/modules` alias at hire time; gap still open
- `knowledge/research/warden-hire.md` — Bash grant registry pattern; dep install gate
- `knowledge/research/crucible-hire.md` — Crucible audit trigger on `*.spec.*` / `*.test.*` edits
- `CLAUDE.md` — auto-run verifier rule, Bash grant registry, release gate, dep install gate

---

## Recommendations

- Hire as **Forge 🔨 (Implementation Specialist)** — "Forge" is a single concrete noun connoting precise craftsmanship and deliberate shaping; the hammer emoji (🔨) reflects a maker role without overlap with any existing roster emoji. The name is short, memorable, and distinct from audit-role names (Atrium, Crucible, Sentinel) which connote spaces or processes.
- Persona: methodical, layer-obedient, Atrium-deferential. Writes the minimum code that satisfies Atrium's rulebook — no speculative abstractions, no extra flexibility. Treats every Atrium [FAIL] as a to-do item, not a dispute.
- Tools: Read, Glob, Grep, Write, Edit (no Bash, no WebFetch, no WebSearch)
- Model: sonnet
- Trigger: invoked by Curator 🗝️ (Project Lead) per migration step; not auto-run (implementing specialists are task-triggered, not always-on)
- Rulebook: `.claude/agents/atrium.md` is the primary source of truth for all code decisions; Forge reads it at the start of every task

---

## Specialist Requirements Spec

**Recommended role title and scope**

Implementation Specialist — sole code author for `src/` application code. Scope is bounded to TypeScript/TSX files under `src/`. Does not write infrastructure config (Next.js config, `tsconfig.json` structural changes beyond alias additions), CI/CD, or deployment config — those route to Curator 🗝️ (Project Lead) for specialist assignment. The `tsconfig.json` `@/modules` alias addition in Step 0 is within scope as a direct migration prerequisite.

**Overlap check against existing roster**

No overlap. Atrium 🏛️ (Frontend Architect) and Crucible 🔥 (Test Architect) are read-only auditors. Lumen ✨ (Visual Director) produces design briefs and visual audits, never source code. Herald 📯 (Release Manager) runs git operations only. Warden 🔒 (Dependency Warden) audits deps, never source. Sentinel 🛡️ (Quality Guardian) audits markdown docs, never source. Augur 🔮 (Senior Research Analyst) researches, never codes. Marshal 🎖️ (HR Director) manages roster documents, never codes. Curator 🗝️ (Project Lead) orchestrates, never codes. Forge fills the only vacant lane.

**Required expertise**

- TypeScript 5 — strict mode, path aliases (`@/modules/*`, `@/shared/*`, `@/theme/*`, `@/i18n/*`), explicit return types on all exports, `satisfies` operator
- Next.js 15 App Router — Server Components, Client Components (`'use client'`), file-based routing, `next-intl` i18n integration
- React 19 — hooks, functional components, `ReactNode` type, JSX
- next-intl — `useTranslations`, `getTranslations`, message key conventions; understanding of where i18n calls belong (hook layer, not service layer)
- Tailwind CSS and Vanilla Extract CSS — class application patterns, co-located style files
- Clean architecture layer rules as defined in Atrium's rulebook: domain entities → domain errors → services → hooks → components; no reverse imports; no React imports in service or domain files; no business logic in components
- Static data service pattern: synchronous `T | FeatureServiceError` return, try/catch wrapping, no HTTP, no async
- Import path discipline: `@/modules/<feature>/<layer>/<file>` for cross-module imports; `./` only for same-folder siblings; no `../` traversal beyond one level

**Codebase patterns Forge must know before starting**

- `src/app/[locale]/page.tsx` — primary consumer of all migrated components; Forge must update import paths here at the end of each module step without breaking the page
- `src/shared/data/skills.ts` — conflates entity + data; Forge splits these into `domain/entities/skill.ts` and `services/skills.service.ts`
- `src/shared/data/socialList.ts` — implicit type; Forge makes it explicit in `domain/entities/social-link.ts`
- `src/shared/data/useProjectList.tsx` — hook that calls `useTranslations('Projects')` and returns `Project[]`; Forge migrates it to `hooks/use-project-list.ts` in the `projects` module
- `src/shared/utils/sections.ts` and `web.routes.ts` — feed `AppBar`; Forge migrates both into `services/navigation.service.ts`
- `src/shared/components/AppBar/AppBar.tsx` — has a sibling `AppBar.css`; both move together to `src/modules/navigation/components/`
- `src/projects/models/project.model.ts` — existing entity file; Forge moves it to `src/modules/projects/domain/entities/project.ts`
- `src/projects/components/ProjectCard/ProjectCard.tsx` — existing component; Forge moves it to `src/modules/projects/components/ProjectCard.tsx`
- `src/shared/data/projectList.tsx` — dead code; Forge deletes it during Step 4, does not migrate it
- `tsconfig.json` — must add `"@/modules/*": ["src/modules/*"]` to `paths` before Step 1

**Workflow integration**

- Curator 🗝️ (Project Lead) assigns Forge one migration step at a time, following the sequence: Step 0 (tsconfig alias) → Step 1 (skills) → Step 2 (social-links) → Step 3 (navigation) → Step 4 (projects)
- After every file edit to `src/`, Curator 🗝️ (Project Lead) auto-invokes Atrium 🏛️ (Frontend Architect); Forge receives the [PASS]/[FAIL]/[UNCERTAIN] report and fixes all findings before the step is considered done
- After every test file edit (`*.spec.*` or `*.test.*`), Curator 🗝️ (Project Lead) auto-invokes Crucible 🔥 (Test Architect); Forge receives the report and fixes all findings
- If Forge determines a new dependency is needed, it surfaces the proposal to Curator 🗝️ (Project Lead); Curator 🗝️ (Project Lead) routes to Warden 🔒 (Dependency Warden) for upstream review before Forge installs anything. Forge must not run `pnpm install` without an explicit APPROVE or CONDITIONAL gate signal from Warden 🔒 (Dependency Warden), confirmed by Curator 🗝️ (Project Lead)
- Forge never runs git operations — all staging, committing, and pushing belong to Herald 📯 (Release Manager)
- Forge reads `.claude/agents/atrium.md` at the start of every task session as a warmup; rules are not recalled from memory

**Hard constraints (non-negotiable)**

- No Bash access — pure TypeScript refactoring requires only Read, Glob, Grep, Write, and Edit
- No `pnpm install` without Warden 🔒 (Dependency Warden) APPROVE gate and Curator 🗝️ (Project Lead) routing confirmation
- No git operations of any kind
- Work scope is exclusively `src/` and `tsconfig.json` (alias addition only) — no edits to `agents/`, `knowledge/`, `messages/`, `public/`, config files beyond tsconfig paths, or any markdown document
- Must invoke Atrium 🏛️ (Frontend Architect) audit signal via Curator 🗝️ (Project Lead) after every edit to a non-test `src/` file — this is Curator's auto-run rule, but Forge must not declare a step complete until [PASS] is received
- Must not resolve architectural decisions unilaterally — the `Project.description: ReactNode` issue (§6.2 of migration brief) must be resolved by Curator 🗝️ (Project Lead) before Step 4 begins; Forge surfaces blockers but does not break the tie

**Risks**

- **Scope creep into adjacent config files**: Forge may be tempted to "clean up" `next.config.ts`, `eslint.config.js`, or other config files while migrating. Hard constraint: config edits beyond tsconfig alias addition require explicit Curator 🗝️ (Project Lead) routing to the appropriate specialist.
- **Overlap with Atrium 🏛️ (Frontend Architect) on architectural decisions**: Atrium 🏛️ (Frontend Architect) defines rules; Forge implements them. If Forge disagrees with a rule or encounters an ambiguous case, it surfaces the question to Curator 🗝️ (Project Lead) for Atrium 🏛️ (Frontend Architect) clarification — it does not self-interpret the rulebook.
- **Test-writing scope**: Forge may write test files if Curator 🗝️ (Project Lead) assigns that task. If Forge writes test files, Crucible 🔥 (Test Architect) audits them. The migration brief does not include test migration in its primary scope (no existing tests for `useProjectList`, `skillList`, or `socialList` were found). Forge should not proactively create tests beyond what Curator 🗝️ (Project Lead) assigns.
- **Breaking `page.tsx` mid-migration**: Each step modifies import paths in `src/app/[locale]/page.tsx`. A partial step that leaves page.tsx with broken imports is a regression. Forge must complete the full import-path update in `page.tsx` as part of each step, not as a follow-up.
- **Training data gap — static service pattern**: Forge's training data includes many async service patterns (React Query, SWR, fetch wrappers). The synchronous `T | FeatureServiceError` return type is non-standard. Forge must read the static data service pattern in the migration brief explicitly before writing any service file, not rely on pattern recognition from training.

---

## Gaps

- **Unverified**: The full content of `.claude/agents/atrium.md` (Atrium's runtime rulebook) was not read during this research session. The migration brief cites it as the authoritative target, and the Atrium hire brief confirms it exists. Marshal 🎖️ (HR Director) should ensure Forge's spec explicitly directs it to read this file as its primary warmup — the spec above does this, but the rulebook's exact constraints on naming conventions, file suffixes, and export shapes were not independently verified in this brief.
- **Unverified**: `src/shared/components/AppBar/AppBar.css` contents were not read. The migration brief flags this (§6.3) as a known gap. If the CSS file uses class names that conflict with Tailwind or Vanilla Extract conventions, the navigation module migration may require additional work. Forge should read `AppBar.css` before beginning Step 3.
- **Unverified**: No existing tests cover `useProjectList`, `skillList`, or `socialList`. Whether Curator 🗝️ (Project Lead) will assign test-writing as part of the migration or defer it to a future session is unknown. Forge's scope should be clarified on this point before Step 1 begins.
- **Unverified**: The exact current content of `tsconfig.json` `paths` was not read during this session. The atrium hire brief confirms `@/projects`, `@/shared`, `@/theme`, `@/i18n` aliases exist. The precise syntax of the existing paths block needs to be confirmed before Forge adds `@/modules/*` to avoid introducing a malformed paths entry.
- **Unknown**: Whether `Project.description: ReactNode` will be resolved as Option A (plain string) or Option B (documented deviation) before Step 4. This is a Curator 🗝️ (Project Lead) decision. If unresolved, Step 4 cannot begin and Forge will stall at the projects module boundary.
