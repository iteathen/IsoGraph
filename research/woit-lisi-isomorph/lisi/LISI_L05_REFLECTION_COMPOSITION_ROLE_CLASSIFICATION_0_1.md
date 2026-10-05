# L05 Reflection-Composition Role Classification 0.1

**Status:** SOURCE-LOCAL STRUCTURAL CLASSIFICATION FOR L-SSC-131  
**Native:** `LISI_L05_REFLECTION_COMPOSITION_ROLE_CLASSIFICATION_0_1.isg`

## Reduction

L05 has three odd generalized-reflection types.

At the role level their action is exactly three transpositions:

~~~text
R_v: V -> V, Q_minus <-> Q_plus
R_m: Q_minus -> Q_minus, V <-> Q_plus
R_p: Q_plus -> Q_plus, V <-> Q_minus
~~~

The native file represents those permutations as finite incidence rather than by reflection names alone.

## Two-reflection compositions

A composition relation is defined by an explicit intermediate role.

The source distinction then becomes:

~~~text
same reflection type:
    role permutation = identity

different reflection types:
    no role is fixed
    the composed role map has order three
~~~

Together with L130's already-closed fact that every even generalized-reflection composition preserves the triality form, this gives the primitive structural content of the source statements:

~~~text
same type -> generalized/ordinary rotation
different types -> invariant non-rotation triality element
~~~

The terms "rotation" and "triality element" are derived labels here; closure is carried by triality invariance plus the role-permutation structure.

## Four-reflection source sequence

The role action of the source equation-(9) sequence

~~~text
R_p R_v R_m R_p
~~~

is explicitly evaluated and required to give:

~~~text
V -> Q_plus
Q_minus -> V
Q_plus -> Q_minus
~~~

which is the role-level content of:

~~~text
(v,psi,chi) -> (psi,chi,v).
~~~

## Boundary

This file classifies reflection compositions independently of coefficient values. The coefficient-level `t^(uw)` formula and its scalar phases are supplied separately by `LISI_L05_GENERALIZED_TRIALITY_TUW_0_2.isg`.

No Woit or synthesis semantics are used.
