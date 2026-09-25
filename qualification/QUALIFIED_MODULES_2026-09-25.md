# Qualified Module Authority Manifest — 2026-09-25

**Status:** current qualified authority/provenance manifest  
**Historical predecessor:** `qualification/QUALIFIED_MODULES_2026-09-18.md`

This manifest is the current routing authority for the qualified IsoGraph semantic family as of 2026-09-25.

It does not rewrite or supersede the evidentiary meaning of the 2026-09-18 manifest. Historical files, hashes, and qualification dispositions remain authoritative for the revisions they tested.

## Current effective Core

Current Core authority is cumulative:

- base: `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
- qualified clarification: `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`;
- Core 0.18 SHA-256: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`;
- qualification: `qualification/CORE_0_18_QUALIFICATION.md`;
- fresh semantic evidence: Experiment 017, formal disposition `QUALIFIES`.

The historical `_CANDIDATE` filename is retained because those exact bytes were tested.

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

### Discovery Protocols 0.1–0.6

Current Discovery Protocol authority is cumulative.

Historical qualified baseline hashes:

- DP 0.1: `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`;
- DP 0.2: `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`;
- DP 0.3: `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`;
- DP 0.4: `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`.

Qualified successor hashes:

- DP 0.5: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`;
- DP 0.6: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`.

Successor qualification:

- Experiment 018;
- `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_6_QUALIFICATION_REVIEW.md`;
- formal disposition `QUALIFIES`.

DP remains discovery/search guidance and does not become semantic proof authority.

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

The current expanded composition:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
+ DTS 0.1
```

passed Experiment 027:

- frozen SHA: `c53856f840dc1c9ee29bb55b509f6de3f6926179`;
- workflow run: `36191443384`;
- 18 / 18 cases PASS;
- zero mismatches;
- all scoring guards true;
- module assessment: `SUPPORTED`;
- formal disposition: `QUALIFIES`;
- packet SHA-256: `1ab972c5edf76c2644f5bccd4f15bed9175a5babca32c0d549bb6363e0b3e2cd`;
- report SHA-256: `37af0c0330879f940c75eab39fb245bb4924292598015f138f70093141ee33c8`;
- authority record: `qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md`.

This establishes compatibility for the exercised expanded composition. It is not a universal completeness claim.

### Historical pre-DTS integration

Experiment 019 remains the immutable integration record for:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
```

Its authority record remains `qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md`. Experiment 027 extends current integration routing; it does not rewrite Experiment 019 evidence.

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
