# IsoGraph Experiment 006 — Integrated QU / NEI / Discovery Protocols Qualification

**Status:** qualification design frozen for implementation; not yet executed  
**Candidate modules:** QU 0.1, NEI 0.1, Discovery Protocols 0.1  
**Core authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Resource discipline:** `QUALIFICATION_RESOURCE_DISCIPLINE.md`  
**Default external budget:** one GitHub Actions workflow run + one Gemini semantic invocation

## 1. Purpose

Experiment 006 qualifies the three new modules together where their obligations overlap, while producing separate module dispositions.

The experiment asks whether:

1. QU preserves the relational structure of unresolved information, defines the correct admissible-realization semantics, and keeps semantic unresolvedness separate from computational incompleteness;
2. NEI correctly separates determinate identity claims from QU-mediated identity claims, preserves genuine uncertainty, and does not reintroduce the superseded maximally-coarse-partition rule;
3. Discovery Protocols can recover a nontrivial, historically documented common proof structure from two independently presented proof arguments without being given the hidden unification oracle, while preserving residuals and refusing unsupported semantic promotion.

This experiment does not qualify a particular solver, graph-search algorithm, embedding model, canonicalizer, Bayesian procedure, entropy measure, or proof-search engine.

## 2. Resource objective

The experiment follows the project constraint:

```text
minimize Gemini calls + GitHub Actions runs + CI runtime
subject to complete semantic coverage, cold isolation, reproducibility,
and sufficient independent evidence
```

Default execution is one manually triggered workflow containing:

```text
deterministic preflight
-> assemble one frozen multi-case packet
-> one cold Gemini call
-> freeze/hash response
-> deterministic scoring against hidden assertions
-> upload one evidence artifact
```

There is no separate model-access preflight call. A missing API key is detected mechanically. HTTP 429 fails the run rather than immediately generating repeated rate-limit traffic. At most one retry may be used for a transient 5xx provider failure.

A second semantic verifier is not part of the default run. It is justified only if the frozen result contains a semantic ambiguity that the deterministic scorer cannot adjudicate without weakening the qualification claim.

## 3. Discovery-visible resources

The cold decoder receives exactly:

