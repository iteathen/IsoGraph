# P versus NP primitive-logic campaign — checkpoint 1.9

Branch: research/p-vs-np-primitive-logic-20260926
Date: 2026-09-27
Recovered parent: CAMPAIGN_CHECKPOINT_1_8.md
Live parent head before checkpoint: d1b0b9a07053f3d1c51f0d099d547cae038c6987
Branch divergence before checkpoint: 246 ahead of main, 0 behind
Status: NEI and implicit-assertion double-check completed with corrections

## Current primitive authority

P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

Bundle 0.3 remains rejected as current authority.

## NEI audit result

Qualified semantic authorities remain:

- NEI 0.4;
- QU 0.1.

Current semantic application contract:

P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

Current native template:

P_VS_NP_NEI_OVERLAY_0_5.isg

Blob:

b39909628b9fac913e0a637804a3c766fd3eee30

Overlay 0.5 machine state:

~~~text
query templates:              12
templates marked INCOMPLETE:  12
SAME/DISTINCT/UNKNOWN roles:   0
OPEN QU states:                0
INCOMPLETE_SCOPE QU states:    5
undeclared native roles:       0
delimiter residuals:           0
~~~

Predecessor overlay 0.4 is historical only.

Reason:

its high-level semantic descriptions were mostly sound, but native opaque scope/evidence/model handles did not justify the exact result/OPEN status it serialized.

## Implicit assertion audit result

Current index:

IMPLICIT_ASSERTION_INDEX_0_8.json

Blob:

dfd5b20a4da10221c33a0a4a1d520a0b8e762a03

State:

~~~text
admitted assertions:            341
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

Admitted numeric range is IA-001..IA-344 except exactly:

~~~text
IA-013
IA-304
IA-305
~~~

which are superseded predecessor admissions.

## A21 correction

Predecessor IA-304 incorrectly claimed exact dominance required matching every legal next transition.

Dead legal branches with no accepting continuation are semantically irrelevant to continuation dominance.

Predecessor IA-305 inherited the same exactness error.

Corrected assertions:

~~~text
IA-337 exact dominance has a live-child recursive characterization
IA-338 exact Q-RESIDUAL SAME is mutual live dominance
IA-339 all-legal local simulation is sound but incomplete.
~~~

IA-306 and its polynomial pruning descendants remain valid by direct induction.

Finite sanity enumeration:

~~~text
2 states
2 labels
horizon 2
1296 ordered dominance comparisons

old IA-304:
    0 false positives
    94 false negatives

corrected IA-337:
    0 false positives
    0 false negatives

mutual corrected live dominance vs continuation equality:
    0 mismatches.
~~~

## A24 NEI/QU support closure

New support restrictions:

~~~text
IA-340 incomplete query template cannot support exact result
IA-341 opaque evidence/model handles do not discharge authority
IA-342 QU OPEN requires recoverable R(Q)
IA-343 quotient equality establishes only its scoped relation
IA-344 NEI result must be downstream of independent identity authority.
~~~

## Scoped identity result

Validated semantics:

~~~text
Q-RESIDUAL:
    exact continuation-function equality

Q-EXISTS:
    exact Boolean existence-value equality

Q-MIN:
    exact minimum-accepting-length value equality

Q-COUNT:
    exact accepting-continuation-count value equality.
~~~

These are scoped quotient/value relations.

They are not global natural identity of the underlying residual objects.

## UNKNOWN / INCOMPLETE

Validated:

~~~text
UNKNOWN
    only when a qualified nonempty model family contains both identity outcomes

INCOMPLETE
    when required scope/evidence/QU/model authority is absent.
~~~

No retained assertion uses failed search or computational ignorance as semantic UNKNOWN.

## Seeded candidate closure

All early seeded candidate families have later exact dispositions except:

~~~text
CA-001 global numeral-normal-form uniqueness.
~~~

CA-001 remains intentionally unadmitted because:

- it is not load-bearing for the P-vs-NP truth path;
- the current represented induction/predicate closure does not justify promoting the global theorem without additional support.

This is tracked, not missed.

## Operational fixed point

For the explicit audit surface:

~~~text
NEI/QU misuse
global/scoped identity leakage
support refs/cycles
A21 simulation completeness
seeded-candidate disposition
~~~

a no-new-defect pass was reached after correction.

This is not universal mathematical completeness.

## Current durable records

- P_VS_NP_NEI_IMPLICIT_AUDIT_0_1.md
- P_VS_NP_NEI_IMPLICIT_VERIFICATION_0_1.json
- IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_3.md
- P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_4.md
- P_VS_NP_CURRENT_AUTHORITY_0_2.md

## Remaining boundaries

- Core 0.20 remains unqualified.
- Selected primitive machine convention <-> exact official P-vs-NP convention remains QU_UNEXPANDED.
- Concrete native NEI result records remain to be fully instantiated/qualified.
- Universal implicit semantic completeness is not claimed.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
