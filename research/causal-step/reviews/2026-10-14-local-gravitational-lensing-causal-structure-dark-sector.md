# Local gravitational lensing, apparent dark-matter effects and pre-metric causal structure

**Research recorded:** 2026-10-14, Causal Step consolidated branch `research/causal-step`.  
**Human direction:** Joshua Oshiro identifies gravitational lensing, including local-scale deflection and galaxy/cluster lensing, as potentially directly constraining Causal Step and causal-set alternatives to the standard dark-matter interpretation. Original statement verbatim in [discussion log](../DISCUSSION_LOG.md).  
**Agent-assisted research:** Primary-article cross-comparison, dynamical-versus-null response distinction, falsification priority map, effective weak-field mathematical observer test and source annotations.  
**Status:** Source-grounded **literature and effective-observer mathematics only**. The original Causal Step hypergraph rewrite generator, all causal-set source research, and the user's two provisional premises are unchanged. No dark-matter-free force law, emerging spacetime, photon dynamics or cosmological lensing fit has been established.

**Companions:** [21 annotated primary/peer-reviewed comparator papers](../references/2026-10-14-lensing-causal-darksector-bridge-register.json); [reproducible purely effective observer calculation](../experiments/2026-10-14-lensing-observer-noninjectivity-control.py); [existing O01–O14 constraints](../references/2026-10-13-cosmology-observational-and-falsification-gates.json), especially O01/O02/O03/O04/O08/O09; [T3 information loss](2026-10-13-t3-causal-order-interval-observer-noninjectivity.md); [T4 operational event causality](2026-10-13-t4-operational-concurrency-higher-order-coherence.md).

## 1. What does “local gravitational lensing” measure?

The phrase can mean different physical ranges: a photon passing close to the Sun; weak distortions around an individual galaxy; small-scale strong lensing by a galaxy and its substructure; strong and weak lensing by merging galaxy clusters; or a signal accumulated through the cosmic web. These are **distinct but linked observational scopes**. Light deflection is locally governed by the effective gravitational propagation law, while the measured image and shear reflect integrated propagation through the line of sight. Its interpretation as a **mass** distribution normally uses a relativistic metric/GR law, source and observer distances, profile hypotheses and observational calibration. A lensing mass map is not a direct photograph of a particular dark-matter particle.

Under a declared **effective** conformal Newtonian weak-field observer metric (not primitive Causal Step structure),

\[
ds^2=-(1+2\Psi/c^2)c^2dt^2
+a^2(t)(1-2\Phi/c^2)d\mathbf{x}^2,
\]

slow-motion galaxy/stellar motions probe approximately \(-\nabla\Psi\). Photon bending probes transverse changes of the **Weyl sum** \(\Phi+\Psi\), with the line-of-sight lens kernel and geometrical distances supplying observational weighting. In a GR regime with negligible relevant anisotropic stress, \(\Phi=\Psi\); a gravity/dark-sector model can change that relation and the ratio is called **gravitational slip**.

