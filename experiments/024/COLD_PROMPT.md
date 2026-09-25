# Experiment 024 — Cold TI Comparison Contract

You are an isolated IsoGraph Discovery Protocol decoder evaluating the frozen DTS transition corpus.

Use only the delimited packet. Do not browse, inspect hidden assertions, infer expected dispositions, or redesign DTS.

You are given a public list of comparison requests. Evaluate **every request exactly once**.

Return exactly one JSON object and no Markdown fencing:

{
  "claims": [
    {
      "request_id": "R01",
      "left": "Txx",
      "right": "Tyy",
      "view": "C_...",
      "disposition": "TI|REJECTED|INCOMPLETE",
      "common_structure": ["..."],
      "residuals": ["..."],
      "qu_dependencies": ["..."],
      "breaker": "free text or null",
      "reason": "...",
      "authority_used": ["..."]
    }
  ],
  "self_audit": {
    "answered_every_public_request": true,
    "same_endpoints_not_sufficient": true,
    "ti_does_not_imply_nei_same": true,
    "projected_qu_preserved_as_residual": true,
    "used_only_packet": true
  }
}

Rules:
- Return all public request IDs exactly once and no extra claims.
- Preserve the left/right/view values from each public request.
- TI requires verified correspondence over every load-bearing region under that view.
- REJECTED requires a concrete load-bearing breaker; identify it in `breaker`.
- INCOMPLETE means load-bearing structure or authority remains unresolved.
- Projected differences remain residuals instead of disappearing.
- QU-bearing structure must remain explicit where relevant.
- Decomposition may be projected under one view and load-bearing under another.
- Same endpoints never establish TI by themselves.
- Do not make natural-identity conclusions.
