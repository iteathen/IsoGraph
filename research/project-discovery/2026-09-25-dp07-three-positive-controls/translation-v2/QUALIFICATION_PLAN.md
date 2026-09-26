# Translation qualification plan — v2

**Status:** ACTIVE
**Purpose:** qualify each source→IsoGraph translation before any DP 0.7 result is admitted.

## Exact gate

For every source object `X` and native bundle `C`:

```text
X -> C -> isolated reconstruction X'

PASS only if:
X' is canonically structurally equivalent to X
under the frozen source interpretation and scope.
```

This is source-semantic structural sameness, not NEI natural-object identity.

## Required layers

```text
Q0 source normalization freeze
Q1 native formula/constraint coverage audit
Q2 native parse/signature integrity
Q3 two independent cold reconstructions from native bundle only
Q4 source-vs-reconstruction sameness adjudication
Q5 adversarial no-silent-repair / no-added-fact checks
Q6 translation promotion for discovery use
```

A failure at Q0-Q5 blocks use of that translation as DP evidence.

## Sidecar boundary

Semantic signatures may give human gloss for stable theory symbols.

They MUST NOT contain formula bodies or relations that are absent from the native `.isg`.

```text
native payload = formula / constraint structure
signature      = symbol names only
```

## Discovery gate

Only bundles with Q6=PASS enter the DP 0.7 cold-discovery packet.

The earlier skeletal DP run 36213568767 remains diagnostic only.
