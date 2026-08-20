---
name: op-skill-creator
description: Scaffold a new OpenCode skill or rewrite an existing one by collecting metadata, validating it against the OpenCode guidelines, and writing SKILL.md to .opencode/skills/{name}/. Use when the user wants to create a new OpenCode skill, rewrite an existing skill, rename a skill, migrate a skill to .opencode/skills/, or add a prefix to a skill name.
license: MIT
compatibility: opencode
metadata:
  author: Philip Perez Castro
  version: 1.1.0
  source: opencode-docs-skills
---

## Pre-flight: Autoload guidelines

Load the guidelines below into the working context when they exist in the project. **Missing files degrade gracefully** — see Step 0.5. This skill is self-contained: the essential Quality Checklist is embedded in Step 10, so a project without the reference files can still scaffold valid skills.

### Step 0.1 — Identify scenario

Classify the requested operation as exactly one of:

- `create` — new skill at `.opencode/skills/<name>/SKILL.md` (no prior file exists)
- `modify` — existing OpenCode skill being edited; the current `SKILL.md` exists at the path
- `migrate` — copying a skill from another harness's skill directory to `.opencode/skills/<name>/SKILL.md`
- `rename` / `add-prefix` — net effect is create + delete; treat as `modify` of the source plus `create` of the target

### Step 0.2 — Read when present (regardless of scenario)

| File | Why | If absent |
|---|---|---|
| `knowledge/skill-migration-reference.md` | Field deltas, body renames, metadata defaults | Skip; use the embedded rules in this skill |
| `knowledge/skills.md` | Inventory + uniqueness check + current `state` per skill | Skip; uniqueness checked against the skill directory on disk |
| `.opencode/agents/vault.md` (Quality Checklist section) | 23 Core + per-harness augmentations; OC-1/OC-2 for OpenCode | Skip; the checklist is embedded in Step 10 |

### Step 0.3 — Conditionally read

| Trigger | File | Why |
|---|---|---|
| Scenario = `modify` | `.opencode/skills/<name>/SKILL.md` | Surface current spec before rewriting; preserve tone/structure unless explicitly changing |
| Scenario = `migrate` | The source skill's `SKILL.md` (and any `references/`, `scripts/` subdirs) | Source of truth for the conversion |
| Skill will have `## Arguments` section | `knowledge/conventions.md` (form-fill convention section), if present | Question-tool form schema for skill-arg use case |

### Step 0.4 — Acknowledge each loaded file

After loading, the agent MUST emit one line per file:

```
guidelines loaded:
- knowledge/skill-migration-reference.md: loaded | skipped (not present)
- knowledge/skills.md: loaded | skipped (not present)
- .opencode/agents/vault.md (QC section): loaded | skipped (not present)
- <conditional file>: loaded | skipped (scenario=<X>, not applicable)
```

### Step 0.5 — Missing-file handling (degraded mode)

If any Step 0.2 file is absent, proceed in **degraded mode**: rely on the embedded Quality Checklist (Step 10) and the rules in this skill. Note the gap in the post-edit audit section. Do NOT stop and block on a missing reference file — this skill must be usable in any project that ships it.

---

## What I do

Create a new OpenCode-native skill under `.opencode/skills/{name}/SKILL.md`.

## When to use me

- User wants to create a new OpenCode skill.
- User wants to rewrite, rename, or migrate an existing skill.
- User wants to add a prefix to a skill name (e.g., turn `reservas-fuera-de-rango` into `reservas-fuera-de-rango-v2`).

## Steps

1. Ask for the new skill's `name` if not provided.
2. Validate `name` immediately:
   - 1–64 characters
   - Matches `^[a-z0-9]+(-[a-z0-9]+)*$`
   - Does not start or end with `-`
   - Does not contain `--`
   - Matches the intended directory name
   - Is unique in the project's local skill directories (the creator cannot check global paths; the user must ensure uniqueness across all locations)
3. Ask for the new skill's `description` if not provided.
4. Validate `description` immediately:
   - 1–1024 characters
5. Ask for optional `license` (free-form string), `compatibility` (default `opencode`), and `metadata` key/value pairs (strings only).
   - **Project metadata defaults** — when scaffolding, pre-fill the `metadata` block with the project's default author and `version: 1.0.0` (check `knowledge/skills.md` or the project's conventions for the default author; generic scaffolding leaves `author` blank for the user to fill).
6. Validate optional fields if provided:
   - `license` is a string.
   - `compatibility` is a string.
   - `metadata` is a string-to-string map.
   - When `metadata.author` is present, it MUST be a non-empty string.
   - When `metadata.version` is present, it MUST be a non-empty string (semver recommended but not enforced).
7. Ask for the body sections:
   - `## What I do`
   - `## When to use me`
   - Optional extra sections if the user wants them
   - **If the user adds an `## Arguments` section**, scaffold it with the form-fill convention from `knowledge/conventions.md` § "Skill argument form-fill convention": include an `### Argument collection form` H3 subsection with a fields table (name, type, description, validation, options), trigger conditions table, and recipe. This ensures every new skill with arguments declares its `question`-tool form schema from the start.
