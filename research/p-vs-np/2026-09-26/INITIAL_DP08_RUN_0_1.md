# P vs NP — initial DP 0.8 structural discovery run 0.1

**Status:** experimental discovery; no authority effect; no P-vs-NP resolution claim  
**Campaign branch:** `research/p-vs-np-isograph-20260926`  
**DP input:** unqualified DP 0.8 candidate blob `46b94fe4cbd407d6d690980604fe5eb854220f67`

## Frozen campaign inputs

- `SOURCE_REGISTRY_0_1.md`
- `P_VS_NP_FOUNDATION_0_1.isg`
- `P_VS_NP_FOUNDATION_0_1_AUDIT.md`
- `P_VS_NP_BARRIERS_0_1.isg`
- `P_VS_NP_BARRIERS_0_1_AUDIT.md`
- `TIME_HIERARCHY_CONTROL_0_1.md`

Primary formal foundation:

`uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

## Declared objectives

### PNP-RESOLVE

Establish exactly one of:

```text
P = NP
P != NP
```

under the official standard problem semantics.

### PNP-EQUALITY

Establish the missing reverse inclusion once `P subset NP` is available:

```text
NP subset P
```

### PNP-SEPARATION

Establish a valid witness/separation showing:

```text
exists L in NP with L notin P
```

under the standard model.

### PNP-METHOD

Classify a proposed proof method against the represented barriers without treating barrier status as the truth value of P versus NP.

## 1. First support reduction: equality has only one open inclusion

The pinned Coq source proves:

```text
P subset NP
```

for its represented definitions.

Therefore, **inside that formal model**, the equality objective does not need two independent inclusions.

Its unresolved class-level support is:

```text
NP subset P
```

This is a support simplification, not a new complexity result.

### Model firewall

The official Clay statement is formulated in the standard Turing-machine setting, while the pinned library's basic complexity notions are formulated in its `L`/encoded-predicate framework with formal simulation infrastructure elsewhere in the library.

The campaign has not yet rendered the complete polynomial-overhead model-equivalence bridge.

Therefore:

```text
Coq-model P subset NP: source exact
official-model identification: not silently asserted here
```

The bridge is a high-priority exact-rendering obligation.

## 2. Cook-Levin is an adapter, not itself a lower bound

The source proves:

```text
NPcomplete SAT
```

which expands to:

```text
SAT in NP
AND
for every Q in NP:
    Q <=p SAT
```

This makes SAT a natural objective adapter.

But the current 0.1 native foundation does **not yet contain a separately pinned theorem that P is closed backward under polynomial many-one reductions**.

Without that represented closure, DP must not silently jump from:

```text
SAT in P
```

to:

```text
NP subset P
```

even though that implication is standard.

**Discovery result:** the SAT-equivalence route has one explicit missing bridge in the current rendering rather than an implicit folklore step.

Disposition:

```text
SAT adapter: source-backed
SAT-in-P iff P=NP in current native graph: QU until reduction-closure bridge is pinned/rendered
```

This is a rendering gap, not an open mathematical question.

## 3. Barrier results live on proof methods, not target truth values

All three represented barrier families constrain **classes of arguments**.

They do not directly support:

```text
P = NP
```

or:

```text
P != NP
```

Therefore barrier evidence cannot be accumulated as if it were probabilistic or logical evidence favoring one terminal answer.

This gives an explicit firewall:

```text
method excluded
    !=
opposite theorem supported
```

The barrier layer narrows admissible proof topologies, not the semantic solution space.

## 4. The barrier burden is asymmetric across the two resolution routes

The two terminal objectives have different support structures.

### Constructive equality route

A route establishing a deterministic polynomial-time algorithm for an NP-complete problem is constructive/computational.

The Natural-Proofs barrier, as represented from Razborov-Rudich, is specifically a circuit-lower-bound barrier under a hardness assumption.

It is therefore not a universal prerequisite on the equality route.

### Separation route

A route proving a sufficiently strong general circuit lower bound may trigger the Natural-Proofs barrier.

Other separation routes require separate classification rather than inheriting the circuit route's barrier automatically.

### DP consequence

There is no justified single node:

```text
"cross all P-vs-NP barriers"
```

that is load-bearing for every possible resolution proof.

Instead:

```text
objective + proof topology
    -> barrier obligations
