# IsoGraph Core Specification — Draft 0.21 Rendering Conservation, Schema Closure, and Closure Invalidation Candidate

**Status:** unqualified normative successor candidate  
**Short name:** Core 0.21 candidate  
**Base authority:** qualified cumulative Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20  
**Optional dependency:** qualified QU 0.1 only when structured unresolved possibility is load-bearing  
**Purpose:** make primitive closure non-evasive, conserve the frozen source-semantic target, define finite schema closure for iterative/generative semantics without exhaustive materialization, and invalidate stale IA closure after load-bearing representation changes  
**Growth rule:** adds no new semantic primitive, no loop primitive, no recursion primitive, no generator primitive, no second graph substrate, no QRC semantic dependency, and no universal inference algorithm  
**Authority rule:** this file changes no qualified Core authority until independently qualified

Core 0.21 is an additive tightening of Core 0.19 exact-rendering / implicit-assertion discipline and Core 0.20 primitive-logic closure.

The governing principle is:

~~~text
primitive closure
    != permission to reduce the promised semantic obligation

primitive closure
    = preserve the promised semantic obligation
      and reduce every reducible part of it
      until authoritative support reaches primitive logic,
      exact raw data/incidence,
      exact schema-generating semantics,
      or a lawful represented unknown boundary
~~~

---

# 0. Interpretation barriers

Do not collapse:

~~~text
hard to reduce
    != out of scope

qualification difficulty
    != authority to revise scope

source-semantic conservation
    != cardinality conservation

rejected candidate representation
    != discharged source obligation

representation closure
    != truth status

falsified assertion
    != absent source assertion

qualified QU
    != opaque semantic leaf

unknown realization
    != missing definition

schema closure
    != materialization

schema closure
    != termination proof

schema closure
    != proof of every generated-family property

loop / recursion / generator label
    != primitive semantic support

primitive premises
    != primitive assertion body

operational IA fixed point
    != timeless closure fact

scope revision
    != mutation of historical qualification evidence

soundness
    != coverage

coverage
    != soundness
~~~

---

# 1. Freeze the Source Semantic Census

Before a strict exact-rendering / primitive-closure campaign begins, freeze:

~~~text
source interpretation
declared semantic scope
Source Semantic Census
governing authority
applicable dependency revisions
~~~

The **Source Semantic Census (SSC)** is the complete set of load-bearing source-semantic obligations inside the declared rendering scope.

The census is broader than propositions alone. It may include:

~~~text
source-explicit assertions
definitions
relation/operator semantics
guards / side conditions
binding and binder ownership
scope / boundary obligations
quantifier domains / generators
transition or rewrite semantics
iterative / recursive generator semantics
precision / modality distinctions
unknown / alternative interpretation structure
required witness / certificate / provenance semantics
other load-bearing structure whose loss could change reconstruction
~~~

Every census item MUST have stable identity sufficient to recover:

~~~text
census item ID
kind / role
source provenance
declared scope
source-semantic body or exact body reference
~~~

One census item may expand into many lower nodes. Several census items may share primitive support.

Therefore raw count equality between source items and primitive nodes is not required.

---

# 2. Semantic census conservation

Every frozen census item MUST retain one current **representation-closure disposition**.

Allowed final census dispositions are:

~~~text
CLOSED_PRIMITIVE
CLOSED_SCHEMA
CLOSED_WITH_QUALIFIED_QU_BOUNDARY
INCOMPLETE_UNEXPANDED
~~~

A census item is not discharged by deleting it, demoting it, renaming it, moving it to prose, or classifying one failed representation attempt as rejected.

A candidate node or rendering attempt may be classified REJECTED_INVALID_REPRESENTATION, but that classification does not satisfy census coverage.

For every census item A:

~~~text
A
    -> exactly one current representation-closure disposition
    -> at least one exact reconstruction path when closed
~~~

The same census item MAY retain multiple evidence/support/provenance records.

