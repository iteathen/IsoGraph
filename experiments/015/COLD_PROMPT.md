# Experiment 015 — Cold Integrated Module-Stack Qualification Prompt

You are an isolated decoder for the IsoGraph integrated module stack.

Use only the delimited packet. Do not browse, inspect prior experiment outputs, or redesign the specifications.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "mapping": [
    {"left":"P0","right":"Q0","role":"concise structural role"}
  ],
  "qu_status_alpha": "OPEN|DETERMINATE|INCONSISTENT|INCOMPLETE_SCOPE",
  "qu_status_beta": "OPEN|DETERMINATE|INCONSISTENT|INCOMPLETE_SCOPE",
  "unknown_structural_relation": "QUI|NOT_QUI|UNKNOWN",
  "nei_status": "SAME|DISTINCT|UNKNOWN|INCOMPLETE_AUTHORITY|NO_ADMISSIBLE_MODEL",
  "relation_kind": "ISOMORPHISM|STRONG_EMBEDDING|WEAK_EMBEDDING|COMMON_CORE|CERTIFIED_NON_ISOMORPHIC|UNKNOWN",
  "strong_embedding": false,
  "weak_embedding": true,
  "beta_residuals": ["..."],
  "alpha_source_local_D_preserved": true,
  "alpha_atomic_as_pair_residual": false,
  "canonical_factorization_claimed": false,
  "misleading_label_Q5_mapped_to_P1a": false,
  "overclaim_checks": {
    "full_or_global_isomorphism_established": false,
    "natural_identity_established": false,
    "same_intermediate_objects_established": false,
    "same_algorithm_established": false
  },
  "reason": "step-grounded integrated explanation",
  "module_assessment": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
  "self_audit": {"used_only_packet": true, "notes":"..."}
}
```

The field names and enum spellings are public serializer requirements.

The booleans shown in `overclaim_checks` are placeholders for the answer type; set each according to the supplied structure and authority.

Apply the module semantics exactly:

- preserve source-local exact-D provenance;
- do not promote one valid factorization to canonical without uniqueness evidence;
- preserve shared unresolved referents and their constraints;
- a structural correspondence/QUI does not establish natural identity;
- labels are non-rigid under the frozen policy;
- all target-only load-bearing structure remains explicit residual;
- distinguish strong from weak embedding under the frozen relation signature;
- source-local D provenance is not pairwise residual accounting;
- do not infer same intermediate objects or same algorithm merely from the common structural role.
