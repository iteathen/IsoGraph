# Experiment 031 — Authoring Audit

**Status:** frozen before semantic execution  
**Scope:** public case construction, hidden oracle construction, scorer integrity, and leakage review.

## Separation

Public:
- qualification plan;
- exact current revision map;
- 32 semantic case descriptions;
- serializer key/type contract;
- cold instructions.

Hidden from the decoder:
- `hidden/ASSERTIONS.json`;
- scorer implementation;
- scorer self-test;
- workflow score output;
- all Experiment 031 evidence;
- prior Experiment 027–030 outputs/reviews/evidence.

## Case construction discipline

The cases were authored from current qualified semantic obligations, not from desired prose phrasing by a decoder.

Expected answers were fixed before provider execution.

The holdout deliberately includes:
- permissive cases and rejecting cases;
- exact and incomplete evidence;
- positive and negative QU use;
- positive and negative NEI conclusions;
- positive and rejected TI claims;
- exact and non-exact renderings;
- discovery leads that survive without becoming proof;
- genuine refinement and circular target-driven restriction;
- grounded and ungrounded support cycles.

This prevents qualification from reducing to one repeated polarity.

## Cross-module coverage

- F01–F08: Core 0.18 + Core 0.19 support constitution.
- F09–F14: Core 0.19 + QU/probability/evidence lineage.
- F15–F18: Core 0.19 + NEI/QU.
- F19–F25: Core 0.19 exact rendering + DP 0.7.
- F26–F30: Core 0.19 + DTS + DP/NEI boundaries.
- F31–F32: complete-stack anti-circularity/refinement/history interactions.

## Scorer audit

The hidden scorer:
- requires F01–F32 exactly once and in order;
- requires exact answer-key equality and no extra answer fields;
- checks nontrivial reasons and nonempty authority lists;
- checks seven self-audit flags;
- checks all six module-assessment fields;
- reports category-level failures.

The scorer self-test constructs an oracle-perfect report and requires `QUALIFIES`, then flips F31 `qu_restriction_admissible` and requires `DOES_NOT_QUALIFY` with F31 identified as failed.

## Leakage audit

The runner uses an explicit allowlist of semantic authority + public Experiment 031 inputs.

It forbids:
- hidden files;
- scorer/test files;
- Experiment 031 evidence/review;
- prior experiment evidence/reviews;
- current integration/manifest/status routing documents.

The decoder therefore cannot read the hidden oracle or the historical answer dispositions it is intended to test independently.

## Authority integrity

The runner and workflow both pin all 13 semantic authority SHA-256 values before model execution. Any changed semantic byte invalidates the run before the cold call.

## Disposition discipline

A provider, output-shape, or infrastructure failure is not a semantic failure and must be classified separately.

A semantic mismatch with a valid frozen packet is preserved as evidence and is not repaired by weakening the expected obligation.
