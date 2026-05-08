# Augur Brief — Sentinel 🛡️ (Quality Guardian) Hire Requirements

## Objective
Identify the role required to prevent recurring doc-surface drift after Marshal 🎖️ (HR Director) edits.

## Key Findings
- **Fact**: In session 2026-05-08, Curator 🗝️ (Project Lead) requested "double check line by line" 3+ times; each pass surfaced new violations (naming convention, contradictions, broken §-refs, structural drift).
- **Fact**: Violations spanned every doc surface touched in the session (CLAUDE.md, persona CVs, runtime specs, knowledge files) — no single surface immune. By extension, any future markdown file in the same convention space (README, CONTRIBUTING, future hire docs, future skill docs) faces the same drift risk.
- **Fact**: Most violations were mechanical (rule-applicable, not judgment-dependent) — auto-fixable by a deterministic rule pass.
- **Hypothesis**: Without a dedicated audit role, every Marshal 🎖️ (HR Director) edit will require Curator 🗝️ (Project Lead) or user to manually re-audit, which is an unscalable QA bottleneck.

## Sources
- Conversation transcript 2026-05-08
- File diffs across `CLAUDE.md`, `agents/{augur,marshal,curator}/profile.md`, `.claude/agents/{augur,marshal}.md`, `knowledge/specialists.md`

## Recommendations
- Hire **Sentinel 🛡️ (Quality Guardian)** as a doc-only audit specialist
- Scope: convention-anchored — any repo `.md` that passes the scope-detection rule (no code review, no transient artifacts)
- Triggers: auto-gate after Marshal 🎖️ (HR Director) edits + on-demand sweep from Curator 🗝️ (Project Lead)
- Output: auto-fix mechanical violations + report judgment calls

## Specialist Requirements Spec
- **Role title**: Quality Guardian
- **Required expertise**: Markdown, YAML frontmatter, naming-convention rules, the project's roster + persona reference pattern
- **Codebase patterns**: persona CV format, runtime spec format (per Marshal's documentation), CLAUDE.md structure
- **Workflow integration**: invoked by Marshal 🎖️ (HR Director) after every CV/spec edit; invoked by Curator 🗝️ (Project Lead) for on-demand sweeps
- **Risks**: scope creep into code review (mitigation: explicit "never review code" hard rule); over-aggressive auto-fix on judgment calls (mitigation: explicit auto-fix vs report split)

## Gaps
- **Unknown**: Whether auto-gate should be enforced via Marshal's runtime workflow steps (documented behavior) or via a Claude Code hook (harness-level). Current plan: workflow-level only — hook-level is out of scope until hooks discussion happens.
