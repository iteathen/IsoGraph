# IsoGraph Core Specification — Draft 0.16 Candidate Amendment

**Status:** unqualified corrective/performance-semantics candidate  
**Base:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md` at Git blob `827671a58700399dbf4854252b8248e1401eb3f8`  
**Consolidated successor:** `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`  
**Growth rule:** no new syntax, primitive, structural class, comparison relation kind, or D/E transformation kind

## Purpose

Draft 0.16 clarifies the amount and form of evidence required by structural claims so the specification does not accidentally mandate computation stronger than the claim itself. It preserves all load-bearing represented information and all Draft 0.15 correctness safeguards.

## Normative changes

1. **Claim-bounded obligation closure.** Verification discharges the complete dependency-closed obligation set of the frozen claim, but does not require a stronger relation, reconstruction layer, completeness/optimality property, or unrelated gate.
2. **Proof-method neutrality.** Structural validity is defined by discharged evidence obligations rather than a mandatory discovery algorithm; isolation/non-circularity constraints remain enforceable qualification requirements.
3. **Claim-typed witness sufficiency.** Existential, lower-bound, uniqueness, exact-class-count, complete-family, and optimality claims require correspondingly different witness coverage.
4. **Context-scoped witness quotients.** Witnesses may be collapsed only under an independently qualified equivalence that preserves every load-bearing observation/obligation of the frozen claim context; quotient validity is not global.
5. **Exact witness-family certificates.** Complete families may use exact verified generative descriptions instead of eager enumeration. For isomorphism, one verified isomorphism plus an exact verified automorphism-group generating description can compactly describe the complete family.
6. **Claim-scoped factorization coverage.** A relation on named frozen factorization nodes is local; factorization-space completeness requires declared coverage plus exhaustion or a qualified coverage certificate.

## Explicit non-changes

Draft 0.16 does not require a minimal view, progressive search schedule, canonical labeling, one canonical D, post-D-only fingerprints, full-source reconstruction for pairwise-only claims, or heuristic negatives. It does not weaken independent factorization freeze, witness verification, residual accounting, or certified-negative discipline.

## Qualification requirement

The consolidated candidate remains unqualified until the focused adversarial controls in its Section 42.3 pass isolated cold reconstruction, post-freeze scoring, and independent verification. Draft 0.15 remains the last qualified authority meanwhile.
