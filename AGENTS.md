# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `STATUS.md`, `MIGRATION.md`, and the semantic authority relevant to the task.

### Last qualified authority

- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Draft 0.15 is the last qualified semantic authority. Experiment 004 evidence remains interpreted under that revision.

### Current successor candidate

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`
- concise amendment record: `CORE_SPEC_DRAFT_0_16_CANDIDATE.md`

For Draft 0.16 qualification work, use the consolidated Draft 0.16 candidate as the self-contained candidate authority. Do not treat it as qualified merely because it is consolidated.

Draft 0.16 adds no syntax, primitive, structural class, comparison relation kind, or D/E transformation kind. It clarifies only claim-bounded obligations, proof-method neutrality, witness-family sufficiency/quotients, and factorization-space coverage.

The source specifications and older experiments remain historical evidence under the semantics recorded at their revision. Naming-only or consolidation-only normalization must not change represented structure, claims, expected results, qualification status, or evidence meaning.

## Research discipline

Use: assess -> research -> reassess -> plan -> execute -> qualify -> review -> cleanup/document.

Treat prior conclusions, reviews, fixtures, expected results, and issue text as evidence rather than authority. Preserve ambiguity and residual distinctions. Do not create a new primitive, structural class, comparison relation, canonical factorization, canonical labeling requirement, or mandatory proof algorithm merely because a case is awkward or expensive.

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

## Draft 0.16 qualification guardrail

Experiment 005 under `experiments/005/` is the focused adversarial qualification for Draft 0.16.

Do not promote Draft 0.16 over Draft 0.15 until the frozen Experiment 005 sequence completes:

```text
isolated cold reconstruction
-> freeze
-> scorer unblind
-> discrepancy classification
-> scorer-blind independent verification
-> final review
```

Preserve cold-test isolation: scorer assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable to isolated qualification agents until their outputs are frozen.
