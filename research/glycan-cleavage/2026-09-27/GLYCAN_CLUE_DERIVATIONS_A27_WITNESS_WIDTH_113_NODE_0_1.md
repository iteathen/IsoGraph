# Glycan clue-fed exact derivations A27 — Node-verified witness width 113 0.1

**Status:** exact internal derivation after Experiment 046  
**Date:** 2026-09-27  
**Internal parents:** A21-A26  
**Prior exact implicit range:** G-IA001..G-IA422  
**Authoritative experiment:** 046 Node run 36358154727  
**Authoritative source SHA:** f5a3c78fe89fc3ed24bfe3f1493b4977e0dbb26e

## G-IA423 — Node Experiment 046 verifies a 113-path threshold-critical cover

At threshold:

    L = 18,

the complete run-compressed ternary treatment-word universe has:

    |U_18|
    =
    3 * 2^17
    =
    393,216

members.

The candidate path universe contains every run-compressed singleton-susceptibility path of length 9:

    3 * 2^8
    =
    768 paths.

Experiment 046 selected a family F_113 of:

    113 distinct paths.

Exact verification established:

    union_{P in F_113} D_18(P)
    =
    U_18.

Therefore there is no length-18 treatment word covering the full family.

By the A24/A25 padding theorem:

    OPT(F_113) > 18.

## G-IA424 — every selected path has a private length-18 deletion witness

For each:

    P_i in F_113,

Experiment 046 records a threshold word:

    w_i in U_18

such that:

    w_i fails P_i

and:

    w_i covers every P_j
    for j != i.

Therefore:

    OPT(F_113 without {P_i})
    <= 18

for every selected path.

## G-IA425 — ternary witness width 113 is exactly realized

The full family has:

    OPT(F_113) > 18.

Every one-path deletion has:

    OPT(F_113 without {P_i}) <= 18.

By the A21/A25 one-path-deletion criterion:

    W(F_113) = 113.

Thus the frozen deterministic singleton-susceptibility ternary model realizes exact joint-path witness width 113.

## G-IA426 — direct frozen glycan realization uses 1,017 non-target nodes

Every selected path has length 9.

Realize each selected path as one independent singleton-susceptibility chain under retained target structure.

Then:

    113 * 9
    =
    1,017

non-target nodes are represented.

Corrected A8 singleton path-language equivalence transfers the exact path-family treatment language to the direct frozen glycan instance.

Therefore that instance has witness width 113.

## G-IA427 — no universal J_h exactness holds for h <=112 in the ternary subclass

For F_113:

    W(F_113)=113.

By A22:

    J_h(F_113)=OPT(F_113)
    iff
    h>=113.

Therefore:

    J_h(F_113) < OPT(F_113)

for every:

    h <= 112.

Thus no theorem:

    J_h = OPT universally

can hold for any fixed h<=112 even in deterministic three-enzyme singleton chain forests.

## G-IA428 — threshold-18 satisfaction-set Helly number is at least 113

For each selected path P_i define:

    C_18(P_i)

as the length-18 treatment words covering P_i.

The total intersection is empty because F_113 has no length-18 solution.

Removing any one selected satisfaction set leaves a nonempty intersection, witnessed by that path's private word.

Therefore the threshold-18 satisfaction-set family contains a minimal empty-intersection subfamily of cardinality:

    113.

Hence its ordinary finite set-system Helly number is at least 113.

No geometric Helly theorem is imported.

## G-IA429 — the threshold failure-incidence relation contains a 113-by-113 identity submatrix

Define:

    M(P,w)=1

iff threshold word w fails path P.

Index the selected paths:

    P_1,...,P_113

and their private witnesses:

    w_1,...,w_113.

G-IA424 gives:

    M(P_i,w_j)=1
    iff
    i=j.

Therefore M contains an exact:

    113 x 113

identity submatrix.

## G-IA430 — threshold-18 Maximum Minimal Set Cover optimum is at least 113

A25 identifies fixed-threshold witness-width maximization with Maximum Minimal Set Cover over the path-failure incidence family.

Experiment 046 supplies an exact inclusion-minimal cover of cardinality 113.

Therefore:

    maximum minimal cover cardinality
    on the declared threshold-18 incidence system
    >= 113.

No equality or maximum claim is admitted.

## G-IA431 — the Node-only implementation scales without preserving row incidence

Experiment 046 did not materialize the complete path-row failure matrix.

Instead it reconstructed the exact incidence twice:

1. a complete count pass;
2. a complete CSR-fill pass.

The search then operated only on the exact threshold-word -> failing-path CSR.

This transformation changes implementation/storage only.

The semantic incidence relation and final critical-cover certificate are unchanged.

Therefore dropping the explicit row matrix is a lossless implementation factorization for the Experiment-046 obligations.

## G-IA432 — Experiment-046 runtime scaling is empirical only

The path/word comparison surface is exactly eight times the Experiment-045 threshold-16 surface.

The measured Node total time increased from:

    1.639 s

to:

    11.646 s.

This supports the implementation observation that the current Node path remains practical at the declared scale.

It does not establish an asymptotic time bound and is not semantic support for the witness-width theorem.

## Disposition

New exact implicit assertions:

    G-IA423..G-IA432.

Strongest unconditional finite witness:

    alphabet size:            3
    witness width:            113
    path count:               113
    path length:              9
    threshold length:         18
    non-target glycan nodes:  1,017.

Active implementation:

    Node.js only.

Unconditional ternary witness-width unboundedness remains open.

Conditional A22 boundary remains separate.
