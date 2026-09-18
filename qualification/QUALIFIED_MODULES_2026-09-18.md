# Qualified Module Authority Manifest — 2026-09-18

**Status:** qualified authority/provenance manifest  
**Core authority remains:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

This manifest promotes the exact tested extension/module revisions below by qualification status only.

The semantic files retain their historical `_CANDIDATE` filenames because those exact bytes were tested. The filename token is not the current qualification status.

No semantic text in those files is rewritten by this promotion.

## Qualified semantic extensions

### Quantifiable Unknown 0.1

Qualified semantic artifact:

`extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`

Qualified content SHA-256:

`1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

Qualification evidence:

- Experiment 009: immutable diagnostic/failure evidence;
- Experiment 013 frozen SHA: `182f00c62b30c0dc7ad2848d0e05fa005c354051`;
- Experiment 013 workflow run: `35376498717`;
- Experiment 013 packet SHA-256: `7b983e2537643663503c253157789113c058ced23d6960603bbada5e596db7fa`;
- Experiment 013 report SHA-256: `8f902208a1d5f5c98c0e2514209101865b5952f595b3188ed8bc93ff5ae4f86c`;
- formal disposition: `QUALIFIES`;
- final review: `experiments/013/EXPERIMENT_013_FINAL_QUALIFICATION_REVIEW.md`.

Qualified scope is the declared QU 0.1 semantic contract. This does not qualify a particular solver, inference procedure, information measure, or implementation.

### Natural Entropic Identity 0.1 + 0.2

Qualified cumulative semantic artifacts:

- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`
  - SHA-256 `39f40b79e23d155d2a0d891bb338f2ac615d0d5bfc60d39afede4608257e0d60`
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md`
  - SHA-256 `0afbe55615efc92ea678786fd5af6493a923cbbfef73baf884aa094b750bfdb6`

NEI 0.1 supplies the base semantics. NEI 0.2 is the qualified clarification layer.

Qualification evidence is the same frozen Experiment 013 campaign above.

NEI remains a separately versioned extension. It is not imported into Core merely by being qualified.

## Qualified Discovery Protocol module

Discovery Protocols 0.1 through 0.4 are qualified as one cumulative current module at the exact revisions:

- DP 0.1 SHA-256 `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`
- DP 0.2 SHA-256 `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`
- DP 0.3 SHA-256 `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`
- DP 0.4 SHA-256 `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`

Authority files:

- `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md`

Qualification evidence is cumulative and preserves every historical disposition:

- Experiments 007/008: blind discovery evidence;
- Experiment 010: frozen `DOES_NOT_QUALIFY`, including one oracle defect and one genuine omitted overclaim;
- Experiment 012: frozen `DOES_NOT_QUALIFY` from an undisclosed mapping serializer shape while preserving its semantic evidence;
- Experiment 014 frozen SHA: `288c9a22085fcae7b7d7014aac3e8175421089f3`;
- Experiment 014 workflow run: `35376711200`;
- attempt 1: provider failure only;
- attempt 2 formal semantic disposition: `QUALIFIES`, zero mismatches;
- final review: `experiments/014/EXPERIMENT_014_FINAL_QUALIFICATION_REVIEW.md`;
- cumulative review: `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_4_QUALIFICATION_REVIEW.md`.

Discovery priority remains search guidance, not semantic proof authority. Verified claims still owe the ordinary Core/extension obligations appropriate to the conclusion.

## Qualified qualification infrastructure

QRC 0.1 is qualified for qualification-infrastructure use:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`
- qualification record: `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`.

QRC is not semantic domain authority.

## Integrated compatibility qualification

The qualified Core and modules above have passed a fresh integrated composition holdout.

Experiment 015:

- frozen SHA: `aaa8f8ee58aaac54002fa9d0a015d0fab0a2ba9c`;
- workflow run: `35377399665`;
- attempt 1: provider failure only, HTTP 503, no semantic report;
- attempt 2: HTTP 200, one API attempt;
- packet SHA-256: `124d0d72c45b7a31dcfb160c2b7990bc2bb78b7444a42a8fbb75ae4aa31ea1f1`;
- report SHA-256: `14a84fe11a8f76d82612ad260afb0744ba763496e75751f0b48acf1639effc9e`;
- deterministic score: `QUALIFIES`;
- mismatches: none;
- final review: `experiments/015/EXPERIMENT_015_FINAL_QUALIFICATION_REVIEW.md`.

The integrated holdout exercised:

- source-local exact-D provenance;
- noncanonical alternative factorization;
- relational unknown sharing and QUI;
- NEI authority bounds;
- structural discovery under misleading labels;
- weak versus strong embedding;
- explicit residual accounting;
- separation of source-local D provenance from pairwise residuals;
- rejection of unsupported full/global isomorphism, natural identity, same-intermediate-object, and same-algorithm claims.

This establishes compatibility for the exercised dependency-closed composition. It is not a universal discovery-completeness or universal-domain-coverage claim.

## Revision rule

Any semantic change to a qualified artifact creates a new revision and must carry its own affected qualification burden.

Historical evidence remains interpreted against the exact revision/hash it tested.

```text
qualified status
    != Core membership

qualified extension
    != globally enabled dependency

qualified discovery protocol
    != proof authority

integrated qualification
    != universal completeness
```
