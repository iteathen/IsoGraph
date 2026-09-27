# P vs NP IsoGraph campaign — checkpoint 0.1

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** first foundation/barrier checkpoint complete

## Durable work completed

1. `SOURCE_REGISTRY_0_1.md`
   - official Clay/Cook target;
   - machine-checked Coq P/NP/reduction/Cook-Levin source;
   - relativization, Natural Proofs, algebrization source freezes.

2. `P_VS_NP_FOUNDATION_0_1.isg`
   - native candidate rendering of the pinned Coq foundation.

3. `P_VS_NP_FOUNDATION_0_1_AUDIT.md`
   - declared-scope reconstruction audit;
   - independent ESR qualification still pending.

4. `P_VS_NP_BARRIERS_0_1.isg`
   - separate method-barrier layer.

5. `P_VS_NP_BARRIERS_0_1_AUDIT.md`
   - scope and assumption firewalls.

6. `TIME_HIERARCHY_CONTROL_0_1.md`
   - machine-checked successful complexity separation control.

7. `P_VS_NP_RESOLUTION_ROUTES_0_1.isg`
   - official equality and circuit-separation sufficient routes.

8. `P_VS_NP_RESOLUTION_ROUTES_0_1_AUDIT.md`
   - preserves sufficiency versus necessity distinction.

9. `CONTROL_SET_0_1.md`
   - first barrier-signature comparison controls.

10. `INITIAL_DP08_RUN_0_1.md`
    - initial structural pass.

11. `INITIAL_DP08_RUN_0_2.md`
    - route-specific barrier factorization and next discovery seam.

## Current strongest structural result

The problem should not be represented as one target followed by one universal "barrier crossing" obligation.

Instead:

```text
P-vs-NP resolution
    -> proof-route topology
    -> route-specific barrier obligations
```

In particular, Natural Proofs constrains the strong unrestricted-circuit-lower-bound route to separation, not the semantic node `P != NP` itself.

## Highest-value next work

Exact-render a successful restricted circuit lower-bound proof and inspect where each circuit restriction is first genuinely consumed.

This is the first place where IsoGraph may plausibly discover a representation/package dependency analogous to the Navier periodic finding.

## Authority

No qualified IsoGraph authority changed.

No P-versus-NP result is claimed.

DP 0.8 remains experimental/unqualified.
