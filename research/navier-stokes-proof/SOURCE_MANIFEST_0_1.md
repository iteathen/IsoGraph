# Source manifest — Navier–Stokes forced blowup rendering 0.1

## Immutable source pin

Repository: `openai/NavierStokesAndEuler`  
Commit: `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`

The source repository's `formalization.yaml` at this revision states:
- project scope: full formalization of the main results;
- main Navier–Stokes results: alternatives C and D;
- reported `sorry_count: 0` for those declarations;
- review status: self-assessed.

This manifest treats those statements as source metadata, not independent external verification.

## Load-bearing declarations retained

| Source file | Declaration | Retained facts |
|---|---|---|
| NavierStokes/R3/ProblemStatement.lean | navierStokesResidual | exact forced NS residual definition with viscosity multiplying spatial Laplacian |
| same | CompactPositiveTimeSupport | compact spacetime support contained in t>0 |
| same | UniformFiniteEnergy | one finite kinetic-energy bound plus square integrability at each represented time |
| same | CandidateProperties | smooth u,p; shared compact K; u,p support; smooth compact positive-time f; zero initial u; divergence-free; NS=f; bounded energy; speed blowup |
| same | GlobalFiniteEnergySolution | global smooth competitor class with zero initial u, same force/equation, divergence freedom, uniform energy |
| same | breakdownStatement | for every ν>0 there exists a candidate with no global finite-energy competitor |
| NavierStokes/R3/Theorem.lean | theorem_1_1_with_initial_rest | arbitrary ν>0; candidate; no global competitor; u=p=0 for |t|≤3/8 |
| same | theorem_1_1 | full R3 breakdown theorem |
| same | theorem_1_1_with_dissipation | same candidate plus integrated force/dissipation/energy conclusions |
| NavierStokes/ComparatorSolution.lean | NavierStokes.Comparator.navier_stokes_breakdown_R3 | comparator option C adapter |
| same | NavierStokes.Comparator.navier_stokes_breakdown_periodic | comparator option D adapter |
| NavierStokes/LocalPaperTheorem.lean | Properties | compact property-rich local proof contract |
| same | properties_of_schedule | Selected schedule + all residual jet rates imply Properties |
| same | local_theorem | unconditional existence of the local Properties witnesses |
| NavierStokes/ActualCandidateAssembly.lean | Witness | selected schedule; three sums; away extensions; forcing; CandidateProperties; smooth force; consequences; H3 blowup; force decay; endpoint derivative matching |
| same | selected_witness | closed selected Witness |
| NavierStokes/MixedCandidateWitness.lean | SelectedSchedule | positive/doubling/strictly-monotone/divergent scale schedule; scale inclusion; smooth sums; vanishing joint residual jets |
| NavierStokes/CorrectionState.lean | State | mean, pressure, oscillation, oscillatory pressure, excluded errors |
| NavierStokes/CorrectionStep.lean | CycleState | State + cycle coefficients + axisymmetric alias |
| same | CycleState.step | simultaneous next state, next coefficients, next axisymmetric alias |
| same | fullResidual | nonlinear residual + virtual divergence + base error |
| NavierStokes/ActualIterationLedger.lean | sigma | stage accuracy parameter |
| same | sigma_formula / sigma_succ / sigma_strictMono | σ_J=1/5+J/10; +1/10 per stage; strict monotonicity |
| NavierStokes/ActualCyclePreservation.lean | RunInvariant | analytic + coherent + periodic invariants |
| same | state_runInvariant | every actual stage satisfies RunInvariant |
| NavierStokes/ActualCycleCoherence.lean | Coherent | state/block/axis coherence plus fixed active-label set |
| NavierStokes/ActualCyclePeriodicity.lean | Periodic | velocity/pressure/gaussian coefficient translation periodicity |
| NavierStokes/CorrectionAnalyticStep.lean | StepResult | next invariant plus temporal/rank/pressure/coefficient/post-signed residual bounds |
| same | step | derives StepResult from current invariant and actual step data |
| NavierStokes/ActualCycleResidualBounds.lean | fullResidual_reconstructed_local consumer | residual reconstruction into oscillatory sources + mean-good residual + stored errors |
| same | fixedLoss | physical residual loss function |
| same | Invariant.residual_jetRate | complete physical residual jet-rate from actual invariant |
| same | PhysicalFields | physical smoothness/germs and exterior equality to final slow base |
| NavierStokes/PulseCovariance.lean | PulseBounds | support/cutoff/Gaussian envelope hypotheses for actual pulse functions |
| NavierStokes/LeadingStressWeights.lean | FullTrueCone | full-active-annulus true-cone condition |
| same | stress_ne_zero | cone implies nonzero stress |
| same | weighted_bounds | mixed derivative/edge weighted stress bounds |
| NavierStokes/WholeDomainPhysicalStageTheorem.lean | actual_finite_velocity_bound | whole-domain finite velocity-prefix bounds |
| same | actual_finite_pressure_bound | whole-domain finite pressure-prefix bounds |
| same | actual_increment_bound | one common bound for potential/direct/pressure/velocity increments |
| NavierStokes/R3/ActualCandidate.lean | of_localized_fields | localization + positive-time compact force produces R3 CandidateProperties at ν=1 |
| same | selected_candidate_one_with_initial_rest | selected unit-viscosity candidate with initial rest |
| NavierStokes/R3/IntegratedDissipation.lean | candidate_integrable_dissipation | finite total dissipation integrability |
| same | candidate_l2Norm_le_cumulativeForceNorm | L2 norm bounded by accumulated force L2 norm |
| same | candidate_uniform_kineticEnergy_le | explicit uniform kinetic-energy bound |
| same | candidate_energy_dissipation_le | sharp energy+dissipation inequality |
| same | candidate_total_dissipation_le | endpoint total-dissipation bound |
| NavierStokes/LocalAngularGrowth.lean | AngularGrowth | quantitative u_theta asymptotic along shrinking ray |
| same | selectedRawVelocity_angularGrowth | selected raw velocity satisfies AngularGrowth |
| NavierStokes/CandidateConsequences.lean | Consequences | maximal lifespan, exact admissible lifespan interval, H3 blowup, nonzero force, all-order force-jet decay |
| NavierStokes/R3/WholeSpaceUniqueness.lean | candidate_global_agrees_before_one | any global finite-energy competitor with same force agrees with candidate before t=1 |
| NavierStokes/R3/CandidateBreakdown.lean | no_global_solution_one | uniqueness + speed blowup excludes global competitor at ν=1 |
| NavierStokes/R3/ViscosityScaling.lean | rescale_residual | exact covariance of residual under spatial/amplitude scaling |
| same | rescale_candidate | all candidate properties preserved under scaling |
| same | candidate_at_viscosity | ν=1 candidate gives candidate for every ν>0 with singular time 1 |
| NavierStokes/PeriodicPaperTheorem.lean | CandidateProperties | periodic theorem contract |
| same | of_compact_candidate | compressed compact R3 candidate periodizes into periodic candidate |
| same | periodic_corollary | periodic breakdown theorem |



