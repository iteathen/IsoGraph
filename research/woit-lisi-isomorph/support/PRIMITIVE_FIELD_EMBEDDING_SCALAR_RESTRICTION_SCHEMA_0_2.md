# Primitive Field Embedding / Scalar Restriction Schema 0.2

**Status:** CURRENT RESEARCH-LOCAL SUCCESSOR  
**Native:** PRIMITIVE_FIELD_EMBEDDING_SCALAR_RESTRICTION_SCHEMA_0_2.isg  
**Supersedes:** 0.1, which is rejected for using a surjective bijection where only an embedding is valid.

## 193302 — field embedding

193302 requires a total injective field homomorphism R -> C.

It preserves zero, one, addition, and multiplication.

It does NOT require every C element to be in the image.

## 193303 — restriction of scalars

Given a C-vector space V and a field embedding EMB:R->C, 193303 defines the R-scalar action by:

~~~text
r *R v = EMB(r) *C v.
~~~

The same additive carrier is then required to satisfy the R-vector-space axioms under that restricted action.

This is the lawful support needed to distinguish Woit's real Euclidean vector presentation from its complexification.

## Correction note

Version 0.1 incorrectly reused the bijection schema 188100 for R->C, which implied surjectivity onto C. It must not be used.

No source artifact in this campaign was instantiated against 0.1 before the defect was found.
