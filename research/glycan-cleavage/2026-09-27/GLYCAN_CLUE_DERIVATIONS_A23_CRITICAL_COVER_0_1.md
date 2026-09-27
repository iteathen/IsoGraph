# Glycan clue-fed exact derivations A23 — threshold critical-cover representation 0.1

**Status:** exact internal derivation after Experiment 042
**Date:** 2026-09-27
**Internal parents:** A18, A21, A22
**Prior exact implicit range:** G-IA001..G-IA378

Experiment 042's width-24 witness was found and verified through a finite candidate-word threshold.

This file makes that threshold structure explicit.

---

## G-IA379 — define the irredundant fixed-length treatment universe

Fix a singleton-susceptibility path family over finite effective treatment alphabet Sigma.

For integer L>=0 define:

    U_L

as the set of raw treatment words of length exactly L with no adjacent repeated treatment label.

Adjacent repeats are omitted because phase idempotence makes them removable without changing the represented state transition.

For alphabet size m>=2:

    |U_L| =
        1                    when L=0,
        m (m-1)^(L-1)       when L>=1.

For the ternary Experiment-042 threshold:

    |U_10| = 3 * 2^9 = 1536.

---

## G-IA380 — each path defines a fixed-length satisfaction set

For one singleton path P define:

    C_L(P)
    =
    { w in U_L |
      P is a subsequence of w }.

C_L(P) is the exact set of irredundant length-L treatment words that cover P.

Define its forbidden complement:

    D_L(P)
    =
    U_L minus C_L(P).

A word lies in D_L(P) exactly when it fails the path constraint P.

---

## G-IA381 — a path family has a length-L common solution iff its satisfaction sets intersect

For finite path family F:

    there exists w in U_L
    covering every P in F

iff

    intersection_{P in F} C_L(P)
    is nonempty.

This is immediate from membership in every path satisfaction set.

For L at least one feasible solution length, longer irredundant words can be considered independently; this fixed-threshold claim concerns exactly length L.

---

## G-IA382 — fixed-threshold failure is exactly a set-cover condition

Using:

    D_L(P)=U_L minus C_L(P),

De Morgan duality gives:

    intersection_{P in F} C_L(P)
    is empty

iff

    union_{P in F} D_L(P)
    =
    U_L.

Therefore:

> A path family has no irredundant common treatment word of length L exactly when its path-forbidden sets cover the entire finite word universe U_L.

This is an exact finite set-cover representation of threshold infeasibility.

---

## G-IA383 — one-path-deletion criticality is minimal set-cover criticality

Assume F has no length-L common solution, but every one-path deletion does.

Then:

    { D_L(P) | P in F }

covers U_L,

and deleting any one cover set destroys coverage.

Thus it is an inclusion-minimal set cover of U_L.

Conversely, every inclusion-minimal cover by path-forbidden sets gives:

    no length-L solution for F,

but:

    a length-L solution after deleting any one path.

So one-path-deletion criticality at threshold L is exactly minimality of the corresponding forbidden-set cover.

---

## G-IA384 — every critical path has a private length-L witness

Under G-IA383, for each path P in F there exists at least one word:

    w_P in U_L

such that:

    w_P notin D_L(Q)
    for every Q != P,

but:

    w_P in D_L(P).

Equivalently:

    w_P covers every path in F except P,
    and fails P.

This private word is exactly a deletion witness for P.

Conversely, if the forbidden sets cover U_L and every P has such a private witness, the cover is inclusion-minimal.

---

## G-IA385 — threshold-critical family size lower-bounds witness width at the next optimum

Suppose:

1. F has no solution of length <=L;
2. every one-path deletion has a solution of length L;
3. F has a solution of length L+1.

Then:

    OPT(F)=L+1,

and every proper one-path deletion has optimum <=L.

By A21's one-path deletion criterion:

    W(F)=|F|.

Thus a minimal threshold cover plus one next-length full witness supplies an exact witness-width certificate.

---

## G-IA386 — Experiment 042 realizes a 24-set minimal threshold cover

Experiment 042 uses 24 distinct run-compressed ternary singleton paths.

It exhaustively established:

    no full-family solution of length <=10;

for every path P_i:

    one length-10 word covers all other 23 paths;

and:

    at least one length-11 word covers all 24 paths.

At threshold L=10:

    |U_10|=1536.

The 24 forbidden sets:

    D_10(P_i)

therefore form an inclusion-minimal cover of U_10.

By G-IA385:

    W(F)=24
    and
    OPT(F)=11.

---

## G-IA387 — the threshold set system has Helly number at least 24

Consider the finite family of satisfaction sets:

    { C_10(P) }

over all relevant ternary singleton paths.

Experiment 042 supplies 24 such sets whose total intersection is empty while every 23-set subfamily has nonempty intersection.

Therefore this finite satisfaction-set family has Helly number at least 24 in the ordinary set-system sense.

This is a derived combinatorial view.

It does not import a geometric Helly theorem.

---

## G-IA388 — critical-cover search is an exact witness-width construction method

For fixed alphabet and threshold L, an exact search for large witness-width candidates may operate on the finite universe U_L:

1. generate candidate paths P;
2. compute D_L(P);
3. find large inclusion-minimal covers of U_L by these forbidden sets;
4. recover one private witness per selected path;
5. test whether the full family has a solution at L+1.

When step 5 succeeds and shorter lengths are excluded, G-IA385 converts the cover into an exact witness-width instance.

This is the structural method that produced the Experiment-042 candidate.

---

## G-IA389 — witness-width growth is a finite intersection obstruction, not only a path-order obstruction

The earlier J2/J3 residuals emphasized ordering and higher-order path synchronization.

The critical-cover view shows a broader source:

    many path constraints
    can jointly eliminate every candidate word
    at one treatment length
    while each proper one-path deletion
    leaves a private feasible word.

Thus high witness width may arise even when all paths are independent chains and all susceptibility is singleton.

The load-bearing structure is the intersection pattern of their finite treatment-word satisfaction sets.

---

## G-IA390 — width-24 remains a finite lower bound, not an unconditional unboundedness theorem

G-IA386 proves:

    ternary witness width >= 24

is achievable.

It does not prove arbitrary witness width.

A22 separately proves the conditional statement:

    P != NP
    ->
    no universal constant ternary witness-width bound

under the cited PCCSP hardness theorem.

An unconditional unboundedness construction remains open.

---

## Disposition

New exact implicit assertions:

    G-IA379..G-IA390.

Strongest unconditional finite witness:

    alphabet size = 3
    witness width = 24
    OPT = 11
    total non-target chain nodes = 120.

New construction view:

    witness-width criticality
    =
    minimal cover of a finite
    fixed-length treatment-word universe
    by path-forbidden sets.

Next research target:

- use the critical-cover representation to seek scalable width constructions;
- compare cover size with threshold length, alphabet size, and B_M;
- preserve the distinction between finite lower-bound constructions and unconditional unboundedness.
