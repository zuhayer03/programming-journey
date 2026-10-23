import tempfile
import unittest
from decimal import Decimal
from pathlib import Path
from finance_tracker import load_expenses, summarize, write_chart, money

class FinanceTests(unittest.TestCase):
    def test_summary(self):
        result=summarize({"Food": Decimal("20.50")}, Decimal("100"), Decimal("200"), Decimal("100"))
        self.assertEqual(result["remaining"], Decimal("79.50"))
        self.assertTrue(result["goal_met"])

    def test_csv(self):
        with tempfile.TemporaryDirectory() as name:
            path=Path(name)/"data.csv"
            path.write_text("date,category,description,amount\n2026-10-01,Food,Lunch,7.25\n")
            self.assertEqual(load_expenses(path)["Food"], Decimal("7.25"))
            path.write_text("date,category,description,amount\n2026-10-01,Food,Lunch,-7\n")
            with self.assertRaises(ValueError): load_expenses(path)

    def test_svg_escaping(self):
        with tempfile.TemporaryDirectory() as name:
            path=Path(name)/"chart.svg"
            write_chart({"Food & drink": Decimal("20")}, path)
            self.assertIn("Food &amp; drink", path.read_text())

    def test_money(self):
        self.assertEqual(money("2.5"), Decimal("2.5"))

if __name__ == "__main__": unittest.main()
