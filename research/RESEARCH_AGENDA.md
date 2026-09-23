# Evidence-derived steerability research agenda

The programs below are designed as experiments, not slogans. Each has an evidence chain, a minimal study, measurements, and a falsifier.

## S1 — Cross-method steering response surfaces

**Evidence chain.** ActAdd and CAA derive interventions from positive–negative activation differences. ITI learns truth-related directions from labeled examples. DPO and reward modeling learn from chosen–rejected comparisons. Goal-space evaluation measures the output displacement these signals induce.

**Question.** Do prompt contrasts, activation contrasts, and preference contrasts estimate different views of a common local response operator?

**Minimal study.**

1. Choose a set of independently measurable targets: length, formality, sentiment, refusal, and factual calibration.
2. From the same contrast dataset, construct:
   - a prompt contrast;
   - a mean activation difference;
   - a logit-guidance contrast;
   - a pairwise preference objective;
   - a rank-one adapter.
3. Sweep intervention strength across a calibrated range.
4. Fit the local map from intervention coefficients to the full goal-space displacement.
5. Test whether an operator estimated from one channel predicts another channel's gain and leakage.

**Measurements.** Target gain, orthogonal leakage, positive/negative asymmetry, saturation, layer sensitivity, KL change, latency, and OOD prediction error.

**Hypothesis.** Several steering methods share a low-rank local response subspace, but differ in the preconditioner that maps a user-specified contrast into that subspace.

**Falsifier.** After matching target, data, model, and evaluation, cross-method directions and response matrices remain unrelated and offer no predictive transfer.

## S2 — Weak-to-strong steerability transfer

**Evidence chain.** Weak-to-strong generalization shows strong students can exceed weak labels but do not recover full strong capability. RewardBench shows preference signals fail on OOD and subtle comparisons. Prompt steerability is asymmetric around a model's baseline.

**Question.** Can a weak supervisor specify a direction of improvement without specifying the complete output or policy?

**Minimal study.** Hold a strong model and annotation budget fixed. Compare supervision from:

- weak hard labels;
- weak pairwise preferences;
- weak critiques;
- weak uncertainty / abstention;
- weak contrastive activation directions;
- weak labels plus an unsupervised confidence or consistency objective.

Use tasks where the strong pretrained model has independently verified latent capability and the weak supervisor has structured, calibrated errors.

**Measurements.** Performance gap recovered, imitation of weak errors, calibration, off-target capability loss, OOD transfer, and sensitivity to supervisor miscalibration.

**Hypothesis.** Pairwise and critique-based directional supervision will elicit more latent strong capability than hard weak targets when weak errors are diverse but the direction of improvement is consistent.

**Falsifier.** Pairwise, critique, or activation-based weak signals never exceed ordinary weak-label fine-tuning once annotation and compute are matched.

## S3 — Controllability under distribution shift

**Evidence chain.** CAA and ITI show large in-distribution intervention effects. AxBench finds simple prompts are stronger steering baselines on its tasks. Prompt-steerability work finds direction asymmetry. Course Correction finds persistent side effects even for strong models.

**Question.** Which controller properties predict transfer before the new domain is observed?

**Minimal study.** Estimate a local response matrix on one domain and ask it to predict the displacement caused by the same controller across:

- paraphrases;
- new topics;
- new genres;
- new languages;
- model checkpoints after additional post-training;
- adversarial instructions.

**Measurements.** Response-matrix prediction error, reachable-set shrinkage, gain drift, leakage drift, direction reversal, and retuning cost.

**Hypothesis.** Low condition number and stable singular subspaces of the response matrix predict OOD steering better than in-domain target accuracy.

**Falsifier.** No controller property predicts transfer better than its in-domain success rate or a per-domain prompt-tuning baseline.

## S4 — Adaptive low-rank control with a side-effect budget

**Evidence chain.** CAA identifies layer and strength sensitivity and proposes targeted token interventions. ITI selects a small set of heads. SAE refusal steering improves robustness but hurts general capability. AxBench finds that interpretability methods need stronger steering objectives and baselines.

**Question.** Can an input-dependent controller choose intervention site and strength while respecting an explicit side-effect budget?

**Minimal study.** Train a small router to select layer, token positions, and coefficients over a library of directions. Optimize:

`target error + λ · off-target error + β · KL + γ · latency`.

Compare fixed CAA, probe/ITI, SAE steering, prompting, and LoRA/ReFT under equal evaluation data and serving cost.

