# Post-SCIP full-symmetric-orbit screen 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

Use the eight exact positives from the frozen post-SCIP BLISS recurrence screen:

- `reblock115`
- `n5-3`
- `neos-911970`
- `seymour1`
- `b1c1s1`
- `markshare2`
- `mas74`
- `mas76`

Each is analyzed only after SCIP 10.0.2 presolve with `misc/usesymmetry=0`.

## Exact target

For the largest nontrivial variable orbit `O` returned by replay-verified BLISS generators:

1. inspect every exact generator's action on model-variable vertices;
2. retain generators that swap exactly two variables in `O` and fix every other model variable;
3. create the undirected **transposition graph** on `O`, with an edge for every such exact transposition;
4. if that graph is connected, the available transpositions generate the full symmetric group `S_O` on the orbit.

A connected transposition graph is therefore an exact certificate that the model admits every permutation of the variables in `O` (with the corresponding induced permutations of constraints/coefficient vertices).

## Exact canonicalization

When the full-symmetric certificate holds, sort orbit members by a fixed lexicographic name order:

~~~text
x_1 >= x_2 >= ... >= x_k
~~~

Every feasible solution orbit has a permutation whose orbit-coordinate values are sorted in that order, so the chain preserves at least one representative of every solution orbit and therefore preserves the optimal objective.

## Benchmark subset

For any of the four prior `NO_VISIBLE_SCIP_RECOVERY` cases
(`reblock115`, `n5-3`, `b1c1s1`, `markshare2`)
whose largest orbit is certified fully symmetric, run three paired 10-second SCIP trials (seeds 0,1,2) on the same transformed residual:

- symmetry off, no added constraints;
- symmetry off + full sorting chain.

Detection/build overhead is reported separately. Timing remains directional.

No full-symmetric claim is made from orbit size or generator count alone.
