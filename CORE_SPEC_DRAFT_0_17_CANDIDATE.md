# IsoGraph Core Specification — Draft 0.17 Candidate

**Status:** corrective successor candidate  
**Depends on:** `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md`  
**Scope:** narrow Semantic Identity definition correction only  
**Growth rule:** adds no syntax, irreducible primitive, comparison relation, D/E transformation kind, proof algorithm, or Natural Entropic Identity semantics

---

# 1. Purpose

Draft 0.16 overdefined the core bare-ID mechanism by calling it `structural identity` and stating that same structural identity means the same object. The core behavior actually required is representation-level referential continuity: matching occurrences must be able to address the same represented referent, namespaces must remain hygienic, references must preserve sharing, and fresh allocation must avoid SI collisions.

Draft 0.17 corrects that description without changing those behaviors.

The core term is now:

```text
Semantic Identity (SI)
```

An SI is a representation-level referential identity. It tells IsoGraph which represented referent an occurrence addresses within an applicable SI namespace.

SI is not, merely by its equality or inequality, independent evidence for any stronger theory-, profile-, or extension-owned identity relation.

This amendment does not define or depend on any such stronger relation.

---

# 2. Normative replacement: candidate irreducible substrate

In Section 4.1, replace:

```text
opaque structural identity
```

with:

```text
opaque Semantic Identity (SI)
```

The primitive candidate remains the same representation-level addressing/sharing capability. This is a scope/terminology correction, not a new primitive.

---

# 3. Normative replacement: Section 6

Rename Section 6 to:

```text
# 6. Semantic Identity, namespaces, literals, and stable labels
```

Replace Section 6.1 with:

## 6.1 Semantic Identities

Bare integers are opaque Semantic Identity (SI) handles.

Within one SI namespace:

```text
same SI = same represented referent
```

Different bare SIs are distinct represented referents for core addressing, sharing, matching, allocation, and reconstruction semantics.

These statements define representation-level reference only. SI equality or inequality is not, merely by existing, independent evidence for any stronger identity relation supplied by an object theory, profile, or external semantic extension.

In particular:

```text
same SI
    != proof of a stronger externally defined identity relation

different SI
    != proof of stronger natural/ontological distinctness
```

A stronger identity authority may use SI-addressable referents as its carrier and may derive additional relations over them, but it does not retroactively change what the SI tokens mean. Any transformation that coalesces, splits, or rerenders SI referents remains an explicit qualified transformation with the applicable provenance/reconstruction obligations.

Bare SI spelling may alpha-map where the frozen comparison policy permits.

Independent top-level documents/bundles do not share SI merely because numeral spellings match.

Cross-document SI continuity requires explicit shared namespace, import/export mapping, port relation, or qualified partition witness.

---

# 4. Normative terminology propagation

The following existing core uses are representation-level SI uses and are renamed accordingly without behavioral change:

- `structural-identity namespace` -> `SI namespace`;
- `structural identity` in occurrence/reference preservation -> `SI`;
- interface `crossing identity` / `exposed identities` -> `crossing SI` / `exposed SIs`;
- variable aliasing of the `same object` -> aliasing the same SI referent;
- `local structural-ID namespace/renaming` -> `local SI namespace/renaming`;
- V0 `local alpha identities` -> `local alpha SIs`;
- fresh-allocation occupied/fresh identities -> occupied/fresh SIs within the allocation SI namespace, including application-event SI where an event requires independent representation;
- structured `identity-valued` parameters -> `SI-valued` parameters where the parameter is a core represented referent;
- composition `shared ports/identities` -> `shared ports/SIs`, with shared SI alone still insufficient for composition;
- comparison records that hold representation identities rigid -> rigid SIs/literals held fixed;
- qualification controls concerning structural-ID namespace collision -> SI namespace collision;
- the interpretation barrier `structural identity != member occurrence` -> `Semantic Identity != member occurrence`;
- the constitutional shorthand `occurrence != identity` -> `occurrence != Semantic Identity`.

Where `identity` names immutable revision/content identity, algorithm identity, class/schema identity, source-theory identity, semantic-label identity, or another explicitly different role, it is not mechanically renamed to SI.

---

# 5. Object-theory equality remains separate

Section 13.2 is clarified to read:

```text
A == B is object-theory equality, not Semantic Identity (SI).
```

Pure core structural comparison does not coalesce SIs merely because an object formula asserts equality. Any equality-induced quotient/collapse remains an explicit semantic/projection transformation under its own authority.

Object-theory equality may itself become evidence for a separately defined stronger identity system only if that system explicitly admits the applicable equality authority. Draft 0.17 does not define such admission.

---

# 6. Occurrence semantics remain unchanged

`[7 7]` still contains two direct member occurrences referring to SI `7`. It does not create two SIs.

Removing one occurrence still does not destroy SI `7`, cascade-delete other incidences mentioning it, or imply object destruction.

If an occurrence needs persistent SI, ports, provenance, or relations, it is still reified explicitly.

No occurrence, multiplicity, scope, rewrite, or lifetime behavior changes in Draft 0.17.

---

# 7. Reference and allocation semantics remain unchanged

N0 reference resolution preserves SIs, incidence/sharing relationships, lexical ownership/capture status, and use-site occurrence multiplicity exactly as Draft 0.16 preserved structural IDs.

Fresh allocation remains SI-namespace-relative and allocates a previously unoccupied SI under the represented allocation authority. Draft 0.17 does not assert that an independently allocated SI is naturally/ontologically distinct under any stronger identity system merely because the SI is fresh.

Same-SI-namespace allocation still cannot silently reuse an occupied SI.

---

# 8. Comparison and discovery behavior

SI is still alpha-renamable or rigid exactly where Draft 0.16 allowed/required representation identity to be alpha-renamable or rigid.

A structural isomorphism/common-core witness remains a correspondence between represented structures. It does not become a stronger identity claim merely because nodes correspond.

Conversely, the Draft 0.17 correction does not weaken structural matching, namespace hygiene, occurrence preservation, witness accounting, or source reconstruction.

---

# 9. Historical compatibility

Draft 0.16 and earlier artifacts remain immutable evidence under their recorded semantic revisions.

Draft 0.17 does not retroactively reinterpret historical uses of `structural identity` in qualification artifacts. A current Draft 0.17 rerender or exact legacy-to-current bridge is required where the distinction matters to a new claim.

The intended compatibility correction is:

```text
Draft 0.16 structural-ID operational behavior
=
Draft 0.17 SI operational behavior
```

while Draft 0.17 removes the unnecessary implication that the operational referential identity is itself a stronger natural/ontological identity judgment.

---

# 10. Explicit non-changes

Draft 0.17 introduces none of the following:

- no Natural Entropic Identity term or semantics in core;
- no universal identity-of-indiscernibles principle;
- no same/different/unknown natural-identity classifier;
- no temporal identity law;
- no entropy measure;
- no identity-collapse inference rule;
- no new comparison view;
- no automatic quotienting;
- no new parser syntax;
- no special extension-loading mechanism.

A separately versioned semantic extension may define additional identity relations over SI-addressable referents through the ordinary dependency/authority machinery.

---

# 11. Scope check

Draft 0.17 is intentionally limited to this descriptive correction. Its operational requirement is simple:

```text
Draft 0.16 structural-ID operational behavior
=
Draft 0.17 SI operational behavior
```

while the stronger identity overclaim is removed.
