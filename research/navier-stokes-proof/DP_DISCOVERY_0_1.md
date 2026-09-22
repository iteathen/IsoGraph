# Discovery Protocol application — Navier–Stokes forced-blowup rendering 0.1

Status: DP research ledger. Discovery output only; no item below is a qualified IsoGraph semantic claim merely because DP found it.

## Frozen inputs

- IsoGraph Core: 0.17 qualified authority.
- QU: 0.1 qualified revision pinned by the module manifest.
- NEI: 0.4 qualified revision pinned by the module manifest.
- Discovery Protocols: qualified cumulative DP 0.1–0.4 only.
- OpenAI formal source: openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd.
- Initial expanded source-faithful rendering blob used for the first DP pass: 23b3d6c877ef80d17be018913c82b0c8255368be.
- Final source-faithful rendering blob after DP-promoted exact mechanisms: 6e01f6b7bb8579e08d5e5135a4e9ea5965677763.
- Rendering path: research/navier-stokes-proof/NAVIER_STOKES_FORCED_BLOWUP_0_1.isg.

DP 0.5 was not used.

## Discovery objective

Find the smallest high-information structural mechanisms that explain how the represented construction reaches the final forced Navier–Stokes breakdown theorem while preserving source-faithful distinctions, QU incompleteness boundaries, NEI non-overclaim, and theorem-contract residuals between whole-space and periodic forms.

---

# D01 — Monotone accuracy ladder drives arbitrary residual order

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-04 dependency topology; DP-11 invariants across variation; DP-21 recurrence; DP-24 proof topology; DP-29 ordering; DP-31 balance/order; DP-08 residual analysis.

The correction recurrence has sigma_J = 1/5 + J/10 and sigma_(J+1) = sigma_J + 1/10. Every actual stage satisfies the same RunInvariant family at sigma_J.

For finite stage J, the physical residual derivative bound has exponent

    h * sigma_J - fixedLoss(m).

The source fixes h > 0 and fixedLoss depends on derivative order m, not on stage J. Thus for each fixed derivative order, the available residual exponent grows without bound with correction stage.

The schedule-selection layer then chooses one common diagonal schedule with cut bounds, smooth sums, vanishing endpoint jets, and AllResidualJetRates. LocalScaleApproach converts those rates into the local theorem's arbitrary-order residual-flatness field.

Candidate abstraction:

    stage state
      -> preserved invariant at sigma_J
      -> correction step
      -> preserved invariant at sigma_J + 1/10
      -> finite residual power increases
      -> selected diagonal limit
      -> residual flat to arbitrary order

This appears to be a generating invariant for the error-order improvement portion of the proof.

Falsifier attempted: failure of stage invariant preservation; stage-dependent residual loss that cancels the gain; h <= 0; no common schedule; only fixed finite residual order. The pinned source supplies the opposite facts for each item.

Residual: the actual field increments, covariance realization, support/coherence, schedule selection, and infinite-sum convergence remain load-bearing machinery. Sigma alone is not the whole construction.

---

# D02 — Blowup is protected geometrically, not repaired after every correction

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-01 cross-boundary structure; DP-03 interface correspondence; DP-11 invariants; DP-14 transformation invariance; DP-26 boundary movement; DP-33 special case.

The selected inner radius is strictly inside the correction active edge. For sufficiently small remaining time tau, the shrinking ray simultaneously lies in the correction exterior domain, the zeroth-cutoff plateau, the late-time localization regime, and the spatial-localization plateau.

On that ray the source proves exact equalities:

    raw corrected velocity = FinalSlowBase velocity
    localized selected velocity = FinalSlowBase velocity

The quantitative angular-growth theorem is then inherited from the slow base.

Candidate abstraction: the singularity witness travels through a protected geometric channel that the correction machinery does not perturb. Blowup preservation therefore falls out of exact support/boundary geometry rather than requiring a cumulative perturbation estimate for the singular profile after every correction stage.

Falsifier attempted: a correction remains nonzero on the selected ray; the ray enters the active correction annulus; spatial localization changes the field there. The source's exists_ray_interval, rawVelocity_eq_base, and selectedVelocity_eq_base_on_ray exclude these cases on a sufficiently late interval.

