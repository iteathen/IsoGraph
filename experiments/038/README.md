# Experiment 038 — PLB residual and pairwise path synchronization

**Status:** residual Discovery Protocol experiment
**Date:** 2026-09-27
**Parent:** Experiment 037 / A17 partition lower bound

## Question

Experiment 037 found 1,688 reachable states where:

    PLB < exact remaining treatment distance.

PLB preserves per-enzyme-group usage counts but discards the relative order in which different maximal paths need those groups.

Test whether the missing information is already captured by exact synchronization of pairs of maximal paths.

## Pairwise path bound

For each active maximal child-to-parent path, represent its remaining node susceptibility sets in order.

For one treatment e, advance a path through the maximal consecutive prefix of currently exposed path nodes all susceptible to e. This is exactly the same-phase cascade rule restricted to one path.

For every pair of active maximal paths, solve the two-path treatment problem exactly by BFS on the pair of path-progress indices.

Define:

    P2 = maximum exact optimum over every path pair

with a single path paired with itself/handled by its exact path SEG when only one path exists.

Because every global solution must solve every selected path pair:

    P2 <= exact global remaining distance.

Compare:

    LB2 = max(PLB, P2).

## Exhaustive surface

Reuse Experiment 037:

- three-enzyme nonempty set-valued susceptibility through n=4;
- two-enzyme nonempty set-valued susceptibility at n=5;
- every reachable state.

## Measurements

- P2 > exact-distance violations;
- LB2 > exact-distance violations;
- number of Experiment-037 PLB-gap states closed by P2;
- number of residual states after LB2;
- minimal residual examples if any;
- tightness of P2 and LB2.

## Interpretation gate

If every PLB gap closes, the missing small-surface structure is pairwise branch-order synchronization.

If residuals remain, preserve them as evidence for three-way-or-higher synchronization rather than forcing a pairwise explanation.

No universal tightness claim follows from either outcome.