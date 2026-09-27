# P versus NP implicit-assertion pass A12 — objective identity versus compositional identity

**Status:** admitted exact implicit assertions, round 12  
**Premise state:** A0 + corrected A1 + A2-A11  
**NEI scopes:** `Q-RESIDUAL` and `Q-EXISTS`

---

## IA-163 — Q-RESIDUAL SAME implies Q-EXISTS SAME

### Body

For residuals `p,q` in the same fixed input/depth/resource scope:

```text
Q-RESIDUAL SAME(p,q)
    ->
Q-EXISTS SAME(p,q).
```

### Support

Q-RESIDUAL SAME gives:

```text
for every admissible suffix s:
    C_p(s) IFF C_q(s).
```

Taking existential quantification over the same suffix domain preserves equality:

```text
exists s C_p(s)
IFF
exists s C_q(s).
```

### Converse

Not generally valid.

**Disposition:** ADMITTED EXACT.

---

## IA-164 — Q-EXISTS has at most two exact classes

### Scope

One fixed input, verifier, depth, remaining resource bound, and qualified QU state.

### Body

The Q-EXISTS identity object is the Boolean:

```text
E(p)
    :=
exists admissible suffix s:
    C_p(s).
```

Therefore every residual belongs to one of at most two exact classes:

```text
E=TRUE
E=FALSE.
```

### QU note

If QU prevents exact determination of `E(p)`, classification may be UNKNOWN or INCOMPLETE rather than one determinate class.

The two-class bound is over determinate realizations/query models.

**Disposition:** ADMITTED EXACT.

---

## IA-165 — Q-EXISTS is strictly coarser than Q-RESIDUAL in general

### Exact witness pattern

Let witness alphabet contain symbols `0,1`.

At some depth with at least one remaining symbol, choose residual continuation relations:

```text
C_p(s)=TRUE
    iff
s begins with 0

C_q(s)=TRUE
    iff
s begins with 1.
```

Then:

```text
E(p)=TRUE
E(q)=TRUE,
```

so:

```text
Q-EXISTS SAME(p,q).
```

But suffix `0...` distinguishes them:

```text
C_p(0...)=TRUE
C_q(0...)=FALSE,
```

hence:

```text
Q-RESIDUAL DISTINCT(p,q).
```

### Disposition

ADMITTED EXACT COUNTEREXAMPLE.

---

## IA-166 — Q-EXISTS is not a right congruence under common witness extension

### Exact counterexample

Use the residuals from `IA-165`.

Initially:

```text
p ~exists q.
```

Append common symbol `0`.

Then:

```text
E(p·0)=TRUE
E(q·0)=FALSE.
```

Therefore:

```text
p·0
```

and:

```text
q·0
```

are Q-EXISTS DISTINCT.

### Body

In general:

```text
Q-EXISTS SAME(p,q)
```

does not imply:

```text
Q-EXISTS SAME(p·a,q·a).
```

### Disposition

ADMITTED EXACT.

---

## IA-167 — Q-EXISTS is sufficient for the terminal Boolean objective

### Objective

Only determine:

```text
does at least one accepting continuation exist from this residual?
```

### Body

Replacing a residual by any Q-EXISTS SAME residual preserves that terminal Boolean observable.

### Support

Definition of Q-EXISTS identity.

### Firewall

This says nothing about preserving:

- which suffix accepts;
- successor behavior;
- witness reconstruction;
- local transition structure.

### Disposition

ADMITTED EXACT objective-scoped.

---

## IA-168 — Q-EXISTS alone is insufficient as a local quotient transition state

### Body

A local layer-by-layer DP state normally requires:

```text
state identity
+ next-symbol
    ->
well-defined next state identity.
```

Q-EXISTS lacks this property in general because it is not a right congruence (`IA-166`).

### Consequence

Knowing only:

```text
E(p)
```

does not determine:

```text
E(p·a)
```

for each individual symbol `a`.

### Disposition

ADMITTED EXACT.

---

## IA-169 — Q-EXISTS obeys an existential Bellman recurrence

### Fixed-horizon scope

At nonterminal depth `t`, with finite next-symbol alphabet `A` and optional STOP/current observation:

```text
E_t(p)
=
CURRENT(p)
OR
OR_{a in A} E_{t+1}(p·a).
```

If STOP is encoded as one ordinary next symbol, `CURRENT` may be absorbed into that symbol case.

### Proof

Every accepting continuation is either:

- the current STOP/empty continuation; or
- begins with one next symbol `a` and has an accepting remainder.

Conversely, either case supplies an accepting continuation.

### Disposition

ADMITTED EXACT.

---

## IA-170 — the Q-EXISTS recurrence does not by itself remove exponential search

### Body

`IA-169` gives a local logical recurrence.

Naively evaluating it over the full witness tree can still visit exponentially many prefixes.

### Support

Fixed finite branching over polynomial depth permits exponentially many raw prefixes.

### Disposition

ADMITTED EXACT NON-IMPLICATION.

---

## IA-171 — a polynomial-time exact Q-EXISTS classifier would settle bounded existential projection

### Premise

There is a general deterministic polynomial procedure computing exact:

```text
E(p)
```

for arbitrary residual prefix `p` of every functional-polynomial verifier.

### Body

Every bounded existential projection is functionally polynomial.

### Witness

Apply the classifier to the empty/root prefix:

```text
E(empty)
IFF
exists witness w:
    V(x,w).
```

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-172 — a universal exact Q-EXISTS SAME/DISTINCT test is already equivalent to existential closure

