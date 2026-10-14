# Woit-local Vector Quotient / Grassmannian Two-Plane Schema 0.1

**Status:** W-TRACK RESEARCH-LOCAL REUSABLE SUPPORT  
**Native:** `WOIT_PRIMITIVE_VECTOR_QUOTIENT_GRASSMANN_SCHEMA_0_1.isg`

This support is intentionally quotient-based. It does not choose a complement.

## 947000 — exact vector-space quotient presentation

Given an ambient vector space `T`, a represented subspace `S`, a target vector space `Q`, projection `PI`, and equivalence relation `QE`, the schema requires:

- `PI:T->Q` is linear and total;
- `PI` is surjective;
- the kernel of `PI` is exactly `S`;
- two ambient vectors are `QE`-equivalent exactly when they have the same quotient image;
- equivalently, `t1 QE t2` exactly when `t1=t2+s` for some `s in S`.

This is an exact algebraic representation of `Q = T/S` without importing a quotient-object primitive or selecting a splitting.

## 947001 — exact family of complex two-planes

947001 defines a carrier of relation-objects `GR(S)`.

A member `S` is admitted exactly when:

- `S` is a vector subspace of `T`;
- using the ambient vector operations, `S` has an exact two-element basis witness through schema 187600.

Thus “Gr(2,T)” can be represented as the family of all exact two-dimensional subspace relations rather than as a named leaf.

## 947002 — two-dimensional quotient package relation

Given the two-plane family, 947002 defines a package relation over:

```text
S,
Q and its vector operations,
projection PI,
coset equivalence QE
```

exactly when:

- `S` is a represented two-plane;
- `Q=T/S` through 947000;
- `Q` itself has an exact two-element basis.

## 947003 — quotient family completeness

947003 additionally requires every represented two-plane `S` to possess at least one exact two-dimensional quotient package.

This represents the structural content needed for Woit's standard twistor statement:

```text
point = right-handed C2 plane S inside T=C4
left-handed spinor space = T/S
```

without assuming a global complementary subspace.

## Boundaries

This file does not yet define:

- the tautological bundle as a global bundle object;
- tangent fibers `Hom(S,T/S)`;
- the Klein/Plucker embedding;
- topology or manifold structure of the Grassmannian;
- any Lisi-side structure.

Those remain separate reductions.
