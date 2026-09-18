# Experiment 007 — Blind Structural Discovery Holdout

**Status:** frozen holdout construction before execution  
**Frozen DP authority base:** `148ce8216787f92fef42948080898623b3a86d13`  
**Purpose:** provide fresh blind evidence for current DP 0.4 after the Experiment 006 oracle became known to the authoring process.

## Isolation

The cold decoder may see only:

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`
- NEI 0.1 and 0.2 candidate files
- DP 0.1 through DP 0.4 candidate files
- `experiments/007/PROOF_ALPHA.md`
- `experiments/007/PROOF_BETA.md`
- `experiments/007/COLD_PROMPT.md`

It must not see:

- `experiments/007/HIDDEN_ORACLE.md`
- `experiments/007/ASSERTIONS.json`
- scorer source
- any prior Experiment 007 decoder output or review
- Experiment 006 oracle/results as part of the semantic packet
- external browsing

## Qualification rule

The hidden scorer requires:

- at least four of five structural motifs;
- at least one deep motif;
- bounded findings;
- substantial method-specific residuals on both sides;
- falsification attempts;
- explicit rejection of overclaims;
- `SUPPORTED_CANDIDATE`, not a stronger semantic promotion.

To reduce factorization sensitivity, a motif may be satisfied by one finding or by the bounded union of two findings when the union still contains at most four steps per side.

No DP specification change is permitted after this holdout oracle is frozen if this execution is to count as blind qualification evidence.
