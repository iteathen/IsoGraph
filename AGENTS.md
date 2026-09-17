# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `MIGRATION.md`, and:

- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

That file is the self-contained current semantic authority for new Draft 0.15 work. It consolidates the surviving rules of Drafts 0.13, 0.14, and 0.15 so current agents do not need to replay the amendment chain.

The source specifications remain historical evidence and provenance:

1. `CORE_SPEC_DRAFT_0_13_CONSOLIDATED_CANDIDATE.md`
2. `CORE_SPEC_DRAFT_0_14_CANDIDATE.md`
3. `CORE_SPEC_DRAFT_0_15_CANDIDATE.md`

Treat older specifications and experiments as historical evidence under the semantics recorded at their revision. Naming-only or consolidation-only normalization must not change represented structure, claims, expected results, qualification status, or evidence meaning. Exact earlier bytes remain recoverable through Git history and the pinned migration checkpoint.

## Research discipline

Use: assess -> research -> reassess -> plan -> execute -> qualify -> review -> cleanup/document.

Treat prior conclusions, reviews, fixtures, expected results, and issue text as evidence rather than authority. Preserve ambiguity and residual distinctions. Do not create a new primitive, structural class, comparison relation, or canonical factorization merely because a case is awkward.

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

Preserve cold-test isolation: scorer assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable to isolated qualification agents until their outputs are frozen.
