# Qualified Module Authority Manifest — 2026-09-29

**Status:** current qualified authority/provenance manifest  
**Historical predecessor:** `qualification/QUALIFIED_MODULES_2026-09-28.md`

This manifest is the current routing authority for the qualified IsoGraph family as of 2026-09-29. Historical manifests remain immutable authority for the exact revisions they recorded.

## Current effective Core

Current Core remains cumulative:
- Core 0.17 qualified base;
- Core 0.18 qualified clarification;
- Core 0.19 qualified clarification;
- Core 0.20 qualified primitive-logic-closure clarification — SHA-256 `9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7`.

## Qualified extensions/modules

### QU 0.1
`1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

### NEI 0.4
`6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`

### DTS 0.1
`9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

### Discovery Protocols 0.1–0.10

Current Discovery Protocol authority is cumulative.

Newest exact revisions:
- DP 0.8 clue-preserving discrepancy: `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`;
- DP 0.9 Minimum Sufficient Support / Valuation: `4d6ed98288863ccd50e9cbccf2e626ff241aded3bd9fb534e0fb74ad147858ea`;
- DP 0.10 Experimental Warrant: `108f3998bba90aff6a386335aeb45fde663d4be0b32643a06e01fb039bff61ec`.

Qualification:
- DP 0.9 — Experiment 053, 20/20 PASS;
- DP 0.10 — Experiment 054, 18/18 PASS;
- cumulative review — `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_10_QUALIFICATION_REVIEW.md`.

### Experimental Inquiry 0.1

- artifact: `extensions/experimental/EXPERIMENTAL_INQUIRY_0_1_CANDIDATE.md`
- SHA-256: `b94262d7384603072d0e7a2657b84f6c427e7098cea051948702c367a440c666`
- qualification: `qualification/EXPERIMENTAL_INQUIRY_0_1_QUALIFICATION.md`
- Experiment 055: 18/18 PASS.

EI is an experimental/discovery extension. It is not Core or domain proof authority.

## Current integrated stack

The current directly integration-qualified composition is:

```text
Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20
+ QU 0.1
+ NEI 0.4
+ Discovery Protocols 0.1–0.10
+ DTS 0.1
+ Experimental Inquiry 0.1
```

Experiment 056:
- workflow run `36620811980`;
- frozen execution SHA `738f2cbd02f073e3c7710ac5ae0f9ef0670b0935`;
- 16/16 integration cases PASS;
- all guards true;
- all module assessments `SUPPORTED`;
- authority record: `qualification/CURRENT_INTEGRATED_STACK_WITH_DP_0_10_EI_0_1_2026-09-29.md`.

## Qualified infrastructure

QRC 0.1 remains qualified qualification infrastructure and is not semantic domain authority.

## Revision rule

Any semantic change to a qualified artifact creates a new revision and affected qualification burden.

```text
current routing authority
    != historical evidence rewrite

qualified extension
    != Core membership

experimental evidence
    != truth by itself

integrated qualification
    != universal completeness
```
