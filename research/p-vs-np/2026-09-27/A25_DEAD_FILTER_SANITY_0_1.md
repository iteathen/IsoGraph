# A25 dead-support filtered simulation — finite sanity check 0.1

**Status:** finite exhaustive sanity evidence; not a proof substitute
**Assertion target:** IA-347 / IA-348 / IA-349
**Model:** deterministic labeled residual transition systems after choice normalization

## Exhaustive domain

Enumerated all systems with:

~~~text
states: 2
labels: 2
NEXT(s,a): invalid, state 0, or state 1
CURRENT(s): FALSE or TRUE
remaining horizon: 2
~~~

Counts:

~~~text
transition functions: 3^(2*2) = 81
CURRENT assignments:  2^2 = 4
systems:              324
ordered state pairs per system: 4
exact pair comparisons at horizon 2: 1296
~~~

Continuation-language dominance was computed extensionally from all accepting suffixes of length at most the remaining horizon.

## Sound incomplete dead certificates

For every system, every subset of the actually dead legal state/label/horizon edges was treated as a possible sound incomplete DEADHAT certificate set.

The greatest dead-filtered simulation relation was then computed bottom-up using IA-347's local obligations.

Across all such certificate selections:

~~~text
dead-filtered simulation pair admissions checked: 30,690
false dominance admissions:                         0
~~~

This is consistent with IA-347 soundness.

## Exact dead filter endpoint

For each system, DEADHAT was then set to the exact dead-child classifier:

~~~text
DEADHAT_t(p,a)
IFF
NEXT(p,a)=p'
AND
E_(t-1)(p')=FALSE.
~~~

The resulting greatest filtered relation was compared with exact continuation-language inclusion.

Result:

~~~text
mismatches: 0 / 1296 pair comparisons.
~~~

This supports IA-348's exact-live endpoint claim on the finite model.

## Strict improvement over all-legal simulation

The empty DEADHAT filter reproduces all-legal simulation.

In:

~~~text
78 / 324 systems
~~~

the exact dead filter recognized strictly more dominance pairs than the empty/all-legal filter.

One minimal shape is:

~~~text
p has a legal label a to a dead child
q has no legal a transition

C_p = empty
C_q = empty.
~~~

Exact dominance/equality holds, but all-legal simulation fails because it insists on matching the irrelevant dead edge.

Dead filtering removes the obligation.

## Disposition

The finite search found:

- no soundness counterexample to IA-347;
- no exact-live mismatch for IA-348;
- explicit strictness examples for IA-349.

The formal authority remains the direct inductive proofs in A25.
