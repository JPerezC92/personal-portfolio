# AGENTS.md — personal-portfolio

Project guidance for OpenCode agents working in this repository. This is a
trimmed copy of the AICore project conventions: it keeps the reusable skills
and shared infrastructure, and drops the agent-roster orchestration layer.

## What's installed

OpenCode-native tooling lives under `.opencode/`:

- **Skills** (`.opencode/skills/`) — user-invocable workflows:
  - `git-branch-name` — suggest a branch name in `type/scope/description` format
  - `git-commit` — write a conventional commit message to `commit.txt`
  - `git-pr` — draft a PR title + body to `pr-draft.md`
  - `op-model` — set an agent's model in `opencode.jsonc` from live `opencode models` output
  - `op-skill-creator` — scaffold/rewrite an OpenCode skill under `.opencode/skills/`
  - `op-agent-creator` — scaffold an OpenCode agent under `.opencode/agents/`
  - `plan-enforce` — enforce plan-first discipline for non-trivial tasks
- **Shared infrastructure**:
  - `knowledge/agents.md` — shared agent rules (evidence discipline, prior-art, bounded queries, User-Authority-Only)
  - `knowledge/debt.md` — accepted-debt register
  - `plans/` — plan lifecycle artifacts (created by `plan-enforce`)
  - `user-stories/` — durable per-feature registry (created by `plan-enforce`)
  - `opencode.jsonc` — permission safety gates (destructive command denies, stash safety)

## Conventions

- Use conventional commits (`type(scope): summary`). Match the style of the existing git log.
- Every clarifying question goes through the OpenCode `question` tool — never plain-text re-asks.
- Evidence discipline (`knowledge/agents.md`) applies: facts vs hypotheses, never assumptions.
- Run `pnpm lint`, `pnpm vitest`, and `pnpm build` to verify non-trivial changes.

## Reuse guide (copying parts of this to another project)

This repo carries a trimmed AICore tooling core. To reuse it elsewhere:

1. **Copy the files you need** — skills (`.opencode/skills/`), and `knowledge/agents.md` if you want the shared rules.
2. **Keep the shared infrastructure** the skills reference:
   - `knowledge/agents.md` (shared rules) and `knowledge/debt.md` (accepted-debt register)
   - `plans/` and `user-stories/` (required by the `plan-enforce` skill)
   - `opencode.jsonc` permission gates (adjust models and MCP servers for the target project)
3. **Adapt to the target stack** — the git skills assume git + pnpm and the GitHub CLI (`gh`); adjust if the target project differs.
4. **Point the tokens to your project** — substitute your real tooling wherever a skill says "the project". The core ships neutral on purpose.
