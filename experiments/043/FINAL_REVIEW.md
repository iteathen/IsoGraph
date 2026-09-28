# Experiment 043 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36355676844, attempt 1
**Frozen source SHA:** 38d7583a62556ffafca5ff4819edb6f8cfba08aa
**Internal parent:** A23 threshold critical-cover representation

## Search surface

- treatment alphabet size: 3;
- candidate path length: 6;
- candidate paths: 96;
- threshold treatment length: 12;
- threshold word universe |U_12|: 6,144;
- deterministic seeded randomized deletion trials: 50,000.

## Best exact critical cover

The search found an inclusion-minimal threshold cover with:

    35 selected paths.

Verification:

- uncovered threshold words: 0;
- private length-12 deletion witnesses: 35 / 35;
- missing private witnesses: 0;
- deletion-witness verification failures: 0.

Therefore every selected path is essential to infeasibility at treatment length 12.

## Next-length feasibility

A full-family solution was found at length 13:

    0102010210210

after checking 567 length-13 run-compressed candidates in the frozen enumeration order.

Because any shorter solution could be extended without destroying subsequence coverage, threshold infeasibility at length 12 excludes every solution of length <=12.

Thus:

    OPT = 13.

By the A23 one-path-deletion criterion:

    witness width = 35.

## Glycan realization

The selected paths map to 35 independent singleton-susceptibility chains of length 6 under the retained target boundary:

    total non-target nodes = 210.

Corrected A8/A20 path-language equivalence therefore transfers the exact path-family result to the frozen glycan model.

## Search-boundary discipline

The randomized deletion process is not claimed to find the largest possible threshold-12 critical cover.

It only generated the candidate. The reported width-35 result is exact because the selected family was independently checked for:

- total threshold coverage;
- one private witness per path;
- and next-length full feasibility.

## Interpretation

The unconditional finite ternary witness-width lower bound rises from 24 (Experiment 042) to 35.

This substantially weakens any algorithmic assumption that a small constant number of branches will usually certify the exact optimum, even though small J_h remained highly effective on the earlier small-state corpus.

Unbounded ternary witness width remains unproved without an additional construction. A22's unboundedness consequence remains conditional on P!=NP and the external PCCSP hardness theorem.