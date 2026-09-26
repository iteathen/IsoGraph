# Ising / MWC common core 0.2 — recomputed from modernized renderings

**Status:** derived partial common structure; not semantic authority  
**Predecessor:** `COMMON_CORE_0_1.isg` preserved unchanged  
**Derived from:** `ISING_RENDER_0_2.isg` and `MWC_RENDER_0_2.isg`  
**Native:** `COMMON_CORE_0_2.isg`  
**Signature:** `COMMON_CORE_0_2_SIGNATURE.json`

## Derivation boundary

The 0.2 common core was recomputed after the source renderings were modernized. It does not use the 0.1 common core as evidence.

The projection keeps only structure supported on both sides:

```text
finite index family
    ->
local binary state per global state/index
    ->
global state family

local binary states
    -> aggregate local statistic

source-specific internal score
+ external scalar bias on aggregate local statistic
    -> total statistical score
    -> exponential state weight
    -> finite partition
    -> normalized probability
```

The source-specific internal-score port is intentionally opaque in the common core. Its realizations are load-bearing residuals and are not declared isomorphic.

## Exact local binary bridge

The two local domains admit the affine bijection:

```text
Ising: s in {-1,+1}
MWC:   x in {0,1}

x = (s + 1) / 2
s = 2x - 1
```

This supports a binary-state role correspondence. It does not identify spin and occupancy as the same physical quantity.

## External-control correspondence

For Ising, the contribution of the external field to the Boltzmann exponent is:

```text
+ beta * h * sum_i s_i
```

Using `sum_i s_i = 2 sum_i x_i - N`, this is a linear bias on the aggregate binary count plus a state-independent additive constant.

For the frozen MWC rendering, the ligand-control contribution to the Gibbs exponent is:

```text
+ beta * mu * n_bound
```

with `n_bound = sum_i x_i`.

Therefore the projected common role is:

```text
external scalar
    -> linear bias of aggregate local binary state
    -> total statistical score
```

The parameter scaling and physical interpretation remain residual.

## Load-bearing residuals

### Ising residual

The source-specific internal score includes nearest-neighbor spin coupling on a periodic cycle:

```text
-J * sum_i s_i s_(i+1)
```

This is local pair topology.

### MWC residual

The source-specific internal score includes:

- one global binary conformation;
- conformation energy;
- conformation-dependent site binding contributions.

The same global conformation is load-bearing across the site's binding contributions.

This is not nearest-neighbor occupancy coupling.

## Disposition

```text
finite statistical-ensemble skeleton:       SUPPORTED
binary local-state affine bridge:           SUPPORTED
external aggregate-bias role:               SUPPORTED
interaction topology isomorphism:           FALSIFIED
whole-structure isomorphism:                FALSIFIED
```

## Core 0.19 / DP 0.8 posture

The common core is a derived view, not source-explicit structure.

Its support lineage is the pair of 0.2 successor renderings plus the exact affine calculation above.

No natural-identity claim is made.

No minimum-sufficient-support or valuation claim is made here; DP 0.8 is not invoked merely because a smaller common projection exists.

A future sufficiency analysis must declare its target separately.
