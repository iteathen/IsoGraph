# P-vs-NP model and circuit bridges 0.1 — scope audit

**Status:** bridge rendering; mixed source-backed and QU edges; no authority effect  
**Native graph:** `P_VS_NP_MODEL_CIRCUIT_BRIDGES_0_1.isg`

## 1. Formal-model bridge

Objects:

- `6100`: pinned Coq/L complexity model used by the campaign;
- `6101`: generic NP problem representation;
- `6102`: L/LM generic-machine stage;
- `6103`: multi-tape TM generic stage;
- `6104`: single-tape TM generic stage;
- `6105`: standard-TM-style computational representation;
- `6106`: class-level polynomial-overhead equivalence obligation;
- `6107`: official P-vs-NP semantic target.

The pinned formal source contains polynomial reductions/simulations used inside the Cook-Levin development:

```text
GenNP
 -> LMGenNP
 -> multi-tape TM generic problem
 -> single-tape TM generic problem
 -> SAT pipeline.
```

This is substantial evidence that the formal library is connected to standard machine models.

But those problem reductions do **not by themselves establish** the class-wide theorem:

```text
the campaign's inP/inNP definitions
    are exactly polynomially equivalent
to the official deterministic/nondeterministic
Turing-machine classes
```

for every language/predicate in scope.

Therefore:

```text
class-wide model bridge = QU
```

until a complete polynomial-overhead equivalence is rendered.

## 2. Circuit bridge

The official Cook/Clay problem description supplies the standard one-way implication:

```text
L in P
    ->
L has polynomial-size Boolean circuit families.
```

This is the bridge needed for the displayed circuit-separation route.

Objects:

- `6200`: language `L in P`;
- `6201`: deterministic polynomial-time algorithm/machine for `L`;
- `6202`: per-input-length computation unrolling;
- `6203`: polynomial-size circuit family for `L`;
- `6204`: nonuniform envelope `P/poly`-style support;
- `6205`: NP-complete problem with superpolynomial circuit lower bound;
- `6206`: resulting `P != NP`.

0.1 treats the per-length unrolling `6201 -> 6202 -> 6203` as a **source-backed explanatory factorization** of the standard implication, not as a newly formalized circuit-construction proof.

## 3. Direction firewall

The graph records only:

```text
P
    -> polynomial-size circuits.
```

It does **not** record:

```text
polynomial-size circuits
    -> P.
```

That converse is false in general as a class identity; the nonuniform model is broader.

Therefore the circuit route strengthens the separation target by leaving the uniform world:

```text
uniform P
    embeds into
nonuniform polynomial-size circuits.
```

A lower bound against the larger nonuniform envelope is sufficient to separate from P.

## 4. Separation proof

Suppose an NP-complete problem `Q` has no polynomial-size circuit family.

If `P = NP`, then:

```text
Q in NP
    ->
Q in P
    ->
Q has polynomial-size circuits,
```

contradiction.

Therefore:

```text
Q notin P/poly
    ->
P != NP.
```

This is one-way.

The graph does not assert:

```text
P != NP
    ->
some NP-complete Q notin P/poly.
```

## 5. Structural distinction

The campaign now has two different bridge types.

### Model-equivalence bridge

Desired form:

```text
formal computational model
    <-> standard computational model
```

This is an equivalence/transport obligation and remains QU.

### Uniform-to-nonuniform bridge

Known form:

```text
P
    -> P/poly-style circuit envelope.
```

This is a one-way embedding and is source-backed.

These must not be represented by the same relation type.

## Disposition

```text
formal-model -> official-model exact equivalence:
    QU

P -> polynomial-size circuits:
    SOURCE-BACKED

reverse nonuniform -> uniform:
    REJECTED / not represented

circuit lower bound -> P != NP:
    SOURCE-BACKED sufficient route
```
