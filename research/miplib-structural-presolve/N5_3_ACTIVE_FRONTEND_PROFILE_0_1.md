# n5-3 active structural-frontend profile 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

The active-only exact-symmetry frontend on `n5-3` currently costs roughly seconds even though SCIP presolve and BLISS themselves are individually very fast. Which implementation stage actually dominates?

## Frozen measurement

Run the same exact active-only pipeline without any MIP solve:

1. official MIPLIB download/decompression;
2. SCIP 10.0.2 symmetry-off presolve;
3. SCIP transformed-MPS export;
4. HiGHS 1.15.1 transformed-MPS parse;
5. sparse row/column materialization;
6. proof that every dropped export-only column is zero-incidence and objective-zero or fixed;
7. active subdivision-graph data construction;
8. igraph object construction;
9. BLISS generator enumeration;
10. exact replay of every active-graph generator;
11. selection of the two independently composable active involutions.

Measure wall time for each stage separately over five repetitions after one untimed warm-up, reusing the downloaded source but rebuilding the transformed representation each repetition.

No optimization-performance claim is part of this profile. Its purpose is to identify engineering overhead before deciding whether the measured solver-side gains can become end-to-end gains.
