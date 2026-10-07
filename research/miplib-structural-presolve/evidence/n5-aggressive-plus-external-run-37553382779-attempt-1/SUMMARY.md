# n5-3 aggressive SCIP + exact external complementarity 1.1

**Directional complementarity:** False
**Frontend:** 0.197960s

| Seed | Order | Aggressive status | +external status | Aggressive wall | +external end-to-end |
| ---: | --- | --- | --- | ---: | ---: |
| 53 | external_first | optimal | optimal | 41.709435901999996 | 39.814801398000014 |
| 54 | aggressive_first | optimal | optimal | 43.474184933000004 | 54.86567875200001 |
| 55 | external_first | timelimit | optimal | 60.00598779799998 | 33.13715855200002 |
| 56 | aggressive_first | optimal | optimal | 39.611445769 | 51.52766012999996 |
| 57 | external_first | optimal | optimal | 46.27188238400004 | 43.58676036899999 |
| 58 | aggressive_first | timelimit | optimal | 60.00594015900003 | 23.645929733999992 |
| 59 | external_first | optimal | optimal | 43.27979084100002 | 38.065384865000055 |

## Summary

~~~json
{
  "paired_both_optimal": 5,
  "aggressive_median_wall_s": 43.27979084100002,
  "external_solver_median_wall_s": 43.388799921999976,
  "external_end_to_end_median_wall_s": 43.58676036899999,
  "median_external_over_aggressive_ratio": 0.9545753985153002,
  "external_end_to_end_wins": 3,
  "external_end_to_end_losses": 2,
  "frontend_wall_s": 0.19796044700001403,
  "aggressive_median_nodes": 1414,
  "external_median_nodes": 1519,
  "aggressive_median_lp": 207572,
  "external_median_lp": 206108,
  "directional_complementarity": false
}
~~~
