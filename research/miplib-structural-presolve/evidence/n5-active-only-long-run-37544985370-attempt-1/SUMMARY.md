# n5-3 active-only symmetry long holdout 0.1

**Stage-1 SCIP presolve wall:** 0.041173s
**Export-only vars safely dropped from structural analysis:** 212
**Active BLISS generators:** 2
**BLISS wall:** 0.003496s
**Total structural frontend:** 3.198006s
**Breakers:** t_C0021 >= t_C0026 ; t_C0027 >= t_C0028

| Seed | Baseline gap | Double gap | Baseline nodes | Double nodes | Baseline LP | Double LP |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.0 | 0.0 | 964 | 941 | 163891 | 168475 |
| 1 | 0.0 | 0.0 | 952 | 1004 | 148746 | 189891 |
| 2 | 0.0 | 0.0 | 827 | 790 | 139304 | 161642 |
| 3 | 0.0 | 0.0 | 817 | 709 | 161777 | 141620 |
| 4 | 0.0 | 0.0 | 449 | 594 | 110961 | 122774 |

## Medians

~~~json
{
  "baseline": {
    "median_gap": 0.0,
    "median_nodes": 827,
    "median_lp": 148746,
    "median_primal": 8105.00000000037,
    "median_dual": 8105.00000000037,
    "median_wall_s": 34.793615234
  },
  "double": {
    "median_gap": 0.0,
    "median_nodes": 790,
    "median_lp": 161642,
    "median_primal": 8105.000000000404,
    "median_dual": 8105.000000000404,
    "median_wall_s": 37.889289101
  },
  "paired_gap_wins": 0,
  "paired_gap_losses": 0,
  "paired_gap_ties": 5
}
~~~
