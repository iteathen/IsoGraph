# MIPLIB structural presolve prototype — result

**HiGHS:** 1.15.1
**Instances:** 4
**Disposition:** PASS

The experiment applies the fixed structural profile only **after HiGHS presolve**. Exact reductions are limited to logically equivalent identical-row interval intersection and exact aggregation of ordinary interval variables with identical row incidence and objective coefficient. WL/refinement classes are leads only.

| Instance | HiGHS presolved | IG reduced | Exact Δ rows | Exact Δ cols | Components | WL var classes | Signal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| mad | 40×220 | 40×220 | 0 | 0 | 1 | 0 | NO_POST_PRESOLVE_SIGNAL |
| glass4 | 392×317 | 392×317 | 0 | 0 | 1 | 1 | STRUCTURAL_LEAD_ONLY |
| supportcase26 | 434×436 | 434×436 | 0 | 0 | 1 | 0 | NO_POST_PRESOLVE_SIGNAL |
| bppc4-08 | 111×1455 | 111×1455 | 0 | 0 | 1 | 0 | NO_POST_PRESOLVE_SIGNAL |

## Solve checks

### mad

- current MIPLIB target objective: `0.0268`
- original + default HiGHS presolve: `Time limit reached`, objective `0.2087999999998818`, wall `15.0024s`, nodes `14407`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `0.19439999999969637`, wall `15.0021s`, nodes `15146`
- structural residual, presolve off: `Time limit reached`, objective `0.19439999999969637`, wall `15.0029s`, nodes `15900`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### glass4

- current MIPLIB target objective: `1200012599.972384`
- original + default HiGHS presolve: `Time limit reached`, objective `1900018500.0`, wall `15.0014s`, nodes `9500`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `1900015500.0`, wall `15.0016s`, nodes `10282`
- structural residual, presolve off: `Time limit reached`, objective `1900015500.0`, wall `15.0049s`, nodes `10281`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### supportcase26

- current MIPLIB target objective: `1745.123813`
- original + default HiGHS presolve: `Time limit reached`, objective `1790.05043011219`, wall `15.0075s`, nodes `5349`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `1838.611332271377`, wall `15.0056s`, nodes `5180`
- structural residual, presolve off: `Time limit reached`, objective `1838.611332271377`, wall `15.0009s`, nodes `5180`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### bppc4-08

- current MIPLIB target objective: `53.0`
- original + default HiGHS presolve: `Time limit reached`, objective `55.999999999999915`, wall `15.0023s`, nodes `3390`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0212s`, nodes `3526`
- structural residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0056s`, nodes `3403`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

## Interpretation boundary

- A positive exact reduction means the fixed algebraic rule still found eliminable structure after the selected HiGHS presolve run.
- Exact graph factorization means the residual row-variable incidence graph contains multiple disconnected nontrivial components; it does not by itself prove the incumbent solver fails to exploit them internally.
- WL candidate classes are **not reductions**. They are candidates for later exact symmetry/equivalence/dominance work.
- A null result is useful: it falsifies these low-cost structural rules on that residual and tells the next pass to target deeper semantic structure rather than duplicate ordinary presolve.
- This is a prototype structural pass, not a Core 0.21-qualified IsoGraph rendering or a claim of a new MIP presolve theorem.

