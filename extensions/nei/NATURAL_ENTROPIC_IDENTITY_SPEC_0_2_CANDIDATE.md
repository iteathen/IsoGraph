# IsoGraph Natural Entropic Identity Extension — 0.2 Candidate

**Status:** unqualified normative clarification candidate  
**Short name:** NEI 0.2  
**Base dependency:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`  
**Core dependency:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` or an exact qualified bridge  
**Growth rule:** adds no parser syntax, identity primitive, result status, proof algorithm, or mandatory ontology

NEI 0.2 is a narrow clarification layer over NEI 0.1. All NEI 0.1 semantics remain in force except where this document makes the intended interpretation explicit.

The purpose of this revision is to explain what **natural** means without making the word load-bearing, and to prevent an agent from silently carrying stronger identity meaning through application semantics than the application actually supplied.

---

# 0. Constitutional clarification

The word **natural** in *Natural Entropic Identity* is explanatory terminology, not a semantic operator.

It indicates that NEI concerns identity attributed to the represented subject matter rather than identity arising merely from representation mechanics such as:

- Semantic Identity handles;
- namespace or file separation;
- source-document boundaries;
- terminology;
- factorization or decomposition choices;
- implementation technique;
- coordinate system;
- serialization;
- administrative ownership.

This explanation is **non-load-bearing**.

```text
"natural"
    != primitive predicate
    != evidence source
    != identity law
    != proof obligation
    != ontology declaration
    != canonical partition
    != inference rule
```

Removing or replacing this explanatory wording would not change an NEI result. Qualified results remain determined only by the formal NEI machinery: the pinned profile, qualified evidence/dependencies, QU when required, admissible model family, anchors, and the identity relations admitted by those authorities.

---

# 1. What "natural" does not mean

NEI does not give independent authority to ordinary-language intuitions about what is natural.

In particular:

```text
natural
    != intuitive
    != familiar
    != canonical
    != simplest
    != most compressed
    != most symmetric
    != author-preferred
    != metaphysically essential by declaration
    != physically intrinsic by declaration
    != representation-independent merely because someone calls it so
```

An agent must not use the English meaning of the word `natural` as extra evidence for `SAME` or `DISTINCT`.

---

# 2. Application semantics are preserved, not pre-judged

NEI does **not** assume that distinctions already present in an application are meaningless or merely representational.

An application may have strong semantic reasons for relating, separating, grouping, naming, typing, or otherwise distinguishing two represented objects. Those relations must be preserved according to their declared semantics and authority.

The governing caution is narrower:

> **Do not silently carry more identity meaning through an application relation than that relation actually declares.**

Examples:

```text
application relation:
    A and B are implemented by different algorithms

valid preservation:
    keep that implementation difference exactly

invalid strengthening without authority:
    therefore A and B are naturally DISTINCT
```

```text
application relation:
    A and B are declared distinct physical components

possible identity relevance:
    yes, if the pinned domain/profile authority makes component distinctness identity-separating

invalid assumption:
    infer either identity significance or irrelevance before reading that authority
```

```text
application relation:
    A and B are explicitly declared the same domain entity under authority R

possible identity relevance:
    yes, if R is admitted by the NEI profile as identity evidence

invalid assumption:
    treat the declaration as either conclusive or irrelevant without the governing bridge/profile
```

NEI therefore neither privileges nor dismisses the application's existing partition by default.

---

# 3. No presumptive identity lift

Representation/application structure supplies facts. NEI determines which of those facts bear on the identity question under the pinned authority.

The unsafe move is a **presumptive identity lift**:

```text
application distinguishes A and B in some way
-> silently reinterpret that distinction as NEI DISTINCT
```

or:

```text
application groups/matches A and B in some way
-> silently reinterpret that relation as NEI SAME
```

The safe rule is:

```text
preserve the asserted relation exactly
-> inspect its declared semantics/authority
-> apply any qualified bridge into the NEI profile
-> derive only the identity conclusion actually supported
```

This preserves application intent without importing an unrequested identity interpretation.

---

# 4. Profiles govern identity relevance

An NEI identity profile may state which qualified structures and application/domain relations are identity-relevant for the claim.

This is expected and legitimate.

A profile may include, for example:

```text
qualified causal discontinuity is identity-separating
explicit application entity-equivalence is identity-preserving
physical replacement event is identity-separating under this domain model
version/reconstruction relation preserves identity under stated side conditions
```

The key requirement is not that such rules be absent. It is that their identity role be explicit and independently tied to the pinned authority rather than inferred merely from how the current representation happens to be partitioned.

Pair-specific identity evidence is also permitted when the application/domain authority explicitly supplies it.

NEI does not decide in advance whether application semantics are identity-relevant. The profile/evidence tells NEI that.

---

# 5. Identity structure emerges from admissible models

