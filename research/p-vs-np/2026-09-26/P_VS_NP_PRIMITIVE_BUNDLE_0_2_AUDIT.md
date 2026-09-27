# P versus NP primitive bundle 0.2 — closure audit

**Status:** unqualified primitive-closure candidate  
**Native artifact:** `P_VS_NP_PRIMITIVE_BUNDLE_0_2.isg`  
**Core profile:** `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md`

## 1. Mechanical closure

Creation-time mechanical audit:

```text
free bound variables:          0
undeclared raw identities:     0
parenthesis residual:          0
scope-bracket residual:        0
negative delimiter depth:      none
derived-view metadata:         removed
high-level domain stable IDs:  none
```

The only native semantic operator labels are primitive logical/structural roles:

```text
AND
OR
NOT
IMPLIES
IFF
FORALL
EXISTS
EQUAL
APPLY
PREDICATE_APPLICATION
RAW_CARRIER
RAW_VALUE
CONSTRUCTOR_TAG
FIELD
RAW_EXTENSION_TUPLE
```

The native file contains no semantic relation label for:

```text
P
NP
SAT
NP-hard
NP-complete
algorithm
machine
decider
circuit
natural proof
algebrization
```

## 2. Nonlogical identities

Every nonlogical numeric identity is one of:

1. a declared raw carrier;
2. a declared raw data value;
3. a declared constructor tag;
4. a declared field identity;
5. a declared raw extensional relation identity.

A raw relation identity carries no behavior in its name.

Its behavior is exactly the logical clauses in which it occurs.

The authoritative bundle contains no `DERIVED_VIEW_OF` edge.

## 3. Primitive arithmetic support

Natural-number behavior is represented from:

```text
zero
successor tag
predecessor field
constructor disjointness
successor injectivity
induction schema
```

Addition, multiplication, exponentiation, and order are anonymous raw relation identities constrained by recursive logical clauses.

No arithmetic word is a native semantic primitive.

The truth formula uses only the required quantitative relations.

## 4. Primitive finite-data support

Finite lists are represented by:

```text
NIL
CONS
HEAD
TAIL
constructor disjointness
field uniqueness
recursive membership
recursive length
existence of a natural length for every list object.
```

No opaque container API is load-bearing.

## 5. Primitive computation support

The computation layer contains only anonymous raw data and relation identities constrained by logic.

Its structure expands to:

```text
finite control-list data
finite symbol-list data
configuration constructor fields
raw transition tuples
one-transition logical cases
exact-n repeated relation composition
terminal-state equality
primitive list/natural support.
```

There is no native `machine`, `run`, `accept`, `reject`, or `computation` semantic leaf.

## 6. Primitive truth formula

The final top formula is one universal implication over a raw unary relation identity `L`.

Antecedent:

```text
there exists a finite, polynomially bounded,
branching transition realization whose positive terminal reachability
is exactly L on finite bit lists
and whose every branch terminates within the bound.
```

Consequent:

```text
there exists another realization of exactly the same L
with the same bounded-total requirements
plus functional uniqueness of each transition choice.
```

The explanatory quotient:

```text
branching polynomial realization = NP-style witness
functional polynomial realization = P-style witness
```

is not native support.

## 7. Deterministic-subcase direction

The functional witness satisfies all branching-witness clauses plus one uniqueness condition.

Deleting that uniqueness condition leaves a branching witness.

Thus the already-established inclusion direction is structural in the primitive representation.

The unresolved direction is exactly the top implication.

## 8. Early-halting audit

Terminal positive and terminal negative control identities have no outgoing transition tuple.

The bound condition says that every configuration reachable in exactly the bound number of transitions is terminal.

If any branch survived longer than the bound, its prefix at the bound would be nonterminal because a terminal state cannot continue.

Therefore the condition correctly excludes branches longer than the bound while allowing branches that halt earlier.

## 9. Polynomial-bound audit

The bound graph is required to be:

- total;
- functional;
- eventually bounded by `c * n^k`.

All arithmetic in that statement routes to the primitive natural-number relations in the same bundle.

No Big-O or `polynomial` label is part of the truth support.

## 10. High-level predecessor status

The following remain useful but are no longer candidates for authoritative primitive support under Core 0.20:

```text
P_VS_NP_UNIFIED_*
P_VS_NP_FOUNDATION_*
P_VS_NP_RESOLUTION_ROUTES_*
P_VS_NP_BARRIERS_*
SAT/Cook-Levin views
AC0/HJP/control views
```

They are:

```text
DERIVED / DISCOVERY / NAVIGATION VIEWS.
```

They may guide DP.

Any exact discovery found there must project back to the primitive bundle before admission.

## 11. Remaining external closure boundary

One significant boundary remains:

```text
the chosen finite-control, single-tape primitive realization
<-> the exact official P-vs-NP computational convention.
```

Polynomial robustness of standard machine models is established mathematics, but this equivalence has not yet been rendered down to primitive logic in this branch.

Therefore the current status is:

```text
primitive closure of the chosen computation model:
    PASS at research-audit level

official-model equivalence:
    QU / not yet primitive-rendered

Core 0.20 qualification:
    NOT YET RUN

official P-vs-NP truth:
    OPEN
```

The remaining model-equivalence obligation is not permission to restore a high-level leaf. It stays explicit until rendered.
