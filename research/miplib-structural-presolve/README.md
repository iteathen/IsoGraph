# MIPLIB structural presolve prototype

**Status:** bounded prototype experiment  
**Date:** 2026-10-06  
**Branch:** `experiment/miplib-structural-presolve-20261006`

## Question

Can an IsoGraph-shaped structural analysis find exact, useful residual structure **after** a mature MIP presolver has already simplified a mixed-integer model?

The commercial hypothesis is deliberately narrower than "build a new MIP solver":

```text
MIP model
-> incumbent presolve
-> residual formal system
-> structural closure / quotient / factorization
-> smaller exact residual
-> same incumbent solver
```

A positive result only counts when it survives that control.

## Why this is a useful falsifier

Ordinary MIP presolve already performs extensive local and global simplification. This experiment therefore starts from the **HiGHS 1.15.1 presolved residual**, not the raw input. If the fixed structural pass finds nothing, that is useful evidence that these low-cost rules duplicate mature presolve and that deeper semantic structure is required.

The experiment is not allowed to claim:

- reductions already performed by HiGHS;
- heuristic resemblance as exact equivalence;
- a runtime win caused only by different solver settings;
- objective preservation without an exact reduction law and a solver cross-check.

## Frozen first-pass profile

The reduction/search profile was declared before observing the benchmark outcomes:

1. **Identical-row interval intersection — exact.** Rows with the same coefficient vector are replaced by the intersection of their lower/upper intervals.
2. **Identical-column aggregation — exact under the implemented guard.** Ordinary continuous/integer interval variables with identical constraint incidence and identical objective coefficient are replaced by one sum variable with the summed interval bounds.
3. **Disconnected-component detection — exact structural signal.** The residual row-variable incidence graph is decomposed into connected components. This prototype reports the factorization rather than claiming the incumbent cannot exploit it internally.
4. **Coefficient-aware bipartite refinement — lead only.** Six rounds of row/variable neighborhood refinement identify repeated structural signatures. These classes are **not** treated as identity, symmetry, dominance, or a legal quotient without a stronger proof.

No outcome-dependent rule is added during the first run.

## Instances

The initial set intentionally mixes different structures while staying small enough for a quick prototype:

| Instance | Reason for inclusion |
| --- | --- |
| `mad` | dense mixed-binary mean-absolute-deviation model |
| `glass4` | nesting/cutting-style mixed-binary model |
| `supportcase26` | sparse precedence/support-style mixed-binary model |
| `bppc4-08` | bin-packing / set-partitioning-style model |

Source bytes are downloaded at execution time from the official MIPLIB instance endpoint and SHA-256 hashed into the result. Model bytes are not committed to this repository.

## Controlled solve comparison

For each instance the harness records:

1. original model solved by HiGHS with its normal presolve;
2. exported HiGHS presolved residual solved with presolve disabled;
3. structurally reduced residual solved with presolve disabled.

The residual comparison therefore uses the same backend and solver settings on both sides.

The current prototype uses:

- HiGHS 1.15.1;
- one thread;
- parallel mode off;
- deterministic random seed 0;
- 15 second limit per solve;
- exact MIP relative gap target 0.

The runtime numbers are **directional prototype measurements**, not a performance qualification. The primary first-pass question is whether exact residual reductions or structurally strong leads exist at all.

## Acceptance

The workflow is PASS only when all four instances execute without harness errors and every solved reduced model agrees with its corresponding presolved residual objective. When the reduced solve reaches optimality, it is also checked against the current MIPLIB target objective embedded in the frozen harness.

A null structural result is a valid PASS.

## Interpretation

Signals are classified as:

- `POSITIVE_EXACT_POST_PRESOLVE_REDUCTION` — at least one frozen exact row/column reduction survived HiGHS presolve;
- `POSITIVE_EXACT_FACTORIZATION_SIGNAL` — no frozen row/column reduction, but the residual graph has multiple disconnected nontrivial components;
- `STRUCTURAL_LEAD_ONLY` — refinement found repeated signatures requiring stronger proof;
- `NO_POST_PRESOLVE_SIGNAL` — this profile found no residual structure worth pursuing.

## Evidence boundary

This is a fast prototype of the commercial hypothesis, **not** a Core 0.21-qualified IsoGraph rendering and not a claim of a new MIP presolve theorem. Any promising rule must be independently re-derived, formalized, falsified on broader instances, compared against stronger incumbent presolvers, and benchmarked before promotion.

## Provenance

On 2026-10-06 Joshua Oshiro proposed targeting economically valuable optimization problems that are difficult conventionally but structurally low-hanging for IsoGraph: render one formal optimization system, expose equivalence/dominance/dead support/factorization, and reduce the problem before incumbent search. This prototype is an agent-assisted implementation of that research direction.

