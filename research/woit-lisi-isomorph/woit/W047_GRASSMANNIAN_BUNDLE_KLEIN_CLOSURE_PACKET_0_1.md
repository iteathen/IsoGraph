# W-SSC-047 Grassmannian / Bundle Fibers / Klein Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes W01 Appendix A.1 / W-SSC-047 at the frozen axiomatic boundary in `W047_ABSTRACTION_BOUNDARY_0_1.json`.

The represented structure is:

```text
T = C4

Gr(2,T)
  = all exact complex two-dimensional subspace relations S of T

tautological fiber at S
  = { t in T | S(t) }

quotient fiber at S
  = T/S
  with exact linear surjection, exact kernel S, and exact coset equivalence

tangent fiber at S
  = all exact complex-linear maps S -> T/S

Lambda^2(T)
  with exact exterior-two-form finite presentation

Klein locus
  = decomposable projective two-forms
  = projective solutions of
      p01 p23 - p02 p13 + p03 p12 = 0

Plucker map
  S -> [e1 wedge e2]
  as an exact bijection Gr(2,T) -> Klein locus.
```

The quotient semantics do not choose a complement. The reference Woit `S_R` plane is separately pinned to the existing `S_L=T/S_R` carrier.

The packet represents the named bundle structures at their load-bearing algebraic fiber-family level. It deliberately does not import unused transition functions, topology, scheme structure, or analytic manifold behavior. The abstraction boundary contains an explicit invalidation rule if later frozen source semantics make those structures load-bearing.

No Lisi or bridge semantics are premises.
