# Glycan publication-review refinements A30 — path coverage, quotient uniqueness, and ternary threshold ceiling 0.1

**Status:** exact correction/refinement layer after external mathematical review  
**Date:** 2026-09-28  
**Prior exact implicit range:** G-IA001..G-IA448  
**Applies to publication:** `research/publications/2026-09-27/GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_1.md`

This layer preserves earlier exact results while sharpening several statements whose publication wording was stronger or less explicit than the underlying proof support.

---

## G-IA449 — set-valued path coverage

Let an active maximal non-target path be written **leaf-first**:

```text
P = [p_1,...,p_m]
```

with:

```text
p_1 <=P p_2 <=P ... <=P p_m.
```

For treatment word:

```text
T=[e_1,...,e_k],
```

define:

```text
T COVERS P
```

iff there exists **no** nondecreasing sequence:

```text
q_1 <=P ... <=P q_k
```

with every `q_i` drawn from `P` and:

```text
q_i in N_(e_i)
```

for all treatment positions.

Equivalently: the word has no treatment-spanning resistant chain contained in the path.

This definition applies directly to set-valued susceptibility.

Under singleton susceptibility, it agrees with the corrected A8 subsequence/path-cover characterization after run compression.

---

## G-IA450 — maximal-path sufficiency follows immediately from resistance-chain duality

For any treatment word T:

```text
T solves the active forest
IFF
T covers every active maximal non-target path.
```

**Proof.**

If T fails globally, A13 supplies a nondecreasing resistant chain:

```text
q_1 <=P ... <=P q_k.
```

Because all q_i are mutually comparable in the rooted-tree order, they lie on one rootward chain. Extend that finite chain to an active maximal non-target path P.

Then T does not cover P.

Conversely, if T does not cover some maximal path P, the resistant chain witnessing that failure is also a valid global resistant chain, so A13 says T fails globally.

This gives a short post-A13 proof of the maximal-path characterization.

The historical A8 theorem/correction remains valid provenance: A8 established the result before A13's resistance-chain duality was available.

---

## G-IA451 — infeasibility and OPT convention

The frozen model is solvable iff every active/non-target type has at least one susceptible treatment, as established earlier.

For publication-level optimization statements use:

```text
OPT = +infinity
```

for an infeasible instance.

All finite-OPT theorems in the publication assume the instance is solvable.

---

## G-IA452 — effective treatment classes

Define raw treatment equivalence:

```text
e ~ f
IFF
S*_e = S*_f.
```

By G-IA266 / G-N094:

```text
e ~ f
IFF
their phase transformers are identical
on every valid state.
```

An **effective treatment class** is one equivalence class of raw treatments under `~`.

The effective treatment alphabet is:

```text
EL / ~.
```

Susceptibility inclusion descends to a partial order on effective classes.

Raw treatments inside one effective class remain distinct source objects unless separately identified by a stronger identity authority.

---

## G-IA453 — dominance-aware minimal boundary is unique only in the quotient poset

The word relation `<=Msub` is a preorder.

Define mutual word equivalence:

```text
u ~=Msub v
IFF
u <=Msub v
AND
v <=Msub u.
```

Then the solving upset has a unique set of minimal **equivalence classes** in the quotient poset:

```text
Words / ~=Msub.
```

A concrete raw representative set for those minimal classes need not be unique when distinct raw enzymes or words are mutually equivalent.

Thus the earlier statement that `B_M` is the unique raw-word boundary is refined to:

```text
the minimal boundary is unique
up to ~=Msub equivalence.
```

All complete-language reconstruction results survive unchanged when `B_M` is interpreted as either:

- the quotient-class boundary; or
- any raw representative family carrying the equivalence expansion authority.

---

## G-IA454 — two-class optimum-family refinement

Assume the effective treatment alphabet has at most two classes A and B.

The binary alternating-word theorem and:

```text
J_2 = OPT
```

remain exact.

However, the statement:

```text
the complete optimum raw-word family
has size at most two
```

is too strong when an effective class contains several distinct raw enzymes.

Correct statement:

```text
the complete optimum effective-class-word family
has size at most two.
```

The raw optimum family is obtained by substituting any raw representative from the required effective class at each treatment position, subject to the existing exact equivalence relation.

---

## G-IA455 — exact-length padding lemma

