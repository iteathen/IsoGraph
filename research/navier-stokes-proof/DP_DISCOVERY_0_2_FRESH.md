# Fresh Discovery Protocol run 0.2 — Navier–Stokes source-first restart

Status: fresh DP research ledger.

Discovery authority: qualified cumulative Discovery Protocols 0.1–0.4.

Discovery-visible source: the enriched source-faithful IsoGraph rendering pinned in DP_DISCOVERY_0_2_FRESH_INPUT_FREEZE.md.

Existing DP/RF research outputs were excluded from candidate generation and are not referenced in this file. Comparison with prior runs must happen only after this file is frozen.

## Objective

Restart structural discovery from the beginning and ask:

What mechanisms become visible now that the source rendering includes the theorem contract, local contract, correction state, residual decomposition, protected blowup channel, residual-to-force bridge, and energy closure?

The pass used source-boundary and interface inspection, dependency topology, repeated motifs, alternative factorization, residual-first decomposition, constraint topology, recurrence/order structure, transformation invariants, proof/witness topology, and one label-blind incidence/signature pass over the native graph.

# F01 — Geometric coloring locally linearizes the nonlinear residual

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-01, DP-02, DP-06, DP-11, DP-14.

The source proves that closed support separation across distinct labels makes every cross-label transport term vanish on the valid chart.

Consequently, for the finite labeled wave sum, the nonlinear residual of the sum is exactly the sum of same-label nonlinear residuals under the represented support/label conditions.

This is not an asymptotic approximation. The source states that cross-label cancellation comes from the geometric support predicate rather than an assumed PDE cancellation.

Structural interpretation:

    nonlinear coupled wave family
        + colored/disjoint local supports
    -> cross-label products vanish exactly
    -> nonlinear residual decomposes labelwise

The construction therefore obtains a form of geometric orthogonalization of the nonlinearity.

Falsifier: a valid pair of distinct active labels with overlapping support producing a nonzero cross transport term under the same comparison scope.

# F02 — Incompressibility is enforced by representation, not repeatedly repaired

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-02, DP-03, DP-11, DP-14, DP-22.

Several independent construction layers choose representations whose divergence constraint is automatic or structurally discharged:

- the slow-base velocity is represented as a spatial curl;
- oscillatory waves are realized through curl constructions and satisfy exact divergence-free theorems;
- harmonic blocks carry ModeSolenoidal structure;
- the direct angular field has a dedicated divergence-free realization from axisymmetry;
- the final local field is represented as u = curl(A) + D with both pieces supplying the required divergence property;
- localization cuts the potential before applying curl, preserving divergence freedom structurally.

Structural interpretation:

    choose solenoidal representation
    -> divergence-free falls out
    -> correction budget can target residual/stress/moment defects instead

Residual: the direct angular term is not literally the same representation as the curl term. The common core is representation chosen so divergence freedom follows.

# F03 — The full residual has an exact three-channel normal form

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-07, DP-08, DP-10, DP-13, DP-24.

On the valid chart the source reconstructs the full residual as:

    full residual
      = sum of label-local oscillatory residual blocks
      + mean / axisymmetric residual
      + explicitly retained excluded errors

The independent axisymmetric alias is retained rather than silently folded away.

The stored error term also has an exact update law across a cycle: next total errors equal old total errors plus particular-Gaussian, signed-Gaussian, and updated alias contributions.

Structural interpretation:

    oscillatory label-local defect
    mean/axisymmetric defect
    retained/excluded error ledger

The factorization is reconstructive: the full physical residual can be recovered exactly.

Falsifier: a represented residual contribution used downstream that cannot be placed in one of these channels without duplication or loss.

# F04 — One physical cycle is a four-part repair operator over the residual normal form

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-04, DP-07, DP-08, DP-10, DP-21, DP-24.

The physical velocity increment of one cycle is exactly the sum of four contributions in source construction order:

    particular wave
    + signed wave
    + temporal mean increment
    + rank increment

The source roles support this mapping:

1. particular wave — sourced from the current nonzero harmonic residual;
2. signed wave — averaged cross covariance realizes the requested stress after the particular stage;
3. temporal mean increment — adjusts the mean/temporal residual structure;
4. rank increment — solves the finite-dimensional debt/moment obstruction, with linear rows equal to negative debt.

The resulting state returns to the cycle invariant at increased accuracy.

Structural interpretation:

    factor defect
    -> repair oscillatory source
    -> repair covariance/mean stress
    -> repair mean evolution
    -> repair moment debt
    -> reconstruct state
    -> repeat at higher accuracy

Residual: this pass does not claim a one-to-one bijection between the three residual channels of F03 and the four correction contributions. The signed, temporal, and rank operations interact through covariance and mean equations.

# F05 — FiveRows is a recurring finite-dimensional obstruction interface

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-06, DP-10, DP-11, DP-13, DP-24, DP-31.

