# Experiment 062 W Cold-Audit Successor 0.4

**Status:** G1 source-completeness re-audit; not primitive authority  
**Date:** 2026-10-06

## Frozen semantic input

This successor audits `experiments/062/W_EXTRACTION_RECONCILED_0_3.json`, produced only after source-local adjudication of the complete seven-batch diagnostic audit in `W_FULL_AUDIT_LEAD_ADJUDICATION_0_1.json`.

The unresolved W corpus remains the same 84 frozen bodies in `SOURCE_DEMAND_CENSUS_0_1.json`.

## Mandatory preflight

Before any cold-audit call, run:

`node experiments/062/tools/verify-w-extraction-reconciled-0-3.mjs`

Failure blocks the audit.

## Audit contract

The audit semantics, batching, exact-span rules, forbidden candidate/category labels, and bounded provider retry policy are unchanged from the 0.3 transport successor.

The auditor must still return one row for every frozen W body. Batch-local output defects are retained diagnostically and make the merged validation fail.

## Authority boundary

A successful run may establish only evidence about G1 source completeness. It does not authorize G2 quotienting unless every correction lead is source-locally resolved and a fully valid successor census is frozen. It does not authorize primitive selection, W closure, recursive IA, NEI, DTS, DP, or cross-track semantic matching.
