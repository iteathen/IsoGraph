# IsoGraph Design Ideals

**Role:** explanatory design doctrine and research posture  
**Semantic authority:** none by itself  
**Current semantic authority:** see STATUS.md and qualification/QUALIFIED_MODULES_2026-09-18.md

This document explains the design ideals that guide IsoGraph research, specification work, qualification, and interpretation.

It is intentionally **not** a substitute for the versioned semantic specifications. Where an ideal becomes load-bearing, the applicable Core/QU/NEI/Discovery specification and its qualification status control.

---

# 1. Perceive before judging

IsoGraph is meant to reveal structure, including structure that was not anticipated by the investigator.

Therefore an unexpected mismatch is initially an **observation**.

It is not automatically:

- a defect;
- a transcription error;
- a bad decoder;
- a bad scorer;
- a representation failure;
- proof of a hidden isomorphism.

The preferred posture is:

~~~text
observe
-> preserve the observation
-> determine what each side actually denotes
-> compare scope / quantity / layer / authority / closure
-> explore plausible structural consequences
-> only then classify
-> repair only when a defect owner is established
~~~

A system that exposes a hidden distinction by producing a discrepancy may be working exactly as intended.

---

# 2. Sameness requires justified absence of relevant difference

A central danger in representation is confusing:

~~~text
no difference was observed
~~~

with:

~~~text
no relevant difference exists
~~~

Those are not equivalent.

Incomplete information can make two objects appear identical even when an unresolved factor could still distinguish them.

Therefore:

~~~text
no observed difference
    != positive SAME evidence
~~~

unless the applicable identity/profile/closure authority is sufficient to exclude admissible identity-separating alternatives for the claim being made.

This is not a requirement to know every conceivable property of reality.

It is a requirement to close the **relevant scoped identity burden**.

---

# 3. Difference is not automatically ontological difference

The opposite mistake is equally dangerous.

Two represented things may differ in:

- label;
- file;
- namespace;
- algorithm;
- proof method;
- factorization;
- coordinate system;
- implementation;
- state;
- measured property;
- application classification.

That does not automatically establish that they are two different natural/domain objects.

A difference becomes identity-separating only when the applicable domain/profile authority gives it that role.

Thus:

~~~text
observed difference
    != automatic DISTINCT
~~~

Preserve the difference exactly, then determine what kind of difference it is.

---

# 4. Scope is part of every sameness claim

Sameness is often useful without being global identity.

Two distinct objects may have:

- the same exact property;
- the same behavior under one observer;
- the same proof role;
- the same quotient state;
- the same invariant;
- the same interface;
- the same future-relevant behavior for one consumer.

That can justify:

~~~text
A equivalent-under-S B
~~~

for a declared scope S, without justifying:

~~~text
A = B globally
~~~

A quotient valid for one scope may cease to be sufficient when a wider scope exposes a previously irrelevant distinction.

The earlier scoped result is not thereby false. It was scoped.

IsoGraph should make the scope explicit enough that this distinction survives reuse.

---

# 5. Unknown is information

Unknown structure is not empty structure.

When unresolved information has relational shape, dependencies, interfaces, constraints, provenance, or admissible possibilities, those facts are part of what is known.

A useful unknown representation therefore preserves as much as is justified:

~~~text
what is fixed
what is open
what constrains the open region
what it connects to
what possibilities are licensed
what possibilities are excluded
what authority defines the possibility space
what remains incomplete
~~~

The qualified QU extension exists for this reason.

An opaque UNKNOWN marker is insufficient when the unknown itself has useful structure.

But another distinction is equally important:

~~~text
semantic unresolvedness
    != missing authority / incomplete scope
~~~

A semantic UNKNOWN or UNRESOLVED result is a positive structural statement about a qualified possibility/model family.

When the possibility universe or closure authority is missing, the correct result is incompleteness, not manufactured semantic uncertainty.

---

# 6. Unknown distinctions are not permission to collapse

Compression is safe only when the removed distinctions are known to be irrelevant to the declared scope.

This means:

~~~text
unknown
    != irrelevant
~~~

If an unresolved distinction could still change the claim, it must survive the representation or block the stronger conclusion.

The desired reduction principle is:

> Remove distinctions only after their irrelevance to the declared obligation is established.

This is the safety boundary behind exact quotienting.