NEI 0.1 already defines the admissible model family rather than selecting one preferred partition.

NEI 0.2 makes the intended direction explicit:

```text
representation/application supplies addressable candidates and semantic relations
qualified authorities determine which relations are identity-relevant
all admissible identity relations remain represented
NEI classification emerges from the resulting model family
```

The investigator does not begin by assuming either that the application's partition is the natural partition or that it is irrelevant.

For QU-mediated claims, every identity relation satisfying the pinned `P,Q,E` remains in the admissible family unless qualified evidence excludes it.

For determinate claims, `P,E` must settle the required relation under their actual semantics.

Therefore:

```text
no evidence for DISTINCT
    != SAME

no evidence for SAME
    != DISTINCT

representation-level difference alone
    != DISTINCT

representation-level sameness alone
    != SAME

application-defined relation
    = exactly its declared semantics until an identity bridge/profile gives it additional NEI significance
```

---

# 6. Discovery-facing consequence

A discovery process may encounter two represented regions that occupy corresponding load-bearing roles but differ in formulation, application relation, or machinery.

The discovery process should preserve every supplied difference. It should not assume those differences are irrelevant.

But if it wants to use one of those differences specifically as **natural-distinctness evidence**, it must establish that the pinned NEI authority gives the difference that identity role.

If identity relevance is not established, the discovery process should report the application/representation difference faithfully while leaving the NEI consequence unsettled.

This has a narrow consequence:

```text
identity relevance not established
    -> does not prove SAME
    -> does not prove DISTINCT
    -> does not erase the application relation
    -> does not permit the relation to masquerade as stronger natural-distinctness evidence
```

The discovery system remains free to reject a structural correspondence for an independent structural breaker without asking NEI to prove natural distinctness.

---

# 7. Evidence burden follows the identity conclusion

NEI does not require stronger evidence than the identity conclusion being asserted.

- A claim of `SAME` must discharge the existing NEI `SAME` obligations.
- A claim of `DISTINCT` must discharge the existing NEI `DISTINCT` obligations.
- A claim that identity is unresolved/incomplete must not be silently promoted into either result.
- A non-identity structural rejection is outside NEI's burden unless it is also asserted as natural distinctness.
- An application relation may be used exactly as declared without first resolving NEI, unless the reasoning depends on an NEI interpretation of that relation.

This prevents NEI from becoming a mandatory qualification campaign for every ordinary semantic difference.

---

# 8. Anti-presumption rule

The following statements are not automatically NEI evidence merely because they are true in the source/application:

```text
"the source authors treated them separately"
"the files/classes are different"
"the algorithms are implemented differently"
"the proof methods have different names"
"the application grouped these records together"
```

But neither are they automatically irrelevant.

The correct handling is:

```text
preserve the fact
preserve its authority/provenance
use the fact according to its declared semantics
only lift it into SAME/DISTINCT if the pinned NEI profile/bridge licenses that identity interpretation
```

This is a warning against presumptuous semantic strengthening, not a prohibition on application-defined distinctions or relations.

---

# 9. No new mandatory ontology

NEI 0.2 deliberately does not define a universal metaphysical meaning of identity.

The explanatory word `natural` does not impose one ontology across physics, mathematics, software, proofs, temporal objects, or other domains.

Different qualified profiles may legitimately ask different identity questions and may legitimately treat application/domain relations differently. Their results remain scoped to those profiles and evidence revisions.

What NEI requires universally is interpretive discipline:

> Preserve application semantics exactly, and do not silently strengthen or weaken their identity significance beyond what the pinned authority supports.

---

# 10. Qualification targets for this clarification

Before NEI 0.2 promotion, focused qualification should demonstrate at least that:

1. different SIs/methods/factorizations do not become `DISTINCT` merely because the representation separates them;
2. same-looking representations do not become `SAME` merely because the representation groups them;
3. an application-defined distinction can establish or contribute to `DISTINCT` when its qualified semantics/profile explicitly make it identity-separating;
4. an application-defined sameness/equivalence can establish or contribute to `SAME` when its qualified semantics/profile explicitly make it identity-preserving;
5. missing identity relevance remains incomplete/unqualified rather than defaulting to either result;
6. an agent preserves application relations even when their NEI significance is unresolved;
7. the explanatory meaning of `natural` can be removed from a test packet without changing the formal result when all normative authorities are held fixed.

---

# 11. Working summary

```text
Natural = explanatory contrast with merely representational identity.
Natural is not a semantic primitive.

Application semantics may be highly meaningful.
NEI neither dismisses nor automatically promotes them.

Preserve the application's relation exactly.
Carry into NEI only the identity meaning authorized by the pinned profile/evidence.

Do not add presumptuous identity meaning through semantics.
```

All other NEI 0.1 semantics remain unchanged.
