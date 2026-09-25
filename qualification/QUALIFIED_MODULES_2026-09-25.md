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

## Integrated current-stack qualification

The current composition:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
```

passed Experiment 019:

- frozen SHA: `7609a2d8a0a167d9674904e045fa41374df07f7c`;
- workflow run: `36178254627`;
- 14 / 14 cases PASS;
- zero mismatches;
- formal disposition: `QUALIFIES`;
- packet SHA-256: `b44cbfa5d2fdf30deb5ca58506020154245e90e65e9f82ff65832f8952787f9e`;
- report SHA-256: `5d24ba9bf8cc6d4a83ca69a911fe0feaa81f6831743b6f5679d0e4a08714aa4c`;
- authority record: `qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md`.

This establishes compatibility for the exercised composition. It is not a universal completeness claim.

## Qualified infrastructure

QRC 0.1 remains qualified qualification infrastructure:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`;
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`.

QRC is not semantic domain authority.

## Active unqualified extension work

DTS 0.1 remains unqualified research until its own dependency-closed qualification campaign passes.

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
