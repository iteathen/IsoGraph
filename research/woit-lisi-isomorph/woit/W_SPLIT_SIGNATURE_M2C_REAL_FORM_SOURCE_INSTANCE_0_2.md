# W Split-Signature M2(C) Real-Form Source Instance 0.2

**Status:** CURRENT W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-028 / W01 §§2.1–2.2

This instance supplies the previously missing split-signature real form of the common complex vector carrier `M2(C)`.

## Exact real matrix carrier

999000 is an exact four-dimensional real vector subspace of the qualified complex matrix carrier.

Real scalar multiplication 999003 is inherited through the exact real-to-complex field embedding.

An exact real basis is:

```text
f0 = E11 + E22
f3 = E12 - E21
f1 = E11 - E22
f2 = E12 + E21.
```

## Exact (2,2) quadratic form

999020/999021 give an exact symmetric bilinear/quadratic form with basis diagonal:

```text
(+1,+1,-1,-1)
```

in the ordered basis `(f0,f3,f1,f2)`.

The matrix determinant is required to equal the embedded real quadratic value on the split carrier.

Thus “split signature” is not a name-only role.

## Split real-form factor action

999040 is the restriction of the qualified determinant-one complex matrix group to the exact real matrix subspace.

999041 and 999042 are distinct left/right source factor roles backed by that same exact real group.

999050 is the restriction of the qualified two-factor action

```text
X -> g_L X g_R^{-1}
```

to the split carrier.

The exact split quadratic form is required to be invariant under that action.

## Boundary

This artifact represents the real-form/action semantics needed by W01's common-complexification statement.

It does not add topology or a Lie-group manifold structure.
