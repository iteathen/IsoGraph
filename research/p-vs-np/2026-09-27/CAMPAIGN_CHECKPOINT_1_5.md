# P versus NP primitive-logic campaign — checkpoint 1.5

**Branch:** `research/p-vs-np-primitive-logic-20260926`  
**Date:** 2026-09-27  
**Status:** implicit-assertion closure expanded through A22

## Machine-audited assertion state

Index:

`IMPLICIT_ASSERTION_INDEX_0_6.json`

Current state:

```text
admitted assertions:            326
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
```

Historical predecessor `IA-013` remains superseded by its corrected later admission and is not counted as current support.

## Major closure families now represented

### Primitive computation consequences

- arithmetic/list/configuration functionality;
- deterministic path uniqueness;
- terminal path properties;
- polynomial certificate encoding and verification;
- branching <-> bounded existential verifier factorization.

### NEI / QU identity

- exact constructor identity;
- Q-RESIDUAL future-language identity;
- Q-EXISTS terminal Boolean identity;
- Q-MIN shortest-continuation identity;
- Q-COUNT accepting-continuation-count identity;
- QU-mediated SAME/DISTINCT/UNKNOWN/INCOMPLETE discipline.

### Objective/composition hierarchy

```text
GLOBAL object identity
    finer than
Q-RESIDUAL compositional identity
    finer than
Q-EXISTS terminal identity.
```

Q-EXISTS has at most two semantic classes but is not right-congruent.

Q-RESIDUAL is the coarsest exact right-congruence preserving terminal acceptance.

### Continuation algebra

Residual continuation sets `C_p` are the shared exact semantic object.

Derived relations/views include:

- equality -> Q-RESIDUAL SAME;
- inclusion -> continuation dominance;
- nonemptiness -> Q-EXISTS;
- minimum length -> Q-MIN;
- cardinality -> Q-COUNT.

### Exact compression topologies

- NEI quotienting;
- one-way dominance pruning;
- hitting sets / canonical witness construction;
- aggregate recurrence circuits;
- separator/factorization dynamic programming;
- rejection invariants;
- lower/upper sound abstraction.

### Access-cost firewalls

Universal polynomial procedures for these complete exact objects are already equivalent in strength to the unresolved bounded-existential closure:

- Q-EXISTS classification;
- Q-MIN exact value;
- Q-RESIDUAL exact identity;
- exact continuation dominance;
- universal witness/NONE construction.

Therefore semantic compactness alone is not progress unless access/construction is independently polynomial.

## Strongest new opening

A sound **incomplete** local relation can still be useful.

The latest exact chain is:

```text
locally checkable forward simulation
    ->
true continuation dominance
    ->
sound pruning

monotone state preorder
    ->
forward simulation
    ->
dominance antichain

polynomial antichain
+ polynomial order/transition/pruning
    ->
deterministic polynomial decision.
```

This avoids requiring a complete exact dominance oracle.

## Current DP synthesis

The expanded DP run is:

`P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_2.md`

Its non-circular target is:

```text
exact/sound semantic support
+
polynomial retained structure
+
polynomial access/construction.
```

The highest-value current structural candidates are:

1. sound local dominance/simulation laws;
2. bounded separator or polynomial sufficient statistic;
3. independently constructible polynomial hitting sets;
4. polynomial aggregate recurrence DAGs;
5. constructible compact rejection invariants / convergent abstractions.

## Fixed-point status

```text
NOT REACHED.
```

Rounds A12-A22 continued to add exact assertions and support refinements.

No universal semantic-completeness claim is made.

## Next execution unit

Use algorithm-hidden positive controls whose primitive source only exposes the bounded-existential problem.

Recommended diversity:

- finite directed reachability-style existential path control;
- monotone/Horn-style closure control;
- GF(2)-linear consistency control.

For each:

1. primitive-render the source problem;
2. withhold the known solution mechanism from the discovery input;
3. run implicit closure + NEI + DP;
4. record which of the admitted elimination laws is independently recovered;
5. keep failures as falsifiers;
6. compare the recovered primitive common core before projecting anything toward an NP-complete target.

## Truth status

```text
P = NP: OPEN
P != NP: OPEN
```

No terminal theorem is claimed.
