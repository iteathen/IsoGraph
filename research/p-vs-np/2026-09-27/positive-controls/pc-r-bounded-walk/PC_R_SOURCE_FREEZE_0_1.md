# PC-R source freeze 0.1 — finite directed bounded walk

**Status:** frozen source semantics for an algorithm-hidden positive control
**Control ID:** PC-R
**Discovery input policy:** source/problem semantics only; no solving procedure is admitted here.

## 1. Input

One instance consists of:

- a finite list `VL` of raw vertex/data identities;
- a closed-world binary relation `E(u,v)` supplied extensionally as input data;
- two distinguished data identities `s` and `t`.

Well-formedness requires:

1. `s` occurs in `VL`;
2. `t` occurs in `VL`;
3. every endpoint of every represented `E(u,v)` occurrence occurs in `VL`.

Repeated identities in `VL` are allowed. The list length, not a hidden cardinality operation, supplies the witness bound.

## 2. Witness object

A witness is a finite nonempty list `w` of vertex identities.

Define the source relation `WALK(E,w,a,b)` structurally over the list:

```text
BASE

w = CONS(a,NIL)
AND
a = b

    ->
WALK(E,w,a,b)


STEP

w = CONS(a,tail)
AND
tail = CONS(v,rest)
AND
E(a,v)
AND
WALK(E,tail,v,b)

    ->
WALK(E,w,a,b)
```

The exact source meaning is the corresponding structural biconditional: a witness is a walk iff it is in exactly one of the represented base/step cases.

## 3. Truth condition

Let:

```text
n = LENGTH(VL)
k = LENGTH(w).
```

The control relation is TRUE exactly when:

```text
exists w:

    WALK(E,w,s,t)
    AND
    k <= n.
```

All arithmetic/list terms above are only source notation. The native control routes `LENGTH`, `<=`, `CONS`, `NIL`, membership, binding, and quantification through the pinned primitive supporting theories.

## 4. Closed-world authority

For one frozen instance, `E` is exact input relation data:

```text
represented E-tuples
    =
the complete E extension for that instance.
```

No unrepresented edge is semantically possible.

## 5. Bounded-existential shape

The witness length is at most the explicit input-list length. Therefore this is a bounded existential finite-data problem family.

This statement is part of the source shape only. No deterministic elimination method is supplied.

## 6. Discovery-input boundary

This artifact supplies only the instance/witness/truth semantics stated above.

No relation, object, state, recurrence, ordering, construction, or procedure for deciding the truth condition is supplied by the source artifact.

## 7. Truth classification

The control is selected because its bounded-existential question has a standard deterministic polynomial solution, but that solution is not an input to discovery.

This control does not make any claim about P versus NP.
