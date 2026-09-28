# Glycan clue-fed exact derivations A28 — Node-verified witness width 173 0.1

**Status:** exact internal derivation after repaired Experiment 047
**Date:** 2026-09-27
**Internal parents:** A21-A27
**Prior exact implicit range:** G-IA001..G-IA432
**Authoritative experiment:** 047 Node run 36358828377
**Authoritative source SHA:** 55088c2450e689654e77ca1b70c758cb2df66933

The failed pre-repair Experiment-047 runs and the independent anomaly verifier remain immutable provenance.

All assertions below use only the repaired exact threshold coverage and private-witness certificate.

## G-IA433 — repaired Node Experiment 047 verifies a 173-path threshold-critical cover

At threshold:

    L = 20,

the complete run-compressed ternary treatment-word universe contains:

    |U_20|
    =
    3 * 2^19
    =
    1,572,864

words.

The candidate path universe contains every run-compressed singleton-susceptibility path of length 10:

    3 * 2^9
    =
    1,536 paths.

The repaired Experiment-047 Node run selected a family F_173 of:

    173 distinct paths.

Exact verification established:

    union_{P in F_173} D_20(P)
    =
    U_20.

Therefore no length-20 treatment word covers the full family.

By the A24/A25 padding theorem:

    OPT(F_173) > 20.

## G-IA434 — every selected path has a private length-20 deletion witness

For each:

    P_i in F_173,

the repaired run records a threshold word:

    w_i in U_20

such that:

    w_i fails P_i

and:

    w_i covers every P_j
    for j != i.

Therefore:

    OPT(F_173 without {P_i}) <= 20

for every selected path.

## G-IA435 — ternary witness width 173 is exactly realized

The full family satisfies:

    OPT(F_173) > 20.

Every one-path deletion satisfies:

    OPT(F_173 without {P_i}) <= 20.

By the A21/A25 one-path-deletion criterion:

    W(F_173) = 173.

Thus the frozen deterministic singleton-susceptibility ternary model realizes exact witness width 173.

## G-IA436 — direct frozen glycan realization uses 1,730 non-target nodes

Every selected path has length 10.

Realize each selected path as one independent singleton-susceptibility chain below retained target structure.

Then:

    173 * 10
    =
    1,730

non-target nodes are represented.

Corrected A8 singleton path-language equivalence transfers the exact treatment-word language to the direct frozen glycan realization.

Therefore that glycan instance has witness width 173.

## G-IA437 — no universal J_h exactness holds for h <=172 in the ternary subclass

For F_173:

    W(F_173)=173.

By A22:

    J_h(F_173)=OPT(F_173)
    iff
    h>=173.

Therefore:

    J_h(F_173) < OPT(F_173)

for every:

    h <= 172.

Hence no universal fixed-h exactness theorem with h<=172 is valid even in deterministic three-enzyme singleton chain forests.

## G-IA438 — threshold-20 satisfaction-set Helly number is at least 173

For each selected path P_i define:

    C_20(P_i)

as the length-20 treatment words covering P_i.

The total intersection is empty because F_173 has no length-20 solution.

Removing any one selected satisfaction set leaves a nonempty intersection, witnessed by that path's private word.

Therefore the threshold-20 satisfaction-set family contains a minimal empty-intersection subfamily of cardinality:

    173.

Hence its ordinary finite set-system Helly number is at least 173.

## G-IA439 — the threshold failure-incidence relation contains a 173-by-173 identity submatrix

Define:

    M(P,w)=1

iff threshold word w fails path P.

Index the selected paths:

    P_1,...,P_173

and their private witnesses:

    w_1,...,w_173.

G-IA434 gives:

    M(P_i,w_j)=1
    iff
    i=j.

Therefore M contains an exact:

    173 x 173

identity submatrix.

## G-IA440 — threshold-20 Maximum Minimal Set Cover optimum is at least 173

A25 identifies fixed-threshold witness-width maximization with Maximum Minimal Set Cover over the structured path-failure incidence system.

Repaired Experiment 047 supplies one exact inclusion-minimal cover of cardinality 173.

Therefore:

    maximum minimal cover cardinality
    on the declared threshold-20 incidence system
    >= 173.

No equality or maximum claim is admitted.

## Disposition

New exact implicit assertions:

    G-IA433..G-IA440.

Strongest unconditional finite witness:

    alphabet size:            3
    witness width:            173
    path count:               173
    path length:              10
    threshold length:         20
    non-target glycan nodes:  1,730.

Active implementation:

    Node.js only.

Unconditional ternary witness-width unboundedness remains open.

Conditional A22 boundary remains separate.