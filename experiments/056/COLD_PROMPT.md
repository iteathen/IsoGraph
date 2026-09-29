# Experiment 056 cold prompt

Evaluate I01..I16 using only the supplied packet. Return one JSON object and no Markdown. Use exactly the boolean fields in PUBLIC_OUTPUT_SCHEMA.json.

Top level:
{
 "cases":[{"case_id":"I01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}],
 "module_assessment":{
  "core_0_20":"SUPPORTED"|"UNSUPPORTED",
  "qu_0_1":"SUPPORTED"|"UNSUPPORTED",
  "nei_0_4":"SUPPORTED"|"UNSUPPORTED",
  "dts_0_1":"SUPPORTED"|"UNSUPPORTED",
  "dp_0_9":"SUPPORTED"|"UNSUPPORTED",
  "dp_0_10":"SUPPORTED"|"UNSUPPORTED",
  "ei_0_1":"SUPPORTED"|"UNSUPPORTED"
 },
 "self_audit":{
  "used_only_packet":true,
  "preserved_module_ownership":true,
  "preserved_qu_and_open_world_distinction":true,
  "preserved_adaptive_evidence_lineage":true,
  "limited_negative_results_to_coverage":true,
  "kept_experiment_evidence_separate_from_truth":true
 }
}
Return I01..I16 exactly once and in order.
