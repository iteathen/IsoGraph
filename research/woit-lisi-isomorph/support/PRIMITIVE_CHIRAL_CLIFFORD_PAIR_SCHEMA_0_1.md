# Primitive Chiral Clifford Pair Schema 0.1

**Status:** RESEARCH-LOCAL STRONGER BT01 SUPPORT  
**Native:** PRIMITIVE_CHIRAL_CLIFFORD_PAIR_SCHEMA_0_1.isg

195000 represents a chiral Clifford action without leaving a named Clifford algebra as a semantic leaf.

It requires a quadratic vector space (V,B,Q), two chiral vector spaces S_minus and S_plus, and bilinear actions

~~~text
Gamma_minus : V x S_minus -> S_plus
Gamma_plus  : V x S_plus  -> S_minus
~~~

with

~~~text
Gamma_plus(v,Gamma_minus(v,s_minus)) = Q(v) s_minus
Gamma_minus(v,Gamma_plus(v,s_plus))  = Q(v) s_plus.
~~~

The sign convention belongs to Q. Thus a Cl(0,n) source may use a negative-definite Clifford quadratic form even when an underlying composition-algebra norm is positive.

No dimension, Spin name, basis, real form, or physical role is built in.
