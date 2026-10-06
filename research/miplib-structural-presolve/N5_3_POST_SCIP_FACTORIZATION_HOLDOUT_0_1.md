# n5-3 post-SCIP factorization holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Does the exact disconnected-component factorization previously found after HiGHS presolve survive SCIP 10.0.2 presolve with symmetry handling disabled?

## Pipeline

1. Download official MIPLIB `n5-3`.
2. SCIP 10.0.2 presolve with `misc/usesymmetry=0`, one thread, fixed seed.
3. Export the transformed problem to MPS.
4. Build the exact row-variable incidence graph of that transformed model.
5. Count connected components containing at least one row or variable.
6. Record component dimensions and nonzeros.

Multiple disconnected nontrivial components are an exact factorization certificate because no constraint couples variables across components and the linear objective is additive.

## Interpretation

- `EXACT_POST_SCIP_FACTORIZATION`: two or more nontrivial components survive.
- `NO_POST_SCIP_FACTORIZATION`: SCIP has removed or coupled away the previous decomposition in its transformed formulation.

This is a structural holdout only. A positive result becomes a separate timing experiment; a negative result means the earlier HiGHS-residual factorization is not a stronger-SCIP opportunity in that form.
