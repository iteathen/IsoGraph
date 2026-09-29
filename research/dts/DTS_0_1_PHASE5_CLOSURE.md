# DTS 0.1 Phase 5 — TI Development Closure

**Status:** COMPLETE as development evidence; not qualification

Phase 5 required:
- positive TI;
- same-endpoints / non-TI behavior;
- alternate-decomposition behavior;
- QU-bearing correspondence;
- unresolved-load-bearing incompleteness;
- seductive false analogy rejection.

## Evidence chain

### Experiment 021 — blind discovery

First successful semantic run recovered four high-value controls without being given the expected pair map:

- T01/T03 C_CONCEPT -> TI;
- T04A/T04B C_WORKER_EFFECT -> TI with D/O residuals;
- T04A/T04B C_PROCESS -> REJECTED;
- T01/T06 C_CLASSIFICATION -> INCOMPLETE with QU dependencies.

Its immutable scorer result is DOES_NOT_PASS because four additional hidden-required pair/view claims were not publicly required.

### Experiment 024 — corrected public comparison contract

All eight comparison requests were publicly enumerated, while expected dispositions remained hidden.

The report produced all eight claims:
- R01 TI;
- R02 TI;
- R03 REJECTED;
- R04 TI;
- R05 REJECTED;
- R06 REJECTED;
- R07 INCOMPLETE;
- R08 INCOMPLETE.

R05/R06 were scorer false negatives only because the hidden scorer imposed an undisclosed minimum breaker-string length despite correct semantic dispositions and explicit reasons.

R07 was the one real semantic disagreement.

### Experiment 025 — no-preference R07 audit

A deterministic ownership witness showed all four T06 QUs are owned by C_CONCEPT-projected regions.

A cold audit with no preferred hidden answer returned:

- PROJECTION_JUSTIFIED;
- SUPPORTS_TI;
- no admissible realization changes the load-bearing projection.

Thus R07 is resolved as scoped TI with QU residuals preserved.

## Phase 5 conclusion

The intended controls are now understood:

```text
T01/T02 C_CLASSIFICATION     -> TI
T01/T03 C_CONCEPT            -> TI
T01/T03 C_CLASSIFICATION     -> REJECTED
T04A/T04B C_WORKER_EFFECT    -> TI + D/O residuals
T04A/T04B C_PROCESS          -> REJECTED
T04A/T05 C_WORKER_EFFECT     -> REJECTED
T01/T06 C_CONCEPT            -> TI + QU residuals
T01/T06 C_CLASSIFICATION     -> INCOMPLETE
```

No Experiment 021/024 historical scorer disposition is rewritten.

This closes the DTS 0.1 **development** TI burden. DTS qualification remains separate.
