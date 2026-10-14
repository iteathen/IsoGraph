# Primitive Quaternion-to-Chiral-Clifford Schema 0.1

**Status:** RESEARCH-LOCAL STRONGER BT01 SUPPORT
**Native:** PRIMITIVE_QUATERNION_CHIRAL_CLIFFORD_SCHEMA_0_1.isg

Schema 195100 converts a normed associative algebra with conjugation into the sign-correct chiral Clifford pair used by the quaternionic BT01 refinement.

It requires:
- composition/norm structure 185003;
- algebra anti-involution 188000;
- both norm/conjugation identities

~~~text
KAPPA(v) v = N(v) 1
v KAPPA(v) = N(v) 1;
~~~

- the Clifford bilinear/quadratic form to be the negatives of the composition form/norm;
- the forward chiral action to be ordinary multiplication;
- the reverse chiral action to be

~~~text
Gamma_plus(v,p) = -KAPPA(v) p.
~~~

It then instantiates 195000 with:

~~~text
Q_C(v) = -N(v).
~~~

This keeps the Cl(0,n) sign explicit instead of confusing the positive composition norm with the negative Clifford quadratic form.

No dimension, quaternion basis, Spin name, or physical interpretation is included. Source instances must separately establish that their carrier satisfies the required norm/conjugation identity.
