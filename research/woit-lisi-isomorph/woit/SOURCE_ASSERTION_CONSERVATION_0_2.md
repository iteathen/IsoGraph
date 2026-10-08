# Woit Source Assertion Conservation 0.2

**Status:** PASS AFTER CORRECTION  
**Date:** 2026-10-04  
**Corrected frozen census:** `SOURCE_SEMANTIC_CENSUS_0_2.json`  
**Assertion base:** `ASSERTION_BASE_A0_0_12.md`

## Defect in 0.1

The 0.1 freeze contained only six W02 census items even though the explicit assertion base already preserved the detailed W02 source assertions W-A0-047 through W-A0-070.

That violated source-semantic census conservation.

## Correction

Successor 0.2 adds 24 census obligations, W-SSC-128 through W-SSC-151, one-for-one with W-A0-047 through W-A0-070.

The restored surface includes:

- Hermitian M2(C) Minkowski vectors and determinant norm;
- conventional complex/real-form actions;
- the right-handed replacement and its tradeoffs;
- Euclidean scalar-plus-vector structure and distinguished direction;
- Weyl Lagrangian/propagator/doubling semantics;
- Euclidean and Minkowski Hodge decompositions;
- self-dual sl(2,C)_R / Sym²(S_R);
- Yang-Mills self-dual action;
- chiral GR frame/connection/curvature/action semantics;
- Euclidean reality and the unresolved electroweak conclusion.

## Invalidation

SSC 0.1 remains historical but is not current authority.

Because the census hash changed, native compilation 0.1 and Core-0.21 ledgers 0.1–0.8 are historical/stale for the corrected qualification target.

No recursive IA fixed point existed, so there is no IA result to invalidate.

The next legal step is authoritative native compilation against SSC 0.2, then primitive/schema closure.
