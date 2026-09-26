# IsoGraph agent guidance

IsoGraph is an agent-native structural knowledge representation designed to expose invariants, isomorphisms, and common structure across independently expressed domains without erasing meaningful differences.

## Authority

Before substantive work, read `README.md`, `DESIGN_IDEALS.md`, `STATUS.md`, `MIGRATION.md`, and the semantic authority relevant to the task.

The accumulated family reference is a maintained final product. Read `FINAL_PRODUCT_MAINTENANCE.md` before any promotion/current-authority change. Repository authority changes are not operationally complete until `/IsoGraph/IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx` has been refreshed and visually verified, or the maintenance step is explicitly recorded as outstanding.

`DESIGN_IDEALS.md` is explanatory doctrine, not semantic authority. Use it to preserve the intended reasoning posture without letting prose override versioned qualified semantics.

### Qualified Core authority

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` — qualified base;
- `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` — qualified cumulative clarification by `qualification/CORE_0_18_QUALIFICATION.md` / Experiment 017;
- `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md` — qualified cumulative assertion-support / exact-rendering clarification by `qualification/CORE_0_19_QUALIFICATION.md`, using Experiments 029/030 plus the six ESR-qualified renderings.

Current effective Core authority is Core 0.17 plus the exact qualified Core 0.18 and Core 0.19 clarifications. Bare IDs are **Semantic Identity (SI)** handles: representation-level referential identity used for addressing, sharing, matching, namespaces, allocation, reconstruction, and comparison. SI equality or inequality is not independently authoritative for any stronger identity relation.

### Qualified extension/module authority

Read:

- `qualification/QUALIFIED_MODULES_2026-09-26.md`
- `qualification/QUALIFIED_MODULES_2026-09-25.md` — historical predecessor
- `qualification/QUALIFIED_MODULES_2026-09-18.md` — older historical predecessor

The current manifest routes the exact qualified revisions of:

- QU 0.1;
- NEI 0.4;
- Discovery Protocols 0.1–0.7 cumulative current module;
- DTS 0.1.

The semantic files intentionally retain their historical `_CANDIDATE` filenames because those exact bytes were tested. **Filename suffix is not qualification status.** Use the authority manifest and exact content hashes.

Qualified extensions remain separately versioned dependencies and do not silently become Core.

The latest fully integration-qualified composition is now the exact Core 0.17 + Core 0.18 + Core 0.19 + QU 0.1 + NEI 0.4 + DP 0.1–0.7 + DTS 0.1 stack directly qualified by Experiment 031; see `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_19_2026-09-26.md`. The earlier Core-0.18 integration record remains immutable predecessor evidence.

### Successor status

Core 0.18, Core 0.19, Discovery Protocols through 0.7, and DTS 0.1 are qualified at their exact tested revisions. Experiment 031 directly qualifies the current full stack including Core 0.19 for its exercised dependency-closed scope. DTS profiles and Transition Structural Signatures remain separately versioned successor work.

For DTS work read:

- `extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`;
- `extensions/dts/DTS_NATIVE_VOCAB_0_1.md`;
- `qualification/DTS_0_1_QUALIFICATION.md`;
- `experiments/026/EXPERIMENT_026_FINAL_QUALIFICATION_REVIEW.md`;
- `qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md`;
- `experiments/027/EXPERIMENT_027_FINAL_QUALIFICATION_REVIEW.md`;
- `research/DTS_0_1_IMPLEMENTATION_PLAN.md`.

NEI 0.1/0.2 are historical qualified revisions. NEI 0.3 is an unqualified historical precursor. Current NEI authority is NEI 0.4 as pinned by the qualified-module manifest.

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

Within that cycle, **perception precedes judgment**. When a discrepancy appears, first preserve and characterize it. Before calling it a defect, determine whether the compared observations have the same semantic quantity, scope, layer, aggregation level, authority, and closure assumptions. Treat hidden distinction, hidden scoped equivalence, unknown structure, and ordinary error as competing explanations until evidence separates them.

Qualification and discovery are separate questions. A decoder/scorer/output can be wrong for qualification while the anomaly that exposed the error remains a useful structural lead. Closing the qualification issue does not automatically close the discovery issue.

Treat prior conclusions, reviews, fixtures, expected results, verifier output, and issue text as evidence rather than authority. Preserve ambiguity, unknown structure, and residual distinctions. Do not create a new primitive, structural class, comparison relation, canonical factorization, canonical labeling requirement, or mandatory proof algorithm merely because a case is awkward or expensive.

Do not weaken dependency propagation merely to localize a newly exposed distinction. With exact provenance, downstream invalidation is evidence about how load-bearing the distinction was.

Keep these distinctions explicit:

- observation != judgment
- discrepancy != defect
- no observed difference != positive sameness evidence
- represented difference != automatic ontological distinctness
- unknown != irrelevant
- same scoped property != global identity
- classification != ontology
- qualification disposition != discovery disposition
- repair != explanation
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

Current qualified NEI authority is:

- `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md` — qualified NEI 0.4 semantics;
- `extensions/nei/NEI_NATIVE_VOCAB_0_2.md` and `extensions/nei/NEI_VOCAB_0_2.isg` — qualified native vocabulary companion.

Use the exact revision/hash recorded in `qualification/QUALIFIED_MODULES_2026-09-26.md`.

NEI 0.4's governing discipline is:

- identity query contexts ask the question; they do not declare the answer;
- `SAME`, `DISTINCT`, and semantic `UNKNOWN` are derived from the admissible identity-model family;
- exact identity evidence is distinct from probabilistic identity evidence;
- Bayes/log-Bayes factors measure evidence strength and never cross a threshold into exact identity;
- posterior probability is not NEI truth;
- evidence lineage/dependence is load-bearing and correlated evidence is not double-counted;
- QU is the uncertainty substrate whenever unresolved identity-relevant structure affects classification, likelihood, dependence, or evidence strength;
- QU does not supply an implicit probability distribution;
- missing required QU remains incomplete/unqualified, not semantic `UNKNOWN`;
- exact scoped quotient equivalence does not silently become global identity;
- identity-driven QU restriction or likelihood construction is circular and inadmissible.

The word **natural** remains explanatory and non-load-bearing. It is not an evidence source or ontology declaration.

Historical NEI 0.1 and NEI 0.2 remain immutable qualified evidence at their original revisions. NEI 0.3 remains an unqualified historical precursor. Do not use their older profile-answer-tag mechanism as parallel current authority.

## Discovery Protocols

Discovery Protocols 0.1–0.7 are the current cumulative qualified discovery module:

- `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md`
- `extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`

DP 0.5 adds observation-first discrepancy handling and separation of qualification from discovery disposition. DP 0.6 routes natural/domain identity conclusions through current qualified NEI 0.4 and uses QU 0.1 only when unresolved structure is load-bearing.

DP 0.7 adds primitive-first derived structural views. High-level labels do not define structure; multiple derived views may coexist; recurrence/unfolding unknowns remain QU-bearing where load-bearing; exit does not imply termination; cycles do not automatically imply recursion; lossy derived views do not replace primitive support; exact higher-order correspondence descends back to primitive support; DTS-sensitive differences remain load-bearing; and structural correspondence does not imply NEI `SAME`.

DP 0.7 qualification is recorded in:

- `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_7_QUALIFICATION_REVIEW.md`;
- `experiments/028/EXPERIMENT_028_FINAL_QUALIFICATION_REVIEW.md`;
- the completed three-positive-control campaign under `research/project-discovery/2026-09-25-dp07-three-positive-controls/`.

DP 0.7's conditional exact source-rendering path now routes through independently qualified Core 0.19 section 18 at the exact revision pinned by `qualification/CORE_0_19_QUALIFICATION.md`.

Experiment 031 directly confirms this routing compositionally inside the current full stack: workflow `36256020851`, 32/32 PASS, formal `QUALIFIES`; see `experiments/031/EXPERIMENT_031_FINAL_QUALIFICATION_REVIEW.md`.

Discovery Protocols provide ranked search guidance for candidate relations, common structure, factorizations, residuals, QUIs, transition correspondences, identity hypotheses, and derived views. **Discovery priority never supplies semantic proof authority.**

Evidence burden follows the conclusion. Structural correspondence does not become NEI `SAME`; represented difference does not become NEI `DISTINCT`; unresolved load-bearing structure remains QU-bearing; a derived view does not become an exact primitive substitute; and a qualified representation may still retain an open discovery lead.
## Evidence independence terminology

IsoGraph qualification distinguishes **execution independence** from **external authority**.

- A fresh context, cold prompt, blind packet, hidden oracle, different model, or different provider may improve execution independence and contamination resistance.
- A model instance or provider used inside a project-controlled qualification campaign remains internal qualification evidence unless the truth conditions/oracle are genuinely external.
- Use **isolated verifier**, **cold verifier**, or **independent execution** for that internal isolation property.
- Historical artifact names or reports that say "independent verifier" remain immutable provenance; when citing them now, do not imply independent external validation.
- PASS/FAIL/PARTIAL/QUALIFIES dispositions retain their frozen meaning under the named qualification contract. They do not silently mean externally validated.
- External validation requires a separately identified external oracle, mechanical checker with independently grounded obligations, or genuinely independent reproduction as defined by EVIDENCE.md and the shared evidence policy.

This terminology rule changes no Core/module semantics and rewrites no historical qualification disposition.

## Qualification provenance

Core qualification remains revision-specific:

- Experiment 004 preserves Draft 0.15 broad qualification evidence;
- Experiment 005 qualified the obligation-sufficiency layer retained in Core 0.17.

Extension/module qualification is recorded in:

- `qualification/QUALIFIED_MODULES_2026-09-26.md`

The qualification campaign deliberately preserves failed runs:

- Experiment 009: joint QU/NEI formal failure; review identified output-contract defects plus one substantive missing-authority overreach.
- Experiment 013: fresh corrected focused QU/NEI run — `QUALIFIES`, QU 0.1 PASS, historical cumulative NEI 0.1/0.2 PASS.
- Experiment 016: fresh NEI 0.4 derived-identity/QU/Bayesian-evidence holdout — `QUALIFIES`, 18/18 cases PASS, zero mismatches, one external semantic call.
- Experiment 010: cumulative DP formal failure; review identified one hidden-oracle defect and one genuine omitted overclaim.
- Experiment 012: focused DP formal failure from an undisclosed mapping wire shape while semantic obligations were recovered.
- Experiment 014: fresh corrected DP mapping-contract run — `QUALIFIES` with zero mismatches; cumulative DP 0.1-0.4 promotion review recorded.
- Experiment 011: integrated formal failure due incomplete explicit overclaim rejection while the structural composition behavior was otherwise correct.
- Experiment 015: fresh corrected integrated run — `QUALIFIES` with zero mismatches.

Preserve every frozen historical disposition. Do not rewrite a failed score because later review identifies a fixture/scorer defect. Correct the generic contract, use fresh holdout material, and qualify the exact new campaign.

Provider/infrastructure failures that produce no semantic report may be retried only against the same frozen SHA/packet or a newly frozen revision with the reason recorded.

Cold-test isolation remains mandatory when qualification depends on fresh semantic reconstruction: hidden assertions, expected mappings, prior decoder outputs, and author audits must remain unavailable until the output is frozen.

Experiment 015 establishes compatibility for its historical Core 0.17 + QU 0.1 + NEI 0.1/0.2 + DP 0.1-0.4 composition. Experiment 016 separately qualifies current NEI 0.4 with Core 0.17 + QU 0.1. Do not cite Experiment 015 as fresh NEI 0.4 + DP integration evidence.

## External agent execution paths

Reusable coding, OpenRouter, strict-cold, byte-identical panel, agent-host, and GitHub-connector routes are documented in the private control repository:

```text
iteathen/OX-Alpha-Contol/AGENT_EXECUTION_PATHS.md
```

Use that file for execution routing only. IsoGraph's own authority, isolation, qualification, and merge rules remain controlling for IsoGraph work. Generic Aider coding routes are not strict cold-evidence paths.

## Qualification resource discipline

External Gemini calls and GitHub Actions executions are scarce qualification resources. Read and follow `QUALIFICATION_RESOURCE_DISCIPLINE.md` before designing or running a new qualification experiment.

Minimize external model calls and CI executions **subject to complete semantic coverage, cold isolation, reproducibility, and sufficient execution-independent evidence within the qualification scope**. Prefer focused high-information regression tests over replaying unrelated already-covered controls after a narrow candidate revision.

Run deterministic syntax, hash, packet-integrity, provenance, and mechanical checks before spending an external semantic call. Do not rerun Gemini or CI merely to seek a more favorable answer. Additional external calls/runs require a concrete evidentiary or infrastructure reason and should be recorded in final qualification provenance.
