# n5-3 aggressive SCIP residual-symmetry control 0.7

**Date:** 2026-10-06  
**Status:** frozen before results.

## Purpose

SCIP 10.0.2 already has advanced permutation-symmetry machinery. Its documentation explicitly notes that presolving can introduce formulation symmetries and exposes:

- `propagating/symmetry/symtiming`, including value 2 for end-of-presolve computation;
- `misc/usesymmetry` bitset up to 7;
- `propagating/symmetry/addstrongsbcs`;
- `propagating/symmetry/usedynamicprop`.

The exact `n5-3` active symmetries are commercially interesting only if they are not recoverable simply by stronger incumbent parameterization.

## Frozen residual

1. Official MIPLIB `n5-3`.
2. SCIP 10.0.2 stage-1 presolve with `misc/usesymmetry=0`.
3. Export transformed residual.
4. Recompute the exact active-support BLISS certificates and require the same two exact breakers:
   - `t_C0021 >= t_C0026`
   - `t_C0027 >= t_C0028`

## Variants

On the same exported residual, normal SCIP presolve, one thread, fixed seeds 0,1,2, 15 seconds:

A. **default SCIP** — no parameter changes.  
B. **late symmetry** — `misc/usesymmetry=7`, `propagating/symmetry/symtiming=2`.  
C. **aggressive static** — `misc/usesymmetry=5`, `propagating/symmetry/symtiming=2`, `propagating/symmetry/addstrongsbcs=TRUE`, `propagating/symmetry/usedynamicprop=FALSE`.  
D. **exact external control** — `misc/usesymmetry=0` plus the two replay-certified exact breakers.

Record actual parameter values after setting them. For each configuration also presolve once and record transformed dimensions plus symmetry-named constraints.

## Interpretation

If B or C reproduces D's structural constraints or matches/beats D's solve behavior, classify the opportunity as incumbent-configurable rather than a differentiated structural presolver result.

If D retains a consistent advantage and B/C still expose no comparable symmetry handling, the residual-symmetry seam survives this stronger incumbent control.

Short timings are directional only.
