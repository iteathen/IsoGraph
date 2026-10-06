# Post-SCIP missed-active symmetry value 0.2 — second holdout block

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The independent second-block active-support recurrence found six exact active post-SCIP symmetry positives. The subsequent frozen attribution screen classified four as `NO_VISIBLE_SCIP_RECOVERY`:

- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `ns1208400`

The two ambiguous cases (`neos-3627168-kasai`, `neos5`) are excluded from this value benchmark because this experiment asks specifically whether **clear residual misses** can be converted into solver value.

No solve outcome is used for admission.

## Exact breaker selection

For each model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`;
2. capture SCIP-active transformed variable/constraint names;
3. export the transformed MPS;
4. encode the complete coefficient system as an ACTIVE/EXPORT_ONLY vertex-colored subdivision graph;
5. run BLISS;
6. replay every generator used for authority;
7. retain generators moving at least one ACTIVE variable;
8. choose the lexicographically first pair `x, g(x)` induced by an exact active-moving generator;
9. add `x >= g(x)`.

The breaker is exact because the chosen finite automorphism preserves the objective and feasible set; every orbit has an objective-equal representative satisfying the selected orientation.

## Controlled value benchmark

On the same transformed residual, seeds 0,1,2, 15 seconds:

A. fresh SCIP default symmetry, presolve disabled;  
B. SCIP symmetry disabled, presolve disabled;  
C. SCIP symmetry disabled + exact active breaker.

Record primal, dual, relative gap, absolute bound width, nodes, LP iterations, wall time, and structural front-end overhead.

A directional value win requires C to have lower median relative gap than both A and B.

This is exploratory value measurement, not production qualification.
