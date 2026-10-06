# n5-3 higher-order symmetry benchmark 0.1

**Date:** 2026-10-06  
**Target:** the exact higher-order automorphism found in the post-HiGHS `n5-3` residual.

## Why this target

The exact graph pass found nontrivial automorphisms moving large coordinated regions of the residual. A SCIP 10.0.2 control then showed:

- identical transformed dimensions with symmetry on/off;
- no added orbitope/symmetry constraints;
- identical 10-second primal/dual/node behavior.

So, unlike `glass4` and `neos-911970`, this symmetry is not visibly incumbent-covered by SCIP's default symmetry machinery.

## Exact breaker law

Recover the first non-identity automorphism of the exact colored residual graph.

Choose the lexicographically first moved variable `x` and its image `g(x)`. The automorphism preserves their ordered domains and objective coefficients.

Because `g` is a finite permutation, the cycle containing `x` has some orbit representative satisfying

[
x \ge g(x).
]

Otherwise every value around that finite cycle would be strictly increasing, which is impossible. Applying a power of `g` maps any feasible solution to an objective-equal representative satisfying the inequality.

Therefore adding `x >= g(x)` preserves the optimal objective.

## Controlled comparisons

Use the same HiGHS-presolved residual in every variant.

1. HiGHS 1.15.1, presolve off, 20 seconds baseline.
2. HiGHS 1.15.1, presolve off + exact breaker, 20 seconds.
3. SCIP 10.0.2 on an exported copy of the same residual, symmetry off, 20 seconds.
4. SCIP 10.0.2, symmetry off + exact breaker, 20 seconds.
5. SCIP 10.0.2 default symmetry on the same residual, 20 seconds.

The exact result is the symmetry certificate and objective-preserving breaker. Timings are directional only.
