# Experiment 004 — Gemini RUN-B scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-B-cold-v3` (`10483674973`)  
**Frozen report SHA-256:** `a001cbb8510fffeb034c98dce1cef955651066de537bdb6c0dbb799befa058f0`  
**Scorer:** `PHASE_B_REWRITE_ASSERTIONS_004.json`

## Result

### Q004-02

All scored requirements agree: application `2003`; binding `?0=20`; successor has one `(10 20)` occurrence, two `(30 20)` occurrences, and three direct occurrences total; the pre-existing and newly produced `(30 20)` occurrences are not collapsed.

### Q004-03

All scored requirements agree: selected applications `3004` and `3005`; each binds `?0=20`; each produces successor `[(30 20)]`; the successors are structurally isomorphic; the derivation events remain distinct because they are separate selected application identities using separate reified rule instances.

```text
AGREE:      12
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No specification repair is indicated by RUN-B.