Residual: this does not assert that every point of the inner region is unchanged.

---

# D03 — The core construction regularizes the residual into the prescribed force

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-01 boundary crossing; DP-03 interface; DP-07 factorization; DP-14 transformation invariant; DP-22 composition; DP-23 reconstruction; DP-24 proof topology.

The force is not an independent input to the source construction. CandidateFromLimits.force is a smooth spacetime extension of the traced presingular residual using its boundary jet data.

For 0 <= t < 1, the same constructed force equals the activated Navier–Stokes residual exactly.

Candidate abstraction:

Construct singular divergence-free u,p whose Navier–Stokes residual is regular enough, especially at the singular endpoint and localization boundaries, to be promoted to a globally smooth prescribed force.

The correction machinery is therefore more accurately described as residual regularization than as an attempt to make the Navier–Stokes residual identically zero everywhere.

Falsifier attempted: force independently prescribed before u,p; final force differs from actual residual on the presingular interval; only finite-order endpoint regularity. The pinned source directly supplies residual-derived force, exact presingular equality, and all-order jet machinery.

Residual: exact zero-residual regions still exist; see D04.

---

# D04 — Flat residual and exact-zero exterior are complementary, not identical

Lifecycle: SUPPORTED_CANDIDATE for the complementary factorization.
Same-mechanism claim: REJECTED.

Protocols: DP-07 factorization; DP-08 residual discovery; DP-10 role comparison; DP-13 multi-scale structure; DP-26 boundary structure; DP-35 exception structure; DP 0.2 cross-residual decomposition.

Common role: both structures prevent bad residual behavior from obstructing force/candidate construction.

Near the terminal singular region, the source proves arbitrary-order flatness: for every derivative order m and every requested nonnegative power r, the residual derivative is O(q^r). This is not exact zero.

In the exterior region, the fields equal the heat exterior and the residual is exactly zero.

Structural breaker for identifying them as the same mechanism:

    obligation_kind = CONSTRAINT_COMPATIBILITY / DOMAIN
    left  = arbitrary-order asymptotic smallness near q -> 0
    right = exact equality to zero on an exterior domain
    failure = exact-zero semantics and domain attachment are not preserved

No NEI result is required for this structural rejection.

Discovery result: terminal interface and outer interface use complementary residual-control mechanisms.

---

# D05 — Correction stages share a recurrence skeleton, not occurrence identity

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-05 QU topology; DP-06 repeated motifs; DP-11 invariants; DP-21 recurrence; DP-27 parameter roles; DP-38 identity audit only as a guard.

Every actual stage is generated by the same CycleState.step shape: current analytic state, current coefficient state, axisymmetric alias, stage parameters, next state/coefficient/alias, next RunInvariant, and accuracy increment +1/10.

state_runInvariant establishes this recurrence for every actual stage.

QU effect on state 3002:

Fixed/common structure now known:
- common recurrence skeleton;
- common invariant roles;
- common accuracy shift;
- common output-role families.

Still open:
- which stage-specific parameter/coefficient/wave subgraphs are structurally quotient-equivalent under a future frozen comparison view;
- whether a compact exact witness family covers those stage-specific variants.

This is a QU refinement candidate, not a qualified QU refinement relation, because the exact admissible realization family of state 3002 has not been exhaustively formalized.

NEI audit: no stage occurrence is declared SAME to another stage or to the generic step schema.

Falsifier attempted: an actual stage bypasses CycleState.step or lacks the common RunInvariant family. The inductive state_runInvariant rules that form out for the actual sequence.

---

# D06 — The two scale sequences are structurally different roles

Lifecycle: REJECTED for candidate correspondence sigma_j <-> a_j.

Protocols: DP-02 constraints; DP-10 role equivalence; DP-27 parameter roles; DP-29 ordering; DP-31 balance.

Both quantities increase with stage index, which makes a superficial compression tempting.

Structural breaker:

    obligation_kind = CONSTRAINT_COMPATIBILITY + DEPENDENCY_DIRECTION

