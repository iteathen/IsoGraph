# P versus NP implicit-assertion pass A10 — sufficient statistics and quantifier safeguards

**Status:** admitted exact implicit assertions, round 10  
**Premise state:** A0 + corrected A1 + A2-A9

---

## IA-132 — every exact future-sufficient statistic induces a sound refinement of Q-RESIDUAL

### Premises

For same-depth residual prefix `p`, let:

```text
S(x,p)
```

be an exact statistic.

Assume there exists exact consumer `G` such that for every admissible remaining suffix `s`:

```text
C_p(s)
=
G(x, S(x,p), s).
```

### Body

If:

```text
S(x,p)=S(x,q),
```

then:

```text
p and q are Q-RESIDUAL SAME.
```

### Support

Equal statistic values feed the same exact `G` for every suffix, hence continuation relations are equal.

Use `IA-068`.

### Disposition

ADMITTED EXACT.

---

## IA-133 — every exact future-sufficient statistic partition refines the NEI residual quotient

### Body

The equivalence:

```text
p ~S q
IFF
S(x,p)=S(x,q)
```

is a refinement of exact future-acceptance NEI identity.

### Support

`IA-132`.

### Disposition

ADMITTED EXACT.

---

## IA-134 — an exact sufficient statistic needs at least W_NEI reachable values

### Scope

One fixed input/depth.

### Body

For any statistic satisfying `IA-132`, the number of distinct reachable statistic values is at least:

```text
W_NEI(x,t).
```

### Native class-count interpretation

Use complete representative lists and primitive list length as in `IA-105`.

### Support

Statistic partition refines NEI quotient (`IA-133`) and `IA-106` minimum class-count theorem.

### Disposition

ADMITTED EXACT.

---

## IA-135 — a complete residual invariant achieves the NEI minimum exactly

### Premise

Statistic `I` satisfies:

```text
I(x,p)=I(x,q)
IFF
Q-RESIDUAL SAME(p,q).
```

### Body

Its distinct reachable values are in one-to-one correspondence with NEI residual classes.

Therefore its representative-list length equals:

```text
W_NEI(x,t).
```

### Support

`IA-105`.

### Disposition

ADMITTED EXACT.

---

## IA-136 — polynomial-range exact sufficient statistic implies polynomial W_NEI

### Body

If an exact future-sufficient statistic has polynomially many reachable values, then:

```text
W_NEI
```

is polynomially bounded.

### Support

`IA-134`.

### Converse firewall

Polynomial `W_NEI` does not supply an efficiently computable sufficient statistic (`IA-111`).

### Disposition

ADMITTED EXACT.

---

## IA-137 — polynomial-time complete residual invariant implies deterministic polynomial decision

### Premises

Complete invariant `I` from `IA-135` is:

- functionally polynomial;
- polynomial-range over reachable residuals;
- successor invariant values can be constructed/canonicalized polynomially.

### Body

The bounded existential projection is functionally polynomial.

### Support

`IA-129` / sharpened `IA-072`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-138 — any exact DP state can be semantically NEI-minimized

### Premise

A dynamic program carries state `S` that is sufficient to determine every future acceptance observation.

### Body

There exists a semantic projection from reachable `S` states to Q-RESIDUAL NEI classes.

Merging only states mapped to the same exact NEI class preserves the future-acceptance objective.

### Support

`IA-132` + `IA-108`.

### Engineering firewall

Computing the semantic merge may be harder than using the original DP state.

### Disposition

ADMITTED EXACT.

---

## IA-139 — collision-free-for-acceptance is the exact condition a statistic needs for safe merging

### Body

For a proposed statistic `H`, equality is safe for exact residual merging iff:

```text
H(p)=H(q)
    ->
for every admissible suffix s:
    C_p(s) IFF C_q(s).
```

### Support

This is exactly `IA-132` specialized to a statistic used as quotient identity.

### Consequence

A hash collision with different continuation behavior is an exact falsifier.

### Disposition

ADMITTED EXACT.

---

## IA-140 — NEI minimum width is a semantic lower bound on sufficient-statistic range, not on arbitrary algorithms

### Body

`W_NEI` lower-bounds the number of distinct states/values of any exact representation whose state alone determines every future suffix-acceptance result.

