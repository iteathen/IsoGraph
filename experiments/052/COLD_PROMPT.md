# Experiment 052 cold prompt

Evaluate I01..I16 using only the supplied packet.

Return exactly one JSON object and no Markdown.

For every case:
- use exactly the answer fields published in PUBLIC_OUTPUT_SCHEMA.json;
- all case answer values are boolean;
- give a brief substantive reason;
- cite specific supplied authority.

Also return:

"module_assessment": {
  "core_0_20": "SUPPORTED" | "UNSUPPORTED",
  "dp_0_8": "SUPPORTED" | "UNSUPPORTED",
  "qu_0_1": "SUPPORTED" | "UNSUPPORTED",
  "nei_0_4": "SUPPORTED" | "UNSUPPORTED",
  "dts_0_1": "SUPPORTED" | "UNSUPPORTED"
}

and:

"self_audit": {
  "used_only_packet": true,
  "preserved_module_ownership": true,
  "did_not_use_dp_as_proof_authority": true,
  "preserved_qu_when_load_bearing": true,
  "did_not_infer_global_identity_from_scoped_same": true,
  "routed_exact_claims_to_primitive_support": true
}

Return I01..I16 exactly once and in order.
