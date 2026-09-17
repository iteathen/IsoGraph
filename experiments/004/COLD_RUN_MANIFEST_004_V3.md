# Experiment 004 — Cold-Run Manifest V3 — Consolidated Draft 0.15

**Status:** current execution manifest; construction/freeze in progress  
**Supersedes for future execution:** `COLD_RUN_MANIFEST_004.md` and `COLD_RUN_MANIFEST_004_V2.md`  
**Current semantic authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

The older manifests and prompts remain historical protocols. They are not edited or executed as current qualification evidence.

## Global isolation rule

Each cold run starts in a genuinely fresh context that has not seen scorer assertions, author audits, prior cold outputs, expected mappings/results, external-review reports/dispositions, prohibited registry/catalog material, or human gloss identifying intended analogies.

A cold agent reads only the exact files named by its current Draft 0.15 prompt. The output is frozen/committed before scorer assertions are opened.

A run contaminated by prior access is not cold evidence and must be rerun.

## Reused original-target runs

```text
RUN-A    COLD_PHASE_A_PROMPT_004_DRAFT_0_15.md
         Q004-01 Q004-04 Q004-05 Q004-06 Q004-07 Q004-08
         hidden: PHASE_A_ASSERTIONS_004.json

RUN-B    COLD_PHASE_B_REWRITE_PROMPT_004_DRAFT_0_15.md
         Q004-02 Q004-03
         hidden: PHASE_B_REWRITE_ASSERTIONS_004.json

RUN-C1   COLD_PHASE_C_PROMPT_004_DRAFT_0_15.md
         Q004-11 Q004-12 Q004-13
         hidden: PHASE_C_ASSERTIONS_004.json

RUN-C2   COLD_PHASE_C_NEGATIVE_INDEX_PROMPT_004_DRAFT_0_15.md
         Q004-14 Q004-15
         hidden: PHASE_C_NEGATIVE_INDEX_ASSERTIONS_004.json

RUN-D09  COLD_Q004_09_PROMPT_DRAFT_0_15.md
         Q004-09
         hidden: Q004_09_ASSERTIONS_004.json

RUN-D10  COLD_Q004_10_PROMPT_DRAFT_0_15.md
         Q004-10
         hidden: Q004_10_ASSERTIONS_004.json

RUN-D16  COLD_Q004_16_PROMPT_DRAFT_0_15.md
         Q004-16
         hidden: Q004_16_ASSERTIONS_004.json

RUN-D17  COLD_Q004_17_PROMPT_DRAFT_0_15.md
         Q004-17 base fixture only
         hidden: Q004_17_ASSERTIONS_004.json

RUN-D18  COLD_Q004_18_PROMPT_DRAFT_0_15.md
         Q004-18
         hidden: Q004_18_ASSERTIONS_004.json

RUN-D19  COLD_Q004_19_PROMPT_DRAFT_0_15.md
         Q004-19
         hidden: Q004_19_ASSERTIONS_004.json

RUN-D20S COLD_Q004_20_STRUCTURE_ONLY_PROMPT_DRAFT_0_15.md
         Q004-20 structural-only channel
         hidden: Q004_20_ASSERTIONS_004.json
         forbidden cold: Q004_20_LABEL_ASSIST_004.axh

RUN-D20L COLD_Q004_20_LABEL_ASSISTED_PROMPT_DRAFT_0_15.md
         Q004-20 assisted channel
         hidden: Q004_20_ASSERTIONS_004.json
```

## Required successor and supplemental runs

Q004-17B is a current native-record successor/addendum. It does not rewrite Q004-17.

Q004-S01..Q004-S08 are additional frozen controls. Their fixtures/assertions/prompts are versioned separately and will be listed here only after each set is constructed and frozen.

## Freeze / unblind procedure

For every run:

```text
fresh isolated context
-> read only prompt-permitted files
-> produce complete raw report
-> record ambiguities/difficulties
-> freeze/commit report
-> only then open hidden assertion file
-> score exact agreements/disagreements
-> classify every discrepancy
-> commit post-unblind review separately
```

Never edit a frozen cold output to agree with the scorer.

## Discrepancy classes

Use at least:

```text
parser/serialization defect
semantic/specification ambiguity
representation expressiveness defect
protocol/fixture defect
decoder/search implementation error
information-isolation failure
namespace/identity error
reference/binder error
rewrite/event error
factorization/extraction leakage
comparison-policy leakage
witness/accounting error
verification error
index/search incompleteness
class-schema vacuity/overfit
source-ambiguity handling error
intended behavior / scorer defect
resource limit
non-defect / reviewer misunderstanding
```

## Current completion condition

Experiment 004 reaches its first current-authority qualification checkpoint only after:

- all reusable original-target runs above have isolated outputs and post-freeze scoring;
- Q004-17B has been executed/scored;
- Q004-S01..Q004-S08 have been executed/scored;
- every discrepancy is classified before specification repair;
- positive witnesses/certificates and claimed negatives/optimality are independently verified where applicable.

Fixture construction alone is not qualification evidence.
