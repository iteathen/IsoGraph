# Experiment 037 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36353788001, attempt 1
**Frozen source SHA:** b60d88809a1cc0c9ae8178c13d84a8733cc10c57
**Internal parent:** GLYCAN_CLUE_DERIVATIONS_A17_PARTITION_BOUND_0_1.md

## Exhaustive surface

- instances: 88,948;
- reachable states: 396,855;
- three-enzyme nonempty set-valued susceptibility through n=4;
- two-enzyme nonempty set-valued susceptibility at n=5.

## Correctness

- SEG > PLB violations: 0;
- PLB > exact remaining distance violations: 0.

Thus the partition bound was admissible over the complete control surface and never weaker than the one-group max-path SEG bound.

## Tightness

- max-path SEG tight: 358,899 / 396,855 = 90.4358%;
- PLB tight: 395,167 / 396,855 = 99.5747%;
- PLB strictly stronger than SEG: 36,268 states = 9.1389%.

Three-enzyme subset:

- PLB tight: 99.5035%;
- PLB strictly stronger: 10.3873%.

Two-enzyme n=5 subset:

- PLB tight: 99.7459%;
- PLB strictly stronger: 6.1336%.

## Interpretation

The alphabet-partition relaxation successfully transfers the near-tight one-class PCCSP bound to multi-susceptible sites without arbitrary singletonization.

The bound unifies:

- one-group partition -> max-path SEG;
- singleton groups on singleton instances -> PCCSP one-class bound;
- intermediate enzyme groups -> additional safe cross-branch information.

The residual set where PLB is not exact is only 1,688 tested states. Those states are now the highest-information target for another DP/residual pass because they isolate synchronization information not captured by any partition-summed per-path group count.

## Next

Extract minimal PLB-gap states, freeze their exact optimum words/path constraints, and identify the structural residual. Prioritize pair/group ordering conflicts and precedence interactions across paths.