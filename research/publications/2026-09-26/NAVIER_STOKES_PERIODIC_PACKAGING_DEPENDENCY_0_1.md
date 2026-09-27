# A Packaging Dependency in the Periodic Navier–Stokes Blowup Corollary

**Joshua Oshiro**

**Agent-derived research generated using the IsoGraph system designed by Joshua Oshiro**

**License:** CC BY 4.0  
© 2026 Joshua Oshiro.

The original text, analysis, diagrams, and explanatory material in this paper are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. They may be copied, redistributed, adapted, and built upon for any purpose with appropriate attribution. Referenced source code, formal proofs, repository contents, third-party publications, trademarks, and other externally owned materials retain their respective licenses and ownership.

---

## Abstract

A structural analysis of the formal Navier–Stokes forced-blowup development identifies a distinction between a dependency required by the current proof interface and a dependency required by the periodic theorem itself. The whole-space R³ construction carries a uniform finite-energy field as part of its `CandidateProperties` structure. The existing viscosity-scaling and parabolic-compression theorems preserve this entire structure and therefore require the finite-energy field throughout the current transport path.

The periodic candidate and periodic competitor structures, however, contain no finite-energy requirement. Direct inspection of the periodization and support-compression consumers further shows that they do not use the whole-space energy bound. The finite-energy closure is therefore currently load-bearing as a **formal packaging dependency**, but it is not established as an intrinsic semantic dependency of the periodic blowup corollary.

This observation does not remove finite energy from the published proof and does not yet constitute a smaller formal proof. It instead identifies a concrete alternative factorization: a weaker pre-periodic interface containing only the properties actually consumed by viscosity transport, compression, periodization, and periodic uniqueness. Proving this interface sufficient would separate whole-space finite-energy closure from the periodic branch and provide a direct example of why deletion-minimality within a fixed proof vocabulary need not imply minimality across alternative factorizations.

## 1. Introduction

The formalized forced Navier–Stokes blowup construction represented in `openai/NavierStokesAndEuler` establishes related whole-space and periodic conclusions through a shared construction followed by different terminal proof paths [1].

An IsoGraph decomposition of this proof represented its source-relative architecture as a collection of atomic interfaces. In that decomposition, finite-energy closure appears as atom A20, viscosity transport as A21, compression and periodization as A22, whole-space uniqueness obstruction as A23, and periodic uniqueness obstruction as A24 [2].

Within that fixed atomic vocabulary, deletion testing is strong: removing A20 destroys reachability of the represented downstream targets. This establishes irreducibility relative to that factorization. It does not, however, establish that every alternative factorization of the proof must contain the same interface boundary.

The distinction became visible when an AI research agent, operating through the IsoGraph discovery system designed by Joshua Oshiro, analyzed the periodic target independently of the whole-space target using objective-scoped sufficient-support analysis.

The resulting question was narrow:

> Does the periodic corollary mathematically require the finite-energy closure, or does finite energy remain on the path because the current transport functions operate on a structure containing more information than the periodic consumer requires?

Inspection of the pinned formal source supports the second possibility.

## 2. Formal Setting

The whole-space R³ theorem uses:

`NavierStokesR3.ProblemStatement.CandidateProperties`

This structure contains, among other fields:

```text
velocity_smooth
pressure_smooth
support_compact
velocity_support
pressure_support
force_smooth
force_support
zero_initial_velocity
divergence_free
navier_stokes
energy_bounded
speed_unbounded
```

where:

```text
energy_bounded :
    UniformFiniteEnergy (Ico 0 1) u
```

is an explicit part of the whole-space theorem contract [3].

The periodic theorem uses a different structure:

`NavierStokes.PeriodicPaper.CandidateProperties`

containing smoothness, periodicity, support, zero initial data, the forced Navier–Stokes equation, divergence freedom, and speed blowup.

Notably, it contains **no finite-energy field** [4].

The corresponding periodic competitor,

