# Primitive Chart-Overlap / Projective-Invariance Schema 0.1

**Status:** RESEARCH-LOCAL SCHEMA SUPPORT  
**Native:** PRIMITIVE_CHART_PROJECTIVE_INVARIANCE_SCHEMA_0_1.isg

## 193001 — extensional chart equivalence

Given two parameterized graph relations G1 and G2 on the same ambient carrier T, 193001 defines a chart-transport relation X by exact extensional equality:

~~~text
X(a,b)
IFF
a belongs to chart-1 parameter carrier
AND
b belongs to chart-2 parameter carrier
AND
for every t in T:
    G1(a,t) IFF G2(b,t).
~~~

The relation does not privilege a coordinate-transition formula.

It identifies chart parameters only when they reconstruct the same ambient graph subset.

## 193002 — projective invariance

When two parameters are related by 193001, their projective incidence predicates must agree on every projective point:

~~~text
X(a,b)
->
for every q:
    I1(a,q) IFF I2(b,q).
~~~

For BT01 this is the exact chart-choice firewall:

~~~text
different local complement
    may change Hom coordinates

but

same reconstructed two-plane
    -> same projective CP1 incidence line.
~~~

## Why this abstraction level is deliberate

A Grassmannian chart transition can be written explicitly in coordinates, but the coordinate formula is not the invariant we need.

The load-bearing object is the reconstructed plane and its projectivization.

Therefore 193001 uses extensional graph equality as the comparison boundary.

## Current use

Two Woit local charts with different complements may instantiate 193001/193002.

A future Lisi-to-Woit comparison may also use the same view after the Lisi quaternionic action has been transported into one local graph presentation.

## Non-coverage

This schema does not establish:
- existence of an overlap between arbitrary charts;
- global connectedness of the Grassmannian;
- a canonical complement;
- NEI SAME for source theories.

It closes only the invariance of the represented graph/projective object under alternate chart coordinates.
