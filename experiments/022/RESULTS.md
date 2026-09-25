# Experiment 022 — Results

**Status:** development PASS; not qualification  
**Test commit:** `321f11ef691b950137d27a4a8fb491dd13990ffa`  
**Repository Verify run:** `36184571451`

## Deterministic result

```text
Experiment 022 DTS decomposition controls: PASS
```

The tested transition pair is `T04A` / `T04B`, two lawful factorizations of the same source-anchored IsoMax worker transition.

The test mechanically established:

1. source projections are identical;
2. target projections are identical;
3. `K`, `Delta-`, `Delta+`, `Delta~`, and `B` effect regions are identical;
4. `D` and `O` differ;
5. the coarse decomposition is an order-preserving contiguous grouping of the fine decomposition;
6. the frozen `C_WORKER_EFFECT` view projects `D/O` and preserves them as explicit residuals;
7. the deterministic TI witness shape verifies under the effect view;
8. the frozen `C_PROCESS` view makes `D/O` load-bearing;
9. exact decomposition/order cardinality differences provide a concrete process-view breaker.

## DTS 0.1 consequence

No decomposition-family quantifier is required for DTS 0.1 merely to avoid false negatives caused by lawful alternative factorization.

The base semantics remain:

```text
comparison view pins what is load-bearing

if D/O projected under authority:
    different lawful decompositions may coexist as residuals

if D/O load-bearing:
    their structural mismatch may reject TI
```

Future `TI^exists` or `TI^forall` claims over admissible decomposition families remain possible research topics, but Experiment 022 does not justify adding them to DTS 0.1.

This is development evidence, not DTS qualification.
