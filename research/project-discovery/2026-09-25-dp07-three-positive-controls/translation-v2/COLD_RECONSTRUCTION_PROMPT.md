# v2 source-to-IsoGraph cold reconstruction prompt — ESR 0.1

You are an isolated decoder evaluating one native IsoGraph translation bundle under the current Core exact-rendering rules.

You receive:
- the pinned Core authority/clarifications;
- one gloss-only semantic signature;
- one BASE native payload;
- zero or more anonymous NATIVE VARIANTS.

You do NOT receive:
- the source description;
- source oracle;
- pair partner;
- expected correspondence;
- mutation description;
- scorer assertions;
- prior discovery result.

The signature supplies symbol names only. It is not allowed to supply formula bodies.

## Required behavior

For BASE and for every anonymous variant independently:

1. Reconstruct every explicit domain, relation/property constraint, operation table, function signature, equation, fold, quantifier, condition, and parameter restriction.
2. Preserve exact signs, literals, coefficients, argument positions, binder scope, fold family, fold operation, fold identity, ranges/domains, and equality structure.
3. Do not repair toward a familiar scientific or mathematical model.
4. Do not infer formulas absent from that payload.
5. Do not assume a variant is an error. Treat its exact native content as authoritative.
6. If a payload is ambiguous, record the ambiguity instead of guessing.
7. Use semantic names from the supplied signature, but do not infer hidden source/domain names beyond them.
8. A tiny difference between BASE and a variant is load-bearing unless the current Core explicitly makes it representation-only.

Return exactly JSON:

{
  "case_id": "<provided case id>",
  "base": {
    "reconstructed_statements": ["one complete normalized statement per native semantic assertion"],
    "formula_trees": ["normalized prefix-like formula descriptions preserving exact nesting and binders"],
    "ambiguities": [],
    "inferred_not_explicit": [],
    "signature_issues": []
  },
  "variants": [
    {
      "variant_id": "variant-1",
      "reconstructed_statements": [],
      "formula_trees": [],
      "ambiguities": [],
      "inferred_not_explicit": [],
      "signature_issues": []
    }
  ]
}

Exact reconstruction requires zero invented semantic assertions and exact preservation of every represented distinction.
