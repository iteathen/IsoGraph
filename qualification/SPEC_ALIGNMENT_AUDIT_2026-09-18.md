# IsoGraph full-stack specification alignment audit — 2026-09-18

**Result:** ALIGNED, with one shared clarification gap captured by Core 0.18 candidate  
**Scope:** live IsoGraph semantic/qualification stack after NEI 0.3 and Discovery Protocol 0.5 candidate integration  
**Qualified authority changed by this audit:** no

## Governing ideals checked

The audit used these structural ideals:

1. **Perception before judgment.** A discrepancy is initially an observation, not automatically a defect.
2. **Sameness is positive and scoped.** Absence of an observed difference does not establish sameness unless the identity-relevant claim scope is sufficiently closed.
3. **Difference is not automatically ontological.** A represented/classification/property difference becomes identity-separating only under authority that gives it that role.
4. **Unknown is structural.** Missing or unresolved information must not be flattened into sameness, difference, falsehood, arbitrary hidden facts, or an opaque marker when relational structure is available.
5. **Semantic UNKNOWN is positive structure.** Missing authority/incomplete closure is not silently relabeled as semantic QU/NEI unresolvedness.
6. **Distinct objects may share exact properties.** Scoped property/behavior/quotient equality does not require global identity.
7. **Exact collapse is scope-relative.** A quotient may remove only distinctions proved irrelevant to its declared obligations; unknown potentially load-bearing distinctions are not projection permission.
8. **Residuals and discrepancies are discovery signals.** Qualification adjudication may finish while a separate structural lead remains open.
9. **Propagation is informative.** A newly exposed load-bearing distinction may invalidate a broad dependency cone; explicit propagation is a feature, not something to suppress.
10. **Lower information is allowed only after sufficiency is proved.** Compression/minimality/coarseness never supplies missing semantic or identity evidence.
11. **Evidence remains immutable.** Failed/partial historical runs and earlier authority revisions are not rewritten to match later understanding.
12. **No forced isomorph.** An interesting anomaly is not proof of hidden equivalence; ordinary error remains a legal terminal explanation.

## Spec-by-spec result

| Artifact | Alignment | Audit conclusion |
|---|---|---|
| Core 0.17 | PASS with explicitness gap | Semantics preserve scope, residuals, ambiguity, view/target-layer separation, context-scoped witness quotients, and incomplete-search discipline. Section 43 begins at failure classification and did not explicitly require observation/quantity alignment first. Core 0.18 candidate adds that precondition without changing Core primitives. |
| QU 0.1 | PASS | Strong alignment. Unknown is relational structure; possibility universe and closure are authority-bounded; unrepresented facts do not become false or arbitrary admissible hidden facts; `INCOMPLETE_SCOPE` is distinct from `OPEN/UNRESOLVED`; QUI is structural rather than identity authority. No amendment required. |
| NEI 0.1 | PASS | Rejects coarseness as sameness evidence; positive SAME requires qualified support; SAME/DISTINCT/UNKNOWN are model-family results; incomplete authority/search is not semantic UNKNOWN; property change does not automatically imply identity change. |
| NEI 0.2 | PASS | Explicitly preserves application distinctions without pre-judging identity significance. Prevents presumptive identity lift in either direction. |
| NEI 0.3 candidate | PASS | Makes observation/closure/scope/unknown-preserving collapse explicit. Revised during sanity audit so SAME excludes admissible DISTINCT resolutions rather than incorrectly requiring identical properties. Bound to Core 0.18 candidate. |
| DP 0.1 | PASS | Already treats residuals and unknown structure as search targets; candidate lifecycle separates hypotheses from qualified claims; falsification is evidence-seeking rather than label-driven. |
| DP 0.2 | PASS under cumulative later corrections | Establishes residual-is-not-divergence and identity-sensitive stopping. Earlier broader NEI-gate behavior is narrowed by DP 0.3/0.4. |
| DP 0.3 | PASS | Evidence burden follows the conclusion; structural, rigid-authority, natural-identity, and cost-bounded stops are separated; unresolved identity cannot masquerade as rejection. |
| DP 0.4 | PASS | Different machinery is not itself a breaker; a breaker must identify a failed load-bearing obligation; discovered correspondences re-enter discovery instead of being ignored. |
| DP 0.5 candidate | PASS | Adds the missing observation-first discrepancy discipline, quantity/scope alignment, dual hidden-distinction/hidden-equivalence leads, separate qualification/discovery dispositions, and propagation-as-evidence behavior. Bound to Core 0.18 candidate. |
| QRC 0.1 | PASS | Explicitly constrains conclusions more than exploration; separates semantic meaning from serializer conformance; preserves historical failed scores; hidden scorers cannot invent undisclosed semantic obligations. |
| Qualification Resource Discipline | PASS | Freezing, non-rerun-for-prettier-answer, deterministic-first evidence, and completeness-over-cost rules all align. |
| Native Format | PASS | Carries no semantic authority itself; prevents file extension/serialization from becoming ontology. |

