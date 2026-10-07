# n5-3 aggressive SCIP timeout-rescue holdout 1.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Complementarity holdout 1.1 failed its predeclared paired-performance threshold:

- paired end-to-end wins: 3/5 among pairs where both solved optimally;
- median external/aggressive ratio: 0.9546, above the 0.95 threshold.

That claim remains failed.

However, a distinct censored-outcome signal appeared:

- aggressive SCIP solved 5/7 seeds within 60 s;
- aggressive SCIP + the exact external breakers solved 7/7.

This holdout tests only that **solve-rate / timeout-rescue** hypothesis on fresh seeds.

## Exact treatment

Unchanged from 1.1:

- official MIPLIB `n5-3`;
- exact structural discovery under SCIP symmetry-off stage-1 presolve;
- fail-closed direct mapping back to:
  - `C0021 >= C0026`
  - `C0027 >= C0028`;
- aggressive SCIP settings:
  - `misc/usesymmetry=5`
  - `propagating/symmetry/symtiming=2`
  - `propagating/symmetry/addstrongsbcs=TRUE`
  - `propagating/symmetry/usedynamicprop=FALSE`.

No breaker selection or solver settings may change.

## Fresh seeds

`60,61,62,63,64,65,66`.

60 seconds per variant, alternating execution order.

A. aggressive SCIP original model;  
B. aggressive SCIP original model + exact external breakers.

The one-time structural frontend wall is included in B end-to-end time.

## Primary metric

Count optimal solves within 60 seconds.

A directional timeout-rescue confirmation requires:

- B solves at least 6/7 seeds optimally; and
- B solves at least **two more** seeds optimally than A.

## Secondary metrics

Report:

- paired end-to-end wins/losses among pairs where both are optimal;
- median wall among paired optimal solves;
- nodes and LP iterations;
- objective agreement for every paired optimal solve.

The primary solve-rate criterion is frozen before seeds 60–66 run and is not replaced by secondary metrics.
