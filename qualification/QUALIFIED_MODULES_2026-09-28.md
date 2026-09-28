# Qualified Module Authority Manifest — 2026-09-28

**Status:** current qualified authority/provenance manifest  
**Historical predecessor:** `qualification/QUALIFIED_MODULES_2026-09-26.md`

This manifest is the current routing authority for the qualified IsoGraph semantic family as of 2026-09-28.

Historical manifests remain immutable authority for the exact revisions they recorded.

## Current effective Core

Current Core authority is cumulative:

- base: `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
- Core 0.18 qualified clarification — SHA-256 `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`;
- Core 0.19 qualified clarification — SHA-256 `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`;
- Core 0.20 qualified primitive-logic-closure clarification — SHA-256 `9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7`.

Core 0.20 qualification:

- `qualification/CORE_0_20_QUALIFICATION.md`;
- Experiment 048 run `36364086659`;
- 18 / 18 fresh cases PASS;
- formal disposition `QUALIFIES`.

Historical `_CANDIDATE` filenames are retained because those exact bytes were tested. Qualification status comes from this manifest and revision-specific records.

## Current qualified semantic extensions

### Quantifiable Unknown 0.1

- artifact: `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`
- SHA-256: `1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

### Natural Entropic Identity 0.4

- artifact: `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`
- SHA-256: `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`

### Discovery Protocols 0.1–0.8

Current Discovery Protocol authority is cumulative.

DP 0.1–0.7 retain their previously qualified exact hashes.

New qualified successor:

- DP 0.8 artifact: `extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md`
- SHA-256: `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`
- qualification: `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_8_QUALIFICATION_REVIEW.md`
- valid fresh principle-level evidence: Experiment 050, 21 cases PASS;
- fresh target-5 replacement: Experiment 051, 1 / 1 PASS.

DP remains discovery/search guidance and does not become proof authority.

### Detailed Transition System 0.1

- artifact: `extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`
- SHA-256: `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

DTS remains a separately versioned qualified extension.

## Current integrated stack

The current directly integration-qualified composition is:

```text
Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.8
+ DTS 0.1
```

Experiment 052:

- workflow run: `36365347906`;
- frozen execution SHA: `ab206d2edb2567cbd4219d5bcc35f0b3ec400dc6`;
- 16 / 16 integration cases PASS;
- all scoring guards true;
- all module assessments `SUPPORTED`;
- packet SHA-256: `f150b48832746e00b990a0059e61426d7e6e169947437a68c693898018856f11`;
- report SHA-256: `f4dc6fe9be7efe6a1382bf5a2d3091aeed13f6d386535e330b08afdff55d5a6f`;
- authority record: `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md`.

The 2026-09-26 Core-0.19/DP-0.7 integration remains immutable predecessor evidence.

## Qualified infrastructure

QRC 0.1 remains qualified qualification infrastructure and is not semantic domain authority.

## Revision rule

Any semantic change to a qualified artifact creates a new revision and affected qualification burden.

```text
current routing authority
    != historical evidence rewrite

qualified extension
    != Core membership

integrated qualification
    != universal completeness
```
