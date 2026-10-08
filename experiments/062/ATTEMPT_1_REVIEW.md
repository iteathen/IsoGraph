# Experiment 062 Attempt 1 Review

**Run:** 37437746200  
**Frozen source SHA:** `a10f8859228fb9aac2b2a142799152ec18648626`  
**Disposition:** OUTPUT-CONTRACT FAILURE / NO G1 COMPLETENESS DISPOSITION

The W extractor returned all 84 required census IDs and terminated normally with provider finish reason `STOP`.

Deterministic validation rejected exactly two span fields:

1. `W-SSC-022-O01`: the extractor emitted argument span `positive imaginary-time sectors`, but the frozen body contains the compact literal `positive/negative imaginary-time sectors`. The emitted argument string is not an exact contiguous source substring.
2. `W-SSC-146-O01`: the extractor compressed `rewrites the Euclidean Yang-Mills action ... using only the self-dual curvature component` while omitting the intervening frozen clause `, up to the topological integral of Tr(F wedge F),`. The emitted `source_span` therefore was not a contiguous source substring.

No L extraction or semantic audit ran after the deterministic W gate failed.

This is an output-contract failure, not evidence that the semantic occurrence target is impossible or that any primitive candidate qualifies. The attempt remains immutable evidence.

A successor may clarify only the already-public exact-span serialization requirement and rerun extraction. The corpus, graph-first method, semantic target, forbidden category rules, and authority boundary remain unchanged.
