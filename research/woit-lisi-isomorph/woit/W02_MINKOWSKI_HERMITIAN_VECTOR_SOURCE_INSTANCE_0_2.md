# W02 Minkowski Hermitian Vector Source Instance 0.2

**Status:** CURRENT SOURCE-LOCAL NATIVE INSTANCE — CORRECTED  
**Native:** W02_MINKOWSKI_HERMITIAN_VECTOR_SOURCE_INSTANCE_0_2.isg  
**Source:** W02 §I

## Complex matrix carrier

204110 is an exact finite M2(C) algebra using matrix units.

204100 is the source algebraic complex conjugation; 204101 is the chosen imaginary unit with:

~~~text
i^2=-1
conj(i)=-i.
~~~

204000 then supplies exact coordinates, determinant, adjoint, and the Hermitian predicate.

The source Pauli elements are represented algebraically:

~~~text
sigma0 = I
sigma1 = E12+E21
sigma2 = -i E12 + i E21
sigma3 = E11-E22.
~~~

## Minkowski vector carrier

204130 is an exact four-real-dimensional vector space with basis:

~~~text
e0,e1,e2,e3.
~~~

Its source bilinear form is diagonal:

~~~text
B(e0,e0)=-1
B(e1,e1)=B(e2,e2)=B(e3,e3)=+1
B(e_mu,e_nu)=0 for mu!=nu.
~~~

204140 is the associated quadratic map.

## Source matrix embedding

204151 is a real-linear injection into the real scalar restriction of M2(C):

~~~text
e0 -> sigma0
e1 -> sigma1
e2 -> sigma2
e3 -> sigma3.
~~~

This is exactly W02's Hermitian matrix formula.

The image is required to satisfy the native Hermitian predicate.

## Determinant / metric relation

For every source vector v and its represented matrix X:

~~~text
det(X) = -Q_M(v).
~~~

Thus the source statement that determinant equals minus Minkowski length-squared is explicit.

## Closure result

~~~text
W-A0-047:
    CLOSED_SCHEMA_SOURCE_INSTANCE
~~~

This file does not yet instantiate SL(2,C), the left/right group action, or the Lorentz/Euclidean real-form conditions. Those belong to W-A0-048 and later artifacts.


## 0.2 correction

Version 0.1 contained a source-instance construction defect in the final Pauli basis element: the real basis value e3 was routed to the intermediate value -E22 instead of the completed sigma3 = E11-E22.

Version 0.2 declares the completed sigma3 handle and maps:

~~~text
e3 -> sigma3 = E11-E22.
~~~

No downstream research result is qualified against 0.1. Version 0.1 is REJECTED for use.
