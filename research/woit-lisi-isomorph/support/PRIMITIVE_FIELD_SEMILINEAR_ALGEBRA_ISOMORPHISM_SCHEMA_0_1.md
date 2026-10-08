# Primitive Field / Semilinear / Involutive-Algebra Isomorphism Schema 0.1

**Status:** RESEARCH-LOCAL COMPARISON SUPPORT  
**Native:** PRIMITIVE_FIELD_SEMILINEAR_ALGEBRA_ISOMORPHISM_SCHEMA_0_1.isg

## 195120 — field isomorphism

195120 relates two independently represented field carriers by a bijective homomorphism preserving zero, one, addition, and multiplication.

This is stronger than a field embedding and does not merge the two source-local field nodes.

## 195121 — semilinear vector-space bijection

Given field isomorphism F:R0->R1, 195121 requires a bijection H:V0->V1 such that:

~~~text
H(u+v)=H(u)+H(v)
H(a v)=F(a) H(v).
~~~

This is the correct comparison notion when source vector spaces live over separately represented copies of the same scalar structure.

## 195122 — involutive algebra isomorphism

195122 applies 195121 to associative algebras and additionally preserves:
- unit;
- multiplication;
- source anti-involution/conjugation.

It therefore transports the full algebraic data needed by the BT01 quaternionic Clifford refinement.

## Scope guard

A 195120 comparison between the Woit and Lisi scalar carriers is an algebraic comparison view only.

It does not assert that the current primitive field schemas capture the analytic/topological completeness of the standard real numbers.
