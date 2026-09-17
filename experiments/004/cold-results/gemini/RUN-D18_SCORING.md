# Experiment 004 — Gemini RUN-D18 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D18-cold-v3` (`10485126728`)  
**Frozen report SHA-256:** `e1605cadb6bbb7c1aa19e57b589cab5fe88a2668d27cef446dc3c3146ceb6fee`  
**Scorer:** `Q004_18_ASSERTIONS_004.json`

## Result

All 9 scored expectations agree with the frozen report:

- source object `1800` — AGREE
- raw source-status relation `(^5802 1800 ^5803)` — AGREE
- represented interpretations `[1801, 1802]` — AGREE
- target object `1803` — AGREE
- interpretation `1801` vs target is V0-isomorphic — AGREE
- interpretation `1802` vs target is non-isomorphic — AGREE; Gemini states the stronger `CERTIFIED_NON_ISOMORPHIC` and supplies the finite cardinality/occurrence separator
- no unconditional match claim is allowed for unresolved source `1800` — AGREE
- required disposition is conditional on source interpretation — AGREE
- silently choosing interpretation `1801` because it yields the cleaner match is forbidden — AGREE

```text
AGREE:      9
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

The decoder also preserves the raw source relation and unresolved-alternative provenance in downstream results. No specification repair is indicated by RUN-D18.
