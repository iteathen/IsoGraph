# P versus NP research — current front page

**Status:** active research campaign  
**Primitive authority:** `2026-09-26/P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg`  
**Current campaign authority:** `2026-09-27/P_VS_NP_CURRENT_AUTHORITY_0_4.md`  
**Current implicit index:** `2026-09-27/IMPLICIT_ASSERTION_INDEX_0_10.json`  
**Latest completed P-vs-NP Discovery pass:** `2026-09-27/P_VS_NP_DP07_REAPPLY_0_1.md` (historical DP 0.7 execution; current qualified family authority is DP 0.1–0.8)  
**Durable checkpoint:** `2026-09-27/CAMPAIGN_CHECKPOINT_2_0.md`

## Research publication

- [Continuation-Support Reductions for Bounded Existential Computation: A Structural Synthesis of Pruning, Quotienting, and Factorization](../publications/2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_REDUCTIONS_0_1.md)
- Author: Joshua Oshiro
- Publication framing: synthesis/support of established work with modest possible synthesis-level novelty
- [Broad external novelty review](2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_BROAD_NOVELTY_REVIEW_0_1.md)
- [Publication preflight](2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_PUBLICATION_PREFLIGHT_0_1.md)
- License: CC BY 4.0
- P-versus-NP theorem status remains OPEN in both directions.

---

## Potentially novel synthesis — visible research lead

The individual mechanisms below have substantial prior art. The **combined synthesis is new to this IsoGraph campaign and is a possible synthesis novelty; external novelty is not established.**

### 1. Continuation-support reduction ladder

For exact existential acceptance, reduce the continuation-support family in this order:

~~~text
empty support
    -> delete

equal support
    -> merge

included support
    -> dominance prune

remaining mutually-live incomparable support
    -> exact factorization / shared representation

objective-only requirement
    -> exact aggregate homomorphic image
~~~

This is not claimed to be an exhaustive taxonomy of polynomial algorithms. It is a derived structural view of the exact continuation semantics exposed by the corrected primitive graph.

### 2. Negative evidence can simplify dominance locally

The corrected A21/A25 structure exposes an exact connector:

~~~text
sound rejection invariant
or
sound upper abstraction proving emptiness

    ->

dead-child certificate

    ->

smaller simulation obligation set

    ->

sound continuation dominance

    ->

safe pruning
~~~

The useful form is deliberately incomplete:

~~~text
DEADHAT(p,a)
    -> child under a is truly dead.
~~~

It need not classify every child. Exact universal deadness is equivalent in strength to exact existential-status access and is therefore not assumed.

### 3. Accessibility is tracked across several semantic reductions, not only identity

The campaign now treats these as separate support-reduction opportunities:

~~~text
emptiness
equality / scoped identity
one-way inclusion / dominance
factorization / sharing
aggregate image.
~~~

For every route, three obligations remain explicit:

~~~text
semantic exactness / soundness
retained representation size
construction + next-operation access cost.
~~~

This keeps a semantically small quotient, compact factorization, or fixed-syntax blowup from being mistaken for a polynomial algorithm or lower bound.

### 4. Representation-relative support is a mandatory firewall

The CNF target produced an exact family where explicit elimination materializes exponentially many clauses, while the same projected Boolean function has a compact exact alternate factorization.

Therefore:

~~~text
large support in one representation
    !=
representation-independent semantic lower bound.
~~~

Any useful compact representation must additionally remain closed under the **next** exact operation at polynomial cost.

## Strongest current research seam

~~~text
cheap sound negative evidence
    removes provably dead support

then

cheap sound equality/inclusion evidence
    removes duplicate/dominated support

then

exact stable factorization / aggregate sharing
    compresses remaining mutually-live incomparable support

while

retained representation size
and
next-operation cost
remain polynomial.
~~~

The current next experiment applies this ladder directly to primitive CNF clause-variable incidence.

## Mandatory falsifier

The all-live CNF support-growth family in:

`2026-09-27/target-cnf-sat/CNF_TARGET_DEAD_SUPPORT_FALSIFIER_0_1.md`

must produce:

~~~text
dead x-edge prunes = 0.
~~~

It demonstrates that dead-support filtering is useful but cannot replace stable factorization.

## Novelty status

Current broad publication-support novelty review:

`2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_BROAD_NOVELTY_REVIEW_0_1.md`

Historical targeted predecessor:

`2026-09-27/P_VS_NP_DP07_NOVELTY_REVIEW_0_1.md`

Current classification:

~~~text
dead-state pruning:
    prior art found

simulation / antichain pruning:
    prior art found

existential forgetting / CNF elimination blowup:
    prior art found

succinctness vs tractable operations:
    prior art found

continuation-support reduction ladder:
    NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN
    POSSIBLE SYNTHESIS / EXPOSITORY CONTRIBUTION
    SUBSTANTIAL PRIOR-ART OVERLAP

generic QU/NEI-safe integration of
negative evidence -> filtered simulation -> dominance -> factorization:
    NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN
    PROJECT-LOCAL FORMAL INTEGRATION
    PRIOR-ART ANALOGUES FOUND
~~~

The broad review supports publication as a synthesis paper. It does not establish a new complexity theorem or strong external novelty claim.

## Correctness corrections that must remain visible

Historical artifacts retain provenance, but current work must not route through these superseded claims:

- primitive bundle 0.3 — rejected because global transition determinism trivialized the branching/functional distinction;
- NEI overlay 0.4 — superseded as native result authority because opaque handles overclaimed evidence/model/QU completeness;
- IA-304 / IA-305 — superseded because all-legal simulation is sufficient but not necessary for continuation dominance/equality in the presence of dead branches.

Current corrected replacements are indexed by `P_VS_NP_CURRENT_AUTHORITY_0_4.md`.

## Current machine-audited implicit state

~~~text
IMPLICIT_ASSERTION_INDEX_0_10.json

admitted assertions:            357
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
