# Woit-local Grassmannian Tangent-Hom Schema 0.1

**Status:** W-TRACK RESEARCH-LOCAL REUSABLE SUPPORT  
**Native:** `WOIT_PRIMITIVE_GRASSMANN_TANGENT_HOM_SCHEMA_0_1.isg`

This schema extends the exact two-plane/quotient family without adding a complement.

## 947004 — Hom-fiber package relation

Given:

- a full exact two-plane family `GR`;
- an exact quotient package family `QPACK`;

947004 defines a package relation whose final component `HSET` is a carrier of relation-objects.

For a specific plane `S` and quotient `Q=T/S`:

```text
HSET(F)
IFF
F is an exact complex-linear map S -> Q.
```

The meaning of `Hom(S,Q)` is therefore the complete represented carrier of exact linear-map relations, not a name-only object.

## 947005 — tangent-Hom family completeness

947005 additionally requires every exact quotient package in the family to possess a corresponding `HSET`.

This supplies the algebraic fiber-family semantics needed for:

```text
Tangent_S Gr(2,T) = Hom(S,T/S).
```

## Boundary

This is an algebraic fiber-family representation.

It does not by itself assert:
- manifold charts;
- continuity/holomorphic local triviality;
- topology of the Grassmannian;
- differential-geometric tangent-vector derivations.

Those require separate source-local structure if load-bearing.