Assume the effective treatment alphabet contains at least two classes.

Let T be any solving word with:

```text
|T| <= L.
```

First delete adjacent equal effective classes. By phase idempotence, the resulting run-compressed word T' still solves and has:

```text
|T'| <= |T| <= L.
```

If `|T'| < L`, repeatedly append any effective class different from the current final class. Every appended treatment preserves solvability because treatment execution is monotone/reductive and cannot recreate removed nodes.

The result is a run-compressed solving word of **exactly** length L.

Therefore, for any solvable family and any L:

```text
there exists a solution of length <= L
IFF
there exists a run-compressed solution
of length exactly L.
```

Consequently, if `U_L` is the complete run-compressed treatment-word universe of exact length L and:

```text
D_L(P)
=
{ w in U_L | w does not cover P },
```

then:

```text
OPT > L
IFF
union over P of D_L(P) = U_L.
```

This supplies the missing threshold-universe equivalence used by the critical-cover construction.

---

## G-IA456 — universal ternary run-compressed supersequence ceiling

Let the effective alphabet be exactly three symbols:

```text
0,1,2.
```

For any positive integer ell, consider the cyclic word:

```text
C_ell
=
prefix of 012012012... of length 2*ell+1.
```

Every run-compressed ternary word of length ell is a subsequence of `C_ell`.

**Proof.**

Its first symbol occurs within the first three positions of the cycle.

Because consecutive symbols of the target word are distinct, after matching one symbol the next required symbol appears within at most the next two positions of the cyclic word.

Thus the final match occurs no later than:

```text
3 + 2*(ell-1)
=
2*ell+1.
```

Therefore every family of run-compressed ternary paths of length ell has:

```text
OPT <= 2*ell+1.
```

---

## G-IA457 — threshold 2*ell is the highest possible nontrivial failure threshold

By G-IA456, no family of run-compressed ternary paths of length ell can satisfy:

```text
OPT > 2*ell+1.
```

Hence a threshold-cover construction proving:

```text
OPT > L
```

can have no nontrivial universal-path-family threshold above:

```text
L = 2*ell.
```

A critical cover at `L=2*ell` is therefore operating at the maximal possible failure threshold for that fixed path length.

---

## G-IA458 — the width-173 family has exact optimum 21

Experiment 047 uses:

```text
ell = 10
L   = 20.
```

Its exact critical-cover certificate proves:

```text
OPT(F_173) > 20.
```

G-IA456 gives the universal upper bound:

```text
OPT(F_173) <= 21.
```

Therefore:

```text
OPT(F_173) = 21.
```

Each one-path deletion has a private length-20 witness, so:

```text
OPT(F_173 minus {P_i}) <= 20
```

for every selected path P_i.

Thus every selected path remains necessary to witness the exact optimum and:

```text
W(F_173)=173.
```

---

## G-IA459 — Experiment 047 omission is structurally explained by the ternary ceiling

The failed Experiment 047 kernel accidentally consumed only:

```text
p_0,...,p_8
```

of each intended length-10 path.

Its incidence test therefore behaved as a length-9 path test.

By G-IA456, every run-compressed ternary length-9 path embeds in a cyclic word of length:

```text
2*9+1 = 19.
```

Therefore a length-20 treatment word covering all accidentally tested length-9 paths necessarily exists.

This exactly explains why the defective kernel produced an apparent universal threshold-20 word.

The independent verifier's result:

```text
full length-10 universal words at length 19: 0
full length-10 universal words at length 20: 0
```

is consistent with the repaired length-10 semantics and the exact width-173 threshold certificate.

---

## Disposition

New exact implicit assertions:

```text
G-IA449..G-IA459
```

Publication corrections supported:

- set-valued path coverage is now explicitly defined;
- maximal-path sufficiency has a short resistance-chain proof;
- infeasible instances use `OPT=+infinity`;
- effective treatment classes are phase-equivalence classes;
- `B_M` uniqueness is quotient-scoped, not raw-representative uniqueness;
- the binary optimum family is bounded by two effective-class words, not necessarily two raw words;
- the critical-cover threshold equivalence has an explicit padding lemma;
- ternary path families of length ell have `OPT <= 2*ell+1`;
- Experiment 047's width-173 family has exact `OPT=21`;
- the historical omitted-symbol defect is explained by the length-9 universal-word ceiling.
