# Glycan cleavage DP-fed implicit admissions A12 — phase algebra and dominance-aware language 0.1

**Status:** exact implicit assertions admitted after qualified DP 0.1–0.7 run 0.1
**Date:** 2026-09-27
**Discovery parent:** GLYCAN_DP07_RUN_0_1.md
**Semantic admission authority:** qualified Core 0.19
**Primitive input:** verified GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
**Prior exact closure:** G-IA001..G-IA257
**QU dependency:** none in frozen 0.1 scope

DP nominated the views. The assertions below are admitted only where direct exact support is supplied.

---

## Raw non-target order

### G-IA258 — raw non-target nodes form a finite descendant-before-ancestor poset

Let:

~~~text
Qraw
=
RL minus TG.
~~~

Order q <=P p when q is p itself or a represented descendant of p.

Because the parent structure is finite, uniquely parented, rooted, and acyclic, <=P is a finite partial order.

Target ancestor closure implies:

~~~text
p notin TG
->
every descendant of p is also notin TG.
~~~

Thus each non-target component is closed downward until a target boundary.

### G-IA259 — valid active non-target sets are exactly upward-closed filters

For any valid ancestor-closed state S containing TG define:

~~~text
A(S)
=
S intersection Qraw.
~~~

If q in A and q <=P p with p non-target, ancestor closure gives p in A.

So A is upward closed.

Conversely, for any upward-closed A subset Qraw:

~~~text
S = TG union A
~~~

is ancestor-closed and contains TG.

Therefore valid extensional states are in exact bijection with upward-closed non-target filters.

Their complements in Qraw are downward-closed order ideals.

---

## Resistant-frontier phase factorization

### G-IA260 — define effective susceptibility and resistance

For operator e define:

~~~text
S*_e
=
{ q in Qraw | M(e,q) }

N_e
=
Qraw minus S*_e.
~~~

S*_e is the treatment-relevant susceptibility support.

Susceptibility tuples whose site endpoint lies in TG are excluded from S*_e because target sites are never eligible.

### G-IA261 — exact resistant-frontier formula for one exhaustive phase

Let A be the active non-target filter before one exhaustive e phase.

Let D_e(A) be the active non-target filter after that phase.

Then:

~~~text
D_e(A)
=
upward_closure_P(
    A intersection N_e
).
~~~

**First inclusion.**

Every q in A intersection N_e is resistant to e and cannot be deleted.

Every active non-target ancestor of such a q remains blocked while q survives.

Therefore its upward closure survives.

**Reverse inclusion.**

Take active q outside the upward closure of A intersection N_e.

Then no active descendant of q, including q itself, is e-resistant.

All active nodes in the finite descendant region rooted at q are e-susceptible.

Remove terminal susceptible nodes bottom-up.

Finiteness guarantees every active descendant is exhausted; q eventually becomes terminal, remains susceptible, and is deleted.

Therefore q cannot survive.

This proves exact equality.

### G-IA262 — one phase requires no microscopic fixed-point search once the active filter is known

G-IA261 computes the exact final active set by:

~~~text
intersect active set with resistance
then take upward closure.
~~~

The iterative microscopic saturation semantics remain the primitive/source authority, but the resistant-frontier formula is an exact derived factorization.

---

## Removed-ideal dual and lattice algebra

### G-IA263 — exact removed-ideal phase formula

Let:

~~~text
I = Qraw minus A
~~~

be the removed-node ideal before the phase.

Define R_e(I) as the removed ideal after the e phase.

Then:

~~~text
R_e(I)
=
Qraw minus
upward_closure_P(
    (Qraw minus I) intersection N_e
).
~~~

This is the exact complement of G-IA261.

### G-IA264 — R_e is extensive, monotone, idempotent, and meet-preserving

For all order ideals I,J:

~~~text
I subseteq R_e(I)

I subseteq J
->
R_e(I) subseteq R_e(J)

R_e(R_e(I))
=
R_e(I)

R_e(I intersection J)
=
R_e(I) intersection R_e(J).
~~~

The first three properties agree with the earlier phase-closure results.

For meet preservation use the active-filter dual:

~~~text
D_e(A union B)
=
upward_closure((A union B) intersection N_e)

=
upward_closure(
    (A intersection N_e)
    union
    (B intersection N_e)
)

