# IsoGraph Natural Entropic Identity Extension — 0.3 Candidate

**Status:** unqualified normative clarification candidate  
**Short name:** NEI 0.3  
**Base dependencies:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` and `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md`  
**Core dependency:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` plus `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` for this successor candidate, or an exact qualified bridge carrying both obligations  
**QU dependency:** qualified QU when unresolved identity-relevant structure can change the result  
**Evidence motivating this revision:** Connect4 IsoGraph authority 1.1 discrepancy/lineage adjudication, especially the distinction between explicit fields, semantic scope, citation/artifact/event/lineage identity, and unresolved evidence independence  
**Growth rule:** adds no Core primitive, NEI result status, universal identity ontology, compression objective, or mandatory search algorithm

NEI 0.3 is a narrow clarification over the qualified NEI 0.1 + 0.2 semantics.

Its purpose is to make three consequences explicit:

1. **absence of an observed difference is not positive sameness evidence unless the relevant comparison is closed enough to exclude a hidden identity-relevant distinction;**
2. **an observed difference is not automatically an identity-separating difference;**
3. **safe collapse is scope-relative and may forget only distinctions proven irrelevant to the declared claim/context, never merely unknown distinctions.**

All NEI 0.1 and 0.2 semantics remain in force except where this document makes their intended consequence explicit.

---

# 0. Interpretation barriers

Do not collapse these distinctions:

```text
no observed difference
    != proved absence of relevant difference

observed difference
    != automatic NEI DISTINCT

same represented property
    != same represented object

same under scope S
    != globally SAME

unknown identity-relevant distinction
    != irrelevant distinction

unrepresented identity authority
    != semantic NEI UNKNOWN

semantic NEI UNKNOWN
    != incomplete comparison authority

explicit field absence
    != proof that the corresponding semantic property is absent

classification difference
    != ontological difference

exact scoped quotient
    != global identity collapse

smaller representation
    != better-supported identity claim
```

These barriers are normative.

---

# 1. Observation precedes identity judgment

NEI consumes observations, represented relations, domain/profile laws, and qualified uncertainty structure. It does not reinterpret every observed equality/difference as an identity result.

Given observations `O` about two referents `a,b`:

```text
O contains no recorded difference
```

does not imply:

```text
NEI(a,b) = SAME
```

unless the pinned identity authority establishes that the observation/closure is sufficient for the identity claim.

Likewise:

```text
O contains a recorded difference
```

does not imply:

```text
NEI(a,b) = DISTINCT
```

unless the applicable identity profile makes that difference identity-separating.

NEI therefore treats observed equality/difference as **input structure**, not a pre-decided identity classification.

---

# 2. Claim scope is load-bearing

Every identity conclusion is already relative to the pinned NEI profile/evidence/QU state from NEI 0.1. NEI 0.3 makes explicit that the **claim scope** within that authority is load-bearing.

For a declared scope/context `S`, it can be valid that:

```text
a ≡_S b
```

while:

```text
a != b as SI referents
NEI_global(a,b) is unresolved or DISTINCT under another profile
```

A scoped equivalence says only that the distinctions omitted by that equivalence cannot affect the declared scoped claim.

A result proved under `S` does not silently transfer to a wider scope `S'`.

If a later scope exposes a previously ignored load-bearing distinction, the earlier scoped result remains interpreted under its original scope; it is not retroactively rewritten into a false global claim.

---

# 3. Comparison closure for SAME

NEI 0.1 already requires positive sameness authority and rejects a maximally-coarse merge rule.

NEI 0.3 names the corresponding closure condition:

> **A positive SAME conclusion requires enough qualified identity authority to exclude every admissible identity resolution in which the queried pair is DISTINCT for the claimed scope.**

This does **not** require exhaustive observation of every conceivable property in reality, and it does not require the subjects to share every property. A represented difference may be identity-preserving under the pinned profile.

It requires only the dependency-closed identity burden of the declared profile/claim. Any unresolved distinction that could still lawfully support a DISTINCT model blocks SAME until that possibility is excluded or represented inside the qualified model family.

A determinate `SAME` path therefore needs one of:

- an applicable qualified theorem/law that settles sameness;
- a qualified closure certificate showing the represented comparison is sufficient to exclude unrepresented identity-separating alternatives for the claim;
- another exact proof admitted by the pinned identity profile.

For a QU-mediated claim, closure is supplied by the qualified admissible model family. `SAME` holds only if every admissible model gives sameness.

If relevant possibilities are not represented/closed and no qualified authority excludes them, the claim is incomplete/unqualified. It is not silently promoted to semantic `UNKNOWN`.

---

# 4. Unknown relevant structure blocks collapse

When an unresolved distinction can affect identity, that distinction must remain represented through qualified QU structure or another exact authority bridge.

The safe rule is:

```text
unknown + potentially identity-relevant
    -> preserve as unresolved structure
    -> do not collapse across it
```

An implementation or discovery procedure MUST NOT treat:

```text
not currently represented as different
```

as equivalent to:

```text
proved irrelevant to identity
```

If the relevant unknown has a qualified QU realization family and admissible models disagree between SAME and DISTINCT, the semantic result may be NEI `UNKNOWN` under the existing NEI 0.1 rule.

