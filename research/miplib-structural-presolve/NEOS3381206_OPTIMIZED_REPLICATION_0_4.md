# neos-3381206 optimized original-breaker replication 0.4

**Date:** 2026-10-06  
**Status:** conditionally frozen before holdout 0.3 results.

## Trigger

Run this replication **only if** `NEOS3381206_OPTIMIZED_ORIGINAL_BREAKER_HOLDOUT_0_3` satisfies its predeclared directional threshold:

- at least 4/5 paired end-to-end wins; and
- median end-to-end ratio < 0.95.

If 0.3 fails that threshold, this replication remains unexecuted.

## Unchanged exact pipeline

No algorithmic changes are allowed from holdout 0.3:

- official MIPLIB `neos-3381206-awhea`;
- SCIP symmetry-off stage-1 presolve for discovery;
- fail-closed direct original→transformed mapping for `C0001`, `C0002`;
- bulk active-support graph builder;
- BLISS exact generators;
- cached-edge-set full replay of every generator;
- require exactly `t_C0001 >= t_C0002`;
- require licensed original inequality `C0001 >= C0002`;
- solve the original model under normal SCIP defaults with the exact original inequality.

## Fresh seeds

`13,14,15,16,17,18,19`.

30 seconds per variant, alternating order.

A. original model, SCIP default;  
B. original model + exact breaker, SCIP default.

The one-time structural frontend wall is added to every B end-to-end comparison.

## Replication threshold

Among paired optimal trials:

- at least 5/7 end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

All paired optimal objective values must agree within numeric tolerance.
