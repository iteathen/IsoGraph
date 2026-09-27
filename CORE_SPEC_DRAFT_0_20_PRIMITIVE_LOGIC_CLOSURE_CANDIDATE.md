# IsoGraph Core Specification — Draft 0.20 Primitive-Logic Closure Candidate

**Status:** unqualified normative successor candidate  
**Base authority:** qualified Core 0.17 + qualified Core 0.18 + qualified Core 0.19  
**Short name:** Core 0.20 candidate  
**Purpose:** remove high-level semantic stopping points from exact native renderings and require authoritative semantic closure to primitive logic  
**Authority rule:** this file changes no qualified Core authority until independently qualified

Core 0.20 is a semantic tightening of Core 0.19 section 18.

The governing rule is:

```text
if a semantic object can be definitionally decomposed
into lower logical structure,
it is not an admissible authoritative leaf.
```

A complete native rendering must bottom out in primitive logical structure plus raw carrier/data atoms. Domain abstractions may exist only as derived, reversible views over that primitive kernel.

---

# 0. Interpretation barriers

Do not collapse:

```text
domain name
    != primitive semantic content

qualified construction
    != primitive leaf

source-defined object
    != irreducible object

useful abstraction
    != authoritative stopping point

cached theorem endpoint
    != primitive support

relation label
    != relation semantics

type/class label
    != membership semantics

algorithm
    != primitive execution relation

machine
    != primitive transition structure

polynomial
    != primitive arithmetic relation

probability object
    != primitive logical support

derived view
    != native kernel

discovery convenience
    != semantic authority

opaque source symbol
    != irreducible logic

model leaf
    != permission to stop decomposition

primitive carrier/data atom
    != primitive semantic operator
```

---

# 1. Primitive-logic closure requirement

For an exact rendering claim, every load-bearing semantic path MUST terminate only in:

1. qualified Core structural primitives;
2. primitive logical operations;
3. raw carrier/data atoms whose internal content is irrelevant to the represented claim;
4. primitive observation incidences whose full semantic contribution is exactly the represented incidence.

Everything else must be expanded.

No domain-specific concept may remain authoritative merely because it is familiar, formally named, source-defined, previously qualified, or inconvenient to expand.

## 1.1 Primitive logical operations

The primitive logical layer may use, when represented with exact scope/binding:

```text
identity / equality
negation
conjunction
disjunction
implication
biconditional / exact equivalence
universal quantification
existential quantification
variable binding / substitution
predicate or relation application
function application
ordered argument incidence
scope / boundary
truth / falsity
```

Where a Core surface already supplies one of these exactly, the surface is only syntax for the same primitive logical structure.

## 1.2 Nonlogical symbols

A nonlogical symbol is permitted only as:

```text
raw carrier identity
raw data value
primitive extensional relation instance
or a defined symbol with an explicit expansion.
```

A nonlogical symbol with hidden behavior is not a completed semantic leaf.

If a relation/function/class has rules, laws, membership conditions, transition behavior, arithmetic behavior, evaluation semantics, or closure conditions that matter to the claim, those conditions MUST be represented below the symbol.

---

# 2. Domain abstraction prohibition in the authoritative kernel

The authoritative primitive kernel MUST NOT terminate at domain abstractions such as:

```text
P
NP
SAT
NP-complete
polynomial time
reduction
algorithm
machine
circuit
proof system
energy
probability distribution
state
transition system
game value
strategy
derivative
integral
field
group
graph
database
worker
queue
cache
```

unless the occurrence is only a raw name for a carrier object and all load-bearing semantics are represented independently in primitive logic.

The list is illustrative.

The test is:

```text
does understanding this node require a domain definition
that has not been represented below it?
```

If yes, the rendering is incomplete.

---

# 3. No qualified-construction escape hatch

Core 0.19 permits closure at a pinned qualified semantic construction when its exact interface is represented.

Core 0.20 narrows this rule.

A qualified semantic construction may be referenced for:

