# ThreatTrace — Java Security Log Analyzer

Java command-line **prototype** that parses synthetic login-event CSV data, counts failed login attempts by IP, and raises a rule-based alert when a configurable threshold is reached.

## Run

```bash
javac ThreatTrace.java ThreatTraceTest.java
java ThreatTrace
java ThreatTrace sample_logins.csv 3
java ThreatTraceTest
```

Input header must be `timestamp,ip,event` with `FAIL` and `SUCCESS` events. This is an educational rules engine, not a production security tool or attack attribution system. No real accounts or network traffic are accessed.
