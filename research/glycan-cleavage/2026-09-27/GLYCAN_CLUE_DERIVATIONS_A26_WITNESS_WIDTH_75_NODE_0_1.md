# Glycan clue-fed exact derivations A26 — Node-verified witness width 75 0.1

**Status:** exact internal derivation after authoritative Node Experiment 045 rerun
**Date:** 2026-09-27
**Internal parents:** A21-A25
**Prior exact implicit range:** G-IA001..G-IA413
**Authoritative experiment:** 045 Node run 36357819191
**Authoritative source SHA:** ea602d9d7a062ad32c63b7b46081b7386ae6b594

The earlier native Experiment 045 run is historical comparison evidence only.

All exact claims below use the independently reproduced Node.js threshold cover and private-witness verification.

---

## G-IA414 — Node Experiment 045 verifies a 75-path threshold-critical cover

At threshold:

    L = 16,

the complete irredundant ternary treatment-word universe contains:

    |U_16|
    =
    3 * 2^15
    =
    98,304

words.

The active candidate path universe contains all:

    3 * 2^7
    =
    384

run-compressed singleton-susceptibility paths of length 8.

The authoritative Node run selected a family F_75 of:

    75 distinct paths.

Its exact verification established:

    union_{P in F_75} D_16(P)
    =
    U_16.

Therefore no length-16 treatment word covers the full family.

By the padding theorem from A24/A25:

    OPT(F_75) > 16.

---

## G-IA415 — every selected path has a private length-16 deletion witness

For every selected:

    P_i in F_75,

the Node run records one:

    w_i in U_16

such that:

    w_i fails P_i

and:

    w_i covers every P_j
    for j != i.

Therefore deleting P_i leaves a family with a length-16 solving word.

So:

    OPT(F_75 without {P_i}) <= 16

for every i.

---

## G-IA416 — ternary witness width 75 is exactly realized

The full family satisfies:

    OPT(F_75) > 16.

Every one-path deletion satisfies:

    OPT(F_75 without {P_i}) <= 16.

Therefore every selected path is essential to the full optimum value.

By the A21/A25 one-path-deletion criterion:

    W(F_75) = 75.

Thus the frozen deterministic singleton-susceptibility ternary model realizes exact witness width:

    75.

---

## G-IA417 — direct glycan realization uses 600 independent non-target nodes

Every selected path has length 8.

Realize every path as one independent singleton-susceptibility chain below retained target structure.

Then:

    75 * 8
    =
    600

non-target nodes are represented.

Corrected A8 singleton path-language equivalence transfers the exact treatment language from the path family to the direct glycan model.

Therefore that frozen glycan instance has witness width 75.

No non-target branching, multi-enzyme susceptibility, stochasticity, or QU is required.

---

## G-IA418 — J_h fails universally for every h <= 74 in the ternary subclass

For F_75:

    W(F_75)=75.

By A22:

    J_h(F_75)=OPT(F_75)
    iff
    h>=75.

Therefore:

    J_h(F_75) < OPT(F_75)

for every:

    h <= 74.

Hence no universal theorem:

    J_h = OPT

can hold for any fixed h<=74 even for deterministic three-enzyme singleton chain forests.

---

## G-IA419 — threshold-16 satisfaction sets have Helly number at least 75

For selected paths define:

    C_16(P_i)

as the length-16 treatment words covering P_i.

The total intersection is empty because F_75 has no length-16 solution.

Removing any one C_16(P_i) leaves a nonempty intersection, witnessed by w_i.

Therefore the threshold-16 satisfaction-set family contains a minimal empty-intersection subfamily of cardinality 75.

Thus its ordinary finite set-system Helly number is at least:

    75.

No geometric Helly theorem is imported.

---

## G-IA420 — the failure-incidence relation contains a 75-by-75 identity submatrix

Define:

    M(P,w)=1

iff threshold word w fails path P.

Index the selected paths:

    P_1,...,P_75

and their private words:

    w_1,...,w_75.

G-IA415 gives:

    M(P_i,w_j)=1
    iff
    i=j.

Therefore M contains a:

    75 x 75

identity submatrix.

This extends the finite private-witness incidence lower bounds from A24/A25.

---

## G-IA421 — threshold-16 Maximum Minimal Set Cover optimum is at least 75

A25 identifies the fixed-threshold witness-width maximization problem with Maximum Minimal Set Cover on the structured path-failure incidence system.

Node Experiment 045 supplies one exact inclusion-minimal cover of cardinality 75.

Therefore:

    maximum minimal cover cardinality
    at the declared threshold/candidate universe
    >= 75.

The randomized search does not prove equality.

No maximum claim is admitted.

---

## G-IA422 — implementation language is not semantic support

The exact witness-width result depends on:

- complete threshold coverage;
- one private witness per selected path;
- the already admitted padding/deletion theorem.

It does not depend semantically on the implementation language.

The active campaign nevertheless requires Node.js as an engineering constraint.

The Node rerun reproduced the same exact certificate and is the authoritative execution evidence.

The historical native run is retained only as provenance/performance comparison.

---

## Disposition

New exact implicit assertions:

    G-IA414..G-IA422.

Strongest unconditional finite witness:

    alphabet size:            3
    witness width:            75
    path count:               75
    path length:              8
    threshold length:         16
    non-target glycan nodes:  600.

Active implementation:

    Node.js only.

Unconditional ternary witness-width unboundedness remains open.

Conditional A22 boundary remains separate.
