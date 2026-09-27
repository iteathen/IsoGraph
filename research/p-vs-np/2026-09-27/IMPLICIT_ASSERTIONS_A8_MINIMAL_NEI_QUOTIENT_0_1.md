# P versus NP implicit-assertion pass A8 — minimal exact residual quotient

**Status:** admitted exact implicit assertions, round 8  
**Premise state:** A0 + corrected A1 + A2-A7  
**Support mode:** EXACT throughout unless conditional

This round distinguishes:

```text
minimum semantic quotient width
    !=
minimum computation cost
    !=
global natural identity.
```

---

## IA-101 — reachable residual-prefix domain at a fixed depth is finite

### Scope

One fixed input `x`, verifier, witness alphabet, and witness depth `t`.

### Body

The set of reachable witness prefixes of exactly depth `t` is finite.

### Support

- witness alphabet is fixed finite;
- a depth-`t` prefix is a finite constructor list of exactly `t` symbols;
- finite products/list recursion preserve finiteness.

### Primitive interpretation

A complete enumeration can be generated recursively from:

```text
depth 0:
    {NIL}

depth S(t):
    prepend every alphabet member
    to every depth-t prefix.
```

### Disposition

ADMITTED EXACT.

---

## IA-102 — exact Q-RESIDUAL quotient has finitely many classes at every fixed depth

### Body

At one fixed depth, exact NEI SAME partitions the finite reachable prefix domain into finitely many equivalence classes.

### Support

- `IA-039` SAME is an equivalence relation in one query family;
- `IA-101` finite carrier.

### Disposition

ADMITTED EXACT.

---

## IA-103 — future-acceptance NEI equivalence is the coarsest exact acceptance-preserving equivalence

### Define

Let `~F` be exact `Q-RESIDUAL` SAME:

```text
p ~F q
IFF
for every admissible remaining suffix s:
    C_p(s) IFF C_q(s).
```

Let `E` be any other equivalence relation on the same fixed-depth residual carrier satisfying:

```text
p E q
    ->
for every admissible suffix s:
    C_p(s) IFF C_q(s).
```

### Body

```text
p E q
    ->
p ~F q.
```

So:

```text
E is a refinement of ~F.
```

### Support

Immediate from the definition/characterization `IA-068`.

### Meaning

Any exact quotient that preserves **all** future acceptance observations can split an NEI class further, but it cannot lawfully merge two different NEI future classes.

### Disposition

ADMITTED EXACT.

---

## IA-104 — every exact future-acceptance quotient refines the NEI residual quotient

### Body

Any quotient used as an exact replacement state for all future witness continuations must refine `~F`.

### Support

A sound exact quotient must satisfy the acceptance-preservation premise of `IA-103`.

### Disposition

ADMITTED EXACT.

---

## IA-105 — class-count semantics are represented by a complete representative list

### Purpose

Avoid importing an opaque cardinality primitive.

### Definition

For a finite equivalence relation at one depth, a **complete representative list** `R` satisfies:

1. every reachable residual is SAME to at least one member of `R`;
2. no two distinct members of `R` are SAME;
3. all members of `R` are reachable residuals.

Its class count is:

```text
LENGTH(R).
```

### Body

Any two complete representative lists for the same exact equivalence have equal primitive-natural length.

### Support

- equivalence classes;
- finite carrier;
- one-to-one matching between representatives induced by equivalence;
- list-length functionality.

### Disposition

ADMITTED EXACT.

---

## IA-106 — NEI residual class count is minimum among exact future-preserving quotient counts

### Body

Let:

```text
R_NEI
```

be any complete representative list for `~F`.

Let:

```text
R_E
```

represent any other exact future-acceptance-preserving quotient `E`.

Then:

```text
LENGTH(R_NEI) <= LENGTH(R_E).
```

### Support

`IA-103` says `E` refines `~F`.

Every `~F` class must contain at least one `E` class.

A complete representative list for the finer partition therefore needs at least one representative for every coarser NEI class.

### Candidate space

All equivalence quotients on the fixed reachable residual carrier that preserve every admissible future acceptance observation.

### Minimum claim scope

This is a true minimum **inside that declared quotient candidate space**.

It is not a minimum algorithm, proof, memory representation, or global identity theory.

### Disposition

ADMITTED EXACT MINIMUM CLAIM.

---

## IA-107 — merging two NEI-DISTINCT residual classes is unsound for exact future acceptance

### Body

If:

```text
p and q are Q-RESIDUAL DISTINCT,
```

then any quotient identifying them fails the exact future-acceptance contract.

### Support

`IA-073` supplies a distinguishing suffix `s`.

The merged state would have to give one future result for both, but:

```text
C_p(s) != C_q(s).
```

### Disposition

ADMITTED EXACT.

---

## IA-108 — splitting one NEI-SAME residual class is semantically redundant for the future-acceptance objective

