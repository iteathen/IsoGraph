# Primitive relational function schema 0.1

**Status:** unqualified primitive-logic supporting theory

An arbitrary predicate/function is treated as **raw extensional relation data**. Its extension is its entire behavior; no domain semantics are hidden in its name.

## Carrier membership

A carrier object `A` is represented extensionally as a unary predicate.

```text
IN_A(x)
```

is primitive predicate application:

```text
APPLY_PREDICATE(A,x).
```

## Total unary function graph

`TOTAL_FUNCTION(F,A,B)` abbreviates only the logical formula:

```text
forall x:
    A(x)
    ->
    exists y:
        B(y)
        AND F(x,y)
        AND
        forall y':
            F(x,y')
            -> y' = y.
```

It is a reusable logical template, not a semantic primitive.

## Binary predicate graph

A binary predicate `R` contributes only raw truth incidences:

```text
R(x,y).
```

No named semantics are imported.

## Pair carrier

For carrier predicates `A`,`B`, a product carrier consists of raw objects `p` satisfying:

```text
TAG(p,PAIR)
AND
exists a,b:
    A(a)
    AND B(b)
    AND FIELD(p,FIRST,a)
    AND FIELD(p,SECOND,b).
```

Uniqueness of FIRST/SECOND fields is represented separately.

## Encoding graph

An encoding is not primitive.

For carrier `A`, term carrier `TERM`, and graph `E`:

```text
ENCODING_GRAPH(E,A)
```

expands to:

```text
TOTAL_FUNCTION(E,A,TERM)

AND

forall x,t:
    A(x)
    AND E(x,t)
      ->
    PROC(t).
```

No injectivity is imported unless separately required.

This matches the pinned source `encodable` role relevant to P/NP: an encoding function whose output is a procedure.

## First-order time computation

For raw function graph `F : A -> B`, encoding graphs `EA`,`EB`, and time graph `T : NAT -> NAT`, define the source-style first-order computation condition by pure logic:

```text
TOTAL_FUNCTION(F,A,B)
AND
TOTAL_FUNCTION(T,NAT,NAT)
AND
exists program p:
    TERM(p)
    AND PROC(p)
    AND
    forall x,xt,y,yt,n,bound,call:
        A(x)
        AND EA(x,xt)
        AND F(x,y)
        AND EB(y,yt)
        AND SIZE(xt,n)
        AND T(n,bound)
        AND APP_TERM(call,p,xt)
          ->
        RED_LE(bound,call,yt).
```

`APP_TERM` is constructor structure:

```text
TAG(call,APP)
AND FIELD(call,LEFT,p)
AND FIELD(call,RIGHT,xt).
```

This is the first-order specialization of the source `computesTime` structure used by decision functions and many-one reduction functions.

No `COMPUTES`, `RUNS`, or `ALGORITHM` predicate is primitive.
