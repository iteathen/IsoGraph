# Glycan singleton-susceptibility bridge to PCCSP 0.1

**Status:** external prior-art bridge and exact reduction sketch
**Date:** 2026-09-27
**Parent:** GLYCAN_EXTERNAL_CLUE_RESEARCH_0_1.md
**External source:** Bürgy, Baptiste, Hertz, Computers & Operations Research 124 (2020), 105063
**DOI:** https://doi.org/10.1016/j.cor.2020.105063

## Exact structural bridge

PCCSP assigns one class to each operation, imposes precedence constraints, repeatedly chooses a class, executes as many currently available operations of that class as possible, and minimizes the number of class runs/setups.

Restrict frozen glycan 0.1 so every non-target type has singleton susceptibility.

For a PCCSP precedence path v1 before v2 before ... before vm, construct one glycan non-target chain with v1 as child of v2, continuing upward to vm, then attach vm below the retained target root.

Assign the unique enzyme of each glycan node to its PCCSP class.

Then one exhaustive enzyme phase is exactly one PCCSP class execution: it removes every currently exposed operation of that class and continues through newly exposed same-class operations in the same phase.

For a nonempty instance, glycan treatment count equals PCCSP class-run count, which is the usual setup count plus one.

## Complexity consequence

The PCCSP literature reports strong NP-hardness with at least three classes even when the precedence graph is a disjoint union of paths. Those instances map directly to singleton-susceptibility glycan forests consisting only of disjoint chains under one retained root.

Therefore the frozen glycan optimization already contains a strongly NP-hard restricted subclass. The difficulty can arise from cross-branch synchronization of a few treatment labels, without arbitrary branching, uncertainty, or multi-enzyme susceptibility.

## Agreement with IsoGraph

The PCCSP literature also records non-repetitive shortest common supersequence as a special case. IsoGraph independently derived that singleton susceptibility reduces exactly to ordinary SCS on run-compressed maximal-path label words. The agreement is external corroboration, not proof authority.

## Algorithm transfers to test

- Port the PCCSP class-sequence dynamic program as a singleton baseline.
- Port its same-class merging, lower bounds, precedence reasoning, immediate-selection rules, state dominance, and heuristics.
- Compare against forward ideal search, A15 backward antichain DP, and SCS solvers.
- Then generalize fixed class membership to set-valued susceptibility E_q using phase nuclei, dominance, ordered layers, resistant chains, and B_M.

## Strategic consequence

Do not assume another quotient must make the unrestricted problem polynomial. The higher-value targets are smaller exact state, stronger lower bounds, output-sensitive basis generation, parameterized algorithms, polynomial special cases, and fast exact DP.

No external novelty claim is made.