---

# 7. Correct decomposition enables stronger compression

A representation often has to become **more detailed locally** before it can become simpler globally.

The Connect4 evidence-lineage case is the canonical motivating example:

~~~text
citation occurrence
artifact identity
evidence event
evidence lineage
independence group
~~~

These were once easy to treat as one vague notion of "source/evidence."

Separating them exposed real distinctions.

Only after those distinctions were explicit could safe scoped collapses be stated, such as:

~~~text
two different artifacts
    -> one evidence lineage
~~~

without falsely claiming:

~~~text
two artifacts
    -> one artifact
~~~

The pattern is general:

~~~text
expose distinctions accurately
-> determine which distinctions matter to which scope
-> quotient only the proven irrelevant ones
~~~

Accurate decomposition is therefore not opposed to compression. It is what makes trustworthy compression possible.

---

# 8. Lowest information means lowest sufficient information

IsoGraph favors small representations, but not smallness for its own sake.

The target is not:

~~~text
minimum bytes
minimum nodes
minimum identity classes
largest common core
simplest-looking ontology
~~~

The target is closer to:

~~~text
lowest information state sufficient
to preserve the exact declared meaning
and every load-bearing distinction
~~~

This is always scoped to a claim, consumer, profile, or observation context.

A smaller representation is better only when it preserves the required semantics.

Compression, coarseness, elegance, or symmetry never supplies missing evidence for sameness.

---

# 9. Hidden distinction and hidden equivalence are dual discoveries

A discrepancy may reveal either direction.

## Hidden distinction

Something previously treated as one concept may actually contain several semantic quantities.

Example:

~~~text
"source count"
    ->
citation count
artifact count
event count
lineage count
independent-evidence count
~~~

## Hidden equivalence

Things represented separately may turn out to share an exact scoped structure.

Example:

~~~text
different implementations
    ->
same proof role under frozen context S
~~~

The investigator should not prefer one outcome in advance.

The system should remain capable of both:

- splitting an ontology when a real distinction is exposed;
- collapsing a representation when irrelevance is proved.

Unknown sits between those operations and prevents premature movement in either direction.

---

# 10. Discrepancy is a measurement channel

A disagreement between representations, decoders, scorers, or reconstruction paths can be useful even when one side is eventually shown to be wrong.

A qualification result may be:

~~~text
decoder output incorrect
~~~

while the discovery result remains:

~~~text
why did the decoder consistently collapse this distinction?
is there a derivable property, quotient, or alternate aggregation here?
~~~

Therefore:

~~~text
qualification closed
    != discovery exhausted
~~~

And conversely:

~~~text
interesting discovery lead
    != qualification defect excused
~~~

Both questions can coexist.

---

# 11. Qualification and discovery serve different purposes

Qualification asks whether a representation or claim satisfies its declared contract.

Discovery asks what additional structure may be present.

They must inform each other without being collapsed.

A representation may qualify while leaving an open structural lead.

A discovery may be valuable even when the output that exposed it fails qualification.

This separation prevents two bad extremes:

1. blocking every promotion until every possible implication has been explored;
2. deleting valuable anomaly evidence because the immediate qualification question has been resolved.

---

# 12. Propagation is a feature when provenance is exact

A foundational identity or equivalence mistake can invalidate many downstream conclusions.

That is desirable behavior if the dependency graph is explicit.

The alternative is worse: hidden inconsistency with no way to know what depends on it.

The intended behavior is:

~~~text
new load-bearing distinction
-> prior quotient/equivalence assumption invalid
-> dependent cone becomes suspect
-> affected claims are re-evaluated
~~~

This can look severe.

But with exact provenance, the size and shape of the invalidation cone tells us how load-bearing the distinction was.

Propagation without provenance is corruption.

Propagation with provenance is diagnosis.

Do not weaken propagation merely to make a system appear stable.

---

# 13. Preserve residuals

A residual is not failure debris.

It is often where the next important structure is hiding.

After a strong common core is found, residuals may reveal:

- the actual distinguishing invariant;
- a missing factorization;
- a hidden parameter;
- a boundary condition;
- an unresolved unknown;
- a failed assumption;
- a deeper common role expressed differently.

IsoGraph should therefore preserve residuals explicitly rather than maximize matched structure by discarding them.

---

# 14. Classification is not ontology

