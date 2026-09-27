# P versus NP implicit-assertion pass A4 — NEI residual identity closure

**Status:** admitted exact implicit assertions, round 4  
**Premise state:** A0 + corrected A1 + A2 + A3 + qualified NEI 0.4 + qualified QU 0.1  
**Identity overlay:** `P_VS_NP_NEI_OVERLAY_0_2.isg`  
**Support mode:** EXACT throughout unless marked conditional

---

## IA-039 — NEI SAME is an equivalence relation inside one fixed exact query family

### Scope

One fixed:

- identity carrier;
- query scope;
- exact evidence state;
- QU state where applicable;
- admissible identity-model family.

### Body

The derived relation:

```text
A ~ B
IFF
NEI(A,B)=SAME
```

is reflexive, symmetric and transitive over subjects admitted by that one fixed query family.

### Support

NEI 0.4 defines every admissible model with an identity **equivalence relation**.

SAME means every admissible model coidentifies the pair.

The intersection of equivalence relations over one common carrier/model family remains an equivalence relation.

### Firewall

Do not compose SAME results taken from different scopes/model families as though they were one relation.

**Disposition:** ADMITTED EXACT.

---

## IA-040 — exact residual continuation equality implies scoped SAME

### Scope

`Q-RESIDUAL` future-acceptance identity context.

Let `R_p` and `R_q` be two residual objects at the same:

- input;
- witness depth;
- remaining resource bound;
- verifier/transition authority.

### Premise

Exact closure establishes:

```text
for every admissible suffix s:

    C_p(s) IFF C_q(s).
```

### Body

```text
NEI_scope(R_p,R_q)=SAME.
```

### Support

In this query context the natural object being compared is the exact future-acceptance quotient.

The premise proves equality of that quotient object and eliminates every admissible DISTINCT model for the scoped query.

### Global firewall

This does not establish:

```text
prefix p = prefix q
```

or global natural identity of the underlying serialized residuals.

**Disposition:** ADMITTED EXACT, scoped.

---

## IA-041 — one exact distinguishing continuation forces scoped DISTINCT

### Scope

Same `Q-RESIDUAL` context as `IA-040`.

### Premise

There exists one admissible suffix `s` such that:

```text
C_p(s) != C_q(s).
```

### Body

```text
NEI_scope(R_p,R_q)=DISTINCT.
```

### Support

Equality of future-acceptance quotient objects would require agreement on every admissible suffix.

The exact distinguishing suffix eliminates all scoped SAME models.

**Disposition:** ADMITTED EXACT, scoped.

---

## IA-042 — QU-dependent continuation variation yields NEI UNKNOWN when both outcomes remain admissible

### Premise

A qualified nonempty QU realization family contains:

- at least one admissible realization in which residuals have the same future quotient;
- at least one admissible realization in which they have different future quotients.

### Body

```text
NEI_scope(R_p,R_q)=UNKNOWN.
```

### Support

Direct qualified NEI 0.4 admissible-model semantics.

### Firewall

This is semantic UNKNOWN, not incomplete representation.

**Disposition:** ADMITTED EXACT.

---

## IA-043 — missing identity-relevant QU blocks residual classification

### Premise

An unresolved continuation relation can change whether two residuals have the same future quotient, but its:

- possibility universe;
- constraints;
- or closure authority

is missing.

### Body

The residual identity query is:

```text
INCOMPLETE / UNQUALIFIED.
```

It is not SAME, DISTINCT or semantic UNKNOWN.

### Support

Qualified NEI 0.4 + QU 0.1 fail-closed semantics.

**Disposition:** ADMITTED EXACT.

---

## IA-044 — global DISTINCT and scoped SAME are compatible

### Body

There is no contradiction in:

```text
global identity query:
    p and q are DISTINCT

future-acceptance quotient query:
    p and q are SAME.
```

### Support

- NEI 0.4 scoped-quotient discipline;
- query scope/model family is part of identity semantics;
- global constructor identity and future-behavior quotient identity ask different questions.

### Example shape

Two different same-length witness prefixes may have different primitive list fields while the verifier's future acceptance depends only on other retained state.

### Disposition

ADMITTED EXACT as a scope-separation theorem.

---

## IA-045 — scoped SAME supports substitution only through scope-factored consumers

### Premise

Consumer observable `F` factors entirely through the scoped quotient:

```text
F(x) = G(Q_scope(x)).
```

and:

```text
NEI_scope(a,b)=SAME.
```

### Body

```text
F(a)=F(b).
```

### Support

Scoped SAME gives equality of the quotient object under that query.

Ordinary equality substitution through `G` yields identical consumer output.

### Firewall

A consumer reading information outside the quotient scope is not covered.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-046 — exact residual identity collapse defines a valid deterministic propagation state

### Premises

For one verifier family and one witness depth `t`:

1. residual objects are partitioned by exact `Q-RESIDUAL` SAME;
2. verifier acceptance of every continuation is class-invariant by definition of the quotient;
3. successor residual class under one next witness symbol is well-defined.

### Body

Reachability can be propagated over identity classes rather than raw prefixes without changing existence of an accepting continuation.

### Support

- `IA-039`;
- `IA-040`;
- `IA-045`;
- existential reachability uses only future-acceptance behavior in this scope.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-047 — polynomial NEI residual width plus efficient quotient operations implies deterministic polynomial decision

### Premise schema

For input `x` with polynomial witness-depth bound `p(|x|)`, suppose:

1. at every depth `t`, reachable residuals have at most `q(|x|)` exact NEI SAME classes under `Q-RESIDUAL`;
2. `q` is polynomial;
3. class identity/canonicalization is deterministically polynomial-time computable;
4. successor class for each next witness symbol is deterministically polynomial-time computable;
5. the next-symbol alphabet is fixed finite or polynomially enumerable;
6. final acceptance is class-invariant;
7. the quotient construction is independent of the desired P-vs-NP conclusion.

### Body

The bounded existential projection has a functional deterministic polynomial realization.

### Witness

Layer-by-layer deterministic propagation:

```text
S_0 = {initial residual class}

S_{t+1}
    =
deduplicate_exact_NEI(
    successors(S_t, each next symbol)
)
```

At every layer:

```text
|S_t| <= q(n).
```

There are at most `p(n)` layers.

Each successor/canonicalization operation is polynomial.

A polynomial number of polynomial operations is polynomial.

### Soundness

`IA-046` ensures quotient propagation preserves acceptance existence.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-048 — one NEI residual class per depth collapses all existential branching at that depth

### Premise

At every witness depth:

```text
W_NEI(x,t) <= 1
```

and successor/class operations are efficiently computable.

### Body

There is at most one future-relevant residual state to propagate per depth.

The existential choice history has no remaining future-acceptance distinction after quotienting.

### Support

Specialization of `IA-047`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-049 — raw representation multiplicity does not lower-bound NEI residual multiplicity

### Body

A large or exponential number of raw witness prefixes does not imply the same number of exact future-relevant residual identities.

### Support

Different globally distinct raw objects may be scoped SAME (`IA-044`).

### Exact status

This is a non-implication statement.

It does not assert that large collapse actually occurs for every verifier.

### Disposition

ADMITTED EXACT.

---

## IA-050 — structural similarity does not upper-bound NEI residual multiplicity

### Body

Two syntactically/isomorphically similar residual representations need not be scoped SAME.

### Support

One exact admissible distinguishing suffix is sufficient for scoped DISTINCT (`IA-041`).

### Disposition

ADMITTED EXACT.

---

## IA-051 — identity computation cost is load-bearing for algorithmic compression

### Body

A small exact residual quotient is not sufficient for `IA-047` unless identity/class transition operations are themselves computable within the required polynomial bound.

### Support

`IA-047` algorithm uses those operations.

If computing class identity requires solving the original bounded existential projection, citing the quotient is circular and supplies no polynomial decision method.

### NEI authority

NEI 0.4 anti-circularity prohibits choosing identity/QU authority from the desired answer.

### Disposition

ADMITTED EXACT.

---

## IA-052 — desired compression cannot restrict QU to force SAME

### Forbidden shape

```text
want small residual quotient
    ->
remove QU realizations that distinguish residuals
    ->
derive SAME
    ->
claim polynomial quotient.
```

### Body

Such a SAME result is inadmissible and cannot support `IA-047`.

### Support

Qualified NEI 0.4 anti-circularity + QU authority preservation.

### Disposition

ADMITTED EXACT.

---

## IA-053 — equal computed language is not global realization identity

### Body

Two full computation realizations may have exactly the same extensional unary relation `L` while global natural identity of the realization objects remains unestablished.

### Support

NEI 0.4:

```text
structural/behavioral correspondence
    != automatic global SAME.
```

### Objective consequence

The primitive P-vs-NP consequent does not require global identity with the antecedent realization; only the same `L` is shared.

### Disposition

ADMITTED EXACT.

---

# A4 central result

The exact algorithmically relevant state space for a quotient-based elimination method is not:

```text
raw witness prefixes
```

but:

```text
exact future-acceptance NEI classes
```

**provided** their identity and transitions are efficiently computable under the untouched QU state.

This is now admitted as assertion lineage rather than remaining only a DP observation.

# Residuals after A4

Still open:

```text
whether every polynomial verifier has polynomial W_NEI
whether exact residual identity is always efficiently computable
whether one universal primitive law forces polynomial residual width
whether a hard language necessarily has superpolynomial exact residual width
```

No claim on those questions is admitted.

# Round-4 disposition

```text
new exact/conditional assertions admitted: 15
global identity overclaims admitted:         0
QU-driven merges admitted:                   0
probabilistic identity assumptions:          0
```
