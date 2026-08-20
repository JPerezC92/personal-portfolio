# Phase 1 — Tooling install

> **Owner:** Crucible 🔥 (Test Architect) — test-runner dependency domain; Warden 🔒 (Dependency Warden) gates upstream and downstream
> **Pre:** Plan approved; worktree clean of unrelated changes; no stash collisions (verified at plan creation).
> **Reads:** `package.json`, `pnpm-lock.yaml`, `.opencode/agents/crucible.md` (Dependency Ownership section), `.opencode/agents/warden.md`
> **Writes:** `package.json`, `pnpm-lock.yaml`

## Steps

1. Resolve latest stable versions (exact pins, matching repo convention of no ranges): `pnpm info vitest-mock-extended version`, `pnpm info faker version`, `pnpm info @tanstack/react-query version`.
2. Edit `package.json`:
   - `devDependencies`: add `"vitest-mock-extended": "<resolved>"`, `"faker": "<resolved>"`.
   - `dependencies`: add `"@tanstack/react-query": "<resolved>"` (runtime dep — React Query hooks in phase 2).
   - Change nothing else.
3. Dispatch Warden 🔒 (Dependency Warden) upstream on the `package.json` diff — license, supply-chain, and peer-dependency audit (React 19.2.4 / Next 16.2.6 / Vitest 4.1.0 compatibility). Wait for APPROVE.
4. On APPROVE: run `pnpm install`.
5. Dispatch Warden 🔒 downstream on the `pnpm-lock.yaml` diff — record the gate verdict in the dispatch output; Herald 📯 (Release Manager) must not stage manifest/lockfile changes before this verdict.

## Output

- **Artifact:** `package.json` + `pnpm-lock.yaml` (updated)
- **Schema / shape:** exactly 3 new packages total; `vitest-mock-extended` + `faker` under `devDependencies`; `@tanstack/react-query` under `dependencies`; all versions exact-pinned.

## Verify commands

- ⬜ Gate 1: `pnpm install` → exit 0
- ⬜ Gate 2: `pnpm list vitest-mock-extended faker @tanstack/react-query` → all three listed, no "missing" markers

## Gate

- ⬜ Warden upstream verdict = APPROVE (recorded)
- ⬜ Warden downstream lockfile verdict recorded for Herald
- ⬜ Both verify commands green

## Abort conditions

- Warden returns BLOCK — halt; report the blocker to Cipher 🔓 (L2 Lead) with the audit output; do not install.
- Any peer-dependency conflict with React 19 / Next 16 / Vitest 4 — halt; report exact conflict output.
- `pnpm install` mutates versions of pre-existing packages beyond the 3 additions — halt and report the diff.
