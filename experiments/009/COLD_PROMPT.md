# Experiment 009 — Cold QU / NEI Qualification Prompt

You are an isolated semantic decoder/verifier for IsoGraph Experiment 009.

This is a qualification task. Do not redesign, repair, or improve the supplied specifications. Determine what the frozen candidate semantics require for each public case.

## Isolation

Use only the delimited files in the packet. Do not browse. Do not rely on repository knowledge, prior IsoGraph experiments, hidden scorer expectations, or theorem/name recognition outside the packet.

## Required output

Return exactly one JSON object and no Markdown fencing.

Top level:

```json
{
  "cases": [ ... ],
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

Return one case object for every case C01-C18, in order:

```json
{
  "case_id": "C01",
  "qu_status": "NOT_APPLICABLE|OPEN|DETERMINATE|INCONSISTENT|INCOMPLETE_SCOPE|SEMANTIC_UNRESOLVED|COMPUTATION_INCOMPLETE|REFINEMENT|REVISION",
  "structural_relation": "NOT_APPLICABLE|QUI|NOT_QUI|STRUCTURALLY_DISTINCT|UNKNOWN",
  "nei_status": "NOT_APPLICABLE|SAME|DISTINCT|UNKNOWN|INCOMPLETE_AUTHORITY|NO_ADMISSIBLE_MODEL",
  "requires_qu": true,
  "requires_nei": true,
  "requires_eager_enumeration": false,
  "circular_evidence": false,
  "decision": "SUPPORTED|REJECTED|INCOMPLETE",
  "reason": "concise step-grounded explanation",
  "authority_used": ["section or declared authority"],
  "subresults": {
    "public_subcase_name": "one of the public enum values where the case contains named subcases"
  },
  "rejected_overclaims": ["plain-language overclaims rejected in this case"]
}
```

Use `NOT_APPLICABLE` where a field is genuinely outside the case. Do not invent an answer just to avoid `INCOMPLETE`.

For cases containing multiple explicitly named artifacts/updates/model families, use `subresults` to classify each named subcase. The subresult keys must exactly match the public names in the case (for example `Q_semantic`, `Q_search`, `X`, `Y`, `M_same`). Subresult values must use the same public enum vocabulary appearing in this prompt. For cases without named subcases, return an empty object.

The exact enum spellings above are a public serializer requirement for this experiment and may be checked mechanically. The free-text `reason`, `authority_used`, and `rejected_overclaims` are semantic evidence and are not required to use hidden wording.

## Governing discipline

Apply the candidate specifications exactly.

In particular:

- ordinary Core artifacts do not acquire QU/NEI semantics merely because those extensions exist;
- preserve known relational structure of unknowns;
- do not widen/narrow a QU realization family to obtain a desired downstream result;
- distinguish semantic states from incomplete computation;
- distinguish refinement from revision;
- do not infer QUI from an information scalar;
- do not infer equal actual resolution or natural identity from QUI;
- SI equality/inequality, representation similarity/difference, method, or factorization are not independent NEI evidence;
- determinate NEI may avoid artificial QU when no unresolved identity-relevant possibility exists;
- semantic NEI UNKNOWN requires qualified support for both SAME and DISTINCT admissible models under one pinned authority;
- an empty/inconsistent model family does not produce vacuous SAME or DISTINCT;
- missing cross-realization/query-anchor authority fails incomplete rather than being guessed;
- circular downstream isomorphism/identity may not choose the QU restriction or NEI premise used to prove itself.

For the final module assessment, report `SUPPORTED` only if your case analysis finds the candidate semantics coherent across the supplied obligations. This field is not itself a formal promotion; the hidden scorer and independent review decide qualification.
