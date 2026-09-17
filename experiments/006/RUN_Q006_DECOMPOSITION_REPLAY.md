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

### F7 — NEI was available but not used as a residual-distinction challenge

The cold packet included NEI 0.1, but the mathematical Discovery Protocol routing did not force escalation from strong role correspondence into `DP-38` / NEI investigation.

That matters here because the crucial failure was precisely an **unsupported distinction between differently represented intermediate proof objects**.

After the role-level decomposition, the agent had enough evidence to formulate at least these NEI hypotheses:

```text
H1:
Alpha A04-A05 boundary-compatible defect encoder
and
Beta B03-B04 boundary-directed defect encoder
may be two SI-addressed representations/formulations of one natural proof-role object.

H2:
Alpha A06 parity obstruction
and
Beta B06-B08 topological obstruction
may be two SI-addressed representations/formulations of one natural obstruction object at an appropriate abstraction/profile.
```

NEI must not infer `SAME` merely from structural similarity. NEI 0.1 explicitly requires a pinned identity profile/evidence authority and states that structural isomorphism/QUI alone is not an identity certificate.

But this does **not** make NEI irrelevant to discovery. Proper use of NEI here would have changed the next question from:

```text
Are these residual mechanisms structurally identical as currently factored?
```

to:

```text
Is the distinction between these differently represented mechanisms
supported by natural-identity evidence,
or is it only a representation/factorization distinction?
```

That query directly attacks the erroneous stopping condition.

The likely discovery flow should have been:

```text
DP-24 / DP-10 finds corresponding proof roles
-> DP-08 exposes large middle residuals
-> DP-07 recursively refactors them
-> DP-38 creates NEI identity hypotheses over corresponding roles
-> NEI profile asks what distinctions are natural versus representational
-> absence of qualified separating evidence prevents treating formulation difference as a natural separator
-> continue searching for a bridge/invariant rather than terminate on vocabulary/machinery difference
```

This would not automatically qualify `SAME`; it would prevent the discovery system from using unsupported representation differences as evidence that no deeper unification exists.

The current NEI specification already supplies the required conceptual safeguards:

- SI/factorization/source separation is not natural-identity evidence;
- a lawful administrative/representational repartition preserves NEI when natural structure is preserved;
- structural correspondence may enter an identity theorem only through an explicit qualified bridge;
- NEI maximizes only **justified** collapse and preserves genuine uncertainty.

Therefore RUN-Q006 exposes an integration defect between DP and NEI in addition to a decomposition-depth defect.

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
finite subdivision + shrinking witnesses
<->
simplicial approximation / continuous no-retraction deduction
```

The current benchmark asks one discovery pass to recover both layers simultaneously.

For diagnostic precision, the next revision should separate them into two linked sub-benchmarks while retaining a final combined discovery task.

---

## 7. Required DP correction pressure

A next DP revision should add a cross-residual decomposition rule roughly equivalent to:

> When two residual regions are attached between already-corresponding upstream and downstream roles/obligations, and those residuals carry substantial proof/causal burden, the agent MUST NOT terminate solely because their mechanisms, vocabulary, or current factorizations differ. It SHOULD perform at least one deeper role/factorization pass and test whether both residuals realize a common encoder, constraint, invariant, obstruction, witness, adapter, or decoder role.

For proof comparisons, candidate decomposition roles should include at least:

```text
carrier
assumption / negation
local defect
encoder
boundary/side-condition enforcer
invariant carrier
obstruction
witness generator
approximation/refinement adapter
witness extractor
decoder
contradiction / target discharge
```

This is discovery guidance, not new proof semantics.

A companion integration rule should also require:

> When two residual regions occupy corresponding load-bearing roles but differ mainly by representation, factorization, source, or mathematical machinery, DP SHOULD promote `DP-38` and formulate an NEI hypothesis before treating those differences as evidence of natural distinctness. NEI classification still requires its own qualified profile/evidence obligations; the discovery purpose is to test whether the residual distinction itself is justified.

---

## 8. Benchmark correction pressure

A stronger replacement benchmark should:

1. retain independent proof presentation and hidden theorem/citation names;
2. expose the parity lemma internally enough to represent its boundary contribution/parity propagation structure;
3. keep the topological invariant proof independently represented;
4. score the obstruction-layer discovery separately from the fixed-point-deduction-layer discovery;
5. include a final task asking whether the two discovered layers compose into the larger common proof architecture;
6. still require residual preservation and reject full-proof isomorphism;
7. explicitly permit/encourage DP-to-NEI escalation for corresponding residual roles, while withholding any oracle identity conclusion.

This would distinguish:

```text
failure to factor
failure to align roles
failure to invoke NEI on a potentially representational distinction
failure to discover a bridge despite sufficient decomposition
fixture omitted required internal structure
```

rather than collapsing all five into one DP failure.

---

## 9. Conclusion

RUN-Q006 did not fail because the two proofs lacked recoverable common structure.

It failed because:

1. the cold agent stopped at surface method categories;
2. it failed to recursively decompose large residuals bracketed by matched obligations;
3. it misaligned the obstruction layer with the witness-decoding layer;
4. it treated residual status as a stopping result rather than a new decomposition target;
5. DP routing did not strongly promote the relevant deeper-factorization protocols;
6. the benchmark itself compressed Alpha's deepest obstruction more aggressively than Beta's;
7. the discovery pass did not use NEI to challenge whether the remaining distinctions were natural or merely representational/formulational.

After role decomposition, the hidden relationship becomes visible from the frozen pair at the level of:

```text
fixed-point absence
-> displacement information
-> boundary-compatible encoding
-> obstruction to extension through the interior
-> fixed-point consequence
```

Proper NEI use would then ask whether the different encodings/obstruction realizations are naturally distinct or merely different representations of the same load-bearing proof object. That question should have prevented the premature `completely divergent residuals` conclusion even before the full historical bridge was reconstructed.

The next qualification should therefore test both **recursive structural decomposition** and **DP-to-NEI escalation** explicitly.