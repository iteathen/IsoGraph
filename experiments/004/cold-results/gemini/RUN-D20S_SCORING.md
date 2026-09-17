# Experiment 004 — Gemini RUN-D20S scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D20S-cold-v3` (`10485500302`)  
**Frozen report SHA-256:** `30bb9bdee2e2ad34c7754f851e254d1d7d40833de039741e81430cc1480ebc63`  
**Scorer:** `Q004_20_ASSERTIONS_004.json` — structural-only channel

## Result

All structural-only scorer targets agree with the frozen report:

- exact isomorphic pair is `#2001/#2002` — AGREE
- explicit map is `1→10, 2→11, 3→12` — AGREE
- `#2001/#2003` is non-isomorphic — AGREE
- separating shape is directed path-chain versus one source with two outgoing edges — AGREE
- the structural-only retrieval path independently surfaces the true pair — AGREE

The report distinguishes retrieval from verification and also checks the remaining non-isomorphic pair `#2002/#2003`.

A non-scored caution is retained: the report writes illustrative native witness/certificate structures and announces several qualification gates as met. Those report-local structures were not themselves part of the frozen fixture or separately qualified native dependencies, so that additional gate language is not being counted as Experiment 004 evidence. It does not affect the requested structural retrieval/comparison result.

```text
AGREE:      5
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS for the Q004-20 structural-only channel.
