# neos-3627168-kasai original-breaker holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The independent second-block active-support recurrence found exact post-SCIP active symmetry in `neos-3627168-kasai`:

- active transformed variables: 1400;
- export-only variables: 59;
- active-moving BLISS generators: 2;
- largest active orbit: 14.

Fresh default-SCIP re-entry differed from symmetry-off re-entry but exposed no symmetry-named constraint, so incumbent attribution remained ambiguous.

## Exact treatment

1. Official MIPLIB `neos-3627168-kasai`.
2. SCIP 10.0.2 presolve with `misc/usesymmetry=0`, one thread, fixed seed.
3. Export transformed residual.
4. Retain only SCIP-active transformed variables after fail-closed export-only checks.
5. Build the exact coefficient-colored graph with the bulk-materialized builder.
6. BLISS enumerate all generators.
7. Replay every generator against exact vertex colors and the complete precomputed edge set.
8. Among active-moving generators, choose the lexicographically first tuple:
   `(first_moved_variable_name, image_name, generator_index)`.
9. Use SCIP original→transformed mappings to find original variables corresponding to the chosen transformed pair.

## Mapping gate

The original breaker is licensed only if both transformed variables:

- map one-to-one from original variables;
- are active;
- are not FIXED, AGGREGATED, MULTAGGR, or NEGATED;
- preserve variable type and global bounds.

If the gate fails, report `MAPPING_NOT_LICENSED` and do not benchmark.

If licensed, add the corresponding original inequality:

~~~text
x >= g(x)
~~~

which preserves at least one representative of every finite symmetry orbit.

## Fresh holdout

Seeds: `0,1,2,3,4`.

30 seconds per variant, alternating execution order:

- A: official original model, SCIP default;
- B: official original model + exact mapped breaker, SCIP default.

The one-time structural frontend wall is included in B end-to-end time.

## Directional threshold

If at least three pairs are both optimal, compare time-to-optimum. A positive requires:

- at least 4/5 paired end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

Otherwise compare finite final gap/bound width, requiring at least 4/5 paired wins and lower median gap.

All paired optimal objective values must agree within numeric tolerance.
