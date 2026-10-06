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



## Prototype results — 2026-10-06

### Frozen first pass

Run `37529153379` completed all four declared instances under HiGHS 1.15.1.

| Instance | Post-HiGHS residual | Exact row/column reduction | Factorization | Structural lead |
| --- | ---: | ---: | ---: | --- |
| `mad` | 40 rows × 220 cols | 0 | none | none |
| `glass4` | 392 × 317 | 0 | none | one repeated variable/row class |
| `supportcase26` | 434 × 436 | 0 | none | none |
| `bppc4-08` | 111 × 1455 | 0 | none | none |

Thus the frozen cheap profile **did not** duplicate ordinary HiGHS presolve on these residuals. Three instances were clean negative controls. `glass4` retained one coefficient-aware refinement lead: variables `z1&3.4` / `z1&3.8` and rows `id60` / `id70`.

### Exact `glass4` follow-up

The lead was then tested independently rather than promoted from refinement color.

The follow-up mechanically verified that swapping:

~~~text
z1&3.4 <-> z1&3.8
id60   <-> id70
~~~

leaves objective coefficients, variable domains, row bounds, and the complete residual coefficient matrix invariant. The shared selector row `id73` proves the two binary choices are at most one, so one orbit representative may be fixed without changing the optimal objective value. After the representative fix, interval activity proves the eliminated variable's private row redundant.

This licenses the exact objective-preserving quotient:

~~~text
HiGHS residual:
    392 rows
    317 columns
    1,799 nonzeros

structural quotient:
    391 rows
    316 columns
    1,795 nonzeros
~~~

The quotient does **not** preserve every raw feasible assignment; it preserves at least one representative of each relevant symmetry orbit and therefore the optimum.

Directional same-run 30-second measurements with presolve disabled on both residuals were:

~~~text
baseline residual:
    incumbent      1,900,014,950
    dual bound       800,005,016.96
    gap                        0.57895
    nodes                     14,821
    LP iterations            388,699

structural quotient:
    incumbent      1,800,016,450
    dual bound       831,607,798.40
    gap                        0.53800
    nodes                     13,749
    LP iterations            370,866
~~~

These runtime measurements are **directional only**. Neither run reached the known target optimum in 30 seconds, and no performance qualification is claimed from one timed runner comparison.

A separate exact symmetry-breaking test added `z1&3.4 >= z1&3.8` without quotienting. On its own 30-second same-run comparison it reduced processed nodes from 36,611 to 26,510 and LP iterations from 693,746 to 531,526, but the final gap was slightly worse. This supports the structural certificate while showing that fewer nodes alone is not sufficient evidence of a better optimizer.

### Correction preserved

The first symmetry-breaker workflow run `37530183939` was incorrectly marked PASS even though HiGHS model status remained `Not Set`. Its automorphism certificate remains useful evidence, but its solve comparison is invalid. The harness was repaired to reject unset solves, and run `37530547970` produced the valid directional comparison above.

### Current interpretation

The initial commercial hypothesis is **not established**, but it survived its first falsification attempt in a nontrivial way:

~~~text
4 post-incumbent-presolve residuals
-> 3 null results
-> 1 structural lead
-> 1 mechanically verified exact post-presolve quotient
~~~

The important result is not the removal of one row and one column by itself. It is that a fixed structural screen surfaced an exact residual symmetry that survived HiGHS presolve and could be converted into a legal objective-preserving transformation.

The next meaningful test is recurrence: generalize the exact automorphism/quotient detector, run a substantially larger heterogeneous MIPLIB surface, and compare against stronger dedicated presolve/symmetry systems before making any novelty or commercial-performance claim.
