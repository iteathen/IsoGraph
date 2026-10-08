# Experiment 062 L Batched Audit Successor 0.2

**Status:** G1 source-completeness re-audit; not primitive authority  
**Date:** 2026-10-06

## Reason

The first L semantic audit captured only the 32 rows that required correction. Its validator correctly rejected the result because the G1 audit contract requires one explicit PASS or CORRECTION_REQUIRED row for all 151 frozen L bodies.

This successor changes only the audit transport/response contract:

- audit the same frozen `SOURCE_DEMAND_CENSUS_0_1.json`;
- audit the same frozen `L_EXTRACTION_RECONCILED_0_1.json`;
- use the same `PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`;
- require exactly one row per census item in every bounded batch, including PASS rows;
- validate batch order, exact omission spans, spurious occurrence IDs, and forbidden candidate/category labels;
- fail the merged audit if any batch is incomplete or malformed.

No semantic occurrence, primitive candidate, quotient class, or source-track closure is added by this successor.

## Mandatory preflight

`node experiments/062/tools/verify-l-reconciled-extraction.mjs`

## Authority boundary

A successful batched audit establishes only diagnostic evidence about G1 source completeness. Corrections must still be source-locally adjudicated and reconciled into a new frozen L occurrence census before G2. It does not authorize G2 quotienting, primitive selection, L closure, recursive IA, NEI, DTS, DP, or cross-track matching.
