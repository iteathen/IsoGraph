# Glycan clue-fed exact derivations A25 — witness width 54 and critical-cover simplification 0.1

**Status:** exact internal derivation after Experiment 044
**Date:** 2026-09-27
**Internal parents:** A21-A24
**Prior exact implicit range:** G-IA001..G-IA402
**Experiment:** 044, run 36356468957, frozen source SHA 01b95f6e963f53c26cbe2670760bbc2780d71c5f

---

## G-IA403 — minimal threshold cover alone certifies full witness width

Fix a singleton-susceptibility path family F over an alphabet with at least two treatment labels and threshold L.

Assume:

1. no run-compressed length-L word covers all of F;
2. for every P in F, there exists a run-compressed length-L word covering F without {P}.

Then by A24's padding theorem:

    OPT(F) > L.

For every P:

    OPT(F without {P}) <= L.

Therefore:

    OPT(F without {P})
    <
    OPT(F)

for every P.

By A21's one-path-deletion criterion:

    W(F)=|F|.

No length-(L+1) full-family witness is required merely to establish witness width.

A next-length witness is required only to determine the exact value of OPT when desired.

---

## G-IA404 — inclusion-minimal forbidden-set cover is sufficient for exact witness-width certification

At threshold L, A23 defines:

    D_L(P)
    =
    set of irredundant length-L treatment words failing P.

If:

    {D_L(P) | P in F}

is an inclusion-minimal cover of U_L,

then:

- total coverage gives no length-L full solution;
- minimality gives one private length-L deletion witness for every P.

Therefore G-IA403 applies and:

    W(F)=|F|.

Thus an exact inclusion-minimal cover is itself a complete witness-width certificate.

---

## G-IA405 — Experiment 044 realizes a 54-path critical cover

Experiment 044 verified 54 distinct run-compressed ternary singleton paths of length 7.

At threshold:

    L=14,

the complete irredundant word universe has:

    |U_14|
    =
    3 * 2^13
    =
    24,576.

The 54 selected forbidden sets cover all of U_14.

Every selected path has a verified private word in U_14.

Therefore the forbidden-set family is inclusion-minimal.

By G-IA404:

    W=54.

---

## G-IA406 — the width-54 family has exact optimum 15

Experiment 044 enumerated all:

    3 * 2^14
    =
    49,152

run-compressed ternary words of length 15.

It found:

    695

full-family solutions.

The first frozen solution is:

    010201021012012.

A24/G-IA392 plus threshold-14 infeasibility gives:

    OPT > 14.

The length-15 witness gives:

    OPT <= 15.

Therefore:

    OPT=15.

---

## G-IA407 — direct frozen glycan realization uses 378 independent non-target nodes

Each of the 54 paths has singleton susceptibility and length 7.

Realize each path as one independent non-target chain below retained target structure.

Then:

    54 * 7
    =
    378

non-target nodes are represented.

Corrected A8 singleton path-language equivalence gives exactly the same treatment-word language.

Therefore the direct frozen glycan instance has:

    OPT=15
    W=54.

No non-target branching, multi-enzyme susceptibility, QU, or stochasticity is required.

---

## G-IA408 — ternary J_h fails universally for every h <=53

For the width-54 family:

    W=54.

By A22:

    J_h=OPT
    iff
    h>=W.

Therefore:

    J_h < OPT

for every:

    h<=53.

Hence no universal fixed-h theorem with h<=53 is valid even in deterministic singleton-susceptibility three-enzyme chain forests.

---

## G-IA409 — the threshold-14 satisfaction-set family has Helly number at least 54

Let:

    C_14(P)

be the length-14 satisfaction sets of the 54 selected paths.

Their total intersection is empty.

Every 53-set subfamily obtained by deleting one selected path has nonempty intersection, witnessed by that path's private deletion word.

Therefore the ordinary set-system Helly number of the threshold-14 satisfaction family is at least:

    54.

No geometric Helly theorem is imported.

---

## G-IA410 — private witnesses give a 54-by-54 identity failure-incidence submatrix

Index selected paths:

    P_1,...,P_54

and their verified private words:

    w_1,...,w_54.

For threshold failure incidence:

    M(P,w)=1
    iff
    w fails P,

Experiment 044 establishes:

    M(P_i,w_j)=1
    iff
    i=j.

Therefore M contains a 54-by-54 identity submatrix.

This strengthens the exact finite private-witness incidence lower bound from A24.

---

## G-IA411 — fixed-threshold maximum witness width is a Maximum Minimal Set Cover problem

At fixed L and a fixed candidate path universe C, construct the finite set-cover instance:

    universe:
        U_L

    available sets:
        { D_L(P) | P in C }.

By G-IA404:

    every inclusion-minimal cover
    corresponds to a threshold-critical path family
    whose witness width equals the cover cardinality.

Therefore:

> The largest witness width obtainable from the declared candidate path universe at threshold L is exactly the maximum cardinality of an inclusion-minimal set cover by the path-forbidden sets.

This is the standard Maximum Minimal Set Cover optimization problem applied to the structured subsequence-incidence instance.

External algorithms for generic Maximum Minimal Set Cover may be used as search/implementation tools, but they are not semantic proof authority.

---

## G-IA412 — Experiment 044 supplies only a feasible lower bound for that Maximum Minimal Set Cover optimum

The 54-path candidate was generated by exploratory critical-cover search and then verified exactly.

No exhaustive optimization over all inclusion-minimal covers was performed.

Therefore:

    maximum threshold-14 witness width
    >= 54

is established,

but:

    maximum threshold-14 witness width = 54

is not established.

---

## G-IA413 — next-length feasibility and witness-width criticality are separate obligations

For a minimal threshold cover:

    threshold infeasibility
    +
    private deletion witnesses

already establishes exact witness width by G-IA403.

A full-family word at L+1 establishes the stronger quantitative statement:

    OPT=L+1.

Thus future large-width searches can separate:

1. critical-cover verification;
2. exact optimum-value localization.

This permits witness-width construction to scale without requiring immediate exhaustive next-length enumeration when only W is the research target.

---

## Disposition

New exact implicit assertions:

    G-IA403..G-IA413.

Strongest unconditional finite witness:

    alphabet size:           3
    witness width:           54
    path count:              54
    path length:             7
    threshold length:        14
    exact optimum:           15
    non-target glycan nodes: 378.

External structural identification:

    threshold witness-width maximization
    =
    Maximum Minimal Set Cover
    on the path-forbidden subsequence incidence system.

Unconditional ternary witness-width unboundedness remains open.

Conditional A22 boundary remains:

    cited PCCSP hardness + P!=NP
    ->
    ternary witness width is unbounded.
