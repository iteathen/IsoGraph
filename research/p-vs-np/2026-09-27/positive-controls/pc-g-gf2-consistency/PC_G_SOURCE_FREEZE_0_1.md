# PC-G source freeze 0.1 — GF(2)-form linear consistency

**Status:** frozen source semantics for an algorithm-hidden positive control
**Control ID:** PC-G
**Human-facing family label:** finite GF(2)-linear consistency
**Discovery input policy:** formula semantics only; no solving procedure is admitted here.

The human-facing GF(2) label is navigation only. The authoritative native rendering expands the Boolean parity semantics.

## 1. Input

One instance consists of:

- a finite list `VL` of raw variable identities;
- a finite list `EL` of raw equation identities;
- a closed-world binary relation `COEF(e,x)`;
- a closed-world unary relation `RHS1(e)`.

Interpret:

```text
COEF(e,x) present  -> coefficient bit 1
COEF(e,x) absent   -> coefficient bit 0

RHS1(e) present    -> right-hand bit 1
RHS1(e) absent     -> right-hand bit 0.
```

Well-formedness requires:

1. every represented coefficient endpoint to occur in the corresponding equation/variable lists;
2. every represented RHS1 equation to occur in `EL`;
3. `VL` contains no repeated variable identity;
4. `EL` contains no repeated equation identity.

The duplicate-free requirement makes each listed variable exactly one coordinate of the source parity expression rather than silently counting a coordinate multiple times.

## 2. Witness assignment

A witness is a finite list `w` of variables interpreted extensionally:

```text
X_w(x)=1 IFF MEMBER(x,w).
```

Every witness member occurs in `VL`.

With:

```text
n=LENGTH(VL)
k=LENGTH(w),
```

require:

```text
k <= n.
```

Duplicate occurrences and order do not alter assignment membership.

## 3. Boolean operations

Boolean values are exactly:

```text
0
1.
```

Product of coefficient and assignment bits is ordinary Boolean AND.

XOR is exactly the finite relation:

```text
0 XOR 0 = 0
0 XOR 1 = 1
1 XOR 0 = 1
1 XOR 1 = 0.
```

No algebraic law beyond this table is source-explicit.

## 4. Equation parity

For equation `e`, traverse the explicit variable list and XOR the terms:

```text
COEF(e,x) AND X_w(x).
```

The empty XOR value is 0.

Equation `e` is satisfied exactly when this finite parity equals its RHS bit.

The source semantics is independent of the chosen parenthesization because the source defines the intended finite parity recursively in `VL` order.

## 5. Truth condition

The control relation is TRUE exactly when:

```text
exists witness list w:

    every member of w occurs in VL

AND

    LENGTH(w) <= LENGTH(VL)

AND

    every equation in EL has parity equal to its RHS bit.
```

## 6. Closed-world authority

The represented COEF and RHS1 tuples are their complete extensions for the frozen instance.

There are no hidden coefficients or right-hand bits.

## 7. Bounded-existential shape

The witness is a bounded finite Boolean assignment encoded by list membership.

No deterministic existential-elimination mechanism is supplied by the source.

## 8. Withheld structure

The discovery input MUST NOT contain or name:

- row reduction;
- Gaussian elimination;
- echelon form;
- pivot selection;
- a linear-system rank test;
- a precomputed basis;
- a canonical solution constructor;
- a contradiction row obtained by normalization.

Any such structure must be derived after primitive source freeze.

## 9. Truth classification

This control is selected because the represented family has a standard deterministic polynomial solution, but that solution is not part of the discovery input.

This control makes no claim about P versus NP.
