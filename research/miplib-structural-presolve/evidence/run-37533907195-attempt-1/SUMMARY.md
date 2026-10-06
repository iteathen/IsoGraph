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
- original + default HiGHS presolve: `Time limit reached`, objective `0.21919999999978082`, wall `15.0013s`, nodes `11568`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `0.2063999999990125`, wall `15.0037s`, nodes `12611`
- structural residual, presolve off: `Time limit reached`, objective `0.2063999999990125`, wall `15.0039s`, nodes `12611`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### glass4

- current MIPLIB target objective: `1200012599.972384`
- original + default HiGHS presolve: `Time limit reached`, objective `1950016950.000002`, wall `15.0010s`, nodes `4628`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `2033352233.333333`, wall `15.0011s`, nodes `4633`
- structural residual, presolve off: `Time limit reached`, objective `2033352233.333333`, wall `15.0009s`, nodes `4587`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### supportcase26

- current MIPLIB target objective: `1745.123813`
- original + default HiGHS presolve: `Time limit reached`, objective `1790.05043011219`, wall `15.0018s`, nodes `3389`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `1840.7759285089367`, wall `15.0018s`, nodes `1621`
- structural residual, presolve off: `Time limit reached`, objective `1840.7759285089367`, wall `15.0019s`, nodes `1621`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### bppc4-08

- current MIPLIB target objective: `53.0`
- original + default HiGHS presolve: `Time limit reached`, objective `55.999999999999915`, wall `15.0114s`, nodes `2072`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0042s`, nodes `2116`
- structural residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0106s`, nodes `2116`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

## Interpretation boundary

- A positive exact reduction means the fixed algebraic rule still found eliminable structure after the selected HiGHS presolve run.
- Exact graph factorization means the residual row-variable incidence graph contains multiple disconnected nontrivial components; it does not by itself prove the incumbent solver fails to exploit them internally.
- WL candidate classes are **not reductions**. They are candidates for later exact symmetry/equivalence/dominance work.
- A null result is useful: it falsifies these low-cost structural rules on that residual and tells the next pass to target deeper semantic structure rather than duplicate ordinary presolve.
- This is a prototype structural pass, not a Core 0.21-qualified IsoGraph rendering or a claim of a new MIP presolve theorem.

