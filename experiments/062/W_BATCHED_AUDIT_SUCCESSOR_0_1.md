# Experiment 062 W Batched Audit Successor

**Status:** transport/validation successor only; not semantic authority  
**Date:** 2026-10-06

## Frozen semantic target

This successor does not alter the Experiment 062 G1 task.

It audits:

- `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json`;
- `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`;
- `experiments/062/W_EXTRACTION_RECONCILED_0_2.json`.

The W corpus remains the same 84 unresolved frozen bodies.

## Reason for successor

Run `37438595107` returned only five W audit rows although the public contract requires one row for every one of the 84 W census IDs. The five rows were preserved as diagnostic leads and separately adjudicated. They do not establish audit completeness.

The defect is an output/transport defect, not evidence for or against any primitive.

## Successor rule

The audit corpus is partitioned mechanically in source order into fixed-size batches. Each cold call receives only:

1. the unchanged graph-first method;
2. the exact frozen W bodies for that batch;
3. the corresponding frozen extraction rows.

Each batch must return exactly one audit row for every census ID in its input order, including explicit PASS rows. Deterministic validation rejects missing, reordered, duplicate, non-source-literal, or unknown-spurious references. Validated batches are concatenated back into the original 84-item order.

Batch boundaries have no semantic meaning and cannot enter downstream quotient keys.

## Authority boundary

The resulting audit is research evidence only. It may identify omissions, spurious occurrences, or boundary defects in the provisional W occurrence census. Corrections require explicit reconciliation against the frozen source bodies before any W G1 occurrence census can be treated as complete input to G2.

No primitive, schema, cross-track identity, W closure, recursive IA, NEI, DTS, or DP admission is authorized by this successor.