sigma_j:
- real-valued deterministic accuracy ledger;
- exact formula 1/5 + j/10;
- fixed additive increment 1/10;
- indexes invariant strength and finite residual exponent.

a_j:
- existentially selected natural-number diagonal schedule;
- a_0 >= 1, positive, doubling lower bound, strict monotonicity;
- tends to infinity;
- reciprocal must fit inside qstar;
- controls diagonal sums, cutoff scales, convergence, and vanishing joint jets.

The recurrence constraints and consumer edges do not map.

Disposition: keep them separate.
- sigma_j = correction accuracy/order.
- a_j = diagonal extraction/convergence scale.

---

# D07 — Proof factorization: constructive engine -> transport adapters -> obstruction/discharge

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-04 dependency topology; DP-07 factorization; DP-22 composition; DP-23 reconstruction; DP-24 proof/witness topology.

Layer A — constructive engine:

    slow base
    + correction cycle
    + invariant preservation
    + residual-order ladder
    + selected diagonal schedule
    + protected singular ray
    -> local fields with smooth residual boundary data
    -> smooth residual-derived force
    -> unit-viscosity compact candidate

Layer B — contract-preserving transport:

    unit-viscosity candidate
    -> viscosity scaling -> arbitrary nu > 0 whole-space candidate

    whole-space candidate + initial rest
    -> delayed parabolic compression
    -> compact support inside periodic fundamental region
    -> periodization
    -> periodic candidate

Layer C — obstruction / theorem discharge:

    candidate + hypothetical global competitor
    -> uniqueness/comparison before t=1
    -> competitor must agree with candidate
    -> candidate speed blows up
    -> global smooth competitor impossible
    -> comparator C or D adapter

Falsifier attempted: final theorem discharge needs internal correction objects after the candidate contract is established; or an adapter changes the singularity/equation contract instead of transporting it. The source routes final theorem proofs through candidate contracts and dedicated adapter/comparison theorems.

Residuals:
- periodic compression additionally requires initial rest;
- whole-space comparison carries finite-energy competitor conditions;
- periodic comparison carries periodicity and not the same energy assumption.

---

# D08 — Viscosity scaling, parabolic compression, and periodization share a transport role

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-03 interfaces; DP-06 motifs; DP-11 invariant across variation; DP-14 transformation invariants; DP-22 composition.

Common external pattern:

    candidate + side conditions
    -> transformed fields/support
    -> preserved PDE/incompressibility/blowup obligations
    -> changed parameter/domain/support representation

Residuals:
- viscosity scaling changes amplitudes/spatial scale and target viscosity;
- delayed parabolic compression uses initial rest and changes temporal/spatial placement/support scale;
- periodization changes global topology and adds periodicity obligations.

Falsifier attempted: an adapter reconstructs the correction cycle from scratch or loses downstream blowup/PDE obligations. The pinned adapter theorems expose contract preservation instead.

Promotion boundary: interface-role correspondence only. No transformation isomorphism or NEI identity is claimed.

---

# D09 — Whole-space C and periodic D share a proof skeleton but not a full contract isomorphism

Lifecycle:
- common-core candidate: SUPPORTED_CANDIDATE;
- full contract isomorphism: REJECTED.

Protocols: DP-02 constraints; DP-04 dependency topology; DP-07 factorization; DP-08 residuals; DP-10 role equivalence; DP-24 proof topology; DP 0.2–0.4 cross-residual rules.

Common skeleton:

    positive viscosity
    -> construct smooth pre-singular candidate
    -> zero initial velocity
    -> divergence-free
    -> exact forced Navier–Stokes equation
    -> speed unbounded at t=1
    -> rule out a global smooth competitor with same force/data
    -> adapt to comparator statement

Cross-residual decomposition:

Whole-space C:
- competitor carries uniform finite-energy obligation;
- whole-space uniqueness uses that class;
- candidate carries uniform finite energy.

Periodic D:
- competitor carries spatial periodicity;
- no matching kinetic-energy assumption is imposed on the periodic competitor;
- periodic uniqueness/exclusion uses torus structure.

The role correspondence is nevertheless real:

    hypothetical global competitor
    -> pre-singular agreement/uniqueness
    -> blowup contradiction
    -> nonexistence

