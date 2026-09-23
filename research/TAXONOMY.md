# Steerability taxonomy

This taxonomy treats steerability as a **control property** of a model–interface–user system, not as a synonym for instruction following or alignment.

## Working definition

Let `z*` be a desired point in a measurable behavioral goal-space, `z0` the unsteered behavior, `u` an intervention, `x` the task and context, and `F(x, u)` the model response mapped back into the goal-space.

The requested and observed displacements are:

`Δz* = z* - z0`

`Δẑ = g(F(x, u)) - z0`

A steering mechanism should be evaluated on at least:

- **reachability** — whether the target is reachable through the allowed intervention channel and budget;
- **gain / calibration** — whether the magnitude of `Δẑ` matches `Δz*`;
- **selectivity** — whether `Δẑ` has small components orthogonal to the request;
- **cost** — data, FLOPs, latency, memory, access level, and user effort;
- **robustness** — whether these properties persist across inputs, users, domains, model versions, and adversaries;
- **reversibility and authority** — whether control can be removed and whether the correct source is allowed to exercise it.

This extends the goal-space framing of Chang et al. (2025) and the producibility-versus-reachability distinction of Vafa et al. (2025).

## Three independent questions

Every paper should be tagged along three different axes rather than forced into one bucket.

### A. What is the target?

- content / topic;
- surface style, length, format, reading level;
- semantic attributes such as truthfulness and groundedness;
- persona, viewpoint, or user preference;
- safety policy, refusal, and authority-sensitive compliance;
- reasoning process, search policy, tool use, or compute allocation;
- factual memory or a local behavior;
- general values or a constitution.

### B. Where does the intervention enter?

- prompt or conversation context;
- decoding logits or candidate selection;
- residual stream, attention head, MLP, or sparse feature;
- an adapter or conditional control token;
- the training distribution or loss;
- a reward / preference signal;
- model parameters;
- external edit memory, retrieval, or policy layer.

### C. What property is being claimed?

- **efficacy** — the target changes;
- **calibration** — intervention strength maps predictably to target movement;
- **specificity** — non-target behaviors are preserved;
- **composition** — multiple controls combine as intended;
- **generalization** — control transfers to new inputs or tasks;
- **persistence** — training-time changes survive later training;
- **robustness** — control survives attacks and distribution shift;
- **efficiency** — effect per unit data, compute, latency, or access.

## Nine operational lenses

### 1. Steering targets

This lens asks what a desired behavioral displacement means and who specifies it. IFEval and FollowBench use explicit constraints. Persona work uses behavioral profiles. SteerLM exposes a multi-attribute schema. Goal-space work makes several continuous output properties jointly measurable.

Open questions:

- Which target dimensions are independently controllable rather than merely statistically decorrelated?
- How should infeasible, contradictory, or underspecified targets be represented?
- When should a model infer latent user preferences, and when must it ask?
- Can target spaces include process properties such as honesty of reasoning, not only final-text features?

### 2. Inference-time steering

The model weights remain fixed while a runtime mechanism changes generation. Examples include prompt control, activation addition, classifier-free guidance, best-of-N selection, and edit memories.

Advantages: reversibility, personalization, rapid iteration, and per-request control.

Failure modes: additional latency, brittle hyperparameters, context sensitivity, saturation, and hidden side effects.

### 3. Representation / activation steering

An internal state is read or modified. ActAdd and CAA use activation differences; ITI uses probe-selected attention-head directions; RepE studies population-level representations; SAE methods intervene on learned sparse features.

The key distinction is between:

- a direction that **predicts** behavior;
- a direction that **causally changes** behavior;
- a direction whose intervention is **specific** to that behavior;
- a direction that is **stable** across contexts and model variants.

These are not equivalent. AxBench supplies a useful warning: on its concept-steering benchmark, prompting outperforms tested representation methods, while representation methods can still excel at concept detection.

### 4. Prompt / context steering

Natural-language instructions, examples, system messages, personas, scratchpads, and constitutions steer behavior through the ordinary model interface.

Prompt steering has low deployment friction and strong baselines. Its main scientific weaknesses are uncontrolled user effort, sensitivity to wording, and the absence of a native authority boundary between instruction and data. Instruction Hierarchy and StruQ address the last issue through training and structured channels.

### 5. Training-time steering

SFT, RLHF, RLAIF, conditional training, adapters, and synthetic curricula change the default policy. Training can produce persistent behavior and amortize inference cost, but it tends to compress a distribution of preferences into one default unless the conditioning variable is preserved.

The central distinction is:

- **improve the default behavior**, versus
- **make behavior controllable at runtime**.

SteerLM explicitly targets the second; standard RLHF usually targets the first.

### 6. Preference / reward steering

Chosen–rejected pairs, rankings, reward models, DPO, constitutions, and AI feedback specify a direction of improvement. They are naturally **comparative** rather than absolute.

Failure modes include reward-model error, preference aggregation, distribution shift, overoptimization, evaluator gaming, and disagreement about whose preferences are represented. RewardBench evaluates preference discrimination; weak-to-strong generalization asks whether weak comparative evidence can elicit a stronger policy.

### 7. Model editing / control

ROME, MEMIT, MEND, and SERAC apply scoped post-hoc changes through weights or memory. Editing is steerability over a narrow target with an explicit persistence requirement.

The scientific challenge is edit scope: efficacy on one prompt is not enough. A good edit should generalize to intended paraphrases and consequences while preserving unrelated behavior. Model editing and activation steering differ mainly in persistence and intervention site, not in the need for locality metrics.

### 8. Evaluation / benchmarks

Current benchmarks measure different projections of the problem:

- IFEval: programmatically verifiable constraints;
- FollowBench: cumulative fine-grained constraints;
- AxBench: concept detection and steering across method families;
- prompt-steerability benchmarks: movement away from a baseline persona;
- Vafa et al.: human reachability of model-produced targets;
- Chang et al.: multi-dimensional steering error, calibration, and side effects;
- RewardBench: the quality of the preference signal.

No single benchmark jointly measures target reachability, calibration, side effects, robustness, cost, and human effort.

### 9. Robustness / generalization

Steering must survive changes in wording, task, domain, language, model version, and adversarial pressure. Robustness also includes **authority correctness**: lower-priority or untrusted inputs should not override higher-priority goals.

Sleeper Agents, reward-tampering work, and model organisms show that a model can appear steerable on the training or audit distribution while retaining a conditional policy that reappears elsewhere.

## Boundaries with neighboring fields

### Steerability versus capability

Capability asks whether a behavior is in the model's producible set. Steerability asks whether a user or controller can reliably reach a requested member of that set within a budget.

### Steerability versus alignment

Alignment supplies or legitimizes the target. Steerability concerns the system's response to a specified target. A model can be steerable toward harmful goals; a model can also have a reasonable average policy while being unsteerable for minority users or unusual valid goals.

### Steerability versus controllability

Controllability is the broader systems concept. In this map, it provides the language of reachable sets, gain, coupling, stability, feedback, and disturbance rejection. LLM steerability is controllability over a partially observed, high-dimensional behavioral state.

### Steerability versus model editing

Editing usually targets a durable, local change; steering often emphasizes reversible runtime control. Both require efficacy, generalization, and locality / side-effect evaluation.
