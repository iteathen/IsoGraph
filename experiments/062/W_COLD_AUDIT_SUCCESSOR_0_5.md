# Experiment 062 W Cold-Audit Successor 0.5

**Status:** G1 source-completeness re-audit; not primitive authority  
**Date:** 2026-10-06

## Frozen semantic input

This successor audits `experiments/062/W_EXTRACTION_RECONCILED_0_4.json`.

The 0.4 occurrence census is the source-local successor to the successful 84-row audit in run `37496395745` attempt 2 and its adjudication `W_SOURCE_COMPLETENESS_REAUDIT_ADJUDICATION_0_1.json`. It contains 84 frozen W bodies and 177 source-conserved semantic occurrences.

The unresolved W corpus remains exactly the same 84 bodies in `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json`.

## Mandatory preflight

Before any cold-audit call, run:

`node experiments/062/tools/verify-w-extraction-reconciled-0-4.mjs`

Failure blocks the audit.

## Audit contract

The semantic task is unchanged:

- audit every frozen W body independently against its 0.4 occurrence extraction;
- return exactly one PASS or CORRECTION_REQUIRED row for every census ID in source order;
- report only omitted load-bearing non-Core operations/relations, spurious extracted occurrences, or source-local semantic-boundary loss;
- use exact contiguous source spans;
- do not import textbook definitions or conventional mathematical categories;
- do not emit candidate primitive/basis labels or infer W/L correspondences.

Provider retry behavior is transport only and has no semantic effect.

## Authority boundary

A clean all-PASS run can establish only G1 source-completeness evidence for the W track. It does not itself authorize primitive selection, W closure, recursive IA, NEI, DTS, DP, or cross-track semantic matching. Progress beyond G1 must still follow the G2–G7 order in `PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`.
