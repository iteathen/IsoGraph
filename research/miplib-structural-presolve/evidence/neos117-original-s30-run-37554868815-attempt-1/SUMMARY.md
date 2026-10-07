# neos-1171737 original-model S30 holdout 0.2

**Directional positive:** False
**Frontend:** 2.162403s
**Exact orbit:** 30 variables, action order 30!

| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 8 | baseline_first | timelimit | timelimit | 0.03174603174603129 | 0.020942408376962755 | 60.021806586999986 | 62.18729480000002 |
| 9 | ig_first | timelimit | timelimit | 0.020942408376963203 | 0.037234042553190884 | 60.021744953999985 | 62.187585714999955 |
| 10 | baseline_first | timelimit | timelimit | 0.02631578947368391 | 0.020942408376962904 | 60.02187962299996 | 62.18711190900001 |
| 11 | ig_first | timelimit | timelimit | 0.01562499999999778 | 0.020942408376963203 | 60.04441582499999 | 62.18720444600001 |
| 12 | baseline_first | timelimit | timelimit | 0.02631578947368406 | 0.026315789473683612 | 60.0209906099999 | 62.18814626099993 |

~~~json
{
  "metric": "final_gap",
  "paired_optimal": 0,
  "baseline_median_metric": 0.02631578947368391,
  "ig_median_metric": 0.020942408376963203,
  "paired_wins": 3,
  "median_ratio": null,
  "directional_positive": false,
  "frontend_wall_s": 2.16240307999999,
  "baseline_median_nodes": 31,
  "ig_median_nodes": 19,
  "baseline_median_lp": 148684,
  "ig_median_lp": 144736
}
~~~
