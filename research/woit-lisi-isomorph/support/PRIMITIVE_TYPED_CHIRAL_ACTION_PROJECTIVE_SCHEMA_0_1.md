# Primitive Typed Chiral Action / Projective Homogeneity Schema 0.1

**Status:** RESEARCH-LOCAL BRIDGE SUPPORT — NOT CORE AUTHORITY  
**Native:** PRIMITIVE_TYPED_CHIRAL_ACTION_PROJECTIVE_SCHEMA_0_1.isg

## Purpose

This schema lowers B01.0 far enough to test the B01 -> B02 representation transform without using twistor, Clifford, quaternion, or either author's names as semantic primitives.

## Local IDs

| ID | Meaning | Disposition |
|---|---|---|
| 187200 | typed bilinear action V x S_minus -> S_plus | CLOSED_SCHEMA over existing field/vector support |
| 187201 | navigation alias for the homogeneous-action consequence surface | DERIVED_VIEW |
| 187202 | nonzero chiral pair predicate | CLOSED_SCHEMA |
| 187203 | simultaneous nonzero-scalar equivalence of chiral pairs | CLOSED_SCHEMA |
| 187204 | action-incidence relation on a nonzero chiral pair | CLOSED_SCHEMA |
| 187205 | projective-incidence consequence surface | DERIVED_VIEW |

## Typed bilinear action

The schema requires three vector spaces over the same abstract field: V, S_minus, and S_plus.

ACT is a total relation from V x S_minus to S_plus and preserves vector addition and scalar multiplication in each input.

This is exactly the weak B01.0 level.

It does not import Clifford square relations, a quadratic form, triality, real/Majorana conditions, dimensions, or any physical role.

## Projective pair relation

For a pair (m,p) in S_minus x S_plus, 187202 requires that the pair is not simultaneously zero.

187203 defines simultaneous projective rescaling:

~~~text
(m1,p1) ~ (m2,p2)
IFF
exists nonzero scalar a:
    m2 = a m1
    p2 = a p1.
~~~

## Projective well-definedness

187204 is the neutral incidence:

~~~text
I(v,m,p)
IFF
ACT(v,m,p)
AND
(m,p) != (0,0).
~~~

Because 187200 is linear in its chiral-spinor input:

~~~text
ACT(v,m,p)
->
ACT(v,a m,a p)
~~~

for every scalar a.

For nonzero a, 187203 therefore preserves 187204. This is the generic projective-homogeneity consequence needed by BT01.

The theorem does not identify the quotient with a particular twistor geometry.

## Source instantiation targets

Woit W01 supplies V = Hom(S_R,S_L) and ordinary linear-map application.

Lisi L05 supplies vector/chiral-spinor multiplication of the form chi = v psi and further refines it through Clifford/division multiplication.

## Current result

~~~text
B01.0 primitive/schema interface:
    CLOSED

simultaneous projective homogeneity:
    DERIVED FROM B01.0

Woit source mapping:
    SOURCE-SUPPORTED / native instantiation pending

Lisi source mapping:
    SOURCE-SUPPORTED / native instantiation pending

BT01 full twistor-incidence reconstruction:
    OPEN
~~~

## Limitation

Homogeneous pair incidence is necessary but not sufficient to identify the quotient with Woit's CP3/CP1 geometry.

Still required are Woit dimension/subspace/fibration structure, the Lisi quaternionic realization, exact quotient-to-incidence mapping, reality/signature conditions, and residual accounting.
