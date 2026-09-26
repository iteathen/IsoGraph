# Experiment 031 — Cold Full-Stack Core 0.19 Prompt

You are an isolated semantic decoder qualifying the supplied current IsoGraph stack compositionally.

Use only the delimited packet. Do not browse, inspect hidden assertions/scorer code, use prior Experiment 027–030 outputs, infer hidden scoring keys, or redesign the qualified modules.

Return exactly one JSON object and no Markdown fencing:

{
  "cases": [
    {
      "case_id": "F01",
      "answers": {},
      "reason": "nontrivial semantic explanation",
      "authority_used": ["nonempty authority reference"]
    }
  ],
  "module_assessment": {
    "core_0_19_integration": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "qu_0_1_integration": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "nei_0_4_integration": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "dp_0_1_to_0_7_integration": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "dts_0_1_integration": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "full_stack_core_0_19": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_use_prior_experiment_outputs": true,
    "did_not_import_familiar_unrepresented_semantics": true,
    "did_not_treat_missing_qu_as_false_or_unknown": true,
    "did_not_infer_nei_from_structural_correspondence": true,
    "did_not_use_discovery_priority_as_proof": true,
    "did_not_rewrite_historical_evidence": true
  }
}

Return F01-F32 exactly once and in order. Keep each reason to one concise sentence of at most 20 words, with at least 12 non-whitespace characters. Use one or two compact authority references per case; every authority_used list must be nonempty.

The following keys and enum alternatives are the complete public serializer contract. Boolean examples indicate type only, not expected truth values.

F01 {"direct_conflict":true,"preserve_both_explicit_support":true,"repair_required":true}
F02 {"exact_implicit_support":true,"provenance_required":true,"becomes_source_explicit":true}
F03 {"implicit_support_admissible":true,"familiar_knowledge_can_fill_gap":true,"discovery_hypothesis_may_remain":true}
F04 {"both_support_paths_retained":true,"truth_amplified_by_count":true,"provenance_paths_distinct":true}
F05 {"b_supported":true,"c_supported":true,"cycle_invalidates_all":true}
F06 {"b_supported":true,"c_supported":true,"self_support_manufactures_validity":true}
F07 {"exact_support":true,"depth_weakens_exactness":true,"lineage_must_remain":true}
F08 {"procedure_may_stop":true,"universal_closure_proved":true,"undiscovered_derivation_impossible":true}
F09 {"exact_implicit_support":true,"qu_must_be_erased":true,"qu_provenance_required":true}
F10 {"exact_support":true,"qu_claim_status":"NECESSARY|POSSIBLE|UNRESOLVED|IMPOSSIBLE|INCOMPLETE","target_may_restrict_qu":true}
F11 {"exact_support_at_q2":true,"rewrite_q1_history":true,"refinement_valid":true}
F12 {"assertion_qualified":true,"completeness_status":"COMPLETE|INCOMPLETE_UNQUALIFIED|REJECTED","missing_unknown_counts_false":true}
F13 {"probabilistic_support_admissible":true,"exact_support":true,"threshold_yields_exact":true}
F14 {"treat_as_two_independent":true,"probabilistic_support_may_remain":true,"exact_nei_status_follows":true}
F15 {"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE","implicit_exact_support_can_contribute":true,"si_equality_required":true}
F16 {"ti_may_hold":true,"nei_same_follows":true,"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE"}
F17 {"nei_distinct":true,"label_evidence_sufficient":true,"base_structures_invalid":true}
F18 {"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE","semantic_unknown":true,"opaque_unknown_substitute":true}
F19 {"exact_rendering":true,"downstream_source_faithful_use_allowed":true,"sidecar_needed":true}
F20 {"exact_rendering":true,"sidecar_can_complete":true,"downstream_exact_use_allowed":true}
F21 {"exact_rendering":true,"familiarity_repairs":true,"transformation_witness_required":true}
F22 {"reconstruct_mutation":true,"repair_to_familiar":true,"exactness_requires_mutated_semantics":true}
F23 {"derived_view_valid":true,"primitive_descent_required":true,"discovery_priority_is_proof":true}
F24 {"recursion_follows":true,"termination_follows":true,"cycle_view_may_be_candidate":true}
F25 {"qu_required":true,"may_project_away":true,"discovery_lead_valid":true}
F26 {"transition_valid":true,"artificial_qu_required":true,"mechanism_required":true}
F27 {"invariant_exact_support":true,"transition_valid":true,"mechanism_annotation_required":true}
F28 {"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","same_endpoints_sufficient":true,"partial_common_core_may_remain":true}
F29 {"ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","mechanism_identity_follows":true,"mechanism_residual_preserved":true,"nei_same_follows":true}
F30 {"b_exact_rendering":true,"full_ti_qualified":true,"nei_same_follows":true,"dp_lead_may_remain":true}
F31 {"qu_restriction_admissible":true,"nei_same_qualified":true,"evidence_class":"VALID|CIRCULAR_EVIDENCE|INCOMPLETE"}
F32 {"q2_ti_status":"TI|REJECTED|INCOMPLETE_UNQUALIFIED|NOT_ESTABLISHED","implicit_ti_support":true,"rewrite_q1_history":true,"nei_same_follows":true}

A full-stack assessment of SUPPORTED requires that all 32 cases be handled without an unresolved qualification-bearing contradiction.

Do not convert one semantic layer into another merely to make the stack agree.
