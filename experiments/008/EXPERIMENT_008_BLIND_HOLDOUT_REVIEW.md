# Experiment 008 — Blind Holdout Review

**Frozen qualification SHA:** `cabcdd90c2a997c69a421bb6ada9d2f1a7d31882`  
**Control run:** `iteathen/OX-Alpha-Contol` Actions run `35303672370`  
**Decoder:** `nvidia/nemotron-3-ultra-550b-a55b:free`  
**Provider:** Nvidia via OpenRouter  
**HTTP:** `200`  
**Attempts:** `1`  
**Packet SHA-256:** `37fe3b0feb6e277158b4401a2624801b5d79d69bdd83134b061893aaee47cd21`  
**Report SHA-256:** `f1f4df42114b035aa0b70202f86cf7f9e5130e525c35eb392f883f3e1612e764`

## Freeze and isolation

Experiment 008 was frozen only after the generic QRC 0.1 rejection contract and deterministic scorer tests had been committed.

The cold decoder received only:

- Core 0.17 qualified authority;
- NEI 0.1 / 0.2 candidates;
- Discovery Protocols 0.1 through 0.4 candidates;
- QRC 0.1 candidate;
- `DERIVATION_ALPHA.md`;
- `DERIVATION_BETA.md`;
- `COLD_PROMPT.md`.

It did not receive:

- `HIDDEN_ORACLE.md`;
- `ASSERTIONS.json`;
- scorer source;
- Experiment 006 or 007 oracle/results;
- prior Experiment 008 output;
- repository maps or agent guidance;
- external browsing.

The workflow checked out the exact frozen SHA and the deterministic preflight passed before the external decoder call. That preflight included both the generic QRC normalizer tests and the Experiment 008 scorer tests.

No GitHub Actions artifacts were retained; the run reports an empty artifact set.

## Formal result

The frozen scorer returned:

```text
QUALIFIES
```

Matched motifs:

```text
O1 PASS
O2 PASS
O3 PASS
O4 PASS
O5 PASS
```

Deep motifs:

```text
O2 PASS
O3 PASS
O4 PASS
```

Every qualification guard passed:

```text
finding_width_valid
enough_findings
enough_motifs
deep_motif_found
alpha_residuals_preserved
beta_residuals_preserved
residual_explanation_present
semantic_overclaims_rejected
supported_candidate
falsification_recorded
common_core_recorded
protocols_recorded
reranking_explained
stop_reason_present
```

Scorer residual hits were:

```text
Alpha: A03, A05
Beta:  B03, B04
```

QRC 0.1 rejection coverage was complete. The decoder happened to serialize all four rejection concepts as their canonical public IDs, so both semantic rejection coverage and exact canonical-string coverage were true.

Promotion remained correctly bounded to:

```text
SUPPORTED_CANDIDATE
```

## Recovered structure

The cold report independently recovered the intended architecture:

```text
fixed generator + seed
    -> generated forward sequence

finite ambient capacity
    -> dependency / repetition witness

witness
    -> finite recurrence / repeat constraint

same generator
    -> constraint propagated across future shifts

finite initial data + persistent rule
    -> reconstruction of the infinite future
```

It also preserved the load-bearing residual:

```text
Alpha:
    literal state collision
    -> equality propagation
    -> eventual periodic repetition

Beta:
    linear dependence
    -> coefficient recurrence
    -> no requirement of repeated vectors
```

The report did not collapse those mechanisms into identical intermediate objects or algorithms.

## QRC interpretation

This is fresh blind qualification evidence obtained after QRC 0.1 was frozen publicly.

It establishes that the corrected public contract and semantic-aware scorer can be used in a fresh hidden holdout without weakening discovery qualification.

It does **not** independently exercise the natural-language normalization branch, because this decoder chose the canonical public IDs. That branch is instead supported by:

1. deterministic QRC regression tests;
2. the versioned post-freeze Experiment 007 audit using the exact frozen natural-language rejection strings.

Experiment 007's historical `DOES_NOT_QUALIFY` disposition remains unchanged.

## Prompt-hygiene caveat

The report used the familiar phrase `pigeonhole principle` while describing A02/A03, even though the cold prompt said not to identify or rely on theorem names.

This did not supply the hidden motif mapping: the finding is grounded directly in the visible capacity/counting steps, and the hidden scorer matched the structural step correspondence rather than the label.

Record this as a prompt-conformance/hygiene caveat, not as independent discovery evidence and not as a reason to rewrite the frozen score.

A future holdout can make the distinction mechanically clearer by requiring step-grounded descriptions while treating named labels as non-evidentiary, without prescribing a discovery sequence.

## Disposition

Experiment 008 provides genuinely fresh blind evidence:

```text
blind semantic discovery: SUCCESS
hidden motif recovery: 5/5
deep motif recovery: 3/3
frozen automatic score: QUALIFIES
cold decoder isolation: PASS
QRC semantic rejection guard: PASS
residual preservation: PASS
falsification: PASS
new blind qualification evidence: YES
```

This result is evidence for the current Discovery Protocol candidate behavior. It does not silently promote DP 0.4, QRC 0.1, QU, NEI, or any other candidate into qualified semantic authority.


## Qualification-strength limit

This holdout is genuinely fresh and isolated, but its discriminative difficulty is not maximal.

Both visible derivations explicitly expose:

- forward iteration from a fixed generator;
- a finite-capacity initial segment;
- a resulting constraint;
- propagation into a recurrence;
- finite reconstruction of an infinite future.

The hidden oracle still required the decoder to preserve different mechanisms and recover the propagated-dependency architecture, but several high-level roles are visibly parallel.

Accordingly, interpret Experiment 008 as strong evidence that:

```text
current DP behavior
+ QRC 0.1
+ hidden structural scoring
```

can recover and correctly bound a fresh cross-mechanism correspondence.

Do not interpret it alone as proof that DP 0.4 handles every highly oblique cross-domain discovery case.

The evidence picture is stronger in combination:

```text
Experiment 007:
    different proof domain / more oblique machinery
    blind semantic motifs 5/5, deep 3/3
    frozen formal failure only from hidden token serialization

Experiment 008:
    fresh independent holdout after public QRC freeze
    formal QUALIFIES
    motifs 5/5, deep 3/3
    all guards pass
```

That combined record supports further qualification or an explicit promotion review, but does not itself perform the promotion.
