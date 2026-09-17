# Experiment 004 — Gemini V3 qualification ledger

**Semantic authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`  
**Qualification corpus:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini harness:** `91ca09b65bebe8e9058ed69aa12e22b2e6716211`  
**Cold workflow run:** `35191919970`  
**Model:** `gemini-3.5-flash`, high thinking  
**Verbatim raw-evidence archive commit:** `d78a806322198e084e5016f44f813401bff72ad3`  
**Final campaign review:** `../../EXPERIMENT_004_FINAL_QUALIFICATION_REVIEW.md`

## Historical post-freeze scorer disposition

The first scorer pass was performed only after all 16 Gemini cold reports were frozen. Its recorded dispositions are preserved as a historical qualification stage rather than rewritten after verifier evidence became available.

| Run | Scorer disposition | Main observation at that stage |
|---|---|---|
| RUN-S07 | PASS | NAC existence/evaluation separation and profile validation recovered. |
| RUN-S04 | PASS | Two-stage D-local vs pair-residual accounting and reconstruction recovered. |
| RUN-S05 | PASS | Stage-qualified fingerprint behavior recovered. |
| RUN-S08 | PASS | Serializer/index revision scoping and multiple witness preservation recovered. |
| RUN-B | PASS | Rewrite multiplicity and distinct application-event semantics recovered. |
| RUN-C1 | PARTIAL | Intended Q004-12 accounting recovered, but decoder also supplied a larger alternative common-node accounting. |
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

Historical scorer-stage counts:

```text
PASS:     12
PARTIAL:   4
FAIL:      0
```

## Independent verifier completion

All 16 Gemini cold reports subsequently received successful scorer-blind verifier executions. Verifier packets contained the original permitted cold inputs plus the already-frozen cold report, and excluded hidden assertions, scoring reports, qualification ledgers, expected answers, prior verifier outputs, and external reviews.

Selected verifier workflow runs used by final reconciliation:

```text
35234338405  RUN-S07, RUN-S04
35237237782  RUN-S05, RUN-S08, RUN-B, RUN-C1
35240263716  RUN-C2 final successful verifier
35239572341  RUN-D09, RUN-D10, RUN-D16, RUN-D18, RUN-D19, RUN-D20S, RUN-D20L
35246313461  RUN-D17, RUN-D17B
```

`RUN-D17` and `RUN-D17B` initially failed mechanically because their run mappings were absent from the verifier harness. That omission was repaired without changing frozen cold evidence in commit `85496e05cf8b59f4f1319d5a4ec165a8c238d2cc`; workflow `35246313461` then completed both isolated verifier jobs successfully.

The complete 21-run campaign verifier archive, including the five earlier Claude/manual reports, is durably preserved at commit `e8c206b4f1219ee9aed4ed46adc97df2a9399f79` under:

`experiments/004/cold-results/verifier/`

## Final audited Gemini disposition

Final review treats the historical scorer, blind verifier, hidden assertions, frozen prompts/fixtures, and Draft 0.15 itself as evidence rather than authority. Two additional report defects were found during this reconciliation, so the final audited Gemini-only disposition is:

| Run | Final | Reconciled observation |
|---|---|---|
| RUN-S07 | PASS | NAC structure/evaluation distinction verified. |
| RUN-S04 | PASS | Two-stage residual/reconstruction accounting verified. |
| RUN-S05 | PASS | Stage-qualified fingerprint/index semantics verified. |
| RUN-S08 | PASS | Serializer/index scoping and multiple-witness preservation verified. |
| RUN-B | PASS | Rewrite occurrence and application-event semantics verified. |
| RUN-C1 | PARTIAL | Intended accounting recovered. The larger node-only alternative is not cleanly forbidden by the frozen protocol when read as a weak common core, but the report did not state the relation-strength/optimality basis required to call competing alternatives “strongest.” Retain as protocol/report ambiguity, not representation failure. |
| RUN-C2 | PARTIAL | Correct targets recovered; extra reversed VS mapping violates ordered incidence. |
| RUN-D09 | PASS | Semantic D coverage versus archival recoverability verified. |
| RUN-D10 | PASS | Independent extraction freeze verified. |
| RUN-D16 | PASS | Non-vacuity/selectivity behavior verified. |
| RUN-D17 | PASS | Native self-description base topology verified. |
| RUN-D17B | PARTIAL | Native topology recovered; unsupported semantic gloss and incomplete final diagram remain report defects. |
| RUN-D18 | PASS | Source ambiguity and conditional conclusion verified. |
| RUN-D19 | PARTIAL | Novel topology and negative certificate recovered; report also leaked a familiar name, used illegal symbolic-caret labels in a claimed native schema, and mislabeled a weak common core as induced. |
| RUN-D20S | PARTIAL | Structural-only retrieval result is correct, but unsolicited claimed native witness/certificate records use symbolic caret labels and violate Draft 0.15 `label := ^integer`. |
| RUN-D20L | PARTIAL | Label-assisted analysis is correct; the blind verifier independently found the same invalid symbolic-caret serialization in added policy/witness/certificate records. |

Final Gemini-only counts:

```text
PASS:     10
PARTIAL:   6
FAIL:      0
UNKNOWN:   0
```

## Evidence integrity

Every final disposition above refers to a successful isolated cold artifact whose final-text report was frozen before scoring. The selected cold reports and metadata remain verbatim under:

`experiments/004/cold-results/gemini/raw/`

The raw manifest pins each cold artifact ID, artifact ZIP SHA-256, and report SHA-256.

`RUN-D17B` had one earlier transport-only failure: job `105106212633`, artifact `10484942945`, `UND_ERR_HEADERS_TIMEOUT`, no model report. It was not scored. The successful isolated rerun is job `105112766976`, artifact `10484992470`.

The independent verifier evidence is separately preserved verbatim and was not used to repair any frozen cold report.

## Final discrepancy classification

No Gemini run demonstrates a representation-expressiveness failure in the Draft 0.15 substrate. All scorer-intended structures/results were recovered somewhere in the corresponding cold output.

The six final PARTIAL dispositions are classified as:

- **RUN-C1:** protocol/report ambiguity around relation strength and maximality/optimality basis.
- **RUN-C2:** decoder/search implementation error — extra invalid ordered-incidence mapping.
- **RUN-D17B:** label-semantic leakage plus report completeness/accounting error.
- **RUN-D19:** label-semantic leakage, parser/serialization defect in claimed native records, and auxiliary common-core/accounting error.
- **RUN-D20S:** parser/serialization defect in unsolicited claimed native witness/certificate records.
- **RUN-D20L:** parser/serialization defect in unsolicited native policy/witness/certificate records.

Q004-17 and Q004-17B demonstrate that required policy/witness/result structures are representable natively with legal numeric stable labels. The symbolic-label defects in D19/D20S/D20L are therefore decoder non-conformance with an existing grammar rule, not evidence that Draft 0.15 lacks the representation capacity.

Claimed negatives were accepted only when the frozen evidence supplies an actual separating invariant/certificate or complete structural contradiction. Mere model agreement was not treated as verification.

## Qualification claim boundary

The independent verifier stage and final discrepancy review are complete. Combined with the earlier Claude/manual cohort, Experiment 004 reaches its first current-authority Draft 0.15 qualification checkpoint for the frozen corpus with final campaign counts of **15 PASS / 6 PARTIAL / 0 FAIL / 0 UNKNOWN**.

This checkpoint is corpus-bounded and does not imply general correctness outside the tested targets.

**No Core Specification mutation is warranted from Experiment 004 evidence at this checkpoint.**
