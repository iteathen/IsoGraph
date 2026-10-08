# Primitive Bijection / Action-Transport Schema 0.1

**Status:** RESEARCH-LOCAL REPRESENTATION-TRANSPORT SUPPORT  
**Native:** PRIMITIVE_BIJECTION_ACTION_TRANSPORT_SCHEMA_0_1.isg

## 188100 — bijection

188100 strengthens the existing total unary relation schema 182001 by adding:

- injectivity;
- surjectivity.

No named notion of "isomorphism" is imported.

## 188101 — exact transport of a typed action

Given source carriers:

~~~text
P0 x M0 -> Q0
~~~

and target carriers:

~~~text
P1 x M1 -> Q1,
~~~

plus bijections:

~~~text
FP : P0 -> P1
FM : M0 -> M1
FQ : Q0 -> Q1,
~~~

188101 requires exact preservation and reflection of action incidence:

~~~text
A0(p0,m0,q0)
IFF
A1(FP(p0),FM(m0),FQ(q0)).
~~~

This is a representation-change schema, not a semantic identification of the source and target roles.

## BT01 use

The immediate use is Lisi's source identification:

~~~text
vector coefficients        <-> quaternion element v
negative chiral coefficients <-> quaternion element psi
positive chiral coefficients <-> conjugated quaternion representative tilde(chi)
Clifford action            <-> quaternion multiplication.
~~~

The tilde convention belongs inside FQ; it is not deleted.

The same schema can later express matrix/Pauli or other source-authorized presentations.

## Closure boundary

188101 says nothing about:
- linearity of the bijections;
- metric preservation;
- chirality identity;
- physical-role identity;
- projective compatibility.

Those must be added when load-bearing.
