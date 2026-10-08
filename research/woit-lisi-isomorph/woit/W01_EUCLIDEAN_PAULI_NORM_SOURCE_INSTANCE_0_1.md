# W01 Euclidean Pauli / Quaternion Norm Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE — CANDIDATE FOR W-SSC-026

This artifact supplies the missing exact W01 relation among the Euclidean quaternion carrier, the Pauli-matrix realization, matrix determinant, and the positive quaternion norm.

## Real/positive side

- 942001 instantiates the W-local ordered-field interface on the frozen W real scalar carrier.
- 942011 is the exact quaternion norm from `x KAPPA(x)=N(x) 1` through schema 195110.
- 942011 is required to be positive-definite through schema 941001.

No completeness or topology is added.

## Exact M2(C) side

The artifact builds a finite matrix-unit algebra and determinant over the existing W source complex field, then constructs:

```text
sigma1 = E12 + E21
sigma2 = -i E12 + i E21
sigma3 = E11 - E22
```

The exact real-linear source embedding is pinned by:

```text
1 -> I
i -> -i sigma1
j -> -i sigma2
k -> -i sigma3
```

which is W01's Euclidean Pauli/quaternion formula.

## Determinant/norm identity

For every source Euclidean quaternion/vector h and represented matrix m:

```text
det(m) = embed_R_to_C(N_H(h)).
```

Since `N_H` is exactly the conjugation/product norm and is positive-definite in the source real order, this closes the previously missing algebraic content of W-SSC-026 once its recursive dependency packet passes.

No W02 physical semantics or Lisi semantics are premises.
