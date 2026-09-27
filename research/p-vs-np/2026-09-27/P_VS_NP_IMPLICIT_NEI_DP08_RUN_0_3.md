# P versus NP — DP 0.8 over implicit/NEI closure 0.3

**Status:** experimental discovery synthesis; no P-vs-NP resolution
**Primitive input:** P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg
**NEI input:** P_VS_NP_NEI_OVERLAY_0_4.isg
**Implicit state:** A0 + corrected A1 + A2-A23
**Machine index:** IMPLICIT_ASSERTION_INDEX_0_7.json
**Indexed admitted assertions:** 335
**Missing support references:** 0
**Support cycles:** 0
**Max normalized derivation depth:** 11

## 1. Terminal residual is unchanged

The campaign still reduces to:

~~~text
Given functional-polynomial V(x,w)
with polynomially bounded w,

compute

    E(x) = exists w V(x,w)

by a functional-polynomial realization.
~~~

No positive-control or CNF-target result changes that terminal question.

## 2. Continuation semantics remain the common semantic center

For residual prefix p, exact accepting continuation language C_p still supplies:

~~~text
Q-RESIDUAL:  exact C_p equality
dominance:   C_p subset relation
Q-EXISTS:    nonempty(C_p)
Q-MIN:       minimum accepted continuation length
Q-COUNT:     exact continuation count.
~~~

But the positive controls demonstrate that an operationally useful representation need not explicitly materialize any minimum semantic quotient.

## 3. The S/K/A burden is now representation-qualified

Earlier DP used:

~~~text
S = semantic sufficiency
K = polynomial compactness
A = polynomial accessibility.
~~~

A23 requires the sharper form:

~~~text
S_R = exact target semantics under representation R

K_R = polynomial retained size/width under R

A_R = polynomial construction and next-operation access under R.
~~~

A bare compactness claim without R is unsafe.

The same exact projected function can be:

- large as one explicit clause set;
- small as another exact factorization.

## 4. Positive-control result

Three algorithm-hidden controls recovered different polynomial mechanisms.

### PC-R

~~~text
future-sufficient state
+
polynomial state range
+
exact local OR recurrence.
~~~

### PC-H

~~~text
exact local consequence
+
monotone finite closure
+
constructible model / contradiction.
~~~

### PC-G

~~~text
exact reversible transform
+
polynomial retained row support
+
polynomial pivot rank
+
constructible witness / contradiction.
~~~

No one high-level mechanism explains all three.

## 5. Common derived view

The controls share:

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

RLEST is retained only as a discovery label.

A/F/E distinguishes three observed coordinate-handling modes:

~~~text
A = aggregate alternatives
F = force a coordinate
E = eliminate a coordinate by exact semantic transform.
~~~

AFE is not asserted exhaustive.

## 6. Hard-target projection recovers A/F/E but breaks the polynomial-support implication

The primitive CNF target independently yields all three local laws.

### A

~~~text
exists x F(x,y)
IFF
F(0,y) OR F(1,y).
~~~

Exact, but no universal polynomial sharing theorem is recovered.

### F

One unresolved literal in an otherwise false clause is forced.

Exact, but the rule can stall.

### E

Opposite-sign clause pairs produce an exact projection onto remaining variables.

Exact and locally constructible.

But explicit retained CNF support can expand dramatically.

Therefore the target falsifies:

~~~text
exact local law
+
polynomial progress rank
    ->
polynomial algorithm.
~~~

The missing K_R/A_R obligations are real.

## 7. The support-explosion counterexample does not give a lower bound

The explicit family in CNF-IA-011 produces exponentially many materialized resolvent clauses for the frozen elimination order.

DP alternate-interpretation analysis then derives a compact exact factorization of the same projected Boolean function.

Thus:

~~~text
fixed-syntax blowup
    !=
semantic complexity lower bound.
~~~

This is now a primary separation-side firewall.

Any model-wide lower-bound claim must bridge across admissible exact representations and arbitrary functional-polynomial realizations.

## 8. Transformation-local identity is a strengthened non-circular opening

PC-G and the CNF target both use exact local transforms that change raw syntax while preserving scoped target semantics.

They do not solve arbitrary semantic-equivalence classification.

This gives a useful pattern:

~~~text
local transform
+
local exact scoped-SAME/equivalence certificate
    ->
safe replacement
~~~

without:

~~~text
complete global identity oracle.
~~~

This extends the earlier sound-incomplete dominance insight from comparisons between states to exact certified transformations between representations.

## 9. Stable factorization is the sharpened equality-side target

The current high-value question is not merely:

~~~text
does a compact representation exist?
~~~

It is:

~~~text
is there a primitive structural law
that makes a compact exact representation:

- polynomially constructible,
- polynomial in retained size,
- closed under the next required existential-elimination operation,
- and usable for polynomial terminal extraction?
~~~

Universal availability of such a representation would imply the unresolved existential closure by IA-335.

Therefore its existence cannot simply be assumed or encoded by reference to the answer.

## 10. Current T1-T5 status after hard-target projection

### T1 — sound local dominance / simulation

Still promising.

CNF clause subsumption gives a local redundancy analogue but not a universal polynomial support bound.

### T2 — sufficient statistic / separator / factorization

Raised in importance.

The CNF explosion family demonstrates that changing factorization can collapse explicit support.

The open burden is stable, accessible factorization under subsequent operations.

### T3 — hitting set

Recovered on PC-H and PC-G controls.

No universal target hitting set is recovered.

### T4 — exact aggregate recurrence DAG

Recovered on PC-R.

CNF has exact Boolean aggregation but no universal polynomial DAG bound.

### T5 — constructible rejection invariant

Recovered on PC-H and PC-G.

CNF has local empty-clause rejection evidence, but no universal polynomial constructor is recovered.

## 11. Strongest current non-circular search shape

The campaign now favors:

~~~text
primitive local structural law
+
transformation-local exact semantic certificate
+
polynomial retained factorized support
+
polynomial next-operation closure
+
source-indexed polynomial progress
+
exact target extraction.
~~~

This is more specific than “compression” and stricter than “small semantic quotient.”

## 12. What not to count as progress

A23 adds several strong rejection tests.

Do not count as a P-vs-NP advance by itself:

~~~text
exact local elimination exists

one elimination step is polynomial in current support

the number of source coordinates is polynomial

a normal form becomes large

a compact alternative factorization exists

a semantic factorization can be defined

a local certificate exists but cannot be constructed

a fixed solver architecture fails.
~~~

Each omits at least one load-bearing universal support/accessibility obligation.

## 13. Next DP target

The next exact target experiment should operate on primitive clause-variable incidence and ask:

~~~text
which locally constructible factorization boundaries
keep the representation closed under the next existential projection?
~~~

The experiment should measure separately:

~~~text
boundary size
factor count
factor representation size
projection cost
post-projection factor size
local NEI/equivalence certificate
failure/counterexample.
~~~

Do not insert a named high-level decomposition method before the primitive relation produces it.

## 14. Authority status

Core 0.20 remains unqualified.

NEI 0.4 and QU 0.1 remain separate qualified extension authorities.

The CNF target and positive-control overlays are experimental research artifacts.

## 15. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
