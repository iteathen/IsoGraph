# Experiment 004 — Gemini V3 qualification ledger

**Semantic authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`  
**Qualification corpus:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini harness:** `91ca09b65bebe8e9058ed69aa12e22b2e6716211`  
**Cold workflow run:** `35191919970`  
**Model:** `gemini-3.5-flash`, high thinking  
**Verbatim raw-evidence archive commit:** `d78a806322198e084e5016f44f813401bff72ad3`

## Current scored disposition

| Run | Disposition | Main observation |
|---|---|---|
| RUN-S07 | PASS | NAC existence/evaluation separation and profile validation recovered. |
| RUN-S04 | PASS | Two-stage D-local vs pair-residual accounting and reconstruction recovered. |
| RUN-S05 | PASS | Stage-qualified fingerprint behavior recovered. |
| RUN-S08 | PASS | Serializer/index revision scoping and multiple witness preservation recovered. |
| RUN-B | PASS | Rewrite multiplicity and distinct application-event semantics recovered. |
| RUN-C1 | PARTIAL | Intended Q004-12 accounting recovered, but decoder also admitted an unsupported larger alternative common-node accounting. |
| RUN-C2 | PARTIAL | All scorer targets recovered, but decoder added one false reversed VS mapping that violates ordered incidence. |
| RUN-D09 | PASS | Recoverability distinguished from semantic decomposition. |
| RUN-D10 | PASS | Frozen extraction distinguished from pair-conditioned exploratory extraction. |
| RUN-D16 | PASS | Non-vacuous schema membership and negative near-miss behavior recovered. |
| RUN-D17 | PASS | Preserved native-record topology reconstructed without gloss. |
| RUN-D17B | PARTIAL | All current native-record scorer targets recovered; report added unsupported English role gloss and its final terminal-topology diagram omitted two body links already identified elsewhere. |
| RUN-D18 | PASS | Source ambiguity preserved and comparison result correctly made conditional. |
| RUN-D19 | PARTIAL | Novel structural schema recovered, but decoder violated the no-familiar-name instruction and added inconsistent induced/common-core accounting. |
| RUN-D20S | PASS | Structural-only retrieval surfaced the true isomorphic pair and rejected the structural negative. |
| RUN-D20L | PASS | Label-assisted false positive/false negative demonstrated; labels remained retrieval hints rather than evidence. |

```text
PASS:    12
PARTIAL:  4
FAIL:     0
```

## Evidence integrity

Every scored run above has a successful, isolated cold artifact whose final-text report hash was checked before scoring. The selected reports and their metadata are archived verbatim under:

`experiments/004/cold-results/gemini/raw/`

The raw manifest pins each artifact ID, artifact ZIP SHA-256, and report SHA-256.

`RUN-D17B` had one earlier transport-only failure: job `105106212633`, artifact `10484942945`, `UND_ERR_HEADERS_TIMEOUT`, no model report. It was not scored. The successful isolated rerun is job `105112766976`, artifact `10484992470`.

## Discrepancy classification

No scored run currently demonstrates a representation-expressiveness failure in the Draft 0.15 substrate. All hidden scorer-intended structures/results were recovered somewhere in the corresponding cold output. The four PARTIAL dispositions arise from decoder-side overreach or report discipline:

- **RUN-C1:** witness/accounting error — correct common-core accounting plus an unsupported competing alternative.
- **RUN-C2:** decoder/search implementation error — extra invalid mapping despite the correct mapping also being supplied.
- **RUN-D17B:** label-semantic leakage plus report-completeness/accounting error.
- **RUN-D19:** label-semantic leakage plus auxiliary witness/accounting inconsistency.

These discrepancies are preserved rather than repaired in the cold reports.

## Qualification claim boundary

This completes the bulk **cold execution + post-freeze scoring** stage for all 16 runs that remained after the earlier Claude executions. It does **not** by itself complete the Experiment 004 first current-authority qualification checkpoint: independent verifier passes remain required for positive witnesses/certificates and claimed negatives/optimality where applicable.

No Core Specification mutation is justified before that verifier stage and final discrepancy review.
