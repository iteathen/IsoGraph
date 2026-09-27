# P versus NP — DP 0.8 over implicit-assertion closure 0.2

**Status:** experimental discovery synthesis; no P-vs-NP resolution  
**Primitive input:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**NEI input:** `P_VS_NP_NEI_OVERLAY_0_4.isg`  
**Implicit state:** A0 + corrected A1 + A2-A20  
**Machine index:** `IMPLICIT_ASSERTION_INDEX_0_5.json`  
**Indexed admitted assertions:** 301  
**Missing support references:** 0  
**Support cycles:** 0

## 1. Terminal residual remains one primitive operation

The expanded closure does not change the terminal question.

It sharpens it to:

```text
Given functional-polynomial V(x,w)
with polynomially bounded w,

compute

    E(x) = exists w V(x,w)

by a functional-polynomial realization.
```

All high-level routes must connect exactly to this residual or to an equivalent terminal statement.

---

# 2. The continuation-language family is the common semantic center

For a residual prefix `p`, let:

```text
C_p
```

be its exact accepting-continuation language.

The assertion closure now shows that several previously separate search strategies are transformations of this same object.

```text
Q-RESIDUAL identity:
    C_p = C_q

continuation dominance:
    C_p subseteq C_q

Q-EXISTS:
    nonempty(C_p)

Q-MIN:
    minimum accepted continuation length

Q-COUNT:
    |C_p|

hitting witness:
    choose one member of C_root

rejection invariant:
    prove C_root = empty

aggregate circuit:
    compute a homomorphic image of C_root.
```

This common source is the right DP comparison surface.

---

# 3. Three burdens recur across every currently established polynomial route

Inside the **declared current candidate space** of established sufficient topologies, every route that yields deterministic polynomial decision discharges three distinct burdens.

## S — semantic sufficiency / soundness

The compressed object must preserve enough exact structure for the declared Boolean target.

Examples:

- SAME is exact future equality;
- dominance is exact inclusion;
- hitting set intersects every nonempty accepting set as promised;
- upper abstraction contains all concrete futures;
- invariant really excludes positive terminal reachability.

## K — polynomial compactness

The retained representation/frontier/certificate/recurrence graph must remain polynomially bounded.

Examples:

- polynomial quotient width;
- polynomial dominance antichain;
- polynomial hitting set;
- polynomial aggregate DAG;
- polynomial rejection invariant.

## A — polynomial accessibility

The compressed structure must be constructible, identifiable and operable in polynomial time.

Examples:

- class identity/canonicalization;
- dominance certificate;
- hitting-set construction;
- recurrence-DAG construction;
- invariant construction;
- abstract-cover refinement.

The closure repeatedly falsifies:

```text
S + K without A
    -> polynomial algorithm.
```

Examples include Q-EXISTS and Q-MIN: tiny semantic ranges, but universal exact access is equivalent in strength to the original existential-closure problem.

This `S/K/A` view is a DP analysis schema only, not a new Core primitive.

---

# 4. Exact complete semantic comparisons are often circular at universal scope

The following universal polynomial capabilities are already equivalent in strength to the unresolved closure:

```text
exact Q-EXISTS classification
exact Q-MIN value
exact Q-RESIDUAL SAME/DISTINCT
exact continuation dominance
canonical accepting witness/NONE construction.
```

Therefore a proposed solution that says only:

```text
compute the exact semantic object
then use it to decide
```

has merely renamed the target.

This is now a strong falsifier.

---

# 5. Sound incomplete structure escapes that circularity test

The most important surviving opening is one-sided or incomplete structure.

Examples admitted by the closure:

```text
Dhat(p,q) -> true continuation dominance

J(p)=J(q) -> true Q-RESIDUAL SAME

lower approximation Lw subseteq C_root

upper approximation C_root subseteq U

partial hitting set with a separately proved coverage theorem

bounded separator/factorization

local monotone/canonical witness law.
```

These relations do **not** need to decide every exact semantic comparison.