Human and machine systems need classifications.

Classifications can be useful and exact.

But:

~~~text
same classification
    != automatically same object

different classification
    != automatically different object
~~~

A classification relation means what its authority says it means.

Identity consequences require separate authority when identity is the question.

This matters in software, mathematics, and physics alike.

---

# 15. Representation is not reality

IsoGraph represents declared structure and qualified relations among representations.

It does not assume that its current categories are the categories nature, mathematics, or a domain "really uses."

The framework should therefore remain able to discover that:

- two labels describe one underlying structure;
- one label conflates several structures;
- a useful distinction is observer- or scope-relative;
- an apparent distinction is merely representational;
- the available information is insufficient to decide.

When the evidence is insufficient, preserve that fact.

Do not force reality into a classification merely because the representation requires a convenient answer.

---

# 16. Do not force agreement

When two views disagree, the goal is not to make them agree as quickly as possible.

The goal is to understand the relation between them.

Possible outcomes include:

~~~text
same quantity, one value wrong
different quantities, both values right
same scoped structure, different global objects
hidden distinction
hidden equivalence
derived property vs explicit metadata
authority mismatch
source contradiction
incomplete closure
ordinary implementation error
~~~

Agreement is useful only after the reason for agreement is understood.

---

# 17. Do not force isomorphism either

Observation-first does not mean anomaly worship.

Not every mismatch reveals deep structure.

Sometimes a count is simply wrong.

Sometimes a parser is broken.

Sometimes a model omitted an edge.

Sometimes no meaningful structural lead survives inspection.

The desired posture is open but falsifiable:

~~~text
do not dismiss an anomaly too early
do not romanticize it after its explanation is simple
~~~

Discovery remains evidence-driven.

---

# 18. Evidence is revision-scoped and immutable

Later understanding must not rewrite earlier evidence.

A failed or partial frozen qualification run remains failed or partial under the contract that produced it.

Later review may explain:

- why it failed;
- which part was semantic;
- which part was infrastructure;
- which discovery signal survived.

But the historical record remains intact.

New authority requires a new revision and new qualification when the semantics change.

This is how the project can learn without rewriting its own past.

---

# 19. Simpler is better only among complete explanations

IsoGraph prefers simpler mechanisms when they preserve the same:

- semantic fidelity;
- identity discipline;
- uncertainty structure;
- reconstruction ability;
- provenance;
- discovery safety;
- qualification burden.

Killing a distinction because it is inconvenient is not simplification.

Moving complexity into unknown assumptions is not simplification.

A simpler representation is valuable only after completeness for the intended purpose is established.

---

# 20. Practical reasoning posture

For agents and researchers, the preferred mental sequence is:

~~~text
What did we actually observe?

What exactly is being compared?

Are the two quantities/predicates really the same?

What is the scope?

What information is unknown?

Could the unknown change the conclusion?

What distinctions are explicit?

Which differences are load-bearing?

Could separately represented things share a scoped invariant?

Could apparently identical things hide an unresolved distinction?

What would falsify each interpretation?

Only then:
    what should be concluded?
    what, if anything, should be repaired?
~~~

This is intentionally more **perceptive than judgment-first**.

The purpose is not indecision.

The purpose is to delay commitment until the representation has had a chance to reveal its structure.

---

# 21. Current authority boundary

These ideals explain the direction of the project but do not themselves promote candidate semantics.

Current qualified authority remains whatever is recorded in:

- CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md;
- qualification/QUALIFIED_MODULES_2026-09-18.md;
- qualified infrastructure records.

The active successor candidates that most directly encode these ideals are:

- CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md;
- extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_3_CANDIDATE.md;
- extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md.

They remain unqualified until fresh promotion evidence exists.

---

# Working summary

~~~text
Perceive before judging.

No observed difference
    != proved sameness.

Observed difference
    != automatic ontological difference.

Unknown
    != irrelevant.

Same scoped property
    != necessarily same object.

Different classification
    != necessarily different object.

Expose distinctions accurately.
Collapse only what is proved irrelevant.
Preserve residuals and unknowns.
Let contradictions propagate through explicit dependencies.
Treat discrepancies as possible measurements of hidden structure.

Repair defects.
Do not repair away discovery.
Do not force agreement.
Do not force isomorphism.
~~~
