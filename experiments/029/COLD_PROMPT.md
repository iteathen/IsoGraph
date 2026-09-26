# Experiment 029 — Cold Core 0.19 Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 029.

Use only the delimited packet. Do not browse, inspect hidden assertions, inspect prior Experiment 029 outputs, infer hidden scoring keys, or redesign the supplied specifications.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "C01",
      "answers": {},
      "reason": "nonempty semantic explanation",
      "authority_used": ["nonempty authority reference"]
    }
  ],
  "module_assessment": {
    "core_0_19": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_import_hidden_premises": true,
    "did_not_invent_probability": true,
    "preserved_scope_and_qu": true,
    "did_not_use_partial_renderings_as_exact": true
  }
}
```

Return C01-C26 exactly once and in order.

Every `reason` must be nonempty.
Every `authority_used` list must be nonempty.

The answer keys and enum alternatives below are the complete public serializer contract. Boolean examples show type only, not expected truth values.

C01:
```json
{"explicit_support_allowed":true,"explicitness_proves_truth":true,"source_limits_preserved":true}
```

C02:
```json
{"exact_implicit_support_allowed":true,"becomes_source_explicit":true,"support_recoverable":true}
```

C03:
```json
{"exact_implicit_support_allowed":true,"silent_conventional_premise_allowed":true}
```

C04:
```json
{"remains_conditional":true,"global_unconditional_allowed":true,"scope_lineage_preserved":true}
```

C05:
```json
{"unconditional_exact_allowed":true,"drop_uncertainty_or_condition":true,"authority_amplification_allowed":true}
```

C06:
```json
{"b_implicit_supported":true,"c_implicit_supported":true,"a_additional_implicit_support":true,"cycle_invalid_merely_for_cycle":true}
```

C07:
```json
{"cycle_manufactures_validity":true,"cycle_structure_representable":true,"separate_grounding_required":true}
```

C08:
```json
{"qu_dependency_propagates":true,"unconditional_exact_c":true,"choose_realization_to_derive":true}
```

C09:
```json
{"q1_valid_for_later_support":true,"z_exact_without_selecting_realization":true,"q0_q1_lineage_preserved":true}
```

C10:
```json
{"equal_probability_assignment_authorized":true,"bayesian_support_from_qu_alone":true,"qu_only_supplies_possibility":true}
```

C11:
```json
{"b_bayesian_implicit_supported":true,"b_support_may_feed_later_probability_model":true,"b_or_c_becomes_exact":true}
```

C12:
```json
{"treat_e1_e2_as_independent":true,"shared_lineage_load_bearing":true,"stronger_combined_support_requires_dependence_authority":true}
```

C13:
```json
{"bayesian_implicit_supported":true,"promote_to_exact":true,"probability_threshold_supplies_exact_truth":true}
```

C14:
```json
{"retain_explicit_and_implicit_support":true,"rewrite_support_history":true,"distinct_lineages_preserved":true}
```

C15:
```json
{"implicit_support_allowed":true,"comparison_target_as_validity_premise":true,"reason_to_search_is_evidence":true}
```

C16:
```json
{"d_exact_implicit_supported":true,"lineage_closed_through_a_b_c":true,"depth_weakens_exact_support":true}
```

C17:
```json
{"operational_stop_allowed":true,"no_change_proves_universal_closure":true,"universal_completeness_requires_separate_coverage":true}
```

C18:
```json
{"conclude_non_derivable":true,"failed_search_may_be_recorded":true,"negative_claim_requires_completeness_certificate":true}
```

C19:
```json
{"exact_rendering":true,"partial_exploratory_artifact_allowed":true,"source_faithful_downstream_use_allowed":true}
```

C20:
```json
{"exact_native_rendering":true,"sidecar_may_supply_missing_semantics":true}
```

C21:
```json
{"exact_rendering":true,"familiar_recognition_supplies_operator_semantics":true}
```

C22:
```json
{"bidirectional_exact_rendering":true,"one_way_claim_may_be_limited":true,"empirical_agreement_replaces_exact_bridge":true}
```

C23:
```json
{"single_choice_exact_for_ambiguous_source":true,"both_interpretations_preserved":true,"familiar_choice_is_semantic_loss":true}
```

C24:
```json
{"exact_rendering":true,"precision_or_condition_may_be_strengthened_away":true}
```

C25:
```json
{"mutation_control_passes":true,"familiar_form_repair_allowed":true}
```

C26:
```json
{"partial_skeleton_source_faithful_dp_evidence":true,"partial_skeleton_explicit_support_allowed":true,"required_before_downstream_use":"NOTHING|AUTHOR_REVIEW|EXACT_RENDERING_QUALIFICATION"}
```

Apply the supplied Core semantics exactly.

Keep these distinctions explicit:

- assertion body != assertion support;
- explicit support != proof or stronger truth;
- implicit support != guess, analogy, or discovery lead;
- explicit/implicit origin != exact/Bayesian support mode;
- high probability != exact truth;
- QU possibility structure != probability distribution;
- a support cycle may be represented but cannot self-ground without qualified recursive/fixed-point authority;
- scope, conditions, authority, QU, and provenance propagate unless validly refined or discharged;
- reason to search != reason to believe;
- failure to discover != proof of non-derivability;
- operational fixed point != universal semantic completeness;
- formula skeleton != exact formula rendering;
- sidecar gloss != semantic completion;
- familiar mathematics != pinned semantic authority;
- one-way implication != bidirectional equivalence;
- source ambiguity/unknown != permission to choose one realization;
- approximate/conditional != exact/unconditional;
- adversarial mutations must be reconstructed as mutated, not repaired toward familiarity;
- incomplete renderings cannot supply source-faithful downstream proof/discovery/assertion support.

A module assessment of `SUPPORTED` requires that all twenty-six cases be handled without an unresolved qualification-bearing contradiction.
