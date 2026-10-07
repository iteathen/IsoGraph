# Experiment 062 W Cold-Audit Successor 0.7

**Status:** current-input independent G1 source-completeness audit contract; not primitive authority  
**Date:** 2026-10-06

## Frozen semantic input

This successor audits exactly:

- `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json` — frozen 84-body W corpus;
- `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md` — governing graph-first procedure;
- `experiments/062/W_EXTRACTION_RECONCILED_0_18.json` — 84 bodies / 425 semantic occurrences;
- `experiments/062/W_G1_COMPLETE_REPEAT_AUDIT_0_1.json` — source-local zero-change fixed-point evidence;
- `experiments/062/tools/verify-w-extraction-reconciled-0-18.mjs` and
  `experiments/062/tools/verify-w-g1-source-local-fixed-point-0-1.mjs` — deterministic preflight guards.

No prior W cold-audit result applies to this semantic input. The historical v6 audit was pinned to W 0.5 / 177 occurrences and is superseded for current G1 completeness.

## Why a fresh independent audit is required

W 0.18 is a **source-local fixed-point candidate only**.

The documented G1 gate still requires a fresh independent all-84 cold audit against the current candidate. A zero-change manual/deterministic repeat does not self-authorize G1 completeness.

A lawful current-input audit must therefore:

1. pass both deterministic W 0.18 preflights;
2. independently inspect every frozen W body against its current occurrence extraction;
3. return exactly one validated row for every W census ID in source order;
4. identify any omitted load-bearing non-Core operation/relation, spurious occurrence, or source-local boundary loss;
5. produce a structurally valid complete all-84 result;
6. reach zero corrections before W G1 may close.

## Audit contract

For each frozen body, compare the supplied W 0.18 extraction **only** against that body.

Report:

- an omitted load-bearing operation/relation occurrence;
- a spurious current occurrence;
- or a semantic boundary that loses an explicit actor/argument/result role, guard, ordering, polarity, modality, dependency, side condition, or source-visible algebraic incidence.

Rules:

- use exact contiguous source spans;
- ordinary logical composition and source-reporting/motivational language are not G1 occurrences by themselves;
- do not import textbook definitions;
- do not infer conventional mathematical categories;
- do not treat a familiar mathematical name as sufficient coverage when the frozen body itself states lower-level behavior that is missing;
- conversely, do not invent lower-level behavior for a familiar name when the frozen body does not state it;
- do not emit PD-*, B-*, DNWF, DNIA, candidate primitive names, or W/L correspondences;
- do not use L as a premise for W;
- return PASS only when the supplied current extraction has no source-local correction for that body.

The output schema remains the validated batch contract:

```json
{
  "track": "W",
  "items": [
    {
      "census_id": "W-SSC-...",
      "status": "PASS | CORRECTION_REQUIRED",
      "omissions": [{"source_span": "...", "reason": "..."}],
      "spurious_occurrence_ids": [],
      "boundary_notes": []
    }
  ],
  "overall": "PASS | CORRECTIONS_REQUIRED"
}
```

A PASS row must carry no correction content. A CORRECTION_REQUIRED row must carry at least one concrete correction lead.

## Provider transport boundary

The latest independent-provider evidence is
`experiments/062/W_G1_REPAIRED_AUDIT_V6_TRANSPORT_BOUNDARY_0_5.json`.

Its attempt 8 received HTTP 429 `RESOURCE_EXHAUSTED` with a provider retry hint of approximately 23 hours 58 minutes 10 seconds after a valid first batch. That is transport evidence only and cannot be reused semantically for W 0.18.

This successor deliberately does **not** trigger another provider call while that explicit retry window is still active. Repeated quota retries are not research progress.

## Authority boundary

Even a clean all-84 PASS under this successor can establish only the W side of G1 completeness for W 0.18.

It does not by itself authorize:

- joint G2;
- G3 Core definability;
- G4 quotienting;
- G5 candidate basis synthesis;
- G6 qualification;
- W source closure;
- recursive implicit assertions;
- NEI, DTS, DP, or cross-track unification.

Joint G2 remains blocked until the current L candidate independently satisfies its own complete zero-correction G1 gate.

## Next lawful action

When the provider-specified quota window has expired, trigger exactly one fresh run of the W 0.18 audit contract. Preserve raw provider output, validation, transport metadata, and any correction leads. If corrections are returned, adjudicate them source-locally and repeat from the new successor; if the complete audit is structurally valid and zero-correction, record W G1 completeness for W 0.18.
