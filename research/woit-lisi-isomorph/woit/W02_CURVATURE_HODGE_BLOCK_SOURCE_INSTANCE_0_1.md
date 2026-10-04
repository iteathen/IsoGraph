# W02 Curvature Hodge-Block / Einstein Source Instance 0.1

**Status:** SOURCE-LOCAL ALGEBRAIC GR INSTANCE — CONNECTION CONSTRUCTION OPEN  
**Native:** W02_CURVATURE_HODGE_BLOCK_SOURCE_INSTANCE_0_1.isg  
**Source:** W02 §IV.3

## Source structure

W02 states that, for the spin frame-bundle curvature, the curvature two-form may at a point be viewed as an endomorphism of the six-dimensional two-form space.

The already native Euclidean two-form carrier is:

~~~text
F = F_plus direct-sum F_minus
dim F_plus = 3
dim F_minus = 3.
~~~

210100 is the source carrier of such curvature-endomorphism states.

210101 is their parameterized linear action on the two-form carrier.

## Einstein block condition

210102 instantiates schema 210000.

Thus:

~~~text
EIN(R)
IFF
R(F_plus) subset F_plus
and
R(F_minus) subset F_minus.
~~~

Equivalently, the two off-diagonal 3x3 blocks vanish.

This is the exact algebraic content of W-A0-067.

## Closure boundary

The artifact does **not** yet construct 210100 from:
- a frame bundle;
- a spin connection;
- its curvature two-form.

Therefore:

~~~text
W-A0-067 off-diagonal/block statement:
    ALGEBRAIC SEMANTICS CLOSED

W-A0-067 curvature-as-spin-connection-curvature reconstruction:
    OPEN

W-A0-067 parent assertion:
    PARTIAL
~~~

The remaining reconstruction belongs with W-A0-066 and W-A0-068.
