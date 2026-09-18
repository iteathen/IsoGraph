# Experiment 013 — Cold Focused QU / NEI Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 013.

Use only the delimited packet. Do not browse, inspect prior experiment outputs, or redesign the specifications.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "F01",
      "answers": {},
      "reason": "step-grounded explanation",
      "authority_used": ["..."]
    }
  ],
  "module_assessment": {
    "qu_0_1": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE",
    "nei_0_1_0_2": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

Return F01-F08 exactly once and in order.

The following answer keys and values are public serializer requirements. Do not add alternate keys in place of them.

## F01 answers

```json
{
  "shared_vs_split_equal_equivalent": true,
  "shared_vs_opaque_equivalent": true,
  "relational_distinction_must_survive": true
}
```

Each boolean must be set according to the candidate semantics; the example above shows keys/types only, not expected truth values.

## F02 answers

```json
{
  "four_admissible": true,
  "qu_status": "OPEN|DETERMINATE|INCONSISTENT|INCOMPLETE_SCOPE",
  "stale_cache_controls_semantics": true
}
```

## F03 answers

```json
{
  "Exact": "SEMANTIC_UNRESOLVED|COMPUTATION_INCOMPLETE|INCOMPLETE_SCOPE",
  "Search": "SEMANTIC_UNRESOLVED|COMPUTATION_INCOMPLETE|INCOMPLETE_SCOPE"
}
```

## F04 answers

```json
{
  "X": "REFINEMENT|REVISION",
  "Y": "REFINEMENT|REVISION"
}
```

## F05 answers

```json
{
  "QX_QY": "QUI|NOT_QUI",
  "QX_QZ": "QUI|NOT_QUI",
  "equal_scalar_establishes_QUI": true
}
```

## F06 answers

```json
{
  "actual_resolution_equality_established": true,
  "nei_same_established": true,
  "nei_query_status": "SAME|DISTINCT|UNKNOWN|INCOMPLETE_AUTHORITY|NO_ADMISSIBLE_MODEL"
}
```

## F07 answers

```json
{
  "may_choose_anchor_to_force_result": true,
  "nei_query_status": "SAME|DISTINCT|UNKNOWN|INCOMPLETE_AUTHORITY|NO_ADMISSIBLE_MODEL"
}
```

## F08 answers

```json
{
  "circular_proof_admissible": true,
  "original_qu_status": "OPEN|DETERMINATE|INCONSISTENT|INCOMPLETE_SCOPE",
  "semantic_nei_unknown_established": true,
  "nei_query_status": "SAME|DISTINCT|UNKNOWN|INCOMPLETE_AUTHORITY|NO_ADMISSIBLE_MODEL"
}
```

Booleans shown in the schema are placeholders for type, not expected values.

Apply the specifications exactly. In particular:

- preserve represented sharing/distinctness among unknowns;
- semantic admissibility follows qualified authority, not stale solver/cache state;
- semantic unresolvedness is a positive covered statement and is not incomplete computation;
- refinement preserves governing authority while narrowing the realization family;
- equal information scalars do not replace structural comparison;
- QUI does not establish actual-value equality or natural identity;
- semantic NEI UNKNOWN is a positive qualified result requiring admissible SAME and DISTINCT models under one pinned identity profile/QU/evidence context;
- when a natural-identity query is posed but required identity law/profile or query anchor is absent, fail incomplete rather than guessing;
- a desired downstream result cannot choose the QU restriction or identity premise used to prove itself.
