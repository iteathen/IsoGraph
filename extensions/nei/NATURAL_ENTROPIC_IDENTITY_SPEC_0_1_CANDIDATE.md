# IsoGraph Natural Entropic Identity Extension — 0.1 Candidate

**Status:** unqualified rewritten normative extension candidate  
**Short name:** NEI 0.1  
**Core dependency:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` or an exact qualified bridge  
**QU dependency:** NEI depends normatively on Quantifiable Unknown (QU) semantics for claims whose identity result depends on unresolved identity-relevant structure; a determinate claim need not materialize a QU state merely to encode zero uncertainty  
**Native vocabulary:** `extensions/nei/NEI_VOCAB_0_1.isg`  
**Growth rule:** adds no core syntax or irreducible IsoGraph primitive; NEI terms are extension-owned semantic constructions represented using ordinary IsoGraph structure

---

# 0. Interpretation barriers

Do not collapse these distinctions:

```text
Semantic Identity (SI)
    != Natural Entropic Identity (NEI)

QU carrier/addressing correspondence
    != NEI SAME

Quantifiable Unknown (QU)
    != generic missing value

Quantifiable Unknown Isomorph (QUI)
    != NEI SAME

structural isomorphism / indiscernibility
    != automatic NEI SAME

object-theory equality
    != automatic NEI SAME

lineage / causal descent
    != automatic NEI SAME

semantic NEI UNKNOWN
    != incomplete search / RESOURCE_LIMIT

absence of evidence for DISTINCT
    != evidence for SAME

absence of evidence for SAME
    != evidence for DISTINCT

coarser identity partition
    != better-supported identity model

entropic
    != mandatory thermodynamic entropy
    != mandatory Shannon entropy
    != a numeric identity-collapse score
```

The last two barriers are constitutional. NEI does not infer sameness merely because a merge would reduce the number of represented identities.

---

# 1. Mission

Natural Entropic Identity is a derived identity system over SI-addressable referents. When identity-relevant structure is unresolved, that unresolved structure is represented through QU rather than an opaque `UNKNOWN` marker.

Its objective is:

```text
derive the strongest natural-sameness relation supported by qualified evidence
and, where uncertainty remains relevant, invariant across every admissible
realization of the maximally constrained unknown state
```

NEI is intended to expose natural sameness that may be obscured by representation-level naming, namespaces, source boundaries, vocabulary, factorization, temporal state changes, or independent formalizations.

NEI does not adopt a universal metaphysical criterion of identity. Domain/profile authority supplies the identity-preserving and identity-separating laws applicable to a claim.

NEI is conservative about positive sameness:

> a merge is licensed by qualified identity evidence, never by the mere absence of a known distinction.

---

# 2. Dependency architecture

The dependency direction is one-way:

```text
IsoGraph Core
    -> QU
        -> NEI
