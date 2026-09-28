# Glycan partition-bound residual discovery 0.1

**Status:** DP residual analysis after Experiment 037
**Date:** 2026-09-27
**Authority:** qualified Discovery Protocol 0.1-0.7 for search guidance; exact claims require separate Core-0.19 admission

Experiment 037 left 1,688 tested reachable states where PLB was admissible but not exact.

Inspection of the smallest residuals shows two different missing structures.

## Residual R1 — two-branch order conflict

Two independent non-target chains under retained boundaries:

    path 1: {A} then {B}
    path 2: {B} then {A}

where path order is child-to-parent.

Each path alone has SEG=2.

The alphabet partition bound is also 2.

But no two-symbol word can satisfy both path orders.

ABA and BAB solve in length 3.

This is the earlier cross-branch order-conflict witness, now recovered as the smallest two-enzyme PLB residual.

Missing structure:

    joint ordering compatibility between paths.

## Residual R2 — three-way label-choice conflict

Three independent terminal non-target nodes:

    E1={A,B}
    E2={A,C}
    E3={B,C}.

Each path alone needs one treatment.

Every pair of nodes shares an enzyme, so every two-path joint problem also needs only one treatment.

But all three susceptibility sets have empty common intersection.

No single treatment removes all three.

Two treatments suffice.

Missing structure:

    higher-order simultaneous label compatibility.

This residual is a finite Helly-style failure: pairwise intersections are nonempty while the total intersection is empty.

No external Helly theorem is imported.

## Discovery lead

Per-path additive bounds cannot capture every synchronization obstruction.

Introduce a hierarchy of exact joint-path relaxations:

    J_h(A)
    = maximum exact shortest cover length
      over all subsets of at most h active maximal paths.

Expected properties:

- J_1 = max-path SEG;
- J_h <= J_(h+1) <= OPT;
- J_h = OPT once h reaches the number of active maximal paths;
- J_2 detects R1;
- J_3 detects R2.

Each h-path subproblem can be solved on a small product of path-progress indices without constructing full glycan states.

## Next

Admit the joint-path hierarchy exactly, implement h=2 and h=3, and measure how much of Experiment 037's residual gap they close when combined with PLB.