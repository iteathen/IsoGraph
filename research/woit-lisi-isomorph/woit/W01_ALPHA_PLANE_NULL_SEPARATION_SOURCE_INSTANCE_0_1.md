# W01 Alpha-Plane / Null-Separation Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-049 / W01 Appendix A.1

This artifact renders both clauses of the frozen W01 alpha-plane assertion.

## Global alpha-planes

993013 is exact projective twistor / spacetime-plane incidence:

```text
INC(q,S)
IFF
q is a projective twistor point,
S is an exact complex two-plane in T=C4,
and q has a nonzero representative t with t in S.
```

993015 is the corresponding alpha-plane relation:

```text
ALPHA(q,S) IFF INC(q,S).
```

Thus an alpha-plane determined by a projective twistor point is the represented family of compactified complex-spacetime points incident with that twistor.

## Full affine Hom chart

The affine chart uses `990220`, the corrected W047 carrier of **all** exact complex-linear maps

```text
F : S_R -> S_L.
```

It is not an arbitrary parameter subset.

993010 gives exact evaluation.

993011 gives graph-vector membership in the exact direct-sum twistor carrier.

993012 is a total graph map from every affine Hom point to its represented Grassmannian two-plane, with exact extensional graph membership.

993014 is affine point / projective-twistor incidence through that graph plane.

## Determinant quadratic form

993020 gives the unique matrix coordinates

```text
F ~ [[a,b],[c,d]]
```

relative to the frozen source spinor bases.

993021 defines the determinant quadratic form

```text
det(F)=ad-bc.
```

993022 defines null separation of two affine spacetime points by

```text
det(F1-F2)=0.
```

## Source theorem

993016 says two affine spacetime points share a projective twistor exactly when some projective twistor is incident with both graph planes.

The source assertion is rendered directly in primitive logic:

```text
COMMON_TWISTOR(F1,F2)
    -> NULL_SEPARATION(F1,F2).
```

This is a decomposition of W01's asserted theorem, not a separate proof imported from external geometry.

## Boundary

The alpha-plane carrier is global on the represented Grassmannian.

The determinant statement is rendered on W01's standard affine Hom chart, where the source determinant quadratic form is defined.

No fractional-linear SL(4,C) action is introduced here; that remains W-SSC-048.
