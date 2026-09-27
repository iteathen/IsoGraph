# P versus NP primitive-logic campaign — checkpoint 1.8

Branch: research/p-vs-np-primitive-logic-20260926
Date: 2026-09-27
Recovered parent: CAMPAIGN_CHECKPOINT_1_7.md
Live parent head before checkpoint work: e23190d6da7c66d490916de175c72b24ada9808f
Branch divergence before checkpoint work: 231 ahead of main, 0 behind
Status: primitive P-vs-NP IsoGraph correctness audit completed; bundle corrected and confirmed

## Critical finding

The previous primitive bundle 0.3 was invalid as current authority.

It imported generic transition-support blocks as global axioms.

One imported block globally forced deterministic uniqueness for every transition relation D.

That made the nominal branching antecedent deterministic and trivialized the top unresolved implication.

## Correction

Created:

- PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_9.isg
- P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

0.9 retains reusable configuration/step/path definitions but removes caller-specific machine-property assertions from global support.

Bundle 0.4 imports the corrected support and keeps machine typing, halt closure, totality and functional uniqueness inside the proper truth-witness scopes.

## Confirmation

Bundle 0.4 fresh audit:

~~~text
top-level blocks: 36
delimiter residuals: 0
negative delimiter depth: none
free native variables: 0
derived-view role: absent
generic machine ?Q parameter: absent
generic global D determinism: absent
antecedent nD functional-uniqueness variables: absent
consequent dD functional-uniqueness variables: present
same L used on both sides: yes
~~~

The corrected formula reconstructs:

~~~text
for every represented unary language relation L:

    branching polynomial realization of L
        ->
    functional polynomial realization of the same L
~~~

under the selected finite-control tape convention.

The structural functional-to-branching containment remains valid by forgetting the consequent uniqueness conjunct.

## Assertion-corpus impact

Current explicit base:

ASSERTION_BASE_A0_0_2.md

The 335 admitted A1-A23 assertions were revalidated.

No admitted assertion relies on the rejected claim that every branching transition relation is functional.

Index 0.7 remains:

~~~text
335 admitted
0 missing refs
0 cycles
max depth 11
~~~

## Durable verification records

- P_VS_NP_PRIMITIVE_BUNDLE_0_4_AUDIT.md
- P_VS_NP_PRIMITIVE_BUNDLE_0_4_VERIFICATION.json
- P_VS_NP_PRIMITIVE_CLOSURE_LEDGER_0_3.md
- IMPLICIT_ASSERTION_REVALIDATION_BUNDLE_0_4_0_1.md
- P_VS_NP_CURRENT_AUTHORITY_0_1.md

## Remaining boundary

The corrected bundle is confirmed at research-audit level relative to the selected finite-control tape convention.

Still not discharged:

~~~text
selected primitive convention
    <- polynomial equivalence ->
exact official P-vs-NP convention.
~~~

That remains QU_UNEXPANDED.

Core 0.20 remains unqualified.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~

## Next execution unit

Resume discovery only from bundle 0.4 / A0_0_2.

Do not use bundle 0.3 as current primitive authority.

The previously recorded factorization/support-width research seam remains available after this provenance correction.
