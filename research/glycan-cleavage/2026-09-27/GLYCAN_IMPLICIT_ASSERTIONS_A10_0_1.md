# Glycan cleavage implicit assertions A10 — finite path-basis / disjunctive-SCS reduction pass 10

**Status:** exact implicit research assertions admitted after NEI pass 9
**Date:** 2026-09-27
**Inputs:** A0-A9 + A8 correction + NEI passes 1-9
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

A8 made maximal-path coverage exact. A9 established the finite subsequence-minimal basis of the complete solving language. This pass makes each path constraint itself finite and then distributes the global conjunction into a finite family of ordinary common-supersequence constraints.

---

## Finite pattern basis for one set-valued path

### G-IA235 — define a valid block pattern of one maximal path

Let maximal non-target path P be:

~~~text
(q_1,...,q_m)
~~~

in child-to-parent order.

Partition its positions into contiguous nonempty blocks:

~~~text
B_1 | B_2 | ... | B_t.
~~~

The partition is valid when every block has nonempty common susceptibility:

~~~text
A_i
=
intersection of E_q over q in B_i

A_i is nonempty.
~~~

Choose one raw operator a_i from each A_i.

The resulting raw word:

~~~text
W=[a_1,...,a_t]
~~~

is a valid block pattern of P.

### G-IA236 — path coverage iff some valid block pattern is an ordinary subsequence

For any raw treatment word T:

~~~text
T COVERS P
IFF
there exists a valid block pattern W of P
such that
W <=subseq T.
~~~

**Forward witness.**

Take a nondecreasing A8 path-cover embedding.

Group consecutive path positions mapped to the same treatment index.

Each group is a contiguous block.

The treatment symbol at that shared index lies in every E_q of the block.

Deleting unused treatment positions yields a valid block-pattern word W that is an ordinary subsequence of T.

**Reverse witness.**

Given W <=subseq T, map every path node in block B_i to the treatment position occupied by a_i.

Positions are nondecreasing along the path and each a_i belongs to every E_q in its block.

Thus T covers P.

### G-IA237 — each maximal path has a finite raw pattern family

A path has finite length m.

It has finitely many contiguous partitions, and each block intersection is a subset of finite EL.

Therefore the set PAT(P) of all valid block-pattern words is finite.

### G-IA238 — define the finite subsequence-minimal path basis

Let:

~~~text
B_P
=
the subsequence-minimal elements of PAT(P).
~~~

Then B_P is finite and is an antichain under proper subsequence.

### G-IA239 — B_P exactly generates the path-coverage language

Every pattern in PAT(P) either is minimal or contains a smaller valid pattern as a subsequence after repeated redundancy deletion.

Using G-IA236:

~~~text
T in COV(P)
IFF
there exists b in B_P:
    b <=subseq T.
~~~

Therefore:

~~~text
COV(P)
=
upward subsequence closure of B_P.
~~~

### G-IA240 — B_P is uniquely determined by COV(P)

B_P is exactly the set of subsequence-minimal words in COV(P).

Hence two path-coverage languages are equal iff their finite minimal bases are equal as raw-word sets.

---

## Exact finite path-language inclusion test

### G-IA241 — basis criterion for path-language inclusion

For two maximal paths P1,P2:

~~~text
COV(P1) subseteq COV(P2)
~~~

iff:

~~~text
for every b1 in B_P1
there exists b2 in B_P2
such that
b2 <=subseq b1.
~~~

**Forward.**

Every b1 belongs to COV(P1), so inclusion puts b1 in COV(P2). G-IA239 then supplies b2 <=subseq b1.

**Reverse.**

Let T belong to COV(P1). Some b1 in B_P1 is a subsequence of T.

Choose b2 in B_P2 with b2 <=subseq b1.

Then b2 <=subseq T, hence T belongs to COV(P2).

### G-IA242 — exact path-language equality has a finite mutual-basis criterion

Using G-IA241 in both directions:

~~~text
COV(P1)=COV(P2)
~~~

iff the two finite bases mutually cover one another under subsequence.

Because both bases are minimal antichains, this is equivalent to exact equality of B_P1 and B_P2.

### G-IA243 — path-constraint dominance can be decided from finite basis values

A8 G-IA195 removes any path constraint whose language strictly contains a harder retained path language.

G-IA241 supplies an exact finite basis criterion for that inclusion.

Thus the exact global path intersection may retain only the inclusion-minimal distinct path-language values.

This is a semantic reduction.

It does not require enumerating maximal paths in an implementation that uses the DAG/tau formulation.

---

## Finite disjunction of ordinary common-supersequence constraints

### G-IA244 — selecting one basis word per path converts that selection to ordinary common-supersequence coverage

Let H be the finite set of retained inclusion-minimal distinct path-language constraints.

For each P in H choose one:

~~~text
b_P in B_P.
~~~

For that fixed selection f, define:

~~~text
CS(f)
=
{ T |
  for every P in H:
      b_P <=subseq T }.
~~~

CS(f) is exactly the ordinary common-supersequence language of the finite selected raw-word family.

### G-IA245 — global solution language is the finite union of CS(f)

By G-IA239:

~~~text
T solves
IFF
for every retained P
there exists b_P in B_P with b_P <=subseq T.
~~~

Because H and every B_P are finite, the choices can be collected into one finite selection f.

Therefore:

~~~text
L_global
=
union over all selections f in product(B_P):
    CS(f).
~~~

This is an exact distributive expansion of the corrected A8 maximal-path intersection.

### G-IA246 — the general set-valued problem is a finite disjunction of ordinary SCS subproblems

