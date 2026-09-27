# P versus NP NEI and implicit-assertion full re-audit 0.1

**Status:** corrective verification complete
**Primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
**Explicit base:** ASSERTION_BASE_A0_0_2.md
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1
**Current native NEI template:** P_VS_NP_NEI_OVERLAY_0_5.isg
**Current assertion index:** IMPLICIT_ASSERTION_INDEX_0_8.json

## 1. Audit question

Re-check:

1. whether NEI was applied according to qualified NEI 0.4 / QU 0.1;
2. whether any implicit assertion was unsupported, circular, over-scoped, or dependent on the rejected bundle 0.3 behavior;
3. whether seeded implicit candidates were accidentally left unresolved;
4. whether current support/ref dependency structure is coherent.

## 2. Findings

Two material defects were found.

### F1 — native NEI overlay 0.4 overclaimed qualification state

The semantic prose correctly distinguished global identity from scoped quotient identity.

The native overlay nevertheless used opaque local SIs as if they supplied:

- exact evidence;
- exact theorem/certificate;
- admissible identity-model family;
- complete QU possibility/constraint/closure/realization-family authority.

It also attached SAME/DISTINCT result roles to concrete controls and marked generic QU states OPEN.

Those native claims were stronger than their represented support.

Qualified NEI/QU require fail-closed behavior:

~~~text
opaque handle != exact authority

missing realization-family semantics != OPEN

query template != derived result.
~~~

Correction:

- P_VS_NP_NEI_OVERLAY_0_5.isg;
- P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md;
- P_VS_NP_NEI_OVERLAY_0_5_AUDIT.md;
- A24 support restrictions.

### F2 — IA-304/IA-305 treated all-legal simulation as exact dominance/equality

A21 predecessor IA-304 required q to match every legal p transition.

That is sufficient for dominance, but not necessary.

A legal p-transition to a child with no accepting continuation contributes nothing to C_p and therefore imposes no continuation-dominance obligation.

IA-305 inherited the same completeness error.

Correction:

- IA-304 predecessor superseded;
- IA-305 predecessor superseded;
- IA-306 retained with direct induction support;
- IA-337 exact live-child dominance recurrence;
- IA-338 exact residual SAME as mutual live dominance;
- IA-339 all-legal simulation is sound but incomplete.

## 3. Finite-model sanity check for the A21 correction

An exhaustive sanity model enumerated:

~~~text
states:        2
labels:        2
NEXT values:   invalid / state 0 / state 1
horizon:       2
current truth: all 2^2 assignments
ordered state pairs: 4

total dominance comparisons:
    3^(2*2) * 2^2 * 4
    = 1296.
~~~

Comparison against continuation-language inclusion:

~~~text
predecessor IA-304 recursion:
    false positives: 0
    false negatives: 94

corrected IA-337 live-child recursion:
    false positives: 0
    false negatives: 0

mutual corrected live dominance
vs exact continuation-language equality:
    mismatches: 0 / 1296.
~~~

This is a finite sanity check, not a proof substitute; the corrected assertions also have direct inductive proofs.

## 4. NEI family disposition

### Constructor/global identity

IA-014/015 and Q-NAT/Q-LIST/Q-CONFIG semantics remain valid when exact constructor equality/disequality is the represented identity theory.

No different raw SI is automatically DISTINCT.

No structural similarity is automatically SAME.

### Q-RESIDUAL

Validated under one fixed:

- input;
- verifier;
- depth;
- remaining bound;
- admissible suffix domain;
- closure/QU authority.

Exact pointwise continuation equality supports the scoped quotient relation.

One exact distinguishing suffix separates quotient values.

Missing identity-relevant QU/closure authority yields INCOMPLETE.

Qualified model families containing both identity outcomes yield semantic UNKNOWN.

### Q-EXISTS

Validated as equality of exact Boolean existence observable E(p).

It is objective-sufficient and generally not right-congruent.

### Q-MIN / Q-COUNT

Validated as exact aggregate-value scopes.

They are scoped value identities, not global residual identities.

Their compact ranges do not imply cheap access.

### Dominance

Continuation dominance remains an ordinary preorder, not an NEI result.

Mutual dominance equals Q-RESIDUAL equality.

One-way dominance supports pruning without natural coidentity.

### Transformation-local equivalence

A locally certified exact target-semantics equivalence may justify replacement under that scope.

It does not make representation artifacts globally SAME.

## 5. UNKNOWN / INCOMPLETE audit

All indexed uses were checked.

Valid rule retained:

~~~text
UNKNOWN:
    qualified nonempty admissible model family contains both outcomes

INCOMPLETE:
    required scope/evidence/QU/model authority is absent.
~~~

No admitted assertion uses computational ignorance or failed search as semantic UNKNOWN.

A12's shorthand that a QU-mediated classification may be UNKNOWN or INCOMPLETE is controlled by IA-042/043 and A24:

- qualified disagreeing realizations -> UNKNOWN;
- missing authority -> INCOMPLETE.

## 6. Scoped/global identity audit

Identity-related rounds reviewed:

- A1;
- A4-A6;
- A8-A15;
- A17-A19;
- A21-A24.

No retained assertion promotes scoped residual/aggregate SAME to global natural identity.

IA-147 explicitly requires global witness-object SAME before using identity to recover a common witness.

IA-148 preserves identity-truth versus construction separation.

IA-274/290/301 preserve reduction/canonicalization/extensional-equivalence firewalls.

## 7. Implicit assertion dependency audit

Index 0.8 state:

~~~text
admitted assertions:            341
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

Superseded admissions:

~~~text
IA-013 predecessor round-1 admission
IA-304 predecessor exact-equivalence admission
IA-305 predecessor exact-mutual-simulation admission.
~~~

No current assertion references superseded IA-304 or IA-305.

Numeric coverage from IA-001 through IA-344 is continuous except exactly those three superseded IDs:

~~~text
missing from admitted index:
    013
    304
    305.
~~~

## 8. Seeded-candidate closure audit

Early seeded candidates were traced forward.

Resolved in later rounds:

~~~text
CA-006   -> choice/path normalization
CA-007   -> finite local branching
CA-008   -> polynomial choice/certificate bound
CA-009   -> deterministic verification
CA-010   -> branching -> verifier
CA-011   -> verifier -> branching
CA-012   -> bounded existential reformulation
CA-013   -> polynomial candidate enumeration
CA-015   -> residual quotient propagation
CA-016   -> SAME equivalence closure
CA-017   -> continuation equality -> scoped SAME
CA-018   -> global DISTINCT + scoped SAME compatibility
CA-019   -> scoped substitution
CA-020   -> class-count/minimal quotient results
CA-021   -> one-class collapse
CA-030..036 -> tape growth / encoding / verifier results.
~~~

One seeded candidate remains intentionally unadmitted:

~~~text
CA-001 — global numeral-normal-form uniqueness.
~~~

Reason:

The P-vs-NP truth path does not require it, and the current primitive induction/predicate representation does not supply enough explicit support to promote a universal numeral-normal-form theorem without additional closure work.

This is recorded as an intentional non-admission, not a missed assertion.

## 9. A1-A23 revalidation after bundle correction

The previous bundle 0.4 revalidation remains valid.

No retained assertion requires the rejected global claim:

~~~text
every transition relation is functional.
~~~

Functional results are explicitly scoped to functional realizations.

Branching/certificate results use genuine branching semantics.

## 10. New A24 native-support closure

A24 admits:

~~~text
IA-340 incomplete query template cannot support exact NEI result
IA-341 opaque evidence/model handles do not discharge authority
IA-342 QU OPEN requires recoverable R(Q)
IA-343 quotient equality establishes only its scoped relation
IA-344 result roles must be downstream of independent identity authority.
~~~

These are support restrictions, not a P-vs-NP solution claim.

## 11. Operational fixed-point result

For the audit targets:

~~~text
NEI scope misuse
QU status misuse
global/scoped identity leakage
support-reference closure
A21 local-simulation completeness
seeded candidate disposition
~~~

a no-new-defect pass was reached after the corrections above.

This is an **operational fixed point for this audit surface**.

It is not a claim that all mathematical consequences of the P-vs-NP IsoGraph have been enumerated.

## 12. Current authority

Use:

- P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg;
- ASSERTION_BASE_A0_0_2.md;
- P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md;
- P_VS_NP_NEI_OVERLAY_0_5.isg as fail-closed native templates;
- IMPLICIT_ASSERTION_INDEX_0_8.json.

Do not use:

- bundle 0.3 as primitive authority;
- NEI overlay 0.4 as current native result authority;
- IA-304/305 predecessor equivalence claims.

## 13. Remaining qualification boundaries

Still open:

~~~text
Core 0.20 qualification
selected primitive machine convention <-> exact official convention bridge
full native instantiation/qualification of concrete P-vs-NP NEI result records
universal implicit semantic completeness.
~~~

## 14. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
