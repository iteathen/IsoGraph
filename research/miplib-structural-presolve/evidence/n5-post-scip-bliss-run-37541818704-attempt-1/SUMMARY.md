# n5-3 post-SCIP BLISS automorphism holdout 0.1

**Status:** EXACT_POST_SCIP_BLISS_AUTOMORPHISM
**BLISS generators:** 208
**Variable-moving generators:** 208
**BLISS wall:** 0.074988s

**Breaker:** t_C0021 >= t_C0026

| Seed | Baseline gap | Breaker gap | Baseline nodes | Breaker nodes |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 0.381263952503961 | 0.4121205088134053 | 24 | 30 |
| 1 | 0.40031034576630053 | 0.6009869089958532 | 46 | 45 |
| 2 | 0.4190474535625757 | 0.37765345595794503 | 36 | 30 |
| 3 | 0.37175588930875014 | 0.37175588930875014 | 67 | 59 |
| 4 | 0.4819077918186219 | 0.34574486210771316 | 51 | 53 |

~~~json
{
  "baseline_median_gap": 0.40031034576630053,
  "breaker_median_gap": 0.37765345595794503,
  "baseline_median_nodes": 46,
  "breaker_median_nodes": 45,
  "baseline_median_lp": 33866,
  "breaker_median_lp": 34148,
  "paired_gap_wins": 2,
  "paired_gap_losses": 2,
  "paired_gap_ties": 1
}
~~~

Every selected BLISS generator was replay-checked against vertex colors and the complete subdivision edge set before use.
