# P versus NP implicit-assertion pass A14 — continuation dominance and antichain pruning

**Status:** admitted exact implicit assertions, round 14  
**Premise state:** A0 + corrected A1 + A2-A13

This round generalizes exact identity to a one-way substitution relation suited to existential acceptance.

---

## IA-198 — continuation dominance

### Define

For same-scope residuals `p,q`:

```text
p <=F q
```

iff:

```text
for every admissible remaining suffix s:

    C_p(s)
        ->
    C_q(s).
```

Interpretation:

Every accepting future available from `p` is also available from `q`.

This is an ordinary exact relation, not an NEI result.

### Disposition

ADMITTED EXACT DEFINITIONAL ASSERTION.

---

## IA-199 — continuation dominance is a preorder

### Reflexive

```text
p <=F p
```

by implication reflexivity.

### Transitive

If:

```text
p <=F q
q <=F r,
```

then every suffix accepted from `p` is accepted from `q` and hence from `r`.

Thus:

```text
p <=F r.
```

### Disposition

ADMITTED EXACT.

---

## IA-200 — mutual continuation dominance is exactly Q-RESIDUAL SAME

### Body

```text
p <=F q
AND
q <=F p

IFF

Q-RESIDUAL SAME(p,q).
```

### Support

Mutual implication for every suffix is pointwise biconditional equality of continuation relations.

Use `IA-068`.

### Consequence

Q-RESIDUAL is the equivalence kernel of the continuation-dominance preorder.

### Disposition

ADMITTED EXACT.

---

## IA-201 — one distinguishing suffix witnesses failure of dominance

### Body

```text
NOT (p <=F q)
IFF
exists admissible suffix s:
    C_p(s)=TRUE
    AND
    C_q(s)=FALSE.
```

### Support

Negation of the universal implication over the complete finite bounded suffix domain.

### Disposition

ADMITTED EXACT.

---

## IA-202 — continuation dominance is right-compatible

### Body

If:

```text
p <=F q,
```

then for every common next witness symbol `a`:

```text
p·a <=F q·a.
```

### Proof

For every remaining suffix `s`:

```text
C_(p·a)(s)
=
C_p(a·s)

->
C_q(a·s)
=
C_(q·a)(s).
```

### Disposition

ADMITTED EXACT.

---

## IA-203 — continuation dominance preserves existential truth monotonically

### Body

```text
p <=F q
AND
E(p)=TRUE
    ->
E(q)=TRUE.
```

### Support

An accepting suffix for `p` is also accepted by `q`.

### Contrapositive

```text
E(q)=FALSE
    ->
E(p)=FALSE.
```

### Disposition

ADMITTED EXACT.

---

## IA-204 — a dominated residual is nonessential in a union of future behaviors

### Premises

A residual set contains both:

```text
p
q
```

with:

```text
p <=F q.
```

### Body

Removing `p` preserves the exact union of continuation languages:

```text
C_p UNION C_q UNION U
=
C_q UNION U.
```

Therefore it preserves:

- every attainable accepting continuation in the union;
- the terminal existential truth of the set.

### DP classification

`p` is:

```text
NONESSENTIAL_FOR_SUFFICIENCY
```

for the union/future-existence objective while `q` remains.

### Disposition

ADMITTED EXACT OBJECTIVE-SCOPED.

---

## IA-205 — continuation dominance can prune beyond NEI identity

### Body

It is possible that:

```text
p <=F q
```

strictly:

```text
NOT (q <=F p).
```

Then:

```text
Q-RESIDUAL DISTINCT(p,q)
```

but `p` is still removable from a residual set containing `q`.

### Exact example

```text
C_p = {0}
C_q = {0,1}.
```

### Consequence

Exact deduplication by SAME is not the strongest safe reduction available for existential acceptance.

### Disposition

ADMITTED EXACT.

---

## IA-206 — the maximal dominance classes form an antichain after quotienting mutual dominance

### Construction

First quotient by mutual dominance / Q-RESIDUAL SAME.

