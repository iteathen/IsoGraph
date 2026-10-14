# L05 Quaternion Triality Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE AXIOMATIC INSTANCE — QUATERNIONIC TRIALITY SLICE / PRE-SEAL  
**Native:** `LISI_L05_QUATERNION_TRIALITY_SOURCE_INSTANCE_0_1.isg`  
**Primary source:** L05, §§2–4.2, especially equations (4), (6), (9) and the canonical triality automorphism  
**Depends on:** `LISI_BT01_SOURCE_INSTANCE_0_1.isg`, `LISI_BT01_QUATERNION_COEFFICIENT_TRANSPORT_0_1.isg`, schema 185005/185006

## Purpose

This artifact closes the source-specific quaternionic triality slice needed by the U1 finite-chart audit without importing Woit semantics into Track L.

The rendered source roles remain:

~~~text
V        = quaternionic vector role
Q_minus  = negative real chiral spinor role
Q_plus   = positive real chiral spinor role

vector coefficient map:
    189220 : V -> H

negative-spinor coefficient map:
    189221 : Q_minus -> H

positive-spinor coefficient map:
    189222 : Q_plus -> H
~~~

The positive-spinor coefficient map retains L05's tilde basis convention.

## Source triality form

206100 is the source-local scalar triality relation.

It renders L05 equation (6):

~~~text
T(v, psi, chi)
    = (tilde(chi), v psi).
~~~

In native coefficient form:

~~~text
hv   = 189220(v)
hm   = 189221(psi)
hp   = 189222(chi)       # represented tilde(chi)
hvm  = hv * hm

T(v,psi,chi) = B(hp,hvm).
~~~

Here:
- multiplication is the exact quaternion product 189205;
- B is the source composition-algebra bilinear metric 189207;
- no Woit incidence relation or cross-reference is used.

The source trilinearity is instantiated through schema 185005.

## Canonical triality cycle

L05 gives a canonical triality automorphism:

~~~text
(v, psi, chi)
    -> (psi, chi, v),
~~~

equivalently:

~~~text
gamma_a -> Q_minus_a -> Q_plus_a -> gamma_a.
~~~

The three native role maps are:

- 206101: V -> Q_minus;
- 206102: Q_minus -> Q_plus;
- 206103: Q_plus -> V.

Because the positive-spinor representation uses the conjugated basis, the middle and final maps must carry the source anti-involution explicitly.

In coefficient language:

~~~text
V -> Q_minus:
    same H coefficient

Q_minus -> Q_plus:
    h -> KAPPA(h) in the represented tilde basis

Q_plus -> V:
    represented tilde coefficient -> KAPPA -> ordinary H coefficient.
~~~

This makes the source statement "same coefficient index under the role cycle" exact without erasing the tilde convention.

The complete cycle instantiates schema 185006, so:
- three applications return each role to itself;
- the source trilinear form is invariant under the canonical cycle.

## What this closes

At the declared quaternionic slice:

~~~text
L-A0-018 real trilinear triality form:
    SOURCE-NATIVE CLOSED SLICE

cyclic role permutation:
    SOURCE-NATIVE CLOSED SLICE

canonical order-three vector/Q_minus/Q_plus cycle:
    SOURCE-NATIVE CLOSED SLICE

L-A0-019:
    PARTIALLY CLOSED
    canonical cycle only
~~~

## What remains open

This artifact does not yet close:
- arbitrary generalized reflections R_v^u, R_m^u, R_p^u;
- arbitrary t^(uw) triality automorphisms;
- the full Tri(H) group presentation;
- tri(H)=su(2)+su(2)+su(2) as a complete Lie-algebra construction;
- the full sp(3) bracket table;
- split-quaternion variants;
- octonionic triality;
- magic-square, theta-eigenspace, or particle-model layers.

Those remain Track-L source obligations.

## Firewall

The L05 statement that the dual quaternionic relation is Euclidean twistor incidence remains quarantined.

Nothing in this artifact is derived from Woit or from U1.
