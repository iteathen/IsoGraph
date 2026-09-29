# Experiment 054 cold prompt

Evaluate W01..W18 using only the supplied packet. Decide Experimental Warrant behavior, not the eventual experiment result.

Return exactly one JSON object and no Markdown. Use exactly the boolean answer fields in PUBLIC_OUTPUT_SCHEMA.json.

Top level:
{
  "cases":[{"case_id":"W01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}],
  "module_assessment":{"dp_0_10":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "warrant_not_hypothesis_support":true,
    "preserved_qu_semantics":true,
    "preserved_open_world_incompleteness":true,
    "limited_negative_results_to_coverage":true,
    "preserved_adaptive_evidence_lineage":true,
    "kept_dp_separate_from_proof_authority":true
  }
}
Return W01..W18 exactly once and in order.
