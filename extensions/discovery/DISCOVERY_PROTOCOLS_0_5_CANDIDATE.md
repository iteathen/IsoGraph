# IsoGraph Discovery Protocols — 0.5 Candidate

**Status:** unqualified normative correction candidate  
**Short name:** DP 0.5  
**Base dependencies:** DP 0.1, DP 0.2, DP 0.3, DP 0.4, and the observation-first discrepancy clarification in `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md`  
**Identity dependency:** cumulative NEI 0.1-0.3 only when a conclusion actually relies on natural identity/distinctness  
**QU dependency:** qualified QU when unresolved structure must be preserved to represent the discrepancy faithfully  
**Evidence motivating this revision:** Connect4 IsoGraph authority 1.1 qualification/adjudication, where several apparent “errors” were either hidden semantic distinctions or decoder errors that still remained useful discovery leads  
**Growth rule:** adds no Core relation, new identity status, universal anomaly ontology, mandatory external model, or exhaustive explanation search

DP 0.5 corrects a framing failure:

> **A discrepancy is first an observation. It is not automatically a defect to be repaired.**

A system designed to expose hidden structure may produce disagreement precisely because two observers are operating at different semantic quantities, scopes, aggregation levels, or equivalence relations.

DP 0.5 therefore separates **qualification diagnosis** from **structural discovery**.

All DP 0.1-0.4 rules remain in force except where this document adds the discrepancy-handling behavior below.

---

# 0. Interpretation barriers

Do not collapse these distinctions:

```text
discrepancy
    != defect

decoder/scorer disagreement
    != automatic decoder error
    != automatic scorer error

different values
    != proof the same quantity was measured

same values
    != proof the same quantity was measured

qualification error
    != no structural discovery value

qualification success
    != structural-discovery closure

repair
    != explanation

raw anomaly
    != proved isomorphism

large dependency invalidation
    != automatically system fragility

observation
    != judgment
```

These barriers are normative.

---

# 1. Preserve the discrepancy before repair

Before a semantic repair motivated by a nontrivial discrepancy, preserve enough information to reconstruct the observation.

The preserved record should identify, as applicable:

```text
observer / reconstruction path
exact input or frozen revision
reported value / relation / status
queried subject(s)
declared property or metric
scope / view / profile
aggregation level
authority/provenance
closure/completeness assumptions
raw output before adjudication
```

This record need not introduce a new persistent artifact when existing frozen evidence already contains all of the above.

The purpose is to prevent repair from erasing the signal that exposed the hidden structure.

Purely mechanical corruption with no semantic ambiguity—such as a malformed hash, impossible syntax token, or byte mismatch against an exact immutable oracle—may take the ordinary fast repair path once the first divergence is established.

---

# 2. Semantic quantity alignment precedes value judgment

Before concluding that two reported values conflict, establish whether they denote the same semantic quantity.

A useful alignment check includes:

```text
same queried referent/anchor?
same predicate/metric?
same scope/view/profile?
same aggregation level?
same evidence granularity?
same representation layer?
same revision/provenance?
same closure/completeness assumptions?
```

For example:

```text
citation count
artifact count
event count
lineage count
independent-evidence count
```

may all be valid measurements of one evidence system while being different semantic quantities.

Likewise:

```text
explicit scope metadata present?
semantic domain of validity constrained?
```

are not the same predicate merely because both are informally called "scope".

A numerical or boolean mismatch is directly a value conflict only after sufficient quantity alignment is established.

---

# 3. Observation-first branching

When an inconsistency appears, the first valid state is:

```text
DISCREPANCY_OBSERVED
```

This is discovery bookkeeping only, not a new IsoGraph semantic relation.

Then investigate the smallest useful set of explanations suggested by the actual observation.

Candidate explanations may include:

```text
observer / decoder error
scorer / assertion error
representation ambiguity
hidden semantic distinction
hidden scoped equivalence
scope mismatch
aggregation-level mismatch
explicit-vs-derived property mismatch
classification-vs-ontology mismatch
unknown identity-relevant factor
missing authority / incomplete closure
real source contradiction
```

This list is descriptive, not exhaustive.

The protocol MUST NOT select "defect" merely because repair is operationally convenient.

It also MUST NOT invent an isomorphism merely because a discrepancy is interesting.

---

# 4. Hidden distinction and hidden equivalence are dual leads

A discrepancy may reveal that concepts previously treated as one quantity should be separated.

Example structural shape:

```text
one old "source/evidence" quantity
    ->
citation occurrence
artifact identity
evidence event
evidence lineage
independence group
```

This is a **hidden-distinction** lead.

The opposite is also possible: objects/relations represented separately may differ only in distinctions that are provably irrelevant to a declared downstream scope.

That is a **hidden-equivalence / scoped-quotient** lead.

DP should explore either direction without prejudging which will survive.

---

# 5. Unknown information blocks premature collapse

When a possible distinction is unresolved, discovery must not interpret missing difference evidence as sameness.

Conversely, when an observed representational/classificatory difference has unresolved identity significance, discovery must not promote that difference into natural distinctness.

If qualified QU/NEI authority is required to decide the question, use it according to its own contract.

If the required possibility universe or identity authority is missing, retain the discovery branch as incomplete/unresolved rather than forcing `SAME`, `DISTINCT`, or a terminal structural rejection.

---

# 6. Qualification disposition and discovery disposition are independent

Every material discrepancy investigation has two conceptually independent outputs.

## 6.1 Qualification disposition

This answers:

> Does the observed disagreement invalidate the representation/output/claim being qualified under its declared contract?

Use the existing qualification vocabulary appropriate to the campaign. DP 0.5 introduces no universal qualification enum.

