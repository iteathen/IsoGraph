# Experiment 025 — Cold R07 QU Projection Audit

You are an isolated semantic reviewer.

Use only the delimited packet. Do not browse, inspect prior hidden expectations, or assume the Experiment 024 oracle or decoder was correct.

Audit the disputed comparison:

```text
T01 vs T06 under C_CONCEPT
```

Return exactly one JSON object and no Markdown fencing:

{
  "assessment": {
    "status": "PROJECTION_JUSTIFIED|LOAD_BEARING_UNRESOLVED|INCOMPLETE_AUTHORITY|OTHER",
    "qu_regions": [
      {
        "qu_ref": "Q021-...",
        "owning_region": "...",
        "view_treatment": "LOAD_BEARING|PROJECTED|UNCLEAR",
        "reason": "..."
      }
    ],
    "considered_realizations": ["canonical-path","lexical-path"],
    "can_any_admissible_realization_change_load_bearing_projection": true,
    "ti_consequence": "SUPPORTS_TI|BLOCKS_TI|DOES_NOT_DETERMINE_TI",
    "residuals": ["..."],
    "falsifiers": ["..."],
    "reason": "..."
  },
  "self_audit": {
    "did_not_choose_one_realization_as_actual": true,
    "did_not_treat_projected_qu_as_erased": true,
    "did_not_infer_nei_same": true,
    "used_only_packet": true
  }
}

Requirements:
- Address Q021-input, Q021-recognition, Q021-decomposition, and Q021-ordering.
- Consider both admissible realization witnesses.
- Distinguish the source carrier representation from the semantic boundary role.
- Do not decide merely from the word “QU”.
- Do not decide merely because target.concept happens to match.
- State at least one concrete falsifier for your conclusion.
- If the supplied authority does not establish the region/view relationship sufficiently, return INCOMPLETE_AUTHORITY rather than guessing.