### Body

If two residuals are exact Q-RESIDUAL SAME, keeping them in separate quotient states contributes no additional future-acceptance distinction.

### Support

`IA-068`.

### DP classification

For the objective:

```text
preserve exact future acceptance for every suffix,
```

the extra split is:

```text
NONESSENTIAL_FOR_SEMANTIC_SUFFICIENCY.
```

### Firewall

A finer split may still have engineering value:

- easier identity computation;
- simpler transitions;
- provenance;
- certificates;
- memory layout.

No valuation conclusion follows.

### Disposition

ADMITTED EXACT objective-scoped.

---

## IA-109 — W_NEI is the minimum exact semantic width of fixed-depth future-preserving quotients

### Definition

`W_NEI(x,t)` is the primitive-natural length of a complete representative list of `~F` at depth `t`.

### Body

For the declared candidate space from `IA-106`:

```text
W_NEI(x,t)
```

is the minimum possible number of exact quotient states at that depth.

### Support

`IA-105` + `IA-106`.

### Identity firewall

This is scoped quotient width, not a count of globally identical objects.

### Disposition

ADMITTED EXACT.

---

## IA-110 — superpolynomial minimum residual width blocks polynomial-width exact layer quotients

### Premise

For one verifier/input family, exact proof establishes that:

```text
max_t W_NEI(x,t)
```

cannot be bounded by any polynomial in input length.

### Body

No exact future-acceptance-preserving layer quotient for that same verifier family can have polynomial width at every layer.

### Support

Every exact quotient refines the NEI quotient (`IA-104`), so its width is at least `W_NEI`.

### Scope firewall

This rules out one **quotient-propagation architecture**.

It does not prove the represented language outside deterministic polynomial time.

A different deterministic algorithm need not materialize or traverse this residual quotient.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-111 — polynomial minimum residual width does not by itself give a polynomial algorithm

### Body

Even if:

```text
W_NEI(x,t) <= polynomial(|x|)
```

for every depth, deterministic polynomial decision does not follow unless the needed classes can be accessed/identified/propagated efficiently.

### Support

`IA-080..083`.

Universal efficient identity is itself equivalent in strength to the unresolved existential-closure principle.

### Disposition

ADMITTED EXACT NON-IMPLICATION.

---

## IA-112 — quotient width and quotient accessibility are independent support obligations

### Body

The NEI residual route has at least two logically distinct burdens:

```text
WIDTH:
    how many exact future identities exist?

ACCESS:
    can exact class identity / representatives / transitions
    be computed within the required resource bound?
```

Neither one discharges the other.

### Support

- semantic width minimum: `IA-109`;
- identity-computation burden: `IA-080..083`.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-113 — exact representation renaming preserves W_NEI

### Premise

Apply an exact bijective renaming of:

- transition codes;
- internal state/symbol identities;

with all external input/terminal anchors and transition incidence transported exactly.

### Body

The future-continuation truth relation is unchanged up to exact transporter.

Therefore the NEI residual partition and its complete representative-list length are unchanged.

### Support

- `IA-098`;
- `IA-099`;
- `IA-068`.

### Disposition

ADMITTED EXACT.

---

## IA-114 — W_NEI is representation-invariant under exact internal isomorphism but scope-dependent

### Body

`W_NEI` ignores purely representational alpha-renaming admitted by `IA-113`.

However it can change when the identity query changes:

- remaining witness bound;
- observable;
- input anchor;
- verifier semantics;
- QU state.

### Support

NEI query context is part of identity semantics.

### Disposition

ADMITTED EXACT.

---

## IA-115 — minimum semantic quotient does not imply preferred implementation quotient

### Body

Even though `~F` is the coarsest/minimum-width exact future quotient, an implementation may rationally use a finer quotient if valuation favors:

- cheaper identity;
- cheaper successor construction;
- locality;
- incremental updates;
- simpler proof certificates.

### Support

- `IA-108`;
- DP 0.8 sufficiency-versus-valuation separation.

### Semantic status

This assertion is exact about the absence of a semantic implication:

```text
minimum width
    !=
minimum implementation cost.
```

### Disposition

ADMITTED EXACT.

---

# A8 central result

The NEI future quotient now has a precise mathematical role:

```text
it is the coarsest exact future-acceptance congruence
and therefore the minimum-width exact quotient
for that fixed scope.
```

This separates three questions cleanly:

```text
SEMANTIC WIDTH:
    W_NEI

IDENTITY ACCESS COST:
    cost to determine/canonicalize SAME classes

IMPLEMENTATION VALUATION:
    whether using the coarsest quotient is actually desirable.
```

Only the first is settled by NEI semantics alone.

# P-vs-NP status

Unchanged.

No superpolynomial W_NEI lower bound and no universal polynomial-access theorem is established.
