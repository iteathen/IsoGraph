# Glycan clue-fed exact derivations A20 — three-enzyme J3 boundary 0.1

**Status:** exact internal derivation from Experiment 040
**Date:** 2026-09-27
**Authoritative predecessor:** GLYCAN_CLUE_DERIVATIONS_A19_TWO_ENZYME_EXACT_0_1.md
**Prior exact implicit range:** G-IA001..G-IA353

Experiment 039 found J3 exact on its complete small three-enzyme surface.
Experiment 040 supplied a direct counterexample showing that finite-surface exactness does not generalize universally.

## G-IA354 — J3 is not universally exact with three treatment labels

Use three singleton-susceptibility labels:

    0, 1, 2.

Construct four independent non-target chains under the retained target boundary with run-compressed path words:

    P1 = 010
    P2 = 012
    P3 = 101
    P4 = 210.

Because susceptibility is singleton, each path constraint is ordinary subsequence containment.

Every three-path subfamily has a common supersequence of length 5.

Explicit witnesses include:

    {010,012,101} -> 01012
    {010,012,210} -> 01210
    {010,101,210} -> 02101
    {012,101,210} -> 21012.

The full four-path family has no common supersequence of length 5 and has one of length 6, for example:

    010210.

Therefore:

    J3 = 5
    OPT = 6.

Hence J3 can be strictly below the exact optimum even with exactly three effective treatment classes.

## G-IA355 — the J3 failure is pure synchronization

The G-IA354 witness uses:

- deterministic singleton susceptibility;
- four independent chains;
- no multi-enzyme site ambiguity;
- no stochasticity;
- no QU;
- no shared non-target ancestor.

Therefore the obstruction is purely global treatment-word synchronization across four path obligations.

It is not caused by biochemical uncertainty or branching geometry.

## G-IA356 — binary J2 exactness and ternary J3 failure form a sharp current boundary

A19 proves:

    effective treatment classes <= 2
    ->
    J2 = OPT universally.

A20 proves:

    effective treatment classes = 3
    -/->
    J3 = OPT universally.

Therefore the binary exactness theorem depends on the special two-symbol alternating-word collapse and does not extend by simply replacing 2 with the alphabet cardinality.

## G-IA357 — finite-surface J3 exactness remains algorithmically useful but not semantic completeness

Experiment 039 established J3=OPT on all 396,855 states in its declared surface.

Experiment 040 establishes a concrete state outside that surface where J3<OPT.

Thus:

    small h joint-path bounds
    =
    admissible resource/strength hierarchy,

not:

    a fixed universal Helly number inferred from small tests.

No fixed h<|Paths| is currently admitted as universally exact for alphabets of size at least three.

## G-IA358 — Experiment 040 mechanically realizes the counterexample as a frozen glycan instance

Experiment 040 enumerated 5,985 four-path families over the 21 run-compressed singleton words of length at most 3 on three labels.

It reproduced the G-IA354 family and constructed its direct glycan realization with 12 non-target chain nodes.

Measured values:

    J3 = 5
    realized glycan OPT = 6.

Therefore the counterexample is not only a path-language abstraction; it is realized by the frozen glycan transition semantics.

## Disposition

New exact implicit assertions:

    G-IA354..G-IA358.

Current joint-path boundary:

    <=2 effective treatment classes:
        J2 universally exact.

    >=3 effective treatment classes:
        no alphabet-size-only J_h exactness rule is admitted.

Next discovery target:

    minimum number of path constraints needed to witness OPT
    ("witness width"),

and whether that width can grow beyond four for a fixed three-label alphabet.
