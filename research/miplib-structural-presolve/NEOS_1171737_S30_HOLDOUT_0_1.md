# neos-1171737 exact S30 fresh-seed holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The independent second-block active-support recurrence found exact post-SCIP active symmetry in `neos-1171737`. The active action-order pass subsequently established:

- largest active variable orbit size: 30;
- exact induced action order: `30!`;
- therefore the induced action on that orbit is the full symmetric group `S_30`.

Fresh SCIP re-entry showed no visible symmetry recovery for this transformed residual.

## Exact treatment

Recompute the result from the official model:

1. SCIP 10.0.2 presolve with symmetry disabled.
2. Export transformed residual.
3. Apply the bulk-materialized active-graph builder.
4. BLISS generators are replay-checked exactly.
5. Compute the largest active orbit.
6. Compute the exact induced permutation-group order with SymPy.
7. Require `|G_O| = 30!`.
8. Sort the orbit lexicographically by variable name and add the chain:

~~~text
x_1 >= x_2 >= ... >= x_30
~~~

Because the induced action is all of `S_30`, every feasible solution orbit contains a representative whose orbit coordinates are sorted in this order; the canonicalization preserves the optimal objective.

## Fresh seeds

Use seeds `3,4,5,6,7`, not used by the earlier 0.3 action-order timing.

For each seed, on the same transformed residual:

- A: fresh SCIP default symmetry, 20-second limit;
- B: SCIP symmetry disabled + exact S30 chain, 20-second limit.

Use one thread. Report gap, bound width, nodes, LP iterations, primal/dual bounds, and wall time.

## Interpretation

Directional confirmation requires lower median gap (or, if both median gaps are zero, lower median wall to optimum) in the exact-chain condition. Five seeds remain exploratory evidence only.
