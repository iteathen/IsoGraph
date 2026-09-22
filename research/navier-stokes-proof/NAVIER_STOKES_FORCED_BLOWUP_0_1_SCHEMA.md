# NAVIER_STOKES_FORCED_BLOWUP_0_1 local schema

This file maps local IsoGraph labels and principal SIs in `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg` to human-readable source roles.

Local labels below are artifact-owned. QU `^950xx` and NEI `^941xx/^9401x` labels retain the exact qualified extension meanings from their pinned vocabularies.

## Local labels

| Label | Role |
|---|---|
| ^70000 | artifact record |
| ^70001 | pinned source revision |
| ^70002 | source file |
| ^70003 | source declaration / declaration-family anchor |
| ^70004 | evidence/provenance edge |
| ^70005 | semantic object |
| ^70006 | property record |
| ^70007 | has property |
| ^70008 | depends on |
| ^70009 | transforms to |
| ^70010 | preserves |
| ^70011 | improves/decreases error or increases accuracy |
| ^70012 | decomposition/factorization |
| ^70013 | exact source bridge |
| ^70014 | scoped structural correspondence/equivalence candidate |
| ^70015 | residual/error object |
| ^70016 | boundary/interface |
| ^70017 | stage occurrence/family |
| ^70018 | parameterized property family |
| ^70019 | instance-of |
| ^70020 | final theorem target |
| ^70021 | construction input |
| ^70022 | construction output |
| ^70023 | theorem/contract bundle |
| ^70024 | domain/scope |
| ^70025 | parameter |
| ^70026 | exact-value attachment |
| ^70027 | inequality/order constraint |
| ^70028 | support/localization relation |
| ^70029 | regularity property |
| ^70030 | asymptotic/growth/decay property |
| ^70031 | comparison/uniqueness relation |
| ^70032 | provenance/source association |
| ^70033 | status |
| ^70034 | claim scope |
| ^70035 | source-derived consequence |
| ^70036 | source-exact statement |
| ^70037 | interpretation-only / non-authoritative gloss |
| ^70038 | explicit overclaim exclusion |
| ^70039 | open question |
| ^70040 | mapping/bridge |
| ^70041 | evidence path |
| ^70042 | property family |
| ^70043 | result |
| ^70044 | recurrence/iteration |
| ^70045 | stage accuracy parameter |
| ^70046 | finite prefix |
| ^70047 | infinite sum/limit object |
| ^70048 | force role |
| ^70049 | velocity role |
| ^70050 | pressure role |
| ^70051 | Navier–Stokes residual relation |
| ^70052 | energy/dissipation role |
| ^70053 | blowup role |
| ^70054 | periodicity role |
| ^70055 | coherence role |
| ^70056 | covariance role |
| ^70057 | stress role |
| ^70058 | pulse/wave role |
| ^70059 | localization role |
| ^70060 | scaling role |
| ^70061 | uniqueness/comparison role |
| ^70062 | periodization role |
| ^70063 | theorem/result role |
| ^70064 | fixed represented fact |
| ^70065 | unresolved/open structure |
| ^70066 | source-name anchor |

## Principal SIs

### Authority/source

| SI | Meaning |
|---|---|
| 1000 | this rendering |
| 1010 | OpenAI formalization SHA f9e8bc5... |
| 1020 | IsoGraph Core 0.17 qualified authority |
| 1021 | QU 0.1 qualified dependency |
| 1022 | NEI 0.4 qualified dependency |
| 1023 | Discovery Protocols 0.1–0.4 qualified dependency |

### Final R3 theorem

| SI | Meaning |
|---|---|
| 1100 | R3 forced-breakdown theorem contract |
| 1101 | R3 CandidateProperties bundle |
| 1102 | GlobalFiniteEnergySolution competitor class |
| 1103 | positive viscosity ν |
| 1104 | candidate velocity u |
| 1105 | candidate pressure p |
| 1106 | prescribed force f |
| 1107 | shared compact spatial support K |
| 1110–1121 | individual CandidateProperties obligations |
| 1130 | no global smooth finite-energy competitor conclusion |

CandidateProperties property SIs:
- 1110 velocity smooth before t=1
- 1111 pressure smooth before t=1
- 1112 K compact
- 1113 velocity support contained in K for 0≤t<1
- 1114 pressure support contained in K for 0≤t<1
- 1115 force globally smooth
- 1116 force compact spacetime support inside t>0
- 1117 zero initial velocity
- 1118 divergence-free
- 1119 exact forced NS residual equation
- 1120 uniformly finite kinetic energy on [0,1)
- 1121 speed unbounded in every left neighborhood of t=1

