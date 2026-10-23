import json
import tempfile
import unittest
from pathlib import Path
import monitor

class DummySocket:
    def __enter__(self): return self
    def __exit__(self, *_): return False

class MonitorTests(unittest.TestCase):
    def test_up(self):
        row = monitor.check_target("test", "127.0.0.1", 80, connector=lambda *a, **k: DummySocket())
        self.assertEqual(row["status"], "UP")
        self.assertIsInstance(row["response_ms"], float)

    def test_down(self):
        def fail(*a, **kw): raise ConnectionRefusedError("refused")
        row = monitor.check_target("test", "127.0.0.1", 80, connector=fail)
        self.assertEqual(row["status"], "DOWN")
        self.assertIsNone(row["response_ms"])

    def test_reports(self):
        with tempfile.TemporaryDirectory() as name:
            monitor.save_reports([monitor.check_target("a", "local", 80, connector=lambda *a, **k: DummySocket())], name)
            self.assertEqual(len(json.loads((Path(name)/"latest.json").read_text())), 1)
            self.assertIn("status", (Path(name)/"latest.csv").read_text())

    def test_invalid_port(self):
        with tempfile.TemporaryDirectory() as name:
            path=Path(name)/"targets.json"
            path.write_text('[{"label":"bad","host":"host","port":99999}]')
            with self.assertRaises(ValueError): monitor.load_targets(path)

if __name__ == "__main__": unittest.main()
