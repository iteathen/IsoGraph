# Superseded research notice

This document is preserved as historical research from branch `spec/draft-0-17-semantic-identity-nei` at head `5c12b233dd904436fd0817d72a05e3bd2f1dc7f8`.

It is **not current NEI semantic authority**. Its maximally-coarse / least-distinct partition selection idea was subsequently rejected because coarseness alone can convert absence of distinctness evidence into positive sameness evidence. Current NEI authority routing is the rewritten `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` plus NEI 0.2 on `main`.

The record is retained because it captures the earlier problem framing, modular-boundary analysis, adversarial controls, and the reasoning path that led to the later correction.

---

# Natural Entropic Identity — Design Audit 0.1

Status: design record for Draft 0.17 / NEI Extension 0.1 qualification. This file is research evidence, not semantic authority.

## 1. Problem statement

IsoGraph's core currently gives bare structural IDs more meaning than the core actually needs. The core requires stable representation-level referents for sharing, matching, namespace hygiene, allocation, references, and reconstruction. It does not need bare ID equality or inequality to decide any stronger natural/ontological identity relation.

The correction is therefore narrow:

```text
core ID semantics = Semantic Identity (SI)
SI = representation-level referential continuity
```

The proposed Natural Entropic Identity (NEI) system is a separate semantic extension over SI-addressable referents. The extension depends on IsoGraph Core. IsoGraph Core does not depend on NEI and contains no NEI-specific loading hook, token, primitive, comparison view, or inference rule.

## 2. Modular boundary

The boundary is accepted only if all of the following hold:

1. Core IsoGraph remains complete and usable with every NEI artifact removed.
2. Attaching NEI changes no pre-existing core construct's meaning.
3. An artifact acquires NEI semantics only through ordinary pinned semantic dependency/authority structure.
4. SI spelling, namespace, source-file, bundle, serialization, and other administrative boundaries carry no NEI evidence merely by existing.
5. Core structural correspondence/isomorphism remains distinct from NEI identity.
6. NEI outputs may be represented as ordinary native IsoGraph structure and consumed downstream with their authority/provenance attached.
7. Historical Draft 0.16 artifacts keep their recorded semantics; Draft 0.17 does not retroactively reinterpret old qualification evidence.

## 3. Why the core correction is not an NEI feature

Current Draft 0.16 phrases such as `same structural identity = same object` overstate the required contract. The behavior needed by the core is only:

```text
same SI in one SI namespace = same represented referent
```

Different SIs are different represented referents for core addressing/matching purposes. That fact does not itself prove that a stronger theory/extension-owned identity relation must classify them as naturally distinct. Conversely, SI equality is not independent evidence for a stronger identity relation; it establishes which core referent is being addressed.

The correction therefore renames and narrows the existing primitive rather than introducing NEI into core.

## 4. NEI semantic objective

NEI is a derived identity relation designed to minimize unsupported natural-identity distinctions while preserving every qualified distinction that can still matter.

`entropic` is not a thermodynamic or Shannon-entropy claim. It names an ordering pressure on identity partitions:

```text
coarser qualified identity partition = fewer maintained identity distinctions
finer qualified identity partition   = more maintained identity distinctions
```

NEI prefers maximally coarse admissible identity partitions. It never obtains permission to erase a distinction merely from implementation convenience, SI naming, structural search cost, or a desired downstream correspondence.

## 5. Required inputs

An NEI claim is evaluated under a pinned NEI profile `P` and qualified evidence state `E`.

`P` determines at least:

- the NEI domain/carrier;
- which represented relations/constraints are identity-relevant;
- identity-preserving and identity-separating laws, including temporal laws where supplied;
- admissible unknown/open dimensions and their closure conditions;
- completion constraints;
- any explicit natural disequality/distinctness constraints;
- any source/theory identity facts admitted as authority;
- proof/certificate requirements;
- dependencies and immutable revisions.

`E` contains the represented natural structure and the explicit identity-relevant open frontier. SI spelling or administrative partitioning is not natural evidence.

## 6. Explicit open frontier

Absence of a represented distinguishing property is not automatically evidence that no such property can exist.

