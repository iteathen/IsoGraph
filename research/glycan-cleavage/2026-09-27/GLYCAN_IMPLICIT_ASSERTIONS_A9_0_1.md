# Glycan cleavage implicit assertions A9 — operator dominance and finite language basis pass 9

**Status:** exact implicit research assertions admitted after NEI pass 8
**Date:** 2026-09-27
**Inputs:** A0-A8 + A8 correction + NEI passes 1-8
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

This pass propagates susceptibility inclusion through the exact maximal-path coverage form and then closes the upward-closed treatment language to a finite minimal basis.

---

## Operator susceptibility preorder

### G-IA210 — define exact operator susceptibility support

For each raw operator e in EL define:

~~~text
S_e
=
{ q in Q_NT |
  e is susceptible at SIG type q }.
~~~

This is the exact non-target susceptibility vector restricted to the quotient types relevant to treatment acceptance.

### G-IA211 — susceptibility inclusion is a preorder

Define:

~~~text
e1 <=M e2
IFF
S_e1 subseteq S_e2.
~~~

Then <=M is reflexive and transitive.

Mutual <=M is exact equality of susceptibility support and therefore the existing Q-G-SUSCEPTIBILITY SAME relation on Q_NT.

One-way inclusion is dominance, not identity.

### G-IA212 — a dominating symbol may replace a dominated symbol in any path-cover witness

Assume e1 <=M e2.

Let one maximal-path coverage witness for word T assign some path positions to an occurrence of e1.

Every assigned type q lies in S_e1 and therefore in S_e2.

Replacing that word occurrence by e2 leaves the same nondecreasing index assignment valid.

Thus every path previously covered through that occurrence remains covered.

### G-IA213 — dominating-symbol substitution preserves global solvability

Assume e1 <=M e2.

Replace any one occurrence of e1 in a solving raw treatment word T by e2, producing Tprime.

By G-IA212 every maximal path remains covered.

A8 corrected G-IA192 therefore gives:

~~~text
T solves
->
Tprime solves.
~~~

The replacement preserves word length.

### G-IA214 — dominance substitution is context-independent

G-IA213 applies at any treatment position and under arbitrary unchanged prefix/suffix context.

Therefore susceptibility dominance is a global symbol-substitution preorder for the exact solving language:

~~~text
e1 <=M e2
->
every solution remains a solution
after any occurrence e1 is replaced by e2.
~~~

This is stronger than a state-local one-step objective comparison and is now justified by the exact path-cover form.

### G-IA215 — every operator has an inclusion-maximal dominator

The raw operator set EL is finite.

Starting from any e, repeatedly move to a strict susceptibility superset while one exists.

The process terminates at an operator m with:

~~~text
e <=M m
~~~

and no strict susceptibility superset represented in EL.

Thus every operator is dominated by at least one <=M-maximal operator.

### G-IA216 — every solving word has a same-length maximal-operator normalization

Replace each occurrence e in a solving word independently by any chosen <=M-maximal dominator m(e).

Repeated use of G-IA213 preserves solvability and length.

Therefore every solving word has at least one same-length solving image over the maximal-operator subset.

### G-IA217 — optimum value is preserved by restricting value search to maximal operators

If the instance is solvable, take an optimum raw word and normalize it by G-IA216.

The normalized word:

- uses only <=M-maximal operators;
- has the same length;
- still solves.

Therefore the minimum treatment count can be found without using dominated raw operators.

This is a value/existence reduction, not a complete raw-witness reduction.

### G-IA218 — dominated raw operators may still occur in optimum trajectories

G-IA217 does not imply that dominated raw operators are absent from the original complete optimum-word family.

If a dominated operator already suffices at its phase fiber, replacing it by a dominator gives another solution of equal length, not a shorter one.

Therefore an optimum raw word containing the dominated operator may remain a valid distinct optimum trajectory.

Complete raw optimum enumeration must preserve or reconstruct such alternatives.

### G-IA219 — every feasible ordered layer has an upward-closed raw label set under <=M

For one ordered-layer fiber F_j define its admissible label set:

~~~text
A_j
=
intersection of E_q
over q in F_j.
~~~

If e1 belongs to A_j and e1 <=M e2, then every q in F_j lies in S_e1 subseteq S_e2, hence e2 also belongs to A_j.

Thus A_j is upward closed under susceptibility dominance.

### G-IA220 — each feasible layer admits a maximal operator label

Because A_j is finite, nonempty, and upward closed under <=M, it contains at least one <=M-maximal operator.

Therefore every feasible ordered-layer system has at least one raw realization using only maximal operators.

This gives an ordered-layer proof of G-IA217.

---

## Finite subsequence-minimal basis of the solving language

### G-IA221 — define deletion-minimal solving words

A solving raw treatment word B is subsequence-minimal when no proper subsequence of B is also solving.

Let:

~~~text
B_global
=
the set of all subsequence-minimal solving raw words.
~~~

