# n5-3 composed structural reductions benchmark 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Inputs already established exactly

1. The HiGHS-presolved `n5-3` residual has six disconnected components: one large component and five small components.
2. The residual has an exact automorphism moving 168 variables and 60 rows.
3. The exact breaker selected from that automorphism is `C0012 >= C0039`; the two variables form a two-cycle of the automorphism.

## Question

Do exact factorization and exact symmetry breaking compose constructively?

## Frozen comparison

On one GitHub runner, HiGHS 1.15.1, one thread, presolve disabled, fixed seed 0, run **three 15-second trials per variant**:

A. full residual;  
B. full residual + exact symmetry breaker;  
C. large component + exact optima of all five small components;  
D. large component + exact symmetry breaker + exact optima of all five small components.

The small components are solved once to certified optimality before timed trials. For C/D their exact objective contributions are added back to the large-component primal and dual bounds.

Report every trial and medians for gap, nodes, LP iterations, primal and dual bounds.

The exactness of the transformations is independent of timing. This experiment tests whether their empirical effects combine on this instance.