8. **Step 9 — Consistency check.** Verify that the `description` and `## When to use me` cover every major capability declared in the body sections. Cross-reference the Vault Quality Checklist (file loaded in Step 0.2) — specifically item QC-4 (description has WHAT + WHEN + "Use when …") and the relevant body-section completeness items. For example:
   - If the body has a `## Rewrite or migrate...` section, the description and `## When to use me` must mention rewrite/migrate/rename.
   - If the body has an `## Arguments` section, the description or `## When to use me` should mention arguments or inputs.
   - If a capability is missing from the description/When to use me, stop and ask the user via a multiple-choice question:
     - **A.** Auto-update the description and/or `## When to use me` with a recommended addition.
     - **B.** Let the user edit manually.
     - **C.** Ignore the mismatch and continue.
9. **Step 10 — Pre-validation (Quality Checklist subset).** Before writing, run these checks against the fully built skill definition. The file loaded Vault spec § "Quality Checklist" is authoritative; reference it for full text:

   ```
   - [ ] Filename is `SKILL.md` — QC-1
   - [ ] Frontmatter `name` matches directory basename — QC-2
   - [ ] Frontmatter `name` is kebab-case — QC-3
   - [ ] `description` 1–1024 chars, no `<`, `>`, has WHAT + WHEN + "Use when …" — QC-4
   - [ ] No `claude-` or `anthropic-` prefix — QC-5
   - [ ] No `README.md` in skill dir — QC-6
   - [ ] At least one `## Examples` entry — QC-11
   - [ ] At least one `## Troubleshooting` entry with cause + fix pair — QC-12
   - [ ] No unfilled `{...}` placeholders — QC-13
   - [ ] Total under 5,000 words — QC-14
   - [ ] OpenCode: frontmatter has `compatibility: opencode` exact — OC-1
   - [ ] OpenCode: body has all four sections (`## What I do`, `## When to use me` lowercase "use", `## Examples`, `## Troubleshooting`) — OC-2
   - [ ] SKILL.md < 500 lines; static blocks >30 lines extracted — QC-27
   ```

   If any check FAILS, fix or surface to user via the `question` tool before the write step (Step 12).
10. If issues are found, stop and ask the user via a multiple-choice question:
    - **A.** Auto-fix the issue if safe.
    - **B.** Let the user provide a corrected value.
    - **C.** Abort skill creation.
    - Include a short recommendation for each issue.
11. Apply the chosen fix and re-run the final prevalidation. Repeat until no issues remain or the user aborts.
12. **Step 12 — Write file.** Write to `.opencode/skills/{name}/SKILL.md`. If any Quality Checklist check failed in Step 10 and was not explicitly overridden by the user, halt here and ask.
13. Re-read the file to confirm it exists, starts with valid frontmatter, and `name` matches the directory.

## Examples

Create a skill called `git-release`:

> "Create a skill named git-release that drafts release notes and proposes a version bump."

The creator validates the name, validates the description, collects the body, runs a final prevalidation, writes `.opencode/skills/git-release/SKILL.md`, and confirms the file.

## Rewrite or migrate an existing skill

Use this when the user asks to rewrite, rename, migrate, or add a prefix to an existing skill.

### Steps

1. Read the existing skill file.
2. Ask for the new skill name.
3. Prevalidate the new name against the OpenCode guidelines.
4. Run an interactive questionnaire with the user:
   - **Old skill cleanup**
     - A. Delete the old skill folder.
     - B. Move the old skill folder to `_deprecated/`.
     - C. Keep the old skill as-is.
   - **Output / asset paths**
     - A. Keep existing output/script paths.
     - B. Update paths to match the new skill name.
   - **Reference updates**
     - A. Update references in agent specs and knowledge files.
     - B. Skip reference updates.
5. Build a migration preview: list every file to create, move, edit, or delete.
6. Ask the user to confirm the preview.
7. Execute the migration: write the new skill, copy/move helper scripts, move/delete the old skill, update references.
8. Run a final prevalidation on the new skill and any edited reference files.
9. If issues are found, stop and ask the user via a multiple-choice question with recommendations.
10. Apply the chosen fix and re-run prevalidation. Repeat until no issues remain or the user aborts.
11. Confirm completion and list all changed paths.

## Troubleshooting

- **Pre-flight file autoload degraded:** the autoload step (Step 0) is conditional — reference files are loaded when present; if any are absent, proceed in degraded mode using the embedded Quality Checklist (Step 10) and note the gap in the post-edit audit section. Silent skip of a present-but-unread file is FORBIDDEN.
- Skill does not show up after creation: verify `SKILL.md` is all caps, frontmatter has `name` and `description`, the name is unique, and permissions in `opencode.json` / `opencode.jsonc` are not set to `deny`.
- Name rejected: check for uppercase letters, underscores, leading/trailing hyphens, or double hyphens.
- Description rejected: ensure it is between 1 and 1024 characters.
- Description / `## When to use me` do not match body capabilities: add the missing capability (e.g., rewrite/migrate) to both sections before writing.
- Missing `metadata.author` or `metadata.version`: add the project's default author and `version: 1.0.0` to the `metadata` block unless the user explicitly overrode. See the project-defaults note in Step 5.
