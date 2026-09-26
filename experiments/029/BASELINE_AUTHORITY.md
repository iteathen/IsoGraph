# Experiment 029 — Core 0.19 Baseline Authority

**Status:** frozen baseline record for focused Core 0.19 qualification  
**Purpose:** pin current qualified Core/dependency authority and fresh exact-rendering predecessor evidence without exposing Experiment 029 hidden answers

## Qualified base Core

Current effective qualified Core before this experiment is:

```text
Core 0.17 qualified base
+
Core 0.18 qualified observation-first clarification
```

Exact packet hashes:

- Core 0.17: `348d59017047f7d64daba2066b9b3e068c629186ee3e767551cfcb9815fe36a8`
- Core 0.18: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`

Core 0.18 qualification authority:

`qualification/CORE_0_18_QUALIFICATION.md`

## Qualified dependency

Core 0.19 uses QU semantics when unresolved structure is load-bearing.

Exact qualified QU 0.1 hash:

`1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

QU remains a separately versioned dependency and is not imported into Core.

## Core 0.19 candidate

Candidate under test:

`CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`

Frozen SHA-256:

`8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`

Experiment 029 must verify this exact hash before semantic execution.

## Fresh predecessor evidence for exact source rendering

Core 0.19 section 18 was exercised concretely during the DP 0.7 three-positive-control campaign.

Six source-to-native bundles passed the ESR qualification path and were explicitly promoted for downstream discovery.

Promotion record:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2/PROMOTION_0_1.json`

The promotion record states:

```text
contract: ESR-0.1
core_requirement: CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md#18
all_six_qualified: true
q7_promotion: PASS
status: PROMOTED_FOR_DP07_DISCOVERY
```

Promoted cases:

- case-01A — run `36221527023`;
- case-01B — run `36221681602`;
- case-02A — run `36221818069`;
- case-02B — run `36221959236`;
- case-03A — run `36222035575`;
- case-03B — run `36222223034`.

The qualification path required, for every promoted bundle:

- source freeze and interpretation closure;
- zero-gap native semantic coverage;
- native parse/signature/binding closure;
- at least two independent native-only cold reconstructions;
- exact source/reconstruction sameness;
- adversarial distinction-preservation controls;
- scorer-blind verification;
- explicit promotion.

The later accepted DP 0.7 blind run `36228776786` consumed only the promoted exact renderings and passed its own mechanical exact-role gate and hidden score.

This predecessor evidence establishes concrete operation of the section-18 exact-rendering discipline on six independently frozen formulas/systems.

## Baseline boundary

Experiment 029 does not assume that passing six exact renderings automatically qualifies all of Core 0.19.

The experiment independently tests the Core 0.19 assertion-support semantics and adversarial section-18 constitutional rules.

Likewise, Experiment 029 does not globally promote ESR 0.1 merely by citing it as a successful qualification procedure used for the six predecessor renderings.
