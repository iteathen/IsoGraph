# W-SSC-049 Alpha-Plane / Null-Separation Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes W01 Appendix A.1 / W-SSC-049.

## Global alpha-plane semantics

A projective twistor point `q` determines the exact family of Grassmannian two-planes `S` containing a nonzero representative of `q`.

This is represented by the global relation:

```text
ALPHA(q,S)
IFF
q in PT
and S in Gr(2,T)
and some nonzero t represents q with t in S.
```

## Affine determinant chart

The determinant statement uses the standard affine complex-spacetime chart represented by the full exact carrier

```text
Hom(S_R,S_L).
```

The native instance supplies exact matrix coordinates

```text
F ~ [[a,b],[c,d]]
```

relative to the frozen source spinor bases and defines

```text
det(F)=ad-bc.
```

Null separation is exactly:

```text
det(F1-F2)=0.
```

## Source theorem

Two affine spacetime points sharing a projective twistor satisfy the primitive logical implication

```text
COMMON_TWISTOR(F1,F2)
    -> NULL_SEPARATION(F1,F2).
```

No external theorem is imported; this is W01's source assertion decomposed into exact carriers, incidence relations, scalar operations, and primitive logic.

## Boundary

The alpha-plane family is global on the represented Grassmannian.

The determinant relation is the source's affine-coordinate quadratic form.

The full fractional-linear `SL(4,C)` action is not needed here and remains W-SSC-048.

No Lisi or cross-track semantics are premises.
