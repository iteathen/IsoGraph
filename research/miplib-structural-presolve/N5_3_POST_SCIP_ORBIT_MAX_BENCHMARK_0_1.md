# n5-3 post-SCIP orbit-max symmetry benchmark 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Established input

The post-SCIP BLISS holdout proved that the SCIP 10.0.2 transformed `n5-3` model, with `misc/usesymmetry=0`, has 208 exact variable-moving automorphism generators. Every accepted generator preserves the exact colored subdivision graph encoding of objective coefficients, variable domains/integrality, row bounds, and every matrix coefficient.

A single exact breaker produced mixed performance. This experiment uses a stronger but still exact orbit-level canonicalization.

## Exact orbit-max law

Let `G` be the exact automorphism group and `O` one orbit of model variables under `G`.

Choose one representative `r in O`. Add:

~~~text
x_r >= x_j    for every j in O \ {r}
~~~

For any feasible solution, choose an orbit coordinate whose value is maximal. Because all members of `O` lie in one group orbit, some automorphism maps that coordinate to `r`. The transformed solution has the same objective and feasibility, and `x_r` is then at least every other coordinate in `O`. Therefore every solution orbit has a representative satisfying all orbit-max inequalities.

This is objective-preserving symmetry breaking. It is not a claim that every feasible assignment survives.

## Frozen selection

- Compute variable orbits from the exact BLISS generators and their inverses.
- Select the largest nontrivial variable orbit.
- Tie-break by lexicographically smallest sorted variable-name tuple.
- Choose the lexicographically smallest variable in that orbit as representative.

## Controlled benchmark

On the same exported SCIP-transformed residual, with SCIP presolve and symmetry handling disabled:

For seeds 0..4, run 15 seconds each:

A. baseline;  
B. the previously used single exact pairwise breaker;  
C. the exact orbit-max breaker set.

Record primal, dual, gap, nodes, LP iterations, and wall time. Report all paired trials and medians.

The BLISS detection/encoding overhead is also reported. Timing is directional; exactness is structural.
