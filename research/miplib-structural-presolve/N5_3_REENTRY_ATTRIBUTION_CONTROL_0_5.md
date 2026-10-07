# n5-3 residual re-entry attribution control 0.5

**Date:** 2026-10-06  
**Status:** frozen before results.

## Confound being tested

Optimized end-to-end holdout 0.3 compared:

- A: SCIP default on the original MIP;
- C: SCIP presolve -> transformed residual -> IsoGraph exact active-symmetry analysis -> residual re-entry + two exact breakers.

That comparison changes **two things**:

1. the model is presolved/exported/re-entered before the timed residual solve;
2. IsoGraph adds exact symmetry breakers.

Therefore an end-to-end speedup cannot yet be attributed specifically to IsoGraph. This control is frozen before replication 0.4 results are observed.

## Fresh seeds

~~~text
29 30 31 32 33 34 35
~~~

## Three variants

For each seed:

### A — original incumbent

Official `n5-3`, SCIP default symmetry/presolve, one thread, 90-second limit.

### B — residual re-entry control

- SCIP symmetry disabled;
- stage-1 SCIP presolve;
- export transformed residual;
- fresh SCIP re-entry on that residual with symmetry disabled and normal presolve;
- **no IsoGraph constraint**.

End-to-end B wall includes stage-1 load/presolve/export plus residual solve.

### C — IsoGraph structural treatment

Identical stage-1 residual to B, then:

- parse residual;
- exact active-support filtering;
- optimized bulk graph construction;
- BLISS exact automorphism enumeration and replay;
- recover exactly:
  - `t_C0021 >= t_C0026`
  - `t_C0027 >= t_C0028`;
- fresh SCIP residual re-entry with symmetry disabled and normal presolve;
- add both exact breakers.

End-to-end C wall includes stage-1 load/presolve/export, all structural analysis, and residual solve.

## Exactness

Whenever variants solve optimally, objectives must agree within numeric tolerance. The run fails on breaker drift or objective mismatch.

## Attribution criterion

The previous A-vs-C speedup is considered **IsoGraph-specific** on this instance only if, among all seven paired optimal trials:

- C beats B end-to-end on at least 5/7 seeds; and
- median `C_end_to_end / B_end_to_end < 0.95`.

Otherwise the earlier gain is classified as primarily residual-reentry/incumbent-composition effect or unresolved mixture rather than demonstrated IsoGraph value.

A-vs-B and A-vs-C are also reported separately.
