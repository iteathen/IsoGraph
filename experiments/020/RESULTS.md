# Experiment 020 — Results

**Status:** development PASS; not qualification  
**Branch head tested:** `891ee9e9fcd7056ba835135ec982571e3687cd3c`  
**Repository Verify run:** `36180968439`

## Result

```text
DTS base deterministic controls: PASS
Experiment 020 reconstruction:     PASS
source-anchored cases:             3 / 3
```

The reconstruction checker establishes, for each declared projection:

```text
source state
+ represented DTS anatomy operations
= declared target state
```

and verifies the preserved/introduced/removed/changed role classification against the endpoints.

Cases:

- S01 — sequential lexical rejection classification;
- S02 — IsoMax worker branch-publication projection;
- N01 — IsoMax worker preparation negative control.

## Interpretation

The current DTS role factorization survived first contact with real source-anchored transition data for these projections.

This does **not** establish:

- DTS qualification;
- TI between any pair;
- canonical decomposition;
- complete modeling of every runtime side effect;
- DPO semantics;
- invariant/signature semantics.

Omitted runtime fields in S02 remain outside the declared projection; they are not asserted absent.

The next development burden is the first TI campaign.
