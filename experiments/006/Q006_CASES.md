# Experiment 006 — QU and NEI Semantic Cases

These controls are discovery-visible. Hidden expected answers are stored separately.

# QU controls

## QU-01 — shared unresolved referent versus constrained-equal referents

State A:

```text
P.value -> u
Q.value -> u
u domain {0,1}
```

State B:

```text
P.value -> u1
Q.value -> u2
u1 domain {0,1}
u2 domain {0,1}
constraint: value(u1) = value(u2)
```

Both states permit the same paired scalar values `(0,0)` and `(1,1)`.

Question: may QU silently identify these represented unknown structures merely because their allowed scalar outcomes coincide?

Allowed answers:

```text
SAME_QU
PRESERVE_REPRESENTATIONAL_DISTINCTION
INCOMPLETE_SCOPE
```

---

## QU-02 — entailed exclusion versus solver incompleteness

A QU state declares:

```text
x is an integer
0 <= x <= 10
x is even
x > 6
```

A weak implementation has only explicitly enumerated `8` so far and has not derived the full realization family.

For each candidate, return its semantic status under QU, not the implementation's current search state:

```text
x = 7
x = 8
x = 10
```

Allowed answer token is a comma-separated triple in that order using:

```text
ADMISSIBLE
EXCLUDED
```

Example format: `EXCLUDED,ADMISSIBLE,ADMISSIBLE`.

---

## QU-03 — information-state classification

Classify the four states in order A/B/C/D.

A:
```text
u domain {red, blue}; both values remain admitted; scope is qualified.
```

B:
```text
u is fixed to red; all claim-relevant structure is qualified and fixed.
```

C:
```text
u must equal red and u must equal blue; red != blue under the governing domain.
```

D:
```text
a symbol u is present, but no qualified domain/possibility universe or closure authority is supplied, so the exact admissible family cannot be established.
```

Allowed answer token is a comma-separated quadruple using:

```text
OPEN
DETERMINATE
INCONSISTENT
INCOMPLETE_SCOPE
```

---

## QU-04 — equal scalar information values

QU X contains two independent binary open roles attached to two distinct interface positions.

QU Y contains one four-valued open role attached to one interface position.

A separately supplied information profile assigns both states the same scalar information value of `2 bits`.

Question: does scalar equality alone establish a QUI or structural equivalence?

Allowed answers:

```text
QUI_ESTABLISHED
NO_QUI_FROM_SCALAR_ALONE
```

---

## QU-05 — cross-domain open-structure correspondence

QU A:

```text
three open route roles r1,r2,r3
exactly one route role may be selected
all three connect the same fixed source interface to three role-equivalent candidate sink interfaces
local IDs and names are alpha-renamable
```

QU B:

```text
three open proof-choice roles p7,p8,p9
exactly one proof-choice role may be selected
all three connect the same fixed premise interface to three role-equivalent candidate conclusion interfaces
local IDs and names are alpha-renamable
```

The comparison view includes role/incidence, exactly-one constraint topology, and fixed/open interfaces, while excluding domain vocabulary.

Question: what may Discovery/QU legitimately generate before a full isomorphism witness is independently qualified?

Allowed answers:

```text
NO_CORRESPONDENCE
QUI_CANDIDATE
QUALIFIED_QUI_AUTOMATICALLY
```

---

## QU-06 — semantic unresolvedness versus incomplete search

A qualified QU state is known semantically to admit at least one realization satisfying proposition `phi` and at least one satisfying `not phi`.

Implementation X has verified both witnesses.
Implementation Y has found only a `phi` witness and then hit a resource limit.

Return the correct statuses for X and Y in order.

Allowed answer token is a comma-separated pair using:

```text
SEMANTIC_UNRESOLVED
INCOMPLETE_COMPUTATION
```

---

## QU-07 — refinement versus revision

Q1 admits integers `{0,1,2,3}` under theory revision T1.

Q2, still under T1, adds the qualified constraint `x is even`, leaving `{0,2}`.

Q3 changes the governing meaning of `x` by replacing T1 with incompatible theory revision T2, under which the only admitted values happen to be `{0,2}`.

Classify Q1->Q2 and Q1->Q3 in order.

Allowed answer token is a comma-separated pair using:

```text
REFINEMENT
REVISION_NOT_ESTABLISHED_AS_REFINEMENT
```

---

## QU-08 — circular target restriction

A researcher wants to prove target relation `R` between systems A and B. Their original QU admits realizations both satisfying and violating `R`.

They create Q' by deleting every realization that violates `R`, solely because those realizations obstruct the desired result, then cite Q' as proof that `R` is necessary.

Allowed answers:

```text
QUALIFIED_REFINEMENT
CIRCULAR_UNQUALIFIED_RESTRICTION
```

# NEI controls

## NEI-01 — determinate identity without artificial QU

Two SI-addressed manifestations `a` and `b` are covered by a pinned identity profile and a qualified theorem that directly establishes they are the same continuant. No unresolved identity-relevant alternative is used by the claim.

No QU state is materialized.

Classify the NEI result.

---

## NEI-02 — absence of distinction is not sameness

Two distinct SIs `a` and `b` have no qualified positive sameness fact and no qualified separating fact. A pinned QU state and identity profile admit at least one lawful model where they are naturally the same and one lawful model where they are naturally distinct.

Classify the NEI result.

---

## NEI-03 — separation survives all QU variation

A QU state varies an unresolved measurement over several admissible values. A pinned identity profile contains a qualified identity-separating law establishing that subjects `a` and `b` have distinct natural origins, and that law is satisfied in every admissible model.

Classify the NEI result.

---

## NEI-04 — sameness survives identity-irrelevant variation

A QU state varies an unresolved surface property of two temporal manifestations. A pinned identity-preserving law establishes that this property is irrelevant to continuant identity and that the two manifestations belong to the same continuant in every admissible model.

Classify the NEI result.

---

## NEI-05 — inconsistent QU family

A required QU state is inconsistent and has no admissible realizations. No separate determinate identity theorem bypasses that dependency.

Classify the NEI result. Do not use vacuous universal quantification.

---

## NEI-06 — QUI is not identity

Two independently represented systems have QUs with a qualified structural QUI. The subjects being compared have no natural-identity bridge from that QUI. The applicable identity profile/QU family still contains at least one lawful SAME model and one lawful DISTINCT model.

Classify the NEI result.

---

## NEI-07 — coarseness trap

For one QU realization and one identity profile, both natural-identity models are lawful:

```text
[ab]      -- a and b in one identity class
[a][b]    -- a and b in different identity classes
```

No additional qualified identity evidence selects one. The first model is coarser.

Classify the NEI result under NEI 0.1.

---

## NEI-08 — temporal law versus lineage alone

Return two classifications in order A/B.

A: manifestations `s1` and `s2` are connected by an explicitly qualified identity-preserving temporal law whose side conditions are satisfied; no unresolved alternative can change that result.

B: manifestations `t1` and `t2` are connected only by a qualified causal-lineage/descent relation. The profile supplies no law saying lineage entails natural identity or natural distinctness, and no QU/model family establishing both alternatives is supplied.

Return a comma-separated pair using the NEI answer tokens from the cold prompt.