The five-row system first appears as a compactly supported moment repair for the background patch, but it is not confined there.

The same FiveRows structure reappears in correction-state rank data, defect increment bounds, local rank defect cancellation, chart/coherence transport, and scaled physical rank updates.

In the cycle, the rank increment satisfies a source-exact relation in which its linear rows equal the negative current debt.

Structural interpretation:

    distributed field defect
    -> extract five moment/debt coordinates
    -> solve localized five-row repair
    -> preserve masses/support
    -> continue infinite-dimensional iteration

Falsifier: a load-bearing rank/moment correction whose obstruction is not expressible through the represented five-row/debt interface.

# F06 — Support coloring and residual normal form form a two-level nonlinear factorization

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-07, DP-08, DP-13, DP-22.

Combining F01 and F03 gives:

    full nonlinear field
      -> geometric support coloring
    independent same-label nonlinear residuals
      -> angular mean / nonconstant split
    oscillatory channels + mean channel
      -> explicit excluded-error restoration
    complete residual normal form

The first level removes cross-label nonlinear coupling exactly. The second separates frequency/mean structure. The third restores exceptional terms explicitly.

Falsifier: a load-bearing cross-label interaction surviving the support-coloring hypotheses, or a grouped residual term that cannot be reconstructed from the second-level decomposition.

# F07 — The correction recurrence is a synchronized multi-view state, not a single field update

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-01, DP-04, DP-17, DP-22, DP-23.

CycleState evolves three represented objects together:

- analytic/physical state;
- literal harmonic coefficient data;
- independent axisymmetric alias.

The continuation/coherence machinery carries primitive fields, periodic primitive data, harmonic primitives for each label, axis continuation, and an explicit CycleRepresentation linking coefficients, state, and alias.

Every actual cycle has a representation theorem, and each next state is reconstructed under the common gauge.

Structural interpretation:

    semantic/physical state
    coefficient representation
    alias representation
        -> coherence + reconstruction invariant
    next synchronized state

The multiple representations are load-bearing because different proof consumers operate on different views.

Important boundary: this is not an NEI identity claim.

# F08 — All four literal correction stages share one continuation frame

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-03, DP-11, DP-14, DP-22, DP-26.

The source explicitly states that the four literal stages share one gauge, one endpoint window, one annular patch/coordinate system, and one rank-kernel parameterization.

The continuation invariant is attached to the represented cycle state and survives reconstruction.

Structural interpretation:

    shared geometry/gauge/window
    -> particular
    -> signed
    -> temporal
    -> rank
    -> reconstructed next state

The same structural frame is a plausible reason stage composition preserves support, periodicity, and endpoint compatibility.

Falsifier: a stage requiring a semantically incompatible gauge/window or whose output cannot be reconstructed into the common state interface.

# F09 — Auxiliary torus averaging is an active projection operator

Lifecycle: CANDIDATE

Protocols: DP-03, DP-07, DP-10, DP-14, DP-23.

The source repeatedly uses auxiliary torus structure to define covariance and mean quantities, average cross tensors, realize requested stress, define radial moments of the mean, and connect full lifted state residuals to slow debt derivatives.

The signed-wave source gives exact identities in which torus or double averages of cross covariance equal the requested stress.

Candidate interpretation:

    physical slow defect
    -> lift into auxiliary periodic variables
    -> build oscillatory fields with extra degrees of freedom
    -> nonlinear cross interaction
    -> average/project
    -> recover desired slow stress/mean correction

Why not yet SUPPORTED: the current pass has not shown that every use of the auxiliary torus factors through one common operator interface.

# F10 — Constraint strength is staged: exact identities where cheap, asymptotic classes where necessary

Lifecycle: CANDIDATE

Protocols: DP-02, DP-08, DP-25, DP-26, DP-35.

The source uses different strengths of correctness in different roles:

- exact cross-label zero from support separation;
- exact divergence freedom from representation;
- exact heat-exterior residual zero;
- exact equality to the singular base on the protected ray;
- exact five-row moment equations;
- class/bound statements for correction remainders;
- arbitrary-order flatness rather than exact zero near the singular endpoint.

Candidate interpretation:

    make invariants/interfaces exact
    allow internal residuals to be merely higher order
    iterate until higher order becomes flat to all orders

Falsifier: a central correctness obligation whose exactness is required globally throughout the correction region.

# F11 — Accuracy and extraction are distinct nested refinement mechanisms

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-21, DP-27, DP-29, DP-30.

The source contains two monotone sequences with different roles.

Inner refinement:
sigma_J = 1/5 + J/10 is deterministic and measures analytic/residual accuracy.

Outer extraction:
the selected natural-number schedule a_j is existentially chosen, grows rapidly, controls shrinking cutoffs and diagonal sums, and produces smooth sums and all endpoint residual jets.

