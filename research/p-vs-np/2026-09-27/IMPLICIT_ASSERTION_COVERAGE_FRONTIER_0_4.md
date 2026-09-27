# P versus NP implicit-assertion coverage frontier 0.4

**Status:** current operational coverage record; not a universal completeness claim
**Successor to:** IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_3.md

## Machine-audited state

Current indexed closure through A26:

~~~text
admitted assertions:            357
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

Authoritative index:

IMPLICIT_ASSERTION_INDEX_0_10.json

Superseded predecessor admissions remain:

~~~text
IA-013
IA-304
IA-305.
~~~

## New closure since frontier 0.3

### A25 — dead-support filtering

Added exact/conditional laws:

~~~text
IA-345 dead child contributes no accepting support
IA-346 sound incomplete dead certificate permits filtering
IA-347 dead-filtered simulation -> dominance
IA-348 all-legal and exact-live simulation are endpoint cases
IA-349 dead filtering can strictly improve simulation proof
IA-350 universal exact deadness <-> existential closure
IA-351 incomplete dead certificates avoid completeness burden
IA-352 polynomial filtered cover -> polynomial decision
IA-353 empty upper abstraction -> dead certificate
IA-354 rejection invariant -> local dead certificate.
~~~

### A26 — robust deadness under QU

Added:

~~~text
IA-355 robust deadness across R(Q) is required
IA-356 UNKNOWN/INCOMPLETE cannot justify filtering
IA-357 sound dead-certificate refinement monotonically weakens obligations
IA-358 one false dead certificate can make filtering unsound
IA-359 upper emptiness certifies deadness; lower emptiness does not
IA-360 local negative evidence can prune inside a globally positive instance.
~~~

## Finite sanity evidence

A25 finite exhaustive sanity check:

A25_DEAD_FILTER_SANITY_0_1.md

For all 324 two-state/two-label systems at horizon 2:

~~~text
exact pair comparisons: 1296
filtered-simulation pair admissions across sound certificate subsets: 30,690
false dominance admissions: 0
exact-dead-filter vs exact dominance mismatches: 0
systems where exact dead filtering is strictly stronger than all-legal simulation: 78.
~~~

This is sanity evidence; formal support remains the inductive assertions.

## CNF negative control

CNF_TARGET_DEAD_SUPPORT_FALSIFIER_0_1.md proves that the earlier explicit-CNF support-growth family has no dead x branches.

Thus:

~~~text
dead filtering alone
    !=
universal retained-support control.
~~~

The family simultaneously has:

~~~text
all x branches live
explicit CNF elimination blowup
compact alternate factorization.
~~~

## Current discovery view

The re-applied DP exposes a continuation-support reduction ladder:

~~~text
empty support
    -> delete

equal support
    -> merge

included support
    -> dominance prune

incomparable live support
    -> factorize/share exact union

objective-only need
    -> exact aggregate image.
~~~

This is a derived view, not an exhaustive algorithm taxonomy.

## Operational fixed point status

NOT REACHED globally.

The DP reapplication produced A25 and A26 after the prior audit fixed point.

Therefore the broader implicit-discovery campaign still has live structure.

## Current next edge

Apply the support ladder directly to primitive CNF incidence and measure:

- exact dead pruning;
- equality/inclusion pruning;
- factor boundary width;
- projected representation size;
- next-operation closure.

The mandatory negative control is the all-live CNF-IA-011 family.

## Remaining boundaries

- Core 0.20 remains unqualified.
- Selected primitive machine convention <-> exact official P-vs-NP convention remains QU_UNEXPANDED.
- Native concrete NEI results remain unqualified until fully instantiated.
- Universal implicit semantic completeness is not claimed.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
