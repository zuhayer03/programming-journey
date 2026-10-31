<div align="center">

<a href="https://github.com/zuhayer03"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/identity.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/identity.gif?v=studio" width="100%" alt="Zuhayer Alam Faiyaz — creative engineering studio"/></picture></a>

# Programming Journey

**A small, evolving collection of useful software.**

Computer Science at Kettering University · Java, Python, systems and creative engineering

[**Portfolio ↗**](https://zuhayer03.github.io/programming-journey/) &nbsp; · &nbsp; [**Interactive Lab ↗**](https://zuhayer03.github.io/programming-journey/lab.html) &nbsp; · &nbsp; [**3D Tool Dashboard ↗**](https://zuhayer03.github.io/programming-journey/dashboard.html) &nbsp; · &nbsp; [**GitHub Profile ↗**](https://github.com/zuhayer03)

[![Project tests](https://github.com/zuhayer03/programming-journey/actions/workflows/portfolio-tests.yml/badge.svg)](https://github.com/zuhayer03/programming-journey/actions/workflows/portfolio-tests.yml)
[![Site quality](https://github.com/zuhayer03/programming-journey/actions/workflows/site-quality.yml/badge.svg)](https://github.com/zuhayer03/programming-journey/actions/workflows/site-quality.yml)
[![Deploy](https://github.com/zuhayer03/programming-journey/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/zuhayer03/programming-journey/actions/workflows/deploy-pages.yml)

</div>

---

<div align="center">

<a href="projects/"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/demos/project-reel.png"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/demos/project-reel.gif" width="100%" alt="Animated four-project reel illustrating networks, budgeting, sorting algorithms and synthetic security logs"/></picture></a>

<sub>FOUR PROJECTS · FOUR DIFFERENT PROBLEMS · ONE LEARNING JOURNEY</sub>

</div>

### 01 / The projects

A collection of practical student projects in **networking, finance, algorithms, and security**. Each project has readable source code and instructions to run or test it. The illustrations are animated, but the project descriptions refer to the actual implementations.

<table width="100%">
<tr>
<td width="50%" valign="top">
<a href="projects/network-monitor/"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-network-monitor.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/network-monitor.gif" width="100%" alt="Network Monitor: Python · TCP connectivity checks, connection-time measurements, CSV/JSON reports"/></picture></a>
<sub><strong>Working student project</strong> · Python · TCP connectivity checks, connection-time measurements, CSV/JSON reports</sub>

<strong><a href="projects/network-monitor/">Explore source & tests →</a></strong>
</td>
<td width="50%" valign="top">
<a href="projects/finance-tracker/"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-finance-tracker.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/finance-tracker.gif" width="100%" alt="Finance Tracker: Python · Local budgets, spending summaries and SVG charts"/></picture></a>
<sub><strong>Working student project</strong> · Python · Local budgets, spending summaries and SVG charts</sub>

<strong><a href="projects/finance-tracker/">Explore source & tests →</a></strong>
</td>
</tr>
<tr>
<td width="50%" valign="top">
<a href="projects/algoarena/"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-algoarena.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/algoarena.gif" width="100%" alt="AlgoArena: Java · Sorting-algorithm comparisons and educational timing tests"/></picture></a>
<sub><strong>In development</strong> · Java · Sorting-algorithm comparisons and educational timing tests</sub>

<strong><a href="projects/algoarena/">Explore source & tests →</a></strong>
</td>
<td width="50%" valign="top">
<a href="projects/threattrace/"><picture><source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/zuhayer03/zuhayer03/main/assets/feature-threattrace.svg"/><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/animated/threattrace.gif" width="100%" alt="ThreatTrace: Java · Synthetic login-log analysis and repeated-failure alerts"/></picture></a>
<sub><strong>Functional prototype</strong> · Java · Synthetic login-log analysis and repeated-failure alerts</sub>

<strong><a href="projects/threattrace/">Explore source & tests →</a></strong>
</td>
</tr>
</table>

### 02 / Try it in your browser

The [**Creative Engineering Lab**](https://zuhayer03.github.io/programming-journey/lab.html) includes four independent interactive demos: sorting operations, fictional network checks, synthetic login events, and a sample budget. These browser experiments illustrate ideas from the projects above; they are not the same programs as the Java/Python command-line implementations.

[Launch the Lab →](https://zuhayer03.github.io/programming-journey/lab.html) · [Explore the 29-tool dashboard →](https://zuhayer03.github.io/programming-journey/dashboard.html) · [Watch the full GIF gallery →](MOTION_GALLERY.md)

### 03 / Find your way around

| Start here | What's inside |
|:--|:--|
| [**projects/**](projects/) | The four featured student programs, with source, examples and tests |
| [**agent/**](agent/) | ToolPilot — a deterministic, rule-based Python tool router |
| [**java/**](java/) · [**dsa/**](dsa/) | Java coursework and algorithm practice |
| [**python/**](python/) | Python learning exercises |
| [**docs/**](docs/) | Portfolio site, interactive lab and the tool dashboard |
| [**LEARNING_LOG.md**](LEARNING_LOG.md) | Notes on the learning process |

### 04 / Run it yourself

<details>
<summary><strong>Watch the development workflow — an original animated GIF</strong></summary>

<div align="center"><img src="https://raw.githubusercontent.com/zuhayer03/zuhayer03/output/build-pipeline.gif" width="100%" alt="An animated illustration of a software project flowing from code through building and testing to delivery"/></div>

</details>

Choose a project, open its folder, and follow its README. For example:

**Try Network Monitor (Python)**

```bash
cd projects/network-monitor
python monitor.py
python -m unittest discover -p 'test_*.py'
```

**Try ThreatTrace (Java)**

```bash
cd projects/threattrace
javac ThreatTrace.java ThreatTraceTest.java
java ThreatTraceTest
```

Open any project directory and follow its own README. The Java projects require a JDK; the Python programs use the standard library. Tests are kept with the projects, and the GitHub Actions badges above show the latest checks.

**Scope matters:** the budget and security examples use local/sample data, not real banking accounts or live authentication systems. AlgoArena is still in development.

---

<div align="center">

*Build thoughtfully. Test what you build. Improve a little every week.*

[Portfolio](https://zuhayer03.github.io/programming-journey/) · [Source projects](projects/) · [LinkedIn](https://www.linkedin.com/in/zuhayer-alam-faiyaz-8bb1a3442/)

</div>
