# Reduced formula 0.2 — equivalence test against the published solution

**Disposition:** PASS for **proof-outline/interface equivalence**, after the original D10 abstraction failed and was repaired.

**Not claimed:** line-by-line proof equivalence, formal derivability of the paper from this document alone, minimality, or independent validation of the published proof.

## Sources frozen for the test

Published paper:
- *Finite Time Blowup for Navier–Stokes*, OpenAI, 166 pages.
- Public PDF referenced by the pinned OpenAI formalization metadata.

Formal source:
- \`openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`.

Reduced formula:
- \`REDUCED_FORMULA_0_2.md\`.

## Equivalence criterion

RF-0.2 passes only if all of the following hold.

### E1 — published-role coverage

Every major load-bearing role in the paper's Section 3 proof outline and every top-level proof section/appendix that contributes a distinct mechanism must map to at least one RF component.

### E2 — final-contract coverage

Every field/obligation of:
- Theorem 3.1;
- Theorem 1.1;
- R3 \`CandidateProperties\`;
- periodic \`CandidateProperties\`;
- alternatives C and D;

must be reachable from RF components without importing an unrepresented independent mechanism.

### E3 — reverse provenance

Every RF component must be backed by named published-paper machinery and by source declarations/theorem families in the pinned formalization.

### E4 — dependency direction

The RF dependency order must agree with the published construction. A downstream adapter or consequence may not be used as evidence for an upstream existence mechanism.

### E5 — residual preservation

Known differences must remain explicit:
- flat residual != exact-zero residual;
- sigma-stage accuracy != diagonal schedule scale;
- R3 competitor != periodic competitor;
- interface-role correspondence != NEI identity.

### E6 — deletion test

For every G1–G8, deleting it must leave at least one published load-bearing obligation without a generator under the frozen abstraction. Otherwise the formula is not yet reduced coherently.

---

# 1. Failure of the original D10

The original D10 was not equivalent.

It captured:
- protected blowup;
- residual-order improvement;
- diagonal summation;
- residual-to-force completion;
- energy closure after repair;
- transport;
- uniqueness obstruction.

But comparison against the published proof outline found three independent omitted interfaces:

1. **background-profile / annular-stress synthesis** — the paper constructs profiles whose residual is an annular stress divergence plus a flat remainder and enforces an admissible stress cone;
2. **oscillatory stress realization** — two pulse families, auxiliary support separation, exact curls, and averaged quadratic covariance realize/cancel the leading stress;
3. **the internal four-part correction cycle** — nonzero angular modes, signed covariance/mean-stress repair, auxiliary-mean correction, and radial-moment/pressure repair.

Those are not cosmetic proof details. Without them there is no represented mechanism establishing that the high-order residual-improvement recurrence actually exists.

RF-0.2 adds them as G1–G3.

---

# 2. Paper section coverage

| Published solution region | Distinct load-bearing role | RF mapping | Result |
|---|---|---|---|
| Section 4 — leading order flow | concentrating similarity geometry; singular core; leading profile and pressure | G1 | PASS |
| Section 5 — base corrected to every order | recursive axisymmetric corrections; exact incompressibility; background residual = annular stress divergence + flat remainder | G1 | PASS |
| Section 6 — auxiliary torus/support separation | independent fast variables and label separation eliminate unintended cross-pulse products while preserving intended averages | G2 | PASS |
| Section 7 — oscillatory realization | pulse growth/decay; positive stress representation; averaged quadratic covariance; exact curls | G2 | PASS |
| Section 8 — compact mean corrections | mean inversion; divergence-free mean increments; compact support; radial/pressure/moment correction machinery | G3 | PASS |
| Section 9 — residual improvement/local field | full residual recomputation; four-part cycle; sigma improvement; preserved support/integrals; diagonal cutoffs and smooth sums | G3 + G4 | PASS |
| Section 10 — compact forcing/whole-space breakdown | localization; residual extension to smooth force; energy; uniqueness; viscosity scaling; periodic corollary | G5 + G6 + G7 + G8 | PASS |
| Appendix A | heat exterior; pressure/moment matching; exact exterior residual zero | G1 + G4 | PASS |
| Appendix B | analytic inner profiles and matching to exterior | G1 | PASS |
| Appendix C | enforce admissible stress cone while restoring five moments | G1 | PASS |

No top-level proof section remains unmapped.

---

# 3. Section 3 proof-outline coverage

The published proof outline can be reconstructed by RF-0.2 as follows.

## 3.1 concentrating leading field

Published role:
- similarity coordinates and anisotropic scales;
- singular azimuthal/axial growth;
- exact incompressibility and regularity;
- heat-tail compatibility.

RF:
- G1.

Result: PASS.

## 3.2 background stress

Published role:
- define stress from tangential residual;
- zero stress in inner core and heat exterior;
- five radial-moment matching;
- admissible cone/positive covariance weights;
- all-order background correction.

RF:
- G1.

Result: PASS.

## 3.3 oscillations and momentum transport

Published role:
- linearized pulse growth/viscous decay;
- auxiliary torus;
- support separation;
- exact curls;
- averaged quadratic covariance realizes target stress;
- retain higher-order corrections.

RF:
- G2.

Result: PASS.

## 3.4 correction and summation

Published role:
- exact residual increment identity;
- four correction operations;
- pressure reconstruction and moment repair;
- full residual recomputation;
- sigma_j -> infinity with derivative loss independent of stage;
- preserved support/integrals;
- shrinking cutoff/diagonal summation.

RF:
- G3 + G4.

Result: PASS.

## 3.5 localization and completion

Published role:
- vector-potential/direct decomposition;
- spatial/time cutoff preserving divergence freedom;
- flat local residual plus exact heat exterior give all derivative limits;
- smooth future extension gives compact force;
- blowup path stays in cutoff plateau;
- energy and uniqueness complete theorem.

RF:
- G4 + G5 + G6 + G8.

Result: PASS.

Viscosity scaling and periodic completion:
- G7.

Result: PASS.

---

# 4. Theorem 3.1 coverage

| Theorem 3.1 obligation | RF source |
|---|---|
| \(u=\operatorname{curl}A+B e_\theta\) | G4 local interface produced from G1–G3 |
| exact divergence freedom | G1/G2/G3 preservation -> G4 |
| smooth Cartesian representatives at axis | G1 + G4 |
| all derivatives bounded away from singular point with compatible one-sided limits | G4 |
| arbitrary-order residual flatness on bounded similarity regions | G3 -> G4 |
| exact-zero heat exterior with explicit exterior flow | G1 + G4 |
| positive inner angular-growth asymptotic | G1 protected singular base + G4 protected channel |

Result: PASS.

---

# 5. Theorem 1.1 / R3 contract coverage

| R3 property | RF source |
|---|---|
| velocity smooth on pre-singular domain | G4 -> G5 |
| pressure smooth | G4 -> G5 |
| common compact support | G5 |
| velocity support in K | G5 |
| pressure support in K | G5 |
| force smooth | G5 |
| force compactly supported in positive time | G5 |
| zero initial velocity | G5 (time localization/initial rest) |
| divergence-free | G1–G4, preserved by G5 |
| exact forced NS equation | G5, force = residual |
| uniformly finite kinetic energy | G6 |
| speed unbounded at t=1 | G1 + G4 + G5 |
| no global finite-energy smooth competitor | G8 |
| every positive viscosity | G7 |

Result: 14/14 represented theorem/consequence obligations covered.

---

# 6. Periodic/D contract coverage

| Periodic obligation | RF source |
|---|---|
| smooth velocity/pressure/force | G5 + G7 |
| unit spatial periods | G7 periodization |
| compact support/interior-before-periodization requirements | G5 + G7 compression |
| zero initial velocity | G5/G7 |
| force future-time support / zero nonpositive time | G5, preserved by G7 |
| divergence-free | G5, preserved by G7 |
| exact forced NS equation | G5, preserved by G7 |
| speed unbounded | G4/G5, preserved by G7 |
| no global smooth periodic competitor | G8 |
| comparator D form | G7 adapter |

Result: PASS.

---

# 7. Reverse-provenance test

Every RF component has published and formal support.

| RF | Published proof | Representative pinned formalization support | Result |
|---|---|---|---|
| G1 | Sections 3.1–3.2, 4–5, App A–C | \`BaseWitnessClosure.actual_base_compatible\`; \`LeadingStressWeights.FullTrueCone\`; base/residual/moment construction families | PASS |
| G2 | Section 3.3, Sections 6–7 | \`PulseCovariance.PulseBounds\`; \`PrimaryTargetBounds.exists_constructed_bounds\`; \`HarmonicSourceSupport\`; primary covariance/wave families | PASS |
| G3 | Section 3.4, Sections 8–9 | \`CorrectionAnalyticStep.StepResult\` and \`step\`; \`ActualCyclePreservation.state_runInvariant\`; \`FiveRowRank.exists_five_row_repair\` | PASS |
| G4 | Section 3.4 / Theorem 3.1 / Section 9 | \`LocalResidualFlatness.selected_schedule\`; \`LocalPaperTheorem.Properties\`; \`LocalAngularGrowth\` | PASS |
| G5 | Section 3.5 / Section 10.1–10.2 | \`CandidateFromLimits.force\`; \`force_eq_activated_residual\`; R3 localization/positive-time force | PASS |
| G6 | Section 10 energy estimates | \`CompactEnergy.energy_balance\`; \`uniform_finite_energy\`; \`IntegratedDissipation\` | PASS |
| G7 | viscosity/periodic completion | \`ViscosityScaling\`; \`ParabolicScaling\`; \`PeriodicPaperTheorem\`; comparator bridges | PASS |
| G8 | Section 10 comparison/breakdown | \`WholeSpaceUniqueness\`; \`CandidateBreakdown\`; \`PeriodicViscosity.excludes_global_solution\` | PASS |

Result: 8/8 RF components source-backed.

---

# 8. Dependency-direction test

Published dependency direction:

\[
\text{profiles/base}
\to \text{stress}
\to \text{waves}
\to \text{correction cycle}
\to \text{summed local field}
\to \text{localized force/candidate}
\to \text{energy + uniqueness}
\to \text{rescaling/periodic/comparator}.
\]

RF-0.2 direction:

\[
G1\to G2\to G3\to G4\to G5,
\]

then:
- \(G5\to G6\);
- \(G5\to G7\);
- candidate + \(G6/G7\to G8\).

No RF component uses a downstream theorem to manufacture an upstream construction.

Result: PASS.

---

# 9. Residual-preservation test

RF-0.2 explicitly keeps these non-equivalences:

1. arbitrary-order terminal residual flatness vs exact exterior residual zero;
2. correction accuracy \(\sigma_j\) vs diagonal schedule \(a_j\);
3. whole-space finite-energy competitor vs periodic competitor;
4. generic recurrence role vs concrete stage occurrence;
5. stress realization vs later residual-improvement machinery;
6. local candidate construction vs transport adapters.

Result: PASS.

---

# 10. Deletion test

| Delete | First published obligation that loses a generator | Result |
|---|---|---|
| G1 | no concentrating singular background / admissible annular target stress / heat exterior | necessary |
| G2 | no construction realizing/canceling leading annular stress with divergence-free pulses | necessary |
| G3 | no mechanism correcting remaining angular/mean/moment residuals and improving \(\sigma_j\) | necessary |
| G4 | no smooth diagonal sum, all-order flat local residual, or protected final blowup field | necessary |
| G5 | no compact whole-space fields or globally smooth prescribed force equal to residual | necessary |
| G6 | no proof of uniform finite kinetic energy for alternative C | necessary |
| G7 | theorem remains only in the untransported unit-viscosity/local setting; no arbitrary viscosity/periodic/comparator transport | necessary for full published result |
| G8 | candidate exists but global-solution nonexistence does not follow | necessary |

All eight terms are load-bearing under this abstraction.

Result: PASS.

---

# 11. Remaining limits of the equivalence claim

RF-0.2 is equivalent only at the declared proof-outline/interface level.

The test does **not** establish:
- that G1–G8 form a formally sufficient axiom set from which Lean can derive the theorem without the hidden lower-level lemmas;
- that no finer independent mechanism exists inside a Gi;
- that the formula is mathematically minimal;
- that every page/lemma has a one-to-one RF mapping;
- that paper and Lean are naturally identical representations;
- that the published proof is independently correct.

Those remain outside the claim.

---

# Final disposition

## Original reduced formula / D10

\`FAIL\` — under-complete.

Missing:
- background stress/profile synthesis;
- oscillatory stress realization and support separation;
- explicit four-role correction machinery.

## RF-0.2

\`PASS — PROOF-OUTLINE / INTERFACE EQUIVALENT\`

All major published construction roles, final theorem obligations, top-level sections, and source-backed formal interfaces are represented. Every RF component is load-bearing under deletion testing. Known residual distinctions remain explicit.

This is the strongest equivalence claim justified by the present evidence.
