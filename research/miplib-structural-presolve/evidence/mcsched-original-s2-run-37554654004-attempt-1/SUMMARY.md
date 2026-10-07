# mcsched original-model S2 holdout 0.3

**Directional positive:** False
**Frontend:** 0.148018s
**Breaker:** C0000186 >= C0001396

| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 13 | ig_first | timelimit | timelimit | 0.07666199330585273 | 0.07963410849668526 | 60.00622308400001 | 60.159247437000005 |
| 14 | baseline_first | timelimit | timelimit | 0.08375933845872024 | 0.07844356379184876 | 60.006717194000004 | 60.15913428899999 |
| 15 | ig_first | timelimit | timelimit | 0.0772713310676454 | 0.08227583117288409 | 60.00644507300001 | 60.15698324499997 |
| 16 | baseline_first | timelimit | timelimit | 0.0704579833394322 | 0.07350788442852835 | 60.006491659999995 | 60.156677787000014 |
| 17 | ig_first | timelimit | timelimit | 0.07691359830224412 | 0.07708798655776268 | 60.00628338000001 | 60.15639405699998 |

~~~json
{
  "metric": "final_gap",
  "paired_optimal": 0,
  "baseline_median_metric": 0.07691359830224412,
  "ig_median_metric": 0.07844356379184876,
  "paired_wins": 1,
  "median_ratio": null,
  "directional_positive": false,
  "frontend_wall_s": 0.14801817300000408,
  "baseline_median_nodes": 1873,
  "ig_median_nodes": 1408,
  "baseline_median_lp": 202581,
  "ig_median_lp": 188635
}
~~~
