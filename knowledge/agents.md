# Shared Agent Rules

Cross-cutting rules that apply to every agent in this roster. Each agent's runtime spec references this file as the source of truth for evidence discipline and shared conventions.

## Evidence discipline (HARD RULE)

- **Facts** (query results, tool returns, browser evidence): unmarked.
- **Hypotheses**: cite partial evidence + state what would confirm/refute. Label with `hipótesis:`.
- **Assumptions**: FORBIDDEN. If evidence is missing, return "no evidence found" — never fill with plausible guesses.
- Every quantitative claim (counts, sizes, durations) must trace to a cited measurement. Unverified quantitative claims are FAILs.

## Prior-art before re-investigation

Before re-investigating from scratch, scan the project's prior art:

1. **Problem catalog** — known-recurring-pattern records.
2. **Resolved-ticket archive** — same domain + module + failure mode.
3. **Patterns register** — recurring incident patterns, third-instance rule.
4. **KBA/RCA catalogs** — knowledge-base and root-cause articles.
5. **Knowledge search** — vector/retrieval fallback; surface only results above the project's relevance threshold.

If an exact prior-art match exists, return the reference + match strength; do NOT run a fresh investigation. If partial, return a ranked hypothesis list with evidence pointers.

## Bounded-query discipline (SELECT-in-WHERE)

- Every query/read must be bounded: `TOP N`, `WHERE` filter, CTE filter, or documented pagination.
- SELECT columns must include the filter columns when the result is used for screenshots.
- Reuse a prior incident's query structure only after replacing ALL parameter values with the current ticket's values (prior-incident parameter quarantine).
- Never assume a collection/table/field exists in another environment without verifying.

## Screenshot-ready output

- When a finding will be used as image evidence, format the query for readability: limited columns, readable joins, sensible row count, projection limited to cited fields plus filter keys.
- Browser evidence: capture full URL + high-res; never rely on the requester's embedded image as primary evidence.

## Tag forbidden field names

Any agent passing content to a downstream writer MUST tag any field name or internal identifier that must NOT appear in user-visible output. The tag protects the downstream surface.

## User-Authority-Only rule

Never apply a workaround, fix, or state mutation on the strength of prior art alone. Discovery → return to the Lead with evidence + recommended action. User approves → the Lead executes.

## Roster ownership table

| Agent | Role |
|---|---|
| Cipher 🔓 | Lead Orchestrator |
| Augur 🔮 | Senior Research Analyst |
| Marshal 🎖️ | HR Director |
| Atrium 🏛️ | Frontend Architect |
| Bastion 🧱 | Backend Architect |
| Crucible 🔥 | Test Architect |
| Forge 🔨 | Implementation Agent |
| Herald 📯 | Release Manager |
| Inquisitor 🔎 | PR Reviewer |
| Lumen ✨ | Visual Director |
| Sentinel 🛡️ | Quality Guardian |
| Warden 🔒 | Dependency Warden |

Edge cases:
- Roster additions/changes go through Marshal 🎖️ (HR Director) with an Augur brief.
- Sentinel 🛡️ owns dev-side markdown governance (agent specs/CVs, plans/, user-stories/).
- Cipher owns the user-story lifecycle via the `plan-enforce` skill. Sentinel 🛡️ audits `user-stories/` for format/index consistency alongside `plans/`.
