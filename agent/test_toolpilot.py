"""Unit tests for ToolPilot. Run: python -m unittest discover -s agent -v"""
import unittest
from toolpilot import ToolPilot, safe_calculate, word_stats, extract_tasks

class CalculatorTests(unittest.TestCase):
    def test_precedence(self):
        self.assertEqual(safe_calculate("2 + 3 * 4"), 14)
    def test_parentheses(self):
        self.assertEqual(safe_calculate("(2 + 3) * 4"), 20)
    def test_negative(self):
        self.assertEqual(safe_calculate("-4 + 2"), -2)
    def test_division(self):
        self.assertEqual(safe_calculate("9 / 3"), 3)
    def test_reject_calls(self):
        with self.assertRaises(ValueError):
            safe_calculate("__import__('os').system('echo unsafe')")
    def test_reject_exponent(self):
        with self.assertRaises(ValueError):
            safe_calculate("2 ** 1000")
    def test_zero_division(self):
        with self.assertRaises(ZeroDivisionError):
            safe_calculate("1/0")
    def test_reject_non_arithmetic(self):
        with self.assertRaises(ValueError):
            safe_calculate("[1, 2, 3]")

class ToolsTests(unittest.TestCase):
    def test_stats(self):
        self.assertEqual(word_stats("Hello hello world")["unique_words"], 2)
    def test_tasks(self):
        self.assertEqual(extract_tasks("TODO: Test code\nTASK: Write docs"), ["Test code", "Write docs"])
    def test_empty_tasks(self):
        self.assertEqual(extract_tasks("No tasks listed"), [])
    def test_route(self):
        self.assertEqual(ToolPilot().run("calc: 2 + 2").output, 4)
    def test_error_trace(self):
        result = ToolPilot().run("calc: 1/0")
        self.assertEqual(result.status, "error")
        self.assertIn("failed safely", result.trace[-1])
    def test_help(self):
        self.assertEqual(ToolPilot().run("hello").tool, "help")
    def test_word_count_route(self):
        self.assertEqual(ToolPilot().run("stats: one two").output["words"], 2)

if __name__ == "__main__":
    unittest.main()
