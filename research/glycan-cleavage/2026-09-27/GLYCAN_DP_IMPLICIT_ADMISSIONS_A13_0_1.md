# Glycan cleavage DP-fed implicit admissions A13 — resistance-chain duality 0.1

**Status:** exact implicit assertions admitted after qualified DP run 0.2
**Date:** 2026-09-27
**Discovery parent:** GLYCAN_DP07_RUN_0_2.md
**Semantic admission authority:** qualified Core 0.19
**Prior exact closure:** G-IA001..G-IA277
**QU dependency:** none in frozen 0.1 scope

The positive treatment-language view asks which susceptibility constraints a word satisfies.

This pass admits the exact dual negative view: which resistant blocker chain can survive through all treatment positions.

---

## Resistance frontier

### G-IA278 — every nonempty active filter is reconstructed by its minimal antichain

For upward-closed active non-target filter A define:

~~~text
MIN(A)
=
the <=P-minimal elements of A.
~~~

Then MIN(A) is an antichain and:

~~~text
A
=
upward_closure_P(MIN(A)).
~~~

This is the non-target-poset version of the earlier exact terminal-frontier reconstruction.

### G-IA279 — exact post-phase resistance frontier

For one exhaustive e phase from active filter A:

~~~text
D_e(A)
=
upward_closure(A intersection N_e)
~~~

by G-IA261.

Therefore its exact minimal frontier is:

~~~text
F_e(A)
=
MIN(
    A intersection N_e
).
~~~

And:

~~~text
D_e(A)
=
upward_closure(F_e(A)).
~~~

A phase may therefore be evaluated on the resistance frontier without retaining the full active filter as an independent state value.

---

## Word-level resistance recurrence

### G-IA280 — define resistant endpoint sets B_i

For word:

~~~text
T=[e_1,...,e_k]
~~~

starting from the full non-target active filter Qraw, define:

~~~text
B_1 = N_(e_1)

B_(i+1)
=
N_(e_(i+1))
intersection
upward_closure(B_i).
~~~

Then after prefix [e_1,...,e_i]:

~~~text
A_i
=
upward_closure(B_i).
~~~

**Witness.** induction on i using G-IA261.

### G-IA281 — exact antichain recurrence

Let:

~~~text
F_0 = MIN(Qraw)
~~~

and for i>=1:

~~~text
F_i
=
MIN(
    N_(e_i)
    intersection
    upward_closure(F_(i-1))
).
~~~

Then:

~~~text
A_i
=
upward_closure(F_i).
~~~

Thus F_i is an exact antichain state for prefix evaluation.

No arbitrary microscopic deletion order or phase-assignment witness is required.

---

## Resistant-chain theorem

### G-IA282 — endpoint membership iff a resistant chain exists

For i>=1 and q in Qraw:

~~~text
q in B_i
~~~

iff there exist:

~~~text
q_1 <=P q_2 <=P ... <=P q_i = q
~~~

such that:

~~~text
q_j in N_(e_j)
~~~

for every j=1,...,i.

**Witness.**

Base i=1 is B_1=N_(e_1).

Inductive step:

~~~text
q in B_(i+1)
IFF
q in N_(e_(i+1))
AND
q in upward_closure(B_i)
~~~

iff q resists e_(i+1) and some q_i in B_i satisfies q_i<=P q.

Apply the induction hypothesis.

Equality q_j=q_(j+1) is permitted; one resistant type may survive several consecutive treatment positions.

### G-IA283 — fixed-word failure iff a treatment-spanning resistant chain exists

For nonempty T=[e_1,...,e_k]:

~~~text
T fails to reach TG
IFF
A_k is nonempty
IFF
B_k is nonempty
IFF
there exist
q_1 <=P ... <=P q_k
with
q_i in N_(e_i)
for every i.
~~~

This is an exact finite negative certificate for a failing word.

### G-IA284 — fixed-word success iff no resistant chain spans the word

Equivalently:

~~~text
T solves
IFF
there exists no
q_1 <=P ... <=P q_k
with
q_i resistant to e_i
for every treatment position.
~~~

