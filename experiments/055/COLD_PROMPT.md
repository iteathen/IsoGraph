# Experiment 055 cold prompt

Evaluate Q01..Q18 using only the supplied packet. Return one JSON object and no Markdown. Use exactly the boolean fields in PUBLIC_OUTPUT_SCHEMA.json.

{
 "cases":[{"case_id":"Q01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}],
 "module_assessment":{"ei_0_1":"SUPPORTED"|"UNSUPPORTED"},
 "self_audit":{
  "used_only_packet":true,
  "required_warrant":true,
  "preserved_scope_incompleteness":true,
  "preserved_qu_semantics":true,
  "preserved_unexpected_observations":true,
  "preserved_adaptive_lineage":true,
  "limited_negative_results_to_coverage":true,
  "returned_evidence_not_truth":true
 }
}
Return Q01..Q18 exactly once and in order.
