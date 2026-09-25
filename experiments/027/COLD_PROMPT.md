# Experiment 027 — Cold DTS-Inclusive Integrated Stack Prompt

You are an isolated semantic decoder testing the supplied qualified IsoGraph modules compositionally.

Use only the delimited packet. Do not browse, inspect hidden assertions, use outputs from Experiments 019 or 026, infer hidden scoring keys, or redesign the qualified modules.

Return exactly one JSON object and no Markdown fencing:

{
  "cases": [
    {
      "case_id": "D01",
      "answers": {},
      "reason": "nonempty semantic explanation",
      "authority_used": ["nonempty authority reference"]
    }
  ],
  "module_assessment": {
    "integrated_with_dts": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_use_exp019_outputs": true,
    "did_not_use_exp026_outputs": true,
    "did_not_infer_nei_same_from_ti": true,
    "did_not_treat_unknown_as_irrelevant": true
  }
}

Return D01-D18 exactly once and in order.

Every `reason` must be nonempty.
Every `authority_used` list must be nonempty.

The answer keys and enum alternatives below are the complete public serializer contract. Boolean examples show type only, not expected truth values.

D01:
```json
{"transition_observation_valid":true,"artificial_qu_required":true,"known_mechanism_required":true}
```

D02:
```json
{"complete_transition_claim":true,"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","dp_may_project_unresolved":true}
```

D03:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","same_endpoints_sufficient":true,"partial_common_core_may_exist":true}
```

D04:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","mechanism_identity_follows":true,"mechanism_residual_preserved":true}
```

D05:
```json
{"structural_correspondence_may_hold":true,"same_actual_realization_follows":true,"nei_same_follows":true}
```

D06:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","canonical_decomposition_follows":true,"decomposition_residual_preserved":true}
```

D07:
```json
{"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","ordering_breaker_load_bearing":true,"same_carrier_identity_rescues_ti":true}
```

D08:
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE","ti_follows_from_nei_same":true,"transition_breaker_still_controls":true}
```

D09:
```json
{"dp_structural_lead_valid":true,"ti_established":true,"discovery_supplies_proof":true}
```

D10:
```json
{"qualified_ti_admissible":true,"evidence_class":"VALID|CIRCULAR_EVIDENCE|INCOMPLETE","dp_priority_repairs_circularity":true}
```

D11:
```json
{"absence_of_qu_proves_complete":true,"completeness_status":"COMPLETE|INCOMPLETE_UNQUALIFIED|REJECTED","partial_observation_may_exist":true}
```

D12:
```json
{"qualification_must_fail":true,"same_semantic_quantity":true,"discovery_lead_may_remain":true}
```

D13:
```json
{"later_ti_may_be_established":true,"rewrite_historical_status":true,"refinement_narrows_realizations":true}
```

D14:
```json
{"nei_distinct_follows_from_profile_labels":true,"base_dts_validity_affected":true,"profile_labels_establish_ti":true}
```

D15:
```json
{"full_ti":true,"residual_preserved":true,"dp_partial_common_core_valid":true}
```

D16:
```json
{"base_representation_valid":true,"reuse_ordinary_boundary_required":true,"second_boundary_semantics_allowed":true}
```

D17:
```json
{"role_counts_prove_ti":true,"tss_invariant_proved":true,"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED"}
```

D18:
```json
{"scoped_ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","projected_qu_residual_preserved":true,"broader_nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE"}
```

Apply the supplied qualified module semantics independently and compositionally.

Do not turn:
- endpoint equality into TI;
- TI or structural discovery into natural identity;
- natural identity into TI;
- unknown into irrelevance;
- missing QU into proof of completeness;
- profile/mechanism labels into DTS base truth or natural identity;
- role-factorization/count similarity into invariant proof;
- discovery priority into semantic proof authority;
- later refinement into retroactive rewriting of historical evidence.

A module assessment of `SUPPORTED` requires that the expanded composition handles all eighteen cases without an unresolved qualification-bearing contradiction.