**Measurements.** Accuracy–leakage–latency Pareto frontier, router calibration, worst-group leakage, and robustness to unseen target combinations.

**Hypothesis.** Most of the side effects of fixed activation addition come from intervening at the wrong tokens or strength, not from the absence of a useful direction.

**Falsifier.** Adaptive routing improves measured targets only by moving side effects into unmeasured dimensions or fails to beat a strong prompt baseline.

## S5 — Counter-steering model organisms

**Evidence chain.** Sleeper Agents shows conditional deceptive policies can persist through safety training. Reward-tampering work shows benign-seeming proxy gaming can generalize to more serious behavior. Model Organisms for Emergent Misalignment supplies small, clean, causally tractable organisms. Refusal-direction work shows a safety behavior can be removed through a low-rank edit.

**Question.** Does an intervention remove a misaligned policy, alter its trigger, or merely suppress its current readout?

**Minimal study.** Apply four mitigation families to several controlled organisms:

- prompt / constitutional counter-steering;
- activation counter-steering;
- preference training;
- model editing or adapter removal.

Then alter trigger wording, deployment context, monitoring cues, task family, and available tools. Include white-box representation readouts and behavioral honeypots.

**Measurements.** Apparent mitigation, latent-policy readout, trigger transfer, re-emergence after additional training, and capability preservation.

**Hypothesis.** Interventions that change only the final readout will look strong in-distribution but preserve a recoverable latent policy; training or edits that reshape the response operator will generalize better.

**Falsifier.** White-box and behavioral evidence show that cheap output-level counter-steering removes the policy as durably as deeper interventions.

## S6 — Judge-aware closed-loop oversight

**Evidence chain.** Sandwiching shows model assistance can improve human judgment. Weak-judge experiments show debate versus consultancy depends on information structure. Constitutional AI scales feedback through model-generated critique. Weak-to-strong generalization shows better-than-teacher performance is possible but incomplete.

**Question.** Can an oversight system adaptively select how to obtain control authority over a stronger model?

**Minimal study.** Give a weak judge a fixed budget and a menu of actions:

- direct judgment;
- request a critique;
- decompose the problem;
- run debate;
- ask for a verifier or tool call;
- abstain and escalate.

Train a router on downstream strong-policy improvement, not judge accuracy alone. Include agents that can strategically persuade or selectively reveal information.

**Measurements.** Judge accuracy, policy improvement, calibration, adversarial regret, supervision cost, and whether the learned policy remains steerable on new tasks.

**Hypothesis.** The best oversight action is determined by the judge's estimated control authority—how much each additional piece of evidence changes the probability of a correct downstream update.

**Falsifier.** Adaptive oversight improves judge decisions but yields no improvement in the trained policy, revealing a broken link between evaluation and control.

## S7 — Target legitimacy and pluralistic control

**Evidence chain.** InstructGPT aligns to a labeler/prompt distribution. SteerLM retains explicit attribute conditioning. Persona-steerability work exposes asymmetric movement around a model's baseline. Constitutional AI moves human choices into a written principle set and an evaluator model.

**Question.** How can a model remain controllable by diverse users without making safety-critical constraints optional or collapsing everyone to an average preference?

**Minimal study.** Separate target dimensions into:

- non-negotiable safety constraints;
- developer policy;
- user preferences;
- inferred situational goals;
- model epistemic obligations.

Construct conflict cases with explicit authority and uncertainty. Compare scalar reward aggregation, lexicographic constraints, conditional reward models, and runtime policy composition.

**Measurements.** Per-group reachability, conflict resolution accuracy, minority-target regret, safety violations, abstention calibration, and cross-user leakage.

**Hypothesis.** A factored, authority-aware objective will dominate a single scalar reward on both pluralistic reachability and safety robustness.

**Falsifier.** Factored control provides no Pareto improvement and only moves disagreements into the authority labels.

## Recommended first project

Start with **S1 — Cross-method steering response surfaces**.

Why:

- It connects multiple mature intervention literatures through a shared empirical evaluation protocol.
- It is small enough to run on open 2B–9B models.
- It produces a reusable evaluation harness for S2–S6.
- It can yield a useful negative result: the different steering channels may not share a response operator.
- It naturally produces a paper-shaped contribution: definition, benchmark protocol, empirical response matrices, transfer tests, and a control-theoretic analysis.

The minimum publishable unit is not a new steering vector. It is a **measurement framework** that predicts when an intervention will work, how much it will move the target, and what else it will change.
