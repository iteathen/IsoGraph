# Primitive Split-Graph / Projective Local-Chart Schema 0.1

**Status:** RESEARCH-LOCAL SCHEMA-CLOSED SUPPORT  
**Native:** PRIMITIVE_SPLIT_GRAPH_PROJECTIVE_CHART_SCHEMA_0_1.isg

## Purpose

193000 primitive-closes the finite semantics needed for the local Grassmannian graph chart used in BT01.

It avoids extensional enumeration of:
- all two-planes;
- all projective points;
- the Grassmannian;
- the projective continuum.

## Inputs

193000 represents:
- one scalar field C;
- ambient vector space T;
- two linear subspace predicates M and P;
- an arbitrary parameter carrier PARAM;
- a typed action ACT : PARAM x M -> P;
- the projective quotient of nonzero T;
- graph incidence GINC;
- projective graph incidence PINC.

## Split condition

M and P are subspaces of T with:

~~~text
M intersection P = {0}
~~~

and every t in T has a unique decomposition:

~~~text
t = m + p
m in M
p in P.
~~~

Thus T is represented as a chosen direct-sum chart.

The schema does not claim the choice is canonical.

## Parameterized linear map

ACT is total on PARAM x M with outputs in P.

For every fixed parameter v, ACT(v,-) preserves:
- addition;
- scalar multiplication.

So each v determines a linear map M -> P.

## Graph incidence

GINC(v,t) is defined exactly by:

~~~text
exists m,p:
    m in M
    p in P
    ACT(v,m,p)
    t = m + p.
~~~

This is the graph of the selected linear map inside T.

## Projective incidence

The schema imports the exact projective quotient 186004 for T.

PINC(v,q) holds exactly when q has a nonzero representative t satisfying GINC(v,t).

Thus each parameter selects a projective graph subset.

## Core-0.21 disposition

~~~text
local split/chart semantics:
    CLOSED_SCHEMA

projective quotient:
    CLOSED_SCHEMA through 186004

specific Woit source instantiation:
    separate obligation

chart-choice invariance:
    separate obligation

global Grassmannian/fibration reconstruction:
    separate obligation
~~~

The schema closes the generating semantics, not all global consequences.
