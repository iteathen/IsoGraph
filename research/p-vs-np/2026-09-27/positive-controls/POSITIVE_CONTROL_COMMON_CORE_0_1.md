# P versus NP positive-control common-core lead 0.1

**Status:** DP lead extracted from three algorithm-hidden positive controls
**Not an admitted universal theorem**
**Parent:** POSITIVE_CONTROL_COMPARISON_0_1.md

## Lead L-PC-01 — polynomial support width under exact local coordinate removal

The three successful controls suggest separating two questions that are often conflated:

~~~text
1. Can one bounded source coordinate/depth layer be handled exactly?

2. Does repeatedly doing so keep the retained exact support polynomial?
~~~

The first question has a positive local answer in all controls.

The second is what makes the full construction polynomial.

### Control witnesses

PC-R:

~~~text
local operation: exact OR aggregation
rank: remaining step budget
support: n vertex cells per layer
total: polynomial.
~~~

PC-H:

~~~text
local operation: force a semantic consequence
rank: number of unforced variables
support: one n-bit forced set
total: polynomial.
~~~

PC-G:

~~~text
local operation: exact reversible constraint rewrite
rank: number of unused pivot coordinates
support: m x (n+1) bits
total: polynomial.
~~~

## Lead L-PC-02 — the hard quantity may be retained-support growth, not semantic output range

Every control has Boolean terminal output.

That fact is uninformative.

A more discriminating quantity is:

~~~text
W_i
=
size/width of exact support that must be retained
after i source-ranked local transformations.
~~~

A positive control succeeds because:

~~~text
max_i W_i <= polynomial(input size)
~~~

and every transition between retained supports is polynomially constructible.

This is not claimed to characterize P universally.

It is a target measurement for the next projection.

## Lead L-PC-03 — exact local elimination can still fail by support explosion

A local transformation may be exact, reversible or target-preserving, and polynomial for one step, yet repeated use may generate exponentially many constraints/states.

Therefore the main falsifier for a projected elimination law is:

~~~text
does exact retained support blow up before the source rank is exhausted?
~~~

This is stronger than asking whether a semantic quotient or local rule exists.

## Lead L-PC-04 — local identity evidence can accompany transformations

A transformation need not compute a global identity quotient.

It is enough to carry a local theorem such as:

~~~text
old support
    and
new support
have the same target semantics.
~~~

PC-G is the strongest control witness of this principle.

That suggests testing harder targets for cheap **transformation-local NEI certificates** rather than complete semantic identity.

## Non-admission

No claim is made that:

~~~text
RLEST exists for every verifier
AFE is exhaustive
polynomial retained support always exists
support explosion implies P != NP
~~~

Failure of the current modes would only falsify these discovery leads, not settle P versus NP.

## Next exact test

Project A/F/E onto a primitive-rendered complete bounded-existential target.

For every candidate local law, record:

~~~text
semantic exactness
local construction cost
rank/progress effect
retained-support delta
NEI certificate if any
counterexample/falsifier
~~~

The decisive experimental quantity is retained-support growth under exact coordinate handling.
