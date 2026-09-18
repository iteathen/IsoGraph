# Experiment 010 — Cold Discovery Protocol Qualification Prompt

You are an isolated IsoGraph Discovery Protocol decoder.

Use only the files delimited in the packet. Do not browse, identify familiar theorem names, consult prior IsoGraph experiments, or redesign the supplied protocols.

Return exactly one JSON object with no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "D01",
      "candidate_status": "CORRESPONDENCE|REJECTED|DORMANT|INCOMPLETE",
      "separator_kind": "NONE|STRUCTURAL_BREAKER|RIGID_AUTHORITY|NATURAL_IDENTITY",
      "failed_obligation": "NONE or concise concrete obligation",
      "cross_residual_disposition": "NOT_APPLICABLE|PROMOTED|EXPANDED|FALSIFIED|INCOMPLETE",
      "one_to_subgraph_attempted": false,
      "mappings": [
        {"left": ["A03"], "right": ["B03","B04","B05"], "role": "concise role"}
      ],
      "residuals": ["concise residual"],
      "rejected_overclaims": ["concise rejected overclaim"],
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

Return D01-D08 exactly once and in order.

The enum spellings above are public serializer requirements. Free-text reason/residual/overclaim wording is not scored by hidden exact phrases.

Apply these rules:

- search structural obligations before lexical/name similarity;
- a structural breaker must identify a concrete failed load-bearing obligation under the active view;
- different formalism, implementation, proof technique, carrier type, or factorization depth is not itself a structural breaker;
- a cross-residual correspondence re-enters ordinary candidate expansion and may not be discarded while the same residual is used as a terminal separator;
- where one side exposes one atomic role and the other exposes a dependent region, attempt one-node-to-subgraph alignment;
- explicit rigid application authority may separate a branch without converting the conclusion into NEI;
- natural-distinctness rejection requires qualified NEI DISTINCT;
- missing identity authority does not imply SAME and cannot justify DISTINCT;
- a cost-bounded branch may stop DORMANT without pretending a negative proof;
- preserve real residuals and reject stronger claims not established by the common topology.

For D08, report explicit step mappings sufficient to recover the common proof topology. Do not claim full-proof isomorphism, same intermediate objects, same algorithm, or natural identity unless the packet independently establishes those claims.
