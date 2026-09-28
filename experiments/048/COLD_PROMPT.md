# Experiment 048 cold prompt

Evaluate every public case using only the delimited packet.

Return exactly one JSON object and no Markdown.

Schema:

{
  "cases": [
    {
      "case_id": "C01",
      "answers": { "...": "use exactly the fields requested by the case contract" },
      "reason": "brief but substantive",
      "authority_used": ["specific supplied authority"]
    }
  ],
  "module_assessment": {
    "core_0_20": "SUPPORTED" | "UNSUPPORTED"
  },
  "self_audit": {
    "used_only_packet": true,
    "did_not_accept_domain_name_as_primitive": true,
    "preserved_qu_when_definition_missing": true,
    "did_not_use_sidecar_as_native_semantics": true,
    "distinguished_core019_validity_from_core020_completion": true,
    "exact_claims_route_to_primitive_support": true
  }
}

Rules:
- Return C01..C18 exactly once and in order.
- Use exactly the answer-field names listed for each case in experiments/048/PUBLIC_OUTPUT_SCHEMA.json. Do not add, omit, rename, or alias answer fields.
- Do not infer hidden chemistry/domain semantics from labels.
- A familiar name is not primitive authority.
- A missing lower definition remains unresolved/QU-bearing when load-bearing.
- Historical Core 0.19 validity and Core 0.20 primitive closure are separate questions.
