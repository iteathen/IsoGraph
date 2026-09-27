# P vs NP unified IsoGraph 0.4 — integrated bridge audit

**Status:** successor integrated rendering; not independently qualified  
**Native graph:** `P_VS_NP_UNIFIED_0_4.isg`  
**Predecessor:** `P_VS_NP_UNIFIED_0_3.isg`  
**Bridge input:** `P_VS_NP_MODEL_CIRCUIT_BRIDGES_0_1.isg`

## Purpose

0.4 folds the model-equivalence and uniform-to-circuit bridge layer directly into the unified graph.

No new external source search was performed for this successor.

## Preserved predecessor relations

0.4 retains all native relations from:

- unified 0.3: `^138000` through `^138029`;
- model/circuit bridges 0.1: `^139000` through `^139015`.

It adds only integration relations `^142000` through `^142008`.

## New integration relations

| Relation | Meaning |
|---|---|
| `^142000` | unified top-level problem is governed by the official semantic target |
| `^142001` | pinned-formal-model terminal claim scope |
| `^142002` | class-wide model-equivalence obligation bundles formal and official models |
| `^142003` | model-equivalence obligation remains QU |
| `^142004` | unified circuit separation route consumes the bridge lower-bound target |
| `^142005` | one-way uniform-P to polynomial-size-circuit embedding |
| `^142006` | superpolynomial circuit lower bound rejects the nonuniform envelope |
| `^142007` | circuit lower-bound bridge yields separation in bridge model |
| `^142008` | bridge separation conclusion maps to unified `P != NP` terminal |

## Model bridge

The native graph now explicitly contains:

```text
pinned formal complexity model
    ->
generic encoded problem
    ->
L / LM stage
    ->
multi-tape TM stage
    ->
single-tape TM stage
    ->
standard-TM-style representation
```

and separately:

```text
class-wide polynomial-overhead equivalence
    ->
official P-vs-NP target.
```

The first chain is source-backed partial transport.

The class-wide equivalence remains:

```text
QU.
```

This is not a mathematical truth-value unknown.

It is an **authority-transfer / representation completeness unknown**.

## Circuit bridge

The graph now explicitly contains the one-way support:

```text
L in P
    ->
deterministic polynomial-time computation
    ->
per-length unrolling
    ->
polynomial-size circuit family
    ->
P/poly-style envelope.
```

It also contains:

```text
NP-complete Q has superpolynomial circuit complexity
    ->
Q outside the polynomial-size circuit envelope
    ->
P != NP.
```

The converse:

```text
polynomial-size circuits
    -> P
```

is not represented.

The circuit target remains a strictly stronger sufficient separation objective.

## Truth core after integration

Inside the pinned formal model:

```text
P = NP
    iff
SAT in P

P != NP
    iff
SAT notin P.
```

So the mathematical truth QU remains:

```text
Q_truth:
    SAT in P ?
```

The model bridge is a different QU:

```text
Q_model:
    does the exact pinned class formulation
    transport with the required polynomial equivalence
    to the official standard formulation?
```

These must not be identified.

## Semantic versus authority completeness

### Semantic completeness in pinned model

At the high-level campaign scope, the graph now contains:

- P/NP definitions and known inclusion;
- reverse-inclusion/equality residual;
- separating-language residual;
- exact SAT complete-problem quotient;
- reduction closure;
- official sufficient equality route;
- direct separation route;
- stronger unrestricted-circuit separation route;
- route-specific major barriers;
- restricted lower-bound controls;
- explicit truth QU.

This is sufficient for claim-bounded DP over the current campaign problem model.

### Official-authority completeness

Still blocked by:

```text
Q_model.
```

A future claimed solution to the official problem must close that bridge or use a source whose model is already accepted as the official formulation.

## Control firewall

The integrated graph still keeps:

- time hierarchy;
- AC0 PARITY;
- HJP lower bounds;

outside the terminal truth support cone.

They remain method controls unless an explicit edge to the truth core is proved.

## Search-space completeness

No exhaustive proof-route claim is made.

The graph has:

```text
semantic completeness for the declared high-level problem envelope
    !=
complete enumeration of all possible proofs.
```

Therefore no global minimum-proof claim is authorized.

## Disposition

```text
pinned-model truth:
    OPEN / QU

official-model transfer:
    QU

uniform-to-circuit bridge:
    CLOSED one-way

unrestricted-circuit route:
    CLOSED as sufficient topology

global proof-search space:
    OPEN

authority effect:
    NONE
```
