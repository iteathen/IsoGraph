# Primitive 2x2 Coordinate / Determinant / Adjoint Schema 0.1

**Status:** RESEARCH-LOCAL MATRIX SUPPORT  
**Native:** PRIMITIVE_MATRIX2_DET_ADJOINT_SCHEMA_0_1.isg

Schema 204000 extends the finite matrix-unit presentation 198000.

It introduces:

- an exact coordinate relation
  `COORD(m,a,b,c,d)` for
  (m=aE_{11}+bE_{12}+cE_{21}+dE_{22});
- determinant
  (det(m)=ad-bc);
- conjugate-transpose
  ((a,b,c,d)mapsto(ar a,ar c,ar b,ar d));
- the Hermitian predicate `HERM(m)` iff `ADJ(m,m)`.

Coordinates, determinant, and adjoint are total/unique on the represented matrix carrier.

No topology, positivity, spectral theorem, or analytic matrix norm is imported.

This is the primitive/schema interface needed by W02's Hermitian Minkowski-vector real form and later SL(2,C) real-form conditions.
