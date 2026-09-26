# Experiment 031 — Final Full-Stack Core 0.19 Qualification Review

**Status:** COMPLETE  
**Formal disposition:** `QUALIFIES`  
**Scope:** direct integration qualification of Core 0.17 + Core 0.18 + Core 0.19 + QU 0.1 + NEI 0.4 + DP 0.1–0.7 + DTS 0.1

## Successful run

Workflow run:

`36256020851`

Trigger/frozen execution SHA:

`cd5d3b9f0281ba2bf222e4c2541f90ab4c4dac7b`

Evidence commit:

`8091d5ae4e7a184461b53caebd8352bc24c67de7`

Selected isolated decoder:

`gemini-3-flash-preview`

Provider status:

`HTTP 200`

Packet SHA-256:

`61e5d852f59566c8499c4b47d794083fc455ff9444d8496fb5c21c1d448b7c74`

Frozen report SHA-256:

`f31b82de5cc10259c8548b204f936a5544ee1e1053dcf400faf7c9521cbe0c53`

## Mechanical result

```text
formal disposition:       QUALIFIES
full-stack cases:          32 / 32 PASS
failed cases:              0
unexpected cases:          0
duplicate cases:           0
exact case count:          PASS
exact case order:          PASS
self-audit:                PASS
module assessment:         PASS
```

Category coverage:

```text
Core 0.19 integration:     8 / 8 PASS
QU 0.1 integration:       9 / 9 PASS
NEI 0.4 integration:      9 / 9 PASS
DP 0.1–0.7 integration:   7 / 7 PASS
DTS 0.1 integration:      6 / 6 PASS
```

Every full-stack module assessment returned `SUPPORTED`.

## Exact qualified revisions exercised

The runner mechanically pinned and verified:

- Core 0.17: `348d59017047f7d64daba2066b9b3e068c629186ee3e767551cfcb9815fe36a8`
- Core 0.18: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`
- Core 0.19: `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`
- QU 0.1: `1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`
- NEI 0.4: `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`
- DP 0.1: `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`
- DP 0.2: `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`
- DP 0.3: `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`
- DP 0.4: `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`
- DP 0.5: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`
- DP 0.6: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`
- DP 0.7: `7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d`
- DTS 0.1: `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

Any semantic byte change creates a new integration burden.

## What the fresh holdout exercised

Experiment 031 directly crossed the module boundaries that were previously unqualified as one Core-0.19 stack:

- Core 0.18 observation-first quantity alignment with Core 0.19 assertion/support;
- exact implicit support, explicit/implicit coexistence, grounded versus ungrounded cycles, deep derivation, and non-universal operational closure;
- QU invariance, disagreement, genuine refinement, missing load-bearing unknowns, probability-model authority, and correlated evidence;
- NEI exact identity reasoning using qualified implicit support while preserving SI/NEI separation;
- missing identity-relevant QU remaining incomplete rather than being mislabeled semantic UNKNOWN;
- exact source-rendering admission, sidecar insufficiency, alternate-form witnesses, and adversarial mutation preservation;
- DP 0.7 derived views, primitive descent, recurrence interpretation, QU-bearing unfolding, and proof/discovery separation;
- DTS determinate transitions, implicit transition invariants, TI breakers, scoped TI, projected mechanism residuals, and NEI separation;
- target-driven QU restriction classified as circular evidence;
- later genuine refinement establishing a new TI claim without rewriting historical evidence.

## Earlier attempts preserved

### Attempt 1 — workflow 36254045214

No semantic decoder ran.

Failure class:

`harness/input-filter false positive`

The generic forbidden substring `ASSERTIONS` accidentally matched the legitimate Core 0.19 filename `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`.

Formal semantic disposition: none.

Record:

`experiments/031/ATTEMPT_1_REVIEW.md`

### Attempt 2 — workflow 36254103541

Preflight and authority hashes passed. The provider returned HTTP 200 but terminated with `MAX_TOKENS` before completing F10. Hidden scoring did not run.

Failure class:

`provider/output-budget truncation`

Formal semantic disposition: none.

Record:

`experiments/031/ATTEMPT_2_REVIEW.md`

The correction changed only serializer/output-budget behavior. It did not change any public case, hidden expected answer, authority byte, or semantic scoring rule.

## Qualification conclusion

The exact current composition:

```text
Core 0.17
+ Core 0.18
+ Core 0.19
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

is directly integration-qualified for the exercised dependency-closed scope.

This closes the previous boundary in which Core 0.19 was independently qualified but not yet part of the latest fully integration-qualified composition.

This result is revision-scoped. It does not establish universal completeness, future-version compatibility, or automatic qualification of separately versioned DTS profiles/TSS work.
