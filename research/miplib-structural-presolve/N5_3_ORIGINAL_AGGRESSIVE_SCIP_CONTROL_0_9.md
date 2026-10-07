# n5-3 original-model aggressive SCIP control 0.9

**Date:** 2026-10-06  
**Status:** frozen before results.

## Purpose

Original-breaker holdout 0.6 showed a strong result when two exact post-SCIP symmetry breakers were mapped back to the original model. Before treating that as differentiated value, test whether stronger built-in SCIP symmetry timing/handling on the **same original model** produces the same or better effect.

## Exact discovery and mapping gate

Recompute the exact active-support BLISS certificates after a separate symmetry-off stage-1 presolve and require:

- transformed breakers:
  - `t_C0021 >= t_C0026`
  - `t_C0027 >= t_C0028`;
- direct active original→transformed mappings licensing:
  - `C0021 >= C0026`
  - `C0027 >= C0028`.

If the mapping/certificate gate fails, stop without benchmarking.

## Fresh seeds

`48,49,50,51,52`

60 seconds per variant, alternating order cyclically.

### A — default original SCIP

Official original model, default SCIP symmetry and presolve.

### B — aggressive built-in original SCIP

Official original model with:

- `misc/usesymmetry=5`;
- `propagating/symmetry/symtiming=2`;
- `propagating/symmetry/addstrongsbcs=TRUE`;
- `propagating/symmetry/usedynamicprop=FALSE`.

Record the actual parameter values.

### C — exact external breakers on original model

Official original model with default SCIP settings plus the two exact mapped inequalities.

The one-time structural frontend wall is added to every C end-to-end comparison.

## Interpretation

If B matches or beats C, classify the opportunity as plausibly incumbent-configurable.

The IsoGraph seam survives this control directionally only if:

- C beats B end-to-end on at least 4/5 paired optimal trials; and
- median `C_end_to_end / B_wall < 0.95`.

All optimal objectives must agree within numeric tolerance.
