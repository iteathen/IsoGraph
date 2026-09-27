# P vs NP integrated system — DP 0.8 discovery run 0.1

**Status:** experimental discovery over the integrated 0.2 rendering; no authority effect  
**Input:** `P_VS_NP_INTEGRATED_0_2.isg`  
**Audit:** `P_VS_NP_INTEGRATED_0_2_AUDIT.md`  
**Discovery protocol:** DP 0.1–0.7 qualified stack + experimental DP 0.8 minimum-sufficient-support view

## Declared objective

### PNP-RESOLVE

Establish exactly one terminal class relation:

```text
P = NP

or

P != NP.
```

No explicit algorithm, separating language, circuit lower bound, proof style, or barrier-crossing certificate is part of the external objective unless a chosen proof topology requires it.

---

# 1. Semantic quotient — one unresolved polarity

The integrated graph contains the established support:

```text
P subset NP.
```

Therefore:

```text
P = NP
    <->
NP subset P.
```

Using Cook-Levin and the derived reduction-closure support:

```text
SAT in P
    <->
P = NP.
```

Hence also:

```text
SAT notin P
    <->
P != NP.
```

So, for the current source/model envelope, the terminal problem admits the quotient:

```text
q_PNP := truth value of "SAT in P".
```

with:

```text
q_PNP = TRUE
    -> P = NP

q_PNP = FALSE
    -> P != NP.
```

This is standard complexity-theory content, not a new theorem.

### DP consequence

Every proposed research route should eventually supply support for one polarity of this quotient or for an exact equivalent.

A result with no represented path to either polarity is not yet P-vs-NP progress.

---

# 2. Semantic symmetry, method asymmetry

At the truth level, the two terminal outcomes are symmetric polarities of one membership question.

At the proof-method level, they are not symmetric.

## Equality side

A sufficient route is:

```text
some NP-hard Q
+ Q in P
    -> P = NP.
```

The semantic load-bearing fact is:

```text
Q in P.
```

An explicit algorithm is one witness topology.

A nonconstructive proof of membership is another possible topology.

Thus:

```text
explicit algorithm artifact
    !=
separate semantic requirement.
```

## Separation side

A sufficient semantic route is:

```text
exists L:
    L in NP
    AND
    L notin P.
```

An unrestricted circuit lower bound for an NP-complete problem is only one stronger sufficient topology.

Therefore:

```text
semantic truth symmetry
    coexists with
proof-method asymmetry.
```

This distinction is load-bearing for discovery.

---

# 3. Stronger-objective tax on the circuit route

The direct separation objective needs only:

```text
L in NP
AND
L notin P.
```

The unrestricted-circuit route instead seeks a stronger fact such as:

```text
L notin P/poly
```

or an explicit superpolynomial unrestricted circuit lower bound.

That stronger target implies the semantic separation because:

```text
P subset P/poly.
```

But it introduces extra support obligations:

- nonuniform circuit semantics;
- quantitative lower-bound machinery;
- Natural-Proofs/naturality analysis for many candidate methods;
- possibly relativization/algebrization issues depending on topology.

DP 0.8 classification:

```text
unrestricted-circuit lower bound
    = NONESSENTIAL_FOR_SEMANTIC_SUFFICIENCY
      of P != NP

while
    remaining a powerful sufficient route.
```

This does not say the direct witness route is easier.

It says the circuit route **overproves relative to the terminal semantic objective**.

---

# 4. Barrier avoidance and barrier defeat are different

The integrated graph attaches barriers to method fibers, not to the terminal truth nodes.

Therefore a proof can avoid a barrier in two structurally different ways:

```text
A. enter the barrier's method family
   and supply structure that escapes the barrier;

B. use a proof topology
   to which that barrier does not apply.
```

These are not equivalent.

For example:

```text
Natural-Proofs barrier
    attaches to natural circuit-lower-bound routes

but

direct P-vs-NP separation
    does not definitionally require
    a natural circuit-lower-bound route.
```

So a universal search instruction:

```text
"cross relativization + Natural Proofs + algebrization"
```

is not a correct minimum-support description of P-vs-NP.

The correct form is:

```text
choose proof topology
    ->
derive its applicable barrier obligations
    ->
satisfy or avoid those obligations.
```

---

# 5. NP-complete quotient versus proof-geometry residual

For the equality objective:

```text
Q NP-hard
AND
Q in P
```

is sufficient regardless of which NP-hard `Q` is selected.

So the identity of SAT is not intrinsically load-bearing for class equality.

The complete-problem layer admits a quotient:

```text
all NP-hard targets
    equivalent as equality adapters
    once membership in P is established.
```

However, proof geometry does not respect this quotient automatically.

Different problems can have different:

- circuit representations;
- algebraic encodings;
- symmetries;
- proof-complexity behavior;
- restriction behavior;
- natural-property signatures.

Therefore:

```text
same semantic adapter class
    !=
same discovery geometry.
```

This is important for IsoGraph.

It means problem selection should be objective-dependent:

```text
for equality:
    complete-problem identity can often be quotiented away

for proof discovery:
    internal structure may remain load-bearing.
```

---

# 6. Completeness is nonessential for the direct separation objective

To establish:

```text
P != NP,
```

the witness language needs only:

```text
L in NP
AND
L notin P.
```

It does **not** have to be:

```text
NP-hard
or
NP-complete.
```

Therefore NP-completeness is:

```text
NONESSENTIAL_FOR_SUFFICIENCY
```

for the direct semantic separation route.

This yields a high-value search consequence:

> A separation campaign need not insist that the candidate hard language be SAT or any NP-complete problem.

This is a standard logical consequence, not a novel theorem.

But it materially changes the IsoGraph search space: a structurally simpler NP language can be a fully valid terminal witness if nonmembership in P can be established.

