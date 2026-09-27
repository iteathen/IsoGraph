# Primitive natural-number and arithmetic theory 0.2 — correction audit

**Status:** unqualified successor  
**Predecessor:** `PRIMITIVE_NATURAL_ARITHMETIC_0_1.isg`

0.1 was incomplete and contained variable-wiring defects in recursive arithmetic clauses. It remains historical research evidence and is not suitable as primitive authority.

0.2 corrects:

- successor addition: `ADD(S(a),b,S(c)) IFF ADD(a,b,c)`;
- successor multiplication;
- successor exponentiation;
- explicit ONE construction;
- Peano-style induction schema over represented unary predicates;
- native Big-O expansion;
- native polynomial-growth expansion;
- native monotonicity expansion.

After 0.2, the names `ADD`, `MUL`, `POW`, `LE`, `IN_O`, `IN_O_POLY`, and `MONOTONIC` are derived relation handles whose complete behavior is represented by lower logical clauses.

They are not primitive Core operators.
