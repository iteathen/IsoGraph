# Glycan clue-fed exact derivations A20 — fixed-J3 falsifier 0.1

**Status:** exact negative-result admission
**Date:** 2026-09-27
**Parent:** Experiment 040
**Prior exact implicit range:** G-IA001..G-IA353

## G-IA354 — a three-enzyme frozen-0.1 instance can require four paths to witness OPT

Consider four disjoint non-target singleton-susceptibility chains with child-to-parent class words:

    ABA
    ABC
    BAB
    CBA.

Attach the top of each chain below retained target structure.

Experiment 040's exact path-product and direct glycan-state search both give:

    OPT = 6.

## G-IA355 — every three-path subfamily of the counterexample has optimum 5

The four three-path omissions have exact shortest covering words of length 5.

Therefore J3=5 for the full four-path instance.

## G-IA356 — J3 is not universally exact for three enzymes

Combining G-IA354 and G-IA355:

    J3 < OPT

on a valid singleton-susceptibility three-enzyme frozen-0.1 instance.

Thus no theorem 'three enzymes imply J3 exact' is admissible.

Experiment 039 remains valid finite-surface evidence only.

## G-IA357 — enzyme alphabet cardinality does not by itself bound exact witness-path cardinality

The counterexample has three enzyme labels but needs all four path constraints to raise the exact optimum from 5 to 6.

Therefore the enzyme-count value alone is not an upper bound on the number of paths required to witness the exact global optimum.

This statement refutes that cardinality bound only; it does not establish an unbounded witness-width family for every fixed alphabet.

## G-IA358 — A19 two-enzyme exactness survives

The three-enzyme falsifier does not affect A19.

A19's J2 theorem uses the special fact that every no-adjacent-repeat binary word is one of two alternating sequences determined by start symbol and length.

That property fails from three symbols onward.

## Disposition

New exact implicit assertions: G-IA354..G-IA358.

The adaptive J_h hierarchy remains valid, but no fixed h tied only to three-enzyme alphabet size is exact.