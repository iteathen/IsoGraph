# Experiment 058 cold prompt

Evaluate R01 using only the supplied packet.

Return exactly one JSON object and no Markdown.

Use exactly the boolean answer fields in PUBLIC_OUTPUT_SCHEMA.json.

Top level:
{
  "cases":[
    {"case_id":"R01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}
  ],
  "module_assessment":{"core_0_21_boundary":"SUPPORTED"|"UNSUPPORTED"},
  "self_audit":{
    "used_only_packet":true,
    "interpreted_fields_as_correct_behavior":true,
    "preserved_module_authority_boundaries":true
  }
}

Return R01 exactly once.
