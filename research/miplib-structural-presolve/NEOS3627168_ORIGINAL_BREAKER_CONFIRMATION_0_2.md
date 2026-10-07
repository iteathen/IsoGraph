# neos-3627168-kasai original-breaker confirmation 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Original-model holdout 0.1 mapped an exact post-SCIP active symmetry back to:

~~~text
C0001 >= C0003
~~~

On seeds 0–4 at 30 seconds, neither variant solved, but the exact treatment had:

- lower median final gap: 0.0091607443 -> 0.0052538813;
- 3/5 paired gap wins;
- median nodes: 1724 -> 1145;
- negligible one-time structural frontend (~0.125 s).

That did not meet the predeclared 4/5 confirmation threshold, so no positive claim was made.

## Unchanged exact pipeline

Recompute from the official MIPLIB model:

1. SCIP 10.0.2 presolve with symmetry disabled for structural discovery.
2. Fail-closed active-support filtering.
3. Bulk-materialized exact coefficient graph.
4. BLISS enumeration and exact replay.
5. Require the same selected transformed pair:
   `t_C0001 >= t_C0003`.
6. Require the same licensed direct original mapping:
   `C0001 >= C0003`.
7. Solve the original MIP under normal SCIP defaults with or without that one exact inequality.

No algorithmic or breaker-selection changes are permitted.

## Fresh confirmation

Seeds:

~~~text
5 6 7 8 9 10 11
~~~

60 seconds per variant, alternating execution order.

A. original model, SCIP default.  
B. original model + exact mapped breaker, SCIP default.

The structural frontend wall is included in every B end-to-end time.

## Confirmation rule

If at least four pairs are both optimal:

- require at least 5/7 paired end-to-end wins; and
- median end-to-end ratio < 0.95.

Otherwise use final gap:

- require at least 5/7 paired gap wins; and
- lower median gap in B than A.

All paired optimal objectives must agree within numeric tolerance.
