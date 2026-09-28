# Glycan clue-fed derivations A22 — witness-width parameter and complexity boundary 0.1

**Status:** exact internal parameter derivation + explicitly external-theorem-dependent complexity consequence
**Date:** 2026-09-27
**Internal parents:** A18, A19, A21
**Prior exact implicit range:** G-IA001..G-IA369
**External dependency for the hardness corollary only:** Bürgy, Baptiste, Hertz, *An exact dynamic programming algorithm for the precedence-constrained class sequencing problem*, Computers & Operations Research 124 (2020), 105063, including its cited strong NP-hardness result for at least three classes on disjoint-path precedence instances.

The parameter statements below are proved from the glycan path formulation. The P-versus-NP consequence is explicitly conditional on the cited external hardness theorem plus the already-recorded exact glycan/PCCSP bridge.

---

## G-IA370 — J_h exactness is exactly the witness-width threshold

For a nonempty active maximal-path family F, A21 defines:

    W(F)
    =
    minimum |H|
    such that
    H subseteq F
    and
    OPT_PATH(H)=OPT_PATH(F).

A18 defines:

    J_h(F)
    =
    maximum OPT_PATH(H)
    over H subseteq F
    with 1 <= |H| <= h.

Therefore:

    J_h(F)=OPT_PATH(F)
    iff
    h >= W(F).

Forward:

If J_h equals the full optimum, some family H of size at most h attains that value, hence W(F)<=h.

Reverse:

If W(F)<=h, a witness family of size at most h is among the families maximized by J_h, so J_h reaches the full optimum.

---

## G-IA371 — fixed-h joint-path evaluation is polynomial for constant h

Let:

    p = number of active maximal paths,
    n = total active path length,
    m = number of treatment operators.

For one selected path family H of size r<=h, A18 product progress has at most:

    product_{P in H} (|P|+1)
    <=
    (n+1)^r
    <=
    (n+1)^h

states.

Each state has at most m treatment transitions.

There are at most:

    sum_{r=1..h} C(p,r)
    =
    O(p^h)

selected families for fixed h.

Therefore J_h is exactly computable in time polynomial in the finite input size for every fixed constant h.

No claim is made that the polynomial degree is practical for large h.

---

## G-IA372 — a universal constant witness-width bound would give a polynomial exact solver

Assume there exists one constant h0 such that every instance in a declared subclass satisfies:

    W(F) <= h0.

Then by G-IA370:

    J_h0 = OPT

for every instance in that subclass.

By G-IA371, J_h0 is polynomial-time computable because h0 is fixed.

Therefore a universal constant witness-width bound implies a polynomial-time exact optimization algorithm for that subclass.

This statement is internal and does not use any complexity separation assumption.

---

## G-IA373 — conditional ternary complexity consequence from the PCCSP bridge

The recorded glycan/PCCSP bridge maps singleton-susceptibility glycan forests consisting of disjoint chains under retained target structure to precedence-constrained class sequencing instances phase-for-phase.

The cited PCCSP literature reports strong NP-hardness for at least three classes even when the precedence graph is a disjoint union of paths.

Therefore, conditional on that external hardness theorem:

    if one universal constant h0
    bounded W(F)
    for all three-enzyme singleton glycan chain forests,

then G-IA372 would give a polynomial exact algorithm for that strongly NP-hard PCCSP subclass.

Hence:

    universal constant ternary witness width
    ->
    P = NP.

This is a conditional complexity implication, not a proof of P=NP or P!=NP.

---

## G-IA374 — if P != NP, ternary witness width is unbounded

Take the contrapositive of G-IA373.

Conditional on:

    P != NP

and the cited external PCCSP hardness theorem,

for every constant h there must exist a three-enzyme singleton chain-family instance with:

    W(F) > h.

Equivalently:

    ternary witness width is unbounded.

This is explicitly conditional because P versus NP remains open.

Experiment 041's concrete width-7 family and Experiment 042's width-24 candidate are finite evidence in the direction predicted by this conditional result; they are not needed for the logical implication.

---

## G-IA375 — J_h supplies an anytime exact lower-bound ladder

For any active state:

    J_1 <= J_2 <= ... <= J_|Paths| = OPT.

A17 supplies another admissible lower bound PLB.

Define:

    LB_h = max(PLB,J_h).

Then:

    LB_h <= OPT

and LB_h is nondecreasing in h.

Thus h is an explicit resource/strength parameter.

---

## G-IA376 — any solving word turns the J_h ladder into an exact optimality certificate

Let U be the length of any known solving continuation.

Then:

    OPT <= U.

For any h:

    LB_h <= OPT <= U.

If at some h:

    LB_h = U,

then necessarily:

    LB_h = OPT = U.

Therefore a solver can:

1. obtain any feasible treatment word as an upper bound;
2. increase h adaptively;
3. stop as soon as the joint-path/partition lower bound meets the current upper bound.

The selected path family attaining J_h plus the feasible word supplies an exact lower/upper certificate pair.

---

## G-IA377 — the adaptive hierarchy always terminates at the full path family

Even if no early h closes the gap:

    J_|Paths| = OPT

by A18.

Therefore the adaptive certificate procedure is complete on every finite frozen-0.1 instance.

Its worst case may use the full path family and inherit the hard global synchronization problem.

---

## G-IA378 — witness width is an exact structural parameter distinct from alphabet size

A19 gives:

    at most two effective treatment classes
    ->
    W <= 2.

A21 gives explicit three-class instances with:

    W = 4,5,6,7.

Therefore witness width is not a function of alphabet cardinality alone.

G-IA373/G-IA374 further show that, under the standard complexity assumption P!=NP and the cited PCCSP hardness result, no constant bound exists even when the alphabet cardinality is fixed at three.

---

## Boundary

No unconditional unboundedness theorem is claimed here.

Current unconditional facts are finite/exact:

- binary W<=2 universally;
- ternary W>=7 is realized;
- Experiment 042 is separately testing a ternary W=24 candidate.

Current conditional complexity fact:

- P!=NP implies no universal constant ternary witness-width bound.

No external novelty claim is made.
