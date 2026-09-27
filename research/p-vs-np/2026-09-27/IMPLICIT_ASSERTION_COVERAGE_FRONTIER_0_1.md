# P versus NP implicit-assertion coverage frontier 0.1

**Status:** operational coverage record; not a universal completeness claim

## Machine-audited state

Current indexed closure through A20:

```text
admitted assertions: 301
missing support references: 0
support cycles: 0
max normalized derivation depth: 11
```

Authoritative index:

`IMPLICIT_ASSERTION_INDEX_0_5.json`

## Heavily exercised inference families

The current closure includes substantial exact coverage of:

- first-order Boolean/quantifier consequences used by the problem;
- natural/list/configuration functionality and constructor identity;
- finite path/reachability consequences;
- polynomial arithmetic closure used by certificates;
- branching <-> bounded-certificate factorization;
- functional Boolean closure;
- bounded existential flattening;
- NEI exact/scoped identity;
- Q-EXISTS / Q-RESIDUAL / Q-MIN / Q-COUNT scopes;
- residual congruence;
- continuation dominance;
- hitting-set sufficient conditions;
- sufficient statistics/canonicalization;
- separator/factorization sufficient conditions;
- aggregate recurrence conditions;
- rejection invariants;
- sound lower/upper abstraction;
- many-one reduction transport;
- decision/search/canonical-witness equivalence.

## Explicitly not closed

No universal completeness claim is made for:

- all mathematics derivable from Peano arithmetic;
- all possible verifier factorizations;
- all algebraic representations;
- all topological/geometric representations;
- all proof-complexity statements;
- all communication-complexity statements;
- all circuit-complexity statements;
- all probabilistic/Bayesian consequences;
- all possible identity query contexts;
- all possible lower-bound invariants;
- all deterministic polynomial algorithm architectures.

## Remaining Core/authority work

- Core 0.20 primitive-logic closure remains unqualified.
- Primitive machine-model alignment to the exact official convention remains a qualification workstream.
- NEI 0.4 is qualified, but this P-vs-NP NEI domain application is research material.

## Operational fixed point status

```text
NOT REACHED.
```

Every recent pass A12-A20 produced new exact assertions or support refinements.

Therefore the campaign must not report an implicit-assertion fixed point yet.

## DP status

The expanded DP run is:

`P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_2.md`

Its current non-circular target is:

```text
cheap sound incomplete structure
+
polynomial retained support
+
exact target preservation.
```

## Next closure/control work

Use known polynomial bounded-existential problems as blind positive controls.

For each control:

1. define/render the primitive existential verifier;
2. do not name the known algorithm in the discovery input;
3. run implicit closure and NEI;
4. let DP recover one or more exact elimination laws;
5. compare the recovered primitive laws across controls;
6. preserve failed/partial mechanisms as falsifiers.

External source search is deferred unless one exact edge needs authority.
