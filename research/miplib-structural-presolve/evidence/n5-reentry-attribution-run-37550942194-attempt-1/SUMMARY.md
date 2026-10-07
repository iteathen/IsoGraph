# n5-3 residual re-entry attribution control 0.5

**Stage-1 wall:** 0.115426s
**Structural extra wall:** 0.090683s
**Full structural frontend:** 0.206109s

| Seed | Order | A original | B re-entry e2e | C IsoGraph e2e | A nodes | B nodes | C nodes |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 29 | C_A_B | 57.841569127 | 34.656626978 | 28.85820935200001 | 1959 | 822 | 476 |
| 30 | A_B_C | 86.560016706 | 32.573941482000016 | 35.603201754999965 | 2692 | 862 | 822 |
| 31 | B_C_A | 44.60382429400005 | 41.04340925899999 | 42.09925042000001 | 1432 | 1061 | 846 |
| 32 | C_A_B | 42.90128932999994 | 36.0930361670001 | 36.885161421 | 1045 | 956 | 878 |
| 33 | A_B_C | 51.46874973599995 | 39.32087893800003 | 32.702142985 | 1256 | 880 | 797 |
| 34 | B_C_A | 44.390842332000034 | 40.26951013400009 | 38.29686303700007 | 1178 | 1048 | 873 |
| 35 | C_A_B | 33.895827714000006 | 38.46809328299998 | 40.44591894899995 | 877 | 946 | 1051 |

## Summary

~~~json
{
  "paired_all_optimal": 7,
  "stage1_wall_s": 0.11542580800000479,
  "structural_extra_wall_s": 0.09068327299999623,
  "full_structural_frontend_wall_s": 0.20610908100000103,
  "A_median_wall_s": 44.60382429400005,
  "B_median_end_to_end_wall_s": 38.46809328299998,
  "C_median_end_to_end_wall_s": 36.885161421,
  "median_B_over_A_ratio": 0.8413042295621876,
  "median_C_over_A_ratio": 0.8597681327774689,
  "median_C_over_B_ratio": 1.021946761428847,
  "B_vs_A_wins": 6,
  "C_vs_A_wins": 6,
  "C_vs_B_wins": 3,
  "C_vs_B_losses": 4,
  "A_median_nodes": 1256,
  "B_median_nodes": 946,
  "C_median_nodes": 846,
  "A_median_lp": 213226,
  "B_median_lp": 162594,
  "C_median_lp": 163015
}
~~~
