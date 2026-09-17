# IsoGraph Experiment 004 — Q004-S04 Cold Two-Stage Residual Prompt

You are an isolated IsoGraph reconstruction/accounting auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S04_TWO_STAGE_RESIDUAL.isg`
3. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

For this synthetic fixture only:

```text
^6400  source object body
^6401  source-local D record: D_ID SOURCE TARGET EXACTNESS
       #1 = exact/reconstructable, #0 = lossy
^6402  comparison-stage object body
^6403  source-local reconstruction residual for an exact D record
^6404  pairwise comparison record: PAIR_ID A_CMP B_CMP
^6405  pairwise common-core body
^6406  A-side pair residual
^6407  B-side pair residual
^6408  lossy-discard summary; it identifies omitted relation roles but does not retain omitted incidences
```

These are frozen test-record roles, not new language primitives.

## Task

1. Reconstruct source `1000`, comparison-stage object `1200`, D record `1100`, and its source-local residual.
2. Do the same for source `2000`, object `2200`, and D record `2100`.
3. Audit pair record `3000`: reproduce the common core and each pair residual, then show whether `1200` and `2200` can each be reconstructed at the comparison stage from that pairwise accounting.
4. State whether either source-local D residual may be merged into the pair residual merely because the records participate in one end-to-end analysis.
5. Show how full source `1000` is reconstructed through exact D `1100`, separately from pairwise reconstruction.
6. Audit lossy D `1300 -> 1400` and state whether its `^6408` summary is sufficient to reconstruct the original omitted incidences.
7. State whether complete pairwise accounting can convert that lossy D branch into a full-source reconstruction claim.

Freeze the report before consulting anything else.
