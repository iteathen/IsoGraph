# Experiment 062 W Batched Audit Successor 0.3

**Status:** provider-transport successor only; not semantic authority  
**Date:** 2026-10-06

## Reason

The 0.2 successor failed before the first semantic audit batch because the external cold-audit provider returned HTTP 503 `UNAVAILABLE`. No W audit result was produced by that run.

## Change

The audit runner now retries only transient provider/transport failures:

- HTTP 429, 500, 502, 503, or 504;
- timeout/network/fetch failures.

The retry sequence is bounded and preserves the exact same request packet for the affected batch. No corpus, extraction, prompt, batch partition, semantic rule, or validation rule changes between attempts.

Non-transient failures still terminate immediately.

## Frozen semantic inputs

- `research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json`
- `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`
- `experiments/062/W_EXTRACTION_RECONCILED_0_2.json`

## Authority boundary

This remains diagnostic research evidence only. Provider retries do not create independent semantic evidence; they only attempt to obtain the same already-declared cold audit response. No audit suggestion is admitted without source-local adjudication and reconciliation.
