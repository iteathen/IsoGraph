# Experiment 013 — Focused QU / NEI Qualification Holdout

This is a fresh focused holdout for qualification obligations whose Experiment 009 automatic score was affected by ambiguous output-contract fields, plus the one substantive identity-authority boundary exposed there.

## F01 — Relational unknown state is not interchangeable

Three representations share one declared value domain:

```text
Shared:
    left.weight  -> w
    right.weight -> w

SplitEqual:
    left.weight  -> x
    right.weight -> y
    x and y are distinct represented referents
    constraint value(x) = value(y)

Opaque:
    left.weight  -> UNKNOWN
    right.weight -> UNKNOWN
    no represented relationship between the markers
```

Determine whether `Shared` is information-state equivalent to `SplitEqual` or `Opaque`.

## F02 — Qualified exclusion dominates stale computation

```text
Q:
    value(m) in {2,4,6}
    qualified constraint m != 4
    declared scope complete
```

A stale implementation cache still contains a candidate with `m=4`.

Determine whether 4 is semantically admissible, whether the QU is still open, and whether the stale cache controls semantic admissibility.

## F03 — Semantic unresolvedness versus incomplete computation

```text
Exact:
    exact qualified realization family contains
        at least one realization satisfying phi
        at least one realization satisfying not-phi

Search:
    exact realization family has not been established
    bounded computation stopped before deciding phi
```

Classify each state.

## F04 — Refinement versus authority revision

Start:

```text
Q0:
    authority A
    token(t) in {a,b,c}
```

Update X retains authority A and adds qualified constraint `t != c`.

Update Y replaces authority A with incompatible authority B and declares `color(t) in {red,blue}`.

Classify X and Y.

## F05 — QUI and scalar non-equivalence

```text
QX:
    open p,q
    T(p,q)
    each carrier domain {0,1}

QY:
    open r,s
    T(r,s)
    each carrier domain {0,1}

QZ:
    open u,v
    no T relation
    each carrier domain {0,1}
```

A profile assigns all three the same information scalar.

Under an alpha-renaming structural view, classify QX/QY and QX/QZ, and determine whether the equal scalar establishes QUI.

## F06 — QUI does not answer an unsupported identity query

A verified QUI maps the open topology of two unrelated source regions.

Later resolutions differ:

```text
left resolves to (0,1)
right resolves to (1,0)
```

A natural-identity query is explicitly posed between the represented subjects, but **no NEI identity profile/law, cross-domain identity evidence, or qualified identity bridge is supplied**.

Determine what the QUI establishes about actual-resolution equality and NEI SAME, and classify the posed NEI query.

## F07 — Missing cross-realization anchor

A pinned QU has several realizations. A natural-identity query explicitly asks whether open role `subject_slot` corresponds to fixed referent `k` across those realizations.

No qualified query anchor/correspondence rule is supplied. The application relation linking the records has no declared identity significance.

Determine whether the system may choose an anchor to force SAME/DISTINCT and classify the NEI query.

## F08 — Circular identity premise with no identity authority

A pinned QU permits both:

```text
carrier a and carrier b have equal application values
carrier a and carrier b have unequal application values
```

No qualified NEI profile/law states that application-value equality means natural SAME or that inequality means natural DISTINCT.

A natural-identity query between a and b is explicitly posed.

A proposed downstream proof does:

```text
desired isomorphism
    -> restrict QU to equal-value realizations
    -> assert NEI SAME
    -> use NEI SAME to prove desired isomorphism
```

Determine whether the proof is admissible, what happens to the original QU, whether semantic NEI UNKNOWN has been established, and what identity status is justified.
