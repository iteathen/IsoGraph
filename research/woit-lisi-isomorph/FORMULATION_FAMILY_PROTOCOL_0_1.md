# Formulation-Family Protocol 0.1

**Status:** campaign research protocol; not IsoGraph semantic authority  
**Originating research idea:** Joshua Oshiro, 2026-10-03  
**Formalization:** agent-assisted  
**Applies to:** Woit–Lisi structural isomorph campaign

## 1. Problem

A mature research program often expresses one underlying idea in multiple mathematically different but related forms.

For this campaign, treating "Woit" as one graph and "Lisi" as one graph would create two symmetrical errors:

1. **false negative:** the chosen representatives do not align even though an alternative source-faithful formulation does;
2. **false positive:** two convenient representatives look alike while their intra-author relation, scope, or physical role differs enough that the apparent bridge cannot be transported back to the rest of either program.

The search object is therefore not one graph per author. It is a **family of formulations plus the supported transformations among them**.

## 2. Primitive objects

For bookkeeping, let a formulation instance be:

```text
F = (source revision, declared scope, primitive rendering, authority/QU state)
```

A candidate concept family is a set of formulation instances linked by independently supported intra-author relations.

Family membership is a research conclusion. Shared terminology, common authorship, chronological succession, or the author's informal statement that two descriptions are "the same idea" is evidence but is not automatically structural equivalence.

## 3. Allowed relation strengths

The campaign may record relations such as:

```text
EXACT_EQUIVALENT
SCOPED_EQUIVALENT
DERIVABLY_EQUIVALENT
REFACTORIZATION
COORDINATE_OR_REPRESENTATION_CHANGE
SPECIALIZATION
GENERALIZATION
REAL_FORM_OR_SIGNATURE_REALIZATION
CHIRALITY_OR_REALITY_REALIZATION
REVISION_SUPERSEDES
ANALOGICAL_ONLY
UNKNOWN
```

These are campaign bookkeeping descriptions, not new IsoGraph primitives or universal ontological classes.

Every relation must preserve:

- directionality;
- scope;
- required assumptions;
- source provenance;
- reconstruction witness where available;
- residual differences;
- QU-bearing unresolved structure.

## 4. No premature canonicalization

Do not choose a single canonical Woit formulation or a single canonical Lisi formulation before cross-domain search.

Even when two intra-author formulations are exactly equivalent under one view, their factorization can expose different correspondence surfaces.

Therefore:

```text
semantic equivalence
    != same usefulness for isomorph discovery
```

and:

```text
best bridge representative
    != globally privileged formulation
```

## 5. Family construction is blind

Track W may infer Woit formulation families only from Woit sources and pinned mathematical authority.

Track L may infer Lisi formulation families only from Lisi sources and pinned mathematical authority.

The expected Woit–Lisi bridge may not be used to decide that two same-author formulations should be grouped.

This prevents the cross-domain target from manufacturing the intra-domain equivalence needed to reach it.

## 6. Bridge search over formulation families

After both formulation graphs are sealed, let:

```text
W = {W1, W2, ...}
L = {L1, L2, ...}
```

be eligible source-faithful formulations.

The search is not only:

```text
W1 <-> L1
```

but all structurally justified representative pairings and transport paths:

```text
Wi --intra-W--> Wj
Wj <--common quotient--> Lk
Lk <--intra-L-- Ll
```

A bridge is reported at the strongest supported scope:

- pair-specific;
- concept-family-specific;
- stable across several representatives;
- or program-level only if all required transport/reconstruction obligations are actually proved.

## 7. Bridgeability profile

"Most likely to bridge" is operationalized as an evidence-bounded DP 0.9 valuation problem, not a prior probability or aesthetic judgment.

For each candidate representative pairing, record a profile including:

- cross-domain structure preserved;
- residual structure left unmatched;
- assumptions required;
- QU burden;
- reconstruction fidelity;
- transition-anatomy preservation;
- directionality/information loss;
- robustness when the representative is changed within its same-author family;
- whether the bridge survives removal of E8-specific, twistor-specific, coordinate-specific, or other higher-level packaging.

A candidate may be preferred for the declared bridge objective only under an explicit valuation profile. That preference does not change source semantics or establish a unique natural formulation.

## 8. Bidirectional requirement

Where practical, test both:

```text
Wi -> Lj
Lj -> Wi
```

because one expression may be a lossy projection of another.

If only one direction reconstructs, record an asymmetric bridge rather than an isomorphism.

## 9. Transition bridges

Some apparent formulation changes may themselves be the common structure.

Examples include:

- choice/change of real form;
- Euclidean/Lorentzian signature passage;
- chirality/reality selection;
- symmetry breaking;
- decomposition/recombination of representation factors;
- discrete involution or conjugation operations.

When such a change is load-bearing, use DTS to compare the **transition anatomy**, not only the endpoint structures.

This allows the campaign to find:

```text
same transformation pattern
```

even when the before/after labels differ strongly between the two programs.

## 10. Falsifiers

For a claimed concept family or bridge, attempt:

- a source revision that uses the purported same idea but breaks the mapping;
- a formulation transform that fails reconstruction;
- a residual physical role that cannot be projected away;
- a dimension/reality/chirality mismatch;
- an alternative factorization that destroys an allegedly invariant bridge;
- a directionality test exposing information loss.

A bridge that exists for only one carefully selected expression remains valuable, but must be reported as pair-specific rather than generalized.

## 11. Expected outputs

The campaign should eventually produce:

```text
Woit formulation graph
Lisi formulation graph
intra-author equivalence/translation witnesses
concept-family partitions with UNKNOWNs preserved
pairwise bridge candidates
bridgeability profiles
common quotients
residual graphs
DTS transition correspondences
falsifiers
transport/reconstruction tests
```

This is the required surface before any strong statement that the two programs share "the same idea" in a mathematically substantive sense.
