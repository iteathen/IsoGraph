# IsoGraph Experiment 004 — Q004-09 Cold Decomposition Prompt — Draft 0.15

You are an isolated IsoGraph factorization auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_09_DECOMPOSITION_CHEAT_004.axh`
3. this prompt

Do not read assertions, results, reviews, author audits, source amendment specs, external-review material, or gloss.

For this frozen synthetic fixture, raw records have these structural roles:

```text
(^4900 SOURCE SOURCE_BODY)
(^4901 FACTORIZATION SOURCE)
(^4902 FACTORIZATION EXPOSED_TARGET)
(^4903 FACTORIZATION SOURCE_TARGET_MAP)
(^4904 FACTORIZATION RECONSTRUCTION_RESIDUAL)
```

These roles are test-record structure; they do not alter current decomposition semantics.

## Task

1. Reproduce source `9000` exactly.
2. Audit factorization `9100`: reproduce exposed target, map, and residual; determine whether source structure can be reconstructed from exposed target/map without an opaque source copy; state semantic-decomposition coverage.
3. Audit factorization `9200`: reproduce exposed target, map, and residual; determine whether original source can be recovered if residual is kept; determine whether round trip alone counts as semantic-decomposition evidence; classify the information carried by the residual.
4. State explicitly whether lossless round trip and semantic-decomposition coverage are the same qualification property.
5. State whether any residual in this source-local D audit should be reclassified as a pairwise common-core residual merely because later comparison might occur.

Do not reward a factorization merely for storing the entire undecomposed source in a residual. Freeze the result before consulting anything else.