Structural breaker for full contract isomorphism:

    obligation_kind = CONSTRAINT_COMPATIBILITY / BOUNDARY
    R3-only load-bearing obligations include finite-energy structure.
    Periodic-only load-bearing obligations include periodicity and fundamental-domain support/interior structure.
    Competitor classes differ.

No natural-identity conclusion is drawn.

---

# D10 — Compact generative formulation discovered by the pass

Lifecycle: SUPPORTED_CANDIDATE after one falsifying completeness attack and repair.

Protocols: synthesis of D01–D09 and D11; DP-07 factorization; DP-11 invariants; DP-14 transformation; DP-22 composition; DP-24 proof topology.

The first version of D10 omitted the source of the R3 uniform kinetic-energy bound. That omission was found by selecting a downstream CandidateProperties obligation and tracing it backward. The original D10 was therefore incomplete.

After adding D11, the strongest compact formulation supported by this bounded pass is:

Preserve an exact singular base on a protected geometric channel while an invariant-preserving correction recurrence increases residual order without bound in the correction region. Select a diagonal scale sequence that turns finite-stage bounds into smooth infinite sums and all-order endpoint residual flatness. Promote that residual to a smooth prescribed force. Localize to compact spatial support; then use the exact forced energy balance plus compact-support/force bounds to close the uniform kinetic-energy obligation. Transport the resulting candidate across viscosity and, with the additional initial-rest bridge, into the periodic setting. Finally use the appropriate uniqueness/comparison obstruction to convert pre-singular blowup into nonexistence of a global smooth competitor.

This explains substantially more of the proof than the final theorem contract while remaining much smaller than the full Lean dependency closure.

Falsifier history:
- first attack: FAIL — energy_bounded had no generating mechanism in the synthesis;
- repair: D11 compact-support energy closure added from source-exact CompactEnergy results;
- recheck: the sampled R3 contract obligations now have explicit roles for smoothness/support, PDE/divergence, force, energy, blowup, scaling, and nonexistence.

Important limitation: this is still a discovery abstraction, not a replacement proof and not evidence that the full Lean graph has been reduced to a mathematically sufficient minimal generator. Completeness/minimality remains open.

---

# D11 — Compact spatial support closes the finite-energy obligation

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-02 constraints; DP-04 dependency topology; DP-22 composition; DP-24 proof topology; DP-31 conservation/balance.

The R3 localization step does more than make the fields compactly supported. It creates the hypotheses needed for the whole-space energy closure.

Source-exact dependency:

    compact velocity support
    + smooth velocity/pressure/force
    + divergence-free
    + exact forced Navier–Stokes equation
    + zero initial velocity
    + compact force support
    -> exact energy balance
    -> energy-rate inequality
    -> scalar Gronwall/integrating-factor bound
    -> UniformFiniteEnergy on [0,1)

This mechanism is separate from the residual-order ladder. Arbitrary residual flatness explains smooth force construction; compact-support energy closure explains why the resulting whole-space singular solution still belongs to the finite-energy class required by alternative C.

Falsifier attempted: derive UniformFiniteEnergy from smoothness or compact support alone. The source does not do this. It uses the PDE-derived energy inequality and the force bound, so the exact equation and forcing remain load-bearing.

Residual: later IntegratedDissipation results strengthen the same energy structure with total-dissipation and sharp accumulated-force inequalities, but those stronger conclusions are not required merely to obtain CandidateProperties.energy_bounded.

---

# Additional structural hints retained for future passes

These are deliberately below SUPPORTED_CANDIDATE. They are preserved because the current graph contains enough structure to make them worth revisiting, but not enough to promote them without a more focused pass.

The lifecycle status for every item in this section is LEAD/HINT unless explicitly stated otherwise.

## H01 — Residual decomposition may be an error-routing/accounting structure

Lifecycle: LEAD

Protocols suggested: DP-06 motifs; DP-11 invariants; DP-14 transformations; DP-31 conservation/balance.

Source cue:

    fullResidual
      -> oscillatory source contribution
      + mean-good residual
      + stored total errors

