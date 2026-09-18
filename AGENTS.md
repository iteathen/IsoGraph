# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `STATUS.md`, `MIGRATION.md`, and the semantic authority relevant to the task.

### Qualified Core authority

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

Draft 0.17 remains Core authority. Bare IDs are **Semantic Identity (SI)** handles: representation-level referential identity used for addressing, sharing, matching, namespaces, allocation, reconstruction, and comparison. SI equality or inequality is not independently authoritative for any stronger identity relation.

### Qualified extension/module authority

Read:

- `qualification/QUALIFIED_MODULES_2026-09-18.md`

That manifest qualifies the exact tested revisions of:

- QU 0.1;
- NEI 0.1 + NEI 0.2 cumulative clarification;
- Discovery Protocols 0.1-0.4 cumulative module.

The semantic files intentionally retain their historical `_CANDIDATE` filenames because those exact bytes were tested. **Filename suffix is not qualification status.** Use the authority manifest and exact content hashes.

Qualified extensions remain separately versioned dependencies and do not silently become Core.

### Unqualified successor candidates

The following revisions are active semantic candidates and are **not** current authority until separately qualified and promoted:

- `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` — observation-first discrepancy interpretation and pre-repair alignment clarification;
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_3_CANDIDATE.md` — observation/comparison-closure, scope, and safe-collapse clarification;
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md` — observation-first discrepancy handling and separation of qualification from structural discovery.

Use them as candidate material only when the task explicitly concerns their development/qualification. Do not silently apply them to historical evidence or qualified-module claims.

### Qualified infrastructure

QRC 0.1 is qualified for qualification-infrastructure use only:

- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`
- `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`

QRC is not semantic domain authority.

### Historical authority

- `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`
- `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

Draft 0.16 remains immutable historical qualification evidence for Experiment 005 and retains its obligation-sufficiency qualification. Draft 0.15 remains immutable historical qualification evidence for Experiment 004. Later qualification does not retroactively reinterpret historical artifacts.

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

Current qualified NEI authority is the cumulative exact revision pair recorded in `qualification/QUALIFIED_MODULES_2026-09-18.md`:

- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` — qualified base NEI semantics;
- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md` — qualified clarification layer.

Historical research `research/nei/NEI_DESIGN_AUDIT_0_1_SUPERSEDED.md` preserves an earlier maximally-coarse identity-partition design. It is not authority: qualified NEI 0.1 explicitly rejects coarseness as a sameness-selection rule because absence of distinctness evidence is not positive SAME evidence.

NEI 0.2 preserves application/domain relations exactly and warns against silently carrying stronger identity meaning through them than their declared semantics/authority support. It does not assume application distinctions are meaningless, and it does not automatically promote them into `SAME` or `DISTINCT`.

The word **natural** is explanatory and non-load-bearing. It contrasts the target identity question with merely representational identity; it is not a primitive, evidence source, ontology declaration, or inference rule.

A semantic NEI `UNKNOWN` is itself a qualified positive result: do not use it merely because identity authority is absent. Missing required identity profile/query-anchor authority remains incomplete.

NEI 0.3 is an unqualified successor candidate. Its proposed clarification is observation-first: no observed difference is not proof of sameness, an observed difference is not automatically identity-separating, scope is load-bearing, and unknown identity-relevant distinctions cannot be quotiented away. It adds no new NEI result status and must not be treated as qualified authority before promotion.

## Discovery Protocols

Discovery Protocols 0.1-0.4 are qualified as one cumulative current module at the exact revisions recorded in `qualification/QUALIFIED_MODULES_2026-09-18.md`:

- `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md`

DP 0.4 supersedes conflicting earlier discovery behavior while preserving DP 0.1-0.3 as historical layers of the cumulative qualified module.

Discovery Protocols provide a ranked, adaptive search prior for finding candidate relations, invariants, common structures, factorizations, residuals, QUIs, and identity hypotheses. **Discovery priority never supplies semantic authority.**

Evidence burden follows the conclusion:

- a concrete structural breaker can reject a candidate without NEI;
- an explicit pinned application/domain authority may serve as a rigid separator when its declared semantics make the difference load-bearing;
- a natural-distinctness rejection requires qualified NEI `DISTINCT`;
- a supported correspondence may remain `CORRESPONDENCE`;
- a cost-bounded stop may remain `DORMANT`/unresolved without proving identity.

