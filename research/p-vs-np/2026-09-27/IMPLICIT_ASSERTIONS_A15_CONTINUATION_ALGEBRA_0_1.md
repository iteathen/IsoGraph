# P versus NP implicit-assertion pass A15 — continuation-language algebra

**Status:** admitted exact implicit assertions, round 15  
**Premise state:** A0 + corrected A1 + A2-A14

---

## IA-219 — exact continuation-language decomposition

### Define

For residual prefix `p` with remaining bound `r`, let:

```text
C_p
```

be the finite set of admissible suffix strings accepted from `p`.

Let:

```text
EPS
```

denote the empty suffix.

### Body

For `r>0`:

```text
C_p
=
({EPS} if CURRENT(p) else empty)
UNION
UNION_{a in A}
    a · C_(p·a),
```

where:

```text
a · S
=
{ a·s : s in S }.
```

At `r=0` only the empty-suffix component remains.

### Support

Every admissible suffix is uniquely:

- empty; or
- one first symbol followed by a shorter suffix.

### Disposition

ADMITTED EXACT.

---

## IA-220 — continuation sets form an idempotent commutative union algebra

### Exact laws

For continuation sets `X,Y,Z`:

```text
X UNION Y = Y UNION X

(X UNION Y) UNION Z
=
X UNION (Y UNION Z)

X UNION X = X

X UNION empty = X.
```

### Support

Extensional set membership logic.

### Prefix action

For fixed symbol `a`:

```text
a·(X UNION Y)
=
(a·X) UNION (a·Y).
```

### Disposition

ADMITTED EXACT.

---

## IA-221 — continuation dominance is exactly the semilattice order induced by union

### Body

```text
p <=F q
IFF
C_p UNION C_q = C_q.
```

### Support

For sets:

```text
X subseteq Y
IFF
X UNION Y = Y.
```

Continuation dominance is subset inclusion by definition.

### Disposition

ADMITTED EXACT.

---

## IA-222 — Q-RESIDUAL SAME is equality in the continuation-language algebra

### Body

```text
Q-RESIDUAL SAME(p,q)
IFF
C_p = C_q.
```

### Support

`IA-068`.

### Relation to dominance

By `IA-200`:

```text
equality
IFF
mutual semilattice order.
```

### Disposition

ADMITTED EXACT.

---

## IA-223 — Q-EXISTS is the nonemptiness homomorphic image of continuation union

### Define

```text
H_exists(X)
=
TRUE iff X is nonempty.
```

### Laws

```text
H_exists(empty)=FALSE

H_exists(X UNION Y)
=
H_exists(X) OR H_exists(Y).
```

For any prefix symbol `a`:

```text
H_exists(a·X)=H_exists(X).
```

### Consequence

Applying `H_exists` to `IA-219` yields the exact OR/Bellman recurrence `IA-169`.

### Disposition

ADMITTED EXACT.

---

## IA-224 — Q-MIN is a tropical-style homomorphic image

### Define

```text
H_min(X)
=
minimum suffix length in X

or INF if X is empty.
```

### Laws

```text
H_min(empty)=INF

H_min(X UNION Y)
=
min(H_min(X), H_min(Y))

H_min(a·X)
=
1 + H_min(X).
```

### Consequence

Applying `H_min` to `IA-219` yields `IA-181`.

### Disposition

ADMITTED EXACT.

---

## IA-225 — Q-COUNT is an additive image under the disjoint continuation decomposition

### Define

```text
H_count(X)=|X|.
```

### General union firewall

For arbitrary overlapping sets:

```text
|X UNION Y|
```

is not generally:

```text
|X|+|Y|.
```

### Exact decomposition support

In `IA-219`, these pieces are pairwise disjoint:

- empty suffix;
- strings beginning with different first symbols.

Therefore:

```text
H_count(C_p)
=
[CURRENT(p)]
+
sum_a H_count(C_(p·a)).
```

### Consequence

This is `IA-187`.

### Disposition

ADMITTED EXACT.

---

## IA-226 — aggregate NEI scopes are homomorphic projections of Q-RESIDUAL semantics

### Body

Each exact aggregate scope is obtained by applying a represented function to the full continuation-language object:

```text
Q-EXISTS: H_exists(C_p)

Q-MIN:    H_min(C_p)

Q-COUNT:  H_count(C_p).
```

Therefore:

```text
Q-RESIDUAL SAME
```

implies SAME under each aggregate scope.

### Converse

Not generally valid.

### Disposition

ADMITTED EXACT.

---

## IA-227 — any exact continuation aggregate induces a scoped NEI identity

### Premise

There is an exact represented function:

```text
H : continuation language -> value carrier.
```

