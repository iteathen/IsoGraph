# Stronger incumbent control 0.1 — SCIP symmetry

**Date:** 2026-10-06  
**Target:** `glass4` exact post-HiGHS symmetry.

## Purpose

Test whether the discovered `z1&3.4 <-> z1&3.8` symmetry is merely absent from HiGHS or is also informative relative to a solver with dedicated automatic symmetry machinery.

Use PySCIPOpt 6.2.1 / its bundled SCIP release.

## Frozen variants

Run from the original official MIPLIB `glass4` model with identical one-thread / fixed-seed / 15-second solve limits:

1. SCIP default symmetry handling.
2. SCIP with `misc/usesymmetry = 0`.
3. SCIP with `misc/usesymmetry = 0` plus the already-certified constraint `z1&3.4 >= z1&3.8`.

For variants 1 and 2, run presolve first and record whether the two target variables and two target rows survive in the transformed problem.

The breaker itself is not re-discovered in this test; its exactness is inherited only from the separate coefficient-level certificate. The purpose here is comparative solver behavior, not a new proof.
