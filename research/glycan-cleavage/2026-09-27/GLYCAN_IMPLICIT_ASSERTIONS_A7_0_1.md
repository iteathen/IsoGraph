# Glycan cleavage implicit assertions A7 — deterministic completion and ordered-layer reduction pass 7

**Status:** exact implicit research assertions admitted after NEI pass 6
**Date:** 2026-09-27
**Inputs:** A0-A6 + NEI passes 1-6
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

This pass eliminates the remaining nondeterminism in verifying one treatment word and then removes explicit treatment labels from the minimum-length objective except as per-layer compatibility witnesses.

---

## Deterministic completion time

### G-IA162 — define exact completion phase tau_q(T)

Fix the non-target SIG-type DAG and a finite treatment word:

~~~text
T = [e_1,...,e_k].
~~~

For every represented SIG type q define:

~~~text
tau_q(T)
=
the earliest phase index after which
the rooted subtree type q is locally complete,

or INF if it is not complete by phase k.
~~~

For a non-target type, local completion is exactly disappearance of its root.

For a target type, local completion means every non-target descendant has been removed while the target root remains.

### G-IA163 — target-type completion recurrence

Let q be a target type and define:

~~~text
h_q
=
max tau_c(T)
over direct child types c of q,
with max(empty)=0.
~~~

Then:

~~~text
tau_q(T) = h_q.
~~~

A retained target root adds no required treatment phase after its children complete.

If any required child value is INF, the maximum is INF.

### G-IA164 — non-target completion recurrence

Let q be non-target and:

~~~text
h_q
=
max tau_c(T)
over direct child types,
with max(empty)=0.
~~~

Every child type of a non-target q is itself non-target by G-IA136.

If h_q=INF, then tau_q(T)=INF.

Otherwise:

~~~text
tau_q(T)
=
least j satisfying:

    1 <= j <= k
    j >= h_q
    e_j in E_q,
~~~

where E_q is the exact susceptibility set of q.

The non-strict j>=h_q represents same-phase cascade.

If no such j exists, tau_q(T)=INF.

### G-IA165 — the tau recurrence equals dynamic saturated execution

For every type q and treatment word T, tau_q(T) from G-IA163/G-IA164 equals the actual earliest local-completion phase under the original saturated dynamics.

**Witness.** Induction on type height.

- child completion phases are exact by induction;
- a target q completes when all children complete;
- a non-target q cannot be removed before all children complete;
- at the first phase at or after that time whose operator matches q, exhaustive saturation removes q;
- if that phase is the same phase that completes the last child, saturation continues upward and removes q.

### G-IA166 — raw-word acceptance is deterministic under tau

The full distinguished root is target.

Therefore:

~~~text
T solves
IFF
tau_root(T) is finite
IFF
tau_root(T) <= LENGTH(T).
~~~

No existential microscopic trace or phase-assignment search is needed to verify one fixed word.

### G-IA167 — actual removal phase equals tau for non-target types

For non-target q in a solving word:

~~~text
psi_actual(q) = tau_q(T).
~~~

Thus the actual type-level removal assignment is unique for that word.

---

## Least feasible assignment

### G-IA168 — actual tau assignment is componentwise earliest

Let psi be any feasible type-level phase assignment for the same word T.

Then for every non-target type q:

~~~text
tau_q(T) <= psi(q).
~~~

**Witness.** Induct on type height.

tau chooses the first matching phase not earlier than all child completion times, while any feasible psi must choose a matching phase not earlier than every child's feasible phase.

### G-IA169 — existential phase assignment can be replaced by deterministic tau evaluation

For a fixed word T:

~~~text
there exists a feasible psi
IFF
tau_root(T) is finite.
~~~

Forward: G-IA168 plus feasibility.

Reverse: the finite tau values themselves form the actual phase assignment on non-target types.

This recovers the A6 acceptance theorem without existential search.

---

## Phase fibers and common susceptibility

### G-IA170 — define phase fiber of a type assignment

For type assignment psi and phase j:

~~~text
F_j
=
{ q in Q_NT | psi(q)=j }.
~~~

Every non-target type occurs in exactly one fiber.

### G-IA171 — one phase label exists iff its fiber has nonempty susceptibility intersection

A treatment phase j carries one raw operator e_j.

Label compatibility for every q in F_j is:

~~~text
e_j in E_q.
~~~

Therefore a phase label exists exactly when:

~~~text
intersection of E_q over q in F_j
is nonempty.
~~~

Any member of that intersection is an admissible raw phase label.

### G-IA172 — every phase of an optimum has a nonempty fiber

If an optimal treatment word contained phase j with:

~~~text
F_j empty,
~~~

no non-target type is actually removed during that phase.

Deleting that treatment occurrence preserves solvability and shortens the word.

Contradiction.

Thus the actual optimum assignment is surjective onto its phase indices.

---

## Exact ordered-layer formulation

### G-IA173 — define a feasible ordered layer system

A k-layer system on Q_NT is a surjective map:

~~~text
lambda:
    Q_NT -> {1,...,k}
~~~

such that:

1. precedence

~~~text
child type qc -> non-target parent type qp
->
lambda(qc) <= lambda(qp);
~~~

2. label compatibility for every layer j

~~~text
intersection
{ E_q | lambda(q)=j }
is nonempty.
~~~

### G-IA174 — every optimal treatment word yields a feasible ordered layer system

Use its unique actual removal phases:

~~~text
lambda(q)=tau_q(T).
~~~

Precedence follows from G-IA143.

Surjectivity follows from G-IA172.

