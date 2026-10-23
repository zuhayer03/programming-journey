# Network Monitor

Beginner-friendly Python TCP connectivity monitor. Checks configured host/port pairs, measures connection time on success, and exports CSV and JSON reports.

## Run

```bash
python monitor.py
python -m unittest discover -p "test_*.py"
```

Edit `targets.json` for your own services. Reports appear in `output/latest.csv` and `output/latest.json`. A DOWN result can mean a blocked port or unreachable service; this is **not** an ICMP ping, network-wide uptime monitor, or intrusion-detection system.

Python 3.9+; standard library only. Use only services you own or are permitted to test.
