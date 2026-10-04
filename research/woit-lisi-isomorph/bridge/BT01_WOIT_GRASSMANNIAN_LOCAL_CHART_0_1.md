# BT01 Woit Grassmannian Local-Chart Reconstruction 0.1

**Status:** EXACT STANDARD-MATHEMATICAL RECONSTRUCTION SCHEMA / SOURCE-LOCAL MAPPING CANDIDATE  
**Native structural graph:** BT01_WOIT_GRASSMANNIAN_LOCAL_CHART_0_1.isg

## Problem repaired

The Woit BT01 native source instance correctly refuses to assert a global direct-sum identity between the two chiral spinor carriers.

Globally W01 has:

~~~text
S_R subset T
S_L = T / S_R
~~~

with T = C4.

There is no canonical global complement.

## Exact local construction

Fix a source two-plane:

~~~text
M = S_R subset T.
~~~

Choose a local complement C:

~~~text
T = M direct-sum C.
~~~

This is an auxiliary chart choice, not source ontology.

The quotient map q:T->T/M restricts to an isomorphism:

~~~text
q|C : C -> T/M = S_L.
~~~

Therefore every source map:

~~~text
f : S_R -> S_L
~~~

has a unique lifted map f_C:S_R->C.

Its graph is:

~~~text
G_f = { m + f_C(m) | m in S_R } subset T.
~~~

Then:

1. G_f is a complex two-plane in T.
2. G_f is transverse to C.
3. every complex two-plane transverse to C is uniquely the graph of one f.
4. Hom(S_R,S_L) is therefore a local affine chart on Gr(2,T).

This is the standard graph chart on the Grassmannian.

## Projectivization

Because G_f is a complex two-plane:

~~~text
P(G_f) = CP1.
~~~

Because T is complex four-dimensional:

~~~text
P(T) = CP3.
~~~

Thus:

~~~text
f in Hom(S_R,S_L)
    -> G_f subset T
    -> P(G_f) subset PT.
~~~

This is the missing source-faithful local transport from Woit's Hom presentation to twistor incidence.

## Native structural roles

| ID | Role |
|---|---|
| 191001 | ambient twistor vector space T |
| 191002 | base two-plane M=S_R |
| 191003 | chosen local complement C |
| 191004 | quotient Q=T/M=S_L |
| 191005 | q|C representation bijection C->Q |
| 191006 | Hom(M,Q) parameter |
| 191007 | lifted graph family |
| 191008 | projective ambient PT |
| 191009 | projective line/incidence family |
| 191010 | transverse local-chart domain |
| 191011 | source evaluation action |

The complement, quotient-bijection and graph construction are explicitly marked as auxiliary representation choices in the native graph.

## Abstraction rule

Changing the complement changes chart coordinates, not the represented two-plane.

The bridge must therefore compare the graph/incidence structure modulo chart choice, not one preferred splitting of T.

## Remaining burden

- primitive-close the local direct-sum and graph-chart semantics;
- connect Lisi's transported 187500 action to the same projective chart;
- test chart-choice invariance and residuals;
- reconstruct the global HP1 family only after the local correspondence is stable.
