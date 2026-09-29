# IsoGraph

**An agent-native system for exact structural representation, primitive-logic closure, cross-domain discovery, and evidence-bounded inquiry.**

IsoGraph is built around a simple but demanding idea:

> Represent the promised semantic content exactly enough that names and familiar abstractions can be removed, then let structural correspondence, residual difference, unknown structure, implicit consequence, and the need for new evidence emerge from the representation rather than being assumed in advance.

Cross-domain isomorphism remains a central use case, but it is no longer the whole project. IsoGraph now treats faithful primitive rendering, structured unknowns, recursive implicit assertion, discovery, experimental warrant, and experimental inquiry as one versioned family with explicit authority boundaries.

The working substrate hypothesis is:

~~~text
knowledge
=
scoped relational structure
+
lawful structural transformation
~~~

The native path is intended to be:

~~~text
IsoGraph -> agent -> IsoGraph
~~~

No mandatory English, JSON, theorem-language, database, tokenizer-specific, or model-specific translation layer belongs to the semantics.

IsoGraph is currently in **active research incubation**. Its qualified authority is modular:

- [Core Specification — Draft 0.17 Consolidated Qualified](CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md)
- [Core 0.18 Qualified Observation-First Clarification](qualification/CORE_0_18_QUALIFICATION.md)
- [Core 0.19 Qualified Assertion-Support / Exact-Rendering Clarification](qualification/CORE_0_19_QUALIFICATION.md)
- [Core 0.20 Qualified Primitive-Logic-Closure Clarification](qualification/CORE_0_20_QUALIFICATION.md)
- [Core 0.21 Qualified Rendering-Conservation / Schema-Closure Clarification](qualification/CORE_0_21_QUALIFICATION.md)
- [Qualified Module Authority Manifest — 2026-09-29 Core 0.21 successor](qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md)
- [Historical same-day Qualified Module Authority Manifest — pre-Core-0.21](qualification/QUALIFIED_MODULES_2026-09-29.md)
- [Historical Qualified Module Authority Manifest — 2026-09-28](qualification/QUALIFIED_MODULES_2026-09-28.md)
- [Historical Qualified Module Authority Manifest — 2026-09-26](qualification/QUALIFIED_MODULES_2026-09-26.md)
- [Historical Qualified Module Authority Manifest — 2026-09-25](qualification/QUALIFIED_MODULES_2026-09-25.md)
- [Older Qualified Module Authority Manifest — 2026-09-18](qualification/QUALIFIED_MODULES_2026-09-18.md)
- [Discovery Protocols 0.1–0.10 Qualification Review — 2026-09-29](qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_10_QUALIFICATION_REVIEW.md)
- [Experimental Inquiry 0.1 Qualification](qualification/EXPERIMENTAL_INQUIRY_0_1_QUALIFICATION.md)
- [Current Integrated Stack with Core 0.21 — 2026-09-29](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_21_2026-09-29.md)
- [Historical same-day Integrated Stack with DP 0.10 and EI 0.1](qualification/CURRENT_INTEGRATED_STACK_WITH_DP_0_10_EI_0_1_2026-09-29.md)
- [Historical Integrated Semantic Stack with Core 0.20 and DP 0.8 — 2026-09-28](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md)
- [Historical Integrated Semantic Stack with Core 0.19 — 2026-09-26](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_19_2026-09-26.md)
- [Historical Integrated Semantic Stack with DP 0.7 — 2026-09-26](qualification/CURRENT_INTEGRATED_STACK_WITH_DP07_2026-09-26.md)
- [Maintained IsoGraph Family Reference (DOCX)](IsoGraph_Family_Reference_Joshua_Oshiro_2026.docx) — durable accumulated final product stored beside this README; repository semantic authority remains the exact versioned specifications/qualification records.

Core remains distinct from separately versioned qualified extensions.

## Current project mission

The current IsoGraph family is aimed at a repeatable reasoning loop:

~~~text
freeze source interpretation + semantic scope + Source Semantic Census

-> render every load-bearing in-scope obligation
   down to primitive logic / exact raw incidence
   without silently shrinking the target

-> preserve residuals and genuine structured unknowns

-> generate and validate implicit assertions recursively

-> if deeper reduction, scope, QU, authority, or inference-profile state changes:
       invalidate the old current IA fixed point
       reopen IA closure

-> use Discovery Protocol to search for structure,
   minimum sufficient support, useful valuations,
   falsifiers, and unresolved evidence needs

-> when existing represented evidence is insufficient
   but experimentation is justified:
       issue a DP 0.10 Experimental Warrant

-> use Experimental Inquiry to generate new observations

-> return those observations as evidence,
   not as truth by fiat

-> admit conclusions only through the authority
   that actually owns them
~~~

The system is deliberately **observation-first, primitive-first, and non-evasive**. Difficulty reducing a claim is not permission to delete it; an unexpected result is evidence before it is a diagnosis; and a successful discovery or experiment does not bypass semantic qualification.

## Current research applications

The repository contains several substantial application campaigns. They are testbeds and research outputs, not the definition of IsoGraph's mission:

- [P-vs-NP research](research/p-vs-np/README.md) — primitive computation structure, recursive IA, continuation-support reductions, and explicit non-resolution of P versus NP.
- [Glycan cleavage research](research/glycan-cleavage/2026-09-27/README.md) — exact phase dynamics, quotient structure, path coverage, witness-width growth, and algorithmic consequences in an idealized biochemical model.
- [Navier–Stokes proof rendering](research/navier-stokes-proof/README.md) — source-faithful structural decomposition, generator/closure separation, and dimensional-equivalence analysis of a pinned proof corpus.

---

## Research publications

- [Continuation-Support Reductions for Bounded Existential Computation](research/publications/2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_REDUCTIONS_0_1.md) — Joshua Oshiro. Structural synthesis of established continuation equivalence, simulation/dominance, dead-support pruning, factorization, and accessibility results; possible synthesis-level contribution only. No P-vs-NP resolution or new lower-bound claim.
- [Exact Phase Algebra and High-Order Synchronization in Optimal Enzymatic Cleavage Trajectories — reviewed revision 0.3](research/publications/2026-09-27/GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_3.md) — Joshua Oshiro. Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro. Revision 0.3 makes Higman finiteness explicit, separates general path coverage from the singleton subsequence specialization, preserves exact witness width 173 / OPT = 21, and sharpens the Experiment 047 bug prediction to exact accidental length-9 universal minimum 19 while leaving unbounded ternary witness width open.
- [2026-09-26 publications](research/publications/2026-09-26/)

---

## Evidence status

