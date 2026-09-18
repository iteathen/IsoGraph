# IsoGraph Experiment 006 — Integrated QU / NEI / Discovery Protocols Qualification

**Status:** qualification design frozen for implementation; not yet executed  
**Candidate modules:** QU 0.1, NEI 0.1, Discovery Protocols 0.1  
**Core authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Resource discipline:** `QUALIFICATION_RESOURCE_DISCIPLINE.md`  
**Default external budget:** one candidate-branch GitHub Actions run + one Gemini semantic invocation

## 1. Purpose

Experiment 006 qualifies the three new modules together where their obligations overlap, while producing separate module dispositions.

It asks whether:

1. QU preserves the relational structure of unresolved information, defines the exact admissible-realization semantics, and distinguishes semantic uncertainty from qualification/computational incompleteness;
2. NEI correctly separates determinate identity claims from QU-mediated identity claims, preserves genuine uncertainty, maintains joint identity consistency, and rejects the superseded maximally-coarse-partition rule;
3. Discovery Protocols can recover a nontrivial, historically documented common proof structure from two independently presented proof arguments without seeing the hidden unification oracle, while preserving residuals, falsifying overclaims, and stopping efficiently.

The experiment does not qualify a particular solver, graph-search algorithm, embedding model, canonicalizer, Bayesian procedure, entropy measure, or proof-search engine.

## 2. Resource objective

The experiment follows:

```text
minimize Gemini calls + GitHub Actions runs + CI runtime
subject to complete semantic coverage, cold isolation, reproducibility,
and sufficient independent evidence
```

Default execution is one deliberately armed workflow run:

```text
deterministic preflight
-> assemble one frozen multi-case packet
-> one cold Gemini call
-> freeze/hash response
-> deterministic scoring against hidden assertions
-> upload one evidence artifact
```

On the candidate branch, the workflow is armed only by creating/updating:

```text
experiments/006/RUN_Q006.request
```

Ordinary authoring commits do not match that path and therefore do not consume Actions/Gemini quota.

There is no separate model-access preflight call. A missing API key is detected mechanically. HTTP 429 fails rather than generating repeated rate-limit traffic. At most one retry is allowed for a transient 5xx provider failure.

A second semantic verifier is not part of the default run. It is justified only if the frozen result contains a semantic ambiguity the deterministic scorer cannot adjudicate without weakening the qualification claim.

## 3. Discovery-visible resources

The cold decoder receives exactly:

