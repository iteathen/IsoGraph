# Experiment 035 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36353273439, attempt 1
**Frozen source SHA:** 3ac8f3716bbeca20e2bd8827e71325e02ae38439
**Internal parents:** A12-A15; Experiments 033-034

## Exhaustive learner result

- instances: 6,565;
- learned expanded B_M versus independent true-automaton B_M mismatches: 0;
- hypothesis quasi-order guard issues: 0;
- invalid oracle counterexamples: 0;
- refinement iterations: 3,531 total;
- star-product oracle queries: 11,207 total;
- mean refinement iterations: 0.5379 per instance;
- mean oracle queries: 1.7071 per instance.

Every counterexample returned by the oracle was a true solving word and was outside the current hypothesis language before refinement.

## Seeded larger result

- cases: 12;
- basis mismatches: 0;
- mean exact reference basis size: 2.1667;
- mean refinement iterations: 15.0833;
- mean star-product oracle queries: 50.1667;
- mean maximum hypothesis states: 28.5;
- quasi-order issues: 0;
- bad counterexamples: 0.

One exercised case required 56 refinements and 187 oracle queries, showing that convergence can be materially more expensive than the final basis size alone suggests.

## Result

The experiment establishes a working implementation path from the exact glycan star-product oracle to the complete dominance-aware minimal solving boundary without breadth-first enumeration of treatment words by length.

The algorithm used the same structural ingredients as the generalized Valk-Jantzen / quasi-ordered-automaton construction:

- upward-closed language over the effective-susceptibility alphabet preorder;
- minimized quasi-ordered hypothesis automata;
- star-products covering the hypothesis complement;
- exact star-product intersection/witness oracle;
- counterexample-guided refinement.

After convergence, effective-susceptibility-equivalent raw operator identities were expanded so the learned representation could be compared to the raw B_M value.

## Boundary

This experiment does not establish a polynomial complexity bound. Complement star-product counts and refinement counts can grow substantially, and the external CALCO analysis also identifies non-polynomial work in related constructions.

## Next

Use the backward antichain solver as the optimization baseline and the oracle-driven B_M learner as the complete-language baseline.

Next investigate the singleton-susceptibility PCCSP correspondence for transferable exact-DP machinery: merging, lower bounds, precedence reasoning, immediate-selection rules, and state dominance; then test which rules survive set-valued susceptibility.