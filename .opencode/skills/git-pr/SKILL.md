---
name: git-pr
description: Draft a pull request title and body by analyzing branch commits and the diff versus origin/main, writing output to pr-draft.md. Use when the user wants to open a PR, create a pull request, draft a PR description, or says "I'm done with this branch" / "ready to merge" / "submit my changes" — even if they don't say "pull request" explicitly.
license: MIT
compatibility: opencode
metadata:
  author: Philip Perez Castro
  version: 1.0.0
  domain: git
---

## What I do

Analyze the current branch's divergence from `origin/main` and write a PR title + body to `pr-draft.md` at the repository root. The file is the single source of truth for the eventual PR body; do not create a second PR-description artifact.

## When to use me

- User wants to open a PR or create a pull request
- User says "ready to merge", "I'm done with this branch", "submit my changes"
- User says "draft a PR description" or asks for a PR summary
- User asks for a PR title, even without explicitly saying "pull request"
- After `/git-commit` produces a commit, the natural next step is `/git-pr`

Do NOT use this skill to run `gh pr create` or any git command that mutates state — it only writes the draft file.

## Arguments

None. The skill reads the current branch state directly from git.

## Steps

1. Run these in parallel:
    - `git status`
    - `git log --oneline origin/main...HEAD`
    - `git diff origin/main...HEAD --stat`
    - `git log --oneline -5` (recent style reference)
2. If the diff stat is small (under 20 files), run `git diff origin/main...HEAD` for the full diff. Otherwise, read the most relevant changed files selectively — reading the full diff on a large changeset wastes context; sample the highest-signal files instead. `git diff --cached --check` is a whitespace diagnostic only and is never PR scope evidence.
3. Check for a plan or ticket file that explains the motivation — the PR Summary should explain the *why*, which usually lives in the plan/ticket Context, not the diff:
   - Look for `plans/*.md` with `Status: active` or `Status: completed`
   - Look for ticket folders matching recent commit refs
   - If found, read the **Context** section for the why
4. Determine the PR title and body following the format below.
5. Ensure `pr-draft.md` is in `.gitignore` — if not, add it immediately before writing.
6. Write the output to `pr-draft.md` at the repository root.
7. Print the ready-to-run `gh pr create` command with the draft content inlined.

## Format

### Title

```
type(scope): concise summary under 70 characters
```

- Same `type` and `scope` conventions as conventional commits
- Imperative mood, lowercase after the colon
- No trailing period

### Body

```markdown
## Summary
- <bullet: what changed and why — one line each, max 3>

## Test plan
- [ ] <what to verify manually or via CI>
- [ ] <edge case or regression to check>
```

