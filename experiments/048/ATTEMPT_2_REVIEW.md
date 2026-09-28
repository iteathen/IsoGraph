# Experiment 048 Attempt 2 Review

**Workflow run:** 36362502547  
**Source SHA:** 23befbdecbaa39a93ff52e127e382f603fbef5aa  
**Candidate SHA-256:** `9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7`  
**Formal candidate disposition:** none

## Result

The fresh post-field-schema decoder completed and the hidden scorer passed 17 of 18 cases.

Only C11 failed:

- expected semantic token: `source_round_trip = "EXACT"`;
- returned semantic token: `source_round_trip = "PASS"`.

The accompanying reason states that the source facts are recovered faithfully with no unsupported additions.

## Cause

The public schema exposed the answer-field names but did not expose the allowed value vocabulary for string-valued fields.

Thus `PASS` and `EXACT` were both reasonable serializations of the same positive exact-round-trip conclusion, while the hidden scorer required one undisclosed token.

## Disposition

    PUBLIC VALUE-VOCABULARY CONTRACT DEFECT
    Core 0.20 semantic qualification: NOT ADJUDICATED

The 17 passing cases are retained as evidence but this run is not promoted.

## Minimum repair

Publish field types and multi-option enum vocabularies without publishing expected values. Then rerun the same semantic cases with the hidden expected answers unchanged.