| NavierStokes/CandidateFromLimits.lean | force | specified force is a smooth spacetime extension of the traced presingular residual using boundary jet data |
| same | force_eq_activated_residual | for 0≤t<1 the constructed force equals the activated Navier–Stokes residual exactly |
| same | force_smooth / force_boundary_jets / force_time_support | smoothness, endpoint-jet agreement, and future-time support of the same force |
| NavierStokes/LocalAngularGrowth.lean | exists_ray_interval | one positive late-time interval places the shrinking inner ray in the correction exterior and spatial-localization plateau with the cutoff on its plateau |
| same | rawVelocity_eq_base | full diagonal corrected velocity equals FinalSlowBase on the relevant exterior region |
| same | selectedVelocity_eq_base_on_ray | fully localized selected velocity equals FinalSlowBase along the shrinking blowup ray |
| NavierStokes/LocalResidualFlatness.lean | AllResidualJetRates | all derivative orders and arbitrary nonnegative residual powers at the singular spacetime point |
| same | exists_schedule_all_jetRates / selected_schedule | one common selected schedule simultaneously provides smooth sums, cut bounds, vanishing endpoint jets, and all residual jet rates |
| NavierStokes/WholeDomainActualStageBounds.lean | actual_finite_residual_bound | finite-stage residual jet bound with exponent h·sigma(J) − fixedLoss(m) |
| NavierStokes/ActualIterationLedger.lean | residualLoss / sigma_formula / sigma_succ | residual loss is stage-independent; sigma(J)=1/5+J/10 and increases by 1/10 each cycle |

| NavierStokes/R3/CompactEnergy.lean | energy_balance / energy_rate_le / uniform_finite_energy | compact support, smooth force, divergence freedom and the exact PDE yield the forced energy balance; a scalar Gronwall/integrating-factor argument gives UniformFiniteEnergy |

## Exact R3 CandidateProperties fields retained

At the pinned source revision, `NavierStokes/R3/ProblemStatement.lean::CandidateProperties` has exactly these 12 named fields, all represented in the native artifact:

1. `velocity_smooth`
2. `pressure_smooth`
3. `support_compact`
4. `velocity_support`
5. `pressure_support`
6. `force_smooth`
7. `force_support`
8. `zero_initial_velocity`
9. `divergence_free`
10. `navier_stokes`
11. `energy_bounded`
12. `speed_unbounded`

## Exact periodic CandidateProperties fields retained

At the pinned source revision, `NavierStokes/PeriodicPaperTheorem.lean::CandidateProperties` has exactly these 16 named fields, all represented in the native artifact:

1. `velocity_smooth`
2. `pressure_smooth`
3. `force_smooth`
4. `velocity_periodic`
5. `pressure_periodic`
6. `force_periodic`
7. `support_compact`
8. `support_interior`
9. `velocity_support`
10. `pressure_support`
11. `zero_initial_velocity`
12. `force_time_support`
13. `force_zero_nonpos`
14. `divergence_free`
15. `navier_stokes`
16. `speed_unbounded`

## Compact local theorem fields retained exactly by role

`LocalPaper.Properties` fields:
1. exponent_small;
2. scale_positive;
3. edges_ordered;
4. potential_smooth;
5. direct_smooth;
6. velocity_smooth;
7. pressure_smooth;
8. direct_angular;
9. decomposition;
10. divergence_free;
11. potential_extensions;
12. direct_extensions;
13. pressure_extensions;
14. potential_jets_bounded;
15. direct_jets_bounded;
16. pressure_jets_bounded;
17. residual_flatness;
18. exterior;
19. angular_growth.

## Explicit non-claims

This artifact does **not** claim:
- that every Lean declaration in the transitive proof closure has been individually encoded;
- that source paper paragraphs and Lean declarations have been exhaustively bijected;
- that formal verification alone constitutes independent mathematical-community validation;
- that the forced PDE construction is physically realizable through molecular/thermodynamic scales;
- that repeated correction stages are naturally identical;
- that different formal representations of the same scoped property are globally NEI SAME.
