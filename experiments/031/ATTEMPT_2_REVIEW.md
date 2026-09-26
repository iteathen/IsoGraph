# Experiment 031 — Attempt 2 Output-Budget Review

**Workflow run:** `36254103541`  
**Trigger SHA:** `f990458c4d5f3e4f5a8836e804fb9c9f55b6d6a9`  
**Preflight:** PASS  
**Provider HTTP:** 200  
**Selected model:** `gemini-3-flash-preview`  
**Semantic score:** not produced

## Frozen failure

The provider returned JSON beginning with F01–F10, then stopped mid-string while beginning F10 authority output.

Metadata records:

```text
finish_reason: MAX_TOKENS
prompt tokens: 75,062
candidate output tokens: 1,296
thinking tokens: 31,458
```

The response is therefore syntactically incomplete and was correctly rejected before hidden scoring.

## Partial observation

The complete answer fields emitted for F01–F09 and the visible F10 answer fields agree with the frozen hidden oracle. This is an observation only; it is not a formal qualification score because the response is incomplete.

## Classification

```text
failure class: provider/output-budget truncation
packet identity: valid
authority hashes: valid
semantic disposition: none
historical result rewrite: none
```

## Correction

The next attempt disables provider hidden thinking for the serializer-heavy 32-case task and asks for concise one-sentence reasons / compact authority references.

No case text, hidden expected answer, authority revision, or scorer semantic criterion is changed.
