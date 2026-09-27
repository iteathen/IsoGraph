# P versus NP primitive bundle — DP 0.8 discovery run 0.1

**Status:** experimental Discovery Protocol result; no P-vs-NP resolution  
**Primitive input:** `P_VS_NP_PRIMITIVE_BUNDLE_0_2.isg`  
**Primitive closure audit:** `P_VS_NP_PRIMITIVE_BUNDLE_0_2_AUDIT.md`  
**Discovery procedure:** experimental DP 0.8 candidate at blob `46b94fe4cbd407d6d690980604fe5eb854220f67`

High-level names in this document are explanatory discovery views only.

No high-level name is fed back into the primitive support.

---

# 1. Declared objective

The primitive objective is the top universal implication already represented in the native bundle:

```text
for every raw unary relation L on finite bit lists:

    branching polynomial realization of L
        ->
    functional polynomial realization of L.
```

Required externally visible behavior:

```text
same truth value L(x)
for every admissible input x.
```

Not required:

- same control identities;
- same symbol identities;
- same transition relation;
- same number of states;
- same bound polynomial;
- same accepting path;
- same intermediate configurations;
- same proof topology.

This objective scope matters for sufficiency.

---

# 2. First counterfactual: same-machine determinization is overconstrained

A tempting route is:

```text
take the branching transition relation D
and delete choices until D is functional.
```

That is **not** the primitive objective.

The consequent existentially quantifies an entirely new witness:

```text
new finite control list
new alphabet list
new transition relation
new polynomial bound.
```

Only the extensional relation `L` is shared.

Therefore:

```text
preserve the original branching machine's internal topology
    = NONESSENTIAL_FOR_SUFFICIENCY
      of the declared terminal objective.
```

This does not say machine-preserving determinization is impossible or useless.

It says it is a stronger search constraint than P-versus-NP itself requires.

---

# 3. Branching is finite and input-independent

For one antecedent witness:

- the control list is finite;
- the symbol list is finite;
- the transition extension is typed inside their finite product;
- the transition relation is fixed for the language, not rebuilt per input.

Therefore for every current control/symbol pair there are only finitely many admissible transition tuples.

Let the maximum local branching multiplicity be `b`.

For the fixed witness:

```text
b = constant with respect to input length.
```

No complexity assumption is needed for this conclusion.

---

# 4. A branch is a polynomial-length choice object

For input `x`, the primitive witness supplies a polynomially bounded step limit `T(|x|)`.

Any accepting computation consists of at most:

```text
T(|x|)
```

local transition selections.

Because the local choice set is finite and fixed, each selection can be represented by a constant-size index over the fixed transition table.

Hence an accepting path has a description of size:

```text
O(T(|x|)).
```

Since `T` is polynomially bounded:

```text
accepting branch description length
    is polynomially bounded in |x|.
```

This is an exact implicit consequence of the primitive graph.

---

# 5. Path verification is deterministic and polynomially bounded

Given:

- input `x`;
- the fixed branching realization;
- a candidate sequence of local choices of length at most `T(|x|)`;

one can check, step by step:

1. the primitive initial configuration;
2. that each selected raw transition tuple matches the current control/symbol values;
3. the primitive left/right tape-update clauses;
4. the next configuration;
5. that the final reached control identity is the positive terminal identity;
6. that the sequence length is within the primitive bound.

The fixed transition table contributes only constant-size local lookup work.

The tape region reachable in `T` steps grows by at most one cell per step from the initialized finite input region.

Therefore the full verification can be implemented within polynomial time in:

```text
|x| + T(|x|).
```

No search over alternate branches is required once the choice sequence is supplied.

---

# 6. Exact alternate factorization: branching -> bounded existential projection

The antecedent therefore admits a derived exact factorization:

```text
L(x)
    IFF
exists w:
    SIZE(w) <= polynomial(|x|)
    AND
    V(x,w),
```

where:

```text
V
```

is deterministically polynomial-time decidable.

This is the certificate/verifier presentation, recovered from the primitive transition structure rather than supplied as a starting abstraction.

Conversely, a polynomially bounded witness relation with deterministic polynomial verifier can be implemented by a branching realization that guesses the witness and verifies it.

Thus the two presentations are alternative sufficient topologies for the antecedent.

This is standard complexity theory and is **not claimed as a new theorem**.

---

# 7. Primitive residual

After the factorization above, the difference between antecedent and consequent is no longer best described as:

```text
nonfunctional transition relation
versus
functional transition relation.
```

The sharper logical residual is:

```text
bounded existential projection.
```

The unresolved implication becomes:

```text
if V(x,w) is deterministically polynomial-time decidable
and w has polynomially bounded size,

is the unary relation

    L(x) := exists w V(x,w)

always deterministically polynomial-time decidable?
```

This is an exact reformulation of the represented truth question.

In discovery language:

```text
P versus NP
    =
closure question for deterministic polynomial computation
under polynomially bounded existential projection.
```

Again, this is a structural reformulation, not a resolution.

---

# 8. Minimum-sufficient-support consequence

Relative to the declared truth objective, the following structures are not intrinsically required once an exact certificate projection is available:

```text
particular branching-machine state identities
particular transition-table decomposition
particular accepting path object
SAT
Cook-Levin
circuit lower bounds
relativization barrier nodes
Natural-Proofs nodes
algebrization nodes.
```

They remain valuable:

- proof routes;
- controls;
- discovery views;
- falsifiers.

