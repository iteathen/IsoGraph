# mcsched exact S2 fresh-seed holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

The second independent active-support recurrence found an exact active post-SCIP symmetry in `mcsched`. The action-order pass proved that the largest active orbit has size 2 and exact action order `2! = 2`, so its induced action is the full symmetric group `S_2`. Fresh default SCIP re-entry showed no visible symmetry recovery.

## Exact treatment

Recompute from the official MIPLIB model after SCIP 10.0.2 presolve with symmetry disabled, using the bulk-materialized exact graph builder. Replay all BLISS generators. Require the largest active orbit to have size 2 and induced group order 2.

For lexicographically ordered orbit members `x_1,x_2`, add the exact canonicalization:

~~~text
x_1 >= x_2
~~~

Every solution orbit has a representative satisfying this order.

## Fresh holdout

Seeds: `3,4,5,6,7`.

On the same SCIP-transformed residual, 20 seconds per variant:

- A: fresh SCIP default symmetry;
- B: SCIP symmetry disabled + exact S2 canonicalization.

Report gap, bound width, nodes, LP iterations, primal/dual bounds, wall time, and structural frontend cost.

Directional confirmation requires lower median gap in B (or lower median time-to-optimum if both median gaps are zero). Five seeds are exploratory only.
