# W02 Conventional Complex / Lorentz / Euclidean Real-Form Source Instance 0.2

**Status:** CURRENT SOURCE-LOCAL ALGEBRAIC REAL-FORM INSTANCE — GROUP IDENTITY CORRECTED  
**Source:** W02 §I  
**Predecessor:** 0.1 rejected as current closure support

## Correction

The determinant-one and special-unitary group schemas take the matrix identity `MONE`.

The exact M2(C) source instance defines:

```text
204116 = I = E11 + E22
204120 = E22
```

Revision 0.1 incorrectly supplied 204120 as the identity to the determinant-one group schema and to the transported Lorentz actions.

Revision 0.2 replaces those identity arguments with 204116 while preserving all source carriers, group roles, actions, and real-form conditions.

## Retained source semantics

- determinant-one complex matrix group;
- distinct SL(2,C)_L and SL(2,C)_R roles;
- conventional complex action `X -> g_L X g_R^{-1}`;
- conjugate-diagonal Minkowski real form;
- Hermitian Minkowski action and transported vector action;
- determinant-one unitary subgroup;
- independent SU(2)_L and SU(2)_R Euclidean roles.

No topology or smooth Lie-group structure is added.
