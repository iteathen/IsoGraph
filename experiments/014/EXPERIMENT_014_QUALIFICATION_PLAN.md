# Experiment 014 — DP Mapping-Contract Qualification Plan

**Status:** development candidate until frozen.

Experiment 012 remains formally `DOES_NOT_QUALIFY` solely because its hidden scorer required array-valued singleton mapping endpoints that the public prompt never specified. Its semantic report recovered every required mapping, residual, and rejected overclaim.

Experiment 014 uses a new resource-exhaustion topology and publishes the exact mapping wire shape before freeze: `left` and `right` are always arrays.

Qualification burden: recover the six-role topology, perform the A02 <-> B02+B03 one-to-subgraph alignment, preserve scalar-budget versus token-pool residuals, and explicitly reject full-proof isomorphism, natural identity, same intermediate objects, and same algorithm.

Cold packet excludes prior experiment output and all hidden material. Default budget is one cold Gemini call plus deterministic scoring.
