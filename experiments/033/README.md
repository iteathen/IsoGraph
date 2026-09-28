# Experiment 033 — glycan backward antichain solver

**Status:** implementation / exact-algorithm experiment
**Date:** 2026-09-27
**Semantic parent:** GLYCAN_CLUE_DERIVATIONS_A15_0_1.md
**Primary claims under test:** G-IA304 through G-IA310

## Goal

Test whether the exact backward antichain recurrence from A15 can replace forward state-space search for minimum treatment count while preserving exact results.

This experiment is algorithmic evidence, not new semantic authority.

## Compared solvers

### Forward oracle

Exact breadth-first search over removed-node order ideals.

One treatment transition is evaluated by the admitted resistant-frontier phase formula and cross-checked against microscopic terminal-deletion saturation on exhaustive small controls.

### Backward antichain solver

For target threshold ideal J and operator e:

    P_e(J) = downward_closure(J intersection N_e).

Winning bases:

    B_0 = {top}

    B_(k+1) = MIN(B_k union {P_e(J) | J in B_k, e in EL}).

The first k for which the bottom ideal is winning is the exact optimum.

## Test plan

1. Exhaustively enumerate small rooted non-target forests with topologically ordered parent pointers, two operators, and every susceptibility assignment through n=5.
2. Verify direct phase closure against operational terminal-deletion saturation.
3. Compare forward BFS optimum with backward antichain optimum for every exhaustive instance.
4. Benchmark deterministic seeded larger instances across singleton and set-valued susceptibility.
5. Record optimum, forward reached-state count, backward peak antichain size, operation counts, wall-clock timing, and mismatch count.

## Acceptance

Experiment passes only if phase mismatches = 0 and optimum mismatches = 0 for the complete exhaustive control surface and all benchmark cases.

Performance is descriptive only. A faster/slower result does not change semantic correctness.