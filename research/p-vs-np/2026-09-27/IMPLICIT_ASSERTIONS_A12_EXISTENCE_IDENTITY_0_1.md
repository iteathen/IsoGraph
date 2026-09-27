# P versus NP implicit-assertion pass A12 — existential-observable identity versus compositional identity

**Status:** admitted exact implicit assertions, round 12  
**Premise state:** A0 + corrected A1 + A2-A11  
**NEI scopes:** Q-RESIDUAL and Q-EXISTS

---

## IA-163 — every residual has one exact existential-continuation observable

### Define

For residual prefix `p`:

```text
E(p)
    :=
exists admissible remaining suffix s:
    C_p(s).
```

### Body

For one fixed verifier/input/remaining-bound scope, `E(p)` is one exact Boolean observable.

### Support

Bounded existential quantification over the represented continuation relation.

### Disposition

ADMITTED EXACT.

---

## IA-164 — Q-EXISTS identity has at most two exact classes

### Scope

Complete determinate Q-EXISTS query.

### Body

Two residuals are SAME iff:

```text
E(p)=E(q).
```

Since `E` is Boolean, the quotient has at most:

```text
{exists-accepting-continuation,
 no-accepting-continuation}.
```

Therefore:

```text
W_EXISTS(x,t) <= 2
```

at every depth.

### Native count interpretation

Use a complete representative list over the exact Q-EXISTS SAME relation.

### Disposition

ADMITTED EXACT.

---

## IA-165 — full residual SAME implies existential-observable SAME

### Body

```text
Q-RESIDUAL SAME(p,q)
    ->
Q-EXISTS SAME(p,q).
```

### Support

Full continuation equality implies equality of whether the continuation set is nonempty.

### Consequence

Q-RESIDUAL is a refinement of Q-EXISTS.

### Disposition

ADMITTED EXACT.

---

## IA-166 — Q-EXISTS can be strictly coarser than Q-RESIDUAL

### Exact witness shape

Let remaining suffix alphabet contain symbols `0,1`.

Construct residuals with:

```text
C_p(s) true exactly for suffix "0"
C_q(s) true exactly for suffix "1".
```

Then:

```text
E(p)=TRUE
E(q)=TRUE,
```

so Q-EXISTS says SAME.

But continuation relations differ, so Q-RESIDUAL says DISTINCT.

### Body

The refinement in `IA-165` can be strict.

### Disposition

ADMITTED EXACT EXISTENCE/COUNTERMODEL ASSERTION.

---

## IA-167 — Q-EXISTS is the coarsest exact quotient for the single existential observable

### Candidate space

Equivalence quotients whose only required observable is:

```text
E(p)
```

for the current residual.

### Body

Any exact quotient preserving that Boolean observable cannot merge:

```text
E=TRUE
```

with:

```text
E=FALSE.
```

But it may merge every pair sharing the same `E` value.

Therefore Q-EXISTS is the coarsest exact quotient for this single terminal observable.

### Minimum class count

Its complete representative-list length is minimum in that declared candidate space and is at most `2`.

### Scope firewall

This is not a compositional quotient claim.

### Disposition

ADMITTED EXACT MINIMUM CLAIM.

---

## IA-168 — Q-EXISTS is not generally a right congruence

### Countermodel

Use the residuals from `IA-166`:

```text
p accepts only suffix 0
q accepts only suffix 1.
```

At the current depth:

```text
E(p)=E(q)=TRUE,
```

so Q-EXISTS SAME.

Append symbol `0`:

```text
E(p·0)=TRUE
E(q·0)=FALSE.
```

Thus:

```text
p Q-EXISTS-SAME q
```

does not imply:

```text
p·a Q-EXISTS-SAME q·a.
```

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-169 — Q-EXISTS class transition is not well-defined in general

### Body

Because Q-EXISTS is not a right congruence, one Q-EXISTS class may contain representatives whose same-symbol successors land in different Q-EXISTS classes.

Therefore a deterministic local transition:

```text
Q-EXISTS-class × symbol -> Q-EXISTS-class
```

is not semantically well-defined without extra structure.

### Support

`IA-168`.

### Disposition

ADMITTED EXACT.

---

## IA-170 — Q-RESIDUAL preserves more information because compositionality requires it

### Body

