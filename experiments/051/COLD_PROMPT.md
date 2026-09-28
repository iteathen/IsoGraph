# Experiment 051 cold prompt

Evaluate H01 using only the supplied packet.

Return exactly one JSON object and no Markdown:

{
  "cases":[{
    "case_id":"H01",
    "answers":{
      "source_a_requires_repair":true|false,
      "source_b_requires_repair":true|false,
      "hidden_distinction_established":true|false,
      "normalize_to_common_quantity":true|false,
      "false_repair_allowed":true|false
    },
    "reason":"brief but substantive",
    "authority_used":["specific supplied authority"]
  }],
  "module_assessment":{"dp_0_8_target_5":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "did_not_treat_numeric_difference_as_defect":true,
    "preserved_quantity_scope":true
  }
}
