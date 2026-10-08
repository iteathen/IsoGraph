# BT01 Graph-Projectivization Common Core 0.3

**Status:** CURRENT STRONG PRE-SEAL COMMON-CORE CANDIDATE  
**Supersedes:** BT01_GRAPH_PROJECTIVIZATION_COMMON_CORE_0_2.md

## Current lowest invariant

The bridge now starts below a preselected complex presentation.

Represent:
- a parameter carrier V;
- two chiral carriers S_minus and S_plus over a real/algebraic base;
- square-minus-one structure maps J_minus and J_plus;
- a parameterized action A_v linear in the chiral argument;
- the intertwiner law:

~~~text
A_v J_minus = J_plus A_v.
~~~

This is native schema 187500.

Under a source-authorized complex interpretation of J_minus and J_plus, A_v becomes complex-linear.

Then the already represented chain applies:

~~~text
187500
-> derived 187300 complex-linear action
-> graph Gamma_v
-> nonzero-pair quotient 187206
-> projective incidence 187207.
~~~

## Why this frontier is better

It preserves the exact distinction that emerged from the source check:
- the Euclidean/quaternionic parameter need not share the spinors' complex scalar structure;
- the two chiral carriers need not inherit complex structure in the same way;
- quaternionic handedness/conjugation remains visible;
- projectivization occurs only after the compatible complex presentation is justified.

## Woit source support

W01:
- Euclidean vectors are a real subspace of M(2,C);
- complexified vectors are Hom(S_R,S_L);
- twistor points use complex two-planes in C4.

W05:
- H is displayed in C2 coordinates;
- left multiplication by j supplies the pseudoreal twistor map;
- C4 is identified with H2;
- CP3 fibers over HP1 with CP1 fibers.

## Lisi source support

L05:
- quaternionic multiplication supplies real chiral Clifford representatives;
- vector and real chiral spinors are coefficient-matched to quaternion elements;
- the Pauli representation turns quaternionic matrices into complex matrices;
- the quaternionic dual relation is explicitly identified as Euclidean twistor incidence.

## Outstanding theorem burden

The remaining central obligation is an explicit source-local pair:

~~~text
J_minus^W, J_plus^W
J_minus^L, J_plus^L
~~~

and a mapping showing that the two source actions instantiate the same neutral 187500 structure under the declared comparison view.

No program-level equivalence follows from success.
