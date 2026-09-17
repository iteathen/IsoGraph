# Experiment 005 — Cold Run Manifest V1

**Purpose:** isolated qualification of Draft 0.16 obligation-sufficiency semantics  
**Run ID:** `RUN-Q005`  
**Candidate authority:** `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`

## Discovery-visible resources

The cold decoder may receive exactly:

1. `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`
2. `experiments/005/Q005_OBLIGATION_SUFFICIENCY.isg`
3. `experiments/005/COLD_Q005_PROMPT.md`

## Reviewer/scorer-only resources

The cold decoder MUST NOT receive:

- `experiments/005/Q005_ASSERTIONS.json`
- Experiment 005 result ledgers
- author analysis/reviews
- previous Experiment 005 outputs
- external commentary

## Freeze discipline

The execution harness MUST record the exact repository commit used for the three discovery-visible inputs, model identity, prompt/report hashes, and workflow run identity.

The cold report MUST be frozen before scorer assertions are opened to the scoring context.

Any rerun after scorer exposure is a distinct evidence item and must not silently replace the frozen report.

## Qualification order

```text
isolated cold run
-> freeze raw report
-> scorer unblind
-> discrepancy classification
-> scorer-blind independent verifier using only permitted inputs + frozen report
-> final review
```

Draft 0.16 remains unqualified until this sequence completes.
