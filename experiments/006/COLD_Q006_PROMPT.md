# IsoGraph Experiment 006 — Cold Integrated Qualification Prompt

You are an isolated qualification decoder for three candidate IsoGraph modules:

- QU 0.1 — Quantifiable Unknown;
- NEI 0.1 — Natural Entropic Identity;
- DP 0.1 — Discovery Protocols.

You receive only the frozen files included in the packet. Do not browse, use external sources, infer from prior Experiment 006 work, retrieve theorem names from memory as evidence, or repair/redesign the candidates.

Use the supplied specifications exactly as written.

## General rules

1. Distinguish semantic facts from computational/resource status.
2. Do not use SI equality/inequality as natural-identity authority.
3. Do not infer QUI from equal scalar uncertainty alone.
4. Do not infer NEI SAME from structural isomorphism/QUI alone.
5. Do not use the superseded maximally-coarse-partition rule.
6. Discovery Protocol ranking generates candidates only; it does not confer truth.
7. Preserve residuals and ambiguity rather than forcing a larger match.
8. For the proof benchmark, use only the mathematical structure supplied in Proof Alpha and Proof Beta. Do not name the theorem, proof traditions, authors, or external literature even if you recognize them.

## Required output

Return exactly one JSON object and no Markdown fences.

The object MUST have this shape:

```json
{
  "qu": [
    {"id":"QU-01","answer":"...","reason":"..."}
  ],
  "nei": [
    {"id":"NEI-01","answer":"...","reason":"..."}
  ],
  "dp": {
    "protocols_used": ["DP-.."],
    "reranking_reason": "...",
    "findings": [
      {
        "alpha_steps": ["A.."],
        "beta_steps": ["B.."],
        "protocols": ["DP-.."],
        "description": "...",
        "falsification": "..."
      }
    ],
    "common_core": ["..."],
    "alpha_residual_steps": ["A.."],
    "beta_residual_steps": ["B.."],
    "rejected_overclaims": ["FULL_PROOF_ISOMORPHISM","NATURAL_IDENTITY","SAME_INTERMEDIATE_OBJECTS"],
    "promotion": "LEAD|CANDIDATE|SUPPORTED_CANDIDATE|QUALIFIED_CLAIM|REJECTED|DORMANT",
    "stop_reason": "..."
  },
  "overall_notes": "..."
}
```

Do not add extra top-level keys.

## QU tasks

Answer every QU case in `Q006_CASES.md` using the allowed answer token listed for that case. Explain briefly why.

## NEI tasks

Answer every NEI case in `Q006_CASES.md` using the following tokens:

```text
SAME
DISTINCT
UNKNOWN
NO_ADMISSIBLE_MODEL
INCOMPLETE_UNQUALIFIED
```

If a case explicitly requests multiple subanswers, return those tokens as a comma-separated sequence in the requested order. Explain briefly why.

## DP task

Treat Proof Alpha and Proof Beta as independently supplied proof structures.

Do not assume they are isomorphic and do not assume they are unrelated. Apply DP 0.1 adaptively to find the strongest defensible common proof structure.

Requirements:

1. List the DP protocol IDs you actually use, in the order you would use them after adaptive reranking.
2. Each `finding` must map no more than four Alpha step IDs and no more than four Beta step IDs. Do not pass by mapping the entire proofs together.
3. Find structure deeper than the generic fact that both arguments use contradiction.
4. Expand promising local correspondences only after checking their immediate neighborhoods/constraints.
5. For each finding, state a concrete falsification attempt or breaker you checked.
6. Record Alpha-specific and Beta-specific residual step IDs. Residuals are required even if a strong common core is found.
7. Explicitly reject unsupported overclaims using the provided `rejected_overclaims` tokens.
8. Do not label the result `QUALIFIED_CLAIM` unless the supplied material independently discharges a full semantic isomorphism/common-core qualification. A good discovery result will normally be `SUPPORTED_CANDIDATE`.
9. Stop when further lower-ranked protocols are unlikely to add load-bearing structural information relative to cost.

Your goal is not to identify historical names. Your goal is to rediscover useful relational structure from the frozen proof representations.
