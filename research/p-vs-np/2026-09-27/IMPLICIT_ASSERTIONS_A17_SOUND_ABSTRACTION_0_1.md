# P versus NP implicit-assertion pass A17 — sound incomplete pruning and abstract covers

**Status:** admitted exact implicit assertions, round 17  
**Premise state:** A0 + corrected A1 + A2-A16

---

## IA-253 — a sound incomplete dominance relation is sufficient for safe one-way pruning

### Define

Let:

```text
Dhat(p,q)
```

be any functionally decidable relation satisfying the exact soundness theorem:

```text
Dhat(p,q)
    ->
p <=F q.
```

No completeness converse is required.

### Body

If a reachable residual set contains `p,q` and `Dhat(p,q)`, removing `p` preserves the union of continuation languages.

### Support

Soundness gives exact continuation dominance.

Apply `IA-204`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-254 — exact dominance testing is not necessary for a dominance-based polynomial algorithm

### Body

A pruning algorithm may use only `Dhat` from `IA-253`.

It remains sound even if many truly dominated pairs are not recognized.

### Support

Every performed prune is exact.

Missed prunes increase retained state count but cannot introduce semantic error.

### Disposition

ADMITTED EXACT.

---

## IA-255 — polynomial Dhat-frontier width plus polynomial Dhat operations gives polynomial decision

### Premises

There is a sound relation `Dhat` such that layer-by-layer propagation maintains a retained set `S_t` with:

1. every actually reachable residual at depth `t` is exactly continuation-dominated by some retained `s in S_t`;
2. `|S_t| <= q(|x|)` for polynomial `q`;
3. successor construction is polynomial;
4. `Dhat` is polynomial-time decidable;
5. a polynomial-time pruning procedure constructs `S_{t+1}` from successors of `S_t`;
6. witness depth is polynomial.

### Body

The bounded existential projection is functionally polynomial.

### Correctness

Coverage by true continuation dominance preserves all accepting futures.

### Complexity

Polynomial frontier × finite/polynomial branching × polynomial pruning × polynomial depth.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-256 — universal exact-dominance hardness does not transfer to every sound under-approximation

### Body

`IA-214` concerns a procedure that decides **all** exact dominance facts.

A sound incomplete `Dhat` may recognize a restricted syntactic/semantic family of dominance facts without deciding arbitrary continuation inclusion.

Therefore:

```text
exact dominance universally hard/equivalent in strength
    !=
every useful sound dominance law is equally hard.
```

### Scope

This is a logical non-implication about support strength.

No specific easy `Dhat` is asserted.

### Disposition

ADMITTED EXACT.

---

## IA-257 — a sound future-identity invariant is the symmetric special case of sound dominance evidence

### Premise

Invariant equality implies exact Q-RESIDUAL SAME:

```text
J(p)=J(q)
    ->
p ~F q.
```

### Body

Then both:

```text
p <=F q
q <=F p.
```

So invariant equality supplies two sound dominance directions.

### Support

`IA-200`.

### Disposition

ADMITTED EXACT.

---

## IA-258 — one-way dominance evidence can be strictly more permissive than safe identity merging

### Body

To remove `p` while retaining `q`, it is enough to prove:

```text
p <=F q.
```

There is no need to prove the reverse implication required for SAME.

### Support

`IA-204`.

### Consequence

Search for safe pruning should include one-way laws, not only equality/invariants.

### Disposition

ADMITTED EXACT.

---

## IA-259 — a polynomial abstract cover need not expose exact residual classes

### Premises

At each depth there is a polynomial-size retained family `S_t` such that:

```text
for every reachable residual r:
    exists s in S_t:
        r <=F s.
```

### Body

`S_t` is sufficient for the future-existence objective even if:

- members of `S_t` are pairwise not exact Q-RESIDUAL representatives;
- the full NEI quotient is never materialized.

### Support

Union preservation by dominance coverage.

### Disposition

ADMITTED EXACT.

---

## IA-260 — a sound polynomial cover transformer is sufficient

### Premises

There is a deterministic polynomial operator:

```text
COVER
```

that, given a polynomial-size retained family `S_t`, returns polynomial-size `S_(t+1)` satisfying:

```text
for every successor r
of every residual covered by S_t:

    exists s in S_(t+1):
        r <=F s.
```

Initial root is covered.

Terminal truth can be read soundly from the covered family.

### Body

Repeated application for polynomially many witness layers gives a deterministic polynomial decision method.

### Support

Induction on depth plus dominance right compatibility.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-261 — abstract cover states may be synthetic objects if their dominance semantics are exact

### Premise

A retained abstract state `a` need not itself be a reachable raw residual, provided there is an exact represented continuation object `C_a` and:

```text
C_r subseteq C_a
```

for every concrete residual `r` it covers.

For exact decision rather than one-sided overapproximation, the terminal readout must also avoid false accepting continuations, e.g. by maintaining matching lower/upper evidence or exact aggregate semantics.

### Body

Synthetic abstraction is admissible only under its exact soundness/completeness contract.

### QU rule

Any unresolved abstraction gap must remain QU; it cannot be treated as exact coverage.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-262 — one-sided overapproximation alone can prove NO but not exact YES

### Premise

Abstract continuation set `U` satisfies:

```text
C_root subseteq U.
```

### Body

If:

```text
U=empty,
```

then:

```text
C_root=empty
```

and the instance is NO.

If `U` is nonempty, exact YES does not follow because `U` may contain spurious accepting continuations.

### Disposition

ADMITTED EXACT.

---

## IA-263 — one-sided underapproximation alone can prove YES but not exact NO

### Premise

Abstract/lower continuation set `Lw` satisfies:

```text
Lw subseteq C_root.
```

### Body

If `Lw` is nonempty, exact YES follows.

If `Lw` is empty, exact NO does not follow.

### Disposition

ADMITTED EXACT.

---

## IA-264 — converging lower and upper abstractions can yield exact decision

### Premises

Maintain:

```text
Lw subseteq C_root subseteq U.
```

If the represented terminal observable agrees:

```text
nonempty(Lw) = nonempty(U),
```

then exact Q-EXISTS truth is determined.

### Cases

```text
Lw nonempty
    -> YES.

U empty
    -> NO.
```

Those are the only equal Boolean cases.

### Disposition

ADMITTED EXACT.

---

## IA-265 — exact abstract interpretation is another existential-elimination topology

### Body

A polynomial-time process that constructs/refines sound lower/upper continuation abstractions until `IA-264` decides every input yields a functional polynomial decider.

### Support

`IA-264`.

### Distinction

This need not materialize:

- exact Q-RESIDUAL classes;
- exact dominance preorder;
- a witness hitting set.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-266 — failure of one abstraction to converge is not evidence for the opposite P-vs-NP answer

### Body

If a chosen sound abstraction remains inconclusive on some inputs, that establishes only inadequacy of that abstraction/valuation route.

It does not support:

```text
P != NP
```

or:

```text
P = NP.
```

### Support

Method failure does not determine terminal truth.

### Disposition

ADMITTED EXACT.

---

# A17 central result

The search space is broader than exact identity/dominance:

```text
exact quotient
exact dominance
sound incomplete dominance
polynomial abstract covers
lower/upper abstractions.
```

The universal hardness equivalences apply to **complete exact** identity/dominance access.

They do not rule out a target-specific cheap sound relation or abstraction that proves enough facts to keep the search polynomial.

This is now a high-priority DP target.

# P-vs-NP status

OPEN.
