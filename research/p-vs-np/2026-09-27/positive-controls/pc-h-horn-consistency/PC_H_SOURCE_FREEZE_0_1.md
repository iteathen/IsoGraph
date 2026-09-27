# PC-H source freeze 0.1 — Horn-form Boolean consistency

**Status:** frozen source semantics for an algorithm-hidden positive control
**Control ID:** PC-H
**Discovery input policy:** source/problem semantics only; no solving procedure is admitted here.

## 1. Input

One instance consists of:

- a finite list `VL` of raw Boolean-variable identities;
- a finite list `CL` of raw clause identities;
- a closed-world binary relation `BODY(c,x)`;
- a closed-world binary relation `HEAD(c,x)`.

Well-formedness requires:

1. every represented BODY/HEAD clause endpoint occurs in `CL`;
2. every represented BODY/HEAD variable endpoint occurs in `VL`;
3. every clause has at most one HEAD variable:

```text
HEAD(c,h1)
AND
HEAD(c,h2)
    ->
h1=h2.
```

A clause may have no HEAD variable.

## 2. Witness assignment

A witness is a finite list `w` of variable identities interpreted extensionally:

```text
TRUE_w(x)
IFF
MEMBER(x,w).
```

Every witness member must occur in `VL`.

Duplicate list occurrences and list order do not change `TRUE_w`.

Let:

```text
n = LENGTH(VL)
k = LENGTH(w).
```

The witness bound is:

```text
k <= n.
```

Every ordinary finite truth assignment has a duplicate-free representative satisfying this bound.

## 3. Clause truth

A clause `c` is satisfied by `w` exactly when:

```text
(
  exists x:
      BODY(c,x)
      AND
      NOT TRUE_w(x)
)
OR
(
  exists h:
      HEAD(c,h)
      AND
      TRUE_w(h)
).
```

Interpretation:

- BODY variables occur negatively;
- the optional HEAD variable occurs positively;
- a headless clause is satisfied only by falsifying at least one BODY variable;
- an empty-BODY headed clause requires its HEAD variable to be true;
- an empty-BODY headless clause is unsatisfied.

## 4. Truth condition

The control relation is TRUE exactly when:

```text
exists w:

    every member of w occurs in VL

AND

    LENGTH(w) <= LENGTH(VL)

AND

    for every c in CL:
        c is satisfied by w.
```

All list/arithmetic terms are source notation routed through the pinned primitive supporting theories.

## 5. Closed-world authority

For a frozen instance:

```text
represented BODY tuples = complete BODY extension

represented HEAD tuples = complete HEAD extension.
```

No unrepresented body/head occurrence is semantically possible.

## 6. Bounded-existential shape

The witness is a polynomially bounded finite list over the explicit variable list.

This is source structure only. No deterministic existential-elimination procedure is supplied.

## 7. Withheld structure

The discovery input MUST NOT contain or name:

- a closure set;
- iterative implication/chaining;
- unit propagation;
- a least model;
- a fixed-point construction;
- a canonical satisfying assignment;
- a rejection certificate derived by saturation.

Any such structure must be independently recovered from the primitive clauses after source freeze.

## 8. Truth classification

The control is selected because this Horn-form bounded-existential family has a standard deterministic polynomial solution, but that solution is not an input to discovery.

This control makes no claim about P versus NP.
