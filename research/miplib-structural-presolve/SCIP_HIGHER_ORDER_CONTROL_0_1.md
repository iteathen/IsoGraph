# SCIP higher-order symmetry control 0.1

**Date:** 2026-10-06

## Targets

- `n5-3`
- `neos-911970`

These are the two recurrence-0.1 LEAD_ONLY models that the exact bipartite graph-automorphism pass subsequently showed to have large post-HiGHS permutation symmetries.

## Question

Do those higher-order symmetries remain commercially interesting against SCIP 10.0.2, which has dedicated symmetry detection/handling?

## Frozen comparison

For each original official MIPLIB instance:

1. SCIP presolve with default symmetry handling;
2. SCIP presolve with `misc/usesymmetry=0`;
3. record transformed dimensions and the multiset of constraint-handler names;
4. count constraints present only with default symmetry and report any names containing `orbitope`, `sym`, `orbit`, or `lex`;
5. run 10 seconds with default symmetry;
6. run 10 seconds with symmetry disabled.

This is a stronger-incumbent control, not an attempt to inject the full IsoGraph-discovered automorphism. If SCIP already detects/uses the structural symmetry, the correct disposition is that this symmetry family is likely incumbent-covered rather than a unique IsoGraph presolve opportunity.