`GlobalSmoothSolution`

also carries no finite-energy hypothesis. This differs from the whole-space competitor `GlobalFiniteEnergySolution`, where uniform finite energy is explicitly part of the competitor class [3].

Thus finite energy is unquestionably intrinsic to the represented whole-space statement, while its status in the periodic branch requires separate analysis.

## 3. The Current Transport Path

The whole-space candidate is transported to arbitrary positive viscosity through the viscosity-scaling machinery.

The current theorem:

`rescale_candidate`

takes a complete whole-space `CandidateProperties` value and returns another complete `CandidateProperties` value.

Consequently it explicitly transports the energy field:

```text
energy_bounded :=
    h.energy_bounded.spatial_smul ...
```

The wrapper:

`candidate_at_viscosity`

inherits this complete package [5].

The same phenomenon appears in parabolic compression. The theorem:

`compressedCandidate`

again accepts and returns the complete whole-space `CandidateProperties` structure and explicitly reconstructs:

```text
energy_bounded :=
    velocity_energy_bounded hc.energy_bounded hl
```

[6].

Under the existing interfaces, therefore, finite-energy closure is genuinely required. One cannot simply delete the energy proof and still construct the values demanded by these theorem signatures.

This is the first important distinction:

> The dependency is real in the current formal factorization.

The question is whether it is intrinsic to the periodic target.

## 4. Consumer Analysis of the Periodic Branch

The periodic conversion theorem is:

`PeriodicPaper.of_compact_candidate`

It currently accepts the full whole-space `CandidateProperties` package.

Inspection of its body shows that it consumes:

```text
velocity_smooth
pressure_smooth
force_smooth
support_compact
velocity_support
pressure_support
zero_initial_velocity
force_support
divergence_free
navier_stokes
speed_unbounded
```

The theorem does not consume:

`energy_bounded`

[4].

The support-compression selector:

`exists_compression_scale`

similarly operates on compactness and support information. Its proof consumes the compact spatial support and force support required to select one compression scale. It does not use the energy field [7].

The final periodic obstruction is also independent of whole-space finite-energy uniqueness. The periodic candidate proves nonexistence of a global smooth periodic competitor through periodic uniqueness/comparison:

`hperiodic.no_global_solution hν`

The periodic competitor class has no energy assumption [4].

These consumer relations yield the central structural observation:

```text
finite-energy closure
    -> required to construct current full R3 package

but

finite-energy closure
    -> no direct consumer in periodic target semantics
```

## 5. The Periodic Corollary Exposes the Distinction Directly

The source of `periodic_corollary` is especially informative.

Its proof obtains:

`⟨u, p, f, K, hc, _, hrest⟩`

from:

`NavierStokesR3.theorem_1_1_with_initial_rest`

[4].

The ignored component represented by `_` is the whole-space no-global-finite-energy-solution conclusion.

The remaining candidate is then:

1. compressed;
2. periodized;
3. converted into periodic candidate properties; and
4. passed to periodic uniqueness.

Thus the whole-space competitor obstruction is explicitly discarded before the periodic proof is completed.

Finite energy remains indirectly present because `hc` is still a full `CandidateProperties` package, and both viscosity transport and compression preserve the full package.

This makes the current proof path structurally larger than the final periodic consumer interface.

## 6. Packaging Dependency Versus Semantic Dependency

The result can be stated carefully in three layers.

### 6.1 Whole-space objective

For the whole-space R³ conclusion, finite-energy closure is load-bearing.

The candidate contract contains `energy_bounded`, and the excluded global competitor is itself a finite-energy competitor.

There is no reduction here.

### 6.2 Existing periodic formal path

For the existing formal implementation of the periodic path, finite energy is also load-bearing.

The current scaling and compression theorems operate on the full R3 structure. To construct their result values, the proof must transport `energy_bounded`.

Thus deleting A20 from the present proof graph would break the formal chain.

