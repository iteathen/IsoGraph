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
- `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` — **qualified cumulative observation-first clarification**, promoted by `qualification/CORE_0_18_QUALIFICATION.md` and Experiment 017.

Current effective Core authority is Core 0.17 plus the exact qualified Core 0.18 clarification. Bare IDs remain **Semantic Identity (SI)** handles for representation-level addressing and referential identity. SI equality or inequality does not independently establish stronger natural/ontological identity.

### Qualified semantic extensions/modules

Current qualified extension/module authority is recorded in:

- `qualification/QUALIFIED_MODULES_2026-09-25.md`

The 2026-09-18 manifest remains immutable historical authority for the revisions it recorded. The current manifest routes Core 0.18, QU 0.1, NEI 0.4, DP 0.1–0.6, and DTS 0.1 at their exact qualified revisions. Experiment 019 remains the integration authority for the pre-DTS composition until a fresh DTS-inclusive integrated holdout passes.

Current semantic extensions/modules include:

- Quantifiable Unknown (QU) 0.1;
- Natural Entropic Identity (NEI) 0.4;
- Discovery Protocols 0.1 through 0.6 as one cumulative current module;
- Detailed Transition System (DTS) 0.1.

The tested semantic files retain their historical `_CANDIDATE` filenames. Their current qualification status comes from the authority manifest and exact content hashes, not from the filename.

Qualified extensions remain separately versioned dependencies. Qualification does **not** silently import QU, NEI, Discovery Protocol, or DTS semantics into Core.

### Qualified DTS 0.1 authority

`extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md` is qualified at its exact tested bytes by Experiment 026 and `qualification/DTS_0_1_QUALIFICATION.md`.

The qualification covers DTS base transition semantics only. TSS and mechanism/cost/concurrency/optimization profiles remain separately versioned successor work. The expanded composition including DTS is not yet integration-qualified.

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

Discovery Protocols 0.1-0.6 are now qualified as one cumulative module. DP 0.1-0.4 retain the exact hashes recorded in the 2026-09-18 authority manifest; DP 0.5/0.6 qualification is recorded in Experiment 018 and the 2026-09-25 cumulative review.

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

### Real-world Discovery Protocol execution evidence

Connect4 authority 1.1 has now run the Discovery Protocols against live cold-reconstruction discrepancies.

Evidence record:

- `qualification/REAL_WORLD_DISCOVERY_PROTOCOL_EVIDENCE_CONNECT4_2026-09-18.md`

The campaign found real hidden structure, retained a supported-but-unproved layer-substitution explanation, falsified an attractive common relation-basis hypothesis, and correctly closed an ordinary prose error. It also produced a reusable execution contract/schema in the Connect4 research owner.

This is **development evidence**, not fresh qualification. It should inform independent holdout design without becoming the hidden oracle for those holdouts.

## Integrated module-stack qualification

Experiment 027 qualifies the current expanded Core 0.18 + QU 0.1 + NEI 0.4 + DP 0.1–0.6 + DTS 0.1 composition.

```text
formal disposition:       QUALIFIES
workflow run:              36191443384
case coverage:             18 / 18
mismatches:                none
module assessment:         SUPPORTED
API attempts:              1
HTTP status:               200
```

Final review:

- `experiments/027/EXPERIMENT_027_FINAL_QUALIFICATION_REVIEW.md`
- `qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md`

The fresh holdout preserved the intended boundaries across transition observation, QU-bearing unresolved structure, TI/NEI separation, DP discovery versus proof, decomposition sensitivity, anti-circular projection, profile/base separation, residual preservation, ordinary boundary reuse, and historical revision provenance.

Experiment 019 remains the immutable pre-DTS integration record for Core 0.18 + QU 0.1 + NEI 0.4 + DP 0.1–0.6:

- `experiments/019/EXPERIMENT_019_FINAL_QUALIFICATION_REVIEW.md`
- `qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md`

Historical earlier integrated evidence remains preserved, including Experiment 015 for its exercised predecessor composition.

This establishes compatibility for the exercised compositions. It is not a universal completeness claim.

## Historical authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Historical evidence remains interpreted against the exact revision where it was produced. Failed/partial qualification results are never rewritten merely because later campaigns corrected their defects.

## Immediate work

The current qualified modular authority stack is recorded in `qualification/QUALIFIED_MODULES_2026-09-25.md`; the 2026-09-18 manifest remains historical evidence.

The current semantic qualification campaign is complete:

1. Core 0.18 qualification is complete (`QUALIFIES`, Experiment 017);
2. DP 0.5/0.6 qualification is complete (`QUALIFIES`, Experiment 018);
3. pre-DTS current-stack integration is preserved by Experiment 019;
4. DTS 0.1 module qualification is complete (`QUALIFIED`, Experiment 026);
5. the expanded DTS-inclusive current stack is integration-qualified by Experiment 027;
6. every historical qualification disposition remains preserved at its exact revision.

The immediate repository burden is PR #30 reconciliation, protected-main verification, and merge. Transition Structural Signatures and DTS profiles remain successor research, not unfinished DTS 0.1 qualification work.

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
