# n5-3 aggressive SCIP + exact external breaker complementarity 1.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The residual-level aggressive SCIP control generated two SST cuts on different variable pairs than the two exact IsoGraph-derived breakers. Therefore built-in aggressive symmetry and the external exact constraints may be complementary even if their standalone performance is similar.

## Exact gate

Recompute and require the same exact discovery/mapping pipeline:

- transformed exact breakers:
  - `t_C0021 >= t_C0026`
  - `t_C0027 >= t_C0028`;
- licensed original mappings:
  - `C0021 >= C0026`
  - `C0027 >= C0028`.

## Fresh seeds

`53,54,55,56,57,58,59`

60 seconds per variant, alternating execution order.

### A — aggressive SCIP original model

- `misc/usesymmetry=5`
- `propagating/symmetry/symtiming=2`
- `propagating/symmetry/addstrongsbcs=TRUE`
- `propagating/symmetry/usedynamicprop=FALSE`

### B — aggressive SCIP + exact external breakers

Same aggressive settings plus the two exact original inequalities.

The one-time structural frontend wall is included in B end-to-end time.

## Complementarity threshold

External structure is directionally complementary only if:

- at least 5/7 paired optimal trials are end-to-end wins for B; and
- median `B_end_to_end / A_wall < 0.95`.

Every paired optimal objective must agree within numeric tolerance.