For one selection f, define:

~~~text
SCSLEN(f)
=
minimum length of a common supersequence
of the selected basis words.
~~~

Then:

~~~text
OPT
=
minimum over selections f:
    SCSLEN(f).
~~~

Thus the general frozen problem is not one ordinary SCS instance in general.

It is exactly a finite disjunction of ordinary common-supersequence instances generated by the admissible path-pattern choices.

### G-IA247 — complete optimum raw-word family from the disjunctive SCS form

For every selection f attaining the global minimum value, take every shortest common supersequence of its selected basis words.

Take the union across all minimum-attaining selections and deduplicate identical raw words.

The resulting set is exactly the original complete optimum raw treatment-word family.

**Witness.**

- every original optimum word chooses at least one contained basis word from each path and is therefore a common supersequence for that selection;
- if it were not shortest for every selection witnessing it at the global optimum length, a shorter global solution would exist;
- every shortest common supersequence for a minimum-attaining selection lies in every retained path language and therefore solves.

### G-IA248 — singleton susceptibility is the one-pattern-per-path special case

Under A8 singleton susceptibility, each maximal path has exactly one subsequence-minimal valid pattern:

~~~text
B_P = { COMP(P) }.
~~~

The product of path-basis choices has one selection.

G-IA245 therefore collapses to the ordinary SCS formulation already proved in G-IA205/G-IA206.

---

## Minimal common-supersequence generators

### G-IA249 — each fixed selection has a finite minimal common-supersequence antichain

For fixed finite selection f, let MCS(f) be the subsequence-minimal common supersequences of its selected basis words.

At least one common supersequence exists, for example their concatenation.

Every subsequence-minimal common supersequence has length no greater than that finite concatenation length.

The alphabet is finite.

Therefore MCS(f) is finite.

### G-IA250 — CS(f) is the upward closure of MCS(f)

Every common supersequence can repeatedly delete redundant treatment occurrences while preserving all selected basis words as subsequences.

The finite process stops at an element of MCS(f).

Conversely every superword of an MCS(f) member remains a common supersequence.

Hence:

~~~text
CS(f)
=
upward subsequence closure of MCS(f).
~~~

### G-IA251 — B_global is the minimal antichain of the finite union of MCS(f)

By G-IA245/G-IA250:

~~~text
L_global
=
upward closure of
union over f of MCS(f).
~~~

A9 defines B_global as the unique subsequence-minimal generator set of L_global.

Therefore:

~~~text
B_global
=
subsequence-minimal elements of
union over f of MCS(f).
~~~

This gives an exact finite path-basis construction of the complete global language basis.

### G-IA252 — optimum words are the shortest elements of the same finite MCS union

Combining G-IA229 and G-IA251:

~~~text
OPT
=
minimum word length in
union over f of MCS(f).
~~~

The complete optimum raw family is the set of words in that finite union having length OPT.

Any longer MCS word may remain in B_global if it is subsequence-incomparable with every shorter solution.

---

## Operator-dominance propagation into path bases

### G-IA253 — a path block label set is upward closed under susceptibility dominance

For valid block B, its admissible raw label set is:

~~~text
A_B
=
intersection of E_q over q in B.
~~~

If e1 belongs to A_B and e1 <=M e2, then e2 belongs to every E_q containing e1 and therefore to A_B.

So block-label choices are upward closed under <=M.

### G-IA254 — value search may restrict path-pattern labels to maximal operators

Replace each pattern symbol by any <=M-maximal dominator.

The same path blocks remain valid, pattern length is unchanged, and the resulting pattern is still admissible.

Therefore the minimum value in G-IA246 can be attained using only maximal operators.

This agrees with A9 G-IA217 from the independent path-pattern representation.

### G-IA255 — complete raw basis and optimum family still require dominated alternatives

Maximal-operator normalization can change the raw pattern and raw common-supersequence word.

It preserves existence and length but not the complete set of raw trajectories.

Therefore dominated raw labels cannot be deleted from the authoritative B_P, B_global, or complete optimum-family values unless exact provenance/preimage reconstruction is retained.

---

## Implementation boundary

### G-IA256 — the finite disjunctive-SCS expansion is semantic, not mandatory execution strategy

The product of path bases can be large.

The original DAG/tau recurrence, ordered-layer formulation, finite-state quotient, recursive language equations, and path-basis expansion are all exact representations of the same accepted-word relation at their proven scopes.

No implementation is required to enumerate:

- every maximal path;
- every path basis;
- every basis selection;
- every MCS family.

The reduction exposes structure; it does not prescribe an algorithm.

### G-IA257 — no external SCS complexity or algorithm claim is imported

A10 uses only the definition of ordinary subsequence/common-supersequence relation inside the exact finite reduction.

It does not import:

- complexity-class results;
- approximation factors;
- solver performance claims;
- canonical SCS algorithms.

Those require separate authority if later needed.

---

## Pass-10 disposition

~~~text
new exact implicit assertions:          23
cumulative exact implicit assertions: 257

finite path basis B_P:
    established

exact finite path-language inclusion:
    established

general set-valued problem:
    finite disjunction of ordinary
    common-supersequence subproblems

global finite basis B_global:
    reconstructed exactly from path bases

complete optimum family:
    reconstructed exactly

singleton ordinary SCS:
    recovered as one-choice special case

QU-dependent assertions:                0
external complexity claims:             none
~~~

A further NEI pass must classify only the finite basis/language values exposed here. One complete implicit no-new pass and one NEI no-new pass are then required before declaring the scoped operational fixed point.
