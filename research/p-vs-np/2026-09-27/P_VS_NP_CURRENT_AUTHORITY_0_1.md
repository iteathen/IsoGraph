# P versus NP campaign — current authority after primitive-bundle verification

Date: 2026-09-27
Branch: research/p-vs-np-primitive-logic-20260926

## Primitive P-vs-NP authority

Current native research authority:

research/p-vs-np/2026-09-26/P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

Blob:

c38de5674ffa568c1297e8383b48b2ed77de7756

Verification:

- P_VS_NP_PRIMITIVE_BUNDLE_0_4_AUDIT.md
- P_VS_NP_PRIMITIVE_BUNDLE_0_4_VERIFICATION.json
- P_VS_NP_PRIMITIVE_CLOSURE_LEDGER_0_3.md

Disposition of predecessor:

P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg is historical defect evidence and is not current authority.

## Corrected transition support

Current supporting successor:

research/primitive-logic/PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_9.isg

0.9 removes machine-instance typing/halting/totality/determinism constraints from global reusable support.

Those properties are scoped inside each realization witness in the truth kernel.

## Truth kernel

Current truth formula remains:

P_VS_NP_PRIMITIVE_TRUTH_KERNEL_0_4.isg

The truth kernel itself did not contain the global-determinism defect.

## Explicit assertion base

Current A0:

ASSERTION_BASE_A0_0_2.md

It preserves EA IDs used by the implicit campaign but records EA-034..036 as realization-witness-scoped.

## Implicit assertion state

Index:

IMPLICIT_ASSERTION_INDEX_0_7.json

State:

~~~text
admitted assertions: 335
missing support references: 0
support cycles: 0
max normalized derivation depth: 11
~~~

Semantic revalidation:

IMPLICIT_ASSERTION_REVALIDATION_BUNDLE_0_4_0_1.md

A1-A23 remain admitted under the corrected intended branching/functionality semantics.

## NEI / QU

Qualified NEI 0.4 remains separate from the primitive bundle.

Qualified QU 0.1 remains separate.

The selected-machine-model to exact official P-vs-NP convention bridge remains QU_UNEXPANDED.

## Core status

Core 0.20 remains unqualified.

The bundle verification is a research correctness audit, not Core 0.20 qualification/promotion.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