and the cycle state separately carries excluded/stored errors.

Possible correspondence:

The correction cycle may be doing more than making one scalar residual smaller. It may repeatedly move defect among structured channels:

    oscillatory defect
    <-> mean defect
    <-> stored/excluded error
    <-> newly realized correction

If true, the useful invariant may be an error-transfer/accounting law rather than only the monotone sigma accuracy coordinate.

Why only a hint:
- the current rendering has the decomposition but not a complete stage-to-stage transfer equation for every component;
- cancellation/sign conventions and what is genuinely conserved versus merely bounded have not been reconstructed.

Concrete falsifier:
find a stage transition where one residual component is created/destroyed without a corresponding represented transfer/bound relation, so no coherent accounting interpretation survives.

## H02 — The proof may have a three-region spatial division of labor

Lifecycle: LEAD

Protocols suggested: DP-13 multi-scale; DP-17 containment; DP-26 boundary movement; DP-33 special cases.

Current regions already visible:

    protected inner ray / inner singular channel
    active correction annulus / repair region
    heat exterior / exact-zero-residual region

Possible correspondence:

The geometry may factor the proof into three spatial roles:

    preserve target singular behavior
    repair the PDE defect
    close to an exact exterior solution

This is stronger than saying support matters. It suggests the geometry itself allocates distinct semantic responsibilities to different regions.

Why only a hint:
- one protected ray is source-exact, but a complete region partition has not been rendered;
- the active annulus, overlap/collar regions, and localization transitions may introduce additional roles.

Concrete falsifier:
show that a load-bearing correction mechanism simultaneously occupies all three proposed roles/regions, or that the proposed boundaries fail to cover an essential transition region.

## H03 — Endpoint jets may form a sufficient interface between singular past and smooth future force

Lifecycle: LEAD

Protocols suggested: DP-01 boundary structure; DP-03 interfaces; DP-23 reconstruction; DP-26 boundary movement.

Source cue:

    presingular residual
      -> boundaryLimits / all endpoint derivatives
      -> smoothExtension
      -> global smooth force

Possible correspondence:

A very large amount of presingular construction detail may be hidden behind a compact interface consisting of:
- the traced residual on the past side;
- its compatible all-order normal/boundary jets at t=1.

That would make the terminal jet family a genuine reconstruction port.

Why only a hint:
- we have not proved a minimal-interface statement;
- the smooth extension theorem may consume regularity/compatibility information not reducible to a bare jet tuple in the intended abstraction.

Concrete falsifier:
identify a future-force obligation that depends on presingular structure not recoverable from the represented traced residual plus compatible boundary jets.

## H04 — Pointwise blowup and finite energy appear to be deliberately orthogonal obligation channels

Lifecycle: LEAD

Protocols suggested: DP-08 residuals; DP-11 invariants; DP-22 composition; DP-31 balance.

Current supported mechanisms are strikingly separate:

    pointwise/supremum blowup
      <- protected singular ray / slow-base asymptotic

    uniform finite kinetic energy
      <- compact support + exact PDE + force bound + energy/Gronwall closure

Possible correspondence:

The construction may exploit a general local/global norm separation:
a highly concentrated singular observable can diverge while an integrated quantity is controlled by a different structural mechanism.

Why only a hint:
- this pass has not reconstructed the quantitative concentration geometry strongly enough to prove a general decoupling theorem;
- the two channels may share hidden parameter constraints through the base construction.

Concrete falsifier:
show that the energy closure requires a quantitative bound on the singular-ray amplitude/profile that makes the two channels inseparable at the represented mechanism level.

## H05 — sigma_j and a_j may form a two-level refinement architecture despite being non-identical

Lifecycle: LEAD

Protocols suggested: DP-13 multi-scale; DP-21 recurrence; DP-27 parameter roles; DP-29 ordering.

D06 correctly rejected sigma_j <-> a_j identity/correspondence as the same scale role.

A weaker relation remains interesting:

    inner deterministic refinement:
        correction stage J -> higher analytic/residual order via sigma_J

    outer existential extraction:
        choose a_j from the finite-stage gain/bounds
        -> smooth diagonal sums + endpoint-flat limit