```

This is a major representation constraint for the campaign.

## 5. Relativization supplies a bidirectional proof-method falsifier

Baker-Gill-Solovay supplies opposite oracle worlds:

```text
some A: P^A = NP^A
some B: P^B != NP^B
```

Therefore a candidate argument that would carry unchanged through arbitrary oracle relativization cannot resolve either terminal answer.

This is unusually useful for IsoGraph because it provides a **two-sided negative control**:

- a proposed equality proof that relativizes must fail somewhere;
- a proposed separation proof that relativizes must fail somewhere.

The barrier does not say where the missing nonrelativizing dependency must appear.

That location remains a discovery target.

## 6. Nonrelativizing is not sufficient

The algebrization source records that arithmetization-based techniques can overcome ordinary relativization while still falling to the stronger algebrization barrier.

Therefore:

```text
nonrelativizing
    !=
sufficiently non-algebrizing
```

A future DP candidate cannot be promoted merely because it contains a relation that breaks oracle invariance.

This supplies a nested falsification sequence:

```text
candidate proof
 -> test relativization
 -> if escaped, test algebrization separately
```

Natural-Proofs status remains a different axis rather than the next member of one linear hierarchy.

## 7. Successful separation controls do not transfer automatically

The machine-checked Time Hierarchy Theorem proves a real time-complexity separation.

That establishes:

```text
some diagonal/separation machinery
    is genuinely sufficient
for
some complexity-class separations
```

It does not establish that the same support is sufficient for PNP-SEPARATION.

This is a useful positive/negative pair:

```text
known separation proof succeeds
+
relativization barrier blocks naive transfer
```

The campaign should therefore compare **which dependency is present in successful restricted/nonrelativizing lower bounds but absent from relativizing diagonal arguments**, rather than asking whether "diagonalization works".

## 8. Natural-Proofs target strengthening must be represented explicitly

The current barrier source is phrased around strong **general circuit lower bounds**.

A circuit target such as excluding polynomial-size circuits is not definitionally identical to the base uniform target `P != NP`.

Therefore the campaign must not attach the Natural-Proofs barrier directly to every PNP-SEPARATION route.

A separate bridge is required whenever the argument uses:

```text
strong nonuniform circuit lower bound
    -> uniform P-vs-NP separation
```

The forward implication is a high-value relation to pin exactly.

The converse must not be assumed.

**Disposition:** HIGH-VALUE FOUNDATION LEAD.

## 9. First barrier signature proposal

For discovery bookkeeping, proof methods should carry a vector rather than one Boolean "barrier passed" label:

```text
R = relativization status
N = Natural-Proofs status + hardness assumptions + circuit target
A = algebrization status
U = uniform/nonuniform target scope
M = computational-model scope
```

Unknown components remain QU.

This is a discovery view, not a new Core primitive.

It prevents invalid substitutions such as:

```text
nonrelativizing
    -> barrier-free

not natural
    -> non-algebrizing

circuit separation
    -> definitionally same as P != NP
```

## 10. No novelty claim yet

The structural consequences above are primarily rigorous re-expression of known complexity-theory facts.

No claim is made that this first pass discovered a new theorem about P versus NP.

The value of the pass is that it exposes the exact unresolved joins where a later discovery would have to occur without violating known barriers.

## 11. Highest-value next leads

### L1 — close the SAT adapter exactly

Pin/render the exact theorem:

```text
P <=p Q
AND Q in P
    -> P in P
```

for the selected formal model.

Then derive and test the exact SAT equivalence route.

### L2 — close the uniform/nonuniform bridge

Pin a source for:

```text
P subset P/poly
```

and represent exactly why:

```text
NP notsubset P/poly
    -> P != NP
```

without asserting the converse.

This is required before Natural-Proofs evidence can be placed correctly relative to the base problem.

### L3 — select three successful lower-bound/separation controls

At least one should:

- relativize;
- one should be nonrelativizing but algebrizing;
- one should supply a strong restricted circuit lower bound.

Render each independently before comparison.

### L4 — locate the actual barrier-crossing dependencies

After the controls are exact, ask DP:

```text
which support relation distinguishes
successful barrier-crossing restricted results
from the proof families blocked at P vs NP?
```

Do not ask for a proof of `P != NP` first.

### L5 — model-equivalence closure

Render the library's polynomial-overhead equivalences between its computational model(s) and the standard Turing-machine interpretation needed for the official Clay target.

Until this closes, formal-foundation discoveries remain model-scoped.

## 12. Current disposition

```text
P = NP: OPEN
P != NP: OPEN

exact foundation rendering:
    candidate complete for declared Coq scope
    independent ESR qualification not yet run

barrier rendering:
    source-backed and scope-audited
    internal barrier definitions not yet fully native-expanded

new theorem about P vs NP:
    NONE CLAIMED

high-value structural leads:
    SAT reduction-closure adapter
    uniform/nonuniform bridge
    barrier-signature comparison
    model-equivalence bridge
    successful lower-bound control synthesis
```
