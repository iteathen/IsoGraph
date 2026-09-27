# Glycan cleavage Discovery Protocol 0.1–0.7 run 0.1

**Status:** active discovery ledger; candidates are not semantic authority until separately admitted
**Date:** 2026-09-27
**Branch:** research/glycan-cleavage-primitive-20260927
**Discovery authority:** qualified cumulative DP 0.1–0.7
**Primitive input:** verified GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
**Derived input:** GLYCAN_IMPLICIT_NEI_FIXED_POINT_0_1.md plus A8 correction, A9/A10, NEI9/10, A11/NEI11
**Identity authority when invoked:** qualified NEI 0.4
**Unknown authority when invoked:** qualified QU 0.1

DP 0.8 is not used as semantic discovery authority. Its clue-preserving repair discipline is referenced only in the discrepancy note for the already-preserved A8 proof repair.

## 0. Discovery-state freeze

Current exact research surface before this DP run:

~~~text
primitive rendering:
    Experiment 032 PASS

implicit closure:
    G-IA001..G-IA257

NEI closure:
    G-N001..G-N093

pre-DP operational fixed point:
    A11 no-new
    NEI11 no-new

frozen model:
    finite rooted structure
    static closed-world susceptibility
    target-protected deletion
    exhaustive single-operator phase
    unit phase-count objective
~~~

Open exclusions remain:

- real kinetics/stochasticity;
- uncertain susceptibility;
- incomplete digestion;
- state-dependent chemistry outside M;
- Core 0.20 qualification;
- external novelty claims;
- universal complexity conclusions.

---

## 1. Adaptive protocol ranking

The fixed graph makes these protocols highest-value.

### Rank 1 — DP-07 alternative factorization

Cue:

The same treatment phase currently appears in several exact forms:

- microscopic saturation;
- unique phase transformer;
- removed-ideal closure;
- tau recurrence;
- ordered layer;
- maximal-path coverage.

Question:

> Is there a smaller exact closed form for one phase that exposes the whole operator algebra directly?

### Rank 2 — DP-02 constraint structure

Cue:

The current optimum is minimum ordered layering with:

- child <= parent phase;
- one common susceptibility witness per layer.

Question:

> Which constraints are positive requirements, which are blockers, and can the blocker geometry be represented more directly?

### Rank 3 — DP-04 dependency topology

Cue:

Removed types form order ideals of a finite descendant-before-ancestor poset.

Question:

> What invariant algebra follows solely from monotone movement through that poset?

### Rank 4 — DP-08 residual structure

Current residual distinctions include:

- susceptibility on retained target types versus non-target types;
- raw operator identity versus treatment-relevant behavior;
- dominance versus equality;
- complete raw witness family versus value-only quotient;
- meet versus join behavior of phase closure.

Question:

> Which residuals are actually load-bearing to treatment words?

### Rank 5 — DP-09/10 symmetry and role-equivalence

Cue:

Raw operators can have equal or nested susceptibility supports; raw branches can share exact path/language bases.

Question:

> Which role-equivalences support exact scoped quotienting without global identity collapse?

### Rank 6 — DP-06 repeated motifs / DP-13 derived-view reuse

Cue:

The same monotone pattern recurs at:

- local deletion;
- phase closure;
- word insertion;
- operator dominance;
- language upward closure;
- path-basis generation.

Question:

> Is there one primitive monotonicity view generating several of these results?

Lower-priority DP directions are deferred unless these leads produce residuals requiring them.

---

# 2. Lead L1 — resistant-frontier factorization of one phase

## Observation

Work on the exact non-target SIG-type poset Q_NT with descendant-before-ancestor order.

For one operator e define:

~~~text
S_e
=
types susceptible to e

N_e
=
Q_NT minus S_e
=
types resistant to e.
~~~

Let A be the currently active non-target type set.

A is an upward-closed set/filter because an active descendant implies every active ancestor remains present.

Candidate formula:

~~~text
D_e(A)
=
upward_closure(A intersection N_e)
~~~

where D_e(A) is the active non-target set after one exhaustive e phase.

Interpretation:

- resistant active types cannot be deleted;
- their ancestors survive because they remain blocked;
- every active type not above a resistant active type lies in an all-e-susceptible fringe and is exhausted by saturation.

## Why this matters

If exact, one phase requires no iterative fixed-point search.

It becomes:

~~~text
filter active set by resistance
then upward-close.
~~~

This is smaller than the current deletion recurrence.

## Falsifier

Find an active survivor q after e such that q has no active resistant descendant including itself.

That would refute the formula.

No such counterexample has been found analytically; exact admission remains pending Core-0.19 review.

**Current disposition:** HIGH-VALUE CANDIDATE.

---

# 3. Lead L2 — exact effective operator signature

The source relation M may contain susceptibility tuples on retained target types.

But target types are never eligible.

Candidate effective support:

~~~text
S*_e
=
{ q in Q_NT |
  e susceptible at q }.
~~~

Candidate theorem:

~~~text
phase-transformer SAME(e1,e2)
IFF
S*_e1 = S*_e2
~~~

when the transformer scope ranges over every valid non-target active filter/order ideal.

Forward direction is the nontrivial discovery target.

Potential separating state for a support difference at q:

~~~text
active filter = upward closure of q.
~~~

Then q is terminal among active non-target types. An operator susceptible at q can remove it; an operator resistant at q cannot.

## Residual

This would sharpen the earlier NEI boundary:

~~~text
full raw susceptibility-vector equality
    is sufficient but may be too strong

effective non-target susceptibility equality
    may be exact transformer identity.
~~~

It would also prove that target-node susceptibility is semantically dead for all treatment-word behavior in version 0.1.

**Current disposition:** HIGH-VALUE CANDIDATE.

---

# 4. Lead L3 — phase closure as meet-preserving closure

A7 represents removed types as an order ideal I and one treatment as extensive monotone idempotent closure R_e.

Using L1's active-set dual candidate gives:

~~~text
R_e(I)
=
Q_NT
minus
upward_closure(
    (Q_NT minus I)
    intersection N_e
).
~~~

Candidate exact algebra:

~~~text
R_e(I intersection J)
=
R_e(I) intersection R_e(J).
~~~

Thus R_e would be not merely a closure operator but a finite meet-preserving closure operator.

A useful derived high-level label is "nucleus on the finite ideal lattice", but that label supplies no authority.

## Falsifier / residual

Join preservation is predicted to fail.

Witness shape:

~~~text
parent q susceptible to e
two children a,b resistant to e

I = {a}
J = {b}

R_e(I)=I
R_e(J)=J

but

R_e(I union J)
=
{a,b,q}.
~~~

So:

~~~text
meet preservation:
    candidate exact invariant

join preservation:
    false in general.
~~~

**Current disposition:** HIGH-VALUE CANDIDATE with explicit negative control.

---

# 5. Lead L4 — dominance becomes two-sided absorption

A9 has the susceptibility-support preorder:

~~~text
e1 <=M e2
IFF
S_e1 subseteq S_e2.
~~~

It already proves any occurrence of e1 in a solving word may be upgraded to e2 without losing solvability.

L1/L3 suggest a stronger transformer law:

~~~text
R_e2 o R_e1
=
R_e2

R_e1 o R_e2
=
R_e2.
~~~

Equivalent word rewrites:

~~~text
[e1,e2]  -> [e2]
[e2,e1]  -> [e2]
~~~

under exact sequence-transformer equality.

This would subsume adjacent duplicate elimination as the equality case.

## Falsifier

Search for a state where:

1. e1 removes something that lets e2 remove more than e2 alone; or
2. e1 removes something after e2 that e2 could not have removed.

Support inclusion predicts both are impossible because e2 matches every e1-removable type and saturation is exhaustive.

**Current disposition:** HIGH-VALUE CANDIDATE.

---

# 6. Lead L5 — dominance-aware subsequence basis

The complete solution language is already upward closed under raw symbol insertion.

A9 adds upward closure under symbol replacement by susceptibility dominators.

Define generalized word preorder:

~~~text
u <=Msub v
~~~