### 6.3 Periodic semantic objective

Relative specifically to the periodic theorem contract and its downstream consumers, however, finite energy has no demonstrated consumer.

The periodic candidate does not contain it.

The periodic competitor does not require it.

The periodization theorem does not read it.

The support-compression calculation does not read it.

The periodic uniqueness obstruction does not use it.

Accordingly, the strongest justified present statement is:

> **Finite-energy closure is a formal packaging dependency of the current shared R3-to-periodic path, but it is not established as an intrinsic semantic dependency of the periodic corollary.**

That statement is weaker than claiming that finite energy can already be removed from the proof.

## 7. Proposed Alternative Factorization

The finding suggests a precise formal experiment.

Define a weaker intermediate structure containing only the fields required before periodization, for example:

```text
PrePeriodicCandidate
    velocity_smooth
    pressure_smooth
    support_compact
    velocity_support
    pressure_support
    force_smooth
    force_support
    zero_initial_velocity
    divergence_free
    navier_stokes
    speed_unbounded
```

together with the initial-rest property used by delayed parabolic compression.

Then establish:

```text
selected source construction
    ->
PrePeriodicCandidate at viscosity 1

PrePeriodicCandidate
    ->
viscosity-scaled PrePeriodicCandidate

PrePeriodicCandidate
    ->
compressed PrePeriodicCandidate

compressed PrePeriodicCandidate
    ->
PeriodicPaper.CandidateProperties

PeriodicPaper.CandidateProperties
    ->
periodic no-global-smooth-solution result
```

No whole-space energy field would appear in this projected branch.

This proposed structure is not itself a theorem result. Its purpose is to provide a falsifiable test of the dependency analysis.

If the chain fails because some presently hidden argument genuinely requires finite energy, then A20 remains intrinsically load-bearing for the periodic construction.

If the chain succeeds, the periodic proof admits a distinct factorization in which finite-energy closure belongs only to the whole-space branch.

## 8. Consequences for Proof Minimality

The existing IsoGraph S0.4 analysis established source-relative irreducibility for its 25-atom vocabulary [2].

Within that vocabulary, A20 is required.

There is no conflict between that result and the present finding.

Deletion minimality asks:

```text
given the existing atoms,
can one be removed?
```

The present analysis asks:

```text
can the interfaces themselves be refactored
so that a downstream objective consumes a smaller projection?
```

These are different candidate spaces.

Consequently:

```text
minimal under deletion
    !=
minimum across alternative factorizations
```

The periodic branch provides a concrete case in which this distinction may be mathematically meaningful rather than merely terminological.

The S0.5 generator/closure analysis already protects against the opposite mistake: a proof cannot be made artificially smaller by replacing a generating mechanism with its downstream theorem as an unexplained axiom [8].

The proposed pre-periodic projection does not do that. It preserves the generating construction and removes only a property that presently appears to have no consumer under the narrower periodic objective.

## 9. Limitations

Several limitations are essential.

First, no revised Lean proof has yet been constructed. The result is presently a dependency analysis supported by inspection of exact theorem consumers.

Second, the result does not alter the published forced-blowup theorem or question its correctness.

Third, no claim is made that the complete proof has been globally minimized.

Fourth, the finding applies specifically to the relationship between whole-space finite-energy closure and the periodic branch under the pinned formalization revision.

Finally, fewer proof fields or interfaces are not automatically preferable. This analysis concerns sufficiency and dependency, not proof-engineering cost, readability, maintainability, or verification performance.

## 10. Conclusion

The formal forced Navier–Stokes blowup development currently routes its periodic corollary through a whole-space candidate structure containing a uniform finite-energy bound.

That energy bound is genuinely necessary for the whole-space theorem and genuinely required by the signatures of the current shared transport and compression functions.

It is not, however, consumed by the periodic candidate contract, periodic competitor contract, support-compression selector, periodization conversion, or periodic uniqueness obstruction.

