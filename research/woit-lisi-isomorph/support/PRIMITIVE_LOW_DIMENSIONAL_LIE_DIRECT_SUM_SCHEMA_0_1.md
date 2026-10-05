# Primitive Low-Dimensional Lie / Direct-Sum Schemas 0.1

**Status:** RESEARCH-LOCAL STRUCTURAL SUPPORT  
**Native:** `PRIMITIVE_LOW_DIMENSIONAL_LIE_DIRECT_SUM_SCHEMA_0_1.isg`

## 236000 — exact one-element basis

Represents a vector carrier with one basis element by explicit spanning and linear-independence clauses.

## 236001 — one-dimensional abelian Lie algebra

Requires:
- 236000;
- full Lie-algebra semantics 184004;
- every bracket to equal the represented zero.

No U(1), GL(1), topology, or group semantics are built in.

## 236002 — split sl2-type three-dimensional Lie presentation

Requires:
- exact three-element basis 207000;
- full Lie-algebra semantics 184004;
- basis `h,e,f` with

~~~text
[h,e] = 2e
[h,f] = -2f
[e,f] = h
~~~

over the supplied field.

No matrix group or global SL(2) topology is asserted.

## 236003 / 236004 — exact Lie direct sums

236003 represents a parent Lie algebra as the exact direct sum of two Lie algebras.

236004 does the same for three factors.

Both require:
- injective Lie homomorphisms 184009;
- existence and uniqueness of factor decomposition for every parent element;
- zero cross-brackets between distinct factor images.

Thus the plus sign in a source Lie-algebra decomposition is represented structurally rather than left as notation.

These schemas are domain-neutral and contain no triality, exceptional-algebra, physics, Woit, or Lisi interpretation.