- provenance;
- navigation;
- caching;
- proof reuse;
- discovery acceleration.

But if that construction is definitionally reducible and its internal semantics are load-bearing for the exact rendering, the authoritative support path MUST remain traceable through its primitive expansion.

Therefore:

```text
qualified theorem / module / construction
    may abbreviate primitive support

but
    may not replace primitive support
for a primitive-closure claim.
```

---

# 4. Raw carrier/data atoms

Primitive closure does not require an infinite regress into the physical implementation of symbols.

A raw carrier/data atom is allowed when:

- it contributes only identity/value;
- no omitted internal structure changes the represented claim;
- all behavior involving the atom is expressed by primitive logical relations.

Examples:

```text
one tape symbol identity
one machine-state identity
one Boolean value
one finite input-symbol identity
one exact literal
one graph vertex identity
```

The atom's behavior is not hidden inside the atom.

For example, a machine-state SI may be primitive data, but:

```text
"this state transitions to that state"
```

must be represented as logical relation structure.

---

# 5. Arithmetic and quantitative structure

Arithmetic is not automatically Core-primitive merely because exact literals exist.

If a claim depends on:

```text
addition
multiplication
exponentiation
order
length
cardinality
polynomial growth
asymptotic domination
probability arithmetic
```

their load-bearing semantics must be represented as lower relational/logical structure or routed through a primitive-rendered arithmetic theory.

A label such as:

```text
POLYNOMIAL
O(n^k)
size
length
```

cannot be a primitive leaf.

Exact literals may remain data values, but operations over them are semantic constructions and must be unfolded to the required primitive basis.

---

# 6. Computation and transition structure

A computation object MUST NOT stop at:

```text
computes
runs
halts
accepts
decides
polyTimeComputable
decInTime
machine execution
```

For primitive closure it must expose, as applicable:

```text
configuration carrier
initial-configuration relation
one-step transition relation
successor configuration incidence
finite trace / indexed occurrence relation
trace adjacency
accepting/final-state predicate
output relation
step count / bound relation
determinism or branching constraint
input encoding relation
```

Any of those that are themselves composite continue downward.

A named machine model may remain a derived view over this structure.

---

# 7. Derived abstraction layer

High-level abstractions are allowed and encouraged as **derived views**.

Examples:

```text
P
NP
SAT
Cook-Levin
natural proof
algebrization
HJP lower bound
worker queue
energy
Hamiltonian
```

A derived view MUST preserve an exact reverse map to the primitive kernel for every semantic claim it abbreviates.

Derived views may be used for:

- Discovery Protocol search;
- retrieval;
- human navigation;
- comparison;
- summarization;
- cached theorem endpoints;
- experimental factoring.

They MUST NOT become the sole support for:

- exact source-rendering qualification;
- exact implicit assertion support;
- structural identity claims whose evidence depends on hidden semantics;
- primitive-minimum claims.

---

# 8. Primitive closure ledger

Every exact rendering campaign SHOULD maintain a machine-checkable or auditable closure ledger.

For every named semantic node:

```text
NODE
definition source
primitive expansion root
unexpanded dependencies
closure status
reason any raw atom is irreducible
provenance
```

Allowed statuses include:

```text
CLOSED_PRIMITIVE
DERIVED_VIEW
QU_UNEXPANDED
RAW_DATA_ATOM
REJECTED_AS_LEAF
```

A rendering is primitive-complete only when no load-bearing node is `QU_UNEXPANDED` or `REJECTED_AS_LEAF`.

---

# 9. Primitive closure fixed point

Primitive rendering proceeds iteratively:

```text
R0 = source rendering

R1 = expand every definable semantic node

R2 = expand every definable node introduced by R1

...

Rn+1 = Rn
```

A no-change pass is sufficient only if every remaining semantic node is classified as:

```text
primitive logic
or
raw carrier/data atom.
```

Failure to locate a lower definition does not convert a node into a primitive.

