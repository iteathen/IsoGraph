# IsoGraph Experiment 005 — Obligation-Sufficiency Qualification

**Status:** frozen-corpus candidate under construction  
**Candidate authority:** `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`  
**Last qualified authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`  
**Purpose:** adversarially falsify Draft 0.16 claim-bounded obligation and witness-family semantics before qualification promotion

## 1. Scope

Experiment 005 tests only the Draft 0.16 clarification layer. It does not reopen the Draft 0.15 substrate, add syntax, add a comparison relation, or reinterpret Experiment 004 evidence.

The qualification question is whether Draft 0.16 can reduce *mandated proof work* without reducing represented information or permitting false/overbroad claims.

## 2. Frozen controls

```text
Q005-01  existential witness versus complete isomorphism family
Q005-02  context-scoped witness quotient invalidated by exposed port structure
Q005-03  local factorization-node result versus factorization-space completeness
Q005-04  direct isomorphism without canonicalization
Q005-05  separating-certificate negative without exhaustive search
Q005-06  weak relation succeeds while stronger relation fails
Q005-07  pairwise comparison-stage reconstruction without full-source reconstruction
Q005-08  dependency-closure rejection of an under-specified proof profile
```

## 3. Isolation

A cold decoder receives only:

1. `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`;
2. `experiments/005/Q005_OBLIGATION_SUFFICIENCY.isg`;
3. `experiments/005/COLD_Q005_PROMPT.md`.

It MUST NOT receive `Q005_ASSERTIONS.json`, prior outputs, scoring notes, author analysis, Experiment 005 results, or external reviews before its report is frozen.

## 4. Qualification standard

Each control must preserve the full dependency-closed correctness burden while rejecting any stronger, unrelated computational obligation.

A passing result must distinguish at least:

- existence from complete-family claims;
- context-local witness equivalence from global equivalence;
- a claim at named factorization nodes from completeness over the allowed factorization space;
- a structural relation from any particular algorithm used to discover/prove it;
- certificate-backed non-isomorphism from incomplete search;
- weak relation semantics from stronger relation semantics;
- comparison-stage reconstruction from source reconstruction;
- an admissible proof profile from one that suppresses a real dependency.

## 5. Promotion rule

Draft 0.16 remains unqualified until:

```text
cold reconstruction
-> report freeze
-> scorer unblind
-> discrepancy classification
-> independent scorer-blind verification
-> final review
```

No failure may be repaired by changing the frozen case after seeing its answer. Any changed case is a new revision.

No Draft 0.16 rule is promoted merely because it appears performance-friendly. A failure demonstrating semantic weakening, hidden incompleteness, circularity, or invalid witness collapse blocks promotion until classified and resolved.
