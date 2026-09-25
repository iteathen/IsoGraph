# DTS 0.1 Implementation Plan

**Status:** active implementation plan  
**Repository:** `iteathen/IsoGraph`  
**Working branch:** `research/dts-0.1`  
**Initial base:** `148a91b576aa8de6f92c34aa305fc55fd458c452`  
**Current authority base after reconciliation:** `2850c0b6e559985c020ffecd3b53b5f5773eeec9`  
**Author:** Joshua Oshiro

## Objective

Integrate a first-class Detailed Transition System (DTS) extension into the IsoGraph family while preserving one structural substrate and the existing modular authority discipline.

The target family separation is:

```text
Core = structured state
QU   = structured unresolved information
DTS  = structured change
NEI  = derived natural/domain identity
DP   = discovery across the available structures
```

DTS 0.1 is complete only when transition structure is searchable as ordinary IsoGraph structure without manufacturing closure, uncertainty, identity, mechanism, or canonical factorization.

## Authority constraints

- Current qualified Core authority is cumulative Core 0.17 + Core 0.18 observation-first semantics.
- QU 0.1 is a required DTS semantic dependency; a determinate transition need not instantiate QU.
- NEI 0.4 is invoked only when a transition claim depends on natural/domain identity.
- Discovery Protocols 0.1–0.6 may discover DTS/TI structure but do not supply DTS truth authority.
- The current Core 0.18 + QU 0.1 + NEI 0.4 + DP 0.1–0.6 composition is integration-qualified by Experiment 019.
- DTS remains unqualified and outside that integrated authority until its own qualification campaign passes.
- Current authority routing is recorded in `qualification/QUALIFIED_MODULES_2026-09-25.md`; historical manifests remain immutable evidence.

## Phase 1 — minimal semantic base

Deliver:

```text
extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md
extensions/dts/DTS_NATIVE_VOCAB_0_1.md
extensions/dts/DTS_VOCAB_0_1.isg
extensions/dts/profiles/README.md
```

The base contains transition, source/target projections, factored anatomy, QU-aware unresolvedness, decomposition discipline, TI, residuals, and profile boundaries only.

DPO, cost, optimization, concurrency, TSS, and translation semantics are excluded from the base.

## Phase 2 — deterministic base tooling — COMPLETE

Implement pure deterministic tools with no external semantic call:

```text
tools/dts/dts-base.mjs
tools/dts/test-dts-base.mjs
```

The tooling representation is an implementation/testing normalization only. It is not a semantic serialization and does not replace `.isg` authority.

Required deterministic controls:

1. determinate transition with no QU can satisfy a claim under closure authority;
2. unresolved load-bearing role with a QU reference can remain admissible;
3. unresolved/missing load-bearing role without QU or irrelevance authority is incomplete;
4. DTS-private opaque unknown statuses are rejected;
5. same endpoints alone cannot establish TI;
6. TI requires a pinned comparison view and mapping for every load-bearing role;
7. load-bearing decomposition requires pinned decomposition/factorization authority;
8. projected/irrelevant roles require explicit authority;
9. QU-bearing TI records preserve QU references rather than treating them as realized equality;
10. TI residual structure remains explicit.

Add the deterministic test to the repository `verify` workflow.

## Phase 3 — real transition development corpus — COMPLETE

Phase 2 passes on the DTS branch. Create the next unused experiment directory: `experiments/020/` at this reconciliation point.

Use independently represented transition examples from at least:

- one sequential software transition;
- one Connect4/IsoMax operational transition;
- one structurally different negative-control transition.

Prefer an additional non-program domain if exact semantics can be represented without speculation.

This corpus is development evidence, not qualification.

## Phase 4 — transition reconstruction — COMPLETE

For sufficiently specified cases, demonstrate that:

```text
source state
+ fixed transition anatomy
+ QU-bearing unresolved structure
+ closure authority
```

faithfully accounts for the target-state evidence under the declared claim.

If the DTS role factorization repeatedly loses source information or manufactures closure, revise DTS before TI work continues.

## Experiment 020 reconstruction result

Phase 3/4 development evidence is frozen in `experiments/020/`.

- source-anchored cases: 3;
- deterministic reconstruction: PASS;
- repository Verify run: `36180968439`;
- source anchors include immutable Git blob IDs;
- no TI claim was asserted in Experiment 020.

## Phase 5 — first TI campaign

The first TI campaign must include:

- positive TI;
- same-endpoints/non-TI control;
- alternate-decomposition case;
- QU-bearing correspondence;
- unresolved-load-bearing rejection;
- seductive false analogy.

Required output:

```text
comparison view
load-bearing regions
projected regions + authority
common transition structure
mapping/witness
residuals
QU dependencies
factorization/decomposition authority
TI disposition
falsification attempt
```

Do not encode the expected mapping into the transition representations.

## Phase 6 — decomposition experiment — COMPLETE

Test the same underlying transition under multiple independently valid decompositions.

Determine empirically whether DTS 0.1's pinned-decomposition semantics are sufficient or whether later work needs an independently defined admissible decomposition family with existential/robust TI claims.

No stronger decomposition semantics are promoted merely because they are convenient.

## Experiment 022 decomposition result

