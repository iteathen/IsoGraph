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
- original + default HiGHS presolve: `Time limit reached`, objective `0.3017999999999679`, wall `15.0029s`, nodes `8837`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `0.2063999999990125`, wall `15.0041s`, nodes `10871`
- structural residual, presolve off: `Time limit reached`, objective `0.2063999999990125`, wall `15.0010s`, nodes `10872`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### glass4

- current MIPLIB target objective: `1200012599.972384`
- original + default HiGHS presolve: `Time limit reached`, objective `1950016950.000002`, wall `15.0029s`, nodes `1702`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `2033352233.333333`, wall `15.0026s`, nodes `2620`
- structural residual, presolve off: `Time limit reached`, objective `2033352233.333333`, wall `15.0028s`, nodes `2620`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### supportcase26

- current MIPLIB target objective: `1745.123813`
- original + default HiGHS presolve: `Time limit reached`, objective `1923.2821674002787`, wall `15.0023s`, nodes `1015`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `1840.7759285089367`, wall `15.0032s`, nodes `811`
- structural residual, presolve off: `Time limit reached`, objective `1840.7759285089367`, wall `15.0033s`, nodes `811`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

### bppc4-08

- current MIPLIB target objective: `53.0`
- original + default HiGHS presolve: `Time limit reached`, objective `55.999999999999915`, wall `15.0058s`, nodes `1574`
- exported HiGHS residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0078s`, nodes `1816`
- structural residual, presolve off: `Time limit reached`, objective `55.0`, wall `15.0144s`, nodes `1816`
- baseline/reduced objective match when both optimal: `None`
- reduced/current-target objective match when optimal: `None`

## Interpretation boundary

- A positive exact reduction means the fixed algebraic rule still found eliminable structure after the selected HiGHS presolve run.
- Exact graph factorization means the residual row-variable incidence graph contains multiple disconnected nontrivial components; it does not by itself prove the incumbent solver fails to exploit them internally.
- WL candidate classes are **not reductions**. They are candidates for later exact symmetry/equivalence/dominance work.
- A null result is useful: it falsifies these low-cost structural rules on that residual and tells the next pass to target deeper semantic structure rather than duplicate ordinary presolve.
- This is a prototype structural pass, not a Core 0.21-qualified IsoGraph rendering or a claim of a new MIP presolve theorem.

