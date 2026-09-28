# Experiment 034 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36352980934, attempt 1
**Frozen source SHA:** 1f8ec65eb742addbdeb176c54567ab95392b40b8
**Internal parents:** A12-A15

## Exact basis controls

- instances: 6,565;
- brute B_M versus minimal-quasi-ordered-automaton basis mismatches: 0;
- quasi-ordered automaton guard failures: 0;
- mean reachable DFA states: 2.9181;
- mean minimized DFA states: 1.6079.

The control surface therefore supports the external CALCO-2025 observation in this concrete model: the exact dominance-aware solving basis can be recovered from minimal strictly increasing accepting paths of the minimized quasi-ordered automaton.

## Star-product oracle controls

- small exact instances: 421;
- explicit star-products checked: 41,082;
- oracle mismatches: 0.

The tested oracle evaluates optional sigma? atoms by the maximal permitted treatment sigma and Gamma* atoms by exact common Gamma-closure. Its intersection answer agreed with explicit finite-state expansion on every tested product.

## Seeded larger measurements

- cases: 12;
- mean reachable states: 12.0833;
- mean minimized DFA states: 6.5;
- mean reachable/minimal-state ratio: 2.0542;
- mean extracted basis size: 2.0;
- quasi-order guard issues: 0;
- extracted non-solving basis words: 0.

These are descriptive measurements, not universal compression guarantees.

## Disposition

Experiment 034 promotes two implementation ideas to the next stage:

1. construct or learn the minimal quasi-ordered automaton and enumerate minimal increasing accepting paths for B_M;
2. use the exact star-product oracle as an equivalence/counterexample interface rather than enumerate treatment words by length.

## Next

Implement a counterexample-guided basis learner:

- maintain a candidate finite basis B;
- construct/minimize the automaton for upward_closure(B);
- cover its complement by the star-products associated with strictly increasing nonaccepting paths;
- query the exact glycan star-product oracle;
- when an intersection exists, return a concrete solving counterexample from the oracle and refine B;
- stop when no complement star-product intersects the true solving language;
- compare the learned final basis exactly with brute/reference B_M.