They only need enough exact facts to keep the retained support polynomial while preserving the terminal objective.

This distinction is load-bearing:

```text
complete semantic oracle
    may be equivalent to the problem

sound incomplete law
    may still be cheap and useful.
```

---

# 6. Dominance is a larger search space than identity

NEI equality is the symmetric kernel of continuation dominance:

```text
SAME(p,q)
IFF
p <=F q
AND
q <=F p.
```

But for existential acceptance, one direction is enough to remove a branch:

```text
p <=F q
    ->
p can be discarded while q remains.
```

Therefore discovery restricted to SAME/deduplication can miss useful one-way reductions.

The exact maximal dominance antichain may be much smaller than the NEI class count.

At the same time, exact universal dominance testing is circular in the universal case.

So the high-value target is:

> Find **cheap sound sufficient conditions for dominance**, not a universal complete dominance oracle.

Examples of candidate primitive causes to test:

- constraint implication;
- monotonicity;
- set containment;
- interval/order domination;
- stronger residual resource state;
- canonical closure containing another residual's closure;
- exact simulation relation.

These are search prompts, not admitted facts for arbitrary verifiers.

---

# 7. Objective identity versus compositional identity

The identity closure distinguishes:

```text
Q-EXISTS:
    <= 2 semantic classes
    exact terminal objective
    generally not right-congruent

Q-RESIDUAL:
    exact future-language identity
    right-congruent
    potentially large

GLOBAL:
    full object identity.
```

Thus the smallest terminal quotient is too coarse for ordinary local propagation.

The coarsest right-compositional exact quotient is Q-RESIDUAL.

A new opportunity remains between those extremes:

> preserve only the composition law actually required by the chosen algorithm.

Aggregate identities already demonstrate this:

```text
Q-EXISTS composes by OR
Q-MIN    composes by MIN/+1
Q-COUNT  composes by SUM.
```

So DP should not demand right congruence when an exact aggregate homomorphism is enough.

---

# 8. Aggregate compactness is not aggregate accessibility

The closure gives exact compact aggregate ranges:

```text
Q-EXISTS:
    two values

Q-MIN:
    O(poly(n)) possible values

Q-COUNT:
    polynomially many bits per exact value.
```

Yet access may remain hard.

The useful target is therefore not:

```text
find a small output range.
```

It is:

```text
find a polynomial-size independently constructible recurrence/factorization
whose local operations compute that aggregate exactly.
```

This is the aggregate-circuit route.

---

# 9. Hitting-set/search route is structurally different

Universal decision is equivalent in strength to universal witness/NONE construction.

But restricted families may admit independently constructible small hitting sets.

The exact sufficient law is:

```text
polynomially construct H(x)

such that

C_root != empty
    ->
H(x) intersects C_root.
```

Then verify every member of `H`.

This route need not build:

- a residual quotient;
- a dominance order;
- a full aggregate circuit.

High-value candidate sources include exact:

- canonical witnesses;
- symmetry representatives;
- monotone extremal witnesses;
- algebraic normal forms;
- bounded family representatives.

Again, none is assumed universal.

---

# 10. Negative-invariant route should remain separate

YES and NO have different direct evidence shapes:

```text
YES:
    one accepting witness

NO:
    prove C_root empty.
```

A compact rejection invariant can compress the NO-side universal burden.

But existence of short positive and negative certificates alone is not a deterministic algorithm.

The high-value condition is **constructible exact polarity evidence**, not mere certificate existence.

DP should therefore preserve:

```text
positive witness routes
negative invariant routes
```

as distinct sufficient topologies.

---

# 11. Factorization/separator route survives every circularity filter so far

The generic exact law:

```text
condition on small separator
    ->
independent residual blocks
```

can turn one existential problem into smaller projected problems.

If:

- separator state count is polynomial;
- local projections are polynomial;
- decomposition is polynomially constructible;

then deterministic DP follows.

This route does not require a universal exact residual-identity oracle.

It remains one of the strongest non-circular candidate families generated by the current assertion closure.

