# Experiment 057 cold prompt

Evaluate C01..C26 using only the supplied packet.

Return exactly one JSON object and no Markdown.

For every case:
- use exactly the answer fields listed in PUBLIC_OUTPUT_SCHEMA.json;
- every answer value is boolean;
- give a brief substantive reason;
- cite at least one specific supplied authority in authority_used.

Top level:

{
  "cases":[
    {"case_id":"C01","answers":{},"reason":"...","authority_used":["..."]}
  ],
  "module_assessment":{"core_0_21":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "preserved_frozen_source_semantic_census":true,
    "did_not_shrink_scope_implicitly":true,
    "distinguished_qu_from_missing_definition":true,
    "distinguished_schema_from_materialization":true,
    "separated_termination_from_step_semantics":true,
    "required_body_support_dependency_closure":true,
    "invalidated_stale_ia_fixed_points":true,
    "kept_core_separate_from_qu_nei_dts_dp_ei":true
  }
}

Return C01..C26 exactly once and in order.
