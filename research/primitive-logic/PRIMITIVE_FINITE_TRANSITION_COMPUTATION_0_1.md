# Primitive finite transition computation 0.1

**Status:** unqualified primitive-logic supporting theory  
**Purpose:** represent deterministic and nondeterministic finite-control tape computation without `machine`, `run`, `accept`, `decide`, or complexity-class primitives

This theory uses only the primitive logical roles from `PRIMITIVE_LOGIC_KERNEL_0_1` plus the primitive natural/list theories.

The names in this Markdown file are explanatory only. The native `.isg` uses anonymous numeric SIs for all nonlogical data.

## 1. Raw data carriers

Required raw finite data:

```text
two input bit values
one blank value
two movement values
a finite list of raw control-state identities
three distinguished state identities:
    start
    positive halt
    negative halt
```

All are data.

No behavior is hidden in these atoms.

## 2. Finite state and symbol membership

A finite carrier is represented by an explicit primitive list.

Membership is the recursively defined list-membership relation from the finite-data theory.

Thus:

```text
state(q)
```

is only:

```text
MEMBER(q,stateList).
```

and tape-symbol membership is only membership in the explicitly represented symbol list.

## 3. Configuration data

A configuration object is constructor data with fields:

```text
control-state
left list
current symbol
right list
```

The left list is nearest-cell-first.

The right list is nearest-cell-first.

Lists contain raw tape-symbol identities.

No transition meaning is stored in the configuration object.

## 4. Raw transition table

The transition table is a raw five-place relation:

```text
D(q,read,q',write,move).
```

Its tuples are its entire behavior.

The relation is constrained so that:

- every tuple uses listed states/symbols/movement values;
- positive/negative halt states have no outgoing tuples;
- every nonhalting state and readable symbol has at least one outgoing tuple.

For the deterministic case, add uniqueness:

```text
D(q,a,q1,b1,m1)
AND
D(q,a,q2,b2,m2)
->
q1=q2 AND b1=b2 AND m1=m2.
```

The nondeterministic case omits this uniqueness clause.

## 5. Initial configuration

For a finite input bit list `x`:

### empty input

```text
x = NIL
```

gives:

```text
state = start
left = NIL
current = blank
right = NIL.
```

### nonempty input

```text
x = CONS(h,t)
```

gives:

```text
state = start
left = NIL
current = h
right = t.
```

No named `INIT` predicate is primitive; this is an OR of the two constructor cases.

## 6. One transition

Suppose current configuration fields are:

```text
(q,left,read,right)
```

and one raw transition tuple is:

```text
D(q,read,q',write,move).
```

### move right

New left is:

```text
CONS(write,left).
```

If `right = NIL`:

```text
newCurrent = blank
newRight = NIL.
```

If `right = CONS(h,t)`:

```text
newCurrent = h
newRight = t.
```

New control state is `q'`.

### move left

New right is:

```text
CONS(write,right).
```

If `left = NIL`:

```text
newCurrent = blank
newLeft = NIL.
```

If `left = CONS(h,t)`:

```text
newCurrent = h
newLeft = t.
```

New control state is `q'`.

The one-step relation is exactly the OR of these four constructor cases.

## 7. Exactly n transitions

For raw one-step relation `R`:

```text
R^0(c,c')
IFF
c=c'.

R^(S(n))(c,c')
IFF
exists m:
    R(c,m)
    AND R^n(m,c').
```

This is the same primitive repeated-composition pattern already used for the L-calculus.

## 8. Halting polarity

A configuration is terminal positive iff its state field equals the distinguished positive-halt state.

It is terminal negative iff its state field equals the distinguished negative-halt state.

The two distinguished states are unequal.

No `ACCEPT` predicate is primitive.

## 9. Polynomial bound

A bound is a raw total function graph from naturals to naturals.

Its growth condition is expanded directly:

```text
exists exponent,constant,threshold:
    forall n>=threshold:
        bound(n) <= constant * n^exponent.
```

The arithmetic relations are those recursively expanded by `PRIMITIVE_NATURAL_ARITHMETIC_0_2`.

## 10. Deterministic polynomial decision condition

For raw unary predicate `L` on finite bit lists, a deterministic witness consists of:

- finite state-list data;
- distinguished states;
- raw transition-table relation satisfying deterministic uniqueness;
- polynomial bound graph.

For every input list `x`:

1. compute its primitive list length `n`;
2. obtain the bound `b`;
3. form its primitive initial configuration `c0`;
4. there exists `i <= b` and a terminal configuration `h` with exactly `i` transitions from `c0`;
5. `L(x)` iff the terminal state's identity is the positive-halt identity.

Because the transition table is deterministic and halt states have no outgoing transition, this gives one bounded terminating computation for every input.

## 11. Nondeterministic polynomial condition

Use the same data without transition uniqueness.

For every input `x` and bound `b`:

### positive truth condition

```text
L(x)
IFF
exists i<=b, h:
    c0 ->^i h
    AND state(h)=positive-halt.
```

### all-branch time bound

No nonterminal configuration can occur after `b` transitions from `c0`:

```text
forall c:
    c0 ->^b c
    ->
    state(c)=positive-halt
    OR state(c)=negative-halt.
```

Since every nonhalting state/symbol has at least one outgoing transition, any branch surviving for `b` transitions would produce a nonterminal configuration and violate this condition.

Thus every branch terminates within the polynomial bound.

## 12. No abstraction status

The following explanatory names are **not native semantic leaves**:

```text
machine
configuration
transition
run
deterministic
nondeterministic
accept
reject
polynomial time
```

The native file consists only of:

- logical role labels `^150xxx`;
- raw carrier/data identities;
- bound variables;
- anonymous raw relation identities;
- constructor/field incidences.
