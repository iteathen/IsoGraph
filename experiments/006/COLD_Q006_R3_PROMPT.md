# Experiment 006 R3 — Focused Discovery Regression Prompt

You are an isolated qualification decoder for the current Discovery Protocols and NEI clarification layers.

You receive only the frozen files included in the packet. Do not browse, use external sources, inspect prior Experiment 006 outputs, retrieve theorem names from memory as evidence, or redesign the supplied specifications.

## Scope

This is a **focused proof-discovery regression test only**.

Do not perform the earlier QU/NEI control suite. Compare only Proof Alpha and Proof Beta using the supplied DP and NEI authority.

The historical unification and scorer assertions are hidden.

## Governing constraints

1. Preserve every represented/application relation exactly as supplied. Do not assume an application-defined distinction is meaningless or merely representational.
2. Do not silently strengthen a supplied distinction or relation into NEI `DISTINCT` or `SAME` unless the pinned identity authority supports that interpretation.
3. A concrete structural breaker may reject a candidate without an NEI campaign.
4. An explicit rigid application/domain/semantic authority may reject a candidate when that authority makes the difference load-bearing for the active comparison; it need not be translated into NEI unless a natural-identity conclusion is also asserted.
5. If a conclusion specifically relies on natural distinctness, apply the supplied NEI authority. Missing/incomplete identity significance does not become `DISTINCT` and does not become `SAME`.
6. If a load-bearing residual lies between already matched upstream and downstream regions and no structural/rigid breaker already explains it, perform at least one bounded recursive role/factorization pass before terminal divergence.
7. One proof step may correspond to a subgraph on the other side.
8. Preserve genuine method-specific residuals and reject unsupported full-proof identity/isomorphism claims.
9. A cost stop is allowed only as `DORMANT`/unresolved; do not disguise it as proof of non-correspondence or natural distinctness.
10. Do not align major proof steps solely by textual position near the conclusion; compare dependency role.

## Required output

Return exactly one JSON object and no Markdown fences.

Use this shape:

```json
{
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
  "cross_residual_pass": {
    "triggered": true,
    "role_passes": [
      {
        "alpha_steps": ["A.."],
        "beta_steps": ["B.."],
        "role": "...",
        "result": "CORRESPONDENCE|BREAKER|INCOMPLETE"
      }
    ],
    "result": "DEEPER_CORRESPONDENCE|BREAKER|INCOMPLETE|NOT_TRIGGERED"
  },
  "separator": {
    "kind": "STRUCTURAL_BREAKER|RIGID_AUTHORITY|NATURAL_IDENTITY|NONE",
    "evidence": "...|NONE",
    "nei_result_if_load_bearing": "SAME|DISTINCT|UNKNOWN|NO_ADMISSIBLE_MODEL|INCOMPLETE_UNQUALIFIED|NOT_APPLICABLE"
  },
  "rejected_overclaims": ["FULL_PROOF_ISOMORPHISM","NATURAL_IDENTITY","SAME_INTERMEDIATE_OBJECTS"],
  "promotion": "LEAD|CANDIDATE|SUPPORTED_CANDIDATE|QUALIFIED_CLAIM|REJECTED|DORMANT",
  "stop_kind": "SUPPORTED_CANDIDATE|REJECTED|DORMANT|CONTINUE",
  "stop_reason": "..."
}
```

Do not add extra top-level keys.

## Discovery task

Treat Proof Alpha and Proof Beta as independently supplied proof structures.

Do not assume they are isomorphic and do not assume they are unrelated. Find the strongest defensible common proof structure.

Requirements:

1. List the DP protocol IDs actually used, in adaptive order.
2. Each finding must map no more than four Alpha step IDs and no more than four Beta step IDs.
3. Find structure deeper than the generic fact that both arguments use contradiction.
4. Explicitly inspect the unmatched middle between any matched premise and matched conclusion regions by proof role.
5. For every finding, state a concrete falsification attempt or breaker checked.
6. Preserve Alpha-specific and Beta-specific residual step IDs.
7. Fill `cross_residual_pass` with at least one genuine role decomposition unless an already-qualified structural/rigid breaker makes the gate unnecessary.
8. Fill `separator` according to the evidence actually used. Do not use `NATURAL_IDENTITY` unless the reasoning really depends on NEI `DISTINCT`.
9. If identity authority is incomplete, preserve any source/application distinction exactly but do not strengthen it into natural distinctness.
10. Explicitly reject the three unsupported overclaims in `rejected_overclaims`.
11. A good discovery result will normally be `SUPPORTED_CANDIDATE`, not `QUALIFIED_CLAIM`.

Your goal is relational rediscovery, not historical naming.
