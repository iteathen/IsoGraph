# Core 0.18 Qualification Authority — 2026-09-25

**Status:** qualified cumulative Core clarification  
**Base Core authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Qualified clarification artifact:** `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`  
**Qualification evidence:** `experiments/017/EXPERIMENT_017_FINAL_QUALIFICATION_REVIEW.md`

Core 0.18 is qualified as a cumulative clarification layer over Core 0.17 at the exact tested semantic bytes.

The historical `_CANDIDATE` filename is retained because those exact bytes were tested. Filename spelling does not determine qualification status.

## Qualified scope

The qualification establishes the observation-first discrepancy clarification introduced by Core 0.18:

- discrepancy is initially observation, not defect;
- semantic quantity/predicate/scope alignment precedes direct value-conflict judgment;
- repair follows authoritative defect localization and does not erase a separately surviving discovery lead;
- hidden distinction and hidden scoped equivalence remain competing structural explanations until evidence separates them;
- unresolved potentially load-bearing distinctions are not projection permission;
- scoped equivalence does not silently become global identity;
- dependency invalidation may propagate through exact provenance;
- exact mechanical corruption retains a bounded fast-repair path;
- observation-first investigation is proportional and need not be exhaustive.

## Evidence

Primary semantic qualification run:

```text
workflow run:       36175838410
frozen SHA:         8439b49cf8836eb2748c1c1cb401de28f0181211
model:              gemini-3.5-flash
case coverage:      12 / 12 PASS
mismatches:         0
scoring guards:     all true
API attempts:       1
HTTP status:        200
formal disposition: QUALIFIES
```

Primary packet SHA-256:

`09ddcf7a093b26e28598eeed77b7d03cb6a1266c87082bd785a043518cd0d5d0`

Primary report SHA-256:

`45c81a291a84daa1eecde0f0612742c3f33b480eb831ca7f80126d1fa69b1548`

A later accidental trigger produced provider-only HTTP 503 failure and no semantic report. It has no semantic disposition and is preserved as infrastructure evidence.

## Authority rule

Current effective Core authority is:

```text
Core 0.17 qualified base
    +
Core 0.18 qualified observation-first clarification
```

Core 0.18 does not retroactively rewrite historical Core qualification artifacts.

A future mechanically consolidated Core 0.18 file may be produced for convenience, but consolidation is not required for the qualified cumulative semantics.
