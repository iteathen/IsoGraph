# Surviving Branch Reconciliation Review

**Integration branch:** `integration/surviving-branch-review`  
**Reviewed source branches:**

- `experiment/004-gemini-cold-bulk` at `2ffabf30964b09b0eb6f5ef10f490a6ff80a28b8`
- `spec/draft-0-17-semantic-identity-nei` at `5c12b233dd904436fd0817d72a05e3bd2f1dc7f8`

This review records what was integrated, what was intentionally not integrated, and why. The source branches are historical evidence, not authority.

## Experiment 004 branch

### Integrated

The complete unique Claude/manual evidence chain was copied without semantic alteration into:

`experiments/004/cold-results/claude/`

This includes:

- RUN-A raw fragment, evidence status, and scoring;
- RUN-S01 cold report and scoring;
- RUN-S02 cold report and scoring;
- RUN-S03 cold report and scoring;
- RUN-S06 cold report and scoring.

The branch's reusable direct Gemini helper was retained only as a historical reproducer at:

`experiments/004/tools/historical/run-gemini-cold-draft-0-15.mjs`

A warning header marks it as non-current infrastructure.

### Not integrated

The five branch workflows were deliberately excluded:

- `.github/workflows/experiment-004-gemini-cold-bulk.yml`
- `.github/workflows/experiment-004-gemini-cold-bulk-v2.yml`
- `.github/workflows/experiment-004-gemini-cold-bulk-v3.yml`
- `.github/workflows/experiment-004-freeze-gemini-evidence.yml`
- `.github/workflows/experiment-004-freeze-gemini-evidence-v2.yml`

Reasons:

1. the cold-bulk workflows use retained `upload-artifact` storage with 30-day retention and no run-owned cleanup, which conflicts with the current Actions storage policy;
2. the freeze workflows are one-off self-modifying branch machinery rather than reusable current infrastructure;
3. all target the frozen Draft 0.15 Experiment 004 campaign, which is already complete and must not be silently rerun as current qualification;
4. the intended Gemini evidence bundle was never committed by these branch commits, so there is no missing committed evidence to reconstruct from the workflow payloads.

The current Experiment 004 qualified disposition remains unchanged.

## Draft 0.17 / NEI branch

### Integrated

The branch's unique design audit is preserved as:

`research/nei/NEI_DESIGN_AUDIT_0_1_SUPERSEDED.md`

It is explicitly marked superseded so its historical reasoning remains available without being mistaken for current NEI semantics.

### Not integrated

The branch versions of these files were deliberately not merged over current `main`:

- `CORE_SPEC_DRAFT_0_17_CANDIDATE.md`
- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_CANDIDATE.md`
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`
- `extensions/nei/NEI_NATIVE_VOCAB_0_1.md`
- `extensions/nei/NEI_VOCAB_0_1.isg`
- `tools/build-draft-0-17.mjs`
- `.github/workflows/build-draft-0-17.yml`

The core reason is semantic, not merely merge conflict.

That branch's NEI design selects maximally coarse admissible identity partitions as an entropic preference. Current NEI 0.1 explicitly rejects that rule because it can infer positive `SAME` from the absence of evidence for `DISTINCT`. Current `main` instead requires positive qualified identity evidence and uses QU for unresolved identity-relevant structure.

The branch also couples its older NEI model to an obsolete Draft 0.17 construction path. Current `main` already contains the qualified Draft 0.17 SI correction and the later rewritten NEI 0.1/0.2 candidates.

Overwriting current files with the branch versions would therefore regress semantics.

## Disposition

The two source branches have now been reconciled as follows:

```text
unique durable evidence/research
    -> integrated

obsolete execution machinery
    -> not integrated

superseded normative semantics
    -> not integrated as authority

historically useful rejected design
    -> archived with explicit superseded status
```

After this integration is merged and verified, neither source branch is required as the only owner of durable information.
