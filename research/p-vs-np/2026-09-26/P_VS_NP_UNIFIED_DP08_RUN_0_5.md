# P vs NP unified graph — DP 0.8 run 0.5: model/circuit bridge pass

**Status:** experimental discovery; no P-vs-NP resolution  
**Inputs:**
- `P_VS_NP_UNIFIED_0_3.isg`
- `P_VS_NP_MODEL_CIRCUIT_BRIDGES_0_1.isg`

## 1. Equality and circuit separation live in different ambient models

The equality representative target is:

```text
SAT in P.
```

That is a **uniform algorithmic** objective.

The common circuit-separation target is:

```text
SAT / another NP-complete problem
has superpolynomial unrestricted circuit complexity.
```

That is a **nonuniform lower-bound** objective.

The latter is sufficient because:

```text
P
    embeds into
polynomial-size circuit families.
```

Thus the two sides are not merely opposite truth values; their most common sufficient routes inhabit different representation spaces.

## 2. The nonuniform route is deliberately stronger

Because:

```text
P subset P/poly-style envelope,
```

proving:

```text
Q notin P/poly
```

is stronger than proving only:

```text
Q notin P.
```

That strength is exactly why Natural-Proofs-style barriers can attach to the circuit route without becoming barriers to every possible proof of `P != NP`.

## 3. Do not search for a false symmetry

There is no justified symmetric pair:

```text
SAT in P
versus
SAT notin P/poly
```

as logical complements.

They are different-strength statements in different ambient models.

DP therefore rejects any discovery heuristic that treats them as opposite endpoints of one scalar axis.

## 4. Model transport remains a prerequisite for authority, not for local discovery

The campaign may continue to discover structure inside the pinned Coq model.

But a claimed resolution of the official problem would additionally need the class-wide model bridge.

Therefore:

```text
local formal-model theorem
    may be exact locally

while

official P-vs-NP authority transfer
    remains blocked by model QU.
```

This is an authority/provenance boundary, not evidence against the theorem.

## 5. Strongest current graph completion result

The answer-only semantic support now has this shape:

```text
official P-vs-NP
    |
    +-- equality route
    |      formal-model representative: SAT in P
    |
    +-- separation
           base target: exists L in NP\P
           stronger sufficient route:
               NP-complete Q notin P/poly
```

Barriers attach to the chosen proof topology after this split.

## 6. Remaining graph priority

The only major semantic bridge still unresolved before the graph is suitable for a stronger completeness claim is:

```text
formal Coq/L class definitions
    <-> 
official standard Turing-machine class definitions.
```

Everything else currently missing is either:

- proof-search-space incompleteness;
- route-specific barrier detail;
- or deeper theorem discovery.

## 7. No theorem promotion

```text
P = NP: OPEN
P != NP: OPEN
official model bridge: QU
new resolution theorem: NONE
```
