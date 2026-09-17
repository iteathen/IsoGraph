# Experiment 005 — Post-Freeze Scoring Ledger

**Candidate authority:** `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`  
**Frozen qualification corpus:** `fa733d533cd683c5064c4f31fa6c083fa3aed21d`  
**Cold workflow:** `35252295888`  
**Cold artifact:** `10510136341`  
**Cold artifact ZIP SHA-256:** `bc4d6ce23425f5db67b91cad0167358dcd9da239c3c4d67dd1f7867ec5e6aadb`  
**Frozen cold report SHA-256:** `9078e33a7ae9f75eca75e2f9327a3f3e4e76e77c3223df5f03c5ce96dcbc5d9d`

The cold output was frozen before `Q005_ASSERTIONS.json` was opened for scoring.

## Scored results

| Case | Disposition | Observation |
|---|---|---|
| Q005-01 | PASS | Correctly establishes one witness for existential isomorphism, identifies the `S8` leaf symmetry and `8! = 40320` family size, and distinguishes complete-family coverage from explicit enumeration. |
| Q005-02 | PASS | Correctly permits the `31 <-> 32` swap only under the context excluding `^91002`, rejects cross-context quotient reuse, and requires pre-search qualification for pruning/coverage use. |
| Q005-03 | PASS | Correctly separates the non-isomorphic chain/star factorization pair from the isomorphic cycle pair and refuses to lift the first local negative to factorization-space completeness. |
| Q005-04 | PASS | Correctly verifies isomorphism from a direct witness without requiring canonical labeling/serialization. |
| Q005-05 | PASS | Correctly certifies non-isomorphism from direct member-occurrence multiplicity `1 != 2` without exhaustive mapping search. |
| Q005-06 | PASS | Correctly identifies weak embedding, rejects strong/induced embedding because of the extra included `^91002` target relation, and records that relation as target residual. |
| Q005-07 | PASS | Correctly verifies comparison-stage isomorphism/pairwise reconstruction while refusing full-source reconstruction because the D records explicitly mark exact reconstruction unavailable. |
| Q005-08 | PASS | Correctly rejects the supplied isomorphism claim because the proof profile omits the load-bearing V0 stable-label/relation-label dependency; omission cannot make the claim valid. |

```text
PASS:     8
PARTIAL:  0
FAIL:     0
UNKNOWN:  0
```

## Scoring notes

Q005-01 does **not** treat the cold report's reference to `S8` as a self-certifying complete-family certificate. The report correctly states the evidence burden: a complete-family claim requires an exact verified generating description plus coverage. Its current task was to analyze the family and state that burden, which it did.

Q005-06 was explicitly asked to evaluate both weak and strong embedding. Its statement that the weak claim itself does not require the stronger relation is therefore a semantic claim about obligation sufficiency, not an assertion that the task omitted the requested strong-relation audit.

No scorer discrepancy currently indicates semantic weakening, hidden incompleteness, invalid witness collapse, or a representation defect.

## Claim boundary

This scoring stage alone does not qualify Draft 0.16. The frozen cold report still requires an independent scorer-blind verifier and final discrepancy review before promotion.
