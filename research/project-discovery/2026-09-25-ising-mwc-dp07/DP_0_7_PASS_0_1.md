# DP 0.7 pass — Ising / MWC independent renderings 0.1

**Date:** 2026-09-25  
**Status:** COMPLETE first exploratory pass  
**Inputs frozen before comparison:** yes  
**DP authority under test:** unqualified DP 0.7 candidate  
**Core authority effect:** none

## Observation-first result

A substantial cross-domain common core emerged without using the domain names as evidence.

The strongest correspondence is not:

```text
magnetism == allostery
```

and not:

```text
Ising == MWC
```

It is the lower structural shape:

```text
finite repeated binary local variables
    ->
state-dependent scalar score
    ->
exponential statistical weight
    ->
partition normalization
    ->
weighted observable
```

plus an exact role correspondence in which an external scalar biases an aggregate of the local binary variables.

The strongest residual is equally clear:

```text
Ising:
    direct nearest-neighbor local/local coupling on a cycle

MWC:
    one global latent conformation coupled into every local binding site
```

That residual blocks whole-structure isomorphism.

---

# Cumulative DP-01..DP-45 pass

| DP | Result |
|---|---|
| **DP-01 Cross-boundary relational structure** | Both cross from local binary-state structure into a global state score, exponential weight, partition, normalized distribution, then observable. **COMMON CORE FOUND.** |
| **DP-02 Constraint structure** | Ising requires neighbor-pair energy incidence and periodic cycle. MWC requires one global conformation governing every site contribution. **LOAD-BEARING DIFFERENCE.** |
| **DP-03 Interface / port correspondence** | External scalar controls enter each model's state score. Candidate role map: field `h` ↔ ligand chemical potential/control `mu`, after binary recoding. |
| **DP-04 Dependency topology** | Ensemble-normalization topology matches partially; interaction-factor topology does not. |
| **DP-05 QU / open-region topology** | No QU is needed merely because N/n is left symbolic; those are model parameters. No unresolved load-bearing realization family was introduced in this first pass. |
| **DP-06 Repeated relational motifs** | Repeated indexed binary local-state motif occurs in both. Repeated energy-contribution motif occurs in both, with different factor arity/topology. |
| **DP-07 Alternative factorization** | A neutral factor-graph/statistical-score view exposes the common core more faithfully than domain labels. **HIGH VALUE.** |
| **DP-08 Residual after partial match** | Residual = cycle-local pair coupling versus global-conformation-mediated site coupling. Preserved. |
| **DP-09 Symmetry / automorphism** | Ising ring has translation/cycle symmetries; identical-site MWC admits broad site-permutation symmetry under the frozen model. Both have symmetry, but the groups/actions are not assumed identical. |
| **DP-10 Role-equivalent elements under different labels** | Local spin ↔ local occupancy under exact binary affine bijection. Field ↔ ligand chemical potential as external linear bias role. |
| **DP-11 Invariants across admissible variation** | State-score → exponential weight → partition → normalization remains invariant under local binary recoding. |
| **DP-12 Known/unknown interface** | No hidden unknown was needed to force the match. Interaction residual remains known rather than collapsed. |
| **DP-13 Multi-scale common substructure** | Commonality appears at local binary-domain scale and at global statistical-ensemble scale, while the intermediate coupling scale differs. **IMPORTANT.** |
| **DP-14 Transformation-invariant discovery** | Affine recoding `{-1,+1} ↔ {0,1}` preserves binary-state structure and converts the field into a linear count bias plus constant. |
| **DP-15 Information-flow structure** | External control → state score → relative weights → normalized distribution → observable is common. |
| **DP-16 Causal / temporal structure** | These frozen models are equilibrium descriptions. No causal or temporal equivalence is asserted. |
| **DP-17 Containment / ownership** | Both global states contain repeated local binary degrees of freedom; MWC additionally owns one global conformation degree of freedom. |
| **DP-18 Cardinality / multiplicity** | Both repeat binary locals, but complete state-space cardinality differs: Ising has local assignments only; MWC adds a global binary conformation. Cardinality 2 at the local domain is not sufficient evidence by itself. |
| **DP-19 Dual / reversed structures** | Binary complement operations exist, but global flip/swap symmetry is parameter-scoped and not promoted to an unconditional common symmetry. |
| **DP-20 Complement / exclusion** | Each local variable has two mutually exclusive values. This is a small common substructure, not a whole-system match. |
| **DP-21 Fixed-point / recurrence** | No material recurrence is required by either frozen equilibrium representation. **NEGATIVE CONTROL:** DP 0.7 does not manufacture a recurrence view merely because repeated sites exist. |
| **DP-22 Compositional structure** | Global scores compose from repeated contribution structures; aggregation layer is common, factor topology is residual. |
| **DP-23 Reconstruction structure** | Given source-specific score construction, both reconstruct weights, partition, probabilities and observables. The common derived view is reconstructable back to each source with residuals retained. |
| **DP-24 Proof / witness topology** | Correspondence witnesses are algebraic/structural: binary affine map, incidence mapping, score/weight/partition chain. |
| **DP-25 Refinement relation** | The common core is a projection/refinement view of both models, not a replacement for either full rendering. |
| **DP-26 Boundary-movement invariance** | MWC may be refactored by eliminating/marginalizing the global conformation only if the resulting effective occupancy interaction is retained exactly; such boundary movement is not free. |
| **DP-27 Parameter-role correspondence** | Strong result: `beta` has the same inverse-temperature role; `h` and `mu` both bias an aggregate local binary statistic, up to affine recoding/scale/constants. `J` has no direct MWC counterpart in the frozen model. |
| **DP-28 Dimensional / unit structure** | Both exponential weights require dimensionless score. `beta` converts energy-like quantities to dimensionless form. Field and chemical potential are energy-like control inputs in their respective score terms. |
| **DP-29 Ordering / partial order** | No temporal ordering correspondence. Algebraic dependency order score → weight → partition/probability is common. |
| **DP-30 Reachability / connectivity** | Factor connectivity differs decisively: cycle/local-pair versus global-star/latent mediator. |
| **DP-31 Conservation / balance** | No new common conservation law established. |
| **DP-32 Threshold / phase-boundary** | Do **not** equate MWC response steepness/transition-point language with an Ising thermodynamic critical point. The finite 1D candidate does not justify that mapping. **FALSE-MATCH BARRIER.** |
| **DP-33 Degenerate / special cases** | Removing Ising pair coupling (`J=0`) collapses to independent field-biased binary sites. Removing conformation-dependent affinity in MWC separates ligand occupancy from conformation and removes the allosteric coupling channel. These are useful controls, not proof of general equivalence. |
| **DP-34 Failure-mode correspondence** | Primary failure mode would be abstraction overreach: calling both “cooperative binary systems” and ignoring how dependence is generated. |
| **DP-35 Exception structure** | MWC's one-global-conformation constraint has no Ising-ring match; Ising periodic neighbor closure has no MWC match. |
| **DP-36 Representation redundancy** | Transfer-matrix and closed-form MWC expressions are derived compact surfaces. They are not needed as primitive matching evidence. |
| **DP-37 Equivalent constraint closure** | Exact binary affine recoding is established. No exact closure equating the different interaction graphs is found. |
| **DP-38 Semantic-identity candidate** | No NEI SAME/DISTINCT claim is required. These are different scientific models with a structural common core. |
| **DP-39 QUI extension** | No new QUI required in this bounded comparison. |
| **DP-40 Global whole-structure isomorphism** | **FALSIFIED.** Load-bearing interaction topology and global-conformation structure remain unmatched. |
| **DP-41 Literal-value coincidence** | Both local domains have cardinality 2. Low-value coincidence; accepted only with the stronger structural witness. |
| **DP-42 Lexical/name similarity** | Not used. |
| **DP-43 Shared ontology/class-label hints** | Not used as evidence. |
| **DP-44 Serialization/layout similarity** | Independent serializations; not used. |
| **DP-45 Raw identifier correspondence** | Independent SI/label namespaces; no raw-ID evidence. |

