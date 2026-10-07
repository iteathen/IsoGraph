# n5-3 original-model breaker injection replication 0.8

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Original-model injection holdout 0.6 mapped the exact post-SCIP active symmetries back to direct original variables and, on seeds 36–40, produced 5/5 end-to-end wins with median wall 39.86 s → 25.27 s including the structural frontend.

This replication is frozen only because that result was positive.

## Unchanged exact pipeline

- official MIPLIB `n5-3`;
- SCIP symmetry-off stage-1 presolve for discovery;
- fail-closed original→transformed mapping gate;
- optimized active-support graph builder;
- BLISS enumeration and exact replay;
- require exactly:
  - `t_C0021 >= t_C0026`
  - `t_C0027 >= t_C0028`;
- require direct licensed mappings back to:
  - `C0021 >= C0026`
  - `C0027 >= C0028`;
- solve the **original** model under normal/default SCIP settings with those two original constraints.

No algorithmic or breaker-selection changes are allowed.

## Fresh seeds

`41,42,43,44,45,46,47`

60 seconds per variant, alternating execution order.

A. original model, SCIP default;  
B. original model + two exact mapped breakers, SCIP default.

The one-time structural frontend wall is added to every B end-to-end comparison.

## Replication threshold

A successful replication requires:

- at least 5/7 paired end-to-end wins among pairs where both solve optimally; and
- median `B_end_to_end / A_wall < 0.95`.

Objectives must agree within numeric tolerance on every paired optimal trial.
