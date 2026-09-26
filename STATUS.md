# IsoGraph Status

**Project state:** research incubation / qualified modular authority stack  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Design doctrine

The explanatory project doctrine is recorded in:

- `DESIGN_IDEALS.md`

It captures the intended observation-first posture: perceive before judging, preserve unknown and residual structure, keep sameness scoped, separate classification from ontology, collapse only proven-irrelevant distinctions, and treat discrepancy propagation as a possible structural signal.

This doctrine is **not semantic authority**. Versioned qualified specifications remain controlling.

## Current qualified authority

### Core

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` — qualified base;
- `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` — **qualified cumulative observation-first clarification**, promoted by `qualification/CORE_0_18_QUALIFICATION.md` and Experiment 017;
- `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md` — **qualified cumulative assertion-support and exact-rendering clarification**, promoted by `qualification/CORE_0_19_QUALIFICATION.md` using Experiments 029/030 plus six ESR-qualified source renderings.

Current effective Core authority is Core 0.17 plus the exact qualified Core 0.18 and Core 0.19 clarifications. Bare IDs remain **Semantic Identity (SI)** handles for representation-level addressing and referential identity. SI equality or inequality does not independently establish stronger natural/ontological identity.

### Qualified semantic extensions/modules

Current qualified extension/module authority is recorded in:

- `qualification/QUALIFIED_MODULES_2026-09-26.md`

The 2026-09-25 and 2026-09-18 manifests remain immutable historical authority for the revisions they recorded. The current 2026-09-26 manifest routes Core 0.18, Core 0.19, QU 0.1, NEI 0.4, DP 0.1–0.7, and DTS 0.1 at their exact qualified revisions. The latest fully integration-qualified composition remains revision-scoped to Core 0.18 in `qualification/CURRENT_INTEGRATED_STACK_WITH_DP07_2026-09-26.md`; Core 0.19 is independently module-qualified and is not silently added to that historical integration result.

Current semantic extensions/modules include:

- Quantifiable Unknown (QU) 0.1;
- Natural Entropic Identity (NEI) 0.4;
- Discovery Protocols 0.1 through 0.7 as one cumulative current module;
- Detailed Transition System (DTS) 0.1.

The tested semantic files retain their historical `_CANDIDATE` filenames. Their current qualification status comes from the authority manifest and exact content hashes, not from the filename.

Qualified extensions remain separately versioned dependencies. Qualification does **not** silently import QU, NEI, Discovery Protocol, or DTS semantics into Core.

### Qualified DTS 0.1 authority

`extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md` is qualified at its exact tested bytes by Experiment 026 and `qualification/DTS_0_1_QUALIFICATION.md`.

The qualification covers DTS base transition semantics only. TSS and mechanism/cost/concurrency/optimization profiles remain separately versioned successor work. The current expanded composition including DTS and DP 0.7 is integration-qualified for the exercised dependency-closed scope by the Experiment 027 predecessor plus Experiment 028 successor delta.

NEI 0.1/0.2 remain immutable historical qualified revisions. NEI 0.3 remains an unqualified historical precursor to the now-qualified NEI 0.4 semantics; none is a parallel current NEI authority.

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

Experiment 016 used a fresh 18-case holdout for NEI 0.4:

```text
formal disposition:       QUALIFIES
NEI 0.4:                  PASS
case coverage:             18 / 18
mismatches:                none
workflow run:              35478421676
external semantic calls:   1
provider retries:           0
```

It independently recovered derived SAME/DISTINCT without profile answer tags, exact/probabilistic evidence separation, Bayes-factor/posterior separation, evidence dependence, QU-conditioned evidence, missing-QU fail-closed behavior, scoped quotient discipline, and anti-circularity.

Final review:

- `experiments/016/EXPERIMENT_016_FINAL_QUALIFICATION_REVIEW.md`

NEI 0.4 is therefore the current qualified NEI semantic extension at the exact hash recorded in the authority manifest.

## Discovery Protocol qualification

Discovery Protocols 0.1–0.7 are now qualified as one cumulative current module.

- DP 0.1–0.4 retain the exact historical hashes recorded by their qualification chain.
- DP 0.5/0.6 qualification is recorded in Experiment 018 and the 2026-09-25 cumulative review.
- DP 0.7 qualification is recorded by the completed three-positive-control campaign plus Experiment 028 and `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_7_QUALIFICATION_REVIEW.md`.

DP 0.7 exact hash:

`7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d`

Fresh DP 0.7 evidence:

```text
three-positive-control run:   36228776786
known positive witnesses:     3 / 3
mechanical exact-role gate:   PASS

