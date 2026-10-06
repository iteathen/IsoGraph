# n5-3 post-SCIP exact symmetry holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Does the exact higher-order structural symmetry previously found after HiGHS presolve survive a **stronger incumbent presolve** that has already transformed the model?

The target is `n5-3`, because prior controls showed SCIP 10.0.2 did not visibly add symmetry constraints for this instance even though the HiGHS-presolved residual contained a large exact automorphism.

## Frozen pipeline

1. Download the official MIPLIB `n5-3` MPS.
2. Load it in SCIP 10.0.2 / PySCIPOpt 6.2.1.
3. Set `misc/usesymmetry=0`, one thread, fixed seed.
4. Run SCIP presolve to completion.
5. Export the **transformed SCIP problem** to MPS with original-style names retained.
6. Load that transformed MPS only as a neutral linear representation.
7. Construct the exact colored row-variable coefficient graph:
   - variable colors: objective coefficient, lower/upper bounds, integrality;
   - row colors: lower/upper bounds;
   - edge colors: coefficient values.
8. Use six-round coefficient-aware refinement only as a search accelerator, then require full graph-automorphism preservation as the exact certificate.
9. Search up to 60 seconds / 2,000 mappings for the first non-identity automorphism.

## Exact breaker

If an automorphism is found:

- choose the lexicographically first moved variable `x`;
- let `g(x)` be its image;
- verify that their ordered domains and objective coefficients match;
- add `x >= g(x)`.

Because `g` is a finite objective-preserving automorphism, every orbit has a representative satisfying that inequality. The breaker therefore preserves the optimal objective.

## Robustness benchmark

Use the **same exported SCIP-transformed residual** for every solve.

For seeds 0, 1, 2, 3, and 4:

- SCIP symmetry disabled, 15-second baseline;
- SCIP symmetry disabled + exact structural breaker, 15 seconds.

Record primal, dual, gap, nodes, LP iterations, and status. Report all paired trials plus median ratios.

The benchmark is directional. Exactness comes from the coefficient-level automorphism certificate, not from the timing.

## Acceptance

- The transformed MPS must be readable and nonempty.
- The exact graph replay must certify any reported automorphism.
- If no automorphism is found within the frozen search budget, disposition is `INCONCLUSIVE`, not `NO_SYMMETRY`.
- No performance claim is made unless the breaker is exact and all five paired trials complete.
