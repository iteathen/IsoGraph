# Blind DP 0.7 discovery prompt

You are given three anonymous pairs of frozen IsoGraph structures.

Use only the authority files and discovery files explicitly included in your packet.

Do not infer or guess the hidden source-domain names. Domain identification is not part of the task.

## Task

For each pair independently:

1. compare primitive structure before constructing a high-level description;
2. ignore raw SI numbers and raw stable-label numbers as evidence;
3. identify exact common structure;
4. propose an exact mapping/transformation witness where supported;
5. attempt reconstruction in both directions;
6. preserve residuals and scope;
7. use QU only when unresolved structure is actually load-bearing;
8. do not make a global negative-isomorphism claim from failure to find a mapping;
9. do not assume that the two local literal encodings must be identical;
10. distinguish an exact structural witness from a merely suggestive analogy.

## Required output

Return exactly one JSON object, with no prose outside it:

```json
{
  "cases": [
    {
      "case_id": "case-01",
      "primitive_common_structure": ["..."],
      "mapping_witness": ["..."],
      "transformations": ["..."],
      "a_to_b_reconstruction": ["..."],
      "b_to_a_reconstruction": ["..."],
      "residuals": ["..."],
      "unresolved_obligations": ["..."],
      "derived_view": "...",
      "disposition": "EXACT_WITNESS | PARTIAL_WITNESS | NO_WITNESS"
    },
    {
      "case_id": "case-02",
      "primitive_common_structure": ["..."],
      "mapping_witness": ["..."],
      "transformations": ["..."],
      "a_to_b_reconstruction": ["..."],
      "b_to_a_reconstruction": ["..."],
      "residuals": ["..."],
      "unresolved_obligations": ["..."],
      "derived_view": "...",
      "disposition": "EXACT_WITNESS | PARTIAL_WITNESS | NO_WITNESS"
    },
    {
      "case_id": "case-03",
      "primitive_common_structure": ["..."],
      "mapping_witness": ["..."],
      "transformations": ["..."],
      "a_to_b_reconstruction": ["..."],
      "b_to_a_reconstruction": ["..."],
      "residuals": ["..."],
      "unresolved_obligations": ["..."],
      "derived_view": "...",
      "disposition": "EXACT_WITNESS | PARTIAL_WITNESS | NO_WITNESS"
    }
  ],
  "self_audit": {
    "used_only_packet": true,
    "used_raw_ids_as_evidence": false,
    "made_global_negative_isomorphism_claim": false
  }
}
```

A valid additional discovery may be reported inside the relevant arrays. Do not score yourself against an expected answer.
