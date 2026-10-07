# neos-3627168-kasai original-breaker holdout 0.1

**Directional positive:** False
**Frontend:** 0.125433s
**Transformed breaker:** t_C0001 >= t_C0003
**Original breaker:** C0001 >= C0003

| Seed | Order | Baseline status | IG status | Baseline wall | IG end-to-end | Baseline gap | IG gap |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |
| 0 | baseline_first | timelimit | timelimit | 30.004844616000007 | 30.136409849000003 | 0.008349136703966557 | 0.0052538812603457885 |
| 1 | ig_first | timelimit | timelimit | 30.005215633999995 | 30.13322898300001 | 0.009160744276576272 | 0.011114911133279046 |
| 2 | baseline_first | timelimit | timelimit | 30.004804000999997 | 30.132608641999994 | 0.016053815044666252 | 0.0038267047197911297 |
| 3 | ig_first | timelimit | timelimit | 30.004569954000004 | 30.13292945299999 | 0.005268648090103954 | 0.020324993117734586 |
| 4 | baseline_first | timelimit | timelimit | 30.005060061999984 | 30.131873709000004 | 0.009989701002758894 | 0.00509862449037734 |

~~~json
{
  "metric": "final_gap",
  "paired_optimal": 0,
  "baseline_median_metric": 0.009160744276576272,
  "ig_median_metric": 0.0052538812603457885,
  "paired_wins": 3,
  "median_ratio": null,
  "directional_positive": false,
  "frontend_wall_s": 0.12543250000000228,
  "baseline_median_nodes": 1724,
  "ig_median_nodes": 1145,
  "baseline_median_lp": 124789,
  "ig_median_lp": 121960
}
~~~
