# Experiment 006 — Cold Run Manifest R2

**Purpose:** repeat the frozen Experiment 006 integrated qualification after the Discovery Protocols correction exposed by RUN-Q006  
**Run ID:** `RUN-Q006-R2`  
**Changed candidate input:** DP 0.2 correction layer over DP 0.1  
**Unchanged semantic controls:** QU/NEI cases from RUN-Q006  
**Unchanged discovery benchmark:** Proof Alpha, Proof Beta, and hidden oracle from RUN-Q006

## Cold-visible resources

The cold decoder may receive exactly:

1. `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`
2. `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`
3. `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`
4. `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
5. `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`
6. `experiments/006/Q006_CASES.md`
7. `experiments/006/Q006_BOUNDARY_CASES.md`
8. `experiments/006/DP_PROOF_ALPHA.md`
9. `experiments/006/DP_PROOF_BETA.md`
10. `experiments/006/COLD_Q006_R2_PROMPT.md`

DP 0.1 remains in the packet because DP 0.2 is a correction layer rather than a self-contained replacement. DP 0.2 governs where it explicitly strengthens or replaces DP 0.1 behavior.

## Scorer/reviewer-only resources

The cold decoder MUST NOT receive:

- `experiments/006/Q006_ASSERTIONS.json`
- `experiments/006/DP_HIDDEN_ORACLE.md`
- prior RUN-Q006 or RUN-Q006-R2 outputs
- `RUN_Q006_DECOMPOSITION_REPLAY.md`
- `EXPERIMENT_006_RUN_Q006_REVIEW.md`
- scorer source code
- author analysis or external search results

## Controlled differences from RUN-Q006

The semantic corpus and proof pair are unchanged.

Only these qualification-harness differences are intended:

```text
Discovery authority: DP 0.1 -> DP 0.1 + DP 0.2 correction layer
Cold prompt: version selection updated to DP 0.2
Run identifier/output paths: RUN-Q006 -> RUN-Q006-R2
Scorer normalization: accepts the previously adjudicated SEMANTIC/SEMANTICS alpha-renaming spelling variant
```

The hidden DP oracle thresholds and NEI-13 expected answer remain unchanged. This run therefore tests the DP correction rather than changing the discovery target or repairing the unresolved NEI result-status ambiguity.

## Resource budget

```text
GitHub Actions runs: 1
Gemini semantic invocations: 1
automatic Gemini preflight calls: 0
independent verifier calls: 0 unless post-freeze evidence is genuinely ambiguous
```

HTTP 429 is not automatically retried. At most one retry is permitted for transient HTTP 5xx failure.

## Qualification order

```text
deterministic harness preflight
-> one cold semantic call
-> freeze/hash response
-> deterministic scorer unblind using unchanged assertions/oracle thresholds
-> compare R2 against RUN-Q006
-> final review
```

RUN-Q006 remains immutable historical evidence and is not replaced by R2.
