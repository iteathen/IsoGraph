# n5-3 end-to-end structural front-end benchmark 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Does the exact `n5-3` symmetry exposed by HiGHS presolve create practical value when used as a front-end transformation before SCIP, compared with giving SCIP the original MIP directly?

This is the commercially relevant composition:

~~~text
original MIP
-> HiGHS exact presolve
-> exact structural automorphism discovery
-> exact symmetry breaker
-> SCIP solve
~~~

## Frozen variants

For seeds 0, 1, 2, 3, 4, one thread, 30-second solve budget per variant:

A. **SCIP original/default** — official MIPLIB input, normal SCIP presolve/symmetry.

B. **HiGHS residual -> SCIP** — export the HiGHS 1.15.1 presolved residual, then solve it in SCIP with additional presolve disabled and symmetry disabled.

C. **HiGHS residual + exact structural breaker -> SCIP** — same residual and settings as B, plus the already certified `C0012 >= C0039` breaker recovered from the exact residual automorphism.

The breaker is re-certified from the residual graph in this harness before C is allowed to run.

## Accounting

Record separately:

- HiGHS presolve wall time;
- exact structural discovery/certificate wall time;
- each SCIP solve wall time;
- primal, dual, relative gap, nodes, LP iterations.

Report both solver-only comparisons and a front-end overhead figure. Do not claim an end-to-end speedup merely because the fixed-time residual has a better gap if preprocessing cost exceeds the useful saved solve time.

This experiment tests a pipeline, not novelty of HiGHS or SCIP.
