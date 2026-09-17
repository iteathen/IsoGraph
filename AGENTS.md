# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `STATUS.md`, `MIGRATION.md`, and the semantic authority relevant to the task.

### Current qualified authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`

The exact semantic candidate used by Experiment 005 remains preserved as `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`. The qualified file is mechanically derived from that tested blob with only qualification-status/provenance changes.

### Historical authority

- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Draft 0.15 remains immutable historical qualification evidence for Experiment 004 and artifacts frozen under that revision. Draft 0.16 does not retroactively reinterpret them.

## Research discipline

Use: assess -> research -> reassess -> plan -> execute -> qualify -> review -> cleanup/document.

Treat prior conclusions, reviews, fixtures, expected results, verifier output, and issue text as evidence rather than authority. Preserve ambiguity and residual distinctions. Do not create a new primitive, structural class, comparison relation, canonical factorization, canonical labeling requirement, or mandatory proof algorithm merely because a case is awkward or expensive.

Keep these distinctions explicit:

- surface syntax != irreducible substrate
- source-faithful representation != comparison view
- structural identity != occurrence
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

## Draft 0.16 obligation-sufficiency rules

A claim must discharge its complete dependency-closed obligation set. Do not require a stronger relation, stronger reconstruction layer, stronger completeness/optimality property, or unrelated qualification gate unless it is an actual dependency or explicit frozen proof-profile requirement.

Do not confuse proof sufficiency with search strategy. Qualified evidence may discharge a claim without canonicalization or exhaustive search when those are not themselves required obligations.

Do not eagerly enumerate mappings merely because multiple mappings exist. Match the witness-family coverage burden to the claim. Exact compact family descriptions require independent coverage verification.

Witness quotienting is context-scoped. No qualified context/equivalence/coverage proof means distinct verified witnesses remain distinct. A quotient valid for one downstream observation set is not globally valid.

A result at explicitly named frozen factorization/extraction nodes is local unless factorization-space coverage has been declared and exhausted or certified.

## Qualification provenance

Experiment 005 final review is `experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md`.

The focused Draft 0.16 controls completed with:

```text
post-freeze scoring: 8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
independent verifier: VERIFIED
unresolved obligations: none
```

Preserve cold-test isolation for future experiments: scorer assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable to isolated qualification agents until their outputs are frozen.
