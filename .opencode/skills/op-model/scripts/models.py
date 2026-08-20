#!/usr/bin/env python3
"""models.py — fetch and filter the opencode models available to this user.

Procedural data layer for the `op-model` skill. Runs `opencode models
--verbose`, parses the `provider/model` header + JSON block structure, and
emits structured records.

Usage:
  python .opencode/skills/op-model/scripts/models.py                list all available models, grouped by provider
  python .opencode/skills/op-model/scripts/models.py "<query>"      list matching records only (JSON lines)

Output record fields:
  config      full config name, e.g. deepseek/deepseek-v4-flash
  id          model id, e.g. deepseek-v4-flash
  provider    provider id, e.g. deepseek
  name        human name, e.g. DeepSeek V4 Flash
  cost_in     input cost per 1M tokens (float, 0 if unknown)
  cost_out    output cost per 1M tokens (float, 0 if unknown)

Matching normalizes both sides: lowercase, strips non-alphanumerics, and
matches against the config name AND the human name.
"""

import json
import re
import subprocess
import sys


BLOCK_HEADER = re.compile(r"^([A-Za-z0-9][A-Za-z0-9_+.-]*)/([A-Za-z0-9][A-Za-z0-9_+.-]*)$", re.M)


def fetch_verbose() -> str:
    """Run `opencode models --verbose` and return its stdout."""
    try:
        proc = subprocess.run(
            ["opencode", "models", "--verbose"],
            capture_output=True,
            text=True,
            check=True,
            timeout=60,
        )
    except FileNotFoundError:
        sys.exit("ERROR: `opencode` not found on PATH. Cannot list models.")
    except subprocess.CalledProcessError as exc:
        sys.exit(f"ERROR: `opencode models --verbose` failed (exit {exc.returncode}):\n{exc.stderr}")
    except subprocess.TimeoutExpired:
        sys.exit("ERROR: `opencode models --verbose` timed out.")
    return proc.stdout


def parse_records(stdout: str) -> list[dict]:
    """Parse the `provider/model` header + JSON block structure into records."""
    records: list[dict] = []
    pos = 0
    for match in BLOCK_HEADER.finditer(stdout):
        provider, model_id = match.group(1), match.group(2)
        body = stdout[match.end():]
        nxt = BLOCK_HEADER.search(body)
        block = body[:nxt.start()] if nxt else body
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            continue  # skip unparseable blocks; never fabricate
        cost = data.get("cost") or {}
        records.append({
            "config": f"{provider}/{model_id}",
            "id": model_id,
            "provider": provider,
            "name": data.get("name") or model_id,
            "cost_in": _num(cost.get("input")),
            "cost_out": _num(cost.get("output")),
        })
    if not records:
        sys.exit("ERROR: no models parsed from `opencode models --verbose` output.")
    return records


def _num(value) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9]", "", text.lower())


def matches(query: str, record: dict) -> bool:
    q = normalize(query)
    if not q:
        return True
    return q in normalize(record["config"]) or q in normalize(record["name"])


def main() -> None:
    query = sys.argv[1] if len(sys.argv) > 1 else ""
    records = parse_records(fetch_verbose())

    if not query:
        # Grouped human-readable listing (the "what can I use" reference).
        by_provider: dict[str, list[dict]] = {}
        for rec in records:
            by_provider.setdefault(rec["provider"], []).append(rec)
        for provider in sorted(by_provider):
            print(f"## {provider}")
            for rec in sorted(by_provider[provider], key=lambda r: r["config"]):
                print(f"  {rec['config']}  |  {rec['name']}")
            print()
        return

    hits = [r for r in records if matches(query, r)]
    for rec in hits:
        print(json.dumps(rec))
    if not hits:
        sys.exit(
            f"No match for {query!r} in `opencode models`. "
            "Run `python .opencode/skills/op-model/scripts/models.py` to see all available models."
        )


if __name__ == "__main__":
    main()
