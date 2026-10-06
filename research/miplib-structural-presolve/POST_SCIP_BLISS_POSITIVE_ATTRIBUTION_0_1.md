# Post-SCIP BLISS positive attribution screen 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Input

The non-cherry-picked 20-instance post-SCIP BLISS recurrence screen found exact variable-moving automorphism groups in eight SCIP-transformed models:

- `reblock115`
- `n5-3`
- `neos-911970`
- `seymour1`
- `b1c1s1`
- `markshare2`
- `mas74`
- `mas76`

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

- `VISIBLE_SCIP_RECOVERY`: default symmetry adds at least one symmetry-named constraint or produces a symmetry-attributable transformed difference.
- `NO_VISIBLE_SCIP_RECOVERY`: default and symmetry-off transformed snapshots are identical and no symmetry-named constraint appears.
- `AMBIGUOUS_DIFFERENCE`: snapshots differ but the difference cannot be attributed through exposed SCIP metadata.

`NO_VISIBLE_SCIP_RECOVERY` is not a universal claim about SCIP internals. It is the strongest attribution available through this frozen transformed-model interface.
