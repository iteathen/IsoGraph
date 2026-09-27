# P vs NP IsoGraph campaign — checkpoint 0.9

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** campaign refocused on unified IsoGraph before further literature exploration

## New durable units

- `P_VS_NP_UNIFIED_0_2.isg`
- `P_VS_NP_UNIFIED_0_2_AUDIT.md`
- `P_VS_NP_UNIFIED_DP08_RUN_0_3.md`

## Unified semantic structure

Known inclusion:

```text
P ⊆ NP
```

reduces the unresolved terminal obligations to:

```text
P = NP
    <-> NP ⊆ P

P != NP
    <-> exists L in NP \ P.
```

Cook-Levin supplies the equality-side NP-complete adapter.

The official circuit route supplies one stronger sufficient separation target.

Barriers attach to proof topologies after route selection; they are not a universal conjunction attached to the problem statement.

## Important graph defects still to close

1. insert `FSAT` into the native Cook-Levin chain;
2. close `A <=p B` + `B in P` -> `A in P`;
3. render the pinned formal-model / standard-Turing-model bridge;
4. render the uniform-P / polynomial-circuit bridge used by the circuit route.

These now have priority over additional web/literature exploration.

## DP result

No P-vs-NP theorem.

The main structural result is the equality/separation asymmetry:

```text
equality:
    universal class inclusion
    -> concentrated NP-complete representative

separation via circuits:
    existential class separation
    -> stronger nonuniform lower-bound target.
```

No global minimum proof-support claim is permitted because the candidate route space is not exhaustive.

## Authority

No qualified IsoGraph authority changed.
