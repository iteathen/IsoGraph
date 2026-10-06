# seymour1 post-SCIP exact swap holdout 0.1

**Date:** 2026-10-06
**Status:** frozen before results.

The non-cherry-picked recurrence screen found an exact post-HiGHS swap:
`x858 <-> x867`, inducing exchange of `c1092` / `c1098`.

This holdout asks whether that same two-variable equivalence survives SCIP 10.0.2 presolve with `misc/usesymmetry=0`.

Procedure:

1. presolve official `seymour1` with SCIP symmetry disabled;
2. export the transformed problem to MPS;
3. require both target variables to survive;
4. mechanically certify the target swap by comparing the complete multiset of affected transformed rows after exchanging the variable identities, including row bounds and all coefficients;
5. if exact, add `x858 >= x867`;
6. run five paired 15-second SCIP solves on the same transformed residual with seeds 0..4, presolve and symmetry both disabled.

A missing target variable or failed exact certificate is a negative result for recurrence of this specific symmetry through SCIP presolve. Timings are directional only.
