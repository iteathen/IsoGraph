# n5-3 original-model breaker injection holdout 0.6

**Status:** MAPPING_LICENSED_AND_BENCHMARKED
**Frontend:** 0.165908s
**Original breakers:** [('C0021', 'C0026'), ('C0027', 'C0028')]

| Seed | Order | Baseline status | IG status | Baseline wall | IG solver wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 36 | baseline_first | optimal | optimal | 43.69909073699999 | 27.104034697000003 | 27.269942408999995 |
| 37 | ig_first | optimal | optimal | 50.06761651900001 | 24.804191714000012 | 24.970099426000004 |
| 38 | baseline_first | optimal | optimal | 35.656592973000016 | 27.268544262999967 | 27.43445197499996 |
| 39 | ig_first | optimal | optimal | 39.85569788500004 | 25.10376245699996 | 25.26967016899995 |
| 40 | baseline_first | optimal | optimal | 35.77866803399996 | 15.817406880000021 | 15.983314592000013 |

## Summary

~~~json
{
  "paired_both_optimal": 5,
  "baseline_median_wall_s": 39.85569788500004,
  "ig_solver_median_wall_s": 25.10376245699996,
  "ig_end_to_end_median_wall_s": 25.26967016899995,
  "paired_end_to_end_wins": 5,
  "paired_end_to_end_losses": 0,
  "frontend_wall_s": 0.1659077119999921,
  "baseline_median_nodes": 1448,
  "ig_median_nodes": 885,
  "baseline_median_lp": 227227,
  "ig_median_lp": 139787,
  "baseline_median_gap_all": 0.0,
  "ig_median_gap_all": 0.0,
  "paired_gap_wins_all": 0
}
~~~
