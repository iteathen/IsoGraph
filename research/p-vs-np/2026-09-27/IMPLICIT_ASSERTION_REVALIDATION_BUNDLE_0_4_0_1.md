# P versus NP implicit assertion revalidation after primitive bundle 0.4

Status: semantic/provenance revalidation
Corrected base: ASSERTION_BASE_A0_0_2.md
Corrected primitive authority: P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
Indexed assertion state reviewed: IMPLICIT_ASSERTION_INDEX_0_7.json
Indexed admitted assertions: 335

## 1. Purpose

Bundle 0.3 contained an accidental global deterministic-uniqueness axiom.

This record checks whether A1-A23 relied on that invalid global fact.

## 2. Direct provenance scan

The indexed assertion-source files plus A0 were scanned for explicit references to:

- P_VS_NP_PRIMITIVE_BUNDLE_0_3;
- PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_8;
- global determinism;
- a claim that every transition relation is deterministic.

Direct bundle-0.3 references occurred only in:

- ASSERTION_BASE_A0_0_1.md;
- IMPLICIT_ASSERTIONS_A1_0_1.md.

No later A2-A23 source file directly names the rejected bundle or transition-support 0.8.

## 3. A1 semantic revalidation

IA-001..004:
natural/list functionality. Unaffected.

IA-005:
input initialization functionality. Unaffected.

IA-006:
explicitly scoped to one fixed transition relation satisfying EA-056 functional tuple uniqueness. It does not infer functionality from generic transition support. VALID.

IA-007:
depends on IA-006 inside a functional realization. VALID.

IA-008:
uses terminal no-outgoing property. Under A0_0_2 this is correctly scoped to the realization witness. VALID.

IA-009:
uses witness-scoped bounded-totality plus IA-008. VALID.

IA-010:
direct consequence of the truth-kernel biconditional. VALID.

IA-011:
functional realization -> branching realization by forgetting the consequent uniqueness conjunct. This is exactly the intended structural containment. VALID.

IA-012:
derived explanatory containment from IA-011. VALID.

IA-013 predecessor remains superseded for its pre-existing round-placement issue; no new change.

IA-014/015:
constructor/NEI consequences. Unaffected.

Thus no A1 admission requires the rejected global D-determinism block.

## 4. A2-A23 impact

The later closure develops consequences of:

- primitive arithmetic/list/configuration structure;
- witness-scoped functional computation;
- genuinely branching path semantics;
- bounded certificate/verifier factorization;
- NEI residual identity;
- continuation dominance/simulation;
- sufficient statistics, hitting sets, factorization and abstraction;
- representation/accessibility laws.

The central branching/certificate assertion family A3 specifically requires the antecedent to be genuinely branching.

Removing the accidental global determinism therefore restores, rather than invalidates, its intended premise.

No admitted assertion in A2-A23 states or requires:

~~~text
every branching realization is functional.
~~~

Any such assertion would have settled the open implication and is absent from the index.

## 5. Index integrity

IMPLICIT_ASSERTION_INDEX_0_7 remains mechanically valid as an assertion/ref dependency graph:

~~~text
admitted assertions: 335
missing support references: 0
support cycles: 0
max normalized derivation depth: 11
~~~

The index is an assertion dependency index, not a primitive-bundle provenance manifest.

Current semantic provenance must be read with:

- ASSERTION_BASE_A0_0_2.md;
- this revalidation record;
- P_VS_NP_PRIMITIVE_BUNDLE_0_4_AUDIT.md.

## 6. Disposition

~~~text
A1-A23 assertion bodies:
    REVALIDATED against corrected bundle semantics

generic index 0.7:
    RETAINED

A0_0_1 provenance:
    SUPERSEDED

A0_0_2:
    CURRENT EXPLICIT BASE
~~~

This revalidation does not claim implicit-assertion completeness.

P = NP remains OPEN.
P != NP remains OPEN.