### Premise

There is a general polynomial procedure deciding Q-EXISTS SAME/DISTINCT between arbitrary residuals.

### Reduction

For arbitrary projected verifier `V`, construct two residuals:

```text
p:
    E(p)=exists w V(x,w)

q:
    E(q)=FALSE
```

using the selector/dead-branch construction already used in `IA-079`.

Then:

```text
Q-EXISTS SAME(p,q)
IFF
NOT exists w V(x,w)

Q-EXISTS DISTINCT(p,q)
IFF
exists w V(x,w).
```

### Body

Universal polynomial exact Q-EXISTS identity testing implies EXISTS-CLOSURE.

The reverse follows trivially because each `E(p)` can then be computed and compared.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-173 — terminal two-class width is computationally misleading without access cost

### Body

Although Q-EXISTS has at most two semantic classes, this does not imply a two-state polynomial algorithm.

### Support

`IA-164` + `IA-171/172`.

The difficulty may reside entirely in determining which of the two classes a residual belongs to.

### Disposition

ADMITTED EXACT.

---

## IA-174 — compositional closure of Q-EXISTS is Q-RESIDUAL

### Define candidate family

Consider any family of same-depth equivalence relations `R_t` satisfying:

1. **terminal/objective preservation**

```text
p R_t q
    ->
E_t(p)=E_t(q);
```

2. **right congruence**

```text
p R_t q
    ->
for every next symbol a:
    p·a R_{t+1} q·a;
```

3. exact same fixed-horizon verifier/input/resource scope.

### Body

Every such `R_t` refines Q-RESIDUAL:

```text
p R_t q
    ->
Q-RESIDUAL SAME(p,q).
```

### Proof

Induct on remaining witness depth.

At terminal depth, objective preservation gives equality of the only continuation observation.

At earlier depth, repeated right congruence transports `R` along every suffix.

Terminal/objective preservation at the reached depth gives equal acceptance for that suffix.

Thus all suffix observations agree.

Use `IA-068`.

### Converse

Q-RESIDUAL itself satisfies:

- terminal objective preservation (`IA-163`);
- right congruence (`IA-069`).

### Conclusion

Q-RESIDUAL is the **coarsest exact right-congruence contained within / compatible with the terminal objective equivalence**.

### Disposition

ADMITTED EXACT MINIMUM/COARSEST CLAIM in the declared congruence candidate space.

---

## IA-175 — Q-RESIDUAL is the minimum-state exact compositional quotient

### Candidate space

All same-depth equivalence quotients that:

- preserve Q-EXISTS terminal truth;
- are right congruences under witness extension.

### Body

Every candidate quotient refines Q-RESIDUAL (`IA-174`).

Therefore its class count is at least the Q-RESIDUAL class count.

### Relation to prior result

This strengthens `IA-106/109` by replacing the stronger premise:

```text
preserve every future observation explicitly
```

with the operationally natural pair:

```text
preserve terminal objective
+
be compositional under next-symbol extension.
```

### Disposition

ADMITTED EXACT MINIMUM CLAIM in the declared candidate space.

---

## IA-176 — objective-minimal and compositional-minimal identities are different

### Body

For the same residual domain:

```text
Q-EXISTS
```

is the coarsest exact identity for the final Boolean objective.

```text
Q-RESIDUAL
```

is the coarsest exact identity that is also right-compositional under witness extension.

In general:

```text
Q-RESIDUAL refines Q-EXISTS
```

strictly.

### Support

`IA-163`, `IA-165`, `IA-174`.

### Disposition

ADMITTED EXACT.

---

## IA-177 — there is a three-level identity hierarchy in the campaign

### Levels

```text
GLOBAL OBJECT IDENTITY
    preserves full object identity

Q-RESIDUAL
    preserves every future continuation observation
    and is compositional

Q-EXISTS
    preserves only existence of at least one accepting continuation.
```

### Refinement direction

Where all scopes are aligned:

```text
global SAME
    -> Q-RESIDUAL SAME
    -> Q-EXISTS SAME.
```

Converses fail in general.

### Support

- object equality substitution;
- `IA-163`;
- `IA-165`;
- prior global/scoped identity examples.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-178 — loss of congruence pinpoints why the two-class quotient cannot be propagated locally

### Body

The obstruction to using Q-EXISTS as ordinary local DP state is not semantic insufficiency for the final answer.

It is exactly the missing right-congruence/compositional property.

### Support

- terminal sufficiency: `IA-167`;
- failure of right congruence: `IA-166`;
- compositional closure theorem: `IA-174`.

### Disposition

ADMITTED EXACT.

---

# A12 central result

The identity hierarchy is now precise:

```text
Q-EXISTS:
    minimal terminal-observable identity
    <= 2 classes
    non-compositional in general

Q-RESIDUAL:
    minimal exact compositional identity
    potentially many classes

GLOBAL:
    full object identity
    finer still.
```

This localizes a key tradeoff:

```text
coarser identity
    -> less semantic information
    -> harder/nonlocal composition

finer residual identity
    -> local compositionality
    -> potentially larger state width.
```

The next useful discovery question is therefore not simply:

```text
"Can we get fewer identity classes?"
```

It is:

```text
"Can we preserve enough composition to compute the terminal existential
observable while carrying less than the full Q-RESIDUAL quotient?"
```

That intermediate-composition question remains open.

# P-vs-NP status

OPEN.
