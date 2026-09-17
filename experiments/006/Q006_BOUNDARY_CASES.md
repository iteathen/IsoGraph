# Experiment 006 — Boundary and Completeness Controls

These controls supplement `Q006_CASES.md` so the integrated packet covers the published minimum qualification targets without requiring additional external runs.

# Additional QU controls

## QU-09 — core independence

A valid IsoGraph Core artifact contains only fixed ordinary core structure. It declares no QU dependency and makes no unresolved-information claim.

Question: does attaching the existence of the QU specification globally reinterpret that artifact as a QU state?

Allowed answers:

```text
CORE_UNCHANGED_NO_QU_SEMANTICS
QU_IMPLICITLY_APPLIES
```

---

## QU-10 — alpha-renaming of open carriers

QU A uses local alpha-renamable open SIs `u17,u18`.
QU B has exactly the same fixed/open incidence, constraints, interfaces, domains, and closure authority, but a lawful namespace mapping renames them to `u92,u93`.

No rigid label or literal changes.

Allowed answers:

```text
SEMANTICS_PRESERVED_UNDER_ALPHA_RENAMING
SEMANTICS_CHANGED_BY_SI_SPELLING
```

---

## QU-11 — infinite intensional family

A qualified QU state declares:

```text
x is an integer
x > 0
```

The possibility universe, integer semantics, constraint authority, and closure scope are pinned. No realization enumeration is supplied.

Question: can the exact QU meaning be given intensionally without enumerating all positive integers?

Allowed answers:

```text
INTENSIONAL_FAMILY_ALLOWED
EXPLICIT_ENUMERATION_REQUIRED
```

---

## QU-12 — unrepresented fact outside authority

A QU state has a qualified possibility universe and closure authority over signature `S`. Relation `R` is not in `S` and no dependency says whether `R(a,b)` is permitted, forbidden, or meaningful.

Question: what follows from the absence of `R(a,b)` in the QU artifact?

Allowed answers:

```text
R_IS_FALSE
R_IS_ARBITRARILY_ADMISSIBLE
NO_SEMANTIC_STATUS_WITHOUT_AUTHORITY
```

---

## QU-13 — cross-realization correspondence

A downstream claim wants to compare represented subject `a` across every realization in `R(Q)`. Each realization happens to contain a local SI spelled `7`, but the realization namespaces are independent and no rigid-role, anchor, port, counterpart, or other mapping authority is supplied.

Allowed answers:

```text
SAME_SI_SPELLING_IS_SUFFICIENT
EXPLICIT_CORRESPONDENCE_REQUIRED
```

# Additional NEI controls

## NEI-09 — core-only artifact does not acquire NEI

A core-only artifact contains SI referents `a` and `b` but declares no NEI profile/authority and no bridge to one.

Asked for their natural identity classification, what is the qualified NEI result?

---

## NEI-10 — unresolved identity-relevant structure without QU

A pinned identity profile states that unresolved relation `R(a,b)` can change whether `a` and `b` satisfy the profile's natural-identity law. The artifact supplies no QU state or exact bridge representing the remaining alternatives.

Classify the attempted NEI claim.

---

## NEI-11 — required QU authority unavailable

An NEI claim explicitly depends on pinned QU revision `Q17`, but that revision/authority cannot be resolved. The identity result depends on the unresolved structure that Q17 was supposed to govern.

Classify the attempted NEI claim.

---

## NEI-12 — administrative SI alpha-renaming

A qualified determinate NEI claim establishes `SAME(a,b)` from natural/profile evidence. A lawful core alpha-renaming changes only the local SI spellings of `a` and `b`; all represented natural structure, evidence, and profile authority are preserved through the namespace mapping.

Classify the renamed claim.

---

## NEI-13 — inconsistent pairwise projection

Under one identical pinned authority/evidence context, a proposed result set contains:

```text
SAME(a,b)
SAME(b,c)
DISTINCT(a,c)
```

No joint admissible equivalence-model witness can realize all three simultaneously.

Classify this proposed result set for qualification purposes.

---

## NEI-14 — incomplete search is not semantic UNKNOWN

A valid QU-mediated NEI problem has a nonempty admissible model family. A search verifies one model in which `a` and `b` are SAME, then exhausts its resource budget. It has neither proved that all models are SAME nor found/established a DISTINCT model.

Classify the current NEI result.

---

## NEI-15 — circular QU restriction for identity

The original qualified QU admits both SAME and DISTINCT NEI models for `a,b`. To prove desired result SAME, an analyst constructs Q' by deleting every realization/model that separates `a,b`, with no independent authority for that restriction, and then cites Q' as the identity evidence.

Classify the attempted SAME claim.

---

## NEI-16 — explicit temporal identity-separating law

Temporal manifestations `m1,m2` are connected by an event `E`. The pinned identity profile contains an explicit qualified law stating that event type `E`, under the satisfied side conditions, terminates the prior natural identity and separates the post-event manifestation from the pre-event one. No unresolved alternative changes that result.

Classify `m1,m2`.

---

## NEI-17 — missing cross-realization query anchors

A QU-mediated NEI claim ranges over several admissible realizations. The query names SI referents `a,b` from the source artifact, but the realizations provide no lawful correspondence/anchor determining which realization-local carriers instantiate those query roles. The profile gives no fallback existence/identity semantics.

Classify the attempted NEI claim.
