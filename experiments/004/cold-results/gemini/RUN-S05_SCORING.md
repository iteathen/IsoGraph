# Experiment 004 — Gemini RUN-S05 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-S05-cold-v3` (`10484526430`)  
**Frozen report SHA-256:** `4753d468d3ed9a73cb4c3364cca5046fe4dfe3904b0ce68be640f8fdee8ccab2`  
**Scorer:** `Q004_S05_ASSERTIONS_004.json`

## Result

All 7 scored expectations agree with the frozen report:

- raw fingerprint values `[2, 3]` — AGREE
- raw pair is prunable under the qualified raw-stage invariant — AGREE
- factored fingerprint values `[1, 1]` — AGREE
- raw-stage mismatch may not be reused to prune the factored pair — AGREE
- factored objects are isomorphic under V0 — AGREE
- equal factored fingerprints alone do not prove isomorphism — AGREE
- no single global post-D canonical factorization is required — AGREE

```text
AGREE:      7
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No specification repair is indicated by RUN-S05.