For example, explicit source support and later implicit support may coexist. A source assertion and later falsification evidence may also coexist.

---

# 3. No-Evasion Primitive Closure

Once the SSC and semantic scope are frozen:

> **Failure to reduce an in-scope census item does not authorize implicit deletion, demotion, relabeling, or scope removal merely to obtain primitive closure.**

Therefore:

~~~text
hard to reduce
    -> continue reduction
       OR represent a lawful unresolved boundary
       OR leave INCOMPLETE_UNEXPANDED
       OR perform explicit SCOPE_REVISION

hard to reduce
    -/-> silently disappear
~~~

A strict primitive-closure claim fails while any load-bearing in-scope census item remains INCOMPLETE_UNEXPANDED.

---

# 4. Scope revision

A campaign MAY revise scope, but it MUST NOT mutate the old frozen target in place.

A SCOPE_REVISION record MUST preserve, at minimum:

~~~text
old qualification target ID
old scope hash
new qualification target ID
new scope hash
removed census items
added census items
changed boundaries
reason
governing campaign authority / policy reference where applicable
provenance
old target preserved = true
~~~

A scope revision creates a new qualification target.

The previous target, its census, and its disposition remain historical evidence.

Human/owner approval may be required by project governance, but approval alone is not semantic authority.

SCOPE_REVISION does not prove that removed material was semantically irrelevant.

---

# 5. Representation closure and epistemic disposition are orthogonal

Representation closure describes whether semantic meaning has been represented sufficiently.

Truth/support/evidence state describes what is established about the represented assertion.

Do not combine them into one enum.

Illustrative evidence/assertion dispositions include:

~~~text
SOURCE_ASSERTED
EXACTLY_SUPPORTED
PROBABILISTICALLY_SUPPORTED
FALSIFIED
CONTRADICTED
INCONSISTENT_SOURCE
UNRESOLVED
~~~

These labels are illustrative bookkeeping, not new Core primitives.

A source assertion later shown false is still part of a faithful source rendering.

---

# 6. Full assertion closure: body, support, dependencies

Core 0.19 distinguishes assertion body from support.

Core 0.21 makes the primitive-closure consequence explicit.

For an exact assertion to count as primitive-closed:

~~~text
ASSERTION BODY
    -> primitive closure

SUPPORT
    -> primitive closure

TRANSITIVE LOAD-BEARING DEPENDENCIES
    -> primitive closure
       OR lawful qualified unresolved boundary
~~~

Therefore:

~~~text
primitive premises
+ unreduced semantic assertion body
    != primitive-closed assertion
~~~

This applies equally to source-explicit assertions, exact implicit assertions, equivalences, negative results, falsifiers, counterexamples, non-implications, non-determination claims, and non-equivalence claims.

---

# 7. Definitionally Reducible Relation Gate

For every named semantic operator/relation/classification used in authoritative support, ask:

~~~text
Is this occurrence only an exact extensional primitive incidence
or a raw carrier/value name whose behavior is represented elsewhere?

    yes -> it may remain as the corresponding primitive/extensional occurrence

    no ->
        does a recoverable definition exist?

            yes -> unfold the definition into lower support

            no -> INCOMPLETE_UNEXPANDED
                  unless the source meaning itself is genuinely unresolved
~~~

Illustrative high-risk labels include phase, sign, parity, path, quotient, permutation, rank, cycle, transition, successor, composition, closure, minimum, maximum, recursion, iteration, generator, termination, and fixed point.

The governing Core 0.20 test remains:

> Does understanding this node require semantic behavior that has not been represented below it?

If yes, it cannot be an authoritative leaf.

---

# 8. Qualified QU boundary versus missing definition

Core 0.21 distinguishes two forms of unresolvedness.

## 8.1 CLOSED_WITH_QUALIFIED_QU_BOUNDARY

This disposition is allowed only when:

