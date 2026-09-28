# Experiment 050 — Final DP 0.8 Principle-Level Review

**Status:** COMPLETE / PARTIAL VALID QUALIFICATION EVIDENCE  
**Candidate:** Discovery Protocol 0.8 clue-preserving discrepancy adjudication  
**Candidate SHA-256:** `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`  
**Workflow run:** `36364392396`  
**Frozen execution SHA:** `fc3c664947898c105ff175a8030151a086ef5c44`  
**Packet SHA-256:** `4bcee35684b9fa98d17f92e312576f8fb6cdfeff5c5595e11fe901b5b6a6f4a4`  
**Report SHA-256:** `5845fe92f48991bc6eabc5456920c7ef9f461f416b4696345d655fc5a6280e26`

## Result

Experiment 050 used 22 fresh blind cases and principle-level boolean scoring.

```text
valid PASS cases:
    21

rejected underdetermined control:
    E05

exact case count/order:
    PASS

duplicates / unexpected:
    0 / 0

self-audit:
    PASS

decoder:
    gemini-3-flash-preview

finish:
    STOP
```

E01-E04 and E06-E22 are retained as qualification-bearing evidence.

## E05 disposition

E05 asked whether `repair_required` was true when two correctly computed quantities were documented as distinct but a comparison tool subtracted them as if they were the same quantity.

The decoder returned:

- `distinct_quantities = true`;
- `normalize_values = false`;
- `repair_required = true`.

Its reason correctly located the comparison tool's false identity assumption.

The hidden oracle intended `repair_required=false` to mean "neither correct source measurement requires repair."

Because the public field did not identify the object to be repaired, both readings were supported by the case. E05 is therefore rejected as an underdetermined qualification control, not counted as a DP 0.8 failure, and not retroactively rescored.

See `ATTEMPT_1_REVIEW.md`.

## Qualification coverage retained

The 21 valid cases directly cover DP 0.8 section-19 targets:

- 1-4;
- 6-22.

Section-19 target 5 is discharged independently by fresh Experiment 051.

No qualification claim uses E05.
