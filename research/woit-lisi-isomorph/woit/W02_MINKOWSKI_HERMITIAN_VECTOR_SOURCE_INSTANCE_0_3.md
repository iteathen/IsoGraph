# W02 Minkowski Hermitian Vector Source Instance 0.3

**Status:** CURRENT SOURCE-LOCAL NATIVE INSTANCE — REBUILT  
**Source:** W02 §I  
**Predecessors:** 0.1 and 0.2 rejected for current closure support

## Complex matrix carrier

This revision instantiates the exact finite M2(C) matrix-unit algebra and determinant/adjoint schema over the W source complex field.

It pins a local imaginary unit by the correct source field handles:

```text
NEG(1) = -1
MUL(i,i) = -1
NEG(i) = -i
CONJ(i) = -i
```

## Pauli matrices

The native matrix-unit construction is:

```text
sigma0 = I
sigma1 = E12 + E21
sigma2 = -i E12 + i E21
sigma3 = E11 - E22
```

## Minkowski vector carrier

204130 is an exact four-real-dimensional vector space with basis e0,e1,e2,e3 and symmetric bilinear form

```text
diag(-1,+1,+1,+1).
```

204140 is the associated quadratic map.

204151 is the exact real-linear injection into the real scalar restriction of M2(C):

```text
e0 -> sigma0
e1 -> sigma1
e2 -> sigma2
e3 -> sigma3.
```

Every represented matrix is Hermitian.

## Determinant relation

For every source vector v and represented matrix X:

```text
det(X) = - embed_R_to_C(Q_M(v)).
```

This is the exact W02 source convention for signature (-+++).

No Lorentz group action is added here; that remains in the conventional-real-forms source instance.
