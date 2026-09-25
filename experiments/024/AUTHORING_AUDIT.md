# Experiment 024 — Authoring Audit

**Status:** deterministic pre-trigger review

Experiment 024 corrects the specific public-output-contract defect identified in Experiment 021.

## Public contract

The eight required pair/view comparisons are explicitly listed in:

`experiments/024/COMPARISON_REQUESTS.json`

The public contract does **not** reveal:
- expected TI / REJECTED / INCOMPLETE dispositions;
- required residuals;
- required QU dependencies;
- expected breaker text;
- expected common-structure mapping.

## Frozen semantic inputs

The experiment reuses the exact frozen Experiment 021:
- transition corpus;
- comparison views;
- DTS 0.1 candidate.

No semantic transition representation was modified to make the corrected scorer pass.

## Hidden controls

The hidden assertions preserve the original eight Experiment 021 expected dispositions/evidence-shape requirements.

The scorer requires:
- all eight public request IDs exactly once;
- exact public pair/view echo;
- hidden disposition match;
- common structure for TI;
- concrete breaker for REJECTED;
- residual/QU evidence where hidden obligations require it;
- all public self-audit guards.

The scorer self-test accepts a perfect report and rejects an incorrect process-view TI for T04A/T04B.

## Isolation

The cold packet excludes hidden assertions, scorer, this audit, prior Experiment 024 evidence, and Experiment 021 hidden expected results.
