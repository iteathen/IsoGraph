# MIPLIB recurrence screen 0.1

**Date:** 2026-10-06  
**Branch:** `experiment/miplib-structural-presolve-20261006`  
**Purpose:** test whether the exact post-presolve symmetry found in `glass4` recurs on unrelated MIPLIB benchmark models.

## Frozen sample selection

Before observing recurrence results, select the first 20 instances in the official MIPLIB 2017 benchmark table satisfying:

- raw variables <= 5,000;
- raw constraints <= 5,000;
- not one of the four initial prototype instances (`mad`, `glass4`, `supportcase26`, `bppc4-08`).

This produces:

1. `50v-10`
2. `reblock115`
3. `ran14x18-disj-8`
4. `gen-ip002`
5. `gen-ip054`
6. `ic97_potential`
7. `pk1`
8. `n5-3`
9. `neos859080`
10. `neos-911970`
11. `seymour1`
12. `p200x1188c`
13. `b1c1s1`
14. `markshare2`
15. `mas74`
16. `exp-1-500-5-5`
17. `markshare_4_0`
18. `qap10`
19. `cost266-UUE`
20. `mas76`

The sample is intentionally heterogeneous and includes easy, hard, and infeasible controls.

## Frozen structural profile

For each model:

1. download the official MIPLIB MPS;
2. run HiGHS 1.15.1 presolve;
3. inspect only the presolved residual;
4. enumerate exact restricted binary transpositions where:
   - objective coefficient, bounds, and integrality are equal;
   - all fixed rows are coefficient-invariant under the variable swap;
   - exactly one pair of rows is exchanged by the swap;
   - row bounds and coefficients are exactly preserved under that row exchange;
5. separately test whether any exact transposition licenses the stronger `glass4`-style quotient:
   - a shared nonnegative at-most-one row supplies an orbit representative;
   - after fixing one representative variable to zero, one exchanged private row is proven redundant by interval activity;
6. report coefficient-aware refinement classes as LEAD_ONLY; no refinement class is promoted to symmetry without the exact matrix test.

## Outcome classes

- `EXACT_QUOTIENT` — exact post-presolve row+column quotient licensed.
- `EXACT_SYMMETRY_ONLY` — exact post-presolve transposition exists, but the frozen quotient guard is not discharged.
- `LEAD_ONLY` — refinement finds repeated structure but no exact transposition under this restricted detector.
- `NO_SIGNAL` — none of the frozen signals appear.

No runtime improvement claim is made by this screen. Timing tests are a second-stage operation applied only to exact positives.
