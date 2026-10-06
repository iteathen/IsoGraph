# Experiment 062 — Semantic Occurrence Extraction Prompt 0.2

This is a serialization-clarified successor to the original Experiment 062 extraction prompt. The semantic task is unchanged.

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
          "source_span": "exact contiguous substring copied character-for-character from the frozen body",
          "relation_span": "exact contiguous substring inside source_span",
          "argument_spans": ["exact contiguous substrings copied character-for-character from the same body"],
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

## Exact-span serialization rule

Every span string is a literal quotation, not a paraphrase.

Before returning JSON, verify for every item that:

```text
frozen_body.includes(source_span) == true
frozen_body.includes(relation_span) == true
source_span.includes(relation_span) == true
frozen_body.includes(each argument_span) == true
```

Do not normalize punctuation, expand slash notation, insert omitted words, or compress non-contiguous text.

If two semantic pieces are separated by intervening source text, choose one larger **contiguous** source span that includes the intervening text. Do not join the pieces by ellipsis or deletion.

If a compact phrase such as `positive/negative X` occurs in source, do not manufacture `positive X` unless those exact characters occur contiguously. Use the exact compact phrase or other exact source substrings.

## Semantic rules

- Return every requested census ID exactly once and in original corpus order.
- Use the smallest exact contiguous source span that still preserves the load-bearing semantic occurrence and its stated arguments/side condition.
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
