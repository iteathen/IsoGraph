# W-SSC-047 Grassmannian / Bundle Fibers / Klein Closure Packet 0.2

**Status:** CLOSED_SCHEMA REVALIDATED AFTER NAMESPACE REBASE  
**Predecessor:** 0.1 is historical because its 947xxx/948xxx namespace collided with pre-existing W02 owners.

All W047 semantics are unchanged. The corrected owners are:

```text
quotient / Grassmannian / tangent-Hom support: 990xxx
Plucker / Klein support:                      991xxx
```

The exact represented source structure remains:

- all complex two-planes `S subset T=C4`;
- tautological incidence;
- exact quotients `T/S`;
- tangent fibers `Hom(S,T/S)`;
- exact exterior-two-form carrier;
- decomposable/Klein locus;
- projective Plucker bijection.

The frozen abstraction boundary `W047_ABSTRACTION_BOUNDARY_0_1.json` is unchanged.

Successor verifier: `tools/verify_w047_grassmannian_bundle_klein_closure_0_2.mjs`.

No Lisi or bridge semantics are premises.
