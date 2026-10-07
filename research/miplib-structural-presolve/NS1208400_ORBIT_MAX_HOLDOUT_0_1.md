# ns1208400 post-SCIP orbit-max holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Why this target

The independent second-block active-support recurrence found:

- exact active post-SCIP symmetry;
- 7 active-moving BLISS generators;
- largest active variable orbit size 24;
- fresh SCIP re-entry showed no visible symmetry recovery.

The earlier 10-second single-breaker value test was uninformative: all variants retained effectively unbounded/huge reported gap. This holdout uses a stronger exact orbit-level canonicalization.

## Exact treatment

1. Official MIPLIB `ns1208400`.
2. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
3. Export transformed residual.
4. Keep only SCIP-active transformed variables after proving every dropped export-only column is isolated and zero-cost or fixed.
5. Build the exact coefficient-colored graph with the optimized bulk builder.
6. Run BLISS and replay every generator.
7. Compute exact active variable orbits.
8. Require the largest nontrivial orbit to have size 24.
9. Choose its lexicographically smallest variable `r`.
10. Add `x_r >= x_j` for every other variable `j` in that orbit.

The orbit-max constraints are objective-preserving: for every feasible solution, choose a maximal coordinate in the orbit and apply an automorphism mapping that coordinate to `r`.

## Holdout

Seeds: `3,4,5`.

On the same transformed residual, 45 seconds per variant:

- A: fresh SCIP default symmetry, normal presolve;
- B: SCIP symmetry disabled + exact orbit-max constraints, normal presolve.

Alternate execution order by seed parity. Report status, primal, dual, gap, bound width, nodes, LP iterations, solver wall, structural frontend wall, and IG end-to-end wall.

## Directional signal

If neither variant has a finite incumbent on at least two seeds, classify the test `UNINFORMATIVE_HORIZON`.

Otherwise, IG is a directional win only if it has lower median finite bound width/gap and wins at least 2/3 paired seeds.