Experiment 028 run:           36231568578
derived-view cases:           13 / 13 PASS
mismatches:                   none
module assessment:            SUPPORTED
formal disposition:           QUALIFIES
```

Together those campaigns discharge all seventeen DP 0.7 section-17 qualification targets.

The evidence chain remains intentionally preserved rather than rewritten: earlier failed/partial runs keep their original frozen dispositions.

DP remains discovery/search guidance, not semantic proof authority.

DP 0.7's conditional exact source-rendering path now routes through independently qualified Core 0.19 section 18 at the exact revision recorded in the authority manifest.
### Real-world Discovery Protocol execution evidence

Connect4 authority 1.1 has now run the Discovery Protocols against live cold-reconstruction discrepancies.

Evidence record:

- `qualification/REAL_WORLD_DISCOVERY_PROTOCOL_EVIDENCE_CONNECT4_2026-09-18.md`

The campaign found real hidden structure, retained a supported-but-unproved layer-substitution explanation, falsified an attractive common relation-basis hypothesis, and correctly closed an ordinary prose error. It also produced a reusable execution contract/schema in the Connect4 research owner.

This is **development evidence**, not fresh qualification. It should inform independent holdout design without becoming the hidden oracle for those holdouts.

## Integrated module-stack qualification

The latest fully integration-qualified composition is revision-scoped to:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

It is qualified for the exercised dependency-closed scope by the immutable Experiment 027 predecessor plus the focused DP 0.7 successor evidence. Core 0.19 is now qualified independently as current Core authority; a full-stack integration claim including Core 0.19 is not inferred merely from module promotion.

Experiment 027 remains the full-stack predecessor for DP 0.1–0.6 + DTS 0.1.

Experiment 028 freshly exercised every remaining DP 0.7 qualification target, including QU-, DTS-, and NEI-sensitive interactions:

```text
formal disposition:       QUALIFIES
workflow run:              36231568578
case coverage:             13 / 13
mismatches:                none
module assessment:         SUPPORTED
```

Current authority record:

- `qualification/CURRENT_INTEGRATED_STACK_WITH_DP07_2026-09-26.md`

Historical integration records remain immutable:

- `qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md`
- `qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md`

This establishes compatibility for the exercised compositions. It is not a universal completeness claim.
## Historical authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Historical evidence remains interpreted against the exact revision where it was produced. Failed/partial qualification results are never rewritten merely because later campaigns corrected their defects.

## Immediate work

The current qualified modular authority stack is recorded in `qualification/QUALIFIED_MODULES_2026-09-26.md`; the 2026-09-25 and 2026-09-18 manifests remain historical evidence.

Current completed qualification checkpoints:

1. Core 0.18 — `QUALIFIES`, Experiment 017;
2. Core 0.19 — qualified at SHA-256 `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`, using Experiment 029's frozen 25/26 evidence, Experiment 030's fresh corrected 2/2 mutation regression, and six ESR-qualified exact-rendering predecessors;
3. QU 0.1 / NEI 0.4 — qualified at their pinned current revisions;
4. Discovery Protocols 0.1–0.7 — qualified cumulatively, with DP 0.7 closed by the three-positive-control campaign plus Experiment 028;
5. DTS 0.1 — `QUALIFIED`, Experiment 026;
6. the Core 0.18 + QU 0.1 + NEI 0.4 + DP 0.1–0.7 + DTS 0.1 composition remains integration-qualified for its exact predecessor revision.

Core 0.19 is now current Core authority. A fresh full-stack integration claim including Core 0.19 remains a separate revision-scoped burden if that stronger claim is required.

Transition Structural Signatures and DTS profiles remain separately versioned successor research.

No external semantic call should be spent before deterministic contract/preflight material for the focused claim is complete.

Any semantic change to a qualified IsoGraph module creates a new revision with its own affected qualification burden.

## DTS 0.1 development status

Current branch authority: `research/dts-0.1`.

- DTS base semantics/tooling: implemented; deterministic controls PASS.
- Experiment 020 source-anchored reconstruction: PASS.
- Experiment 021 first TI discovery: real semantic report obtained; immutable `DOES_NOT_PASS` due hidden coverage contract, with all emitted claims correct.
- Experiment 024 corrected TI comparison contract: all 8 public requests answered. R05/R06 scorer failures are undisclosed breaker-string length constraints despite correct REJECTED dispositions. The sole substantive R07 discrepancy was isolated for Experiment 025.
- Experiment 025 QU projection audit: PASS; no preferred hidden answer. All four T06 QU regions are C_CONCEPT-projected, no admissible realization changes the load-bearing projection, and the cold audit returned PROJECTION_JUSTIFIED / SUPPORTS_TI. Phase 5 TI development burden is complete.
- Experiment 022 decomposition semantics: PASS; pinned view semantics are sufficient for DTS 0.1's current decomposition scope.
- Experiment 023 interpretation-barrier discovery: PARTIAL with methodology PASS; a candidate common structural core was found, split across three semantic families, with no source-spec refactor justified.
- Experiment 026 DTS qualification: 20/20 fresh controls PASS; formal scorer disposition `QUALIFIES`; independent promotion verifier verdict `SUPPORT_PROMOTION`.
- DTS 0.1 is module-qualified at SHA-256 `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`.
- Experiment 027 DTS-inclusive integration: 18/18 fresh controls PASS; formal disposition `QUALIFIES`; module assessment `SUPPORTED`.
- DTS 0.1 development and qualification burden is complete. Transition Structural Signatures and mechanism/cost/concurrency/optimization profiles remain deferred separately versioned successor research.
