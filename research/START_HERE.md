# Steerability: start here

This guide is organized by research question rather than chronology. The website's paper library contains the corresponding records for experiments, limitations, and future work.

## Route A — What is steerability? (90 minutes)

Read this route before choosing a mechanism. It prevents “the output looks different” from being mistaken for controlled behavior.

1. [What's Producible May Not Be Reachable](https://arxiv.org/abs/2503.17482) — separates model capability from a user's ability to reach a target.
2. [A Course Correction in Steerability Evaluation](https://arxiv.org/abs/2505.23816) — models steering as movement in a multi-dimensional goal-space and decomposes error into miscalibration and side effects.
3. [Evaluating the Prompt Steerability of Large Language Models](https://arxiv.org/abs/2411.12405) — measures directional and asymmetric persona movement.
4. [FollowBench](https://arxiv.org/abs/2310.20410) — shows why aggregate instruction-following scores hide failures on individual constraints.

**Carry forward:** a steerability result should specify a target, intervention channel, budget, context distribution, gain along the target axis, and leakage into unrequested axes.

## Route B — Do models have internal steering handles? (2–3 hours)

1. [Activation Addition](https://arxiv.org/abs/2308.10248) — the cleanest introduction to contrast-derived directions.
2. [Contrastive Activation Addition](https://arxiv.org/abs/2312.06681) — broader behavioral tests, transfer to open-ended generation, and useful limitations.
3. [Inference-Time Intervention](https://arxiv.org/abs/2306.03341) — head-level truthfulness intervention and the accuracy tradeoff.
4. [Representation Engineering](https://arxiv.org/abs/2310.01405) — a broad framework for population-level representations.
5. [Refusal in Language Models Is Mediated by a Single Direction](https://arxiv.org/abs/2406.11717) — an unusually strong linear control result and a warning about safety fragility.
6. [AxBench](https://arxiv.org/abs/2501.17148) — a necessary corrective: on its benchmark, prompting and finetuning beat the tested representation-steering methods.

**Carry forward:** linear decodability or editability is evidence for a useful handle, not proof that the underlying mechanism is one-dimensional. Always compare against prompt and finetuning baselines, report capability change, and measure off-target behavior.

## Route C — How does steering become alignment? (2–3 hours)

1. [InstructGPT](https://arxiv.org/abs/2203.02155), [Constitutional AI](https://arxiv.org/abs/2212.08073), and [DPO](https://arxiv.org/abs/2305.18290) — three ways to turn preferences or principles into policy changes.
2. [Instruction Hierarchy](https://arxiv.org/abs/2404.13208) and [StruQ](https://arxiv.org/abs/2402.06363) — robust steering requires authority and provenance, not just semantic instruction following.
3. [Weak-to-Strong Generalization](https://arxiv.org/abs/2312.09390) and [Weak LLMs Judging Strong LLMs](https://arxiv.org/abs/2407.04622) — supervision is a low-bandwidth controller over a more capable learner.
4. [Sleeper Agents](https://arxiv.org/abs/2401.05566) and [Sycophancy to Subterfuge](https://arxiv.org/abs/2406.10162) — apparent behavioral correction may suppress a readout while preserving the conditional policy.
5. [Model Organisms for Emergent Misalignment](https://arxiv.org/abs/2506.11613) — controlled failure modes make causal evaluation of counter-steering possible.

**Carry forward:** alignment chooses and legitimizes targets; steerability asks whether a bounded intervention reaches them; robustness asks whether control survives shift, attack, and strategic adaptation.

## Reading discipline

For every paper, record five things separately:

1. the target and intervention budget;
2. the strongest direct result;
3. the experimental distribution and baselines;
4. the most consequential limitation or missing measurement;
5. one follow-up with a result that could disconfirm the motivating claim.

The structured source for those records is [`docs/data/steerability-papers.json`](../docs/data/steerability-papers.json). Do not promote a paper's framing, an author's future-work suggestion, or this repository's synthesis to a direct empirical finding.
