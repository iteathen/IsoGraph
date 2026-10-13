# Model A — removing the spatial back-pressure and all Newtonian host mechanics

**Date:** 2026-10-12 (America/Los_Angeles)  
**Researcher direction:** Joshua Oshiro requested removing the arbitrary apparent tax on spatial separation, experimenting with all Newtonian machinery removed, and preserving resource safeguards without treating them as physical laws.  
**Execution / analysis:** AI-assisted local Node 22 graph-only replay, reference topology cross-checks, independent GitHub-committed replay evaluated under V8 with Node-compatible shims, and separate mechanism/null controls.  
**Status:** reproducible exploratory **negative result for emergent physical space**, with positive structural graph observations. No qualified IsoGraph/Causal Step physics assertion.

## Source and exact intervention

Original archived [Supplementary Model A — Dimension Birth](https://github.com/iteathen/IsoGraph/blob/research/import-archived-papers-20261012/research/primitive-presentation/evidence/source/supplementary/model-a-dimension-birth.html), frozen Git blob `4d7e6f4bb594204afa92534d697a9a32fc3ea9a0`, **remains unchanged**. Prior Causal Step experiments and reviews also remain intact. This ablation is isolated on `research/causal-step-nonnewtonian-ablation-20261012`.

**What was removed entirely from the new graph-only simulation:**

- spatial coordinate `x` vectors and ambient/internal coordinate dimension counters;
- `ensureDim`, `birthDimensionIfNeeded`, error thresholds, distance-based interventions, `mergeDistance`, dimension-birth cooldown, new-axis coordinate kicks;
- parent-location copying on birth;
- positive spring rest length `targetUnit` and its implied distance preference;
- spring force, acceleration, mass, velocity, all `PHYSICS.dt` numerical integration, damping;
- kinetic/potential energy, angular momentum and any mechanical conservation interpretation;
- the 3D projection and canvas camera/rendering mechanics.

The archived model's back-pressure does **not** come from an origin-centered gravitational attraction. The actual mechanism is the pairwise spring law, with `PE=Σ_edges ½k(|x_b−x_a|−L)^2`: departure from the *chosen* edge length incurs restoring force. Simultaneously, newborn endpoints start at the same position and are explicitly separated along a newly created axis. This is a programmed embedding preference, not a demonstrated primitive entropy or emergent law.

**What remains and why:** deterministic sparse `mix32/qfWord` source (or optional Rule 30), one initial node, programmed offspring number/parent selection, directed/undirected graph edge admission (varied below), and explicitly classified `maxNodes` / `maxEdges` resource limits. The historical optional age/degree pruning is **separately controlled**, because it changes graph connectivity and is not automatically physics. The host's global `step` variable remains scheduling; it is **not** the researcher's unit of causal step or a physical clock.

## Execution correctness controls

1. The graph-only **legacy** variant faithfully reproduces the source's graph-generation functions while dropping every coordinate/mechanical quantity and every dimension-birth call. Each of **all 3,000** model-update node/edge counts matches the prior independently transcribed full-dynamics uncapped `uncapped-3000-steps.csv` (zero mismatches). The 1,000-step comparison also has zero per-update mismatches.
2. The stronger graph-topology check serializes **every retained node's (ID, birth update, parent ID, alive status)** and **every edge's (ID, endpoints, birth update, source kind)** in order. At step **1,000**, the source-faithful full-dynamics extraction and the force-free legacy graph engine produce the **same SHA-256** after normalizing the nonphysical label `old-old` in the graph-only script to original `causal` for old-to-old edges: `ef72f9fd453932fbceb9a4ef8edd5dbd4fa2b6243a436b9a00504ec2d9f37f68`. This is stronger than a matched count.
3. A portable [metric-free JavaScript replay](../experiments/model-a-no-metric-graph-replay.mjs) has been **committed to GitHub**. It retains the *verbatim deterministic source bit functions* from the frozen HTML. Its 3,000-step legacy run and 3,000-step high-budget unpruned causal run were independently executed under V8 with Node filesystem/process/performance shims, yielding the same checkpoints as the local Node 22 matrix. The 1,000-step legacy/optional-link/unlinked source has also been V8-executed with matching results.
4. No browser renderer or GitHub Actions executed in **this** batch. Prior Chromium and full-JS model execution belong to the earlier audit. Full per-step and checkpoint graph data, local graph engine, verification fork, plots and matrix are in a separately generated local evidence ZIP. [Committed summary matrix](../experiments/results/2026-10-12-no-metric-ablation-matrix.csv) includes the principal measured results.

## Controlled 3,000-update graph comparisons

Main baseline controls below all use the same deterministic hash source and, **unless explicitly noted**, source `maxNodes=3,000`, `maxEdges=9,000` and original age/degree pruning.

| Graph-only variant | Nodes | Edges | Connected components | Graph cycle rank E−V+C | What was changed besides mechanical ablation |
|---|---:|---:|---:|---:|---|
| Legacy topology | **2,994** | **3,056** | **227** | 289 | No graph growth rule changed |
| Strict new-event links | 2,998 | 3,011 | 256 | 269 | No edges between two pre-existing nodes |
| Tree/ancestry only | 2,986 | 2,731 | 255 | **0** | Only compulsory parent-child edges |
| Graph-neighbor secondary links | 2,998 | 3,163 | 408 | 573 | Existing-neighbor rather than unrestricted secondary parent, no old-to-old edges |

**Interpretation:** Node/edge generation, ancestry, finite graph reachability, connected components and undirected cycles survive full Newtonian ablation. But these are **outputs of explicitly defined graph rules**. No spatial distribution, force, trajectory, orbit, gravitational binding, or physical dimensionality is even defined. The numerical source-coincident original topology tells us that the old graph-growth function is mechanically independent; it does **not** mean the original 3D appearance was physically intrinsic.

### Separating computational node ceilings from graph generation

| Additional control (step 3,000) | Nodes | Edges | Components | Applied intervention |
|---|---:|---:|---:|---|
| Legacy; source 3,000-node cap/age pruning | 2,994 | 3,056 | **227** | Reference |
| Legacy; 9,000-node and 30,000-edge safety budget; **retain** age pruning | 5,307 | 7,616 | **1** | Only operational ceilings raised; neither reached |
| Strict causal; source 3,000-node cap/age pruning | 2,998 | 3,011 | **256** | Reference |
| Strict causal; 9,000/30,000 resource budget; **retain** age pruning | 5,123 | 7,056 | **1** | Isolated capacity comparison |
| Strict causal; same 9,000/30,000 budget; **disable** age pruning | **7,820** | **9,753** | **1** | Additional isolated pruning comparison |
| Parent-only tree; same large budget, no age pruning | 7,820 | 7,819 | **1** | Isolated optional-edge comparison |

These are finite windows **below the independent safety ceilings** (9,000 nodes and 30,000 edges, respectively). Source cap removal without other physical intervention prevents the late fragmentation in these tests. The legacy root can disappear at low cap; with a high enough cap and age rule alone it survives. Do not interpret fragmentation as independent cosmological structure.

### Does even connectivity come from a programmed premise?

The original `grow()` always makes a newborn inherit a selected existing parent and **always adds a parent-child edge**. Thus a connected root-ancestor graph is guaranteed until deletions, not emergent from space. A second strictly no-metric control dropped *that* requirement, holding node production/source and resource regime fixed.

At **step 1,000**, `nodeLimit=9,000`, `edgeLimit=30,000`, age pruning **disabled**:

| Connection rule | Nodes | Edges | Components | Largest component |
|---|---:|---:|---:|---:|
| Strict new-event links: mandatory parent plus optional secondary | 2,621 | 3,250 | **1** | 2,621 |
| No mandatory parent link; occasional old-to-newborn optional link retained | 2,621 | 630 | **1,991** | 16 |
| No links at all | 2,621 | **0** | **2,621** | **1** |

The first row is the strictly new-event-link `causal` control, not the separate legacy mode with old-to-old edges; therefore dropping the compulsory parent link changes only that rule. The latter two are **null interventions**, not endorsed physical laws. Their point is causal attribution: source-level compulsory ancestry explains much of the apparent connected universe. The optional-link implementation still makes a global parent selection as host bookkeeping; it is not a fully unbiased causal-origin model.

## What can be measured without introducing physical space?

A finite directed graph has relational ancestry, degree, reachability and causal depth. A graph-hop ball `V(r)` can also be measured by ignoring link orientation and using the fewest edges between nodes. This is a **measurement convention**, not physical length, and its finite-scale log slope is not automatically a physical dimension.

At step 3,000, the median sampled finite-scale **hop-ball growth exponent** shifts strongly:

| Variant | Finite-scale hop-growth exponent | Eligible scale/seed measurements |
|---|---:|---:|
| Legacy with default cap, fragmented | ~2.12 | 51 |
| Strict causal with 9,000-node safeguard and no age prune | ~4.59 | 45 |
| Pure tree with same safeguard and no age prune | **~3.20** | 49 |
| Neighbor-local strict causal with default cap | ~1.18 | only **3** (too few for reliable inference) |

Even the pure tree produces an apparent value *near three*, despite having **no Euclidean embedding and no physical three-dimensional structure**. This is an explicit false-positive warning analogous to the earlier imposed twelve-dimension coincidence. Slopes change with graph rule, observation scale and pruning; no dimension plateau or verified large-scale power law was established. The source-initialized single ancestor, random parent selection and finite observation window all remain programmable contributors.

**Directed causal relation:** The `causal`, `tree` and `causal-local` variants only allow arrow(s) **from older existing events to a newly created event**; their directed graphs are acyclic by construction. The recorded undirected cycle rank may still be positive when newborns have two predecessors. The legacy `old-old` link is not a genuine causal arrow without an additional rule, so only its undirected topology should be compared. These constructions are not yet Rideout–Sorkin dynamics, label-invariant causal sets, or recovered Lorentzian geometry.

## Negative results and scope limits

- **Back-pressure eliminated:** There is no remaining spatial energy tax, attraction or even an underlying spatial metric in the strict graph-only layer.
- **Motion after removal is undefined, not physically absent:** There are no trajectories and therefore no meaningful orbit/rotation/energy/momentum readouts. The earlier `springK=0` coordinate-model control that reported zero velocity/revolutions is a different, narrower experiment.
- **The graph survived, not spacetime:** Connectivity and branching result from explicit link-admission rules; strong graph-cycle counts remain only because cross-links are programmed.
- **Computational cap is nonphysical:** It is monitored and separately varied; high-cap tests show default fragmentation is not robust.
- **Unknown natural geometry:** No independently specified observer/spatial reconstruction or continuum-limit tests were performed, so no finite physical dimension or Newtonian/relativistic dynamics is derived.
- **The source still has assumptions:** one starting event, global parent sampling, a specific deterministic random generator, 1–6 offspring for the hash source chosen by bit operations per host update, and graph birth/pruning rules. These have not been established as physics. In the hash-source setting births range from one to six depending on bit fields; this is implementation data, not a proved causal-step law.
- **No convention silently replaced:** the researcher's `causal step` and time-as-causal succession remain the two-premise project's own terms. Numerical host update indices do not define physical time or a light-speed correspondence.

## Best next experiment

Propose, without approving as physics, a **minimal causal-order substrate** with explicit event precedence but no mandatory unique ancestor, no preferred coordinate embedding and no spatial force. Test separately (i) one versus multiple minimal roots, (ii) varying probabilities of admitting predecessor links, (iii) source/rule changes, (iv) label-order sensitivity (the existing parent-selection rule is not automatically discrete general covariance), (v) bounded memory approximations against genuinely safe higher limits. Observe relational invariants of directed order and graph volume growth **without assigning a dimension by threshold**.

**Research attribution:** Joshua Oshiro requested the complete Newtonian ablation and described the source model's neighbor back-pressure as an arbitrary cost of existing apart; this is contemporaneous conversation evidence. AI-assisted work identified the source implementation, specified isolated controls, wrote/reran measurement code, and bounded the claims. No change is made to the frozen Primitive Presentation evidence or any qualified IsoGraph authority.
