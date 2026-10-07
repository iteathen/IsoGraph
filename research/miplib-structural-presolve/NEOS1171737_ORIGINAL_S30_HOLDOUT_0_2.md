# neos-1171737 original-model S30 canonicalization holdout 0.2

**Date:** 2026-10-06
**Status:** frozen before results.

## Trigger

The active-support recurrence and action-order tests established an exact post-SCIP full symmetric action on a 30-variable orbit in `neos-1171737`:

- active-moving BLISS generators: 29;
- largest active orbit: 30 variables;
- induced action order: `30!`;
- therefore the action on that orbit is the full symmetric group `S_30`.

Residual-level canonicalization did not show a convincing value win. The `n5-3` campaign later showed that injecting exact symmetry constraints into the **original model before SCIP presolve** can behave very differently from residual-level injection.

## Exact discovery

Recompute from the official MIPLIB model:

1. SCIP 10.0.2 presolve with `misc/usesymmetry=0`.
2. Fail-closed active-support filtering.
3. Bulk exact coefficient-colored graph construction.
4. BLISS generator enumeration and replay.
5. Recompute the largest active orbit.
6. Recompute the induced permutation-group order and require:
   - orbit size = 30;
   - action order = `30!`.
7. Require the same transformed orbit already preserved by prior evidence:
   `t_C0001, ..., t_C0030`.

## Original mapping gate

For original variables `C0001, ..., C0030`, require direct active original→transformed mappings to `t_C0001, ..., t_C0030` with matching type/global bounds and no FIXED, AGGREGATED, MULTAGGR, or NEGATED status.

Only then inject the exact original chain:

~~~text
C0001 >= C0002 >= ... >= C0030
~~~

Every solution orbit under full `S_30` has a nonincreasing representative, so the chain preserves the optimal objective.

## Fresh holdout

Seeds: `8,9,10,11,12`.

60 seconds per variant, alternating order.

A. official original model, SCIP default;  
B. official original model + exact mapped S30 chain, SCIP default.

The one-time structural frontend wall is included in B end-to-end comparisons.

## Directional threshold

If at least three pairs are both optimal:

- at least 4/5 paired end-to-end wins; and
- median `B_end_to_end / A_wall < 0.95`.

Otherwise compare final gap/bound width:

- at least 4/5 paired gap wins; and
- lower median gap in B.

All paired optimal objectives must agree within numeric tolerance.