1. the source semantics genuinely contain structured unresolved possibility;
2. qualified QU faithfully represents that unresolved family;
3. every known load-bearing semantic property of the QU representation is itself traceable to primitive support appropriate to the rendering claim;
4. no convenient realization is silently selected;
5. the unresolved realization is preserved as unresolved.

This is not a qualified-construction escape hatch.

~~~text
qualified QU dependency
    != permission to hide known semantics
~~~

## 8.2 INCOMPLETE_UNEXPANDED

Use this when semantic meaning needed to understand/decompose a relation or operator is missing.

Examples include unavailable definitions, missing governing authority, unknown interface semantics, hidden transition behavior, or unrepresented arithmetic rules.

This is rendering incompleteness, not automatically a semantic QU about the domain.

~~~text
unknown realization
    != missing meaning
~~~

A determinate exact assertion MUST NOT depend on silently resolving either an admissible QU realization or an incomplete unexpanded definition.

---

# 9. Schema Closure

Some semantic objects denote families that are indefinitely large, extremely large, or infinite.

Primitive closure does not require extensional materialization of every generated member when the family's generating semantics can be represented finitely and exactly.

A census item may receive CLOSED_SCHEMA only when a finite primitive-closed schema characterizes **all and only** the members/transitions admitted by the declared schema scope.

Schema Closure is a representation-closure classification, not a new primitive or graph substrate.

## 9.1 Required schema burden

As applicable, the schema MUST expose:

~~~text
base / initial domain
state / carrier domain
admission / continuation condition
one-step / generator relation
binding / substitution
argument transformation
result-composition relation
iteration occurrence / index relation when load-bearing
exit / base condition when part of the semantics
scope / boundary
all hidden side conditions
~~~

Every load-bearing component above must itself satisfy Core 0.21 closure.

A label such as loop, recursion, generator, iteration, or schema is never sufficient by itself.

## 9.2 Exact generation coverage

Schema Closure requires a recoverable coverage witness for:

~~~text
every admitted generated member / transition
    is licensed by the schema

AND

every member / transition licensed by the schema
    belongs to the declared generated family
~~~

A generator that only produces some observed prefix is not sufficient for a complete schema claim unless the declared scope is only that prefix.

## 9.3 Schema semantics versus generated consequences

~~~text
generator semantics closed
    != every instance materialized
    != termination proved
    != every property of every generated instance proved
~~~

Schema Closure establishes generation semantics within the declared scope.

Any theorem about all generated members carries its own proof/coverage burden.

---

# 10. Iteration and recursion

Core introduces no dedicated loop or recursion primitive.

Iteration and recursion are represented through existing primitive logical/relational structure.

For iteration, a complete schema may require an initial condition, state carrier, continuation predicate, one-step relation, binding/substitution, iteration occurrence/index relation where load-bearing, and exit condition.

For recursion, a complete schema may require a base condition, recursive domain, recursive-step relation, argument transformation, result-composition relation, and binding/substitution.

These lists are claim-bounded and illustrative.

If evaluation order, stack discipline, side effects, concurrency, transition boundaries, or mechanism anatomy are load-bearing, they must also be represented under the applicable Core/DTS authority rather than hidden behind the word recursion.

---

# 11. Termination is separate from step semantics

Exact knowledge of every recursive/iterative step does not imply termination.

~~~text
known step semantics
    != known termination
~~~

Possible termination dispositions include:

~~~text
PROVEN_TERMINATING
FIXED_FINITE_COUNT
QUALIFIED_QU_TERMINATION
NOT_LOAD_BEARING
~~~

If termination is load-bearing and unresolved, it remains unresolved.

Do not swallow already-known step semantics into one opaque unknown-recursion object.

---

# 12. Materialization Firewall

> **Semantic completeness does not require exhaustive execution or materialization of a recursively, iteratively, or otherwise generatively defined family when the exact generating semantics and declared domain are schema-closed.**

Therefore:

~~~text
semantic closure
    != extensional enumeration

schema closure
    != observed-prefix length
