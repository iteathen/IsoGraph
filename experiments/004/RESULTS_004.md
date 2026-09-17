# IsoGraph Experiment 004 — Results / Qualification Ledger

**Status:** consolidated Draft 0.15 authority frozen; all current prompt, fixture, and scorer artifacts constructed; isolated qualification has not started.

## Current semantic authority

```text
../../CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md
```

The source Draft 0.13/0.14/0.15 documents remain historical provenance and rationale. Current cold agents use the consolidated authority unless a specific historical experiment explicitly says otherwise.

Current execution authority:

```text
COLD_RUN_MANIFEST_004_V3.md
```

Pre-0.15 cold prompts/manifests remain historical protocols and are not current evidence.

## Frozen target inventory

Original target identities remain unchanged:

```text
Q004-01  scope occurrence multiplicity
Q004-02  rewrite occurrence/multiset add-remove semantics
Q004-03  identical successor / distinct rewrite events
Q004-04  nested-boundary non-flattening
Q004-05  variable ownership / aliasing / repeated-variable / NAC binding
Q004-06  reference hygiene + repeated-use multiplicity
Q004-07  structural/stable-label namespace collision
Q004-08  same quantified body / different domain-generator
Q004-09  semantic D round trip versus source-copy/residual cheat
Q004-10  independent factorization/extraction freeze before pairing
Q004-11  strong versus weak embedding under frozen relation signature
Q004-12  complete common-core/residual/cut/excluded/projected accounting
Q004-13  multiple automorphism/mapping witnesses
Q004-14  certified negative versus incomplete-search no-witness
Q004-15  index/fingerprint invariant under multiple views
Q004-16  vacuous-class negative + large structured-parameter positive
Q004-17  native policy/witness/result base self-representation
Q004-18  unresolved source-interpretation alternatives
Q004-19  structurally novel class induction with no registry label
Q004-20  structural-only retrieval versus label-assisted retrieval
```

Draft 0.15 adds, without renumbering the original set:

```text
Q004-17B  current native-record successor pressure
Q004-S01  reference-binding placement / arity preservation
Q004-S02  rule-side splice versus nested-scope construction
Q004-S03  declarative variable ownership
Q004-S04  two-stage D-local versus pairwise residual reconstruction
Q004-S05  fingerprint validity across factorization stages
Q004-S06  infix parse determinism / ambiguous-chain rejection
Q004-S07  first-class NAC object versus matcher evaluation
Q004-S08  canonical serializer/index algorithm scoping
```

## Construction checkpoint

Author-side construction status:

```text
original frozen targets:                         20
original native/synthetic fixtures:              20
original hidden scorer coverage:                 20 targets
Draft 0.15-compatible original fixtures:         19 directly reusable
Q004-17 preserved base fixture:                   1
current prompts for all original run groups:      complete
Q004-17B successor fixture/prompt/assertions:      complete
supplemental targets:                              8
supplemental native fixture sets:                  8 complete
supplemental hidden scorer assertion sets:         8 complete
supplemental cold prompts:                         8 complete
current execution manifest:                        V3 frozen
current-authority isolated cold runs accepted:     0
post-unblind scored runs:                          0
independent verifier runs accepted:                0
```

New Draft 0.15 native fixtures use `.isg`; historical `.axh` fixtures remain unchanged. The extension is non-semantic and documented in `../../NATIVE_FORMAT.md`.

## Current prompt revisions

Reusable original targets now have versioned current prompts that cite only the consolidated Draft 0.15 semantic authority plus exact case-specific files. Frozen pre-0.15 prompts were not edited.

Current prompt set:

```text
COLD_PHASE_A_PROMPT_004_DRAFT_0_15.md
COLD_PHASE_B_REWRITE_PROMPT_004_DRAFT_0_15.md
COLD_PHASE_C_PROMPT_004_DRAFT_0_15.md
COLD_PHASE_C_NEGATIVE_INDEX_PROMPT_004_DRAFT_0_15.md
COLD_Q004_09_PROMPT_DRAFT_0_15.md
COLD_Q004_10_PROMPT_DRAFT_0_15.md
COLD_Q004_16_PROMPT_DRAFT_0_15.md
COLD_Q004_17_PROMPT_DRAFT_0_15.md
COLD_Q004_18_PROMPT_DRAFT_0_15.md
COLD_Q004_19_PROMPT_DRAFT_0_15.md
COLD_Q004_20_STRUCTURE_ONLY_PROMPT_DRAFT_0_15.md
COLD_Q004_20_LABEL_ASSISTED_PROMPT_DRAFT_0_15.md
```

Q004-17B and S01..S08 have their own current prompts listed in `COLD_RUN_MANIFEST_004_V3.md`.

## Evidence-isolation status

This construction context has seen specification history, author audits, supplemental plans, and scorer assertions. It is therefore **not eligible to produce cold qualification outputs**.

Current construction artifacts are ready for fresh isolated contexts with exact permitted-input enforcement. Any output generated in a context that has observed hidden assertions or expected results is contaminated and cannot be counted.

## Claims currently allowed

Only construction/status claims are allowed:

- consolidated Draft 0.15 exists as one self-contained current authority;
- current prompt successors exist without overwriting historical cold protocols;
- Q004-17B exists as a separate current native-record successor rather than an expansion of frozen Q004-17 assertions;
- Q004-S01..Q004-S08 now have native fixtures, hidden scorer assertions, and isolated prompts;
- new current native fixtures use the `.isg` project convention;
- no current-authority isolated decoder/verifier result has yet been accepted.

## Claims not yet allowed

Experiment 004 does **not** yet establish that:

- a fresh decoder reconstructs consolidated Draft 0.15 correctly;
- the accepted Draft 0.15 corrections are sufficient or unambiguous;
- rewrite/reference/namespace/quantifier/infix/NAC semantics qualify;
- source-local and pairwise residuals are reliably separated by fresh agents;
- factorization-stage index invariants are used safely;
- common-core/embedding/index distinctions are reconstructed correctly;
- native policy/witness/result self-representation satisfies E1NR;
- source ambiguity is preserved by isolated decoders;
- novel-class induction behaves correctly;
- any candidate structural class is qualified;
- structural-only retrieval achieves useful corpus-scale recall;
- the current specification requires no further correction.

## Next execution seam

```text
all current artifacts frozen
-> dispatch S01 / S02 / S03 / S06 / S07 in fresh isolated contexts
-> freeze each raw output
-> dispatch S04 / S05 / S08
-> dispatch reusable original-target runs + Q004-17B in independent fresh contexts
-> freeze every output before scorer access
-> unblind and score
-> classify every discrepancy before repair
-> independently verify positive mappings/certificates and claimed negatives
-> only then consider specification mutation
```

If a disconnect occurs, re-fetch the live branch and inspect every commit after the last known checkpoint before continuing.
