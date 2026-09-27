# P versus NP implicit-assertion coverage frontier 0.2

**Status:** operational coverage record; not a universal completeness claim
**Successor to:** IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_1.md

## Machine-audited state

Current indexed generic closure through A23:

~~~text
admitted assertions: 335
missing support references: 0
support cycles: 0
max normalized derivation depth: 11
~~~

Authoritative index:

IMPLICIT_ASSERTION_INDEX_0_7.json

The historical superseded IA-013 predecessor remains normalized exactly as in index 0.6 and is not counted as a missing reference.

## Newly exercised inference families since frontier 0.1

A21 adds:

~~~text
local forward simulation certificate
    ->
continuation dominance
    ->
sound pruning.
~~~

A22 adds:

~~~text
monotone residual preorder
    ->
local simulation
    ->
dominance antichain propagation.
~~~

A23 adds the representation/accessibility firewall:

~~~text
support size is representation-relative

fixed-representation blowup
    != semantic lower bound

polynomial local operation
+
polynomial progress rank
    still needs
polynomial retained support

compact representation
    still needs
polynomial next-operation access

transformation-local scoped equivalence certificates
    can justify exact replacement
    without complete global equivalence classification.
~~~

## Algorithm-hidden positive controls completed

Frozen discovery inputs:

research/p-vs-np/2026-09-27/positive-controls/DISCOVERY_INPUT_MANIFEST_0_1.json

Results:

### PC-R

Recovered:

- exact future statistic (current vertex, remaining budget);
- polynomial state range;
- exact OR recurrence DAG.

Primary campaign routes:

- T2;
- T4.

### PC-H

Recovered:

- local forced consequence;
- monotone finite closure;
- constructible least model on YES;
- constructible contradiction evidence on NO.

Primary campaign routes:

- T3;
- T5.

### PC-G

Recovered:

- primitive XOR algebra;
- reversible solution-set-preserving transform;
- polynomial pivot progress;
- canonical witness / contradiction row.

Primary campaign routes:

- T3;
- T5.

## Cross-control common structure

Derived experimental view:

~~~text
primitive exact local law
+
polynomial retained support
+
source-indexed polynomial progress rank
+
polynomial local construction
+
exact terminal extraction.
~~~

Experimental labels RLEST and AFE remain discovery/navigation views, not Core primitives and not exhaustive theorems.

## Hard-target projection completed

Primitive target:

research/p-vs-np/2026-09-27/target-cnf-sat/

Frozen discovery input:

CNF_TARGET_DISCOVERY_INPUT_MANIFEST_0_1.json

All three local coordinate-handling modes were recovered from primitive clause semantics:

~~~text
A = exact Boolean aggregation
F = exact local forcing
E = exact projected elimination.
~~~

None supplied a universal polynomial decision procedure.

### Key falsifier

Exact explicit-clause elimination can produce superpolynomial/exponential materialized clause support under the tested source order.

### Required alternate interpretation

The same constructed explosion family has a compact exact factorization.

Therefore:

~~~text
large explicit CNF support
    !=
representation-independent support lower bound.
~~~

This result is now normalized into A23.

## Heavily exercised inference families overall

The current closure now includes substantial exact coverage of:

- primitive Boolean/quantifier consequences;
- constructor and finite-data identity;
- arithmetic/polynomial support closure;
- branching <-> bounded existential projection;
- NEI scoped identity and accessibility;
- residual identity and continuation algebra;
- sufficient statistics;
- dominance and local simulation;
- monotone antichain propagation;
- hitting-set sufficiency;
- separator/factorization sufficiency;
- aggregate recurrence DAGs;
- polarity/rejection invariants;
- sound incomplete abstraction;
- reduction transport;
- decision/search equivalence;
- representation-relative support;
- transformation-local semantic certificates;
- representation-size versus operation-access closure.

## Explicitly not closed

No universal completeness claim is made for:

- all deterministic polynomial algorithm architectures;
- all exact representation/factorization languages;
- all possible accessible canonical forms;
- all separator geometries;
- all proof/circuit/communication lower bounds;
- all possible support-growth invariants;
- all lower-bound bridges from one representation family to arbitrary computation.

## Operational fixed point status

~~~text
NOT REACHED.
~~~

A23 was generated only after the positive controls and hard-target projection.

The campaign therefore still has live implicit structure.

## Strongest current open edge

The hard target narrows the equality-side opening to:

~~~text
primitive structural condition
    ->
polynomially constructible exact factorization
    ->
polynomial retained size
    ->
polynomial next-operation closure
    ->
exact terminal objective.
~~~

But universal accessible factorization is already sufficient for existential closure, so the search must find non-circular **primitive causes** of stable compactness rather than define the desired factorization semantically.

## Separation-side firewall

The CNF fixed-representation blowup is not a P != NP result.

An alternate exact compact representation already exists for the explicit counterfamily.

Any separation argument still requires a model-wide bridge showing that every functional-polynomial realization must incur a lower bound.

## Next closure work

High-value target work:

1. derive representation-local boundary/factorization laws from primitive clause incidence;
2. keep representation authority explicit in every width/support claim;
3. test whether compact factorization is closed under the next exact elimination operation;
4. retain source-order and representation-specific blowups as falsifiers rather than universal lower bounds;
5. keep transformation-local NEI certificates separate from complete equivalence classification.

External literature search remains deferred unless one exact edge requires authority.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
