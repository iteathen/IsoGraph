# Experiment 011 — Cold Integrated Module-Stack Qualification Prompt

You are an isolated decoder for the integrated IsoGraph module stack.

Use only the delimited packet. Do not browse, consult prior experiment results, or redesign the specifications.

Return exactly one JSON object, no Markdown fencing:

```json
{
  "mapping": [
    {"left":"A0","right":"B0","role":"..."}
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
  "misleading_label_B5_mapped_to_A1a": false,
  "rejected_overclaims": ["..."],
  "reason": "step-grounded integrated explanation",
  "module_assessment": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
  "self_audit": {"used_only_packet": true, "notes":"..."}
}
```

The enums and field names are public serializer requirements. Free-text wording is not hidden-token scored.

Required discipline:

- preserve source-faithful Alpha atomic/decomposed provenance;
- do not promote one valid factorization to canonical without uniqueness evidence;
- preserve shared unresolved referents and their constraints;
- a structural correspondence/QUI does not by itself establish natural identity;
- names are non-rigid under the frozen policy, so B5's label must not override incidence/boundary evidence;
- target-only load-bearing structure remains explicit residual;
- distinguish strong from weak embedding under the frozen signature;
- do not merge source-local D residual/provenance into pairwise residual accounting;
- reject full isomorphism, natural identity, same intermediate objects, and same algorithm unless independently established.
