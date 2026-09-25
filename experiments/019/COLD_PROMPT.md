# Experiment 019 — Cold Integrated Current-Stack Prompt

Use only the delimited packet. Do not browse, inspect prior outputs, infer hidden scoring keys, or redesign the specifications.

Return exactly one JSON object, no Markdown fencing:

{
  "cases":[{"case_id":"I01","answers":{},"reason":"step-grounded explanation","authority_used":["..."]}],
  "module_assessment":{"integrated_current_stack":"SUPPORTED|NOT_SUPPORTED|INCOMPLETE"},
  "self_audit":{"used_only_packet":true,"notes":"..."}
}

Return I01-I14 exactly once and in order. Public booleans/enums below are serializer shapes, not expected values.

I01 {"same_qu_information_state":true,"nei_same_follows":true,"preserve_representation_distinction":true}
I02 {"single_scalar_allowed":true,"preserve_realization_conditioning":true,"invent_distribution_allowed":true}
I03 {"exact_nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE","finite_evidence_weight_causes_exact_status":true,"probabilistic_record_may_coexist":true}
I04 {"dp_may_answer_same":true,"identity_result":"SAME|DISTINCT|UNKNOWN|INCOMPLETE"}
I05 {"qualification_must_fail":true,"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","same_semantic_quantity":true}
I06 {"repair_allowed":true,"discovery_disposition":"OPEN_STRUCTURAL_LEAD|NO_STRUCTURAL_LEAD|STRUCTURE_ESTABLISHED|STRUCTURAL_LEAD_FALSIFIED","repair_closes_lead":true}
I07 {"scoped_equivalence_valid":true,"global_identity_follows":true,"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE"}
I08 {"full_global_isomorphism":true,"residual_r5_preserved":true,"partial_common_core_valid":true}
I09 {"naive_sum_allowed":true,"dependence_must_be_preserved":true}
I10 {"q2_nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE","rewrite_q1_history":true,"refinement_narrows_realizations":true}
I11 {"distinct_follows_from_class_labels":true}
I12 {"restriction_admissible":true,"circular_evidence":true}
I13 {"qualification_may_complete":true,"discovery_lead_must_close":true}
I14 {"close_structural_lead":true,"manufacture_equivalence":true,"final_classification":"IMPLEMENTATION_ERROR|HIDDEN_EQUIVALENCE|INCOMPLETE"}

Apply the current qualified module semantics independently and compositionally. Do not turn structural correspondence into natural identity, missing authority into semantic UNKNOWN, unknown into irrelevance, probabilistic evidence into exact truth, or qualification closure into discovery closure.
