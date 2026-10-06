# Post-SCIP active-value confirmation 0.2

**Date:** 2026-10-06  
**Status:** frozen before results.

## Trigger

Active-symmetry value holdout 0.1 used seeds 0,1,2 and 10-second solves. Exactly three of five active-symmetry cases met its directional criterion:

- `seymour1`
- `mas74`
- `mas76`

This follow-up is outcome-selected confirmation, not an independent prevalence estimate.

## Frozen exact breakers

Recompute the same SCIP symmetry-off transformed residual, ACTIVE/EXPORT_ONLY colored coefficient graph, and BLISS group.

Require the prior exact active breaker to be recovered and replay-certified:

- `seymour1`: `t_x1108 >= t_x1110`
- `mas74`: `t_x117 >= t_x24`
- `mas76`: `t_x117 >= t_x24`

To reduce certificate overhead, identify generators that move ACTIVE variables from the BLISS permutations, then independently replay-check only the generator actually used for the frozen breaker. Unused export-only generators have no authority in this experiment.

## Fresh holdout

Use unseen seeds **3, 4, 5** and 60 seconds per solve.

On the same exported transformed residual:

A. fresh SCIP default symmetry, presolve disabled;  
B. SCIP symmetry disabled + frozen exact active breaker, presolve disabled.

Record primal, dual, relative gap, absolute bound width, nodes, LP iterations, wall time, and structural front-end timing.

## Confirmation criterion

Per instance, confirmation requires:

- IG median gap < SCIP-default median gap; and
- at least 2 of 3 paired final-gap wins.

Frontend overhead is reported separately and is part of commercial interpretation, but not of breaker exactness.
