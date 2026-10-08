# Primitive Parameterized Projective Action Schema 0.1

**Status:** RESEARCH-LOCAL BRIDGE SUPPORT — NOT CORE AUTHORITY  
**Native:** PRIMITIVE_PARAMETERIZED_PROJECTIVE_ACTION_SCHEMA_0_1.isg  
**Dependency:** PRIMITIVE_TYPED_CHIRAL_ACTION_PROJECTIVE_SCHEMA_0_1.isg

## Purpose

This schema is the first exact neutral form of the B01 -> B02 transform.

It converts a typed homogeneous chiral action into a parameterized projective incidence family without naming twistors, Clifford algebras, quaternions, Woit, or Lisi.

## 187206 — quotient of nonzero chiral pairs

Start with two vector carriers S_minus and S_plus over the same field.

A pair (m,p) is admissible when it is not simultaneously zero.

Two pairs are equivalent exactly when a nonzero scalar rescales both components simultaneously.

187206 introduces a quotient carrier Q and an exact class relation:

~~~text
CLASSOF(m,p,q).
~~~

Requirements:
- every admissible pair has exactly one quotient class;
- every quotient class has a representative;
- represented class tuples use admissible pairs;
- two representatives have the same class iff they are related by simultaneous nonzero scaling.

This is an axiomatic quotient schema; it does not materialize the continuum of classes.

## 187207 — parameterized projective incidence

For a typed action ACT : V x S_minus -> S_plus, define:

~~~text
PINC(v,q)
IFF
there exists an admissible pair (m,p)
such that
    CLASSOF(m,p,q)
    AND
    ACT(v,m,p).
~~~

The earlier homogeneity result ensures this incidence is independent of the chosen representative of q.

Thus each v selects a projective subset:

~~~text
L_v = { q in Q | PINC(v,q) }.
~~~

## Relation to the graph of a linear map

For fixed v, ACT(v,-) is linear.

Before quotienting, the satisfying pairs are exactly the graph of this linear map:

~~~text
Gamma_v = { (m, ACT(v,m)) }.
~~~

The projective subset L_v is the projectivization of Gamma_v.

This is the algebraic-to-geometric representation transform at the center of BT01.

## Dimension-specific refinement

If later source instantiation proves:

~~~text
dim_C S_minus = 2
dim_C S_plus  = 2,
~~~

then the pair space has complex dimension four and Gamma_v has complex dimension two.

After projectivization:

~~~text
P(pair space) has CP3 shape
P(Gamma_v)    has CP1 shape.
~~~

Those dimension statements are NOT supplied by this schema. They remain source-specific proof obligations.

## Woit interpretation

W01 gives:
- S_R and S_L as complex two-dimensional spinor spaces;
- vectors as Hom(S_R,S_L);
- twistor space T as complex four-dimensional;
- a spacetime point as a complex two-plane;
- projective twistor geometry based on CP3 with CP1 incidence/fibers.

The source-local mapping is therefore expected to identify Gamma_v/projectivization with the appropriate twistor incidence family after its exact coordinate/subspace map is reconstructed.

## Lisi interpretation

L05 gives vector/chiral-spinor multiplication and explicitly states that in the quaternionic case the resulting relation is Euclidean twistor incidence.

That source statement is external validation, not an axiom of this neutral schema.

## Current disposition

~~~text
generic B01 -> projective-family transform:
    SCHEMA-CLOSED

dimension-specific CP3/CP1 result:
    OPEN

Woit exact reconstruction:
    OPEN

Lisi quaternionic source instantiation:
    OPEN

cross-track isomorphism:
    NOT CLAIMED
~~~
