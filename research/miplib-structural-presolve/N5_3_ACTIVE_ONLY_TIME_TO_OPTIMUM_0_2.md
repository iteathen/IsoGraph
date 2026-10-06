# n5-3 active-only time-to-optimum holdout 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Fresh-seed holdout 0.2 (seeds 5,6,7) solved both baseline and exact double-breaker variants to optimality before the 60-second cap. Final gaps therefore tied at zero. Median solver wall was 37.1080 s baseline versus 33.6718 s with the exact breakers, while median LP iterations fell from 172,953 to 146,079.

This follow-up is outcome-selected confirmation of **time to certified optimum**, not an independent prevalence test.

## Exact structural front-end

Reuse the corrected active-only pipeline:

1. SCIP 10.0.2 presolve with symmetry disabled;
2. record active transformed variable names;
3. export transformed MPS;
4. drop an export-only column from structural analysis only after proving it has zero matrix incidence and either zero objective coefficient or a fixed domain;
5. build the exact coefficient-colored graph on active variables;
6. BLISS + exact replay;
7. recover the same two independently composable active involutions and breakers:
   - `t_C0021 >= t_C0026`
   - `t_C0027 >= t_C0028`.

## Fresh holdout

Use unseen seeds **8,9,10,11,12,13,14**.

For each seed, cap each solve at 90 seconds. Alternate execution order to reduce systematic same-run ordering bias:

- even seed: baseline then double-breaker;
- odd seed: double-breaker then baseline.

Both variants use fresh SCIP, normal presolve, `misc/usesymmetry=0`, one thread.

## Primary metric

When both paired variants reach certified optimality:

- paired solver-wall ratio;
- median solver wall;
- paired wall-time wins/losses;
- LP iterations and nodes as secondary diagnostics.

If either member of a pair does not reach optimality, retain the result but do not treat its wall time as a certified time-to-optimum comparison.

Report structural frontend overhead separately and include it in a second end-to-end time comparison.

The experiment remains directional; seven fresh fixed-seed trials do not establish a production speedup.
