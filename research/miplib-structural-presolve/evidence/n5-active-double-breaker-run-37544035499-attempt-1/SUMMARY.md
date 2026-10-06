# n5-3 active double-generator symmetry benchmark 0.1

**Active generators:** 2
**Structural frontend:** 8.624344s
**Breaker 1:** t_C0021 >= t_C0026
**Breaker 2:** t_C0027 >= t_C0028

| Seed | Baseline gap | Single gap | Double gap | Baseline nodes | Single nodes | Double nodes |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.5181534956379452 | 0.5181534956379452 | 0.45177696676224344 | 25 | 25 | 17 |
| 1 | 0.5307932400507572 | 0.5607515744214099 | 0.5607515744214099 | 31 | 26 | 24 |
| 2 | 0.37907536146232745 | 0.476956681603264 | 0.41872541458669693 | 16 | 16 | 12 |
| 3 | 0.40513668481258003 | 0.40513668481258003 | 0.4047743113206372 | 43 | 43 | 53 |
| 4 | 0.5091687745150922 | 0.3820525597880514 | 0.44513588239821156 | 14 | 49 | 43 |

## Medians

~~~json
{
  "baseline": {
    "median_gap": 0.5091687745150922,
    "median_nodes": 25,
    "median_lp": 26027,
    "median_primal": 11411.33498759106,
    "median_dual": 7559.412843795569,
    "median_wall_s": 15.001167339000006
  },
  "single": {
    "median_gap": 0.476956681603264,
    "median_nodes": 26,
    "median_lp": 30535,
    "median_primal": 11160.0,
    "median_dual": 7556.078075279508,
    "median_wall_s": 15.000947937999996
  },
  "double": {
    "median_gap": 0.44513588239821156,
    "median_nodes": 24,
    "median_lp": 29992,
    "median_primal": 10995.536671804342,
    "median_dual": 7556.078075279508,
    "median_wall_s": 15.000897793000007
  },
  "double_gap_wins_vs_baseline": 3,
  "double_gap_losses_vs_baseline": 2,
  "double_gap_ties_vs_baseline": 0
}
~~~

All timed variants use normal SCIP presolve with symmetry disabled, so export-only dead columns are removed before solving.
