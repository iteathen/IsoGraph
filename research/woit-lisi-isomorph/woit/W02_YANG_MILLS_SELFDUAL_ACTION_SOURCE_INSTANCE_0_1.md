# W02 Yang-Mills Self-Dual Action Source Instance 0.1

**Status:** SOURCE-LOCAL ACTION IDENTITY INSTANCE — CONNECTION/TOPOLOGY SEMANTICS PARTIAL  
**Native:** W02_YANG_MILLS_SELFDUAL_ACTION_SOURCE_INSTANCE_0_1.isg  
**Source:** W02 §IV.2, arXiv:2311.00608v2

## Abstraction boundary

The source statement is about an infinite-dimensional space of gauge connections. IsoGraph does not enumerate fields over spacetime.

For this action identity the exact required interface is:

~~~text
connection carrier A
curvature map A -> F_A
Euclidean Hodge split on curvature two-forms
PAIR(alpha,beta) representing integral Tr(alpha wedge beta).
~~~

PAIR is not a name-only leaf: it instantiates the Hodge-compatible bilinear schema 209000.

The deeper construction of curvature from a principal-bundle connection remains a separate full-treatment obligation.

## Source coefficients

209103 is the coupling g, required nonzero.

The artifact constructs:

~~~text
c4 = 1/(4 g^2)
c2 = 1/(2 g^2).
~~~

## Actions

### Ordinary Yang-Mills

~~~text
YM(A)
 = c4 * PAIR(F_A, *F_A).
~~~

### Topological residual functional

~~~text
TOP(A)
 = PAIR(F_A,F_A)

RESID(A)
 = c4 * TOP(A).
~~~

### Self-dual action

Let F_A^+ be the exact PLUS projection from 209001.

~~~text
SD(A)
 = c2 * PAIR(F_A^+,F_A^+).
~~~

Because *F_A^+=F_A^+, this is the source integrand written as
Tr(F_A^+ wedge *F_A^+).

## Exact source identity

The native source package requires:

~~~text
SD(A) = YM(A) + RESID(A).
~~~

This is the source statement that the self-dual action differs from the ordinary Yang-Mills action by the scaled integral of Tr(F wedge F).

The identity is also an algebraic consequence of:
- F=F^+ + F^-;
- Hodge eigenvalues +1/-1;
- Hodge-compatible symmetric PAIR;
- orthogonality of the two eigenspaces.

## What remains open

The source additionally calls:

~~~text
integral Tr(F wedge F)
~~~

a topological invariant.

That global claim is **not** closed here.

It requires:
- principal-bundle/connection semantics;
- curvature construction;
- global differential-form / characteristic-class or boundary semantics sufficient to justify topological invariance.

Therefore the current disposition is:

~~~text
W-A0-065 action rewrite:
    ALGEBRAIC ACTION IDENTITY CLOSED

W-A0-065 topological-invariance justification:
    OPEN FULL-TREATMENT RESIDUAL

W-A0-065 parent assertion:
    PARTIAL
~~~
