# neos-3381206-awhea optimized original-breaker holdout 0.3

**Directional positive:** False
**Frontend:** 1.344315s
**Breaker:** C0001 >= C0002

| Seed | Order | Baseline status | IG status | Baseline wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: |
| 8 | baseline_first | optimal | optimal | 2.574445406999999 | 3.5018642940000007 |
| 9 | ig_first | optimal | optimal | 1.6275672039999947 | 2.6690248889999992 |
| 10 | baseline_first | optimal | optimal | 1.7281893130000014 | 7.412887890999997 |
| 11 | ig_first | optimal | optimal | 1.614954540999996 | 2.6919107830000044 |
| 12 | baseline_first | optimal | optimal | 1.1640128550000028 | 2.8700017820000028 |

~~~json
{
  "metric": "time_to_optimum",
  "paired_optimal": 5,
  "baseline_median_metric": 1.6275672039999947,
  "ig_median_metric": 2.8700017820000028,
  "paired_wins": 0,
  "median_ratio": 1.666864741179121,
  "directional_positive": false,
  "frontend_wall_s": 1.344314894,
  "baseline_median_nodes": 43,
  "ig_median_nodes": 38,
  "baseline_median_lp": 13954,
  "ig_median_lp": 13321
}
~~~
