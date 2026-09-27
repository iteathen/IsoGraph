# Primitive L-calculus execution theory 0.2 — correction audit

**Status:** unqualified successor  
**Predecessor:** `PRIMITIVE_L_CALCULUS_0_1.isg`

0.1 represented the main reduction topology but was incomplete for Core-0.20 primitive closure.

0.2 adds/corrects native clauses for:

- all substitution constructor cases;
- exact closedness definition from substitution;
- lambda/procedure definitions;
- the three exclusive one-step reduction cases;
- exact n-step reduction recursion;
- bounded reduction `redLe`;
- source term-size recursion.

The relation handles `SUBST`, `STEP`, `STEP_N`, `RED_LE`, `CLOSED`, `LAMBDA`, `PROC`, and `SIZE` remain derived handles. Their behavior is carried by lower logical clauses.

Remaining P-vs-NP primitive work is above/beside this file:

- encoding-function graphs;
- first-order `computesTime` specialization;
- expanded P and NP membership formulas.
