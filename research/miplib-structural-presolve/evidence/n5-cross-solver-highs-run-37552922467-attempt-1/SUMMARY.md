# n5-3 cross-solver HiGHS holdout 1.0

**Directional cross-solver positive:** False
**Metric:** time_to_optimum
**Frontend:** 0.133255s

| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline nodes | IG nodes |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 0 | baseline_first | Optimal | Optimal | 0.0 | 0.0 | 599 | 287 |
| 1 | ig_first | Optimal | Optimal | 0.0 | 0.0 | 318 | 229 |
| 2 | baseline_first | Optimal | Optimal | 0.0 | 0.0 | 203 | 463 |
| 3 | ig_first | Optimal | Optimal | 0.0 | 0.0 | 188 | 452 |
| 4 | baseline_first | Optimal | Optimal | 0.0 | 0.0 | 180 | 253 |

## Summary

~~~json
{
  "metric": "time_to_optimum",
  "paired_optimal": 5,
  "baseline_median_metric": 17.108777075000006,
  "ig_median_metric": 19.315115481999996,
  "paired_wins": 2,
  "directional_cross_solver_positive": false,
  "frontend_wall_s": 0.13325502700000413,
  "baseline_median_gap": 0.0,
  "ig_median_gap": 0.0,
  "baseline_median_nodes": 203,
  "ig_median_nodes": 287,
  "baseline_median_lp": 156832,
  "ig_median_lp": 171298
}
~~~