### Local paper/mechanistic contract

| SI | Meaning |
|---|---|
| 1300 | LocalPaper.Properties bundle |
| 1301 | h |
| 1302 | qstar |
| 1303 | Xa inner edge |
| 1304 | Xext exterior edge |
| 1305 | heat normalization |
| 1306 | potential A |
| 1307 | direct field D |
| 1308 | local velocity u |
| 1309 | local pressure p |
| 1310–1326 | LocalPaper.Properties fields |

Property SIs:
- 1310 0<h<1/100
- 1311 qstar>0
- 1312 0<Xa<Xext
- 1313 A smooth preterminal
- 1314 D smooth preterminal
- 1315 u smooth preterminal
- 1316 p smooth preterminal
- 1317 D is angular-field form
- 1318 u = curl(A)+D for t<1
- 1319 divergence-free for t<1
- 1320 A away-extension
- 1321 D away-extension
- 1322 p away-extension
- 1323 uniform potential jet bounds
- 1324 uniform direct jet bounds
- 1325 uniform pressure jet bounds
- 1326 all-order residual flatness
- 1327 exact heat exterior and zero residual
- 1328 angular ray growth

### Witness/schedule

| SI | Meaning |
|---|---|
| 1400 | ActualCandidateAssembly.Witness |
| 1401 | selected scale schedule a |
| 1402 | potential stage sequence |
| 1403 | direct stage sequence |
| 1404 | pressure stage sequence |
| 1405 | ASum |
| 1406 | BSum |
| 1407 | PSum |
| 1408–1410 | away extensions ea/eb/ep |
| 1411 | forcing produced by witness |
| 1450 | witness CandidateProperties output |
| 1451 | witness force smoothness |
| 1452 | witness CandidateConsequences output |
| 1453 | derivative-H3 norm tends to infinity as t→1- |
| 1454 | all-order componentwise force derivative decay |
| 1455 | forcing derivative matching to boundary limits at t=1 |
| 1420–1427 | SelectedSchedule obligations |

SelectedSchedule:
- 1420 a₀≥1
- 1421 all a_j>0
- 1422 2a_j≤a_{j+1}
- 1423 StrictMono a
- 1424 a_j→∞
- 1425 1/a_j<qbig
- 1426 ThreeSmoothSums
- 1427 VanishingJointJets

### Correction cycle

| SI | Meaning |
|---|---|
| 1500 | generic correction cycle |
| 1501 | CorrectionState.State |
| 1502 | mean triple |
| 1503 | pressure |
| 1504 | oscillation |
| 1505 | oscillatory pressure |
| 1506 | excluded errors |
| 1510 | CorrectionStep.CycleState |
| 1511 | analytic state |
| 1512 | literal cycle coefficients |
| 1513 | axisymmetric alias |
| 1520 | CycleState.step transformation |
| 1530 | stage accuracy σ_j |
| 1531 | σ_0=1/5 |
| 1532 | σ_{j+1}=σ_j+1/10 |
| 1533 | σ strictly monotone |
| 1534 | κ = 1/100000 |
| 1540 | RunInvariant |
| 1541 | analytic invariant |
| 1542 | geometric coherence |
| 1543 | periodicity invariant |
| 1550 | StepResult |
| 1551–1558 | step-output bounds/invariants |
| 1560 | fullResidual |
| 1561 | residual decomposition/reconstruction |
| 1562 | residual jet-rate family |
| 1563 | fixed loss |

StepResult fields:
- 1551 next analytic invariant at σ+1/10
- 1552 temporal increment bound
- 1553 rank increment bound
- 1554 pressure mean-class increment
- 1555 velocity coefficient wave-class bound
- 1556 pressure coefficient wave-class bound
- 1557 post-signed theta residual class
- 1558 post-signed axial residual class

### Coherence/periodicity/pulses/stress

| SI | Meaning |
|---|---|
| 1600 | Coherent bundle |
| 1601 state coherence |
| 1602 block coherence |
| 1603 axis coherence |
| 1604 fixed active labels |
| 1610 | Periodic bundle |
| 1611 velocity coefficient translations |
| 1612 pressure coefficient translations |
| 1613 gaussian coefficient translations |
| 1620 | PulseBounds |
| 1621–1632 | pulse assumptions |
| 1640 | FullTrueCone |
| 1641 | nonzero stress consequence |
| 1642 | weighted stress bounds |
| 1650 | covariance/stress realization role |


