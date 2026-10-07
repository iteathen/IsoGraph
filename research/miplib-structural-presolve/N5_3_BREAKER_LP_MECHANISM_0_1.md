# n5-3 exact breaker LP-mechanism test 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Why can the two exact active-symmetry breakers change mixed-integer solve performance?

Test whether they strengthen the continuous relaxation of the same post-SCIP residual, or whether their effect is primarily symmetry pruning in the integer search.

## Frozen model

1. Official MIPLIB `n5-3`.
2. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
3. Export the transformed residual.
4. Recompute exact active-support BLISS symmetry and require the same two replay-certified breakers:
   - `t_C0021 >= t_C0026`
   - `t_C0027 >= t_C0028`

## LP variants

Using HiGHS 1.15.1 with the same residual, presolve disabled and integrality relaxed:

- A: no symmetry breaker;
- B: first exact breaker only;
- C: both exact breakers.

Record LP objective, status, iterations, and wall time.

For a minimization problem, a larger LP objective is a tighter lower bound. For maximization, the comparison reverses.

This is a mechanism test only. Exact integer-objective preservation is inherited from the independently replayed automorphism certificates.
