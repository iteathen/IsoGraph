# Discovery Protocols 0.1–0.8 Qualification Review

**Disposition:** QUALIFIED CUMULATIVE STACK  
**Date:** 2026-09-28  
**New successor:** Discovery Protocol 0.8 — clue-preserving discrepancy adjudication  
**Qualified DP 0.8 SHA-256:** `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`

## Predecessor authority

DP 0.1 through DP 0.7 remain qualified under their existing cumulative qualification records.

DP 0.8 is an additive clarification. It does not replace the predecessor discovery protocols and does not become proof authority.

## Independent qualification evidence

### Experiment 050

Fresh principle-level blind mixed holdout:

- 22 public cases;
- 21 valid cases PASS;
- structural guards PASS;
- self-audit PASS;
- one case, E05, rejected as underdetermined because `repair_required` did not identify the repair object.

The 21 valid cases cover section-19 targets 1-4 and 6-22.

Final review:

- `experiments/050/EXPERIMENT_050_FINAL_REVIEW.md`

### Experiment 051

Fresh isolated replacement for section-19 target 5:

- 1 / 1 PASS;
- exact case count PASS;
- self-audit PASS;
- module assessment SUPPORTED.

Final review:

- `experiments/051/EXPERIMENT_051_FINAL_QUALIFICATION_REVIEW.md`

## Earlier non-qualification attempts

Experiment 049 is retained as a failed qualification design:

1. Attempt 1: provider `MAX_TOKENS`; no semantic score.
2. Attempt 2: scorer over-constrained non-normative bookkeeping-label granularity.

Neither attempt is used for promotion.

No old output was retroactively rescored.

## Qualified behavior

Within the exercised scope, DP 0.8 requires discrepancy work to:

- treat disagreement as evidence before classifying it as defect;
- distinguish repair disposition from discovery disposition;
- locate a violated contract before authorizing repair;
- avoid privileging expected output, reference prestige, or historical trust without authority;
- preserve scope distinctions rather than forcing numeric agreement;
- preserve qualified QU realizations when load-bearing;
- avoid inferring NEI sameness from finite agreement alone;
- propagate invalidation from repaired primitive support;
- test whether a structural lead survives, sharpens, changes form, or disappears after repair;
- permit derived discovery views without promoting them into Core merely because they are useful;
- close ordinary errors when their apparent clue disappears under a justified repair;
- preserve surviving structural clues even when a local defect is confirmed.

## Boundary

The DP 0.8 bookkeeping labels remain illustrative research bookkeeping, not a semantic ontology.

DP 0.8 does not own:

- truth;
- proof;
- identity;
- QU resolution;
- Core primitive closure;
- DTS transition anatomy.

Those remain with their qualified owners.

Direct full-stack integration with Core 0.20 is still required before the current family stack is promoted as one integrated authority.