---

# 7. Explicit separating witness is also not part of the external output contract

The external problem asks for the class relation.

A proof of:

```text
P != NP
```

may establish the class inequality indirectly and thereby entail existence of a separating language.

So:

```text
named explicit witness language
    !=
mandatory external artifact.
```

Likewise:

```text
explicit polynomial-time SAT algorithm
    !=
mandatory external artifact
```

for a proof of equality, although membership in P must still be established.

This prevents DP from overconstraining either side by requiring a constructive artifact not demanded by the theorem statement.

---

# 8. Control-layer firewall — the earlier campaign drift

The integrated graph places:

```text
time hierarchy
AC0 PARITY
HJP depth-3 lower bounds
```

outside the semantic support cone.

They are method controls.

A control becomes P-vs-NP progress only when a new exact bridge is established:

```text
control invariant
    ->
SAT in P

or

control invariant
    ->
some L in NP \ P

or another exact equivalent of one terminal polarity.
```

Without such a bridge:

```text
better understanding of a control
    !=
progress on the terminal theorem.
```

This is the strongest process correction from the integrated DP run.

It directly explains why the campaign began spending too much effort on HJP naturalization.

---

# 9. Barrier results cannot update the truth value

Because barriers constrain proof methods:

```text
method M fails
```

does not imply:

```text
opposite terminal answer.
```

Likewise, discovering that one family of circuit lower-bound proofs is blocked does not create semantic support for `P = NP`.

The graph therefore forbids a common illicit update:

```text
failed separation technique
    -> evidence for equality.
```

and symmetrically:

```text
failed algorithmic technique
    -> evidence for separation.
```

This is a discovery-protocol firewall, not a probabilistic claim.

---

# 10. Minimum-support views inside declared route spaces

## Equality route with fixed NP-hard Q

Fixed support:

```text
Q is NP-hard
P is closed under <=p reductions
P subset NP.
```

Unresolved support:

```text
Q in P.
```

Inside this fixed route:

```text
Q in P
```

is the sole unresolved semantic fact.

Whether it is proved by an explicit algorithm, simulation, algebraic collapse or contradiction is method structure downstream of that membership target.

## Direct separation route

Fixed support:

```text
definition of NP
definition of P.
```

Unresolved support:

```text
exists L:
    L in NP
    AND
    L notin P.
```

NP-hardness, circuit complexity and natural properties are absent from the minimum-shaped semantic support.

## Circuit separation route

The route adds:

```text
nonuniform circuit target
+
transport back to uniform P separation
+
route-specific method obligations.
```

It is therefore a strictly larger support topology than the direct semantic route.

No valuation statement about which route is easier is inferred.

---

# 11. New search topology — semantic base with method fibers

The full graph has a useful factorization:

```text
semantic base:
    q_PNP = "SAT in P ?"

method fibers over q_PNP:
    equality algorithms / membership proofs
    direct separation arguments
    circuit lower-bound arguments
    diagonal arguments
    algebraic arguments
    other future topologies

barriers:
    predicates/constraints on selected fibers
```

This is the most useful integrated IsoGraph abstraction produced so far.

It prevents barriers and controls from bloating the semantic core while still preserving them where relevant.

No claim is made that this fiber language is a new complexity-theory formalism; it is an IsoGraph organization of the pinned facts.

---

# 12. High-value discovery leads from the integrated graph

## L1 — direct uniform separation without nonuniform strengthening

Search for an NP predicate/language whose represented structure supports:

```text
L notin P
```

directly, rather than first proving:

```text
L notin P/poly.
```

This targets the semantic objective without the stronger nonuniform layer.

No candidate is supplied yet.

## L2 — reduction-transport invariant

Polynomial reductions transport upper-bound membership cleanly:

```text
P <=p Q
AND Q in P
    -> P in P.
```

Search for a structural invariant `H` with an exact lower-bound transport law such as:

```text
H(P)
AND P <=p Q
    -> H(Q)
```

where `H(Q)` is sufficient to establish `Q notin P` or another terminal-equivalent fact.

No such invariant is assumed.

This is a precise discovery question generated by the asymmetry of the current graph.

## L3 — equality-side structural search

Because any NP-hard `Q in P` collapses the classes, the equality search need not be SAT-specific.

DP may compare NP-hard representations for a structure that makes deterministic polynomial-time membership more accessible.

Again, no preference or expected outcome is inferred.

## L4 — model-bridge qualification

Before a formal result in the pinned Coq model can be promoted as a solution to the official problem, complete the exact model-equivalence bridge required by the chosen theorem statement.

This is a qualification requirement, not a discovery lead.

## L5 — route admission test

Before adding a new large research subgraph, require:

```text
What exact edge connects this subgraph
to SAT in P / SAT notin P
or an equivalent terminal support?
```

If the edge is QU:

```text
classify the work as a control or speculative method fiber,
not as direct P-vs-NP progress.
```

This is now the governing campaign discipline.

---

# 13. No terminal discovery

The integrated DP run does not resolve P versus NP.

It does not produce:

- a polynomial-time SAT algorithm;
- a proof SAT is outside P;
- a separating NP language;
- an unrestricted circuit lower bound;
- a new barrier-escaping proof.

Its main result is a much cleaner support architecture:

```text
one semantic truth bit
+
multiple alternative proof fibers
+
route-specific barriers
+
controls kept outside the truth cone.
```

That is the correct base for further discovery.

## Disposition

```text
P = NP: QU
P != NP: QU
SAT in P ?: QU

semantic quotient: CLOSED
route/barrier separation: CLOSED
control/support firewall: CLOSED

next discovery:
    operate on the integrated graph,
    not on isolated controls,
    unless an exact bridge to the truth core is declared first.
```
