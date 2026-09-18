# Experiment 008 — Blind Structural Discovery Holdout

**Status:** holdout construction before execution  
**Public qualification-contract base:** `c4aa89c44fc4cfc2dc12928347b5427205883e84`  
**Purpose:** obtain fresh blind evidence for current Discovery Protocol behavior after correcting the generic semantic-rejection/output-serialization contract exposed by Experiment 007.

## Isolation

The cold decoder may see only:

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`;
- NEI 0.1 and 0.2 candidate files;
- Discovery Protocols 0.1 through 0.4 candidate files;
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`;
- `experiments/008/DERIVATION_ALPHA.md`;
- `experiments/008/DERIVATION_BETA.md`;
- `experiments/008/COLD_PROMPT.md`.

It must not see:

- `experiments/008/HIDDEN_ORACLE.md`;
- `experiments/008/ASSERTIONS.json`;
- scorer source;
- any prior Experiment 008 decoder output or review;
- Experiment 006 or 007 oracle/results as part of the semantic packet;
- repository maps or agent guidance;
- external browsing.

## Qualification rule

The hidden scorer requires:

- at least four of five structural motifs;
- at least one deep motif;
- bounded findings;
- substantial derivation-specific residuals on both sides;
- falsification attempts;
- semantic rejection of the public QRC overclaim concepts;
- `SUPPORTED_CANDIDATE`, not a stronger semantic promotion.

Exact canonical spelling of QRC rejection IDs is recorded separately as serializer conformance and is not qualification-bearing.

To reduce factorization sensitivity, a motif may be satisfied by one finding or by the bounded union of two findings when the union still contains at most four steps per side.

No DP, QRC, prompt, oracle, assertion, or scorer change is permitted after this holdout is frozen if the execution is to count as fresh blind qualification evidence.
