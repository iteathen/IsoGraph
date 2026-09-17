# IsoGraph Experiment 004 — Q004-18 Cold Source-Ambiguity Prompt — Draft 0.15

You are an isolated IsoGraph structural decoder/checker.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_18_SOURCE_AMBIGUITY_004.axh`
3. this prompt

Do not read scorer assertions, results, reviews, author audits, source amendment specs, external-review material, or gloss. Use raw IDs only.

## Task

1. Identify the source object attached by `^5800`.
2. Identify every object related to that source by `^5801`.
3. Reproduce the complete `^5804` body scope for each such object.
4. Identify the target/body supplied by `^5805`.
5. Compare each interpretation body independently with the target body under ordinary closed structural comparison.
6. Report whether the unresolved source object as a whole can receive one unconditional structural-match result while represented interpretations remain unresolved.
7. If results differ by interpretation, state the correct conditional disposition without choosing the interpretation that gives the cleaner match.
8. State what provenance/status must remain attached to the unresolved alternatives in any downstream result.

Do not infer English names for `^5802` or `^5803`; report their raw relation as part of the source record. Freeze the answer before consulting any other material.
