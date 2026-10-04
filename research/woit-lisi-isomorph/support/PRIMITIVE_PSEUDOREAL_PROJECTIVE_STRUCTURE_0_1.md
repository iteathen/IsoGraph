# Primitive Pseudoreal / Projective Real-Structure Schema 0.1

**Status:** RESEARCH-LOCAL BRIDGE SUPPORT — B03.Q  
**Native:** PRIMITIVE_PSEUDOREAL_PROJECTIVE_STRUCTURE_0_1.isg

## 187400 — pseudoreal vector-space structure

187400 uses:
- an abstract field with algebraic conjugation;
- a vector space V;
- a total antilinear map J : V -> V.

It requires:

~~~text
J(u+v) = J(u)+J(v)
J(a v) = conjugate(a) J(v)
J(J(v)) = -v.
~~~

Thus J is not an ordinary real involution.

## 187401 — induced projective map

Given the exact projective quotient of V, 187401 defines a projective map PJ by:

~~~text
PJ([v]) = [J(v)].
~~~

Antilinearity makes this well-defined under complex rescaling because:

~~~text
J(a v) = conjugate(a) J(v),
~~~

and a nonzero scalar and its conjugate define the same projective class relation.

## 187402 — projective involution

Although J squared is minus identity on vectors:

~~~text
J^2(v) = -v,
~~~

projectively:

~~~text
[J^2(v)] = [-v] = [v].
~~~

Therefore PJ squared is identity.

This is the key distinction between quaternionic/pseudoreal structure and an ordinary fixed-point real form.

## Fixed points are not built in

The schema does not assert that PJ has no fixed points.

That stronger statement follows for the standard complex numbers with the usual conjugation and Woit's twistor structure, but it uses additional source/field properties and remains source-specific.

## Current source mapping

W05 explicitly supplies this pattern for the twistor P1:
- the vector-space real structure squares to -1;
- projectively it squares to +1;
- the projective action is antipodal and fixed-point-free.

The corresponding Lisi-side pseudoreal structure on the quaternionic chiral carrier remains a candidate mapping, distinct from Lisi's ordinary division-algebra conjugation.

## B03 correction

~~~text
B03.R:
    sigma^2 = +1
    ordinary real form / fixed-point semantics

B03.Q:
    J^2 = -1
    projective J^2 = +1
    quaternionic/pseudoreal semantics
~~~

They are not interchangeable.