This identifies a previously hidden boundary between **formal package dependence** and **objective-level semantic dependence**.

The immediate mathematical question is therefore well defined: can a weaker pre-periodic candidate interface be transported and compressed directly while preserving exactly the properties needed for periodization and periodic blowup?

A positive construction would show that finite-energy closure belongs to the whole-space branch rather than the irreducible common core of both final theorems. A negative construction would identify the presently hidden dependency that makes energy genuinely necessary.

Either outcome would sharpen the structural understanding of the proof.

## Provenance and Contribution Note

Joshua Oshiro is the author of this paper and the designer of the IsoGraph system and discovery methodology used in this research.

The specific structural finding analyzed here was generated by an **AI research agent operating through Oshiro's IsoGraph system**, during an automated structural-discovery pass over the rendered proof and its formal-source dependencies. The agent-generated finding was then checked against the pinned Lean source and exact theorem consumers before being retained as a research result.

This distinction is recorded to separate authorship and system/method design from the agent execution that produced the specific discovery.

## License

© 2026 Joshua Oshiro.

This work is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

You are free to share, copy, redistribute, remix, transform, and build upon the original material for commercial or noncommercial purposes, provided appropriate credit is given to Joshua Oshiro, the license is identified, and changes are indicated.

This license applies to the original text, analysis, diagrams, and explanatory material in this paper. Referenced source code, formal proofs, repository contents, third-party publications, trademarks, and other externally owned materials retain their original licenses and ownership.

## References

[1] OpenAI, **NavierStokesAndEuler**, formal source revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, repository `openai/NavierStokesAndEuler`.

[2] IsoGraph, [S0.4 Atomic Minimality Audit](../../navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_AUDIT.md), Git blob `e004980610a5916ff94dbe7a3173d6840804f5d1`.

[3] OpenAI, `NavierStokes/R3/ProblemStatement.lean`, pinned revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, Git blob `5615bd49a5d2077a63361df1c01369913933f97d`.

[4] OpenAI, `NavierStokes/PeriodicPaperTheorem.lean`, pinned revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, Git blob `e7cdc29594f635a0eebf6967352a148be1b818e9`.

[5] OpenAI, `NavierStokes/R3/ViscosityScaling.lean`, pinned revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, Git blob `ac0343b0c84bffb0c6fd2d2793cb60c5564ec742`.

[6] OpenAI, `NavierStokes/R3/ParabolicScaling.lean`, pinned revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, Git blob `5dd1d3756b0e43c56a063ae3dce0ee27349da1c3`.

[7] OpenAI, `NavierStokes/PeriodicPaperScalingSupport.lean`, pinned revision `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`, Git blob `e46b1b7e8c4dfc22ee18789ab23e3ef50437795f`.

[8] IsoGraph, [S0.5 Generator/Closure Normal Form](../../navier-stokes-proof/S0_5_GENERATOR_CLOSURE_NORMAL_FORM.md), Git blob `489f4744ce0383e309b8f5ca2c9b7e411fa81ad7`.

[9] IsoGraph, [DP 0.8 Navier–Stokes Discovery Run](../../dp08-discovery/2026-09-26/NAVIER_STOKES_DP08_RUN_0_1.md), Git blob `6736be1c921da0f04e628ac028d4ff7e420a3a92`.

[10] IsoGraph, [Navier Periodic A20/A21 Lead Investigation](../../dp08-discovery/2026-09-26/NAVIER_PERIODIC_A20_A21_LEAD_INVESTIGATION_0_1.md), Git blob `7c2bd4c03bd3d547de6c1e7c80576662893fd369`.

---

### Citation

Oshiro, Joshua. *A Packaging Dependency in the Periodic Navier–Stokes Blowup Corollary*. IsoGraph research publication, 2026. Agent-derived research generated using the IsoGraph system designed by Joshua Oshiro. CC BY 4.0.
