# P versus NP implicit-assertion pass A20 — Boolean and projection closure

**Status:** admitted exact implicit assertions, round 20  
**Premise state:** A0 + corrected A1 + A2-A19

---

## IA-292 — functional-polynomial relations are closed under every fixed finite Boolean combination

### Body

Given a fixed finite family of functionally polynomial predicates:

```text
P1...Pk,
```

any fixed Boolean truth function of their outputs is functionally polynomial.

### Support

- complement: `IA-062`;
- AND/OR/fixed Boolean composition: `IA-087..089`;
- fixed finite number of calls: `IA-096`.

### Disposition

ADMITTED EXACT.

---

## IA-293 — branching-polynomial relations are closed under union

### Premises

`A(x)` and `B(x)` each have branching polynomial realizations.

### Body

```text
A(x) OR B(x)
```

has a branching polynomial realization.

### Construction

Add one first branching choice selecting which realization to simulate.

Positive terminal if the selected realization accepts.

All branches remain polynomially bounded by a fixed polynomial dominating the two bounds plus constant overhead.

### Soundness/completeness

There is an accepting branch iff at least one source realization has an accepting branch.

### Disposition

ADMITTED EXACT.

---

## IA-294 — branching-polynomial relations are closed under intersection

### Premises

`A(x)` and `B(x)` have branching polynomial realizations.

### Body

```text
A(x) AND B(x)
```

has a branching polynomial realization.

### Construction

Equivalently use certificate factorization:

```text
A:
exists u V_A(x,u)

B:
exists v V_B(x,v).
```

Then:

```text
A AND B
IFF
exists (u,v):
    V_A(x,u) AND V_B(x,v).
```

Pair encoding is polynomial and the conjunction verifier is functionally polynomial.

Apply `IA-034`.

### Disposition

ADMITTED EXACT.

---

## IA-295 — branching-polynomial relations are closed under fixed finite positive Boolean formulas

### Allowed connectives

```text
AND
OR
```

over a fixed finite family.

### Body

Any fixed monotone Boolean formula composed from branching-polynomial predicates is branching-polynomial.

### Support

Repeated `IA-293/294`.

### Disposition

ADMITTED EXACT.

---

## IA-296 — bounded existential projection is idempotent up to witness pairing

### Body

For polynomial bounds:

```text
exists u:
    exists v:
        V(x,u,v)
```

is one bounded existential projection:

```text
exists z:
    V'(x,z)
```

under exact polynomial pair encoding.

### Support

`IA-066`, `IA-090/091`.

### Consequence

Applying another polynomial bounded existential layer to a branching-polynomial relation does not create a stronger derived computation mode than branching-polynomial realizability.

### Disposition

ADMITTED EXACT.

---

## IA-297 — complement of a branching presentation is a bounded universal projection

### Starting point

```text
L(x)
IFF
exists w:
    V(x,w).
```

### Body

```text
NOT L(x)
IFF
forall w:
    NOT V(x,w).
```

### Support

First-order quantifier negation plus functional complement closure of `V`.

### Important status

The primitive branching construction does not by itself turn this bounded universal projection back into a branching existential presentation.

That would require additional support.

### Disposition

ADMITTED EXACT.

---

## IA-298 — existential closure would make branching-polynomial relations complement-closed

### Premise

EXISTS-CLOSURE, equivalently equality of the two primitive computation modes.

### Body

Every branching relation is then functional.

Functional relations are complement-closed (`IA-062`).

Therefore every branching relation's complement is branching as well.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-299 — branching complement closure alone supplies dual short verification, not a represented deterministic decider

### Premise

Assume one branching relation `L` and its complement both have branching polynomial realizations.

### Body

The represented support gives:

```text
YES:
    polynomial accepting witness for L

NO:
    polynomial accepting witness for NOT L.
```

It does not, from these premises alone, contain a functional procedure selecting which witness system succeeds.

### Support

Same support distinction as `IA-245`.

### Scope

This is not a theorem denying the possibility of some additional determinization result.

It only prevents silently promoting dual certificate existence into a deterministic algorithm.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-300 — existential projection is monotone under verifier inclusion

### Premise

For every admissible `(x,w)`:

```text
V(x,w) -> W(x,w).
```

### Body

```text
exists w V(x,w)
    ->
exists w W(x,w).
```

### Support

First-order existential monotonicity.

### Relation to dominance

This is the verifier-level analogue of continuation dominance.

### Disposition

ADMITTED EXACT.

---

## IA-301 — verifier equivalence gives equal projected language

### Premise

```text
for every x,w:
    V(x,w) IFF W(x,w).
```

### Body

```text
exists w V(x,w)
IFF
exists w W(x,w).
```

### Support

Existential congruence under pointwise equivalence.

### Identity firewall

Verifier extensional equivalence does not imply global natural identity of verifier artifacts.

### Disposition

ADMITTED EXACT.

---

## IA-302 — positive closure laws do not resolve the missing existential-elimination step

### Body

The following are already available inside the branching mode:

```text
union
intersection
nested existential projection
many-one preimages.
```

The unresolved terminal implication asks for conversion of the resulting bounded existential presentation into a functional deterministic realization.

Thus merely adding more positive closure operations of the same form does not discharge that missing support.

### Scope

This is a support-topology statement, not a claim that positive-algebraic structure can never contribute to a solution.

### Disposition

ADMITTED EXACT.

---

# A20 central structural picture

The derived modes now have:

```text
FUNCTIONAL POLYNOMIAL:
    fixed finite full Boolean closure

BRANCHING POLYNOMIAL:
    union
    intersection
    bounded existential projection
    polynomial many-one preimages

BRANCHING COMPLEMENT:
    not supplied by the primitive existential witness structure alone.
```

The P-vs-NP residual remains the elimination of the bounded existential projection, not ordinary Boolean combination.

# P-vs-NP status

OPEN.
