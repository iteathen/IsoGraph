# Experiment 062 Span-Successor Attempt Review

**Run:** 37438115386  
**Frozen source SHA:** `b0ef4b6858bbb1c809a64e8a1da6b31ee5e6a208`  
**Disposition:** OUTPUT-CONTRACT FAILURE / SEMANTIC EXTRACTION PRESERVED FOR SOURCE-LITERAL RECONCILIATION

The 0.2 span-contract successor again returned all 84 W census IDs and terminated with provider finish reason `STOP`.

Deterministic validation rejected exactly two fields:

- `W-SSC-022-O01.argument_spans` expanded the source's literal `positive/negative imaginary-time sectors` into a non-existent `positive imaginary-time sectors` string.
- `W-SSC-095-O01.relation_span` emitted `equivalent to`, while the frozen body contains `equivalent geometric roles`.

The semantic occurrence selections themselves are retained as research evidence. A third W extractor call is not justified merely to obtain exact transcription.

`W_EXTRACTION_RECONCILIATION_0_1.json` records two source-literal-only repairs. `W_EXTRACTION_RECONCILED_0_1.json` is the resulting 84-item candidate occurrence census. It is not yet G1-complete authority: it must pass independent omission/spurious-boundary audit.

No primitive, basis class, cross-track equivalence, or W closure is admitted by this repair.
