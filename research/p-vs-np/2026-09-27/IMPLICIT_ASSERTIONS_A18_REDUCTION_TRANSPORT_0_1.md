# P versus NP implicit-assertion pass A18 — polynomial reduction transport

**Status:** admitted exact implicit assertions, round 18  
**Premise state:** A0 + corrected A1 + A2-A17

This round restates polynomial reduction transport entirely in the primitive witness model.

---

## IA-267 — functional-polynomial membership pulls backward through a functional-polynomial many-one reduction

### Premises

There is a functionally polynomial function `f` such that:

```text
A(x) IFF B(f(x)).
```

And `B` has a functional polynomial realization.

### Body

`A` has a functional polynomial realization.

### Construction

Compute `f(x)`, then run the functional realization of `B`.

### Support

`IA-092`.

### Disposition

ADMITTED EXACT.

---

## IA-268 — branching-polynomial membership pulls backward through a functional-polynomial many-one reduction

### Premises

```text
A(x) IFF B(f(x))
```

with `f` functionally polynomial.

`B` has a branching polynomial realization.

### Body

`A` has a branching polynomial realization.

### Construction

1. deterministically compute `f(x)`;
2. simulate the branching realization of `B` on `f(x)`.

Polynomial preprocessing plus polynomial branching time remains polynomial.

### Disposition

ADMITTED EXACT.

---

## IA-269 — functional-polynomial nonmembership transports forward under many-one reduction

### Premises

```text
A <=p B
```

in the primitive sense of `IA-267`.

And:

```text
A
```

has no functional polynomial realization.

### Body

```text
B
```

has no functional polynomial realization.

### Proof

Contrapositive of `IA-267`.

If `B` had a functional realization, `A` would too.

### Disposition

ADMITTED EXACT.

---

## IA-270 — the lower-bound transport law is semantic but not constructive

### Body

`IA-269` transports an already-established nonmembership result.

It does not provide a method for establishing the source nonmembership:

```text
A not functionally polynomial.
```

### Consequence

Reduction transport can move a separation theorem forward but cannot manufacture the initial lower bound.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-271 — any branching-polynomial relation outside functional polynomial computation is sufficient for separation

### Premises

A raw unary relation `A` has:

```text
branching polynomial realization
```

and lacks:

```text
functional polynomial realization.
```

### Body

The two derived computation classes are unequal in the primitive model.

### Support

Direct witness of strict inclusion plus `IA-011` known functional-to-branching inclusion.

### Consequence

The separating relation does not need to be complete/hard for the branching class.

### Disposition

ADMITTED EXACT.

---

## IA-272 — a branching-hard relation with a functional realization collapses branching to functional

### Define branching-hard target

Raw unary relation `H` has the property:

```text
for every branching-polynomial relation A:
    A <=p H.
```

### Premise

`H` also has a functional polynomial realization.

### Body

Every branching-polynomial relation has a functional polynomial realization.

### Support

Apply `IA-267` to every branching `A`.

Together with `IA-011`, the two derived classes coincide.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-273 — mutual polynomial reducibility preserves functional/branching class membership

### Premises

```text
A <=p B
B <=p A.
```

### Body

For each of the two represented computation modes:

```text
A is in the mode
IFF
B is in the mode.
```

### Support

Repeated `IA-267` or `IA-268`.

### Disposition

ADMITTED EXACT.

---

## IA-274 — mutual polynomial reducibility does not establish global NEI identity of problems

### Body

Even when `A` and `B` have the same functional/branching class memberships under `IA-273`, they may remain globally distinct mathematical/problem objects.

### Support

NEI 0.4:

```text
structural/behavioral equivalence
    != automatic global SAME.
```

### Disposition

ADMITTED EXACT.

---

## IA-275 — polynomial reduction equivalence does not preserve primitive witness geometry by default

### Body

From:

```text
A <=p B
B <=p A
```

one cannot infer without further exact bridges that `A` and `B` have equal:

- Q-RESIDUAL width;
- dominance width;
- shortest accepting witness profile;
- accepting-continuation count;
- separator structure;
- symmetry group;
- natural identity partition of internal residuals.

### Support

Reductions preserve the represented truth relation through preprocessing, not the internal witness topology.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-276 — lower-bound structure may be sought on a structurally convenient branching relation and transported to harder targets

### Premises

1. relation `A` is branching-polynomial;
2. exact theorem proves `A` lacks functional polynomial realization;
3. `A <=p B`.

### Body

`B` lacks a functional polynomial realization by `IA-269`.

If `B` is also branching-polynomial, it is another separating relation.

### Significance

The initial structural lower-bound target need not itself be a conventional complete problem.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-277 — reduction-preimage closure creates equality-side adapters

### Premises

`H` is branching-hard and there is a functional realization of `H`.

### Body

Every branching relation becomes functional (`IA-272`).

### Structural interpretation

On the equality side, reductions are strong because deterministic upper-bound membership composes backward.

This remains asymmetric with proving the first uniform lower bound.

### Disposition

ADMITTED EXACT.

---

## IA-278 — a reduction can preserve terminal truth while destroying a useful elimination law

### Body

Suppose `A <=p B`.

An elimination law that depends on:

- particular witness locality;
- one separator;
- one symmetry;
- one dominance order;
- one aggregate factorization

for `A` does not automatically transport to `B`.

### Support

`IA-275`.

### Discovery consequence

Use reductions for terminal correctness only after separately auditing whether the structural law survives the mapping.

### Disposition

ADMITTED EXACT.

---

# A18 central result

The primitive graph does contain an exact uniform lower-bound transport rule:

```text
A <=p B
AND
A notin functional-poly
    ->
B notin functional-poly.
```

What it does **not** contain is a generic method for producing the initial nonmembership theorem.

This resolves the earlier apparent asymmetry:

```text
upper bounds transport backward constructively;

lower bounds transport forward by contrapositive
only after a lower bound is already established.
```

# P-vs-NP status

OPEN.