But none is part of the minimum-shaped semantic statement produced by the primitive support.

No global minimum proof claim is made.

---

# 9. Positive boundary control: polynomially many witnesses

Suppose, for a particular derived witness representation, the total number of admissible witnesses for each input is polynomially bounded:

```text
#W(x) <= q(|x|)
```

for some polynomial `q`.

Then deterministic enumeration plus the polynomial verifier decides:

```text
exists w in W(x): V(x,w)
```

in polynomial time.

Therefore bounded existential projection is trivially eliminable when the **number of candidates**, rather than merely the length of each candidate, is polynomial.

For a fixed finite witness alphabet, witness length `O(log n)` is one familiar sufficient special case.

This is a positive control.

---

# 10. Falsifier: polynomial witness length is not enough for enumeration

A polynomial length bound:

```text
|w| <= n^k
```

permits exponentially many possible witnesses:

```text
c^(n^k)
```

for fixed alphabet size `c > 1`.

Therefore:

```text
polynomial witness length
    !=
polynomial enumeration count.
```

The naive exhaustive determinization route does not close the residual.

---

# 11. Second positive control: polynomial residual-state width

Consider a verifier processed as a sequence of witness choices.

For a fixed input, suppose all reachable verifier states after every witness prefix can be represented by at most:

```text
q(|x|)
```

residual classes, where:

- `q` is polynomial;
- class identity is deterministically polynomial-time computable;
- successor classes for each next witness symbol are deterministically polynomial-time computable;
- acceptance depends only on the final residual class.

Then deterministic dynamic propagation of reachable residual classes decides whether an accepting witness exists in polynomial time.

So:

```text
polynomial efficiently-computable residual width
    ->
bounded existential projection eliminable
for that verifier family.
```

This is a general sufficient condition, not a necessary condition.

It is a structural restatement of familiar finite-state/dynamic-programming compression and is not claimed novel.

---

# 12. Important firewall: small quotient existence != usable quotient

One could define two witness prefixes as equivalent when exactly the same suffixes can lead to acceptance.

That quotient is semantically natural.

But:

```text
existence of a small quotient
    !=
polynomial-time computability of quotient identity

existence of quotient transitions
    !=
polynomial-time ability to construct them.
```

A quotient that can only be recognized by already solving the original existential problem is circular.

Therefore every quotient-based lead must keep separate:

```text
Q_size
Q_identity_cost
Q_transition_cost
Q_construction_provenance.
```

This is a direct Core/DP anti-circularity requirement.

---

# 13. Central QU after DP

The primitive graph no longer leaves the location of the mathematical unknown diffuse.

The unresolved structure is:

```text
when can a polynomially bounded existential choice
be eliminated without exponential support expansion?
```

More formally:

```text
QU-EXISTS-ELIM

Given polynomial-time decidable V(x,w)
and polynomial witness bound p(|x|),

find conditions sufficient to construct
a deterministic polynomial-time decider for

    exists w, |w| <= p(|x|) and V(x,w),

without assuming the answer.
```

A universal construction would resolve the represented equality direction.

A counterexample lower bound strong enough to prove one such projection outside deterministic polynomial time would resolve separation.

Neither is currently established.

---

# 14. New campaign search topology

The primitive graph suggests a more focused campaign than the earlier circuit-first path.

## Track A — exact existential elimination laws

Render successful polynomial-time problems that initially present as bounded existential search and determine which primitive structure permits elimination.

Candidate structural dimensions include:

- polynomial candidate count;
- polynomial residual width;
- decomposability;
- bounded interaction width;
- monotonicity/closure;
- algebraic aggregation;
- canonical witness collapse;
- symmetry quotient with efficient transporter;
- local consistency implying global consistency.

Do not assume any dimension generalizes.

## Track B — falsifying controls

Use bounded existential problems where the obvious elimination fails, while preserving exact reasons for failure.

## Track C — NP-complete discovery view

Only after the elimination laws are represented primitively should SAT or another complete problem be used as a high-level stress target.

This keeps the discovery direction:

```text
primitive law
    -> high-level target
```

rather than teaching the primitive graph SAT-specific structure.

---

# 15. Relation to known barriers

Relativization, Natural Proofs and algebrization are not deleted.

They move to the correct place:

```text
candidate existential-elimination method
    ->
classify its proof topology
    ->
apply relevant barriers.
```

No barrier is part of the primitive truth statement itself.

---

# 16. Novelty status

This run does **not** claim a new complexity-theory theorem.

Recovered exact/standard structure:

- bounded computation branch -> polynomial certificate;
- certificate/verifier formulation;
- P-versus-NP as bounded existential-projection closure;
- polynomial candidate count as an easy positive case;
- polynomial explicit residual-state space as an easy dynamic-programming case.

Potentially useful IsoGraph contribution:

```text
the primitive rendering localizes the entire terminal residual
to one logical operation
without carrying the historical proof-route machinery into the truth core.
```

That is a representation/discovery result.

---

# 17. Next DP unit

Build a small set of **known polynomial-time existential problems** and render them down to the same primitive `exists w V(x,w)` form.

For each, recover the exact elimination mechanism without naming it in advance.

Then compare the recovered primitive mechanisms.

The immediate question is:

```text
which structural laws repeatedly permit
bounded existential projection
to collapse back into deterministic polynomial computation?
```

Any proposed common law must be tested against falsifiers before being projected toward an NP-complete target.
