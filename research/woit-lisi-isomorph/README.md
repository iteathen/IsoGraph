# Woit–Lisi Structural Isomorph Search

**Status:** ACTIVE RESEARCH — INITIALIZED, PRE-COMPARISON  
**Started:** 2026-10-03  
**Branch:** `research/woit-lisi-isomorph-20261003`  
**Base revision:** `f3217af9a4fd50e838db39e249e93f39380e0e4a`  
**Semantic stack:** current qualified IsoGraph family routed by `qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md` and `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_21_2026-09-29.md`

## Research question

After independently rendering Peter Woit's twistor/unification program and A. Garrett Lisi's exceptional/Clifford unification program to source-faithful primitive IsoGraph structure, what is their **maximal common structural quotient**?

The second target question is whether any surviving common quotient:

1. depends essentially on (E_8);
2. depends only on a lower Clifford/spinorial substrate;
3. survives differences in physical interpretation, real form, chirality, conjugation, locality, and gauge role; or
4. disappears once source-faithful distinctions are preserved.

No positive correspondence is assumed.

## Anti-bias architecture

The campaign has three logically separated surfaces.

### Track W — Woit only
Render only frozen Woit sources. No Lisi terminology, proposed bridge, (E_8) target mapping, or anticipated correspondence may be used to choose primitives, factorization, or closure.

### Track L — Lisi only
Render only frozen Lisi sources. No Woit terminology, twistor-target mapping, or anticipated correspondence may be used to choose primitives, factorization, or closure.

### Hypothesis quarantine
The motivating bridge supplied at project initiation is preserved separately in `HYPOTHESIS_QUARANTINE_0_1.md`. It is **test material, not source authority**. It must not be fed into either source rendering before those renderings are sealed.

Only after both tracks are independently source-censused, primitive-closed to the declared scope, recursively IA-closed under the pinned inference profile, and separately reviewed may DP/NEI/DTS cross-comparison begin.

## Formulation-family requirement

Neither author is treated as having one canonical graph.

The same underlying idea may appear in several source-faithful formulations: different real forms, representation languages, coordinate choices, factorizations, symmetry-breaking presentations, revisions, or levels of abstraction. A formulation that is awkward for direct cross-domain comparison may be internally equivalent, under a pinned scope, to another formulation that exposes the bridge cleanly.

Therefore each track must construct an **intra-author formulation graph** before cross-track comparison:

```text
source formulation
    -> primitive rendering
    -> relation to other formulations of the same author's idea
    -> exact/scoped transform witness
    -> preserved residuals
```

No formulation is declared globally "best." Bridge suitability is objective-relative and is evaluated only after source-faithful closure. The search may legitimately use chains such as:

```text
Woit formulation A
    --intra-W transform-->
Woit formulation B
    <--cross-domain common quotient-->
Lisi formulation C
    <--intra-L transform--
Lisi formulation D
```

A cross-domain bridge through one representative does not imply that all formulations in either family are interchangeable, nor that the two physical theories are equivalent.

See `FORMULATION_FAMILY_PROTOCOL_0_1.md`.

## Current state

Campaign initialization is complete.

- dedicated first-level research directory created;
- initial public source corpus frozen in `SOURCE_CORPUS_FREEZE_0_1.md`;
- cross-domain bridge claims quarantined rather than admitted;
- blind comparison protocol preregistered in `EXPERIMENT_001_BLIND_PROTOCOL.md`;
- working Source Semantic Census shells opened for both tracks;
- no structural match has yet been admitted;
- no theorem, physical equivalence, unification claim, or (E_8) viability claim is made.

Strict Core-0.21 primitive-closure status is **NOT YET CLAIMED**. The working censuses are intentionally incomplete until the selected sources have been fully traversed.

## Initial source observations

The frozen corpus begins with primary sources whose own descriptions already justify a structural comparison without assuming its result.

