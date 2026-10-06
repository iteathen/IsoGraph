# n5-3 active-only symmetry long holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Motivation

The corrected active double-breaker benchmark established a genuine post-SCIP signal:

- two replay-verified active generators;
- two safely composable exact breakers;
- median 15-second relative gap improved from 0.5091688 to 0.4451359;
- 3/5 paired gap wins.

However, the structural frontend consumed 8.62 seconds because the exported SCIP MPS also contained 212 inactive zero-support columns and 206 irrelevant export-only symmetry generators.

## Active-only graph

After SCIP 10.0.2 presolve with symmetry disabled:

1. record SCIP's active transformed variable/constraint names;
2. export the transformed MPS;
3. require every exported column not in SCIP's active-variable set to have **zero matrix incidence** before dropping it from structural analysis;
4. build the exact colored subdivision graph using active variables and transformed rows only;
5. run BLISS and replay all generators;
6. recover the independently composable active involutions and the same exact breaker law.

If any export-only column has nonzero incidence, fail closed rather than silently dropping it.

## Long holdout

On the same exported transformed residual, with fresh SCIP normal presolve and symmetry disabled, seeds 0..4:

- A: baseline, 60 seconds;
- B: both exact active breakers, 60 seconds.

Report primal, dual, relative gap, nodes, LP iterations, and all paired outcomes.

Report separately:

- stage-1 SCIP presolve time;
- active-only graph build time;
- BLISS + replay time;
- total structural frontend time.

The commercial signal requires both:

1. structural frontend overhead small relative to the solve window;
2. lower median gap with the exact breakers.

Five fixed-seed timed trials remain directional, not production qualification.
