# W05 Real Projective Conic Source Instance 0.2

**Status:** CURRENT W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-097  
**Predecessor:** 0.1 rejected before closure promotion

This source instance renders the W05 statement that the twistor antipodal real form of `CP1` is equivalently represented by the real projective conic

```text
x^2 + y^2 + z^2 = 0
```

with complex points but no real points.

## Exact quadratic map

The projective map is induced from

```text
[u:v] -> [u^2-v^2 : i(u^2+v^2) : 2uv].
```

The native graph represents the source and target vector spaces, their projective quotients, the exact quadratic vector map, the conic equation, and a bijection from `P(C2)` onto the conic.

## Real structures

Two distinct real structures are represented.

1. **Ordinary conjugation on P(C2)** is induced from coordinatewise scalar conjugation. A concrete projective point from the first basis vector is fixed.
2. **Twistor antipodal structure** is the already source-native pseudoreal map `197013` / projective involution `197034`, with no projective fixed points.

On the conic, ordinary coordinatewise conjugation induces a projective involution with no fixed conic point.

The quadratic projective bijection intertwines:

```text
twistor antipodal rho_tw
<->
ordinary conjugation on x^2+y^2+z^2=0.
```

Thus the phrase “same real form” is represented by an exact conjugation-intertwining projective bijection rather than a name-level analogy.

## Scope guards

- No topology of the conic is added beyond the exact algebraic/projective presentation.
- No use is made of Lisi or cross-track semantics.
- The conic has complex points by a pinned image of the first source projective basis point.
- The no-real-point clause is encoded as absence of fixed points under ordinary projective conjugation.

Revision 0.2 differs from 0.1 only by declaring the projective-equivalence relation `946036`, which 0.1 passed to the quotient schema without declaring.