The actual phase label e_j lies in every E_q of its fiber, so every fiber intersection is nonempty.

### G-IA175 — every feasible ordered layer system yields a solving word of the same length

Given feasible lambda with k layers, choose independently for each j any:

~~~text
e_j
in
intersection { E_q | lambda(q)=j }.
~~~

Let T=[e_1,...,e_k].

Assign every q to lambda(q).

This satisfies the A6 type-level assignment constraints, so T solves.

### G-IA176 — exact minimum ordered-layer theorem

The original optimum treatment count equals:

~~~text
minimum k
such that
a feasible ordered k-layer system exists
on Q_NT.
~~~

This formulation contains only:

- the finite non-target SIG-type DAG;
- non-strict child-before-parent layer order;
- exact susceptibility-set intersection in each layer.

It contains no microscopic cleavage order and no explicit dynamic state search.

### G-IA177 — optimum raw words are recovered from optimum layer systems by layer-label choices

For one optimum layer system lambda, every sequence:

~~~text
[e_1,...,e_k]
~~~

with:

~~~text
e_j in intersection { E_q | lambda(q)=j }
~~~

is a solving word of optimum length k.

Different raw operator choices remain distinct raw treatment trajectories when their raw identities differ.

### G-IA178 — one solving word may admit non-actual feasible assignments, but tau selects its unique actual assignment

The A6 existential assignment relation permits assigning a node later than the phase in which saturation would actually remove it.

Therefore feasible assignment witnesses need not be unique.

For any fixed word, G-IA167 selects the unique actual removal-phase assignment tau.

Witness multiplicity must not be confused with treatment-trajectory multiplicity.

---

## Immediate optimum criteria

### G-IA179 — zero-treatment optimum criterion

~~~text
OPT = 0
IFF
RL =ext TG
IFF
Q_NT is empty.
~~~

The empty trajectory already ends at the target exactly in this case.

### G-IA180 — one-treatment optimum criterion

Assume Q_NT is nonempty.

Then:

~~~text
OPT = 1
IFF
intersection { E_q | q in Q_NT }
is nonempty.
~~~

Necessity: every non-target type removed in the single phase must match its one operator.

Sufficiency: choose a common operator; exhaustive saturation deletes all non-target types bottom-up during that phase.

---

## Layer geometry

### G-IA181 — equal-layer comparable nodes force the entire intervening chain into that layer

Suppose non-target types q0 and qm lie on one directed child-to-parent path:

~~~text
q0 -> q1 -> ... -> qm
~~~

and:

~~~text
lambda(q0)=lambda(qm)=j.
~~~

Precedence gives:

~~~text
j
= lambda(q0)
<= lambda(q1)
<= ...
<= lambda(qm)
= j.
~~~

Therefore every intervening qi also has layer j.

Thus same-layer comparable types form contiguous blocks along each DAG path.

### G-IA182 — every same-layer chain block has a common susceptible operator

By G-IA171, one layer j has one operator e_j lying in every E_q of its fiber.

Therefore every contiguous same-layer path block has:

~~~text
intersection of its E_q sets nonempty.
~~~

### G-IA183 — define minimum intersection segmentation of one directed path

For one directed non-target type path:

~~~text
q1 -> q2 -> ... -> qm
~~~

in child-to-parent order, define SEG(path) as the minimum number of contiguous blocks partitioning the path such that each block has:

~~~text
nonempty intersection of E_q over the block.
~~~

This is a finite exact path quantity.

### G-IA184 — path segmentation is a lower bound on global optimum

Every feasible ordered layer system restricts to a contiguous-block layer segmentation of each directed path by G-IA181.

Each block has nonempty susceptibility intersection by G-IA182.

Therefore:

~~~text
OPT >= SEG(path)
~~~

for every non-target directed path.

Hence:

~~~text
OPT >= max SEG(path)
~~~

over all such paths.

### G-IA185 — the path lower bound need not be globally tight

Different branches share the same global ordered layer labels.

Two branches can require incompatible layer-label orders even when each branch individually attains the same small SEG value.

Therefore:

~~~text
max-path SEG
~~~

is a lower bound, not a general exact formula for OPT.

This preserves the cross-branch synchronization problem.

---

## Exact problem statement after A7

### G-IA186 — optimization is minimum precedence-compatible common-intersection layering

The frozen optimum problem is exactly equivalent to:

~~~text
Input:
    finite non-target SIG-type DAG Q_NT
    finite operator set EL
    nonempty susceptibility set E_q subset EL for each q

Find:
    minimum number k of ordered nonempty layers

such that:
    child layer <= parent layer
    and
    every layer's E_q intersection is nonempty.
~~~

Treatment words are recovered by selecting one operator from each layer intersection.

### G-IA187 — no greedy-layer optimality theorem is admitted

A locally maximal compatible layer can consume a treatment label/order opportunity needed by another branch and can force extra later layers.

A7 establishes no generic greedy optimum rule.

Any such algorithmic claim requires separate proof.

---

## Pass-7 disposition

~~~text
new exact implicit assertions:          26
cumulative exact implicit assertions: 187
deterministic fixed-word recurrence:     established
existential verification search:         eliminated
minimum ordered-layer equivalence:       established
one-treatment criterion:                 exact
path segmentation lower bound:           exact
generic greedy optimum:                  NOT ADMITTED
QU-dependent assertions:                 0
~~~

The next NEI pass compares the dynamic, phase-assignment, and ordered-layer formulations under exact solution/optimum scopes. A further implicit pass is required afterward.
