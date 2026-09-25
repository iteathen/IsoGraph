# Experiment 017 — Cold Connect4 q Qualification Prompt

You are an isolated semantic verifier for Connect4 Experiment 017, hosted in the IsoGraph qualification infrastructure.

Use only the delimited packet. Do not browse, inspect prior outputs, infer hidden scoring keys, or redesign Connect4.

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
  "overall": {
    "q_o_congruence": "VALID_UNDER_DECLARED_SCOPE|MATERIAL_GAP|CONTRADICTED",
    "q_r_distinction_required": true,
    "notes": "..."
  },
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

Return C01-C18 exactly once and in order.

The keys and enum domains below are public serializer requirements. Boolean examples show types, not expected truth values.

C01:
```json
{"legal_nonterminal_7x6_scope":true,"physical_identity_established":true,"history_identity_established":true,"proof_identity_established":true}
```

C02:
```json
{"same_literal_legal_columns":true,"same_landing_cells":true,"same_side_to_move":true}
```

C03:
```json
{"terminal_token_determined_by_qo_action":true,"draw_after_nonwinning_full_move_determined":true}
```

C04:
```json
{"strict_superset_semantically_redundant":true,"first_win_stopping_load_bearing":true,"post_terminal_residual_comparison_required":true}
```

C05:
```json
{"successor_qo_unique":true,"successor_qo_equal":true}
```

C06:
```json
{"rank_induction_valid":true,"same_oriented_labelled_future_game":true}
```

C07:
```json
{"same_wdl":true,"same_distance_value":true,"same_literal_action_values":true}
```

C08:
```json
{"same_colored_board":true,"same_move_history":true,"same_terminal_line_provenance":true,"same_non_q_proof_context":true}
```

C09:
```json
{"gameplay_key_is_qr":true,"qr_implies_literal_action_identity":true,"reflection_quotient_required":true}
```

C10:
```json
{"transporter":"IDENTITY|REFLECT_6_MINUS_C|UNRESOLVED"}
```

C11:
```json
{"transported_child_correspondence_supported":true,"terminal_status_preserved":true,"child_qr_preserved":true}
```

C12:
```json
{"scalar_value_cache_reuse_exact":true,"literal_move_without_orientation_authorized":true}
```

C13:
```json
{"qr_establishes_non_q_proof_identity":true}
```

C14:
```json
{"equal_wdl_establishes_future_behavior_identity":true}
```

C15:
```json
{"finite_controls_alone_prove_universal_theorem":true,"deductive_lemmas_induction_required":true}
```

C16:
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED","qo_theorem_forces_result":true}
```

C17:
```json
{"literal_no_transporter_proved":true,"transported_equivalence_proved":true}
```

C18:
```json
{"proof_core":"VALID_UNDER_DECLARED_SCOPE|MATERIAL_GAP|CONTRADICTED","first_failed_premise":"NONE|SUPPORT|TERMINAL|ANTICHAIN|SUCCESSOR|INDUCTION|OTHER","qo_qr_distinction_required":true}
```

Preserve the distinction between orientation-sensitive q_o and reflection-orbit q_r. Do not use test counts as universal proof. Apply NEI 0.4 only after the underlying exact facts/evidence are established.
