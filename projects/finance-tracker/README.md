# Finance Tracker

A Python CLI that reads sample expense transactions, groups them by category, calculates remaining budget and possible savings, and generates a standalone SVG spending chart.

## Run

```bash
python finance_tracker.py
python finance_tracker.py --budget 500 --income 1200 --goal 300
python -m unittest discover -p "test_*.py"
```

Edit `transactions.csv` to supply your own data. Required fields: `date,category,description,amount`. Generates `output/spending.svg`. No third-party dependencies. Estimates only use rows from the input file; no banking connection or forecasting.
