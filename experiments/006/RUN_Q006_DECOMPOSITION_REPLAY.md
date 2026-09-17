# Experiment 006 — Independent Decomposition Replay

**Status:** post-freeze research analysis; does not alter RUN-Q006 evidence or any candidate specification  
**Frozen run:** `RUN-Q006` / Actions `35268229129`  
**Frozen qualification commit:** `e63786f5cf5e4aebc248d66b9a2c64437e425265`  
**Purpose:** replay the DP proof-pair comparison manually at finer structural granularity and identify exactly which decomposition/factorization failed

---

## 1. Method

This replay uses the two frozen cold-visible proof artifacts as the primary objects and reconstructs their proof-role graphs without changing either artifact.

The hidden oracle is used only after the independent role decomposition to check whether the recovered structure agrees with the historically documented relationship.

No Gemini or GitHub Actions qualification rerun was used.

---

## 2. Proof Alpha — role decomposition

The visible steps can be factored by proof role as follows.

```text
A01  carrier with boundary
      X = simplex; codimension-one faces are coordinate-zero boundaries

A02  target-negation -> nonzero local defect
      no fixed point
      -> for every x, some displacement coordinate satisfies F(x)_j < x_j

A03  approximation carrier
      arbitrarily fine finite subdivisions K_k

A04  local defect encoder
      choose a displacement witness j at each sampled vertex
      -> discrete label j

A05  boundary compatibility
      face j cannot carry label j
      -> local encoding respects the boundary-face structure

A06  extension / obstruction invariant
      boundary-compatible labeling
      -> odd parity of fully labeled n-simplices
      -> at least one interior/full witness must exist

A07-A08  witness refinement / convergence adapter
      choose one full witness at every scale
      -> compact subsequence
      -> all label witnesses converge to one common x

A09  decode approximate witnesses to exact target
      limiting coordinate inequalities + total-sum invariant
      -> F(x)=x

A10  contradiction / discharge target
```

This shows that `A04-A06` is not merely "combinatorial machinery." It is a boundary-compatible encoding followed by an obstruction that prevents that encoding from extending through the interior without producing a witness.

`A03,A07,A08,A09` are a second layer: a discrete/finite witness is refined and decoded into an exact continuous fixed point.

---

## 3. Proof Beta — role decomposition

```text
B01  carrier with boundary
      Y = ball-like space; boundary dY

B02  target-negation -> nonzero local defect
      no fixed point

B03  continuous defect encoder
      fixed-point-free displacement direction
      -> distinguished boundary point r(y)

B04  boundary compatibility
      r is continuous and fixes boundary points
      -> retraction candidate Y -> dY

B05  boundary-extension equation
      r o i = id_dY

B06  transport into invariant representation
      apply functorial invariant H

B07  incompatible interior/boundary invariant values
      H(dY) nontrivial; H(Y) trivial

B08  extension / obstruction invariant
      identity on nontrivial boundary invariant cannot factor through trivial interior invariant

B09-B10  reject retraction -> reject target-negation
```

`B03-B05` is the continuous boundary-compatible encoding layer.

`B06-B08` is the global obstruction layer.

Unlike Alpha, Beta obtains an exact continuous boundary construction immediately and therefore does not need Alpha's finite-refinement / compactness / exact-witness extraction layer.

---

## 4. Recovered common proof skeleton

The strongest common structure recoverable from the frozen artifacts is:

```text
U0  bounded carrier with meaningful boundary

U1  assume target absent
    -> obtain nonzero displacement/defect information everywhere

U2  encode the defect toward boundary structure
    Alpha: local coordinate label
    Beta:  continuous ray-to-boundary point

U3  boundary compatibility constrains the encoding
    Alpha: face j excludes label j
    Beta:  boundary points are fixed by r

U4  an interior extension is obstructed by an invariant
    Alpha: mod-2 / parity obstruction forces an interior full-label witness
    Beta:  functorial boundary invariant cannot factor through trivial interior invariant

U5  convert the obstruction result back into the target
    Alpha: refinement + compactness + common-limit decoding
    Beta:  exact no-retraction contradiction directly rejects the fixed-point-free assumption

U6  target established
```

The two proofs are **not** fully isomorphic. The common structure is a role-level obstruction architecture with an asymmetric realization/approximation adapter.

