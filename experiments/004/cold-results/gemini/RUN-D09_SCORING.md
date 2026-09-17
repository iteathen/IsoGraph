# Experiment 004 — Gemini RUN-D09 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D09-cold-v3` (`10484856912`)  
**Frozen report SHA-256:** `11156699afbb21309c94950320aa5bab27e77009137978678c0270d6209e440a`  
**Scorer:** `Q004_09_ASSERTIONS_004.json`

## Result

All 13 scored expectations agree with the frozen report.

For candidate `9100`, Gemini correctly reports exact round-trip reconstruction, complete exposed source structure up to the alpha map `1→10, 2→11, 3→12`, no opaque source copy requirement, and complete semantic-decomposition coverage for this synthetic source.

For candidate `9200`, Gemini correctly distinguishes recoverability from semantic decomposition: the target and source-target map are empty, the retained residual is the complete source copy, round-trip remains possible, semantic-decomposition coverage is zero/undecomposed, and this may not be counted as semantic decomposition. Its classification as an undecomposed/archival recovery residual matches the scorer intent.

```text
AGREE:      13
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No specification repair is indicated by RUN-D09.
