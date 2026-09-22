# S0.4 — atomic interface minimality audit

**Status:** source-relative irreducibility analysis of the S0.3 proof architecture.

**Authority boundary:** this audit is relative to the pinned formal source
\`openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`
and the exact R3/periodic theorem contracts already rendered in this directory.

It does **not** claim mathematical uniqueness of the published proof strategy.

## Result summary

S0.3 passed a ten-interface deletion test, but several S0.3 interfaces are composite. Therefore:

- **S0.3 coarse irreducibility:** PASS.
- **S0.3 global minimality:** NOT ESTABLISHED.
- **S0.4 atomic source-relative irreducibility:** PASS for the 25 mechanisms below.

The atomic factorization is intentionally finer than a reader-facing proof outline.

---

## A0 — singular blowup seed

Role:
construct a background carrying the eventual angular growth/blowup channel.

Representative source:
- \`FinalSlowBase.speedUnbounded\`
- \`LocalAngularGrowth.selectedVelocity_eq_base_on_ray\`

First irreplaceable consumer:
final \`speed_unbounded\` obligation.

Deletion witness:
without A0, the construction has no source-backed singular observable to preserve.

---

## A1 — admissible annular stress target

Role:
produce the active annular stress and its admissible positive cone/moment data.

Representative source:
- \`LeadingStressWeights.FullTrueCone\`
- \`BaseWitnessClosure.actual_base_compatible\`
- \`PrimaryTargetBounds.exists_actual_bounds\`

First irreplaceable consumer:
quadratic covariance/stress realization.

Deletion witness:
without A1, the primary/signed covariance construction has no admissible target stress.

---

## A2 — all-order flat base remainder

Role:
separate the singular background residual into target stress plus an error already flat to arbitrary order.

Representative source:
- \`FinalSlowBase.residual_identity\`
- \`FinalSlowBase.error_allJetsFlat\`
- \`GlobalBaseError.error_joint_allJetsFlat\`

First irreplaceable consumer:
finite-stage residual-rate closure.

Deletion witness:
without A2, the fixed base error is not licensed at arbitrary requested residual order.

---

## A3 — exact heat exterior

Role:
provide a region where the background agrees with the heat solution and the residual is exactly zero.

Representative source:
- \`FinalSlowBase.exterior_fields_eq_heat\`
- \`FinalSlowBase.exterior_residual_zero\`

First irreplaceable consumer:
local theorem \`exterior\` field and exterior-germ residual estimates.

Deletion witness:
all-order flatness does not imply exact exterior zero.

---

## A4 — solenoidal wave realization

Role:
realize physical oscillatory increments by curl/ModeSolenoidal constructions.

Representative source:
- \`OscillatoryCurl.wave_divergence_free\`
- actual ModeSolenoidal families.

First irreplaceable consumer:
cycle divergence/coherence invariant.

Deletion witness:
without A4, divergence freedom requires an unrepresented correction channel.

---

## A5 — support-color nonlinear decoupling

Role:
make cross-label transport products vanish exactly on the valid chart.

Representative source:
- \`HarmonicSourceSupport.supported_nonlinearResidual_sum\`.

First irreplaceable consumer:
labelwise residual grouping used by correction estimates.

Deletion witness:
without A5, the nonlinear residual of a finite wave sum contains unrepresented cross-label terms.

---

## A6 — quadratic covariance realizes requested stress

Role:
use primary/signed wave covariance to realize the target stress under the auxiliary average.

Representative source:
- \`SignedCovariance.physical_signed_cross_covariance\`
- \`SignedWaveUpdate\` requested-stress identity.

First irreplaceable consumer:
mean-stress cancellation.

Deletion witness:
without A6, wave amplitudes do not source the required averaged momentum-flux correction.

---

## A7 — exact residual normal form

Role:
reconstruct the physical residual exactly as oscillatory blocks + mean channel + retained errors.

Representative source:
- \`ActualCycleResidualBounds.fullResidual_decomposition\`
- residual reconstruction in \`HarmonicResidual\`.

First irreplaceable consumer:
the typed correction cycle.

Deletion witness:
without A7, there is no exact bridge from internal defect channels to the complete physical residual.

---

## A8 — particular nonzero-harmonic solve

Role:
correct the current nonzero harmonic residual.

Representative source:
- particular-wave construction/dynamics consumed by \`CorrectionAnalyticStep.step\`
- \`CyclePhysicalPrefixes.stepComponents\`.

First irreplaceable consumer:
post-particular residual and signed-stress request.

Deletion witness:
without A8, the current oscillatory source is carried into the next state without its designated solve.

---

## A9 — signed covariance/mean-stress repair

Role:
correct the requested averaged stress after the particular stage.

Representative source:
- \`SignedMeanGain\`
- \`SignedWaveUpdate\`
- signed part of \`CorrectionAnalyticStep.step\`.

First irreplaceable consumer:
post-signed angular/axial mean-residual bounds.

Deletion witness:
without A9, the covariance mean-stress defect remains ungenerated.

---

## A10 — temporal mean repair

Role:
apply the temporal/mean inversion correction.

Representative source:
- temporal increment in \`CorrectionAnalyticStep.StepResult\`
- \`CyclePhysicalPrefixes.stepComponents\`.

First irreplaceable consumer:
next-state mean residual/invariant.

Deletion witness:
without A10, the temporal mean defect lacks a source-backed repair.

---

## A11 — FiveRows rank/moment repair

Role:
remove the finite-dimensional moment/debt obstruction.

Representative source:
- \`FiveRowRank.FiveRows\`
- \`FiveRowRank.exists_five_row_repair\`
- \`LocalRankDefect\` linear rows = negative debt.

First irreplaceable consumer:
rank-stage debt bounds and next invariant.

Deletion witness:
without A11, the three debt components plus two preserved masses are not simultaneously closed.

---

## A12 — synchronized representation/common continuation frame

Role:
keep physical state, harmonic coefficients, and axisymmetric alias synchronized inside one gauge/window/patch/rank frame.

Representative source:
- \`CycleRepresentation\`
- \`CycleContinuationInvariant\`
- coherence/reconstruction families.

First irreplaceable consumer:
one-step recurrence \`CorrectionAnalyticStep.step\`.

Deletion witness:
without A12, outputs of the four correction roles do not re-enter one represented state accepted by the next cycle.

---

## A13 — invariant-preserving one-step accuracy gain

Role:
map a valid stage at accuracy \(\sigma\) to a valid stage at \(\sigma+1/10\).

Representative source:
- \`CorrectionAnalyticStep.step\`
- \`ActualCyclePreservation.state_runInvariant\`
- \`ActualIterationLedger.sigma_succ\`.

First irreplaceable consumer:
iteration to arbitrary stage number.

Deletion witness:
without A13, the correction engine has no induction theorem.

---

## A14 — finite-stage physical residual-rate bridge

Role:
turn the abstract stage invariant into a physical residual jet rate with stage-independent derivative loss.

Representative source:
- \`ActualCycleResidualBounds.Invariant.residual_jetRate\`
- ledger gain/fixedLoss machinery.

First irreplaceable consumer:
arbitrary finite residual order.

Deletion witness:
\(\sigma_j\to\infty\) alone does not imply the physical residual has improving jets.

---

## A15 — one diagonal schedule for all orders

Role:
select one subsequence/cutoff schedule satisfying all countably many residual and smoothness obligations simultaneously.

Representative source:
- \`LocalResidualFlatness.selected_schedule\`.

First irreplaceable consumer:
local theorem closure.

Deletion witness:
separate finite-stage existence for each \((m,N)\) does not produce one common final field.

---

## A16 — local contract closure

Role:
convert the selected schedule into the complete local theorem property bundle.

Representative source:
- \`LocalPaperTheorem.properties_of_schedule\`
- \`LocalPaperTheorem.local_theorem\`.

First irreplaceable consumer:
candidate localization/assembly.

Deletion witness:
without A16, downstream code has no compact property-rich local interface.

---

## A17 — protected-ray blowup transfer

Role:
prove corrections/localization vanish on a shrinking Eulerian channel so the final field equals the singular base there.

Representative source:
- \`LocalAngularGrowth.exists_ray_interval\`
- \`rawVelocity_eq_base\`
- \`selectedVelocity_eq_base_on_ray\`
- \`selectedRawVelocity_angularGrowth\`.

First irreplaceable consumer:
final speed-unbounded property.

Deletion witness:
A0 supplies singular growth only for the base; A17 transfers it to the actual candidate.

---

## A18 — compact localization with divergence preservation

Role:
turn the local field into compact spatially supported whole-space fields without destroying divergence freedom or blowup.

Representative source:
- \`SpatialLocalization.localizedVelocity_divergence_free\`
- R3 compact-candidate localization families.

First irreplaceable consumer:
R3 compact-support obligations and energy closure.

Deletion witness:
without A18, the local field does not satisfy the whole-space compact-support contract.

---

## A19 — smooth residual-to-force extension

Role:
extend compatible endpoint residual jets to a globally smooth prescribed force equal to the actual residual for \(0\le t<1\).

Representative source:
- \`CandidateFromLimits.force\`
- \`force_eq_activated_residual\`
- \`force_smooth\`
- \`force_boundary_jets\`.

First irreplaceable consumer:
exact forced Navier–Stokes candidate contract.

Deletion witness:
without A19, residual flatness does not itself provide the required global smooth compact positive-time force.

---

## A20 — finite-energy closure

Role:
derive bounded kinetic energy from compact support, smooth force, divergence freedom, zero initial data, and exact PDE.

Representative source:
- \`CompactEnergy.energy_balance\`
- \`CompactEnergy.uniform_finite_energy\`.

First irreplaceable consumer:
R3 \`energy_bounded\` and whole-space competitor class C.

Deletion witness:
without A20, the R3 candidate lacks one exact contract field.

---

## A21 — viscosity transport

Role:
map the viscosity-one candidate and competitor obstruction to arbitrary \(\nu>0\).

Representative source:
- \`ViscosityScaling.candidate_at_viscosity\`
- \`normalized_global_solution\`.

First irreplaceable consumer:
universal positive-viscosity R3 theorem.

Deletion witness:
without A21, the theorem remains at \(\nu=1\).

---

## A22 — delayed compression and periodization

Role:
use initial rest to compress compact support into a periodic cell and periodize the fields.

Representative source:
- \`ParabolicScaling.compressedCandidate\`
- \`PeriodicPaper.of_compact_candidate\`
- \`PeriodicPaper.periodic_corollary\`.

First irreplaceable consumer:
periodic CandidateProperties.

Deletion witness:
without A22, no periodic candidate is generated.

---

## A23 — whole-space uniqueness obstruction

Role:
force any global finite-energy whole-space competitor to agree before the singular time, then contradict blowup.

Representative source:
- \`WholeSpaceUniqueness.candidate_global_agrees_before_one\`
- \`CandidateProperties.no_global_solution_one\`.

First irreplaceable consumer:
R3 no-global-competitor conclusion.

Deletion witness:
candidate blowup alone does not rule out another global solution with the same force/data.

---

## A24 — periodic uniqueness obstruction

Role:
exclude a global smooth periodic competitor.

Representative source:
- \`PeriodicViscosity.excludes_global_solution\`
- \`PeriodicPaper.CandidateProperties.no_global_solution\`.

First irreplaceable consumer:
periodic no-global-competitor conclusion.

Deletion witness:
the whole-space finite-energy uniqueness theorem has the wrong competitor class for the periodic target.

---

# Atomic dependency skeleton

The main construction path is

\[
(A0,A1,A2,A3)
\to
(A4,A5,A6)
\to
A7
\to
(A8,A9,A10,A11,A12)
\to
A13
\to
A14
\to
A15
\to
A16
\to
(A17,A18,A19)
\to
A20
\to
A23.
\]

Transport branches:

\[
A18,A19,A20,A23
\to A21
\]

for arbitrary-viscosity whole-space C, and

\[
A17,A18,A19,A21
\to A22
\to A24
\]

for periodic D.

Exact source dependencies are richer than this presentation; this graph records the first load-bearing interface dependence, not every imported lemma.

---

# Pairwise merge test

A pair may be merged for exposition if:
1. no downstream source consumer distinguishes the two outputs; and
2. deleting either subrole never breaks a distinct obligation.

Under this test:

- A8/A9/A10/A11 **must remain distinct**: the source exposes four literal increments with different defect consumers.
- A2/A3 **must remain distinct**: all-order flatness and exact exterior zero have different semantics and consumers.
- A23/A24 **must remain distinct**: competitor classes differ.
- A0/A17 **must remain distinct**: singularity generation and transfer to the corrected/localized field are different obligations.
- A18/A19 **must remain distinct**: localization and force extension discharge different final fields.
- A13/A14 **must remain distinct**: invariant gain does not by itself imply a physical residual rate.
- A15/A16 **must remain distinct**: diagonal selection and theorem-contract packaging have different logical types.

Expository merges that remain safe:
- A4/A5/A6 may be grouped as "oscillatory realization" in a reader-facing summary, but not in an atomic proof audit.
- A8–A12 may be grouped as "one correction cycle" for exposition, but not for deletion/minimality reasoning.
- A21/A22 may be grouped as "transport adapters" only if whole-space and periodic targets remain separately typed.

---

# Minimality conclusion

## Proven

Relative to the pinned source architecture and the declared final theorem contracts, each A0–A24 has:
- a source-backed interface;
- a first downstream consumer;
- a deletion witness showing a represented obligation becomes ungenerated.

Therefore the A0–A24 set is **source-relative irreducible under this interface vocabulary**.

## Not proven

This does not establish:
- a mathematically unique minimal proof;
- that no alternative construction can derive one atom from the others;
- cardinality minimality over all possible abstractions;
- formal Lean verification of the reduced dependency graph itself.

A stronger claim would require re-proving the theorem from only the reduced interface axioms or mechanically extracting a dependency closure from Lean.
