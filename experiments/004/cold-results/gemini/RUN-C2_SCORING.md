# Experiment 004 — Gemini RUN-C2 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-C2-cold-v3` (`10485205542`)  
**Frozen report SHA-256:** `03e9bbd45bc8e72c2cd519836b40c9242d4062c05b1a244d97c46866bccd6db3`  
**Scorer:** `PHASE_C_NEGATIVE_INDEX_ASSERTIONS_004.json`

## Scorer comparison

All frozen scorer expectations are recovered:

- Q004-14/#1: `CERTIFIED_NON_ISOMORPHIC` with direct-member-count separator `1 != 2` — AGREE.
- Q004-14/#2: actual V0 relation is isomorphic, example witness `20→30, 21→31, 22→32` — AGREE.
- supplied `(^5403 #2 #0)` is interpreted as bounded/incomplete no-witness/no-certificate search — AGREE.
- permitted run-record statuses remain `NO_WITNESS_FOUND` / `UNKNOWN` / `RESOURCE_LIMIT`; `CERTIFIED_NON_ISOMORPHIC` is forbidden — AGREE.
- Q004-15 synthetic fingerprint is the raw stable head-label numeral; values are `5500` and `5501` — AGREE.
- under V0 labels are rigid, the mismatch is safe for this exact fixture, and the pair is non-isomorphic — AGREE.
- under VS with explicit `^5500↔^5501`, that raw-label fingerprint is not invariant, mismatch pruning is unsafe, mapped-signature isomorphism exists, and the expected local map `40→50, 41→51` is supplied — AGREE.

## Additional decoder defect

The frozen report also claims an *alternative* VS automorphism `40↔51, 41↔50`. That extra mapping is not valid for this fixture because ordered incidence is load-bearing: it would send `(^5500 40 41)` to `(^5501 51 50)`, while the target contains `(^5501 50 51)`. The correct map is the scorer-expected `40→50, 41→51`.

Discrepancy class: **decoder/search implementation error**. This is an extra unsupported witness, not a specification defect and not a failure of the expected map itself.

**Disposition:** PARTIAL — every hidden scorer assertion is matched, but the report adds one false alternative witness.