For the empty word:

~~~text
empty word solves
IFF
Qraw is empty,
~~~

which agrees with G-IA179.

---

## Boolean relation-product view

### G-IA285 — define resistance masks and order relation

Let:

~~~text
R_P
=
{ (q,p) | q <=P p }.
~~~

R_P is reflexive and transitive.

For operator e define the diagonal resistance relation:

~~~text
D_e
=
{ (q,q) | q in N_e }.
~~~

Use ordinary relational composition from left to right through matching intermediate endpoints.

### G-IA286 — resistant chains are exactly nonempty relation products

For T=[e_1,...,e_k], k>=1:

~~~text
D_(e_1)
;
R_P
;
D_(e_2)
;
R_P
;
...
;
R_P
;
D_(e_k)
~~~

is nonempty iff a chain from G-IA283 exists.

Therefore:

~~~text
T fails
IFF
the relation product is nonempty.

T solves
IFF
the relation product is empty.
~~~

This is an exact algebraic derived view.

No dense-matrix implementation is required; relations, bitsets, antichains, or other exact encodings may represent the same product.

---

## Complement-language monotonicity

### G-IA287 — the nonsolving language is downward closed under raw subsequence

If T fails and U is a subsequence of T, then U fails.

There are two exact witnesses.

**Semantic witness.**

If U solved, inserting the deleted symbols would make T solve by A5 upward insertion closure, contradiction.

**Resistance-chain witness.**

Take a G-IA283 resistant chain for T and retain only the q_i corresponding to treatment positions kept in U.

The resulting sequence remains nondecreasing and each retained node resists its corresponding retained operator.

Thus U has a failure certificate.

### G-IA288 — failing-word certificates are position-complete but not necessarily strict in the poset

A failure certificate has one resistant node per treatment position.

The node sequence may:

- stay at the same node across several phases;
- move upward to an ancestor;
- never move downward.

Requiring strict movement would be an incorrect strengthening.

This is load-bearing when one site resists several successive operators.

### G-IA289 — the failing language need not have a finite set of maximal raw words

Downward closure alone does not imply a finite maximal basis.

If one non-target node resists some operator e indefinitely, words with arbitrarily many repeated e occurrences can remain failing.

Therefore the finite-basis result for the upward solving language must not be mirrored naively to maximal failing words.

---

## Positive / negative duality

### G-IA290 — positive maximal-path coverage and negative resistant chains are complementary exact decision interfaces

The corrected A8 theorem gives:

~~~text
T solves
IFF
every maximal non-target path
has a susceptibility-cover embedding.
~~~

G-IA283 gives:

~~~text
T fails
IFF
one treatment-spanning resistant chain exists.
~~~

The witnesses are different:

- positive proof distributes coverage across every maximal path;
- negative proof supplies one monotone blocker chain through the word.

Both descend to the same primitive P/M/TG structure.

Neither witness replaces the other.

### G-IA291 — resistance-frontier recurrence is an exact fixed-word recognizer

To evaluate one word exactly:

~~~text
F_0 = MIN(Qraw)

for each treatment e_i:
    F_i =
        MIN(
            N_(e_i)
            intersection
            upward_closure(F_(i-1))
        )

accept
IFF
F_k is empty.
~~~

This recognizer is exact.

It exposes only antichain blocker state, not the complete removed history.

No asymptotic performance claim is made.

---

## DP-fed A13 disposition

~~~text
new exact implicit assertions:          14
cumulative exact implicit assertions: 291

resistance frontier:
    admitted

word-level resistant endpoint recurrence:
    admitted

failure certificate:
    one nondecreasing resistant node
    per treatment position

success criterion:
    no spanning resistant chain

Boolean relation-product criterion:
    admitted

failing language:
    downward subsequence closed

positive/negative decision duality:
    admitted

new QU dependencies:
    0
~~~

The next NEI pass may identify only exact decision/certificate values. It must not identify positive and negative witness objects merely because they decide complementary outcomes.
