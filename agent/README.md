# ToolPilot — A Local-First Tool-Using Agent

**Status:** Functional deterministic prototype, with automated unit tests. No API key, no external dependencies.

ToolPilot is a small, auditable agent-like system that **routes explicit user requests to tools**, executes them, and records a trace of what happened. It demonstrates the foundation of tool orchestration without pretending to be a production LLM agent.

## Quick start
Requires Python 3.10+.

```bash
python agent/toolpilot.py "calc: (14 + 6) / 2"
python agent/toolpilot.py "stats: AI tools make repetitive work easier" --json
python agent/toolpilot.py "tasks: TODO: Write tests"
python agent/toolpilot.py
```

Run tests:

```bash
python -m unittest discover -s agent -v
```

## Supported tools
| Command | Tool | Example |
| --- | --- | --- |
| `calc:` | Safe arithmetic calculator (AST-based; no `eval`) | `calc: (10+5)*2` |
| `stats:` | Word/character/unique-word statistics | `stats: hello world` |
| `tasks:` | Explicit TODO/TASK extraction | `tasks: TODO: Write tests` |
| Other input | Usage help | `hello` |

## Architecture
```text
User request
    ↓
Rule-based router
    ↓
Allowed tool selection
    ↓
Execute bounded operation
    ↓
Result + status + execution trace
```

## Safety & limitations
- **No LLM is used**: routing requires command prefixes. This is intentionally transparent and free to run.
- No network requests, API keys, shell execution, or filesystem writes.
- Calculator accepts arithmetic only, with size and depth limits.
- No memory or multi-step planning yet; the task extractor recognizes explicit TODO/TASK lines.
- The prototype is a foundation for future AI model integration, not a claim of autonomous senior-level software engineering.

## Possible next steps
Add a provider-agnostic LLM router, structured tool schemas, multi-step plans, human approvals, persistent execution logs, and integration tests.
