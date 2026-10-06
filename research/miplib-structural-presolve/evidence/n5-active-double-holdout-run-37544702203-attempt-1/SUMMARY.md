# n5-3 active double-breaker fresh-seed holdout 0.2

**Active generators:** 2
**Structural frontend:** 7.383435s
**Breaker 1:** t_C0021 >= t_C0026
**Breaker 2:** t_C0027 >= t_C0028

| Seed | Baseline gap | Double gap | Baseline nodes | Double nodes |
| ---: | ---: | ---: | ---: | ---: |
| 5 | 0.0 | 0.0 | 687 | 652 |
| 6 | 0.0 | 0.0 | 1292 | 1009 |
| 7 | 0.0 | 0.0 | 817 | 826 |

## Medians

~~~json
{
  "baseline": {
    "median_gap": 0.0,
    "median_nodes": 817,
    "median_lp": 172953,
    "median_primal": 8105.000000000347,
    "median_dual": 8105.000000000347,
    "median_wall_s": 37.10802862900002
  },
  "double": {
    "median_gap": 0.0,
    "median_nodes": 826,
    "median_lp": 146079,
    "median_primal": 8105.000000000295,
    "median_dual": 8105.000000000295,
    "median_wall_s": 33.671795755999995
  },
  "double_gap_wins_vs_baseline": 0,
  "double_gap_losses_vs_baseline": 0,
  "double_gap_ties_vs_baseline": 3,
  "directional_confirmation": false
}
~~~

All timed variants use normal SCIP presolve with symmetry disabled, so export-only dead columns are removed before solving.