Start with [EVIDENCE.md](EVIDENCE.md), the machine-readable [claim registry](evidence/claims.json), and the [external-validation index](evidence/external/README.md).

IsoGraph's cold packets, isolated verifier runs, holdouts, scorers, and qualification manifests are **INTERNAL-QUALIFICATION** evidence. Fresh context, hidden oracles, different models/providers, and blind packets can improve execution independence, but they do not by themselves create independent external authority. **No general independent external validation of IsoGraph's formal/structural claims is currently registered.**

Historical PASS/FAIL/PARTIAL/QUALIFIES dispositions remain preserved at their frozen revisions; this evidence classification does not rewrite them.

Current status, design posture, and provenance:

- [DESIGN_IDEALS.md](DESIGN_IDEALS.md) — explanatory design doctrine: perception before judgment, scoped sameness, unknown preservation, exact collapse, and discrepancy-as-discovery;
- [STATUS.md](STATUS.md) — current qualified/candidate authority state;
- [MIGRATION.md](MIGRATION.md) — repository provenance;
- [AGENTS.md](AGENTS.md) — agent operating guidance.
- [FINAL_PRODUCT_MAINTENANCE.md](FINAL_PRODUCT_MAINTENANCE.md) — maintenance contract for the repository-root accumulated final-product DOCX and its Library publication mirror.
- [PUBLICATION_ATTRIBUTION_POLICY.md](PUBLICATION_ATTRIBUTION_POLICY.md) — publication authorship/provenance rule: Joshua Oshiro author attribution, IsoGraph Project references, agent-assistance disclosure, and explicit credit that IsoGraph was designed by Joshua Oshiro.

The design doctrine does not override the versioned semantic specifications. It explains why the specifications preserve scope, residuals, unknown structure, and revision-scoped evidence.

---

# Design posture

IsoGraph is deliberately **observation-first**.

A discrepancy is not automatically a defect. A missing observed difference is not automatically sameness. A represented difference is not automatically ontological distinctness. The first question is what the observation actually denotes, under what scope, at what layer, and with what completeness authority.

The working posture is:

~~~text
perceive
-> preserve
-> distinguish
-> compare scope / quantity / authority / closure
-> explore hidden difference or hidden equivalence
-> falsify
-> only then conclude or repair
~~~

This matters because the representation is supposed to expose structure that was not already known. If every inconsistency is immediately normalized away, the system can destroy the evidence it was designed to reveal.

At the same time, IsoGraph does not romanticize anomalies. An ordinary error is a valid outcome once the structural alternatives have been examined sufficiently.

See [DESIGN_IDEALS.md](DESIGN_IDEALS.md) for the full doctrine.

---

# Why IsoGraph exists

Important common structure is often hidden by representation.

Two independently written systems may differ in:

- names;
- terminology;
- notation;
- IDs;
- namespaces;
- file boundaries;
- proof techniques;
- intermediate objects;
- coordinate systems;
- serialization;
- decomposition depth;
- source conventions;
- implementation choices.

Yet beneath those differences they may share the same relational structure.

Conversely, two things may look almost identical while differing in one load-bearing relation, multiplicity, boundary, constraint, dependency, or residual.

A useful structural language has to succeed in **both directions**:

~~~text
find real correspondence despite superficial difference
~~~

and:

~~~text
preserve real difference despite superficial similarity
~~~

That is the central IsoGraph problem.

---

# The design target

IsoGraph is not trying to build the largest ontology or the most feature-rich surface syntax.

It is trying to build a **small information-preserving structural substrate** from which richer constructions can be represented, compared, transformed, verified, and discovered.

The current qualified Core is cumulative through **Core 0.21**. The substrate stays deliberately small: representation-level Semantic Identity handles, ordered relational incidence, scope/binding structure, rewrite/constraint structure, primitive logical relations, and raw carrier/data atoms where no hidden behavior is being smuggled into the leaf.

Later Core clarifications tighten how that substrate is used:

- Core 0.19 separates assertion bodies from their support, requires exact source-semantic reconstruction, and permits recursive Implicit Assertion passes;
- Core 0.20 requires every definitionally reducible load-bearing semantic construction to descend to primitive logic rather than stop at a familiar domain label;
- Core 0.21 freezes the complete Source Semantic Census and scope, forbids qualification by silent scope shrinkage, introduces exact **Schema Closure** for finitely described iterative/generative semantics, and reopens IA closure when load-bearing representation state changes.

High-level concepts are still useful. They belong as derived, reversible views over primitive support rather than as convenient authoritative stopping points.

The current admission discipline is therefore:

~~~text
freeze what the source promises
-> render every load-bearing obligation
-> unfold every reducible semantic operator
-> preserve genuine unknowns without using QU as missing-work camouflage
-> prove exact reconstruction / coverage / scope integrity
-> keep high-level views only when primitive support survives their deletion
~~~

This keeps the substrate small without obtaining simplicity by throwing away semantic obligations.

---

# A tiny native example

Current native-text artifacts use the **.isg** extension.

A simple scope containing two ordered relations can look like:

~~~isg
[
  (^100 1 2 3)
  (^101 3 4)
]
~~~

The important thing is not the surface punctuation.

The important thing is the recoverable structure:

- relation identity;
- ordered incidence positions;
- shared referents;
- occurrence multiplicity;
- scope;
- applicable revision/profile/authority.

The file extension itself carries no semantic authority:

~~~text
.isg
!= semantic revision
!= comparison view
!= primitive-status claim
~~~

See [NATIVE_FORMAT.md](NATIVE_FORMAT.md).

---

# Semantic Identity: addressability without metaphysical overreach

Bare IDs in Core are **Semantic Identity (SI)** handles.

Within the applicable SI namespace:

~~~text
same SI
    -> same represented referent
~~~

But:

~~~text
same SI
    != proof of stronger natural / ontological identity
~~~

and:

~~~text
different SIs
    != proof of natural distinctness
~~~

This is a major design boundary.

IsoGraph needs stable addressing, sharing, reconstruction, matching, namespaces, and allocation. It does **not** smuggle a universal theory of identity into those mechanics.

Stronger identity questions belong to an explicit theory/profile/extension with their own evidence burden.

The current qualified extension authority for that purpose is:

- [Natural Entropic Identity 0.4](extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md)

NEI 0.4 is a **qualified semantic extension** at the exact revision recorded in the qualified-module authority manifest. Identity results are derived from facts/evidence/QU and admissible identity models rather than supplied by profile answer tags. Exact identity remains separate from Bayesian evidence/confidence. NEI remains separate from Core; qualification does not make natural identity implicit.

NEI 0.1/0.2 remain historical qualified revisions, and NEI 0.3 remains an unqualified historical precursor.

---

