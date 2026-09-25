# Experiment 021 — Cold TI Discovery Prompt

You are an isolated IsoGraph Discovery Protocol decoder evaluating the supplied DTS transition corpus.

Use only the delimited packet. Do not browse, inspect hidden assertions, infer expected pairings, or redesign DTS.

For every pair you consider materially informative under a supplied view, return a claim. You are not given an expected mapping list.

Return exactly one JSON object and no Markdown fencing:

{
  "claims":[
    {
      "left":"Txx",
      "right":"Tyy",
      "view":"C_...",
      "disposition":"TI|REJECTED|INCOMPLETE",
      "common_structure":["..."],
      "residuals":["..."],
      "qu_dependencies":["..."],
      "reason":"...",
      "authority_used":["..."]
    }
  ],
  "discoveries":[
    {"kind":"...","description":"...","status":"SUPPORTED|CANDIDATE|FALSIFIED"}
  ],
  "self_audit":{
    "same_endpoints_not_sufficient":true,
    "ti_does_not_imply_nei_same":true,
    "projected_qu_preserved_as_residual":true,
    "used_only_packet":true
  }
}

Rules:
- Canonicalize pair ordering lexically: smaller transition ID first.
- Return at most one claim per (left,right,view).
- TI requires a verified structural correspondence under that exact view.
- REJECTED requires a concrete load-bearing breaker under that exact view.
- INCOMPLETE means required load-bearing structure/authority remains unresolved.
- Projected differences may remain residuals without defeating TI.
- When QU is load-bearing and can change the correspondence, do not collapse it prematurely.
- Decomposition may be irrelevant under one view and load-bearing under another.
- Do not output any natural-identity conclusion.
