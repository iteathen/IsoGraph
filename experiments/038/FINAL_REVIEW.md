# Experiment 038 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36354029591, attempt 1
**Internal parent:** A18 joint-path hierarchy

## Surface

- instances: 88,948;
- reachable states: 396,855;
- Experiment-037 PLB-gap states: 1,688.

## Pairwise result

- P2 > exact-distance violations: 0;
- max(PLB,P2) > exact-distance violations: 0;
- P2 tight on 396,069 states = 99.8019%;
- max(PLB,P2) tight on 396,651 states = 99.9486%;
- PLB gaps closed by P2: 1,484 / 1,688 = 87.9147%;
- residual states after pairwise bound: 204.

On the complete two-enzyme n=5 surface, P2 was exact on every tested state and closed every PLB gap.

## Smallest surviving residual

Three independent active paths, each one node:

    {A,B}
    {A,C}
    {B,C}.

Every pair has a common enzyme and therefore P2=1.

The three-way common intersection is empty, so one treatment cannot cover all three; exact remaining distance is 2.

Thus the residual is genuinely higher-order and cannot be repaired by another pairwise statistic.

## Interpretation

Pairwise path synchronization is a powerful but non-universal lower bound. The 204 preserved residual states are direct evidence for three-way-or-higher compatibility structure.

## Next

Run J3 on the same surface. Preserve any remaining residual rather than assuming three paths suffice universally.