1. `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
2. `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`;
3. `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`;
4. `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`;
5. `experiments/006/Q006_CASES.md`;
6. `experiments/006/DP_PROOF_ALPHA.md`;
7. `experiments/006/DP_PROOF_BETA.md`;
8. `experiments/006/COLD_Q006_PROMPT.md`.

The proof benchmark files deliberately omit theorem names, author names, citations, and the known historical unification.

## 4. Hidden scorer-only resources

The cold decoder MUST NOT receive:

- `experiments/006/Q006_ASSERTIONS.json`;
- `experiments/006/DP_HIDDEN_ORACLE.md`;
- scorer source code;
- previous Experiment 006 outputs;
- author analysis or post-freeze reviews;
- external search results or web access.

The direct Gemini API call has no repository/browser tools. Isolation is therefore packet-based rather than requiring a separate physical job for each case.

## 5. QU controls

The QU controls cover:

```text
QU-01  shared unresolved referent versus two distinct constrained-equal referents
QU-02  semantically excluded realization despite incomplete solver derivation
QU-03  OPEN / DETERMINATE / INCONSISTENT / INCOMPLETE_SCOPE separation
QU-04  equal information scalar does not imply structural QUI
QU-05  cross-domain QUI candidate under renamed open-role topology
QU-06  semantic UNRESOLVED versus incomplete/resource-limited computation
QU-07  refinement versus semantic revision
QU-08  downstream target may not circularly restrict the QU universe
```

## 6. NEI controls

The NEI controls cover:

```text
NEI-01  determinate SAME without artificial zero-uncertainty QU materialization
NEI-02  absence of distinction with SAME/DISTINCT admissible alternatives -> UNKNOWN
NEI-03  QU variation with a profile-wide separating law -> DISTINCT
NEI-04  QU variation only in identity-irrelevant properties under preserving law -> SAME
NEI-05  empty/inconsistent QU family -> NO_ADMISSIBLE_MODEL, never vacuous identity
NEI-06  QUI plus unresolved identity alternatives does not imply SAME
NEI-07  coarseness trap: [AB] and [A][B] both admissible -> UNKNOWN
NEI-08  temporal preservation law versus lineage-only evidence
```

## 7. Discovery Protocol benchmark

### 7.1 Benchmark design

The DP test uses two proof arguments drawn from genuinely different proof styles for the same underlying fixed-point phenomenon. The cold packet calls them only **Proof Alpha** and **Proof Beta**.

Alpha uses finite subdivisions, local labels, a boundary compatibility condition, a parity/existence lemma, shrinking mesh, and a limiting contradiction.

Beta uses a fixed-point-free assumption to construct a boundary retraction and then derives a contradiction from a global algebraic-topological invariant.

The hidden oracle is based on published mathematical analysis showing that the combinatorial argument contains the same boundary/no-retraction obstruction and that the combinatorial parity machinery has a cochain/cohomological interpretation. The cold decoder is not told this.

### 7.2 What DP must do

The decoder must use DP as a search policy rather than being told which mapping is correct. It must:

- select and adapt discovery protocols;
- propose bounded step-to-step or step-cluster correspondences;
- identify a common proof skeleton deeper than "both are proofs by contradiction";
- preserve substantial proof-specific residuals;
- attempt to falsify its strongest candidate;
- reject unsupported claims of full proof isomorphism, equality of intermediate objects, or NEI identity;
- stop when additional lower-ranked search has low marginal value.

### 7.3 Hidden scoring motifs

The scorer checks for independently recovered structure in five oracle motifs:

1. common fixed-point-free contradiction architecture;
2. local labeling/boundary compatibility as a discrete encoding of the boundary-directed construction;
3. subdivision/refinement as an approximation bridge between local finite structure and a continuous/global boundary obstruction;
4. combinatorial parity/existence obstruction as a discrete manifestation of the global topological/cohomological obstruction;
5. corresponding terminal contradiction while preserving method-specific residual machinery.

At least four motifs must be recovered, including at least one of motifs 2–4. Broad many-to-many mappings are capped so the decoder cannot pass by mapping every step to every step.

## 8. Module dispositions

Scoring produces independent dispositions:

```text
QU:   QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
NEI:  QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
DP:   QUALIFIES | PARTIAL | DOES_NOT_QUALIFY
```

The integrated Experiment 006 disposition is `QUALIFIES` only if all three module dispositions are `QUALIFIES` and no critical isolation/provenance failure occurred.

A failure in one module does not erase evidence gathered for the others.

## 9. Promotion thresholds

### QU

All exact QU controls must match the hidden semantic assertions. Any confusion of semantic unresolvedness with resource failure, any loss of shared-versus-equal structure, or any scalar-information shortcut to QUI blocks qualification.

### NEI

All exact NEI controls must match. In particular, absence of distinction must never produce SAME, inconsistent model families must not vacuously classify identity, and the maximally-coarse selection rule must remain rejected.

### DP

DP must satisfy all critical guards:

- no semantic promotion from discovery rank alone;
- no full-proof-isomorphism claim from partial common structure;
- no identity claim from proof correspondence;
- meaningful residuals on both proofs;
- at least four hidden motifs recovered, with at least one deep motif (2–4);
- explicit falsification attempt against the strongest common-core candidate;
- lifecycle status no stronger than `SUPPORTED_CANDIDATE` unless separate semantic obligations are actually discharged.

## 10. Freeze and rerun discipline

The workflow records:

- exact repository SHA;
- every cold-visible file and SHA-256 hash;
- assembled packet SHA-256;
- model identifier;
- API attempt count;
- raw response hash;
- parsed report hash;
- deterministic scorer output;
- workflow run ID.

A malformed/provider-failed run is evidence of infrastructure failure, not a semantic failure. A rerun must retain the failed run metadata and is a separate evidence item.

A semantic rerun after hidden assertions have been exposed requires a new frozen experiment revision.

## 11. Benchmark provenance

The proof-pair source provenance and historical-unification oracle are documented only in `DP_HIDDEN_ORACLE.md`.

The benchmark is intended to test rediscovery, not memorized citation recognition. The cold files omit names/citations and preserve only the mathematical proof structure needed for a fair structural search.

## 12. Qualification sequence

```text
author deterministic preflight
-> freeze candidate + corpus + hidden assertions
-> one manual Experiment 006 workflow
-> one cold Gemini semantic reconstruction/discovery pass
-> freeze output
-> deterministic scorer unblind
-> discrepancy review
-> optional independent semantic verifier only if scorer cannot adjudicate
-> final promotion review
```

No candidate module is promoted merely because the experiment is resource-efficient. Resource efficiency is subordinate to correctness and coverage.
