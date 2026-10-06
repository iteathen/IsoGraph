# Post-SCIP missed-symmetry value holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The frozen 20-instance post-SCIP BLISS recurrence found eight exact variable-moving symmetry groups. The independent attribution screen classified exactly four as having **no visible recovery by fresh default SCIP**:

- `reblock115`
- `n5-3`
- `b1c1s1`
- `markshare2`

This holdout is limited to those four; no solve result is used for selection.

## Exact treatment

For each instance:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`;
2. export transformed residual;
3. build the exact coefficient-colored subdivision graph;
4. obtain BLISS generators and replay them;
5. compute variable orbits from the exact group generators;
6. choose the largest nontrivial variable orbit; tie-break by lexicographic member-name tuple;
7. choose the lexicographically smallest member `r` as representative;
8. add `x_r >= x_j` for every other `j` in that orbit.

This orbit-max canonicalization is objective-preserving: every solution orbit contains a representative in which the selected representative coordinate attains the maximum on its variable orbit.

## Benchmark

For seeds 0, 1, 2 and 10 seconds per solve, use the *same transformed residual*:

A. fresh SCIP default symmetry, presolve disabled;  
B. SCIP symmetry disabled, presolve disabled;  
C. SCIP symmetry disabled + exact orbit-max constraints.

Record primal, dual, gap, nodes, LP iterations, wall time, group/orbit size, BLISS time, graph-build time, and total structural-front-end time.

## Commercial acceptance signal

An instance is a directional value win only if C has a lower median gap than both A and B across the three seeds. Node count alone is not sufficient.

The experiment is exploratory and does not establish a production speedup from three short trials.
