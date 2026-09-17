# Experiment 004 — Gemini RUN-D10 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D10-cold-v3` (`10485345166`)  
**Frozen report SHA-256:** `8cb238c1e0cd0e506d0bbbd5314bbea48e4ca8f5104cb86c953dcb9cb6907e78`  
**Scorer:** `Q004_10_ASSERTIONS_004.json`

## Result

All 10 scored expectations agree with the frozen report:

- source A `1000` — AGREE
- source B `2000` — AGREE
- frozen extraction A `1100` — AGREE
- frozen extraction B `2100` — AGREE
- exploratory pair-conditioned extraction B `2200` — AGREE
- `1100` vs `2100` under V0 is non-isomorphic — AGREE
- `1100` vs `2200` under V0 is isomorphic — AGREE
- example map `1→20, 2→21, 3→22` — AGREE
- `2200` may not be used as blind qualification evidence — AGREE
- correct disposition: the match appears only after pair-conditioned extraction, so blind qualification is not established — AGREE

```text
AGREE:      10
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

Gemini additionally supplies a valid structural degree-profile separator for the frozen `1100` vs `2100` pair and correctly preserves the post-hoc match only as exploratory evidence. No specification repair is indicated.
