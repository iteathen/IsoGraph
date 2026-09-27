# P versus NP primitive-logic campaign — checkpoint 2.0

Branch: research/p-vs-np-primitive-logic-20260926
Date: 2026-09-27
Recovered parent: CAMPAIGN_CHECKPOINT_1_9.md
Live parent head before checkpoint: 0a6099d35bde399f3855699fbdcd05080f160c00
Branch divergence before checkpoint: 256 ahead of main, 0 behind
Status: Discovery Protocol reapplied after primitive/NEI/implicit corrections

## Discovery authority

Qualified DP 0.7.

Current run:

P_VS_NP_DP07_REAPPLY_0_1.md

Prior DP08-named files remain experimental campaign history.

## Primitive / identity authority

Primitive:

P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

Explicit base:

ASSERTION_BASE_A0_0_2.md

NEI semantic scope:

P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

Native NEI templates:

P_VS_NP_NEI_OVERLAY_0_5.isg

## Implicit state after reapplication

Current index:

IMPLICIT_ASSERTION_INDEX_0_10.json

Machine state:

~~~text
admitted assertions:            357
missing support references:       0
support cycles:                   0
max normalized derivation depth: 11
~~~

New rounds:

~~~text
A25 IA-345..354 — dead-support filtering
A26 IA-355..360 — robust deadness / QU filtering safety.
~~~

## Main new structural observation

Corrected continuation dominance depends only on accepting continuation support.

Therefore:

~~~text
legal transition support
    !=
acceptance-relevant support.
~~~

A legal dead child contributes nothing to the existential continuation language.

## New non-circular mechanism

Use sound incomplete negative evidence:

~~~text
DEADHAT(p,a)
    ->
child under a is truly dead.
~~~

Then certified-dead support may be removed before local simulation/dominance checks.

Exact universal deadness remains circular:

~~~text
exact DEAD classification
    <->
exact Q-EXISTS access
    <->
bounded existential closure.
~~~

So the useful route is incomplete but sound dead certification.

## Cross-topology bridge

New exact connector:

~~~text
rejection invariant / empty sound upper abstraction
    ->
dead-child certificate
    ->
filtered simulation
    ->
continuation dominance
    ->
safe pruning.
~~~

Negative evidence can therefore reduce local support even inside a globally positive instance.

## Finite sanity evidence

A25_DEAD_FILTER_SANITY_0_1.md

Results:

~~~text
324 systems
1296 exact ordered pair comparisons
30,690 filtered-simulation admissions across sound dead-certificate subsets
0 false dominance admissions
0 exact-dead-filter vs exact dominance mismatches
78 systems where dead filtering is strictly stronger than all-legal simulation.
~~~

## Critical falsifier

CNF_TARGET_DEAD_SUPPORT_FALSIFIER_0_1.md

The prior CNF support-growth family has:

~~~text
every x partial branch live.
~~~

Therefore even perfect dead filtering removes no x-choice edge.

Yet explicit CNF elimination blows up while a compact exact factorization exists.

Thus:

~~~text
dead filtering
    !=
stable factorization
    !=
universal solution.
~~~

## Revised derived view

Continuation-support reduction ladder:

~~~text
empty
    -> delete

equality
    -> merge

inclusion
    -> dominance prune

remaining incomparable live support
    -> exact factorization/sharing

objective-only requirement
    -> aggregate homomorphic image.
~~~

This is a DP-derived view, not a Core primitive or exhaustive algorithm taxonomy.

## Revised A/F/E interpretation

A/F/E are overlapping views of primitive existential disjunction:

~~~text
A:
    exact OR/union of alternatives

F:
    aggregate degenerates to surviving alternative
    after all competitors are certified dead

E:
    exact projected OR represented in another support language.
~~~

They remain operationally distinct and are not collapsed into one algorithm.

## Strongest current research seam

~~~text
cheap sound negative evidence
    removes provably dead support

then

cheap sound inclusion/equality evidence
    removes dominated/duplicate support

then

exact stable factorization / aggregate sharing
    compresses remaining mutually live incomparable support

while

retained representation size
and
next-operation cost
remain polynomial.
~~~

## Next execution unit

Apply this support ladder to the primitive CNF target.

Measure at every variable layer:

~~~text
legal alternatives
provably dead alternatives
remaining live/unknown alternatives
local equality merges
local dominance prunes
factor boundary size
factor representation size
projection cost
post-projection size
next-operation cost.
~~~

The CNF-IA-011 all-live family is a mandatory negative control and must produce zero x-edge dead prunes.

## Current authority

P_VS_NP_CURRENT_AUTHORITY_0_3.md

Coverage:

IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_4.md

## Remaining boundaries

- Core 0.20 remains unqualified.
- Selected primitive machine model <-> exact official convention remains QU_UNEXPANDED.
- Concrete native NEI results remain unqualified until fully instantiated.
- Universal implicit completeness is not claimed.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
