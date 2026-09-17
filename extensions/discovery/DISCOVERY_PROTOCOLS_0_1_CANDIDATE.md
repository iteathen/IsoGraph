# IsoGraph Discovery Protocols — 0.1 Candidate

**Status:** unqualified agent-discovery module candidate  
**Short name:** DP 0.1  
**Core dependency:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` or an exact qualified bridge  
**Optional extension dependencies:** QU and NEI when a selected protocol reasons about unresolved structure or natural identity  
**Resource discipline:** `QUALIFICATION_RESOURCE_DISCIPLINE.md`  
**Growth rule:** adds no core syntax, irreducible primitive, comparison relation, proof rule, or semantic authority; Discovery Protocols rank and guide candidate generation only

---

# 0. Constitutional boundary

Discovery Protocols tell an agent **where and how to search for new structural information**. They do not determine whether a discovered relation is true.

```text
discovery priority
    != semantic authority

high-ranked protocol
    != stronger evidence

retrieval hint
    != structural witness

candidate correspondence
    != qualified IsoGraph claim

similarity
    != isomorphism

QUI candidate
    != qualified QUI

identity candidate
    != NEI SAME
```

A protocol may generate, expand, rank, or falsify a candidate. Promotion into a semantic claim occurs only under the governing IsoGraph/extension obligations for that claim.

The default DP ranking is a **search prior** ordered by expected probability of exposing new load-bearing structure. It is not a theorem and MUST adapt to evidence acquired during the search.

---

# 1. Mission

Discovery Protocols are ranked, adaptive procedures for AI agents to expose candidate:

- relations;
- invariants;
- structural correspondences;
- common cores;
- alternative factorizations;
- residual distinctions;
- QU correspondences and QUIs;
- identity hypotheses;
- proof/witness correspondences;
- transformation invariants;
- other structure that may be obscured by vocabulary, representation, decomposition, administrative boundaries, or unresolved information.

The intended optimization is qualitative:

```text
maximize expected new load-bearing structural information
per unit search / model / external-resource cost
```

No numerical expected-information model is required. An agent may use structural cues and accumulated evidence to estimate which protocol is currently most promising.

---

# 2. Discovery-state discipline

Before beginning a discovery pass, freeze or record enough authority to know:

```text
source artifacts + revisions
active IsoGraph semantic revision
active extension revisions
comparison/view authority
claim or research objective
allowed transformations/factorizations
known exclusions
resource budget / external-call constraints
current candidate/residual state
```

The agent SHOULD maintain a discovery ledger containing at least:

```text
protocol attempted
scope inspected
abstractions/views used
candidate relation found
candidate extent / mapping
residuals
falsification attempts
promotion status
next recommended protocols
reason for stopping or continuing
```

Do not repeatedly rediscover the same candidate under renamed local IDs when a prior candidate record can be reused.

---

# 3. Standard protocol contract

Every ranked Discovery Protocol is interpreted through the following fields.

## Objective
What new structural information the protocol is intended to expose.

## Priority cues
Observed features that raise this protocol above its default rank.

## Inspect
The exact structural roles, relations, constraints, boundaries, or evidence to examine.

## Abstract first
Representation details that should initially be demoted when they are not load-bearing under the governing comparison view.

## Generate
How to create candidate correspondences or invariants.

## Expand
How to grow a local candidate into a larger candidate without assuming the larger result.

## Falsify
Which load-bearing mismatches should be sought actively before promotion.

## Promote
What kind of candidate output is justified by the protocol itself and what additional semantic qualification is required.

## Residual handling
What unmatched structure must remain visible.

## Stop / cost
When further work on the protocol has low marginal information value and how to avoid unnecessary expensive search.

## Next
Which protocols should be dynamically promoted if this protocol finds a productive lead.

---

# 4. Adaptive ranking rules

The numbered ranking in Section 6 is the default prior. Agents MUST adapt it.

A protocol SHOULD be promoted when:

- a higher-ranked protocol exposes a structural lead that it directly extends;
- the source/domain already supplies the required structural view cheaply;
- a candidate residual specifically matches the protocol's target;
- the protocol can discharge or strongly constrain a currently open claim obligation;
- QU, NEI, factorization, or proof structure makes the protocol unusually informative.

A protocol SHOULD be demoted when:

- required structure is absent or intentionally opaque;
- a semantically stronger earlier protocol already subsumes the same search;
- repeated attempts produce only surface similarity;
- the protocol would require a high-cost transformation with little evidence of payoff;
- its likely output cannot affect the current research/claim objective.

The agent SHOULD stop a discovery direction when its estimated marginal structural information becomes low relative to cost, not merely after exhausting every lower-ranked protocol.

---

# 5. Resource-aware execution

Discovery follows `QUALIFICATION_RESOURCE_DISCIPLINE.md`.

Cheap deterministic/local structural work precedes external-agent or CI work. Reuse already extracted views, factorization results, hashes, mappings, and witnesses. Batch compatible searches over one structural projection when doing so does not destroy independence or ambiguity.

Discovery Protocols SHOULD NOT trigger external Gemini/GitHub executions merely because they exist in the ranking. External resources are justified only when they add semantic evidence, independent reconstruction, or required computation that cannot be obtained from the already available artifact state.

---

# 6. Default ranked discovery schedule

The default order runs from the highest expected information gain to the lowest. Each protocol remains heuristic and dynamically rerankable.

---

## DP-01 — Cross-boundary relational structure

**Objective:** expose relations hidden by module, theory, document, namespace, subsystem, proof, or open/fixed-region boundaries.

**Priority cues:** imports/exports, API edges, theorem dependencies, separately authored components, physical subsystem interfaces, QU boundaries, source-to-derived bridges.

**Inspect:** every boundary-crossing incidence; endpoint roles; direction; arity; multiplicity; dependency/constraint type; authority; reconstruction role.

**Abstract first:** filenames, module names, namespace numerals, source vocabulary, serialization location, administrative containment.

**Generate:** construct the crossing-relation graph for each boundary; match crossing patterns by roles and incidence rather than names. Compare many-internal-differences/same-external-pattern cases aggressively.

**Expand:** grow a crossing match one neighborhood inward and outward; test whether local boundaries are alternate cuts through a larger common structure.

**Falsify:** search for omitted boundary edges, incompatible multiplicity, reversed dependency, mismatched closure, or source-specific side conditions.

**Promote:** output a candidate common boundary structure or partial correspondence; semantic promotion requires normal comparison/common-core obligations.

**Residual handling:** preserve every unmatched crossing and every matched crossing with differing side conditions.

**Stop / cost:** stop when expanding the boundary adds only domain-specific internals without new shared relations. Boundary extraction should normally be cheap.

**Next:** DP-03, DP-04, DP-12, DP-22, DP-26.

---

## DP-02 — Constraint-structure discovery

**Objective:** expose invariants encoded by restrictions rather than by positive object similarity.

**Priority cues:** equations, disequalities, implications, cardinality restrictions, conservation laws, admissibility conditions, proof side conditions, forbidden states.

**Inspect:** constraint incidence; constrained roles; implication/dependency direction; conjunction/disjunction structure; equality/disequality; exclusivity; cardinality; closure.

**Abstract first:** variable names, literal syntax, source formula formatting, equivalent algebraic presentation when a qualified bridge permits it.

**Generate:** map constraint graphs by role. Seek the same dependency of allowed states even when the objects carrying those constraints differ semantically.

**Expand:** compute or represent only the closure consequences needed to test a candidate; extend into connected constraints and affected interfaces.

**Falsify:** find a permitted realization in one structure prohibited in the other, or a side condition omitted by the mapping.

**Promote:** candidate constraint isomorphism/equivalence/common core; entailment or equivalence still needs qualified proof.

**Residual handling:** preserve unmatched constraints and differences in admissible domains.

**Stop / cost:** avoid full theorem closure unless required. Prefer claim-bounded consequences.

**Next:** DP-05, DP-11, DP-20, DP-31, DP-37.

---

## DP-03 — Interface / port correspondence

**Objective:** find structures that play the same external role despite different internals.

**Priority cues:** APIs, ports, function signatures, theorem assumptions/conclusions, component contracts, physical inputs/outputs, QU interfaces.

**Inspect:** exposed roles, directionality, type/domain constraints, multiplicity, pre/postconditions, ordering, error/failure channels.

**Abstract first:** internal implementation, local decomposition, internal SI spelling, local labels.

**Generate:** compare interface incidence and constraint topology; ask whether different components are substitutable at the structural contract level.

**Expand:** follow corresponding ports into internals only as needed to explain or falsify the external match.

**Falsify:** look for hidden preconditions, asymmetric side effects, different multiplicities, ordering requirements, or reconstruction obligations.

**Promote:** interface correspondence candidate, not whole-component equivalence.

**Residual handling:** record contract differences separately from internal differences.

**Stop / cost:** stop once the declared interface claim is discharged or broken; do not inspect all internals by default.

**Next:** DP-01, DP-04, DP-14, DP-22, DP-34.

---

## DP-04 — Dependency-topology discovery

**Objective:** expose common prerequisite, dataflow, control, causal, proof, or authority dependency shapes.

**Priority cues:** DAGs, build graphs, proof prerequisites, data pipelines, control dependencies, chained assumptions, provenance graphs.

**Inspect:** parent/child dependency roles, fan-in/fan-out, dominators, bottlenecks, dependency depth, cycles, optional/required edges.

**Abstract first:** names of dependencies and nodes; file/package boundaries when non-semantic.

**Generate:** compare dependency neighborhoods and critical paths; seek structurally equivalent bottlenecks or prerequisite clusters.

**Expand:** follow matched chains in both directions and compare reachable obligation sets.

**Falsify:** test edge direction, optionality, hidden dependency, cycle status, and whether dependencies are semantic versus merely execution order.

**Promote:** dependency correspondence/common-core candidate.

**Residual handling:** unmatched dependencies remain explicit because they often explain behavioral divergence.

**Stop / cost:** use local neighborhoods before transitive closure; compute only claim-relevant reachability.

**Next:** DP-15, DP-23, DP-24, DP-29, DP-30.

---

## DP-05 — QU / open-region topology

**Objective:** discover common structure in what remains unresolved; primary candidate generator for QUI.

**Priority cues:** symbolic values, unresolved relations, incomplete topology, multiple admissible realizations, open constraints, uncertain interpretations.

**Inspect:** open carriers; open relation occurrences; shared versus distinct unknowns; constraint coupling; admissible domains; interfaces to fixed structure; closure/scope authority; dependency shape.

**Abstract first:** actual unknown values, local unknown identifiers, source vocabulary, opaque prose descriptions when structural equivalents are available.

**Generate:** compare open-role incidence, constraint incidence, dependency topology, known/open interfaces, domain relations, and closure structure. Count independent versus coupled unresolved degrees only when that notion is qualified by the profile.

**Expand:** extend partial QU matches through connected constraints and interfaces; then attempt DP-39 QUI extension.

**Falsify:** seek a realization admitted by one QU but structurally impossible in the other under the candidate mapping, or a load-bearing difference in closure/domain semantics.

**Promote:** QU common-core candidate or QUI candidate; full QUI requires ordinary isomorphism obligations under the selected QU view.

**Residual handling:** preserve unmatched open structure and fixed/open interface differences; these may be more informative than the match.

**Stop / cost:** do not enumerate large realization families when symbolic constraints suffice. Stop when additional realization detail does not affect structural correspondence.

**Next:** DP-11, DP-12, DP-37, DP-39.

---

## DP-06 — Repeated relational motifs

**Objective:** detect recurring local structures obscured by different labels or contexts.

**Priority cues:** repeated incidence shapes, analogous subroutines, repeated proof patterns, repeated physical coupling patterns, repeated QU motifs.

**Inspect:** bounded neighborhoods, relation arities, role sequences, local constraints, boundary signatures.

**Abstract first:** names, literal values not used by the comparison, local IDs.

**Generate:** cluster structurally similar motifs; seek motifs recurring across independent sources before within-source duplicates.

**Expand:** grow candidate motifs outward until correspondence weakens or becomes a larger protocol target.

**Falsify:** inspect near-matches for one load-bearing edge/constraint that changes semantics.

**Promote:** motif correspondence candidate; repeated appearance alone is not proof of universality.

**Residual handling:** record the minimal differentiating residual for near-matches.

**Stop / cost:** prefer cheap local signatures as retrieval hints, then verify only promising candidates structurally.

**Next:** DP-09, DP-10, DP-13, DP-22.

---

## DP-07 — Alternative-factorization discovery

**Objective:** reveal common structure hidden by different decompositions.

**Priority cues:** one source is monolithic while another is decomposed; equivalent formulas/programs use different intermediate objects; current comparison leaves large but patterned residuals.

**Inspect:** legal factorization points, interfaces between factors, reconstruction obligations, repeated substructures, D/E transformations.

**Abstract first:** current component boundaries and factor names.

**Generate:** produce only plausible alternative factorizations licensed by existing structure; compare factor graphs rather than assuming one factorization is canonical.

**Expand:** if a factorization improves correspondence, extend it only where residuals suggest further decomposition.

**Falsify:** verify exact reconstruction/provenance; reject a factorization that loses multiplicity, order, identity, or source distinctions.

**Promote:** candidate factorization + correspondence. A better match does not itself prove the factorization semantically valid.

**Residual handling:** preserve factorization residuals and source reconstruction data.

**Stop / cost:** factorization can explode combinatorially; use boundary/constraint cues and stop once additional variants cease to reduce meaningful residuals.

**Next:** DP-08, DP-13, DP-14, DP-22, DP-36.

---

## DP-08 — Residual-structure discovery after partial match

**Objective:** mine unmatched structure for the novel distinction rather than treating residuals as failure noise.

**Priority cues:** strong partial/common-core match with a compact residual; transformations that preserve most structure; two theories differing in a few relations.

**Inspect:** unmatched nodes/relations/constraints, changed incidences, residual provenance, source-specific obligations.

**Abstract first:** already-qualified common core; focus analysis on residuals and their attachment points.

**Generate:** compare residuals to each other and to known motifs elsewhere; ask whether residuals form a second common structure, a parameterization, or a transformation delta.

**Expand:** trace residual effects into matched structure to determine whether they are local or globally consequential.

**Falsify:** ensure the common core was not overmatched by ignoring a load-bearing difference.

**Promote:** residual invariant/difference candidate, transformation candidate, or new subproblem.

**Residual handling:** residuals are the target; never delete them to improve match quality.

**Stop / cost:** stop when residuals are fully accounted for under the current claim or become domain-specific leaves with no further relations.

**Next:** DP-14, DP-23, DP-34, DP-35, DP-36.

---

## DP-09 — Symmetry / automorphism discovery

**Objective:** expose interchangeable structural positions, invariant permutations, and broken symmetries.

**Priority cues:** repeated neighborhoods, balanced structures, interchangeable variables/components, symmetric constraints.

**Inspect:** automorphism candidates, orbit structure, fixed points, symmetry-breaking relations, rigid labels/ports.

**Abstract first:** alpha-renamable IDs and non-rigid presentation choices.

**Generate:** find role-preserving permutations or local symmetries; compare symmetry groups/patterns across structures.

**Expand:** test whether local symmetry extends globally or only under a restricted view.

**Falsify:** search for one rigid label, boundary, temporal relation, or constraint that breaks the apparent symmetry.

**Promote:** automorphism/symmetry candidate; symmetry never implies NEI identity by itself.

**Residual handling:** record symmetry breakers explicitly.

**Stop / cost:** use structural partitions/local signatures before expensive exhaustive automorphism search.

**Next:** DP-10, DP-19, DP-21, DP-38.

---

## DP-10 — Role-equivalent elements under different labels

**Objective:** find elements that perform the same structural function despite unrelated names or semantics.

**Priority cues:** cross-domain comparison, independently authored sources, translation differences, renamed variables/classes.

**Inspect:** incident relations, constraints, interfaces, dependency position, multiplicity, temporal/causal role.

**Abstract first:** lexical names, human gloss, local IDs, source terminology.

**Generate:** construct role signatures from structural neighborhoods and seek mappings that preserve those roles.

**Expand:** map adjacent role-equivalent elements and test whether a larger motif emerges.

**Falsify:** inspect any relation type or constraint that the role signature suppressed.

**Promote:** role correspondence candidate, not identity/equality.

**Residual handling:** preserve semantic labels as provenance even when ignored for discovery.

**Stop / cost:** stop when role signatures become too generic to discriminate candidates; then move to stronger protocols.

**Next:** DP-06, DP-13, DP-27, DP-40.

---

## DP-11 — Invariants across admissible variation

**Objective:** find structure that survives every realization/factorization/variation in a declared family.

**Priority cues:** QU states, parameter families, alternate formalizations, multiple valid factorizations, temporal variation.

**Inspect:** relations/properties common across the qualified family; dependence on correspondence anchors and scope.

**Abstract first:** realization-specific detail not required by the invariant claim.

**Generate:** formulate candidate invariant from recurring structure; prove/check universality using claim-bounded coverage or exact certificates.

**Expand:** combine compatible invariants or lift a local invariant to a larger scope only with coverage evidence.

**Falsify:** actively seek one admissible realization violating the candidate.

**Promote:** invariant candidate; universality requires qualification over the declared family.

**Residual handling:** record realization-specific structure and the exact family scope.

**Stop / cost:** do not enumerate a family when a symbolic universal proof/certificate suffices.

**Next:** DP-05, DP-14, DP-25, DP-31, DP-38.

---

## DP-12 — Known/unknown interface correspondence

**Objective:** compare how fixed structure constrains or is constrained by open QU structure.

**Priority cues:** open variables attached to known components, uncertain outputs, unknown relations at a fixed boundary.

**Inspect:** ports between fixed/open regions, direction, constraint propagation, dependency, admissible domains, closure.

**Abstract first:** internal details wholly inside fixed or open regions when they do not affect the interface.

**Generate:** compare fixed-to-open incidence patterns and propagation roles across artifacts.

**Expand:** extend into DP-05 open topology or DP-03 fixed interfaces as indicated.

**Falsify:** test whether superficially similar ports impose different admissibility/closure semantics.

**Promote:** candidate interface isomorphism/common core.

**Residual handling:** record differences in fixed context and open realization families.

**Stop / cost:** boundary-only claims should not trigger full QU realization analysis unless needed.

**Next:** DP-03, DP-05, DP-15, DP-39.

---

## DP-13 — Multi-scale common substructure

**Objective:** avoid missing correspondences because comparison starts at the wrong granularity.

**Priority cues:** weak whole-structure match but strong local motifs; hierarchical systems; theories with different decomposition depth.

**Inspect:** node neighborhoods, motifs, components, subsystems, scopes, structures-of-structures.

**Abstract first:** a fixed comparison scale.

**Generate:** search at several bounded scales; use smaller high-confidence matches as seeds for larger ones.

**Expand:** grow/shrink scale around a candidate while preserving mappings and residuals.

**Falsify:** test whether correspondence disappears when one additional load-bearing neighborhood is included.

**Promote:** scale-scoped common-core candidate.

**Residual handling:** state the exact scale and unmatched exterior.

**Stop / cost:** coarse-to-fine or fine-to-coarse adaptively; avoid exhaustive all-subgraph enumeration.

**Next:** DP-06, DP-07, DP-22, DP-40.

---

## DP-14 — Transformation-invariant discovery

**Objective:** find relations preserved across rewrite, refactor, compilation, optimization, coordinate change, proof transformation, or representation conversion.

**Priority cues:** source/optimized pairs, multiple implementations, known transformation pipelines, alternate derivations.

**Inspect:** pre/post structural correspondences, preserved ports, residual changes, reconstruction witnesses, semantic side conditions.

**Abstract first:** expected representation-specific artifacts introduced by the transformation.

**Generate:** compare before/after and intersect preserved structure across several transformations if available.

**Expand:** trace preserved invariants through transformation chains.

**Falsify:** find a transformed case violating the candidate invariant or a side condition under which it fails.

**Promote:** transformation-scoped invariant candidate.

**Residual handling:** transformation residual is mandatory evidence, not noise.

**Stop / cost:** reuse existing transformation witnesses; do not regenerate equivalent transformations solely for discovery.

**Next:** DP-08, DP-23, DP-25, DP-31, DP-36.

---

## DP-15 — Information-flow structure

**Objective:** expose common propagation, source/sink, bottleneck, aggregation, fan-out, or information-loss patterns.

**Priority cues:** pipelines, dataflow, proof propagation, measurement chains, event processing, QU constraint propagation.

**Inspect:** direction, fan-in/out, joins/splits, lossy steps, reversible steps, bottlenecks, provenance paths.

**Abstract first:** payload values and implementation-specific transport.

**Generate:** compare flow topology and transformation roles.

**Expand:** follow candidate paths until sinks/sources or semantic boundary changes.

**Falsify:** test hidden state, side channels, nonlocal dependencies, or non-equivalent loss/reconstruction semantics.

**Promote:** information-flow correspondence candidate.

**Residual handling:** preserve lost/reconstructed information and unmatched channels.

**Stop / cost:** bounded path neighborhoods before global path enumeration.

**Next:** DP-04, DP-23, DP-30, DP-31.

---

## DP-16 — Causal / temporal structure

**Objective:** find common transition, persistence, branching-history, synchronization, or causal patterns.

**Priority cues:** event graphs, temporal manifestations, state machines, histories, causal models.

**Inspect:** predecessor/successor, simultaneity/order, transition constraints, persistence, branching/merging, causal dependency.

**Abstract first:** timestamps/units when only order matters; labels of states/events.

**Generate:** compare event/transition topology and identity-preserving/separating roles when explicitly provided.

**Expand:** follow histories or causal cones only as needed.

**Falsify:** look for reversed causation, missing transition condition, differing branching multiplicity, or incomparable temporal semantics.

**Promote:** temporal/causal correspondence candidate; NEI temporal identity requires separate identity authority.

**Residual handling:** unmatched events and transition conditions remain explicit.

**Stop / cost:** avoid full history expansion when local transition structure settles the lead.

**Next:** DP-04, DP-18, DP-21, DP-25, DP-38.

---

## DP-17 — Containment / ownership structure

**Objective:** expose common nesting, scope, membership, encapsulation, resource ownership, or transfer patterns.

**Priority cues:** ASTs/scopes, modules, object ownership, set membership, physical containment, nested proofs.

**Inspect:** contains/member relations, exclusive/shared ownership, scope inheritance, transfer, lifetime implications where represented.

**Abstract first:** container names and administrative package boundaries.

**Generate:** compare nesting/ownership trees or graphs by role and constraints.

**Expand:** include boundary crossings and ownership transfers.

**Falsify:** distinguish administrative containment from semantic ownership; inspect shared ownership and aliasing.

**Promote:** containment/ownership correspondence candidate.

**Residual handling:** preserve unmatched nested structure and ownership side conditions.

**Stop / cost:** do not infer lifecycle semantics from containment unless represented.

**Next:** DP-01, DP-18, DP-26, DP-30.

---

## DP-18 — Cardinality / multiplicity structure

**Objective:** reveal correspondences encoded in counts and multiplicities rather than labels.

**Priority cues:** exactly-one, at-most/at-least constraints, repeated incidence, conserved counts, branching factors.

**Inspect:** relation multiplicity, occurrence count, cardinality constraints, uniqueness, aliasing versus repeated occurrence.

**Abstract first:** identities of interchangeable members when alpha-renamable.

**Generate:** compare cardinality patterns and how counts couple to constraints/interfaces.

**Expand:** trace where cardinality controls downstream structure.

**Falsify:** distinguish repeated occurrence from multiple identities; test hidden optionality.

**Promote:** cardinality-pattern correspondence candidate.

**Residual handling:** exact count differences are often the primary residual.

**Stop / cost:** symbolic bounds before enumeration.

**Next:** DP-02, DP-20, DP-31, DP-38.

---

## DP-19 — Dual / reversed structures

**Objective:** find correspondences visible only after reversing or dualizing roles.

**Priority cues:** producer/consumer, encode/decode, forward/inverse, theorem/countertheorem, primal/dual, source/target reversals.

**Inspect:** paired relation roles, edge direction, constraint polarity, input/output exchange.

**Abstract first:** surface orientation when a lawful dual view is permitted.

**Generate:** test qualified role reversal/duality mappings rather than direct isomorphism only.

**Expand:** see whether the dual mapping extends across neighboring structures.

**Falsify:** ensure reversal is semantically licensed and does not erase asymmetric side conditions.

**Promote:** dual-correspondence candidate, not ordinary isomorphism unless the governing view defines it so.

**Residual handling:** asymmetric residue is essential.

**Stop / cost:** try a small set of structurally suggested dualizations, not arbitrary reversals.

**Next:** DP-09, DP-22, DP-31, DP-40.

---

## DP-20 — Complement / exclusion structure

**Objective:** discover common structure in what cannot coexist or occur.

**Priority cues:** mutual exclusion, NACs, disequalities, forbidden transitions, contradiction sets, disjoint alternatives.

**Inspect:** negative constraints, conflict graphs, exclusion hyperedges, forbidden combinations, complement relations.

**Abstract first:** names/values of excluded items.

**Generate:** compare incompatibility topology and minimal forbidden sets.

**Expand:** connect exclusions to the positive structures they constrain.

**Falsify:** test whether exclusions have different scopes, authorities, or conditional activation.

**Promote:** exclusion-structure candidate.

**Residual handling:** unmatched exclusions often identify the exact semantic divergence.

**Stop / cost:** prioritize minimal conflict sets over exhaustive forbidden-world enumeration.

**Next:** DP-02, DP-05, DP-18, DP-35, DP-37.

---

## DP-21 — Fixed-point / recurrence structure

**Objective:** expose stability, iteration, cycle, closure, recurrence, or self-consistency patterns.

**Priority cues:** iterative algorithms, recursive definitions, equilibrium equations, cyclic dependencies, repeated transformations.

**Inspect:** self-maps, cycle structure, recurrence relations, convergence/stability conditions where represented.

**Abstract first:** iteration counts and names unless load-bearing.

**Generate:** compare recurrence topology and fixed-point conditions.

**Expand:** include basin/dependency structure only when represented and relevant.

**Falsify:** distinguish formal recurrence from actual convergence; inspect side conditions.

**Promote:** recurrence/fixed-point correspondence candidate.

**Residual handling:** preserve different stability/convergence conditions.

**Stop / cost:** do not numerically simulate unless the claim requires it; structural recurrence may be enough.

**Next:** DP-09, DP-14, DP-29, DP-31.

---

## DP-22 — Compositional-structure discovery

**Objective:** discover the same assembly/composition law across different components.

**Priority cues:** pipelines, algebraic composition, modular systems, proof composition, repeated component wiring.

**Inspect:** composition order, shared ports/SIs, compatibility constraints, associativity/commutation claims when represented.

**Abstract first:** internal component semantics not used by the composition relation.

**Generate:** compare composition graphs and interface-binding patterns.

**Expand:** recursively compare corresponding components only after composition correspondence is plausible.

**Falsify:** test compatibility constraints, hidden shared state, order sensitivity, and namespace capture.

**Promote:** composition-pattern candidate.

**Residual handling:** record component and glue differences separately.

**Stop / cost:** avoid descending into components when composition structure alone is the research target.

**Next:** DP-03, DP-07, DP-13, DP-23, DP-40.

---

## DP-23 — Reconstruction-structure discovery

**Objective:** compare what information is required to reconstruct sources from transformations/common representations.

**Priority cues:** compression, normalization, factorization, projections, compiler transforms, common-core extraction.

**Inspect:** residual channels, inverse mappings, provenance dependencies, lost/recovered identities, ordering/multiplicity restoration.

**Abstract first:** transformed representation details not used by reconstruction.

**Generate:** compare reconstruction dependency graphs and residual payload roles.

**Expand:** connect reconstruction requirements to transformation invariants and source differences.

**Falsify:** attempt exact reconstruction; identify one missing load-bearing datum.

**Promote:** reconstruction correspondence/invariant candidate.

**Residual handling:** reconstruction residual is central and must remain explicit.

**Stop / cost:** use existing witnesses; no need to reconstruct unrelated source regions.

**Next:** DP-08, DP-14, DP-15, DP-36.

---

## DP-24 — Proof / witness topology

**Objective:** discover common structure in how claims are supported rather than only in claim content.

**Priority cues:** theorem proofs, verification certificates, witness families, dependency-closed obligations, test evidence.

**Inspect:** claim-to-obligation graph, witnesses, universality/existential coverage, side conditions, proof dependencies.

**Abstract first:** natural-language proof style and theorem names.

**Generate:** compare proof obligation topology and witness roles across domains.

**Expand:** trace matched obligations into underlying structural claims.

**Falsify:** find missing obligation, invalid witness reuse, circular evidence, or mismatched quantifier strength.

**Promote:** proof-structure correspondence candidate; never transfer truth merely from proof-shape similarity.

**Residual handling:** unmatched obligations are often highly informative.

**Stop / cost:** reuse existing proof/certificate graphs; do not reprove claims only to compare proof topology.

**Next:** DP-04, DP-11, DP-25, DP-34.

---

## DP-25 — Refinement-relation discovery

**Objective:** determine whether one structure/information state is a genuine refinement of another.

**Priority cues:** version evolution, added constraints, QU narrowing, more detailed models, staged specifications.

**Inspect:** retained semantics, realization-family inclusion, added constraints, changed assumptions, preserved correspondences.

**Abstract first:** version labels and chronological order; later does not automatically mean refinement.

**Generate:** test whether the newer/more specific state narrows possibilities while preserving meaning of retained cases.

**Expand:** find chains/partial orders of refinement across artifacts.

**Falsify:** identify assumption replacement, ontology change, incompatible interpretation, or deleted valid realization that changes meaning.

**Promote:** refinement candidate only with required authority/witness.

**Residual handling:** separate information gain from semantic revision.

**Stop / cost:** compare claim-relevant scopes; avoid global version diffs when local refinement is sufficient.

**Next:** DP-11, DP-14, DP-29, DP-37.

---

## DP-26 — Boundary-movement invariance

**Objective:** detect structure invariant under moving administrative/component boundaries.

**Priority cues:** similar systems partitioned into different files/modules/scopes; refactors that only reorganize ownership.

**Inspect:** relations preserved across repartition, ports introduced/removed by boundary placement, provenance continuity.

**Abstract first:** file/module/bundle boundaries declared non-semantic.

**Generate:** compare structures under transparent repartition views.

**Expand:** move boundaries incrementally where legal to test stability of the candidate common core.

**Falsify:** find a boundary with actual semantic ownership, lifecycle, causal, or closure authority.

**Promote:** boundary-invariant correspondence candidate.

**Residual handling:** semantic boundaries remain explicit even if administrative boundaries are ignored.

**Stop / cost:** do not enumerate arbitrary partitions; follow existing boundary discrepancies.

**Next:** DP-01, DP-03, DP-07, DP-17.

---

## DP-27 — Parameter-role correspondence

**Objective:** map parameters by structural function rather than name, unit, or literal type.

**Priority cues:** families of formulas/algorithms, configurable systems, different notations for similar models.

**Inspect:** where parameters enter constraints, what they control, dependency fan-out, monotonic/order roles where represented.

**Abstract first:** parameter names and literal values.

**Generate:** map parameters with equivalent incidence/control roles.

**Expand:** compare parameter interactions and coupled groups.

**Falsify:** test domain/type restrictions, nonlinear role differences, and hidden unit semantics.

**Promote:** parameter-role mapping candidate.

**Residual handling:** unmatched parameter effects remain explicit.

**Stop / cost:** avoid fitting numerical transformations unless structurally indicated.

**Next:** DP-02, DP-28, DP-32, DP-40.

---

## DP-28 — Dimensional / unit structure

**Objective:** expose correspondence among dimensional relationships independent of unit spelling or scale.

**Priority cues:** physical/scientific formulas, engineering models, quantities with units/dimensions.

**Inspect:** dimension products/ratios, unit-conversion authority, dimensionless groups, quantity roles.

**Abstract first:** unit names and scale factors when a qualified conversion exists.

**Generate:** compare dimensional incidence and invariant dimensionless relationships.

**Expand:** relate dimensional matches to constraints and parameter roles.

**Falsify:** verify conversions, offsets, affine versus multiplicative units, and domain-specific quantity distinctions.

**Promote:** dimensional correspondence candidate.

**Residual handling:** unmatched dimensions are strong separators.

**Stop / cost:** symbolic dimension algebra before numerical conversion.

**Next:** DP-02, DP-27, DP-31, DP-32.

---

## DP-29 — Ordering / partial-order structure

**Objective:** discover shared precedence, containment, refinement, implication, subtyping, or temporal-order topology.

**Priority cues:** posets, dependency ordering, type hierarchies, temporal order, proof strength, refinement chains.

**Inspect:** cover relations, incomparable elements, extrema, chains, antichains, joins/meets where represented.

**Abstract first:** labels and total orderings that are presentation-only.

**Generate:** compare partial-order structure and order-preserving mappings.

**Expand:** test whether local order embeddings extend.

**Falsify:** find one order relation or incomparability violated by the candidate.

**Promote:** order correspondence/embedding candidate.

**Residual handling:** preserve incomparable/unmatched regions.

**Stop / cost:** cover graph comparison before transitive-closure enumeration.

**Next:** DP-04, DP-21, DP-25, DP-30.

---

## DP-30 — Reachability / connectivity structure

**Objective:** expose common path, component, cut, dominator, or reachability organization.

**Priority cues:** graphs/networks, control flow, causal reachability, dependency propagation, proof accessibility.

**Inspect:** connected components, reachable sets, articulation/cut structure, dominators, forbidden paths.

**Abstract first:** exact path spelling when only reachability matters.

**Generate:** compare reachability summaries and critical separators.

**Expand:** refine candidate with bounded path structure where needed.

**Falsify:** find one reachability relation present only on one side or one hidden bypass path.

**Promote:** reachability/connectivity correspondence candidate.

**Residual handling:** unmatched connectivity is explicit.

**Stop / cost:** use graph summaries before all-path enumeration.

**Next:** DP-04, DP-15, DP-17, DP-31.

---

## DP-31 — Conservation / balance structure

**Objective:** discover quantities or structural resources preserved/balanced across transformations or flows.

**Priority cues:** physical conservation, accounting identities, token/resource flow, graph-degree balance, invariant counts.

**Inspect:** conserved totals, source/sink balances, invariant cardinality combinations, transformation deltas.

**Abstract first:** quantity names/units once lawful conversion or role mapping exists.

**Generate:** derive candidate balance equations from represented structure; compare equation topology.

**Expand:** test conservation across additional transformations/states.

**Falsify:** seek one admissible transition violating the candidate or one unaccounted source/sink.

**Promote:** conservation candidate only with adequate scope/coverage.

**Residual handling:** unexplained imbalance becomes a high-value residual.

**Stop / cost:** symbolic accounting before simulation.

**Next:** DP-02, DP-11, DP-14, DP-15, DP-28.

---

## DP-32 — Threshold / phase-boundary structure

**Objective:** identify common qualitative changes at parameter or structural boundaries.

**Priority cues:** phase changes, algorithm regime changes, bifurcations, threshold policies, piecewise rules.

**Inspect:** condition triggering regime change, before/after structural class, hysteresis/side conditions where represented.

**Abstract first:** exact threshold value when only normalized role matters under a qualified mapping.

**Generate:** compare regime-transition schemas and boundary constraints.

**Expand:** relate threshold structure to parameter roles and residual changes.

**Falsify:** test boundary inclusion, multiple thresholds, and domain-specific side conditions.

**Promote:** threshold-structure correspondence candidate.

**Residual handling:** preserve differing threshold values/conditions.

**Stop / cost:** do not numerically sweep parameter space unless necessary.

**Next:** DP-27, DP-28, DP-33, DP-34.

---

## DP-33 — Degenerate / special-case structure

**Objective:** expose a hidden skeleton by inspecting simplifying boundary cases.

**Priority cues:** complex general form with known zero/one/extreme/symmetric/small cases; residuals vanish under special conditions.

**Inspect:** which relations disappear, merge, become rigid, or simplify in special cases.

**Abstract first:** general-case complexity not active in the selected case.

**Generate:** compare special cases across domains to expose a minimal common structure; then lift cautiously.

**Expand:** restore one removed degree/constraint at a time to see which correspondence survives.

**Falsify:** verify the special-case correspondence is not incorrectly generalized.

**Promote:** special-case invariant/correspondence candidate with explicit scope.

**Residual handling:** record exactly what degeneracy removed.

**Stop / cost:** use a few structurally motivated cases, not exhaustive parameter enumeration.

**Next:** DP-06, DP-11, DP-21, DP-32, DP-40.

---

## DP-34 — Failure-mode correspondence

**Objective:** discover systems that fail for structurally equivalent reasons even when successful behavior differs.

**Priority cues:** tests, exceptions, counterexamples, unsatisfied obligations, resource failures, invalid states.

**Inspect:** precursor conditions, violated constraint, propagation path, terminal failure state, recovery path.

**Abstract first:** error messages, exception names, platform-specific symptoms.

**Generate:** map failure causal/dependency structures.

**Expand:** trace failures backward to common root structures or forward to common residual effects.

**Falsify:** distinguish same symptom from same mechanism.

**Promote:** failure-mechanism correspondence candidate.

**Residual handling:** preserve differing triggers/recovery semantics.

**Stop / cost:** prioritize existing failure evidence; do not induce expensive failures without a specific need.

**Next:** DP-04, DP-08, DP-20, DP-35.

---

## DP-35 — Exception-structure discovery

**Objective:** infer the actual boundary of a general rule by comparing where it ceases to apply.

**Priority cues:** special clauses, exclusions, exception lists, counterexamples, fallback paths.

**Inspect:** exception predicates, affected relations, shared causes, hierarchy/priority among exceptions.

**Abstract first:** exception names and narrative explanations.

**Generate:** cluster exceptions by structural trigger/effect; compare exception topology across domains.

**Expand:** contrast exception clusters against the default rule to expose the load-bearing discriminator.

**Falsify:** search for an exception not explained by the candidate discriminator.

**Promote:** exception-boundary candidate, not a universal rule until coverage is established.

**Residual handling:** unexplained exceptions remain explicit.

**Stop / cost:** avoid overfitting each exception independently when one structural predicate covers them.

**Next:** DP-08, DP-20, DP-32, DP-34, DP-37.

---

## DP-36 — Representation-redundancy discovery

**Objective:** identify duplicated/recoverable structure and accidental representational distinctions.

**Priority cues:** repeated fields, derived caches, alternate encodings, source/normalized duplication, redundant constraints.

**Inspect:** reconstructability, functional dependencies, duplicated incidence, derived versus authoritative fields.

**Abstract first:** storage/layout location.

**Generate:** determine whether one represented part is exactly recoverable from another under qualified rules.

**Expand:** find redundancy classes and their reconstruction dependencies.

**Falsify:** seek a case where supposedly redundant information differs independently or carries provenance/authority not recoverable elsewhere.

**Promote:** redundancy/reconstruction candidate; do not delete source information merely because redundancy is found.

**Residual handling:** preserve provenance and any non-redundant payload.

**Stop / cost:** use dependency/reconstruction analysis before exhaustive value comparison.

**Next:** DP-07, DP-14, DP-23, DP-37.

---

## DP-37 — Equivalent constraint-closure discovery

**Objective:** detect differently written constraint systems that admit the same relevant realization family.

**Priority cues:** algebraically transformed formulas, different solver encodings, QU states with different constraint presentations.

**Inspect:** semantic entailment, admissible realizations, closure scope, side conditions, domain authority.

**Abstract first:** syntactic formula shape once semantics are structurally represented.

**Generate:** test mutual entailment or equivalent realization-family characterization over the declared scope.

**Expand:** use equivalence to compare higher-level QU/NEI structures.

**Falsify:** find one admissible realization present in only one system.

**Promote:** closure-equivalence candidate only with exact scope/authority.

**Residual handling:** preserve source formula/provenance and any out-of-scope differences.

**Stop / cost:** seek separating models/certificates before full closure enumeration.

**Next:** DP-02, DP-05, DP-11, DP-25, DP-39.

---

## DP-38 — Semantic-identity candidate discovery

**Objective:** identify pairs for which NEI investigation may be worthwhile.

**Priority cues:** strong structural correspondence across administrative/SI boundaries, temporal persistence laws, explicit equality authority, invariant relation sets.

**Inspect:** identity-preserving/separating evidence, QU uncertainty if relevant, temporal/causal laws, administrative versus natural distinctions.

**Abstract first:** SI spelling, namespaces, file/bundle boundaries, human labels.

**Generate:** create an NEI hypothesis only after independent structural evidence suggests it; never merge during candidate generation.

**Expand:** collect the minimal profile/evidence/QU obligations needed to test the hypothesis.

**Falsify:** actively search for qualified natural disequality, incompatible realization, temporal separation, or circular evidence.

**Promote:** only to an NEI candidate; DP has no identity authority. NEI qualification governs `SAME`, `DISTINCT`, `UNKNOWN`.

**Residual handling:** all distinguishing evidence remains explicit.

**Stop / cost:** do not invoke NEI merely because two things look similar; reserve it for hypotheses whose resolution matters.

**Next:** NEI protocol/qualification; DP-05, DP-11, DP-16, DP-39.

---

## DP-39 — QUI extension from partial unknown correspondence

**Objective:** grow a partial QU correspondence into a qualified candidate QUI.

**Priority cues:** DP-05/12/37 found matching open-role or constraint motifs.

**Inspect:** complete mapped QU region: open carriers, relations, constraints, interfaces, domain structure, closure, dependencies.

**Abstract first:** local SI names, human gloss, equivalent constraint spelling under qualified bridges.

**Generate:** extend the partial mapping while preserving incidence and all comparison-view load-bearing attributes.

**Expand:** alternate between mapping growth and residual inspection; stop before forcing unmatched structure.

**Falsify:** seek one mapped constraint/interface/domain relation that fails or a realization-structure asymmetry incompatible with the proposed isomorphism.

**Promote:** QUI candidate; full QUI still requires IsoGraph isomorphism qualification for the declared QU regions/view.

**Residual handling:** unmatched open structure is retained as QU residual/common-core difference.

**Stop / cost:** do not enumerate realizations if structural QU semantics suffice to verify the mapping.

**Next:** DP-11, DP-13, DP-40; NEI only if identity is a separate justified question.

---

## DP-40 — Global whole-structure isomorphism

**Objective:** test whether two complete declared structures are isomorphic under a qualified view.

**Priority cues:** extensive local matches already found, similar global cardinality/interface/dependency profiles, explicit equivalence hypothesis.

**Inspect:** all load-bearing nodes, incidences, constraints, order/multiplicity, rigid labels/literals, boundaries required by the view.

**Abstract first:** only attributes explicitly alpha-renamable/non-load-bearing.

**Generate:** seed the global mapping from high-confidence local correspondences rather than blind permutation where possible.

**Expand:** complete the bijection while maintaining all obligations.

**Falsify:** any unmatched load-bearing structure breaks full isomorphism but may leave a valuable common core.

**Promote:** full isomorphism candidate, then qualify under core comparison obligations.

**Residual handling:** if residual is nonempty, downgrade to partial/common-core relation rather than forcing totality.

**Stop / cost:** because global search can be expensive, attempt only after stronger local evidence or when the whole-isomorphism claim itself matters.

**Next:** DP-08 if it fails; DP-14/23 if the isomorphism relates transformed representations.

---

## DP-41 — Literal-value coincidence

**Objective:** use matching literal values as weak candidate hints when domain authority says values may be meaningful.

**Priority cues:** rigid constants, physical constants, exact theorem parameters, protocol numbers with semantic roles.

**Inspect:** value plus structural role, units/domain, rigidity authority.

**Abstract first:** formatting differences and convertible units.

**Generate:** use matching values to seed candidate mappings, never as standalone evidence.

**Expand:** demand relational/constraint support around the value.

**Falsify:** test coincidental reuse, incompatible units/domains, and different structural roles.

**Promote:** retrieval lead only until structural evidence exists.

**Residual handling:** record role/unit differences.

**Stop / cost:** cheap; abandon quickly when no supporting structure appears.

**Next:** DP-02, DP-27, DP-28.

---

## DP-42 — Lexical / name similarity

**Objective:** use terminology overlap as a low-cost retrieval hint.

**Priority cues:** independently authored but related documents, known translation families, APIs with conventional names.

**Inspect:** names, synonyms, labels, nearby structure.

**Abstract first:** nothing initially; this protocol is itself lexical.

**Generate:** seed candidates from lexical overlap or translation, then immediately switch to structural protocols.

**Expand:** verify candidate neighborhoods under DP-10/06.

**Falsify:** assume names can be misleading; seek different structural roles behind the same word.

**Promote:** never beyond retrieval lead by lexical evidence alone.

**Residual handling:** preserve lexical provenance but do not treat it as structure.

**Stop / cost:** extremely cheap; do not spend external model calls repeatedly generating synonyms once structural leads exist.

**Next:** DP-10, DP-06, DP-13.

---

## DP-43 — Shared ontology / class-label hints

**Objective:** use shared taxonomy or ontology labels to retrieve potential correspondences.

**Priority cues:** artifacts already map to a common ontology/registry/schema.

**Inspect:** labels plus actual membership evidence and structural roles.

**Abstract first:** assume class labels are hints, not proof of structural equivalence.

**Generate:** retrieve same/related class members, then compare native structure.

**Expand:** test whether ontology relations correspond to actual structural relations.

**Falsify:** find members sharing a label but differing structurally in the target claim.

**Promote:** retrieval/class-membership lead only; class label != class-membership evidence != isomorphism.

**Residual handling:** record ontology-specific distinctions.

**Stop / cost:** do not traverse large ontologies without a target structural objective.

**Next:** DP-10, DP-13, DP-40.

---

## DP-44 — Serialization / layout similarity

**Objective:** exploit presentation similarity only as a very weak retrieval cue.

**Priority cues:** generated artifacts from related pipelines, repeated source templates.

**Inspect:** ordering/layout only after determining whether the format gives it semantic meaning.

**Abstract first:** serialization order, whitespace, file placement, formatting when non-semantic.

**Generate:** use layout coincidence to locate candidate regions, then discard layout unless rigid.

**Expand:** structural comparison must replace presentation comparison.

**Falsify:** alpha-rerender or reorder where legal and see whether the candidate survives.

**Promote:** retrieval lead only.

**Residual handling:** presentation residual is normally administrative.

**Stop / cost:** near-zero budget; never use expensive search solely to exploit layout.

**Next:** DP-06, DP-10, DP-13.

---

## DP-45 — Raw identifier correspondence

**Objective:** use exact identifier matches only as the lowest-priority lookup hint.

**Priority cues:** explicit shared namespace/import authority or known generated IDs.

**Inspect:** SI namespace authority and whether identifiers are rigid or alpha-renamable.

**Abstract first:** raw spelling whenever core semantics permit.

**Generate:** locate potentially corresponding referents; immediately inspect their actual relations.

**Expand:** move to structural protocols.

**Falsify:** rename identifiers lawfully; if the candidate disappears, it was representational rather than structural.

**Promote:** no semantic correspondence solely from raw ID equality across independent namespaces.

**Residual handling:** preserve identifier provenance only.

**Stop / cost:** immediate; this is a lookup aid, not a discovery strategy.

**Next:** DP-10, DP-01, DP-03.

---

# 7. Task-specific default promotions

The global ranking may be adjusted at the start of a task when the task class is known.

## Engineering / software systems

Promote early:

```text
DP-01 cross-boundary
DP-03 interfaces
DP-04 dependency topology
DP-08 residuals
DP-14 transformation invariants
DP-15 information flow
DP-22 composition
DP-23 reconstruction
DP-34 failure modes
DP-36 redundancy
```

## Mathematical / theorem comparison

Promote early:

```text
DP-02 constraints
DP-06 motifs
DP-07 factorization
DP-09 symmetry
DP-11 invariants across variation
DP-19 duality
DP-24 proof topology
DP-29 partial order
DP-31 conservation/balance
DP-33 special cases
DP-35 exceptions
DP-37 equivalent closures
```

## QU / uncertainty research

Promote early:

```text
DP-02 constraints
DP-05 QU topology
DP-11 invariants across variation
DP-12 known/open interfaces
DP-25 refinement
DP-37 equivalent closures
DP-39 QUI extension
```

## NEI / identity research

Promote early:

```text
DP-02 constraints
DP-05 QU topology when uncertainty matters
DP-09 symmetry as a falsifiable clue only
DP-11 invariants across variation
DP-16 temporal structure
DP-18 cardinality/multiplicity
DP-38 semantic-identity candidates
DP-39 QUI only as structural evidence, not identity authority
```

These promotions alter search order only.

---

# 8. Candidate lifecycle

Discovery output SHOULD use explicit lifecycle states so that agent handoffs do not silently upgrade hypotheses.

```text
LEAD
    cheap cue worth structural inspection

