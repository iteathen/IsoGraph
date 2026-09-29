# Experiment 055 — Infrastructure Attempts 1–3 Review

**Status:** preserved infrastructure failures; no semantic disposition  
**Workflow run:** `36619040086`  
**Frozen semantic source SHA:** `31d4d1e8186841049f54649974eb56abbb9c914d`  
**EI 0.1 SHA-256:** `b94262d7384603072d0e7a2657b84f6c427e7098cea051948702c367a440c666`  
**Packet SHA-256:** `86b5d25d9d4548152c4fab191f99cd8782315844acf822bf9ef67b3db8f35a30`

Deterministic preflight passed on every attempt. No attempt produced a semantic report or hidden score.

- attempt 1: provider responses were only HTTP 503/429;
- attempt 2: same provider-only 503/429 failure;
- attempt 3: Gemini 3.8/3.6/3.1-flash-lite returned 503, Gemini 3.7 timed out, and pro endpoints returned 429.

All three attempts are `INFRASTRUCTURE_FAILURE`, not `DOES_NOT_QUALIFY`.

The EI candidate, public cases, hidden assertions, and scorer were unchanged across these attempts. A fresh provider attempt may therefore reuse the exact semantic corpus without rescoring or rewriting prior outputs.
