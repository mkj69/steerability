# Steerability Research Map

An evidence-backed research map of controllable language-model behavior.

**Live site:** <https://mkj69.github.io/steerability/>

The map separates model capability from target reachability and organizes the field through nine lenses: steering targets, inference-time steering, representation and activation steering, prompt and context steering, training-time steering, preference and reward steering, model editing and control, evaluation and benchmarks, and robustness and generalization.

## What is included

- An interactive research map and conceptual goal-space control lab.
- A searchable database of 32 representative papers.
- Paper-level records for experiments, limitations, and proposed future work.
- Evidence-backed connections to weak-to-strong generalization, alignment, control theory, model organisms, and scalable oversight.
- A falsifiable research agenda for comparing steering mechanisms and their robustness.

## Research notes

- [`research/START_HERE.md`](research/START_HERE.md) — four reading routes.
- [`research/TAXONOMY.md`](research/TAXONOMY.md) — operational taxonomy and boundaries.
- [`research/RESEARCH_AGENDA.md`](research/RESEARCH_AGENDA.md) — experiment-ready research programs.
- [`data/steerability-papers.json`](data/steerability-papers.json) — structured paper knowledge base.

## Evidence standard

- **DIRECT** — explicitly reported by the cited paper.
- **SYNTHESIS** — an inference supported across multiple papers.
- **HYPOTHESIS** — a falsifiable proposal, with a result that would count against it.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://127.0.0.1:8000/>.

## Data validation

```bash
python3 scripts/validate.py
```

Maintained by [@mkj69](https://github.com/mkj69).
