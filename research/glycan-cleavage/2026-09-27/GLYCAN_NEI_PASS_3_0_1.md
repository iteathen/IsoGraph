# Glycan cleavage NEI pass 3 — 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0 + A1 + NEI1 + A2 + NEI2 + A3 + scope contract 0.3
**Authority:** qualified NEI 0.4 + QU 0.1

## G-N027 — recursive SIG equality is exact scoped SAME

Under Q-G-SIG:

~~~text
SIG(r1)=SIG(r2)
IFF
Q-G-SIG SAME(r1,r2).
~~~

The statement is identity of the derived recursive value.

It is not global raw-node coidentity.

## G-N028 — SIG SAME forces complete treatment-response SAME

G-IA082 yields:

~~~text
Q-G-SIG SAME
->
Q-G-RESP SAME.
~~~

Thus SIG equality is an exact finite certificate for equality of the entire root-presence/local-completion response function.

## G-N029 — response SAME forces local solve-language SAME

~~~text
Q-G-RESP SAME
->
Q-G-SUBTREE-SOLVE SAME.
~~~

Equal completion response at every treatment sequence gives equal sets of sequences that complete the subtree.

## G-N030 — the recursive identity hierarchy is intentionally one-way

The admitted implications are:

~~~text
Q-G-SIG SAME
    ->
Q-G-RESP SAME
    ->
Q-G-SUBTREE-SOLVE SAME.
~~~

Neither converse is asserted.

Behavioral/objective quotients may be coarser than represented structural signatures.

## G-N031 — positive duplicate multiplicity is parent-interface SAME

Fix parent p and one Q-G-RESP child class C.

Under Q-G-CHILD-CLASS-PRESENCE:

~~~text
one child in C
two children in C
...
k children in C, k>0
~~~

all map to the same TRUE parent-interface value.

Zero copies maps to FALSE.

This is exact Boolean identity under the declared scope.

It is not identity of cardinalities or raw child collections.

## G-N032 — child-response set equality is exact parent-facing SAME

Under Q-G-CHILD-BEHAVIOR-SET, two parent contexts with the same set of child response classes have scoped SAME child-interface value regardless of duplicate multiplicities within those classes.

This result uses G-N031 and set equality.

## G-N033 — duplicate sibling raw subtrees remain globally unmerged

Even when two sibling occurrences are Q-G-SIG SAME and Q-G-RESP SAME, the current graph does not infer global natural coidentity of the occurrences.

Their source provenance and raw SIs remain recoverable.

## G-N034 — SIG classes provide a safe finite type identity

Because SIG is finite and exact, every represented node belongs to one Q-G-SIG class.

The class may be used as a finite derived treatment-structure type for subsequent quotient construction.

No canonical raw representative is semantically required.

## G-N035 — RESP classes may be smaller than SIG classes but need independent proof

If later exact evidence establishes Q-G-RESP SAME between two different SIG classes, those classes may merge for treatment-response purposes.

Absent such evidence, shared-looking outcomes or finite testing do not authorize the merge.

## G-N036 — no new semantic UNKNOWN or global identity result

All new value scopes have exact equality semantics.

Raw-node global identity remains separate.

No probabilistic or QU-dependent identity conclusion is required in the frozen 0.1 model.

## Pass-3 NEI result

~~~text
new exact scoped identity laws:   9
new finite derived type identity: Q-G-SIG
new parent multiplicity quotient: Q-G-CHILD-CLASS-PRESENCE
global raw-node merges:            0
semantic UNKNOWN results:          0
QU refinements:                    0
~~~

The next implicit pass may construct the exact finite quotient DAG using Q-G-SIG classes and prove whether that quotient preserves the complete raw treatment-sequence solution language.
