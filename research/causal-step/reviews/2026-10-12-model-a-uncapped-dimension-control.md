# Model A — Removing the dimension ceiling (controlled negative result)

**Date:** 2026-10-12  
**Project:** Causal Step; preserved source from Primitive Presentation's supplementary Model A Dimension Birth  
**Research direction:** Joshua Oshiro requested uncapping the graph's dimensions to see if it stabilizes, after withdrawing the previously claimed spontaneous 12-dimensional plateau.  
**Method and quantitative report:** AI-assisted local Chromium/Playwright execution with default deterministic hash and independent Rule 30 control.  
**Status:** executed numerical result, code-level causal diagnosis, and narrow comparison; **not** a physical dimension-count theorem or experimental cosmology finding.

## One-line experimental intervention

The frozen original HTML, stored under Primitive Presentation in PR #75 (Git blob `4d7e6f4bb594204afa92534d697a9a32fc3ea9a0`, SHA-256 `f23d0de70b309e3428d4987f72432d7a02b7d2f9543f6aa100695757ee388b80`), remains unchanged.

The separately derived [uncapped runnable copy](../experiments/2026-10-12-model-a-uncapped.html) makes exactly one source-line change:

```diff
-  internalDimCap: 12,
+  internalDimCap: Number.POSITIVE_INFINITY,
```

There are no other changes to the **original** growth rule, parent/child selection, spring forces, integration, thresholds, or other caps. To record numerical measurements rather than relying on wall-clock animation speed, separate telemetry-only browser copies held the original animation loop paused and explicitly invoked the original update routine in the same order. Fresh page load was used throughout, because the original Reset routine duplicates the root.

## Controlled results

| Step | Original capped, hash | Uncapped, hash | Uncapped, Rule 30 |
|---:|---:|---:|---:|
| 100 | 5 | 5 | 5 |
| 200 | 10 | 10 | 10 |
| 232 | 12 | 12 | 12 |
| 300 | 12 | 15 | 15 |
| 500 | 12 | 24 | 24 |
| 750 | 12 | 36 | 36 |
| 1,000 | 12 | 48 | 48 |
| 1,200 | — | 58 | — |
| 1,500 | — | 72 | — |
| 2,000 | — | 96 | — |
| 2,500 | — | 120 | — |

The uncapped default simulation remained finite through **2,500 steps**, with **2,999 nodes and 3,088 edges**. The original capped comparison and the independent uncapped Rule 30 input were executed through **1,000** steps, each producing 48 internal dimensions in the uncapped setting. All **120** uncapped default dimension-birth events were observed at exactly:

```
birth_step(d) = 1 + 21*(d-1),    d=1,2,...,120
dimensions_at_step(n) = 1 + floor((n-1)/21) for 1 ≤ n ≤ 2500.
```

This formula describes the **observed run**, not a theorem about unlimited operation under all future memory/pruning conditions.

## Stronger code-level explanation than the original cap

This simulation **actively creates a geometrical constraint violation during every ordinary growth update**:

1. `makeNode(parent, true)` copies the parent's current coordinate vector; the new child and parent initially coincide.
2. `makeEdge(parent, child, 'unit')` immediately assigns a rest length of `targetUnit=1` to that zero-length edge.
3. The main loop calls `birthDimensionIfNeeded()` **immediately after** `grow()`. The new edge yields a maximum length error of 1, exceeding the configured `st.max>0.52` birth threshold, provided that edge remains represented.
4. The same routine requires `step - lastDimBirth > cfg.dimBirthCooldown` with cooldown 20. Thus, when the fresh-edge condition continues, a new dimension is added on the next eligible step: once every **21** steps.
5. The previous `dim < cfg.internalDimCap` guard stopped that sequence at twelve. With the guard effectively unlimited, the schedule simply continues.

**Result:** The model has **no internal mechanism that selects twelve as a stable preferred dimension count**. Moreover, dimension growth is not presently an independent test of geometrical necessity: the program itself continually creates the unmet edge-length condition that causes new dimensions. To investigate *genuine saturation*, a separately authorized experimental variant would need to alter this construction or the criterion, not merely remove the cap. Those would be **additional controlled interventions**, not a correction silently applied to the historical source.

## Orbiting pattern remains a distinct observation

The orbiting-like behavior **survives removing the dimension cap** in a defined 2D projection. For a same 107-node cohort tracked **at every simulation update** from step 200 to 950 and measured relative to the instantaneous graph center of mass:

| Projected x–y winding | Original capped | Uncapped |
|---|---:|---:|
| Trajectories with >1 net revolution | 65 / 107 | 64 / 107 |
| Trajectories with >2 net revolutions | 33 / 107 | 31 / 107 |
| Median absolute net revolutions | 1.364 | 1.369 |
| Mean velocity share tangential to center in first 3 coordinates, step 1,000 | 0.7425 | 0.7385 |

The winding directions and time-dependent radial variations are not a demonstration of smooth or gravitationally bound orbital trajectories. The renderer projects only three of potentially 120 internal coordinates. **The narrow conclusion is that the observed projected circulation is not an artifact of the explicit twelve-dimension ceiling.**

## Reproduction and authority limits

The original calculation is browser JavaScript, not a new differential equation reimplementation. Controlled test copies were evaluated with headless Chromium. The complete local experiment supplies downloadable runnable HTML, Playwright script, numeric CSV and JSON checkpoints, chart, and original-renderer snapshots as conversation artifacts. To run independently, open the experiment HTML in a modern browser; it advances automatically. The original source SHA can be checked and its cap line diffed against the new copy.

**Research disposition:** The twelve-dimensional correspondence with Lisi/Woit was already **withdrawn by the user** and is refuted for this implementation by controlled uncapping. The orbital-looking node motion is a separate, reproduced **simulation** phenomenon deserving carefully defined trajectory tests. No new Causal Step physical premise or IsoGraph qualified semantic claim follows.
