# Experiment 062 L Source-Local Adjudication Successor 0.1

**Status:** G1 audit-lead adjudication research; not primitive authority  
**Date:** 2026-10-06

## Inputs

- frozen 151-body L corpus from `SOURCE_DEMAND_CENSUS_0_1.json`;
- `L_EXTRACTION_RECONCILED_0_1.json`;
- validated 151-row batched audit from run `37502616897`, attempt 2;
- `PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`.

## Purpose

For each of the 101 exact omission leads across 89 correction rows, decide source-locally whether the lead is:

- a genuine missing non-Core semantic occurrence;
- a genuine lead requiring a narrower exact source-local occurrence boundary;
- Core-only/source modality that creates no non-Core G1 occurrence;
- duplicate/spurious relative to the predecessor extraction.

Accepted leads produce exact occurrence candidates only. No candidate is a primitive, quotient class, schema, cross-track correspondence, or source-track closure.

## Guard

A successor L G1 occurrence census may be frozen only after these adjudication candidates receive deterministic exact-span/dependency validation and source-local review.
