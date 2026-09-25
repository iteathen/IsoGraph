# Experiment 017 — Core 0.18 Focused Qualification Plan

**Status:** frozen qualification design  
**Candidate:** `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`  
**Base authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Cases:** `experiments/017/CORE_0_18_CASES.md`  
**Cold prompt:** `experiments/017/COLD_PROMPT.md`  
**Hidden assertions:** `experiments/017/hidden/ASSERTIONS.json`  
**Resource target:** one Gemini semantic call

## Claim

Qualify only the semantic clarification introduced by Core 0.18:

- discrepancy is initially observation, not defect;
- semantic quantity/predicate/scope alignment precedes value-conflict judgment;
- repair follows owner localization and does not erase surviving discovery evidence;
- hidden distinction and hidden scoped equivalence are both admissible explanations;
- unknown potentially load-bearing distinctions are not projection permission;
- scoped equivalence does not become global identity;
- dependency invalidation may propagate through exact provenance;
- exact mechanical corruption retains a bounded fast repair path;
- observation-first does not require exhaustive explanation search.

## Cases

C01-C12 cover all Core 0.18 Section 11 qualification targets with paired positive/negative controls.

## Isolation

The cold packet may contain only:
- Core 0.17 qualified base;
- Core 0.18 candidate;
- public C01-C12 holdout;
- public serializer prompt.

It must not contain hidden assertions, scorer, author audit, prior experiment evidence, expected semantic results, repository map, or agent instructions.

## Scoring

Qualification is proposition-specific. Every C01-C12 answer field must match the hidden assertions exactly, with:
- no missing/duplicate/unexpected case;
- nontrivial reasoning;
- nonempty authority provenance;
- cold self-audit true;
- module assessment SUPPORTED.

Any mismatch yields `DOES_NOT_QUALIFY`.

## Resource discipline

One cold semantic call. One provider retry is permitted only for a 5xx infrastructure failure inside the same frozen run. No rerun is permitted to improve semantic output.
