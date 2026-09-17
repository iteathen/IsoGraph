# IsoGraph Status

**Project state:** research incubation / Draft 0.16 obligation-sufficiency clarification qualified  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Current qualified semantic authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`

The exact tested pre-promotion candidate is retained unchanged as:

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`

Draft 0.16 was tested from frozen corpus commit `fa733d533cd683c5064c4f31fa6c083fa3aed21d` and candidate blob `0cc6d2e3e08606a99324ee36b6ff5a6a5067efb8`.

Experiment 005 evidence:

```text
cold workflow:             35252295888
cold artifact:             10510136341
cold report SHA-256:       9078e33a7ae9f75eca75e2f9327a3f3e4e76e77c3223df5f03c5ce96dcbc5d9d
post-freeze scoring:       8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
verifier workflow:         35252625515
verifier artifact:         10510431318
verifier report SHA-256:   da45f19397f842eb08c9cea57cf77b108ee8dcf808c0c1f1989e72ca3d7b8eb3
verifier disposition:      VERIFIED
unresolved obligations:    none
```

Final review:

- `experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md`

## Qualified Draft 0.16 clarification layer

- claim-bounded dependency-closed obligation sets;
- proof-method neutrality within frozen qualification/isolation constraints;
- claim-typed witness sufficiency;
- context-scoped witness quotients;
- exact compact witness-family certificates when coverage is independently verified;
- local factorization-node claims versus factorization-space completeness.

These rules reduce specification-mandated over-proof without deleting represented information or weakening structural correctness.

## Explicit non-changes

Draft 0.16 does not introduce:

- new syntax or irreducible primitives;
- new structural classes or comparison relations;
- a globally minimal comparison view;
- a prescribed progressive search algorithm;
- mandatory canonical labeling or canonical factorization;
- post-D-only fingerprinting;
- weaker source/pairwise residual accounting;
- heuristic negatives as proof;
- automatic witness quotienting without qualified context and coverage.

## Historical authority

`CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md` remains immutable qualified historical authority for Experiment 004 and prior Draft 0.15 artifacts. Draft 0.16 does not retroactively change their semantics.

## Immediate work

Any further performance-related spec changes require a new explicit pressure case or experiment. Do not enlarge Draft 0.16 merely because an implementation technique appears faster.
