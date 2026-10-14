# DNWF 0.1 Candidate — Domain-Neutral Well-Founded Constructor Authority

**Status:** unqualified semantic-extension candidate  
**Frozen source census:** `DNWF_SOURCE_SEMANTIC_CENSUS_0_2.json`  
**Qualified dependency:** cumulative Core 0.17–0.21 only  
**New semantic surface:** one relation, `WF_TERM_ALGEBRA(Sigma, Mu)`

## 1. Purpose

DNWF supplies exactly the inductive/well-founded carrier authority required by Core K7. It does not supply arithmetic, algebra, topology, geometry, physics, or source-domain semantics.

The intended use is:

```text
finite extensional constructor-signature graph Sigma
        +
WF_TERM_ALGEBRA(Sigma, Mu)
        ->
well-founded generated carrier Mu
        ->
structural induction
        ->
unique structural fold/recursion
```

No Woit or Lisi object is part of the module.

## 2. Signature input

`Sigma` is ordinary finite packet data, not a DNWF-generated object.

A signature packet explicitly lists:

- constructor tag identities;
- each constructor's field-role identities;
- explicit first/next/last ordering incidences for the fields;
- for each field role, exactly one field kind:
  - **recursive** — the field value lies in `Mu`;
  - **external(A)** — the field value lies in a separately declared raw carrier `A`.

The signature's finiteness comes from the finite frozen packet itself. DNWF does not infer numeric arity or cardinality.

## 3. The one new semantic relation

`WF_TERM_ALGEBRA(Sigma, Mu)` means all of the following, together.

### 3.1 Constructor closure

Every constructor application permitted by `Sigma`, with recursive fields drawn from `Mu` and external fields drawn from their declared external carriers, produces a member of `Mu`.

### 3.2 Constructor coverage

Every member of `Mu` is produced by exactly one constructor tag in `Sigma` with one ordered field assignment conforming to that constructor's field roles.

### 3.3 Constructor separation

Different constructor tags produce distinct members.

For one constructor tag, two constructed members are equal iff every corresponding ordered field value is equal.

### 3.4 Well-foundedness

Following recursive fields from any member of `Mu` cannot produce an infinite descending chain. Every member is therefore a finite constructor tree.

External fields are not recursive edges.

### 3.5 Least generated carrier

`Mu` contains no members beyond those forced by finite constructor generation from `Sigma`.

Equivalently, if another carrier contains all constructor results and is closed under every recursive constructor case, it contains every member of `Mu`.

### 3.6 Initial fold property

For any target carrier `A` and one target constructor-function for each constructor tag of `Sigma`, respecting the same ordered external/recursive field interface, there exists exactly one map

```text
fold : Mu -> A
```

whose constructor equations replace each recursive field by its folded value and pass each external field through unchanged.

## 4. Derived authority

DNWF does **not** add separate induction or recursion primitives.

The following are required derived consequences of `WF_TERM_ALGEBRA`:

1. **Structural induction:** any property closed under every constructor case holds for all of `Mu`.
2. **Structural recursion:** the unique fold map of §3.6 exists.
3. **Constructor recursion termination:** recursion through recursive fields is well-founded.
4. **Finite-tree exclusion:** cyclic/infinite recursive structures are not members of `Mu`.

A qualification campaign must test these consequences; they are not optional gloss.

## 5. Native candidate interface

Candidate relation identity:

```text
160100  WF_TERM_ALGEBRA
```

The following IDs are packet-metadata relation identities only; their complete semantic contribution is their finite extensional incidence in the signature packet:

```text
160110  SIGNATURE_HAS_CONSTRUCTOR
160111  CONSTRUCTOR_HAS_FIELD
160112  FIRST_FIELD
160113  NEXT_FIELD
160114  LAST_FIELD
160115  FIELD_IS_RECURSIVE
160116  FIELD_HAS_EXTERNAL_CARRIER
```

Those metadata relations are not new semantic primitives.

## 6. Explicit non-claims

DNWF does not define or imply:

- natural numbers;
- arithmetic or order;
- length or cardinality;
- lists, vectors, matrices, groups, fields, rings, or modules;
- topology, continuity, limits, differentiation, integration, or measure;
- source-domain equality between any Woit and Lisi objects;
- a canonical constructor signature for any application;
- arbitrary non-well-founded recursion;
- coinduction or infinite streams.

Such structures require later schema qualification.

## 7. Anti-evasion rule

A downstream module may invoke DNWF only through an explicitly represented signature packet and a pinned `WF_TERM_ALGEBRA(Sigma,Mu)` occurrence.

A label such as `natural`, `list`, `tree`, `syntax`, or `finite sequence` is never DNWF authority by itself.

## 8. Qualification burden

DNWF 0.1 is not authority until the module-qualification matrix is satisfied.

Required controls must distinguish at least:

- well-founded vs cyclic constructor graphs;
- constructor coverage vs junk members;
- disjoint tags vs overlapping tags;
- injective constructor fields vs field-collapsing constructors;
- recursive vs external field roles;
- unique fold vs nonunique fold;
- complete constructor cases vs one omitted case;
- structural induction vs a predicate closed only on a strict subset.

Promotion requires fresh independent cold evidence and scorer-blind verification.
