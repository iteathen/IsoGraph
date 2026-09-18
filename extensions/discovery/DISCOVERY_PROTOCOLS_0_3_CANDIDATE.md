# IsoGraph Discovery Protocols — 0.3 Candidate

**Status:** unqualified normative correction candidate  
**Short name:** DP 0.3  
**Base dependencies:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md` and `extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md`  
**Identity dependency:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` plus `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_2_CANDIDATE.md` when a discovery conclusion actually relies on natural identity/distinctness  
**Evidence motivating this revision:** RUN-Q006, RUN-Q006-R2, and their reproduction/decomposition reviews  
**Growth rule:** adds no core primitive, comparison relation, mandatory ontology, universal identity profile, or mandatory external solver

DP 0.3 narrows and operationalizes the DP 0.2 correction. Its purpose is to avoid two opposite errors:

1. requiring a full NEI qualification campaign for every ordinary structural or application-defined difference; and
2. allowing an agent to silently strengthen a represented/application distinction into a natural-identity separator without sufficient authority.

The governing principle is:

> **The evidence burden follows the conclusion. Preserve supplied semantics exactly, and do not draw a stronger identity conclusion than those semantics support.**

All DP 0.1 and DP 0.2 rules remain in force except where this document explicitly replaces or narrows them.

---

# 0. Separator discipline

A discovery branch may encounter an apparent difference between two candidate-corresponding regions.

Before that difference is used to reject or terminate the candidate, classify the intended separator as one of four discovery bookkeeping kinds:

```text
STRUCTURAL_BREAKER
RIGID_AUTHORITY
NATURAL_IDENTITY
NONE
```

These are not new IsoGraph semantic relations. They are minimal discovery-state labels explaining what kind of evidence is carrying the stop.

## STRUCTURAL_BREAKER

Use when a concrete load-bearing mismatch defeats the candidate under the active comparison/view authority, for example:

```text
incompatible relation arity
reversed dependency
unsatisfied constraint
cardinality/multiplicity mismatch
missing required interface
incompatible closure
failed reconstruction obligation
```

A qualified structural breaker is sufficient. **NEI is not additionally required.**

## RIGID_AUTHORITY

Use when the active application/domain/semantic authority explicitly makes the differing feature rigid or load-bearing for the comparison.

This category is intentionally broad enough to preserve meaningful application-defined distinctions without forcing them through NEI.

NEI is required only if the conclusion is additionally stated as natural identity/distinctness.

## NATURAL_IDENTITY

Use only when the discovery conclusion specifically relies on the proposition that the subjects are naturally `DISTINCT` under NEI.

Then the existing NEI obligations apply. A qualified `DISTINCT` result may carry the separator. Anything weaker may not.

## NONE

Use when no qualified separator has been established.

`NONE` does not mean the subjects are `SAME`. It means only that the current evidence does not yet carry a rejection/terminal-divergence conclusion.

---

# 1. Application semantics are preserved, not flattened

DP must not presume that an application-defined relation is merely representational or semantically weak.

An application may have valid domain reasons for distinguishing or relating two objects. Discovery preserves those relations according to their declared semantics and authority.

The caution is narrower:

> **Do not silently carry an application relation into a stronger identity meaning than it declares.**

Examples:

```text
application says A and B use different algorithms
-> preserve that difference
-> may be a structural/rigid separator if the active comparison says algorithm choice is load-bearing
-> does not automatically become NEI DISTINCT
```

```text
application says A and B are distinct physical components
-> preserve that relation
-> if the domain authority declares component distinctness rigid for the comparison, RIGID_AUTHORITY may stop the branch
-> if a natural-identity conclusion is desired, NEI determines whether that relation is identity-separating under the pinned profile
```

```text
application says A and B are equivalent under relation R
-> preserve R exactly
-> do not automatically promote R to NEI SAME unless the identity profile admits that bridge
```

DP therefore neither dismisses nor overinterprets application semantics.

---

# 2. NEI is conditional, not universal discovery overhead

DP 0.2 promoted NEI whenever a representational distinction risked becoming a natural separator. DP 0.3 preserves that safeguard but removes the implication that every residual needs a complete NEI investigation.

The sequence is:

```text
candidate correspondence
    -> apparent difference
    -> inspect the difference's declared semantics/authority
    -> ask what conclusion the difference is being asked to support
```

If the proposed conclusion is structural non-correspondence and a concrete structural breaker exists, use it directly.

