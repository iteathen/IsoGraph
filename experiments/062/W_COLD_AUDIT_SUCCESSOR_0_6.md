# Experiment 062 W Cold-Audit Successor 0.6

**Status:** G1 source-completeness re-audit; not primitive authority  
**Date:** 2026-10-06

## Frozen semantic input

This successor audits `experiments/062/W_EXTRACTION_RECONCILED_0_5.json`.

The 0.5 occurrence census is a **mechanical source-span-enclosure repair only** of `W_EXTRACTION_RECONCILED_0_4.json`, governed by:

- `experiments/062/G1_SOURCE_SPAN_ENCLOSURE_AUDIT_0_1.json`;
- `experiments/062/W_EXTRACTION_RECONCILIATION_0_5.json`.

Exactly one W occurrence changed its `source_span`: `W-SSC-119-O02`. Its relation span, argument spans, logical force, definition status, dependencies, load-bearing note, item order, occurrence order, and total occurrence count are unchanged.

The unresolved W corpus remains exactly the same 84 bodies in `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json`.

## Why a new cold audit is required

The historical W G1 completeness record was pinned to a predecessor extraction hash. The 0.5 repair therefore supersedes that hash even though the semantic occurrence census is unchanged.

Under `PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`, G2 remains blocked until the repaired 0.5 input receives:

1. deterministic successor verification; and
2. an independent all-84 source-completeness cold audit.

## Mandatory preflight

Before any cold-audit call, run:

`node experiments/062/tools/verify-w-extraction-reconciled-0-5.mjs`

Failure blocks the audit.

## Audit contract

The semantic task is unchanged from successor 0.5:

- audit every frozen W body independently against its 0.5 occurrence extraction;
- return exactly one PASS or CORRECTION_REQUIRED row for every census ID in source order;
- report only omitted load-bearing non-Core operations/relations, spurious extracted occurrences, or source-local semantic-boundary loss;
- use exact contiguous source spans;
- do not import textbook definitions or conventional mathematical categories;
- do not emit candidate primitive/basis labels or infer W/L correspondences.

Provider retry behavior is transport only and has no semantic effect.

## Authority boundary

A clean all-PASS run can establish only G1 source-completeness evidence for the repaired W track. It does not authorize primitive selection, W closure, recursive IA, NEI, DTS, DP, or cross-track semantic matching.

Joint G2 remains blocked until the independently repaired L G1 input also satisfies its own deterministic verification and cold completeness gate.
