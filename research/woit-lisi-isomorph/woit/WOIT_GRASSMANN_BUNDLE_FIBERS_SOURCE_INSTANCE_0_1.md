# Woit Grassmannian Bundle-Fiber Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W01 Appendix A.1 / W-SSC-047

This instance supplies the algebraic fiber-family semantics behind Woit's tautological, quotient, and tangent-Hom bundle statements over the exact two-plane carrier.

## Tautological incidence

947210 is defined exactly by:

```text
TAUT(S,t)
IFF
S is an exact complex two-plane in T
and t belongs to S.
```

Thus the tautological fiber over a represented Grassmannian point is the plane itself.

## Quotient family

947101, from the standard twistor quotient instance, assigns exact quotient packages:

```text
Q = T/S
```

with linear surjection, exact kernel, coset equivalence, and complex dimension two.

## Tangent-Hom family

947200 instantiates the complete Hom-family schema 947005.

For each represented quotient package, it supplies a carrier `HSET` satisfying:

```text
HSET(F)
IFF
F is an exact complex-linear map S -> T/S.
```

This is the algebraic source meaning of:

```text
Tangent_S Gr(2,T) = Hom(S,T/S).
```

947220 is the concrete Hom carrier for the reference source plane `S_R` and quotient `S_L=T/S_R`.

## Boundary

The artifact represents exact fibers and incidence.

It does not yet assert topological or holomorphic local triviality of the bundles. It also does not include the Klein/Plucker projective embedding, which is a separate remaining W-SSC-047 burden.
