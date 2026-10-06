# n5-3 active graph-builder optimization profile 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Frontend profile 0.1 found median structural post-export cost 2.349 s, of which 2.315 s was spent constructing the active graph data in Python. BLISS itself was ~0.0027 s and exact replay ~0.0186 s.

## Hypothesis

The graph-data cost is primarily repeated Python-to-pybind indexed access into HiGHS vectors rather than structural complexity.

## Exact optimization

Compare:

A. the frozen scalar-index builder from profile 0.1;  
B. a bulk builder that first materializes column names, objective coefficients, bounds, integrality values, and row bounds into native Python lists, then constructs the same graph data using an integer remap array.

The optimized builder may not change:

- active-variable admission;
- export-only safety checks;
- variable or row color tuples;
- coefficient canonicalization;
- edge incidence;
- graph size;
- BLISS generator count;
- replay-verified active generator actions;
- selected exact breaker pairs.

The run must fail if graph names, color vectors, edge lists, metadata, generator count, or selected breaker pairs differ.

## Measurement

After one warm-up:

- run each builder 20 times on the same parsed SCIP-transformed `n5-3` residual;
- report median/min/max wall;
- report speed ratio;
- run BLISS/replay on both exact graph outputs and verify certificate identity.

This is an implementation benchmark only; it changes no mathematical authority.
