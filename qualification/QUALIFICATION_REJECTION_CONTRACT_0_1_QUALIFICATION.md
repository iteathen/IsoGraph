# Qualification Rejection Contract 0.1 — Infrastructure Qualification

**Module:** QRC 0.1  
**Scope:** qualification infrastructure only  
**Semantic authority:** none  
**Disposition:** QUALIFIED_FOR_QUALIFICATION_INFRASTRUCTURE_USE  
**Date:** 2026-09-18

## Qualification claim

QRC 0.1 is qualified for use as public qualification infrastructure that distinguishes semantic rejection coverage from exact serializer conformance.

This disposition does **not** promote QRC into Core, QU, NEI, Discovery Protocol, or other semantic authority.

## Frozen obligations

QRC 0.1 requires deterministic evidence that:

1. exact canonical IDs satisfy semantic and exact-serialization coverage;
2. direct natural-language labels that identify the public concepts satisfy semantic coverage without requiring exact serialization;
3. structured canonical rejected-claim entries satisfy semantic coverage;
4. vague text such as generic `identity` does not accidentally satisfy `NATURAL_IDENTITY`;
5. missing required concepts remain missing;
6. recognition uses only the public versioned ontology/signatures and no hidden alias table.

## Evidence

The implementation and deterministic tests are:

- `tools/qualification/semantic-rejections.mjs`
- `tools/qualification/test-semantic-rejections.mjs`

The investigation review records that these deterministic tests passed before the fresh Experiment 008 cold run:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_REVIEW.md`

Experiment 008 then exercised QRC 0.1 in a new blind holdout frozen after the contract:

- formal disposition: `QUALIFIES`;
- QRC semantic rejection guard: PASS;
- exact canonical-string coverage: PASS in that decoder output.

Experiment 007 remains historically `DOES_NOT_QUALIFY` under its frozen scorer. Its later QRC audit is diagnostic only and is not used to rewrite historical evidence.

## Assessment

The qualification burden for QRC 0.1 is deterministic mechanism correctness plus successful use in a post-freeze blind qualification packet. That burden is discharged.

No further external semantic-model call is required merely to reconfirm the deterministic normalization mechanism.

## Boundaries

This qualification does not establish that:

- every natural-language paraphrase can be recognized;
- unresolved/ambiguous text should be guessed;
- exact canonical IDs are mandatory when a public schema does not require them;
- QRC supplies semantic evidence for a Discovery Protocol result;
- QRC promotes any candidate semantic module.

Unrecognized or ambiguous text remains unresolved.

## Promotion rule going forward

A future change to the public rejection ontology, lexical signatures, recognition order, or qualification-bearing semantics requires a new version and its own deterministic qualification evidence before use in a new frozen holdout.

Historical QRC 0.1 evidence remains attached to this revision.
