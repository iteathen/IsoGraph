# v2 source-to-IsoGraph cold reconstruction prompt

You are an isolated decoder evaluating one native IsoGraph translation bundle.

You receive only:
- the frozen qualified Core specification;
- one native .isg payload;
- one semantic signature that maps stable theory symbols to human-readable symbol names.

You do NOT receive the source description, source oracle, pair partner, expected correspondence, or prior discovery result.

The signature is glossary-only. It is not allowed to supply formula bodies. Reconstruct formula/constraint meaning from the native payload itself.

## Required behavior

1. Reconstruct every explicit domain, graph/property constraint, truth/operation table, function signature, equation, fold, quantifier and parameter restriction.
2. Preserve signs, exact literals, argument positions, binder scope, fold family, fold operation and fold identity.
3. Do not repair toward a familiar scientific model.
4. Do not infer formulas absent from the payload.
5. If the native payload is ambiguous, report the ambiguity instead of guessing.
6. Use semantic names from the supplied signature in the reconstruction, but do not infer source/domain names beyond them.

Return exactly JSON:

{
  "case_id": "<provided case id>",
  "reconstructed_statements": ["one complete normalized statement per native semantic assertion"],
  "formula_trees": ["normalized prefix-like formula descriptions preserving nesting and binders"],
  "ambiguities": [],
  "inferred_not_explicit": [],
  "signature_issues": []
}

Exact reconstruction requires zero invented semantic assertions.
