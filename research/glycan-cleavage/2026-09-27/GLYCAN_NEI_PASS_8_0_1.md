# Glycan cleavage NEI pass 8 — maximal-path and SCS formulation identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A8 + NEI passes 1-7
**Authority:** qualified NEI 0.4 + QU 0.1

A8 establishes exact accepted-word equality between the original dynamic problem and a maximal-path set-valued coverage formulation, plus ordinary shortest-common-supersequence equality on the singleton-susceptibility subclass.

This pass records those equalities only at their justified scopes.

## Q-G-PATH-COVER-LANGUAGE

Fix one concrete instance.

Identity object:

~~~text
the exact set of raw treatment words
that cover every maximal non-target path
under the A8 non-strict set-valued embedding rule.
~~~

## Q-G-SINGLETON-SCS-FAMILY

For an instance satisfying the singleton-susceptibility restriction, identity object:

~~~text
the exact set of shortest raw common-supersequence words
of the run-compressed maximal-path label words.
~~~

---

## G-N069 — original solution language and maximal-path cover language are SAME

G-IA192 gives:

~~~text
L_global
=
intersection of maximal-path COV(P).
~~~

Therefore the original dynamic problem and the maximal-path coverage formulation are Q-G-INSTANCE-SOLUTION-LANGUAGE SAME.

The underlying graph/path representations are not globally coidentical.

## G-N070 — ordered-layer and maximal-path formulations are solution-language SAME

A7 and A8 are each exactly equivalent to the same original raw accepted-word set.

By transitivity they are scoped SAME under solution-language identity.

They remain distinct representations:

- ordered-layer form is compact on the DAG;
- maximal-path form exposes branch-order constraints.

## G-N071 — identical path-coverage constraints are scoped SAME values

If:

~~~text
COV(P1)=COV(P2),
~~~

then P1 and P2 are Q-G-PATH-COVER-LANGUAGE SAME.

Their raw path occurrences and structural provenance remain distinct.

## G-N072 — path-language dominance is not identity

If:

~~~text
COV(P_hard) proper-subset COV(P_easy),
~~~

then the easy constraint is redundant in the global intersection but the two path-language values are DISTINCT under Q-G-PATH-COVER-LANGUAGE.

Redundancy must not be promoted to SAME.

## G-N073 — singleton restricted original optimum family and SCS family are SAME

Under the explicit singleton-susceptibility restriction, G-IA205/G-IA206 establish:

~~~text
original minimum raw treatment words
=
shortest common supersequences
of the compressed maximal-path word family.
~~~

Therefore the two exact sets are Q-G-INSTANCE-OPTIMUM-FAMILY SAME and Q-G-SINGLETON-SCS-FAMILY SAME through their exact correspondence.

## G-N074 — general set-valued formulation is not SAME to ordinary SCS without additional authority

Outside the singleton restriction, set-valued positions and same-phase common-set intersections carry distinctions absent from an ordinary fixed-symbol word.

No exact mapping eliminating those distinctions has been established.

Therefore a generic ordinary-SCS identity query remains unsupported/incomplete rather than SAME.

## G-N075 — implementation representation does not define language identity

Explicit path enumeration and DAG/tau recognition can represent the same exact accepted-word language.

Different implementation size or data layout neither proves nor prevents scoped solution-language SAME.

## G-N076 — no raw object merge or semantic UNKNOWN follows

No pass-8 result identifies raw nodes, operators, paths, or words globally.

All accepted-word equalities are exact under the frozen deterministic model.

No QU or semantic UNKNOWN is introduced.

## Pass-8 NEI disposition

~~~text
new cross-formulation scoped SAME laws: 5
new dominance/identity boundary laws:    2
new unsupported-generalization boundary:1
raw-object global identity results:      0
semantic UNKNOWN results:                0
QU refinements:                          0
~~~

A complete implicit re-pass is required. In particular, operator-susceptibility dominance must be propagated through the now-explicit path-cover formulation before fixed point can be claimed.
