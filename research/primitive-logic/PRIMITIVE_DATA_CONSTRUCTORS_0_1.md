# Primitive finite-data constructors 0.1

**Status:** unqualified primitive-logic supporting theory  
**Purpose:** supply list, pair and Boolean structure without opaque container predicates

## Boolean carrier

Raw values:

```text
FALSE
TRUE
```

A Boolean object is exactly one of those values.

Boolean equality is ordinary equality.

Boolean NOT/AND/OR are finite extensional truth tables, represented as raw extension tuples.

## Pair construction

A pair object has:

```text
TAG = PAIR
FIELD FIRST = a
FIELD SECOND = b.
```

Pair equality follows from ordinary object equality plus unique fields.

Projection is not primitive; `FIRST_OF(pair,a)` and `SECOND_OF(pair,b)` are field incidences.

## List construction

A list object is exactly one of:

```text
NIL

CONS(head,tail).
```

The constructor cases are disjoint and fields are functional.

## Membership

`MEMBER(x,l)`:

```text
MEMBER(x,NIL) = FALSE.

MEMBER(x,CONS(h,t))
IFF
x = h
OR MEMBER(x,t).
```

## Length

`LENGTH(l,n)`:

```text
LENGTH(NIL,ZERO).

LENGTH(CONS(h,t),n)
IFF
exists m:
    LENGTH(t,m)
    AND SUCC_OF(n,m).
```

## Existential fold

For Boolean-valued predicate `P`:

```text
EXISTS_TRUE(P,NIL) = FALSE.

EXISTS_TRUE(P,CONS(h,t))
IFF
P(h)=TRUE
OR EXISTS_TRUE(P,t)=TRUE.
```

## Universal fold

```text
ALL_TRUE(P,NIL) = TRUE.

ALL_TRUE(P,CONS(h,t))
IFF
P(h)=TRUE
AND ALL_TRUE(P,t)=TRUE.
```

These folds are derived views. Their primitive support is the recursion clauses.

## Map/fold exclusion

Generic `map`, `fold`, `forallb`, `existsb`, list concatenation and list indexing are not primitive operations. Any occurrence on the P-vs-NP truth path must be reduced to constructor clauses or eliminated through an exact logical equivalence.
