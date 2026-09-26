# Experiment 029 — Cold Core 0.19 Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 029.

Use only the delimited packet. Do not browse, inspect hidden assertions, inspect prior Experiment 029 outputs, infer hidden scoring keys, or redesign the supplied specification.

Return exactly one JSON object and no Markdown fencing:

```json
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
    "core_0_19": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_invent_hidden_premise": true,
    "did_not_invent_probability": true,
    "preserved_qu_when_load_bearing": true,
    "did_not_upgrade_explicit_to_truth": true,
    "did_not_upgrade_bayesian_to_exact": true,
    "did_not_treat_skeleton_as_rendering": true
  }
}
```

Return D01-D24 exactly once and in order.

Every `reason` must be nonempty.
Every `authority_used` list must be nonempty.

The answer keys below are the complete public serializer contract. Boolean examples show type only, not expected truth values.

D01:
```json
{"explicit_support":true,"exact_truth_from_explicit":true,"provenance_scope_retained":true}
```

D02:
```json
{"implicit_exact_admissible":true,"source_explicit":true,"premises_authority_witness_recoverable":true}
```

D03:
```json
{"implicit_exact_admissible":true,"conventional_familiarity_is_authority":true,"missing_premise_blocks":true}
```

D04:
```json
{"r_admitted_under_g":true,"r_global_unconditional":true,"guard_g_retained":true}
```

D05:
```json
{"q_supported_under_h":true,"q_global_exact_unconditional":true,"condition_may_be_dropped":true}
```

D06:
```json
{"b_exact_implicit":true,"c_exact_implicit":true,"a_additional_implicit_support":true,"cycle_invalid_merely_cyclic":true}
```

D07:
```json
{"cycle_manufactures_valid_support":true,"represented_cycle_is_valid_support":true,"separate_grounding_required":true}
```

D08:
```json
{"b_retains_u":true,"c_retains_u":true,"later_pass_may_drop_u":true}
```

D09:
```json
{"q1_is_refinement":true,"p_exact_implicit":true,"qu_condition_required_in_assertion_body":true,"provenance_retains_refinement_witness":true}
```

D10:
```json
{"uniform_prior_allowed":true,"bayesian_from_qu_alone":true,"qu_family_valid":true}
```

D11:
```json
{"b_bayesian_implicit":true,"b_may_feed_c":true,"c_bayesian_implicit":true,"exact_promotion":true}
```

D12:
```json
{"multiply_as_independent":true,"dependence_load_bearing":true,"separate_records_prove_independence":true}
```

D13:
```json
{"bayesian_support":true,"exact_support":true,"core_probability_threshold_promotes":true}
```

D14:
```json
{"both_support_classes_retained":true,"lineage_overwrite":true,"same_body_implies_same_support":true}
```

D15:
```json
{"dp_motivates_search":true,"dp_target_is_validity_premise":true,"t_exact_from_independent_derivation":true}
```

D16:
```json
{"d_admissible_pass3":true,"lineage_dependency_closed":true,"depth_weakens_exact":true}
```

D17:
```json
{"operational_stop_allowed":true,"universal_closure_claim":true,"completeness_requires_separate_evidence":true}
```

D18:
```json
{"not_found_report_allowed":true,"nonderivable_conclusion":true,"negative_claim_needs_completeness":true}
```

D19:
```json
{"exact_rendering":true,"partial_artifact_allowed":true,"sidecar_may_supply_missing_semantics":true}
```

D20:
```json
{"exact_rendering":true,"pretrained_recognition_is_authority":true,"semantics_must_be_represented_or_pinned":true}
```

D21:
```json
{"bidirectional_exact":true,"one_way_claim_allowed":true,"empirical_agreement_supplies_inverse":true}
```

D22:
```json
{"exact_rendering":true,"preserve_alternatives_qu":true,"convenient_selection_allowed":true}
```

D23:
```json
{"exact_rendering":true,"precision_modality_preserved":true}
```

D24:
```json
{"exact_rendering_pass":true,"partial_credit_allows_exact":true,"downstream_source_faithful_use":true,"silent_repair_allowed":true}
```

Apply Core 0.19 exactly.

Keep these distinctions explicit:

- assertion body != assertion support;
- explicit != proven/exact;
- implicit != guess;
- explicit/implicit origin != exact/Bayesian strength;
- QU possibility structure != probability distribution;
- conditional support != global support;
- grounded cycle != ungrounded self-support;
- search target != validity premise;
- failure to find != proof of non-derivability;
- operational fixed point != universal semantic closure;
- formula skeleton != exact source rendering;
- sidecar explanation != permission to omit load-bearing native semantics;
- familiar mathematics != pinned semantic authority;
- one-way or approximate transformation != bidirectional exact witness;
- unknown/ambiguous source meaning != permission to choose a convenient realization;
- approximate/conditional/existential != exact/unconditional/universal;
- failed reconstruction gate != permission for downstream source-faithful DP or implicit-support use.

A module assessment of `SUPPORTED` requires that all twenty-four cases be handled without an unresolved qualification-bearing contradiction.
