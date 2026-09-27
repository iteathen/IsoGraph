# AC0 PARITY control — DP 0.8 discovery run 0.1

**Status:** experimental discovery; no P-vs-NP authority effect  
**Source:** `formalcs/circuit-complexity@9b19e6c5c9c6d331db018e8cf73d55d3c389e0f1`  
**Rendering:** `AC0_PARITY_RENDER_0_1.isg`

## Objective

Do not ask whether AC0 restrictions can simply be removed.

Ask instead:

```text
which restriction/support fact is first consumed where,
which coarse source conditions split into independent roles,
and which formal hypotheses are only packaging?
```

## D1 — exact signature redundancy

The leveled formula package contains `d > 0`.

Several consumer theorems also request an explicit `hd : 1 <= d`.

Over natural numbers, the package already supplies that proposition.

Therefore the explicit `hd` occurrence is **NONESSENTIAL_FOR_SUFFICIENCY** whenever the leveled package is already an input.

This finding is exact and source-local.

It does not weaken the mathematical depth restriction itself.

## D2 — depth splits into two load-bearing roles

The circuit proof uses depth in two different dependency cones.

### Switching depth

```text
d
 -> number of depth-reduction rounds
 -> live-variable reserve
 -> narrow DNF
 -> parity contradiction
```

### Sharing-expansion depth

```text
circuit depth
 -> bound on unfolded formula depth/node expansion
 -> small circuit implies sufficiently small formula
 -> formula lower-bound contradiction
```

The two roles share a numeric source parameter but are semantically distinct occurrences.

### Consequence

A future factorization that avoids circuit-to-formula unfolding could potentially eliminate the **sharing-expansion occurrence** of depth without eliminating the **switching occurrence**.

No such direct DAG proof is established here.

Disposition:

```text
dual-role split: SUPPORTED
bypass of sharing-expansion role: QU
bypass of switching depth role: NOT ESTABLISHED
```

## D3 — global size is not the native state carried by switching

The switching state carries a local `switchingGateBudget < 2^t` and bottom-fan-in bound.

The round-zero construction derives this local budget from global formula size.

Therefore:

```text
global size
 -> local active switching budget
 -> switching collapse
```

rather than:

```text
global size
 -> every switching lemma directly
```

This suggests an exact broader internal target:

```text
formulas satisfying the local switching-budget interface
```

even if they are not introduced through one fixed global polynomial-size package.

The source already exposes most of this factorization, so no novelty claim is made yet.

### High-value question

Is the local switching-budget interface sufficient to state a useful lower-bound theorem for a structurally broader formula population than the current AC0 package?

This remains QU until the target population and endpoint contradiction are defined exactly.

## D4 — normalization is confirmed as alternative support, not a discovery

The source contains both:

```text
general formula
 -> normalize/level
 -> core lower bound
```

and a documented direct quantitative route.

Therefore explicit normalization is not uniquely necessary for the general formula endpoint.

Because the source itself calls this out, DP records it as a **positive control** for alternative-factorization detection, not as a new result.

## D5 — restrictions are consumed at different layers

The coarse phrase AC0 restriction decomposes at least into:

- unbounded-fan-in AND/OR syntax: consumed by bottom CNF/DNF extraction and switching;
- constant/fixed depth: consumed by repeated collapse and family interpretation;
- polynomial size: consumed as a source of union/count budgets and as the quantity contradicted;
- canonical input-index bound: consumed by restriction/rekey and parity assembly;
- proper leveled shape: consumed by the switching route, but not uniquely necessary for the general endpoint because an alternative route exists;
- shared-gate circuit structure: consumed only by the circuit/formula conversion layer.

These are not one inseparable premise.

This decomposition is the principal useful output of the first control run.

## D6 — no route to unrestricted circuits has appeared

Nothing in the source or DP run licenses:

```text
AC0 lower bound
 -> unrestricted circuit lower bound
```

The first missing structural relation is not merely a stronger switching constant. It is a mechanism that survives when **depth ceases to be fixed** and the repeated-restriction reserve no longer provides the same collapse.

The current graph makes that failure location explicit:

```text
number of switching rounds
and
live-variable reserve
both depend on depth
```

At the circuit-transfer layer, unfolded formula size also has a depth-dependent exponent.

So allowing depth to grow simultaneously attacks **two separate support routes**.

This is a stronger diagnosis than saying only that Håstad's proof needs constant depth.

## D7 — candidate structural lead: eliminate one depth occurrence before attacking the other

Because fixed depth has two independent consumers, a disciplined extension campaign can test them separately.

### Candidate A — DAG-native restriction/depth reduction

Goal:

```text
avoid unfolding shared circuits to formulas
while preserving restriction/switching semantics
```

If successful, it removes the sharing-expansion dependence on depth but leaves the switching-round dependence.

### Candidate B — improved collapse invariant

Goal:

```text
replace round-count/live-reserve degradation
with an invariant that remains useful for growing depth
```

This attacks the mathematical switching occurrence directly.

The current evidence gives no reason to assume either candidate works.

But it prevents conflating them into one vague request to remove constant depth.

## D8 — relation to P versus NP

The official P-vs-NP separation route through unrestricted circuits requires a strong lower bound for a specific NP-complete problem.

PARITY notin AC0 is only a restricted-model control.

Its role is to provide a successful lower-bound architecture whose restrictions can be audited.

Therefore:

```text
useful discovery target:
    dependency structure of a successful lower bound

not:
    project PARITY result directly to SAT/P-vs-NP
```

## Novelty disposition

- explicit `hd` package redundancy: likely a new observation about this formal API, but mathematically minor;
- dual use of depth: source-derived structural synthesis, not claimed new complexity theory;
- local switching-budget factorization: source-supported synthesis, novelty not claimed;
- normalization alternative: source-explicit, not new;
- P-vs-NP theorem: none.

## Next exact experiment

Build a **depth-role split view**:

```text
D_switch
D_unfold
```

with a falsifier:

```text
removing D_unfold alone must leave a valid formula-level theorem;
removing D_switch must fail unless a different collapse mechanism is supplied.
```

Then search for a source-backed DAG-native restriction formulation and compare it against the current circuit-to-formula route.

If no exact alternative exists, keep D_unfold as QU/load-bearing in the current route rather than inventing one.
