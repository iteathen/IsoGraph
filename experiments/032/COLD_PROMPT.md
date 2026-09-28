# Experiment 032 — cold native reconstruction prompt

You are an isolated semantic decoder.

Use only the delimited packet. Do not browse. Do not assume a subject domain. Do not use familiar names to fill semantic gaps.

Reconstruct what the target native artifact says from its primitive structure and pinned primitive dependencies.

The target contains local IDs 181000 through 181019. Reconstruct their semantics from the formulas. Trace any referenced MEMBER, LENGTH, or order views through the supplied primitive data/arithmetic files rather than treating their behavior as unexplained primitives.

Do not infer a high-level domain from identifier numbers or from this prompt. If meaning is not determined by supplied structure, record it as unresolved instead of guessing.

Return exactly one JSON object and no Markdown fencing with this shape:

{
  "local_semantics": {
    "181000": {
      "kind": "carrier|raw_value|constructor|field|derived_relation|other",
      "arity": null,
      "reconstruction": "precise logical reconstruction"
    }
  },
  "global_reconstruction": {
    "input_structure": "what one represented instance contains",
    "well_formedness": "complete represented well-formedness conditions",
    "state_semantics": "how represented states and state equality behave",
    "local_action_semantics": "what permits and changes one local action",
    "saturation_semantics": "what one repeated same-operator phase means",
    "sequence_semantics": "how a finite operator sequence is executed",
    "success_condition": "what counts as a solution",
    "objective": "what is minimized or maximized and how ties behave"
  },
  "primitive_leaf_audit": {
    "primitive_logic_only": true,
    "raw_atoms_or_extensional_incidence_only": true,
    "traceable_derived_views": [],
    "unexpanded_semantic_operators": [],
    "qu_unexpanded": []
  },
  "possible_ambiguities": [],
  "self_audit": {
    "used_source_domain_knowledge": false,
    "guessed_missing_semantics": false
  }
}

Include every local ID 181000 through 181019 exactly once. State quantifier direction, negation, equality/extensionality, recursion base/step cases, and optimization comparison direction precisely. Distinguish finite constructor/data structure from semantic behavior. Do not treat a label or identifier as proof of meaning. Do not invent uniqueness among tied minima. Preserve repeated operator occurrence if structurally permitted. Preserve the exact guard on any zero-step phase.
