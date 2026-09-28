# Experiment 050 cold prompt

Evaluate E01..E22 using only the supplied packet. The public cases intentionally do not say whether the correct overall disposition is defect, clue, both, or neither.

Return exactly one JSON object and no Markdown.

For each case:
- use exactly the answer fields in PUBLIC_OUTPUT_SCHEMA.json;
- every answer value is boolean;
- do not add or rename fields.

Top-level schema:
{
  "cases": [
    {"case_id":"E01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}
  ],
  "module_assessment":{"dp_0_8":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "did_not_privilege_expected_or_trusted_side":true,
    "kept_repair_and_discovery_questions_separate":true,
    "preserved_qu_when_load_bearing":true,
    "did_not_infer_nei_same_from_finite_agreement":true,
    "did_not_promote_useful_derived_view_to_core":true
  }
}

Return E01..E22 exactly once and in order.
