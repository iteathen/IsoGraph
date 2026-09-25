# Proof of S0.3 interface sufficiency

**Claim proved here:** relative to the pinned published proof and pinned Lean formalization, the S0.3 interfaces are sufficient to recover the complete whole-space and periodic theorem contracts.

**Proof strength:** interface/compositional proof over source-exact theorem families.

**Not claimed:** a new independent analytic proof of Navier–Stokes blowup, a Lean proof of S0.3 itself, or minimality of the interface set.

## Theorem

Let P0–P9 be the interfaces in \`FRESH_SYNTHESIS_S0_3.md\`.

Under the source-exact obligations discharged by the pinned formalization

\`openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`,

their composition implies:

1. the R3 forced-breakdown statement for every \(\nu>0\);
2. the initial-rest strengthening used for the periodic compression;
3. the periodic forced-breakdown statement;
4. comparator alternatives C and D.

## Proof

### Lemma 1 — P0 supplies an admissible singular seed

The source constructs one fixed slow/background choice satisfying the compatibility needed by the correction machine.

Representative formal facts:

- \`BaseWitnessClosure.actual_base_compatible\` supplies:
  - the outgoing profile specification;
  - the nominal certificate;
  - \`LeadingStressWeights.FullTrueCone\`;
  - preservation of the axis pressure datum.
- \`FinalSlowBase.velocity_eq_curl\` supplies a vector-potential realization.
- \`FinalSlowBase.divergence_zero\` gives exact divergence freedom.
- \`FinalSlowBase.residual_identity\` gives
  \[
  R(u_B,p_B)=\text{stressForce}+E_B.
  \]
- \`FinalSlowBase.error_allJetsFlat\` gives all-order flatness of \(E_B\).
- \`FinalSlowBase.stressForce_zero_right\` / core/exterior support lemmas localize the stress.
- \`FinalSlowBase.exterior_residual_zero\` gives the exact heat exterior.
- \`FinalSlowBase.speedUnbounded\` supplies the singular growth channel.

The published proof's Sections 3.1–3.2, Sections 4–5, and Appendices A–C provide the same role: a concentrating background, annular stress, flat remainder, matched moments, admissible stress cone, and exact exterior.

Therefore P0 is discharged.

### Lemma 2 — P1 supplies the first stress-cancelling oscillatory realization

The source constructs actual pulse/copy data from the P0 stress target.

Representative facts:

- \`LeadingStressWeights.FullTrueCone\` makes the target stress admissible for positive covariance realization.
- \`PrimaryTargetBounds.exists_actual_bounds\` / \`exists_constructed_bounds\` build the actual target/covariance geometry.
- the primary covariance family in \`ActualPrimaryCovariance\` realizes the target stress by averaged quadratic products;
- \`HarmonicSourceSupport.supported_nonlinearResidual_sum\` proves exact elimination of cross-label transport interactions under the colored-support geometry;
- \`OscillatoryCurl.wave_divergence_free\` and the ModeSolenoidal families make each realized wave exactly divergence-free.

Thus the leading annular stress supplied by P0 is cancelled by the intended averaged quadratic flux while all remainder terms remain represented.

Therefore P1 is discharged.

### Lemma 3 — P2 is an exact reconstruction, not a heuristic grouping

For every represented correction state satisfying the extraction/representation conditions,

\`ActualCycleResidualBounds.fullResidual_decomposition\` proves:

\[
R_{\mathrm{full}}
=
\sum_l R_l^{\mathrm{osc}}
+
R^{\mathrm{mean}}
+
E^{\mathrm{stored}}.
\]

The proof uses the exact \`CycleRepresentation\`, local residual grouping, and the angular-mean equation. The independent axisymmetric alias is retained.

The corresponding reconstruction theorems in \`HarmonicResidual\` state that all excluded errors are restored exactly once.

Therefore P2 is a lossless interface for the current residual under the represented domain assumptions.

### Lemma 4 — P3 closes one complete correction cycle

The source's one-step theorem is:

\`CorrectionAnalyticStep.step\`.

Its conclusion \`StepResult\` contains:
- the next analytic invariant at \(\sigma+1/10\);
- temporal increment bounds;
- rank increment bounds;
- pressure increment bounds;
- wave coefficient bounds;
- post-signed angular and axial mean-residual bounds.

Its proof explicitly uses:
- current \`CycleRepresentation\`;
- particular-wave data;
- signed covariance data;
- support/carrier conditions;
- temporal reconstruction;
- rank reconstruction;
- excluded-error bookkeeping.

The physical realization of one cycle is exactly the sum of four contributions:
- particular;
- signed;
- temporal;
- rank.

The rank increment is tied to the current debt by the FiveRows machinery; \`LocalRankDefect\` proves that its linear rows equal the negative debt.

The four literal stages share one continuation frame in \`CycleContinuationInvariant\`, and the next state is reconstructed under the common gauge.

Therefore P3 is discharged.

### Lemma 5 — P4 gives an unbounded correction-order ladder

\`ActualIterationLedger.sigma_formula\` and \`sigma_succ\` give

\[
\sigma_j=\frac15+\frac{j}{10},
\qquad
\sigma_{j+1}=\sigma_j+\frac1{10}.
\]

\`ActualCyclePreservation.state_runInvariant\` proves by induction that every actual stage satisfies the common run invariant at \(\sigma_j\).

\`ActualCycleResidualBounds.Invariant.residual_jetRate\` gives, for derivative order \(m\),

\[
\operatorname{JetRate}
\left(
R_j,
h\!\left(\frac12+\sigma_j\right)-\operatorname{fixedLoss}(m)
\right).
\]

The global finite-stage bound is weakened only to the ledger gain; the loss remains independent of stage.

Because \(h>0\) and \(\sigma_j\to\infty\), for every fixed \(m\) and every target power \(N\), choose \(j\) sufficiently large that the residual exponent is at least \(N\).

Therefore the recurrence can meet every finite residual-order obligation.

### Lemma 6 — P5 converts all finite obligations into one local field

The previous lemma gives arbitrarily high finite-stage rates, but the final theorem needs one common infinite object.

\`LocalResidualFlatness.selected_schedule\` selects one schedule \(a:\mathbb N\to\mathbb N\) satisfying simultaneously:
- the selected-schedule conditions;
- all common cut bounds;
- \`AllResidualJetRates\`.

\`LocalPaperTheorem.properties_of_schedule\` converts those schedule/rate hypotheses into the complete 19-field \`LocalPaper.Properties\` contract.

\`LocalPaperTheorem.local_theorem\` removes all finite-stage/schedule hypotheses and proves unconditional existence of those local witnesses.

Hence P5 produces one smooth local field with:
- potential/direct decomposition;
- divergence freedom;
- compatible away extensions;
- uniform jet bounds;
- all-order residual flatness;
- exact heat exterior;
- angular blowup growth.

Therefore P5 is discharged.

### Lemma 7 — P6 closes the compact forced candidate

The source turns the local construction into a force/candidate in two exact steps.

First, \`CandidateFromLimits.force\` constructs the force as a smooth extension of the traced presingular residual, and \`force_eq_activated_residual\` proves exact equality with the activated Navier–Stokes residual for \(0\le t<1\).

Second, \`NavierStokesR3.ActualCandidate.of_localized_fields\` spatially/time localizes the fields and gives the R3 \`CandidateProperties\` bundle at viscosity one, including compact support, smooth force with positive-time compact support, zero initial velocity, divergence freedom, exact equation, energy bound, and blowup.

\`selected_candidate_one_with_initial_rest\` gives the same candidate together with the interval on which both velocity and pressure vanish.

Thus P6 closes the whole-space candidate interface and supplies the initial-rest side condition.

### Lemma 8 — P7 is the source of the finite-energy field, not an independent assumption

Inside the whole-space candidate construction, the energy field is supplied by

\`CompactEnergy.uniform_finite_energy\`.

Its hypotheses are exactly the S0.3 closure data:
- compact spatial support;
- pre-singular smoothness;
- globally smooth compact force;
- zero initial velocity;
- divergence freedom;
- exact forced equation.

The proof derives the forced energy balance, an energy-rate estimate, and a scalar integrating-factor/Gronwall bound.

The stronger \`IntegratedDissipation\` family yields the same candidate's dissipation and sharp force/energy inequalities.

Therefore P7 is discharged and the finite-energy requirement of alternative C is generated rather than assumed.

### Lemma 9 — P9 excludes a global whole-space competitor at viscosity one

For a viscosity-one R3 candidate \(h\),

\`WholeSpaceUniqueness.candidate_global_agrees_before_one h v\`

proves that every global smooth uniformly finite-energy solution with the same force and zero initial datum agrees with the candidate for every \(t<1\).

\`CandidateProperties.no_global_solution_one\` then combines that agreement with the candidate's speed blowup to exclude any such global competitor.

Therefore P9 proves the viscosity-one R3 breakdown conclusion.

### Lemma 10 — P8 transports the closed whole-space contract to every positive viscosity

\`ViscosityScaling.candidate_at_viscosity\` maps a viscosity-one candidate to a candidate at arbitrary \(\nu>0\), preserving singular time one and the force support class.

\`normalized_global_solution\` transports any hypothetical global competitor back to viscosity one.

Accordingly, \`R3.Theorem.theorem_1_1_with_initial_rest\` composes:
- the selected unit-viscosity candidate;
- viscosity scaling;
- viscosity-one no-global-solution.

It obtains the complete theorem contract for every \(\nu>0\), while preserving the initial-rest interval.

\`R3.Theorem.theorem_1_1\` then proves the R3 \`breakdownStatement\`.

Thus the whole-space result follows from P0–P9.

### Lemma 11 — P8 and P9 also yield the periodic theorem

Starting from \`theorem_1_1_with_initial_rest\`:

1. \`PeriodicPaper.exists_compression_scale\` chooses a support-fitting scale;
2. \`ParabolicScaling.compressedCandidate\` uses the initial-rest interval to perform delayed parabolic compression;
3. \`PeriodicPaper.of_compact_candidate\` periodizes the compressed compact candidate and proves all 16 periodic \`CandidateProperties\` fields;
4. \`PeriodicViscosity.excludes_global_solution\` gives the periodic global-solution obstruction;
5. \`PeriodicPaper.periodic_corollary\` proves the periodic \`breakdownStatement\`.

The comparator bridges then instantiate alternatives C and D.

Therefore the periodic result follows from the same closed construction plus the P8 transport layer.

## Contract coverage

### R3 CandidateProperties

All 12 exact fields are generated:
- velocity_smooth — P5/P6;
- pressure_smooth — P5/P6;
- support_compact — P6;
- velocity_support — P6;
- pressure_support — P6;
- force_smooth — P6;
- force_support — P6;
- zero_initial_velocity — P6;
- divergence_free — P0/P1/P3/P5/P6;
- navier_stokes — P6;
- energy_bounded — P7;
- speed_unbounded — P0/P5/P6.

No R3 field is left as an independent assumption.

### Periodic CandidateProperties

All 16 periodic fields are generated by P6 plus P8:
- smooth velocity/pressure/force;
- velocity/pressure/force periodicity;
- support compactness/interior placement;
- velocity/pressure support;
- zero initial velocity;
- force future-time support;
- force zero for nonpositive time;
- divergence freedom;
- exact forced equation;
- speed blowup.

## Fresh-mechanism necessity test

This test is about the S0.3 abstraction, not mathematical uniqueness of proof technique.

### Delete support coloring from P1

The exact cross-label nonlinear-residual sum no longer follows. The grouped same-label residual interface used by harmonic/correction estimates loses its source theorem.

Result: load-bearing at this abstraction.

### Delete solenoidal representation

Exact divergence freedom for the base/waves/localized potential construction must be replaced by an unrepresented repair mechanism.

Result: load-bearing at this abstraction.

### Delete P2 residual normal form

The correction operator loses an exact reconstruction connecting label-local sources, mean residual, and excluded errors to the physical full residual.

Result: load-bearing.

### Delete FiveRows from P3

The rank increment no longer has a represented construction cancelling the finite moment/debt obstruction.

Result: load-bearing.

### Delete the synchronized multi-view representation/common continuation frame

The source one-step theorem cannot be represented as a single recurrence over state, coefficients, and alias with preserved primitives/coherence.

Result: load-bearing for the current mechanistic factorization.

### Delete P4

There is no route from one correction step to arbitrary residual order.

### Delete P5

There is no single smooth local field satisfying all countably many residual/regularity obligations simultaneously.

### Delete P6

There is no globally smooth compactly supported prescribed force/candidate.

### Delete P7

The R3 finite-energy field is ungenerated.

### Delete P8

The construction remains restricted to the untransported viscosity-one/whole-space setting.

### Delete P9

Existence of a blowing-up candidate does not imply nonexistence of a global smooth competitor.

Every S0.3 component has a downstream obligation that fails under deletion.

## Why S0.2 failed and S0.3 succeeds

S0.2 began with support coloring and residual normalization. Those mechanisms presuppose:
- a singular background;
- an annular target stress;
- admissible positive stress geometry;
- actual pulse/wave data whose covariance can realize that stress.

Those were independent existence obligations in the published proof and formal source.

S0.3 adds them as P0 and P1.

After that repair, every major published proof stage and every final contract field has a source-backed path through P0–P9.

## Conclusion

Relative to the pinned source, S0.3 is **proved sufficient at the proof-interface level**:

\[
P0\land P1\land\cdots\land P9
\Longrightarrow
\text{R3 breakdown}
\land
\text{periodic breakdown}.
\]

The proof is compositional and source-exact at its interfaces.

It does not establish that P0–P9 are mathematically minimal or that their internal source proofs can be discarded.
