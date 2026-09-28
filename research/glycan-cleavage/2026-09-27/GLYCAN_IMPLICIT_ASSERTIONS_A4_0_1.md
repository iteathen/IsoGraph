# Glycan cleavage implicit assertions A4 — exact SIG quotient pass 4

**Status:** exact implicit research assertions admitted after NEI pass 3
**Date:** 2026-09-27
**Inputs:** A0 + A1 + NEI1 + A2 + NEI2 + A3 + NEI3
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

This pass constructs a finite derived quotient of the represented rooted tree and tests the strongest relevant claim: equality of the complete raw treatment-sequence solution language.

---

## Quotient construction

### G-IA086 — define the finite SIG quotient DAG Q

For one concrete frozen problem instance, let:

~~~text
Types
=
{ Q-G-SIG value SIG(r) |
  r in RL }.
~~~

For each type q retain:

- target flag;
- exact susceptibility vector over EL;
- exact set of direct child SIG types.

Create one derived node for each distinct q and one edge:

~~~text
q -> child_type
~~~

for each member of its child-signature set.

Duplicate raw occurrences of the same child type under one parent type do not create duplicate quotient edges.

The source occurrence-to-type relation is retained as provenance.

### G-IA087 — Q is finite and acyclic

Assign to each SIG type its recursively determined subtree height:

~~~text
leaf type height = 0

parent type height
=
1 + max child-type height.
~~~

Every quotient child edge strictly decreases this height.

Therefore Q is a finite DAG.

A quotient cycle would contradict finite well-founded SIG construction.

### G-IA088 — every raw node occurrence maps to exactly one quotient type

SIG is a total derived value on every represented node.

Exact value equality partitions represented occurrences into Q-G-SIG classes.

No raw occurrence is lost: its SI/provenance remains attached to its type-membership record.

---

## Synchronized type behavior

### G-IA089 — all raw occurrences of one SIG type have synchronized root presence and completion

By G-N028:

~~~text
same SIG type
->
Q-G-RESP SAME.
~~~

Therefore after every common treatment prefix:

- either every occurrence root of that type is present or every occurrence root is absent;
- all occurrences agree on local subtree-completion observation.

This synchronization follows from exact response equality, not from physical coidentity.

### G-IA090 — one Boolean active flag per SIG type is sufficient

For treatment prefix T define quotient active state:

~~~text
A_T
=
{ q in Types |
  occurrences of q have their roots present after T }.
~~~

G-IA089 makes this definition unambiguous despite multiple raw occurrences.

### G-IA091 — quotient terminality exactly matches raw occurrence terminality

Let raw node r have type q=SIG(r).

After prefix T, r is terminal exactly when:

~~~text
q in A_T
AND
there is no child type qc of q with qc in A_T.
~~~

**Witness.**

Raw terminality asks whether any direct child occurrence survives.

All occurrences of one child SIG class are synchronized by G-IA089.

Positive duplicate multiplicity is parent-interface idempotent by G-N031.

Thus:

~~~text
exists surviving raw child
IFF
exists active quotient child type.
~~~

### G-IA092 — quotient eligibility exactly matches raw type-occurrence eligibility

For treatment e, an active quotient type q is eligible exactly when:

~~~text
q is quotient-terminal
AND
q.target_flag = FALSE
AND
e occurs in q.susceptibility_vector.
~~~

By construction these facts are identical for every raw occurrence of q.

Therefore all raw occurrences of one eligible q are eligible simultaneously.

### G-IA093 — one quotient deletion represents simultaneous deletion of all active occurrences of that type

When q is eligible under e, every raw occurrence root of q is eligible.

A saturated e phase eventually deletes all such occurrences.

Replacing those parallel equal-response deletions with one quotient-type deletion preserves:

- every parent-facing child-presence Boolean;
- every local completion Boolean;
- all subsequent quotient eligibility.

Microscopic event multiplicity is intentionally not represented in Q.

---

## Exact simulation theorem

### G-IA094 — treatment-prefix simulation

Start the quotient from:

~~~text
A_empty = Types
~~~

because every represented raw node is initially present.

Apply one exhaustive treatment e to Q by repeatedly deleting eligible quotient types under G-IA091/G-IA092 until saturated.

Then for every finite raw treatment prefix T and every raw node r:

~~~text
r is present in the original state after T

IFF

SIG(r) is active in the quotient after T.
~~~

**Witness.** Induction on treatment prefixes.

Base: all raw nodes and all represented types are active.

Step:

- induction hypothesis aligns raw child presence with quotient child-type activity;
- G-IA091 aligns terminality;
- G-IA092 aligns eligibility;
- G-IA093 aligns same-type simultaneous deletion;
- same-operator saturation is confluent and unique by G-IA019.

### G-IA095 — target completion is exact in Q

SIG includes target_flag, so no type mixes target and non-target occurrences.

After prefix T:

~~~text
original state =ext TG
~~~

iff:

~~~text
every non-target quotient type is inactive.
~~~

All target types remain active because target occurrences are never eligible.

Any active non-target type witnesses an original non-target occurrence still present.

### G-IA096 — original and quotient raw treatment-sequence solution languages are equal

For the frozen initial state define:

~~~text
L_original
=
{ raw operator sequences T |
  original execution reaches TG }.

L_Q
=
{ same raw operator sequences T |
  quotient execution reaches its target condition }.
~~~

G-IA094/G-IA095 establish:

~~~text
L_original = L_Q.
~~~

This is exact language equality, not empirical agreement.

### G-IA097 — minimum treatment length is exactly preserved

Since the accepted raw sequence sets are identical:

~~~text
min LENGTH(T) over L_original
=
min LENGTH(T) over L_Q.
~~~

The unsolvable case is preserved as well because both languages are empty together.

### G-IA098 — every raw minimum treatment trajectory is preserved exactly

Because Q uses the original raw operator alphabet and G-IA096 preserves membership of each raw operator sequence individually:

~~~text
T is a minimum solving treatment sequence in original
IFF
T is a minimum solving treatment sequence in Q.
~~~

No treatment-sequence witness expansion is required after quotient solving.

This is stronger than merely preserving one optimum value.

### G-IA099 — microscopic trace families are not preserved

Q collapses simultaneous equal-type raw occurrences and does not record all possible microscopic deletion orders.

Therefore Q is not an exact quotient for:

~~~text
all microscopic cleavage events
all microscopic trace identities
raw branch multiplicity statistics.
~~~

Those remain reconstructible only through retained source/provenance data, not Q alone.

This does not affect the frozen treatment-trajectory objective.

---

## Reduction size and reuse

### G-IA100 — quotient type count never exceeds raw node count

~~~text
|Types| <= |RL|.
~~~

Equality occurs when every represented node has a different SIG value.

Strict reduction occurs whenever at least two raw nodes have equal SIG.

### G-IA101 — duplicate sibling multiplicity can yield strict structural reduction without changing any treatment sequence result

If one parent has two or more children in the same SIG class, Q retains one child-type edge.

G-IA096 still preserves the full raw treatment-sequence solution language.

Thus raw branch multiplicity is a proved irrelevant distinction for this objective when it occurs only as positive multiplicity of an exact SIG class.

### G-IA102 — type reuse across different parents is also safe

A SIG type may be referenced from multiple parent types.

Its raw occurrences remain synchronized by G-IA089 because their internal transition behavior is context-independent of their parents.

Therefore Q may share one type node across all such parent references.

This converts the raw rooted tree into a DAG of reusable behavior types.

### G-IA103 — quotient-state upper bound depends on type count rather than raw node count

If:

~~~text
k = |Types|
n = |RL|
~~~

then a naive Boolean active-type representation has at most:

~~~text
2^k
~~~

possible subsets, compared with the raw membership upper bound:

~~~text
2^n.
~~~

Reachability/ancestor constraints make both actual state sets smaller; this is only an upper-bound comparison.

When k << n, the structural quotient can substantially reduce the state representation.

### G-IA104 — all previously proved operator algebra descends to Q

Because Q preserves every raw treatment prefix and solution sequence exactly, the following remain valid on quotient states:

- idempotent same-operator phases;
- no adjacent duplicate in an optimum;
- state monotonicity;
- solve-language dominance;
- susceptibility dominance;
- exact cross-independent commutation;
- finite transformation-monoid view.

No new proof authority is supplied by this reuse; it is transported through G-IA094.

### G-IA105 — a coarser RESP quotient requires additional exact evidence

Q uses SIG equality because it is a finite exact certificate.

NEI pass 3 allows Q-G-RESP to be coarser, but this general problem-family campaign has not established which unequal SIG values, if any, are RESP SAME for a concrete instance.

Therefore the current exact quotient does not silently merge unequal SIG classes.

A future concrete-instance minimization may do so only with an exact Q-G-RESP theorem.

### G-IA106 — no canonical representative is required

The quotient needs identity of SIG values and occurrence-to-type provenance.

It does not require:

- canonical raw node selection;
- canonical type numbering;
- canonical child ordering.

Any representation preserving the same exact quotient incidence is sufficient.

### G-IA107 — source reconstruction requires retained provenance outside the search quotient

Q is exact for the declared trajectory objective but intentionally omits raw duplicate multiplicities and occurrence identities.

Therefore:

~~~text
primitive/source authority
    remains the verified raw IsoGraph

Q
    is a derived objective-preserving search quotient.
~~~

Retain the occurrence-to-type map and original primitive graph when source reconstruction or microscopic provenance matters.

### G-IA108 — the quotient does not by itself make the optimization trivial

The quotient can still contain many distinct SIG types, valid active-type states, and noncommuting treatment operators.

No polynomial-time or closed-form optimum theorem follows merely from G-IA096.

The result is an exact structural reduction, not a complexity-class claim.

---

## Pass-4 disposition

~~~text
new exact implicit assertions:         23
cumulative exact implicit assertions:108
exact finite quotient DAG:             established
raw treatment solution language:       exactly preserved
all raw minimum treatment sequences:   exactly preserved
microscopic trace families:            intentionally not preserved
new global raw-identity claim:         none
QU-dependent assertions:               0
~~~

The next NEI pass is restricted to cross-representation identity between the verified raw problem and this derived quotient. After that, the closure loop must test for a no-new-assertion/no-new-identity fixed point.
