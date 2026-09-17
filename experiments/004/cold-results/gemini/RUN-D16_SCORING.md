# Experiment 004 — Gemini RUN-D16 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D16-cold-v3` (`10484189545`)  
**Frozen report SHA-256:** `693d28a05653f0e894d71f01315eac042d47315abcb55dc4353c00cb8043091b`  
**Scorer:** `Q004_16_ASSERTIONS_004.json`

## Result

All 16 scored expectations agree with the frozen report.

Schema `1601` is correctly decoded as a single unconstrained slot with no required pattern, assignments `1710` and `1711`, and a vacuous/pass-through status.

Schema `1602` is correctly decoded as a single slot requiring the two-edge path pattern `(?0 ?1), (?1 ?2)`. Gemini supplies the expected successful bindings for `1701` (`20,21,22`) and `1702` (`40,41,42`), correctly rejects star-shaped `1703` because no node is both a target and a source, correctly states that large parameter size does not disqualify a schema, and correctly refuses full class promotion from this case alone.

```text
AGREE:      16
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No specification repair is indicated by RUN-D16.
