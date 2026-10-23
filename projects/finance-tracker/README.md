<div align="center">

<img src="../../assets/cards/finance-tracker.svg" width="100%" alt="Finance Tracker original project banner" />

**Working student project** · Python · [← All projects](../README.md) · [↗ Developer profile](https://github.com/zuhayer03)

</div>

## What it does

A local command-line finance tracker using CSV expense data to group spending, compare totals to a budget, and build a simple SVG category chart.

### Features

- Read expenses from a CSV file
- Summarize spending by category
- Calculate remaining budget and potential savings
- Create a standalone SVG spending chart

## Run locally

Open a terminal in the `projects/finance-tracker` directory.

```bash
python finance_tracker.py
python finance_tracker.py --budget 500 --income 1200 --goal 300
python -m unittest discover -p 'test_*.py'
```

**Input:** Edit `transactions.csv` using the columns `date,category,description,amount`.

**Output:** `output/spending.svg`

## How it works

```text
Input / configuration
       ↓
Local program logic
       ↓
Expense grouping + calculations
       ↓
Summary + SVG chart
```

## Limits and safety

This project is an educational local CLI, not a banking integration, financial advisor, or forecasting product. Calculations use only the supplied input data.

## Next improvement

Add better validation and richer budget visualizations.

---

<sub>Built for learning and for honest, inspectable software engineering portfolio work. See the source and test files in this directory.</sub>
