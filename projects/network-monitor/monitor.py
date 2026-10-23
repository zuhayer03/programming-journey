"""Check TCP services and export status reports."""
import argparse, csv, json, socket, time
from datetime import datetime, timezone
from pathlib import Path

FIELDS = ["time_utc", "label", "host", "port", "status", "response_ms", "error"]

def check_target(label, host, port, timeout=2.0, connector=None):
    connector = connector or socket.create_connection
    start = time.perf_counter()
    try:
        with connector((host, port), timeout=timeout):
            latency = round((time.perf_counter() - start) * 1000, 2)
        status, error = "UP", ""
    except OSError as exc:
        latency, status, error = None, "DOWN", str(exc)
    return {"time_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "label": label, "host": host, "port": port, "status": status,
            "response_ms": latency, "error": error}

def load_targets(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(data, list) or not data:
        raise ValueError("Targets file must contain a nonempty JSON list")
    targets = []
    for item in data:
        if not isinstance(item, dict) or not all(k in item for k in ("label", "host", "port")):
            raise ValueError("Each target needs label, host, and port")
        if not isinstance(item["port"], int) or not (1 <= item["port"] <= 65535):
            raise ValueError("Port must be an integer from 1 to 65535")
        if not isinstance(item["host"], str) or not item["host"].strip():
            raise ValueError("Host must be a nonempty string")
        targets.append((str(item["label"]), item["host"], item["port"]))
    return targets

def save_reports(results, output):
    output = Path(output)
    output.mkdir(parents=True, exist_ok=True)
    with (output / "latest.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(results)
    (output / "latest.json").write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")

def main(argv=None):
    parser = argparse.ArgumentParser(description="Check TCP services and export results")
    parser.add_argument("--targets", default=str(Path(__file__).with_name("targets.json")))
    parser.add_argument("--output", default="output")
    parser.add_argument("--timeout", type=float, default=2.0)
    args = parser.parse_args(argv)
    if args.timeout <= 0:
        parser.error("--timeout must be greater than zero")
    try:
        targets = load_targets(args.targets)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        parser.error(str(exc))
    results = [check_target(*target, timeout=args.timeout) for target in targets]
    save_reports(results, args.output)
    for row in results:
        latency = f" ({row['response_ms']} ms)" if row["response_ms"] is not None else ""
        print(f"{row['label']}: {row['status']}{latency}")
    print(f"Services UP: {sum(r['status'] == 'UP' for r in results)}/{len(results)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