This is an exact derived set value.

### G-IA222 — every phase of a subsequence-minimal solving word has nonzero effect

Suppose one treatment occurrence in a solving word removes no active non-target SIG type when executed.

Deleting that occurrence leaves the current extensional state unchanged at the suffix boundary.

The unchanged suffix therefore reaches the same final target.

That would produce a proper solving subsequence.

Contradiction.

Thus every occurrence of a subsequence-minimal solving word removes at least one previously active non-target type.

### G-IA223 — every subsequence-minimal solving word has length at most |Q_NT|

Non-target types are deleted once and never recreated.

By G-IA222, every treatment occurrence removes at least one type not removed earlier.

Therefore:

~~~text
LENGTH(B)
<=
|Q_NT|
~~~

for every B in B_global.

### G-IA224 — B_global is finite

EL is finite and every member of B_global has length at most the finite bound |Q_NT|.

There are only finitely many raw words over EL up to that length.

Therefore B_global is finite.

No external well-quasi-order theorem is required.

### G-IA225 — every solving word contains a basis word as a subsequence

Start from any solving word T.

If T is not subsequence-minimal, delete a treatment occurrence while preserving solvability.

Repeat.

Length strictly decreases, so the process terminates at some B in B_global with:

~~~text
B <=subseq T.
~~~

### G-IA226 — the complete solving language is the upward subsequence closure of B_global

A5 already proves solving languages are upward closed under insertion.

Combining with G-IA225:

~~~text
T solves
IFF
there exists B in B_global
such that
B <=subseq T.
~~~

Therefore B_global is a finite exact generator of the complete raw solution language.

### G-IA227 — B_global is an antichain under proper subsequence

If distinct B1,B2 in B_global satisfied:

~~~text
B1 proper-subsequence B2,
~~~

then B2 would not be subsequence-minimal.

Therefore no two distinct basis members properly contain one another under subsequence.

### G-IA228 — B_global is uniquely determined by the solving language

The subsequence-minimal elements of a set are determined extensionally by that set.

Therefore two exact representations have the same complete solving language iff they have the same B_global value.

This is uniqueness of the derived language basis, not canonicalization of internal solver state.

### G-IA229 — optimum trajectories are exactly the shortest members of B_global

Every minimum-length solving word is subsequence-minimal, or a shorter solving subsequence would contradict minimum length.

Conversely every shortest member of B_global is a solving word and no solving word can be shorter.

Thus:

~~~text
OPT
=
min LENGTH(B) over B in B_global

optimum raw word family
=
{ B in B_global |
  LENGTH(B)=OPT }.
~~~

### G-IA230 — B_global may contain longer non-optimum members

Subsequence minimality is not the same as minimum length, as already bounded by G-IA132.

Therefore B_global preserves more of the complete upward-closed solution language than the optimum family alone.

### G-IA231 — all exact formulations share the same finite basis value

The following representations have already been proved solution-language SAME:

- original saturated dynamics;
- SIG quotient dynamics;
- recursive subtree-language formulation;
- raw-node phase assignment;
- SIG-type phase assignment;
- deterministic tau evaluation;
- maximal-path coverage.

By G-IA228 they all induce exactly the same B_global.

---

## Dominance and basis boundary

### G-IA232 — maximal-operator normalization preserves optimum length but not the complete finite basis

Applying susceptibility-dominating substitutions to B in B_global preserves solvability and length.

The normalized word need not remain subsequence-minimal: stronger substituted symbols can make another occurrence redundant.

Therefore the complete B_global cannot be reconstructed merely by keeping the maximal-operator normalized images.

### G-IA233 — an optimum word remains optimum under maximal-operator normalization

Let T be minimum-length solving.

G-IA216 produces same-length solving Tprime over maximal operators.

If Tprime had a shorter solving subsequence, the instance would have a solution shorter than T.

Contradiction.

Thus Tprime is also an optimum word.

### G-IA234 — minimum-value search and all-raw-witness enumeration remain distinct obligations

For minimum value or one optimum witness, dominated operators may be removed from the search alphabet by G-IA217.

For the complete raw optimum family required by the frozen source, dominated alternatives remain legitimate raw words and must be retained or exactly reconstructed.

This restates the witness-family boundary after the stronger global substitution theorem.

---

## Pass-9 disposition

~~~text
new exact implicit assertions:          25
cumulative exact implicit assertions: 234

global operator dominance substitution:
    established

maximal-operator value reduction:
    established

finite exact solution-language basis:
    B_global

basis size:
    finite

basis word length bound:
    <= |Q_NT|

complete language:
    upward subsequence closure of B_global

optimum family:
    shortest members of B_global

QU-dependent assertions:                0
complexity shortcut claim:              none
~~~

The next NEI pass must treat B_global only as an exact derived language value and must preserve the distinction between susceptibility dominance and identity. A complete no-new implicit pass is required afterward before fixed point can be claimed.
