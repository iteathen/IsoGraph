# Post-SCIP BLISS active-support audit 0.1

**Date:** 2026-10-06  
**Status:** frozen after identifying an export-layer confound, before audit results.

## Confound

SCIP's transformed MPS export can contain columns that are no longer members of `getVars(transformed=True)`.

The first post-SCIP BLISS recurrence did not distinguish those export-only variables. Several apparent exact symmetry orbits have sizes matching the number of extra exported columns, so they may be mathematically valid symmetries of dead/export-only state rather than useful symmetries of SCIP's active transformed optimization problem.

## Corrected test

Use the same frozen 20-instance recurrence sample.

For each model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
2. Before export, record the exact names returned by:
   - `getVars(transformed=True)`;
   - `getConss(transformed=True)`.
3. Export the transformed MPS.
4. Build the exact colored subdivision graph as before, but add an `ACTIVE` / `EXPORT_ONLY` tag to every variable and row vertex according to the SCIP active-name sets.
5. Run BLISS and replay every generator against colors and edges.
6. Count only generators that move at least one `ACTIVE` variable.

## Outcomes

- `EXACT_ACTIVE_POST_SCIP_SYMMETRY`: at least one exact generator moves an active SCIP variable while preserving the active/export-only partition.
- `EXPORT_ONLY_SYMMETRY`: exact generators exist, but none move an active SCIP variable.
- `NO_VARIABLE_MOVING_GENERATOR`: no variable-moving generator exists even before the active restriction.

This audit supersedes any commercial interpretation of the earlier 8/20 recurrence count. The earlier evidence remains preserved as evidence of the export-layer graph, not silently rewritten.
