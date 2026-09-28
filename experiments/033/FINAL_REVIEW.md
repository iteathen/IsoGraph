# Experiment 033 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36352692536, attempt 1
**Frozen source SHA:** 9c3e097caaee6b120f7936d9e64855e8468ff5ee
**Semantic parent:** GLYCAN_CLUE_DERIVATIONS_A15_0_1.md

## Correctness

Exhaustive control surface:

- instances: 129,445;
- forward/backward optimum mismatches: 0;
- operational microscopic phase versus resistant-frontier phase checks: 752,380;
- phase mismatches: 0.

Seeded larger benchmark:

- cases: 48;
- forward/backward optimum mismatches: 0.

Therefore the implementation evidence supports the exact backward antichain recurrence G-IA304–G-IA310 on the exercised finite surface.

## Structural compression observed

Across the 48 benchmark cases:

- mean forward reached states: 96.8125;
- mean backward peak antichain size: 7.2083;
- mean forward-state / backward-peak ratio: 12.7811.

The largest recorded ratio in the frozen benchmark was 35.5 on singleton-4chains-28-1.

These are benchmark observations, not universal bounds.

## Timing observation

Mean runner timing:

- forward BFS: 0.091116 ms;
- backward antichain: 0.035299 ms.

The backward method was not faster on every individual case, so no universal speedup claim is made.

## Interpretation

The result supports the algorithmic clue that the exact minimum-treatment problem can often be represented more compactly by the boundary of the backward winning upset than by all forward-reachable states.

The antichain representation is therefore promoted from a theoretical clue to the preferred exact baseline for the next experiments.

## Next experiment

Construct/minimize the exact quasi-ordered treatment automaton and recover the dominance-aware finite basis B_M from its minimal strictly increasing paths; compare that basis against brute-force B_M on a bounded exact control surface.

Then test the A15 star-product oracle as the interface needed by generalized Valk–Jantzen / active-learning methods.