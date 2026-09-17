# IsoGraph Status

**Project state:** research incubation / Draft 0.15 qualified checkpoint complete / Draft 0.16 focused qualification pending  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Qualified authority

The last qualified self-contained semantic authority is:

- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Experiment 004 completed the first current-authority Draft 0.15 qualification checkpoint with:

```text
PASS:     15
PARTIAL:   6
FAIL:      0
UNKNOWN:   0
```

No surviving Experiment 004 discrepancy demonstrated a Draft 0.15 representation-expressiveness failure. Frozen Experiment 004 evidence remains interpreted under Draft 0.15.

## Draft 0.16 candidate

The current unqualified successor candidate is:

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`

Its concise amendment record is:

- `CORE_SPEC_DRAFT_0_16_CANDIDATE.md`

Draft 0.16 changes only proof/evidence sufficiency semantics:

- claim-bounded dependency-closed obligation sets;
- proof-method neutrality within frozen qualification constraints;
- claim-typed witness sufficiency;
- context-scoped witness quotients;
- exact compact witness-family certificates where coverage is proved;
- local factorization-node claims versus factorization-space completeness.

It adds no surface syntax, primitive, structural class, comparison relation kind, or D/E transformation kind.

## Experiment 005

Focused adversarial qualification is defined under `experiments/005/`.

Frozen controls target:

1. existential witness versus complete isomorphism family;
2. witness quotient invalidated by a richer downstream context;
3. local factorization-node result versus factorization-space completeness;
4. direct isomorphism without canonicalization;
5. separating-certificate negative without exhaustive search;
6. weak relation success while a stronger relation fails;
7. comparison-stage reconstruction without full-source reconstruction;
8. dependency-closure rejection of an under-specified proof profile.

Draft 0.16 MUST NOT replace Draft 0.15 as qualified authority until the Experiment 005 cold-run -> freeze -> score -> independent-verifier -> final-review sequence completes.

## Immediate work

1. Freeze the Experiment 005 corpus revision.
2. Execute `RUN-Q005` in an isolated context with only the permitted resources.
3. Freeze the raw report before scorer access.
4. Score against hidden assertions and classify discrepancies.
5. Independently verify the frozen report without scorer material.
6. Promote, revise, or reject Draft 0.16 only from the resulting evidence.

## Naming and provenance

Current repository artifacts use **IsoGraph** terminology. The project was extracted from an earlier CUDA-JS research line; the exact pre-standalone state remains recoverable from the immutable source checkpoint recorded in `MIGRATION.md` and from Git history.