---

# DP 0.7-specific derived-view checks

## Primitive-first

PASS.

The common view was constructed only after independent source/native freezes.

## Derived view without ontology promotion

PASS.

The useful high-level description is:

> finite binary statistical ensemble with externally biased local variables and normalized exponential state weights.

This is a derived view, not a new Core primitive or class authority.

## Multiple views retained

PASS.

The pair also admits a neutral factor-graph view:

```text
Ising:
    local variables linked by pair factors on a cycle

MWC:
    local variables linked through a global latent variable
```

The factor-graph view and statistical-ensemble view coexist.

## Taxonomy lock-in avoided

PASS.

The comparison does not require deciding that both systems “are Ising models,” “are MWC models,” or belong to one exclusive conceptual class.

## Primitive residual preserved

PASS.

The interaction-graph mismatch is retained rather than normalized away.

## Higher-level label bias avoided

PASS by campaign design.

---

# Main discoveries

## D1 — exact binary local-state correspondence

```text
s in {-1,+1}
x in {0,1}

x = (s+1)/2
s = 2x-1
```

This is an exact local-domain isomorphism.

## D2 — exact statistical-ensemble common core

Both models contain the chain:

```text
global state
    -> scalar statistical score
    -> exp(score)
    -> finite partition sum
    -> normalized probability
    -> weighted observable
```

The source-specific construction of the score remains outside the common core.

## D3 — external-control role correspondence

Both contain:

```text
external scalar control
    -> aggregate local binary statistic
    -> state score
```

For Ising, field `h` couples to `sum s_i`.

For MWC, ligand chemical potential/control couples to `n_bound = sum x_i`.

After the exact binary recoding, these occupy the same algebraic role up to scaling/additive constants.

This is a role correspondence, not physical identity.

## D4 — dependence mechanism splits

The two models generate collective statistical dependence differently:

```text
Ising:
    direct local/local pair coupling

MWC:
    shared global conformation changes every site's binding energetics
```

This is the dominant residual.

## D5 — common effect does not imply common mechanism

Both can exhibit sharp/cooperative-looking collective response, but DP does not use that phenomenology as evidence of structural identity.

The primitive render instead distinguishes the mechanism.

---

# Leads for a second pass

### L1 — exact elimination of MWC global conformation

Derive the occupancy-only effective statistical score obtained by summing over the global conformation.

Question:

> what many-site effective interaction is induced among occupancy variables after the latent conformation is removed?

This should be handled as an exact factorization/implicit-assertion exercise, not assumed.

### L2 — compare induced MWC occupancy interaction to Ising pair interaction

Only after L1 is exact, compare the induced interaction order/topology with the Ising nearest-neighbor pair term.

Expected outcomes remain open:

```text
exact pairwise correspondence
higher-order/global interaction
scoped approximation
no useful correspondence
```

### L3 — symmetry comparison

Compare the automorphism groups/actions of the Ising cycle and identical-site MWC site set.

Do not infer equivalence from “both symmetric.”

---

# Disposition

```text
DP 0.7 primitive-first usefulness:       SUPPORTED
exact partial common core:               FOUND
exact local binary correspondence:       FOUND
exact external-bias role correspondence: FOUND
whole-structure isomorphism:             FALSIFIED
load-bearing residual preserved:         YES
label-driven match:                      NO
new Core primitive required:             NO
qualification of DP 0.7:                 NOT ESTABLISHED
```