NEI therefore distinguishes:

```text
closed identity-relevant frontier
bounded/open identity-relevant frontier
unqualified/insufficient closure
```

Unknowns are positive represented uncertainty, not arbitrary hidden magic. Their allowed domains, relations, dependencies, equality/disequality constraints, and closure authority are part of `P`/`E`.

An unknown value is not automatically an unknown identity. Two manifestations may share the same unresolved quantity. Conversely, two independently open quantities may admit completions that distinguish them.

## 7. Admissible completions and identity models

Let `Comp(E,P)` be the nonempty set of completions allowed by the explicit open frontier and all qualified constraints.

For each completion `c`, an admissible identity partition `Pi` over the NEI carrier must:

- satisfy all identity facts and disequalities supplied by qualified authority;
- preserve every identity-relevant load-bearing fact required by `P`;
- preserve required occurrence/cardinality/boundary/temporal constraints where those are part of natural structure;
- not use SI spelling, source file, namespace, serialization, factorization, or comparison-view boundaries as identity evidence merely because they are boundaries;
- satisfy all declared reconstruction/provenance obligations.

Identity collapse does not delete SI occurrences or provenance. It only places multiple SI-addressable referents in one derived NEI class.

If `Comp(E,P)` is empty, NEI classification is invalid under that evidence state. Vacuous universal quantification MUST NOT yield both SAME and DISTINCT. The result is an inconsistent/no-admissible-completion condition, not an NEI identity classification.

## 8. Entropic order without arbitrary scalar cost

For partitions `Pi1` and `Pi2`, `Pi1` is coarser than `Pi2` when every class of `Pi2` is contained in a class of `Pi1`.

NEI does not require a numeric entropy, total order, or unique global minimum.

For each admissible completion, retain every admissible partition that is maximally coarse under the refinement order. If several incomparable maximally coarse partitions survive, preserve them all. Do not tie-break by SI spelling, canonical serializer output, discovery order, or implementation preference.

This is the entropic identity model set.

## 9. Pairwise classifications are projections of a joint model family

For queried referents `a` and `b`, considering every retained maximally coarse identity partition across every admissible completion:

```text
SAME
    iff a and b are in one class in every retained model

DISTINCT
    iff a and b are in different classes in every retained model

UNKNOWN
    otherwise
```

`UNKNOWN` means qualified underdetermination, not incomplete search.

Pairwise status records are projections of a joint partition/model family. They MUST NOT be combined independently in ways that violate equivalence-relation consistency. For example, `SAME(a,b)` and `SAME(b,c)` entails `SAME(a,c)` within one qualified NEI relation.

An incomplete search or incomplete coverage proof reports the applicable core `UNKNOWN`/`RESOURCE_LIMIT`/unverified status rather than falsely promoting semantic NEI `UNKNOWN`.

## 10. Structural sameness is not automatically NEI sameness

An isomorphism, automorphism, equal fingerprint, common structural role, or qualitative indiscernibility is not by itself an NEI SAME certificate.

Such structure may constrain the admissible model set, but NEI SAME follows only from the full qualified completion + admissibility + maximally-coarse semantics.

This is necessary because non-rigid structures can contain structurally indiscernible positions related by automorphisms without ordinary numerical identity. The NEI extension deliberately defines its own least-distinct qualified identity relation rather than silently importing the philosophical Principle of the Identity of Indiscernibles.

Research pressure references (non-authoritative):

- Stanford Encyclopedia of Philosophy, `The Identity of Indiscernibles`.
- Stanford Encyclopedia of Philosophy, `Structuralism in the Philosophy of Mathematics`, identity problem for non-rigid structures.
- Stanford Encyclopedia of Philosophy, `Identity and Individuality in Quantum Theory`.
- Leonid Libkin, `Certain answers as objects and knowledge`, Artificial Intelligence 232 (2016), for completion/certain-knowledge pressure.

## 11. Administrative boundary invariance

Purely administrative changes do not alter an NEI result:

- lawful SI alpha-renaming;
- independent numeric spelling;
- file/bundle repartition that is core-transparent;
- source-document relocation;
- serialization order;
- human gloss;
- registry/class labels not admitted as natural evidence.