Woit's `Euclidean Twistor Unification` starts from Euclidean (Spin(4) = SU(2) × SU(2)), uses one chiral factor in gravity and another toward Standard Model gauge structure, introduces an imaginary-time-direction degree of freedom in reconstructing Lorentz signature, and moves the theory to projective twistor space. His later `Spacetime is Right-handed` makes chirally asymmetric spinor geometry and the Euclidean/Minkowski relation more explicit. His July 2026 project page explicitly marks the newest Wick-rotation interpretation as work in progress.

Lisi's original (E_8) proposal treats Standard Model and gravitational fields within an (E_8)-valued connection. The 2010 explicit embedding uses a (Spin(11,3)) action on a Majorana-Weyl spinor inside the quaternionic real form of (E_8). His 2024 CPT/triality paper and September 2026 division-algebra/triality paper provide later primary material on discrete symmetries, Clifford/spinor structure, triality, and exceptional unification.

Those statements define reasons to compare. They do not establish an isomorphism.

## Evidence and authority boundary

This directory is research evidence, not IsoGraph semantic authority and not authority for either physicist's program. Every source-side assertion must trace to its frozen source. Every discovered correspondence must preserve residual differences and QU-bearing unknowns. Familiar algebraic names are not primitive leaves when their semantics are load-bearing.

A known representation-theoretic criticism of (E_8) unification, Distler–Garibaldi (2009), is retained as an obstruction/audit source. It is not treated as authority for what Lisi says; it is a separately rendered challenge to claims that eventually depend on (E_8).

## Required execution order

`source freeze -> complete SSC W/L -> primitive closure W/L -> recursive IA W/L -> intra-author formulation-family graph -> independent review -> blind family-to-family comparison -> NEI/DTS/DP common-core search -> falsifiers -> obstruction audit -> reassessment`

Any change to source scope, primitive kernel, governing authority, QU state, or IA inference profile reopens the affected closure under Core 0.21.

## Provenance

**Research direction:** Joshua Oshiro — HUMAN_ORIGINATED_DIRECTION. On 2026-10-03 Joshua identified Woit's and Lisi's programs as candidates for an IsoGraph isomorph search and directed that the work be started in its own research directory.

**Campaign formalization:** AI assistant — AGENT_ASSISTED_FORMALIZATION, under Joshua Oshiro's direction.

**Formulation-family search principle:** Joshua Oshiro — HUMAN_ORIGINATED_IDEA. On 2026-10-03 Joshua directed that the campaign identify multiple expressions of the same idea within each author's work and determine which source-faithful representatives provide the strongest cross-domain bridge, rather than assuming one formulation per author. The agent formalized this into the formulation-family protocol.

**Earliest evidence currently located:** preserved dated project conversation on 2026-10-03. This README is the first public repository record created for the campaign; it does not backdate that public record.

External theories, papers, mathematical constructions, and criticisms remain EXTERNAL_ANTECEDENT material and must be cited as such in any later publication.

## Files

- `SOURCE_CORPUS_FREEZE_0_1.md` — initial frozen source/revision scope.
- `ORIGIN_AND_PROVENANCE.md` — campaign-specific origin and methodology provenance.
- `HYPOTHESIS_QUARANTINE_0_1.md` — motivating bridge claims excluded from blind rendering.
- `EXPERIMENT_001_BLIND_PROTOCOL.md` — preregistered first comparison protocol.
- `FORMULATION_FAMILY_PROTOCOL_0_1.md` — intra-author formulation equivalence/translation protocol and bridge-relative representative selection.
- `TRACK_W_WORKING_SSC_0_1.md` — Woit working census; incomplete.
- `TRACK_L_WORKING_SSC_0_1.md` — Lisi working census; incomplete.

## Open questions

- What common quotient, if any, survives exact source-semantic conservation?
- Is any surviving quotient fundamentally Clifford/spinorial rather than exceptional-(E_8)?
- Do the two programs use superficially similar chirality/conjugation structures in genuinely different semantic roles?
- Does DTS expose a shared transition pattern for real-form/signature/chirality selection?
- Which proposed correspondences fail under dimension, reality-condition, representation, or physical-role accounting?
- Does the Distler–Garibaldi obstruction attach to the common quotient or only to a stronger (E_8)-specific realization?