# Source-faithful representation and comparison are different jobs

One of IsoGraph's most important distinctions is:

~~~text
source-faithful representation
    !=
comparison view
~~~

The representation should preserve what the source actually says.

The comparison layer may then choose an explicit, frozen view specifying which distinctions are rigid, mappable, parameterized, projected, or otherwise treated under the active claim.

That prevents a dangerous shortcut:

> changing the source representation after seeing the analogy you want to prove.

The intended order is closer to:

~~~text
source
-> independently frozen representation / factorization
-> representation-only normalization
-> explicit comparison view
-> structural search
-> witness / residual
-> verification
-> only then class recognition or labels
~~~

This is designed to make structural discovery harder to cheat—by either a human investigator or a pretrained model.

---

# Structural relations have explicit strength

IsoGraph does not collapse every resemblance into “same structure.”

The current Core distinguishes, among other things:

- isomorphism;
- strong embedding;
- weak embedding;
- homomorphism;
- simulation / bisimulation under a profile;
- quotient / projection;
- specialization;
- parametric structural correspondence;
- certified non-isomorphism.

For example:

~~~text
weak embedding
~~~

may be valid even where:

~~~text
strong / induced embedding
~~~

fails because the target contains an additional load-bearing relation.

The extra target structure remains an explicit residual rather than being silently ignored.

Likewise:

~~~text
NO_WITNESS_FOUND
!= CERTIFIED_NON_ISOMORPHIC
~~~

A negative claim requires either complete search for the declared finite problem or a verified separating invariant/certificate.

Resource exhaustion is not proof.

---

# Residuals are first-class information

IsoGraph is not a similarity engine whose objective is to maximize a score by deleting awkward differences.

A comparison should expose:

~~~text
common core
+
left residual
+
right residual
+
mapping / gluing information
~~~

The residual can be more important than the match.

It can show:

- the exact distinction between two theories;
- a missing constraint;
- a different boundary condition;
- a stronger target relation;
- a domain-specific mechanism;
- a new candidate invariant;
- where an analogy stops being valid.

This is why “almost isomorphic” can be scientifically useful rather than merely a failed comparison.

---

# Alternative factorizations are allowed

A major problem in cross-domain comparison is that one source may represent a concept as one object while another decomposes the same role into several steps.

IsoGraph therefore does **not** assume one canonical factorization.

~~~text
one valid factorization
!= canonical factorization
~~~

Different independently justified decompositions can coexist.

A claim discovered at one factorization node remains local to that node unless the declared factorization space has been covered or certified.

This prevents two opposite errors:

- missing a real correspondence because the sources decompose differently;
- claiming global correspondence merely because one convenient decomposition happened to match.

---

# No mandatory global canonicalization

Graph systems are often assumed to need one global canonical form.

IsoGraph deliberately does not make that a semantic prerequisite.

A direct verified isomorphism can be sufficient for an isomorphism claim even if no canonical representative is produced.

Canonical serializers, labelers, hashes, and fingerprints can still be extremely useful for retrieval and implementation, but their scope and invariance claims must be explicit.

~~~text
canonicalization
!= semantic correctness prerequisite
~~~

This matters because global canonicalization can be expensive, factorization-sensitive, and capable of accidentally collapsing meaningful automorphism witnesses.

---

# Claim-bounded verification

A central qualified result of the current Core is:

> A claim must discharge its complete dependency-closed obligation set, but it does not owe a stronger proof, stronger relation, stronger reconstruction layer, or stronger completeness result merely because those would also be interesting.

This has important consequences.

For an **existence** claim:

~~~text
one verified witness
may be enough
~~~

For a **complete witness-family** claim:

~~~text
family coverage must be proved
~~~

For a **weak relation**:

~~~text
do not require a stronger relation to succeed
~~~

For a **certified negative**:

~~~text
a valid separating invariant may discharge the claim
without exhaustive mapping search
~~~

For a **local factorization result**:

~~~text
do not silently promote it to factorization-space completeness
~~~

This is one of the ways IsoGraph controls proof/search explosion while preserving correctness.

---

# Unknown information can remain structural

A generic marker such as:

~~~text
UNKNOWN
~~~

throws away the shape of what is unknown.

The qualified **Quantifiable Unknown (QU) 0.1** extension represents a richer alternative:

- unresolved carriers;
- unresolved relation occurrences;
- known relationships among unresolved elements;
- constraints;
- admissible domains;
- boundaries between known/open structure;
- scope and closure authority;
- admissible realization semantics.

For example, these are different information states:

~~~text
A.x -> u1
B.x -> u2
~~~

and:

~~~text
A.x -> u
B.x -> u
~~~

The second says both roles share the same unresolved referent.

That is real information even though the value remains unresolved.

See:

- [Quantifiable Unknown 0.1](extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md)

QU 0.1 is a **qualified semantic extension** at the exact revision recorded in the qualified-module authority manifest. It remains separate from Core and is not silently active unless a claim/profile depends on it.

---

# Identity can remain open without being guessed

Qualified NEI semantics are intentionally conservative.

It does not infer sameness merely because no difference has been found.

~~~text
no evidence for DISTINCT
    != SAME

no evidence for SAME
    != DISTINCT
~~~

Application differences are preserved exactly as represented.

A difference in implementation, source file, factorization, namespace, or formalism does not automatically become a natural-identity distinction.

Conversely, a structural correspondence does not automatically become natural identity.

This keeps the system from turning structural analogy into metaphysical overclaim.

---

# Discovery is separate from authority

IsoGraph's qualified cumulative Discovery Protocol module (DP 0.1–0.10) provides ranked, adaptive strategies for finding candidate:

- correspondences;
- invariants;
- common cores;
- residual structures;
- alternative factorizations;
- QU isomorph candidates;
- identity hypotheses;
- proof/witness correspondences.

But:

~~~text
discovery priority
    != semantic authority

retrieval hint
    != structural witness

candidate correspondence
    != qualified claim
~~~

Discovery may explore speculative leads cheaply.

Promotion still requires the normal structural/evidentiary obligations.

Qualified cumulative revisions:

- [Discovery Protocols 0.1](extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md)
- [Discovery Protocols 0.2](extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md)
- [Discovery Protocols 0.3](extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md)
- [Discovery Protocols 0.4](extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md)
- [Discovery Protocols 0.5](extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md)
- [Discovery Protocols 0.6](extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md)
- [Discovery Protocols 0.7](extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md)
- [Discovery Protocols 0.8 — clue-preserving discrepancy adjudication](extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md)
- [Discovery Protocols 0.9 — Minimum Sufficient Support / Valuation](extensions/discovery/DISCOVERY_PROTOCOLS_0_9_MINIMUM_SUFFICIENT_SUPPORT_VALUATION_CANDIDATE.md)
- [Discovery Protocols 0.10 — Experimental Warrant](extensions/discovery/DISCOVERY_PROTOCOLS_0_10_EXPERIMENTAL_WARRANT_CANDIDATE.md)

