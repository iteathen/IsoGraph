# Glycan cleavage IsoGraph research — 2026-09-27

## Current verified primitive baseline

- source: GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md
- native: GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
- verification: Experiment 032 run 36345374241 attempt 1
- result: PASS
- native blob: f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4
- verification contract: Core 0.20 primitive-logic closure candidate, unqualified

The verified 0.1 model is intentionally idealized: finite rooted structure, static closed-world site susceptibility, target-protected terminal deletion, exhaustive one-operator phases, and minimum phase count.

## Core / implicit / NEI campaign

Current campaign status:

~~~text
Core double-check: PASS

exact implicit assertions:
    G-IA001..G-IA257

exact NEI assertions:
    G-N001..G-N093

A11 implicit re-pass:
    0 new assertions
    0 support refinements

NEI11 re-pass:
    0 new identity results
    0 scope refinements
    0 QU refinements
    0 authority refinements

operational fixed point:
    REACHED
~~~

Use:

- GLYCAN_CORE_DOUBLE_CHECK_0_1.md
- GLYCAN_ASSERTION_BASE_A0_0_1.md
- GLYCAN_IMPLICIT_ASSERTIONS_A1_0_1.md through GLYCAN_IMPLICIT_ASSERTIONS_A10_0_1.md
- GLYCAN_IMPLICIT_ASSERTIONS_A8_CORRECTION_0_1.md
- GLYCAN_NEI_SCOPE_CONTRACT_0_1.md through 0_3
- GLYCAN_NEI_PASS_1_0_1.md through GLYCAN_NEI_PASS_10_0_1.md
- GLYCAN_IMPLICIT_ASSERTIONS_A11_0_1.md
- GLYCAN_NEI_PASS_11_0_1.md
- GLYCAN_IMPLICIT_NEI_FIXED_POINT_0_1.md

A8 G-IA191 must be cited with its correction overlay.

## Strongest current exact reductions

The frozen treatment problem has been reduced exactly through:

~~~text
primitive saturated cleavage dynamics
->
unique idempotent phase transformers
->
exact state/frontier quotient
->
SIG / treatment-response quotient
->
exact recursive subtree languages
->
static phase assignment
->
deterministic earliest tau evaluation
->
minimum precedence-compatible ordered layers
->
corrected maximal-path set-valued coverage
->
finite path-pattern bases
->
finite disjunction of ordinary common-supersequence problems
->
finite subsequence-minimal global language basis B_global.
~~~

The singleton-susceptibility subclass is exactly ordinary shortest common supersequence on run-compressed maximal-path label words.

The unrestricted set-valued problem is not collapsed to one ordinary SCS instance.

## Identity / unknown boundary

All identity conclusions are scoped exact values.

No raw site, raw operator, microscopic trace, path, treatment word, or representation artifact is globally merged merely because it has equal behavior.

Inside the frozen deterministic 0.1 scope:

~~~text
semantic UNKNOWN introduced: 0
new QU dependency:            0
~~~

Broader identity questions lacking authority remain INCOMPLETE.

## Next-stage boundary

The requested implicit-assertion / NEI loop is complete within the declared scope.

A subsequent Discovery Protocol campaign may now work from the fixed-point graph.

Core 0.20 remains unqualified, and the 0.1 biochemical model remains intentionally narrower than real enzymology.
