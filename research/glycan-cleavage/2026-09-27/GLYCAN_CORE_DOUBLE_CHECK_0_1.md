# Glycan cleavage Core / primitive double-check 0.1

**Status:** completed research audit  
**Date:** 2026-09-27  
**Branch:** `research/glycan-cleavage-primitive-20260927`  
**Target native blob:** `f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4`  
**Prior reconstruction verification:** Experiment 032 PASS, run `36345374241`

## Authority boundary

Current qualified Core remains cumulative Core 0.17 + qualified Core 0.18 + qualified Core 0.19.

This campaign additionally uses:

- `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md` as an **unqualified successor research contract**;
- `research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.md` and its native companion as unqualified Core-0.20 support.

Nothing in this audit promotes Core 0.20.

## Re-check targets

The native glycan 0.1 graph was checked again against:

1. Core 0.19 assertion/support and iterative implicit-closure discipline;
2. Core 0.20 primitive-logic closure and primitive-support firewall;
3. Primitive Logic Kernel K0-K10;
4. primitive-rendered data constructors;
5. primitive-rendered natural arithmetic;
6. the exact Experiment 032 reconstruction evidence.

## Findings

### C1 — no high-level domain leaf remains authoritative

The native support path does not require the words or packaged concepts:

~~~text
glycan
residue
enzyme
terminal
cleavage
treatment
trajectory
optimal
~~~

Local IDs are definitionally expanded or are raw constructor/carrier atoms.

Result: **PASS**.

### C2 — application/incidence does not hide domain behavior

The raw relation-object carrier `181000` contributes identity only.

Parent and susceptibility relation behavior is represented through ordered predicate incidence plus explicit constraints. No chemical rule, parent rule, or transition rule is hidden inside the carrier ID.

Result: **PASS** for the frozen 0.1 problem-family scope.

### C3 — finite-state/tree support is primitive-grounded

Well-formedness `181004` explicitly represents:

- duplicate-free finite carriers;
- root membership;
- root parent exclusion;
- exactly one parent for every non-root represented node;
- parent endpoint closure;
- target subset and ancestor closure;
- susceptibility endpoint closure;
- an existential natural rank witness;
- unique rank for every represented node;
- strict rank increase from parent to child.

Because the represented carrier is finite, every non-root has one parent, root alone has none, and rank strictly decreases when following parents, the parent structure is connected to the root and acyclic.

Result: **PASS**.

### C4 — recursive treatment semantics are not an opaque computation leaf

`181016` expands one saturating same-operator phase into:

~~~text
empty trace:
    start = final extensionally
    AND final is saturated

OR

nonempty trace:
    one represented local deletion
    AND recursive phase over the explicit trace tail
~~~

The recursion is grounded.

The local trace carrier `181010` has explicit empty/cons constructor structure, functionality/extensionality constraints, and `181015` gives every represented trace a natural-number length with zero/successor recursion.

Therefore a cyclic/self-supporting trace would require a natural length equal to one of its own strict successors and is excluded by the pinned primitive natural-number support.

Result: **PASS**.

### C5 — trajectory execution is likewise structural recursion

`181017` recurses on the supplied finite operator list:

~~~text
empty operator list:
    source = final extensionally

cons operator list:
    execute one saturating phase
    then execute the tail
~~~

No algorithm/run/eval primitive is imported.

Result: **PASS**.

### C6 — optimization direction is exact

`181019` requires:

1. candidate `T` solves the instance;
2. `LENGTH(T)=n`;
3. for every solving `T2` with `LENGTH(T2)=m`, `n <= m`.

Thus the graph represents **minimum treatment-list length**, permits tied minima, and does not assert canonical uniqueness.

Result: **PASS**.

### C7 — state invariants are derivable, not missing source semantics

The source states that every reachable state remains inside the original carrier and contains the retained target.

Those facts need not be repeated in every recursive clause because they follow from:

- initial state = `RL`;
- each local step removes exactly one member of the current state;
- eligibility forbids removal of a target member.

They are therefore exact implicit assertions to be admitted in the next closure round rather than missing primitive source semantics.

Result: **PASS; route to implicit closure**.

### C8 — same-operator final-state uniqueness is not assumed by Core

The native treatment relation permits different microscopic deletion orders for one selected operator.

It does not assert that all complete traces end in the same final state.

That property, if true, must be derived from the rooted finite structure and static susceptibility relation.

Result: **correctly left for implicit closure**.

### C9 — no real-biochemistry completion is smuggled into Core

The 0.1 model fixes site susceptibility extensionally and excludes kinetics, incomplete digestion, concentration/time, cocktails, state-dependent chemistry outside the supplied relation, endoglycosidase behavior, synthesis, and input uncertainty.

Those exclusions remain scope boundaries.

Result: **PASS**.

## Core disposition

~~~text
primitive support integrity:              PASS
recursive grounding:                     PASS
source reconstruction compatibility:     PASS
optimization direction:                  PASS
domain-label deletion firewall:          PASS
hidden computation operator:             none
hidden biochemical operator:             none
load-bearing Core QU inside 0.1 scope:    none

Core 0.20 qualification/promotion:        NOT CLAIMED
~~~

The verified native artifact remains a valid frozen baseline for the requested implicit-assertion / NEI fixed-point campaign.