PulseBounds property SIs:
- 1621 radius_one_le
- 1622 lower_pos
- 1623 upper_pos
- 1624 decay_pos
- 1625 lower_decay_pos
- 1626 cutoff_continuous
- 1627 component_continuous
- 1628 cutoff_abs_le
- 1629 cutoff_zero outside the stated slot
- 1630 cutoff_one on the inner slot
- 1631 component_lower Gaussian envelope
- 1632 component_upper Gaussian envelope

### Finite-prefix / physical bridge

| SI | Meaning |
|---|---|
| 1700 | finite velocity prefix family |
| 1701 | finite pressure prefix family |
| 1702 | finite residual bound family |
| 1703 | common whole-domain field bound |
| 1704 | increment bound family |
| 1710 | PhysicalFields bundle |
| 1711 velocity smooth germs |
| 1712 pressure differentiability |
| 1713 velocity germ representation |
| 1714 pressure germ representation |
| 1715 exterior equality to final slow base |

### Localization / energy / singularity / global bridge

| SI | Meaning |
|---|---|
| 1800 | selected unit-viscosity compact candidate |
| 1801 | localized velocity |
| 1802 | localized pressure |
| 1803 | positive-time compact force |
| 1804 | initial-rest interval | 
| 1900 | integrated energy/dissipation bundle |
| 1901 | integrable dissipation |
| 1902 | L2 ≤ cumulative force norm |
| 1903 | uniform kinetic-energy bound |
| 1904 | energy+dissipation inequality |
| 1905 | total dissipation bound |
| 2000 | AngularGrowth |
| 2001 | e₀ > 0 |
| 2002 | quantitative normalized angular-growth error bound |
| 2003 | speed/L∞ blowup consequence |
| 2004 | e₀ |
| 2005 | C |
| 2006 | δ |
| 2007 | C > 0 |
| 2008 | 0 < δ ≤ 1 |
| 2010 | derivative H3 blowup consequence |
| 2050 | CandidateConsequences.Consequences |
| 2051 | maximal classical solution with lifespan endpoint 1 |
| 2052 | admissible lifespans = Ioc(0,1) |
| 2053 | derivative-H3 unbounded at one |
| 2054 | force nonzero at some positive pre-blowup time |
| 2055 | all-order future force-jet polynomial decay |
| 2100 | whole-space uniqueness/comparison |
| 2101 | global competitor agrees before t=1 |
| 2102 | blowup contradicts global smooth finite-energy solution |
| 2200 | viscosity rescaling |
| 2201 | residual covariance under rescaling |
| 2202 | candidate properties preserved |
| 2203 | singular time remains 1 |
| 2300 | compression/periodization |
| 2301 | periodic CandidateProperties |
| 2302 | no global smooth periodic solution |
| 2310 | periodic candidate velocity_smooth |
| 2311 | pressure_smooth |
| 2312 | force_smooth |
| 2313 | velocity_periodic |
| 2314 | pressure_periodic |
| 2315 | force_periodic |
| 2316 | support_compact |
| 2317 | support_interior |
| 2318 | velocity_support in K within fundamental cube |
| 2319 | pressure_support in K within fundamental cube |
| 2320 | zero_initial_velocity |
| 2321 | compact future-time force support |
| 2322 | force zero for nonpositive time |
| 2323 | divergence_free |
| 2324 | periodic Navier–Stokes residual equation |
| 2325 | speed_unbounded at one |
| 2400 | comparator option C theorem |
| 2401 | comparator option D theorem |


## Native source-declaration anchors

These SIs are source-declaration referents pinned to OpenAI commit `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`.