It does not lower-bound:

- arbitrary program descriptions;
- running time of a different non-residual algorithm;
- proof length;
- circuit size;

without an additional exact bridge.

### Support

`IA-134` + scope of candidate space in `IA-106`.

### Disposition

ADMITTED EXACT.

---

# Quantifier algebra safeguards

## IA-141 — bounded universal projection distributes over conjunction

### Body

For one common bounded witness domain:

```text
forall w:
    A(x,w) AND B(x,w)

IFF

(forall w: A(x,w))
AND
(forall w: B(x,w)).
```

### Support

First-order logic.

### Disposition

ADMITTED EXACT.

---

## IA-142 — existential projection does not generally distribute over shared-witness conjunction

### Invalid candidate rule

```text
exists w:
    A(w) AND B(w)

?=

(exists w:A(w))
AND
(exists w:B(w)).
```

### Exact countermodel

Witness domain:

```text
{0,1}.
```

Let:

```text
A(w) IFF w=0
B(w) IFF w=1.
```

Then:

```text
exists A = TRUE
exists B = TRUE
exists (A AND B) = FALSE.
```

### Body

The proposed equivalence is invalid without the independence/factorization premise of `IA-121`.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-143 — universal projection does not generally distribute over disjunction

### Invalid candidate rule

```text
forall w:
    A(w) OR B(w)

?=

(forall w:A(w))
OR
(forall w:B(w)).
```

### Countermodel

Same domain/predicates as `IA-142`.

Every witness satisfies `A OR B`, but neither predicate holds universally.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-144 — one uniform existential witness implies pointwise existential witnesses

### Body

```text
exists u:
    forall v:
        R(u,v)

->
forall v:
    exists u:
        R(u,v).
```

### Support

First-order logic.

### Disposition

ADMITTED EXACT.

---

## IA-145 — pointwise existential witnesses do not generally yield one uniform witness

### Invalid converse

```text
forall v:
    exists u:
        R(u,v)

?->
exists u:
    forall v:
        R(u,v).
```

### Countermodel

Domain `{0,1}` and:

```text
R(u,v) IFF u=v.
```

Every `v` has a matching `u`, but no one `u` equals both values.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-146 — quantifier order is load-bearing unless an exact commutation condition is represented

### Body

A transformation swapping:

```text
EXISTS u
FORALL v
```

with:

```text
FORALL v
EXISTS u
```

is not semantically valid by default.

### Support

`IA-144` gives only one direction; `IA-145` falsifies the converse.

### Disposition

ADMITTED EXACT.

---

## IA-147 — exact common witness identity can restore the stronger quantifier form

### Premises

For every `v` there exists a witness `u_v` satisfying:

```text
R(u_v,v).
```

A qualified cross-`v` identity query establishes exact global SAME for every selected witness:

```text
u_v SAME u_v'
```

under an identity theory in which SAME means one actual witness object, with complete anchor/QU authority.

### Body

There exists one witness `u*` such that:

```text
forall v:
    R(u*,v).
```

### Witness

Choose any represented `u_v`.

Exact global SAME identifies every other selected witness with the same object.

Equality substitution preserves each `R` assertion.

### Identity firewall

Scoped behavioral SAME insufficient for this conclusion.

The NEI result must be global witness-object identity under the relation's argument semantics.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-148 — natural identity uniqueness does not by itself construct the unique object

### Body

An exact NEI theorem that all admissible successful witnesses are globally SAME supplies an identity fact.

It does not, by NEI semantics alone, supply:

- a polynomial constructor;
- a polynomial search procedure;
- a canonical encoding.

### Support

NEI separates identity truth from computation/evidence-acquisition procedure.

### Complexity firewall

No claim is made that unique-witness search is mathematically outside P.

The exact assertion is only:

```text
identity uniqueness
    != computational construction support.
```

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

# A10 central lessons

For existential elimination:

```text
sufficient statistic
    ->
exact quotient refinement
    ->
range >= W_NEI.
```

For quantifier manipulation:

```text
distribution/commutation
must be supported by exact independence,
factorization, or common-witness structure.
```

These safeguards are now explicit so DP cannot manufacture a false collapse by silently changing witness dependence.

# P-vs-NP status

Unchanged.
