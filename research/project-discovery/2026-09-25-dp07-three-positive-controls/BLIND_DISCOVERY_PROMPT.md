# Blind DP 0.7 discovery prompt

You are given three anonymous pairs of frozen IsoGraph structures.

Use only the authority files and discovery files explicitly included in your packet.

Do not infer or guess the hidden source-domain names. Domain identification is not part of the task.

## Task

For each pair independently:

1. compare primitive structure before constructing a high-level description;
2. ignore raw SI numbers and raw stable-label numbers as evidence;
3. treat signature glosses only as local symbol-role descriptions, never as proof that similarly familiar roles are directly identical across the two systems;
4. identify candidate common structure;
5. freeze the candidate mapping/transformation before testing it;
6. descend every load-bearing part of that candidate back to primitive/qualified-leaf support on both sides;
7. reconstruct B from A under the candidate transformation and reconstruct A from B under the inverse transformation;
8. explicitly check domains/ranges, scope, binding, operator roles, material ordering, signs, coefficients/values, and residual structure;
9. cite the packet authority that licenses every nonliteral transformation step;
10. attempt at least one local falsification of the candidate using a represented distinction that would expose a merely familiar but false mapping;
11. preserve residuals, constants, auxiliary coordinates, projections, and scope rather than declaring them absent;
12. use QU only when unresolved structure is actually load-bearing;
13. do not repair a failed candidate toward a familiar textbook relationship;
14. do not make a global negative-isomorphism claim from failure to find a mapping;
15. do not assume that the two local literal encodings must be identical;
16. distinguish an exact structural witness from a merely suggestive analogy.

`EXACT_WITNESS` is permitted only when the explicit support audit passes in both directions with zero unresolved load-bearing difference. Otherwise return `PARTIAL_WITNESS` or `NO_WITNESS`.

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
      "exact_obligation_audit": {
        "candidate_frozen_before_audit": true,
        "a_to_b_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "b_to_a_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "local_falsification_attempts": ["..."],
        "unaccounted_load_bearing_differences": ["..."],
        "exact_gate_pass": false
      },
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
      "exact_obligation_audit": {
        "candidate_frozen_before_audit": true,
        "a_to_b_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "b_to_a_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "local_falsification_attempts": ["..."],
        "unaccounted_load_bearing_differences": ["..."],
        "exact_gate_pass": false
      },
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
      "exact_obligation_audit": {
        "candidate_frozen_before_audit": true,
        "a_to_b_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "b_to_a_support_checks": [
          {
            "obligation": "...",
            "primitive_support": ["..."],
            "transformation": "...",
            "authority_refs": ["packet authority path + section, or DIRECT_NATIVE_SUPPORT"],
            "reconstructed_target": "...",
            "result": "PASS | FAIL | UNKNOWN"
          }
        ],
        "local_falsification_attempts": ["..."],
        "unaccounted_load_bearing_differences": ["..."],
        "exact_gate_pass": false
      },
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

For every case:

- `disposition = EXACT_WITNESS` requires `exact_obligation_audit.exact_gate_pass = true`;
- every listed A->B and B->A support check must be `PASS`;
- `unaccounted_load_bearing_differences` and `unresolved_obligations` must both be empty;
- a failed or unknown load-bearing check forbids `EXACT_WITNESS`;
- every nonliteral algebraic, fold, graph, derivative, or other theory transformation marked `PASS` must cite an included packet authority path and section in `authority_refs`;
- `DIRECT_NATIVE_SUPPORT` may be used only when the represented primitive statement itself establishes the step without an imported transformation law;
- an empty, vague, or non-packet authority citation blocks `EXACT_WITNESS`;
- a recognizable domain or familiar formula is not a substitute for this audit.
