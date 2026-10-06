# MIPLIB post-SCIP BLISS recurrence 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Purpose

The commercial seam has narrowed to exact higher-order symmetry that survives a mature solver's own presolve. On `n5-3`, SCIP 10.0.2 with `misc/usesymmetry=0` leaves a transformed model with 208 exact variable-moving BLISS generators, while fresh SCIP symmetry-on re-entry does not recover or exploit them.

This screen tests recurrence on the **same 20-instance non-cherry-picked sample frozen for recurrence 0.1**.

## Frozen sample

`50v-10`, `reblock115`, `ran14x18-disj-8`, `gen-ip002`, `gen-ip054`,
`ic97_potential`, `pk1`, `n5-3`, `neos859080`, `neos-911970`,
`seymour1`, `p200x1188c`, `b1c1s1`, `markshare2`, `mas74`,
`exp-1-500-5-5`, `markshare_4_0`, `qap10`, `cost266-UUE`, `mas76`.

## Pipeline

For each instance:

1. SCIP 10.0.2 presolve with symmetry disabled, one thread, seed 0.
2. Export the transformed problem to MPS.
3. Encode the transformed linear MIP as an exact vertex-colored subdivision graph:
   - variable attributes: objective coefficient, bounds, integrality;
   - row attributes: lower/upper bounds;
   - each matrix coefficient is a colored intermediate vertex.
4. Run igraph BLISS `automorphism_group()`.
5. Replay every returned generator against all vertex colors and the complete edge set.
6. Count generators that move at least one model variable.
7. Compute nontrivial variable-orbit sizes from the exact generators.

## Outcomes

- `EXACT_POST_SCIP_SYMMETRY`: at least one replay-verified variable-moving generator.
- `NO_VARIABLE_MOVING_GENERATOR`: BLISS returns no generator moving a model variable for the encoded transformed MIP.
- Harness/export errors remain errors, not negative structural results.

This is a recurrence screen only. No timing benchmark is performed here.
