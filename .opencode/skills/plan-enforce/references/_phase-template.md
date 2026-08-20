<!--
HARD RULE — fill every Step / Output / Gate / Abort. No `TBD` placeholders. Agent improvisation forbidden.
-->

# Phase N — <name>

> **Owner:** <Agent Name + icon + (Role)>
> **Pre:** <what must be true / completed before this phase begins>
> **Reads:** <files / MCP responses / artifacts this phase consumes>
> **Writes:** <files / artifacts this phase produces>

## Steps

1. <One shell command or one file edit — be explicit, no paraphrasing>
2. <Next command or edit>
3. <Continue as needed — every step must be independently executable>

## Output

- **Artifact:** `<path/to/output/file>`
- **Schema / shape:** <what the file must contain or look like>

## Verify commands

<!-- OPTIONAL — include this section ONLY for programming phases. Runnable command + expected output per gate condition. -->
<!-- Example: -->
<!-- - ⬜ Gate 1: `npx tsc --noEmit` → exit 0, no type errors -->
<!-- - ⬜ Gate 2: `pnpm format` → no files modified (no diff output) -->

## Gate

- ⬜ <Condition that must be true before next phase begins>
- ⬜ <Second condition if applicable>

## Abort conditions

- <Halt if X — describe exactly what constitutes a blocking failure>
- <Halt if Y>

## Tool whitelist / blacklist

<!-- OPTIONAL — include this section ONLY for read-only phases touching external systems -->
<!-- Example: -->
<!-- Whitelist: the data-query tool (read-only queries only) -->
<!-- Blacklist: the ticket-mutation tool (no ticket writes in this phase) -->
