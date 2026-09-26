# Experiment 028 — Cold DP 0.7 Derived-View Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 028.

Use only the delimited packet. Do not browse, inspect hidden assertions, inspect prior Experiment 028 outputs, infer hidden scoring keys, or redesign the supplied specifications.

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
    "dp_0_7_delta": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_use_labels_as_structural_proof": true,
    "did_not_make_global_negative_isomorphism_claim": true,
    "preserved_qu_when_load_bearing": true,
    "did_not_infer_nei_same_from_structure": true
  }
}
```

Return D01-D13 exactly once and in order.

Every `reason` must be nonempty.
Every `authority_used` list must be nonempty.

The answer keys and enum alternatives below are the complete public serializer contract. Boolean examples show type only, not expected truth values.

D01:
```json
{"structural_correspondence":true,"label_difference_breaker":true,"primitive_first_comparison":true,"label_assistance_required":true}
```

D02:
```json
{"shared_label_sufficient":true,"candidate_exact_correspondence":"SUPPORTED|REJECTED|NOT_ESTABLISHED","partial_cyclic_common_core":"MAY_RETAIN|MUST_DISCARD|UNKNOWN","global_no_isomorphism_claim":true}
```

D03:
```json
{"loop_view_supported":true,"recursion_view_supported":true,"exclusive_taxonomy_required":true,"coexistence_conflict":true}
```

D04:
```json
{"fixed_recurrence_grammar_required":true,"multiple_reentry_supported":true,"multiple_exits_supported":true,"nested_recurrence_supported":true}
```

D05:
```json
{"invent_count_allowed":true,"preserve_qu":true,"recurrence_invariant_established":true}
```

D06:
```json
{"scalar_collapse_allowed":true,"preserve_non_scalar_qu":true,"representative_selection_allowed":true}
```

D07:
```json
{"exit_represented":true,"termination_established":true,"progress_or_convergence_established":true,"possible_nontermination_preserved":true}
```

D08:
```json
{"cycle_established":true,"recursion_established":true,"extra_semantic_authority_required":true}
```

D09:
```json
{"exact_substitution_allowed":true,"projection_declared":true,"primitive_support_authoritative":true,"convenience_reuse_allowed":true}
```

D10:
```json
{"derived_views_reusable":true,"exact_without_descent_allowed":true,"exact_candidate_status":"SUPPORTED|REJECTED|NOT_ESTABLISHED","common_recurrence_view_retained":true}
```

D11:
```json
{"invariant_established":true,"realization_selection_required":true,"actual_shape_known":true,"qu_preserved":true}
```

D12:
```json
{"state_recurrence_view_valid":true,"dts_exact_status":"TI|REJECTED|NOT_ESTABLISHED|INCOMPLETE_UNQUALIFIED","transition_order_residual":true}
```

D13:
```json
{"structural_correspondence_valid":true,"nei_same_established":true,"identity_authority":"DP|NEI_0_4|CORE","structural_isomorphism_is_identity_proof":true}
```

Apply the supplied authority exactly.

In particular:

- primitive structure precedes high-level labels;
- the same label does not override a primitive distinction;
- different labels do not themselves block a primitive correspondence;
- derived views may overlap and need not form an exclusive taxonomy;
- QU remains explicit when unresolved unfolding structure is load-bearing;
- an exit relation does not establish termination, progress, or convergence;
- a cycle does not by itself establish recursion;
- a lossy derived view does not become an exact primitive substitute;
- later use of a derived view retains its primitive provenance and may require descent;
- a property shared by every admissible QU realization may be established without choosing one realization;
- DTS distinctions remain load-bearing when the requested comparison depends on transition anatomy;
- structural correspondence does not imply NEI SAME;
- failure of one candidate mapping does not authorize a global claim that no isomorphism exists.

A module assessment of `SUPPORTED` requires that all thirteen cases be handled without an unresolved qualification-bearing contradiction.
