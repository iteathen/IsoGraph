# Experiment 012 — Frozen Qualification Review

**Frozen qualification SHA:** `db63a0f6d9ba3c34d71a567ab1b0fb3be53ea737`  
**Workflow run:** `35376004002`  
**Decoder:** `gemini-3.5-flash`  
**HTTP:** 200, one attempt  
**Packet SHA-256:** `cda97f88c6061ce0aa65deba8ae4af3c0074766df818134782ca41a215734f81`  
**Report SHA-256:** `1d0939644d7f48033bfd31f28b7531f679157324dde3a698cb7213929e942990`

## Frozen formal disposition

`DOES_NOT_QUALIFY`

The disposition remains immutable.

## R01

R01 passed. The decoder retained `CORRESPONDENCE`, used separator `NONE`, and explicitly rejected treating SI spelling, source-file, or factorization-depth differences as structural/identity separators.

This discharges the semantic obligation that Experiment 010 D06 had exercised despite its overly restrictive hidden oracle.

## R02 semantic result

The decoder:

- returned `CORRESPONDENCE` with separator `NONE`;
- attempted one-node-to-subgraph alignment;
- recovered the complete intended topology;
- mapped A02 to B02+B04 for the finite ranking/bound role;
- preserved Beta's layer derivation as a method-specific residual;
- explicitly rejected full proof isomorphism, natural identity, same intermediate objects, and same algorithm;
- assessed cumulative DP 0.1-0.4 as `SUPPORTED`.

## Frozen scorer failure

The frozen scorer represented expected mapping endpoints as arrays and silently required singleton endpoints such as A01/B01 to also be arrays.

The public prompt did not publish an element schema for `mappings`; it only declared `mappings: []`. The decoder serialized singleton endpoints as strings and the one-to-subgraph endpoint as an array:

- `A01` -> `B01`
- `A02` -> [`B02`,`B04`]
- `A03` -> `B03`
- `A04` -> `B05`
- `A05` -> `B06`
- `A06` -> `B07`

These are semantically the exact required mappings. The formal failure is therefore an undisclosed serializer-shape requirement, not a discovery/protocol failure.

## Continuation

Experiment 012 remains formally failed. A new holdout must publish the exact mapping wire schema before freeze so semantic evidence and serializer conformance cannot be conflated. The next holdout need only test a fresh deep mapping under that corrected public contract; R01 itself is already semantically discharged.