```

This is a specification dependency, not a requirement that every individual NEI result serialize a nontrivial QU object.

Core supplies SI-addressable structure, dependencies, claims, provenance, witnesses, and qualification machinery.

QU supplies the formal semantics for unresolved information: open relational structure, constraints, admissible realization semantics, scope/closure authority, and exact revision provenance.

NEI consumes QU whenever unresolved identity-relevant structure can affect the identity result. A fully determined NEI claim may be established directly from qualified fixed evidence/profile laws without manufacturing a degenerate QU artifact solely to represent zero uncertainty.

Core does not depend on QU or NEI, and QU does not depend on NEI.

NEI never changes the meaning of an SI token. Multiple SIs may receive NEI `SAME` while remaining separate SIs for addressing, provenance, source reconstruction, audit, and historical recovery.

---

# 3. When QU is required

Identity classification frequently depends on unresolved quantities, relations, topology, temporal facts, interpretations, or other open structure.

A bare marker such as `UNKNOWN` is insufficient because it does not preserve the relational shape of what is unresolved. NEI therefore MUST NOT invent an ad hoc open-world frontier or treat unrepresented possibilities as a substitute for QU.

A pinned QU state `Q` is REQUIRED when unresolved identity-relevant possibilities can change the identity classification, or when the claim itself is semantic `UNKNOWN`.

A separate QU state is NOT required merely because QU exists as an NEI dependency. A claim may omit `Q` when qualified fixed evidence and the applicable profile settle the identity relation without depending on unresolved identity-relevant possibilities.

Examples include a profile-authorized theorem or law that directly establishes `SAME` or `DISTINCT`, or a fully specified fixed structure whose relevant identity obligations are already discharged.

If unresolved identity-relevant information exists and the classification depends on it, omission of QU makes the claim incomplete/unqualified; it does not permit NEI to guess and it does not itself yield semantic `UNKNOWN`.

When present, QU is expected to preserve, as applicable:

```text
open carriers / open relation occurrences
known structural roles
admissible domains
relations among unresolved elements
constraints and dependencies
interfaces to fixed structure
scope / closure authority
provenance and immutable revision
admissible realization semantics
```

The QU representation may be intensional, symbolic, constrained, generative, or explicitly enumerative. NEI does not require eager enumeration.

An unknown value is not automatically an unknown identity. Two referents may share one unresolved quantity or may have distinct unresolved quantities constrained equal. Conversely, unresolved structure may admit realizations with different identity outcomes.

---

# 4. Domain, profile, and claim state

Every NEI result is relative to:

```text
P = pinned NEI identity profile
E = fixed qualified evidence/dependencies
Q = optional pinned QU information state when unresolved identity-relevant structure matters
```

`P` declares enough structure to recover, where applicable:

```text
NEI carrier/domain
identity-preserving laws
identity-separating laws / natural disequalities
admissible identity authority
cross-realization query-anchor semantics when Q is present
temporal identity laws if any
boundary/causal/ownership laws if identity-relevant
provenance/reconstruction obligations
proof/certificate profile
dependencies + immutable revisions
```

When `Q` is present, it supplies the exact unresolved structural region and its admissible realizations.

When `Q` is absent, the claim MUST NOT depend on unresolved identity-relevant alternatives. The qualified evidence/profile must be sufficient to settle the identity relation directly.

A result under one `P,E[,Q]` revision does not silently transfer to another.

---

# 5. Semantic Identity is addressability, not NEI evidence

NEI consumes SI-addressable referents as its represented carrier.

Purely administrative facts provide no natural-identity evidence merely by existing, including:

- SI numeral spelling;
- SI namespace separation;
- file or bundle separation;
- source-document identity;
- serialization order;
- human gloss;
- registry/class naming;
- independent factorization/extraction location;
- comparison-view selection.

A lawful SI alpha-renaming or transparent administrative repartition therefore preserves an NEI result when all natural structure and authorities are preserved.

Different SIs remain different core referents. NEI `SAME` is a derived relation over them; it is not permission to silently rewrite core addressing or provenance.

---

# 6. Determinate and QU-mediated claim paths

NEI has two semantic claim paths with the same identity meaning.

## 6.1 Determinate path

If qualified `P,E` directly settle the identity relation and no unresolved identity-relevant alternative can change it, the claim may establish `SAME` or `DISTINCT` without a QU state.

This path does not treat absence as evidence. The claim must carry enough positive closure/theorem/profile authority to discharge its identity obligation.

## 6.2 QU-mediated path

If unresolved identity-relevant structure can affect the result, a pinned QU state `Q` supplies the admissible realization family:

```text
R(Q)
```

A realization contains no arbitrary hidden facts merely because they are conceivable. It contains only structure permitted by QU's possibility universe, constraints, openness/closure declarations, and dependencies.

Likewise, a realization excluded by qualified QU constraints is not reintroduced by NEI.

NEI treats `R(Q)` semantically. An implementation may represent or prove properties of `R(Q)` without enumerating it.

If `R(Q)` is inconsistent/empty under QU semantics, NEI does not return `SAME`, `DISTINCT`, or `UNKNOWN` by vacuous quantification.

---

# 7. Cross-realization query anchors

This section applies to QU-mediated claims.

To evaluate one NEI query across multiple QU realizations, the queried subjects must be recoverable in each realization through a represented correspondence that does not itself assert natural identity.

For query referents `a` and `b`, each admissible model used by the claim supplies or inherits lawful realization-local interpretations:

```text
anchor_m(a)
anchor_m(b)
```

These anchors establish which realization-local carriers instantiate the queried represented roles. They are comparison/addressing correspondences only.

```text
same query anchor across realizations
    != NEI SAME across realizations
