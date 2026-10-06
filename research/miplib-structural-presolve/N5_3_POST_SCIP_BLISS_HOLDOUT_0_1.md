# n5-3 post-SCIP BLISS automorphism holdout 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Purpose

The prior NetworkX VF2 search on the SCIP 10.0.2 transformed `n5-3` model was inconclusive because the identity mapping alone consumed the search budget. This holdout changes only the finite automorphism enumerator.

## Exact graph encoding

After SCIP presolve with `misc/usesymmetry=0`, export the transformed MIP and encode it as an undirected vertex-colored graph:

- variable vertex color = type + objective coefficient + lower bound + upper bound + integrality;
- constraint vertex color = type + row lower bound + row upper bound;
- each nonzero coefficient becomes its own intermediate vertex, colored by type + coefficient value;
- connect `variable -- coefficient-vertex -- constraint`.

Therefore every color-preserving automorphism of this subdivision graph preserves the complete MIP coefficient system, variable domains/objective coefficients, row bounds, and incidence.

Use igraph BLISS `automorphism_group()` to return group generators. BLISS is only an enumerator; every chosen generator is replay-checked against vertex colors and the complete edge set before it is accepted.

## Breaker and benchmark

If an exact non-identity generator moves a model variable:

1. choose the lexicographically first moved variable `x` and its image `g(x)`;
2. add `x >= g(x)`, which preserves at least one representative of every finite permutation orbit;
3. run five paired SCIP 15-second trials on the same SCIP-transformed residual, with presolve and symmetry disabled, seeds 0..4.

If BLISS returns no variable-moving generator, report the exact generator count and stop. Do not convert that into a universal no-symmetry claim beyond the encoded transformed MIP.
