# Experiment 022 — DTS decomposition semantics

**Status:** deterministic development experiment; not DTS qualification

Experiment 022 addresses the unresolved DTS 0.1 decomposition question using the source-anchored IsoMax transition already frozen in Experiment 021.

The same transition is represented twice:

- `T04A` — fine-grained decomposition;
- `T04B` — order-preserving coarse decomposition.

The alternate decomposition is not selected to manufacture a TI result. Its coarsening witness is frozen in `DECOMPOSITION_CASE.json` and is checked mechanically.

## Questions

1. Can two lawful decompositions of the same transition remain corresponding when decomposition is explicitly non-load-bearing?
2. Does the same pair correctly fail a decomposition-sensitive process comparison?
3. Does this require DTS 0.1 to introduce existential/universal quantification over all admissible decompositions?

## Expected interpretation

Under `C_WORKER_EFFECT`:

```text
K / delta / B / endpoints load-bearing
D / O projected under authority
-> decomposition difference survives as residual
-> no false negative solely from factorization choice
```

Under `C_PROCESS`:

```text
D / O load-bearing
fine topology != coarse topology
-> concrete process-view breaker
```

If these controls pass, pinned-view/pinned-decomposition semantics are sufficient for DTS 0.1's current scope. Stronger `TI^exists` or `TI^forall` decomposition-family claims remain deferred rather than being promoted preemptively.
