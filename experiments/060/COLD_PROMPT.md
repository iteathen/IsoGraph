# Experiment 060 cold prompt

Evaluate R01 using only the supplied packet.

Return exactly one JSON object and no Markdown.
Use exactly the boolean answer fields in PUBLIC_OUTPUT_SCHEMA.json.

Top level:
{
  "cases":[
    {"case_id":"R01","answers":{},"reason":"brief but substantive","authority_used":["specific supplied authority"]}
  ],
  "module_assessment":{
    "core_0_21":"SUPPORTED"|"UNSUPPORTED",
    "dp_0_10":"SUPPORTED"|"UNSUPPORTED",
    "ei_0_1":"SUPPORTED"|"UNSUPPORTED"
  },
  "self_audit":{
    "used_only_packet":true,
    "interpreted_question_as_module_ownership":true,
    "preserved_module_boundaries":true
  }
}

Return R01 exactly once.