---

## 5. Exact decomposition failures in the cold DP run

### F1 — boundary objects were compared before boundary roles were decomposed

The cold run tested whether Alpha's simplex boundary and Beta's ball boundary were directly isomorphic and rejected that direct match.

That is a valid falsification of a literal boundary-object isomorphism, but it was used too early as evidence of divergence.

The higher-information question was:

```text
What role does each boundary play in the proof?
```

At that level both receive a displacement-derived encoding constrained to respect the boundary.

The missing role decomposition was approximately:

```text
raw boundary object
    -> boundary carrier
    -> boundary-directed defect encoding
    -> compatibility/identity-like boundary condition
    -> extension obstruction
```

### F2 — Alpha's local labels were not lifted to their transformation role

`A04-A05` was left as proof-specific coordinate-label machinery.

It should first have been factored as:

```text
nonzero defect
-> choose a boundary-indexed local representative
-> enforce boundary-compatible representative selection
```

That role corresponds naturally to `B03-B04`:

```text
nonzero defect
-> choose a boundary-directed representative
-> enforce boundary-fixed compatibility
```

Literal coordinate labels and literal boundary points are residual implementation/formulation differences; the encoder role is common.

### F3 — the obstruction nodes were misaligned

The cold run paired `A09` with `B08` because both appear near the final contradiction.

That alignment is structurally wrong.

`A09` is **witness decoding**: it converts limiting finite witnesses into an exact fixed point.

`B08` is **the obstruction itself**: an identity invariant cannot factor through a trivial interior invariant.

The better alignment is:

```text
A06  <->  B06-B08
```

Both are the obstruction layer.

Once that alignment is made, Alpha's `A03,A07,A08,A09` becomes an additional approximation/witness-extraction adapter rather than evidence that the whole intermediate proof is unrelated.

### F4 — residual classification terminated recursion

The cold run correctly moved to DP-08 residual analysis, but then concluded that the two intermediate regions were "completely divergent residuals" and stopped.

This reverses the intended value of residual-first analysis.

A residual between already matched upstream and downstream obligations is **not yet terminal**. It is a high-value candidate for another decomposition pass.

The residuals here are attached to the same structural sandwich:

```text
matched target-negation
    -> [large unmatched middle]
    -> matched contradiction/target discharge
```

That is strong evidence to recursively factor the middle by proof role before declaring it domain-specific.

### F5 — DP-08 routing did not promote the protocols most needed by this residual

DP-08 correctly says to ask whether residuals form another common structure, but its explicit `Next` list emphasizes DP-14/23/34/35/36.

For this failure shape, the most useful follow-ups were instead:

```text
DP-07  alternative factorization
DP-11  invariants across alternate realization/formulation
DP-13  multi-scale common substructure
DP-19  dual/reversed roles where useful
DP-24  proof/witness topology at a deeper abstraction level
DP-37  equivalent obstruction / constraint closure
```

The mathematical-task promotion list already contains several of these, but the cold agent treated the residual stop as overriding those promotions.

### F6 — the test pair itself is asymmetrically decomposed at the deepest obstruction

Beta exposes its obstruction internally:

```text
B06 functorial transport
B07 boundary/interior invariant values
B08 impossible factorization
```

Alpha compresses its corresponding obstruction into one black-box statement:

```text
A06 combinatorial parity lemma -> odd/full-label witness
```

Thus the benchmark contains enough information to discover the **role-level** correspondence `A06 <-> B06-B08`, but not enough internal Alpha structure to independently reconstruct the full cochain-level equivalence of the parity proof without supplying or deriving additional structure.

This matters because the historical result is stronger than "both are obstructions": the combinatorial parity proof itself admits a cochain/cohomology interpretation.

A stronger next benchmark should preserve independent presentation while exposing the internal dependency structure of the parity lemma rather than treating it as an opaque theorem call.

---

## 6. Two unifications are entangled in the current benchmark

The historical connection actually contains two related but separable layers:

### Layer A — obstruction theorem

```text
Sperner/parity obstruction
<->
cochain/cohomological no-extension / no-retraction obstruction
```

### Layer B — deduction to fixed point

```text
finite labeled refinements + shrinking witnesses
<->
simplicial approximation / continuous boundary construction
```