```

If a query subject is absent or undefined in some admissible realization, the profile must explicitly define the applicable existence/identity semantics. Otherwise the NEI query is not qualified over that realization family rather than being silently classified `UNKNOWN`.

---

# 8. Admissible NEI models

For a QU-mediated claim, each admissible NEI model `m` contains:

1. one realization `r in R(Q)`;
2. the realization-local structural state required by the claim;
3. lawful interpretations of the query anchors;
4. a natural-identity equivalence relation `≡_m` over the applicable NEI carrier;
5. evidence that `≡_m` satisfies the identity laws and constraints of `P` together with `E` and `r`.

An identity relation is admissible only if it:

- satisfies every qualified positive identity fact admitted by `P`;
- respects every qualified natural disequality or identity-separating constraint;
- preserves every load-bearing identity-relevant relation, cardinality condition, temporal law, boundary fact, and side condition included by `P`;
- satisfies applicable provenance/reconstruction obligations;
- does not use SI spelling or administrative separation as a natural distinction;
- does not merge or split subjects merely to improve an isomorphism, common core, retrieval score, compression score, entropy score, or downstream optimization.

If one QU realization permits multiple identity relations under `P`, all qualified alternatives remain admissible models unless separately excluded by qualified identity evidence.

There is no coarseness preference among otherwise admissible identity relations.

---

# 9. No maximally-coarse selection rule

Earlier NEI research considered retaining maximally coarse admissible identity partitions. NEI 0.1 rejects that rule.

Counterexample:

```text
A and B have no identity-relevant evidence establishing SAME or DISTINCT.
Both partitions [AB] and [A][B] satisfy the represented constraints.
```

Choosing `[AB]` because it is coarser would turn absence of distinctness evidence into positive sameness evidence.

That is invalid.

Therefore:

> coarseness, compression, fewer identity classes, lower description length, lower entropy, or a larger downstream isomorphism are not themselves permission to merge identities.

Qualified evidence supplies permission. Information-theoretic structure may characterize a QU state, but NEI truth conditions do not select identity models by an entropy-minimization heuristic.

---

# 10. Qualified NEI model family

For a QU-mediated claim, let:

```text
M(P,Q,E)
```

be the family of all admissible NEI models supported by the pinned profile, QU state, and fixed evidence.

The family is authority-bounded and claim-bounded. It does not include arbitrary metaphysical possibilities outside `P`, `Q`, or their dependencies.

A conclusive NEI claim requires sufficient coverage evidence for the universal or existential property it asserts. Exact certificates are permitted; eager enumeration is not required.

If `M(P,Q,E)` is proved empty, the semantic identity classification is not `SAME`, `DISTINCT`, or `UNKNOWN`. Record a no-admissible-model status with the appropriate underlying reason, such as inconsistent QU state, undefined query anchors, or unsatisfied identity-profile laws.

Failure of a bounded search to find a model is not proof that the family is empty.

---

# 11. Maximum-safe sameness under uncertainty

For a nonempty qualified QU-mediated model family `M = M(P,Q,E)`, define the derived NEI sameness relation:

```text
a ≡_NEI b
    iff
for every m in M:
    anchor_m(a) ≡_m anchor_m(b)
