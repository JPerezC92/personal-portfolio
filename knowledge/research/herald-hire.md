# Augur Brief — Herald 📯 (Release Manager) Hire Requirements

## Objective

Identify the role, scope, constraints, and required expertise for a dedicated Release Manager specialist to own all git/commit/branch/PR operations in the personal-portfolio project. No current specialist holds this responsibility: Curator 🗝️ (Project Lead) is orchestrator-only, and domain specialists (Atrium 🏛️ (Frontend Architect), Crucible 🔥 (Test Architect)) write code but do not commit or push.

## Key Findings

- **Fact**: `git log --oneline -20` confirms the project follows Conventional Commits with scoped types throughout its modern history: `feat(agents):`, `feat(i18n):`, `fix(seo):`, `feat(e2e):`, `chore(deps):`, `feat(ui):`. Older commits (pre-2023) use free-form messages. Herald must match the scoped Conventional Commits style used in all commits from `138bdfa` onward.
- **Fact**: The `commit` skill (`~/.claude/skills/commit/SKILL.md`) exists and is project-accessible. It analyzes staged/unstaged changes, detects commit style from `git log`, and writes the message to `commit.txt` — it does NOT run `git commit`, does not stage files, and does not push.
- **Fact**: The `caveman-commit` skill (`~/.claude/plugins/cache/caveman/caveman/c2ed24b3e5d4/skills/caveman-commit/SKILL.md`) exists and is globally installed via the caveman plugin. It generates ultra-compressed Conventional Commit messages (subject ≤50 chars, body only when "why" is non-obvious). Its own Boundaries clause reads: "Only generates the commit message. Does not run `git commit`, does not stage files, does not amend."
- **Fact**: The caveman `skills/caveman/SKILL.md` Boundaries section reads: "Code/commits/PRs: write normal." This means caveman compressed prose never applies to commit messages or PR descriptions — they must always be written in standard English regardless of session caveman mode. Herald must enforce this unconditionally.
- **Fact**: The `branch-name` skill (`~/.claude/skills/branch-name/SKILL.md`) exists and is project-accessible. It suggests branch names in `type/scope/short-description` format (e.g. `feat/agents/add-herald-spec`) — it does NOT create branches.
- **Fact**: Neither the `commit` skill nor the `branch-name` skill executes git operations. Herald is the first specialist that actually runs `git add`, `git commit`, `git push`, `git tag`, and `gh pr create`. The skills generate artifacts (message text, branch name suggestion); Herald executes.
- **Fact**: CLAUDE.md (global) Git Safety Protocol specifies: never use `--no-verify`, never use `--force` push to main/master, never amend (create new commits instead when a pre-commit hook fails), prefer adding specific files by name over `git add -A` or `git add .`, never commit `.env` or credential files.
- **Fact**: The project's audit gate chain is: domain specialist edits code → Atrium 🏛️ (Frontend Architect) or Crucible 🔥 (Test Architect) verifies [PASS]/[FAIL]/[UNCERTAIN] → Sentinel 🛡️ (Quality Guardian) audits any doc/spec/roster changes → only after all relevant gates pass does Curator 🗝️ (Project Lead) invoke Herald 📯 (Release Manager). Herald never self-triggers.
- **Fact**: The `commit` skill writes its output to `commit.txt` at the repo root and requires `commit.txt` to be in `.gitignore`. Herald should use this artifact as the commit message source when available, rather than drafting independently.
- **Fact**: No Herald-named agent file exists anywhere in `.claude/agents/` or `agents/`. The name is unused and safe to allocate.
- **Fact**: `Herald` does not appear in the Cipher poison-word list (banned: `scribe`, `ledger`, `quill`, `atlas`, `forge`, `gate`, `lex`, `ranger`). Name is clean.
- **Hypothesis**: The `commit` skill's style-detection (step 5: "detect existing commit message style from log") will already converge on the project's scoped Conventional Commits pattern, making Herald's commit messages consistent by default without Herald needing its own style lookup logic.
- **Hypothesis**: A multi-specialist commit scenario (e.g. one PR contains frontend code edits by a future UI specialist and doc edits routed through Marshal 🎖️ (HR Director)) is likely to arise as the roster grows. Herald will need Curator 🗝️ (Project Lead) to explicitly signal when all relevant gate passes are complete before Herald stages and commits — Herald must not infer this independently.

## Sources

- `git log --oneline -20` output (run 2026-05-08, repo root)
- `~/.claude/skills/commit/SKILL.md` — commit message skill spec
- `~/.claude/skills/branch-name/SKILL.md` — branch name skill spec
- `~/.claude/plugins/cache/caveman/caveman/c2ed24b3e5d4/skills/caveman-commit/SKILL.md` — caveman-commit skill spec
- `~/.claude/plugins/cache/caveman/caveman/c2ed24b3e5d4/skills/caveman/SKILL.md` — caveman Boundaries clause
- `~/.claude/plugins/cache/caveman/caveman/c2ed24b3e5d4/CLAUDE.md` — caveman project overview and auto-clarity rules
- `CLAUDE.md` — Git Safety Protocol, audit gate chain, naming conventions
- `.claude/agents/marshal.md` — Marshal's brief format requirements (section heading order, H1 format, no YAML frontmatter rule)
- `knowledge/research/sentinel-hire.md`, `atrium-hire.md`, `crucible-hire.md` — structural reference for brief format

