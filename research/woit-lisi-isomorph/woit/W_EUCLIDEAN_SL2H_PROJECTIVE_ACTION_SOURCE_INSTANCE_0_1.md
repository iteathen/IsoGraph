# W Euclidean SL(2,H) Projective Action Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source targets:** W-SSC-053, W-SSC-071, W-SSC-094

This source instance represents the projectively load-bearing Euclidean real-form action on

```text
T = C4 = H2.
```

## Exact source group/action

998100–998104 form an exact group with an exact complex-linear representation on the qualified twistor carrier 202100.

The action is required to commute with the exact quaternionic/pseudoreal structure 943000.

Thus the source group acts quaternionic-linearly on the represented H2 structure.

## Quaternion matrix chart

Each group element has a unique source coefficient tuple

```text
(a,b,c,d) in H^4.
```

The exact action on H2 is pinned by

```text
(x,y) -> (a x + b y, c x + d y).
```

The group action and coefficient chart are therefore not independent opaque labels.

## Projective and HP1-role actions

998110 is the exact induced action on `PT=P(T)`.

998120 is the exact induced action on the W023 Euclidean base, defined through equivariance of the twistor projection.

A source-local quaternion inverse relation 998141 is defined by exact two-sided multiplication and is total on nonzero real quaternions.

998142 gives the complete one-point affine chart:

```text
x -> (a x+b)(c x+d)^-1
```

when the denominator is nonzero;

```text
x -> infinity
```

when the denominator vanishes;

and

```text
infinity -> a c^-1
```

for invertible `c`, otherwise infinity when `c=0`.

The exact base action 998120 is required to equal this fractional chart.

## Abstraction boundary

The corresponding frozen boundary is `W_EUCLIDEAN_SL2H_PROJECTIVE_ACTION_BOUNDARY_0_1.json`.

At this boundary, the source name `SL(2,H)` denotes the exact quaternionic-linear/projective/fractional behavior above. A particular Dieudonne-determinant normalization, group topology, and the Spin(5,1) covering topology are intentionally not imported because they are not load-bearing for W053/W071/W094.

No Lisi or cross-track semantics are used.
