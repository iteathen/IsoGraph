# Experiment 049 cold prompt

Evaluate D01..D24 using only the supplied packet. The cases intentionally do not reveal whether the correct outcome is a defect, clue, both, or neither.

Return exactly one JSON object and no Markdown.

Schema:
{
  "cases": [
    {
      "case_id": "D01",
      "answers": { "...": "use exactly the required fields for this case" },
      "reason": "brief but substantive",
      "authority_used": ["specific supplied authority"]
    }
  ],
  "module_assessment": {"dp_0_8": "SUPPORTED" | "UNSUPPORTED"},
  "self_audit": {
    "used_only_packet": true,
    "did_not_privilege_expected_or_trusted_side": true,
    "kept_repair_and_discovery_dispositions_independent": true,
    "preserved_qu_when_load_bearing": true,
    "did_not_infer_nei_same_from_absence_of_difference": true,
    "did_not_promote_useful_view_to_core_without_need": true
  }
}

Use the DP 0.8 bookkeeping labels exactly where a disposition field asks for one.
Do not call an observation a defect before locating a violated contract and owner.
Keep repair disposition separate from discovery disposition.
