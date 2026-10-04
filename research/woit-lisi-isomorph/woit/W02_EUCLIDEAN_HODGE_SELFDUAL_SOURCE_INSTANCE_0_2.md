# W02 Euclidean Hodge / Self-Dual Two-Form Source Instance 0.2

**Status:** CURRENT SOURCE-LOCAL NATIVE TWO-FORM/HODGE INSTANCE — CORRECTED  
**Native:** W02_EUCLIDEAN_HODGE_SELFDUAL_SOURCE_INSTANCE_0_2.isg  
**Source:** W02 §IV.2

## Two-form carrier

205700 is the exact six-dimensional exterior-two-form carrier of the already rendered W02 Euclidean four-vector space.

Its basis is:

~~~text
f01 = tau wedge e1
f02 = tau wedge e2
f03 = tau wedge e3
f23 = e2 wedge e3
f31 = e3 wedge e1
f12 = e1 wedge e2.
~~~

Wedge bilinearity and antisymmetry come from 205510.

## Euclidean Hodge star

205712 is a linear endomorphism with source orientation:

~~~text
*f01=f23
*f02=f31
*f03=f12
*f23=f01
*f31=f02
*f12=f03.
~~~

The native artifact explicitly enforces:

~~~text
*^2 = +identity.
~~~

## Self-dual and anti-self-dual sectors

205713 and 205714 instantiate the exact Hodge eigenspace schema:

~~~text
self-dual:      *omega = +omega
anti-self-dual: *omega = -omega.
~~~

Every represented two-form has a unique self-dual plus anti-self-dual decomposition.

The standard spanning combinations are represented by the three paired basis directions on each side.

## Scope

This closes the Euclidean Hodge-split portion of W-A0-063.

It does not yet identify:
- the + eigenspace with su(2)_R;
- the - eigenspace with su(2)_L;
- the Minkowski complexified ±i eigenspaces.

Those are separate source obligations and will be rendered next.


## 0.2 correction

Version 0.1 incorrectly reused each negated spatial two-form as both an intermediate and the final anti-self-dual sum target. For example it encoded the equivalent of:

~~~text
n23 = -f23
f01 + n23 = n23
~~~

which collapses f01.

Version 0.2 introduces distinct intermediate negatives and final anti-self-dual basis values:

~~~text
a1 = f01 - f23
a2 = f02 - f31
a3 = f03 - f12.
~~~

It also explicitly asserts membership of the three self-dual basis values in the PLUS eigenspace and the three anti-self-dual basis values in the MINUS eigenspace.

Version 0.1 is REJECTED for downstream source closure, IA, NEI, DTS, or DP work.