RUN-Q006 asks one discovery pass to recover both layers inside one combined proof pair.

For diagnosis, the next experiment should score these layers separately even if they are still batched into one external call.

---

## 7. What DP should require before stopping on a large residual

A proposed **Cross-Residual Decomposition Gate**:

Before an agent may declare two large residual regions terminal/domain-specific, if they connect corresponding matched obligations or interfaces, it MUST perform at least one recursive abstraction pass that asks:

1. what are the inputs and outputs of each residual region?
2. what obligation does each region discharge?
3. what invariant/constraint prevents the undesired state?
4. is one residual an exact/continuous realization while the other is finite/discrete/approximate?
5. can either region be refactored into `encoder -> compatibility -> obstruction -> decoder` or another shared role decomposition?
6. does an alternative factorization reduce the residual without erasing source-specific machinery?

Only after that pass fails may mechanism/vocabulary divergence support a stop decision.

The residual remains preserved even when a deeper common factor is found.

---

## 8. Proposed protocol corrections to investigate

Do not apply these automatically to the frozen DP candidate; they are research outputs from RUN-Q006.

### DP-08

Add an explicit recursive rule:

> Residual status is not terminal status. A residual lying between matched interfaces/obligations becomes a new discovery scope and re-enters the ranked protocol schedule.

Add high-priority next protocols for patterned/cross-sandwiched residuals:

```text
DP-07, DP-11, DP-13, DP-24, DP-37
```

### DP-24

Add an **obligation-sandwich rule**:

> When two proofs share corresponding premises and conclusions but have unmatched middle regions, factor each middle region by the obligation it discharges before classifying the middle as divergent.

Compare proof roles such as:

```text
encoder
boundary/side-condition enforcer
invariant carrier
obstruction
witness extractor
decoder
```

rather than only step-level textual machinery.

### DP-07

Explicitly recognize proof-step grouping/splitting as alternative factorization:

```text
one opaque theorem step
<->
several explicit invariant steps
```

should trigger factorization comparison rather than immediate residualization.

### Global stopping rule

If a residual carries most of the causal/proof burden between matched endpoints, `different machinery` is evidence to **decompose further**, not evidence to stop.

---

## 9. Benchmark correction for a future RUN-Q006 revision

Preserve the frozen RUN-Q006 exactly.

For a revised benchmark:

1. keep theorem names/citations/history hidden from the cold agent;
2. retain the combined Alpha/Beta proof pair;
3. add an independently presented internal decomposition of Alpha's parity lemma, or a separate Alpha-obstruction artifact, without naming cohomology;
4. score the obstruction-level unification separately from the fixed-point-deduction/approximation-level unification;
5. require recursive DP work inside large residuals before allowing a stop;
6. keep the one-call resource budget by batching both sub-benchmarks in the same frozen packet.

This will distinguish:

```text
DP failed to abstract despite sufficient structure
```

from:

```text
the source artifact hid the structure inside an opaque theorem step
```

---

## 10. Independent historical validation

Nikolai V. Ivanov, *Sperner's Lemma, the Brouwer Fixed-Point Theorem, and Cohomology* (2009), explicitly describes:

- the combinatorial proof of Sperner's lemma as a cochain-level version of a standard cohomological argument; and
- the standard deduction of Brouwer from Sperner as similar to the deduction from the no-retraction theorem and closely related to simplicial approximation.

Reference: `https://arxiv.org/abs/0906.5193`

This agrees with the decomposition recovered above and confirms that RUN-Q006 stopped precisely in the region containing the known deeper unification.

---

## 11. Current diagnosis

RUN-Q006 did not fail because DP found no relation.

It failed because DP found the outer common shell, then **under-decomposed the middle**.

The principal failure chain is:

```text
step-level comparison
-> literal boundary mismatch
-> proof-specific residual classification
-> obstruction-node misalignment
-> no alternative factorization of residual middle
-> premature stop
```

The corrected search shape is:

```text
outer common shell
-> preserve residual middle
-> recursively decompose residual by obligation/role
-> align boundary-directed encoders
-> align obstruction layers
-> preserve asymmetric approximation machinery
-> supported deeper common structure + explicit residual
```

That is the decomposition failure exposed by Experiment 006.