# Glycan cleavage implicit assertions A8 — exact maximal-path / common-supersequence reduction pass 8

**Status:** exact implicit research assertions admitted after NEI pass 7
**Date:** 2026-09-27
**Inputs:** A0-A7 + NEI passes 1-7
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

This pass resolves the earlier common-supersequence lead under exact scoped definitions.

---

## Maximal non-target paths

### G-IA188 — define maximal directed non-target type paths

Work on the finite non-target SIG-type DAG Q_NT.

A maximal non-target path is a directed sequence in child-to-parent order:

~~~text
P = (q_1,...,q_m)
~~~

such that:

- q_1 has no non-target child predecessor extendable below it on that path;
- q_i -> q_(i+1) is a quotient child-to-parent edge;
- q_m has no non-target parent successor extendable above it.

Equivalently, it spans one complete leaf-to-target-boundary chain of the non-target DAG.

The finite DAG has finitely many such paths, though their explicit enumeration can be large.

### G-IA189 — define non-strict set-valued path coverage

For raw treatment word:

~~~text
T=[e_1,...,e_k]
~~~

and path:

~~~text
P=(q_1,...,q_m),
~~~

say T COVERS P iff there exist indices:

~~~text
1 <= i_1 <= i_2 <= ... <= i_m <= k
~~~

such that:

~~~text
e_(i_t) in E_(q_t)
~~~

for every t.

Equal adjacent indices are allowed.

They mean multiple comparable types are removed in one saturated phase using one common susceptible operator.

### G-IA190 — every solving word covers every maximal non-target path

Let T solve.

Its actual phase map tau is nondecreasing child-to-parent by A7 and satisfies the susceptibility constraint.

Restrict tau to any maximal path P.

The resulting phase indices witness T COVERS P.

### G-IA191 — covering every maximal path is sufficient for solving

Assume T covers every maximal path.

Prove every tau_q(T) is finite by induction on type height.

Leaf type q:

- some maximal path contains q;
- path coverage supplies a treatment position whose operator lies in E_q;
- therefore tau_q is finite.

Nonleaf non-target q:

- every child c has finite tau_c by induction;
- let h be the maximum child completion phase;
- choose a child c_star with tau_c_star=h;
- extend a maximal path through c_star and q;
- the path-cover witness assigns c_star some phase at least tau_c_star because tau is componentwise earliest;
- it assigns q a matching phase no earlier than that child phase;
- hence there exists an E_q-matching treatment phase j>=h;
- the A7 recurrence gives finite tau_q.

Top-level non-target components therefore complete, and the retained target root completes.

Thus T solves.

### G-IA192 — exact global solution language is intersection of maximal-path coverage languages

For maximal path P define:

~~~text
COV(P)
=
{ T | T COVERS P }.
~~~

Then:

~~~text
L_global
=
intersection of COV(P)
over every maximal non-target path P.
~~~

This is exact by G-IA190/G-IA191.

### G-IA193 — nonmaximal path constraints are redundant

Every directed nonmaximal non-target path extends to at least one maximal path.

A word covering the maximal extension covers the contained subpath by restricting its witness indices.

Therefore only maximal paths are required in G-IA192.

### G-IA194 — duplicate equal path-coverage languages are intersection-idempotent

If two maximal paths have:

~~~text
COV(P1)=COV(P2),
~~~

their duplicate occurrence in the global intersection is redundant.

The raw paths remain distinct source/provenance objects.

### G-IA195 — superset path constraints are redundant

If:

~~~text
COV(P_hard) subset COV(P_easy),
~~~

then:

~~~text
COV(P_hard) intersection COV(P_easy)
=
COV(P_hard).
~~~

Thus only inclusion-minimal distinct maximal-path coverage languages are required for the exact global solution language.

This is dominance, not identity.

---

## One-path optimum

### G-IA196 — path SEG equals minimum treatment count for that path alone

For path P, recall SEG(P) from A7: minimum number of contiguous path blocks whose susceptibility-set intersection is nonempty.

Then:

~~~text
SEG(P)
=
minimum LENGTH(T) such that T COVERS P.
~~~

Forward:

- choose one common susceptible operator for each block;
- the block operators in order form a covering word.

Reverse:

- any nondecreasing coverage witness groups consecutive path nodes using the same treatment position;
- each such group is a contiguous block with common susceptible operator;
- delete unused treatment positions to obtain a block segmentation no longer than the word.

### G-IA197 — global path lower bound is the maximum single-path optimum

Therefore:

~~~text
OPT
>=
max over maximal P of SEG(P).
~~~

This is the A7 lower bound with an exact path-language interpretation.

### G-IA198 — exact branch-order conflict shows the path lower bound can be strict

Construct two non-target chains below a target root.

Branch 1, leaf-to-parent susceptibility singletons:

~~~text
{A}, {B}
~~~

