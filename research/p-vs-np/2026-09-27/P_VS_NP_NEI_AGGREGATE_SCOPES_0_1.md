# P versus NP NEI overlay 0.4 — aggregate future-value scopes

**Status:** research successor  
**Predecessor:** `P_VS_NP_NEI_OVERLAY_0_3.isg`

## Q-MIN — shortest accepting continuation identity

Record:

`160010`

For one fixed input/verifier/depth/remaining bound, define the exact scoped observable:

```text
D(p)
    =
minimum length of an admissible accepting continuation from p

or
    INF
if no accepting continuation exists.
```

Two residuals are Q-MIN SAME exactly when this scoped value is identical.

This scope is:

- coarser than Q-RESIDUAL;
- finer than Q-EXISTS, because Q-EXISTS only distinguishes finite from INF.

No global prefix identity follows.

## Q-COUNT — accepting-continuation count identity

Record:

`160011`

For one fixed finite continuation domain, define:

```text
N(p)
    =
number of admissible accepting continuations from p.
```

Two residuals are Q-COUNT SAME exactly when the exact count is identical.

This scope is generally incomparable with Q-MIN beyond their common implication to Q-EXISTS:

```text
N(p)=0
IFF
D(p)=INF
IFF
E(p)=FALSE.
```

Equal minimum distance need not imply equal count.
Equal count need not imply equal minimum distance.

## QU

Both scopes remain QU-mediated whenever unresolved continuation structure can alter the aggregate value.

NEI must not average over QU realizations or choose a realization to force equal aggregate values.

## Purpose

These scopes test a different kind of compositionality than Q-RESIDUAL.

Q-RESIDUAL is compositional under each labeled witness extension.

Q-MIN and Q-COUNT are compositional under aggregate recurrences:

```text
MIN over children
SUM over children.
```

They may therefore expose exact compact values even when right-congruence identity is much finer.

Compact semantic range is not treated as computational accessibility.
