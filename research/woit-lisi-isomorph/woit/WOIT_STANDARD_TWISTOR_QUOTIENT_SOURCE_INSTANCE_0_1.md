# Woit Standard Twistor Quotient Family Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source targets:** W01 Appendix A.1; W02 §II

This instance applies the W-local quotient/Grassmannian schema to the already exact twistor carrier `T=C4`.

## Full two-plane family

947100 is the source family of all exact complex two-dimensional subspace relations in the exact four-complex-dimensional carrier 202100.

Thus a member of 947100 is represented behaviorally as:

```text
S subset T
dim_C S = 2.
```

No complement is chosen.

947101 is the family of exact two-dimensional quotient packages required for every such plane.

For each represented plane `S`, a package gives:

```text
Q = T/S
projection T -> Q
coset equivalence on T
dim_C Q = 2.
```

## Reference Woit spinor plane

947110 is the exact image of the source right-spinor injection

```text
S_R -> T.
```

It is explicitly admitted as a member of the full two-plane family.

947111 is the quotient projection for this reference plane. Using the existing exact direct-sum presentation only as a source witness for the map, it sends

```text
i_R(s) + i_L(l) -> l.
```

The quotient schema, not the direct-sum choice, supplies the authoritative semantics:

```text
kernel(947111) = 947110
947111 is linear and surjective
S_L ~= T / S_R.
```

947112 is the exact coset equivalence relation induced by the quotient.

## Boundary

The full two-plane and quotient-family semantics are source ontology.

The reference direct-sum decomposition is used only to pin Woit's already existing `S_L` carrier to the quotient of the reference `S_R` plane.

This file does not assert that every twistor point has a canonical complementary `S_L` subspace.

It also does not yet represent the tangent fibers `Hom(S,T/S)`, the tautological bundle as a bundle object, or the Klein/Plucker embedding.
