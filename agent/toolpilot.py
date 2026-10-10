#!/usr/bin/env python3
"""ToolPilot: a local-first, deterministic tool-using assistant.

No API key or external packages required. This is a rule-based agent, not an LLM.
It chooses a tool from a user request, executes it, and returns an auditable trace.
"""
from __future__ import annotations
import argparse
import ast
import json
import operator
import re
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

OPS = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul,
       ast.Div: operator.truediv, ast.FloorDiv: operator.floordiv,
       ast.Mod: operator.mod, ast.Pow: operator.pow}
UNARY = {ast.UAdd: operator.pos, ast.USub: operator.neg}

def safe_calculate(expression: str) -> float | int:
    """Evaluate arithmetic without eval/exec, calls, names, or attribute access."""
    if len(expression) > 180:
        raise ValueError("Expression too long")
    tree = ast.parse(expression, mode="eval")
    def walk(node: ast.AST, depth: int = 0) -> float | int:
        if depth > 20:
            raise ValueError("Expression nesting too deep")
        if isinstance(node, ast.Constant) and type(node.value) in (int, float):
            if abs(node.value) > 1e12:
                raise ValueError("Number too large")
            return node.value
        if isinstance(node, ast.UnaryOp) and type(node.op) in UNARY:
            return UNARY[type(node.op)](walk(node.operand, depth + 1))
        if isinstance(node, ast.BinOp) and type(node.op) in OPS:
            left, right = walk(node.left, depth + 1), walk(node.right, depth + 1)
            if isinstance(node.op, ast.Pow) and (abs(right) > 12 or abs(left) > 1e6):
                raise ValueError("Exponent too large")
            result = OPS[type(node.op)](left, right)
            if abs(result) > 1e15:
                raise ValueError("Result too large")
            return result
        raise ValueError("Only arithmetic expressions are supported")
    return walk(tree.body)

def word_stats(text: str) -> dict:
    words = re.findall(r"\b[\w'-]+\b", text)
    return {"words": len(words), "characters": len(text), "unique_words": len({w.lower() for w in words})}

def extract_tasks(text: str) -> list[str]:
    """Extract explicit checklist or TODO lines only."""
    tasks = []
    for line in text.splitlines():
        match = re.match(r"^\s*(?:[-*]\s*)?(?:\[ \]\s*)?(?:TODO\s*:?\s*|TASK\s*:?\s*)(.+)$", line, re.I)
        if match:
            tasks.append(match.group(1).strip())
    return tasks

@dataclass
class Result:
    request: str
    tool: str
    output: object
    status: str
    trace: list[str]
    timestamp: str

class ToolPilot:
    """Transparent router; tools have no network or filesystem write privileges."""
    def route(self, request: str) -> tuple[str, str]:
        text = request.strip()
        if re.match(r"^(?:calculate|calc|math)\s*:", text, re.I):
            return "calculator", text.split(":", 1)[1].strip()
        if re.match(r"^(?:count words|word count|stats)\s*:", text, re.I):
            return "word_stats", text.split(":", 1)[1].strip()
        if re.match(r"^(?:extract tasks|tasks)\s*:", text, re.I):
            return "task_extractor", text.split(":", 1)[1].strip()
        return "help", text

    def run(self, request: str) -> Result:
        tool, payload = self.route(request)
        trace = ["Received user request", f"Selected tool: {tool}"]
        try:
            if tool == "calculator":
                output = safe_calculate(payload)
            elif tool == "word_stats":
                output = word_stats(payload)
            elif tool == "task_extractor":
                output = extract_tasks(payload)
            else:
                output = {"examples": ["calc: (14 + 6) / 2",
                                       "stats: AI tools improve workflows",
                                       "tasks: TODO: Write tests\\nTODO: Review code"],
                          "note": "This version uses explicit commands; it does not interpret arbitrary natural language."}
            status = "success"
            trace.append("Tool execution succeeded")
        except (ValueError, SyntaxError, ZeroDivisionError, OverflowError) as exc:
            output = {"error": str(exc)}
            status = "error"
            trace.append("Tool execution failed safely")
        return Result(request, tool, output, status, trace, datetime.now(timezone.utc).isoformat())

def main() -> None:
    parser = argparse.ArgumentParser(description="ToolPilot: local tool-routing agent")
    parser.add_argument("request", nargs="?", help="Tool command; omit for interactive mode")
    parser.add_argument("--json", action="store_true", help="Output JSON including trace")
    args = parser.parse_args()
    pilot = ToolPilot()
    if args.request is not None:
        result = pilot.run(args.request)
        print(json.dumps(asdict(result), indent=2) if args.json else result.output)
        return
    print("ToolPilot interactive mode. Type 'exit' to quit.")
    while True:
        try:
            request = input("toolpilot> ")
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if request.strip().lower() in ("exit", "quit"):
            break
        print(json.dumps(asdict(pilot.run(request)), indent=2))

if __name__ == "__main__":
    main()
