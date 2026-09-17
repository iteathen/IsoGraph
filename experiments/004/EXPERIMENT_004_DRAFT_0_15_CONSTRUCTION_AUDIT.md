# Experiment 004 — Draft 0.15 Construction Audit

**Audit type:** author-side construction/integrity review; not cold qualification evidence  
**Semantic authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`  
**Construction base:** `5ca94c6e607f86f03920bf4206ed72e315466a87`  
**Frozen corpus checkpoint reviewed:** `33e16fc4377566125856a65eab7d1524a18b5d6f`

## Purpose

This audit verifies that the current Experiment 004 corpus is ready to be handed to genuinely fresh isolated agents. It does not execute or score any cold case.

The author/construction context has observed hidden scorer assertions and earlier review material and is therefore disqualified from producing accepted cold outputs.

## Integrity findings

The construction branch is a strict descendant of the consolidated-authority main checkpoint and does not rewrite the original frozen Experiment 004 prompts, fixtures, or scorer assertions.

The following were added as versioned successors rather than replacements:

- Draft 0.15 current prompts for every reusable original target run group;
- `COLD_RUN_MANIFEST_004_V3.md`;
- Q004-17B as a separate native-record successor/addendum;
- Q004-S01..Q004-S08 supplemental fixture/assertion/prompt sets;
- `NATIVE_FORMAT.md` and the `.isg` convention for new native-text artifacts.

Historical `.axh` fixtures and pre-0.15 cold prompts remain byte-identical to the construction base. CI pins that invariant to the immutable base commit above.

## Supplemental construction review

### Q004-S01 — reference binding placement

The positive fixture places the binding directive at scope level and uses it twice. The negative fixtures place a binding where its disappearance would make it an ordered-edge/formula operand. The intended boundary is parser/placement validity before structural comparison, not post-hoc semantic repair.

### Q004-S02 — rule-side container/splice

The two cases differ only in direct RHS members versus an explicitly nested scope member. This isolates replacement-container splice semantics from literal nested-scope construction.

### Q004-S03 — declarative variable ownership

The fixture separates an unowned variable in a closed object, an explicitly quantified variable, and a variable owned by a frozen synthetic open-interface declaration. The prompt explicitly states that the test-record role is not a new core operator.

### Q004-S04 — D-local versus pairwise residuals

The pair record includes an explicit A-to-B common-core mapping. Source-local exact-D residuals remain separate records from A/B pair residuals. A separate lossy D record keeps only a loss summary rather than the omitted incidences, preventing accidental full-source reconstruction.

### Q004-S05 — index stage qualification

Raw-stage and factored-stage fingerprint declarations are separate and no cross-stage invariant is supplied. The fixture therefore directly tests that raw mismatch pruning cannot be reused after topology-changing D.

### Q004-S06 — infix determinism

Single `=>`, `==`, and `@@` cases are separated from mixed/chained failures. The `@@` cases bind the abstraction through a legal scope-level reference so the test targets infix multiplicity rather than accidental grouping ambiguity.

### Q004-S07 — NAC evaluation context

The fixtures separate inert represented NAC data, explicit matcher consumption, and a frozen profile that rejects NAC as an ordinary ordered-incidence child. The negative placement case is a profile-validation result, not an ambient query.

### Q004-S08 — serializer/index scoping

Two deterministic algorithms/revisions are represented over the same symmetric isomorphic structures with different legal tie-breaks and hash values. The fixture distinguishes within-algorithm invariance from cross-algorithm compatibility and keeps structural witness multiplicity independent of serializer tie-breaking.

### Q004-17B — current native-record pressure

The successor fixture carries distinct record fields for source-local transform target/residual structure, pair common/A-residual/B-residual structure, index identity/revision/stage information, NAC condition/context/consumer information, and a terminal result linkage. Its stable-label signature closes over every stable label used in the fixture.

This is topology/reconstructability pressure. It does not, by construction alone, establish full E1NR qualification.

## Mechanical checks

Repository `verify` now checks:

- existence/non-emptiness of every current Experiment 004 prompt, fixture, assertion set, manifest, and this audit;
- JSON syntax of Q004-17B and Q004-S01..S08 scorer files with `jq`;
- byte identity of the frozen pre-0.15 Experiment 004 prompts/fixtures/assertions against base commit `5ca94c6e...`;
- manifest/ledger statements that current isolated-run count remains zero;
- ordinary repository authority and patch-hygiene rules.

No general IsoGraph parser is introduced by this audit. Some supplemental files are intentionally invalid parse/placement fixtures, so treating every `.isg` file as required-valid syntax would invalidate the negative test design.

## Qualification status

```text
current semantic authority:                 frozen
current prompts for original target groups: complete
Q004-17B fixture/prompt/assertions:          complete
Q004-S01..Q004-S08 fixture sets:             complete
Q004-S01..Q004-S08 scorer assertions:        complete
Q004-S01..Q004-S08 cold prompts:             complete
current execution manifest:                  V3 frozen
accepted isolated cold outputs:              0
post-unblind scored runs:                     0
independent verifier runs:                    0
```

No semantic qualification claim follows from this construction audit.

## Next seam

The construction context stops here. The next evidence-producing operation must occur in fresh contexts that receive only each prompt's exact permitted input set. Raw outputs are frozen before any hidden scorer material is exposed.
