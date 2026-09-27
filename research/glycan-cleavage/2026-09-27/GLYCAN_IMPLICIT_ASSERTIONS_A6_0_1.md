# Glycan cleavage implicit assertions A6 — static phase-assignment reduction pass 6

**Status:** exact implicit research assertions admitted after NEI pass 5
**Date:** 2026-09-27
**Inputs:** A0-A5 + NEI passes 1-5
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

A5's language equations permit a direct elimination of microscopic trace/state simulation from the treatment-sequence acceptance condition.

---

## Solvability

### G-IA136 — a non-target node cannot have a target descendant

If x is in TG, every ancestor of x is in TG by G-IA003.

Contrapositive:

~~~text
p notin TG
->
no descendant of p is in TG.
~~~

Therefore every descendant in a non-target rooted component is also non-target.

### G-IA137 — nonempty susceptibility is necessary for every non-target node

For non-target r define:

~~~text
E_r = { e in EL | M(e,r) }.
~~~

If E_r is empty, r is never eligible under any treatment.

It can never be removed.

Therefore:

~~~text
exists non-target r with E_r empty
->
L_global is empty.
~~~

### G-IA138 — nonempty susceptibility for every non-target node is sufficient for solvability

Assume:

~~~text
forall r notin TG:
    E_r is nonempty.
~~~

While any non-target node remains, choose a remaining non-target node with no remaining non-target descendant.

By G-IA136 it has no target descendant either, so it is terminal.

Choose any e in E_r and apply that treatment.

The phase removes r and may remove additional non-target structure.

Each such choice strictly reduces the finite non-target set.

Repeating finitely reaches exactly TG.

### G-IA139 — exact solvability criterion

Combining G-IA137 and G-IA138:

~~~text
L_global is nonempty

IFF

every represented non-target node
has at least one susceptible operator in EL.
~~~

No additional structural obstruction to existence remains in the frozen 0.1 model.

The nontrivial problem is minimizing the number/order of treatment phases.

### G-IA140 — solvability criterion can be checked on SIG types

SIG preserves target flag and exact susceptibility vector.

Therefore:

~~~text
L_global nonempty

IFF

every represented non-target SIG type
has a nonempty susceptibility vector.
~~~

Duplicate occurrences do not create new existence constraints.

---

## Actual removal-phase relation

### G-IA141 — every solving word induces a unique actual removal phase for each non-target node

Let a solving treatment word be:

~~~text
T = [e_1, e_2, ..., e_k].
~~~

Every non-target node is eventually deleted exactly once.

Define:

~~~text
phi_T(r)
=
the treatment-phase index j
during whose saturated phase r is deleted.
~~~

This value is unique because deleted nodes are never recreated.

### G-IA142 — actual removal phase carries a susceptibility witness

For every non-target r:

~~~text
M(e_phi_T(r), r).
~~~

This follows from eligibility at deletion.

### G-IA143 — removal phases respect parent precedence non-strictly

For every parent edge:

~~~text
P(c,p)
~~~

with c and p both non-target:

~~~text
phi_T(c) <= phi_T(p).
~~~

A parent cannot be deleted before a present child.

Equality is permitted because one saturated phase can delete the child first and then cascade to a parent matched by the same treatment symbol.

### G-IA144 — actual phase assignment is a monotone map into the phase chain

On the finite poset of non-target nodes ordered descendant-before-ancestor, phi_T is order-preserving into:

~~~text
1 <= 2 <= ... <= k.
~~~

Each node assigned to j is compatible with the one phase label e_j through G-IA142.

This is a derived static witness for T.

---

## Static witness sufficiency

### G-IA145 — define a static phase-assignment witness

For word:

~~~text
T=[e_1,...,e_k],
~~~

a phase-assignment witness is a map:

~~~text
phi:
    non-target represented nodes
    ->
    {1,...,k}
~~~

satisfying:

1. label compatibility

~~~text
M(e_phi(r), r)
~~~

for every non-target r;

2. parent precedence

~~~text
P(c,p)
AND
c,p notin TG
->
phi(c) <= phi(p).
~~~

Target nodes receive no phase assignment because they are never deleted.

### G-IA146 — every static phase-assignment witness makes the word solve

Assume T has a witness phi from G-IA145.

Prove by induction on treatment phase j that every node r with:

~~~text
phi(r) <= j
~~~

has been deleted by the end of phase j.

For r with phi(r)=j:

- every non-target child c has phi(c)<=j;
- by the induction/cascade order, those children are absent by the time the exhaustive j phase can stop;
- e_j matches r;
- r is non-target;
- once r becomes terminal during phase j, exhaustive saturation deletes it.

Therefore all non-target nodes are gone by phase k and the final state is TG.

### G-IA147 — every solving word has a static phase-assignment witness

Use its actual removal-phase map phi_T from G-IA141.

G-IA142 supplies label compatibility.

G-IA143 supplies precedence.

Thus phi_T satisfies G-IA145.

### G-IA148 — exact static characterization of the raw solution language

For every finite raw treatment word T:

~~~text
T in L_global

IFF

there exists a phase-assignment witness phi
satisfying G-IA145.
~~~

This is an exact elimination of microscopic trace choice from the acceptance condition.

### G-IA149 — the optimization objective becomes minimum phase-chain length

The original optimum equals the minimum k for which there exist:

- raw operator labels e_1,...,e_k in EL;
- a phase-assignment witness phi on all non-target nodes;

satisfying label compatibility and non-strict child-to-parent precedence.

