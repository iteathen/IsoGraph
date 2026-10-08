# W01 Minkowski Anti-Hermitian Affine Coordinate Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-052 / W01 Appendix A.3.2

This instance bridges the convention used by the current Hermitian (M_2(C)) Minkowski-vector source instance to W01's anti-Hermitian affine-coordinate convention.

## Anti-Hermitian carrier

996100 is defined exactly by:

```text
A in M2(C)
and
A^dagger = -A.
```

No name-only “anti-Hermitian matrix” node is used.

## Convention map

996110 is defined exactly by

```text
A = i X
```

for a Hermitian matrix (X).

It is also required to be a bijection:

```text
Hermitian M2(C) <-> anti-Hermitian M2(C).
```

Thus W01's and W02's affine conventions are related by an explicit exact carrier map rather than silently identified.

## Minkowski affine coordinates

996120 composes the exact Minkowski-vector embedding 204151 with 996110:

```text
v -> X(v) -> i X(v).
```

This provides W01's anti-Hermitian affine Minkowski-coordinate presentation while preserving the already-qualified Minkowski quadratic/determinant structure.

## Boundary

- This file changes convention only; it does not identify Euclidean and Minkowski real forms.
- The SU(2,2) projective-orbit structure is supplied independently by W014.
- Minkowski projective reality/chiral exchange is supplied independently by W100.
- No Lisi or cross-track semantics are used.
