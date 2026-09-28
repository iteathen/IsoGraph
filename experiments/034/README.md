# Experiment 034 — glycan minimal basis and star-product oracle

**Status:** implementation / exact-language experiment
**Date:** 2026-09-27
**Internal semantic parents:** A12–A15
**External algorithmic reference:** Quentin Aristote, Active Learning of Upward-Closed Sets of Words, CALCO 2025

## Goals

1. Build the exact reachable treatment DFA from removed ideals.
2. Minimize that DFA by continuation language.
3. Equip the minimal DFA with its exact continuation-language order and verify the quasi-ordered automaton laws.
4. Recover a dominance-aware minimal solving basis from minimal strictly increasing accepting paths.
5. Compare that basis against brute-force B_M on a bounded exact control surface.
6. Independently validate the A15 star-product intersection oracle against explicit finite-state star-product expansion.

## Basis comparison

Alphabet order:

    e1 <=M e2 iff effective susceptibility(e1) subseteq effective susceptibility(e2).

Word order is generalized dominance-subsequence <=Msub.

Brute reference basis:

    all <=Msub-minimal solving raw words

enumerated only through the proved length bound |Qraw|.

Automaton candidate basis:

    words labeling minimal strictly increasing paths
    from the initial state to the accepting state
    in the minimal quasi-ordered DFA,

followed by exact <=Msub minimization over the raw path words.

## Star-product oracle

Optional atom sigma? is evaluated by one maximal treatment sigma.

Repeat atom Gamma* is evaluated by the least common Gamma-fixed closure J_Gamma.

The oracle predicts intersection with the solving language iff maximal atom-by-atom progress reaches the top ideal.

Explicit comparison computes all states reachable by each star-product atom on small finite controls.

## Acceptance

PASS requires:

- brute B_M equals automaton-derived B_M on every control instance;
- all quasi-ordered automaton guard checks pass;
- star-product oracle mismatch count is zero;
- all tested basis words solve and all are <=Msub-minimal.

Performance/compression measurements are descriptive and do not alter semantic truth.