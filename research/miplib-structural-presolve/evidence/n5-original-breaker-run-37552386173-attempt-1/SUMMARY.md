# n5-3 original-model breaker injection holdout 0.6

**Status:** MAPPING_LICENSED_AND_BENCHMARKED
**Frontend:** 0.197382s
**Original breakers:** [('C0021', 'C0026'), ('C0027', 'C0028')]

| Seed | Order | Baseline status | IG status | Baseline wall | IG solver wall | IG end-to-end |
| ---: | --- | --- | --- | ---: | ---: | ---: |
| 41 | ig_first | optimal | optimal | 45.276685869999994 | 35.755550777 | 35.952933245000004 |
| 42 | baseline_first | optimal | optimal | 36.064381010000005 | 34.631313301000006 | 34.82869576900001 |
| 43 | ig_first | optimal | optimal | 29.071519024000025 | 28.129746908000016 | 28.327129376000016 |
| 44 | baseline_first | optimal | optimal | 41.90405896699997 | 29.94441182899999 | 30.14179429699999 |
| 45 | ig_first | optimal | optimal | 39.154643969000006 | 23.642997981000008 | 23.84038044900001 |
| 46 | baseline_first | optimal | optimal | 44.86536663100003 | 27.80205436800003 | 27.99943683600003 |
| 47 | ig_first | optimal | optimal | 53.735197237999955 | 40.160815076000006 | 40.35819754400001 |

## Summary

~~~json
{
  "paired_both_optimal": 7,
  "baseline_median_wall_s": 41.90405896699997,
  "ig_solver_median_wall_s": 29.94441182899999,
  "ig_end_to_end_median_wall_s": 30.14179429699999,
  "paired_end_to_end_wins": 7,
  "paired_end_to_end_losses": 0,
  "frontend_wall_s": 0.1973824680000007,
  "baseline_median_nodes": 1318,
  "ig_median_nodes": 936,
  "baseline_median_lp": 196706,
  "ig_median_lp": 126193,
  "baseline_median_gap_all": 0.0,
  "ig_median_gap_all": 0.0,
  "paired_gap_wins_all": 0,
  "median_end_to_end_ratio": 0.7510570281383442,
  "replication_success": true
}
~~~
