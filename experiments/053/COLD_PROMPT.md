# Experiment 053 cold prompt

Evaluate M01..M20 using only the supplied packet.

Return exactly one JSON object and no Markdown.

For every case:
- use exactly the answer fields listed in PUBLIC_OUTPUT_SCHEMA.json;
- every answer value is boolean;
- provide a brief substantive reason;
- provide at least one specific authority used from the supplied packet.

Top level:
{
  "cases":[{"case_id":"M01","answers":{},"reason":"...","authority_used":["..."]}],
  "module_assessment":{"dp_0_9":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "preserved_semantic_structure":true,
    "kept_sufficiency_before_valuation":true,
    "did_not_invent_preferences":true,
    "preserved_qu_when_load_bearing":true,
    "preserved_dts_when_load_bearing":true,
    "kept_dp_separate_from_proof_authority":true
  }
}

Return M01..M20 exactly once and in order.