- **Summary**: focus on *why*, not *what* the diff shows — the diff is already visible
- **Test plan**: at least 2 concrete, executable steps a reviewer can follow. Each item names the action and the observable expected result.
- **Test plan format is mandatory** — every item MUST be a `- [ ]` checkbox (un-ticked in the draft). Herald 📯 converts prose items to checkboxes only when forced; the skill produces checkboxes from the start.
- **Test-plan draft boundary** — include only unchecked executable test-plan items. Do not include `[x]` items, test results, passing claims, or evidence claimed as executed.
- **Test evidence quality** — a checkbox is ticked ONLY after a real run with recorded literal input→observed output evidence (per the project's Test-Evidence-Before-Done gate). A "logic trace", "it should work", or an UNROUTABLE-but-plausible reading is NOT execution.
- Keep the body under 20 lines total

### Post-PR evidence contract

After the PR exists, retain the same PR body as the sole mutable description surface; do not create or use GitHub comments, reviews, or a second evidence document. Before any test-plan checkbox changes from `- [ ]` to `- [x]`:

1. Obtain the PR number and immutable PR head SHA with `gh pr view <number> --json number,headRefOid`; then inspect the changed-file list and patch with `git diff origin/main...<head-sha>`. A local `HEAD`, branch name, or `git diff --cached --check` alone is insufficient.
2. Execute the specific test against that commit and record the evidence in a `## Test evidence` section in the PR body using this exact shape:

````markdown
## Test evidence
- Test-plan item: `<exact checkbox text>`
  - PR: `#<number>`
  - Commit under test / immutable head SHA: `<head-sha>`
  - Base: `origin/main`
  - Scope command: `git diff origin/main...<head-sha>`
  - Input: `<literal executed input>`
  - Observed output: `<literal observed output>`
  - Executor: `<person or agent>`
````

3. Re-read the persisted PR body with `gh pr view <number> --json body` and verify the PR number, immutable head SHA, exact scope command, literal input, observed output, executor, and matching evidence row before ticking the corresponding checkbox. Missing or partial evidence leaves the item unchecked.

### Breaking changes

If any commit title has `!` or the diff removes/renames a public interface, add before the test plan:

```markdown
## Breaking changes
- <what breaks>
- Migration: <one-line path>
```

## Examples

**Input** (branch commits + diff):
- `feat(auth): add JWT validation middleware`
- `test(auth): cover expired-token path`
- diff touches `src/auth/jwt.ts`, `src/auth/jwt.test.ts`

**Output** (`pr-draft.md` body):
```markdown
## Summary
- Add JWT validation middleware so protected routes reject expired/forged tokens before hitting handlers

## Test plan
- [ ] Hit a protected route with a valid token → 200
- [ ] Hit it with an expired token → 401, no handler invocation
```

## Output file

`pr-draft.md` content:

```
Title: <title here>

---

<body here>
```

## Rules

- **Do NOT run `gh pr create`** or any git command that mutates state — only write the draft file.
- **Do NOT stage, commit, or push** anything.
- **Do NOT tick test plan checkboxes** in the draft. Ticking happens later, in the PR body, after each item has been executed with live evidence.
- **Do NOT use prose test items** ("Verify the X works"). Use `- [ ] <actionable item>` form. Herald 📯 converts prose → checkboxes only if forced; the skill must produce checkboxes from the start.
- **Do NOT claim unexecuted evidence** in the draft or PR body. A checkbox remains unchecked until its complete post-PR evidence row is persisted and re-read.
- **Do NOT use `git diff --cached --check` as scope evidence.** Use `git diff origin/main...HEAD` before PR creation and `git diff origin/main...<head-sha>` after the immutable PR head is known.
- **Do NOT create, post, edit, identify, or delete GitHub comments or reviews.** Test evidence belongs only in the PR body.
- **If on main/master with no diverging commits** — inform the user, no draft to write.
- **If the branch has no commits ahead of main** — check for uncommitted changes and suggest running `/git-commit` first.
- **After writing the file**, print the full ready-to-run command:
  ```
  gh pr create --title "<title>" --body "$(cat pr-draft.md | tail -n +4)"
  ```

## Troubleshooting

**`fatal: ambiguous argument 'origin/main...HEAD'`**:
- Cause: branch is `master`, or the upstream tracking branch has a different name (e.g., `origin/develop`).
- Fix: run `git branch -vv` to confirm the current upstream, then re-run the diff against the correct remote base (e.g., `git diff origin/develop...HEAD`).

**No commits ahead of main**:
- Cause: branch is at the same commit as `main` — nothing to PR.
- Fix: check `git status` for uncommitted changes; if any exist, run `/git-commit` first. If the branch is clean, inform the user that there is nothing to PR.

**`.gitignore` does not list `pr-draft.md`**:
- Cause: the file would otherwise be tracked and pollute the diff.
- Fix: add `pr-draft.md` to `.gitignore` BEFORE writing the draft (step 5). Verify with `git check-ignore -v pr-draft.md`.

**PR body test plan was prose instead of `- [ ]` checkboxes**:
- Cause: the draft used bullet sentences, not checkboxes.
- Fix: rewrite the test items in `- [ ] <actionable step>` form. Herald 📯 should not need to convert prose to checkboxes; the skill produces the correct shape directly.

**A checkbox was ticked without complete evidence**:
- Cause: the PR body lacks the immutable head SHA, exact scope command, literal input, observed output, executor, or a persisted re-read.
- Fix: return the item to `- [ ]`, add the complete `## Test evidence` row for the current PR head, re-read the PR body, then tick only the matching item.
