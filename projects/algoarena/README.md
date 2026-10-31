<div align="center">

<picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-algoarena.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/algoarena.gif" width="100%" alt="algoarena original animated project illustration"/></picture>

**In development** · Java / JDK · [← All projects](../README.md) · [↗ Developer profile](https://github.com/zuhayer03)

</div>

## What it does

An educational Java console program comparing Bubble Sort, Selection Sort, and Insertion Sort using the same seeded random data. Includes correctness checks against Java's standard sorting behavior.

### Features

- Compare three basic sorting algorithms
- Use repeatable random input for comparisons
- Check output against `Arrays.sort`
- Report average timings over several input sizes

## Run locally

Open a terminal in the `projects/algoarena` directory.

```bash
javac AlgoArena.java AlgoArenaTest.java
java AlgoArena
java AlgoArena 10
java AlgoArenaTest
```

**Input:** Run the Java program from this folder with a JDK installed.

**Output:** Console sorting comparisons and timing output

## How it works

```text
Input / configuration
       ↓
Local program logic
       ↓
Sort checks + sample timing
       ↓
Console comparison
```

## Limits and safety

Current code is a console implementation, not a graphical simulator. Small educational timings are not rigorous performance benchmarks. A visualization interface remains a future enhancement.

## Next improvement

Add step-by-step visualizations, clearer result charts, and additional algorithms.

---

<sub>Built for learning and for honest, inspectable software engineering portfolio work. See the source and test files in this directory.</sub>
