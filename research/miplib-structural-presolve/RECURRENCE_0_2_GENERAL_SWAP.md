# MIPLIB recurrence screen 0.2 — general exact swap

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Does the post-presolve structural recurrence become stronger when an exact two-variable swap is allowed to induce an arbitrary permutation of the affected constraints, rather than exactly one row-pair swap?

## Frozen sample

Use the same 20 non-cherry-picked recurrence-0.1 models, plus `glass4` solely as a positive control.

## Exact certificate

For a candidate variable pair `a,b` surviving six rounds of coefficient-aware bipartite refinement:

1. objective coefficients, lower/upper bounds, and integrality types must match;
2. rows where coefficients of `a` and `b` are equal are fixed by the swap;
3. on every row where those coefficients differ, exchange the two variable identities;
4. the complete multiset of transformed affected rows — including row lower/upper bounds and every coefficient keyed by variable identity — must equal the original affected-row multiset exactly within numeric tolerance.

If these hold, swapping `a,b` together with the induced constraint permutation is an exact model automorphism.

For any such pair with identical ordered domains, adding `a >= b` is an exact symmetry breaker: every orbit has a representative satisfying that ordering, so the optimal objective is preserved.

## Timing follow-up

For the lexicographically first exact pair in each positive instance:

- solve the HiGHS-presolved residual for 10 seconds with presolve disabled;
- solve the same residual plus `a >= b` for 10 seconds with identical settings;
- record incumbent, dual bound, gap, nodes, LP iterations, and status.

Timing is directional only. Exactness comes from the automorphism certificate, not the timed solve.