The historical filenames retain `_CANDIDATE` because those exact bytes were qualified. Current status is defined by the authority manifest, not by the filename.

The cumulative progression matters:

- DP 0.4 requires concrete structural breakers rather than treating “different machinery” as a refutation;
- DP 0.7 makes derived views primitive-first and routes exact claims back to primitive support;
- DP 0.8 treats discrepancies as evidence before diagnosis and separates repair from discovery disposition;
- DP 0.9 asks which represented support is actually sufficient for a declared conclusion and values lawful alternatives only after validity;
- DP 0.10 decides when the represented evidence justifies generating new observations.

When DP 0.10 issues an Experimental Warrant, [Experimental Inquiry 0.1](extensions/experimental/EXPERIMENTAL_INQUIRY_0_1_CANDIDATE.md) may construct and revise experiments, discover scope, preserve unexpected/model-breaking observations, and return new evidence. EI does not make its observations true by fiat and does not absorb Core, QU, NEI, DTS, or DP authority.

---

# A cross-domain discovery example

Experiment 008 tested whether a cold agent could recover common structure between two independently presented derivations with different mechanisms.

The hidden common architecture was roughly:

~~~text
fixed generator + seed
    -> generated forward sequence

finite ambient capacity
    -> dependency / repetition witness

witness
    -> finite recurrence / repeat constraint

same generator
    -> constraint propagated forward

finite initial data + persistent rule
    -> infinite future reconstructible
~~~

But the mechanisms were deliberately different.

Alpha used:

~~~text
literal state collision
-> equality propagation
-> eventual periodic repetition
~~~

Beta used:

~~~text
linear dependence
-> coefficient recurrence
-> no requirement of repeated vectors
~~~

A successful result had to recover the common structure **and preserve that residual distinction**.

The cold run recovered all five hidden motifs and all three deep motifs, preserved the residuals, recorded falsification attempts, rejected the required overclaims, and stayed bounded to **SUPPORTED_CANDIDATE**.

That is exactly the behavior IsoGraph is trying to encourage:

~~~text
find the deep common structure
without pretending the mechanisms are identical
~~~

---

# Why IsoGraph is useful

## 1. Cross-domain synthesis without vocabulary dependence

IsoGraph is designed to compare relational shape rather than relying on shared terminology.

That creates a path toward finding correspondences across independent papers, mathematical formalisms, programs, specifications, proofs, workflows, physical models, agent traces, and structured unknowns.

## 2. Meaningful difference survives comparison

A common-core result does not require deleting unmatched structure.

Residuals remain explicit.

That makes structural analogy more trustworthy and often more informative.

## 3. Representations can be compared without forcing one decomposition

Alternative exact factorizations can coexist.

This matters whenever independently authored sources choose different intermediate structures.

## 4. No translation into a theorem prover or database is semantically mandatory

IsoGraph may interoperate with theorem systems, databases, learned indexes, or graph engines, but none of them defines the native semantics.

The agent can remain in one structural representation from input through reasoning to output.

## 5. Machine-facing structure can preserve more than prose summaries

An agent can receive explicit dependencies, boundaries, multiplicity, ordered roles, negative conditions, provenance, uncertainty, witnesses, and residuals.

That reduces the need to reconstruct these distinctions repeatedly from natural language.

## 6. Native self-description is possible

Policies, witnesses, certificates, results, and schemas can themselves be represented as IsoGraph structure.

Experiment 004 directly exercised native self-representation of policy/witness/result topology.

That creates the possibility of a system that can reason structurally about its own comparison and verification machinery.

## 7. Structural classes are schemas, not labels

A structural class is not just a familiar name attached to an object.

It can be an immutable/versioned schema graph with ports, parameter slots, rigid/mappable roles, positive and negative constraints, admissible views, residual policy, specialization rules, falsifiers, and qualification evidence.

The label is downstream of the shape.

## 8. Multiple witnesses are preserved when they matter

Different automorphisms or mappings are not silently collapsed merely because a serializer prefers one representative.

Witness quotienting is allowed only relative to a frozen context/equivalence with appropriate coverage.

## 9. Negative results can be efficient without becoming heuristic guesses

A separating invariant can certify non-isomorphism where appropriate.

That avoids requiring exhaustive mapping search for every negative result.

But an unqualified fingerprint mismatch or incomplete search cannot be promoted into proof.

## 10. Retrieval can be fast without letting retrieval become evidence

Indexes, fingerprints, learned similarity, and canonical labels can accelerate candidate generation.

They remain retrieval machinery unless separately qualified for a stronger role.

This separation allows practical optimization without weakening semantic standards.

## 11. Ambiguity can remain ambiguity

IsoGraph does not require every uncertain source interpretation to be repaired before representation.

Alternative source interpretations can remain explicit, and downstream conclusions can remain conditional.

That is preferable to silently inventing certainty.

## 12. Revision provenance is part of correctness

Qualified schemas, policies, witnesses, and dependencies resolve to immutable content.

Old witnesses do not silently qualify changed semantics.

Historical evidence stays attached to the revision that produced it.

## 13. Composition is structural

Boundaries and ports can expose what a structure makes available to the outside world.

This creates a basis for composition, substitution, gluing, and comparison without flattening internal structure by default.

## 14. Rewrites are first-class but activation is separate

The existence of a rewrite rule does not mean the rule is active.

~~~text
rule existence
!= rule activation
~~~

That distinction matters for representing systems with multiple possible transitions, strategies, policies, or contexts.

## 15. Unknowns can participate in isomorphism and discovery

If uncertainty has relational structure, two independent unresolved systems may themselves exhibit common structure before either uncertainty is resolved.

That can be more useful than spending resources to resolve details that are irrelevant to the structural question.

## 16. Strong conclusions cost more; weak conclusions do not pay for them

The proof/search burden follows the claim.

This is both a correctness principle and a semantic efficiency principle.

It prevents “formal rigor” from automatically meaning “perform every possible expensive computation.”

## 17. The representation is designed to be falsifiable

The specification explicitly names failure classes and falsification targets.

A difficult test is not supposed to be “fixed” by inventing a new primitive or changing the comparison view after seeing the answer.

The project asks first whether the failure is parser/serialization, semantic ambiguity, representation expressiveness, comparison/discovery, fixture/protocol, decoder/search implementation, or reviewer misunderstanding.

