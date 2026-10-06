# Post-SCIP active full-symmetric canonicalization 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

Use the clear active residual-symmetry misses established before this test:

- `n5-3`
- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `ns1208400`

Each has a replay-verified post-SCIP automorphism moving ACTIVE variables and is classified `NO_VISIBLE_SCIP_RECOVERY` by the corresponding frozen attribution screen.

## Exact structural target

After SCIP 10.0.2 presolve with `misc/usesymmetry=0`:

1. capture SCIP-active transformed variable names;
2. export the transformed MPS;
3. remove an export-only column from structural analysis only after proving it has zero matrix incidence and either zero objective coefficient or a fixed domain;
4. build the exact coefficient-colored subdivision graph on the remaining active variables and all represented rows;
5. run BLISS and replay every generator used for authority;
6. compute the largest nontrivial ACTIVE-variable orbit `O`;
7. retain generators whose action on ACTIVE variables is exactly one transposition inside `O` and fixes every other ACTIVE variable;
8. build the transposition graph on `O`.

If that transposition graph is connected, those exact automorphisms generate the full symmetric group `S_O` on the active-variable orbit.

## Exact canonicalization

For a certified full-symmetric orbit, sort members by a fixed variable-name order and add:

~~~text
x_1 >= x_2 >= ... >= x_k
~~~

Every solution orbit under `S_O` contains a representative whose orbit-coordinate values are sorted in that order. Because every group element preserves the feasible set and objective, the chain preserves the optimal objective.

No full-symmetric claim is inferred from orbit size or generator count alone.

## Controlled benchmark

For every target whose largest active orbit is certified full symmetric:

- same SCIP-transformed residual;
- SCIP presolve disabled and symmetry disabled;
- seeds 0,1,2;
- 15 seconds per variant;
- baseline versus full sorted-orbit chain.

Report relative gap, absolute primal-dual bound width, nodes, LP iterations, wall time, number of added chain constraints, and structural frontend overhead.

Timing is directional. The exact result is the group/canonicalization certificate.
