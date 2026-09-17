# Experiment 004 — Gemini RUN-S08 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-S08-cold-v3` (`10484392444`)  
**Frozen report SHA-256:** `84bf3c18e0d1cce933d69f3c42011ff17125eabf2d4f6a84777eb6ad44dde18c`  
**Scorer:** `Q004_S08_ASSERTIONS_004.json`

## Result

All 7 scored expectations agree with the frozen report:

- objects `1000` and `2000` are structurally isomorphic — AGREE
- there are exactly two materially distinct bijective witnesses — AGREE
- algorithm `8100` hash pair is `[111, 111]` — AGREE
- algorithm `8101` hash pair is `[222, 222]` — AGREE
- cross-algorithm hash difference does not imply non-isomorphism — AGREE
- algorithm revision is part of the index/serializer record — AGREE
- deterministic serializer tie-breaks may not collapse materially distinct witnesses — AGREE

```text
AGREE:      7
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

The frozen report also explicitly enumerates both valid isomorphism mappings and preserves the distinction between retrieval/index invariants and structural evidence. No specification repair is indicated.
