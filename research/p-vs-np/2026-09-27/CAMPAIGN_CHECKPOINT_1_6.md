# P versus NP primitive-logic campaign — checkpoint 1.6

**Branch:** research/p-vs-np-primitive-logic-20260926  
**Date:** 2026-09-27  
**Recovered parent:** CAMPAIGN_CHECKPOINT_1_5.md  
**Live parent head before checkpoint:** 9abf62aa57cba0f238e02c41865d6e0981dfc157  
**Branch divergence before checkpoint:** 206 ahead of main, 0 behind  
**Status:** first algorithm-hidden positive-control campaign complete

## Global assertion authority remains unchanged

The generic P-vs-NP implicit assertion authority remains:

- A0 + corrected A1 + A2-A22;
- IMPLICIT_ASSERTION_INDEX_0_6.json;
- 326 admitted generic assertions;
- 0 missing support references;
- 0 support cycles;
- max normalized derivation depth 11.

The positive-control assertions are control-local experimental assertions.

They have **not** been inserted into the generic index and do not silently become universal P-vs-NP laws.

## Frozen algorithm-hidden control input

Input manifest:

research/p-vs-np/2026-09-27/positive-controls/DISCOVERY_INPUT_MANIFEST_0_1.json

Mechanical state at freeze:

~~~text
PC-R primitive delimiter balance: PASS
PC-H primitive delimiter balance: PASS
PC-G primitive delimiter balance: PASS

named-solver leakage in source freezes:
PC-R: none found
PC-H: none found
PC-G: none found
~~~

Only each control's source freeze + primitive rendering are control-specific discovery input.

Audits, implicit results, NEI/QU overlays, DP results and comparison artifacts are excluded from that input.

## PC-R — finite directed bounded walk

Recovered independently from source semantics:

~~~text
(current vertex, remaining budget)
    exact future-sufficient statistic

polynomial state range
    +
exact local OR recurrence
    ->
polynomial aggregate recurrence DAG
~~~

Campaign topology recovered:

- T2 sufficient statistic;
- T4 exact aggregate recurrence.

Natural falsifiers retained:

- vertex alone insufficient;
- budget alone insufficient;
- raw outdegree not a dominance law;
- Boolean output range is not an access argument.

## PC-H — Horn-form Boolean consistency

Recovered independently:

~~~text
local forced-head consequence
    ->
monotone forced-set expansion
    ->
at most n strict additions
    ->
least model on YES
or
forced headless contradiction on NO.
~~~

Campaign topology recovered:

- T3 singleton constructible witness/hitting set;
- T5 constructible rejection evidence.

Important falsifiers:

- arbitrary assignment inclusion is neither upward nor downward truth-monotone;
- semantic intersection-defined leastness alone does not give polynomial access.

## PC-G — parity-system consistency

Recovered independently from the explicit Boolean truth table:

~~~text
XOR cancellation / associativity
    ->
local reversible row replacement
    ->
solution-set-preserving normalization
    ->
at most n pivot coordinates
    ->
canonical witness or contradiction row.
~~~

Campaign topology recovered:

- T3 singleton constructible witness/hitting set;
- T5 constructible rejection evidence.

Important falsifiers:

- model intersection closure fails;
- assignment inclusion is not a truth preorder;
- raw syntactic equation identity is finer than scoped solution-set identity.

## Cross-control result

Comparison:

research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMPARISON_0_1.md

Common-core lead:

research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMMON_CORE_0_1.md

The surviving common structure is lower-level than any single mechanism:

~~~text
primitive exact local law
    +
polynomial retained support
    +
source-indexed well-founded polynomial progress rank
    +
polynomial local construction
    +
exact terminal extraction.
~~~

Experimental derived view:

~~~text
RLEST
= ranked local exact support transformation.
~~~

Coordinate-handling modes exposed by controls:

~~~text
A = aggregate alternatives exactly
F = force a coordinate by exact consequence
E = eliminate a coordinate by target/solution-preserving transform.
~~~

AFE is not claimed exhaustive.

## Strongest new measurement lead

For a source-ranked transformation stage i, track:

~~~text
W_i
=
exact retained support size/width after stage i.
~~~

The controls all satisfy:

~~~text
max_i W_i <= polynomial(input size).
~~~

The next hard-target falsifier is therefore:

~~~text
an exact local elimination law exists
BUT
retained support grows superpolynomially/exponentially
before the source rank is exhausted.
~~~

This distinguishes semantic exactness from computational accessibility more sharply than output-range compactness.

## NEI synthesis

No control required a complete identity oracle.

Useful identity facts were locally generated:

- PC-R statistic equality -> scoped residual SAME;
- PC-H global witness-list identity separated from extensional assignment identity;
- PC-G local rewrites -> exact scoped solution-set SAME despite raw syntax change.

This supports searching for transformation-local NEI certificates rather than global maximum quotienting.

## QU synthesis

All three frozen inputs are closed-world.

No load-bearing semantic QU remained.

Algorithm hiding is experimental masking and was not represented as QU.

## Next execution unit

The positive-control gate is satisfied.

Project the surviving common structure toward a harder/complete bounded-existential target.

Required discipline:

1. primitive-render target semantics first;
2. do not import a known target solver as discovery structure;
3. derive candidate A/F/E laws only from primitive target semantics;
4. track retained-support growth exactly;
5. record local NEI certificates separately from global identity;
6. preserve support-explosion and failed-local-law cases as falsifiers;
7. do not infer a P-vs-NP theorem from failure of one elimination topology.

## Authority status

Core 0.20 remains unqualified.

Qualified NEI 0.4 and QU 0.1 remain separate extension authorities.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
