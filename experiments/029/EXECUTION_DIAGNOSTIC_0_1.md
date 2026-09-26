# Experiment 029 — Execution Diagnostic 0.1

**Status:** PROVIDER/OUTPUT INFRASTRUCTURE FAILURE — NOT A SEMANTIC DISPOSITION  
**Workflow run:** `36232502296`  
**Frozen source SHA:** `26cc10d717ac0f8c14aa225945be3d1ce994f14b`  
**Evidence commit:** `36988af65bfdbd639f38eaac1fdc97ad111055fd`

The deterministic preflight passed and the preferred model returned HTTP 200.

The response was not scored because it terminated with:

```text
finish_reason: MAX_TOKENS
candidatesTokenCount: 1300
thoughtsTokenCount: 31454
```

The emitted JSON truncated during D09 and failed parsing.

Therefore:

```text
run 36232502296
    = malformed/incomplete provider output
    != Core 0.19 semantic PASS
    != Core 0.19 semantic FAIL
```

The partial frozen output answered D01–D08 consistently with the hidden contract, but those observations are diagnostic only and are not rescored or reused as qualification evidence.

Root cause was the runner's `maxOutputTokens:32768` budget being consumed primarily by high-level model reasoning before the 24-case structured response completed.

TDD evidence for the correction:

- output-budget RED: run `36232690611`;
- runner changed only from `32768` to `65536`;
- output-budget GREEN: run `36232725765`.

The semantic candidate, public cases, hidden assertions, baseline authority, and cold prompt remain unchanged.

A rerun is justified under qualification resource discipline because the previous attempt produced malformed/incomplete external output.
