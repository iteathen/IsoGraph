# Experiment 026 — Cold DTS 0.1 Qualification Prompt

You are an isolated semantic decoder qualifying the supplied DTS 0.1 candidate.

Use only the delimited packet. Do not browse, inspect hidden assertions, use prior DTS development experiments, or redesign the candidate.

Return exactly one JSON object and no Markdown fencing:

{
  "cases": [
    {
      "case_id": "Q01",
      "answers": {},
      "reason": "nonempty semantic explanation",
      "authority_used": ["nonempty authority reference"]
    }
  ],
  "module_assessment": {
    "dts_0_1": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_use_prior_dts_experiments": true,
    "did_not_infer_nei_same_from_ti": true,
    "did_not_treat_missing_qu_as_complete": true
  }
}

Return Q01-Q20 exactly once and in order.

Every `reason` must be nonempty.
Every `authority_used` list must be nonempty.

The answer keys and enum alternatives below are the complete public serializer contract. Boolean examples show type only, not expected truth values.

Q01:
```json
{"ordinary_core_valid_without_dts":true,"dts_required_for_ordinary_state":true}
```

Q02:
```json
{"source_projection":"G0|G1|UNKNOWN","target_projection":"G0|G1|UNKNOWN","projections_recoverable":true}
```

Q03:
```json
{"ordinary_isograph_anatomy_valid":true,"opaque_parallel_substrate_valid":true}
```

Q04:
```json
{"reuse_existing_boundary":true,"new_dts_boundary_required":true}
```

Q05:
```json
{"artificial_qu_required":true,"claim_may_be_complete":true}
```

Q06:
```json
{"qu_required":true,"private_dts_unknown_allowed":true,"claim_status_without_qu":"VALID|INCOMPLETE_UNQUALIFIED|REJECTED"}
```

Q07:
```json
{"omission_as_empty_allowed":true,"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED"}
```

Q08:
```json
{"same_endpoints_establish_ti":true,"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED"}
```

Q09:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","projected_decomposition_preserved_as_residual":true}
```

Q10:
```json
{"decomposition_difference_blocks_ti":true,"decomposition_residual_preserved":true}
```

Q11:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","decomposition_or_order_breaker":true}
```

Q12:
```json
{"structural_correspondence_may_hold":true,"same_actual_realization_follows":true}
```

Q13:
```json
{"nei_same_follows":true,"identity_claim_requires_nei_authority":true}
```

Q14:
```json
{"profile_result_determines_base_dts":true,"base_and_profile_qualification_separate":true}
```

Q15:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","surface_similarity_sufficient":true}
```

Q16:
```json
{"qualified_ti_admissible":true,"evidence_class":"VALID|CIRCULAR_EVIDENCE|INCOMPLETE"}
```

Q17:
```json
{"absence_of_qu_proves_complete":true,"completeness_status":"COMPLETE|INCOMPLETE_UNQUALIFIED|REJECTED"}
```

Q18:
```json
{"qu_projection_allowed":true,"scoped_ti_may_proceed":true,"qu_residual_preserved":true}
```

Q19:
```json
{"transition_valid_without_known_mechanism":true,"known_mechanism_required":true}
```

Q20:
```json
{"role_factorization_is_invariant_proof":true,"matching_role_counts_prove_ti":true}
```

Apply the supplied DTS and qualified dependency semantics exactly.

A module assessment of SUPPORTED requires that the candidate handles all twenty cases without an unresolved qualification-bearing contradiction.
