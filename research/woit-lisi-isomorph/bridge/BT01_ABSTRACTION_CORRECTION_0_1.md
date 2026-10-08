# BT01 Abstraction Correction 0.1

**Status:** APPLIED  
**Date:** 2026-10-03

## Problem found

BT01 common-core 0.1 used a typed bilinear action over one common scalar field for:
- the parameter/vector carrier;
- the first chiral carrier;
- the second chiral carrier.

Dimension/reality checking showed that this is unnecessarily strong at the Woit/Lisi Euclidean-quaternionic boundary.

Woit naturally has a real/quaternionic Euclidean vector parameter and complex spinor carriers after a complex structure is selected.

Lisi's quaternionic Clifford construction is initially real and obtains the twistor interpretation only after the compatible complex/projective structure is considered.

## Repair

The bridge frontier is weakened from:

~~~text
V, S_minus, S_plus all vector spaces over C
A bilinear over C
~~~

to:

~~~text
V is a parameter carrier
S_minus, S_plus are vector spaces over C
for each v in V:
    A_v is C-linear.
~~~

This is schema 187300.

Projectivization depends only on linearity in the chiral-pair variable, so no bridge information is lost.

## Why this is a stronger research result

The correction removes an unnecessary identification instead of forcing the sources to fit it.

It separates:
- real/quaternionic parameter geometry;
- chosen complex spinor structure;
- projective incidence.

That separation is itself load-bearing for Euclidean twistor geometry.

## Historical artifacts

The following remain valid stronger candidate artifacts and are not rewritten:
- 187200 typed bilinear action;
- BT01_GRAPH_PROJECTIVIZATION_COMMON_CORE_0_1.md.

The current successor is BT01_GRAPH_PROJECTIVIZATION_COMMON_CORE_0_2.md.