Possible correspondence:

This resembles a two-level architecture:
first manufacture an increasingly accurate family, then choose a sparse/fast-enough diagonal subsequence that realizes all countably many final obligations simultaneously.

Why only a hint:
- the exact dependency from sigma/gain into the selected schedule has not been abstracted as a general two-level theorem;
- a_j has several obligations unrelated to sigma itself.

Concrete falsifier:
show that the selected schedule can be constructed from source facts that do not materially depend on the unbounded stage-accuracy/gain ladder.

## H06 — The transport/adaptor layer may have a compositional algebra

Lifecycle: LEAD

Protocols suggested: DP-14 transformation invariants; DP-22 composition; DP-23 reconstruction; DP-36 representation redundancy.

Current source-exact adapters include:
- viscosity rescaling;
- delayed parabolic compression;
- periodization;
- comparator adapters.

They share a supported interface role: transform an already established candidate while preserving selected theorem-bearing obligations.

Possible correspondence:

These may form a compositional family of contract morphisms:

    candidate contract
      --T1--> transformed candidate contract
      --T2--> transformed candidate contract
      --T3--> comparator-facing theorem

If exact composition laws can be stated, much downstream proof structure could be represented as transformations over contracts rather than separate theorem chains.

Why only a hint:
- no identity/composition/closure laws have been formalized in the IsoGraph view;
- each adapter preserves a different subset and requires different side conditions.

Concrete falsifier:
find two adapters whose sequential composition cannot be described by a consistent mapped contract without re-opening hidden internal construction state.

## H07 — RunInvariant may be a product/modular invariant rather than one monolithic invariant

Lifecycle: LEAD

Protocols suggested: DP-06 repeated motifs; DP-11 invariants; DP-22 composition; DP-36 redundancy.

Source cue:

    RunInvariant =
        analytic invariant
        + geometric coherence
        + periodicity invariant

These are separately named and separately proved roles.

Possible correspondence:

The correction cycle may intentionally separate three nearly orthogonal preservation burdens:
- quantitative analytic control;
- cross-chart / coefficient / axis coherence;
- translation periodicity.

If so, RunInvariant is a product-like composition of invariant modules, which may explain why later proof consumers can request only the facet they need.

Why only a hint:
- independence has not been proved;
- one facet may be logically necessary to establish another at each step.

Concrete falsifier:
show that one invariant component cannot even be stated/preserved without importing the full semantic content of another, defeating a modular factorization.

## H08 — Oscillatory wave/covariance machinery may be a generic stress-realization operator

Lifecycle: LEAD

Protocols suggested: DP-03 interfaces; DP-06 motifs; DP-07 factorization; DP-10 role equivalence; DP-14 transformation invariance.

Source cues:
- PulseBounds constrain actual pulse functions;
- covariance constructions produce controlled quadratic effects;
- FullTrueCone supplies a nondegenerate target stress region;
- signed/particular wave stages feed correction outputs.

Possible correspondence:

There may be a compact operator-level role:

    target defect/stress
      -> choose oscillatory wave data
      -> quadratic covariance realizes required mean stress
      -> remaining defect moves to a higher-order/error class

This would be a stronger mechanistic compression than the current D01 residual-order ladder because it would explain what physically/mathematically performs the cancellation.

Why only a hint:
- this pass has not traced the complete target-stress -> covariance -> residual-cancellation dependency chain;
- FullTrueCone and PulseBounds may serve narrower technical roles than this abstraction suggests.

Concrete falsifier:
trace the actual correction step and find that the covariance/stress machinery does not discharge the leading residual/stress obligation, or that an independent mechanism does the essential cancellation.

## H09 — The proof may repeatedly use “make the interface exact, leave the interior representation flexible”

Lifecycle: LEAD

Protocols suggested: DP-01 boundaries; DP-03 interfaces; DP-07 factorization; DP-23 reconstruction.

Repeated cues:
- protected ray requires exact equality to the base only on a selected channel;
- heat exterior requires exact residual zero only on its exterior domain;
- candidate construction needs exact PDE equality once force is defined;
- transformation adapters preserve explicit theorem contracts while changing internal representation.

