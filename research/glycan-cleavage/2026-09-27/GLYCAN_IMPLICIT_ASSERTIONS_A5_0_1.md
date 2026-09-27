# Glycan cleavage implicit assertions A5 — exact treatment-language algebra pass 5

**Status:** exact implicit research assertions admitted after NEI pass 4
**Date:** 2026-09-27
**Inputs:** A0 through A4 + NEI passes 1-4
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

The attempted fixed-point audit exposed one additional load-bearing abstraction: exact languages of treatment sequences that complete rooted subtrees.

This pass admits that structure rather than falsely declaring closure.

---

## Language foundation

### G-IA109 — finite treatment alphabet

For one concrete instance define:

~~~text
Sigma = exact finite set of raw operator identities in EL.
~~~

Every treatment trajectory is a finite word over Sigma.

No operator quotient is silently applied in this language.

### G-IA110 — local subtree completion language

For represented node r define:

~~~text
L_r
=
{ T in Sigma* |
  after executing T from the full initial subtree rooted at r,
  every non-target node in that subtree is absent
  and every target node remains }.
~~~

This is the same Q-G-SUBTREE-SOLVE value introduced by NEI pass 3, now used algebraically.

### G-IA111 — completion is absorbing under right extension

If:

~~~text
T in L_r
~~~

then for every finite suffix U:

~~~text
T ++ U in L_r.
~~~

**Witness.** Once every non-target node in the subtree is absent, later treatments cannot recreate nodes or remove target nodes.

Thus every L_r is right-extension closed.

---

## Child conjunction

### G-IA112 — child-completion requirement is language intersection

For parent p define:

~~~text
H_p
=
intersection of L_c
over all direct children c of p.
~~~

For a finite prefix T:

~~~text
T in H_p
IFF
every direct child subtree of p is locally complete after T.
~~~

The empty-child intersection is all of Sigma*.

### G-IA113 — target-node completion language is exactly child intersection

If:

~~~text
p in TG,
~~~

then p itself is never removed.

Its rooted subtree is complete exactly when all direct child subtrees are complete.

Therefore:

~~~text
L_p = H_p.
~~~

This includes the target-leaf case:

~~~text
L_p = Sigma*
~~~

when p has no children.

---

## Non-target node language recursion

### G-IA114 — a non-target node is removed in the first matching phase that finishes all child blockers

Let p not be in TG.

During one treatment phase e, p can be removed by the end of that same phase exactly when:

- e matches p;
- all direct child subtrees are complete by the end of the phase.

The children need not have been complete before the phase starts: same-e saturation may finish the children and then cascade to p within the same phase.

### G-IA115 — exact non-target language equation

Define the exact root susceptibility alphabet subset:

~~~text
E_p
=
{ e in Sigma | M(e,p) }.
~~~

Then for p not in TG:

~~~text
L_p
=
(
    H_p
    intersection
    { words ending in a symbol from E_p }
)
++
Sigma*
~~~

Equivalently:

~~~text
T in L_p
IFF
there exists a prefix U++[e] of T such that:

    e in E_p
    AND
    U++[e] in H_p.
~~~

**Witness.**

Forward: p is eventually removed in some phase e. At the end of that phase, every child subtree is complete and M(e,p) holds.

Reverse: if U++[e] completes every child subtree and M(e,p), the exhaustive e phase cannot stop while p is an eligible terminal non-target site, so p is removed by the end of that phase. Later suffixes preserve completion.

### G-IA116 — non-target leaf language is exact symbol-occurrence language

For non-target leaf p:

~~~text
H_p = Sigma*.
~~~

Therefore:

~~~text
L_p
=
{ treatment words containing at least one symbol e with M(e,p) }.
~~~

If E_p is empty, L_p is empty and that subtree is unsolvable.

---

## Global language

### G-IA117 — root solution language equals root subtree completion language

The distinguished root belongs to TG.

Therefore the full instance solution language is:

~~~text
L_global = L_root = H_root.
~~~

A raw treatment sequence solves the original problem iff it belongs to L_root.

### G-IA118 — the global language is the intersection of direct root-child completion languages

Because root is target:

~~~text
L_global
=
intersection of L_c
over direct root children c.
~~~

This is exact even when branches share operator identities, because one global word is evaluated against every child language simultaneously.

### G-IA119 — the optimization problem is shortest-word search in L_global

The frozen objective is exactly:

~~~text
find every T in L_global
whose LENGTH(T) is minimum over L_global.
~~~

This is a reformulation of 181019 through the admitted exact language semantics.

It introduces no new objective.

---

## Language dominance and multiplicity

### G-IA120 — duplicate equal child languages are intersection-idempotent

If two direct children satisfy:

~~~text
L_c1 = L_c2,
~~~

then:

~~~text
L_c1 intersection L_c2
=
L_c1.
~~~

Thus duplicate Q-G-SUBTREE-SOLVE SAME child constraints contribute once to H_p.

This is a language-level explanation of the earlier multiplicity-collapse theorem.

### G-IA121 — a weaker child constraint is redundant under language inclusion

If two direct child languages satisfy:

~~~text
L_hard subset L_easy,
~~~

then:

~~~text
L_hard intersection L_easy
=
L_hard.
~~~

Therefore the easier/superset child language adds no treatment-sequence constraint at that parent.

This is ordinary dominance, not identity.

### G-IA122 — only inclusion-minimal child languages are required for H_p

For one parent p, consider its finite set of distinct child languages ordered by subset.

Remove any language that strictly contains another retained child language.

The intersection is unchanged.