1. `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
2. `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`;
3. `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`;
4. `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`;
5. `experiments/006/Q006_CASES.md`;
6. `experiments/006/Q006_BOUNDARY_CASES.md`;
7. `experiments/006/DP_PROOF_ALPHA.md`;
8. `experiments/006/DP_PROOF_BETA.md`;
9. `experiments/006/COLD_Q006_PROMPT.md`.

The proof benchmark files deliberately omit theorem names, author names, citations, and the known historical unification.

## 4. Hidden scorer-only resources

The cold decoder MUST NOT receive:

- `experiments/006/Q006_ASSERTIONS.json`;
- `experiments/006/DP_HIDDEN_ORACLE.md`;
- scorer source code;
- previous Experiment 006 outputs;
- author analysis or post-freeze reviews;
- external search results or web access.

The cold runner itself does not open scorer-only resources before freezing the response. The direct Gemini API call has no repository/browser tools.

## 5. QU controls

The combined QU controls cover all QU 0.1 minimum targets:

```text
QU-01  shared unresolved referent versus two distinct constrained-equal referents
QU-02  semantically excluded realization despite incomplete solver derivation
QU-03  OPEN / DETERMINATE / INCONSISTENT / INCOMPLETE_SCOPE separation
QU-04  equal information scalar does not imply structural QUI
QU-05  cross-domain QUI candidate under renamed open-role topology
QU-06  semantic UNRESOLVED versus incomplete/resource-limited computation
QU-07  refinement versus semantic revision
QU-08  downstream target may not circularly restrict the QU universe
QU-09  ordinary core artifact remains core-only without QU dependency
QU-10  lawful alpha-renaming preserves QU semantics
QU-11  exact infinite/intensional realization family requires no eager enumeration
QU-12  unrepresented fact is neither false nor arbitrarily admissible without authority
QU-13  cross-realization subject correspondence must be explicit when needed
```

## 6. NEI controls

The combined NEI controls cover all NEI 0.1 minimum targets and the corrected identity semantics:

```text
NEI-01  determinate SAME without artificial zero-uncertainty QU materialization
NEI-02  absence of distinction with SAME/DISTINCT admissible alternatives -> UNKNOWN
NEI-03  QU variation with a profile-wide separating law -> DISTINCT
NEI-04  identity-irrelevant QU variation under preserving law -> SAME
NEI-05  empty/inconsistent QU family -> NO_ADMISSIBLE_MODEL, never vacuous identity
NEI-06  QUI plus unresolved identity alternatives does not imply SAME
NEI-07  coarseness trap: [AB] and [A][B] both admissible -> UNKNOWN
NEI-08  temporal preservation law versus lineage-only evidence
NEI-09  core-only SI artifact does not acquire implicit NEI semantics
NEI-10  unresolved identity-relevant structure without QU is incomplete
NEI-11  unavailable required QU authority fails closed/incomplete
NEI-12  administrative SI alpha-renaming preserves qualified natural identity result
NEI-13  inconsistent pairwise identity projections are rejected
NEI-14  incomplete model search is not semantic UNKNOWN
NEI-15  circular QU restriction cannot qualify desired identity
NEI-16  explicit temporal identity-separating law -> DISTINCT
NEI-17  missing cross-realization query anchors leaves claim unqualified
```

## 7. Discovery Protocol benchmark

### 7.1 Benchmark design

The DP test uses two proof arguments drawn from genuinely different proof styles for the same underlying fixed-point phenomenon. The cold packet calls them only **Proof Alpha** and **Proof Beta**.

Alpha uses finite subdivisions, local labels, a boundary compatibility condition, a parity/existence lemma, shrinking mesh, and a limiting contradiction.

Beta uses a fixed-point-free assumption to construct a boundary retraction and then derives a contradiction from a global algebraic-topological invariant.

The hidden oracle is based on published mathematical analysis showing that the combinatorial argument contains the same boundary/no-retraction obstruction and that the combinatorial parity machinery has a cochain/cohomological interpretation. The cold decoder is not told this.

### 7.2 Required discovery behavior

The decoder must use DP as a search policy rather than being told which mapping is correct. It must:

- select and adapt discovery protocols;
- propose bounded step-to-step or step-cluster correspondences;
- identify a common proof skeleton deeper than generic proof-by-contradiction;
- preserve substantial proof-specific residuals;
- attempt to falsify its strongest candidate;
- reject unsupported full-proof isomorphism, equality of intermediate objects, or natural identity;
- stop when lower-ranked search has low marginal value.

### 7.3 Hidden scoring motifs

The scorer checks five oracle motifs:

1. common fixed-point-free contradiction architecture;
2. local labeling/boundary compatibility as a discrete encoding of the boundary-directed construction;
3. subdivision/refinement as an approximation bridge between finite/local structure and the continuous/global boundary obstruction;
4. combinatorial parity/existence obstruction as a discrete manifestation of the global topological/cohomological obstruction;
5. corresponding terminal contradiction with method-specific residual machinery preserved.

At least four motifs must be recovered, including at least one of motifs 2–4. Mapping width is capped to prevent passing by mapping everything to everything.

## 8. Module dispositions

Scoring produces independent dispositions:

```text
QU:   QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
NEI:  QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
DP:   QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
```

The integrated Experiment 006 disposition is `QUALIFIES` only if all three qualify and no critical isolation/provenance failure occurred. A failure in one module does not erase evidence gathered for the others.

## 9. Promotion thresholds

### QU
All exact QU controls must match the hidden assertions. Confusing semantic unresolvedness with resource failure, losing shared-versus-equal structure, silently inventing closure, requiring eager enumeration, or using scalar information as a QUI shortcut blocks qualification.

### NEI
All exact NEI controls must match. Absence of distinction must never produce SAME, inconsistent model families must not vacuously classify identity, missing QU/anchors must fail incomplete, pairwise results must remain jointly realizable, and the maximally-coarse rule must remain rejected.

### DP
DP must satisfy all critical guards:

- no semantic promotion from discovery rank alone;
- no full-proof-isomorphism claim from partial common structure;
- no identity claim from proof correspondence;
- meaningful residuals on both proofs;
- at least four hidden motifs recovered, with at least one deep motif (2–4);
- explicit falsification against the strongest candidate;
- lifecycle status `SUPPORTED_CANDIDATE` unless separate semantic obligations are actually discharged;
- structurally relevant protocols used before low-value identifier/lexical hints.

## 10. Freeze and rerun discipline

The workflow records exact repository SHA, every cold-visible file hash, packet hash, model identifier, API attempt count, raw/parsed report hashes, deterministic scorer output, and workflow run identity.

A provider/malformed-output run is infrastructure evidence, not semantic failure. A rerun preserves the failed metadata and is a separate evidence item. A semantic rerun after hidden assertions have been exposed requires a new frozen experiment revision.

## 11. Benchmark provenance

The proof-pair source provenance and historical-unification oracle are documented only in `DP_HIDDEN_ORACLE.md`.

The benchmark tests rediscovery, not citation recognition. Cold proof files preserve mathematical structure while omitting identifying names/citations.

## 12. Qualification sequence

```text
author deterministic review
-> freeze candidate + corpus + hidden assertions
-> create/update RUN_Q006.request once
-> one Experiment 006 workflow run
-> one cold Gemini semantic reconstruction/discovery pass
-> freeze output
-> deterministic scorer unblind
-> discrepancy review
-> optional independent semantic verifier only if scorer cannot adjudicate
-> final promotion review
```

No candidate module is promoted merely because the experiment is resource-efficient. Resource efficiency is subordinate to correctness and coverage.
