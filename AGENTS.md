# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `STATUS.md`, `MIGRATION.md`, and the semantic authority relevant to the task.

### Current qualified authority

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

Draft 0.17 is a narrow description correction over Draft 0.16. Bare IDs are **Semantic Identity (SI)** handles: representation-level referential identity used for addressing, sharing, matching, namespaces, allocation, reconstruction, and comparison. SI equality or inequality is not independently authoritative for any stronger identity relation.

### Historical authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Draft 0.16 remains immutable historical qualification evidence for Experiment 005 and retains its obligation-sufficiency qualification. Draft 0.15 remains immutable historical qualification evidence for Experiment 004. Draft 0.17 does not retroactively reinterpret either revision.

## Research discipline

Use: assess -> research -> reassess -> plan -> execute -> qualify -> review -> cleanup/document.

Treat prior conclusions, reviews, fixtures, expected results, verifier output, and issue text as evidence rather than authority. Preserve ambiguity and residual distinctions. Do not create a new primitive, structural class, comparison relation, canonical factorization, canonical labeling requirement, or mandatory proof algorithm merely because a case is awkward or expensive.

Keep these distinctions explicit:

- surface syntax != irreducible substrate
- source-faithful representation != comparison view
- Semantic Identity (SI) != occurrence
- SI equality/inequality != independently proved stronger identity relation
- factorization != normalization
- one valid factorization != canonical factorization
- native representability != dedicated syntax
- retrieval hint != structural evidence
- source/D residual != pairwise residual
- class label != class-membership evidence
- semantic equivalence != structural isomorphism
- rule existence != rule activation
- NAC object existence != NAC evaluation
- evidence obligation != discovery algorithm
- one verified witness != complete witness family
- local factorization-node claim != factorization-space completeness
- witness equivalence in one frozen claim context != global witness equivalence

## Semantic Identity discipline

- Bare integer IDs are SI handles, not natural/ontological identity certificates.
- Same SI means the same represented referent within the applicable SI namespace.
- Different SIs remain distinct referents for core operational semantics; leaving a stronger identity question open does not make them mergeable for matching or allocation.
- Same or different SI alone supplies no stronger external identity conclusion.
- Object-theory equality remains separate from SI and does not silently coalesce SI referents.
- Freshness is SI-namespace-relative and supplies no stronger identity conclusion by itself.
- Do not import Natural Entropic Identity or other external identity semantics into core without an explicit, separately versioned dependency.

## Draft 0.16 obligation-sufficiency rules retained by Draft 0.17

A claim must discharge its complete dependency-closed obligation set. Do not require a stronger relation, stronger reconstruction layer, stronger completeness/optimality property, or unrelated qualification gate unless it is an actual dependency or explicit frozen proof-profile requirement.

Do not confuse proof sufficiency with search strategy. Qualified evidence may discharge a claim without canonicalization or exhaustive search when those are not themselves required obligations.

Do not eagerly enumerate mappings merely because multiple mappings exist. Match the witness-family coverage burden to the claim. Exact compact family descriptions require independent coverage verification.

Witness quotienting is context-scoped. No qualified context/equivalence/coverage proof means distinct verified witnesses remain distinct. A quotient valid for one downstream observation set is not globally valid.

A result at explicitly named frozen factorization/extraction nodes is local unless factorization-space coverage has been declared and exhausted or certified.

## Natural Entropic Identity

For current NEI research, read:

- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` — base NEI semantics;
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md` — current clarification layer.

NEI 0.2 preserves application/domain relations exactly and warns against silently carrying stronger identity meaning through them than their declared semantics/authority support. It does not assume application distinctions are meaningless, and it does not automatically promote them into `SAME` or `DISTINCT`.

The word **natural** is explanatory and non-load-bearing. It contrasts the target identity question with merely representational identity; it is not a primitive, evidence source, ontology declaration, or inference rule.

## Discovery Protocols

For agent-driven structural discovery on the current research branch, read:

- `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md` — base ranked protocol catalog;
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md` — cross-residual/NEI correction motivated by RUN-Q006;
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md` — current evidence-matched separator correction.

DP 0.3 supersedes conflicting DP 0.2/0.1 discovery behavior while preserving those revisions as historical qualification evidence.

Discovery Protocols provide a ranked, adaptive search prior for finding candidate relations, invariants, common structures, factorizations, residuals, QUIs, and identity hypotheses. Discovery priority never supplies semantic authority.

Under DP 0.3, evidence burden follows the conclusion:

- a concrete structural breaker can reject a candidate without NEI;
- an explicit pinned application/domain authority may serve as a rigid separator when its declared semantics make the difference load-bearing;
- a natural-distinctness rejection requires qualified NEI `DISTINCT`;
- a cost-bounded stop may remain `DORMANT`/unresolved without proving identity.

Application semantics are preserved exactly. Do not presume they are either identity-relevant or identity-irrelevant. Do not silently strengthen them into NEI meaning beyond the pinned authority.

A load-bearing residual between already matched upstream/downstream regions still requires at least one bounded recursive role/factorization pass unless a structural or rigid-authority breaker already explains the divergence. Different machinery or carrier type alone is not terminal divergence.

For unresolved information, consider whether QU structure itself can provide the useful correspondence before spending resources resolving the unknown. A QUI candidate remains structural evidence only and does not imply NEI `SAME`.

## Qualification provenance

Experiment 005 final review is `experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md`.

The focused Draft 0.16 controls completed with:

```text
post-freeze scoring: 8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
independent verifier: VERIFIED
unresolved obligations: none
```

Draft 0.17 adds no separate qualification campaign because it changes the description/scope of the existing ID mechanism without changing its operational behavior.

Experiment 006 RUN-Q006 and RUN-Q006-R2 remain frozen historical evidence against their exact recorded candidate revisions. Preserve their reports and reproduction investigations without reinterpreting the frozen outputs through later DP/NEI revisions.

Preserve cold-test isolation for future experiments when an actual semantic hypothesis warrants qualification: scorer assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable to isolated qualification agents until their outputs are frozen.

## Qualification resource discipline

External Gemini calls and GitHub Actions executions are scarce qualification resources. Read and follow `QUALIFICATION_RESOURCE_DISCIPLINE.md` before designing or running a new qualification experiment.

Minimize external model calls and CI executions **subject to complete semantic coverage, cold isolation, reproducibility, and sufficient independent evidence**. Prefer focused high-information regression tests over replaying unrelated already-covered controls after a narrow candidate revision.

Run deterministic syntax, hash, packet-integrity, provenance, and mechanical checks before spending an external semantic call. Do not rerun Gemini or CI merely to seek a more favorable answer. Additional external calls/runs require a concrete evidentiary or infrastructure reason and should be recorded in final qualification provenance.
