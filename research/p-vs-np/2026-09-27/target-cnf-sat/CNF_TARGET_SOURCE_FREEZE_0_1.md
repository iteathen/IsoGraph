# CNF Boolean satisfiability target source freeze 0.1

**Status:** frozen source semantics for hard-target projection
**Human-facing target label:** finite CNF Boolean satisfiability
**Discovery input policy:** source/problem semantics only

The human-facing label is navigation only. The authoritative native rendering expands clause and assignment truth into primitive logic.

## 1. Input

One instance consists of:

- a finite duplicate-free list VL of raw variable identities;
- a finite duplicate-free list CL of raw clause identities;
- a closed-world binary relation POS(c,x);
- a closed-world binary relation NEG(c,x).

Well-formedness requires every represented POS/NEG clause endpoint to occur in CL and every represented variable endpoint to occur in VL.

A clause may be empty.

A variable may occur positively, negatively, both, or neither in one clause.

## 2. Witness assignment

A witness is a finite list w of variables interpreted extensionally:

~~~text
TRUE_w(x)
IFF
MEMBER(x,w).
~~~

Every member of w must occur in VL.

Let:

~~~text
n = LENGTH(VL)
k = LENGTH(w).
~~~

Require:

~~~text
k <= n.
~~~

Every Boolean assignment has a duplicate-free representative satisfying this bound.

## 3. Clause truth

A clause c is satisfied exactly when:

~~~text
(
  exists x:
      POS(c,x)
      AND
      TRUE_w(x)
)
OR
(
  exists x:
      NEG(c,x)
      AND
      NOT TRUE_w(x)
).
~~~

Consequences are entirely structural:

- an empty clause is false;
- a clause containing both POS(c,x) and NEG(c,x) is true under every assignment.

No higher clause semantics are imported.

## 4. Formula truth

The target relation is TRUE exactly when:

~~~text
exists witness list w:

    every member of w occurs in VL

AND

    LENGTH(w) <= LENGTH(VL)

AND

    for every c in CL:
        c is satisfied by w.
~~~

## 5. Closed-world authority

For one frozen instance:

~~~text
represented POS tuples = complete POS extension

represented NEG tuples = complete NEG extension.
~~~

No unrepresented literal occurrence is semantically possible.

## 6. Discovery-input boundary

This artifact supplies only the instance/witness/clause/truth semantics stated above.

No derived support representation, transformation rule, recurrence, canonical witness, contradiction construction, variable ordering policy beyond the frozen input list order, or decision procedure is supplied.

## 7. Bounded-existential shape

The target is an existential Boolean assignment problem whose witness length is bounded by the explicit variable-list length.

This source statement is descriptive only.

## 8. Campaign truth discipline

This artifact does not assert P=NP or P!=NP.