Therefore H_p is determined exactly by the antichain of inclusion-minimal child completion languages.

No canonical ordering of that antichain is required.

### G-IA123 — child-language dominance preserves timing as well as final completion

L_r contains every finite treatment prefix that has already completed subtree r.

Therefore:

~~~text
L_hard subset L_easy
~~~

means at every possible treatment prefix:

~~~text
hard complete
->
easy complete.
~~~

The redundancy in G-IA121 is valid for parent exposure timing, including same-phase cascades, not merely for final-word acceptance.

---

## Language-level recursive quotient

### G-IA124 — parent completion language depends on children only through H_p

Once H_p is fixed:

- target p uses L_p = H_p;
- non-target p uses H_p plus only E_p through G-IA115.

No other child internal structure is load-bearing for L_p.

Thus subtree-completion language is a coarser exact objective abstraction than SIG or RESP.

### G-IA125 — exact child solve-language SAME permits recursive replacement

If child c1 and c2 are Q-G-SUBTREE-SOLVE SAME, substituting one language value for the other in the parent recursion leaves L_p unchanged.

This is scoped value substitution, not raw subtree identity.

### G-IA126 — language dominance permits recursive constraint deletion

If one child language is a strict superset of another child language at the same parent, dropping the superset constraint leaves H_p and therefore L_p unchanged.

This may remove a structurally distinct branch from the **objective constraint representation** while retaining its source occurrence/provenance.

### G-IA127 — language-quotient reduction preserves every raw solving treatment sequence

Apply G-IA120–G-IA126 recursively from leaves to root while retaining exact language values.

Because every local L_p is unchanged, L_root is unchanged.

Therefore the resulting language-level quotient preserves membership of every raw treatment word, not only the optimum value.

### G-IA128 — language quotient can be strictly coarser than SIG quotient

SIG equality is one sufficient certificate for equal RESP and equal L_r.

But Q-G-SUBTREE-SOLVE may identify unequal SIG/RESP values, and language dominance may remove nonidentical superset constraints.

Therefore the objective language representation may be smaller than the exact dynamic SIG quotient.

The two quotients serve different purposes:

~~~text
SIG quotient:
    exact reachable-state simulation

language quotient:
    exact target-reaching treatment language
~~~

---

## Monotone word structure

### G-IA129 — inserting extra treatment symbols cannot destroy solvability

Let T solve valid state S.

Insert an arbitrary treatment e at any position to obtain Tprime.

At the insertion point, applying e can only move the current state to an extensional subset of the state that T would otherwise have.

The unchanged remaining suffix that solved the larger state also solves the smaller state by G-IA047.

Therefore:

~~~text
T solves S
->
every word obtained from T by inserting treatment symbols also solves S.
~~~

### G-IA130 — every solving language is upward closed under subsequence superwords

Using the standard finite-word subsequence relation:

~~~text
T <=subseq U
~~~

when U is obtained by inserting zero or more symbols into T.

Then for every valid state S:

~~~text
T in L(S)
AND
T <=subseq U
->
U in L(S).
~~~

This applies to every L_r and L_global.

### G-IA131 — every minimum solution is deletion-irredundant

If T is a minimum-length solving word, deleting any one treatment occurrence must yield a nonsolving word.

Otherwise the shorter deletion would contradict minimum length.

This is stronger than merely forbidding adjacent duplicate operators.

### G-IA132 — subsequence-minimal does not automatically mean minimum length

Two solving words can be incomparable under subsequence while having different lengths.

Therefore deletion-irredundancy is a necessary condition for optimum, not a sufficient minimum-length certificate.

This prevents a false collapse.

---

## Finite-state / regularity consequence

### G-IA133 — L_global has an exact finite-state recognizer

A4 constructed a finite SIG quotient with:

- finitely many active-type states;
- deterministic treatment-symbol transitions;
- exact accepting condition "all non-target types inactive."

Therefore the quotient transition system itself is a finite-state recognizer for L_global.

No external automata theorem is needed for this construction.

### G-IA134 — every subtree completion language is finite-state recognizable

Restrict the same construction to the finite rooted subtree/type region for r and use its exact local-completion accepting condition.

This yields a finite-state recognizer for L_r.

### G-IA135 — shortest solving treatment words are finitely searchable when L_global is nonempty

The finite recognizer and the A1 length bound imply a finite procedure:

~~~text
enumerate finite treatment words by nondecreasing length
evaluate exact quotient transitions
stop at first accepting length
retain every accepting word at that length.
~~~

This is an existence/finite-search result.

It is not a polynomial-time claim and does not prescribe one implementation.

---

## Non-admitted high-level analogy

The intersection of branch languages can resemble shortest-common-supersequence structure in special restricted instances.

No general exact SCS equivalence is admitted here because:

- sites may accept multiple operators;
- one saturated phase can cascade through multiple levels;
- branch languages can contain richer constraints than one fixed required word;
- dominance can make branch constraints redundant.

Any SCS correspondence remains a later discovery hypothesis unless separately proved under a narrowed instance class.

---

## Pass-5 disposition

~~~text
new exact implicit assertions:          27
cumulative exact implicit assertions: 135
exact subtree language recursion:        established
global solution language:                exactly characterized
branch combination:                      exact intersection
language dominance reduction:            established
subsequence upward closure:              established
finite-state recognizer:                 established
general SCS equivalence:                 NOT ADMITTED
QU-dependent assertions:                 0
~~~

The next NEI pass must re-evaluate identity using exact subtree-language values and language-dominance boundaries.
