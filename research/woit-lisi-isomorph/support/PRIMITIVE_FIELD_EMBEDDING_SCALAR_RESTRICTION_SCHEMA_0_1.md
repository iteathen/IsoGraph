# Primitive Field Embedding / Scalar Restriction Schema 0.1

**Status:** RESEARCH-LOCAL SCHEMA SUPPORT  
**Native:** PRIMITIVE_FIELD_EMBEDDING_SCALAR_RESTRICTION_SCHEMA_0_1.isg

## 193300 — field embedding

193300 represents a bijective-onto-image field map R -> C preserving:
- zero and one;
- addition;
- multiplication.

The map is represented as an exact bijection between R and its represented image carrier in C; source instantiations that use all of C must not apply this schema.

For the BT01 real-to-complex use, the intended source image is the ordinary real subfield of the complex carrier.

## 193301 — restriction of scalars

Given:
- an R-to-C field embedding;
- a C-vector space V;
- a candidate R-scalar action RSCALE;

193301 requires:

~~~text
r *R v
=
EMB(r) *C v.
~~~

It also requires V with the restricted action to satisfy the R-vector-space schema.

Thus the same additive carrier can be viewed over R without identifying the R and C scalar fields.

## BT01 use

This is the required semantic support for Woit's distinction:

~~~text
Euclidean real vector carrier
    subset / real form of
complexified M(2,C) = Hom(S_R,S_L).
~~~

It prevents the bridge from collapsing real four-dimensional and complex four-dimensional semantics into one untyped carrier.

## Limitation

193300/193301 do not by themselves define the standard real or complex fields, complex conjugation, topology, or completeness.
