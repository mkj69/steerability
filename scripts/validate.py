import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data" / "steerability-papers.json"
papers = json.loads(path.read_text())

required = {
    "id", "title", "year", "authors", "venue", "url", "categories", "target",
    "intervention", "timing", "role", "finding", "experiments", "limitation", "future",
}
categories = {
    "steering-targets", "inference-time-steering", "representation-activation-steering",
    "prompt-context-steering", "training-time-steering", "preference-reward-steering",
    "model-editing-control", "evaluation-benchmarks", "robustness-generalization",
}
roles = {"core", "root", "bridge", "adjacent"}
seen = set()

assert isinstance(papers, list) and papers, "paper database must be a non-empty list"
for index, paper in enumerate(papers):
    missing = required - paper.keys()
    assert not missing, f"entry {index} missing {sorted(missing)}"
    assert paper["id"] not in seen, f"duplicate id: {paper['id']}"
    seen.add(paper["id"])
    assert paper["url"].startswith("https://"), paper["url"]
    assert set(paper["categories"]) <= categories, paper["id"]
    assert paper["role"] in roles, paper["id"]

print(f"validated {len(papers)} papers across {len(categories)} lenses")