If the application/domain authority explicitly makes the distinction rigid for the comparison, use `RIGID_AUTHORITY` directly.

If the proposed conclusion is specifically natural distinctness, NEI becomes load-bearing.

If the branch is merely being stopped for resource/cost reasons, no identity result is required; record a cost-bounded unresolved/dormant stop instead of claiming distinctness.

---

# 3. No presumptive identity lift

DP may faithfully use application/domain relations according to their declared meaning.

It must avoid this extra inference unless authorized:

```text
application/representation distinguishes A and B somehow
-> therefore A and B are naturally DISTINCT
```

and this symmetric inference:

```text
application/representation groups A and B somehow
-> therefore A and B are naturally SAME
```

When NEI becomes relevant, use the existing/pinned application/domain identity authority or a profile that faithfully represents such authority. Do not assume in advance that application relations are either identity-relevant or identity-irrelevant.

If their NEI significance is unavailable or unresolved, preserve the application relation and leave the identity consequence unsettled.

This is an anti-presumption rule, not a prohibition on application-defined identity semantics.

---

# 4. Cross-residual decomposition remains mandatory, but bounded

DP 0.2's cross-residual gate remains mandatory when:

1. matched structure exists upstream and downstream;
2. an unmatched region lies on the load-bearing path between them; and
3. no already-qualified `STRUCTURAL_BREAKER` or `RIGID_AUTHORITY` explains the divergence.

DP 0.3 clarifies the burden:

> **At least one genuine recursive role/factorization pass is required before terminal divergence. Exhaustive factorization is not required.**

A valid recursive pass identifies, as applicable:

```text
inputs/premises
outputs/obligations
encoding/representation role
boundary/side-condition role
constraint/invariant role
obstruction/exclusion role
witness role
refinement/approximation role
decoder/reconstruction role
```

The pass may terminate immediately if it finds a qualified structural breaker or rigid authority separator.

Otherwise it should continue while expected information value is material or stop as `DORMANT`/unresolved for cost.

---

# 5. Role before carrier, without forcing identity

A failed literal carrier mapping does not defeat a role correspondence unless carrier identity/type is load-bearing under the active authority.

The agent should distinguish:

```text
same role, different representation
same representation, different role
same role with structural breaker
same role with rigid application distinction
same role with unresolved deeper relation
```

Role correspondence by itself does not prove NEI `SAME`.

Representational difference by itself does not prove NEI `DISTINCT`.

Application-defined distinctions may be load-bearing if their declared authority says so; discovery must inspect rather than presume.

---

# 6. Evidence-matched stopping paths

A discovery branch may stop in one of the following ways.

## A. Structural rejection

```text
separator_kind = STRUCTURAL_BREAKER
separator_evidence = concrete breaker/witness
```

No NEI result is needed unless natural distinctness is also claimed.

## B. Authority rejection

```text
separator_kind = RIGID_AUTHORITY
separator_evidence = pinned application/domain/semantic authority
```

Again, NEI is not required unless the conclusion is an NEI conclusion.

## C. Natural-distinctness rejection

```text
separator_kind = NATURAL_IDENTITY
nei_result = DISTINCT
separator_evidence = qualified NEI evidence/authority
```

Only qualified `DISTINCT` licenses this path.

`UNKNOWN`, `INCOMPLETE_UNQUALIFIED`, unavailable identity authority, or undefined identity anchors do **not** license natural-distinctness rejection.

## D. Cost-bounded unresolved stop

```text
separator_kind = NONE
stop_kind = DORMANT
```

This is valid when a mandatory recursive pass has been performed but further work has low expected value relative to cost.

It means:

```text
no deeper correspondence established yet
no qualifying separator established
search intentionally stopped for now
```

It must not be paraphrased as `DISTINCT`, `no correspondence exists`, or `the residuals are naturally different`.

---

# 7. Minimal mechanically visible discharge record

DP 0.2's larger proposed discovery ledger is useful for research but too heavy as a universal normative burden.

DP 0.3 reduces the mandatory terminal record to the minimum needed for consistent agent behavior.

When a cross-residual gate is triggered and the branch reaches a stop/rejection decision, record:

```text
cross_residual_pass:
    triggered
    role_decomposition_or_breaker

separator_kind:
    STRUCTURAL_BREAKER | RIGID_AUTHORITY | NATURAL_IDENTITY | NONE

separator_evidence:
    concise witness/authority reference or NONE

nei_result_if_load_bearing:
    SAME | DISTINCT | UNKNOWN | NO_ADMISSIBLE_MODEL |
    INCOMPLETE_UNQUALIFIED | NOT_APPLICABLE

stop_kind:
    REJECTED | DORMANT | SUPPORTED_CANDIDATE | CONTINUE
```

Only `separator_kind = NATURAL_IDENTITY` makes `nei_result_if_load_bearing` an identity-proof obligation.

This record is discovery bookkeeping, not a new semantic substrate.

---

# 8. Legality checks for terminal decisions

A terminal decision is invalid if any of the following holds:

```text
cross-residual trigger occurred
AND no recursive role/factorization pass, structural breaker, or rigid authority was recorded
```

```text
separator_kind = NATURAL_IDENTITY
AND nei_result_if_load_bearing != DISTINCT
```

```text
separator_kind = NONE
AND stop_kind = REJECTED
```

```text
stop_kind = DORMANT
AND the output claims that natural distinctness or global non-correspondence was proved
```

These checks are deliberately narrow. They do not force exhaustive search or general-purpose NEI qualification.

---

# 9. Correct use of NEI under unresolved identity relevance

If the discovery process asks whether two same-role represented regions are naturally distinct but the packet provides no independently sufficient identity authority, the correct discovery-facing state is:

```text
natural SAME: not established
natural DISTINCT: not established
identity authority: incomplete/unqualified
```

Any application relation remains preserved exactly as represented.

The agent may then:

- continue decomposing structurally;
- find a structural breaker;
- find a rigid application/domain authority;
- resolve the NEI question with additional qualified identity authority;
- or stop `DORMANT` for cost.

It may not silently reinterpret unresolved identity significance as qualified natural distinctness.

---

# 10. Natural terminology remains non-load-bearing

DP must not treat the English word `natural` as a similarity or distinction heuristic.

The explanatory meaning supplied by NEI 0.2 is useful to human/agent interpretation but does not alter discovery evidence.

The discovery system operates on represented structure and pinned authority, not on intuitions about which categories feel natural.

---

# 11. Mathematical proof comparison specialization

For proof comparison, when a large residual remains between matched premise and conclusion regions, perform one role decomposition that distinguishes at least as applicable:

```text
premise/defect
encoder
boundary/side condition
invariant
obstruction
witness generation
refinement/approximation
witness decoding
contradiction/discharge
```

One proof step may correspond to a subgraph in the other.

A named lemma/theorem on one side may be a black box whose **role-level** correspondence is still discoverable even if its internal equivalence is not.

Do not align major steps solely by textual position near the conclusion.

If a proof source explicitly declares a relation among its steps/objects, preserve that relation according to its supplied semantics; do not assume either that it is merely representational or that it is an NEI identity relation.

---

# 12. Qualification targets for DP 0.3

Focused qualification should demonstrate at least that:

1. a cross-residual unmatched middle receives a real recursive role/factorization pass;
2. a concrete structural breaker can reject a candidate without a redundant NEI campaign;
3. an explicit rigid application/domain distinction can reject a candidate without being forced through NEI when the comparison authority makes it load-bearing;
4. representation/factorization/proof-method differences alone do not become natural separators by silent inference;
5. a qualified NEI `DISTINCT` can carry a natural-identity separator when independently supported;
6. missing/incomplete NEI authority prevents natural-distinctness rejection without implying `SAME`;
7. a cost-bounded `DORMANT` stop is legal without proving identity;
8. application-defined relations are preserved exactly while their NEI significance remains authority-dependent;
9. the known proof-pair regression recovers a sufficiently deep structural correspondence while preserving method-specific residuals and rejecting full-proof identity/isomorphism overclaims.

---

# 13. Working summary

```text
Evidence burden follows the conclusion.

Structural rejection -> structural breaker is enough.
Rigid application/domain rejection -> pinned rigid authority is enough.
Natural-distinctness rejection -> qualified NEI DISTINCT is required.
Cost stop -> no identity proof required, but result stays unresolved/DORMANT.

Application semantics are preserved exactly.
Do not presume they are either identity-relevant or identity-irrelevant.
Do not silently strengthen them into NEI meaning beyond the pinned authority.
```

The intended discovery discipline is therefore precise without flattening meaningful application semantics or turning every residual into a general identity campaign.
