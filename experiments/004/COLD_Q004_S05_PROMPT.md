# IsoGraph Experiment 004 — Q004-S05 Cold Factorization-Stage Index Prompt

You are an isolated IsoGraph index-safety auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S05_FACTOR_STAGE_INDEX.isg`
3. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

For this synthetic fixture only:

```text
^6502 OBJECT BODY
^6503 D_RECORD SOURCE TARGET
^6504 OBJECT STAGE
^6505 RAW_STAGE
^6506 FACTORED_STAGE
^6510 FINGERPRINT ALGORITHM OBJECT STAGE VALUE
^6511 NECESSARY_INVARIANT_QUALIFICATION ALGORITHM STAGE ENABLED
^6512 INDEX_STAGE_BINDING ALGORITHM STAGE
```

`#1` in `^6511` means the necessary-invariant qualification is present for that exact stage. No cross-stage invariant is supplied.

## Task

1. Reconstruct bodies of `1000`, `2000`, `1200`, and `2200`, including their stages and D links.
2. Report fingerprint outputs for algorithm `7001` and the exact stage on which its necessary invariant is qualified.
3. State whether its raw-stage mismatch may prune `1000` vs `2000` for the qualified raw-stage relation.
4. State whether the same mismatch may be reused to prune `1200` vs `2200` after topology-changing D factorization.
5. Report fingerprint outputs for algorithm `7002` and its stage qualification.
6. Compare `1200` and `2200` structurally under V0 and give a mapping if one exists.
7. State whether equal fingerprint values alone prove isomorphism.
8. State whether current IsoGraph requires choosing one global canonical post-D factorization merely to make indexing simple.

Freeze the report before consulting anything else.
