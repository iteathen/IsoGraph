# W Core-0.21 Ledger 0.2 Structural Validation

**Status:** PASS FOR PARTIAL-CLOSURE STRUCTURE / STRICT CLOSURE EXPECTED FAIL  
**Date:** 2026-10-04  
**Ledger:** `CORE021_CLOSURE_LEDGER_0_2.json`

A structural validation equivalent to the repository Core-0.21 checker invariants was run against ledger revision 0.2.

## Passing gates

- frozen census membership and one disposition per census item;
- node/reference integrity;
- authoritative-node reachability;
- reconstruction references for the closed item;
- authority routing, including Core primitive ownership;
- schema metadata for W-SSC-027;
- canonical Source Semantic Census hash;
- canonical semantic-scope hash;
- canonical primitive-kernel hash;
- canonical governing-authority hash;
- canonical inference-profile hash;
- QU state = NONE.

## Expected failing gate

Strict full-track closure remains false because 126 frozen census items remain `INCOMPLETE_UNEXPANDED`.

This is the intended state. No IA fixed point, NEI, DTS, or DP claim is made.

## Current disposition count

```text
CLOSED_SCHEMA:          1
INCOMPLETE_UNEXPANDED: 126
TOTAL:                127
```

The first closed item is W-SSC-027.

Per `PRE_DP_GATE_0_1.json`, recursive implicit assertions remain mandatory after full primitive/schema closure and Core qualification and before NEI/DTS/DP.
