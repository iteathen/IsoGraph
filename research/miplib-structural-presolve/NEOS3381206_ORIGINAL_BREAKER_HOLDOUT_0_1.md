# neos-3381206-awhea optimized original-breaker holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The earlier active-symmetry value screen classified `neos-3381206-awhea` neutral because all successful variants reached zero final gap. Inspection of time-to-optimum showed the exact active breaker was materially faster and converted one 15-second default timeout into an optimal solve. That screen used an 8.47-second scalar structural frontend, later shown on `n5-3` to be dominated by avoidable Python/pybind access overhead.

## Exact discovery

1. Official MIPLIB `neos-3381206-awhea`.
2. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
3. Export transformed residual and retain only SCIP-active transformed variables after fail-closed export-only checks.
4. Use the bulk-materialized exact coefficient-colored graph builder.
5. BLISS enumerate and replay every generator.
6. Select the same lexicographically first active-moving exact generator as the preserved screen; require transformed pair:
   - `t_C0001 >= t_C0002`.

## Original mapping gate

Use SCIP original→transformed mapping for `C0001` and `C0002`. The original inequality `C0001 >= C0002` is licensed only if both map directly to active transformed variables with matching names, domains, and non-aggregated statuses.

## Fresh holdout

Seeds: `3,4,5,6,7`.  
30 seconds per variant, alternating order.

A. official original model, SCIP default;  
B. official original model + exact mapped inequality, SCIP default.

Add the one-time optimized structural frontend wall to B end-to-end time.

## Directional threshold

If at least 3 pairs are both optimal, use time-to-optimum. A positive requires:

- at least 4/5 paired end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

If fewer than 3 pairs are both optimal, compare finite final gap/bound width instead. All paired optimal objectives must agree.
