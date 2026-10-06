# Post-SCIP active orbit action-order screen 0.3

**Date:** 2026-10-06  
**Status:** frozen before results.

## Motivation

The stricter transposition-generator screen found no generator that swaps exactly two variables of the largest active orbit while fixing every other active variable. That does **not** establish that the induced action on the orbit is smaller than the full symmetric group: exact generators may permute several active orbits simultaneously.

## Targets

Use the five clear active post-SCIP residual-symmetry misses fixed before this test:

- `n5-3`
- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `ns1208400`

## Exact certificate

For each model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`;
2. capture active transformed variables;
3. export the transformed MPS;
4. drop export-only columns from structural analysis only after proving zero matrix incidence and either zero objective coefficient or fixed domain;
5. build the exact coefficient-colored subdivision graph on active variables;
6. enumerate BLISS generators and replay every generator used for authority;
7. compute the largest nontrivial active-variable orbit `O`;
8. restrict every exact generator to its permutation action on `O`;
9. construct the generated permutation group `G|_O <= S_O` with exact Schreier-Sims arithmetic;
10. compute `|G|_O|`.

If

~~~text
|G|_O| = |O|!
~~~

then `G|_O = S_O` exactly, because it is a subgroup of the symmetric group with the same finite order.

A 120-second group-order budget is allowed per target. Timeout is `INCONCLUSIVE`, never a negative certificate.

## Exact canonicalization

When the induced action is certified as `S_O`, sort the orbit members by fixed lexicographic variable-name order:

~~~text
x_1 >= x_2 >= ... >= x_k
~~~

For every feasible solution, the full induced symmetric action contains a group element that sorts the coordinates on `O`. Applying that automorphism may move other variables/rows, but it preserves feasibility and objective. Therefore the chain retains at least one objective-equal representative of every full-model solution orbit.

## Directional benchmark

For every certified full-symmetric target:

- same SCIP-transformed residual;
- symmetry disabled and presolve disabled;
- seeds 0,1,2;
- 15 seconds per variant;
- baseline versus sorted-orbit chain.

Report gap, absolute primal-dual width, nodes, LP iterations, wall time, chain length, BLISS time, group-order time, and total structural frontend time.

Exactness is independent of benchmark outcome.
