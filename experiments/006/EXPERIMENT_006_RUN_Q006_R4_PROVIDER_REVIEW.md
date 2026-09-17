# Experiment 006 — RUN-Q006-R4 Provider-Limited Attempt Review

**Status:** infrastructure/provider failure; no semantic qualification result  
**Run:** `RUN-Q006-R4`  
**Qualification commit:** `ea0a45db18c05f8cc9ff97042b98cd9529a7c509`  
**GitHub Actions run:** `35276333953`  
**Model:** `gemini-3.5-flash`  
**Semantic API attempts:** 1  
**Provider result:** HTTP 429  
**Parsed cold report:** none

## Scope

R4 is the same focused Alpha/Beta proof-pair regression used by R3, with no broad QU/NEI control sweep.

The only substantive discovery-authority change is DP 0.4, which adds:

1. concrete failed-obligation requirements for `STRUCTURAL_BREAKER`;
2. mandatory re-entry of cross-residual `CORRESPONDENCE` results into ordinary candidate expansion/falsification.

NEI 0.1 + 0.2 and the proof pair/oracle remain unchanged.

## Execution result

Deterministic preflight passed:

```text
runner syntax: PASS
scorer syntax: PASS
NEI 0.2 present: PASS
DP 0.4 present: PASS
R4 prompt present: PASS
```

The first and only Gemini request returned HTTP 429. The runner intentionally does not retry 429 responses in order not to amplify provider rate limiting.

Therefore:

```text
semantic report: unavailable
motif score: not evaluated
DP 0.4 disposition: UNTESTED_BY_R4
```

The deterministic scorer emitted `NO_PARSED_REPORT` only because no semantic output existed; that is not a semantic failure.

## Qualification interpretation

This attempt supplies no evidence that DP 0.4 passes or fails the focused proof regression.

A later attempt is justified only as a provider/infrastructure retry of the same frozen R4 candidate. It should use the same proof pair, hidden oracle, prompt, runner, and scorer unless a separately motivated revision is made first.

Do not reinterpret HTTP 429 as a candidate failure and do not silently replace this attempt with a later result.
