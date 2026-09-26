# Qualified Module Authority Manifest — 2026-09-26

**Status:** current qualified authority/provenance manifest  
**Historical predecessor:** `qualification/QUALIFIED_MODULES_2026-09-25.md`

This manifest is the current routing authority for the qualified IsoGraph semantic family as of 2026-09-26.

It does not rewrite or supersede the evidentiary meaning of the 2026-09-25 or 2026-09-18 manifests. Historical files, hashes, and qualification dispositions remain authoritative for the revisions they tested.

## Current effective Core

Current Core authority is cumulative:

- base: `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
- qualified clarification: `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`;
- Core 0.18 SHA-256: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`;
- Core 0.18 qualification: `qualification/CORE_0_18_QUALIFICATION.md`;
- qualified clarification: `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`;
- Core 0.19 SHA-256: `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`;
- Core 0.19 qualification: `qualification/CORE_0_19_QUALIFICATION.md`;
- Core 0.19 broad evidence: Experiment 029, 25/26 frozen PASS with immutable formal `DOES_NOT_QUALIFY`;
- Core 0.19 corrected focused regression: Experiment 030 run `36233426103`, 2/2 PASS, formal `QUALIFIES`;
- exact-rendering predecessor evidence: six ESR-qualified/Q7-promoted source renderings.

The historical `_CANDIDATE` filenames are retained because those exact bytes were tested. Qualification status comes from this manifest and the revision-specific qualification records.

## Current qualified semantic extensions

### Quantifiable Unknown 0.1

Artifact:

`extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`

SHA-256:

`1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

Qualification remains the exact evidence recorded in the 2026-09-18 manifest and Experiment 013.

### Natural Entropic Identity 0.4

Artifact:

`extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`

SHA-256:

`6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`

Qualification evidence:

- Experiment 016;
- `experiments/016/EXPERIMENT_016_FINAL_QUALIFICATION_REVIEW.md`;
- formal disposition `QUALIFIES`.

### Discovery Protocols 0.1–0.7

Current Discovery Protocol authority is cumulative.

Qualified hashes:

- DP 0.1: `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`;
- DP 0.2: `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`;
- DP 0.3: `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`;
- DP 0.4: `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`;
- DP 0.5: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`;
- DP 0.6: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`;
- DP 0.7: `7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d`.

DP 0.7 qualification evidence:

- completed three-positive-control campaign, accepted workflow `36228776786`, hidden score PASS 3/3;
- Experiment 028 workflow `36231568578`, D01–D13 all PASS, formal disposition `QUALIFIES`;
- `experiments/028/EXPERIMENT_028_FINAL_QUALIFICATION_REVIEW.md`;
- `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_7_QUALIFICATION_REVIEW.md`.

Together the fresh positive-control and Experiment 028 evidence discharge all seventeen DP 0.7 section-17 qualification targets.

DP remains discovery/search guidance and does not become semantic proof authority.

Core 0.19 is now independently qualified at its exact tested revision. DP 0.7's conditional exact source-rendering path therefore routes through qualified Core 0.19 section 18 when that path is invoked.

### Detailed Transition System 0.1

Artifact:

`extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`

SHA-256:

`9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

Native vocabulary SHA-256:

- `extensions/dts/DTS_NATIVE_VOCAB_0_1.md`: `fe1a65922186232524c07f4e8b6a29fecb3e8dfcedf9de678c6678e8226986a6`;
- `extensions/dts/DTS_VOCAB_0_1.isg`: `ac3ff97f0a22c38628b5ae05a9471a9df1bbc83833c11a16f6ac9aad5ea9f2fb`.

Qualification evidence:

- Experiment 026 cold qualification run `36190237108`, 20/20 PASS, formal `QUALIFIES`;
- Experiment 026 independent promotion verifier run `36190514681`, verdict `SUPPORT_PROMOTION`;
- `experiments/026/EXPERIMENT_026_FINAL_QUALIFICATION_REVIEW.md`;
- `qualification/DTS_0_1_QUALIFICATION.md`.

DTS 0.1 is a separately versioned qualified extension. It does not become Core. TI remains scoped structural correspondence and does not imply NEI `SAME`, mechanism identity, canonical decomposition, or equality of actual QU realizations.

## Integrated current-stack qualification

The latest fully integration-qualified composition is now revision-scoped to:

```text
Core 0.17 + Core 0.18 + Core 0.19
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

Experiment 031 directly qualifies this exact composition for the exercised dependency-closed scope.

Experiment 031:

- workflow run: `36256020851`;
- frozen execution SHA: `cd5d3b9f0281ba2bf222e4c2541f90ab4c4dac7b`;
- evidence commit: `8091d5ae4e7a184461b53caebd8352bc24c67de7`;
- 32 / 32 cases PASS;
- zero mismatches;
- all scoring guards true;
- all module assessments `SUPPORTED`;
- formal disposition: `QUALIFIES`;
- packet SHA-256: `61e5d852f59566c8499c4b47d794083fc455ff9444d8496fb5c21c1d448b7c74`;
- report SHA-256: `f31b82de5cc10259c8548b204f936a5544ee1e1053dcf400faf7c9521cbe0c53`;
- authority record: `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_19_2026-09-26.md`.

The previous Core-0.18 full-stack record in `qualification/CURRENT_INTEGRATED_STACK_WITH_DP07_2026-09-26.md` remains immutable predecessor evidence. Experiment 031 does not rewrite Experiments 027–030 or their historical dispositions.

This establishes compatibility for the exercised exact current composition. It is not a universal completeness claim.

## Qualified infrastructure

QRC 0.1 remains qualified qualification infrastructure:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`;
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`.

QRC is not semantic domain authority.


## Revision rule

Any semantic change to a qualified artifact creates a new revision and its affected qualification burden.

```text
current routing authority
    != historical evidence rewrite

qualified extension
    != Core membership

integrated qualification
    != universal completeness
```