## Shared gap found

The only cross-stack gap was **ordering**, not a contradictory semantic rule.

Qualified Core 0.17 Section 43 says:

```text
Before specification repair, classify a failure...
```

QU 0.1 and NEI 0.1 contain analogous extension-local failure-classification sections.

Those rules are sensible once a defect/failure has actually been established, but none explicitly says what must happen **before deciding that an observed discrepancy is a failure**.

That omission can bias an agent toward:

```text
mismatch -> failure category -> fix
```

instead of:

```text
mismatch
-> observation
-> determine what each side denotes
-> align scope/quantity/layer/closure
-> inspect hidden distinction/equivalence/unknown
-> only then classify failure or non-defect
```

The new Core 0.18 candidate supplies this shared precondition.

It does not retroactively reinterpret qualified Core/QU/NEI evidence. Extensions only inherit it when they explicitly depend on the new revision or an exact bridge.

## Qualified immutable blobs rechecked

The audit re-read the live repository and confirmed these authority artifacts were not mutated:

```text
Core 0.17     fb47f8de1bd70d6f9fe1d4cf5181a52018ce8e04
QU 0.1        745173425a647609db99ddb11530c28cc279ada8
NEI 0.1       d9da13d7df3515e4229d61f43b0b94a2cae0fedb
NEI 0.2       a9a9d01af733e461b609c5b1bd9f9f23128c04b4
DP 0.1        4274ac72f42ff9b68aea491882194ca258bf8344
DP 0.2        d831321771be6c85c4b2dd2f96ed86ecef151927
DP 0.3        952c33d5229ffd5db2e976d25706e0bb5eedd39d
DP 0.4        32b6dbccbd3d3d78864ff46d93a3fd53ee559abd
QRC 0.1       b429431fc808c1c5fb72ce524bb1762e2dca4427
```

Qualified module manifest also remains unchanged.

## Current successor candidate set

After the audit:

```text
Core 0.18 observation-first candidate
    f092962900f7e8ff28517458e23df48285d7e9ad

NEI 0.3 candidate
    2192a45dd21ba4564e1d7d89c5d3a6458a304995

Discovery Protocol 0.5 candidate
    c9328ac762d4573480ea6292d1c3775ad58b0b81
```

NEI 0.3 and DP 0.5 explicitly depend on the Core 0.18 observation-first clarification for this successor stack.

## Sanity conclusions

### No accidental global identity rule

The stack does not claim:

```text
same observed properties -> same object
different observed properties -> different object
```

Instead identity significance remains profile/authority scoped.

### No arbitrary open world

The stack does not solve missing information by admitting every imaginable hidden fact.

QU requires a qualified possibility universe, constraints, interfaces, scope, and closure authority.

### No compression-driven sameness

No current or successor rule permits:

```text
smaller representation
fewer identity classes
larger common core
simpler factorization
```

to become positive semantic evidence merely because it is desirable.

### No repair-first requirement remains in the successor design

Core 0.18 + DP 0.5 establish:

```text
observe -> understand -> classify -> repair if warranted
```

while retaining a fast path for proved mechanical corruption.

### Propagation remains intentionally strict

No rule was added to quarantine a newly discovered distinction merely to protect downstream conclusions.

Dependency invalidation remains visible and revision-scoped.

### Discovery remains open without becoming credulous

The successor design follows structural leads but explicitly permits:

```text
ordinary decoder error
ordinary implementation error
no surviving structural lead
```

as legitimate outcomes.

It does not require every anomaly to become an isomorph.

## Qualification boundary

This audit is a semantic/design sanity review, not fresh cold qualification.

Current qualified authority remains:

```text
Core 0.17
QU 0.1
NEI 0.1 + 0.2
Discovery Protocols 0.1-0.4
QRC 0.1 infrastructure
```

Core 0.18, NEI 0.3, and DP 0.5 remain unqualified successor candidates until focused fresh qualification is completed.

**Final sanity disposition: successor specification stack aligns with the intended observation-first, unknown-preserving, scope-aware structural ideals.**