iff u=a_1...a_m embeds at strictly increasing positions of v=b_1...b_n with:

~~~text
a_t <=M b_(i_t)
~~~

for every embedded symbol.

Candidate theorem:

~~~text
u solves
AND
u <=Msub v
->
v solves.
~~~

Define B_M as the <=Msub-minimal solving raw words.

Expected consequences:

- B_M is finite;
- every solution lies above some B_M word;
- B_M plus the exact dominance preorder reconstructs the complete raw solution language;
- B_M can be strictly coarser than the raw-subsequence basis B_global.

This could be the smallest currently visible exact generator that preserves raw operator alternatives through an explicit expansion rule instead of storing every dominated variant.

**Current disposition:** HIGH-VALUE CANDIDATE.

---

# 7. Lead L6 — monotone partially ordered recognizer

On removed ideals:

~~~text
I -> R_e(I)
~~~

is extensive.

Therefore every transition in the exact ideal-state recognizer moves monotonically upward:

~~~text
I subseteq next(I).
~~~

Candidate exact consequences:

1. every directed cycle in the reachable ideal-state graph consists only of one repeated state;
2. nontrivial strongly connected components do not exist;
3. for every word transformer F_T, repeated application:

~~~text
I
subseteq F_T(I)
subseteq F_T^2(I)
...
~~~

stabilizes after at most |Q_NT| strict state changes;
4. every generated transformation is eventually idempotent.

A useful derived view is "partially ordered / aperiodic finite transition monoid".

The terminology is descriptive only; the exact monotone stabilization statements are the candidate semantic content.

**Current disposition:** HIGH-VALUE CANDIDATE.

---

# 8. Lead L7 — positive piecewise pattern representation

A9 proves:

~~~text
L_global
=
upward subsequence closure of finite B_global.
~~~

Therefore the complete solving language has the explicit finite form:

~~~text
union over b=[b1,...,bm] in B_global of

Sigma* b1 Sigma* b2 ... Sigma* bm Sigma*
~~~

where concatenation denotes ordered subsequence occurrence, not contiguous substring.

This is already implicit in A9 but DP exposes it as a derived pattern-language view.

Possible high-level correspondence:

~~~text
positive piecewise-test pattern language
~~~

No external taxonomy/theorem is imported by that label.

The exact content is simply the displayed finite union.

**Current disposition:** DERIVED VIEW; likely no new assertion body unless needed downstream.

---

# 9. Cross-lead synthesis

If L1-L6 qualify, the frozen problem has a compact structural ladder:

~~~text
rooted non-target precedence poset

+
effective operator susceptibility supports

->

meet-preserving idempotent phase closures

+
dominance absorption

->

monotone acyclic ideal-state action

->

upward solution language under
insertion + symbol dominance

->

finite dominance-aware minimal basis.
~~~

This connects phase algebra and language algebra directly.

It may be a more useful discovery representation than choosing only one of:

- dynamic state search;
- ordered layers;
- maximal paths;
- SCS decomposition.

---

# 10. A8 discrepancy / DP 0.8 research note

A8 initially contained a proof-support defect in maximal-path sufficiency.

The minimum causal repair replaced the invalid path-local/global-tau comparison with a bottleneck-path induction.

Post-repair observation:

~~~text
maximal-path characterization:
    survived

general set-valued path-cover reduction:
    survived

singleton ordinary-SCS reduction:
    survived

finite path-basis reduction:
    became sharper afterward.
~~~

Under the unqualified DP 0.8 clue-preserving terminology this is a repair-invariant structural clue.

This note does not make DP 0.8 qualified authority.

---

# 11. Priority for semantic admission

Investigate in this order:

1. L1 resistant-frontier formula;
2. L2 effective operator signature;
3. L3 meet-preserving closure + join counterexample;
4. L4 dominance absorption;
5. L5 dominance-aware word basis;
6. L6 monotone stabilization;
7. re-run DP over the admitted algebra.

Promotion rule:

Any exact result must be admitted through Core 0.19 support/provenance and, where it changes an identity result, re-evaluated under NEI 0.4.

No DP candidate is exact merely because it is elegant or familiar.
