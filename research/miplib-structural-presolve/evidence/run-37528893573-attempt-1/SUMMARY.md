# MIPLIB structural presolve prototype — result

**HiGHS:** 1.15.1
**Instances:** 0
**Disposition:** FAIL

The experiment applies the fixed structural profile only **after HiGHS presolve**. Exact reductions are limited to logically equivalent identical-row interval intersection and exact aggregation of ordinary interval variables with identical row incidence and objective coefficient. WL/refinement classes are leads only.

| Instance | HiGHS presolved | IG reduced | Exact Δ rows | Exact Δ cols | Components | WL var classes | Signal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |

## Solve checks

## Interpretation boundary

- A positive exact reduction means the fixed algebraic rule still found eliminable structure after the selected HiGHS presolve run.
- Exact graph factorization means the residual row-variable incidence graph contains multiple disconnected nontrivial components; it does not by itself prove the incumbent solver fails to exploit them internally.
- WL candidate classes are **not reductions**. They are candidates for later exact symmetry/equivalence/dominance work.
- A null result is useful: it falsifies these low-cost structural rules on that residual and tells the next pass to target deeper semantic structure rather than duplicate ordinary presolve.
- This is a prototype structural pass, not a Core 0.21-qualified IsoGraph rendering or a claim of a new MIP presolve theorem.

