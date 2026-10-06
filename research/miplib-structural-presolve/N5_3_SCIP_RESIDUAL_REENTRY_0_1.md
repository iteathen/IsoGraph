# n5-3 SCIP residual re-entry control 0.1

**Date:** 2026-10-06
**Status:** frozen before results.

## Question

The SCIP-transformed n5-3 formulation produced with symmetry disabled contains a large exact automorphism group (BLISS: 208 variable-moving generators). Does a fresh SCIP invocation detect/exploit that symmetry when the transformed residual is supplied as a new input model?

## Pipeline

1. Official n5-3 MPS.
2. SCIP 10.0.2 presolve with misc/usesymmetry=0.
3. Export transformed model with names.
4. Re-enter that exported model into fresh SCIP instances.

For seeds 0..4, 15 seconds:

A. fresh SCIP default settings on residual;
B. fresh SCIP with misc/usesymmetry=0 on residual.

Both get their normal presolve. Also record presolve snapshots for default vs symmetry-off: transformed dimensions, constraint handler counts, and any constraint names containing orbitope/sym/orbit/lex.

## Interpretation

A clear A>B result or explicit symmetry constraints means the symmetry opportunity is already recoverable by incumbent SCIP when the residual is presented as a new formulation. A null difference does not prove SCIP has no internal symmetry effects, but it weakens the solver-composition explanation.
