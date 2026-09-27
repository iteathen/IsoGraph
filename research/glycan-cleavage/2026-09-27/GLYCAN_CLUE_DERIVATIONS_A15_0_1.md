# Glycan clue-fed exact derivations A15 — backward adjoints and star-product oracle 0.1

**Status:** exact research assertions derived after external clue review  
**Date:** 2026-09-27  
**Parent:** GLYCAN_EXTERNAL_CLUE_RESEARCH_0_1.md  
**Semantic support:** existing exact A12-A14 structure + Core 0.19 assertion discipline  
**External literature role:** inspiration only for the internal theorems below  
**Prior exact implicit range:** G-IA001..G-IA303

The external WSTS, nuclei, and Higman/Valk-Jantzen literature suggested two questions:

1. does one glycan phase have an exact backward adjoint?
2. can downward word ideals ("star-products") be tested for intersection with the solving language by deterministic maximal progress?

Both questions have direct exact answers inside the frozen 0.1 model.

---

# Backward phase regression

## G-IA304 — exact principal predecessor of one target ideal

Let Qraw be the finite non-target poset.

Let I,J be removed-node order ideals.

For operator e let:

~~~text
N_e
=
non-target types resistant to e.
~~~

Define:

~~~text
P_e(J)
=
downward_closure_P(
    J intersection N_e
).
~~~

Then:

~~~text
J subseteq R_e(I)
IFF
P_e(J) subseteq I.
~~~

**Proof.**

A12 gives:

~~~text
R_e(I)
=
Qraw minus
upward_closure(
    (Qraw minus I) intersection N_e
).
~~~

Thus J subseteq R_e(I) iff J has no member in that surviving upward closure.

Because J is downward closed:

~~~text
J intersects upward_closure(X)
IFF
J intersects X
~~~

for X subseteq Qraw.

Take:

~~~text
X=(Qraw minus I) intersection N_e.
~~~

Then:

~~~text
J subseteq R_e(I)

IFF
J intersection N_e
    subseteq I.
~~~

Since I is an ideal, this is equivalent to:

~~~text
downward_closure(J intersection N_e)
subseteq I.
~~~

QED.

## G-IA305 — R_e is the right adjoint of explicit P_e

Under ideal inclusion:

~~~text
P_e(J) subseteq I
IFF
J subseteq R_e(I).
~~~

Therefore P_e is left adjoint to R_e.

This is a direct represented theorem.

The external order-theory label "adjoint" is only a derived name for the exact biconditional above.

## G-IA306 — predecessor of a principal winning upset is principal

For:

~~~text
up(J)
=
{ I | J subseteq I },
~~~

the one-step predecessor under treatment e is:

~~~text
Pre_e(up(J))
=
up(P_e(J)).
~~~

Thus one phase maps a principal upward winning set backward to another principal upward set.

No enumeration of all ideals is needed for this predecessor operation.

---

# Exact backward antichain dynamic program

## G-IA307 — k-step winning sets are upward closed

Define:

~~~text
Win_k
=
{ I |
  from removed ideal I
  some treatment word of length <=k
  reaches top Qraw }.
~~~

Then every Win_k is upward closed under ideal inclusion.

**Proof.**

If I solves with suffix T and I subseteq Iprime, monotonicity of every phase transformer makes executing T from Iprime remove at least the same nodes.

## G-IA308 — exact finite antichain recurrence for Win_k

Let B_k be the inclusion-minimal basis of Win_k.

Base:

~~~text
B_0 = { Qraw }.
~~~

Then:

~~~text
B_(k+1)
=
MIN_inclusion(
    B_k
    union
    { P_e(J) |
      J in B_k,
      e in EL }
).
~~~

**Proof.**

A state wins within <=k+1 iff:

- it already wins within <=k; or
- some one-step e successor wins within <=k.

Using:

~~~text
Win_k = union_{J in B_k} up(J)
~~~

and G-IA306:

~~~text
Pre_e(Win_k)
=
union_{J in B_k}
up(P_e(J)).
~~~