Possible correspondence:

The construction may systematically spend exactness at interfaces/boundaries while allowing more flexible internal machinery between them.

This would be a useful general design motif if it survives a broader source audit.

Why only a hint:
- “interface” is currently our abstraction, not a source theorem;
- some interior estimates are themselves exact identities and may be equally load-bearing.

Concrete falsifier:
find a central proof region where downstream correctness depends on detailed internal representation rather than any recoverable boundary/contract property.

## H10 — The C/D comparison may be one instance of a broader “obstruction after transport” pattern

Lifecycle: LEAD

Protocols suggested: DP-06 motifs; DP-10 role equivalence; DP-22 composition; DP-24 proof topology.

Current pattern:

    build one singular mechanism
    -> transport it into a target setting
    -> define the setting-specific competitor class
    -> use setting-specific uniqueness/agreement
    -> singularity obstructs global continuation

Possible correspondence:

The same construction might support additional theorem formulations whenever:
1. a transport adapter preserves the singular candidate contract; and
2. the target setting supplies a suitable pre-singular uniqueness/comparison theorem.

Why only a hint:
- no additional target setting has been established;
- extrapolating beyond C/D would be speculative.

Concrete falsifier:
show that C/D share this pattern only because of special properties that do not survive even a nearby alternative formulation.

---

# Cross-residual conformance records

## CR-1: flat residual vs exact-zero exterior

    cross_residual_pass: triggered; role decomposition performed
    separator_kind: STRUCTURAL_BREAKER for same-mechanism identification
    separator_evidence: exact-zero vs arbitrary-order asymptotic-flatness obligations on different domains
    nei_result_if_load_bearing: NOT_APPLICABLE
    stop_kind: SUPPORTED_CANDIDATE for complementary factorization
    candidate_disposition: PROMOTED

## CR-2: whole-space vs periodic uniqueness machinery

    cross_residual_pass: triggered; obstruction-role decomposition performed
    separator_kind: NONE for role correspondence
    separator_evidence: NONE
    nei_result_if_load_bearing: NOT_APPLICABLE
    stop_kind: SUPPORTED_CANDIDATE
    candidate_disposition: PROMOTED

For a stronger full-contract isomorphism claim:

    separator_kind: STRUCTURAL_BREAKER
    breaker obligation: CONSTRAINT_COMPATIBILITY / BOUNDARY
    left evidence: finite-energy whole-space candidate/competitor obligations
    right evidence: periodicity/fundamental-domain obligations and different competitor class
    failure: obligation sets cannot be bijectively preserved under full-contract view
    stop_kind: REJECTED

## CR-3: generic correction schema vs concrete stage occurrence

    role_decomposition: recurrence skeleton extracted
    separator_kind: NONE
    nei_result_if_load_bearing: INCOMPLETE_UNQUALIFIED
    stop_kind: SUPPORTED_CANDIDATE
    candidate_disposition: PROMOTED

---

# QU / NEI impact

QU 3002 now has additional fixed structure around the correction-stage equivalence question: common recurrence, common invariant family, common accuracy shift, and common output-role topology. The remaining open region is narrower: stage-specific parameter/coefficient/wave realization and exact quotient coverage. This is a refinement lead, not a qualified QU refinement relation.

DP does not upgrade any existing NEI query. Common recurrence role does not imply stage identity, exact transformation bridges do not imply whole-object natural identity, and paper/Lean correspondence remains a representation/alignment question unless independently sufficient identity authority is supplied.

---

# Next highest-value DP work

1. Continue D10 completeness attack with additional randomly selected downstream obligations beyond the energy field already tested.
2. Correction residual decomposition: inspect the mean/oscillatory/stored-error split and test for an error-transfer motif.
3. Support topology: explicitly render active annulus, protected inner ray, heat exterior, and localization plateaus as a three-region structure.
4. QU 3002: freeze a stage-comparison view and test compact witness-family coverage.
5. Minimality: remove each D10 component in turn and identify the first downstream obligation that becomes unreachable.

No external model or CI resource is required for those next local structural passes.
