# P vs NP — derived core closure 0.1

**Status:** derived support from the pinned foundation; not new complexity theory; no authority effect  
**Foundation:** `P_VS_NP_FOUNDATION_0_1.isg` + pinned Coq definitions  
**Purpose:** close standard consequences needed by the unified problem rendering without importing them as folklore.

## D1 — P is closed backward under polynomial many-one reductions

Pinned definitions:

```text
P in P
    :=
P has a deterministic polynomial-time decider

P <=p Q
    :=
exists polynomial-time computable f
such that
forall x:
    P(x) <-> Q(f(x)).
```

Suppose:

```text
P <=p Q
AND
Q in P.
```

Let `f` be the polynomial-time reduction from `P` to `Q`, and let `D_Q` be a polynomial-time decider for `Q`.

Then the algorithm:

```text
x
 -> compute f(x)
 -> run D_Q(f(x))
```

decides `P`.

Composition of polynomial-time computations remains polynomial-time.

Therefore:

```text
P <=p Q
AND Q in P
    ->
P in P.
```

This is a derived theorem over the pinned computational model.

## D2 — an NP-hard problem in P collapses NP into P

Pinned NP-hardness:

```text
Q is NP-hard
iff
for every language/problem L in NP:
    L <=p Q.
```

Assume:

```text
Q is NP-hard
AND
Q in P.
```

For arbitrary `L in NP`:

```text
L <=p Q
```

by NP-hardness.

By D1:

```text
L in P.
```

Hence:

```text
NP subset P.
```

The pinned foundation already proves:

```text
P subset NP.
```

Therefore:

```text
P = NP.
```

Note that the argument uses NP-hardness plus `Q in P`; membership of `Q` in NP is not needed for this direction.

## D3 — SAT in P iff P = NP

Pinned Cook-Levin:

```text
SAT is NP-complete
```

so in particular:

```text
SAT is NP-hard
AND
SAT in NP.
```

### Forward

If:

```text
SAT in P,
```

then by D2:

```text
P = NP.
```

### Reverse

If:

```text
P = NP,
```

and SAT is in NP, then:

```text
SAT in P.
```

Therefore:

```text
SAT in P
    <->
P = NP.
```

This is the exact equality-route quotient used by the unified rendering.

## D4 — P != NP iff some NP language is not in P

Because:

```text
P subset NP,
```

the classes differ iff reverse inclusion fails.

Thus:

```text
P != NP
    <->
not (NP subset P)
    <->
exists L:
    L in NP
    AND
    L notin P.
```

This is the direct semantic separation target.

It is strictly weaker as a proof objective than any particular sufficient route such as:

```text
NP notsubset P/poly
```

or a superpolynomial unrestricted-circuit lower bound for a selected NP-complete language.

## D5 — SAT notin P iff P != NP

Negating D3 gives, under the same classical class semantics:

```text
SAT notin P
    <->
P != NP.
```

Thus the entire top-level decision problem can be quotiented to the single unresolved membership question:

```text
SAT in P ?
```

for the pinned foundation/model.

This does not say SAT is the only useful representation. Any NP-hard problem can serve as an equality adapter if placed in P.

## D6 — NP-complete problems are interchangeable for equality, not for every lower-bound method

For any NP-complete `Q`:

```text
Q in P
    <->
P = NP.
```

So NP-complete problem identity is nonessential for the **class-equality objective**.

However, a lower bound or proof-method property attached to one concrete representation need not transport through an arbitrary polynomial reduction with the same quantitative strength or proof signature.

Therefore:

```text
NP-complete equivalence under <=p
    !=
identity of circuit lower-bound structure
    !=
identity of barrier signature.
```

This distinction is load-bearing in the unified graph.

## D7 — model boundary

These derivations are exact relative to the pinned foundation and the official problem interpretation already frozen by the campaign.

The campaign still keeps an explicit bridge obligation between the library's chosen encoded computational model and any stronger claim of literal identity with every standard formulation.

No result in this file resolves that model-equivalence audit by omission.

## Disposition

```text
polynomial-reduction closure of P: DERIVED

NP-hard + in-P -> P=NP: DERIVED

SAT in P <-> P=NP: DERIVED

SAT notin P <-> P!=NP: DERIVED

P!=NP <-> exists NP language outside P: DERIVED

new complexity-theory theorem: NONE
```