Taking inclusion-minimal generators gives the displayed recurrence.

## G-IA309 — backward basis reaches bottom exactly at OPT

Let bottom be the empty removed ideal.

If the instance is solvable:

~~~text
OPT
=
least k such that
bottom belongs to Win_k.
~~~

Because bottom is the least ideal:

~~~text
bottom belongs to Win_k
IFF
bottom belongs to B_k.
~~~

Therefore the first backward basis layer containing bottom gives the exact minimum treatment count.

If no B_k ever contains bottom before the finite state-space fixed point, the instance is unsolvable.

## G-IA310 — backward bases support complete optimum-word reconstruction

Suppose remaining optimum distance is d and current forward state is I.

An operator e can begin an optimum suffix exactly when:

~~~text
there exists J in B_(d-1)
such that
J subseteq R_e(I).
~~~

Equivalently by G-IA304:

~~~text
there exists J in B_(d-1)
such that
P_e(J) subseteq I.
~~~

Enumerating every such e recursively while carrying the actual forward state reconstructs every optimum raw treatment word.

The antichain basis alone need not store one unique parent, because several minimal thresholds may certify one actual successor.

---

# Finite sanity evidence for backward regression

A private exhaustive check covered:

~~~text
8,512
poset / ideal / susceptibility
principal-predecessor cases.
~~~

Compared:

~~~text
{ I | J subseteq R_e(I) }
~~~

against:

~~~text
up(P_e(J)).
~~~

Mismatches:

~~~text
0.
~~~

A separate exhaustive optimum comparison covered:

~~~text
16,932
small poset / two-operator instances.
~~~

Compared:

- forward shortest-path optimum on exact ideal states;
- G-IA308 backward antichain recurrence.

Optimum mismatches:

~~~text
0.
~~~

These are falsification/sanity evidence only.

The direct proofs above remain semantic support.

---

# Common closure of a treatment set

## G-IA311 — define the finite common closure J_Gamma

Let Gamma be any nonempty finite set of raw treatment operators.

For ideal I, repeatedly apply any e in Gamma that strictly changes the current ideal until no operator in Gamma changes it.

Every strict application adds at least one non-target node.

The finite carrier guarantees termination.

The terminal ideal is:

~~~text
J_Gamma(I).
~~~

## G-IA312 — J_Gamma(I) is the least common Gamma-fixed ideal above I

J_Gamma(I) satisfies:

~~~text
I subseteq J_Gamma(I)

forall e in Gamma:
    R_e(J_Gamma(I))
    =
    J_Gamma(I).
~~~

And for every K satisfying:

~~~text
I subseteq K

forall e in Gamma:
    R_e(K)=K,
~~~

we have:

~~~text
J_Gamma(I) subseteq K.
~~~

**Proof.**

Every intermediate state of the iterative construction is below K by induction using monotonicity and K being fixed by every allowed R_e.

Thus the final common fixed point is least.

The result is independent of the order in which strict Gamma actions are chosen, because a least common fixed point is unique.

## G-IA313 — J_Gamma(I) is reachable by a finite Gamma-word

The iterative construction itself records a finite word:

~~~text
w_Gamma,I in Gamma*
~~~

such that:

~~~text
execute(w_Gamma,I, I)
=
J_Gamma(I).
~~~

Thus common closure is not merely an abstract bound; it is an actually realizable treatment segment.

## G-IA314 — every Gamma-word result lies below common closure

For every finite word w in Gamma*:

~~~text
execute(w,I)
subseteq
J_Gamma(I).
~~~

**Proof.**

J_Gamma(I) is above I and fixed by every R_e in Gamma.

Induction over w keeps every intermediate word result below the common fixed point.

Thus J_Gamma(I) is the unique maximal progress obtainable from arbitrary finite Gamma-only treatment.

---

# Exact star-product intersection oracle

The following definitions match the external generalized subword-ideal representation but the theorem is proved internally.

Fix the effective susceptibility quasi-order:

~~~text
a <=M b
IFF
S*_a subseteq S*_b.
~~~

