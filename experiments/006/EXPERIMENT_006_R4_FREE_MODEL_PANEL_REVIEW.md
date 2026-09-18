# Experiment 006 — R4 Byte-Identical Free-Model Panel Review

**Status:** clean cross-model cold comparison completed; no formal pass  
**Qualification target:** `iteathen/IsoGraph@24a7a49a58214a281ae5fe8c553f99e18f229cfb`  
**Control run:** `iteathen/OX-Alpha-Contol` Actions run `35298420470`  
**Panel packet SHA-256:** `89042dd96a762919e7b373385f1cbadc4cca6d29bc53acacce63237623bc3c9c`

## 1. Method

Three independent OpenRouter free models received the same byte-identical R4 cold packet sequentially through one shared API key.

Models:

- `dots-studio/dots-3-note-preview:free`
- `nvidia/nemotron-3.5-lightning:free`
- `nex-agi/nex-n2.5-pro:free`

All three successful calls reported the same packet hash:

```text
89042dd96a762919e7b373385f1cbadc4cca6d29bc53acacce63237623bc3c9c
```

The hidden R4 scorer was applied only after each response was frozen.

## 2. Results

### Dots3-Note Preview

```text
HTTP: 200
disposition: DOES_NOT_QUALIFY
matched motifs: O1, O2, O4, O5
deep motifs: O2, O4
```

This model met both the four-motif threshold and the deep-motif requirement.

The failing guards were:

```text
beta_residuals_preserved: false
cross_residual_deep_correspondence: false
```

All other guards passed.

This is the closest clean cold result so far.

### Nemotron 3.5 Lightning

```text
HTTP: 200
disposition: DOES_NOT_QUALIFY
matched motifs: O1, O2, O5
deep motifs: O2
```

Failing guards:

```text
enough_findings: false
enough_motifs: false
cross_residual_deep_correspondence: false
cross_residual_correspondences_handled: false
```

### Nex-N2.5-Pro

```text
HTTP: 200
disposition: DOES_NOT_QUALIFY
matched motifs: O1, O4, O5
deep motifs: O4
```

The only failing guard was:

```text
enough_motifs: false
```

Every other R4 guard passed.

## 3. Cross-model interpretation

No model formally passed.

However, the panel materially narrows the failure space:

- O1 is stable across all successful decoders.
- At least one deep motif is stable across all successful decoders.
- O2 is recovered by Dots3 and Nemotron Lightning.
- O4 is recovered by Dots3 and Nex-N2.5-Pro.
- O5 is recovered by all three.
- Dots3 recovered the required four motifs but failed residual/deep-cross-residual bookkeeping.
- Nex-N2.5-Pro satisfied every non-motif guard but recovered only three motifs.

This indicates that the current DP 0.4 behavior is not failing in one uniform way across models. The remaining misses separate into:
1. discovery breadth/composition;
2. residual preservation;
3. cross-residual deep-correspondence bookkeeping.

## 4. Formal disposition

```text
Formal cold pass in panel: NO
Closest clean cold run: Dots3-Note Preview
Dots3 motif threshold: PASS
Dots3 deep motif threshold: PASS
Dots3 overall qualification: FAIL
```

Historical raw scores must remain unchanged.

## 5. Artifact storage

The panel evidence was emitted to the immutable workflow log. The artifact upload still returned the account-level storage-quota error because GitHub had not yet recalculated storage after the IsoGraph artifact cleanup.

No semantic evidence was lost from the panel summary or scorer results.

## 6. Next analysis seam

Before another semantic rerun, inspect the frozen Dots3 report specifically for:

- whether two Beta residuals were actually present semantically but omitted from `beta_residual_steps`;
- whether its O2/O4 main findings imply a deep cross-residual correspondence that the scorer fails to recognize because of role-pass factorization;
- whether those two failed guards reflect genuine decoder omissions or output/scorer bookkeeping sensitivity.

Do not lower thresholds or reinterpret this run as a pass.
