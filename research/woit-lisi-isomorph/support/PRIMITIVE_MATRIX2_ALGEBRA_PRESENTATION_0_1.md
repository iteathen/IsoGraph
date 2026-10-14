# Primitive 2x2 Matrix Algebra Presentation 0.1

**Status:** RESEARCH-LOCAL FINITE PRESENTATION SUPPORT  
**Native:** PRIMITIVE_MATRIX2_ALGEBRA_PRESENTATION_0_1.isg

Schema 198000 gives an exact finite presentation of the algebraic structure of M2 over an arbitrary field C.

It requires:
- a four-dimensional C-vector space;
- basis E11,E12,E21,E22;
- a bilinear associative unital product;
- unit E11+E22;
- the complete matrix-unit multiplication table Eij Ekl = delta(j,k) Eil.

Because product is bilinear and the four matrix units form a basis, the finite table determines multiplication on every represented matrix.

This avoids leaving "2x2 matrix" as a semantic leaf and avoids extensional enumeration of infinitely many matrices.

No determinant, adjoint, topology, or analytic matrix norm is included.
