# Dependency Audit — Revalidation (2026-05-11)

## Scope

**Audit type:** carry-forward revalidation (per-session)

**Trigger:** Warden's revalidation of two standing findings from prior session baseline (2026-05-10):

1. Three moderate vulnerabilities in transitive dependencies (`brace-expansion` ×2 via eslint chain, `yaml` via vite)
2. `modern-screenshot.umd.js` vendored bundle status (source map presence)

**Package manager:** pnpm

**Node version:** v22.17.1

**Lockfile present:** yes (pnpm-lock.yaml)

---

## Finding 1: `brace-expansion` Vulnerabilities (CVE-2026-33750)

### Current State

**Vulnerable package:** `brace-expansion`

**Vulnerability:** CVE-2026-33750 — Zero-step sequence causes process hang and memory exhaustion

**CVSS Score:** 6.5 (Moderate) — Denial of Service via unbound recursion when processing patterns like `{1..2..0}`

**Severity:** MODERATE

**Evidence:**

```json
{
  "advisories": {
    "1115540": {
      "module_name": "brace-expansion",
      "vulnerable_versions": "<1.1.13",
      "severity": "moderate",
      "cvss": { "score": 6.5 }
    },
    "1115543": {
      "module_name": "brace-expansion",
      "vulnerable_versions": ">=4.0.0 <5.0.5",
      "severity": "moderate",
      "cvss": { "score": 6.5 }
    }
  }
}
```

### Instances Found (via `pnpm audit --json`)

1. **Advisory #1115540:** Path `.>eslint>minimatch>brace-expansion` — version 1.1.12 (vulnerable <1.1.13)
2. **Advisory #1115543:** Path `.>eslint-config-next>eslint-plugin-import>@typescript-eslint/parser>@typescript-eslint/typescript-estree>minimatch>brace-expansion` — version 5.0.4 (vulnerable <5.0.5)

### Recommended Fixes

pnpm audit output lists both advisories with action items:

- **Advisory #1115540:** `pnpm audit --fix` or manual bump to `brace-expansion@>=1.1.13`
- **Advisory #1115543:** `pnpm audit --fix` or upgrade `eslint-config-next` and related TypeScript ESLint packages

### Status

**STILL VULNERABLE** — Both instances remain unfixed. Upstream dependency updates are available but not yet applied.

**Fix routing:** Atrium 🏛️ (Frontend Architect) — owns `eslint` and `eslint-config-next` devDependencies. Curator 🗝️ (Project Lead) to request version bump review upstream.

---

## Finding 2: `yaml` Vulnerability (CVE-2026-33532)

### Current State

**Vulnerable package:** `yaml`

**Vulnerability:** CVE-2026-33532 — Stack Overflow via deeply nested YAML collections

**CVSS Score:** 4.3 (Moderate) — Denial of Service; requires authenticated/privileged input

**Severity:** MODERATE

**Evidence:**

```json
{
  "advisories": {
    "1115556": {
      "module_name": "yaml",
      "vulnerable_versions": ">=2.0.0 <2.8.3",
      "severity": "moderate",
      "cvss": { "score": 4.3 }
    }
  }
}
```

### Instance Found

**Path:** `.>vite>yaml` — version 2.8.2 (vulnerable <2.8.3)

### Recommended Fixes

Upgrade `vite` to a version that pulls in `yaml@>=2.8.3`. Check latest `vite` releases for inline fix.

### Status

**STILL VULNERABLE** — `vite@8.0.11` ships with `yaml@2.8.2`. Newer `vite` versions may include the patch.

**Fix routing:** Lumen ✨ (Visual Director) — owns visual build tooling (`vite`). Curator 🗝️ (Project Lead) to request version bump review upstream.

---

## Finding 3: `modern-screenshot.umd.js` Vendored Bundle

### Current State

**File location:** `.agents/skills/impeccable/scripts/modern-screenshot.umd.js`

**File status:** ✓ PRESENT

**Version pin:** ✓ CONFIRMED — First line of bundle header contains version tag:
```
/*! modern-screenshot v4.7.0 | MIT License | https://github.com/qq15725/modern-screenshot */
```

**Source map:** ✗ NOT PRESENT — No `.map` file exists alongside the `.umd.js` bundle.

**Size:** ~16 KB (minified, single-file UMD)

### Context

This bundle is a dependency of the `impeccable` skill (project-local at `.agents/skills/impeccable/`). It is not auditable by `pnpm audit` because it is not npm-installed. The bundle is vendored for performance reasons in the visual design review workflow.

### Status

**RESOLVED (partial)** — The version pin (`v4.7.0`) is now documented in the file header. The ADVISORY standing finding regarding "no version pin" can be closed.

**NEW FINDING: Source map missing** — This is acceptable for a vendored production bundle and does not pose a security risk. However, for future development velocity, a source map would improve debugging. This is an informational note, not a blocking concern.

**Disposition:** Standing finding "no version pin" is now RESOLVED. No action required unless the bundle is updated to a newer version of `modern-screenshot`.

---

## Summary: Audit Gate Signal

**[BLOCK]** — Two moderate-severity transitive vulnerabilities remain unfixed:

1. **brace-expansion** (CVSS 6.5) — instances in both `eslint` and `eslint-config-next` chains
2. **yaml** (CVSS 4.3) — instance in `vite` chain

Both findings are eligible for upstream review and version bumps. Curator 🗝️ (Project Lead) must route to domain specialists for fix determination before Herald 📯 (Release Manager) stages any `pnpm-lock.yaml` changes that could be traceable to these paths.

---

## Breakdown by Specialist

| Finding | Severity | Specialist Route | Action |
|---------|----------|------------------|--------|
| `brace-expansion` CVE-2026-33750 | MODERATE | Atrium 🏛️ (Frontend Architect) | Review `eslint` and `eslint-config-next` version bumps upstream |
| `yaml` CVE-2026-33532 | MODERATE | Lumen ✨ (Visual Director) | Review `vite` version bump upstream |
| `modern-screenshot.umd.js` no version pin | ~~ADVISORY~~ RESOLVED | None — closed | Version pin confirmed; no further action |

---

## Standing Findings from Prior Session

### ✓ Closed

- **modern-screenshot.umd.js — no version pin:** RESOLVED. Version `v4.7.0` is documented in the bundle header. Carry-forward standing finding is now closed.

### Still Carried Forward

- **bare `.env` not in `.gitignore`:** Unresolved from prior session. Recommend routing to Sentinel 🛡️ (Quality Guardian) for `.gitignore` edit (add `/.env` to cover bare `.env` file).

---

## Audit Commands Run

```bash
pnpm audit --json          # Returned 3 moderate findings, 0 high, 0 critical
node --version             # v22.17.1
pnpm list <packages>       # All packages up-to-date; no deltas since prior session
```

**Baseline comparison:** No new vulnerabilities detected. Advisory counts and severity levels match prior session. The three moderate findings remain unresolved.

---

**Next steps for Curator 🗝️ (Project Lead):**

1. Route brace-expansion findings to Atrium 🏛️ (Frontend Architect) for upstream review of eslint version options.
2. Route yaml finding to Lumen ✨ (Visual Director) for upstream review of vite version options.
3. Route `.gitignore` bare `.env` finding to Sentinel 🛡️ (Quality Guardian) for spec audit and edit.
4. Document overrides (if Curator chooses to proceed despite BLOCK signal) in this report under each finding.