It remains:

```text
QU_UNEXPANDED.
```

---

# 10. Source fidelity

Primitive closure does not authorize replacing source semantics with a convenient lower theory.

Every expansion must be source-faithful.

The required relation is:

```text
source semantic object
    <-> exact primitive expansion
```

under the frozen source interpretation.

A lower rendering that is merely extensionally plausible, conventional, or mathematically equivalent under unrepresented assumptions does not qualify.

---

# 11. Interaction with QU

If decomposition reaches an unresolved semantic dependency:

```text
do not stop and call it primitive.
```

Record:

```text
QU_UNEXPANDED
```

with the missing definition/authority/interface.

Unknown remains unknown.

Primitive closure is complete only after the QU is either:

- exactly expanded;
- proven irrelevant to the claim;
- or the enclosing exact-rendering claim is narrowed so that the dependency is outside scope.

---

# 12. Interaction with NEI

NEI may discover sameness among derived structures.

It MUST NOT use a shared high-level label as evidence of primitive sameness.

Primitive comparison should operate on the expanded support graph.

If two high-level domain objects reduce to the same primitive logic under the qualified comparison view, the sameness claim may be supported there.

---

# 13. Interaction with Discovery Protocol

Discovery Protocol may operate on both:

```text
primitive kernel
and
derived abstraction views.
```

Derived views are permitted because they may improve search.

But:

```text
DP discovery over abstraction
    must be projected back
to primitive support
before exact admission.
```

A lead that exists only because two high-level names or packaged constructions look alike is not an exact result.

---

# 14. Primitive-support firewall

For exact support:

```text
assertion
    -> support
    -> ...
    -> primitive logic / raw data
```

must be traversable without requiring English/domain gloss.

If deleting a derived abstraction node disconnects the assertion from primitive support, the rendering violates Core 0.20.

This gives a direct mechanical test:

> Remove every node classified `DERIVED_VIEW`. Exact claims must remain reconstructable from the primitive kernel.

---

# 15. Consequences for existing renderings

Core 0.20 does not retroactively rewrite prior qualified artifacts.

A prior rendering may remain:

```text
qualified under Core 0.19
```

while failing:

```text
primitive-complete under Core 0.20.
```

Successor modernization must preserve the old artifact and create a new rendering.

In particular, source-faithful 0.19 renderings that bottom out at qualified semantic constructions require deeper expansion before they can claim 0.20 primitive closure.

---

# 16. Qualification targets

Before promotion, test at least:

1. a familiar named predicate is rejected as a leaf when its definition is available;
2. a qualified theorem endpoint may be cached but cannot replace primitive support;
3. arithmetic labels are rejected until their required relational semantics are expanded;
4. a computation predicate is rejected until transition/trace semantics are exposed;
5. raw carrier identities are accepted when behavior is separately represented;
6. a domain label can be deleted while exact primitive reconstruction still succeeds;
7. DP may use the deleted abstraction view for search but exact verification still routes to primitive support;
8. QU remains QU when a lower definition is unavailable;
9. a sidecar cannot supply primitive meaning missing from native structure;
10. a high-level exact rendering from Core 0.19 is correctly classified as predecessor-valid but 0.20-incomplete;
11. primitive reconstruction round-trips to the frozen source meaning;
12. adversarial relabeling of every derived domain abstraction leaves primitive semantics unchanged.

---

# 17. Working constitutional summary

```text
IsoGraph authority lives at primitive logic.

Domain concepts are views, not foundations.

If a definition can be unfolded, unfold it.

If a theorem can be traced through lower support, preserve that lower support.

If a semantic operator has hidden behavior, it is not primitive.

If the lower meaning is unknown, mark QU; do not promote the name to a leaf.

Raw data may be atomic.
Behavior may not be hidden inside raw data.

Discovery may use abstractions.
Proof and exact reconstruction must survive their deletion.
```

Core 0.20 changes no current authority until independently qualified.
