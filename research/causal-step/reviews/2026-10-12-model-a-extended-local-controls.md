# Model A — extended uncapped horizon, node-cap isolation, and full-dimensional orbital diagnostics

**Recorded:** 2026-10-12 (follow-up to the existing Model A audits)  
**Research direction:** Joshua Oshiro, Causal Step; request to remove artificial dimension ceilings and test whether orbit-like motion remains after uncapping.  
**Investigation:** AI-assisted local numerical controls and numerical analysis.  
**Authority:** exploratory toy-model observations, **not** a dimension-selection theorem, gravity model, Causal Step derivation, or qualified IsoGraph semantic result.

## Evidence boundary and reproducibility

The historical [Model A HTML](https://github.com/iteathen/IsoGraph/blob/research/import-archived-papers-20261012/research/primitive-presentation/evidence/source/supplementary/model-a-dimension-birth.html) remains frozen on the **separate source-import branch** `research/import-archived-papers-20261012`, PR #75, Git blob `4d7e6f4bb594204afa92534d697a9a32fc3ea9a0`. The [one-line uncapped browser version](../experiments/2026-10-12-model-a-uncapped.html) and original [Chromium comparison](2026-10-12-model-a-uncapped-dimension-control.md) already existed on Causal Step PR #78 when this follow-up began.

**New execution method:** the original JavaScript *dynamical functions* (`qfWord`, Rule 30, constructors, `grow`, `ensureDim`, `constraintStats`, `birthDimensionIfNeeded`, `accumulateForces`, `integrate`, `computeEnergy`, and `computeAngularMomentum`) were independently transcribed into a Node 22 diagnostic runner. Browser rendering, controls, HUD, history ring buffers, and animation scheduling were omitted. The original per-substep order remained `grow -> dimension birth -> forces -> integrate`. Every run began from the original fresh `makeNode(null,false)`, not the defective Reset path. **These new runs used the source-faithful Node extraction, not Chromium; they are independent cross-checks, not claims of byte-identical browser execution.** Code and raw per-update CSVs were generated locally as conversation artifacts. A separate [source-extracted Node replay](../experiments/model-a-source-core-replay.mjs) has also now been committed as a portable reproducibility path: it mechanically retains the original dynamical code and exposes exactly four separately selected configuration controls. The new portable script has not been re-executed in this follow-up; its numerical output should be compared to these independently reproduced checkpoints. See the separately archived source-exact browser test for an additional, differently implemented execution check.

Checks against the prior source-exact Chromium audit were successful: at step 200, **533 nodes / 682 edges / 10 dimensions**; at step 250, **662 / 849 / 12**; and at step 1,000, **2,599 / 3,364 / 12 (capped)**. The capped and uncapped 200–950 cohort winding counts also reproduce **65/107** and **64/107** respectively.

## A. Uncapped horizon beyond the earlier 2,500 steps

| Step | Uncapped dimension | Nodes | Edges | Connected components |
|---:|---:|---:|---:|---:|
| 200 | 10 | 533 | 682 | 1 |
| 500 | 24 | 1,321 | 1,705 | 1 |
| 1,000 | 48 | 2,599 | 3,364 | 1 |
| 1,500 | 72 | 2,999 | 3,234 | 150 |
| 2,500 | 120 | 2,999 | 3,088 | 209 |
| **3,000** | **143** | **2,994** | **3,056** | **227** |

At 3,000, the last dimension birth was **step 2,983 (dimension 143)**; the sequence of all 143 observed births obeyed `birth_step(d) = 1 + 21*(d-1)`. All inspected state coordinates/velocities were finite. **There was no observed intrinsic plateau, oscillation, or runaway divergence in the 3,000-step window.** The observation horizon and executable memory are finite; no claim is made about all future steps. In particular a steady periodic growth schedule is not a convergence to a preferred dimension.

**Why periodic:** a newborn copies the parent's coordinates and receives a spring edge of target length 1. Immediately after `grow`, the distance is zero and the edge error is 1; `st.max>0.52` therefore remains eligible when a newborn edge is retained. With `dimBirthCooldown=20` and condition `step-lastDimBirth>20`, growth proceeds every 21 updates. A graph constraint *violation* is being explicitly generated, not an independent geometric argument that another dimension is required.

## B. Mechanism controls — each separately labeled

| Variant | Intervention relative to uncapped source | Last step | Dimensions | Nodes | Components | Interpretation |
|---|---|---:|---:|---:|---:|---|
| Source-capped hash | Only dimension cap=12 | 1,000 | 12 | 2,599 | 1 | Positive imposed-ceiling control |
| Source-uncapped hash | Dimension cap=Infinity | 1,000 | 48 | 2,599 | 1 | One-variable uncapping test |
| Source-uncapped hash, extended | Same as above | 3,000 | 143 | 2,994 | 227 | No dimension plateau; later graph pruning |
| Rule 30 input | Only deterministic source changed from uncapped | 1,000 | 48 | 2,992 | 85 | Topology varies, dimension schedule unchanged |
| **No node ceiling** | Only `maxNodes=Infinity` relative to uncapped | 1,500 | 72 | **3,471** | **1** | The default node cap is causally implicated in fragmentation |
| **No spring force** | Only `springK=0` relative to uncapped | 950 | 46 | 2,496 | 1 | Dimensions continue while circulation disappears |

The no-node-cap comparison retains normal age/dead-node pruning and maxEdges=9,000. It demonstrates how the hard maximum-node truncation affects connectivity **under these settings**, not that every disconnection is impossible without it. The Rule 30 source grows fast enough to reach node truncation by 1,000; its 85 components should not be attributed to dimensionality.

## C. Orbital claim — what is stronger and what is unresolved

For the exact same 107 IDs divisible by 5 chosen at step 200, sampled **at every numerical step through step 950**, angular positions were calculated about the changing whole-graph center of mass; fixed-step-200-center values were also saved. Source-capped: **65/107 >1** net x–y revolution, **33/107 >2**. Uncapped: **64/107 >1**, **31/107 >2**, with **63/107 >1** against a *fixed* center. Uncapped no-spring control: **0/107 >1**; all velocities remain zero. Thus circulating trajectories arise from the chosen forces acting on evolving topology, not from a camera animation or dimension cap alone.

Additional **full-internal-dimensional** kinematic diagnostics (do not confuse them with proof of orbital binding):

- Median full-dimensional center-relative radial coefficient of variation across the uncapped 107-node cohort: **approximately 0.310** over 200–950. Among the 64 with >1 projected winding, median is **approximately 0.304**. **None** of those 64 has full-dimensional radius CV under 0.1.
- Among the 64, median magnitude of end-to-start *full-radius change*, normalized by mean full radius, is **approximately 0.351**, and median number of changes of signed projected angular direction is **23**. Many paths reverse or drift rather than exhibiting smooth constant-radius revolution.
- Median `r_xy² / r_full²` (first two coordinates divided by all internal coordinates) falls from **0.916 at step 200** to **0.243 at step 950** in the uncapped cohort: a 2D winding pattern hides most of the high-dimensional radial geometry at late times.
- Potential near-axis projection artifacts were independently checked: discard each angular increment if either endpoint is within **25% of that node's median projected radius**. Under this explicitly narrower measure, **58/107 uncapped trajectories** still have >1 net x–y revolution, versus the ordinary 64/107. The x–z and y–z planes independently give **62/107** and **61/107** raw >1 projected windings in the uncapped run. Plane-to-plane circulation is not proof of a stable intrinsic full-dimensional orbit.
- The average full-space tangential *velocity* share is appreciable (approximately 0.825 averaged over per-node temporal averages). That is a kinematic indication of transverse movement relative to the evolving center, not conserved angular momentum or central gravitational force.

The originally reported visible circulation is a **genuine numerical trajectory phenomenon** for the simulated spring system, and robust to the 12-dimension ceiling removal. **Long-lived, radially confined, gravitational or Keplerian orbital motion has not been established.** The graph grows and prunes nodes, changes effective masses and edges, and periodically adjusts coordinates when introducing dimensions; it is not a closed Hamiltonian system for which standard orbit/energy invariants can simply be assumed.

### Post-950 persistence and programmed survival horizon (separate telemetry-only follow-up)

A second local **uncapped source-faithful Node extraction** continued the *same step-200 cohort of 107 IDs*, with no change to source dynamics, through 2,000 steps. Surviving cohort nodes numbered **107 at 950**, **105 at 1,000**, **93 at 1,200**, **73 at 1,250**, **21 at 1,500**, and **0 by 1,750**. Among the **93 surviving throughout the interval 950–1,200**, **46** performed **more than one additional net x–y revolution** during those 250 steps, around the evolving center of mass. This establishes ongoing projected circulation beyond the original 200–950 measurement rather than a single early transient.

The loss of every original ID by 1,750 follows the program's old-node pruning and maximum-node truncation regime; it does **not** demonstrate physical orbital decay or gravitational stability. The follow-up tracked individual ID existence and late projected winding; **full-dimensional orbit closure remains unverified**. The portable source-extracted replay now contains the corresponding post-950 ID-survival/late-winding telemetry (its own post-commit execution remains an independent check), and local raw survivor CSVs were generated.

## D. Energy, momentum, numerical and computational diagnostics

- At step 1,000, capped `KE+PE` ≈ **745.45**, uncapped ≈ **689.12**. Both energy totals rise as new springs and zero-initial-velocity mass are introduced: they do **not** establish a failure of spring-force conservation in a fixed-mass closed graph.
- Uncapped `|L|` in the first three coordinates is near numerical zero at step 200, and ≈ **0.938** at step 1,000. The all-dimension angular bivector diagnostic can be nonzero earlier (≈ **0.533** at step 200), and the system is altered by dimension births and graph edits. This quantity cannot be treated as a conservation theorem.
- The source uses `dt=0.06`, zero damping, equal-and-opposite pairwise forces, and symplectic Euler. Finite-state scans found no NaN/Infinity at sampled checkpoints through 3,000.
- On this **single local Node 22 runtime**, capped 1,000 averaged ≈ **1.11 ms/update** (last 100 ≈ 3.30 ms), uncapped 1,000 averaged ≈ **1.70 ms/update** (last 100 ≈ 4.70 ms), and uncapped 3,000 averaged ≈ **10.82 ms/update** (last 100 ≈ 22.27 ms). Values include the growth/force/integration source routines but exclude checkpoint and CSV reporting overhead. These are *hardware/GC-dependent observational timings*, not intrinsic physics.
- Process resident memory at the final recorded checkpoints: capped 1,000 ≈ **161 MB**; uncapped 1,000 ≈ **168 MB**; uncapped 3,000 ≈ **252 MB**. RSS includes the Node runtime, heap, arrays and instrumentation; it is not an isolated graph-data size.

## E. Source-level origin versus interaction-generated patterns

**Programmed:** maximum dimension cap (in original), positive target length on zero-length newborn edges, threshold and cooldown, maxNodes/maxEdges truncation, deterministic source selection, new-axis coordinate offsets, spring force formula, symplectic Euler stepping, and the use of first three coordinates for rendering.

**Evolving under these rules:** the particular graph's connectivity/density, detailed node velocities, nonuniform winding, counter-rotating trajectories, radial drift, local clustering and global emergence-looking display patterns. These are outputs of the program, **not** derived gravitational or relativistic laws.

## Limits and next falsification tests

Full-dimensional return-distance/path-length analysis, alternative `dt` and spring stiffness, longer no-node-cap horizons, birth-rule saturation under a non-self-triggering edge initialization, fixed-topology spring conservation controls, and actual-renderer snapshots of the *extended* horizon remain unverified in this specific follow-up. The original and uncapped HTML were not modified. Full raw CSV traces and the locally executed diagnostic-runner source are conversation artifacts; a second compact reproducibility runner is now committed under \`experiments/\`.  this review preserves the most important quantitative observations in GitHub even if those artifacts are unavailable to later readers.

**Interpretive result:** A/B — continued growth (143 at 3,000), **no intrinsic stabilized dimension count**. C — robust *projected* circulation, insufficient full-dimensional bound-orbit evidence. D — a mixture of explicitly triggered dimensions and genuinely evolving but mechanically prescribed spring trajectories. E — separate prior Chromium execution and new local Node controls, with the above uncertainties preserved.
