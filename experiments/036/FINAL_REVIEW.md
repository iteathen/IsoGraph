# Experiment 036 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36353589372, attempt 1
**Frozen source SHA:** db5e7fc34a9441845925fd24cb8e076a5631ef65
**Internal parent:** GLYCAN_CLUE_DERIVATIONS_A16_PCCSP_BOUNDS_0_1.md

## Exhaustive surface

- singleton instances: 77,368;
- reachable states evaluated: 429,531;
- three-class forests through n=5 plus two-class n=6.

## Lower bounds

Violations:

- CP > OC: 0;
- OC > exact remaining distance: 0.

Tightness:

- critical-path bound: 381,011 / 429,531 = 88.7040%;
- one-class bound: 425,155 / 429,531 = 98.9812%;
- OC strictly stronger than CP: 44,354 states = 10.3261%.

On the three-class surface alone, OC was tight on 99.4232% of states and strictly stronger than CP on 19.9781%.

## Immediate selection

Only-available-class certificates:

- 251,825;
- counterexamples: 0.

Nonextendable-class certificates:

- 282,061;
- states with at least one such certificate: 255,287;
- counterexamples: 0.

The tested PCCSP immediate-selection condition therefore transferred exactly on the complete control surface.

## Interpretation

The one-class lower bound is the preferred cheap singleton lower bound among the two tested path-derived bounds. It was almost always exact on this surface.

The nonextendable-class rule can remove branching at a large fraction of tested reachable states while preserving at least one optimal continuation.

These are exhaustive results only for the declared small finite surface; no universal performance-rate claim is made.

## Next

Integrate OC and immediate selection into a singleton branch-and-bound/DP benchmark, then test the PCCSP same-class merging rules under the glycan tree specialization.

After that, investigate a set-valued analogue of OC rather than assigning arbitrary singleton labels.