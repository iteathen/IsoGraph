# Primitive Direct-Sum / One-Point-Chart Schemas 0.1

**Status:** RESEARCH-LOCAL STRUCTURAL SUPPORT  
**Native:** PRIMITIVE_DIRECT_SUM_ONE_POINT_CHART_SCHEMA_0_1.isg

## 201000 — exact vector-space direct sum

Given vector spaces A, B, and T over the same field plus linear injections IA and IB, 201000 requires every t in T to have one and only one decomposition:

~~~text
t = IA(a) + IB(b).
~~~

This is a finite axiomatic representation of:

~~~text
T = A direct-sum B.
~~~

No basis choice or coordinate chart is privileged.

## 201001 — carrier plus one distinguished point

Given a carrier X and a larger carrier Y, 201001 represents:

~~~text
Y = AFF(X) union {INF}
~~~

with:
- AFF:X->Y total and injective;
- INF in Y;
- INF outside the image of AFF;
- every element of Y either INF or uniquely represented through AFF.

This is a set-level one-point chart extension.

It deliberately does **not** assert topology, compactness, or sphere structure.

## BT01 use

201000 supports Woit's source presentation:

~~~text
T = S_R direct-sum S_L
~~~

in a chosen global spinor presentation.

201001 supports W01's explicit affine quaternion coordinate plus distinguished infinity presentation of HP1 while leaving the topological identification HP1=S4 as a separate obligation.
