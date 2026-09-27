# Glycan clue-fed exact derivations A21 — ternary witness-width lower bound 0.1

**Status:** exact finite witness derivation from Experiment 041
**Date:** 2026-09-27
**Authoritative predecessor:** A20 three-enzyme J3 boundary
**Prior exact implicit range:** G-IA001..G-IA358

## G-IA359 — define joint-path witness width

For a finite active maximal-path family F define:

    W(F)
    =
    minimum |H|
    such that
    H subseteq F
    and
    OPT_PATH(H)=OPT_PATH(F).

W(F) is the minimum number of path constraints that already force the exact joint-path optimum of F.

By definition:

    1 <= W(F) <= |F|

for every nonempty finite family.

## G-IA360 — one-path deletion criterion for maximal witness width

For a family F of size k:

    W(F)=k

iff:

    OPT_PATH(F)
    >
    OPT_PATH(F without {P})

for every P in F.

Reason:

If deleting any one path lowers the optimum, then every proper subfamily lies inside some one-path deletion and cannot retain the full optimum.

Conversely, if some one-path deletion retains the full optimum, a witness family of size at most k-1 exists.

## G-IA361 — three treatment labels admit witness width 4

The Experiment-040 family:

    010
    012
    101
    210

has:

    OPT = 6

and every one-path deletion has optimum 5.

Therefore:

    W = 4.

This is the A20 J3 counterexample restated as an exact witness-width result.

## G-IA362 — three treatment labels admit witness width 5

The Experiment-041 family:

    10102
    12012
    20202
    01202
    02121

has exact full optimum:

    OPT = 9.

Every one-path deletion has optimum at most 8.

Therefore by G-IA360:

    W = 5.

A direct singleton-susceptibility glycan realization with 25 non-target chain nodes has the same exact optimum 9.

## G-IA363 — three treatment labels admit witness width 6

The Experiment-041 family:

    20210
    01010
    02121
    21201
    1020
    20120

has:

    OPT = 9

and every one-path deletion has optimum 8.

Therefore:

    W = 6.

Its direct singleton glycan realization contains 29 non-target chain nodes and also has exact optimum 9.

## G-IA364 — three treatment labels admit witness width 7

The Experiment-041 family:

    02021
    02120
    12021
    1212
    2010
    2012
    2102

has:

    OPT = 9

and every one-path deletion has optimum 8.

Therefore:

    W = 7.

Its direct singleton glycan realization contains 31 non-target chain nodes and also has exact optimum 9.

## G-IA365 — witness width is not bounded by alphabet cardinality

G-IA364 gives:

    alphabet size = 3
    witness width = 7.

Therefore:

    witness width
    <= alphabet size

is false.

More generally, no rule that identifies the required joint-path witness count with the number of treatment labels is admissible.

## G-IA366 — no universal J_h exactness exists for h<=6 in the three-label subclass

For the width-7 family F:

    W(F)=7.

Therefore every subfamily of size at most 6 has optimum strictly below OPT(F).

By definition of J_h:

    J_h(F) < OPT(F)

for every:

    h <= 6.

Hence no fixed theorem:

    J_h = OPT

with h<=6 can hold universally even for deterministic singleton-susceptibility instances over three treatment labels.

## G-IA367 — high witness width can arise on disjoint chains only

The W4-W7 examples use independent singleton-susceptibility chains attached only through the retained target boundary.

Thus witness width growth through 7 requires neither:

- non-target branching;
- multi-enzyme site ambiguity;
- uncertain chemistry;
- shared non-target ancestry;
- stochastic transition behavior.

It arises purely from simultaneous global sequence constraints across independent branches.

## G-IA368 — Experiment 041 supplies exact finite realization evidence

Experiment 041 computed:

- exact joint-path optimum of each W4-W7 family;
- every one-path deletion optimum;
- one optimum treatment word;
- exact forward ideal-state optimum of the corresponding direct glycan realization.

All four families satisfied the expected strict one-path-deletion decrease and direct-realization equality.

Therefore W4-W7 are concrete frozen-model witnesses, not only external SCS examples.

## G-IA369 — unbounded ternary witness width remains open

The existence of widths 4,5,6,7 does not by itself prove:

    for every k
    there exists a three-label family F
    with W(F)>=k.

No scalable construction or unboundedness proof is admitted yet.

The correct current result is:

    ternary witness width >= 7 is achievable.

Whether it is unbounded remains a separate discovery question.

## Disposition

New exact implicit assertions:

    G-IA359..G-IA369.

Current boundary:

    <=2 effective treatment classes:
        W <= 2 universally,
        by A19.

    3 effective treatment classes:
        W can be at least 7,
        by Experiment 041.

Next target:

- search for width 8+ families;
- identify a recurrence/construction if widths continue to grow;
- otherwise isolate the obstruction that caps width.
