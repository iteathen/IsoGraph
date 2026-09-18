# Experiment 006 — Current-Main Test 6 Cold Regression Review

**Status:** semantic regression PASS; not promoted as new blind qualification because the candidate changed after hidden assertions were exposed  
**IsoGraph revision:** `08aaeb8b7a7d6748f86649fe8b6a7b8c9c21b655`  
**Control run:** `iteathen/OX-Alpha-Contol` Actions run `35301068326`  
**Decoder:** `nvidia/nemotron-3-ultra-550b-a55b:free` via OpenRouter  
**Resolved provider/model:** Nvidia / `nvidia/nemotron-3-ultra-550b-a55b:free`  
**HTTP:** 200, one attempt, cost 0  
**Packet SHA-256:** `d45dde9279429d0ae514b156e98298c5ddd914fb053d4e1cba5fc4a031e2ba80`  
**Report SHA-256:** `0bdfba073db91079a2f49390846a90fe86f3b2c013a5dbbd82c4607309637566`

## Result

The unchanged R4 hidden scorer returned:

```text
QUALIFIES
```

Matched motifs:

```text
O1
O2
O4
O5
```

Deep motifs:

```text
O2
O4
```

Every scorer guard passed, including:

```text
finding_width_valid
enough_findings
enough_motifs
deep_motif_found
alpha_residuals_preserved
beta_residuals_preserved
overclaims_rejected
supported_candidate
falsification_recorded
common_core_recorded
reranking_explained
cross_residual_triggered
cross_residual_role_pass_recorded
cross_residual_deep_correspondence
cross_residual_correspondences_handled
separator_legal
structural_breaker_concrete_if_used
stop_kind_legal
dormant_not_false_rejection
```

The decoder recovered:

```text
A04,A05 <-> B03,B04
    boundary-condition / encoding correspondence

A06 <-> B06,B07,B08
    obstruction / invariant correspondence

A07,A08,A09 <-> B09
    witness-generation / decoding / discharge correspondence
```

The mandatory cross-residual pass promoted the encoder/boundary and obstruction correspondences and expanded the witness/decoding correspondence.

The decoder rejected:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
```

and retained:

```text
separator = NONE
NEI = NOT_APPLICABLE
promotion = SUPPORTED_CANDIDATE
```

## Qualification boundary

This run is a valid isolated decoder execution: the model packet excluded hidden scorer assertions, prior outputs, author reviews, repository maps, agent guidance, and external browsing.

However, Experiment 006 Section 10 states that a semantic rerun after hidden assertions have been exposed requires a new frozen experiment revision.

The current DP 0.4 file changed after the hidden R4 assertions had already been inspected by the authoring process. The later change was the general signal-led speculative-exploration rule, not a benchmark-specific mapping, but the historical blind boundary is still no longer pristine.

Therefore:

```text
existing Test 6 gate: PASS
cold model isolation: PASS
current-main regression: PASS
formal new blind promotion: NOT CLAIMED
```

A future formal promotion should use a newly frozen revision with a fresh hidden benchmark or other independent holdout evidence rather than retroactively relabeling this post-unblind regression.

## Artifact storage

The complete metadata, parsed report, and score were emitted to the immutable Actions log.

GitHub artifact upload still reported account-level artifact storage quota exhaustion, so no downloadable workflow artifact was created. No semantic evidence was lost from the log.

## Disposition

This run is the first current-main direct cold decoder result to satisfy every existing Test 6/R4 scorer guard.

It materially supports the revised DP 0.4 discovery behavior, especially:

- deep boundary/encoder recovery;
- deep obstruction recovery;
- residual preservation on both sides;
- promotion of cross-residual correspondences;
- rejection of machinery-only breakers;
- rejection of identity/isomorphism overclaims.

Do not rewrite earlier frozen Experiment 006 scores.