=
D_e(A) union D_e(B).
~~~

Taking complements gives the ideal-intersection law.

A useful derived high-level label is:

~~~text
meet-preserving closure operator
~~~

No new Core primitive is introduced by that label.

### G-IA265 — phase closure does not preserve ideal joins in general

Exact counterexample:

- non-target parent p;
- two non-target children a,b;
- e susceptible at p;
- e resistant at a and b;
- no additional non-target descendants.

Let removed ideals:

~~~text
I={a}
J={b}.
~~~

Then:

~~~text
R_e(I)=I
R_e(J)=J
~~~

because the other resistant child blocks p.

But:

~~~text
R_e(I union J)
=
{a,b,p}.
~~~

Therefore:

~~~text
R_e(I union J)
!=
R_e(I) union R_e(J).
~~~

Meet preservation must not be strengthened to full lattice-homomorphism behavior.

---

## Exact effective operator identity

### G-IA266 — equal effective susceptibility support iff equal phase transformer

For raw operators e1,e2:

~~~text
S*_e1 = S*_e2
IFF
for every valid state S:
    C_e1(S) =ext C_e2(S).
~~~

**Forward.**

G-IA261 depends only on N_e, equivalently S*_e.

**Reverse.**

Suppose the supports differ at non-target q.

Without loss:

~~~text
q in S*_e1
q notin S*_e2.
~~~

Choose the valid active filter:

~~~text
A = upward_closure_P({q}).
~~~

It contains q and its non-target ancestors but no strict descendant of q.

Under e2, q itself is resistant and survives.

Under e1, q has no active descendant blocker and is susceptible, so q is deleted.

The final states differ.

Thus phase-transformer equality forces effective-support equality.

### G-IA267 — target-site susceptibility is irrelevant to every treatment-word transition in version 0.1

Changing only tuples:

~~~text
M(e,t)
~~~

with:

~~~text
t in TG
~~~

does not change any eligibility predicate because target membership independently forbids deletion.

Therefore it changes neither:

- any phase transformer;
- any finite treatment-word transformer;
- the complete solution language;
- optimum value;
- complete optimum raw-word family.

Those tuples remain source data, but they are residual to the frozen treatment objective.

---

## Exact operator dominance

### G-IA268 — effective susceptibility inclusion iff pointwise phase-removal dominance

For operators e1,e2:

~~~text
S*_e1 subseteq S*_e2
~~~

iff for every valid removed ideal I:

~~~text
R_e1(I) subseteq R_e2(I).
~~~

**Forward.**

This is the phase dominance already derived from susceptibility inclusion.

**Reverse.**

If support inclusion fails, choose q susceptible to e1 but resistant to e2.

Let I contain every strict non-target descendant of q and no q.

I is an order ideal.

Then q is immediately removable by e1 but not by e2.

Hence:

~~~text
q in R_e1(I)
q notin R_e2(I),
~~~

contradicting pointwise dominance.

### G-IA269 — susceptibility dominance gives two-sided absorption

Assume:

~~~text
S*_e1 subseteq S*_e2.
~~~

Then for every ideal I:

~~~text
R_e2(R_e1(I))
=
R_e2(I)

R_e1(R_e2(I))
=
R_e2(I).
~~~

**First equality.**

From I subseteq R_e1(I) and monotonicity:

~~~text
R_e2(I)
subseteq
R_e2(R_e1(I)).
~~~

From phase dominance:

~~~text
R_e1(I) subseteq R_e2(I).
~~~

Applying R_e2 and idempotence gives the reverse inclusion.

**Second equality.**

Let J=R_e2(I).

Phase dominance gives:

~~~text
R_e1(J) subseteq R_e2(J)=J.
~~~

Extensivity gives J subseteq R_e1(J).

Therefore equality holds.

### G-IA270 — adjacent comparable operators absorb to the stronger operator

Under G-IA269:

~~~text
[e1,e2]
and
[e2,e1]
~~~

are each exact sequence-transformer equivalents of:

~~~text
[e2].
~~~

This includes adjacent duplicate elimination as the equality case.

### G-IA271 — no subsequence-minimal solving word contains adjacent dominance-comparable operators

If adjacent operators e1,e2 satisfy either:

~~~text
S*_e1 subseteq S*_e2
~~~

or the reverse inclusion, G-IA270 deletes the weaker occurrence while preserving the state transformer.

Therefore a subsequence-minimal solving word cannot contain such an adjacent pair.

---

## Dominance-aware word order

### G-IA272 — define the dominance-subsequence preorder

For raw words:

~~~text
u=[a_1,...,a_m]
v=[b_1,...,b_n],
~~~

define:

~~~text
u <=Msub v
~~~

when there exist strictly increasing indices:

~~~text
i_1 < ... < i_m
~~~

such that:

~~~text
S*_(a_t) subseteq S*_(b_(i_t))
~~~

for every t.

This combines:

- insertion of extra treatment symbols;
- replacement of retained symbols by susceptibility dominators.

It is a preorder.

### G-IA273 — the solving language is upward closed under <=Msub

If:

~~~text
u solves
AND
u <=Msub v,
~~~

then v solves.

**Witness.**

1. Replace each symbol of u by its matched dominator in v. Repeated G-IA213/G-IA214 support preserves solvability and length.
2. Insert the unmatched symbols of v. A5 insertion monotonicity preserves solvability.

### G-IA274 — define the finite dominance-aware minimal basis B_M

Let:

~~~text
B_M
=
the <=Msub-minimal solving raw words.
~~~

B_M is finite.

**Witness.**

Every solution contains a raw subsequence-minimal basis word B_global as a subsequence, and every B_global member has length at most |Q_NT|.

A <=Msub-minimal solution therefore cannot require greater length.

With finite EL and finite length bound there are finitely many candidates.

### G-IA275 — B_M exactly generates the complete raw solution language under <=Msub

Every solving word can descend through strict <=Msub reductions that remain inside the solving language until a minimal element is reached.

The descent is finite because after reducing to length at most |Q_NT| only finitely many raw words remain.

Therefore:

~~~text
T solves
IFF
there exists B in B_M
such that
B <=Msub T.
~~~

B_M plus the exact effective-susceptibility preorder is an exact finite representation of the complete raw solving language.

It can be coarser than storing every raw subsequence-minimal word separately because dominated-symbol variants are represented by the expansion relation.

---

## Monotone recognizer structure

### G-IA276 — the exact removed-ideal transition graph is partially ordered

Use all valid removed ideals as states and one transition:

~~~text
I --e--> R_e(I).
~~~

Every transition is extensive:

~~~text
I subseteq R_e(I).
~~~

Therefore any directed cycle:

~~~text
I_0 -> I_1 -> ... -> I_k=I_0
~~~

forces:

~~~text
I_0 subseteq I_1 subseteq ... subseteq I_k=I_0,
~~~

so every inclusion is equality.

Thus the transition graph has no nontrivial directed cycle; strongly connected components are singleton states with possible self-loops.

### G-IA277 — every treatment-word transformer stabilizes under repetition

Let F_T be the ideal transformer induced by one finite treatment word T.

F_T is extensive and monotone because it is a composition of extensive monotone phase transformers.

For every ideal I:

~~~text
I
subseteq F_T(I)
subseteq F_T^2(I)
subseteq ...
~~~

Each strict step adds at least one of the finite |Qraw| non-target nodes.

Therefore after at most |Qraw| strict increases the sequence stabilizes.

In particular a uniform finite exponent exists such that:

~~~text
F_T^n
=
F_T^(n+1)
~~~

as functions for some n <= |Qraw|+1.

A useful derived high-level view is that the finite transformation action is aperiodic/eventually idempotent.

The exact stabilization law, not the label, is authoritative.

---

## DP-fed A12 disposition

~~~text
new exact implicit assertions:          20
cumulative exact implicit assertions: 277

resistant-frontier formula:
    admitted

effective non-target susceptibility:
    exact phase-transformer invariant

phase closure:
    meet-preserving, not join-preserving

susceptibility dominance:
    exact phase-removal preorder

dominance absorption:
    admitted

dominance-aware language basis B_M:
    admitted

ideal-state transition graph:
    no nontrivial cycles

word-transformer repetition:
    eventually idempotent

new QU dependencies:
    0
~~~

The next step is NEI re-evaluation of effective susceptibility, phase-transformer identity, B_M, and the new exact algebra before the second DP pass.
