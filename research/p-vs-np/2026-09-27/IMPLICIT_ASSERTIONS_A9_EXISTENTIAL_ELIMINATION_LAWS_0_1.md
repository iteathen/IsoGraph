# P versus NP implicit-assertion pass A9 — generic bounded-existential elimination laws

**Status:** admitted exact conditional assertions, round 9  
**Premise state:** A0 + corrected A1 + A2-A8  
**Purpose:** expose exact primitive structures that are sufficient to eliminate a bounded existential projection on restricted verifier families

None of these premises is assumed to hold universally.

---

## IA-116 — dominating canonical witness eliminates existential search

### Premises

For verifier `V(x,w)` with bounded witness domain `W_x`, there is a functionally polynomial construction:

```text
C(x)
```

producing one admissible witness such that:

```text
for every w in W_x:
    V(x,w)
      ->
    V(x,C(x)).
```

### Body

```text
exists w in W_x: V(x,w)
IFF
V(x,C(x)).
```

### Support

- reverse direction is trivial because `C(x)` is an admissible witness;
- forward direction is the domination premise.

Since `C` and `V` are functionally polynomial, the projection is functionally polynomial by composition.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-117 — monotone Boolean witness verifier collapses to the maximal witness

### Premises

Witnesses have fixed polynomial length `m(x)` over bits ordered:

```text
0 <= 1.
```

Verifier is monotone in witness coordinates:

```text
w <=coord w'
AND V(x,w)
    ->
V(x,w').
```

### Body

Let:

```text
TOP(x) = 1^{m(x)}.
```

Then:

```text
exists w: V(x,w)
IFF
V(x,TOP(x)).
```

### Support

Every admissible bit witness is coordinatewise <= TOP.

This is `IA-116` with the maximal witness as canonical dominator.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-118 — antitone Boolean witness verifier collapses to the minimal witness

### Premise

```text
w <=coord w'
AND V(x,w')
    ->
V(x,w).
```

### Body

With:

```text
BOTTOM(x)=0^{m(x)},
```

we have:

```text
exists w: V(x,w)
IFF
V(x,BOTTOM(x)).
```

### Support

Every admissible witness is >= BOTTOM.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-119 — polynomial-image canonicalization eliminates exponential raw witness multiplicity

### Premises

There is a functionally polynomial canonicalization:

```text
K(x,w)
```

such that:

1. `K(x,w)` is an admissible witness/summary;
2. acceptance is preserved:

```text
V(x,w) IFF V(x,K(x,w));
```

3. for every input, the image set:

```text
Image_K(x)
```

has polynomially many distinct exact values;
4. those image values can be deterministically enumerated in polynomial total time.

### Body

The existential projection of `V` is functionally polynomial.

### Witness

It is sufficient to test one copy of each canonical image.

Use `IA-037`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-120 — exact symmetry quotient is one instance of polynomial-image canonicalization

### Premises

A represented finite/group-like family of exact witness transformations preserves verifier truth:

```text
V(x,w) IFF V(x,g(w)).
```

There is a polynomial-time canonical representative for each orbit/equivalence class, and polynomially many reachable canonical classes.

### Body

The projection is functionally polynomial.

### Support

The orbit canonicalizer satisfies `IA-119`.

### Identity firewall

Structural symmetry supplies a quotient only under exact transformation/evidence authority.

It is not automatic NEI SAME outside the declared verifier-acceptance scope.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-121 — existential projection distributes over independent conjunction

### Premises

Witness splits into independent components:

```text
w = PAIR(u,v)
```

and:

```text
V(x,u,v)
IFF
A(x,u) AND B(x,v),
```

with no cross-component side condition.

### Body

```text
exists u,v:
    A(x,u) AND B(x,v)

IFF

(exists u: A(x,u))
AND
(exists v: B(x,v)).
```

### Support

Pure first-order logic.

### Consequence

If both component projections are functionally polynomial, the combined projection is functionally polynomial by `IA-087`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-122 — finite independent witness-block conjunction factorizes componentwise

### Premise

For fixed finite `k`:

```text
V(x,w1,...,wk)
IFF
AND_i A_i(x,wi)
```

with independent bounded witness domains.

### Body

```text
exists w1...wk V
IFF
AND_i exists wi A_i.
```

### Support

Repeated `IA-121`.

### Complexity

A fixed finite conjunction of polynomial component decisions is polynomial.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-123 — existential projection distributes over disjunction

### Body

For one shared bounded witness domain:

```text
exists w:
    A(x,w) OR B(x,w)

IFF

(exists w: A(x,w))
OR
(exists w: B(x,w)).
```

### Support

First-order logic.

### Complexity consequence

If the two projected relations are functionally polynomial, so is the union by `IA-088`.

### Disposition

ADMITTED EXACT.

---

## IA-124 — exact functional witness-component dependency permits dimension reduction

### Premises

Witness is represented as `(u,v)` and there is a functionally polynomial function:

```text
v = F(x,u)
```