| SI | Source declaration |
|---|---|
| 5000 | NavierStokes/R3/ProblemStatement.lean::CandidateProperties |
| 5001 | same::GlobalFiniteEnergySolution |
| 5002 | same::breakdownStatement |
| 5003 | NavierStokes/R3/Theorem.lean::theorem_1_1 |
| 5004 | NavierStokes/LocalPaperTheorem.lean::Properties |
| 5005 | same::properties_of_schedule |
| 5006 | NavierStokes/ActualCandidateAssembly.lean::Witness |
| 5007 | same::selected_witness |
| 5008 | NavierStokes/MixedCandidateWitness.lean::SelectedSchedule |
| 5009 | NavierStokes/CorrectionState.lean::State |
| 5010 | NavierStokes/CorrectionStep.lean::CycleState |
| 5011 | same::CycleState.step |
| 5012 | same::fullResidual |
| 5013 | NavierStokes/ActualIterationLedger.lean::sigma and its formula/succ/strictMono theorems |
| 5014 | NavierStokes/ActualCyclePreservation.lean::RunInvariant |
| 5015 | same::state_runInvariant |
| 5016 | NavierStokes/ActualCycleCoherence.lean::Coherent |
| 5017 | NavierStokes/ActualCyclePeriodicity.lean::Periodic |
| 5018 | NavierStokes/CorrectionAnalyticStep.lean::StepResult |
| 5019 | same::step |
| 5020 | NavierStokes/ActualCycleResidualBounds.lean::fullResidual reconstruction / residual jet-rate bridge |
| 5021 | same::PhysicalFields |
| 5022 | NavierStokes/PulseCovariance.lean::PulseBounds |
| 5023 | NavierStokes/LeadingStressWeights.lean::FullTrueCone / stress_ne_zero / weighted_bounds |
| 5024 | NavierStokes/WholeDomainPhysicalStageTheorem.lean::actual_finite_velocity_bound |
| 5025 | same::actual_finite_pressure_bound |
| 5026 | same::actual_increment_bound |
| 5027 | NavierStokes/R3/ActualCandidate.lean::of_localized_fields |
| 5028 | same::selected_candidate_one_with_initial_rest |
| 5029 | NavierStokes/R3/IntegratedDissipation.lean::candidate_energy_estimates family |
| 5030 | NavierStokes/LocalAngularGrowth.lean::AngularGrowth / selectedRawVelocity_angularGrowth |
| 5031 | NavierStokes/CandidateConsequences.lean::Consequences |
| 5032 | NavierStokes/R3/WholeSpaceUniqueness.lean::candidate_global_agrees_before_one |
| 5033 | NavierStokes/R3/CandidateBreakdown.lean::CandidateProperties.no_global_solution_one |
| 5034 | NavierStokes/R3/ViscosityScaling.lean::rescale_candidate |
| 5035 | same::candidate_at_viscosity and residual scaling bridge |
| 5036 | NavierStokes/PeriodicPaperTheorem.lean::CandidateProperties / of_compact_candidate |
| 5037 | same::periodic_corollary |
| 5038 | NavierStokes/ComparatorSolution.lean::navier_stokes_breakdown_R3 |
| 5039 | same::navier_stokes_breakdown_periodic |

## QU states

| SI | Role |
|---|---|
| 3000 | lower-level proof-detail completeness QU |
| 3001 | internal paper↔Lean alignment QU |
| 3002 | correction-stage quotient/equivalence QU |
| 3003 | physical-realizability interpretation QU |

- **3000** is `INCOMPLETE_SCOPE`: this first pass does not claim the full transitive Lean dependency closure has been semantically rendered.
- **3001** is `INCOMPLETE_SCOPE`: source metadata establishes that the Lean project formalizes the paper and identifies main theorem alignments, but this artifact has not established a complete internal lemma-by-lemma paper↔Lean bijection.
- **3002** is `OPEN` only over the explicitly represented question: which distinctions among stage instances can be quotient-equivalent under a future frozen mechanistic comparison view while preserving downstream obligations. It does not authorize quotienting now.
- **3003** is `INCOMPLETE_SCOPE` and outside theorem authority. The formal PDE theorem does not by itself establish thermodynamic/experimental realizability.

## NEI query records

| SI | Query |
|---|---|
| 4000 | generic correction-step object vs a concrete stage occurrence |
| 4001 | raw/local velocity vs localized whole-space velocity |
| 4002 | compressed whole-space candidate vs periodized candidate |
| 4003 | paper theorem statement vs Lean theorem representation |

All four are intentionally recorded as NEI `INCOMPLETE/UNQUALIFIED` in this pass, not SAME, DISTINCT, or semantic UNKNOWN. Structural bridges/equalities may be exact in scoped contexts, but a qualified natural-identity model sufficient for the broader identity question has not been supplied.

## Important non-identifications

The graph explicitly rejects the following automatic collapses:

- structural correspondence → NEI SAME;
- different SI/source file → NEI DISTINCT;
- residual flatness → zero residual everywhere;
- bounded kinetic energy → bounded pointwise velocity;
- formal PDE solution → physically realizable fluid at arbitrarily small scales;
- whole-space candidate → periodic candidate identity;
- generic correction schema → same occurrence as every stage instance;
- Lean proof object → human explanatory understanding.
