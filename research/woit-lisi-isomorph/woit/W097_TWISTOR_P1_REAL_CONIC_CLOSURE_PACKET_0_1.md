# W-SSC-097 Twistor P1 / Real Projective Conic Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes the full W05 §§1–2 source obligation, including the distinction between ordinary conjugation on `CP1` and the twistor antipodal structure.

The source-local quadratic map is represented exactly:

```text
[u:v] -> [u^2-v^2 : i(u^2+v^2) : 2uv].
```

Its image is the projective conic

```text
x^2 + y^2 + z^2 = 0.
```

The native graph contains:

- coordinatewise ordinary conjugation on the source C2 carrier and on its projective quotient;
- the already validated twistor pseudoreal map `197013` and projective involution `197034`;
- a three-complex-dimensional target vector carrier;
- the exact conic quadratic relation;
- a projective conic carrier;
- ordinary conjugation on the conic;
- a bijective projective quadratic map from `P(C2)` onto the conic;
- an explicit intertwining law identifying twistor antipodal conjugation with ordinary conjugation on the conic under that bijection;
- a pinned complex conic point;
- a no-real-point clause represented as absence of fixed conic points under ordinary projective conjugation.

Ordinary conjugation on `CP1` is separately pinned to have a fixed point, while the twistor projective involution does not. They are therefore not collapsed.

This closure is algebraic/projective only. It does not add topology, analytic geometry, or any cross-author semantics.