## 6.2 Discovery disposition

This answers:

> Does the discrepancy still expose a plausible structural question worth preserving after qualification is decided?

A minimal discovery disposition may be recorded as:

```text
NO_STRUCTURAL_LEAD
OPEN_STRUCTURAL_LEAD
STRUCTURE_ESTABLISHED
STRUCTURAL_LEAD_FALSIFIED
```

These are discovery bookkeeping labels, not semantic relations.

Thus a decoder can be wrong for qualification while the discrepancy remains:

```text
qualification: decoder/output error
discovery: OPEN_STRUCTURAL_LEAD
```

Closing the qualification question MUST NOT silently close the discovery question.

---

# 7. Repair legality

A repair is justified when the authoritative owner of the defect is established sufficiently for the intended change.

Before repairing a **semantic** discrepancy, do enough structural inspection to distinguish a likely hidden-structure signal from a straightforward contract violation.

This does not require falsifying every imaginable explanation.

The burden is proportional to the discrepancy:

- exact mechanical corruption may be repaired immediately after verification;
- count/identity/scope/relation/uncertainty/provenance discrepancies require semantic quantity/scope inspection;
- discrepancies that threaten a foundational equivalence or corpus boundary require deeper dependency-aware investigation.

When repair proceeds:

1. preserve the pre-repair observation/evidence;
2. repair the authoritative owner rather than hiding the symptom;
3. keep any surviving structural lead explicitly open;
4. requalify only the evidence affected by the repair.

---

# 8. Derived versus explicit structure

One observer may report a property explicitly stored in the representation while another reports a property derivable from surrounding structure.

For example:

```text
explicit field: scope_present = false

semantic reconstruction:
    claim has a restricted domain of validity
```

Both observations may be accurate if they answer different predicates.

DP must not force one into the other before deciding whether:

```text
explicit metadata
    <-> derived semantic property
```

is exact, partial, scoped, or merely correlated.

A repeated discrepancy of this kind is a candidate for discovering an exact derivation or a missing distinction.

---

# 9. Minimal generating structure as a discovery question

When a decoder repeatedly reconstructs fewer relations/items than the explicit representation contains, investigate whether it is:

- omitting information incorrectly;
- collapsing duplicates;
- treating one edge as derivable from others;
- moving between explicit graph and a smaller generating basis;
- changing scope or aggregation level.

Do not delete explicit relations because a smaller basis seems plausible.

If a smaller exact generating structure exists, it requires its own reconstruction/coverage proof before it can replace or quotient the explicit representation for a declared scope.

---

# 10. Propagation and invalidation are discovery evidence

If a newly exposed distinction invalidates many downstream assumptions, DP MUST NOT automatically localize or suppress the invalidation to make the system appear stable.

With explicit dependency provenance:

```text
new distinction
    -> invalidated quotient/equivalence assumption
    -> dependency cone requiring reassessment
```

is expected behavior.

The size and shape of the invalidation cone may be useful evidence that the distinction is structurally load-bearing.

Propagation without provenance is corruption.

Propagation with exact provenance is also a diagnostic instrument.

---

# 11. Qualification may finish while discovery remains open

A representation can qualify as complete/accurate under its declared authority even when a discrepancy leaves an unresolved discovery lead.

Conversely, an interesting structural lead does not excuse an actual qualification defect.

Therefore these are legal together:

```text
semantic representation: QUALIFIED
discovery lead: OPEN
```

or:

```text
qualification output: INVALID
discovery lead: STRUCTURE_ESTABLISHED
```

This separation prevents two opposite failures:

1. blocking every promotion until all possible structural implications are exhausted;
2. erasing valuable anomaly evidence merely because qualification has been adjudicated.

---

# 12. Minimal discrepancy record

For a material semantic discrepancy, record enough to answer:

```text
observation A
observation B
quantity-alignment status
scope-alignment status
known unknowns / missing authority
qualification disposition
discovery disposition
repair action if any
surviving structural lead if any
affected dependency cone if material
```

This may be embedded in an existing qualification/review artifact.

No new dedicated file format is required.

---

# 13. Qualification targets

Before DP 0.5 promotion, focused qualification should demonstrate at least:

1. a mismatched count where the two values actually count different semantic quantities is preserved as hidden structure rather than "fixed";
2. a true decoder extraction error is correctly repaired/adjudicated while an independent structural lead remains open;
3. an explicit-field versus derived-semantic-property discrepancy is not treated as a direct boolean contradiction before predicate alignment;
4. a hidden distinction causes a previously coarse ontology to split correctly;
5. a safe scoped quotient is discovered without promoting it to global identity;
6. unresolved information prevents premature collapse;
7. a foundational distinction is allowed to invalidate a large dependency cone rather than being locally patched away;
8. qualification can complete with an open discovery lead when the lead does not undermine the qualified representation;
9. a seductive anomaly that has no surviving structural explanation is allowed to terminate as ordinary observer/implementation error;
10. the protocol does not turn every discrepancy into mandatory exhaustive research.

---

# 14. Working summary

```text
Perceive before judging.

A discrepancy is an observation.

First ask:
    are these the same quantity?
    under the same scope?
    at the same aggregation level?
    with the same closure assumptions?

Then ask:
    hidden distinction?
    hidden equivalence?
    unknown factor?
    observer/representation defect?

Qualification and discovery are separate questions.

Repair only after locating the authoritative defect.
Never repair away the evidence that exposed hidden structure.
Never force an isomorph just because an anomaly is interesting.
```

DP 0.5 changes how discrepancies are investigated. It does not make discrepancies semantic proof.
