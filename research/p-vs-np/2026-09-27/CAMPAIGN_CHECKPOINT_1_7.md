# P versus NP primitive-logic campaign — checkpoint 1.7

**Branch:** research/p-vs-np-primitive-logic-20260926
**Date:** 2026-09-27
**Recovered parent:** CAMPAIGN_CHECKPOINT_1_6.md
**Live parent head before checkpoint:** 8aa48ebaaba724ddbeb2ed6608a921834a702609
**Branch divergence before checkpoint:** 220 ahead of main, 0 behind
**Status:** positive-control campaign, primitive CNF target projection, A23 normalization, and DP synthesis complete

## Generic implicit assertion state

Authoritative index:

IMPLICIT_ASSERTION_INDEX_0_7.json

Machine state:

~~~text
admitted assertions: 335
missing support references: 0
support cycles: 0
max normalized derivation depth: 11
~~~

Generic closure now spans:

~~~text
A0
corrected A1
A2-A23.
~~~

A23 adds representation/accessibility laws only.

It does not promote AFE or RLEST into universal architecture claims.

## Positive-control campaign

Frozen control input:

research/p-vs-np/2026-09-27/positive-controls/DISCOVERY_INPUT_MANIFEST_0_1.json

All three hidden-algorithm controls completed:

~~~text
PC-R:
    sufficient statistic + exact recurrence

PC-H:
    local consequence closure + canonical YES/NO evidence

PC-G:
    reversible normalization + canonical YES/NO evidence.
~~~

Cross-control synthesis:

research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMPARISON_0_1.md

Common-core lead:

research/p-vs-np/2026-09-27/positive-controls/POSITIVE_CONTROL_COMMON_CORE_0_1.md

## Hard target

Primitive target directory:

research/p-vs-np/2026-09-27/target-cnf-sat/

Frozen target discovery input:

CNF_TARGET_DISCOVERY_INPUT_MANIFEST_0_1.json

Mechanical discovery-boundary checks:

~~~text
primitive delimiter balance: PASS
named-solver leakage in frozen source: none found
~~~

The native target bottoms out in primitive logical operators, list constructors, finite arithmetic support, and raw POS/NEG input incidences.

No target solver is an authoritative native leaf.

## Hard-target A/F/E result

All three locally exact modes were independently recovered from primitive clause semantics:

~~~text
A:
    exists x F
    =
    F[x=0] OR F[x=1]

F:
    one unresolved literal in an otherwise false clause
    is forced

E:
    opposite-sign clause pairing
    gives exact existential projection over remaining variables.
~~~

None currently yields a universal polynomial target decision.

## Strong falsifier: fixed-representation support growth

The exact CNF elimination transform is polynomial in current explicit support and consumes one variable rank per stage.

Nevertheless the explicit family in CNF-IA-011 yields:

~~~text
input clauses:
    2^d * k

after eliminating x_1,...,x_d:
    k^(2^d)
distinct non-tautological pairwise non-subsuming clauses.
~~~

For k=2, this is exponential in the initial clause count.

Therefore:

~~~text
exact local transformation
+
polynomial source rank
    !=
polynomial total construction.
~~~

A retained-support bound is load-bearing.

## Required alternate interpretation

The same explicit blowup family has an exact compact factorization:

~~~text
OR over original sign groups:
    AND of that group's private variables.
~~~

Therefore:

~~~text
fixed-CNF support explosion
    !=
representation-independent semantic explosion
    !=
P != NP.
~~~

This blocks an invalid lower-bound inference.

## A23 central normalization

A23 admits exact generic laws:

~~~text
support size is representation-relative

fixed-representation blowup is not a semantic lower bound

polynomial local cost in current support + polynomial rank
    still requires a polynomial retained-support bound

compact representation
    still requires polynomial next-operation closure

local exact scoped semantic certificates
    can justify replacement
    without complete global equivalence classification

universal accessible factorization closure
    would imply bounded-existential closure

semantic existence of compact factorization
    does not imply accessible construction.
~~~

## Updated durable summaries

Coverage:

IMPLICIT_ASSERTION_COVERAGE_FRONTIER_0_2.md

DP synthesis:

P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_3.md

The older 0.1/0.2 summaries remain historical.

## Strongest current research seam

The target has shifted from:

~~~text
find exact elimination
~~~

to:

~~~text
find primitive structural causes of a representation/factorization R
such that:

- R is polynomially constructible;
- retained R support stays polynomial;
- the next exact existential-projection operation stays polynomial in R;
- local semantic replacement can be certified without a global equivalence oracle;
- source-ranked progress reaches exact terminal truth.
~~~

Universal existence of such an R cannot simply be assumed because IA-335 shows that universally accessible factorization closure is already sufficient for the unresolved equality direction.

## NEI / QU state

NEI:

~~~text
local transformation certificates
    ->
scoped semantic SAME/equivalence
~~~

is now an active non-circular identity route.

Complete global representation equivalence remains unnecessary.

QU:

- frozen control/target inputs are closed-world and have no load-bearing instance QU;
- the universal stable-factorization question remains unresolved;
- because the campaign has not declared an exhaustive representation authority, failure of the current representations is INCOMPLETE, not a proof of universal nonexistence.

## Next exact execution unit

Operate directly on primitive clause-variable incidence.

Derive and test factorized support boundaries without inserting a named high-level decomposition method.

Track separately:

~~~text
boundary variables
factor count
factor representation size
projection cost
post-projection factor size
transformation-local NEI certificate
counterexample/falsifier.
~~~

The immediate question is whether any primitive-local boundary law remains closed under the next existential projection while keeping both representation size and operation cost polynomial.

## Authority status

Core 0.20 remains unqualified.

NEI 0.4 and QU 0.1 remain separate qualified authorities.

Positive-control and CNF target artifacts remain research candidates.

## Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
