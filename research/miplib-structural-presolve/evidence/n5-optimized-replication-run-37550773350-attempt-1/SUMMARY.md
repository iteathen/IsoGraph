# n5-3 optimized end-to-end replication 0.4

**Frontend wall:** 0.193363s
**Breakers:** t_C0021 >= t_C0026 ; t_C0027 >= t_C0028

| Seed | Order | Baseline status | IG status | Baseline wall | IG solver wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 22 | baseline_first | optimal | optimal | 44.08099009499999 | 40.25187151 | 40.445234721999995 |
| 23 | ig_first | optimal | optimal | 63.629686926999995 | 38.42751448999999 | 38.62087770199999 |
| 24 | baseline_first | optimal | optimal | 51.92697120400004 | 34.52015096100001 | 34.71351417300001 |
| 25 | ig_first | optimal | optimal | 34.173019329 | 32.22698224200002 | 32.420345454000014 |
| 26 | baseline_first | optimal | optimal | 45.447560968999994 | 37.28208483700001 | 37.47544804900001 |
| 27 | ig_first | optimal | optimal | 52.25878185299996 | 40.69362516000001 | 40.886988372000005 |
| 28 | baseline_first | optimal | optimal | 40.21224250600005 | 35.059519047000094 | 35.25288225900009 |

## Summary

~~~json
{
  "paired_both_optimal": 7,
  "baseline_median_wall_s": 45.447560968999994,
  "ig_solver_median_wall_s": 37.28208483700001,
  "ig_end_to_end_median_wall_s": 37.47544804900001,
  "median_solver_ratio": 0.8203319175352514,
  "median_end_to_end_ratio": 0.8245865619623063,
  "paired_end_to_end_wins": 7,
  "paired_end_to_end_losses": 0,
  "frontend_wall_s": 0.19336321199999418,
  "baseline_median_nodes": 1052,
  "ig_median_nodes": 912,
  "baseline_median_lp": 215525,
  "ig_median_lp": 173645
}
~~~
