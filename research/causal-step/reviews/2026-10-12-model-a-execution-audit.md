# Model A Dimension Birth — executed simulation and structural audit

**Date:** 2026-10-12  
**Project:** Causal Step, cross-referencing preserved Primitive Presentation supplementary evidence  
**Status:** actual local browser execution and code inspection, **not** physical verification, a derived 3D geometry theorem, a test of general relativity, or approval to repair the frozen original  
**Research direction and original model:** Joshua Oshiro. Numerical protocol, findings, defect analysis and notes: AI-assisted.  
**Source:** [Supplementary Model A: Dimension Birth (original HTML/JavaScript)](https://github.com/iteathen/IsoGraph/blob/research/import-archived-papers-20261012/research/primitive-presentation/evidence/source/supplementary/model-a-dimension-birth.html) in source-import PR #75, raw Git blob `4d7e6f4bb594204afa92534d697a9a32fc3ea9a0`, original ZIP-extracted 32,266 bytes with SHA-256 `f23d0de70b309e3428d4987f72432d7a02b7d2f9543f6aa100695757ee388b80`. **Original source bytes and the historical Primitive Presentation files were not modified.**

## 1. Reproduction method

The original HTML was extracted from the user-provided 2026-10-12 source archive and rendered in **headless Chromium**. A separate **local-only instrumented copy** paused automatic updates and exposed a test-only advancement/readout hook; it invoked the existing `grow()`, `birthDimensionIfNeeded()`, `accumulateForces()`, and `integrate()` functions in their original order. The drawing used the program's **actual Canvas renderer**; an accelerated series of its graphical frames was captured, along with numerical checkpoints. No GitHub Actions runner was used to simulate the system.

Defaults: `springK=0.55`, `mass=1`, numeric integration increment `dt=0.06`, damping **OFF**, `maxNodes=3000`, `maxEdges=9000`, `internalDimCap=12`, birth-error threshold `0.20`, birth cooldown `20` model steps, default deterministic **hash** source. The initial run was from a **freshly loaded page without pressing Reset**. Runs were successfully advanced to **2,500** steps.

Original source is not truly random: its default `mix32`/hash source is deterministic; the `F` toggle uses another deterministic sequence (Rule 30). The counter `qfHits` counts births and does not demonstrate physically sampled quantum fluctuations.

## 2. Observed numerical results, default source

| Step | Nodes | Edges | Internal dimensions | RMS radius (all internal coordinates) | Mean edge error | Components | Angular-momentum diagnostic |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 50 | 118 | 147 | 3 | 1.337 | 0.363 | not checked | ~0 |
| 100 | 258 | 335 | 5 | 1.560 | 0.470 | not checked | ~0 |
| 200 | 533 | 682 | 10 | 1.608 | 0.423 | not checked | ~0 |
| 250 | 662 | 849 | 12 | 1.620 | 0.368 | not checked | ~0 |
| 500 | 1,321 | 1,705 | 12 | 1.613 | 0.402 | not checked | ~0 |
| 900 | 2,375 | 3,071 | 12 | 1.608 | 0.387 | 1 | ~0 |
| 1,000 | 2,599 | 3,364 | 12 | 1.608 | 0.384 | 1 | 0.521 |
| 1,200 | 2,980 | 3,884 | 12 | 1.601 | 0.391 | 1 | 4.087 |
| 1,250 | ~3,000 | ~3,700 | 12 | ~1.6 | recorded independently | 33 | nonzero |
| 1,500 | 2,999 | 3,234 | 12 | 1.868 | 0.402 | 150 | 10.897 |
| 2,000 | 2,994 | 3,124 | 12 | 2.802 | 0.495 | 195 | 13.176 |
| 2,500 | 2,999 | 3,088 | 12 | 3.286 | 0.583 | 209 | 8.228 |

For a row explicitly labeled “not checked,” no exact component claim is inferred in that table. The early trajectory was also inspected from stored node/edge geometry and is connected through these initial stages. The `~` figures at step 1,250 are rough presentation values; the exact saved structure results are accessible from the separate local `late_structure.json` audit artifact.

**Dimension-birth event indices:** `1, 22, 43, 64, 85, 106, 127, 148, 169, 190, 211, 232`. The **21-step periodicity** follows the explicit cooldown plus persistent edge errors. Internal dimension growth stops at the manually set **12-dimensional cap**; the 3D browser view shows only the first **three** coordinates. It does not demonstrate automatic selection of physical three-dimensional space.

**Early compactness and later fragmentation:** while the node count grows from hundreds to nearly 3,000, the all-coordinate RMS radius stays around **1.6** through step 1,200. The picture develops a dense central, branching, loop-containing component. At step 1,250 the graph has **33 disconnected components**, and original root node `id=0` has already been removed. At 1,500 the model has **150 components**, and at 2,500 **209**. These late changes track the programmed `maxNodes=3000` truncation, repeated `nodes.shift()`, and old low-degree node removal—not independently demonstrated cosmological fragmentation.

**Effective-coordinate participation:** a covariance-eigenvalue participation number rises from about **1.61** at step 50 to **7.97** at 1,000 and **9.50** at 2,500. This number is only a descriptive coordinate-space statistic, not the intrinsic dimension or graph-distance scaling exponent of the simulated world. It confirms that a visually convincing 3D projection may hide many active internal coordinates.

**Energy and angular momentum:** the displayed `KE+PE` reaches **745.5** by step 1,000 and **1,837.5** at step 2,500. The system adds and deletes mass-bearing nodes, spring edges, and coordinate dimensions, so it is **not a closed, fixed-topology energy-conservation test** even with symplectic Euler and no friction. Large `ΔE/E₀` values on the HUD are relative to an early energy baseline. The first-three-coordinate `|L|` diagnostic is around numerical zero in early stages and becomes appreciable during the later deletion/truncation period. Neither effect alone proves fundamental rotation or a new conserved quantity.

## 3. Reproduced source bug: Reset double-inserts the origin

`makeNode(null,false)` **already appends** a node to the global `nodes` list. Yet `reset()` invokes `nodes.push(makeNode(null,false))`, thereby inserting the *same object twice*, both with `id=0`. The `grow()` recovery branch for zero active nodes contains the same pattern. This changes parent-selection probabilities and subsequent graph topology.

Independent runs at step 50:

| Start method | Nodes | Edges | Mean edge error |
| --- | ---: | ---: | ---: |
| Fresh page, no reset | 118 | 147 | 0.3633 |
| Reset then step | 119 | 151 | 0.3313 |

The bug was reproduced by inspecting node IDs in the executed browser state. **Do not silently repair the frozen original.** Any fix should be an explicitly labeled new experimental layer with control results against the original.

## 4. Control using the program's optional Rule 30 source

| Step | Nodes | Edges | Dimensions | RMS radius |
|---:|---:|---:|---:|---:|
| 100 | 297 | 437 | 5 | 1.027 |
| 250 | 754 | 1,134 | 12 | 1.157 |
| 500 | 1,508 | 2,244 | 12 | 1.197 |
| 1,000 | 2,992 | 3,578 | 12 | 1.269 |

The topology and motion differ materially, but **all twelve dimension-birth step indices are identical** to the default hash sequence. This exposes the causal role of the cooldown/constraint rule, rather than attributing the dimension schedule to a particular pseudorandom source.

## 5. Implications for Causal Step

This is useful as a **concrete toy substrate** for ancestry, interaction constraints, evolving graph topology, local-versus-global graph properties, and projections. Its observable central cloud and evolution are genuinely produced by the executed rules, not manually drawn snapshots.

But its current spring-law coordinates, numerical `dt`, imposed dimension-cap and rendering rules are **implementation choices**. The simulation does not yet implement the user's **primitive causal time as succession of events**, prove that a long-distance light emission-to-detection relation is one elementary causal step, or derive relativity, an effective 3D spatial metric, or matter conservation.

Recommended research separation: preserve the present version as an historical baseline; analyze new formulations with independently defined causal-event relation, observer-access/measurement map, and spatial-geometry criteria. Before treating late “emergence” as a law, control for reset duplication, graph truncation and explicit dimension scheduling.

## 6. Reproduction, limits and next checks

Locally generated artifacts in this conversation: source-identical HTML; 35-row full numeric CSV checkpoints through 2,500 steps; dimension-birth CSV; graph component/PCA diagnostics; browser screenshots (200, 250, 500, 1,000, 1,200, 1,500, 2,000, 2,500); cropped six-panel image; 0–1,000 step MP4 and GIF timelapse (accelerated sample frames); local Python+Playwright reproduction scripts and bundled ZIP. Those files were delivered as conversation attachments, **not uploaded to this GitHub PR**. The specific numerical research findings and source provenance are preserved here.

**Status:** Reproducible computational observations and one source-level bug. No source rewrite, model qualification, general emergent-physics result or claims beyond these controlled runs.