---

# 12. Reduction transport is useful after structure is established, not before

Exact primitive transport now gives:

```text
A <=p B
AND
A not functional-poly
    ->
B not functional-poly.
```

So a separation proof may begin on a structurally convenient branching relation.

But reductions do not automatically transport:

- NEI width;
- dominance width;
- separator structure;
- symmetry;
- aggregate factorization.

Thus:

```text
discover structural law on convenient problem
    ->
prove actual lower/upper result
    ->
then use reduction transport.
```

Do not assume the structural law survives the reduction.

---

# 13. Equality-side and separation-side burdens remain asymmetric

## Equality route

It is enough to prove a **universal** elimination theorem for bounded existential projection.

A structural theorem saying every polynomial verifier admits a polynomially accessible exact compression would suffice.

## Separation route

Showing one particular compression topology fails—even all currently catalogued topologies—does not prove separation unless those topologies are proved exhaustive for all functional polynomial algorithms.

The current candidate-space list is explicitly not exhaustive.

Therefore:

```text
failure of quotienting
+ failure of dominance
+ failure of hitting sets
+ failure of aggregate circuits
    !=
P != NP.
```

A separation result needs a model-wide lower bound or another exact bridge covering every functional-polynomial realization.

This is a critical falsifier against architecture-specific lower-bound claims.

---

# 14. Highest-value non-circular discovery targets

The expanded closure points to five particularly direct target families.

## T1 — sound local dominance law

Find a polynomially checkable condition:

```text
Dhat(p,q)
    ->
C_p subseteq C_q
```

that produces polynomial frontier covers on the target family.

## T2 — polynomial sufficient statistic / bounded separator

Find exact `S(x,p)` or separator state such that:

```text
future truth factors through S
```

and the reachable range is polynomial and accessible.

## T3 — polynomial hitting-set constructor

Construct polynomially many candidate witnesses guaranteed to hit every nonempty accepting set.

## T4 — polynomial exact aggregate recurrence DAG

Build a polynomial-size recurrence for OR/MIN/another exact target aggregate without enumerating the witness tree.

## T5 — constructible negative invariant plus positive witness mechanism

Build exact polynomial polarity evidence with a polynomial selection/construction method.

These targets all have a direct connector to the primitive truth residual.

---

# 15. What not to count as progress

The closure now rejects these as stand-alone solution claims:

```text
the answer is only one bit

Q-EXISTS has two classes

Q-MIN has polynomial range

a small exact quotient exists

a unique witness exists

both polarities have short certificates

two problems polynomially reduce to one another

a restricted lower-bound method fails

a semantic identity relation can be defined.
```

Each lacks at least one load-bearing support obligation.

---

# 16. New DP synthesis — accessible compression, not maximum compression

The recurring error pattern is to seek the **coarsest possible semantic quotient**.

The closure instead suggests:

```text
best discovery object
    may be a finer / incomplete / one-sided representation
    whose exact facts are cheap to obtain.
```

Examples:

- finer but computable invariant instead of exact NEI quotient;
- sound dominance under-approximation instead of exact dominance;
- tractable separator state instead of minimum residual identity;
- sound upper/lower abstractions instead of exact continuation language.

This is directly analogous to the IsoMax lesson:

```text
semantic minimum
    !=
best operational representation.
```

For P-vs-NP, the valuation metric is not speed of one implementation yet; the immediate issue is whether the support can be constructed within polynomial resources at all.

---

# 17. No terminal theorem

This DP pass does not establish:

```text
P = NP
```

or:

```text
P != NP.
```

It does establish a much tighter search discipline.

The most promising current structural seam is:

```text
cheap sound incomplete structure
    +
polynomial retained support
    +
exact target preservation.
```

The next experiments should use known polynomial bounded-existential problems as positive controls and ask which of T1–T5 the primitive graph recovers **without being told the known algorithm**.

Only mechanisms recovered blind and surviving falsifiers should be projected toward harder targets.
