# Post-SCIP active positive attribution 0.2 — second holdout block

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The independent second-block active-support recurrence found exactly six models with replay-verified automorphisms that move SCIP-active transformed variables:

- `mcsched`
- `neos-1171737`
- `neos-3381206-awhea`
- `neos-3627168-kasai`
- `neos5`
- `ns1208400`

This follow-up is restricted to those six before attribution results are observed.

## Question

When each symmetry-off SCIP residual is re-entered into a fresh SCIP 10.0.2 model, does SCIP's default symmetry machinery visibly recover the exact residual symmetry?

## Frozen procedure

For every positive:

1. official MIPLIB model -> SCIP presolve with `misc/usesymmetry=0`;
2. export the transformed residual;
3. fresh SCIP presolve on that residual with default symmetry;
4. fresh SCIP presolve on the same residual with `misc/usesymmetry=0`;
5. compare:
   - transformed row/variable dimensions;
   - constraint-handler counts;
   - constraint-name multisets;
   - constraints containing `orbitope`, `sym`, `orbit`, or `lex`.

## Classification

- `VISIBLE_SCIP_RECOVERY`: default symmetry adds a symmetry-named constraint or otherwise produces a directly symmetry-attributable transformed difference.
- `NO_VISIBLE_SCIP_RECOVERY`: default and symmetry-off transformed snapshots are identical and no symmetry-named constraint appears.
- `AMBIGUOUS_DIFFERENCE`: snapshots differ but exposed metadata does not attribute the difference.

`NO_VISIBLE_SCIP_RECOVERY` is not a universal claim about SCIP internals. It identifies candidates for a subsequent value benchmark.
