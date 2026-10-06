# n5-3 active-only time-to-optimum holdout 0.2

**Stage-1 SCIP presolve wall:** 0.039033s
**Export-only vars safely dropped from structural analysis:** 212
**Active BLISS generators:** 2
**BLISS wall:** 0.003748s
**Total structural frontend:** 2.802224s
**Breakers:** t_C0021 >= t_C0026 ; t_C0027 >= t_C0028

| Seed | Order | Baseline status | Double status | Baseline wall | Double wall | Baseline gap | Double gap |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 8 | baseline_first | optimal | optimal | 39.539232711 | 40.79888827000002 | 0.0 | 0.0 |
| 9 | double_first | optimal | optimal | 40.15592023400001 | 43.869590303000024 | 0.0 | 0.0 |
| 10 | baseline_first | optimal | optimal | 46.21110537599998 | 35.88609214999997 | 0.0 | 0.0 |
| 11 | double_first | optimal | optimal | 35.94321082000005 | 37.464824287 | 0.0 | 0.0 |
| 12 | baseline_first | optimal | optimal | 34.063539795 | 31.255529489000025 | 0.0 | 0.0 |
| 13 | double_first | optimal | optimal | 41.36083104399995 | 34.938202622000006 | 0.0 | 0.0 |
| 14 | baseline_first | optimal | optimal | 44.092118864999975 | 42.688096954 | 0.0 | 0.0 |

## Medians

~~~json
{
  "baseline": {
    "median_gap": 0.0,
    "median_nodes": 913,
    "median_lp": 191523,
    "median_primal": 8105.000000000343,
    "median_dual": 8105.000000000343,
    "median_wall_s": 40.15592023400001
  },
  "double": {
    "median_gap": 0.0,
    "median_nodes": 921,
    "median_lp": 158238,
    "median_primal": 8105.000000000333,
    "median_dual": 8105.000000000333,
    "median_wall_s": 37.464824287
  },
  "paired_both_optimal": 7,
  "paired_wall_wins": 4,
  "paired_wall_losses": 3,
  "median_solver_wall_ratio": 0.9681570777920933,
  "median_end_to_end_ratio_including_frontend": 1.031710926872918,
  "structural_frontend_wall_s": 2.8022238679999987
}
~~~
