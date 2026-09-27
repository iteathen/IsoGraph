# P versus NP implicit-assertion pass A22 — monotone-state simulation laws

**Status:** admitted exact implicit assertions, round 22  
**Premise state:** A0 + corrected A1 + A2-A21

---

## IA-316 — monotone residual order is a sound local simulation

### Premises

At each witness depth there is an exact preorder:

```text
p <=S q
```

on residual states satisfying:

### Acceptance monotonicity

```text
p <=S q
AND
CURRENT(p)=TRUE
    ->
CURRENT(q)=TRUE.
```

### Labeled transition monotonicity

For every next witness symbol `a`:

```text
p <=S q
AND
NEXT(p,a)=p'
    ->
exists q':
    NEXT(q,a)=q'
    AND
    p' <=S q'.
```

### Body

```text
p <=S q
    ->
p <=F q.
```

### Support

The order relation itself satisfies the local simulation obligations of `IA-306`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-317 — componentwise monotone state order is one sufficient realization of IA-316

### Premises

Residual state has exact finite tuple form:

```text
S=(s1,...,sd).
```

Each coordinate has an exact preorder `<=i`.

Define:

```text
S <=coord T
IFF
for every i:
    si <=i ti.
```

Assume:

- acceptance is upward-closed under `<=coord`;
- each labeled successor is monotone under `<=coord` whenever defined.

### Body

```text
<=coord
```

is a sound continuation-dominance relation.

### Support

`IA-316`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-318 — monotone-state antichain propagation preserves existential truth

### Premises

Use any state preorder satisfying `IA-316`.

At one layer, retain only preorder-maximal reachable states.

### Body

Every omitted state is continuation-dominated by a retained state.

Thus retaining maximal states preserves the exact union of accepting continuation languages.

### Support

- `IA-316`;
- finite maximal-cover theorem `IA-207/208`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-319 — polynomial monotone antichain width plus polynomial order/transition operations gives polynomial decision

### Premises

For every input/layer:

1. preorder-maximal reachable states number at most polynomially many;
2. order comparison is polynomial;
3. labeled successor construction is polynomial;
4. maximal-antichain pruning is polynomial;
5. witness horizon is polynomial.

### Body

The bounded existential projection is functionally polynomial.

### Support

`IA-318` + `IA-255/260`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-320 — fixed-dimensional polynomial coordinate ranges imply polynomial raw state count

### Premises

Residual state has fixed dimension `d` independent of input length.

For each coordinate `i`, the number of reachable exact coordinate values is bounded by polynomial `q_i(n)`.

### Body

The total number of reachable tuple states is bounded by:

```text
PRODUCT_{i=1..d} q_i(n),
```

which is polynomial because `d` is fixed.

### Consequence

Any exact residual propagation over those explicit states is polynomial provided transitions/state generation are polynomial.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-321 — fixed dimension is load-bearing in IA-320

### Body

If the number of coordinates grows with input length, polynomial range per coordinate does not imply polynomial tuple-state count.

### Exact witness

Binary coordinates:

```text
2 values each
```

with `d=n` give:

```text
2^n
```

possible tuples.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-322 — polynomial antichain width can be much smaller than polynomial raw-state count requirement

### Body

A state space may contain exponentially many reachable states but only polynomially many maximal states under a sound monotone simulation order.

In that case `IA-319` can still apply while `IA-320` does not.

### Exact witness family shape

A long inclusion chain has:

```text
many distinct states
maximal antichain width = 1.
```

### Disposition

ADMITTED EXACT.

---

## IA-323 — closure operator with upward simulation can canonicalize dominated states

### Premises

There is polynomial-time operator:

```text
CL(p)
```

satisfying:

1. inflationary:

```text
p <=S CL(p);
```

2. idempotent:

```text
CL(CL(p)) = CL(p);
```

3. transition compatibility sufficient for `<=S` to satisfy `IA-316`.

### Body

`CL(p)` continuation-dominates `p`.

Replacing `p` by `CL(p)` preserves existential acceptance when used under the dominance-cover contract.

### Support

`IA-316`, `IA-204`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-324 — polynomial reachable closure range yields a polynomial canonical dominance cover

### Premises

In `IA-323`, the reachable image:

```text
{CL(p)}
```

has polynomially many exact values and can be enumerated/maintained polynomially.

### Body

The existential projection is functionally polynomial.

### Support

The closure image is a polynomial dominance cover.

Apply `IA-255/260`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-325 — witness-bit monotonicity is a degenerate one-state canonical dominance law

### Premise

Verifier is upward-monotone in all witness bits as in `IA-117`.

### Body

The all-ones witness dominates every witness for acceptance.

Thus:

```text
TOP
```

is a singleton canonical cover of the witness domain.

### Support

`IA-117` interpreted through verifier inclusion/dominance.

### Disposition

ADMITTED EXACT.

---

## IA-326 — transition monotonicity is necessary for this order-based simulation proof

### Body

Acceptance monotonicity of states alone does not make `<=S` a valid continuation-dominance relation.

### Counterexample shape

Take:

```text
p <=S q
```

with both currently rejecting.

For one symbol `a`:

```text
p·a -> accepting child
q·a -> rejecting child.
```

Then future continuation `a` distinguishes them and:

```text
NOT (p <=F q).
```

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-327 — order failure under one label is an exact falsifier of the proposed simulation law

### Body

If a proposed preorder has:

```text
p <=S q
NEXT(p,a)=p'
```

but either:

- `NEXT(q,a)` is invalid; or
- every `q'` successor fails `p' <=S q'`;

then that preorder fails the local simulation obligation at `(p,q,a)`.

### Support

Definition of `IA-316`.

### Scope

This falsifies the proposed order proof, not necessarily true continuation dominance by some other theorem.

### Disposition

ADMITTED EXACT.

---

# A22 central result

A concrete non-circular equality-side mechanism is now explicit:

```text
cheap monotone state order
    ->
local simulation
    ->
sound dominance
    ->
small maximal antichain
    ->
polynomial propagation.
```

This mechanism requires neither:

- exact Q-RESIDUAL identity; nor
- exact continuation-dominance completeness.

It only needs a sound locally checkable order with polynomial frontier behavior.

That makes monotone/simulation structure a high-value positive-control target.

# P-vs-NP status

OPEN.
