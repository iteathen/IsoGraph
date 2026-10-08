# Primitive Field / Vector Schema 0.1

**Status:** research-local reusable schema support; not qualified Core authority
**Native:** PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg
**Scope:** abstract commutative-field and vector-space axioms only

## Pinned dependencies

- Primitive Logic Kernel 0.1 native blob: 2630336da5c4117a15a43c1dc0847536b33ed083
- Primitive Data Constructors 0.5 native blob: c0479ac1de1a1c8ff5737221133601618b1a56cf

Generic object carrier 7400 is imported from Primitive Data Constructors 0.5. Logical roles ^150000–^150024 are imported from Primitive Logic Kernel 0.1.

## Local IDs

| ID | Gloss | Closure |
|---|---|---|
| 182000 | relation/predicate-object carrier | RAW_CARRIER |
| 182001 | total unary relation graph | CLOSED_SCHEMA |
| 182002 | total binary relation graph | CLOSED_SCHEMA |
| 182003 | commutative field schema | CLOSED_SCHEMA |
| 182004 | vector-space schema over 182003 | CLOSED_SCHEMA |

The local glosses are navigation only. Their behavior is carried by quantified primitive predicate incidence, equality, conjunction, negation, implication, biconditional, and quantification.

## 182001 — total unary graph

The schema says that for every A-member exactly one B-member is related by R, and every represented R(x,y) tuple has x in A and y in B.

No FUNCTION primitive is imported.

## 182002 — total binary graph

The schema says that every A×B input pair has exactly one C output under R, and every represented R(x,y,z) tuple respects those carriers.

No binary-operation semantics are hidden in R.

## 182003 — commutative field schema

The schema expands to:
- total addition and multiplication graphs;
- total additive inverse;
- distinguished unequal zero and one values in the scalar carrier;
- additive/multiplicative identity laws;
- additive inverse laws;
- unique multiplicative inverse for every nonzero scalar;
- additive and multiplicative commutativity;
- additive and multiplicative associativity;
- distributivity.

This is an abstract algebraic field schema. It does **not** establish that a source carrier is R or C, does not supply topology, order, completeness, algebraic closure, real closure, conjugation, or analytic structure.

## 182004 — vector-space schema

The schema expands to:
- one 182003 field;
- total vector addition;
- total additive inverse;
- total scalar action;
- vector zero;
- abelian-group laws for vector addition;
- scalar identity;
- scalar distributivity over vector addition;
- vector distributivity over scalar addition;
- scalar-action associativity.

This is an abstract vector-space schema only.

## Core-0.21 disposition

For the semantic family defined by these finite quantified axioms:

~~~text
schema semantics:
    CLOSED_SCHEMA at research-support level

source instantiation:
    NOT ESTABLISHED by this file

Woit track primitive closure:
    NOT CLAIMED

Lisi track primitive closure:
    NOT CLAIMED
~~~

The file closes only the reusable *definition schema*. A source claim that a particular carrier is a field or vector space must separately map its carrier/operation relations into this schema and preserve any additional source-specific structure.

## Explicit non-coverage

Still unexpanded:
- real-number order/completeness;
- complex conjugation;
- dimension/basis;
- linear maps;
- bilinear/Hermitian forms;
- projective quotients;
- Lie/Clifford structures;
- manifolds, bundles, connections;
- any Woit- or Lisi-specific physical semantics.
