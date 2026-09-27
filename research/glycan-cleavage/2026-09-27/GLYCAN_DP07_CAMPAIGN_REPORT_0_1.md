# Glycan Discovery Protocol campaign report 0.1

**Status:** qualified DP 0.1–0.7 operational stop reached for frozen 0.1 scope
**Date:** 2026-09-27
**Branch:** research/glycan-cleavage-primitive-20260927
**Primitive baseline:** GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
**Primitive verification:** Experiment 032 PASS, run 36345374241
**Pre-DP fixed point:** GLYCAN_IMPLICIT_NEI_FIXED_POINT_0_1.md
**Discovery authority:** qualified cumulative DP 0.1–0.7
**Identity authority where used:** qualified NEI 0.4
**Unknown authority where used:** qualified QU 0.1
**DP 0.8 status:** unqualified successor; referenced only for the A8 clue-preserving discrepancy note, not used as semantic authority

## Campaign sequence

~~~text
pre-DP exact graph:
    G-IA001..G-IA257
    G-N001..G-N093

DP run 0.1
    -> phase algebra / effective action leads
    -> A12 exact admission
    -> finite sanity check
    -> NEI12

DP run 0.2
    -> resistant-chain duality
    -> A13 exact admission
    -> 507,960-case finite sanity check
    -> NEI13

DP run 0.3
    -> minimal-generating boundary
    -> A14 exact admission
    -> NEI14

DP run 0.4
    -> residual/lower-ranked protocol sweep
    -> 0 new high-value surviving leads
    -> operational DP stop
~~~

Current semantic research surface:

~~~text
implicit assertions:
    G-IA001..G-IA303

NEI assertions:
    G-N001..G-N116
~~~

The DP-fed ranges are contiguous:

~~~text
new implicit:
    G-IA258..G-IA303
    46 definitions

new NEI:
    G-N094..G-N116
    23 definitions

missing new definitions:
    0

duplicate new definitions:
    0

references beyond admitted range:
    0
~~~

---

# 1. Phase operation collapsed to a resistant-frontier formula

Let Qraw be the raw non-target descendant poset.

For operator e:

~~~text
S*_e
=
non-target sites susceptible to e

N_e
=
Qraw minus S*_e.
~~~

For active non-target filter A, one exhaustive phase is exactly:

~~~text
D_e(A)
=
upward_closure(
    A intersection N_e
).
~~~

Interpretation:

> One treatment removes the entire currently active e-susceptible fringe and stops exactly at resistant blockers.

This eliminates microscopic fixed-point iteration from the derived phase representation.

Finite sanity check:

~~~text
8,512 phase cases
0 mismatches.
~~~

---

# 2. Phase closure has a sharper lattice algebra

On removed-node order ideals I:

~~~text
R_e(I)
=
Qraw minus
upward_closure(
    (Qraw minus I) intersection N_e
).
~~~

Exact laws:

~~~text
extensive
monotone
idempotent

R_e(I intersection J)
=
R_e(I) intersection R_e(J).
~~~

So each phase is a **meet-preserving closure operator** on the finite ideal lattice.

The stronger join law is false in general.

Exact negative control:

- susceptible parent p;
- two resistant children a,b;
- I={a};
- J={b}.

Then:

~~~text
R_e(I)=I
R_e(J)=J

but

R_e(I union J)
=
{a,b,p}.
~~~

Thus DP exposed both the algebra and its precise boundary.

Finite meet-preservation checks:

~~~text
71,804
mismatches: 0.
~~~

---

# 3. Effective susceptibility exactly classifies one-phase behavior

The source M relation may contain tuples on retained target sites.

Those tuples are real source data but cannot affect treatment dynamics because target membership independently forbids their deletion.

Define effective susceptibility only on non-target sites:

~~~text
S*_e
=
{ r in RL minus TG |
  M(e,r) }.
~~~

Exact theorem:

~~~text
S*_e1 = S*_e2

IFF

C_e1(S)=C_e2(S)
for every valid state S.
~~~

Thus:

~~~text
effective susceptibility SAME
IFF
phase-transformer SAME
IFF
ideal-action SAME.
~~~

This is stronger than the earlier sufficient full-vector criterion.

Susceptibility differences only on TG are objective residuals in version 0.1.

They are not deleted from source provenance.

Finite converse search:

~~~text
62,236 transformer/state comparisons
distinct supports with no separator: 0.
~~~

---

# 4. Operator dominance becomes two-sided absorption

Define:

~~~text
e1 <=M e2
IFF
S*_e1 subseteq S*_e2.
~~~

This is exactly equivalent to pointwise phase-removal dominance.

More strongly:

~~~text
R_e2(R_e1(I))
=
R_e2(I)