A represented physical, causal, temporal, ownership, containment, or other boundary may still be identity-relevant when `P` includes it as natural structure. NEI ignores administrative boundaries as identity authority; it does not ignore represented natural facts involving boundaries.

## 12. Temporal identity

Temporal identity is an application of the same NEI model, not a separate primitive.

A profile may represent time-indexed manifestations and identity-preserving/separating transition laws. Property change alone does not split NEI. Persistence, replacement, fission, fusion, destruction, lineage, and reconstitution remain distinct relations unless the governing profile explicitly proves an NEI consequence.

Temporal manifestations may therefore classify as SAME, DISTINCT, or UNKNOWN. Lineage or causal descent is not silently promoted to identity.

## 13. Multiple identity resolutions / nested identity structure

NEI need not force one universal identity granularity across every scientific or formal purpose. Distinct qualified NEI profiles may describe different natural identity resolutions, such as state-level versus continuant-level identity.

A claim that one NEI relation refines/coarsens another requires its own verified refinement witness. Do not assume all identity profiles form one total chain. Where qualified refinement relations do exist, the resulting family of partitions may form a partial order/lattice and can represent nested identity classes without collapsing the levels.

Within one pinned profile, however, SAME is not view-relative or comparison-relative. A result that changes merely because an arbitrary comparison view changed is equivalence/quotient behavior, not NEI.

## 14. Qualification burden

A positive NEI result requires native/reconstructable evidence and independent verification.

At minimum an NEI result records:

- NEI extension/profile immutable revision;
- carrier/referents;
- evidence revision;
- identity-relevant signature;
- open-frontier/closure authority;
- completion policy;
- admissibility constraints;
- entropic partition order;
- classification/status;
- witness/certificate references;
- coverage/maximal-coarseness evidence appropriate to the claim;
- provenance and verification status.

No target NEI hypothesis may select the evidence, factorization, closure rule, or profile later cited to prove that same target claim.

## 15. Strongest-form proof observations

- `SAME` requires coverage showing every retained entropic model merges the queried referents, unless a stronger direct theorem/certificate entails that fact.
- `DISTINCT` requires coverage showing every retained entropic model separates them, or a verified separating invariant/law sufficient for all admissible completions.
- semantic `UNKNOWN` may be established constructively by one verified retained model with sameness and one with distinction, provided each model's admissibility and maximal-coarseness are established.
- `NO_ADMISSIBLE_COMPLETION` is not SAME, DISTINCT, or UNKNOWN.
- incomplete computation is not semantic UNKNOWN.

## 16. Core non-goals

The IsoGraph core should not define:

- NEI syntax;
- NEI statuses;
- an NEI inference algorithm;
- a universal identity-of-indiscernibles axiom;
- temporal persistence laws;
- physical identity laws;
- an entropy formula;
- a canonical identity partition;
- a mandatory NEI extension loader.

The core correction should only scope its own identity primitive accurately as Semantic Identity.

## 17. Adversarial controls required before promotion

A qualification corpus should include at least:

1. same SI behavior preserved under the core correction;
2. different SIs with no NEI authority do not gain an NEI result;
3. SI renaming/namespace/file changes leave a qualified NEI result invariant;
4. closed complete evidence allowing one unforced distinction collapses under entropic maximally-coarse semantics;
5. explicit natural disequality prevents that collapse;
6. an open frontier admitting both sameness and distinction yields semantic UNKNOWN;
7. inconsistent evidence/no admissible completion does not vacuously yield SAME or DISTINCT;
8. structural automorphism/isomorphism alone does not count as an NEI proof shortcut;
9. temporal property change under an identity-preserving law retains SAME;
10. temporal separating event/law yields DISTINCT;
11. incomplete search is not reported as semantic UNKNOWN;
12. two incomparable maximally coarse partitions are preserved rather than arbitrarily tie-broken;
13. pairwise reports preserve joint equivalence consistency;
14. NEI dependency removal affects only NEI-bearing structures, not ordinary core decoding;
15. a profile-refinement claim requires an explicit refinement witness rather than assumed nesting.
