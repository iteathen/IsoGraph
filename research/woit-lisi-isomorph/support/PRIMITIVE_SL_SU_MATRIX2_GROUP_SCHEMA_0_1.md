# Primitive Special-Linear / Special-Unitary Matrix-Group Schemas 0.1

**Status:** RESEARCH-LOCAL MATRIX-GROUP SUPPORT  
**Native:** PRIMITIVE_SL_SU_MATRIX2_GROUP_SCHEMA_0_1.isg

## 204010 — determinant-one matrix group

Given a finite matrix algebra and exact determinant relation, 204010 defines the group carrier:

~~~text
G(g) IFF g is a represented matrix AND det(g)=1.
~~~

Group multiplication is exactly the restricted matrix product.

Group inverse is exactly the represented two-sided matrix inverse.

The resulting carrier is required to satisfy abstract group schema 184001.

This closes the algebraic group interface used for SL(2)-type source groups. It does not assert topology, connectedness, or smooth Lie-group structure.

## 204011 — unitary determinant-one subgroup

Given 204010 and exact conjugate-transpose ADJ, 204011 defines:

~~~text
SU(g)
IFF
SL(g)
AND
ADJ(g)=SLINV(g).
~~~

Multiplication and inverse are exactly the restrictions of the determinant-one group operations, and the resulting carrier satisfies 184001.

This is the algebraic SU(2)-type interface used by W02's Euclidean real-form discussion.

## Scope guard

The names SL(2,C) and SU(2) remain source/navigation labels. Their load-bearing algebraic behavior is represented by:
- the finite M2 algebra;
- determinant-one carrier;
- exact multiplication/inverse;
- and, for SU, adjoint-equals-inverse.

No topology or Lie algebra is implied by this schema alone.
