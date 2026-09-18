# IsoGraph Core Specification — Draft 0.18 Observation-First Discrepancy Clarification Candidate

**Status:** unqualified normative clarification candidate  
**Base authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`  
**Short name:** Core 0.18 candidate  
**Motivating evidence:** Connect4 IsoGraph authority 1.1 discrepancy campaign and the subsequent NEI 0.3 / Discovery Protocol 0.5 review  
**Growth rule:** adds no parser syntax, irreducible primitive, structural relation, result status, ontology, identity rule, canonicalization requirement, or mandatory search algorithm

Core 0.18 is a narrow clarification over qualified Core 0.17.

Its purpose is to prevent a methodological error in which an observed inconsistency is prematurely framed as a defect to repair before determining what the observations actually denote.

All Core 0.17 semantics remain in force except where this document makes the observation/discrepancy precondition explicit.

---

# 0. Additional interpretation barriers

Do not collapse these distinctions:

```text
observation
    != judgment

discrepancy
    != defect

different reported values
    != same semantic quantity measured differently

same reported values
    != proof of semantic identity

failure classification
    != first interpretation step

repair
    != explanation

qualification disposition
    != exhaustion of structural discovery

unrepresented distinction
    != irrelevant distinction

large invalidation cone
    != automatically fragile design
```

These barriers constrain interpretation of Core 0.17 failure, qualification, comparison, and discovery-facing rules.

---

# 1. Discrepancy is initially observational

When two otherwise admissible reconstruction, comparison, verification, decoding, scoring, or representation paths disagree, the first justified conclusion is only:

```text
a discrepancy was observed
```

Core does not require that discrepancy to be represented by a new primitive or status.

Before classifying the discrepancy as a defect, enough context must be recovered to determine what each observation actually denotes.

This applies especially to discrepancies involving:

- identity;
- counts;
- scope;
- relation membership;
- provenance;
- uncertainty;
- aggregation;
- reconstruction layer;
- comparison view;
- evidence meaning;
- completeness/coverage.

---

# 2. Semantic alignment precedes value comparison

Two observations may be compared as conflicting values only after sufficient alignment of the quantity or obligation being observed.

As applicable, establish:

```text
queried referent / anchor
semantic predicate or quantity
scope / boundary
target layer
comparison view
aggregation level
representation/factorization stage
authority and revision
closure/completeness assumptions
units or counting basis
```

If those differ, the observations may both be correct.

For example, all of these can be valid counts over one evidence system while denoting different quantities:

```text
citation occurrences
artifacts
events
lineages
independence groups
```

Likewise:

```text
explicit scope metadata exists
```

and:

```text
the proposition has a constrained semantic domain
```

are not automatically the same predicate.

A mismatch may therefore expose missing structure in the comparison model rather than an erroneous value.

---

# 3. Preserve the observation before semantic repair

Before a semantic repair prompted by a nontrivial discrepancy, preserve enough information to reconstruct the observation.

Existing frozen evidence is sufficient when it already records the necessary material.

The preservation burden is proportional and may include:

```text
input/revision
observer/path
reported value or relation
scope/view
quantity definition
authority/provenance
raw output
relevant closure assumptions
```

The purpose is not procedural ceremony.

The purpose is to avoid destroying evidence that may reveal a previously hidden distinction, quotient, scope boundary, or derivation relation.

Exact mechanical corruption against an immutable oracle may take the normal fast repair path once the first divergence and owner are established.

---

# 4. Hidden distinction and hidden equivalence are both possible

A discrepancy may show that one previously coarse concept contains several different semantic quantities.

It may also show that separately represented structures admit an exact equivalence under a declared scope.

Core therefore does not privilege either explanation.

A valid investigation may conclude:

```text
real defect
hidden distinction
hidden scoped equivalence
different aggregation levels
different representation layers
derived-vs-explicit property
scope mismatch
authority/revision mismatch
source contradiction
incomplete closure
ordinary observer/implementation error
non-defect
```

These descriptions need not become Core-native enums.

Extensions may define their own discovery bookkeeping.

---

# 5. Failure classification is downstream of observation

Core 0.17 Section 43 remains valid.

Its failure classes are used **after** the discrepancy has been interpreted sufficiently to justify treating something as a failure or non-defect.

Therefore the intended order is:

```text
observe
-> align what was observed
-> inspect relevant scope/unknown structure
-> classify only when justified
-> repair only if a defect owner is established
```

not:

```text
observe mismatch
-> choose failure class
-> repair until values agree
```

This clarification also governs extension-owned failure-classification sections when those extensions explicitly depend on this Core revision.

It does not retroactively reinterpret historical qualification artifacts produced under earlier revisions.

---

# 6. Unknown distinctions are not projection permission

Core already requires explicit information-loss accounting for projection/quotient operations and context-scoped qualification for witness quotients.

Core 0.18 makes the corresponding negative rule explicit:

> **A distinction may be omitted from a scoped quotient because it is qualified as irrelevant to that scope; it may not be omitted merely because its value or significance is unknown.**

If an unknown distinction may be load-bearing for the claim, the representation must preserve the unresolved structure or fail closed at the applicable authority boundary.

Core itself does not define NEI or QU semantics. Qualified extensions may supply those semantics through explicit versioned dependencies.

---

# 7. Scoped equivalence is not global identity

Core 0.17 already treats target layer, view, transformation authority, relation kind, witness equivalence, and context-scoped quotients independently.

Core 0.18 makes the general interpretation explicit:

```text
equivalent under frozen context C
    != globally identical
