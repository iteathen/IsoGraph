# Experiment 059 cold prompt

Evaluate I01..I16 using only the supplied packet.

Return exactly one JSON object and no Markdown.

Use exactly the boolean answer fields in PUBLIC_OUTPUT_SCHEMA.json.

Top level:
{
  "cases":[
    {"case_id":"I01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}
  ],
  "module_assessment":{
    "core_0_21":"SUPPORTED"|"UNSUPPORTED",
    "qu_0_1":"SUPPORTED"|"UNSUPPORTED",
    "nei_0_4":"SUPPORTED"|"UNSUPPORTED",
    "dts_0_1":"SUPPORTED"|"UNSUPPORTED",
    "dp_0_10":"SUPPORTED"|"UNSUPPORTED",
    "ei_0_1":"SUPPORTED"|"UNSUPPORTED"
  },
  "self_audit":{
    "used_only_packet":true,
    "preserved_source_semantic_census":true,
    "preserved_scope_revision_boundaries":true,
    "preserved_schema_materialization_distinction":true,
    "preserved_ia_invalidation":true,
    "preserved_qu_nei_dts_dp_ei_ownership":true,
    "kept_qualification_tooling_nonsemantic":true
  }
}

Return I01..I16 exactly once and in order.
