# n5-3 post-SCIP orbit-max benchmark 0.1

**BLISS generators:** 208
**Nontrivial variable orbits:** 89
**Largest orbit:** 181
**Orbit representative:** t_C0095
**Structural front-end wall:** 6.637602s

| Seed | Baseline gap | Single gap | Orbit-max gap | Baseline nodes | Single nodes | Orbit nodes |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.06281037052898428 | 0.06656554542844696 | 0.06017050217126163 | 460 | 353 | 465 |
| 1 | 0.05802371680847177 | 0.058023716808474624 | 0.048933138864763 | 433 | 391 | 465 |
| 2 | 0.07001873937488155 | 0.05647145641829123 | 0.06462507648553378 | 349 | 315 | 362 |
| 3 | 0.060845188419700616 | 0.06519578633669203 | 0.07600997230973654 | 302 | 345 | 250 |
| 4 | 0.0808713884135588 | 0.07179007498749213 | 0.16363249106057084 | 189 | 221 | 137 |

## Medians

~~~json
{
  "baseline": {
    "median_gap": 0.06281037052898428,
    "median_nodes": 349,
    "median_lp_iterations": 87503,
    "median_primal": 8105.0000000005275,
    "median_dual": 7660.508806408514,
    "median_wall_s": 15.000250727000008
  },
  "single": {
    "median_gap": 0.06519578633669203,
    "median_nodes": 345,
    "median_lp_iterations": 87976,
    "median_primal": 8105.0000000003865,
    "median_dual": 7660.508806408513,
    "median_wall_s": 15.000304921999998
  },
  "orbit_max": {
    "median_gap": 0.06462507648553378,
    "median_nodes": 362,
    "median_lp_iterations": 86581,
    "median_primal": 8105.000000000555,
    "median_dual": 7697.545531290061,
    "median_wall_s": 15.000256455000027
  },
  "orbit_gap_wins_vs_baseline": 3,
  "orbit_gap_losses_vs_baseline": 2,
  "orbit_gap_ties_vs_baseline": 0
}
~~~

The orbit-max breaker is exact because every group orbit has a representative whose selected coordinate attains the maximum over the chosen variable orbit.
