# mcsched original-model S2 injection holdout 0.3

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

The residual-level `mcsched` S2 tests certified an exact active symmetry but did not produce a convincing performance win. The `n5-3` campaign later showed that residual-level timing can miss value that appears when exact symmetry constraints are injected into the **original model before SCIP presolve**.

This holdout tests that mechanism on `mcsched`.

## Exact discovery

Recompute from the official MIPLIB model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
2. Fail-closed active-support filtering.
3. Bulk exact coefficient-colored graph construction.
4. BLISS enumeration and replay.
5. Require the largest active orbit to have size 2 and exact induced action order `2! = 2`.
6. Require the same transformed pair already frozen by prior evidence:
   - `t_C0000186 >= t_C0001396`.

## Original mapping gate

Use SCIP original→transformed mappings for:

- `C0000186`
- `C0001396`

License original injection only if both map directly to the two active transformed variables, with matching variable type/global bounds and without FIXED, AGGREGATED, MULTAGGR, or NEGATED status.

Then inject:

~~~text
C0000186 >= C0001396
~~~

into the official original model before normal/default SCIP presolve.

## Fresh holdout

Seeds: `13,14,15,16,17`.

60 seconds per variant, alternating execution order.

A. original model, SCIP default;  
B. original model + exact mapped S2 inequality, SCIP default.

The one-time structural frontend wall is included in every B end-to-end comparison.

## Directional threshold

If at least three pairs are both optimal:

- at least 4/5 paired end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

Otherwise use final gap/bound width:

- at least 4/5 paired gap wins; and
- lower median gap in B.

All paired optimal objectives must agree within numeric tolerance.
