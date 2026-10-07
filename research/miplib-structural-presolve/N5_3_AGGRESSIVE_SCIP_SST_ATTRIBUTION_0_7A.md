# n5-3 aggressive SCIP SST attribution 0.7a

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

The aggressive residual-level SCIP control generated exactly two symmetry-named constraints:

- `SSTcut_161_166`
- `SSTcut_167_168`

Do those two incumbent-generated SST cuts directly involve the same transformed variable pairs as the independently certified IsoGraph breakers?

## Frozen procedure

1. Recreate the `n5-3` stage-1 SCIP transformed residual with symmetry disabled.
2. Re-enter the residual under the same aggressive static settings used in control 0.7:
   - `misc/usesymmetry=5`;
   - `propagating/symmetry/symtiming=2`;
   - `propagating/symmetry/addstrongsbcs=TRUE`;
   - `propagating/symmetry/usedynamicprop=FALSE`.
3. Presolve.
4. Inspect every transformed constraint whose name contains `SST`, `sym`, `orbit`, or `lex`.
5. Use SCIP's constraint-variable exposure API to record the variables participating in each such constraint.
6. Normalize only the transformed-name prefix `t_`; do not infer equivalence from indices or names alone.

## Target pairs

- `t_C0021`, `t_C0026`
- `t_C0027`, `t_C0028`

If generic variable exposure is unavailable for a symmetry constraint, report attribution as incomplete rather than guessing.
