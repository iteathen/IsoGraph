# Experiment 009 — Authoring Audit

**Status:** pre-freeze development audit  
**Purpose:** attempt to falsify the qualification design before spending an external semantic call.

## Leakage audit

Cold-visible files are limited to Core 0.17, QU 0.1, NEI 0.1, NEI 0.2, the public cases, and the public prompt.

Excluded from the cold packet:

- hidden assertions;
- scorer source;
- this authoring audit;
- historical Experiment 006-008 reports/oracles;
- repository map;
- AGENTS files;
- expected module dispositions;
- prior outputs.

The public enum vocabulary is not hidden answer leakage. It is an explicitly frozen serializer contract. Which enum applies to which case remains the semantic task.

## Exact-wording audit

The scorer checks exact enum values only where the public prompt explicitly requires those enum spellings.

Free-text `reason`, `authority_used`, and `rejected_overclaims` are not matched against hidden phrases.

A nontrivial reason and at least one authority reference are required only to prevent empty enum-only responses.

## Paired-case audit

Initial drafting exposed an ambiguity: C10, C11, C12, C14, C15, and C16 contain more than one named semantic subquery.

Correction made before freeze:

- public `subresults` were added to the output contract;
- stable public subquery names were added to the corpus;
- the hidden scorer checks those public names directly;
- C10's top-level decision was corrected to `SUPPORTED` because the distinction is semantically established even though `Q_search` is computationally incomplete;
- C12 no longer has an artificial single top-level structural-relation expectation.

## Circularity audit

C18 explicitly presents a downstream-isomorphism loop that tries to choose its own QU restriction and NEI premise. Correct treatment must reject the circular evidence while preserving the original open realization family.

No hidden assertion is used to define the public QU possibility universe.

## Redundancy audit

Some obligations recur intentionally because they act as cross-checks:

- C03 and C12 both touch QUI, but C03 checks alpha-renaming while C12 checks equal-information-scalar non-implication.
- C13 and C15 both touch NEI/QU interaction, but C13 checks QUI overclaim while C15 checks exact model-family classification.
- C16 and C17 both exercise missing identity authority, but C16 tests representation/application semantics while C17 tests cross-realization anchoring.

These are orthogonal controls rather than duplicate model calls; all run in one packet.

## Coverage audit

QU 0.1 Section 25 is covered by:

- ordinary Core isolation: C01;
- opaque UNKNOWN versus relational unknown: C02;
- shared referent versus distinct constrained-equal referents: C02;
- alpha-renaming: C03;
- intensional large/infinite realization family: C04;
- excluded realization/closure authority: C05;
- OPEN/DETERMINATE/INCONSISTENT/INCOMPLETE_SCOPE: C06-C09;
- semantic UNRESOLVED versus incomplete computation: C10;
- refinement versus revision: C11;
- QUI under renaming: C03/C12;
- equal information scalar not implying QUI: C12;
- QUI not implying actual-resolution equality or NEI SAME: C13;
- cross-realization subject correspondence: C17;
- anti-circularity: C18.

NEI 0.1 Section 24 and NEI 0.2 Section 10 are covered by:

- Core/SI isolation: C01;
- determinate path without artificial QU: C14;
- QU required for unresolved identity-relevant possibilities: C15/C17;
- fail incomplete when anchor/authority is missing: C17;
- SI/factorization/method differences not automatically DISTINCT: C16-A;
- same-looking representation not automatically SAME: C16-B;
- qualified all-model SAME/DISTINCT/UNKNOWN/no-model: C15;
- structural isomorphism/QUI not identity proof: C13;
- incomplete computation versus semantic UNKNOWN: C10/C15;
- application identity-separating authority: C16-C;
- application identity-preserving authority: C16-D;
- application relation with unresolved identity relevance remains incomplete: C17;
- explanatory terminology is non-load-bearing through authority-based case formulation;
- circular restriction/downstream isomorphism cannot qualify its own premise: C18.

## Model-specific assumptions

The prompt requires JSON and public enums only. No chain-of-thought, provider-specific tool call, hidden reasoning field, or theorem-name recognition is required.

The runner strips provider thought parts and freezes only the visible answer.

## Scorer audit

Deterministic scorer tests include:

1. complete synthetic passing report -> `QUALIFIES`;
2. one semantic mismatch -> `DOES_NOT_QUALIFY`;
3. missing case -> coverage guard failure.

Any scorer change after freeze invalidates the run as the same campaign.

## Remaining limitation

Experiment 009 tests semantic reconstruction/classification, not implementation performance or universal discovery ability. Passing it can qualify the declared QU/NEI semantic modules only within their stated claims and dependencies.

## Pre-freeze disposition

No known qualification-bearing ambiguity remains. The campaign may proceed to deterministic preflight and one cold semantic call.
