# BT01 Quaternionic Complex-Structure Lift 0.1

**Status:** STRONG MATHEMATICAL BRIDGE CANDIDATE — SOURCE-SPECIFIC NATIVE MAPPING PENDING

## Core construction

Let H be the quaternion algebra.

Choose an imaginary unit j with:

~~~text
j^2 = -1.
~~~

Right multiplication by j defines a complex structure on the underlying real vector space H.

With that choice H becomes a two-complex-dimensional vector space.

For fixed v in H, left multiplication:

~~~text
L_v(x) = v x
~~~

commutes with right multiplication by j by associativity:

~~~text
L_v(x j)
= v (x j)
= (v x) j
= L_v(x) j.
~~~

Therefore L_v is complex-linear for the chosen complex structure.

Its graph:

~~~text
Gamma_v = { (x, v x) | x in H }
~~~

is a complex two-plane in H + H, viewed as a complex four-space.

Projectivization gives:

~~~text
P(H + H)        = CP3
P(Gamma_v)      = CP1.
~~~

This is the exact abstract shape of a twistor line/incidence family.

## Woit source alignment

W01 explicitly gives:
- S4 = HP1;
- the tautological H bundle as right-handed spinors;
- PT = CP3 over HP1 with CP1 fiber;
- a CP1 fiber as complex lines inside the quaternionic line;
- complexified vectors as Hom(S_R,S_L).

Thus Woit already supplies the geometric endpoint of this construction.

## Lisi source alignment

L05 represents the quaternionic Cl(0,4) vector and real chiral spinor roles using the quaternion multiplication table.

Its division representative for the positive-chiral role is written using the conjugated basis element. In the generalized-reflection dual formula, the source gives a relation of the form:

~~~text
psi = conjugate(v) * represented_positive_spinor
~~~

and explicitly identifies the quaternionic case as Euclidean twistor incidence.

For a fixed quaternionic parameter, left multiplication is compatible with a right-chosen complex structure as above.

Exact convention matching between Woit's spinor roles and Lisi's conjugated positive-spinor representative remains a required source-local mapping step.

## Why the complex choice matters

The common real/quaternionic action alone does not produce CP3.

The extra complex structure turns:
- H from real dimension 4 into complex dimension 2;
- H + H into complex dimension 4;
- a graph Gamma_v into a complex two-plane;
- its projectivization into CP1 inside CP3.

Therefore the complex-structure selection is a **load-bearing bridge generator**, not disposable presentation detail.

## Relation to B03

This result couples BT01 to the graded-real-structure candidate B03.

The bridge is no longer simply:

~~~text
quaternion multiplication -> twistor incidence.
~~~

It is more accurately:

~~~text
real/quaternionic action
+ compatible complex structure
-> complex-linear chiral action
-> graph
-> projective incidence.
~~~

This may be the natural abstraction boundary.

## Remaining obligations

- primitive representation of the chosen complex structure on H;
- finite basis/dimension witnesses 4R = 2C;
- Lisi convention map for the conjugated positive spinor;
- Woit affine-to-compact HP1 patch/infinity reconstruction;
- source-native sign/reality guards;
- NEI and residual audit.