Only then should the specification change.

---

# Common objections and how IsoGraph addresses them

IsoGraph is intentionally ambitious, so several reasonable objections arise immediately.

The project does not dismiss them. Many of them directly shaped the specification and qualification suite.

| Common concern | IsoGraph response |
| --- | --- |
| **“Graph matching is expensive.”** | Correct in the general case. IsoGraph does not require global exhaustive matching for every claim. Candidate retrieval, pairwise comparison, and witness verification are separated; qualified invariants can prune or certify negatives; claim-bounded obligations avoid stronger search than the conclusion requires. |
| **“Canonicalization will become a bottleneck.”** | Global canonicalization is not a semantic prerequisite. Direct verified witnesses are allowed; canonical serializers/indexes are scoped implementation tools with explicit invariance claims. |
| **“Different decompositions will hide correspondences.”** | Alternative independently justified factorizations are preserved. One factorization is not silently declared canonical. |
| **“Allowing many factorizations will explode the search space.”** | Claims are scoped to declared factorization/extraction coverage. Bounded or heuristic search is allowed as long as incomplete coverage is not misreported as a global negative. |
| **“Everything can be made to look isomorphic if you abstract enough.”** | Comparison views, relation signatures, allowed transformations, ports, and residual policy are frozen before scoring. Load-bearing distinctions cannot be deleted post hoc merely to improve a match. |
| **“A similarity engine will erase the interesting differences.”** | Residuals are first-class. Common core and residual accounting are both required for strong comparison claims. |
| **“A pretrained model will just recognize names instead of structure.”** | Qualification includes label-blind structural retrieval, anonymization, local-ID permutation, information isolation, synthetic/novel controls, and hidden holdouts. Labels are downstream handles, not evidence. |
| **“An agent can cheat by changing factorization after seeing the other side.”** | Independent factorization/extraction freeze is a governing qualification rule. Pair-conditioned exploration cannot be cited as blind evidence for the same claim. |
| **“IDs will be mistaken for real-world identity.”** | Core SI is explicitly representation-level identity/addressing only. Stronger identity requires separate authority such as NEI. |
| **“Different IDs will be treated as naturally different things.”** | SI inequality supplies no natural-distinctness conclusion. Separate SIs remain separate for addressing while stronger identity remains open. |
| **“Unknown values will destroy comparison.”** | Qualified QU 0.1 represents unknowns as constrained relational structure rather than opaque missing markers. |
| **“Formal systems overclaim certainty.”** | Unknown remains unknown; incomplete search remains incomplete; resource limits remain resource limits; unresolved source interpretations can remain explicit. |
| **“Proof obligations will grow without bound.”** | The qualified obligation-sufficiency layer is claim-bounded and dependency-closed. Stronger unrelated obligations are not imported merely because they exist. |
| **“One witness cannot represent symmetry.”** | One witness can discharge an existence claim; complete-family claims require family coverage. Distinct witnesses are preserved unless a context-scoped quotient is independently justified. |
| **“Hash/fingerprint mismatches will create false negatives.”** | A fingerprint may certify separation only when its necessary-invariant property is qualified for the exact frozen view/layer/factorization stage. Otherwise it is heuristic retrieval metadata. |
| **“Learned similarity scores will become fake proof.”** | Learned scores are retrieval metadata unless the score itself is part of the modeled domain. Witness verification remains separate. |
| **“Different algorithms/formalisms prove the structures are different.”** | Different machinery alone is not a structural breaker. DP 0.4 requires a concrete failed load-bearing obligation. |
| **“The system will accumulate primitives forever.”** | Core admission requires attempted lower construction, exactness testing, residual analysis, ambiguity testing, discovery behavior, and reconstruction-cost evidence. Specification growth is intentionally frozen until exercised. |
| **“The notation is not human-friendly.”** | Human readability is not the semantic target. Stable labels and higher-level surfaces may be retained for convenience while the underlying structure remains machine-native and reconstructible. |
| **“The representation will become huge.”** | Transparent references may compress serialization without changing semantics. Factorization and views can expose only claim-relevant structure, but omitted distinctions cannot be silently declared irrelevant. |
| **“Self-description creates circular proof.”** | Circular evidence is explicitly prohibited. A target claim cannot justify the decomposition or policy later cited as evidence for that same claim. |
| **“A verifier can just rubber-stamp the decoder.”** | Qualification separates cold reconstruction, hidden scoring, scorer-blind verification, and final review. Verifier output is evidence, not authority; Experiment 004 preserved partials where final review found defects a verifier missed. |
| **“Hidden scorers can accidentally test formatting instead of semantics.”** | Experiment 007 exposed exactly that failure. QRC 0.1 now separates semantic rejection coverage from serializer conformance, and Experiment 008 provided a fresh blind post-fix holdout. |
| **“A successful benchmark can overfit the benchmark itself.”** | IsoGraph separates development cases from sealed holdouts and treats repeatedly inspected holdouts as development evidence. |
| **“This proves too much about reality.”** | IsoGraph represents and compares declared structure. Structural isomorphism does not automatically imply semantic equivalence, natural identity, physical identity, or identical algorithms. Those are separate claims with separate authority. |

---

# What the qualification program has tested

IsoGraph's evidence record is intentionally revision-specific.

## Experiment 004 — broad Draft 0.15 qualification checkpoint

Final audited dispositions:

~~~text
PASS:     15
PARTIAL:   6
FAIL:      0
UNKNOWN:   0
~~~

The corpus exercised occurrence-preserving scope/rewrite semantics, nested boundaries, identity/namespace discipline, variable ownership, reference hygiene, source-local vs pairwise residual accounting, independent extraction freeze, embedding strength, common-core/residual accounting, multiple mappings, certified-negative discipline, index invariance, class non-vacuity, native self-description, source ambiguity, novel-class induction, structural-only retrieval, parser controls, NAC context, and serializer/index scoping.

The six PARTIAL results were preserved rather than repaired.

Final review found decoder/report/protocol/serialization defects, but **no surviving discrepancy demonstrated a representation-expressiveness failure** requiring a Core mutation.

See:

- [Experiment 004 Final Qualification Review](experiments/004/EXPERIMENT_004_FINAL_QUALIFICATION_REVIEW.md)

---

## Experiment 005 — obligation-sufficiency qualification

Experiment 005 focused on whether the specification was demanding unnecessary proof/search work.

Result:

~~~text
post-freeze scoring:
8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN

independent scorer-blind verifier:
VERIFIED

unresolved obligations:
none
~~~

The eight controls tested:

1. **Large automorphism family** — one witness suffices for an existence claim; complete-family claims require family coverage.
2. **Context-scoped witness quotient** — a quotient safe under one observation context can become invalid when a later context exposes a hidden role.
3. **Alternative factorization** — a correspondence at one independently frozen factorization node is local unless factorization-space coverage is established.
4. **Direct isomorphism without canonical form** — canonicalization is not a semantic prerequisite.
5. **Certified negative by separating invariant** — exhaustive mapping is not required when a valid certificate already discharges non-isomorphism.
6. **Weak vs strong relation** — a weak embedding may succeed while a stronger induced relation fails; verification must not silently demand the stronger relation.
7. **Reconstruction layers** — pairwise comparison-stage reconstruction can be qualified even when full-source reconstruction is unavailable, without promoting the result to the stronger source-level claim.
8. **Dependency closure** — an incomplete/malicious proof profile cannot omit a real load-bearing dependency and still qualify the claim.

This clarification layer is retained in Draft 0.17.

See:

- [Experiment 005 Final Qualification Review](experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md)

---

## Experiment 007 — blind discovery success, frozen formal failure

Experiment 007 was a strict cold structural-discovery holdout.

The decoder was isolated from the hidden oracle, hidden assertions/scorer, prior experiment results, repository maps, and external browsing.

Semantic recovery:

~~~text
hidden motifs: 5 / 5
deep motifs:   3 / 3
~~~

The decoder also preserved residuals, recorded falsification, kept promotion bounded, and recovered the intended deep proof-role correspondences.

However, the **frozen automatic disposition remains**:

~~~text
DOES_NOT_QUALIFY
~~~

The decoder rejected every required overclaim semantically, but the hidden scorer required exact enum spellings that the public prompt had not required.

IsoGraph did **not** rewrite history or rerun the holdout after unblinding.

Instead, that defect produced a versioned qualification-infrastructure correction.

See:

- [Experiment 007 Blind Holdout Review](experiments/007/EXPERIMENT_007_BLIND_HOLDOUT_REVIEW.md)
- [Qualification Rejection Contract 0.1 Candidate](qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md)

This experiment demonstrates a key research principle:

> a semantic success does not justify changing a frozen formal score after the fact.

---

## Experiment 008 — fresh post-correction blind discovery

Experiment 008 used a new independent hidden holdout after QRC 0.1 and its deterministic tests were frozen publicly.

The cold decoder again received only the permitted authority, source derivations, and prompt.

Result:

~~~text
frozen automatic score: QUALIFIES

hidden motifs: 5 / 5
deep motifs:   3 / 3

residual preservation: PASS
falsification:          PASS
overclaim rejection:    PASS
cold isolation:         PASS
promotion bound:        SUPPORTED_CANDIDATE
~~~

Every scorer guard passed.

The result is **fresh blind historical evidence for the Discovery Protocol line**.

At the time of Experiment 008 it did not itself promote DP, QRC, QU, or NEI. Later fresh campaigns preserved that history and separately qualified QRC infrastructure, QU/NEI, and cumulative DP 0.1-0.4. None of those promotions imports the extensions into Core.

See:

- [Experiment 008 Blind Holdout Review](experiments/008/EXPERIMENT_008_BLIND_HOLDOUT_REVIEW.md)

---

# Current evidence at a glance

| Evidence | Result | What it supports |
| --- | --- | --- |
| **Experiment 004** | 15 PASS / 6 PARTIAL / 0 FAIL / 0 UNKNOWN | Broad corpus-bounded evidence for Draft 0.15 representation/comparison semantics; no surviving expressiveness failure. |
| **Experiment 005** | 8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN + verifier VERIFIED | Qualified claim-bounded obligation sufficiency retained in Draft 0.17. |
| **Experiment 007** | Semantic motifs 5/5, deep 3/3; frozen score DOES_NOT_QUALIFY | Blind discovery success plus discovery of a hidden scorer/output-contract defect. |
| **Experiment 008** | QUALIFIES; motifs 5/5, deep 3/3; all guards pass | Fresh blind post-QRC evidence retained in the later cumulative Discovery Protocol qualification record. |
| **Experiment 031** | QUALIFIES; 32/32 full-stack cases PASS; all guards/module assessments pass | Historical direct integration qualification of the Core 0.19 + QU 0.1 + NEI 0.4 + DP 0.1–0.7 + DTS 0.1 stack. |
| **Experiment 048** | QUALIFIES; 18/18 fresh Core 0.20 cases PASS | Independent qualification of Core 0.20 primitive-logic closure. |
| **Experiments 050 + 051** | 21 valid principle-level PASS + 1/1 fresh target-5 replacement PASS | Independent cumulative qualification evidence for DP 0.8. |
| **Experiment 052** | QUALIFIES; 16/16 fresh full-stack cases PASS; all guards/module assessments pass | Historical direct integration qualification of the Core 0.20 + QU 0.1 + NEI 0.4 + DP 0.1–0.8 + DTS 0.1 stack. |
| **Experiment 053** | QUALIFIES; 20/20 fresh cases PASS | DP 0.9 Minimum Sufficient Support / Valuation qualification. |
| **Experiment 054** | QUALIFIES; 18/18 fresh cases PASS | DP 0.10 Experimental Warrant qualification. |
| **Experiment 055** | QUALIFIES; 18/18 fresh cases PASS | Experimental Inquiry 0.1 qualification. |
| **Experiment 056** | QUALIFIES; 16/16 fresh full-stack cases PASS; all module assessments supported | Historical same-day integration qualification of Core through 0.20 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1. |
| **Experiments 057 + 058** | Core 0.21 QUALIFIES; 25 uncontested cases PASS + 1/1 fresh target-26 replacement PASS | Core 0.21 Rendering Conservation, Schema Closure, and Closure Invalidation qualification. |
| **Experiments 059 + 060** | QUALIFIES; 15 uncontested integration cases PASS + 1/1 fresh ownership replacement PASS; all module assessments supported | Current integration qualification of Core through 0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1. |

The evidence is deliberately not collapsed into one global “IsoGraph is proven” claim.

Different revisions and extensions retain their own qualification state.

---

# Qualification is designed to resist self-confirmation

IsoGraph uses several mechanisms specifically because agent-generated research can otherwise become circular.

## Freeze before scoring

Relevant artifacts are frozen before external semantic execution.

## Hidden oracle separation

Expected mappings, scorer answers, and hidden assertions are unavailable to the cold decoder.

## Structural-only retrieval path

At least one qualification path must operate from discovery-visible native structure without relying on source-domain names or expected labels.

## Independent verification

Where warranted, a separate verifier receives only the material needed for its task.

## Final review still matters

Verifier output is evidence, not authority.

Experiment 004 retained several PARTIAL dispositions after final review found defects the blind verifier did not fully flag.