R_e1(R_e2(I))
=
R_e2(I).
~~~

Therefore:

~~~text
[e1,e2]
[e2,e1]
[e2]
~~~

are exact sequence-transformer equivalents whenever e1 <=M e2.

Adjacent duplicate elimination is the equality special case.

Finite dominance-absorption checks:

~~~text
42,405
mismatches: 0.
~~~

Strict dominance remains DISTINCT effective action, not NEI SAME.

---

# 5. The complete language has a smaller dominance-aware basis

Earlier closure produced B_global:

~~~text
all raw subsequence-minimal solving words.
~~~

DP combines insertion monotonicity with operator dominance.

Define:

~~~text
u <=Msub v
~~~

when u embeds into v as a subsequence and every embedded symbol of u is susceptibility-dominated by its matched symbol in v.

Exact monotonicity:

~~~text
u solves
AND
u <=Msub v
->
v solves.
~~~

Define:

~~~text
B_M
=
the <=Msub-minimal solving raw words.
~~~

DP-fed admission proves:

~~~text
B_M subseteq B_global

B_M
=
the <=Msub-minimal elements
of B_global.
~~~

B_M is finite and uniquely determined by:

~~~text
(L_global, <=Msub).
~~~

Exact complete-language reconstruction:

~~~text
T solves
IFF
exists B in B_M:
    B <=Msub T.
~~~

Thus B_M is the unique minimal TRUE boundary of the treatment-language decision function under the combined insertion/dominance order.

---

# 6. Finite set-valued pattern expression

For raw operator a define:

~~~text
UP(a)
=
{ b in EL |
  S*_a subseteq S*_b }.
~~~

For:

~~~text
B=[a_1,...,a_m],
~~~

the expansion condition:

~~~text
B <=Msub T
~~~

means T contains, in order, one symbol from:

~~~text
UP(a_1),...,UP(a_m).
~~~

Therefore:

~~~text
L_global
=
union over B in B_M of

Sigma*
UP(a_1)
Sigma*
UP(a_2)
...
Sigma*
UP(a_m)
Sigma*.
~~~

This is an exact finite complete-language representation.

It does not require storing every raw dominated variant as a separate generator.

The complementary failing region is a <=Msub downset.

No symmetric finite maximal-FALSE basis is implied.

---

# 7. Negative dual: resistant-chain failure certificate

Reapplying DP to the resistant-frontier formula produced a dual exact characterization.

For word:

~~~text
T=[e_1,...,e_k],
~~~

define:

~~~text
B_1=N_(e_1)

B_(i+1)
=
N_(e_(i+1))
intersection
upward_closure(B_i).
~~~

Then after prefix i:

~~~text
active non-target state
=
upward_closure(B_i).
~~~

A word fails exactly when:

~~~text
B_k is nonempty.
~~~

Equivalent resistant-chain theorem:

~~~text
T fails
IFF
there exist
q_1 <=P q_2 <=P ... <=P q_k
with
q_i resistant to e_i
for every treatment position.
~~~

Equality between successive q_i is allowed.

One resistant site may survive several consecutive treatments.

Finite sanity campaign:

~~~text
507,960 cases
operational/recurrence mismatches: 0
classification mismatches:        0.
~~~

---

# 8. Boolean relation-product formulation

Let:

~~~text
R_P
=
reflexive descendant-before-ancestor relation

D_e
=
identity relation restricted to N_e.
~~~

Then:

~~~text
T fails
IFF

D_(e_1)
;
R_P
;
D_(e_2)
;
R_P
;
...
;
D_(e_k)

is nonempty.
~~~

And:

~~~text
T solves
IFF
that relation product is empty.
~~~

This gives an exact algebraic rejection interface.

Dense matrices are not required; bitsets, sparse relations, or antichains are implementation choices.

---

# 9. Exact positive / negative certificate duality

Positive A8/A10 side:

~~~text
T solves
IFF
every maximal non-target path
has a susceptibility-cover embedding.
~~~

Negative A13 side:

~~~text
T fails
IFF
one treatment-position-spanning
resistant chain exists.
~~~

The positive and negative witness families are not NEI SAME.

Their quantifier structures differ:

~~~text
positive:
    for every maximal path
    exists coverage witness

negative:
    exists one resistant chain.
~~~

Both descend to the same primitive P/M/TG authority.

---

# 10. Monotone finite action

On removed ideals:

~~~text
I --e--> R_e(I)
~~~

always moves upward:

~~~text
I subseteq R_e(I).
~~~

Therefore the exact ideal-state transition graph has no nontrivial directed cycle.

Every strongly connected component is one state plus possible self-loops.

For any finite treatment word T, its induced transformer F_T is extensive/monotone.

