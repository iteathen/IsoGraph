# n5-3 original-model breaker injection holdout 0.6

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Can the two exact post-SCIP active-symmetry breakers be mapped back to the original MIP and injected **before the final solve**, avoiding residual re-entry entirely?

## Exact mapping gate

Start from the official `n5-3` model with SCIP symmetry disabled and run stage-1 presolve only for structural discovery.

For each original variable:

- `C0021`
- `C0026`
- `C0027`
- `C0028`

retrieve its transformed variable using SCIP's original→transformed variable mapping.

The original-injection experiment is licensed only if all four mapped transformed variables:

1. have names exactly:
   - `t_C0021`
   - `t_C0026`
   - `t_C0027`
   - `t_C0028`;
2. are active;
3. are not FIXED, AGGREGATED, MULTAGGR, or NEGATED;
4. have the same binary/integer domain semantics required by the exact transformed automorphism certificate.

Then the transformed exact breakers

~~~text
t_C0021 >= t_C0026
t_C0027 >= t_C0028
~~~

correspond directly to original-model inequalities

~~~text
C0021 >= C0026
C0027 >= C0028
~~~

under SCIP's semantics-preserving transformation.

If the mapping gate fails, stop with `MAPPING_NOT_LICENSED`; do not benchmark.

## Structural discovery

Recompute the exact active-support graph, BLISS generators, replay, and breaker selection exactly as in the optimized `n5-3` frontend. Require the same two transformed breaker pairs.

## Fresh holdout

Seeds: `36,37,38,39,40`.

For each seed, 60 seconds per variant, alternating execution order:

A. official original `n5-3`, SCIP default settings;  
B. official original `n5-3` + the two mapped original breakers, SCIP default settings.

The structural frontend is run once and its wall time is added to every B end-to-end comparison.

Report status, objective, dual bound, gap, nodes, LP iterations, solver wall, and end-to-end B wall.

## Directional success rule

Among paired trials where both variants solve optimally, compare time-to-optimum.

If fewer than three pairs are both optimal, compare final bound width/gap instead.

This is exploratory. Exactness comes from the mapping gate plus the independently replayed transformed automorphism certificates.
