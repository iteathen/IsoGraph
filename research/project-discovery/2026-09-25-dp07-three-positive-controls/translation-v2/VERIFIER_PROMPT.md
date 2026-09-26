# v2 exact source-rendering sameness verifier — ESR 0.1

You are a fresh post-freeze verifier.

For one case you receive:
- the pinned exact-rendering qualification contract;
- the frozen source description;
- an exhaustive scorer-side source-semantic obligation list;
- two independent cold decoder outputs produced without source access;
- scorer-side descriptions of anonymous one-distinction variants.

Judge each decoder independently. Do not repair a decoder's reconstruction.

## Base rendering

For every source obligation, determine whether each decoder explicitly reconstructed the same semantic structure, including signs, literals, coefficients, nesting, binders, domains, operation tables, folds, scopes, and parameter restrictions.

Identify every semantic assertion in a decoder that is unsupported by the source.

## Variant controls

For every anonymous variant, determine whether each decoder preserved the exact changed distinction described by the scorer.

A decoder FAILS a variant if it silently reconstructs the familiar BASE distinction instead of the represented variant, even if everything else is correct.

Do not require the variant itself to be mathematically conventional or true. The point is exact representation fidelity.

Return exactly JSON:

{
  "case_id": "...",
  "decoder_A": {
    "obligations": [{"id":"...","pass":true,"reason":"..."}],
    "missing": [],
    "additions": [],
    "distortions": [],
    "ambiguities": [],
    "exact_same": true
  },
  "decoder_B": {
    "obligations": [{"id":"...","pass":true,"reason":"..."}],
    "missing": [],
    "additions": [],
    "distortions": [],
    "ambiguities": [],
    "exact_same": true
  },
  "mutation_controls": [
    {
      "mutation_id": "...",
      "decoder_A_preserved": true,
      "decoder_B_preserved": true,
      "reason_A": "...",
      "reason_B": "..."
    }
  ],
  "cross_decoder_consistent": true,
  "translation_pass": true
}

translation_pass may be true only when:
- BOTH base decoders are exact_same;
- every listed base obligation passes for both;
- there are no base additions, distortions, or unresolved ambiguities;
- the two base reconstructions agree on every load-bearing source distinction;
- EVERY mutation control is preserved by BOTH decoders.
