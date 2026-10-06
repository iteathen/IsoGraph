# Experiment 062 — Semantic Occurrence Extraction Prompt

You are performing source-conserved semantic occurrence extraction for a graph-first IsoGraph research pass.

You receive:
1. the frozen unresolved W+L body census;
2. the graph-first method;
3. a requested track, W or L.

Your task is **not** to classify mathematics, propose primitives, or find W/L correspondences.

For every census body in the requested track, identify every load-bearing semantic operation/relation occurrence whose behavior is not merely ordinary logical composition (AND/OR/NOT/IMPLIES/IFF/quantification/equality) or source-status modality.

Return one JSON object:

```json
{
  "track": "W",
  "items": [
    {
      "census_id": "W-SSC-001",
      "occurrences": [
        {
          "occurrence_id": "W-SSC-001-O01",
          "source_span": "exact contiguous substring copied from the frozen body",
          "relation_span": "exact contiguous substring inside source_span naming or expressing the relation/operation",
          "argument_spans": ["exact contiguous substrings copied from the same body"],
          "logical_force": "ASSERTED | NEGATED | CONDITIONAL | EQUALITY_OR_IDENTIFICATION | EXISTENCE | COMPARISON | OTHER",
          "definition_status": "EXPLICIT_IN_BODY | PARTIAL_IN_BODY | NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED",
          "depends_on": [],
          "load_bearing_note": "brief source-local explanation; no conventional primitive-category assignment"
        }
      ],
      "extraction_status": "COMPLETE | INCOMPLETE_AMBIGUOUS_BOUNDARY"
    }
  ]
}
```

Rules:

- Return every requested census ID exactly once and in original corpus order.
- `source_span`, `relation_span`, and every `argument_spans` value must be exact contiguous substrings of that item's frozen body.
- Use the smallest source span that still preserves the load-bearing semantic occurrence and its arguments/side condition.
- One occurrence may cover a relation plus an explicit law/equation when separating them would destroy the stated behavior.
- If the body merely names a construction without defining its behavior, mark `NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED`; do not silently import a textbook definition.
- If the body explicitly gives an equation/action/law, preserve that exact relation/equation span and mark the appropriate definition status.
- Preserve distinct operations/relations separately when the body makes them independently load-bearing.
- Do not map terms to mathematical taxonomies such as group/bundle/vector/topology modules.
- Do not emit PD-* demand IDs, B-* basis IDs, DNWF, DNIA, or proposed primitive names.
- Do not infer W/L equivalence or unification.
- Do not treat a familiar source name as semantic authority.
- If you cannot delimit all occurrences without inventing semantics, mark the item `INCOMPLETE_AMBIGUOUS_BOUNDARY` rather than guessing.
- `depends_on` may reference only occurrence IDs from the same census item and only when the source statement itself makes one occurrence depend on another.
- Return JSON only.
