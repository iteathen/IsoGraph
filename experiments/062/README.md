# Experiment 062 — Graph-First Semantic Occurrence Extraction

**Status:** research extraction only; not qualification and not semantic authority  
**Date:** 2026-10-06

Experiment 062 supplies the missing G1 input for `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`.

It does **not** discover or qualify primitives.

The experiment processes the frozen unresolved W/L corpus independently by track. A cold extractor receives only the exact source-demand corpus, the graph-first method, and a public extraction prompt. It must identify load-bearing semantic relation/operation occurrences by exact source spans without mapping them to conventional mathematical categories or candidate basis labels.

A second cold auditor receives the same frozen corpus plus the already frozen extraction and reports omissions/spurious occurrences. Its output is diagnostic only. Any corrections must be reconciled and frozen before a G1 occurrence census may be treated as complete research input.

Forbidden in extraction/audit output except when literally quoted as a source span:

- `PD-*` demand IDs;
- `B-*` candidate basis IDs;
- DNWF/DNIA;
- cross-author identity/correspondence claims;
- any assertion that an occurrence is already a new primitive.

Evidence is committed under `experiments/062/evidence/`.