so every solving word must contain A before B.

Branch 2:

~~~text
{B}, {A}
~~~

so every solving word must contain B before A.

Each path has:

~~~text
SEG = 2.
~~~

No length-2 word can satisfy both order constraints.

Length 3 words ABA and BAB do.

Therefore:

~~~text
OPT=3
>
max SEG=2.
~~~

This is an exact witness for cross-branch synchronization cost.

---

## Generalized common-supersequence formulation

### G-IA199 — define the exact generalized path-cover problem

The general frozen optimization is:

~~~text
given:
    finite alphabet EL
    finite family of maximal paths
    each path position q labeled by nonempty set E_q subset EL

find:
    shortest raw word T over EL

such that:
    for every path
    its positions embed nondecreasingly into T
    and each embedded symbol belongs to that position's E_q set.
~~~

Equal embedding indices are permitted exactly for same-phase cascades.

### G-IA200 — original optimum equals shortest generalized common path-cover word

By G-IA192:

~~~text
T solves original
IFF
T covers every maximal path.
~~~

Therefore the original optimum treatment count is exactly the shortest-word length in G-IA199.

### G-IA201 — complete optimum trajectory family is exactly the shortest generalized cover family

A raw word T is an original minimum treatment trajectory iff:

- it covers every maximal path;
- no shorter raw word covers every maximal path.

Thus the generalized path-cover formulation preserves every minimum raw treatment sequence individually.

---

## Singleton-susceptibility restriction

### G-IA202 — define singleton-labeled restricted class

Consider the exact subclass in which every non-target SIG type has:

~~~text
E_q = { label(q) }
~~~

for one raw operator identity label(q).

No site/type admits alternative operators.

### G-IA203 — consecutive equal labels on one path collapse to one required occurrence

For singleton path:

~~~text
label(q_1),...,label(q_m),
~~~

if consecutive nodes have the same label A, they may all map to one treatment position carrying A.

Conversely nodes separated by a different required label cannot use the same position.

Define COMP(P) by replacing every maximal consecutive run of identical labels with one copy.

### G-IA204 — singleton path coverage is ordinary subsequence containment of COMP(P)

For the singleton restricted class:

~~~text
T COVERS P
IFF
COMP(P) is a standard subsequence of T
~~~

using strictly increasing positions for the symbols of COMP(P).

Proof:

- a non-strict path embedding collapses exactly the consecutive equal-position runs;
- after run compression, adjacent required symbols are distinct and must occupy strictly increasing treatment positions;
- any standard subsequence embedding expands each compressed run back onto its one matching treatment position.

### G-IA205 — singleton global optimization is ordinary shortest common supersequence

For the singleton restricted class, let:

~~~text
W
=
{ COMP(P) |
  P maximal non-target path }.
~~~

Then:

~~~text
T solves
IFF
every word in W is a standard subsequence of T.
~~~

Therefore:

~~~text
OPT
=
length of a shortest common supersequence of W.
~~~

This is an exact reduction for the stated restricted class.

### G-IA206 — singleton optimum trajectories are exactly the shortest common supersequences

Every raw minimum treatment trajectory in the singleton restricted class is exactly a shortest common supersequence of W, and every shortest common supersequence of W is an original minimum trajectory.

Thus the correspondence preserves the complete optimum raw-word family.

---

## General-case boundary

### G-IA207 — the general set-valued model is not silently ordinary SCS

When E_q may contain multiple operators, a path position can be satisfied by any member of its set.

When adjacent positions share a common operator, one treatment position can satisfy several of them simultaneously.

Replacing each set-valued position by one arbitrarily chosen symbol would add unsupported semantics.

Therefore ordinary SCS applies exactly only after a separately justified reduction such as G-IA202.

### G-IA208 — explicit path enumeration is not required by the exact reduction

A DAG can have many maximal paths.

The ordered-layer DAG formulation from A7 and the tau recurrence recognize the same solution language without explicitly enumerating all maximal paths.

Therefore G-IA192/G-IA199 are semantic characterizations, not a mandatory implementation algorithm.

### G-IA209 — no generic SCS algorithmic complexity claim is imported

The exact singleton reduction identifies a known combinatorial form under a restricted class.

This campaign does not import external complexity classifications, approximation bounds, or algorithms as IsoGraph semantic consequences.

Any such claim requires its own authority/evidence.

---

## Pass-8 disposition

~~~text
new exact implicit assertions:          22
cumulative exact implicit assertions: 209
general exact path-cover reduction:      established
singleton ordinary-SCS reduction:        established
all minimum raw words preserved:         yes
mandatory path enumeration:              no
external SCS complexity claims:          none imported
QU-dependent assertions:                 0
~~~

The next NEI pass records only scoped identity among the dynamic, ordered-layer, maximal-path, and restricted ordinary-SCS representations. After that the selected closure families will be rerun for a fixed-point test.
