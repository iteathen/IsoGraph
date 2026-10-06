# Higher-order automorphism pass 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Targets

- positive controls: `glass4`, `seymour1`;
- unresolved recurrence leads: `n5-3`, `neos-911970`.

## Exact representation

After HiGHS 1.15.1 presolve, construct a colored bipartite graph:

- one node per active variable, colored by objective coefficient, lower bound, upper bound, and integrality type;
- one node per active constraint, colored by lower and upper row bounds;
- one edge per nonzero coefficient, colored by the coefficient value;
- additionally retain the six-round refinement color on every node only as a search accelerator.

An automorphism of this graph is an exact permutation symmetry of the represented presolved MIP because it preserves every variable-domain/objective attribute, every row bound, and every coefficient incidence.

## Search contract

Use NetworkX VF2 only as a finite automorphism enumerator. It has no semantic authority beyond the exact graph encoding.

Per instance:

- 60 second hard search budget;
- stop after three non-identity automorphisms;
- inspect at most 2,000 returned mappings;
- timeout or enumeration cap without a witness is `INCONCLUSIVE`, never `NO_SYMMETRY`.

The two positive controls must produce a nontrivial automorphism for the run to qualify.
