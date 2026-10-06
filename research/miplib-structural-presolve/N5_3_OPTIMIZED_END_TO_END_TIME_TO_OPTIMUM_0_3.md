# n5-3 optimized end-to-end time-to-optimum holdout 0.3

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The active structural frontend profile found that almost all analysis overhead came from scalar indexed access into HiGHS pybind vectors. The frozen graph-builder optimization then reduced that graph-data step from roughly 2.50 s median to roughly 0.012 s while preserving graph names, colors, edges, metadata, BLISS generator count, active generator count, and the two selected exact breaker pairs.

This holdout measures the resulting **full economic path**, not another microbenchmark.

## Exact structural treatment

Use the same exact active-support pipeline already qualified experimentally:

1. SCIP 10.0.2 / PySCIPOpt 6.2.1 loads official MIPLIB `n5-3`;
2. symmetry disabled;
3. SCIP presolve;
4. export transformed residual;
5. HiGHS parses the transformed linear representation;
6. export-only zero-support/fixed variables are removed from structural analysis only after the existing safety guard;
7. construct the exact coefficient-colored active graph using the bulk-materialized builder;
8. BLISS enumerates generators;
9. every selected generator is replay-checked against colors and the complete edge set;
10. select the same two independent involutive active generators;
11. add their exact breakers to the transformed residual:
   - `t_C0021 >= t_C0026`
   - `t_C0027 >= t_C0028`.

If the recovered breaker pair differs, the run fails rather than adapting.

## Fresh holdout seeds

Use seeds:

~~~text
15 16 17 18 19 20 21
~~~

No earlier timing result used these seeds.

## Comparison

For each seed:

### A — incumbent baseline

- load original official `n5-3`;
- SCIP default symmetry/presolve;
- one thread;
- solve to optimality or 90-second limit.

Measure wall from SCIP model construction/load through termination.

### B — optimized structural frontend

- pay the measured structural frontend cost;
- load the exported SCIP-presolved residual;
- SCIP symmetry disabled; normal SCIP presolve is permitted on residual re-entry, matching the previously tested active-only production path;
- add the two exact breakers;
- solve to optimality or 90-second limit.

For B report both solver-only wall and:

~~~text
frontend wall + residual solve wall
~~~

as the end-to-end wall.

## Acceptance / interpretation

- Both variants must preserve the same optimal objective whenever both solve optimally.
- Main metric: paired end-to-end wall time on seeds where both variants solve optimally.
- Report median ratio and paired wins/losses.
- Also report nodes and LP iterations.
- Seven fresh seeds are directional evidence only, not a production performance claim.
- The source download itself is excluded equally from both variants.


## Pre-run correction

Before any 0.3 timing data were generated, the residual-reentry clause was corrected from “presolve disabled” to normal SCIP presolve. Previous active-only time-to-optimum tests used normal residual re-entry presolve, and disabling it would test an artificially weakened path rather than the intended production composition. This correction is frozen before execution.
