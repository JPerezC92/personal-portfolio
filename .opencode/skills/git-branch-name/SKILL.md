---
name: git-branch-name
description: Suggest a git branch name in type/scope/description format based on current changes or task context. Use when the user wants to create a branch, asks "what should I call this branch", says "I'm starting work on X", or is about to begin a feature, fix, or refactor — even if they don't explicitly say "branch name".
license: MIT
compatibility: opencode
metadata:
  author: Philip Perez Castro
  version: 1.0.0
  domain: git
---

## What I do

Analyze the current git changes and suggest a branch name in `type/scope/description` format, ready to be passed to `git checkout -b`.

## When to use me

- User wants to create a branch or asks "what should I call this branch"
- User says "I'm starting work on X" or is about to begin a feature, fix, or refactor — even if they don't explicitly say "branch name"
- Before committing with `/git-commit`, the natural prior step is often `/git-branch-name`

Do NOT use this skill to create the branch — only suggest the name.

## Steps

1. Run `git status`, `git diff --stat`, `git diff --cached --stat`, and `git log --oneline -5` in parallel.
2. If the diff stat is small (under 20 files), run `git diff` and `git diff --cached` for the full diff. Otherwise, selectively read the most relevant changed files.
3. Detect if the repo is a monorepo (look for `pnpm-workspace.yaml`, `turbo.json`, `lerna.json`, `go.work`, or `[workspace]` in `Cargo.toml`).
4. Determine the **type** and **scope** of the changes (same logic as conventional commits).
5. Generate a branch name following the format below.
6. Print the suggested branch name and a one-line explanation of why.
7. Print the `git checkout -b <branch-name>` command ready to copy.

## Branch Name Format

```
type/scope/short-description
```

### Type prefixes

| Prefix | When to use |
|--------|------------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code restructuring without behavior change |
| `test` | Adding or updating tests only |
| `docs` | Documentation only |
| `chore` | Tooling, deps, config, CI |
| `perf` | Performance improvement |
| `hotfix` | Urgent production fix |

### Scope

- **Monorepo**: use the app/package directory name
- **Single repo**: use the module, feature, or layer affected
- If changes span multiple packages, use the most significant one or a cross-cutting name

### Short description

- Lowercase, words separated by hyphens
- Max 4-5 words — concise but descriptive
- Use imperative mood (e.g., `add-search-filter`, not `added-search-filter`)

## Examples

```
feat/api/add-user-authentication
fix/web/resolve-pagination-bug
refactor/api/migrate-request-categorization
test/web/add-registry-tests
chore/deps/upgrade-next-16
docs/root/update-claude-md
```

## Rules

- Do NOT create the branch — only suggest the name.
- Do NOT stage, commit, or push anything.
- If there are no changes, check the current branch name and recent commits to suggest a name based on in-progress work.
- If already on a non-main feature branch, mention the current branch name and whether it already follows the convention.

## Troubleshooting

- **No changes and on main** — `git status` is clean and HEAD is on `main`/`master`. Fix: check the most recent commit (`git log --oneline -5`) and the open branch list (`git branch --list`) to suggest a continuation name, or ask the user what work they are starting.
- **Monorepo detection false negative** — workspace marker file may exist but be invisible to the search. Fix: check `pnpm-workspace.yaml`, `turbo.json`, `lerna.json`, `go.work`, or `[workspace]` in `Cargo.toml` directly before deciding the scope.