CANDIDATE
    explicit proposed mapping/relation with defined scope

SUPPORTED_CANDIDATE
    survived specified structural checks/falsification but not yet a qualified semantic claim

QUALIFIED_CLAIM
    governing IsoGraph/extension obligations discharged independently of DP ranking

REJECTED
    falsified or semantically invalid under the stated scope

DORMANT
    unresolved but currently low-value relative to resource cost
```

A DP agent may recommend promotion from `LEAD` to `CANDIDATE` or `SUPPORTED_CANDIDATE`. It MUST NOT label a result `QUALIFIED_CLAIM` merely because the discovery process was persuasive.

---

# 9. Expansion discipline

When a candidate is found, agents SHOULD expand in the following order unless evidence favors another path:

1. verify the immediate mapped relations;
2. inspect one-hop load-bearing neighborhoods;
3. compare attached constraints;
4. compare interfaces/boundaries;
5. inspect dependency/reachability consequences;
6. inspect residuals;
7. test alternate factorization only if residual shape suggests it;
8. move to wider-scale or global mapping only after local structure survives falsification.

This prevents expensive whole-structure search from preceding cheaper high-information local tests.

---

# 10. Falsification discipline

Every nontrivial candidate SHOULD trigger an adversarial search for a breaker before expensive expansion.

Preferred falsifiers include:

- missing/reversed incidence;
- incompatible relation arity;
- multiplicity/cardinality mismatch;
- rigid-label/literal conflict;
- excluded QU realization;
- incompatible closure authority;
- unmatched semantic boundary;
- temporal/causal reversal;
- unsatisfied reconstruction obligation;
- provenance/authority mismatch;
- circular use of the candidate to construct its own evidence.

A quickly falsified candidate is a successful discovery outcome because it prevents greater downstream cost.

---

# 11. Residual-first rule

Once a strong common structure is identified, the agent SHOULD explicitly switch attention to the residual before seeking a larger match.

Residuals may reveal:

- the true distinguishing invariant;
- a missing factorization;
- a hidden parameter;
- a domain-specific extension;
- a transformation delta;
- a failed assumption;
- an unresolved QU region;
- an exception/failure boundary;
- evidence that the candidate common core was overgeneralized.

A discovery procedure that maximizes matched structure while suppressing residuals violates this module.

---

# 12. Unknown-first opportunity rule

When a source contains qualified unresolved structure, the agent SHOULD consider whether the unknown structure itself is more informative than attempting to resolve it.

Specifically, before spending resources resolving a QU, ask whether:

- its constraint topology already matches another QU;
- its known/open boundary exposes a common interface;
- its admissible variation yields a useful invariant;
- a QUI/common-core candidate would answer the research objective without resolving individual unknowns.

This rule is intended to preserve and exploit structural uncertainty rather than treating resolution as the default objective.

---

# 13. Discovery-result portability

A useful DP result SHOULD be recorded so another agent can continue without replaying the entire search.

At minimum preserve:

```text
source revisions
protocol IDs attempted
candidate mappings
comparison/view authority
abstractions used
falsifiers attempted
residuals
open obligations
rejected alternatives
next ranked protocols
resource/external-call history when relevant
```

This is especially important for long-running agent research and cross-context handoff.

---

# 14. No mandatory discovery algorithm

DP does not prescribe one implementation for graph matching, retrieval, canonicalization, theorem proving, embedding search, SAT/SMT, symbolic algebra, automorphism detection, or factorization.

An agent may use any method consistent with the active semantic authorities and resource constraints.

Algorithms may be benchmarked and ranked independently. DP specifies **search intent and evidentiary discipline**, not a mandatory solver.

---

# 15. Future empirical reranking

DP 0.1's ranking is a reasoned prior, not an empirical law.

Experiments MAY record, per protocol and task class:

```text
new qualified structures discovered
new supported candidates discovered
false-positive / falsification rate
external-agent calls
CI executions/runtime
local compute cost
human/agent review burden
novel downstream claims enabled
```

Future DP revisions may rerank protocols using such evidence without changing IsoGraph Core, QU, NEI, or the semantics of previously qualified claims.

Do not optimize ranking solely for number of candidates. The target is useful new load-bearing structure per cost.

---

# 16. Working constitutional summary

Discovery Protocols 0.1 is governed by six rules:

1. **Search structurally before lexically.** Names and IDs are retrieval hints unless explicitly rigid.
2. **Search the highest-information seams first.** Boundaries, constraints, interfaces, dependencies, open structure, and residuals usually precede whole-graph matching.
3. **Adapt the ranking to evidence.** The numbered list is a prior, not a rigid execution sequence.
4. **Falsify early and preserve residuals.** A broken candidate and a meaningful residual are informative results.
5. **Discovery never confers truth.** Candidate generation and semantic qualification remain separate.
6. **Spend external resources only for new evidence.** Reuse deterministic/local structure and batch compatible work before consuming scarce model or CI executions.

The module's purpose is not to make IsoGraph search exhaustive. It is to make agent discovery deliberate, high-yield, reproducible, and structurally aligned with the rest of the specification.
