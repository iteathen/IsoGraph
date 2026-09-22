# Navier–Stokes forced-blowup IsoGraph rendering

**Status:** research representation; not qualified IsoGraph evidence and not an independent validation of the Navier–Stokes proof.

**Branch owner:** `work/navier-stokes-proof-isograph-20260921` only.

**IsoGraph base:** `main@148a91b576aa8de6f92c34aa305fc55fd458c452`.

**Pinned mathematical/formal source:** `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`.

**Pinned IsoGraph semantic dependencies:**
- Core 0.17 qualified authority: `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`.
- QU 0.1, exact qualified revision recorded in `qualification/QUALIFIED_MODULES_2026-09-18.md`.
- NEI 0.4, exact qualified revision recorded in the same manifest.
- Discovery Protocols 0.1–0.4 cumulative qualified module, used only as discovery guidance.

## Purpose

Represent as much of the internal mathematical structure of the released forced Navier–Stokes blowup proof as is reasonable in a compact agent-readable artifact, while preserving exact source provenance and refusing to manufacture completeness, identity, or physical-realizability claims.

The representation is deliberately property-rich. It compresses repetitive proof engineering but retains named mathematical distinctions, invariants, transformations, error/residual structure, scaling, localization, energy, singularity, comparison, and periodization bridges.

## Retention levels

### L0 — final theorem contract

The R3 theorem contract is represented from:
- `NavierStokes/R3/ProblemStatement.lean::CandidateProperties`;
- `GlobalFiniteEnergySolution`;
- `breakdownStatement`;
- `NavierStokes/R3/Theorem.lean::theorem_1_1`;
- `NavierStokes/ComparatorSolution.lean::navier_stokes_breakdown_R3`.

### L1 — compact local/mechanistic contract

`NavierStokes/LocalPaperTheorem.lean::Properties` is retained almost field-for-field. It gives a compact internal boundary containing:
- the small exponent and positive scale;
- ordered inner/exterior edges;
- smooth potential/direct/velocity/pressure fields;
- angular direct field;
- curl-plus-direct decomposition;
- incompressibility;
- away extensions;
- uniform jet bounds;
- all-order residual flatness;
- exact heat exterior with zero residual;
- angular blowup growth.

### L2 — construction and correction machinery

The first pass retains source-backed structure from:
- `ActualCandidateAssembly.Witness`;
- `MixedCandidateWitness.SelectedSchedule`;
- `CorrectionState.State`;
- `CorrectionStep.CycleState` and `CycleState.step`;
- `ActualCyclePreservation.RunInvariant`;
- `ActualCycleCoherence.Coherent`;
- `ActualCyclePeriodicity.Periodic`;
- `CorrectionAnalyticStep.StepResult`;
- `ActualIterationLedger.sigma`;
- `ActualCycleResidualBounds`;
- `PulseCovariance.PulseBounds`;
- `LeadingStressWeights.FullTrueCone`;
- finite-prefix bounds and physical-field bridges.

This is intentionally not claimed to be the complete transitive Lean dependency closure.

### L3 — terminal/global bridges

Retained:
- localization and positive-time compact forcing;
- initial rest interval;
- uniform energy and integrated dissipation;
- quantitative angular growth;
- whole-space uniqueness/comparison;
- arbitrary positive-viscosity rescaling;
- periodic compression/periodization;
- comparator alternatives C and D.

## Accuracy rules

1. A relation marked source-exact in the schema must point to a named declaration at the pinned OpenAI SHA.
2. Source comments and filenames may guide discovery but are not treated as theorem authority by themselves.
3. Repeated low-level estimates may be represented as a parameterized property family, but distinct named state components or mathematical obligations are not merged merely for compactness.
4. Structural correspondence is not NEI SAME.
5. Different SI is not NEI DISTINCT.
6. Where the pass has not established the exact admissible possibility family, NEI remains `INCOMPLETE/UNQUALIFIED`, not semantic UNKNOWN.
7. Omitted lower-level proof structure is represented through QU completeness boundaries rather than implicitly treated as irrelevant.
8. Physical realizability/thermodynamic interpretation is outside the formal theorem contract and is explicitly separated.

## Files

- `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg` — native structural rendering.
- `NAVIER_STOKES_FORCED_BLOWUP_0_1_SCHEMA.md` — local label/SI dictionary and interpretation boundaries.
- `SOURCE_MANIFEST_0_1.md` — exact source revision and declaration-to-property provenance.

## Reduced-formula equivalence artifacts

- `REDUCED_FORMULA_0_2.md` — repaired eight-component reduced formula.
- `REDUCED_FORMULA_0_2.isg` — native reduced-formula graph.
- `REDUCED_FORMULA_0_2_SCHEMA.md` — local schema and source imports.
- `REDUCED_FORMULA_EQUIVALENCE_0_2.md` — two-way equivalence matrix against the published proof and pinned formalization.
- `REDUCED_FORMULA_VALIDATION_0_2.md` — deterministic integrity, source-import, and deletion-test audit.

The historical D10 synthesis is preserved in `DP_DISCOVERY_0_1.md` as under-complete for equivalence. RF-0.2 is the first reduced formula in this branch to pass the declared proof-outline/interface equivalence test.

## Discovery artifacts

- `DP_DISCOVERY_0_1.md` — qualified-DP-0.1–0.4 research ledger and falsification history.
- `DP_DISCOVERY_0_1.isg` — native discovery view with lifecycle status, residuals, breakers, QU/NEI impact, and synthesis dependencies.
- `DP_DISCOVERY_0_1_SCHEMA.md` — local discovery vocabulary and explicit source-namespace import.
- `DP_VALIDATION_0_1.md` — deterministic audit of the DP artifacts.

## Falsifiers / next checks

This rendering should be revised if any of the following occurs:

- a represented source-exact edge cannot be traced to the pinned declaration;
- a property field from either R3 `CandidateProperties` or `LocalPaper.Properties` is missing;
- a compressed property family hides a source distinction consumed differently downstream;
- a QU state excludes a source-admissible possibility or admits a source-excluded possibility;
- an NEI result is stronger than its exact identity model/evidence;
- the native artifact is not parseable under Core 0.17 syntax.

## Branch retirement condition

Do not promote this work merely because the rendering is useful. Retirement requires either:
1. a reviewed/qualified successor is deliberately promoted into IsoGraph authority/research on explicit owner instruction; or
2. the experiment is abandoned, with all useful findings preserved on this branch unless the owner explicitly authorizes another destination.