```

A later context may expose a distinction hidden by `C`.

That does not retroactively invalidate the earlier scoped result unless the earlier result overclaimed beyond its frozen scope.

---

# 8. Discovery lead may survive qualification adjudication

A qualification discrepancy can be resolved without exhausting its structural implications.

For example:

```text
qualification:
    decoder field count is wrong

discovery:
    repeated collapse pattern may still indicate a derivable relation or hidden quotient
```

Core permits both conclusions to coexist.

A qualified representation is not required to exhaust every possible structural lead before promotion.

Conversely, an interesting discovery lead does not excuse a real qualification defect.

Discovery Protocols own the search behavior; Core owns only this separation of claims.

---

# 9. Dependency invalidation is allowed to reveal load-bearing structure

If a newly established distinction invalidates an earlier candidate equivalence, quotient, factorization assumption, or dependent claim, dependency propagation should expose the affected cone.

Core MUST NOT require local suppression of the inconsistency merely to preserve downstream results.

The correct response is to reassess dependent claims according to their recorded authority/revision.

With explicit provenance, the size and topology of the invalidation cone may itself be useful evidence about how load-bearing the newly exposed distinction was.

Historical claims remain historical claims at their original revisions.

---

# 10. Bounded observation-first burden

Observation-first does not require exhaustive explanation search.

The burden is proportional to the semantic consequence.

A useful default:

```text
mechanical byte/syntax defect
    -> verify first divergence and repair owner

ordinary local semantic mismatch
    -> align quantity/scope and inspect plausible structural explanation

foundational identity/scope/evidence/corpus-boundary mismatch
    -> dependency-aware structural investigation before repair
```

Stop when enough evidence exists to support the intended disposition.

Do not manufacture ambiguity after a straightforward defect is proved.

Do not manufacture a structural isomorph merely because an anomaly is interesting.

---

# 11. Qualification targets

Before Core 0.18 may supersede Core 0.17, focused qualification should demonstrate at least:

1. two different valid counts over one evidence system are not treated as conflicting until their counting quantities are aligned;
2. an explicit-metadata predicate and a derived semantic predicate are not collapsed merely because they share an informal name;
3. a genuine decoder/implementation error can be repaired without erasing a separately preserved discovery lead;
4. a discrepancy that exposes a hidden distinction causes the comparison model to split rather than forcing one value to win;
5. a scoped quotient may preserve an exact downstream claim without becoming a global identity claim;
6. unknown potentially load-bearing structure cannot be projected away merely because it is unresolved;
7. a newly exposed distinction may invalidate a broad dependency cone without the framework treating propagation itself as a defect;
8. a plain mechanical corruption still takes a bounded fast path;
9. the clarification does not require every discrepancy to trigger exhaustive structural research.

---

# 12. Working constitutional summary

```text
Perceive before judging.

A mismatch is first an observation.

Before saying values conflict:
    determine what each value measures,
    under what scope,
    at what layer,
    with what closure.

A discrepancy may expose:
    a defect,
    a hidden distinction,
    a hidden equivalence,
    an unknown factor,
    or simply two different valid questions.

Repair only after the authoritative defect is located.

Preserve unknowns.
Preserve residuals.
Preserve historical evidence.
Allow real distinctions to propagate through their dependency cone.

Do not force agreement merely because agreement is convenient.
Do not force an isomorph merely because disagreement is interesting.
```

All other Core 0.17 semantics remain unchanged.
