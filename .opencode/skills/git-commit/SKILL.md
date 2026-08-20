---
name: git-commit
description: Generate a conventional commit message by analyzing git changes and write it to commit.txt. Use when the user wants to commit, write a commit message, prepare staged changes, or says "commit this", "make a commit", "what should my commit say", or "I'm ready to push" — even if they don't say "commit message" explicitly.
license: MIT
compatibility: opencode
metadata:
  author: Philip Perez Castro
  version: 1.0.0
  domain: git
---

## What I do

Analyze the current git changes and write a conventional commit message to `commit.txt` at the repository root. The file is the single source of truth for the eventual `git commit -F commit.txt` invocation.

## When to use me

- User wants to commit, write a commit message, or prepare staged changes
- User says "commit this", "make a commit", "what should my commit say", or "I'm ready to push" — even without explicitly saying "commit message"
- Before `/git-branch-name` or after `/git-pr` produces an artifact, the natural next step is `/git-commit`

Do NOT use this skill to run `git commit` or any git command that mutates state — it only writes the message file.

## Steps

1. Run `git status`, `git diff --stat`, `git diff --cached --stat`, and `git log --oneline -10` in parallel.
2. If the diff stat is small (under 20 files), run `git diff` and `git diff --cached` for the full diff. Otherwise, selectively read the most relevant changed files.
3. Detect if the repo is a monorepo (look for `pnpm-workspace.yaml`, `turbo.json`, `lerna.json`, `go.work`, or `[workspace]` in `Cargo.toml`).
4. Check if there are staged changes. If yes, write the message for staged changes only. If nothing is staged, write the message for all unstaged changes.
5. Analyze the commit log from step 1 to detect the existing commit message style (title format, body grouping, naming conventions). Match that style in the new message.
6. Ensure `commit.txt` is in `.gitignore` — if not, add it immediately before writing the file.
7. Write the commit message to `commit.txt` at the repository root.
8. Tell the user the commit message was written to `commit.txt`.

## Commit Format

Default to **conventional commits** format. If the existing commit log uses a different style, match that style instead.

### Title

```
type(scope): concise summary under 72 characters
```

- **type**: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`
- **scope**: required — derived from where the changes live
  - **Monorepo**: use the app/package directory name or a cross-cutting concern if changes span multiple packages
  - **Single repo**: use the module, feature, or layer affected (e.g., `auth`, `api`, `ui`, `config`)
- Description starts with a lowercase verb
- For breaking changes, add `!` after scope: `feat(api)!: remove deprecated endpoint`

### Body

Title focuses on the **why**. Body bullet points describe the **what** changed.

**Monorepo** — group changes by package/app path:

```
apps/web:
- what changed

apps/api:
- what changed
```

**Single repo** — use flat bullet points:

```
- what changed
- what changed
```

Only include sections for packages that actually have changes.

### Footer

For breaking changes:

```
BREAKING CHANGE: description of what breaks and migration path
```

Skip the body for small, single-scope changes where the title is self-explanatory.

## Examples

**Input** (staged changes in a single-repo TS project):
- Files: `src/auth/jwt.ts`, `src/auth/jwt.test.ts`
- Existing log style: scoped Conventional Commits with grouped body

**Output** (`commit.txt` content):

```
feat(auth): add JWT validation middleware

- Implement token verification for protected routes
- Cover expired-token path in jwt.test.ts
```

## Rules

- Do NOT run `git commit` — only write the message to the file.
- Do NOT stage or unstage any files.
- Do NOT push to remote.
- If there are no changes, inform the user instead of writing an empty file.

## Troubleshooting

- **No changes to commit** — `git status` is clean. Inform the user there is nothing to commit; do not write an empty `commit.txt`.
- **`commit.txt` not in `.gitignore`** — the file would be tracked on the next `git add .` and pollute the diff. Fix: add `commit.txt` to `.gitignore` BEFORE writing the file (step 6). Verify with `git check-ignore -v commit.txt`.