## Resource discipline

External model calls and CI runs are treated as scarce evidence resources.

The project prefers:

~~~text
deterministic preflight
-> one high-information cold run
-> deterministic scoring
-> one independent verifier only when justified
~~~

rather than repeatedly rerunning until a desirable answer appears.

See [QUALIFICATION_RESOURCE_DISCIPLINE.md](QUALIFICATION_RESOURCE_DISCIPLINE.md).

---

# Performance: what IsoGraph does and does not claim

IsoGraph does **not** currently claim a universal wall-clock speedup.

It does not prescribe one graph store, matching algorithm, canonicalizer, solver, database, hardware target, runtime, or neural architecture.

The qualified performance contribution is semantic:

> the specification does not require proof/search work stronger than the dependency-closed claim being made once qualified evidence has discharged that claim.

That leaves implementations free to use:

- hashes;
- indexes;
- partition refinement;
- symmetry handling;
- memoization;
- learned retrieval;
- domain-specific solvers;
- parallel search;
- compact references;
- hardware acceleration.

But performance optimizations do not automatically become evidence.

That separation is intentional.

---

# Why this may be particularly useful for AI agents

Human mathematical and scientific languages are optimized partly for human communication, history, notation, pedagogy, and convention.

Agents have a different opportunity.

They can operate on explicit relational structure directly.

A mature IsoGraph ecosystem could allow agents to:

- preserve exact dependencies across long projects;
- compare independently authored theories without lexical alignment;
- discover recurring structures across corpora;
- retain residual distinctions rather than over-summarizing;
- communicate proof/witness structure natively;
- represent unresolved information without flattening it;
- reuse qualified structure instead of re-deriving it from prose;
- reason over policies, witnesses, and their own structural records;
- search for invariants hidden by human naming conventions.

If models are eventually trained directly on IsoGraph, familiar structures may become cheap learned handles while the underlying formal structure remains available for verification.

Learned familiarity would still not be semantic authority.

The structure remains the authority.

---

# What IsoGraph is not

IsoGraph is not:

- a claim that all domains are literally graphs in a metaphysical sense;
- a universal theorem prover;
- a universal ontology;
- a mandatory canonicalization algorithm;
- a similarity score;
- a natural-identity oracle;
- a replacement for domain semantics;
- a database format pretending to be logic;
- a requirement to enumerate every possible mapping;
- a license to discard inconvenient residuals;
- a guarantee that all discovery is computationally cheap;
- a claim that structural isomorphism implies semantic equivalence;
- a claim that one successful benchmark proves universal discovery ability;
- a license to shrink a declared rendering scope because reduction is difficult;
- a rule that every loop/recursion must be exhaustively unrolled;
- an experiment engine whose observations become truth automatically.

It is a structural representation and qualification framework whose claims are intentionally scoped.

---

# Current authority and extension status

## Qualified Core authority

Current Core authority is cumulative:

- [Core 0.17 qualified base](CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md)
- [Core 0.18 qualified observation-first clarification](CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md)
- [Core 0.18 qualification record](qualification/CORE_0_18_QUALIFICATION.md)
- [Core 0.19 qualified assertion-support / exact-rendering clarification](CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md)
- [Core 0.19 qualification record](qualification/CORE_0_19_QUALIFICATION.md)
- [Core 0.20 qualified primitive-logic-closure clarification](CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md)
- [Core 0.20 qualification record](qualification/CORE_0_20_QUALIFICATION.md)
- [Core 0.21 qualified rendering-conservation / schema-closure clarification](CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md)
- [Core 0.21 qualification record](qualification/CORE_0_21_QUALIFICATION.md)

Core 0.18, Core 0.19, Core 0.20, and Core 0.21 are qualified at their exact tested bytes even though the historical filenames retain `_CANDIDATE`.

## Qualified extensions/modules

Current exact routing authority is recorded in:

- [Qualified Module Authority Manifest — 2026-09-29 Core 0.21 successor](qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md)

Older manifests remain immutable historical routing records, including the 2026-09-28 predecessor.

Current qualified modules:

- [Quantifiable Unknown 0.1](extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md)
- [Natural Entropic Identity 0.4](extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md)
- [Discovery Protocols 0.1–0.10](qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_10_QUALIFICATION_REVIEW.md)
- [Experimental Inquiry 0.1](extensions/experimental/EXPERIMENTAL_INQUIRY_0_1_CANDIDATE.md) — [qualification record](qualification/EXPERIMENTAL_INQUIRY_0_1_QUALIFICATION.md)
- [Detailed Transition System 0.1](extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md) — [qualification record](qualification/DTS_0_1_QUALIFICATION.md)

The 2026-09-26, 2026-09-25, and 2026-09-18 manifests remain immutable historical authority for the revisions they recorded.

Qualified extensions do **not** become Core. They remain explicit versioned dependencies.

## Qualified transition extension

[Detailed Transition System 0.1](extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md) is qualified at its exact tested bytes by Experiment 026.

- [DTS 0.1 Qualification Authority](qualification/DTS_0_1_QUALIFICATION.md)
- [Experiment 026 Final Qualification Review](experiments/026/EXPERIMENT_026_FINAL_QUALIFICATION_REVIEW.md)
- [DTS 0.1 Implementation Plan](research/DTS_0_1_IMPLEMENTATION_PLAN.md)

DTS remains a separately versioned extension and does not become Core. Transition Structural Signatures and mechanism/cost/concurrency/optimization profiles remain separately versioned successor work.

## Qualified qualification infrastructure

- [Qualification Rejection Contract 0.1](qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md)
- [QRC 0.1 Qualification Record](qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md)

QRC is qualification infrastructure, not semantic domain authority.

## Integrated compatibility

The latest fully integration-qualified composition is the exact Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20 + Core 0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1 stack qualified by the valid Experiment 059 I01–I15 surface plus fresh Experiment 060 ownership replacement. All exercised guards and module assessments pass; formal disposition `QUALIFIES`.