Partially order the resulting exact classes by strict continuation inclusion.

The maximal elements are pairwise incomparable.

### Body

No two distinct maximal classes dominate one another.

### Disposition

ADMITTED EXACT.

---

## IA-207 — maximal dominance classes cover every residual

### Scope

One finite reachable residual set at one depth.

### Body

Every residual class is dominated by at least one maximal class.

### Support

Finite partially ordered set.

Starting from any nonmaximal class, repeatedly move to a strict dominator.

Finite strict ascent terminates at a maximal element.

### Disposition

ADMITTED EXACT.

---

## IA-208 — keeping one representative of every maximal dominance class preserves the exact union of all continuation languages

### Body

Let `M` contain one representative from each maximal dominance class of finite reachable set `R`.

Then:

```text
UNION_{r in R} C_r
=
UNION_{m in M} C_m.
```

### Support

By `IA-207`, every `r` is dominated by some maximal `m`:

```text
C_r subseteq C_m.
```

The reverse inclusion is immediate because `M` is drawn from `R`.

### Consequence

The complete future-existence behavior of the reachable set is preserved.

### Disposition

ADMITTED EXACT.

---

## IA-209 — maximal dominance representatives are sufficient but not necessarily minimum union support

### Body

The maximal-class set from `IA-208` need not be a minimum-cardinality subset whose continuation-language union equals the full union.

### Counterexample

Continuation sets:

```text
A = {1,2}
B = {1,3}
C = {2,4}.
```

All three are pairwise incomparable and therefore maximal.

But:

```text
A subseteq B UNION C,
```

so removing `A` preserves the union:

```text
A UNION B UNION C
=
B UNION C.
```

### Consequence

Pairwise dominance pruning is not a proof of minimum support.

### Disposition

ADMITTED EXACT COUNTEREXAMPLE.

---

## IA-210 — minimum union-preserving residual support is a cover problem over continuation sets

### Define candidate space

Subsets `S` of the finite reachable residual set such that:

```text
UNION_{s in S} C_s
=
UNION_{r in R} C_r.
```

### Body

A minimum-cardinality exact support in this declared space is exactly a minimum subfamily covering the full continuation-language union.

### Scope

This is a finite objective-scoped structural characterization.

No complexity claim about finding that minimum is made.

### Disposition

ADMITTED EXACT.

---

## IA-211 — continuation dominance is the greatest right-compatible acceptance-monotone preorder

### Candidate relation family

Let `R_t` be any same-depth preorder satisfying:

### Acceptance monotonicity

```text
p R_t q
AND
CURRENT(p)=TRUE
    ->
CURRENT(q)=TRUE.
```

### Right compatibility

```text
p R_t q
    ->
for every next symbol a:
    p·a R_{t+1} q·a.
```

### Body

Then:

```text
p R_t q
    ->
p <=F q.
```

### Proof

Induct on remaining depth.

For any suffix `s`, repeatedly apply right compatibility along the suffix.

At the terminal/current observation reached after `s`, acceptance monotonicity transfers TRUE from `p` to `q`.

Hence:

```text
C_p(s) -> C_q(s)
```

for every suffix.

### Converse

`<=F` itself satisfies both conditions (`IA-202`, `IA-203`).

### Conclusion

Continuation dominance is the **greatest/coarsest exact right-compatible preorder preserving acceptance monotonicity**.

### Disposition

ADMITTED EXACT EXTREMAL CLAIM in the declared preorder candidate space.

---

## IA-212 — Q-RESIDUAL is the symmetric kernel of the greatest existential simulation preorder

### Body

The equivalence kernel of the greatest preorder from `IA-211` is exactly:

```text
Q-RESIDUAL SAME.
```

### Support

`IA-200`.

### Disposition

ADMITTED EXACT.

---

## IA-213 — non-dominance has a polynomial-size distinguishing witness for polynomial verifiers

### Body

For polynomial verifier residuals:

```text
NOT (p <=F q)
```

has a witness suffix `s` of polynomially bounded size such that:

```text
C_p(s)=TRUE
C_q(s)=FALSE.
```

The witness is deterministically polynomially checkable.

### Support

- `IA-201`;
- polynomial suffix bound;
- verifier Boolean closure.

### Disposition

ADMITTED EXACT.

---

## IA-214 — universal efficient exact dominance testing is equivalent in strength to existential closure

### Forward assumption

Suppose exact `p <=F q` is polynomial-time decidable for every polynomial verifier residual pair.

### Reduction to bounded existential projection

For arbitrary:

```text
L(x)
IFF
exists s:
    V(x,s),
```

construct:

```text
p:
    C_p(s)=V(x,s)

q:
    C_q(s)=FALSE.
```

Then:

```text
p <=F q
IFF
for all s: V(x,s)->FALSE
IFF
NOT L(x).
```

So exact dominance testing decides `L`.

### Reverse

Assume EXISTS-CLOSURE.

By `IA-213`, non-dominance is a bounded existential projection of a functional-polynomial distinguishing predicate.

EXISTS-CLOSURE decides non-dominance; complement closure decides dominance.

### Body

Universal polynomial exact continuation-dominance testing and EXISTS-CLOSURE imply each other.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-215 — dominance-antichain width can be strictly smaller than NEI residual class count

### Example

Continuation languages form a strict chain:

```text
C_1 subset C_2 subset ... subset C_k.
```

All `k` are Q-RESIDUAL DISTINCT.

Only `C_k` is maximal under dominance.

Thus:

```text
W_NEI = k

maximal dominance width = 1.
```

### Disposition

ADMITTED EXACT.

---

## IA-216 — polynomial maximal-dominance width plus efficient dominance supports polynomial propagation

### Premises

At every witness depth:

1. reachable residuals are covered by polynomially many maximal continuation-dominance classes;
2. exact dominance is polynomial-time computable for the target verifier family;
3. next residual representative construction is polynomial;
4. witness alphabet is fixed finite / polynomially enumerable;
5. maximal-set pruning can be performed in polynomial total time.

### Algorithm

Maintain only maximal representatives.

At each depth:

1. generate all next-symbol successors of current maximal reps;
2. compare/prune dominated successors;
3. retain one representative of each maximal mutual-dominance class.

### Correctness invariant

Every omitted residual is dominated by a retained one.

By right compatibility (`IA-202`), descendants of omitted residuals remain dominated by corresponding descendants of retained residuals.

By `IA-203`, existential acceptance is preserved.

### Complexity

Polynomial representatives × polynomial successor generation × polynomial dominance pruning × polynomial depth.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-217 — dominance propagation strictly generalizes exact identity deduplication

### Body

If dominance comparison is restricted to mutual dominance only, `IA-216` reduces to NEI residual SAME deduplication.

Allowing one-way dominance can remove additional exact DISTINCT residuals (`IA-205`).

### Disposition

ADMITTED EXACT.

---

## IA-218 — small dominance width alone is not enough

### Body

Even if one maximal dominance class covers every residual at every layer, a polynomial algorithm does not follow unless the dominant representative and/or dominance relation can be constructed/verified efficiently.

### Support

Universal exact dominance access is itself equivalent to EXISTS-CLOSURE (`IA-214`).

### Disposition

ADMITTED EXACT NON-IMPLICATION.

---

# A14 central result

The existential objective supports a one-way structure stronger than identity deduplication:

```text
continuation inclusion
    = exact dominance/subsumption.
```

Its hierarchy is:

```text
Q-RESIDUAL SAME
    =
mutual dominance

strict dominance
    permits pruning DISTINCT residuals

maximal dominance antichain
    can be much smaller than W_NEI.
```

This creates a new exact discovery target:

> Find independently computable structural laws that prove continuation dominance cheaply on the target verifier family.

Such laws can support pruning without requiring full residual identity.

# P-vs-NP status

OPEN.
