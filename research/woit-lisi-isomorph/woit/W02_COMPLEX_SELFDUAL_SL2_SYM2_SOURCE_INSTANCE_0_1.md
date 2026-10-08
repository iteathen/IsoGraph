# W02 Complex Self-Dual / sl(2,C)_R / Symmetric-Square Source Instance 0.1

**Status:** SOURCE-LOCAL REPRESENTATION INSTANCE  
**Native:** W02_COMPLEX_SELFDUAL_SL2_SYM2_SOURCE_INSTANCE_0_1.isg  
**Source:** W02 §IV.2

## Traceless endomorphism carrier

208100 is the trace-zero subspace of the exact W02 M2(C) algebra.

Its vector operations are the restrictions of matrix addition, negation, and complex scalar multiplication.

208104 is the matrix commutator:

~~~text
[X,Y]=XY-YX.
~~~

The basis:

~~~text
T1=-i sigma1
T2=-i sigma2
T3=-i sigma3
~~~

instantiates the exact three-dimensional sl(2)-type Lie algebra schema.

Thus the source phrase "traceless maps" is represented as a concrete Lie algebra inside End(C2).

## Right-spinor carrier

208120 is an exact complex two-space with basis s1,s2.

208127 is the standard matrix action of the traceless carrier on this two-space.

The native artifact pins the action of T1,T2,T3 on the two spinor basis values and instantiates the Lie-algebra representation schema 184007.

This is the source (1/2)_R representation role.

## Symmetric square

208140 is an exact complex three-space.

208148 is a symmetric bilinear map:

~~~text
SYM:S_R x S_R -> Sym2(S_R)
~~~

with basis:

~~~text
s1 s1
s1 s2 = s2 s1
s2 s2.
~~~

The carrier is therefore an axiomatic finite presentation of the symmetric square, not a name-only node.

208150 is the induced sl(2,C)_R action, required to obey the derivation rule:

~~~text
X.(u v) = (X.u) v + u (X.v).
~~~

208149 is an exact linear bijection from the traceless endomorphism carrier to Sym2(S_R), and the native intertwining law makes it an equivalence of sl(2,C)_R representations.

## Complex self-dual two-forms

206114 is the +i Hodge eigenspace in the already rendered complexified Minkowski two-form carrier.

208160 is an exact linear bijection:

~~~text
self-dual complex two-forms -> traceless endomorphisms of S_R.
~~~

208164 transports the Lie bracket through this map, and schema 184008 makes the identification an exact Lie-algebra isomorphism.

## Closure result

This closes W-A0-064 at the current algebraic representation scope:

~~~text
complex self-dual two-forms
  ~= sl(2,C)_R
  ~= traceless End(S_R)
  ~= Sym2(S_R).
~~~

No analytic field theory, bundle, or connection semantics are asserted here.
