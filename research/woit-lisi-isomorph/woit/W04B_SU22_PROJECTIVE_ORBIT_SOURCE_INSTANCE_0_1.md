# W04b SU(2,2)-Role Projective Orbit Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Primary targets:** W-SSC-014, W-SSC-069, W-SSC-093; compositional support for W-SSC-007

The native instance represents the load-bearing Minkowski-twistor real-form behavior at the frozen boundary `W_SU22_PROJECTIVE_ORBIT_ABSTRACTION_BOUNDARY_0_1.json`.

## Hermitian form

995110 is an exact Hermitian form on the exact twistor carrier `T=C4`.

On the exact source basis it is pinned to:

```text
diag(+1,+1,-1,-1).
```

Its diagonal values are required to lie in the exact embedded ordered-real scalar line.

## Source SU(2,2) role

995100 is an exact group carrier with group multiplication, inverse, identity, and a complex-linear action 995104 on T.

The action preserves 995110 exactly.

This is the source-role behavior actually used by the orbit statements. Matrix determinant, Lie-group topology, and the Spin double-cover construction are outside the frozen boundary unless a later obligation makes them load-bearing.

## Projective action and orbit split

995120 is the projective action induced from the vector action.

995130, 995131, and 995132 are the positive, negative, and null projective strata defined by the sign of the Hermitian diagonal value through the exact ordered-real embedding.

The three strata are required to:
- partition PT;
- be pairwise disjoint;
- be invariant under the represented group action;
- each be transitive under that action.

Thus “positive/negative/null orbits” is represented as actual orbit behavior rather than a label.

## Compactified Minkowski point carrier

995140 is the exact carrier of complex two-planes S in T for which every represented vector is Hermitian-null.

Every projective line represented by such a plane lies in 995132.

This is the algebraic incidence needed for W04b's compactified-Minkowski-point / null-twistor statement.

## Scope

The light-ray/celestial-sphere interpretation may be attached as source role metadata, but no differential geometry for that role is imported by this instance.