Every minimum witness word is exactly a minimum treatment trajectory of the original problem.

---

## Same-phase cascade interpretation

### G-IA150 — comparable nodes may share one phase exactly when the common phase label matches each assigned node

If child c and ancestor p satisfy:

~~~text
phi(c)=phi(p)=j,
~~~

then both must satisfy:

~~~text
M(e_j,c)
AND
M(e_j,p).
~~~

All intermediate non-target nodes assigned to j likewise match e_j.

Saturation deletes the chain bottom-up within phase j.

Thus equality of phase indices is the exact static representation of same-treatment cascade.

### G-IA151 — incomparable branches may share a phase without additional ordering constraints

Nodes in different incomparable branches may receive the same phase index whenever that phase label matches them.

The global exhaustive treatment acts on all such exposed regions in parallel.

No branch-local worker/order choice enters the treatment-word objective.

---

## Non-target forest boundary

### G-IA152 — target nodes partition the removable structure into non-target rooted components

Because target membership is ancestor-closed:

- a non-target node has no target descendant;
- a target node may have non-target children.

Removing target nodes from the parent tree therefore leaves a forest of all-non-target components attached below target boundaries.

The phase-assignment precedence constraints live entirely inside these non-target components.

### G-IA153 — the global word must satisfy all component assignments simultaneously

One treatment word T solves the full instance iff every non-target component admits a G-IA145 assignment using the same global phase labels e_1,...,e_k.

This restates branch synchronization without decomposing the word into independent per-branch schedules.

It explains why generic shortest-common-supersequence language is only an analogy: shared ancestors/components and set-valued operator compatibility are represented directly by one global assignment.

---

## SIG-type assignment reduction

### G-IA154 — equal SIG occurrences have equal actual removal phase under any word

Same SIG implies Q-G-RESP SAME and synchronized root presence after every treatment prefix.

For a non-target SIG type q, all raw occurrences therefore disappear during the same treatment phase when they disappear at all.

Thus a solving word induces one removal phase per non-target SIG type, not one independent phase per occurrence.

### G-IA155 — define type-level phase assignment

Let Q_NT be the finite set of non-target SIG types.

For word T=[e_1,...,e_k], define:

~~~text
psi:
    Q_NT -> {1,...,k}.
~~~

Required constraints:

1. susceptibility

~~~text
e_psi(q) belongs to q.susceptibility_vector;
~~~

2. quotient precedence

for every quotient child edge:

~~~text
qc -> qp
~~~

with qp non-target:

~~~text
psi(qc) <= psi(qp).
~~~

Target parent types are not assigned.

### G-IA156 — raw node assignment and type assignment are equivalent for solving words

Raw-to-type direction:

- use G-IA154 to assign one shared phase to every non-target type.

Type-to-raw direction:

- assign each raw non-target occurrence r the phase psi(SIG(r));
- quotient child edges preserve every raw parent-child type incidence;
- susceptibility is preserved by SIG.

Therefore:

~~~text
T solves original
IFF
T admits a type-level assignment psi.
~~~

### G-IA157 — exact optimum can be stated entirely on the non-target SIG-type DAG

The minimum treatment count is the minimum k such that there exist:

~~~text
word labels e_1,...,e_k
and
type assignment psi: Q_NT->{1,...,k}
~~~

satisfying G-IA155.

Raw occurrence multiplicity no longer appears in the optimization constraints.

Source provenance remains in the occurrence/type map.

---

## Sharper finite bound

### G-IA158 — every solvable instance has a solution using at most one scheduled phase per non-target SIG type

Assume solvable, so every non-target type has a nonempty susceptibility vector by G-IA140.

Order non-target SIG types by increasing subtree height.

For each not-yet-deleted type q in that order, choose one susceptible operator and apply it.

All non-target child types have smaller height and have already been removed.

Thus q is terminal and is removed in that phase.

A chosen phase may remove additional higher types, so later no-effect choices can be skipped.

Therefore there exists a solving trajectory of length at most:

~~~text
|Q_NT|.
~~~

### G-IA159 — refined optimum-length bound

Whenever a solution exists:

~~~text
OPT
<=
number of distinct non-target SIG types
<=
number of non-target raw nodes.
~~~

This strictly improves G-IA034 whenever the SIG quotient merges non-target occurrences.

---

## Static-reduction boundary

### G-IA160 — static phase assignment preserves treatment words but not microscopic deletion order

The phase-assignment relation determines whether a raw treatment word solves.

It does not enumerate:

- which simultaneously eligible raw site is deleted first inside one phase;
- all microscopic traces compatible with saturation.

Those distinctions remain outside the frozen objective.

### G-IA161 — no complexity-class conclusion follows

The static constraint system can still have many operator choices and precedence-compatible assignments.

No claim of polynomial-time solvability, closed form, or unique optimum is admitted.

The exact achievement is semantic reduction:

~~~text
dynamic microscopic cleavage search
->
finite word + monotone phase assignment constraints.
~~~

---

## Pass-6 disposition

~~~text
new exact implicit assertions:          26
cumulative exact implicit assertions: 161
solvability criterion:                   exact
dynamic simulation elimination:          exact
static phase-assignment equivalence:      exact
type-level assignment equivalence:        exact
refined optimum bound |Q_NT|:             exact
complexity shortcut claim:                none
QU-dependent assertions:                  0
~~~

The next NEI pass may classify the dynamic and static formulations as scoped SAME under solution-language/optimum-family identity. It must then be followed by another complete implicit pass because this pass materially changed the representation.
