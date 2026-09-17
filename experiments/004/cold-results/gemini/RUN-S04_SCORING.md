# Experiment 004 — Gemini RUN-S04 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-S04-cold-v3` (`10484606048`)  
**Frozen report SHA-256:** `3fa2891359d9b337f9e73bef1f380e93a1dcd351cf846a2d777b40d269efac20`  
**Scorer:** `Q004_S04_ASSERTIONS_004.json`

## Result

All 12 scored expectations agree with the frozen report:

- pair common edge label `^7000` — AGREE
- pair common mapping `1→5, 2→6` — AGREE
- A pair residual label `^7001` — AGREE
- B pair residual label `^7002` — AGREE
- A D-local residual label `^7010` — AGREE
- B D-local residual label `^7011` — AGREE
- pair reconstructs A comparison-stage object — AGREE
- pair reconstructs B comparison-stage object — AGREE
- exact D `1100` reconstructs full A source — AGREE
- exact D `2100` reconstructs full B source — AGREE
- lossy D `1300` does not reconstruct the full source — AGREE
- D-local and pairwise residuals are different accounting roles — AGREE

```text
AGREE:      12
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

The report also correctly states that complete pairwise accounting cannot upgrade a lossy D transform into a full-source reconstruction claim. No specification repair is indicated.
