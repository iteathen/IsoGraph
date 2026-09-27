# HJP naturalization triangle — DP 0.8 synthesis 0.1

**Status:** experimental discovery synthesis; no circuit lower-bound or P-vs-NP authority effect  
**Parents:** `HJP_HOLDOUT_SENSITIVITY_TULC_0_1.md`, `HJP_NATURALIZATION_HOLDOUT_DP08_RUN_0_2.md`  
**Barrier source:** Loff–Sherif–Talebanfard–Ugazio, arXiv:2606.12631 (2026)

## Objective

Refine the HJP holdout naturalization problem using three source-backed property endpoints rather than treating `(T,U,L,C)` as four equally unknown obligations.

Coordinates:

- `T`: the HJP holdout target satisfies the property;
- `U`: the property is useful for the required depth-3 lower-bound objective;
- `L`: the property is large on the relevant random-function population;
- `C`: the property is AC0-constructive from the truth table.

## Endpoint A — target-specific/block identity

A property that recognizes the exact HJP target or its exact block presentation has:

```text
T = YES
U = YES
L = NO
C = YES
```

This is only a baseline. It is too small to be natural.

## Endpoint B — limitfulness

The 2026 source abstracts the top-down lower-bound mechanism by a semantic property called **limitfulness**.

The source records:

- limitfulness is useful for the relevant top-down lower-bound mechanism;
- limitfulness is large;
- the HJP holdout target is limitful;
- the property of being limitful is described as far from constructive.

Therefore the justified campaign vector is:

```text
T = YES
U = YES
L = YES
C = QU / no known AC0-constructive implementation
```

Do **not** rewrite the source phrase “far from constructive” as a theorem that no AC0 construction exists.

This endpoint is the key new synthesis because it already closes `T`, `U`, and `L`.

## Endpoint C — known high-sensitivity natural property

The 2026 natural neighboring property has:

```text
U = YES
L = YES
C = YES
```

The derived sensitivity lemma in `HJP_HOLDOUT_SENSITIVITY_TULC_0_1.md` proves that the holdout target fails the required linear-sensitivity condition for sufficiently large input size:

```text
T = NO.
```

Hence:

```text
(T,U,L,C) = (NO, YES, YES, YES).
```

## Triangle

The three endpoints are:

```text
A  target-specific:
   (YES, YES, NO, YES)

B  limitful:
   (YES, YES, YES, QU-C)

C  high-sensitivity natural:
   (NO,  YES, YES, YES)
```

All three already have `U = YES`.

The naturalization problem is therefore not an unconstrained search for all four properties.

The strongest current seam is:

```text
constructivize a target-compatible proxy for limitfulness

or equivalently:

preserve T + U + L from the limitful endpoint
while closing C.
```

## DP consequence — constructivity is the single unresolved coordinate of the strongest endpoint

For the strongest semantic abstraction currently known:

```text
limitfulness
```

the source already supplies the target, usefulness, and largeness sides.

Thus the next discovery work should focus on the **first consumer that makes direct limitfulness recognition expensive/non-AC0-known**, rather than searching indiscriminately for a new lower-bound property.

This does not prove that constructivity is the only possible route to a naturalization. A different property may move multiple coordinates at once.

It does prove that, for the source-supplied limitfulness route:

```text
C is the only currently unresolved natural-proof obligation.
```

## Relationship to high sensitivity

The high-sensitivity property should now be treated as a **constructive proxy for limit-like hardness**, not as the target endpoint itself.

It succeeds on:

```text
U + L + C
```

but loses:

```text
T
```

because the HJP block target has only `O(sqrt(N))` one-bit sensitivity at its zero-inputs.

So the next candidate property should not merely increase the sensitivity threshold or tune constants.

It needs a different target-compatible observable.

## Highest-value candidate family

A natural candidate class is a **restriction/limit certificate** whose truth-table predicate asserts existence or abundance of local structures sufficient to witness limitfulness.

The desired implication pattern is:

```text
cheap truth-table certificate/proxy
    -> enough limit structure for HJP usefulness
```

with:

```text
HJP target satisfies proxy
random functions satisfy proxy with non-negligible probability
proxy is AC0-constructive.
```

No such proxy has been established.

Disposition:

```text
constructive proxy for limitfulness = QU
```

## Barrier firewall

A candidate proxy is not a barrier escape merely because it is new.

If it closes `C` while retaining `T,U,L`, it would instead **naturalize the HJP holdout**, placing that proof route inside the AC0-natural framework.

That would be scientifically useful because it would close the 2026 naturalization question, but it would not escape the natural-proofs barrier.

Conversely, failure to construct such a proxy does not prove non-naturalizability.

## Novelty disposition

This triangle is a structural synthesis of source-backed facts plus the derived HJP sensitivity bound.

No new depth-3 lower bound is claimed.

No non-naturalizability theorem is claimed.

The potentially new project-level result is the localization:

```text
the strongest source-supplied target-compatible abstraction
already has T + U + L;
its unresolved naturalization coordinate is C.
```

Broader literature novelty is not asserted until separately checked.
