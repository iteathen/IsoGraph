# n5-3 optimized end-to-end time-to-optimum holdout 0.3

**Frontend wall:** 0.197874s
**Breakers:** t_C0021 >= t_C0026 ; t_C0027 >= t_C0028

| Seed | Order | Baseline status | IG status | Baseline wall | IG solver wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 15 | ig_first | optimal | optimal | 38.403993861000004 | 36.67678163 | 36.87465537 |
| 16 | baseline_first | optimal | optimal | 52.88253829499999 | 28.579161139999997 | 28.777034879999995 |
| 17 | ig_first | optimal | optimal | 44.913812924999974 | 54.22560484900001 | 54.423478589000005 |
| 18 | baseline_first | optimal | optimal | 43.240954707000014 | 42.98452393399998 | 43.18239767399998 |
| 19 | ig_first | optimal | optimal | 56.65703557299997 | 27.94872685499996 | 28.14660059499996 |
| 20 | baseline_first | optimal | optimal | 52.842874490999975 | 45.465706063000084 | 45.66357980300008 |
| 21 | ig_first | optimal | optimal | 42.39009873100008 | 36.771323281000036 | 36.969197021000035 |

## Summary

~~~json
{
  "paired_both_optimal": 7,
  "baseline_median_wall_s": 44.913812924999974,
  "ig_solver_median_wall_s": 36.771323281000036,
  "ig_end_to_end_median_wall_s": 36.969197021000035,
  "median_solver_ratio": 0.8674507581202917,
  "median_end_to_end_ratio": 0.8721186816666763,
  "paired_end_to_end_wins": 6,
  "paired_end_to_end_losses": 1,
  "frontend_wall_s": 0.19787373999999858,
  "baseline_median_nodes": 1547,
  "ig_median_nodes": 1022,
  "baseline_median_lp": 225391,
  "ig_median_lp": 168165
}
~~~
