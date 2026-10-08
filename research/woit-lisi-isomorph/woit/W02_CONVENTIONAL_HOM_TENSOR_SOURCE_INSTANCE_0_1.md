# W02 Conventional Hom / Tensor Representation Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-130 / W-A0-049

This instance removes the remaining name-only uses of “dual spinor”, “Hom”, and “tensor representation” from the conventional W02 vector representation.

## 1. Exact dual right-spinor

947100 is an exact two-complex-dimensional carrier.

947110 is a nondegenerate bilinear pairing

```text
S_R^* x S_R -> C
```

with dual bases pinned by the Kronecker table:

```text
<e1*,e1>=1   <e1*,e2>=0
<e2*,e1>=0   <e2*,e2>=1.
```

The dual behavior is governed by W-local schema 947000; “dual” is not a navigation label.

## 2. Matrix-as-Hom presentation

947120 is an exact bilinear evaluation

```text
M2(C) x S_R^* -> S_L
```

whose matrix-unit action on the dual/source bases is the standard finite table.

Thus the exact matrix carrier used for complex spacetime is presented as linear maps from (S_R^*) to (S_L).

## 3. Tensor presentation

947130 is an exact bilinear map

```text
S_L x S_R -> M2(C)
```

with basis products:

```text
l1 tensor r1 -> E11
l1 tensor r2 -> E12
l2 tensor r1 -> E21
l2 tensor r2 -> E22.
```

This gives the finite source presentation of the ((1/2)_L tensor (1/2)_R) carrier on the same exact M2(C) object.

## Chiral symmetry

The conventional two-factor action remains the corrected W02 source action `204220: X -> g_L X g_R^{-1}`.

Because the Hom and tensor presentations use the same exact matrix carrier, no extra carrier identification is hidden.

## Boundary

This file does not add a canonical identification between (S_R) and its dual, nor topology/smooth structure, nor any right-handed replacement semantics.