~~~

A campaign MAY record materialization metadata such as none/partial/complete, observed prefix length, sampled generated members, or execution evidence.

That metadata is not the semantic definition of the schema.

Stopping instance expansion is lawful only because the next admissible instance is already defined by the closed schema, not because the agent stopped understanding the next step.

---

# 13. Negative evidence has the same primitive burden

A negative conclusion receives no weaker representation standard than a positive conclusion.

Examples include NOT P, P does not imply Q, X does not determine Y, counterexamples, non-equivalence, and falsified invariants.

Each must remain traceable through primitive support and claim-appropriate coverage.

A high-level negative statement remains a derived assertion over its lower primitive witness.

Experimental negatives remain limited to demonstrated experimental coverage under applicable DP/EI authority.

---

# 14. Mandatory graph-derived closure ledger

For a strict Core 0.21 primitive-closure claim, a machine-checkable closure ledger is **mandatory**.

The ledger MUST be mechanically derived from:

~~~text
the authoritative native graph/bundle
+
the frozen Source Semantic Census
+
the frozen semantic scope
~~~

It MUST NOT be only a manually written declaration that reduction is complete.

For every authoritative semantic node, preserve as applicable:

~~~text
node ID
source census item IDs
semantic classification
definition source
children
primitive descendants
QU descendants
derived-view aliases
explicit dependents
implicit dependents
closure mode
unexpanded dependencies
reconstruction path
provenance
schema metadata when CLOSED_SCHEMA
QU-boundary metadata when applicable
~~~

Allowed authoritative terminal forms are only:

~~~text
qualified Core primitive
raw carrier/value atom
exact primitive extensional incidence
lawful qualified QU boundary whose known semantics close primitively
~~~

DERIVED_VIEW nodes may exist, but exact reconstruction must survive their deletion.

---

# 15. Independent qualification gates

A strict exact-rendering qualification MUST score these separately.

## SOUNDNESS

Every admitted assertion / semantic conclusion is correctly supported at its claimed strength.

## COVERAGE

Every frozen SSC item has exactly one current closure disposition and no silent disappearance.

## RECONSTRUCTION

Every closed census item reconstructs the frozen source semantics exactly.

## SCOPE_INTEGRITY

The current frozen scope is exactly the scope actually qualified. Any scope change creates a new target.

## AUTHORITY_ROUTING

Every load-bearing dependency is owned by the correct qualified authority.

A qualification fails if any one gate fails.

~~~text
sound but incomplete
    -> fail

complete but unsound
    -> fail
~~~

Qualification infrastructure enforces these gates; it does not become Core semantic authority.

---

# 16. IA fixed-point identity and invalidation

Core 0.19 permits iterative IA expansion.

Core 0.21 makes closure dependency explicit.

A current operational IA fixed point SHOULD be identified by a deterministic tuple containing at least:

~~~text
primitive kernel hash
Source Semantic Census hash
semantic scope hash
QU state hash / explicit none marker
governing authority hash
selected inference/search profile hash
~~~

A canonical implementation may derive IA_FIXED_POINT_ID = H(tuple).

The hash algorithm is qualification/implementation infrastructure, not Core semantics.

If any load-bearing input changes:

~~~text
primitive expansion
SSC change
scope revision
QU refinement
governing authority revision
selected inference/search profile revision
~~~

then the old IA fixed point remains immutable historical evidence for the old tuple, current IA closure is invalidated, and IA search reopens for the new tuple.

A no-change pass is current only for the frozen tuple under which it was obtained.

---

# 17. Closure workflow

A conforming Core 0.21 exact-rendering campaign should:

~~~text
1. freeze source interpretation
2. freeze semantic scope
3. freeze Source Semantic Census

4. primitive-render every SSC item without silent deletion

5. for every semantic relation/operator:
       primitive/extensional occurrence? -> retain
       definition available? -> unfold
       source meaning genuinely unknown? -> qualified unknown
       meaning required but missing? -> INCOMPLETE_UNEXPANDED