```

Equivalently, NEI sameness is the intersection of the admissible model identity relations after applying the lawful query-anchor correspondences.

Because an intersection of equivalence relations is an equivalence relation, qualified NEI `SAME` is reflexive, symmetric, and transitive over a consistently anchored carrier.

This relation is the **maximum safe sameness** supported under the represented uncertainty: any strictly larger sameness relation would merge at least one pair that some admissible qualified model keeps distinct.

This is the uncertainty-mediated sense in which NEI minimizes unsupported distinctions without inventing unsupported sameness.

---

# 12. NEI classification

For queried referents `a` and `b`:

## SAME

`SAME` is qualified when either:

1. the determinate path establishes natural sameness directly from `P,E`; or
2. in the QU-mediated path, `a` and `b` are naturally identical in every admissible model in nonempty `M(P,Q,E)`.

## DISTINCT

`DISTINCT` is qualified when either:

1. the determinate path establishes natural separation directly from `P,E`; or
2. in the QU-mediated path, `a` and `b` are naturally distinct in every admissible model in nonempty `M(P,Q,E)`.

## UNKNOWN

```text
NEI_P,Q,E(a,b) = UNKNOWN
```

requires the QU-mediated path and holds iff admissible NEI models disagree: at least one model makes the pair `SAME` and at least one makes it `DISTINCT`.

Semantic `UNKNOWN` is therefore a positive structural result about a QU-bounded admissible model family. It is not a synonym for missing computation, unavailable authority, incomplete coverage, undefined anchors, or resource exhaustion.

---

# 13. Joint consistency

Pairwise NEI statuses are projections of one joint qualified identity semantics. They MUST NOT be combined as independent booleans in a way that violates equivalence closure or joint realizability.

For example, under one identical authority context a qualified result set cannot contain:

```text
SAME(a,b)
SAME(b,c)
DISTINCT(a,c)
```

Where downstream composition uses several NEI claims together, joint realizability is verified or certified rather than inferred from independent pairwise plausibility.

---

# 14. Structural correspondence, QU, and QUI

A structural isomorphism, automorphism, bisimulation, equal fingerprint, same structural class, equal property vector, or other structural correspondence is not by itself an NEI `SAME` certificate.

A Quantifiable Unknown Isomorph (QUI) establishes a qualified structural correspondence between QUs. It may reveal that two independently represented systems have the same shape of unresolved information. That result is valuable but does not by itself establish that the represented subjects have one natural identity.

A profile may admit specific structural or QUI evidence into an identity theorem only through an explicit qualified bridge whose side conditions are satisfied.

Conversely, two structures may be semantically identical under a qualified identity profile without carrying any unresolved identity-relevant information. Such a determinate `SAME` result does not need a nontrivial QU state merely for bookkeeping.

---

# 15. Object-theory equality

Core `A == B` remains object-theory equality, not SI and not automatically NEI `SAME`.

A profile may explicitly admit a pinned qualified equality theory as natural-identity evidence. The theory revision, assumptions, side conditions, and bridge into `P` are load-bearing dependencies.

---

# 16. Temporal identity

Temporal identity uses the same NEI machinery rather than a separate universal ontology.

QU may represent unresolved temporal manifestations, events, histories, transitions, or properties when those uncertainties matter. The NEI profile supplies the applicable identity-preserving and identity-separating temporal laws.

Property change alone does not imply identity change.

Causal succession, lineage, replacement, fission, fusion, destruction, reconstruction, or reconstitution does not automatically imply `SAME` or `DISTINCT`.

Different qualified identity resolutions may be represented by different profiles, for example state identity, phase identity, continuant identity, or lineage identity. A refinement/nesting relation between profiles requires an explicit witness; it is not assumed.

---

# 17. Administrative-boundary invariance

Subject to preserved represented natural structure and qualified bridges, these changes do not by themselves change NEI:

- SI alpha-renaming;
- namespace numeral choices;
- transparent bundle/file repartition;
- serialization order;
- source-document relocation;
- human gloss;
- non-evidential registry/class labels;
- choice among semantically equivalent QU serializations when QU is present.

A represented physical, causal, temporal, containment, ownership, or boundary relation may be identity-relevant when `P` says it is. NEI ignores administrative boundaries as natural-identity authority; it does not ignore natural boundary structure.

---

# 18. QU refinement and epistemic evolution

Where QU is present, a genuine QU refinement narrows the admissible realization family without changing the governing meaning of the retained possibilities.

A later refinement may resolve prior NEI `UNKNOWN` into `SAME` or `DISTINCT`.

Revision or invalidation of assumptions is not automatically a refinement. A later result does not rewrite the earlier claim; claims remain tied to their exact authority/evidence revisions.

A qualified `SAME` or `DISTINCT` claim contradicted under the exact same pinned authority context indicates a qualification or implementation defect, not legitimate context dependence.

---

# 19. Information measures and the word entropic

NEI requires QU's structured unknown semantics when unknown structure matters, not a mandatory scalar entropy measure.

A QU profile may carry an information-theoretic characterization such as a state-count, probability distribution, Shannon/Hartley-style quantity, description-length measure, algorithmic-information approximation, or another qualified measure. Such quantities may be useful evidence or metadata when a governing profile explicitly gives them a role.

NEI 0.1 does not infer natural identity merely by minimizing any such quantity.

In NEI, `entropic` names the information-sensitive objective of eliminating **unsupported** identity distinctions while preserving every distinction and uncertainty still supported by qualified information.

The operative rule is:

```text
maximize justified collapse
while minimizing unsupported commitment
```

not:

```text
choose the partition with the fewest classes
```

---

# 20. Qualification and proof sufficiency

NEI follows IsoGraph Core claim-bounded obligation closure and proof-method neutrality.

A qualified NEI claim records enough structure to recover, where applicable:

```text
NEI extension/profile immutable revision
carrier and queried referents
fixed evidence revision
identity-preserving/separating laws
classification/result status
QU authority + immutable revision when unresolved structure matters
QU state / realization-family reference when used
query-anchor/correspondence authority for QU-mediated claims
witness/certificate references
coverage evidence appropriate to the claim
provenance
verification status
resource/completeness status
```

Claim burdens are semantic rather than algorithmic:

- determinate `SAME` or `DISTINCT` requires direct qualified evidence/profile authority sufficient to settle the claim without unresolved identity-relevant alternatives affecting it;
- QU-mediated `SAME` requires sufficient evidence that merger holds in every admissible NEI model relevant to the claim;
- QU-mediated `DISTINCT` requires sufficient evidence that separation holds in every admissible NEI model;
- semantic `UNKNOWN` requires sufficient evidence that both a SAME model and a DISTINCT model are admissible under one pinned `P,Q,E`;
- no-admissible-model status requires proof of model-family emptiness or an exact inherited QU/profile inconsistency result;
- incomplete search/coverage cannot be upgraded to semantic `UNKNOWN` or no-model status.

A complete explicit model-family enumeration is not required when an exact qualified theorem/certificate discharges the stated obligation.

---

# 21. Anti-circularity and discovery isolation

The target NEI hypothesis MUST NOT choose or alter the evidence state, QU state when present, possibility universe, closure scope, source interpretation, factorization, profile, identity law, or correspondence later cited as proof of that same conclusion.

Forbidden pattern:

```text
assume A and B are NEI SAME
-> constrain QU to realizations where they are same
-> derive a cleaner isomorphism
-> cite that restricted QU/isomorphism as proof of NEI SAME
```

Likewise:

```text
choose a QU representation only because it exposes the desired QUI
-> use the QUI as identity evidence
-> claim the original QU choice was thereby justified
```

Exploratory hypotheses may be recorded as hypotheses but do not qualify the identity result.

Independently qualified NEI results may be consumed by later structural search, quotienting, or optimization under ordinary provenance and reconstruction rules.

---

# 22. Native representation and no new syntax

NEI uses ordinary IsoGraph scopes, ordered incidences, SIs, stable labels, dependencies, claims, witnesses, and certificates.

The extension-owned numeric vocabulary in `NEI_VOCAB_0_1.isg` supplies stable native roles for NEI records. Those labels are namespaced to the extension revision and are not core-reserved tokens.

NEI does not duplicate QU's representation of open structure. When QU is required, NEI references the governing QU authority/state and adds identity-specific profile, model, classification, and evidence roles.

No NEI-specific parser token, special loader, mandatory solver, canonicalization algorithm, or entropy computation is required.

---

# 23. Failure classification

Before revising NEI semantics, classify a failure as one of:

```text
core/SI misunderstanding
QU representation or authority defect where QU is required
QU realization-family / closure defect
query-anchor/correspondence defect
identity-law/profile defect
admissible-model defect
joint-consistency defect
temporal-profile defect
profile-refinement/nesting defect
proof-coverage defect
circular-evidence defect
native-authority/provenance defect
implementation/search defect
non-defect / reviewer misunderstanding
```

Do not repair a failed case by adding a post-hoc natural distinction, post-hoc merge, QU restriction, or model-selection preference solely to obtain the desired identity answer.

---

# 24. Minimum future qualification targets

NEI 0.1 remains unqualified. Before promotion, qualification should demonstrate at least that:

1. core-only SI artifacts require no QU or NEI semantics;
2. a determinate qualified `SAME` or `DISTINCT` claim can succeed without materializing an artificial zero-uncertainty QU state;
3. a claim whose identity classification depends on unresolved structure requires a pinned QU state;
4. semantic `UNKNOWN` cannot be asserted without a QU-bounded disagreement in admissible models;
5. NEI fails closed when required QU authority/state is unavailable;
6. SI renaming and transparent administrative repartition do not change an NEI result;
7. absence of evidence for distinction does not produce `SAME`;
8. qualified sameness across every admissible QU/NEI model produces `SAME`;
9. qualified separation across every admissible model produces `DISTINCT`;
10. admissible SAME and DISTINCT models under one QU state produce semantic `UNKNOWN`;
11. inconsistent/empty QU or NEI model families do not produce vacuous identity results;
12. structural isomorphism or QUI alone does not become identity proof;
13. pairwise projections preserve joint equivalence-model consistency;
14. temporal classifications depend on explicit temporal identity law rather than property change alone;
15. incomplete computation remains distinct from semantic `UNKNOWN`;
16. circular QU restriction or downstream isomorphism cannot qualify its own NEI premise.

These are future qualification obligations, not prescribed discovery algorithms.

---

# 25. Superseded research rule

The earlier experimental formulation that selected **maximally coarse admissible identity partitions** is superseded by this candidate.

Its useful surviving intuition is retained only in corrected form:

> identity distinctions carry informational commitment, but information-theoretic pressure cannot license a merge. Where uncertainty matters, the qualified QU/model family determines what remains possible; NEI returns only the identity invariant justified across that family.

No older coarseness-selection wording is normative for this candidate.
