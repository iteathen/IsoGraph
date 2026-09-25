# Experiment 018 — Cold DP 0.6 Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 018.

Use only the delimited packet. Do not browse, inspect prior outputs, infer hidden scoring keys, or redesign the specifications.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {"case_id":"D01","answers":{},"reason":"step-grounded explanation","authority_used":["..."]}
  ],
  "module_assessment":{"dp_0_6":"SUPPORTED|NOT_SUPPORTED|INCOMPLETE"},
  "self_audit":{"used_only_packet":true,"notes":"..."}
}
```

Return D01-D14 exactly once and in order.

The answer keys and enums below are public serializer requirements, not expected truth values.

D01:
```json
{"direct_value_conflict":true,"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","hidden_distinction_candidate":true}
```

D02:
```json
{"qualification_disposition":"DECODER_ERROR|NON_DEFECT|INCOMPLETE","discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","repair_closes_discovery":true}
```

D03:
```json
{"direct_boolean_contradiction":true,"discovery_question_remains":true}
```

D04:
```json
{"action":"SPLIT_SEMANTIC_QUANTITIES|CHOOSE_ONE_LABEL|NORMALIZE_TO_ONE_COUNT","hidden_distinction_preserved":true}
```

D05:
```json
{"scoped_equivalence_allowed":true,"global_identity_conclusion_allowed":true,"residual_preserved":true}
```

D06:
```json
{"collapse_allowed":true,"qu_must_remain_load_bearing":true,"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED"}
```

D07:
```json
{"suppress_propagation":true,"reassess_dependents":true,"dependency_cone_is_evidence":true}
```

D08:
```json
{"qualification_may_complete":true,"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","qualification_closes_discovery":true}
```

D09:
```json
{"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","final_classification":"IMPLEMENTATION_ERROR|HIDDEN_EQUIVALENCE|INCOMPLETE","manufacture_isomorph":true}
```

D10:
```json
{"exhaustive_search_required":true,"repair_allowed_after_owner_established":true}
```

D11:
```json
{"dp_may_conclude_same":true,"identity_authority":"DP|NEI_0_4|CORE","structural_correspondence_is_identity_proof":true}
```

D12:
```json
{"nei_required":true,"structural_claim_may_proceed_without_nei":true}
```

D13:
```json
{"preserve_qu_structure":true,"generic_unknown_substitute_allowed":true}
```

D14:
```json
{"artificial_qu_required":true,"determinate_claim_may_proceed_without_qu_instance":true}
```

Apply the supplied specifications exactly. Keep qualification disposition distinct from discovery disposition. Discovery priority is never semantic proof authority. Use current NEI 0.4 only when natural/domain identity is actually claimed, and preserve QU when unresolved structure is load-bearing.
