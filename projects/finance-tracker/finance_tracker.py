"""Expense summaries and an SVG chart from a CSV file."""
import argparse, csv
from collections import defaultdict
from decimal import Decimal, InvalidOperation
from pathlib import Path
from xml.sax.saxutils import escape

def load_expenses(path):
    totals = defaultdict(lambda: Decimal("0"))
    with Path(path).open(newline="", encoding="utf-8") as stream:
        rows = csv.DictReader(stream)
        if not {"date", "category", "description", "amount"}.issubset(rows.fieldnames or []):
            raise ValueError("CSV requires date, category, description, amount")
        for number, row in enumerate(rows, 2):
            try: amount = Decimal(row["amount"])
            except (InvalidOperation, TypeError) as exc: raise ValueError(f"Bad amount on row {number}") from exc
            if not amount.is_finite() or amount < 0: raise ValueError(f"Bad amount on row {number}")
            totals[(row["category"] or "").strip() or "Other"] += amount
    return dict(totals)

def summarize(totals, budget, income, goal):
    spent = sum(totals.values(), Decimal("0"))
    return {"spent": spent, "remaining": budget-spent,
            "potential_savings": income-spent, "goal_met": income-spent >= goal}

def write_chart(totals, path):
    items = sorted(totals.items(), key=lambda item: (-item[1], item[0]))
    height = max(190, 95 + 46 * len(items))
    maximum = max(totals.values(), default=Decimal("1")) or Decimal("1")
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="820" height="{height}" viewBox="0 0 820 {height}">',
             '<rect width="820" height="100%" fill="#0f172a"/>',
             '<text x="32" y="45" fill="white" font-size="25" font-family="Arial">Spending by category</text>']
    for index, (category, value) in enumerate(items):
        y = 82 + 46 * index
        width = float(value/maximum) * 400
        parts += [f'<text x="32" y="{y+18}" fill="#e2e8f0" font-size="15" font-family="Arial">{escape(category)}</text>',
                  f'<rect x="225" y="{y}" width="{width:.1f}" height="26" rx="5" fill="#38bdf8"/>',
                  f'<text x="{235+width:.1f}" y="{y+18}" fill="white" font-size="14" font-family="Arial">${value:,.2f}</text>']
    parts.append("</svg>")
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(parts)+"\n", encoding="utf-8")

def money(value):
    try: result = Decimal(value)
    except InvalidOperation as exc: raise argparse.ArgumentTypeError("Invalid amount") from exc
    if not result.is_finite() or result < 0: raise argparse.ArgumentTypeError("Amount must be nonnegative")
    return result

def main(argv=None):
    parser = argparse.ArgumentParser(description="Analyze personal expenses")
    parser.add_argument("--file", default=str(Path(__file__).with_name("transactions.csv")))
    parser.add_argument("--budget", type=money, default=Decimal("350"))
    parser.add_argument("--income", type=money, default=Decimal("900"))
    parser.add_argument("--goal", type=money, default=Decimal("400"))
    parser.add_argument("--chart", default="output/spending.svg")
    args = parser.parse_args(argv)
    try: totals = load_expenses(args.file)
    except (OSError, ValueError) as exc: parser.error(str(exc))
    result = summarize(totals, args.budget, args.income, args.goal)
    for category, amount in sorted(totals.items()): print(f"{category}: ${amount:,.2f}")
    print(f"Spent: ${result['spent']:,.2f}; remaining: ${result['remaining']:,.2f}")
    print(f"Potential savings: ${result['potential_savings']:,.2f}; goal met: {result['goal_met']}")
    write_chart(totals, args.chart)
    print(f"Chart written to {args.chart}. Sample figures; not financial advice.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
