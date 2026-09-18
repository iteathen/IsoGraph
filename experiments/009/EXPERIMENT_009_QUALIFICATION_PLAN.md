# Experiment 009 — Joint QU + NEI Qualification Plan

**Status:** development candidate until frozen  
**Purpose:** qualify QU 0.1 and the cumulative NEI 0.1 + 0.2 module with one high-information cold corpus.

## Authority packet

Cold decoder receives only:

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`
- `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md`
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`
- `experiments/009/QU_NEI_CASES.md`
- `experiments/009/COLD_PROMPT.md`

It does not receive hidden assertions, scorer source, authoring audit, prior outputs, repository map, AGENTS files, historical experiment reports, or external browsing.

## Semantic objective

One cold reconstruction must cover the dependency-closed qualification obligations of both QU and NEI without turning each obligation into a separate external call.

The corpus uses paired/metamorphic cases so one structural change changes exactly the conclusion expected to change.

## Case families

- Core isolation.
- Relational unknown structure and SI distinction.
- Alpha-renaming invariance.
- Intensional realization families and closure.
- QU state taxonomy.
- Semantic unresolved versus incomplete computation.
- Refinement versus revision.
- QUI and near-QUI controls.
- Information-scalar non-equivalence.
- Determinate NEI.
- QU-mediated NEI SAME/DISTINCT/UNKNOWN/no-model.
- Application identity authority.
- Cross-realization anchors.
- Anti-circularity.

## Output contract

The public prompt requires JSON with one result per public case ID. Exact case IDs and classification vocabulary are public serializer requirements so deterministic scoring may depend on them. Free-text reasoning is not scored by exact wording.

Every result must contain:

```json
{
  "case_id": "C01",
  "classification": "PUBLIC_ENUM",
  "reason": "step-grounded explanation",
  "authority_used": ["..."],
  "rejected_overclaims": ["..."]
}
```

The scorer verifies classifications against hidden assertions and checks a small set of structural guard fields. It does not require hidden reasoning tokens or undisclosed synonyms.

## Qualification dispositions

QU and NEI are scored independently.

A dependency failure can block NEI promotion where NEI relies on QU, but a failed NEI-specific case does not rewrite an otherwise satisfied QU obligation.

Possible final dispositions:

- `QUALIFIED`
- `QUALIFIED_WITH_EXPLICIT_SCOPE`
- `DOES_NOT_QUALIFY`
- `INCOMPLETE_EVIDENCE`
- `INFRASTRUCTURE_FAILURE`

## External-resource budget

Default:

1. one isolated Gemini cold decoder over the complete frozen packet;
2. deterministic post-freeze scoring;
3. one independent OpenRouter verifier only if the cold run and score are promotion-capable.

Provider failure does not count as semantic evidence and may be retried only as infrastructure recovery.

## Freeze discipline

Before the semantic call:

- candidate SHA fixed;
- packet paths fixed;
- hidden assertions fixed;
- scorer tests pass;
- dry-run packet hash recorded;
- workflow checks out exact candidate SHA.

After the call:

- raw response frozen before scoring;
- report hash recorded;
- hidden scorer runs only after freeze;
- no semantic file is edited and called the same campaign.