If the possibility universe/closure/profile needed to define that model family is missing, the claim remains incomplete/unqualified instead.

This preserves the existing distinction:

```text
semantic UNKNOWN
    != missing authority
```

---

# 5. Same properties may be shared by distinct objects

NEI must preserve the useful fact that two distinct referents can share an exact property, invariant, behavior, relation, or quotient state.

For a property/query `F`:

```text
F(a) = F(b)
```

may be exact and load-bearing without implying:

```text
NEI(a,b) = SAME
```

Likewise, an exact scoped quotient may place `a,b` in the same quotient class for a downstream consumer while the underlying referents remain distinct.

This is not a weakened result. It is the correct result when the sameness claim concerns the property/consumer rather than global object identity.

---

# 6. Exact scoped quotient rule

A quotient/collapse `Q_S` is identity-safe for scope `S` only when every distinction it forgets is qualified as irrelevant to the obligations observed by `S`.

Equivalently, if:

```text
Q_S(a) = Q_S(b)
```

then that equality licenses only the conclusion represented by the quotient contract.

It does not license global NEI `SAME` unless the NEI profile separately establishes that the quotient is complete for natural identity.

Unknown identity-relevant distinctions MUST NOT be removed by `Q_S`.

If the quotient is justified by a theorem/certificate rather than enumeration, exhaustive comparison is not required.

A quotient valid under `S` may become insufficient under wider scope `S'`. That does not invalidate its original scoped claim.

---

# 7. Lowest-information description is scoped, not a sameness heuristic

A useful representation may seek the lowest-information state sufficient for an exact declared claim or downstream observation context.

NEI permits such reduction only after semantic sufficiency is established.

Therefore:

```text
smallest sufficient representation under S
```

is not:

```text
a universal natural-identity criterion
```

and:

```text
more compression
```

is not evidence for `SAME`.

No global unique minimal representation is required.

Claims of minimality still require a declared measure/partial order and appropriate coverage evidence under existing Core rules.

The NEI contribution is only the safety constraint:

> **Reduction may remove known irrelevant distinctions; it may not convert unresolved distinctions into sameness.**

---

# 8. Classification and ontology remain separate

A source/application may classify two referents differently while leaving their NEI relation unresolved.

It may also classify two referents together without establishing NEI `SAME`.

Thus:

```text
different class labels
    -> preserve the classification difference
    -> inspect its declared semantics
    -> use as DISTINCT evidence only if the identity profile licenses that role
```

and:

```text
same class label
    -> preserve the classification relation
    -> use as SAME evidence only if the identity profile licenses that role
```

Nature/domain truth is not forced to inherit an administrative or observational partition merely because the representation has one.

---

# 9. Disagreement between identity-facing observations

When two valid reconstruction/measurement paths disagree about an identity-facing property, NEI does not immediately choose one result.

First establish whether the observations concern:

- the same queried referents/anchors;
- the same property or semantic quantity;
- the same claim scope;
- the same aggregation level;
- the same authority/revision;
- the same closure/completeness assumptions.

If these are not aligned, the disagreement may be evidence of a real scoped distinction rather than an erroneous value.

If alignment itself is unresolved, preserve that unresolved comparison structure. Do not call the pair `SAME`, `DISTINCT`, or semantic NEI `UNKNOWN` solely because the observers disagree.

Discovery Protocols own the procedure for investigating such discrepancies.

---

# 10. Dependency propagation is not an identity defect

When later qualified information reveals a distinction that invalidates an earlier candidate quotient or identity assumption, downstream invalidation is expected.

NEI MUST NOT weaken dependency propagation merely to keep previously collapsed results locally valid.

The correct action is to re-evaluate dependent conclusions against the new qualified distinction while preserving their historical authority revisions.

A large invalidation cone may show that a hidden distinction was structurally load-bearing. That propagation is evidence about the earlier abstraction boundary, not by itself a flaw in NEI.

---

# 11. Qualification targets

Before NEI 0.3 may be promoted, focused qualification should demonstrate at least:

1. two objects with all currently observed properties equal do not become `SAME` when an identity-relevant distinction remains outside qualified closure;
2. a QU-bounded unknown that admits both identity outcomes yields semantic `UNKNOWN`, while missing QU/profile closure remains incomplete/unqualified;
3. a real represented difference does not become `DISTINCT` when the identity profile does not make that difference identity-separating;
4. two globally distinct referents may share an exact property/quotient class without global identity collapse;
5. a quotient valid under one scope may fail under a wider scope while its original scoped claim remains valid;
6. a classification difference is preserved without automatically becoming an ontological distinction;
7. compression/minimal-description preference cannot supply missing positive SAME evidence;
8. later discovery of a load-bearing distinction correctly invalidates dependent candidate collapses rather than being suppressed.

---

# 12. Working summary

```text
Observe first.

No observed difference
    != no relevant difference exists.

A difference
    != automatically an identity difference.

SAME requires qualified closure over the identity-relevant scope.

Unknown relevant structure stays represented.
It is never silently converted into irrelevance.

Exact scoped sameness may collapse objects for one purpose
without asserting global identity.

Reduce only what is proved irrelevant.
Preserve what is still unknown.
```

All other qualified NEI 0.1 + 0.2 semantics remain unchanged.
