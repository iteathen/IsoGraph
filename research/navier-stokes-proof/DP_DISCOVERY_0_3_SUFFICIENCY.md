# DP 0.8 Navier–Stokes support view 0.1

**Native:** `DP_DISCOVERY_0_3_SUFFICIENCY.isg`  
**Status:** unqualified successor discovery view  
**Authority effect:** none

## Why this is a successor instead of a rewrite

The old DP ledgers are historical records of discovery work performed under DP 0.1–0.4. Rewriting them to include minimum-sufficient-support terminology would falsify provenance.

This successor imports their current research family and adds only the new DP 0.8 question:

> Given a declared target, what support has already been shown necessary/sufficient under a declared candidate space, and what stronger minimum/valuation claims remain open?

## Objective

The declared target set is:

- whole-space R3/C contract obligations;
- periodic/D contract obligations.

No runtime, cycle-count, time, memory, or other valuation metric is supplied.

## RF-0.2 result

Candidate space:

```text
all subsets of the fixed G1–G8 vocabulary
under deletion-only reduction
```

Each G-component has a recorded deletion witness.

Therefore:

```text
RF G1–G8:
    minimal / irreducible under that removal relation
```

Not established:

```text
minimum number of components
minimum over alternate factorizations
least-cost proof
globally smallest mathematical construction
```

## S0.4 result

Candidate space:

```text
all subsets of the fixed A0–A24 interface vocabulary
under deletion-only reduction
```

Every atom has a first consumer and deletion witness.

Therefore S0.4 is likewise minimal under that declared removal relation.

No minimum over alternate interface vocabularies is claimed.

## S0.5 relation

S0.5 refines/types the S0.4 atoms as:

- 16 generator/structural mechanisms;
- 9 closure/bridge theorems.

It does not delete atoms.

The important DP 0.8 preservation rule is:

```text
a downstream certified consequence
    cannot replace its generator
    merely to make the support graph smaller
```

unless a qualified alternative support actually constructs the missing generator obligation.

## Physical-equivalence boundary

The standard-physical-equivalence view is preserved only for its established scope:

```text
exact continuum dimensional equivalence
    !=
finite-resolution measurement equivalence
```

A future minimum-support analysis cannot erase that boundary by selecting only the shared continuum endpoint.

## Valuation

```text
valuation profile: NOT SUPPLIED
ranking among sufficient alternatives: NOT ESTABLISHED
```

The absence of a valuation profile is not permission to use transition count, graph size, or another proxy as the value system.

## Next question

The main open modernization question is not whether RF/S0.4 are deletion-irreducible—they already are.

It is whether `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg` itself satisfies Core 0.19 exact-source-rendering coverage strongly enough to enter ESR qualification without a semantic successor.
