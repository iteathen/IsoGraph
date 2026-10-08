# W02 Conventional Complex / Lorentz / Euclidean Real-Form Source Instance 0.1

**Status:** SOURCE-LOCAL ALGEBRAIC REAL-FORM INSTANCE  
**Native:** W02_CONVENTIONAL_REAL_FORMS_SOURCE_INSTANCE_0_1.isg  
**Source:** W02 §I

## Complex spin group factors

204200 is the determinant-one subgroup of the exact source M2(C) algebra.

Two distinct source roles use this same group presentation:

~~~text
204210 = SL(2,C)_L role
204211 = SL(2,C)_R role.
~~~

The roles are distinct even though their underlying represented carrier is the same determinant-one matrix group.

The conventional complex-spacetime action is 204220:

~~~text
X -> g_L X g_R^{-1}.
~~~

This gives the algebraic content of the complexified Spin(4,C) factor action without treating the group names as opaque leaves.

## Minkowski Lorentz real form

204230 is the source conjugate-diagonal condition.

It requires:

~~~text
g_R = (g_L^dagger)^(-1).
~~~

Therefore the complex action becomes:

~~~text
X -> g X g^dagger.
~~~

204221 is the resulting action on the exact Hermitian matrix carrier 204124.

204222 transports that action through the source Hermitian-vector injection 204151 to the real Minkowski vector carrier 204130.

The source quadratic form 204140 is explicitly preserved.

This closes the algebraic Lorentz action used in W-A0-047 and the Minkowski real-form portion of W-A0-048.

## Euclidean real form

204203 is the source determinant-one unitary subgroup.

Two independent factor roles are:

~~~text
204212 = SU(2)_L
204213 = SU(2)_R.
~~~

204231 records the Euclidean factor-pair condition: both factors are independently special-unitary.

This closes the algebraic group-real-form statement:

~~~text
Spin(4)_E = SU(2)_L x SU(2)_R
~~~

at the current source scope.

The specific Euclidean vector real subspace and its analytic-continuation map are separate obligations.

## Current dispositions

~~~text
W-A0-047:
    CLOSED_SCHEMA_SOURCE_INSTANCE

W-A0-048:
    PARTIAL
    complex factor groups and both real-form group conditions closed;
    analytic-continuation relation between real vector subspaces still open.
~~~

No topology/smooth Lie-group structure is claimed.