Application semantics are preserved exactly. Do not presume they are either identity-relevant or identity-irrelevant. Do not silently strengthen them into NEI meaning beyond the pinned authority.

Under qualified DP 0.4, `STRUCTURAL_BREAKER` means a **concrete failed load-bearing obligation** under the active comparison/view. Different machinery, formalism, carrier type, proof technique, source file, SI spelling, or decomposition depth is not itself such a breaker.

A load-bearing residual between already matched upstream/downstream regions requires at least one bounded recursive role/factorization pass unless a valid structural or rigid-authority breaker already explains the divergence. Any `CORRESPONDENCE` discovered by that mandatory pass re-enters ordinary candidate expansion/falsification; it may not be ignored while the same residual is used as a terminal separator.

Where one side exposes one atomic role and the other a dependent region, attempt one-node-to-subgraph alignment before concluding the role is absent.

For unresolved information, consider whether qualified QU structure itself can provide the useful correspondence before spending resources resolving the unknown. A QUI remains structural evidence only and does not imply NEI `SAME`.

DP 0.5 is an unqualified successor candidate. Its proposed rule is that a discrepancy is initially an observation, not automatically a defect. Candidate work under DP 0.5 preserves the raw discrepancy, checks semantic-quantity/scope alignment before value judgment, and keeps qualification disposition separate from any surviving structural-discovery lead.

## Qualification provenance

Core qualification remains revision-specific:

- Experiment 004 preserves Draft 0.15 broad qualification evidence;
- Experiment 005 qualified the obligation-sufficiency layer retained in Core 0.17.

Extension/module qualification is recorded in:

- `qualification/QUALIFIED_MODULES_2026-09-18.md`

The qualification campaign deliberately preserves failed runs:

- Experiment 009: joint QU/NEI formal failure; review identified output-contract defects plus one substantive missing-authority overreach.
- Experiment 013: fresh corrected focused QU/NEI run — `QUALIFIES`, QU 0.1 PASS, cumulative NEI 0.1/0.2 PASS.
- Experiment 010: cumulative DP formal failure; review identified one hidden-oracle defect and one genuine omitted overclaim.
- Experiment 012: focused DP formal failure from an undisclosed mapping wire shape while semantic obligations were recovered.
- Experiment 014: fresh corrected DP mapping-contract run — `QUALIFIES` with zero mismatches; cumulative DP 0.1-0.4 promotion review recorded.
- Experiment 011: integrated formal failure due incomplete explicit overclaim rejection while the structural composition behavior was otherwise correct.
- Experiment 015: fresh corrected integrated run — `QUALIFIES` with zero mismatches.

Preserve every frozen historical disposition. Do not rewrite a failed score because later review identifies a fixture/scorer defect. Correct the generic contract, use fresh holdout material, and qualify the exact new campaign.

Provider/infrastructure failures that produce no semantic report may be retried only against the same frozen SHA/packet or a newly frozen revision with the reason recorded.

Cold-test isolation remains mandatory when qualification depends on fresh semantic reconstruction: hidden assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable until the output is frozen.

The final integrated Experiment 015 establishes compatibility for the exercised Core + QU + NEI + DP composition. It does not establish universal discovery completeness or universal domain coverage.

## External agent execution paths

Reusable coding, OpenRouter, strict-cold, byte-identical panel, agent-host, and GitHub-connector routes are documented in the private control repository:

```text
iteathen/OX-Alpha-Contol/AGENT_EXECUTION_PATHS.md
```

Use that file for execution routing only. IsoGraph's own authority, isolation, qualification, and merge rules remain controlling for IsoGraph work. Generic Aider coding routes are not strict cold-evidence paths.

## Qualification resource discipline

External Gemini calls and GitHub Actions executions are scarce qualification resources. Read and follow `QUALIFICATION_RESOURCE_DISCIPLINE.md` before designing or running a new qualification experiment.

Minimize external model calls and CI executions **subject to complete semantic coverage, cold isolation, reproducibility, and sufficient independent evidence**. Prefer focused high-information regression tests over replaying unrelated already-covered controls after a narrow candidate revision.

Run deterministic syntax, hash, packet-integrity, provenance, and mechanical checks before spending an external semantic call. Do not rerun Gemini or CI merely to seek a more favorable answer. Additional external calls/runs require a concrete evidentiary or infrastructure reason and should be recorded in final qualification provenance.
