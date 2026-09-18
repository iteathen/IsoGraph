# Experiment 006 R5 — Focused Discovery Regression Prompt

You are an isolated qualification decoder for the current Discovery Protocols and NEI clarification layers.

You receive only the frozen files included in the packet. Do not browse, use external sources, inspect prior Experiment 006 outputs, retrieve theorem names from memory as evidence, or redesign the supplied specifications.

## Scope

This is a **focused proof-discovery regression test only**.

Do not perform the earlier QU/NEI control suite. Compare only Proof Alpha and Proof Beta using the supplied DP and NEI authority.

The historical unification and scorer assertions are hidden.

## Governing constraints

1. Preserve every represented/application relation exactly as supplied.
2. Do not silently strengthen application/representation distinctions into NEI `SAME` or `DISTINCT`.
3. A structural breaker must identify a concrete failed load-bearing obligation under the active comparison/view. Merely naming different mathematical machinery, carrier types, discrete/continuous form, proof techniques, or decomposition styles is not enough.
4. If application/domain authority explicitly makes a difference rigid for the comparison, use `RIGID_AUTHORITY` rather than inventing a generic structural breaker.
5. If a conclusion specifically relies on natural distinctness, NEI becomes load-bearing; incomplete identity authority does not become `DISTINCT` or `SAME`.
6. If a load-bearing residual lies between already matched upstream/downstream regions and no valid breaker already explains it, perform a bounded recursive role/factorization pass.
7. Any `CORRESPONDENCE` found during that cross-residual pass must re-enter the normal candidate path: promote/expand it, concretely falsify it, or mark it incomplete. Do not ignore it when deciding whether the residual is terminal.
8. One proof step may correspond to a subgraph on the other side.
9. Align obstruction/encoder/witness/decoder roles by dependency function, not textual position near the conclusion.
10. Preserve genuine method-specific residuals and reject unsupported full-proof identity/isomorphism claims.
11. A cost stop is allowed only as `DORMANT`/unresolved; do not disguise it as proof of non-correspondence.

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
        "result": "CORRESPONDENCE|BREAKER|INCOMPLETE",
        "candidate_disposition": "PROMOTED|EXPANDED|FALSIFIED|INCOMPLETE",
        "breaker": {
          "obligation_kind": "RELATION_PRESERVATION|RELATION_REFLECTION|CONSTRAINT_COMPATIBILITY|DEPENDENCY_DIRECTION|ARITY_OR_MULTIPLICITY|CARDINALITY|BOUNDARY_OR_INTERFACE|CLOSURE|RECONSTRUCTION|OTHER_EXPLICIT_LOAD_BEARING_OBLIGATION|NONE",
          "left_evidence": "...|NONE",
          "right_evidence": "...|NONE",
          "failure": "...|NONE"
        }
      }
    ],
    "result": "DEEPER_CORRESPONDENCE|BREAKER|INCOMPLETE|NOT_TRIGGERED"
  },
  "separator": {
    "kind": "STRUCTURAL_BREAKER|RIGID_AUTHORITY|NATURAL_IDENTITY|NONE",
    "evidence": "...|NONE",
    "breaker": {
      "obligation_kind": "RELATION_PRESERVATION|RELATION_REFLECTION|CONSTRAINT_COMPATIBILITY|DEPENDENCY_DIRECTION|ARITY_OR_MULTIPLICITY|CARDINALITY|BOUNDARY_OR_INTERFACE|CLOSURE|RECONSTRUCTION|OTHER_EXPLICIT_LOAD_BEARING_OBLIGATION|NONE",
      "left_evidence": "...|NONE",
      "right_evidence": "...|NONE",
      "failure": "...|NONE"
    },
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

Treat Proof Alpha and Proof Beta as independently supplied proof structures. Do not assume they are isomorphic and do not assume they are unrelated. Find the strongest defensible common proof structure.

Requirements:

1. List the DP protocol IDs actually used, in adaptive order.
2. Each finding must map no more than four Alpha step IDs and no more than four Beta step IDs.
3. Find structure deeper than the generic fact that both arguments use contradiction.
4. Explicitly inspect the unmatched middle between matched premise and conclusion regions by proof role.
5. For every finding, state a concrete falsification attempt or breaker checked.
6. Preserve Alpha-specific and Beta-specific residual step IDs. Residual membership is orthogonal to correspondence membership: a step MAY appear in both a finding and a residual list when its load-bearing role corresponds but its local method, representation, factorization, or machinery remains specific to one proof. Do not interpret the residual lists as merely the complement of matched findings.
7. Fill `cross_residual_pass` with a genuine recursive role decomposition unless an already-qualified breaker makes it unnecessary.
8. For every role pass whose result is `CORRESPONDENCE`, record how it re-entered discovery using `candidate_disposition`. A terminal rejection may not ignore such a correspondence.
9. If a role pass or final separator uses `STRUCTURAL_BREAKER`, identify the actual failed obligation and concrete left/right evidence. `Different machinery` is not a valid breaker description by itself.
10. Fill `separator` according to the evidence actually used. Do not use `NATURAL_IDENTITY` unless reasoning genuinely depends on qualified NEI `DISTINCT`.
11. Explicitly reject the three unsupported overclaims in `rejected_overclaims`.
12. A good discovery result will normally be `SUPPORTED_CANDIDATE`, not `QUALIFIED_CLAIM`.

Your goal is relational rediscovery, not historical naming.
