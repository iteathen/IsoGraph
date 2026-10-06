# n5-3 post-SCIP frozen-witness replay 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

The free automorphism search on the SCIP-transformed `n5-3` model was inconclusive because the first identity mapping itself consumed the search budget. This follow-up does **not** search.

It replays the three previously frozen exact post-HiGHS automorphism witnesses from `higher-aut-run-37532537720-attempt-1` against the SCIP 10.0.2 transformed model produced with `misc/usesymmetry=0`.

For each witness:

1. map every preserved named variable and row according to the frozen witness;
2. extend every unmentioned transformed variable and row by identity;
3. require a bijection;
4. verify objective coefficients, domains, integrality, row bounds, and every coefficient across the entire exported transformed MPS.

A replay PASS proves that exact previously known symmetry survives the stronger SCIP presolve unchanged. A replay failure proves only that this **particular name-preserving extension** is not an automorphism of the SCIP-transformed formulation; it does not prove absence of all symmetry.

If any replay passes, choose its lexicographically first moved variable and add `x >= g(x)`, then run five paired 15-second SCIP solves on the same transformed residual with presolve and symmetry disabled.