Experiment 022 passed deterministic CI at repository Verify run `36184571451`.

The same source-anchored IsoMax transition was represented by:
- a fine-grained decomposition `T04A`;
- an order-preserving coarse decomposition `T04B`.

Results:

```text
same source/target projection: PASS
same K / delta / B effect regions: PASS
different D / O topology: PASS
C_WORKER_EFFECT projects D/O: effect correspondence survives with D/O residuals
C_PROCESS load-bears D/O: exact topology breaker rejects process TI
```

The coarse decomposition is mechanically proven to be a contiguous order-preserving coarsening of the fine decomposition.

For DTS 0.1's current scope, pinned comparison-view semantics are sufficient to avoid decomposition-choice false negatives when decomposition is genuinely irrelevant. Stronger existential/universal decomposition-family TI claims remain deferred rather than promoted without evidence.

## Phase 7 — interpretation-barrier experiment — COMPLETE

Freeze the existing barrier lists from Core 0.18, QU 0.1, NEI 0.4, the current cumulative DP 0.5/0.6 successor layers, and DTS 0.1.

Represent them as ordinary IsoGraph structure and use DP to test whether their repeated `X != Y` form has a reusable structural generator.

Do not refactor the source specifications until evidence supports the factorization.

## Experiment 023 interpretation-barrier result

Experiment 023 passed its hidden methodology controls in workflow run `36186867190`.

```text
methodology disposition: PASSES
discovery disposition:   PARTIAL
module coverage:         6 / 6
candidate families:      3
source refactor now:     false
surface shape alone proof:false
```

DP recovered a candidate **Interpretation-Barrier Structural Core**, but did not collapse the six source modules into one universal semantic primitive.

It separated the corpus into three candidate families:
- epistemic / observational barriers;
- quantifiable / identity-related barriers;
- systemic / protocol-integrity barriers.

The common `X != Y` topology remains a useful discovery lead, not proof of one semantic generator. Source-local relation distinctions and residuals remain load-bearing evidence.

No Core/QU/NEI/DP/DTS source specification is refactored from this result alone.

## Phase 8 — Transition Structural Signatures research

Only after real TI cases exist, investigate cheap role-level signatures over `K`, deltas, `B`, `D`, `O`, and QU structure.

A signature becomes an invariant only after preservation is proved under a pinned comparison authority.

```text
signature mismatch -> may reject TI only when that signature is qualified invariant under C
signature match    -> never proves TI by itself
```

This work belongs in a separately versioned TSS profile or later DTS revision, not DTS 0.1 base.

## Phase 9 — DTS qualification preparation

After the semantic base stabilizes:

1. create `qualification/DTS_0_1_QUALIFICATION_PLAN.md`;
2. extend `qualification/MODULE_QUALIFICATION_MATRIX.md` without rewriting historical dispositions;
3. freeze a fresh high-information holdout;
4. run deterministic preflight before any external semantic call;
5. use the resource discipline in `QUALIFICATION_RESOURCE_DISCIPLINE.md`;
6. preserve any failed qualification run unchanged;
7. promote only after all dependency-closed DTS obligations pass.

## Promotion gate

DTS 0.1 may enter a future qualified-module manifest only when:

```text
Core 0.18 dependency is qualified
QU 0.1 dependency is qualified
NEI 0.4 current identity authority is qualified
DP 0.1–0.6 current discovery authority is qualified
current non-DTS integrated stack is qualified by Experiment 019
DTS candidate + vocabulary are frozen
base deterministic tooling passes
real transition development evidence exists
TI positive and adversarial controls are understood
fresh qualification holdout passes
no hidden expected mapping is required
independent review supports promotion
```

Profile qualification is never substituted for DTS base qualification.

## Current implementation checkpoint

Current state:

- Phase 1 — minimal DTS semantic base: **COMPLETE**;
- Phase 2 — deterministic DTS tooling: **COMPLETE**;
- Phase 3 — real source-anchored transition corpus: **COMPLETE**;
- Phase 4 — transition reconstruction: **COMPLETE**;
- Phase 5 — first TI campaign: **PARTIAL; Experiment 021 produced a real report but formally DOES_NOT_PASS due a public-output-contract/hidden-coverage mismatch; fresh corrected campaign required**;
- Phase 6 — decomposition experiment: **COMPLETE**;
- Phase 7 — interpretation-barrier experiment: **COMPLETE**;
- Phase 8 — Transition Structural Signatures: deferred until real TI evidence exists;
- Phase 9 — DTS qualification: not started.

Experiment 021 eventually produced a semantic report in workflow run `36188362082` using `gemini-3.1-flash-lite` with the proven request shape.

Its immutable scorer disposition is `DOES_NOT_PASS`, but the failure is a public-output-contract defect: all four emitted required claims matched their expected dispositions, while four additional hidden-required comparisons were omitted because the public prompt allowed the decoder to select only pairs it considered materially informative.

Create a fresh corrected campaign with the comparison requests publicly enumerated and expected dispositions still hidden. Do not rewrite Experiment 021 or alter DTS semantics to satisfy the old hidden coverage requirement.

Do not spend DTS qualification resources until that corrected TI campaign closes the Phase 5 burden.
