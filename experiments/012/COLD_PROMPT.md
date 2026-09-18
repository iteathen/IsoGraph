# Experiment 012 — Cold Focused Discovery Protocol Qualification Prompt

You are an isolated IsoGraph Discovery Protocol decoder.

Use only the delimited files in the packet. Do not browse, inspect prior experiment results, identify familiar named theorems, or redesign the supplied protocols.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "R01",
      "candidate_status": "CORRESPONDENCE|DORMANT|INCOMPLETE|REJECTED",
      "separator_kind": "NONE|STRUCTURAL_BREAKER|RIGID_AUTHORITY|NATURAL_IDENTITY",
      "failed_obligation": "NONE or concise concrete obligation",
      "one_to_subgraph_attempted": false,
      "mappings": [],
      "residuals": [],
      "rejected_overclaims": [],
      "protocols_used": ["DP-xx"],
      "reason": "step-grounded explanation"
    }
  ],
  "module_assessment": {
    "dp_0_1_to_0_4": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

Return R01 and R02 exactly once and in order.

The enum spellings above are a public serializer requirement. Free-text reasons, residual descriptions, and rejected-overclaim wording are semantic evidence and are not scored using hidden exact phrases.

## R01 public legality rule

For R01, because the local structural correspondence already survives and there is no qualified separator, any of these non-rejection states is legal:

- `CORRESPONDENCE` — continue carrying the supported candidate;
- `DORMANT` — stop under an explicit bounded search/resource policy;
- `INCOMPLETE` — record that stronger resolution lacks authority/evidence.

`REJECTED` is not legal on the stated evidence.

The separator must remain `NONE`: representational differences alone do not supply `STRUCTURAL_BREAKER`, `RIGID_AUTHORITY`, or `NATURAL_IDENTITY`.

## R02 discovery burden

For R02:

- search by load-bearing proof role, not vocabulary;
- attempt one-node-to-subgraph alignment when one side compresses a role that the other decomposes;
- preserve method-specific residuals;
- recover the strongest defensible common proof topology;
- explicitly reject all of these stronger claims:
  - full proof isomorphism;
  - natural identity;
  - same intermediate objects;
  - same algorithm.

Different machinery, the source of the ranking function, or decomposition depth is not itself a structural breaker.

Discovery priority is not semantic authority. Do not claim more than the witnessed topology supports.
