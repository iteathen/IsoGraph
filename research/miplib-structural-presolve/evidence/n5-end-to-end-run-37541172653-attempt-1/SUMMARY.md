# n5-3 end-to-end structural front-end benchmark 0.1

**Front-end overhead:** 24.975s
**Exact breaker:** C0012 >= C0039

| Seed | Original width | HiGHS residual width | Residual + IG width | Original nodes | Residual nodes | IG nodes |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 805.459163168428 | 0.0 | 0.0 | 560 | 672 | 705 |
| 1 | 374.2371009383187 | 206.406880556131 | 293.25493259989435 | 758 | 806 | 696 |
| 2 | 342.43152314350573 | 305.31600677141887 | 314.9760224892607 | 552 | 662 | 611 |
| 3 | 452.66488177455085 | 0.0 | 0.0 | 757 | 795 | 659 |
| 4 | 375.46373351583316 | 0.0 | 0.0 | 564 | 539 | 619 |

## Medians

~~~json
{
  "A_original_default": {
    "median_bound_width": 375.46373351583316,
    "median_gap": 0.04857519527321074,
    "median_nodes": 564,
    "median_lp_iterations": 139237,
    "median_wall_s": 30.000928672
  },
  "B_highs_residual": {
    "median_bound_width": 0.0,
    "median_gap": 0.0,
    "median_nodes": 672,
    "median_lp_iterations": 114238,
    "median_wall_s": 27.186430432999998
  },
  "C_residual_plus_ig": {
    "median_bound_width": 0.0,
    "median_gap": 0.0,
    "median_nodes": 659,
    "median_lp_iterations": 116302,
    "median_wall_s": 29.219601966000027
  },
  "paired_C_vs_B_bound_width_wins": 0,
  "paired_C_vs_A_bound_width_wins": 5
}
~~~

Cross-formulation comparison uses primal-dual bound width, which is invariant to objective constant offsets. Solver-reported relative gaps are retained but are not the primary cross-formulation metric.
The structural front-end overhead is reported separately and must be included in any end-to-end economic interpretation.
