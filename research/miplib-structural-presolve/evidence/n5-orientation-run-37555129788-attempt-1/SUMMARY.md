# n5-3 original-breaker orientation robustness 1.3

**Classification:** ORIENTATION_SENSITIVE
**Frontend:** 0.208091s

| Seed | Order | Baseline wall | Forward e2e | Reverse e2e |
| ---: | --- | ---: | ---: | ---: |
| 67 | forward/reverse/baseline | 49.59722618500001 | 43.751713785999996 | 49.89788314699999 |
| 68 | reverse/baseline/forward | 47.96054816999998 | 43.378397481000036 | 38.698769075 |
| 69 | baseline/forward/reverse | 50.49175692099999 | 38.99439329799998 | 47.44054049499999 |
| 70 | forward/reverse/baseline | 48.52633732300001 | 47.94592683799999 | 60.218320534999975 |
| 71 | reverse/baseline/forward | 39.55289420500003 | 37.884849212000006 | 50.11723221400001 |
| 72 | baseline/forward/reverse | 56.973051930999986 | 32.20352378000001 | 57.72386305200001 |
| 73 | forward/reverse/baseline | 54.17338699800007 | 37.118150888 | 39.605975114000046 |

## Forward

~~~json
{
  "paired_optimal": 7,
  "wins": 7,
  "losses": 0,
  "baseline_median_wall_s": 49.59722618500001,
  "external_median_e2e_wall_s": 38.99439329799998,
  "median_ratio": 0.8821403362922762,
  "directional_positive": true,
  "median_nodes": 1064,
  "median_lp": 165463
}
~~~

## Reverse

~~~json
{
  "paired_optimal": 6,
  "wins": 3,
  "losses": 3,
  "baseline_median_wall_s": 50.044491553,
  "external_median_e2e_wall_s": 48.66921182099999,
  "median_ratio": 0.9728159900571398,
  "directional_positive": false,
  "median_nodes": 1373.5,
  "median_lp": 240546.0
}
~~~
