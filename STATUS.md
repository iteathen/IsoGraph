# IsoGraph Status

**Project state:** research incubation / qualified modular authority stack  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Current qualified authority

### Core

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

Draft 0.17 remains the qualified Core authority. Bare IDs are **Semantic Identity (SI)** handles for representation-level addressing and referential identity. SI equality or inequality does not independently establish stronger natural/ontological identity.

### Qualified semantic extensions/modules

Current qualified extension/module authority is recorded in:

- `qualification/QUALIFIED_MODULES_2026-09-18.md`

It binds the exact tested revisions of:

- Quantifiable Unknown (QU) 0.1;
- Natural Entropic Identity (NEI) 0.1 with NEI 0.2 as the cumulative clarification layer;
- Discovery Protocols 0.1 through 0.4 as one cumulative current module.

The tested semantic files retain their historical `_CANDIDATE` filenames. Their current qualification status comes from the authority manifest and exact content hashes, not from the filename.

Qualified extensions remain separately versioned dependencies. Qualification does **not** silently import QU, NEI, or Discovery Protocol semantics into Core.

### Qualified infrastructure

QRC 0.1 is qualified for qualification-infrastructure use:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`

QRC is not semantic domain authority.

## Core provenance retained

Draft 0.16 remains immutable historical authority for the obligation-sufficiency clarification qualified by Experiment 005.

Experiment 005:

```text
post-freeze scoring:       8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
independent verifier:      VERIFIED
unresolved obligations:    none
```

Final review:

- `experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md`

Draft 0.17 is a narrow Semantic Identity description correction over Draft 0.16 and changes no operational bare-ID behavior.

## QU / NEI qualification

Experiment 009 remains an immutable formal `DOES_NOT_QUALIFY` run. Its review separated public-output-contract defects from one substantive identity-authority overreach.

Experiment 013 used fresh focused cases and proposition-specific public scoring:

```text
formal disposition:       QUALIFIES
QU 0.1:                   PASS
NEI 0.1 + 0.2:            PASS
case coverage:             8 / 8
mismatches:                none
workflow run:              35376498717
```

Final review:

- `experiments/013/EXPERIMENT_013_FINAL_QUALIFICATION_REVIEW.md`

The corrected evidence specifically confirms that missing identity authority remains incomplete; it is not silently upgraded to semantic NEI `UNKNOWN`.

## Discovery Protocol qualification

Discovery Protocols 0.1-0.4 are now qualified as one cumulative module at the exact hashes recorded in the authority manifest.

The evidence chain is intentionally preserved rather than rewritten:

- Experiment 007: blind semantic discovery success; immutable formal `DOES_NOT_QUALIFY` due hidden serializer/token requirements.
- Experiment 008: fresh post-QRC blind `QUALIFIES`.
- Experiment 010: immutable `DOES_NOT_QUALIFY`; review found one hidden-oracle defect and one genuine omitted overclaim.
- Experiment 012: immutable `DOES_NOT_QUALIFY`; semantic behavior succeeded but the hidden scorer imposed an undisclosed singleton-array mapping shape.
- Experiment 014: fresh corrected mapping-contract holdout formally `QUALIFIES` with zero mismatches.

Experiment 014:

```text
workflow run:              35376711200
attempt 1:                 provider failure only
attempt 2 semantic score:  QUALIFIES
mismatches:                none
```

Reviews:

- `experiments/014/EXPERIMENT_014_FINAL_QUALIFICATION_REVIEW.md`
- `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_4_QUALIFICATION_REVIEW.md`

Discovery remains discovery: protocol priority is not structural proof authority.

## Integrated module-stack qualification

Experiment 011 correctly recovered the structural integration behavior but remains formally `DOES_NOT_QUALIFY` because its free-text overclaim list did not discharge all four public rejection guards.

Experiment 015 used a fresh integrated holdout with proposition-specific overclaim fields.

```text
formal disposition:       QUALIFIES
workflow run:              35377399665
attempt 1:                 provider failure only
attempt 2:                 HTTP 200
score mismatches:          none
module assessment:         SUPPORTED
```

The integrated run correctly preserved:

- source-local exact-D provenance;
- alternative noncanonical factorization;
- relational unknown sharing and QUI;
- NEI authority incompleteness where no identity authority existed;
- structural discovery despite misleading labels;
- weak versus strong embedding;
- target-only residuals;
- source-local versus pairwise accounting;
- rejection of unsupported global isomorphism, natural identity, same intermediate objects, and same algorithm.

Final review:

- `experiments/015/EXPERIMENT_015_FINAL_QUALIFICATION_REVIEW.md`

This establishes compatibility for the exercised composition. It is not a universal completeness claim.

## Historical authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Historical evidence remains interpreted against the exact revision where it was produced. Failed/partial qualification results are never rewritten merely because later campaigns corrected their defects.

## Immediate work

The current modular authority stack is qualified sufficiently to use QU, NEI, and cumulative Discovery Protocol semantics as explicit versioned dependencies in new work.

For the Connect4 authority-transition effort, the next burden is therefore not to requalify these modules. It is to:

1. construct the complete source-faithful IsoGraph representation;
2. preserve unknown/uncertain structure explicitly;
3. demonstrate source coverage and reconstruction fidelity;
4. independently verify the representation and its residual/accounting obligations;
5. only then promote the resulting IsoGraph corpus as the authority for the represented Connect4 logic.

Any semantic change to a qualified IsoGraph module creates a new revision with its own affected qualification burden.
