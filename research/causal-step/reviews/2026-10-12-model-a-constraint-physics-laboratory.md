# Model A constraint laboratory — physics-inspired and constraint-removal controls

**Research date/recorded:** 2026-10-12  
**Human research direction:** Joshua Oshiro — vary/remove arbitrary constraints, distinguish necessary resource safeguards from hypothesized physical rules, and import physics only where meaningful before emergent spacetime.  
**Execution and analysis:** AI-assisted Node 22 locally executed diagnostic source transcription; committed laboratory replay also checked via V8 with Node environment shims.  
**Authority:** exploratory computational results of a toy model. **No result is a qualified physical law, a derived causal-step primitive, or evidence for a fixed physical dimension count.**

## 1. Research question and what the source actually constrains

The archived historical HTML is immutable on `research/import-archived-papers-20261012`, PR #75, Git blob `4d7e6f4bb594204afa92534d697a9a32fc3ea9a0`. The baseline is the existing **uncapped** derived program from Causal Step PR #78, seeded by a fresh page/dynamics initialization, not the broken Reset.

- `maxNodes=3000` and `maxEdges=9000`: **computational safety limits**, not physics. Keep them explicit, monitor when they fire, and separate them from mechanism studies.
- `mergeDistance=0.055` is **not an all-pairs minimum distance**. It recognizes near-collapsed endpoints of existing edges during a dimension-birth intervention, then explicitly offsets one endpoint along the new coordinate axis. Eliminating it disables that coordinate kick; it does not remove a pairwise exclusion force.
- `targetUnit=1` gives every newborn coincident child a positive spring rest length, creating a fresh edge-length error by construction. This and the `st.max>0.52` test plus the 20-step cooldown are enough to trigger the observed 21-step dimension schedule.
- Kinetic energy, potential energy and first-three-coordinate angular momentum are **diagnostics**; no line projects the total system onto fixed conserved quantities. The fixed-graph central spring force has equal-and-opposite pairwise action, but the changing graph, birth-time coordinate offsets, node addition and deletion prevent inferring closed-system conservation.
- `dt=0.06`, spring stiffness `0.55`, global axis additions, explicit Euclidean coordinates and 3D rendering are host modeling choices, not derived Causal Step semantics.

Under the working Causal Step premises, time means **causal-event succession**, not the simulation's numerical integration `dt`. Do not map the two without a separately derived correspondence.

## 2. Selection of candidate mechanisms (not presumed physical laws)

| Candidate | Physical inspiration / scope | Compatibility with pre-spacetime inquiry | Main risk | Experimental role |
|---|---|---|---|---|
| New events connect to preexisting causes only | Causal-set partial ordering and sequential growth | **High**: uses event relations without a metric | Does not by itself enforce label invariance, Bell causality or continuum recovery | **Priority** structural intervention |
| Optional extra attachment selected from parent's existing graph neighbors | Relational locality / finite interaction neighborhood | **Medium–high**: depends on connectivity, not coordinate distance | Still selects initial parents globally; graph locality is not automatically relativistic locality | **Priority** controlled intervention |
| Edge-local conservative exchange/diffusion | Discrete graph Laplacian, physical heat/mass transport analogy | **Medium**: relation-local update can precede geometric length, but this version exchanges *explicit coordinates* | Over-interpreting diffusion as fundamental time/quantum rule | Separate **mechanism replacement benchmark** |
| Delay/threshold constraint error before dimension birth | Relaxation/measurement-window analogy | **Low–medium**: threshold still arbitrary | Manufactures false numerical dimension plateaus | Diagnostic/falsification sweep |
| Minimum coordinate separation or conventional point-mass gravity | Existing geometric/particle models | **Low** absent an emergent distance/matter definition | Assumes what is being investigated | Do **not** adopt as primitive |
| Mandatory total energy/momentum preservation | Noether's correspondence between conservation and continuous symmetries | **Not justified a priori** without action, closed subsystem, and relevant symmetries | Falsely imposes preexisting metric time, inertial coordinates, and closed dynamics | Measure; don't assume |

