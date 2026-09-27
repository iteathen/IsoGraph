# P versus NP — DP 0.8 run after implicit-assertion closure 0.2

**Status:** experimental discovery synthesis; no P-vs-NP resolution  
**Primitive input:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**Implicit assertion index:** `IMPLICIT_ASSERTION_INDEX_0_5.json`  
**NEI overlay:** `P_VS_NP_NEI_OVERLAY_0_3.isg`  
**QU authority:** qualified QU 0.1  
**NEI authority:** qualified NEI 0.4

## 1. Primitive residual remains bounded existential projection

The expanded assertion closure confirms:

```text
branching polynomial realization
    <->
polynomially bounded existential projection
of a functional-polynomial verifier.
```

No additional semantic burden is required by the terminal theorem.

## 2. Sequential quotient search is saturated at Q-RESIDUAL

Implicit closure proves:

```text
Q-RESIDUAL
```

is the coarsest exact equivalence that is simultaneously:

- right-congruent under next witness symbols;
- terminal-acceptance preserving.

Therefore no strictly coarser exact local Markovian quotient exists under the same architecture.

### DP consequence

Stop searching for:

```text
"an even coarser exact residual equivalence"
```

while keeping the same:

```text
state × symbol -> state
```

execution shape.

That search space is closed by `IA-177..185`.

## 3. Terminal-observable identity is trivial in width but hard in access

Q-EXISTS retains only:

```text
does some accepting continuation exist?
```

It has at most two semantic classes.

But classification is exactly the bounded existential decision problem.

Therefore:

```text
minimum semantic class count
    !=
algorithmic accessibility.
```

This is the strongest warning against treating "entropic compression" as sufficient by itself.

## 4. Full future identity and final observable identity form opposite endpoints

```text
Q-EXISTS:
    maximally coarse for final Boolean observable
    noncongruent
    access = original problem

Q-RESIDUAL:
    coarsest exact right congruence
    compositional
    potentially large
    identity access universally as hard as existential closure.
```

The useful solution structure, if any, must exploit **additional law** rather than simply choosing one endpoint.

## 5. Candidate solution architectures surviving the implicit closure

### A — canonical/hitting witness route

Find a polynomially enumerable set `H(x)` such that:

```text
if any witness accepts,
one member of H(x) accepts.
```

Special cases already admitted:

- one dominating canonical witness;
- monotone TOP/BOTTOM collapse;
- polynomial canonical image;
- symmetry orbit representatives.

This route does not require constructing the full residual quotient.

### B — factorization/separator route

Find exact decomposition:

```text
global existence
    ->
polynomial many separator states
    +
independent/local projected subproblems.
```

Then dynamic programming over separator states may decide existence.

### C — polynomial sufficient statistic

Find polynomial-time statistic with polynomial range preserving enough acceptance structure.

Any statistic sufficient for **all future suffix observations** refines Q-RESIDUAL and cannot beat its semantic width.

A statistic sufficient only for a coarser objective may be smaller but must supply its own exact composition law.

### D — target-specific cheap NEI identity

A restricted verifier family may have an independently provable exact residual identity law that is polynomially computable.

Universal cheap identity is as hard as the original problem, but domain-specific identity can still be useful.

### E — nonlocal/global elimination

Use algebraic, aggregation, canonicalization or other structure that does not instantiate the local sequential quotient architecture.

This is where a genuinely coarser exact computation may live.

## 6. Common requirement across surviving routes

Every surviving route must provide an exact bridge of the shape:

```text
exponential/large witness space
    ->
polynomially manageable exact support
```

without choosing that support using the desired answer.

The reduction may operate on:

- witness set;
- witness identities;
- sufficient summaries;
- separators;
- algebraic aggregate;
- canonical witness.

But the support must be:

```text
exact
constructible/accessibly represented
polynomially manageable
independently grounded.
```

## 7. New high-value DP search target

The most useful generic question after closure is:

> What primitive structural property of a verifier supplies a polynomially manageable exact support for the OR/existence aggregate without requiring universal residual identity?

This is narrower than:

```text
"find a P=NP algorithm."
```

It can be tested on known polynomial-time existential problems before applying it to complete problems.

## 8. What implicit closure ruled out as standalone solutions

The following do not suffice universally by themselves:

```text
polynomial witness length
small terminal-observable quotient
semantic existence of a small quotient
state isomorphism without identity authority
hash/fingerprint collisions
unique natural witness identity without constructor/access method
coarser-than-Q-RESIDUAL local congruence
blind quantifier reordering
scope-dropping NEI merges
QU restriction chosen to force SAME.
```

## 9. No truth update

Nothing in the implicit closure establishes either:

```text
P = NP
```

or:

```text
P != NP.
```

The value of the closure is that the open search space is now substantially better factored and several false shortcuts are excluded exactly.

## 10. Next experiment class

Before returning to SAT, use positive controls where a bounded existential projection is known to be polynomial and ask DP to recover, from primitive rendering alone, which admitted elimination law applies:

```text
canonical witness
monotonicity
factorization
separator
sufficient statistic
small accessible residual quotient
hitting set
another exact structure.
```

Then compare the primitive laws, not their textbook names.

Any new common law goes back through:

```text
implicit-assertion admission
-> NEI
-> DP
```

before being projected toward a complete problem.
