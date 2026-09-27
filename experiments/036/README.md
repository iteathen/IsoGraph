# Experiment 036 — singleton PCCSP lower bounds and immediate selection

**Status:** exact restricted-class algorithm experiment
**Date:** 2026-09-27
**Internal parent:** GLYCAN_CLUE_DERIVATIONS_A16_PCCSP_BOUNDS_0_1.md
**External comparison:** Bürgy, Baptiste, Hertz, Computers & Operations Research 124 (2020), 105063

## Scope

Singleton susceptibility only: every active non-target node has exactly one treatment class.

Every tested state is evaluated under the exact frozen glycan phase semantics.

## Test 1 — lower bounds

For every reachable state:

- exact remaining treatment distance is computed on the full reachable transition graph;
- CP = maximum remaining class-run count along an active child-to-parent path;
- OC = sum over classes of the maximum number of separated runs of that class along any active path.

Required inequalities:

    CP <= OC <= exact remaining distance.

Record tightness rates for CP and OC.

## Test 2 — immediate selection

For every reachable non-goal state:

- determine the currently available classes (classes of active terminal nodes);
- verify the only-available-class rule;
- for each available class c, classify every active nonavailable c-node u as blocked when there exists an available c-node v below u whose unique v-to-u precedence path contains a different-class node;
- if every nonavailable c-node is blocked, classify c as nonextendable.

Required property:

    every class certified by either exact rule
    is an optimal next treatment class:

    1 + dist(phase(state,c)) = dist(state).

## Exhaustive surface

- all topologically encoded rooted forests through n=5 with three classes;
- n=6 with two classes;
- every singleton class assignment;
- every reachable state of every instance.

## Acceptance

PASS requires:

- zero CP>OC violations;
- zero OC>exact-distance violations;
- zero only-available immediate-selection counterexamples;
- zero nonextendable-class immediate-selection counterexamples.

Any counterexample is preserved as evidence rather than weakened away.