**Literature grounding, limited to analogy:** S. Surya, *The causal set approach to quantum gravity*, Living Reviews in Relativity 22:5 (2019), DOI [10.1007/s41114-019-0023-1](https://doi.org/10.1007/s41114-019-0023-1) — causal sets use a locally finite partial order. D. P. Rideout & R. D. Sorkin, *Classical sequential growth dynamics for causal sets*, Phys. Rev. D 61:024002 (1999/2000), DOI [10.1103/PhysRevD.61.024002](https://doi.org/10.1103/PhysRevD.61.024002) — a much more constrained family of stochastic order-respecting growth laws. Graph diffusion: *Effective graph resistance as cumulative heat dissipation*, Nature Communications (2026), https://www.nature.com/articles/s41467-026-75760-9. Conservation-from-symmetry background: J. Baez, [Noether's theorem in a nutshell](https://math.ucr.edu/home/baez/noether.html) (2020). **None** of these works derives the particular hand-coded laboratory rules used below. In particular, simple graph-neighbor attachment is not equivalent to Rideout–Sorkin causal-set dynamics.

## 3. Exact interventions, one variable at a time

All 1,000-step baseline comparisons retain the original deterministic hash input, `maxNodes=3000`, `maxEdges=9000`, cooling duration, step size and fresh initial seed unless a named control says otherwise.

- **baseline:** uncapped original.
- **no-clearance:** `mergeDistance=0`, thereby disabling the explicit separation of collapsed endpoints on a new dimension.
- **aged1 / aged20:** exclude edges younger than 1 / 20 growth updates **from the birth-trigger statistics only**. The spring forces and rest-length rule remain.
- **local-crosslinks:** secondary attachment to a *new child* chooses among existing one-edge graph neighbors of its selected parent, rather than any active node. The primary parent still comes from the global active list. Thus this is only **partial locality**.
- **no-old-links:** eliminate the program's occasional insertion of an edge between two preexisting nodes; all remaining attachments in a fresh graph are older-to-newborn and can be consistently oriented along event chronology. Spring interactions remain undirected. This is **not yet** full causal-set covariance.
- **causal-local-hybrid:** combine `local-crosslinks` and `no-old-links`, **explicitly a two-mechanism follow-up**, interpreted only after each isolated control.
- **diffusion:** replace the spring-force/inertial kick-drift with synchronous edge-local coordinate exchange `Δx_a=Σ_e 0.25(x_b−x_a)/max(deg(a),deg(b),1)`, applying equal/opposite changes per edge. `v=Δx/dt` is telemetry, *not inertial momentum*; the source spring-based `KE+PE` cannot be meaningfully compared to mechanical controls. This is a separately labeled dynamical replacement, not an assertion about emergent physical time.
- **mean-only:** use `st.mean>0.20` instead of `st.mean>0.20 || st.max>0.52`.
- **mean-only-0.4 / mean-only-0.6:** use mean-only stress with threshold `0.4` / `0.6`. These are intentionally arbitrary falsifiers demonstrating threshold-manufactured plateaus.
- **mean-only-0.6-no-node-cap (at 2,000):** change only `maxNodes=Infinity` relative to `mean-only-0.6`; `maxEdges=9000` and age-based pruning remain. This is a separately controlled node-cap isolation, not a physically unlimited model.

## 4. Source-matched 1,000-step results

**All variants used the same deterministic original source and were run from fresh starting state.** The tracked cohort consists of the 107 reproducible node IDs divisible by five present at step 200; each node is sampled every update through 950, and >1-turn means more than one **net x–y projected** revolution relative to the evolving center of mass, not a full-dimensional bound orbit.

| Variant | Dimensions | Nodes | Edges | Connected components | Net >1 projected revolutions / 107 |
|---|---:|---:|---:|---:|---:|
| baseline | 48 | 2,599 | 3,364 | 1 | 64 |
| no-clearance | 48 | 2,599 | 3,364 | 1 | 0 |
| aged1 | 48 | 2,599 | 3,364 | 1 | 64 |
| aged20 | 48 | 2,599 | 3,364 | 1 | 64 |
| local-crosslinks | 48 | 2,586 | 3,356 | 1 | 52 |
| no-old-links | 48 | 2,582 | 3,211 | 1 | 68 |
| causal-local-hybrid | 48 | 2,571 | 3,205 | 1 | 48 |
| diffusion | 48 | 2,599 | 3,364 | 1 | 0 |
| mean-only (0.2) | 48 | 2,599 | 3,364 | 1 | 64 |
| mean-only-0.4 | 27 | 2,599 | 3,364 | 1 | 68 |
| mean-only-0.6 | 2 | 2,599 | 3,364 | 1 | 51 |

**Mechanism-level interpretations:**

1. Removing the coordinate kick leaves all node positions/velocities collapsed at zero: source spring code skips zero-length edges. The reported 0 projected turns is a consequence of **no node displacement**, not evidence for gravitational orbital suppression.
2. Excluding the newest 1 or 20 updates' edges leaves the entire 48-birth schedule **unchanged**. The freshly zero-length newborn edge is a *sufficient*, but not *necessary*, source of threshold violation: older tense links already sustain the trigger.
3. Restrictions based on existing causal adjacency alter motion and topology while **still** producing 48 dimensions by 1,000. The three relational interventions are not equivalent and cannot be treated as validation of any complete physical causality axiom.
4. Exchanging coordinates through a local graph-diffusion rule eliminates >1 net projected winding in the sampled cohort, confirming that the apparent orbits are strongly **dynamics-dependent**. They should not be generalized to any graph evolution law.
5. Source-coordinate dimensional growth continues unmodified in the relational and diffusion variants because the same global birth trigger remains.

## 5. Threshold false-plateau test: independent 2,000-step extension

| Variant | Step-1,000 dimensions | Step-2,000 dimensions | Nodes at 2,000 | Components at 2,000 | Last observed dimension birth |
|---|---:|---:|---:|---:|---:|
| mean-only-0.4 | 27 | 59 | 2,994 | 195 | step 1,988 |
| mean-only-0.6 | 2 | 3 | 2,994 | 195 | step **1,975** |
| mean-only-0.6 **without node cap** | 2 | **2** | **4,162** | **1** | step 22 |

In the default-cap `mean-only-0.6` run, dimension count appeared fixed at **2 for 1,952 updates after step 22**, then increased to 3 at step 1,975. Removing *only* the node cap prevented that third birth within 2,000 steps and kept the graph connected. This is strong bounded evidence that later changes caused by max-node truncation/reactive topology changes can break a seemingly long plateau. It does not prove plateau persistence beyond the finite no-node-cap observation window.

For `mean-only-0.4`, 27 dimensions at 1,000 was likewise not a stable terminal count; growth resumed and reached 59 at 2,000. Therefore **selecting a threshold can make any apparent dimensional “discovery” misleading**.

## 6. Reproducibility and evidence tiers

1. **Earlier original Chromium run**, documented separately in [uncapped audit](2026-10-12-model-a-uncapped-dimension-control.md): original source, one-line uncapping, 2,500 steps, 120 dimensions.
2. **This new local Node 22 suite**, implemented as a source-faithful diagnostic extraction with named edits. Runs actually executed: all above 1,000-step controls plus 2,000-step threshold and node-cap controls. Each produced step CSV, birth-event CSV, cohort/trace CSV, checkpoint summaries and finite-state readouts. CSVs and executable local generator were retained in conversation artifacts.
3. **Separately committed [laboratory runner](../experiments/model-a-constraint-lab.mjs)**, derived from the earlier source-extracted replay code, was **executed under a local V8 sandbox with Node fs/process/performance shims** for all 11 1,000-step cases; results matched the local Node 22 suite on dimensions, nodes, edges and winding counts. The full 2,000-step Node results were **not independently rerun under the committed V8 replay** at the time of recording; use their local Node evidence status.
4. [Committed 1,000-step checkpoint CSV](../experiments/results/2026-10-12-constraint-1000-checkpoints.csv) and [all 1,000-step birth events](../experiments/results/2026-10-12-constraint-1000-birth-events.csv) were generated **by executing the committed runner**. [2,000-step checkpoint CSV](../experiments/results/2026-10-12-threshold-2000-checkpoints.csv) records the locally executed Node controls.
5. All observed checkpoint coordinates/velocities were finite; this is **not** a timestep-convergence, error-bound or long-run numerical stability proof. No GitHub Actions, hosted CI testing or prior historical HTML changes were used.

**Unverified:** source-exact browser-rendered images for *the new variants*, multi-seed/Rule-30 replication of this sweep, 2,000-step cross-engine checks on the committed lab script, fixed-topology energy/momentum controls, controlled timestep convergence, intrinsic full-dimensional orbital binding, and any geometry-independent effective spatial dimension. Numerical `dt` is not identified with the causal-step unit.

## 7. Research decision and next test

**Current best candidate to investigate:** **topology-first causally ordered growth**, with the strict new-event-link control as a partial starting point; locality should be tested in multiple forms. It is conceptually compatible with pre-geometric causal-event succession, uses fewer assumed spatial properties than spring forces, and is falsifiable. This is a *research priority*, not an adopted physical postulate.

Follow next with a **separate non-coordinate causal-event graph model**: explicit partial order, locally finite intervals, no globally fixed spatial dimension, and observation-derived measures of dimension/structure. Check relabeling/covariance sensitivity rather than calling globally selected node IDs physical. Run a graph-local field-propagation benchmark only as an optional probe, not an implicit definition of matter or light. Keep bounded node count as an explicit runtime approximation and study cap sensitivity, not as a rule of nature.

Do **not** tune thresholds toward 3, 4, 10, 12, or 16 dimensions; do not conflate generated coordinates with actual physical dimensionality or projected circulation with gravitational orbits.

**Provenance:** The exploratory variation and physics-at-suitable-scale condition were proposed by Joshua Oshiro in the October 12 research conversation; particular intervention choices and experimental implementation are agent-assisted. A retrospective timestamp is not used to invent earlier priority.
