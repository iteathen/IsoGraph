# Experiment 004 — Gemini RUN-D17 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D17-cold-v3` (`10484826388`)  
**Frozen report SHA-256:** `b53a63b6430167052b8a0e2bb1ec077047199513a2635d7d729ff2eba06929ba`  
**Scorer:** `Q004_17_ASSERTIONS_004.json`

## Result

All 24 scored fields agree with the frozen report.

Gemini exactly recovers the three schema field sets, all three instance types, all declared scalar and nested-scope field values, and the `5002 → 5001 → 5000` native reference chain. It also correctly distinguishes reconstructing the native record topology from attaching human-domain names to field roles: the mapping/residual topology is physically present natively and the record graph does not require human gloss to reconstruct.

```text
AGREE:      24
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

The report also correctly notes that this preserved base fixture alone does not demonstrate the entire current E1NR burden; that broader pressure is handled by Q004-17B. No scorer conflict or Core Specification repair is indicated.
