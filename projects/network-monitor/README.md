<div align="center">

<picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-network-monitor.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/network-monitor.gif" width="100%" alt="network-monitor original animated project illustration"/></picture>

**Working student project** · Python 3.9+ · [← All projects](../README.md) · [↗ Developer profile](https://github.com/zuhayer03)

</div>

## What it does

A small, standard-library Python tool for checking configured TCP host/port connections. It measures connection time when a connection succeeds and exports structured reports.

### Features

- Load host/port targets from `targets.json`
- Attempt TCP connections and record results
- Export CSV and JSON reports to `output/`
- Run the included unit tests

## Run locally

Open a terminal in the `projects/network-monitor` directory.

```bash
python monitor.py
python -m unittest discover -p 'test_*.py'
```

**Input:** Edit `targets.json` and run the monitor from this directory.

**Output:** `output/latest.csv` and `output/latest.json`

### See the idea in motion

<picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/demos/network.png"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/demos/network.gif" width="100%" alt="Sample TCP checks and report generation: an animated sample project walkthrough"/></picture>

<sub>Illustrative animation using sample data — not a recording of a running application. See the real commands and tests above.</sub>

## How it works

```text
Input / configuration
       ↓
Local program logic
       ↓
Connection checks + records
       ↓
CSV / JSON report
```

## Limits and safety

A TCP connection check is not ICMP ping, network-wide uptime monitoring, or an intrusion detection system. A DOWN result can also reflect a blocked port. Test only authorized targets.

## Next improvement

Enhance error messages and improve reporting, without overstating monitoring coverage.

---

<sub>Built for learning and for honest, inspectable software engineering portfolio work. See the source and test files in this directory.</sub>
