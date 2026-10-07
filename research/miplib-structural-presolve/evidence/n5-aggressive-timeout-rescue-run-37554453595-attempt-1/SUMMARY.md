# n5-3 aggressive SCIP timeout-rescue holdout 1.2

**Timeout-rescue confirmed:** False
**Optimal solves:** aggressive 6/7 ; +external 7/7
**Frontend:** 0.163466s

| Seed | Order | Aggressive status | +external status | Aggressive wall | +external end-to-end |
| ---: | --- | --- | --- | ---: | ---: |
| 60 | aggressive_first | timelimit | optimal | 60.006116699 | 35.61255649900001 |
| 61 | external_first | optimal | optimal | 48.30477341100001 | 44.515486283000016 |
| 62 | aggressive_first | optimal | optimal | 39.06874184700001 | 29.54627601 |
| 63 | external_first | optimal | optimal | 45.34404276499998 | 31.416740723000046 |
| 64 | aggressive_first | optimal | optimal | 40.39039126700004 | 30.318011944000048 |
| 65 | external_first | optimal | optimal | 42.998899201000086 | 47.42876471500007 |
| 66 | aggressive_first | optimal | optimal | 49.561541981999994 | 40.07763786300008 |

## Summary

~~~json
{
  "aggressive_optimal_count": 6,
  "external_optimal_count": 7,
  "optimal_count_delta": 1,
  "paired_both_optimal": 6,
  "aggressive_median_wall_s": 44.171470983000034,
  "external_solver_median_wall_s": 35.583722994000055,
  "external_end_to_end_median_wall_s": 35.74718929300006,
  "median_external_over_aggressive_ratio": 0.7824538533263283,
  "external_end_to_end_wins": 5,
  "external_end_to_end_losses": 1,
  "frontend_wall_s": 0.16346629900000664,
  "aggressive_median_nodes": 1320.5,
  "external_median_nodes": 1091.0,
  "aggressive_median_lp": 222143.5,
  "external_median_lp": 156099.5,
  "timeout_rescue_confirmed": false
}
~~~
