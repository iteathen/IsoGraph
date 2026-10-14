# Experiment 062 W Batched Audit Successor 0.2

**Status:** transport/diagnostic successor only; not semantic authority  
**Date:** 2026-10-06

## Purpose

The 0.1 batched W audit reached batch 2 and then terminated because one auditor omission string for W-SSC-048 was not an exact source substring. The semantic audit target remains unchanged.

This successor changes only failure handling:

- every frozen W batch is still independently audited;
- every batch is still validated against exact source spans and extraction occurrence IDs;
- a batch-local validation defect is preserved and marked;
- later batches continue so the full 84-body diagnostic surface is collected;
- the merged audit is still globally invalid if any batch validation fails.

No invalid row is repaired automatically and no correction suggestion is admitted automatically.

## Frozen inputs

- `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json`
- `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`
- `experiments/062/W_EXTRACTION_RECONCILED_0_2.json`

## Authority boundary

This successor produces diagnostic evidence only. Any proposed omission/spurious-boundary correction must be adjudicated against the frozen source body and reconciled explicitly before a G1 W occurrence census can be frozen as complete.

Batch boundaries and validation failures have no semantic meaning and cannot enter G2/G3/G4 quotienting or candidate primitive synthesis.
