# P vs NP integrated IsoGraph 0.1 — semantic and support audit

**Status:** integrated research rendering; not independently qualified  
**Native graph:** `P_VS_NP_INTEGRATED_0_1.isg`  
**Purpose:** represent the current P-vs-NP problem itself first, then attach proof routes, barriers, controls and QU as separate layers.

## Inputs integrated

This graph composes, without rewriting their source claims:

- `P_VS_NP_FOUNDATION_0_1.isg`
- `P_VS_NP_FOUNDATION_0_1_AUDIT.md`
- `P_VS_NP_DERIVED_CORE_0_1.md`
- `P_VS_NP_RESOLUTION_ROUTES_0_1.isg`
- `P_VS_NP_RESOLUTION_ROUTES_0_1_AUDIT.md`
- `P_VS_NP_BARRIERS_0_1.isg`
- `P_VS_NP_BARRIERS_0_1_AUDIT.md`
- `AC0_NATURAL_BARRIER_RENDER_0_1.isg`
- current restricted lower-bound controls.

It is a successor integrated view. It does not replace the source-semantic child renderings.

## Governing layer split

The integrated graph has four layers.

### L0 — semantic truth core

What is P versus NP asking?

### L1 — complete-problem / reduction adapters

How can the semantic truth be represented through SAT or another NP-hard problem?

### L2 — proof-method routes

What sufficient proof topologies can establish either terminal outcome?

### L3 — barriers, controls and unknowns

Which method families are constrained, which examples are merely controls, and what remains QU?

This separation is load-bearing.

## Relation dictionary

| Relation | Meaning |
|---|---|
| `^140000` | object belongs to integrated rendering |
| `^140001` | binary terminal outcome partition |
| `^140002` | known class inclusion |
| `^140003` | equivalence |
| `^140004` | conjunction/support bundle |
| `^140005` | support collapses to one unresolved side because another side is already known |
| `^140006` | existential witness bundle |
| `^140007` | separation-witness equivalence |
| `^140008` | terminal outcome is one polarity of the unresolved truth bit |
| `^140009` | NP-complete bundle |
| `^140010` | NP-hardness |
| `^140011` | NP membership |
| `^140012` | polynomial reduction |
| `^140013` | route/method bundle |
| `^140014` | method-specific attachment |
| `^140015` | reduction closure of P |
| `^140016` | sufficient equality support |
| `^140017` | equality implies complete-problem membership |
| `^140018` | truth-bit quotient |
| `^140019` | generalized NP-hard-in-P equality route |
| `^140020` | explicit algorithm is one sufficient witness topology |
| `^140021` | unresolved bridge / QU ownership |
| `^140022` | restricted or stronger objective feeds method route |
| `^140023` | unrestricted circuit-lower-bound route bundle |
| `^140024` | nonuniform strengthening |
| `^140025` | stronger lower bound suffices for semantic separation |
| `^140026` | alternative sufficient topology |
| `^140027` | barrier constrains method family |
| `^140028` | barrier does not decide terminal truth |
| `^140029` | explicit QU / unresolved state |

## Object dictionary

### Semantic truth core

- `6000`: resolve P versus NP
- `6001`: `P = NP`
- `6002`: `P != NP`
- `6003`: class P
- `6004`: class NP
- `6005`: known inclusion `P subset NP`
- `6006`: reverse inclusion `NP subset P`
- `6007`: separation witness exists
- `6008`: witness language `L in NP`
- `6009`: witness language `L notin P`

The core relations are:

```text
P = NP
    <->
P subset NP
AND NP subset P

P subset NP
    is already established

therefore:
P = NP
    <->
NP subset P
```

and:

```text
P != NP
    <->
exists L:
    L in NP
    AND
    L notin P.
```

### SAT / complete-problem quotient

- `6010`: `SAT is NP-complete`
- `6011`: `SAT is NP-hard`
- `6012`: `SAT in NP`
- `6013`: arbitrary `L in NP`
- `6014`: `L <=p SAT`
- `6015`: polynomial reduction witness
- `6016`: reduction closure theorem for P
- `6017`: `L <=p Q`
- `6018`: `Q in P`
- `6019`: `SAT in P`
- `6020`: derived `NP subset P`
- `6021`: `SAT notin P`

The derived quotient is:

```text
SAT in P
    <->
P = NP

SAT notin P
    <->
P != NP.
```

- `6040`: unresolved truth bit `SAT in P ?`

This is the smallest current semantic quotient of the full problem in the pinned model.

### Generalized equality route

- `6022`: arbitrary NP-hard problem `Q`
- `6023`: every NP language reduces to `Q`
- `6024`: `Q in P`
- `6025`: explicit polynomial-time algorithm for `Q`
- `6026`: nonconstructive/existential proof that `Q in P`

