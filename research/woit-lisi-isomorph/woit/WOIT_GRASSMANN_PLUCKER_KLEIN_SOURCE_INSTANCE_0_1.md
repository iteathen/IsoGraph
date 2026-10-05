# Woit Grassmannian / Plucker / Klein Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W01 Appendix A.1 / W-SSC-047

This artifact supplies the projective `Lambda^2(C4)` side of Woit's Grassmannian description.

## Exact exterior-two-form carrier

948000 is an exact six-complex-dimensional exterior-two-form carrier for the already exact twistor vector space `T=C4`.

948011 is the exact bilinear antisymmetric wedge

```text
T x T -> Lambda^2(T)
```

with basis values:

```text
f01, f02, f03, f23, f31, f12.
```

948022 is the exact projective quotient `P(Lambda^2 T)`.

## Decomposable and Klein carriers

948030 contains exactly the represented two-forms of the form

```text
u wedge v.
```

948031 is the coordinate Klein/Plucker locus. For

```text
omega =
  a f01 + b f02 + c f03
+ d f23 + e f31 + f f12
```

the exact quadratic relation is:

```text
a d + b e + c f = 0.
```

With the convention `f31=e3 wedge e1=-f13`, this is the standard Plucker relation

```text
p01 p23 - p02 p13 + p03 p12 = 0.
```

The source instance requires exact equivalence between the decomposable carrier 948030 and the quadratic Klein carrier 948031.

948032 is the corresponding projective Klein locus.

## Plucker map

948040 maps an exact two-plane relation `S` to the projective class of

```text
e1 wedge e2
```

for an exact two-element basis of `S`.

The map is required to be an exact bijection:

```text
Gr(2,T) -> Klein locus in P(Lambda^2 T).
```

Thus the Grassmannian embedding is represented through exact finite basis/wedge/projective behavior rather than by the names “Plucker” or “Klein.”

## Boundary

This is algebraic/projective structure only.

No projective-variety topology, scheme structure, or analytic manifold structure is added.
