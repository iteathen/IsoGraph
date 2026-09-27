# Glycan clue-fed exact derivations A19 — binary exactness and three-enzyme boundary 0.1

**Status:** exact internal derivation after Experiment 039
**Date:** 2026-09-27
**Prior exact implicit range:** G-IA001..G-IA346

Experiment 039 found J2 exact on the complete tested two-enzyme surface and J3 exact on the tested three-enzyme surface.

This file separates one result that is universally provable from one finite-surface coincidence that is not.

---

## G-IA347 — binary irredundant treatment words alternate

Assume the effective treatment alphabet contains at most two distinct phase-transformer classes, represented by labels A and B.

Any solving word containing adjacent equal labels:

    ... A A ...

or:

    ... B B ...

is not subsequence-minimal because phase idempotence removes one adjacent duplicate without changing the resulting state.

Therefore every subsequence-minimal solving word over the binary alphabet alternates.

Such a word is completely determined by:

- its first label; and
- its length.

---

## G-IA348 — two start-conditioned path requirements suffice to characterize one binary path

For one active maximal path P over a two-enzyme set-valued susceptibility alphabet, define:

    d_A(P)

as the minimum length of an alternating path-covering word that starts with A, or INF if none exists.

Define d_B(P) analogously.

Every subsequence-minimal path-covering word is alternating by G-IA347.

Therefore the path coverage language is characterized, for minimum-length purposes, by the pair:

    (d_A(P), d_B(P)).

For a fixed start label s in {A,B}, any longer alternating word with the same start contains the shorter one as a prefix and therefore also covers P.

---

## G-IA349 — global binary optimum has a two-number form

For the active maximal-path family Paths(A), define:

    D_A = max_P d_A(P)
    D_B = max_P d_B(P).

A global solving word starting with A must have length at least D_A and an alternating word of length D_A starting with A covers every path.

Likewise for B.

Therefore:

    remaining_OPT(A)
    =
    min(D_A, D_B).

This is exact for every frozen 0.1 state whose effective alphabet has at most two phase-transformer classes.

---

## G-IA350 — two paths witness the exact binary optimum

Choose path P_A attaining D_A and path P_B attaining D_B.

Consider the two-path family:

    H = {P_A, P_B}.

Its A-start requirement is:

    max(d_A(P_A), d_A(P_B))
    =
    D_A,

because d_A(P_B) <= D_A.

Its B-start requirement is:

    max(d_B(P_A), d_B(P_B))
    =
    D_B,

because d_B(P_A) <= D_B.

Therefore:

    OPT_PATH(H)
    =
    min(D_A,D_B)
    =
    remaining_OPT(A).

Hence:

    J_2(A)
    =
    remaining_OPT(A)

for every state with at most two effective treatment classes.

This is universal in the frozen model and explains the exact two-enzyme result seen in Experiments 038-039.

If only one effective class exists, J1 is already exact.

---

## G-IA351 — binary exactness is an alphabet-order theorem, not a tree-size theorem

The proof of G-IA350 does not depend on:

- number of active paths;
- path lengths;
- branching factor;
- raw node count.

It depends on the fact that, after adjacent idempotent duplicates are removed, a word over two labels has only two possible alternating forms for any fixed length.

Thus the exactness of J2 on binary instances survives arbitrarily large finite rooted forests in frozen 0.1.

---

## G-IA352 — J3 is not universally exact with three treatment labels

Use three singleton-susceptibility treatment labels:

    0, 1, 2.

Construct four independent non-target chains below the retained target boundary whose run-compressed path words are:

    P1 = 010
    P2 = 012
    P3 = 101
    P4 = 210.

Because susceptibility is singleton, path coverage is ordinary subsequence containment of these run-compressed words.

Every three-path subfamily has a common supersequence of length 5.

Examples:

    {010,012,101} -> 01012
    {010,012,210} -> 01210
    {010,101,210} -> 02101
    {012,101,210} -> 21012.

No three-path subfamily requires more than 5.

The full four-path family has no common supersequence of length 5 and has common supersequences of length 6, for example:

    010210.

Therefore:

    J_3 = 5
    but
    remaining_OPT = 6.

So:

    J_3 < OPT

is possible with three treatment labels.

---

## G-IA353 — the smallest-current counterexample needs higher-order path synchronization, not chemistry uncertainty

The G-IA352 witness uses:

- deterministic singleton susceptibility;
- independent chain branches;
- no stochasticity;
- no uncertain relation;
- no multi-enzyme site ambiguity.

Its obstruction is purely global sequence synchronization across four path-language obligations.

Therefore the failure of universal J3 cannot be blamed on the set-valued generalization.

---

## G-IA354 — no fixed h<|Paths| is promoted from Experiment 039

Experiment 039 established:

    J3 = OPT

on its complete finite surface.

G-IA352 proves that result does not generalize universally even at three treatment labels.

The only universally exact hierarchy endpoint presently admitted remains A18:

    J_h = OPT

when h is at least the number of active maximal paths.

Any smaller universal witness-number theorem requires separate proof.

---

## G-IA355 — finite-surface exactness remains useful as an algorithmic parameter observation

Although J3 is not universally exact, Experiment 039 shows it was exact on all 396,855 states of the declared small test surface.

Therefore small-h joint-path bounds remain useful admissible relaxations.

The correct interpretation is:

    small h
    =
    resource/strength parameter,

not:

    small h
    =
    universal semantic bound.

---

## Disposition

New exact implicit assertions:

    G-IA347..G-IA355.

Strong universal result:

    effective alphabet size <= 2
    ->
    J2 = OPT.

Sharp falsifier:

    three treatment labels
    ->
    J3 need not equal OPT.

Next experiment:

- mechanically verify G-IA350 over larger/random two-enzyme instances;
- exhaustively search three-enzyme singleton path families for the smallest J3 counterexample;
- compare J_h witness size against treatment alphabet size, number of paths, and B_M size without assuming a fixed universal Helly number.