Both are sufficient ways to support the same membership fact.

An explicit algorithm is therefore **one witness topology**, not a separate semantic requirement of the class equality statement.

### Separation routes

- `6027`: direct semantic separation route
- `6028`: `L in NP`
- `6029`: `L notin P`
- `6030`: direct witness proves `P != NP`
- `6031`: alternative separation topology

The direct witness route is the semantic minimum-shaped target:

```text
one NP language outside P
    -> P != NP.
```

### Strong unrestricted-circuit route

- `6032`: unrestricted circuit lower-bound route
- `6033`: selected NP-complete problem
- `6034`: superpolynomial unrestricted Boolean-circuit lower bound
- `6035`: nonuniform strengthening of the separation objective
- `6036`: selected problem outside polynomial-size circuits
- `6037`: semantic separation conclusion
- `6038`: another separation topology
- `6039`: proof method for stronger nonuniform target

The official route supports:

```text
superpolynomial unrestricted-circuit lower bound
for an NP-complete problem
    -> P != NP.
```

This is sufficient but stronger than the direct semantic witness `L in NP \ P`.

### Barrier layer

- `6041`: relativizing method family
- `6042`: opposite oracle worlds
- `6043`: relativization barrier

- `6044`: natural lower-bound property route
- `6045`: usefulness + largeness + constructivity bundle
- `6046`: Natural-Proofs / AC0-natural constraint

- `6047`: top-level result truth remains unresolved
- `6048`: equality-route construction/existence remains unresolved
- `6049`: direct separation witness remains unresolved
- `6050`: unrestricted NP-complete circuit lower bound remains unresolved
- `6051`: relativization status of future proof route
- `6052`: naturality status of future circuit-lower-bound route
- `6053`: algebrization status of future proof route
- `6054`: restricted-control-to-unrestricted bridge
- `6055`: model-equivalence/completeness bridge still subject to explicit audit

The graph also retains algebrization as a separate method constraint; it is not collapsed into relativization or Natural Proofs.

## Completeness claim

This rendering claims **problem-structural completeness for the current campaign envelope**, not completeness of complexity theory.

Specifically, it includes:

1. the terminal truth alternatives;
2. the known inclusion `P subset NP`;
3. the exact reverse-inclusion condition for equality;
4. the direct witness condition for separation;
5. Cook-Levin / SAT as a complete-problem quotient;
6. the derived reduction-closure bridge needed to make the SAT quotient explicit;
7. the official constructive equality route;
8. the official unrestricted-circuit sufficient separation route;
9. route-specific barrier placement;
10. explicit QU for every unresolved top-level hinge currently used by the campaign.

It intentionally does **not** expand:

- every intermediate Cook-Levin reduction;
- every characterization of P or NP;
- proof complexity, descriptive complexity, communication complexity, algebraic complexity, or meta-complexity as parallel full subfields;
- every known restricted lower bound;
- every proposed P-vs-NP approach.

Those may be attached later as method/control fibers.

## Key firewall — semantic core versus proof fibers

The semantic truth core does not contain:

- relativization;
- Natural Proofs;
- algebrization;
- AC0;
- HJP;
- switching lemmas.

Those are method/control structures.

This is intentional.

A barrier can invalidate a proposed proof topology without changing the semantic support of either terminal truth value.

Therefore:

```text
barrier on method
    !=
support for opposite answer.
```

## Key firewall — complete-problem quotient versus proof geometry

For the equality objective, NP-complete problems are interchangeable through polynomial reductions:

```text
Q NP-hard
AND Q in P
    -> P=NP.
```

But this does not identify their internal representations, quantitative circuit complexity, or barrier signatures.

Thus:

```text
same complete-problem role
    !=
same lower-bound geometry.
```

## Control placement

Time hierarchy, AC0 PARITY, HJP and related lower-bound work are now explicitly outside the semantic support cone of `6000`.

They are attached only as:

```text
method qualification controls
or
candidate proof-structure donors.
```

A control result cannot flow into `P=NP` or `P!=NP` without a separately represented bridge.

This corrects the campaign drift identified after checkpoint 0.7.

## QU discipline

The graph makes the current unknowns explicit instead of filling them with literature:

```text
SAT in P ?                              = QU
direct NP-outside-P witness             = QU
unrestricted NP-complete circuit LB     = QU
future method's barrier signature       = QU
restricted-control -> unrestricted bridge = QU
model-equivalence details               = QU where not yet rendered
```

## Qualification boundary

Child source renderings are pinned and audited at their stated scope.

This integrated graph is a new successor research rendering and has not undergone independent ESR qualification.

No qualified IsoGraph authority changes.

No P-vs-NP truth claim is made.
