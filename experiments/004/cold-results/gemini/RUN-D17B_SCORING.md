# Experiment 004 — Gemini RUN-D17B scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Successful rerun job:** `105112766976`  
**Cold artifact:** `isograph-exp004-RUN-D17B-cold-v3` (`10484992470`)  
**Frozen report SHA-256:** `4389c7fdd5371ef6dccf75b3fb930830c06d3bd7e6d42511deb87808372bd25e`  
**Scorer:** `Q004_17B_ASSERTIONS_004.json`

The original D17B attempt (`105106212633`, artifact `10484942945`) ended in an HTTP headers timeout and produced no cold report. It is transport-failure evidence only and is not scored. The successful rerun above is the qualification output used here.

## Hidden-scorer comparison

All 23 scorer-level expectations are recoverable from the frozen report:

- schema relations `^4740/^4741/^4742/^4743` are decoded correctly — AGREE
- all six type declarations `9000..9005` have the exact expected field-ID sets — AGREE
- all six instance/type declarations `9100..9105` are correct — AGREE
- source-local transform record visibly carries distinct target/residual scope structures — AGREE
- pair-witness record visibly carries common structure and two distinct pair-residual structures — AGREE
- pair-witness references the source-local transform and index records — AGREE
- index record contains opaque identity, exact revision literal, input/body-stage reference, and policy/reference structure — AGREE
- NAC-context record contains condition, separate boundary/context, consumer/reference, and revision structure — AGREE
- result/terminal record links the relevant record instances plus revision/status literals — AGREE
- no human/JSON sidecar is needed to reconstruct the raw graph topology — AGREE

## Additional cold-report defects

Two prompt-level issues prevent a clean PASS despite full hidden-scorer recovery.

1. **Semantic gloss leakage.** The governing prompt says `Do not guess English meanings for stable labels` and `Do not infer domain names`, but the report adds descriptions such as "baseline structure", "aggregator of body differences/stages and historical references", and "NAC evaluated context". The raw topology is correctly decoded; those English role names are unsupported embellishment. Classification: **decoder/search implementation error / label-semantic leakage**.

2. **Task 9 calls for the terminal record's complete topology.** The report's earlier Task 5 correctly lists `9102 -> 9400` and `9102 -> 9401`, but the later ASCII "Complete Transitive Dependency Graph" omits those two body-object links. Because the information is present elsewhere in the same frozen report, this is an internal report-completeness defect rather than a representation failure. Classification: **witness/accounting/reporting error**.

**Disposition:** PARTIAL. The current native-record burden targeted by the hidden scorer is fully reconstructed, but the report adds prohibited semantic gloss and its terminal-topology diagram is not literally complete.
