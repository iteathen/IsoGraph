# Experiment 010 — Authoring Audit

**Status:** pre-freeze.

## Leakage

No historical DP experiment result or hidden expected mapping is in the cold packet. D08 step IDs are public, but their correspondence is not supplied in the prompt.

## Scorer contract

Exact enums are public. Free-text reasons are not matched against hidden phrases. D04 accepts either PROMOTED or EXPANDED because both are legal under DP 0.4. D06 accepts DORMANT or INCOMPLETE because missing identity authority may be represented either way without terminal rejection.

## Structural-breaker audit

D02 contains a real ordered-incidence failure under an explicitly active preservation obligation. D03 contains only machinery/decomposition difference. This paired control should detect the R3-style relabeling failure.

## Cross-residual audit

D04 makes a correspondence discovered during the residual pass explicit but does not tell the decoder whether to promote or expand it. Terminal rejection before either action should fail.

## Fresh holdout audit

D08 was created for Experiment 010 and is not a replay of Experiments 007/008. Its expected topology is:

- anchor/candidate setup;
- local budget;
- one atomic composition role versus an explicit bridge/composition/budget subgraph;
- separation/admissibility contradiction;
- uniqueness conclusion.

The scorer checks step-family coverage while preserving the Beta-only explicit bridge decomposition as a residual.

## Overclaim audit

D08 requires semantic rejection of FULL_PROOF_ISOMORPHISM, NATURAL_IDENTITY, SAME_INTERMEDIATE_OBJECTS, and SAME_ALGORITHM through the already public QRC 0.1 recognizer. Exact canonical strings are not required.

## Remaining scope

Passing Experiment 010 qualifies the declared DP behavior; it does not prove exhaustive discovery or universal cross-domain success.