## Recommendations

- Hire as **Herald 📯 (Release Manager)** — single-noun, announcement-metaphor emoji, clean name, no roster overlap
- Scope: exclusively git/branch/commit/push/tag/PR operations; no code writes, no persona edits, no hiring decisions
- Tools: Bash (for all git and `gh` commands), Read (to read diffs and `commit.txt`), Glob (to verify file staging scope)
- Model: sonnet
- Trigger: invoked only by Curator 🗝️ (Project Lead), only after all audit gates relevant to the current changeset have returned [PASS]
- Commit message source: use `commit` skill artifact (`commit.txt`) as primary; fall back to reading diff directly only when `commit.txt` is absent or stale
- Commit message style: always standard English, scoped Conventional Commits — never caveman-compressed prose regardless of session mode (caveman Boundaries clause is absolute here)
- PR description authorship: Herald drafts the PR description by reading the diff and commit history of the feature branch; the implementing specialist does not author it (Herald has the full diff context at commit time)
- `--no-verify` and `--force`: forbidden unconditionally, mirroring CLAUDE.md global guidance; Herald never bypasses hooks or force-pushes

## Specialist Requirements Spec

- **Role title**: Release Manager
- **Required expertise**: git CLI (`git add`, `git commit`, `git push`, `git tag`, `git branch`, `git log`, `git diff`, `git status`), `gh` CLI for PR creation, Conventional Commits specification, scoped commit message style (`type(scope): description`), branch naming convention (`type/scope/short-description` per `branch-name` skill)
- **Codebase patterns**: project uses scoped Conventional Commits from commit `138bdfa` onward; `commit.txt` at repo root is the commit message artifact written by the `commit` skill (must be in `.gitignore`); no monorepo structure (single-repo flat bullet body style applies per `commit` skill rules); existing agents live at `.claude/agents/<name>.md` and `agents/<name>/profile.md` — Herald never edits these
- **Skill inheritance**: Herald invokes the `commit` skill (generates `commit.txt`) and `branch-name` skill (generates branch name suggestion) as upstream helpers; Herald then executes the actual git operations those skills explicitly refuse to run
- **Workflow integration**:
  - Upstream: Curator 🗝️ (Project Lead) signals "all gates passed, commit now" — Herald never self-triggers
  - Upstream audit gate order: Atrium 🏛️ (Frontend Architect) (code files) and/or Crucible 🔥 (Test Architect) (test files) verify edits; Sentinel 🛡️ (Quality Guardian) audits doc/spec/roster changes; Curator 🗝️ (Project Lead) collects all [PASS] reports, then routes to Herald 📯 (Release Manager)
  - Herald's output: committed SHA, branch name (if new branch created), PR URL (if PR created), tag name (if tagged) — reported back to Curator 🗝️ (Project Lead)
- **Risks**:
  - **Scope creep into code edits**: Herald must never modify source files while staging — if a pre-commit hook fails due to a code issue, Herald stops and routes back to Curator 🗝️ (Project Lead) for the implementing specialist to fix; Herald creates a new commit after the fix, never amends
  - **Multi-specialist race condition**: when a single commit spans changes from multiple specialists (e.g. frontend code + doc update), Curator 🗝️ (Project Lead) must confirm all relevant gates have passed before invoking Herald; Herald must not infer gate completeness from partial signals
  - **`--no-verify` authority**: Herald never uses `--no-verify`, `--force`, `--force-with-lease`, or `--no-gpg-sign`; hook failures are bugs to fix, not gates to bypass
  - **Caveman mode contamination**: commit messages and PR descriptions are always normal English per caveman Boundaries clause — Herald must enforce this even if the current session is in caveman mode; compressed prose in a commit message would degrade git history readability permanently
  - **PR description vs implementing specialist authorship**: Herald authors PR descriptions by reading the diff, not by asking the implementing specialist; this avoids a coordination bottleneck and keeps PR authorship in the role with full diff context
  - **`git add -A` / `git add .` risk**: Herald must stage specific files by name (as listed by Curator 🗝️ (Project Lead) or derived from `git status`) to avoid accidentally committing `.env`, credential files, or unrelated artifacts

## Gaps

- **Unknown**: Whether the project will adopt signed commits (`-S` flag / GPG or SSH signing). If signing is required, Herald's runtime spec must include the signing configuration. Currently no evidence of commit signing in the git log.
- **Unknown**: Whether a pre-commit hook (e.g. Husky, lint-staged) will be introduced. If so, Herald's behavior on hook failure (stop + route back) must be explicitly rehearsed. No `package.json` `prepare` or `husky` dependency detected at time of research.
- **Unknown**: Whether `commit.txt` is already in `.gitignore`. The `commit` skill requires this; Herald should verify and add the entry if absent on first run. Not checked in this research pass.
- **Unknown**: Whether the project will use `git tag` for releases (e.g. `v1.0.0` semantic version tags on main). If so, Herald needs a tag naming convention defined by Curator 🗝️ (Project Lead) before tagging operations begin.
- **Unknown**: Whether PR descriptions should follow a fixed template (e.g. Summary / Test plan sections as used in CLAUDE.md's PR creation example). The CLAUDE.md global guidance shows a template format; whether the portfolio project adopts it verbatim is not documented. Herald should default to the CLAUDE.md template until Curator 🗝️ (Project Lead) specifies otherwise.
