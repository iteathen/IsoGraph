# L05 Spacelike Generalized Reflection Source Instance 0.2

**Status:** SOURCE-LOCAL PARTIAL RENDERING OF `L-SSC-130`  
**Native:** `LISI_L05_SPACELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_2.isg`  
**Predecessor:** 0.1 superseded for anti-invariance semantics

## Correction

Revision 0.1 translated the source's symbolic role-exchanged anti-invariance formula back through coefficient roles a second time.

That was too literal: the reflection relations themselves already perform the role exchange.

Revision 0.2 therefore represents the invariant typed statement directly:

~~~text
T_typed(R(u)·(v,psi,chi))
    =
- T_typed(v,psi,chi)
~~~

for each of the three odd generalized-reflection types.

This is the correct role-aware scalar statement on the L128/L129 typed carriers.

## Finite controls

Using the exact frozen source tables and the actual L128 positive-spinor tilde basis:

~~~text
C:    involution 0, anti-invariance 0, even-composition 0
C':   involution 0, anti-invariance 0, even-composition 0
H:    involution 0, anti-invariance 0, even-composition 0
H':   involution 0, anti-invariance 0, even-composition 0
O':   involution 0, anti-invariance 0, even-composition 0
~~~

The exact version-of-record ordinary-O table again propagates the preserved source inconsistency into reflection identities. No repair is used.

## Remaining boundary

This still covers only `s_u=+1`.

The split time-like `s_u=-1` branch with `sqrt(s_u)=i` and the alternate anti-linear real structure remains open.