A word-ideal atom has one of two forms.

### Optional atom sigma?

It permits:

~~~text
epsilon

or
one raw symbol sigma'
with
sigma' <=M sigma.
~~~

### Repeat atom Gamma*

Gamma is a nonempty <=M-downward-closed raw operator set.

It permits arbitrary finite words over Gamma.

A star-product is a finite concatenation of such atoms.

## G-IA315 — optional atom maximalization is exact for existence of a solving continuation

At current ideal I, replace one optional sigma? atom by the single treatment sigma.

This result is at least as advanced as:

- choosing epsilon, by extensivity;
- choosing any sigma'<=M sigma, by phase dominance.

And sigma itself is permitted by sigma?.

Therefore for any fixed suffix product Ptail:

~~~text
there exists
choice from sigma?
followed by word in Ptail
that solves

IFF

there exists
word in Ptail
that solves after R_sigma(I).
~~~

## G-IA316 — repeat atom maximalization is exact for existence of a solving continuation

At current ideal I, replace an arbitrary Gamma* segment by a finite word reaching J_Gamma(I).

If some Gamma-word w followed by suffix U solves, then:

~~~text
execute(w,I)
subseteq
J_Gamma(I).
~~~

The same suffix U also solves from J_Gamma(I) by state monotonicity.

Conversely the finite saturating Gamma-word realizing J_Gamma(I) is itself permitted by Gamma*.

Therefore:

~~~text
there exists
Gamma* segment followed by U
that solves

IFF

U solves from J_Gamma(I)
for some permitted suffix U.
~~~

## G-IA317 — deterministic maximal-progress evaluation decides star-product intersection

Let star-product:

~~~text
P=A_1...A_n.
~~~

Start from the empty removed ideal.

Process atoms left to right:

~~~text
if A_i = sigma?:
    I <- R_sigma(I)

if A_i = Gamma*:
    I <- J_Gamma(I).
~~~

Then:

~~~text
L_global intersects P
IFF
final I = Qraw.
~~~

**Proof.**

Repeatedly apply G-IA315/G-IA316 from left to right.

Any solving member of P can be maximalized atom-by-atom without leaving P and without destroying solvability.

Conversely every maximalized atom is represented by an actually permitted finite word, so a final top state constructs a concrete solving member of P.

## G-IA318 — the star-product oracle needs only exact phase/common-closure operations

G-IA317 does not enumerate all words in P.

It uses:

- one phase R_sigma for an optional atom;
- one finite common closure J_Gamma for a repeat atom.

Thus the external basis-learning frameworks that require star-product intersection queries have a concrete exact oracle candidate in this frozen glycan model.

No external basis-computation theorem is imported as an IsoGraph assertion by this statement.

---

# Finite sanity evidence for the star-product oracle

A private exhaustive comparison covered:

~~~text
9,582
small star-product / poset / support cases.
~~~

Scope included:

- n=1..3 non-target nodes;
- all acyclic edge subsets in the selected orientation;
- all support assignments for two operators;
- all downward-closed operator subsets;
- two-atom products;
- brute-force star expansion through the finite stabilization bound.

Compared:

~~~text
exists solving enumerated word in P
~~~

against:

~~~text
G-IA317 maximal-progress evaluation reaches top.
~~~

Mismatches:

~~~text
0.
~~~

Again this is sanity evidence, not the proof authority.

---

# A15 disposition

~~~text
new exact implicit assertions:
    G-IA304..G-IA318
    15 assertions

backward phase adjoint:
    explicit

principal predecessor:
    exact

backward antichain optimum DP:
    exact

common treatment-set closure:
    exact

star-product intersection oracle:
    exact

external Valk-Jantzen / active-learning
basis extraction:
    NOT imported as internal theorem;
    remains an external algorithmic transfer.

new QU dependencies:
    0
~~~

Highest-priority implementation experiments are now:

1. backward antichain DP;
2. generalized Valk-Jantzen / quasi-ordered automaton learner driven by G-IA317;
3. comparison against PCCSP DP on singleton-susceptibility instances.
