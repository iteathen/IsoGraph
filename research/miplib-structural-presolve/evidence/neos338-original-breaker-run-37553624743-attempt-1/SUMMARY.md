# neos-3381206-awhea optimized original-breaker holdout 0.1

**Directional positive:** False
**Frontend:** 5.346886s
**Breaker:** C0001 >= C0002

| Seed | Order | Baseline status | IG status | Baseline wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: |
| 3 | ig_first | optimal | optimal | 1.0036313609999965 | 7.342841681000003 |
| 4 | baseline_first | optimal | optimal | 5.796284317000001 | 7.38645296 |
| 5 | ig_first | optimal | optimal | 3.7220194480000046 | 7.066981644000002 |
| 6 | baseline_first | optimal | optimal | 2.0312992960000003 | 7.283101665000004 |
| 7 | ig_first | optimal | optimal | 20.081157461999993 | 7.269878865999999 |

~~~json
{
  "metric": "time_to_optimum",
  "paired_optimal": 5,
  "baseline_median_metric": 3.7220194480000046,
  "ig_median_metric": 7.283101665000004,
  "paired_wins": 1,
  "median_ratio": 1.8986955180466303,
  "directional_positive": false,
  "frontend_wall_s": 5.346886310000002,
  "baseline_median_nodes": 227,
  "ig_median_nodes": 51,
  "baseline_median_lp": 18178,
  "ig_median_lp": 16076
}
~~~