Q-RESIDUAL distinguishes residuals by their entire continuation relation.

That stronger information supplies:

```text
right congruence
well-defined successor classes
acceptance invariance.
```

Q-EXISTS discards distinctions not needed for the final existential bit and therefore loses those generic composition guarantees.

### Support

- Q-RESIDUAL: `IA-069..071`;
- Q-EXISTS: `IA-168..169`.

### Disposition

ADMITTED EXACT STRUCTURAL COMPARISON.

---

## IA-171 — minimum terminal-observable width and minimum compositional width are different optimization problems

### Body

For one residual scope:

```text
minimum exact quotient for current E(p)
```

may have width at most `2`.

The minimum exact quotient supporting all future symbol transitions and future acceptance is Q-RESIDUAL and may be much larger.

Therefore:

```text
terminal-observable minimum
    !=
compositional-congruence minimum.
```

### Disposition

ADMITTED EXACT.

---

## IA-172 — computing Q-EXISTS identity is exactly the bounded existential decision problem

### Body

To classify one residual `p` into its Q-EXISTS class is to decide:

```text
E(p)
=
exists admissible suffix s:
    C_p(s).
```

Thus a universal polynomial Q-EXISTS classifier for polynomial verifiers is exactly a universal polynomial bounded-existential eliminator.

### Support

Definition of `E` plus `IA-036`.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE OF UNIVERSAL TASKS.

---

## IA-173 — the trivial two-class Q-EXISTS width does not yield a polynomial algorithm

### Body

Although:

```text
W_EXISTS <= 2,
```

the cost of deciding which of the two classes a residual belongs to is the original existential projection problem.

Therefore:

```text
small semantic quotient width
    !=
cheap quotient access.
```

### Support

`IA-164`, `IA-172`.

### Disposition

ADMITTED EXACT.

---

## IA-174 — Q-RESIDUAL width lower bounds apply only to future-compositional representations

### Body

`W_NEI` from Q-RESIDUAL lower-bounds exact representations whose state must preserve every future suffix-acceptance observation.

It does **not** lower-bound a representation that only preserves the current Boolean existential observable and obtains that observable by a non-compositional method.

### Support

`IA-140`, `IA-167`, `IA-171`.

### Disposition

ADMITTED EXACT SCOPE REFINEMENT.

---

## IA-175 — quotient coarseness, compositionality, and accessibility are three separate burdens

### Structural axes

For one identity/query design:

```text
COARSENESS:
    how many distinctions are retained?

COMPOSITIONALITY:
    can next-step behavior be computed from quotient state alone?

ACCESSIBILITY:
    can quotient membership/state be computed efficiently?
```

### Body

None of these axes implies the other two in general.

### Exact witnesses

- Q-EXISTS:
  - extremely coarse;
  - not generally compositional;
  - classification is existentially hard in the universal case.

- Q-RESIDUAL:
  - compositional;
  - semantically minimum among future-preserving congruences;
  - accessibility remains unresolved universally.

### Disposition

ADMITTED EXACT STRUCTURAL DECOMPOSITION.

---

## IA-176 — a coarser objective quotient can be valid even when unusable for local DP

### Body

DP 0.8 sufficiency and valuation must distinguish:

```text
semantic sufficiency for final observable
```

from:

```text
availability of a compositional execution strategy.
```

Q-EXISTS is semantically sufficient for the final residual existential bit but, without an external classifier, does not support generic local propagation.

### Disposition

ADMITTED EXACT.

---

# A12 central result

The identity layer now exposes three different notions that must not be collapsed:

```text
GLOBAL OBJECT IDENTITY

FULL FUTURE-BEHAVIOR IDENTITY (Q-RESIDUAL)

CURRENT EXISTENTIAL-OBSERVABLE IDENTITY (Q-EXISTS)
```

For P-vs-NP discovery:

```text
Q-EXISTS:
    width trivial
    access hard

Q-RESIDUAL:
    composition exact
    width/access potentially hard.
```

This corrects the temptation to treat one NEI quotient as universally optimal.

The relevant discovery question is now a tradeoff:

> Can we find an identity/statistic that is coarse enough to remain small, compositional enough to propagate, and accessible enough to compute?

No universal such construction is established.

# P-vs-NP status

OPEN.
