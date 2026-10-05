# Primitive 3×3 Cyclic-Permutation Conjugation Schema 0.1

**Status:** RESEARCH-LOCAL FINITE MATRIX-INDEX SUPPORT  
**Native:** `PRIMITIVE_MATRIX3_CYCLIC_PERMUTATION_CONJUGATION_SCHEMA_0_1.isg`

This schema represents the exact entrywise effect of conjugating a 3×3 matrix by the fixed cyclic permutation matrix

~~~text
g = [[0,0,1],
     [1,0,0],
     [0,1,0]].
~~~

No matrix algebra is left as a semantic leaf.

## 243100

`243100(A,B)` is exactly the entry permutation of

~~~text
B = g A g^{-1}.
~~~

For entries `a_ij`, the output is

~~~text
[[a33,a31,a32],
 [a13,a11,a12],
 [a23,a21,a22]].
~~~

## 243101

`243101(A,B)` is the inverse conjugation

~~~text
B = g^{-1} A g
~~~

with output

~~~text
[[a22,a23,a21],
 [a32,a33,a31],
 [a12,a13,a11]].
~~~

Both maps are order-three permutations of matrix positions.

The schema assumes no commutativity, associativity, field structure, adjoint, determinant, or Lie algebra. It is only finite entry-index structure.
