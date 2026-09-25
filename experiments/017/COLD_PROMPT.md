# Experiment 017 — Cold Core 0.18 Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 017.

Use only the delimited packet. Do not browse, inspect prior experiment outputs, infer hidden scoring keys, or redesign the specification.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "C01",
      "answers": {},
      "reason": "step-grounded explanation",
      "authority_used": ["..."]
    }
  ],
  "module_assessment": {
    "core_0_18": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

Return C01-C12 exactly once and in order.

The answer keys and allowed value shapes below are public serializer requirements. Example booleans and enum alternatives specify allowed output shapes, not expected truth values.

## C01
```json
{"same_semantic_quantity":true,"direct_value_conflict":true,"next_step":"ALIGN_QUANTITY_FIRST|COMPARE_VALUES|REPAIR"}
```

## C02
```json
{"same_semantic_quantity":true,"discrepancy_remains":true,"next_step":"INVESTIGATE_DISCREPANCY|NO_CONFLICT"}
```

## C03
```json
{"same_predicate":true,"direct_boolean_conflict":true,"preserve_both_observations":true}
```

## C04
```json
{"qualification_disposition":"DECODER_ERROR|NON_DEFECT|INCOMPLETE","repair_allowed":true,"discovery_lead":"OPEN|CLOSED|NONE","erase_discovery_evidence":true}
```

## C05
```json
{"action":"SPLIT_COMPARISON_MODEL|CHOOSE_ONE_VALUE|AVERAGE_VALUES","hidden_distinction_preserved":true}
```

## C06
```json
{"scoped_equivalence_valid":true,"global_identity_follows":true,"residual_difference_preserved":true}
```

## C07
```json
{"projection_allowed":true,"stronger_claim_status":"MAY_PROCEED|INCOMPLETE_UNQUALIFIED","unknown_preserved":true}
```

## C08
```json
{"suppress_invalidation":true,"reassess_dependents":true,"historical_records_preserved":true,"propagation_itself_is_defect":true}
```

## C09
```json
{"fast_repair_allowed":true,"exhaustive_structural_search_required":true}
```

## C10
```json
{"may_stop_when_disposition_supported":true,"exhaustive_explanation_search_required":true}
```

## C11
```json
{"close_structural_lead":true,"final_classification":"IMPLEMENTATION_ERROR|HIDDEN_ISOMORPH|INCOMPLETE","manufacture_isomorph":true}
```

## C12
```json
{"same_semantic_quantity":true,"equal_value_proves_alignment":true}
```

Apply the supplied Core specifications exactly. Treat discrepancy as observation before judgment, align semantic quantity/scope before comparing values, preserve load-bearing unknowns and residuals, and keep scoped equivalence separate from global identity.
