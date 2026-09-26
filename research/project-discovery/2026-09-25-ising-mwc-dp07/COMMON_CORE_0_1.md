# Derived common core 0.1

**Status:** DP-derived partial common structure  
**Authority effect:** none  
**Whole-structure isomorphism:** not claimed

## Common structure

The blind comparison exposed this partial common organization:

```text
finite index family
    ->
repeated local binary state family
    ->
global state family

global state
    -> scalar statistical score
    -> exponential weight

all state weights
    -> finite partition aggregate
    -> normalized state probability

normalized probabilities + local binary states
    -> weighted observable

external scalar control
    -> aggregate local binary statistic
    -> statistical score
```

`COMMON_CORE_0_1.isg` records that derived view.

The “scalar statistical score” is intentionally more primitive than a shared domain word:

```text
Ising:
    score = -beta * E(configuration)

MWC:
    score = -beta * (E(microstate) - n_bound * mu)
```

Both feed an exponential state weight and a finite normalization.

## Local binary-domain correspondence

The local domains:

```text
Ising: {-1,+1}
MWC:   {0,1}
```

admit the exact affine bijection:

```text
x = (s + 1) / 2
s = 2x - 1
```

This permits structural comparison of binary local-state roles without pretending the literal encodings are identical.

## External-bias role correspondence

The Ising field contribution contains:

```text
-h * sum_i s_i
```

Under the binary affine map:

```text
sum_i s_i = 2 * sum_i x_i - N
```

so the field is, up to scale and an additive configuration-independent constant, a linear bias on the aggregate local binary count.

The MWC Gibbs score contains:

```text
+ beta * mu * n_bound
n_bound = sum_i x_i
```

Therefore the two external controls occupy an exact common algebraic role at this projected level:

```text
external scalar
    ->
linear bias of aggregate local binary state
    ->
statistical score
```

This is a parameter-role correspondence, not identity of the physical quantities.

## Residual interaction topology

The common core stops before the interaction layer.

### Ising residual

```text
site_i ---- pair factor ---- site_(i+1)
   \                         /
    ---- periodic cycle ----
```

Each local binary state participates in nearest-neighbor pair energy factors governed by J.

### MWC residual

```text
               global conformation g
                /    |    |    \
               /     |    |     \
           site_1 site_2 ...   site_n
```

One global binary conformation is load-bearing in every site's binding contribution.

There is no direct occupancy-neighbor pair energy edge in the frozen MWC candidate.

## Disposition

```text
common statistical ensemble core:  ESTABLISHED
local binary-domain isomorphism:    ESTABLISHED
external-bias role correspondence:  ESTABLISHED
interaction-graph isomorphism:      FALSIFIED
whole-structure isomorphism:        FALSIFIED
```

The result is a common core plus a load-bearing residual, which is preferable to forcing a larger false match.
