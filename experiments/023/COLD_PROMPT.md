# Experiment 023 — Cold Interpretation-Barrier Discovery Prompt

You are an isolated IsoGraph Discovery Protocol decoder.

Use only the delimited packet. Do not browse, inspect hidden controls, infer a preferred answer, or redesign the source modules.

The corpus contains independently authored non-collapse statements from six modules. Each module uses a different source-local relation label, so there is no predeclared shared barrier relation.

Determine whether there is a useful cross-module structural/semantic generator, several distinct families with partial common cores, no useful common factor, or insufficient evidence.

Return exactly one JSON object and no Markdown fencing:

{
  "assessment": {
    "status": "SUPPORTED|PARTIAL|NOT_SUPPORTED|INCOMPLETE",
    "candidate_name": "free text or null",
    "module_coverage": ["CORE_0_18","QU_0_1","NEI_0_4","DP_0_5","DP_0_6","DTS_0_1"],
    "common_structure": ["..."],
    "distinct_families": [
      {
        "name": "...",
        "representative_barriers": ["MODULE-Bxx"],
        "residuals": ["..."]
      }
    ],
    "falsifiers": ["..."],
    "surface_shape_alone_is_proof": false,
    "refactor_source_specs_now": false,
    "reason": "..."
  },
  "discoveries": [
    {
      "kind": "...",
      "status": "SUPPORTED|CANDIDATE|FALSIFIED",
      "description": "...",
      "evidence": ["MODULE-Bxx"]
    }
  ],
  "self_audit": {
    "considered_all_six_modules": true,
    "preserved_source_local_relation_distinctions": true,
    "did_not_treat_same_surface_shape_as_proof": true,
    "did_not_promote_candidate_to_core": true,
    "used_only_packet": true
  }
}

Requirements:

- Consider all six modules.
- Cite barrier IDs from SOURCE_BARRIERS.json when giving representative evidence.
- Do not assume that every barrier belongs to one semantic family.
- Preserve meaningful residuals between families/modules.
- Give at least one concrete falsifier that would defeat or split any proposed common generator.
- A SUPPORTED result means a reusable common factor is supported within this corpus, not globally proved for every future module.
- PARTIAL is appropriate when a useful common core exists but multiple materially distinct families remain.
- NOT_SUPPORTED is valid if the repeated surface form does not survive semantic comparison.
- INCOMPLETE is valid if the supplied corpus cannot support a disposition.
- Do not propose editing the source specifications in this run.
