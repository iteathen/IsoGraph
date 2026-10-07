# n5-3 cross-solver HiGHS holdout 1.0

**Date:** 2026-10-06  
**Status:** frozen before results.

## Purpose

Test whether the two exact original-model symmetry breakers derived from the SCIP/IsoGraph structural pipeline transfer beneficially to a second MIP solver rather than merely perturbing SCIP favorably.

## Exact discovery gate

Recompute the same fail-closed structural pipeline used by original-injection holdout 0.6:

- SCIP symmetry-off stage-1 presolve;
- active-support filtering;
- optimized exact graph construction;
- BLISS enumeration and replay;
- require exactly:
  - `t_C0021 >= t_C0026`
  - `t_C0027 >= t_C0028`;
- require licensed direct mappings to original:
  - `C0021 >= C0026`
  - `C0027 >= C0028`.

If the gate fails, stop without timing.

## HiGHS benchmark

Use official original `n5-3` in HiGHS 1.15.1, one thread, normal presolve, relative gap 0, seeds `0,1,2,3,4`, 30 seconds per variant:

A. original model unchanged;  
B. original model + the two exact original inequalities.

Alternate execution order. Add the one-time structural frontend wall to B for end-to-end reporting.

Report primal, dual, gap, nodes, LP iterations, solver wall, and end-to-end B wall.

## Interpretation

A directional cross-solver positive requires lower median gap in B and at least 3/5 paired gap wins; if both variants solve optimally on a majority of seeds, use time-to-optimum instead.

Exactness of the added constraints is inherited only after the discovery/mapping gate is reproduced successfully in this run.
