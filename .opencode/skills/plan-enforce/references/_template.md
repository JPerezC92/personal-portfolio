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

> Required. Numbered checkboxes tracked from confirmation to completion — each goal states what must be true when the plan is done.

- ⬜ **G1:** <goal 1 — what must be true when this plan is done>
- ⬜ **G2:** <goal 2>

## Body

<!-- Tables and bullets, not prose. Task-specific content goes here. -->

## Source of truth chain

<!-- Optional. Ordered list of data sources the script/agent reads. Remove section if not applicable. -->

## Phase index — dispatch table

| # | Phase | Owner | Runbook | Output |
|---|---|---|---|---|
| 1 | <phase name> | <Agent> | `phase-01-<owner>.md` | <artifact path> |

## Critical files / tools

-

## Verification

- ⬜ Phase 1 output artifact exists and is valid
- ⬜ All gates in each phase runbook passed

## Out of scope

-

## Pending

<!-- Optional. Remove section if empty. One line per blocked/waiting item. -->
<!-- Example: - [waiting for] user to merge PR #42 -->
<!-- Example: - [blocked on] decision: X vs Y -->

## Resolved decisions

<!-- Optional. Append-only log of locked choices with date stamps. -->
<!-- Example: - 2026-05-20 — decided X over Y because Z -->

---

## Single-file exception (template footer)

> **HARD RULE — anti-improvisation:** Plans must give the agent a complete execution path. Agent improvisation forbidden — every command, file, gate must be explicit.

The subfolder pattern is the **default**. Single-file is an **exception**, allowed ONLY when ALL five criteria are met:

1. **1 owner agent total** — no cross-agent handoffs
2. **≤ 30 lines of total instructions** — fits without phase isolation
3. **No phase IO contracts** — no phase's output is another phase's input
4. **No external state mutation** — no ticket-system writes, no DB writes, no git operations beyond a single commit
5. **No risk of agent improvisation** — instructions fit a single shell command or single file edit

**Minimal section list for a single-file body** (use these exact sections, in order):

```
Status / Started / Subject / Layout: single-file / Context / Goals / Body / Critical files / Verification / Out of scope
```

**Fall-through rule:** If unsure → subfolder, never single-file.