### Query

Define scoped identity:

```text
p ~H q
IFF
H(C_p)=H(C_q).
```

### Body

This is a lawful NEI query context when:

- carrier/value identity authority is pinned;
- scope is explicit;
- QU affecting `H(C_p)` remains represented.

### Support

NEI 0.4 scoped-quotient semantics.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-228 — smaller homomorphic image does not imply cheaper evaluation

### Body

A homomorphism may collapse an enormous continuation-language space into:

- one bit;
- one small natural;
- one polynomial-bit integer;

while evaluating the image from a succinct verifier remains computationally difficult.

### Support

- Q-EXISTS: `IA-164/171`;
- Q-MIN: `IA-180/185`;
- Q-COUNT: `IA-189/190`.

### Disposition

ADMITTED EXACT.

---

## IA-229 — polynomial-size acyclic recurrence representation plus efficient local algebra gives polynomial aggregate evaluation

### Premises

For input `x`, there is a deterministically polynomial-time constructible acyclic graph `G_x` with:

1. polynomially many nodes;
2. a designated root;
3. leaves with explicitly computable aggregate values;
4. every internal node stores one fixed local operation over already represented child aggregate values;
5. all local operations are polynomial-time computable on polynomial-size value representations;
6. the root value equals the desired aggregate of the original bounded witness structure.

### Body

The root aggregate is deterministically polynomial-time computable.

### Witness

Topologically evaluate each node once.

Polynomial nodes × polynomial local work gives polynomial total work.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-230 — a polynomial-size aggregate circuit can bypass full Q-RESIDUAL materialization

### Body

The recurrence graph in `IA-229` need not contain one node for every Q-RESIDUAL class.

It only needs to compute the desired aggregate exactly.

### Consequence

A polynomial-size exact OR/min/sum-style computation can be a different sufficient topology from:

```text
explicit residual quotient propagation.
```

### Support

DP objective-sufficiency distinction.

### Firewall

The graph must be independently constructible and exact; it cannot use the unknown root answer as a node annotation.

### Disposition

ADMITTED EXACT.

---

## IA-231 — polynomial explicit Q-RESIDUAL quotient is one special recurrence DAG

### Premises

Q-RESIDUAL classes and transitions are polynomially accessible and polynomial in number.

### Body

The quotient transition graph itself supplies a polynomial-size recurrence graph for:

- Q-EXISTS via OR;
- Q-MIN via MIN/+1;
- Q-COUNT via the exact disjoint recurrence.

### Support

`IA-069/070`, aggregate recurrences.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-232 — aggregate-circuit compression can be strictly different from identity compression

### Body

An aggregate recurrence may combine subproblems algebraically without declaring the underlying residual objects SAME.

Therefore:

```text
aggregate common-subexpression/factorization
    !=
NEI identity collapse.
```

### Example shape

Two distinct child continuation sets may contribute to one OR node:

```text
H_exists(X UNION Y)
```

without:

```text
X=Y.
```

### Disposition

ADMITTED EXACT.

---

## IA-233 — quotienting, dominance pruning, hitting sets, and aggregate circuits are distinct sufficient topologies

### Four mechanisms

1. **Identity quotient**

```text
merge exact SAME residuals.
```

2. **Dominance pruning**

```text
remove continuation-language subsets.
```

3. **Witness hitting set**

```text
test polynomially many representative witnesses.
```

4. **Aggregate recurrence circuit**

```text
compute terminal aggregate without preserving the full residual object family.
```

### Body

No pair is definitionally identical to another.

Each has its own exact support obligations.

### Support

- quotient: A4/A8;
- dominance: A14;
- hitting set: `IA-160..162`;
- aggregate DAG: `IA-229..232`.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-234 — the continuation language is a complete common semantic source for these four routes

### Body

All four mechanisms can be viewed as transformations of the same exact object family:

```text
C_p.
```

- equality of `C_p` gives NEI residual identity;
- inclusion between `C_p` gives dominance;
- chosen accepting members of `C_root` give hitting witnesses;
- homomorphic images of `C_p` give aggregate values.

### Significance

This common source allows DP to compare alternative factorizations without conflating their identities.

### Disposition

ADMITTED EXACT.

---

# A15 central result

The primitive P-vs-NP residual now has an exact algebraic center:

```text
continuation-language family
```

with four different ways to avoid explicit exhaustive search:

```text
equality compression
order/subsumption compression
representative-witness compression
algebraic aggregate compression.
```

The next DP question is not restricted to finding a small identity quotient.

It can search for any independently justified primitive law that makes one of these four topologies polynomially accessible.

# P-vs-NP status

OPEN.