Supported relation:

    stage iteration creates an arbitrarily accurate family
    -> diagonal extraction chooses a sparse enough subsequence
    -> one limit satisfies all countably many final obligations

Structural rejection: direct sigma_j <-> a_j role identification fails due to different domains, recurrence laws, and consumers.

# F12 — The proof has a contract-closure point after which internal construction state disappears

Lifecycle: SUPPORTED_CANDIDATE

Protocols: DP-03, DP-04, DP-22, DP-24, DP-36.

Once the candidate/local contract is established, downstream layers consume smooth fields, support, exact PDE, divergence freedom, blowup, energy, and initial-rest/periodicity side conditions.

They do not reopen harmonic labels, covariance blocks, cycle coefficients, or the four-stage internal state.

Downstream operations are residual-to-force completion, compact localization, energy closure, viscosity scaling, compression/periodization, and uniqueness/comparator discharge.

Structural interpretation:

    internal correction machine
    -> candidate contract
    -> theorem transport / obstruction layer

This is a strong candidate for the correct compression boundary.

# F13 — Inner singularity, active correction zone, and exterior solution suggest a three-role geometry

Lifecycle: CANDIDATE

Protocols: DP-13, DP-17, DP-26, DP-32, DP-33.

Source-exact pieces:
- protected inner blowup ray on which corrected/localized velocity equals the base;
- active annular correction region;
- heat exterior with exact residual zero.

Candidate interpretation:

    inner channel  -> preserve singular target
    annular region -> absorb/correct PDE defect
    outer region   -> provide exact global closure

Why not yet SUPPORTED: the source rendering does not establish that these three sets form a complete partition of every transition/collar region.

# F14 — Pointwise blowup and global finite energy are generated by largely separate mechanisms

Lifecycle: CANDIDATE

Protocols: DP-08, DP-11, DP-22, DP-31.

Blowup is inherited from the exact protected base channel and angular-growth asymptotic.

Finite energy is obtained later from compact support, smooth compact forcing, exact PDE, energy balance, and Gronwall closure.

Candidate interpretation: the proof structurally separates a local/supremum singular observable from a global/integrated control channel.

Why not yet SUPPORTED: the fresh pass has not established that the parameter choices needed for the two mechanisms are independent enough for a stronger decoupling claim.

# Fresh structural synthesis S0.2

Lifecycle: CANDIDATE

The strongest source-first synthesis from this fresh pass is:

Use geometry and representation to remove expensive constraints before iteration: colored supports eliminate unwanted nonlinear cross-coupling and solenoidal representations make incompressibility automatic. Reconstruct the remaining PDE defect in an exact residual normal form. Apply a four-part correction operator inside one common continuation frame, with a recurring five-dimensional moment-repair interface handling the finite obstruction. Iterate to arbitrarily high residual order, then use diagonal extraction to obtain all-order flatness. After the candidate contract closes, discard the internal correction representation and finish through force extension, localization, energy, transport, and uniqueness.

This synthesis is deliberately not marked SUPPORTED until its claimed compression is tested against every source-exact contract and the detailed background-stress/wave construction.

# Structural rejections found fresh

## R01 — correction accuracy and diagonal schedule are not the same scale

Disposition: REJECTED.

Breaker: domain, recurrence, and consumer mismatch.

## R02 — arbitrary-order flat residual and exact-zero exterior are not identical mechanisms

Disposition: REJECTED.

Breaker: exact equality versus asymptotic flatness and different domain attachment.

## R03 — whole-space and periodic final contracts are not globally isomorphic under a full-obligation view

Disposition: REJECTED.

Breaker: finite-energy competitor obligations versus periodicity and fundamental-domain obligations.

# QU / NEI observations from the fresh pass

QU 3002: the source fixes common step schema, common continuation frame, common residual normal form, common invariant family, and common accuracy increment. Open structure remains in exact stage-specific wave/coefficient/parameter realization and in what quotient view, if any, preserves all downstream obligations. No qualified QU refinement relation is asserted.

NEI: no fresh candidate requires SAME or DISTINCT. Synchronized state/coefficient/alias views are not asserted naturally identical; repeated FiveRows occurrences are role-correspondent rather than automatically the same occurrence; four stage instances remain occurrences of one recurrence schema rather than NEI SAME.

# Fresh next tests

1. Test S0.2 for proof-outline/interface completeness without consulting prior reduced-formula work.
2. Expand F03/F04 into an explicit channel-to-stage dependency graph and determine whether one correction contribution can be removed or merged.
3. Test whether F05 FiveRows is the complete finite-dimensional obstruction or one of several independent obstruction interfaces.
4. Formalize the geometry of F13 enough to decide whether the three-region decomposition is complete.
5. Test F09 auxiliary lift/project as one common structural operator rather than several similar constructions.
6. Run a deletion test on F01/F02: determine exactly which later obligations fail if support coloring or solenoidal representation is replaced by generic estimates.
