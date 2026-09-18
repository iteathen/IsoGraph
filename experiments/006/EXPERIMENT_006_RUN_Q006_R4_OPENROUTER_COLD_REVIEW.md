# Experiment 006 — RUN-Q006-R4 Direct OpenRouter Cold Review

**Status:** completed clean focused cold run; DP 0.4 does not qualify  
**Qualification target:** `iteathen/IsoGraph@24a7a49a58214a281ae5fe8c553f99e18f229cfb`  
**Control repository:** `iteathen/OX-Alpha-Contol`  
**GitHub Actions run:** `35290775457`  
**Decoder request:** `nvidia/nemotron-3-ultra-550b-a55b:free`  
**Resolved decoder:** `nvidia/nemotron-3-ultra-550b-a55b:free`  
**API attempts:** 1  
**HTTP status:** 200  
**Packet SHA-256:** `c4984dd4394fa0e0255ec3fd2ca74bb39a781547581fc5feeb9d1f98740f092f`  
**Report SHA-256:** `e8c493d80d20e57eb7e15530a8354af403bcccdd197630d3c689cb6e4b03b75b`

## 1. Isolation

This run used a direct OpenRouter chat-completions call from the private control repository.

The decoder received only the frozen R4 packet built from:

- Core 0.17;
- NEI 0.1 and 0.2;
- DP 0.1 through DP 0.4;
- Proof Alpha;
- Proof Beta;
- the R4 cold prompt.

It did **not** receive:

- account-global or repository agent guidance;
- a repository map;
- prior Experiment 006 reports/reviews;
- hidden assertions;
- the hidden discovery oracle;
- external browsing or retrieval.

Hidden scoring ran only after the semantic response had been frozen and parsed.

This removes the Aider/repo-context limitation of the earlier OpenRouter behavioral run.

## 2. Frozen provider result

The direct request completed successfully:

```text
provider: OpenRouter
requested model: nvidia/nemotron-3-ultra-550b-a55b:free
resolved model: nvidia/nemotron-3-ultra-550b-a55b:free
HTTP status: 200
API attempts: 1
```

No provider retry occurred.

## 3. Hidden score

The exact R4 scorer reported:

```text
disposition: DOES_NOT_QUALIFY

matched motifs:
  O1
  O4
  O5

deep motifs:
  O4

separator:
  NONE

NEI result if load-bearing:
  NOT_APPLICABLE

unhandled cross-residual correspondences:
  0
```

The qualification threshold requires at least four motifs and at least one deep motif.

The deep-motif requirement was met through O4, but only three total motifs were recovered. O2 and O3 were not scored as matched.

## 4. What DP 0.4 corrected

This clean run is evidence that the R3 failure mode was materially corrected.

The decoder did **not** terminate by relabeling different mathematical machinery as a structural breaker:

```text
separator = NONE
```

It also did not manufacture an NEI natural-distinctness result:

```text
nei_result_if_load_bearing = NOT_APPLICABLE
```

And the R4 promotion rule did not leave a discovered cross-residual correspondence stranded:

```text
unhandled = 0
```

Most importantly, it recovered O4, the deep obstruction correspondence that R2/R3 had repeatedly missed.

So the remaining failure is no longer primarily premature separation.

## 5. Remaining discovery miss

The clean decoder failed to reach the required breadth because O2 and O3 were not counted.

The oracle meanings are:

```text
O2:
A04,A05 <-> B03,B04
boundary-directed local encoding

O3:
A03,A07,A08 <-> B03,B04
refinement / approximation bridge
```

O4 was recovered:

```text
A06 <-> at least two of B06,B07,B08
parity versus global topological obstruction
```

This narrows the remaining problem to the encoder/boundary/approximation side of the unification.

## 6. Scorer composition sensitivity

A separate harness issue is now visible from the earlier OpenRouter free-router behavioral run.

That decoder produced adjacent cross-residual correspondences:

```text
A03,A04 <-> B03
  encoder/representation

A05 <-> B04,B05
  boundary/side-condition
```

Together those correspondences cover the semantic content of oracle O2:

```text
A04,A05 <-> B03,B04
```

But the scorer counts O2 only when the required overlaps occur inside one main `finding`.

Therefore a decoder can decompose the O2 region into valid adjacent promoted correspondences and still receive no O2 motif credit.

This does **not** prove that the current clean Nemotron report recovered O2 in decomposed form, because the full raw report from this run was not retained after the artifact failure. It does show that the scorer is sensitive to factorization/output grouping in a way that may undercount semantically recovered composite structure.

Any scorer correction should therefore be narrowly compositional rather than simply lowering thresholds.

## 7. Evidence-retention failure

The workflow attempted to upload eight evidence files, but GitHub Actions rejected artifact creation because the account's artifact-storage quota was exhausted.

The semantic call and hidden scoring had already completed before that failure.

Consequences:

- provider/model identity, hashes, and scorer summary remain in the immutable workflow log;
- the full parsed/raw report is not available as a retained Actions artifact;
- this review must not claim details from the lost report beyond the logged scorer summary.

The control workflow has since been hardened to emit metadata, parsed report, and score JSON directly into the workflow log before attempting artifact upload, and artifact-upload failure is now non-fatal to evidence logging.

No semantic rerun was performed merely to recover the artifact.

## 8. Comparison with earlier evidence

The earlier non-cold OpenRouter free-router behavioral run recovered:

```text
O1, O3, O4, O5
```

but failed one mechanical width guard.

The clean pinned Nemotron run recovered:

```text
O1, O4, O5
```

This combination supports two conclusions:

1. DP 0.4 materially improved obstruction/separator behavior across distinct decoders.
2. Encoder/boundary/approximation discovery remains model- and factorization-sensitive.

It does not justify declaring DP 0.4 qualified.

## 9. Disposition

```text
NEI 0.2 anti-presumption behavior: supported
DP 0.4 structural-breaker correction: supported
DP 0.4 residual-promotion correction: supported
DP proof rediscovery qualification: DOES_NOT_QUALIFY
```

The next correction, if pursued, should first distinguish:

- a real discovery requirement for composing adjacent promoted correspondences into a larger load-bearing candidate; from
- a scorer defect that demands one particular finding factorization even when the same composite structure has already been recovered across linked findings.

Do not rerun the same frozen packet merely for a more favorable answer.