[Edmund Bertschinger (2011), *One gravitational potential or two?*](https://doi.org/10.1098/rsta.2011.0369) gives this observational separation. [Bonvin–Pogosian (2023)](https://doi.org/10.1038/s41550-023-02003-y) add an important **non-unique inference caveat**: some dark-sector fifth-force scenarios can masquerade as an *effective* slip inferred from galaxy-motion and weak-lensing combinations, because velocity tracers may not follow the assumed Euler equation. Do not classify measured slip by itself as proof of modified spacetime geometry, or its absence as proof of particle dark matter.

### Source-grounded finite algebraic gate, not a Causal Step dynamics result

Take a static weak-field point-mass parameterization only as a comparison control,

\[
\Psi=-GM/r,\quad \Phi=\gamma\Psi.
\]

The leading photon deflection at impact parameter b and its slow-test-particle radial acceleration are

\[
|\hat\alpha_\gamma|\simeq \frac{2(1+\gamma)GM}{b c^2},
\quad
|g_r|=GM/r^2.
\]

Thus, two effective theories can give **identical slow-motion accelerations** at every tested r but **different light bending** when \(\gamma\) differs. Conversely the transformation

\[
\Psi\mapsto\Psi+u,\qquad \Phi\mapsto\Phi-u
\]

retains their Weyl sum and leading light-deflection observer but changes slow-motion acceleration whenever \(u\) varies spatially. To first weak-field order, this is precisely the potential transformation induced by a positive conformal rescaling \(\tilde g=\Omega^2g\). **Neither observation alone reconstructs the effective metric uniquely**.

A separate **single-plane mass-sheet observer noninjectivity** exists even after adopting GR lens equations. If \(\beta=\theta-\alpha(\theta)\) for unknown unlensed source position \(\beta\), then

\[
\alpha_\lambda(\theta)=\lambda\alpha(\theta)+(1-\lambda)\theta,
\quad
\beta_\lambda=\theta-\alpha_\lambda(\theta)=\lambda\beta.
\]

Changing the inferred projected convergence as \(\kappa_\lambda=\lambda\kappa+(1-\lambda)\) can preserve the same apparent image positions while changing the mass profile/source scale. Time delays, stellar dynamics, source-size/distance assumptions and line-of-sight structure offer additional constraints, but the inverse problem is genuinely noninjective in the specified scope. See [Saha, Sluse, Wagner and Williams, *Essentials of Strong Gravitational Lensing* (2024)](https://doi.org/10.1007/s11214-024-01041-w) and [Time-Delay Cosmography review (2024)](https://doi.org/10.1007/s11214-024-01079-w). This is an **actual classical observer-loss structure** closely resembling the T3 Causal Step mechanism-vs-projection distinction. The observable and equivalence criterion must be explicit in both domains.

The SymPy standalone control was executed locally in a container. It verified the finite and unbounded transverse-potential integrals, \(\gamma=0,1\) cases, opposite-potential-shift invariance and mass-sheet equation algebra. These are established continuum mathematical identities, not discoveries of a new gravity law; script/source and result are recorded separately. No gamma or point mass is inserted into the native generator.

## 2. Why lensing matters to alternative dark-matter explanations

Do not collapse the **observation** (light shape, deflection, flux, time delay) into the **GR-inferred effective mass** and then identify that inferred mass with a unique fundamental particle. Conversely do not treat inferred mass-map uncertainties as license to ignore strong multi-probe observations.

### L1 — Local/high-acceleration deflection

Solar-conjunction radar time delays, light bending and PPN tests directly constrain the **ratio of effective metric responses** at high acceleration. Cassini's conventional parameter estimate is \(\gamma_{\rm PPN}-1=(2.1\pm2.3)\times10^{-5}\), inferred in a specified solar-system relativistic/PPN model: [Bertotti, Iess and Tortora (2003)](https://doi.org/10.1038/nature01997). Any eventual emergent causal theory must reproduce this regime, or an explicitly viable screening/scale limit.

### L2 — Isolated galaxy weak lensing combined with stellar/gas kinematics

The **radial acceleration relation (RAR)** connects visible-baryonic accelerations to total inferred acceleration. [Brouwer et al. KiDS-1000 (2021)](https://doi.org/10.1051/0004-6361/202040108) found a broad low-acceleration mean trend compatible with some MOND/Verlinde prescriptions **but** a notable early/late galaxy type difference (≥6σ under their selections); galaxy-type-specific circumgalactic gas and ΛCDM halo models provide competing interpretations. [Mistele et al. (2024)](https://doi.org/10.1088/1475-7516/2024/04/020) used a new exact profile deprojection and a stricter isolation criterion and found a continuation of the kinematic RAR into lensing at accelerations ~2.5 dex lower, with early and late types consistent under their treatment. These analyses differ in selection, gas, mass-to-light and deprojection assumptions. **Neither result independently proves a particular source of extra gravity; jointly they make falsification more powerful.**

### L3 — Collision of baryonic gas and galaxy/lensing gravitational concentrations

[Clowe et al. (2006)](https://doi.org/10.1086/508162) report that in the Bullet Cluster, the weak-lensing potential peaks separate from the X-ray gas peaks even though gas contains the dominant visible baryon mass; lensing tracks galaxies more closely. A simple algebraic enhancement of gravity centered on local baryon gas is insufficient unless the alternative has **other persistent and spatially separated causal/field structure**. Most collisionless particle-dark-matter models naturally explain the offsets, while particular modified-gravity models have proposed fits. [Brownstein–Moffat (2007)](https://doi.org/10.1111/j.1365-2966.2007.12275.x) model the Bullet Cluster using MOG without nonbaryonic DM; [Angus et al. (2006)](https://arxiv.org/abs/astro-ph/0609125) analyze MOND-style cases in which extra collisionless matter remains necessary. **No strong claim that either resolution is universally decisive follows from the single system**: insist on baryonic-gas, galaxies, multiple image families, shear map, independent dynamics and merger histories.

[Patel et al. 6 October 2026 BUFFALO Abell 2744 preprint](https://arxiv.org/abs/2610.08919) finds an apparent lensing substructure excess relative to one BAHAMAS-based comparator; the authors specifically warn that the disturbed ongoing-merger dynamical state may explain it rather than a failure of ΛCDM/SIDM. This is an instructive **negative control on apparent discovery**.

### L4 — Small-scale perturbations and hidden localized structure

[Nierenberg et al. (August 2026)](https://doi.org/10.1103/jnjt-1ghp) study 28 strong lenses and under an explicitly assumed CDM halo mass-function/cutoff/prior model find a low-mass cutoff smaller than ~10^8.2–10^8.3 solar masses at 10:1 odds. **This is not a dark-particle rest mass measurement.** [Paugnat et al. (accepted September 2026)](https://doi.org/10.1103/r71r-47sl) report ~5% narrow-line flux-ratio uncertainties and a cusp-image anomaly in a lensed quasar compared with a smooth macro-model; source-emission-size effects and tens-of-parsecs offsets also matter. [COSMOS-Web/JWST weak-lensing mapping (2026)](https://doi.org/10.1038/s41550-025-02763-9) now maps effective gravitational matter distributions over filaments and clusters at ~1 arcmin resolution, requiring robust shape and redshift calibrations.

An alternative underlying causal geometry would need not only smooth enhanced attraction but (if physically predictive) the **spatial spectrum and environmental histories** of these localized optical perturbations, or a quantitatively different mechanism that fits their actual images and uncertainties. Do not infer an independently existing invisible mass clump from every single anomalous lens image; model and line-of-sight degeneracies remain.

### L5 — Joint cosmological consistency

The prior Causal Step O01–O14 independent constraints remain authoritative: cosmic shear and CMB lensing, CMB peak/polarization structure, BAO/SN distance/redshift and growth, gravitational-wave light/gravity propagation, local gravity, and galaxy/cluster evidence. A good galaxy rotation fit or a single apparent lensing mass map does **not** satisfy the others.

## 3. The genuinely close bridge to causal-set mathematics

[Causal set theory as reviewed by Sumati Surya (2019)](https://doi.org/10.1007/s41114-019-0023-1) uses *locally finite partially ordered sets*. In appropriate future/past-distinguishing **Lorentzian continuum spacetimes**, the causal order determines the metric up to a conformal factor. Element counts provide volume information to address that remaining scale. This is the **conditional** meaning of “order + number = geometry,” not a theorem that any abstract DAG or unordered higher-order hypergraph automatically gives a spacetime.

The conformal relationship is a particularly close mathematical match:

- The **causal/metric conformal structure** contains the light-cone direction information of an already manifoldlike effective geometry.
- **Unparameterized null geodesic curves** are preserved by smooth positive conformal metric rescaling, as reviewed in [Turner–Horne (2020)](https://doi.org/10.1088/1361-6382/ab7a5b).
- Therefore ray paths or causal order alone are insufficient to reconstruct all physical metric data. Volume/distance/clock/massive response and some lensing magnification/time-delay observables carry additional information and conditions.
- This is conceptually close to the independently observed Causal Step T3 conclusion that **binary order/intervals can be noninjective relative to genuine higher-order enabling**, but it does **not** contradict the manifoldlike causal-set theorem: the theorem's domain and equivalence are different.

This makes conformal information/reconstruction a **higher-priority actual mathematical bridge** than labeling an arbitrary graph edge “gravity.” But the Causal Step source-native generator has genuine k-way, often unordered active hyperedges, bit mutation, event provenance and a scheduler. T3 showed observer-dependent derived event precedence; T4 found **83 state-sensitive pair dependency signatures** and **660 pairwise-initial-independent three-event compositions that become blocked**. There is **no established map yet** from those source-native transitions to a manifoldlike faithful causal order, light cones or null geodesics.

[Dowker, Henson and Sorkin (2010)](https://doi.org/10.1103/PhysRevD.82.104048) present an encouraging but narrower causal-set **massless scalar signal-transmission** result on specified background causal sets. [Boguñá–Krioukov (January 2026)](https://doi.org/10.1103/np89-qzjp) construct a local d'Alembertian with convergence for arbitrary fields on Minkowski causal-set approximations, an important operator tool; **neither supplies a gravitational lens around a self-generated curved, matter-coupled causal geometry**. [Carlip (2024)](https://doi.org/10.1007/s10714-024-03281-1) reports suppression of many non-manifoldlike causal sets under a selected gravitational path-integral treatment, while expressly leaving full continuum emergence unproved.

## 4. Research triage: which bridge has the least hidden input?

| Target | Direct structural value | New assumptions needed | What would falsify premature identification |
|---|---|---|---|
| **A. Conformal identifiability of null response** | Very high: genuine order / ray-invariance connection | Only for an effective manifoldlike causal-order domain | Treating a non-manifoldlike native high-order source as a Lorentzian metric by renaming nodes |
| **B. Two-potential observational cross-check** | Very high: separates light from slow-matter response | Only *at effective observer level*: metric, propagation and matter probes | Matching rotation curves with no independently specified lensing response |
| **C. Inverse lens mass-sheet / observer-loss analogy** | High, exact algebra and direct T3 analogy | Explicit source observer, unknown source position and lens equation | Declaring inferred “mass map” unique, or inferring micro-ontology from a degenerate inverse |
| **D. Causal-set wave/locality operator comparison** | High to medium: actual constructive discrete-to-continuum machinery | Manifoldlike embedding, volume/distance, operators and massless signal semantics | Equating arbitrary graph walk with photon/geometric optics |
| **E. Cluster merger apparent-mass offsets** | Very high empirical discrimination, low immediate microcomputational readiness | Persistent matter/source definition, emission/gas dynamics and lensing-like effective observable | A one-parameter radial attraction enhancement always centered on the dominant hot gas |
| **F. Quasar/galaxy substructure + cosmic shear** | Very high later cosmological scope; not a shortcut to fundamental model | Source/screening/microphysics and realistic observational forward model | Post hoc tuning one lens anomaly while violating CMB/Solar System or other lenses |

### Recommended next structural work (not executed as a new generative physical theory)

**Phase 0:** retain original `research/causal-step` branch source, all negative controls, physical rank/dimension freedom; preserve T3/T4 distinct event-occurrence and state-dependent composition semantics.

**Phase 1:** ask whether any native history supports a **relabel-invariant operational propagation response** (source→detector transmission, conditional reachability and multiple legal histories), without assuming time/distance/light at the primitive level. A generic graph shortest path or edge-count law must be tagged an observer conjecture and subjected to explicit counterexamples.

**Phase 2:** compare source/sink propagation, slow-test-like response and interventional sensitivity **separately**, with a declared equivalence and recovery test, preserving the 660 triple obstructions. Investigate whether they support an emergent light-cone/conformal geometry rather than imposing it.

**Phase 3:** only if a valid effective Lorentzian/null propagation limit is independently obtained, compare a pair of effective observational response functions corresponding to \(\Psi\) and \(\Phi+\Psi\), plus environmental dependence and PPN/galaxy constraints. There is currently **no physically specified way to read either potential off Causal Step**, so no claims of successful observational fitting.

**Phase 4:** only after Phase 3, confront held-out combined baryonic/gas/galaxy/cluster-lensing and mass-substructure data, CMB/cosmic-shear and GW propagation. Prefer forward predictions of image/arrival-time or shear observables over interpreting an inverted mass map as ground-truth microstructure.

**Central falsifier:** If the model cannot produce **the same physical lensing and dynamical evidence under one internally consistent, independently specified effective limit**, it has not explained apparent dark matter, regardless of how well it fits a galaxy's radial acceleration or how many hypergraph invariants it reproduces.

**No new fundamental causal-step premise, forced spatial dimension, quantum state, metric, entropy pressure law, particle-dark-matter exclusion or gravity derivation.** This is a targeted cross-field research/falsification connection and a locally verified effective algebraic control only.
