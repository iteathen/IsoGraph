# Experiment 004 — Gemini RUN-D20L scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D20L-cold-v3` (`10484813667`)  
**Frozen report SHA-256:** `af2c35098f2c4e9d82325fc9f2771557dbbc486bf3c6a2b91dafdbabcd0e6515`  
**Scorer:** `Q004_20_ASSERTIONS_004.json` — label-assisted channel

## Result

All label-assisted and representation-qualification targets agree with the frozen report:

- same-label metadata pair is `#2001/#2003` — AGREE
- that pair is structurally invalid/non-isomorphic — AGREE
- the true structural pair `#2001/#2002` has unequal metadata labels — AGREE
- structural verification independently recovers `#2001/#2002` with map `1→10,2→11,3→12` — AGREE
- label equality alone is not sufficient structural evidence — AGREE
- label assistance is retained only as a weak retrieval hint/possible accelerator, never proof — AGREE

The report cleanly demonstrates both fixture-controlled failure modes of the assisted channel: a same-label false positive and a different-label false negative. It keeps retrieval metadata separate from structural witness evidence.

```text
AGREE:      6
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS for the Q004-20 label-assisted channel.
