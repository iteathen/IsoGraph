# Experiment 049 Attempt 1 Review

**Workflow run:** 36362506025  
**Source SHA:** ad8a01c7ac51fb66adfd169f017493a9fd31a225  
**DP 0.8 SHA-256:** `74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96`  
**Formal candidate disposition:** none

## Result

Deterministic preflight passed.

The provider returned HTTP 200 but terminated with:

    finish_reason = MAX_TOKENS

after a large hidden-reasoning allocation. The returned JSON was truncated during D10 and could not be parsed. Hidden scoring never ran.

## Disposition

    PROVIDER OUTPUT-TRUNCATION / INFRASTRUCTURE FAILURE
    DP 0.8 semantic qualification: NOT ADJUDICATED

No case result from this run is qualification-bearing.

## Minimum repair

- keep the public cases and hidden expected answers unchanged;
- lower the decoder thinking budget so the answer has room to complete;
- publish explicit allowed value vocabularies for string-valued fields, following the serializer lesson exposed by Experiment 048;
- execute a fresh isolated run.