6. for loops/recursion/generators:
       close generating semantics
       prove exact all-and-only schema coverage
       represent termination separately
       do not exhaustively materialize instances

7. derive closure ledger mechanically
8. verify SSC conservation
9. generate / validate implicit assertions
10. primitive-render every IA body, support, and dependency

11. if primitive kernel, SSC, scope, QU state,
    governing authority, or IA search profile changes:
        invalidate current IA fixed point
        reopen IA closure

12. repeat until:
        no reducible authoritative leaf remains
        every SSC item has a current disposition
        every closed item reconstructs exactly
        IA closure is stable for the frozen tuple
        no load-bearing unresolved refinement is required
        for the active exact claim

13. qualify separately:
        SOUNDNESS
        COVERAGE
        RECONSTRUCTION
        SCOPE_INTEGRITY
        AUTHORITY_ROUTING
~~~

Core does not require exhausting every possible QU refinement or every conceivable IA search procedure.

The burden is claim-bounded.

---

# 18. Interaction with prior authority

Core 0.21 is additive.

It does not rewrite Core 0.20, Core 0.19, QU 0.1, DP 0.10, EI 0.1, DTS 0.1, or any frozen historical experiment.

A rendering qualified under Core 0.20 may remain historically valid while lacking the stronger census-conservation/schema/fixed-point records required for a Core 0.21 claim.

Successor modernization must preserve predecessor bytes.

---

# 19. Qualification targets

Before promotion, fresh qualification must test at least:

1. hard-to-reduce source-semantic item cannot disappear;
2. source census survives one-to-many primitive expansion;
3. two source items may share primitive support without violating conservation;
4. non-assertional load-bearing source semantics are included in the census;
5. scope shrink attempt fails without explicit SCOPE_REVISION;
6. scope revision creates a new qualification target and preserves the old one;
7. rejected candidate representation does not discharge a source obligation;
8. primitive premises plus unreduced assertion body fails closure;
9. named reducible operator is unfolded;
10. missing lower meaning remains incomplete rather than becoming primitive;
11. qualified QU-bounded unknown preserves unresolved realization while known QU semantics close;
12. qualified QU is rejected as opaque when known semantics are hidden;
13. finite loop schema closes without exhaustive unrolling;
14. unresolved termination remains separate from closed step semantics;
15. recursive schema closes without materializing an unbounded tree;
16. schema requires exact all-and-only generation coverage;
17. schema closure does not imply arbitrary generated-family properties;
18. loop/recursion/generator labels cannot serve as leaves;
19. negative result exposes primitive witness and correct scope;
20. deeper primitive expansion invalidates old IA fixed point;
21. reopened IA pass may discover newly exposed valid assertions;
22. coverage gate catches a sound-but-incomplete packet;
23. soundness gate catches a complete-but-invalid packet;
24. scope-integrity gate catches silent scope drift;
25. deleting every derived view leaves closed in-scope semantics reconstructable;
26. full-stack integration preserves QU/NEI/DTS/DP/EI authority boundaries.

---

# 20. Working constitutional summary

~~~text
Freeze what was promised.

Do not qualify by promising less after difficulty appears.

Conserve every load-bearing source-semantic obligation.

Reduce assertion bodies as well as their premises and support.

Unfold every reducible semantic operator.

Represent genuine unknowns without using QU as missing-work camouflage.

Represent iterative / recursive semantics by exact primitive-closed generators,
not by exhaustive materialization.

Schema closure describes generation semantics,
not termination and not every theorem about generated members.

If deeper reduction changes the primitive kernel,
the old IA fixed point is historical and current IA closure reopens.

Qualification requires soundness AND coverage
AND reconstruction AND scope integrity AND correct authority routing.
~~~

Core 0.21 changes no current qualified authority until this exact revision is independently qualified and the affected integrated stack is freshly qualified.
