# Primitive Logic Kernel 0.1 — Core 0.20 supporting candidate

**Status:** unqualified supporting candidate  
**Parent:** `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md`  
**Purpose:** define the only semantic operator classes permitted at the bottom of a Core-0.20 primitive-closure rendering

This kernel is deliberately domain-neutral.

## K0 — carrier/data

Allowed nonlogical atoms:

```text
opaque carrier identity
exact literal/value
finite occurrence identity
raw extensional tuple/fact identity
```

An atom contributes no hidden behavior.

## K1 — identity

Primitive:

```text
same represented referent
exact value equality
```

No domain equality stronger than the represented equality is imported.

## K2 — binding

Primitive:

```text
variable occurrence
binder ownership
scope
capture-safe substitution
```

## K3 — quantification

Primitive:

```text
forall x in declared carrier/domain: A(x)

exists x in declared carrier/domain: A(x)
```

The domain/carrier itself must be represented, not inferred from prose.

## K4 — propositional composition

Primitive logical composition:

```text
AND(A,B,...)
OR(A,B,...)
NOT(A)
IMPLIES(A,B)
IFF(A,B)
TRUE
FALSE
```

Arity and occurrence multiplicity are explicit.

## K5 — application / ordered incidence

Primitive structural application:

```text
APPLY(f, a1, ..., an, result)
PREDICATE(R, a1, ..., an)
```

This is only ordered incidence/application.

It does not supply hidden semantics for `f` or `R`.

If `f` or `R` is definable, its definition must be expanded.

## K6 — construction / case split

A finite constructor/case distinction may be represented from:

```text
carrier identity
constructor tag/value
ordered fields
equality
AND/OR/NOT
```

No constructor name carries behavior beyond its represented incidence.

## K7 — recursion / induction authority

Recursion and induction are **not primitive logical leaves**.

A recursive definition must expose:

```text
base clause
successor/constructor clause
well-founded or inductive carrier authority
```

An induction theorem is a derived support object.

## K8 — arithmetic exclusion

The following are not kernel primitives:

```text
<=
+
*
power
length
cardinality
Big-O
polynomial
```

They require a primitive-rendered arithmetic/data theory.

## K9 — computation exclusion

The following are not kernel primitives:

```text
step
run
eval
halt
accept
decide
compute
time bound
```

They require primitive clauses over configuration/data carriers.

A one-step relation may become a raw extensional relation only when its full extension or rule set is itself represented as primitive logic.

## K10 — class/set exclusion

The following are not kernel primitives:

```text
P
NP
P/poly
language class
NP-hard
NP-complete
SAT
```

They are predicates/constructions whose truth conditions must be expanded.

## Native role IDs for experimental .isg renderings

The following stable labels are reserved on the primitive-logic research branch only:

| ID | Role |
|---|---|
| `^150000` | KERNEL_OBJECT |
| `^150001` | AND |
| `^150002` | OR |
| `^150003` | NOT |
| `^150004` | IMPLIES |
| `^150005` | IFF |
| `^150006` | FORALL |
| `^150007` | EXISTS |
| `^150008` | EQUAL |
| `^150009` | APPLY |
| `^150010` | PREDICATE_APPLICATION |
| `^150011` | BINDER_OWNS |
| `^150012` | DOMAIN_OF_BINDER |
| `^150013` | RAW_CARRIER |
| `^150014` | RAW_VALUE |
| `^150015` | CONSTRUCTOR_TAG |
| `^150016` | FIELD |
| `^150017` | TRUE |
| `^150018` | FALSE |
| `^150019` | DEFINITION_EXPANDS_TO |
| `^150020` | DERIVED_VIEW_OF |
| `^150021` | QU_UNEXPANDED |
| `^150022` | SOURCE_PROVENANCE |
| `^150023` | PRIMITIVE_SUPPORT |
| `^150024` | RAW_EXTENSION_TUPLE |

These IDs name **logical/structural roles only**. They do not introduce domain semantics.

## Closure test

A graph satisfies this kernel only if deleting every domain-specific derived label still leaves enough native structure to reconstruct the claimed semantics.

Any surviving semantic operator outside K0–K6 is either:

```text
expanded
or
QU_UNEXPANDED.
```
