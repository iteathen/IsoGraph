# PC-H primitive rendering audit 0.1

**Status:** exact-source/primitive-closure audit candidate
**Source:** `PC_H_SOURCE_FREEZE_0_1.md`
**Native:** `PC_H_PRIMITIVE_0_1.isg`

## Pinned primitive dependencies

- `research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg`
  - blob `2630336da5c4117a15a43c1dc0847536b33ed083`;
- `research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg`
  - blob `c0479ac1de1a1c8ff5737221133601618b1a56cf`;
- `research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg`
  - blob `fde4915b3a056430e0cb7a3a327e26abc1c7b09b`.

`MEMBER` (`7430`), `LENGTH` (`7431`) and `LE` (`7013`) are traceable derived views with primitive support in those pinned artifacts.

## Control-local IDs

```text
171000  raw carrier for closed-world relation-extension objects
171101  derived one-clause satisfaction predicate
171102  derived full control truth predicate
171201  support handle for clause expansion
171202  support handle for control expansion
```

Neither `171101` nor `171102` is an authoritative leaf; both are defined by native IFF structure.

BODY and HEAD are raw extensional input relations. Their names carry no behavior beyond their represented tuples plus the explicit well-formedness clauses.

## Exact clause reconstruction

The native definition of `171101(B,H,w,c)` is exactly:

```text
exists x:
    B(c,x)
    AND NOT MEMBER(x,w)

OR

exists h:
    H(c,h)
    AND MEMBER(h,w).
```

Therefore it handles all source edge cases without hidden conventions:

- empty body + head: head must be in the witness;
- nonempty body + no head: at least one body variable must be absent;
- empty body + no head: both disjuncts false.

## Exact assignment reconstruction

Witness truth is represented only by list membership.

The control requires every witness member to occur in `VL`, and the pinned list theory makes membership extensional over NIL/CONS structure.

No hidden Boolean-assignment object or valuation procedure is imported.

## Exact instance reconstruction

The native control additionally represents:

- closure of BODY/HEAD endpoints inside `CL` and `VL`;
- HEAD functionality;
- the exact witness length bound;
- universal clause satisfaction over members of `CL`.

Thus source truth reconstructs in both directions from the native formula.

## Algorithm-hiding audit

The source/native input contains no representation of:

- a forced-variable closure;
- a least satisfying model;
- iterative chaining;
- a fixed point;
- a canonical witness;
- a contradiction discovered by saturation.

Any such object is downstream implicit structure.

## Primitive-leaf audit

After expanding the pinned finite-data/arithmetic views, load-bearing semantics terminate in:

- identity/equality;
- AND/OR/NOT/IMPLIES/IFF;
- universal/existential binding;
- ordered predicate incidence;
- finite list constructor incidence;
- raw input-relation tuples/data.

No Horn solver, algorithm, machine, closure operator, or complexity-class label is a leaf.

## QU state

The frozen BODY/HEAD extensions are closed-world.

No semantic QU is required merely because the experiment withholds the known solution method.

## Admission status

Source reconstruction: **PASS (author audit)**  
Primitive-closure trace: **PASS (author audit)**  
Algorithm-hidden boundary: **PASS**  
Independent parser/round-trip qualification: **pending campaign validation**

This is an experimental positive-control candidate, not a newly qualified Core artifact.
