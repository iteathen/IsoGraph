# Experiment 030 — Cold Core 0.19 Mutation Regression Prompt

Use only the delimited packet.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "R01",
      "answers": {
        "decoder_preserved_mutated_distinction": true,
        "exact_rendering_qualification_passes": true,
        "familiar_form_repair_allowed": true
      },
      "reason": "nonempty explanation",
      "authority_used": ["nonempty authority reference"]
    }
  ],
  "module_assessment": {
    "mutation_regression": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "distinguished_preservation_from_detection": true,
    "did_not_repair_toward_familiar_form": true
  }
}
```

Return R01 and R02 exactly once and in order.

Boolean examples show type only, not expected truth values.

Interpret `decoder_preserved_mutated_distinction` literally: true only if the decoder reconstructed the changed source distinction exactly as mutated.

Interpret `exact_rendering_qualification_passes` literally: true only if this mutation case satisfies the Core 0.19 exact-rendering distinction-preservation requirement.

Interpret `familiar_form_repair_allowed` literally: whether a decoder may replace the represented mutation with a more familiar canonical form and still pass exact-rendering qualification.

A module assessment of `SUPPORTED` requires both cases to comply with Core 0.19 section 18.11.
