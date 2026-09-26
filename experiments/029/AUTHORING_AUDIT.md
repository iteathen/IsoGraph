# Experiment 029 — Core 0.19 Authoring Audit

**Status:** PASS BEFORE EXTERNAL SEMANTIC EXECUTION

## Candidate scope

Core 0.19 has two qualification surfaces:

1. assertion-support / implicit-assertion semantics in sections 1–17;
2. exact source-to-native formula rendering in section 18.

Experiment 029 public controls D01–D18 map one-to-one to the eighteen section-16 qualification targets.

D19–D24 cover section-18 normative boundaries not exhausted by the existing six-rendering ESR campaign:

- skeleton/sidecar completion;
- silent conventional mathematics;
- exact transformation directionality;
- ambiguity/unknown fidelity;
- precision/modality preservation;
- reconstruction-gate/downstream-use discipline.

## Real section-18 predecessor evidence

The ESR 0.1 predecessor promotion is mechanically pinned at blob:

`489be088187329ef3cbcf95d08fe73cd7d026ee8`

It records:

```text
Core requirement:      Core 0.19 section 18
qualified renderings:  6 / 6
Q7 promotion:          PASS
status:                PROMOTED_FOR_DP07_DISCOVERY
```

The ESR campaign used two isolated decoders per translation, deterministic native closure, mutation controls, post-freeze source-aware verification, and explicit promotion.

Experiment 029 does not replay those external calls.

## Case coverage

- D01 explicit provenance;
- D02 exact implicit derivation;
- D03 no hidden premise;
- D04 scope preservation;
- D05 no authority amplification;
- D06 grounded cycle;
- D07 ungrounded cycle;
- D08 QU propagation;
- D09 QU refinement/invariant discharge;
- D10 no invented probability;
- D11 Bayesian implicit chain;
- D12 dependence protection;
- D13 no probabilistic promotion;
- D14 explicit + implicit coexistence;
- D15 discovery neutrality;
- D16 iterative depth;
- D17 operational fixed-point stop;
- D18 failure-to-find honesty;
- D19 skeleton/sidecar rejection;
- D20 silent-math rejection;
- D21 exact-transform directionality;
- D22 ambiguity/QU preservation;
- D23 precision/modality preservation;
- D24 Q0–Q6 gate and downstream barrier.

No listed section-16 target is uncovered.

## Dependency audit

Cold dependency inputs are:

- Core 0.17 qualified base;
- Core 0.18 qualified clarification;
- QU 0.1;
- qualified DP 0.7 only where D15 invokes discovery neutrality;
- Core 0.19 candidate under test.

Bayesian cases use only explicit case-local probability stipulations. No default probability model, prior, independence rule, or threshold is imported.

## Isolation audit

Cold packet contains exactly:

1. Core 0.17;
2. Core 0.18;
3. QU 0.1;
4. DP 0.7;
5. Core 0.19 candidate;
6. Experiment 029 baseline authority;
7. Experiment 029 public cases;
8. Experiment 029 public serializer prompt.

The ESR promotion record is checked mechanically before packet assembly but is not exposed to the semantic decoder as decoder/verifier/oracle evidence.

Excluded:

- hidden assertions;
- scorer and scorer tests;
- author audit;
- prior Experiment 029 evidence;
- ESR decoder/verifier evidence;
- ESR hidden obligations/mutations;
- DP positive-control hidden oracles and scores;
- repository routing/status files.

## Deterministic harness evidence

Scorer TDD:

- RED run `36232210549` failed because scorer implementation was absent;
- GREEN run `36232252544` passed.

Runner TDD:

- RED run `36232312282` failed because runner implementation was absent;
- first GREEN attempt exposed an overbroad `ASSERTIONS` isolation substring;
- narrowed test remained RED in run `36232406409`, confirming the production filter as root cause;
- production filter was narrowed to the specific hidden Experiment 029 path;
- final runner GREEN run `36232436626` passed.

The final deterministic harness verifies:

- perfect synthetic score qualifies;
- wrong semantic answer fails;
- bad self-audit fails;
- duplicate case fails;
- exact cold packet membership/order;
- Core 0.17/Core 0.19 exact blob locks;
- Core 0.18/QU/DP 0.7 hashes;
- 24 public cases;
- ESR six-of-six Q7 predecessor state.

## Resource audit

External semantic budget: one batched decoder output for D01–D24.

Provider retry/failover is infrastructure handling, not repeated semantic sampling for a preferred answer.

No second semantic verifier is planned unless deterministic scoring leaves a real ambiguity.