- [Experiment 059 Final Core 0.21 Integration Review](experiments/059/EXPERIMENT_059_FINAL_QUALIFICATION_REVIEW.md)
- [Experiment 060 Final Ownership Replacement Review](experiments/060/EXPERIMENT_060_FINAL_QUALIFICATION_REVIEW.md)
- [Current Integrated Stack with Core 0.21](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_21_2026-09-29.md)
- [Historical Experiment 052 Final Qualification Review](experiments/052/EXPERIMENT_052_FINAL_QUALIFICATION_REVIEW.md)
- [Historical same-day Integrated Stack with DP 0.10 and EI 0.1](qualification/CURRENT_INTEGRATED_STACK_WITH_DP_0_10_EI_0_1_2026-09-29.md)
- [Historical Current Integrated Stack with Core 0.20 and DP 0.8](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md)
- [Historical Experiment 031 Final Qualification Review](experiments/031/EXPERIMENT_031_FINAL_QUALIFICATION_REVIEW.md)
- [Historical Integrated Stack with Core 0.19](qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_19_2026-09-26.md)
- [Historical Experiment 028 Final Qualification Review](experiments/028/EXPERIMENT_028_FINAL_QUALIFICATION_REVIEW.md)
- [Historical Integrated Stack with DP 0.7](qualification/CURRENT_INTEGRATED_STACK_WITH_DP07_2026-09-26.md)
- [Experiment 027 Historical Predecessor Review](experiments/027/EXPERIMENT_027_FINAL_QUALIFICATION_REVIEW.md)
- [Historical Current Stack with DTS](qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md)

Experiment 019 remains the immutable pre-DTS integrated qualification record:

- [Experiment 019 Final Qualification Review](experiments/019/EXPERIMENT_019_FINAL_QUALIFICATION_REVIEW.md)
- [Pre-DTS Integrated Stack Qualification](qualification/CURRENT_INTEGRATED_STACK_2026-09-25.md)

Historical integrated qualification evidence also remains preserved, including Experiment 015 for its earlier dependency composition.

## Historical qualified evidence

- [Qualified Module Authority Manifest — 2026-09-18](qualification/QUALIFIED_MODULES_2026-09-18.md)
- [Draft 0.16 Consolidated Qualified](CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md)
- [Draft 0.15 Consolidated Candidate](CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md)

Historical evidence remains interpreted under the revision at which it was produced.

# Constitutional discipline

The current Core summarizes its intended discipline approximately as:

~~~text
preserve source semantics and unresolved ambiguity
-> independently decompose/extract as far as justified
-> preserve alternative exact factorizations
-> freeze roles/ports/relation signature/policy before pairing
-> normalize representation only
-> retrieve candidates through a structural-only path
-> compare under explicit target layer + view + transformation authority
-> state relation kind independently
-> emit native independently verifiable mapping/core/residual/gluing witnesses
-> keep source-local residual accounting separate from pairwise accounting
-> preserve negative constraints, multiplicity, and distinct mappings
-> recognize or induce classes only from verified structure
-> validate reusable classes on held-out/adversarial cases
-> retain useful labels afterward with provenance
~~~

And, until qualification says otherwise:

~~~text
surface != primitive
occurrence != Semantic Identity
factorization != normalization
one factorization != canonical factorization
semantic equivalence != structural isomorphism
retrieval hint != evidence
rule existence != activation
one witness != complete witness family
unknown remains unknown
revisions are immutable evidence
~~~

These barriers are not cosmetic terminology.

They exist because collapsing those distinctions creates exactly the false correspondences, false negatives, hidden proof obligations, and identity overclaims IsoGraph is meant to prevent.

---

# Repository map

~~~text
CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md
    current qualified semantic authority

STATUS.md
    current authority / evidence status

AGENTS.md
    research and agent operating guidance

DESIGN_IDEALS.md
    explanatory observation-first / unknown-preserving design doctrine

NATIVE_FORMAT.md
    .isg native-text convention

extensions/qu/
    qualified Quantifiable Unknown extension authority

extensions/nei/
    qualified Natural Entropic Identity extension authority

extensions/discovery/
    qualified cumulative structural Discovery Protocol module

extensions/dts/
    qualified Detailed Transition System extension plus separately versioned profiles

qualification/
    qualification infrastructure and contracts

experiments/
    frozen qualification / discovery evidence

research/
    research notes and historical analysis
~~~

---

# Research posture

IsoGraph is intentionally falsifiable.

The project should prefer a simpler mechanism whenever it preserves the same semantic fidelity and discovery safety.

A failing case should not automatically cause specification growth.

A successful case should not automatically cause promotion.

Historical failures and partials remain evidence.

Unknown remains unknown.

That discipline is part of the project, not overhead around it.

---

# Current status

~~~text
Core 0.17:
    QUALIFIED base authority

Core 0.18:
    QUALIFIED cumulative observation-first clarification
    decisive holdout: Experiment 017

Core 0.19:
    QUALIFIED cumulative assertion-support / exact-rendering clarification
    broad holdout: Experiment 029 (25/26 frozen PASS; formal failure preserved)
    corrected mutation regression: Experiment 030 (2/2 PASS, QUALIFIES)
    concrete exact-rendering evidence: six ESR-qualified/Q7-promoted renderings

Core 0.20:
    QUALIFIED cumulative primitive-logic-closure clarification
    decisive holdout: Experiment 048 (18/18 PASS)

QRC 0.1:
    QUALIFIED qualification infrastructure

QU 0.1:
    QUALIFIED
    decisive corrected holdout: Experiment 013

NEI 0.4:
    QUALIFIED current extension
    decisive holdout: Experiment 016 (18/18 PASS)

Discovery Protocols 0.1–0.10:
    QUALIFIED cumulative current discovery module
    DP 0.8 evidence: Experiment 050 valid 21-case surface + Experiment 051 target-5 replacement
    DP 0.9 evidence: Experiment 053 (20/20 PASS)
    DP 0.10 evidence: Experiment 054 (18/18 PASS)

DTS 0.1:
    QUALIFIED current transition extension
    decisive holdout: Experiment 026 (20/20 PASS)
    independent promotion verifier: SUPPORT_PROMOTION

Latest fully integration-qualified stack revision:
    Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20 + Core 0.21 + QU 0.1 + NEI 0.4 + DP 0.1–0.10 + DTS 0.1 + EI 0.1
    QUALIFIED by Experiment 059 valid I01-I15 + Experiment 060 fresh I16 replacement
    all exercised guards true; all module assessments SUPPORTED

Historical pre-DTS integrated stack:
    QUALIFIED by Experiment 019
    preserved as immutable predecessor evidence

NEI 0.1 + 0.2:
    HISTORICAL QUALIFIED revisions

NEI 0.3:
    HISTORICAL UNQUALIFIED precursor to NEI 0.4

Experiment 004:
    15 PASS / 6 PARTIAL / 0 FAIL / 0 UNKNOWN

Experiment 005:
    8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
    independent verifier: VERIFIED

Historical failed/partial qualification runs:
    preserved unchanged
    later corrected by fresh holdouts rather than rescoring
~~~

The current evidence supports using the qualified modules as explicit versioned authorities while preserving the same constitutional limits: unknown remains unknown, discovery is not proof, extensions are not Core, and integrated success is not universal completeness.
