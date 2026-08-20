# Plan — <task subject>

> **Status:** active
> **Started:** YYYY-MM-DD HH:MM
> **Subject:** <one-line task description>
> **Layout:** subfolder pattern

## Context

> Why is this being done? What prompted it? What is the intended outcome?

- Prompted by:
- Goal:
- Outcome:

## Goals

> Every programming goal carries a `Done when:` criterion — the observable condition that proves the goal is met.

- ⬜ **G1:** <goal 1>
  - Done when: <observable condition>
- ⬜ **G2:** <goal 2>
  - Done when: <observable condition>

## Current state

> REQUIRED. Evidence table of the codebase state this plan starts from. No prose claims without a file + line or command output.

| Area | Current file / behavior | Evidence (file + line / command output) |
|---|---|---|
| <module / area> | <current behavior> | <path:line or output> |

## Behavior change

> Before → after per goal. Interface contracts (public API, file paths, exports) are part of the behavior — list them explicitly.

| Goal | Before | After | Interface contracts | Do-not-break |
|---|---|---|---|---|
| G1 | <current behavior> | <new behavior> | <public API / paths / exports> | <existing behavior that must not regress> |

## Design decisions

- <decision 1> — <rationale> (simplest alternative considered: <alternative>, rejected because <reason>)

## Phase index — dispatch table

| # | Phase | Owner | Runbook | Output | Goals |
|---|---|---|---|---|---|
| 1 | <phase name> | <Agent> | `phase-01-<owner>.md` | <artifact path> | G1 |

> Every phase traces to ≥ 1 goal ID. A phase with no Goals column entry is speculative — remove or merge it.

## Critical files / tools

-

## Verification

> Runnable command + expected output, each traced to the goal it proves.

- ⬜ G1: `<command>` → <expected output>
- ⬜ G2: `<command>` → <expected output>

## Out of scope / Do-not-touch

- <areas the plan must not modify>

## Pending

<!-- Optional. Remove section if empty. One line per blocked/waiting item. -->
<!-- Example: - [waiting for] user to merge PR #42 -->
<!-- Example: - [blocked on] decision: X vs Y -->

## Resolved decisions

<!-- Optional. Append-only log of locked choices with date stamps. -->
<!-- Example: - 2026-05-20 — decided X over Y because Z -->

---

## Template footer (inherits base rules)

> **HARD RULE — anti-improvisation:** Plans must give the agent a complete execution path. Agent improvisation forbidden — every command, file, gate must be explicit.

This programming template inherits the base subfolder / single-file rules from `references/_template.md`:

- The **subfolder pattern is the default** for programming plans.
- Single-file is an **exception**, allowed ONLY when ALL five criteria from `references/_template.md` are met: 1 owner agent, ≤ 30 lines of total instructions, no phase IO contracts, no external state mutation, no risk of agent improvisation.
- **Fall-through rule:** If unsure → subfolder, never single-file.
