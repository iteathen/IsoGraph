# P vs NP IsoGraph campaign — checkpoint 0.2

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** formal restricted-lower-bound control and contemporary barrier integrated

## New durable units since checkpoint 0.1

- `AC0_PARITY_SOURCE_REGISTRY_0_1.md`
- `AC0_PARITY_RENDER_0_1.isg`
- `AC0_PARITY_RENDER_0_1_AUDIT.md`
- `AC0_PARITY_DP08_RUN_0_1.md`
- `AC0_NATURAL_BARRIER_2026_0_1.md`
- `AC0_PARITY_AC0_NATURAL_COMPARISON_DP08_0_1.md`

## Exact/source-backed findings

### Formal API redundancy

`LeveledUFIFormulaOfSizePolyNAndDepthD` already includes `d > 0`.

Several theorems independently request `hd : 1 <= d`.

The extra occurrence is derivable from the package and is therefore nonessential as an independent hypothesis at those call sites.

This is formally exact but mathematically minor.

### Depth has two distinct support roles

The fixed-depth parameter supports:

1. repeated switching/live-reserve collapse;
2. quantitative circuit-to-formula sharing expansion.

These are distinct occurrences and should not be treated as one indivisible dependency.

### Global size factors through a local switching budget

Round zero converts global size information into a narrower internal state containing bottom fan-in and switching-gate budget.

This is a source-backed factorization, not yet a new lower-bound theorem.

## Contemporary barrier integration

The June 2026 AC0-natural barrier places switching-lemma lower bounds inside an AC0-natural proof class and establishes an unconditional quantitative limitation for that class.

Campaign consequence:

```text
stronger theorem within same proof signature
    !=
escape from proof-method barrier
```

Every candidate extension now tracks separately:

- semantic sufficiency;
- quantitative theorem strength;
- barrier signature.

## Highest-value next hinge

Exact-render the AC0-natural proof definition/barrier theorem deeply enough to identify the consumer relation that makes the formal PARITY lower-bound property AC0-natural.

Only then ask DP whether an alternative successful lower-bound factorization changes that relation.

## Current outcome

```text
P = NP: OPEN
P != NP: OPEN
new P-vs-NP theorem: NONE
new unrestricted circuit lower bound: NONE
restricted-control structural decomposition: ACTIVE
barrier-escape support: QU
```

No qualified IsoGraph authority changed.
