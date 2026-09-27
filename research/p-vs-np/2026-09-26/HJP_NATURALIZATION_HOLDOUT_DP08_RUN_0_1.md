# HJP naturalization holdout — DP 0.8 run 0.1

**Status:** experimental structural discovery; open problem remains open  
**Inputs:**
- `HJP_NATURALIZATION_HOLDOUT_RENDER_0_1.isg`
- `HJP_NATURALIZATION_HOLDOUT_RENDER_0_1_AUDIT.md`
- `AC0_NATURAL_BARRIER_RENDER_0_1.isg`

## Objective

Locate the smallest **known structural seam** between:

1. the successful HJP top-down lower bound;
2. neighboring naturalized k-limit lower bounds;
3. an AC0-natural proof of the same holdout separation.

Do not infer non-naturalizability from current failure to construct such a proof.

## D1 — the HJP restriction is a two-consumer object

The same paired restriction has two distinct consumers:

```text
R-circuit:
    simplify hypothetical Pi-3 circuit
    by bounding negative bottom fan-in

R-target:
    preserve the special target
    as the block function consumed by Lemma 4.1
```

This is a DTS/support split.

A candidate naturalization may preserve `R-circuit` while replacing `R-target`.

Therefore:

```text
paired restriction as one monolithic premise
    is too coarse for discovery.
```

## D2 — the target-specific closure is the first unresolved naturalization hinge

For the HJP target:

```text
paired target structure
+ paired restriction
    -> exact restricted block form
    -> k-limit lower-bound mechanism
```

For a random truth table, that exact self-similar block closure is not the natural-property route used by the neighboring Meir–Wigderson construction.

The 2026 source explicitly says its known natural property does not establish the holdout separation.

Thus the first current hinge is:

```text
replace target-specific post-restriction closure
with
a large + AC0-constructive property
that still feeds a sufficiently strong limit argument.
```

This is a **problem decomposition**, not a solution.

## D3 — circuit simplification is not where naturality is currently lost

The circuit-side restriction only needs to simplify a hypothetical circuit.

The natural-property failure reported by the 2026 source is about finding a property of the function that is useful, large and constructive at the desired strength.

Therefore spending effort solely on a better fan-in-killing restriction does not address the known naturalization gap unless it simultaneously changes the function-side property.

This supplies a falsifier:

```text
better R-circuit
with unchanged R-target naturalization status
    !=
barrier-signature progress.
```

## D4 — exact target identity is stronger than the lower-bound consumer

HJP's concrete target reduces to an exact block function.

But the top-down contradiction ultimately consumes combinatorial limit structure of accepting/rejecting sets.

The 2026 Appendix already makes this abstraction explicit.

So the discovery question is not:

```text
can exact block identity be deleted?
```

That is already known to be stronger than the semantic lower-bound property.

The real question is:

```text
what weaker function-side property
still guarantees enough limit structure
at the full holdout strength
and is also large + AC0-constructive?
```

## D5 — naturalization is a constrained interpolation problem

The current source graph contains two endpoints.

### Specific endpoint

```text
HJP target-specific property
    strong enough for desired separation
    but not a known natural property
```

### Natural endpoint

```text
high-sensitivity / k-limit property
    large + AC0-constructive
    gives related but weaker lower bounds
    does not solve the holdout
```

The missing object is therefore an interpolation:

```text
Psi
such that
    HJP target satisfies Psi
    AND Psi is useful at holdout strength
    AND Psi is large
    AND Psi is AC0-constructive.
```

This four-obligation object is the exact current QU.

## D6 — the search can be decomposed by obligation rather than guessed whole

For each candidate `Psi`, test independently:

```text
T — target acceptance
U — usefulness at required Pi-3 lower-bound strength
L — largeness
C — constructivity
```

A failure vector localizes the obstruction.

Examples:

```text
(T,U,not-L,C)
    target-specific property that is too small

(T,U,L,not-C)
    combinatorially broad property that is too expensive to recognize

(T,not-U,L,C)
    natural property too weak for the holdout strength
```

The existing neighboring natural property is currently in the last category relative to the holdout objective.

This gives DP a finite falsification vocabulary without pretending the candidate space is exhaustive.

## D7 — no significant new complexity result yet

The dual-role restriction split and four-obligation interpolation view sharpen the campaign representation.

They do not resolve the 2026 open naturalization problem.

No new lower bound is claimed.

No barrier escape is claimed.

## Next experiment

Use the source's Appendix-B properties to construct a comparison table with explicit `(T,U,L,C)` status for:

1. the HJP Majority-like property;
2. the natural high-sensitivity/k-limit property;
3. the HJP Section-4 holdout target property.

Then identify the exact obligation lost when moving from the specific HJP property toward the natural variant.

Only after that comparison should DP propose any candidate `Psi`.
