# n5-3 original-model aggressive SCIP control 0.9

**Frontend:** 0.130733s
**Directional seam survives:** True

| Seed | Default wall | Aggressive wall | IG solver wall | IG end-to-end |
| ---: | ---: | ---: | ---: | ---: |
| 48 | 29.081818693999992 | 36.48441976500001 | 26.735172790000007 | 26.865906008000024 |
| 49 | 22.880207078000012 | 28.469151122 | 13.851915862999988 | 13.982649081000005 |
| 50 | 36.12343924000004 | 24.271386567000036 | 19.307849887999964 | 19.43858310599998 |
| 51 | 25.671888790000025 | 20.080475455 | 25.408154545000002 | 25.53888776300002 |
| 52 | 31.03764111700002 | 26.202553689000013 | 24.23300136299997 | 24.36373458099999 |

## Summary

~~~json
{
  "paired_all_optimal": 5,
  "default_median_wall_s": 29.081818693999992,
  "aggressive_median_wall_s": 26.202553689000013,
  "ig_solver_median_wall_s": 24.23300136299997,
  "ig_end_to_end_median_wall_s": 24.36373458099999,
  "median_ig_over_aggressive_ratio": 0.800884739416954,
  "ig_vs_aggressive_wins": 4,
  "ig_vs_aggressive_losses": 1,
  "ig_vs_default_wins": 5,
  "frontend_wall_s": 0.13073321800001736,
  "default_median_nodes": 1412,
  "aggressive_median_nodes": 1250,
  "ig_median_nodes": 1020,
  "directional_seam_survives": true
}
~~~

Actual SCIP parameter values are recorded per trial in RESULT.json.
