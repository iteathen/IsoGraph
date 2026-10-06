# Post-SCIP active-symmetry value holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The active-support audit on the original frozen 20-instance sample found exactly five models with replay-verified automorphisms that move variables SCIP still reports as active after symmetry-disabled presolve:

- `n5-3`
- `neos-911970`
- `seymour1`
- `mas74`
- `mas76`

The sample is fixed from that audit before solve results.

## Exact breaker selection

For each model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`;
2. record active transformed variable/constraint names before export;
3. export transformed MPS;
4. encode the exact coefficient-colored subdivision graph with ACTIVE / EXPORT_ONLY support tags;
5. run BLISS and replay every generator;
6. retain only generators moving at least one ACTIVE variable;
7. for each retained generator, choose the lexicographically first active moved variable `x` and its image `g(x)`;
8. select the lexicographically first resulting pair over all retained generators;
9. add `x >= g(x)`.

Because the chosen generator is an exact finite objective-preserving automorphism, every solution orbit under its cycle has a representative satisfying that inequality.

## Controlled value benchmark

On the same exported transformed residual, seeds 0,1,2, 10 seconds each:

A. fresh SCIP default symmetry, presolve disabled;  
B. SCIP symmetry disabled, presolve disabled;  
C. SCIP symmetry disabled + the exact ACTIVE breaker.

Report primal, dual, relative gap, bound width, nodes, LP iterations, and structural-front-end overhead.

A directional value win requires C to have a lower median gap than both A and B. This is exploratory; three short trials do not establish production speedup.
