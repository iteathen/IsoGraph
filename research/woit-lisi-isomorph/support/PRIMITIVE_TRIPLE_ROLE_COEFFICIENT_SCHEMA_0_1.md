# Primitive Triple Role / Coefficient-Copy Schema 0.1

**Status:** RESEARCH-LOCAL REPRESENTATION SUPPORT  
**Native:** `PRIMITIVE_TRIPLE_ROLE_COEFFICIENT_SCHEMA_0_1.isg`

This schema represents a pattern in which three typed vector-space roles are separately and exactly coordinatized by one coefficient vector space.

The three revisions are finite-basis variants:

- `219000` — two-dimensional basis;
- `219001` — four-dimensional basis;
- `219002` — eight-dimensional basis.

Each requires:

1. an already represented scalar field and coefficient vector space;
2. an explicit 2/4/8-element coefficient basis;
3. three separate typed role vector spaces with explicit bases;
4. three exact linear bijections into the coefficient carrier;
5. the first two role bases map directly to the coefficient basis;
6. the third role basis maps to the image of the coefficient basis under an explicitly supplied involution/conjugation relation.

The schema does not identify the three role carriers with each other. It records representation maps only.

It also does not say what the roles mean physically or algebraically. In Track L, the third-map conjugation is used to preserve L05's tilde convention for the positive-chiral representative.

Dependencies:

- `193200` exact linear bijection;
- `182001` total unary graph;
- exact dimension schemas `187600`, `187601`, and `215000`.

No Woit, triality, Clifford, or unification semantics are built into this support.
