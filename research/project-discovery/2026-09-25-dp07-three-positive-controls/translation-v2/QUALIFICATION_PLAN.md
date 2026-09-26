# Translation qualification plan — v2

**Status:** REQUALIFICATION REQUIRED UNDER CORE 0.19 EXACT-RENDERING CONTRACT
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


## Current normative dependencies

This campaign now depends on:

- `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`, section 18;
- `qualification/EXACT_SOURCE_RENDERING_CONTRACT_0_1_CANDIDATE.md`.

The exact-rendering contract supersedes any weaker interpretation of the earlier Q0-Q6 outline.

Current required stages are:

```text
Q0 source freeze / interpretation closure
Q1 zero-gap native semantic coverage
Q2 native closure / parse / binding integrity
Q3 at least two independent cold native-only reconstructions
Q4 canonical source/reconstruction sameness for every decoder
Q5 adversarial distinction-preservation controls
Q6 scorer-blind independent verification
Q7 explicit promotion for downstream discovery use
```

No partial credit qualifies a translation.

## Evidence revision rule

Runs `36214440767` and `36214599787` occurred before the exact-rendering Core/qualification contract was added.

They are retained as historical diagnostic evidence.

They do **not** automatically qualify the current translation revision.

They may contribute only if explicitly reviewed and rescored against every current ESR 0.1 obligation; otherwise the qualification must rerun.
