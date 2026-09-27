# Primitive L-calculus execution theory 0.1

**Status:** unqualified primitive-logic supporting theory  
**Primary structural source:** `uds-psl/coq-library-undecidability`, branch `coq-8.16`, `theories/L/L.v` and `theories/L/Util/L_facts.v`  
**Time-semantics cross-check:** `uds-psl/certifying-extraction-with-time-bounds@248fb52fd0a9d38532727ea95256fec07eafa372`

## Raw term data

A term is constructor data with exactly one of:

```text
VAR(index)
APP(left,right)
LAM(body).
```

The constructor names carry no evaluation behavior.

## Substitution

`SUBST(s,k,u,out)` is defined recursively.

### Variable

```text
VAR(s,n)
AND n = k
    -> out = u.

VAR(s,n)
AND n != k
    -> out = VAR(n).
```

### Application

```text
APP(s,a,b)
AND SUBST(a,k,u,a')
AND SUBST(b,k,u,b')
    -> out = APP(a',b').
```

### Abstraction

```text
LAM(s,b)
AND SUCC(k,k')
AND SUBST(b,k',u,b')
    -> out = LAM(b').
```

## Closed term

Source definition:

```text
CLOSED(s)
IFF
forall n,u:
    SUBST(s,n,u,s).
```

## Lambda and procedure

```text
LAMBDA(s)
IFF
exists b:
    s = LAM(b).

PROC(s)
IFF
CLOSED(s)
AND LAMBDA(s).
```

## One-step call-by-value reduction

`STEP(s,t)` is exactly the disjunction of three source clauses.

### Beta/value step

```text
s = APP(LAM(body), LAM(arg))
AND
SUBST(body,ZERO,LAM(arg),t).
```

### Right context

```text
s = APP(left,right)
AND
STEP(right,right')
AND
t = APP(left,right').
```

### Left context

```text
s = APP(left,right)
AND
STEP(left,left')
AND
t = APP(left',right).
```

No other one-step reductions are admitted.

## Exact n-step reduction

For relation `R`, source `pow R n` is repeated relational composition:

```text
POWREL(R,ZERO,x,y)
IFF
x = y.

POWREL(R,S(n),x,z)
IFF
exists y:
    R(x,y)
    AND POWREL(R,n,y,z).
```

`STEP_N(n,s,t)` is `POWREL(STEP,n,s,t)`.

## Reduction within a bound

Source `redLe`:

```text
RED_LE(bound,s,t)
IFF
exists i:
    LE(i,bound)
    AND STEP_N(i,s,t).
```

## Big-step evaluation

The source also supplies big-step `eval`.

Its two clauses are:

```text
EVAL(LAM(body),LAM(body))

EVAL(APP(s,t),v)
IFF
exists body,t':
    EVAL(s,LAM(body))
    AND EVAL(t,t')
    AND SUBST(body,ZERO,t',body')
    AND EVAL(body',v).
```

The primitive time semantics used for extracted functions ultimately routes through `RED_LE`, not an opaque "runs in time" label.

## Term size

Source size:

```text
SIZE(VAR(n)) = 1+n

SIZE(APP(s,t)) = 1 + SIZE(s) + SIZE(t)

SIZE(LAM(s)) = 1 + SIZE(s).
```

These equations are represented through the primitive natural arithmetic theory.

## Time-computation specialization used by P-vs-NP

For first-order `f : X -> Y`, the source `computesTime` specializes to:

```text
exists program p:
    PROC(p)
    AND
    forall x,xEnc:
        ENC_X(x,xEnc)
        ->
        exists yTerm:
            RED_LE(T(SIZE(xEnc)), APP(p,xEnc), yTerm)
            AND ENC_Y(f(x),yTerm).
```

`computableTime(f,T)` additionally witnesses such a program.

This specialization is the only part required by the P/NP definitions for decision functions and reduction functions; higher-order extraction structure is a derived generalization.

## Remaining primitive gap

`ENC_X` and `ENC_Y` are not primitive labels.

Every carrier encoding used by the P-vs-NP truth path must itself be recursively rendered.

Until that is done:

```text
encoding closure = QU_UNEXPANDED.
```
