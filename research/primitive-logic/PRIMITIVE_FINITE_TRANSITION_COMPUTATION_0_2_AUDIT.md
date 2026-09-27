# Primitive finite transition computation 0.2 — closure audit

**Status:** unqualified successor
**Predecessor:** `PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_1.isg`

0.2 closes native semantics that were prose-only in 0.1:

- transition tuple typing;
- no outgoing transitions from the two terminal state identities;
- total outgoing transition existence for every nonterminal listed state and tape symbol;
- deterministic uniqueness clause as a separately available constraint;
- exact input-bit-list recursion;
- initial configuration cases;
- full one-step tape movement cases;
- exact-n repeated transition recursion;
- polynomial-bound-function formula.

All names used in this audit are explanatory only.

Native relation objects `8020` through `8024` are transparent defined predicates. Their support is the displayed primitive logic in the .isg file; none is an authoritative leaf.

The P-vs-NP terminal formula may reference these relation identities only with this file in the same primitive bundle, so deletion/inlining of the handles preserves semantics.