such that every accepting witness must satisfy that exact functional relation.

### Body

```text
exists u,v:
    V(x,u,v)

IFF
exists u:
    V(x,u,F(x,u)).
```

provided nonconforming `(u,v)` pairs cannot be accepting.

### Support

Existential substitution through exact functionality.

### Consequence

One witness component is nonessential as an independent existential degree of freedom.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-125 — polynomial-range sufficient statistic eliminates raw witness identity

### Premises

There exists functionally polynomial:

```text
S(x,w)
```

and functionally polynomial predicate:

```text
R(x,s)
```

such that:

```text
V(x,w)
IFF
R(x,S(x,w)).
```

Further:

- the reachable range of `S` on admissible witnesses has polynomially many exact values;
- all reachable values can be enumerated in polynomial total time.

### Body

The bounded existential projection is functionally polynomial.

### Witness

Enumerate reachable summaries and test `R`.

### Relation to identity

All witnesses with the same exact summary are substitutable for the verifier output.

This may supply scoped identity evidence, but global witness identity is not implied.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-126 — idempotent canonical aggregation is a sufficient-statistic special case

### Premises

Witness contributions combine through an exactly represented aggregation:

```text
S(w1...wm)
```

with:

- polynomial-time update;
- polynomially bounded reachable aggregate range;
- verifier acceptance depending only on the aggregate;
- duplicate/idempotent or commutative structure as applicable under exact authority.

### Body

Projection can be propagated over aggregate states in polynomial time.

### Support

`IA-125` / `IA-072` depending on representation.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-127 — exact local decomposition can reduce existential projection to smaller projections

### Premise schema

Witness variables partition into blocks:

```text
W1...Wr
```

and the verifier's represented constraint structure decomposes so that, after conditioning on an exact separator `S`, block obligations are independent.

### Body

For every fixed separator realization:

```text
existence of a global witness
```

factors into conjunction of the block-local existential projections plus separator compatibility.

### Support

Repeated first-order existential distribution after the exact conditional independence/factorization premise is represented.

### Complexity firewall

This is not yet a polynomial-time conclusion.

Polynomial decision additionally requires:

- polynomially many separator states;
- polynomial component algorithms;
- efficient combination.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-128 — polynomial separator state plus exact factorization gives polynomial dynamic programming

### Premises

In `IA-127`:

- the separator has polynomially many exact states;
- separator state/transition/compatibility is functionally polynomial;
- each local projected component is functionally polynomial;
- decomposition depth/number of stages is polynomial.

### Body

The global existential projection is functionally polynomial.

### Support

Dynamic propagation over the separator states plus `IA-093`.

### Relation to NEI

The separator state may be finer than the minimum NEI residual quotient.

A later NEI pass may collapse additional separator states if exact future behavior is identical.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-129 — a complete exact invariant with polynomial range supplies a residual quotient

### Premises

There is a functionally polynomial invariant:

```text
I(x,prefix)
```

such that for same-depth residuals:

```text
I(x,p)=I(x,q)
IFF
NEI_Q-RESIDUAL(p,q)=SAME.
```

and the invariant has polynomially many reachable values.

### Body

The bounded existential projection is functionally polynomial.

### Support

The invariant is a polynomial-time canonical identifier satisfying `IA-072`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-130 — sound but incomplete invariants may safely split, not merge

### Premise

Invariant `J` satisfies only:

```text
J(p)=J(q)
    ->
Q-RESIDUAL SAME.
```

but not the converse.

### Body

Using `J` as a quotient is semantically sound.

It may keep some NEI-SAME residuals separate.

### Consequence

Its width may exceed `W_NEI`, but no false merge occurs.

### Support

`IA-108`.

### Disposition

ADMITTED EXACT.

---

## IA-131 — collision-prone invariant cannot justify exact merging without a separate proof

### Premise

Invariant `H` is not known to satisfy:

```text
H(p)=H(q)
    ->
Q-RESIDUAL SAME.
```

### Body

Hash/fingerprint equality alone is insufficient exact support for merging residuals.

### Support

- NEI 0.4 structural correspondence is evidence, not identity;
- `IA-041` one possible distinguishing suffix would invalidate the merge.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

---

# A9 central search laws

The implicit layer now exposes several exact ways bounded existential projection can collapse:

```text
canonical dominating witness
monotone top/bottom witness
polynomial-image canonicalization
exact symmetry quotient
independent component factorization
functional witness-component elimination
polynomial-range sufficient statistic
bounded separator dynamic programming
complete polynomial-range residual invariant.
```

These are **conditional theorems**, not claims that SAT or every NP verifier has the required structure.

They now provide a disciplined target list for DP rather than an unconstrained hunt for “a trick.”

# Important non-admission

The campaign does NOT admit:

```text
unique witness
    -> polynomial decision
```

from uniqueness alone.

No represented theorem currently justifies that implication.

Failure to admit it is not a proof of mathematical non-implication; it remains outside the supported closure.
