# n5-3 original-model automorphism replay 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Are any of the exact post-HiGHS `n5-3` automorphisms already exact automorphisms of the original official MIPLIB model?

This avoids expensive rediscovery after SCIP presolve. It replays previously frozen, exact variable/row permutations against the original coefficient system.

## Frozen witnesses

Use the three non-identity witnesses preserved in:

`evidence/higher-aut-run-37532537720-attempt-1/RESULT.json`

No new mapping is searched for in this experiment.

## Exact replay

For each preserved witness:

1. extend unmentioned variables and rows by identity;
2. require every named moved variable and row to exist in the original model;
3. verify objective coefficients, variable bounds, and integrality under the variable permutation;
4. verify row bounds under the row permutation;
5. verify every original matrix coefficient under the combined row/variable permutation.

A witness passes only if the **entire original MIP** is invariant.

## Benchmark

If at least one witness replays exactly:

- choose the exact witness whose lexicographically first moved variable name is smallest;
- select that variable `x` and its image `g(x)`;
- add the exact symmetry breaker `x >= g(x)`.

Run five paired seeds (0..4), 15 seconds each:

A. SCIP 10.0.2 default symmetry;  
B. SCIP 10.0.2 symmetry disabled;  
C. SCIP 10.0.2 symmetry disabled + exact replayed breaker.

Report every trial and medians. Exactness is independent of performance.

If no frozen witness is an automorphism of the original model, that is a clean negative result for this replay route; it does not invalidate the already-certified post-HiGHS residual symmetry.
