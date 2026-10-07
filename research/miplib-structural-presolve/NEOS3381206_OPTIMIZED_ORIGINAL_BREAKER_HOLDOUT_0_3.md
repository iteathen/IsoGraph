# neos-3381206 optimized original-breaker holdout 0.3

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The first original-model holdout on `neos-3381206-awhea` showed a strong solver-only effect but lost end-to-end because the structural frontend cost 5.35 s. Profiling localized 4.85 s of that cost to replaying 474 exact generators with repeated reconstruction of the graph edge set.

A separate replay-optimization experiment has been frozen to cache the edge set once while preserving the complete certificate and selected breaker exactly.

## Exact pipeline

Recompute from the official MIPLIB model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
2. Fail-closed original→transformed mapping gate for `C0001` and `C0002`.
3. Active-support graph construction with the bulk-materialized builder.
4. BLISS generator enumeration.
5. Replay every generator against:
   - exact vertex colors;
   - the complete edge set, precomputed once and reused;
   - variable-partition preservation.
6. Require the lexicographically selected exact transformed breaker:
   - `t_C0001 >= t_C0002`.
7. Require the original mapping gate to license:
   - `C0001 >= C0002`.

No certificate or replay check may be weakened.

## Fresh holdout

Seeds: `8,9,10,11,12`.

30 seconds per variant, alternating execution order:

- A: official original model, SCIP default;
- B: official original model + exact mapped breaker, SCIP default.

The one-time optimized structural frontend wall is included in every B end-to-end comparison.

## Directional threshold

If at least three pairs are both optimal, use time-to-optimum. A positive requires:

- at least 4/5 paired end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

All paired optimal objectives must agree within numeric tolerance.
