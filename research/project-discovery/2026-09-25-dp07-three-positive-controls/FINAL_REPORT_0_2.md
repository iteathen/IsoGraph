# DP 0.7 three-positive-control run — Final report 0.2

**Status:** COMPLETE QUALIFIED-TRANSLATION BLIND RUN  
**Workflow run:** `36222604050`  
**Experiment SHA:** `821ba98e957b43d8def31bbfabf7253a2b47e429`  
**Evidence commit:** `98fbf2d6619f90a83c9b7d2ee11f5a4ffb18c854`  
**Pre-oracle freeze:** `30edb1e333d4ae3a7fcf7f51c47d88d5a9a5fe5c`  
**Translation Q7 promotion:** `f13aca1420327d7c1dc9a95ff78df44ffd820170`  
**Discovery model actually selected:** `gemini-3.1-flash-lite`  
**Packet SHA-256:** `93439fbe2ba502edbe01cab94e71f7952e3809b594b2d7418cb2c7e7bf79fcc5`  
**Report SHA-256:** `3f26c87f45b6a4a895b958a6b653b2831c23372f79ab765e3ddc01129eb18839`  
**Oracle access during discovery:** none

## Translation gate

All six source-to-native renderings passed ESR 0.1 and were explicitly Q7-promoted before this run.

The discovery packet therefore used the exact promoted `blind-v2` native/signature blobs, not the original skeletal packet from run `36213568767`.

## Scored result

The blind reasoner returned `EXACT_WITNESS` for all three cases.

Hidden-oracle scoring does not accept those self-dispositions:

```text
case-01: CLAIMED_MAPPING_FALSIFIED_LOCALLY
case-02: PARTIAL_WITNESS_RECOVERED
case-03: CLAIMED_MAPPING_FALSIFIED_LOCALLY

accepted exact witnesses: 0 / 3
DP 0.7 qualification: NOT ESTABLISHED
current run: FAILS QUALIFICATION GATE
```

## Case 01

The reasoner correctly noticed that both sides share site/edge/configuration structure and normalized exponential weighting, but it treated the two renderings as directly isomorphic and proposed:

```text
J -> epsilon
h -> mu
```

with no residual.

That is locally false under the frozen sources.

The required binary bridge is:

```text
n_i = (s_i+1)/2
s_i = 2n_i-1
```

For an undirected degree-2 graph:

```text
sum_<ij> s_i s_j
 = 4 sum_<ij> n_i n_j
   - 4 sum_i n_i
   + |E|

sum_i s_i
 = 2 sum_i n_i - N
```

Therefore:

```text
E
 = -4J sum_<ij> n_i n_j
   + (4J-2h) sum_i n_i
   + (-J|E|+hN)
```

so one exact parameter transport is:

```text
epsilon = -4J
mu      = 2h-4J
C       = -J|E|+hN
```

and:

```text
E = G + C
w_A = exp(-beta C) w_B
Z_A = exp(-beta C) Xi_B
P_A = P_B
```

The blind report recovered none of that load-bearing affine state/parameter transformation and explicitly claimed that no residual existed.

## Case 02

The reasoner explicitly recovered:

```text
F <-> 0
T <-> 1
```

and recognized parity/row-sum correspondence.

That is real positive evidence, but the exact witness is incomplete.

The report did not explicitly discharge:

- `XOR <-> gf2_add`;
- target `<->` right-hand side;
- selected variable `<->` coefficient 1;
- the exact constraint-to-row mapping;
- satisfaction preservation in both directions.

It also misdescribed the all-constraints check as a finite fold. In the frozen renderings, the finite fold computes parity/row sum; universal quantification checks all constraints/rows.

Therefore the case is scored `PARTIAL_WITNESS_RECOVERED`, not exact.

## Case 03

The reasoner recognized the harmonic-oscillator family and shared `q,m,k`, but proposed direct role renaming:

```text
v -> p
a -> H
```

That is locally false.

The exact bridge requires:

```text
p = m v = m qdot
pdot = m a = m qddot
```

Hamilton to Newton:

```text
qdot = p/m
pdot = -kq
pdot = m qddot
=> m qddot + kq = 0
```

Newton to Hamilton after introducing `p=m qdot`:

```text
qdot = p/m
pdot = m qddot = -kq
```

Also, `H` is the frozen energy function

```text
H = p^2/(2m) + k q^2/2
```

and is not acceleration.

The report omitted the momentum/velocity scaling bridge, both exact reconstructions, and the no-extra-physical-degree obligation while claiming no residuals.

## Main result

The exact-rendering correction successfully removed the earlier ambiguity about whether the input structures themselves were faithful.

The remaining failure is downstream of rendering:

```text
exact source rendering
    + familiar high-level recognition
    !=
exact discovered isomorphism witness
```

The blind reasoner recognized all three intended families but promoted insufficient or locally false mappings to `EXACT_WITNESS`.

This is precisely the class of error the qualification campaign must reject.

## Provider/execution note

The configured stronger Gemini candidates were unavailable through quota/high-demand failures during the run. The successful external reasoner was `gemini-3.1-flash-lite`, without the high-thinking mode used by the stronger candidates.

That is a legitimate execution-strength confound and should be tested before attributing the entire failure to DP 0.7 itself.

It does not rescue the current exact-witness claims: cases 01 and 03 are concretely falsified by the frozen structures.

## Next qualification question

Before changing DP 0.7, inspect the current protocol to distinguish:

1. **protocol gap:** DP 0.7 does not mechanically require every candidate exact witness to descend back through its primitive support and satisfy explicit bidirectional transformation obligations; or
2. **execution failure:** DP 0.7 already requires that descent, but the fallback reasoner did not follow it.

Only the first finding justifies a protocol correction.

The current score is recorded in:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/SCORE_0_2.json`
