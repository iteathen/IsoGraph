# Experiment 039 — joint-path hierarchy J2 / J3

**Status:** exact lower-bound hierarchy experiment
**Date:** 2026-09-27
**Internal parent:** GLYCAN_CLUE_DERIVATIONS_A18_JOINT_PATH_BOUND_0_1.md

## Goal

Evaluate the exact joint-path hierarchy on the same complete surface used by Experiments 037-038.

For every reachable state compute:

    J1 = max one-path optimum = SEG
    J2 = maximum exact optimum over path subsets of size <=2
    J3 = maximum exact optimum over path subsets of size <=3

and combined bounds:

    LB2 = max(PLB,J2)
    LB3 = max(PLB,J3).

## Questions

1. Does J3 close every Experiment-038 pairwise residual?
2. If not, what is the smallest surviving state?
3. How often does J3 improve over J2?
4. How close is LB3 to the exact remaining distance?

## Surface

- three-enzyme nonempty set-valued susceptibility through n=4;
- two-enzyme nonempty set-valued susceptibility at n=5;
- every reachable state.

## Acceptance

PASS requires zero J2>distance, J3>distance, LB2>distance, or LB3>distance violations.

Any remaining LB3 gap is preserved as evidence for four-way-or-higher branch synchronization.