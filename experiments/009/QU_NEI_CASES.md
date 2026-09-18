# Experiment 009 — QU / NEI Qualification Cases

These cases are the complete public semantic corpus for the cold run. Treat each case independently unless it explicitly references another case.

Do not infer hidden facts. Use only the stated authority and the supplied IsoGraph specifications.

## C01 — Core isolation

Artifact:

```text
scope S:
    represented referents: 1, 2
    relation occurrence: (^100 1 2)
    no open carrier
    no unresolved relation
    no identity query
```

Question: Does correct interpretation of this artifact require QU or NEI semantics?

## C02 — Relational unknown structure

Compare three unresolved artifacts under the same declared domain `D`.

```text
Q_shared:
    A.x -> u
    B.x -> u

Q_distinct_equal:
    A.x -> u1
    B.x -> u2
    constraint: value(u1) = value(u2)
    u1 and u2 are distinct represented referents

Q_opaque:
    A.x -> UNKNOWN
    B.x -> UNKNOWN
    no represented relation between the two UNKNOWN markers
```

Question: Are these three interchangeable as information-preserving QU representations? State which structural distinctions must survive.

## C03 — Alpha-renamed unknowns

```text
Q_A:
    open referents: u7, u8
    R(u7,u8)
    constraint P(u7)
    boundary fixed.a -> u7

Q_B:
    open referents: z99, z42
    R(z99,z42)
    constraint P(z99)
    boundary fixed.a -> z99
```

The local SI spellings are declared alpha-renamable and no external rigid role refers to the literal spellings.

Question: May these open regions qualify as a QUI under a view that includes exactly the shown structure?

## C04 — Intensional realization family

```text
Q:
    open integer n
    constraint n >= 0
    open sequence s indexed by all natural numbers
    constraint s(0)=n
    constraint s(k+1)=s(k)+2 for every natural k
```

The possibility authority denotes all structures satisfying those constraints. The implementation has enumerated only `n=0,1,2`.

Question: Is the QU realization family limited to those enumerated samples? Must qualification eagerly enumerate the full family?

## C05 — Closure and excluded realization

Same authority as C04, plus constraint `n != 4`.

An implementation has not yet propagated that disequality into its cached candidate list and still contains a candidate realization with `n=4`.

Question: Is `n=4` admissible merely because the implementation has not derived/removal-propagated the exclusion?

## C06 — QU state taxonomy: open

```text
Q:
    possibility universe value(u) in {0,1}
    no further constraint
    declared scope complete for this query
```

Question: classify the QU state.

## C07 — QU state taxonomy: determinate

```text
Q:
    possibility universe value(u) in {0,1}
    constraint value(u)=1
    declared scope complete for this query
```

Question: classify the QU state.

## C08 — QU state taxonomy: inconsistent

```text
Q:
    possibility universe value(u) in {0,1}
    constraint value(u)=0
    constraint value(u)=1
    declared scope complete for this query
```

Question: classify the QU state.

## C09 — QU state taxonomy: incomplete scope

```text
Q:
    current local record says value(u) in {0,1}
    source authority explicitly states another required constraint exists outside the provided scope
    that constraint has not been represented
```

Question: classify the QU state. Do not treat the missing constraint as arbitrary freedom.

## C10 — Semantic unresolved versus incomplete computation

Two records concern proposition `P`.

```text
Q_semantic:
    exact admissible family contains at least one realization satisfying P
    exact admissible family contains at least one realization satisfying not-P
    coverage of the family is qualified

Q_search:
    the semantic realization family has not been established
    a bounded solver stopped before deciding whether P is forced
```

Question: distinguish the semantic state of `Q_semantic` from the computational status of `Q_search`.

## C11 — Refinement versus revision

Start with:

```text
Q0:
    authority A
    value(u) in {0,1,2}
```

Update X keeps authority A and adds qualified observation `u != 2`.

Update Y replaces authority A with incompatible authority B under which the original domain rule is not accepted and declares `value(u) in {red,blue}`.

Question: classify X and Y as refinement or revision.

## C12 — QUI and information scalar

```text
Q_A:
    open a,b
    relation R(a,b)
    each value in {0,1}

Q_B:
    open x,y
    relation R(x,y)
    each value in {0,1}

Q_C:
    open p,q
    no relation between p,q
    each value in {0,1}
```

An information profile assigns the same scalar value `2 bits` to all three.

Question: under an alpha-renaming structural view, which pair may qualify as QUI? Does equal information scalar establish QUI?

## C13 — QUI overclaim guard

Assume a verified QUI maps open region `Q_A` to open region `Q_B`. Their actual later resolutions are:

```text
Q_A resolves to (0,1)
Q_B resolves to (1,0)
```

No identity profile connects the represented subjects.

Question: what, if anything, does the prior QUI establish about equality of the actual resolutions or NEI SAME?

## C14 — Determinate NEI without QU

Profile `P_same` contains qualified law/evidence stating that records `r1` and `r2` are two administrative views of the same persistent subject, and all required identity conditions are determinate.

Profile `P_distinct` contains qualified law/evidence stating that subjects `s1` and `s2` are identity-separating distinct physical specimens, and all required identity conditions are determinate.

There is no unresolved identity-relevant possibility in either query.

Question: classify the two NEI queries and state whether an artificial zero-uncertainty QU artifact is required.

## C15 — QU-mediated NEI model families

Four independently pinned QU/NEI queries have exact admissible model-family coverage:

```text
M_same:
    every admissible NEI model merges a and b

M_distinct:
    every admissible NEI model separates c and d

M_mixed:
    at least one admissible model merges e and f
    at least one admissible model separates e and f

M_empty:
    no admissible model exists because inherited constraints are inconsistent
```

Question: classify each query.

## C16 — Representation is not identity authority

Three comparisons:

```text
A:
    different SIs and different factorization methods
    no qualified identity-separating law

B:
    same-looking serialization and same method
    no qualified identity-preserving law

C:
    application relation tagged "different_batch"
    profile explicitly declares different_batch identity-separating for this product domain

D:
    application relation tagged "equivalent_record"
    profile explicitly declares equivalent_record identity-preserving for this registry domain
```

Question: what NEI conclusions are justified for A-D?

## C17 — Unresolved identity relevance and cross-realization anchor

A QU describes two possible realizations of an open record. A downstream NEI query asks whether open role `subject_slot` corresponds to fixed referent `k` across realizations.

The packet provides no qualified cross-realization anchor/correspondence rule for `subject_slot`, and the application relation connecting the records has no declared identity significance.

Question: may the system choose whichever correspondence yields SAME or DISTINCT? What is the qualification state?

## C18 — Anti-circularity

A desired downstream theorem would become a clean isomorphism only if two open carriers are forced equal. The currently qualified source evidence permits both equal and unequal realizations.

A proposed proof does:

```text
desired isomorphism
    -> restrict QU to equal-carrier realizations
    -> use restricted QU to derive NEI SAME
    -> use NEI SAME as premise for the desired isomorphism
```

No independent authority supplies the restriction or identity conclusion.

Question: is this admissible qualification evidence? State the correct treatment of the original uncertainty.
