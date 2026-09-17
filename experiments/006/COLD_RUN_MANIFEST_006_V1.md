# Experiment 006 — Cold Run Manifest V1

**Purpose:** integrated qualification of QU 0.1, NEI 0.1, and Discovery Protocols 0.1  
**Run ID:** `RUN-Q006`  
**Execution model:** one cold semantic invocation inside one deliberately armed GitHub Actions workflow run

## Cold-visible resources

The cold decoder may receive exactly:

1. `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`
2. `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md`
3. `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`
4. `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
5. `experiments/006/Q006_CASES.md`
6. `experiments/006/Q006_BOUNDARY_CASES.md`
7. `experiments/006/DP_PROOF_ALPHA.md`
8. `experiments/006/DP_PROOF_BETA.md`
9. `experiments/006/COLD_Q006_PROMPT.md`

## Scorer/reviewer-only resources

The cold decoder MUST NOT receive:

- `experiments/006/Q006_ASSERTIONS.json`
- `experiments/006/DP_HIDDEN_ORACLE.md`
- `experiments/006/tools/score-q006.mjs`
- previous Experiment 006 outputs
- author scoring notes or external reviews

The cold-run process itself MUST NOT open scorer/reviewer-only resources before the external response is frozen.

## Resource budget

Default frozen qualification phase:

```text
GitHub Actions runs: 1
Gemini semantic invocations: 1
automatic model-access preflight calls: 0
independent verifier calls: 0 unless deterministic adjudication is insufficient
```

The runner may retry once only for HTTP 5xx provider failure. It MUST NOT automatically retry HTTP 429.

## Candidate-branch arming

Ordinary authoring commits MUST NOT trigger Experiment 006.

On `spec/nei-qu-rewrite`, the frozen run is armed only by creating or updating:

```text
experiments/006/RUN_Q006.request
```

The sentinel is not part of the cold packet. Creating it is an explicit decision to spend the one planned GitHub Actions run and Gemini semantic call.

## Freeze discipline

The runner uses the exact `GITHUB_SHA` selected by the armed workflow invocation and reads every cold-visible input through `git show <SHA>:<path>`.

It records per-file SHA-256 hashes, the complete packet SHA-256, raw and parsed report hashes, model identity, provider attempt count, and workflow/run metadata.

The hidden assertions are parsed only by deterministic scoring after the external response has been frozen.

## Qualification order

```text
deterministic preflight
-> one cold semantic call
-> freeze/hash output
-> deterministic scorer unblind
-> per-module dispositions
-> optional verifier only for unresolved semantic adjudication
-> final review
```

Any rerun after scorer exposure is a separate evidence item and MUST NOT silently replace the frozen report.