Repeated application yields:

~~~text
I
subseteq F_T(I)
subseteq F_T^2(I)
...
~~~

and stabilizes after finitely many strict additions, bounded by the finite non-target carrier.

Thus every generated word action is eventually idempotent.

A derived high-level description is a partially ordered / aperiodic finite action.

The exact monotone-stabilization statements are authoritative; the label is not.

---

# 11. Relationship to the earlier SCS discovery

Pre-DP implicit closure had already reached:

### General set-valued model

Exact finite disjunction of ordinary common-supersequence subproblems generated by finite path-pattern bases.

### Singleton-susceptibility subclass

Exactly one ordinary shortest-common-supersequence problem on run-compressed maximal-path label words.

DP does not replace those views.

It adds another complete-language compression:

~~~text
B_M
+
effective operator dominance
~~~

and the exact negative resistant-chain algebra.

These are overlapping derived views with different search value.

---

# 12. Falsifiers and preserved residuals

The campaign explicitly retains:

- arbitrary operators do not commute;
- nonadjacent reuse of an operator may be necessary;
- max path SEG need not equal OPT;
- phase closure is not join-preserving;
- strict operator dominance is not identity;
- target-site susceptibility is source-real but objective-irrelevant;
- maximal-operator restriction preserves value/existence, not the complete raw witness family;
- B_M and B_global need not be the same raw set;
- positive and negative certificate families are not the same identity object;
- the unrestricted model is not one ordinary SCS instance;
- no generic greedy optimum theorem is admitted;
- no polynomial-time conclusion is admitted.

These residuals are part of the result.

---

# 13. A8 clue-preserving repair

During the pre-DP closure campaign A8's first maximal-path sufficiency proof contained a local support defect.

The minimum repair replaced the invalid path-local/global-tau comparison with a bottleneck-path induction.

After repair:

~~~text
maximal-path characterization:
    survived

general set-valued path cover:
    survived

singleton SCS:
    survived

finite path bases:
    became sharper

disjunctive SCS:
    became sharper.
~~~

The anomaly therefore exposed a clue that survived repair.

This is consistent with the unqualified DP 0.8 clue-preserving doctrine.

DP 0.8 is not promoted or treated as qualified semantic authority here.

---

# 14. Final qualified-DP residual sweep

Run 0.4 explicitly checked the relevant lower-ranked protocol families:

- invariants;
- transformation invariants;
- duality;
- complement/exclusion;
- fixed-point/recurrence;
- composition;
- reconstruction/redundancy;
- proof/witness topology;
- partial orders;
- conservation;
- special cases;
- exception boundaries;
- equivalent closure systems;
- semantic identity candidates;
- QU/open structure.

Result:

~~~text
new high-value lead:
    0

new semantic admission required:
    0

new NEI query required:
    0

new QU region required:
    0

unresolved contradiction:
    0
~~~

This is the operational DP stop condition for frozen 0.1.

It is not universal discovery completeness.

---

# 15. Remaining research boundary

Remaining work would require a different objective or new evidence, not merely another pass over the same fixed structure:

1. algorithm/accessibility analysis of B_M, path bases, tau, or relation products;
2. benchmark engineering for concrete instances;
3. external prior-art/novelty review;
4. successor biochemical model with QU-bearing uncertainty;
5. Core 0.20 qualification;
6. a separately proved canonical rewrite/normal-form system if useful.

No external novelty claim has been made.

---

# 16. Current campaign routing

Use together:

- GLYCAN_DP07_RUN_0_1.md
- GLYCAN_DP_IMPLICIT_ADMISSIONS_A12_0_1.md
- GLYCAN_DP_PHASE_ALGEBRA_SANITY_0_1.md
- GLYCAN_NEI_SCOPE_CONTRACT_0_4.md
- GLYCAN_NEI_PASS_12_0_1.md
- GLYCAN_DP07_RUN_0_2.md
- GLYCAN_DP_IMPLICIT_ADMISSIONS_A13_0_1.md
- GLYCAN_DP_RESISTANCE_CHAIN_SANITY_0_1.md
- GLYCAN_NEI_SCOPE_CONTRACT_0_5.md
- GLYCAN_NEI_PASS_13_0_1.md
- GLYCAN_DP07_RUN_0_3.md
- GLYCAN_DP_IMPLICIT_ADMISSIONS_A14_0_1.md
- GLYCAN_NEI_SCOPE_CONTRACT_0_6.md
- GLYCAN_NEI_PASS_14_0_1.md
- GLYCAN_DP07_RUN_0_4_NO_NEW.md
- this report.

Predecessor A1-A11/NEI1-NEI11 and the A8 correction remain load-bearing provenance.
