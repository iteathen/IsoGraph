# BT01 Exact Quaternionic Matrix-Action Alignment 0.1

**Status:** VERY STRONG PRE-SEAL REPRESENTATION ALIGNMENT  
**Date:** 2026-10-03  
**Admission status:** not yet a cross-track theorem because full source tracks are not sealed.

## 1. Independent Woit representation

W01 represents a Euclidean four-vector by:

~~~text
x = x0 I - i(x1 sigma1 + x2 sigma2 + x3 sigma3).
~~~

It then complexifies the vector carrier to all M(2,C) and identifies:

~~~text
V_C = Hom(S_R,S_L).
~~~

So the same 2x2 matrix acts by ordinary evaluation:

~~~text
s_R |-> x s_R.
~~~

## 2. Independent Lisi representation

For the quaternionic Cl(0,4)/sp(3) case L05 chooses:

~~~text
e0 = I
e1 = -i sigma1
e2 = -i sigma2
e3 = -i sigma3.
~~~

Thus a quaternion vector:

~~~text
v = v0 e0 + v1 e1 + v2 e2 + v3 e3
~~~

has matrix representative:

~~~text
rho(v)
 = v0 I - i(v1 sigma1 + v2 sigma2 + v3 sigma3).
~~~

This is coefficient-for-coefficient the same matrix formula as Woit's Euclidean x.

L05 also gives:

~~~text
tilde(chi) = v psi
    <->
chi = Gamma(v) psi,
~~~

with the Q_plus coefficient carrier represented using the conjugated basis tilde(e_b).

## 3. Exact parameter alignment candidate

Under the coefficient identification:

~~~text
x_a = v_a,
~~~

the parameter representations satisfy:

~~~text
rho_W(x) = rho_L(v).
~~~

No nontrivial basis change is required at this level.

This is stronger than:
- equal dimension;
- abstract quaternion isomorphism;
- shared Spin(4) terminology.

It is an exact match of the two independently chosen source matrix presentations.

## 4. Chiral action alignment

Using the Spin(4) role map already isolated:

~~~text
Q_minus <-> S_R
Q_plus  <-> S_L,
~~~

the actions have the same typed shape:

~~~text
Woit:
    rho_W(x) : S_R -> S_L

Lisi:
    Gamma(v) : Q_minus -> Q_plus.
~~~

In the quaternion coefficient presentation, Gamma(v) is left multiplication by v.

After the source representation maps:

~~~text
rho_W(x) s_R
    <->
rho_L(v) psi.
~~~

The output-side Lisi tilde convention is not deleted; it is carried by the representation map:

~~~text
Q_plus coordinate chi
    <-> division representative tilde(chi).
~~~

## 5. Spin(4) action compatibility

Woit's source action is:

~~~text
x -> g_L x g_R^{-1}.
~~~

Lisi's quaternionic Cl(0,4) sector splits:

~~~text
so(4) = su(2)_M + su(2)_P
~~~

with Q_minus and Q_plus carrying the two chiral factors and gamma transforming under both.

The current action-oriented role map is therefore:

~~~text
su(2)_M <-> su(2)_R
su(2)_P <-> su(2)_L
Q_minus  <-> S_R
Q_plus   <-> S_L.
~~~

Exact group-level phase/sign conventions remain a reconstruction obligation, but the representation skeleton and vector action agree.

## 6. What this changes

BT01 no longer rests primarily on Lisi's explicit statement that the quaternionic relation is Euclidean twistor incidence.

Even before using that cross-reference, the independent source formulas now give:

~~~text
same real 4-parameter quaternion/Euclidean carrier
-> same 2x2 complex matrix realization
-> same cross-chiral typed matrix action.
~~~

Lisi's explicit twistor statement becomes a validation of a correspondence that the source-side structural reduction independently predicts.

## 7. Remaining boundary

Still not proved:
- exact global projective/twistor reconstruction from one affine matrix chart;
- exact positive-spinor tilde-to-Woit S_L representation map at the primitive level;
- full source reconstruction outside this scoped representation;
- NEI SAME;
- theory or physical-role equivalence.

## Current disposition

~~~text
parameter matrix presentation:
    EXACT SOURCE-FORMULA ALIGNMENT CANDIDATE

typed chiral matrix action:
    STRONG SOURCE-SUPPORTED ALIGNMENT

Spin(4) chiral role map:
    STRONG SOURCE-SUPPORTED CANDIDATE

twistor incidence transform:
    STRONG / GLOBAL-SCOPE AUDIT OPEN

full Woit-Lisi isomorphism:
    NOT CLAIMED
~~~
