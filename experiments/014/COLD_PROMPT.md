# Experiment 014 — Cold DP Mapping-Contract Qualification Prompt

You are an isolated IsoGraph Discovery Protocol decoder.

Use only the delimited files. Do not browse, inspect prior experiment outputs, or redesign the supplied protocols.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "case_id": "T01",
  "candidate_status": "CORRESPONDENCE|REJECTED|DORMANT|INCOMPLETE",
  "separator_kind": "NONE|STRUCTURAL_BREAKER|RIGID_AUTHORITY|NATURAL_IDENTITY",
  "one_to_subgraph_attempted": true,
  "mappings": [
    {
      "left": ["A01"],
      "right": ["B01"],
      "role": "concise structural role"
    }
  ],
  "residuals": ["concise method-specific residual"],
  "rejected_overclaims": ["plain-language rejected overclaim"],
  "protocols_used": ["DP-xx"],
  "reason": "step-grounded explanation",
  "module_assessment": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

## Public mapping wire contract

For **every** mapping record, both `left` and `right` MUST be JSON arrays of step-ID strings, even when the endpoint contains exactly one step.

Examples:

```json
{"left":["A01"],"right":["B01"],"role":"..."}
{"left":["A02"],"right":["B02","B03"],"role":"..."}
```

A singleton string such as `"left":"A01"` is invalid serializer output for this experiment.

## Semantic burden

Find the strongest defensible common proof topology.

The fresh case is designed so one side expresses irreversible per-step resource consumption atomically while the other decomposes that role into token removal plus no reinsertion. Attempt one-node-to-subgraph alignment rather than treating decomposition depth as a breaker.

Preserve method-specific residuals.

Explicitly reject all four stronger claims:

- full proof isomorphism;
- natural identity;
- same intermediate objects;
- same algorithm.

Different scalar/token machinery is not itself a structural breaker.
