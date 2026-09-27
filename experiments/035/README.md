# Experiment 035 — oracle-driven B_M basis learning

**Status:** exact algorithm experiment
**Date:** 2026-09-27
**Internal parents:** A12-A15; Experiments 033-034
**External algorithmic reference:** Quentin Aristote, Active Learning of Upward-Closed Sets of Words, CALCO 2025

## Goal

Compute the dominance-aware minimal solving boundary without enumerating treatment words by length.

## Learner

Maintain a finite candidate generating basis B.

1. Build the deterministic automaton recognizing upward_closure_Msub(B).
2. Minimize it by continuation language.
3. Verify its quasi-ordered-automaton laws.
4. Enumerate the star-products associated with strictly increasing paths to nonaccepting states one transition away from the accepting state.
5. Query the exact glycan star-product oracle from A15.
6. If the true solution language intersects one complement star-product, return the oracle's concrete solving word as a counterexample and refine B.
7. Stop when no complement star-product intersects the true solution language.

The maintained basis may choose one representative from an effective-susceptibility equivalence class. After convergence, expand pointwise-equivalent raw operator identities so the final raw basis can be compared with B_M.

## Reference

For controls, independently construct the true reachable treatment DFA, minimize it, and recover B_M from minimal strictly increasing accepting paths as validated by Experiment 034.

## Acceptance

PASS requires:

- learned expanded raw basis equals the independent automaton-derived B_M on every control;
- every returned oracle counterexample is a true solution and is rejected by the current hypothesis before refinement;
- every hypothesis minimal automaton satisfies the quasi-order guards;
- every complement star-product queried is structurally valid;
- learner terminates on the complete test surface.

Performance/query counts are descriptive only.