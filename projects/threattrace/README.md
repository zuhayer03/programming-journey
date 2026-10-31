<div align="center">

<picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-threattrace.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/threattrace.gif" width="100%" alt="threattrace original animated project illustration"/></picture>

**Functional prototype** · Java / JDK · [← All projects](../README.md) · [↗ Developer profile](https://github.com/zuhayer03)

</div>

## What it does

A Java CLI prototype that processes synthetic login-event CSV records, counts failed attempts by IP address, and flags IPs when a configurable threshold is reached.

### Features

- Parse synthetic authentication records
- Count repeated failed logins by IP
- Raise rule-based threshold alerts
- Run test cases without network access

## Run locally

Open a terminal in the `projects/threattrace` directory.

```bash
javac ThreatTrace.java ThreatTraceTest.java
java ThreatTrace
java ThreatTrace sample_logins.csv 3
java ThreatTraceTest
```

**Input:** A CSV with `timestamp,ip,event`, and `FAIL` / `SUCCESS` event values.

**Output:** Console summaries and rule-based alerts

## How it works

```text
Input / configuration
       ↓
Local program logic
       ↓
Per-IP attempt counting
       ↓
Console alerts
```

## Limits and safety

Demonstration data is synthetic. This is not a production security tool, live monitor, identity attribution system, or threat detection guarantee.

## Next improvement

Improve input validation, modularity, and tests before exploring richer detection rules.

---

<sub>Built for learning and for honest, inspectable software engineering portfolio work. See the source and test files in this directory.</sub>
