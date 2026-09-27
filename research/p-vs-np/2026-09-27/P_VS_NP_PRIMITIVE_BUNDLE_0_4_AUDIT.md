# P versus NP primitive bundle 0.4 — corrective correctness audit

Status: CONFIRMED at research-audit level for the selected finite-control tape convention
Native artifact: research/p-vs-np/2026-09-26/P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
Bundle blob: c38de5674ffa568c1297e8383b48b2ed77de7756
Supersedes: P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg as current P-vs-NP primitive research authority
Core 0.20 qualification: NOT YET RUN
Official model-equivalence bridge: QU / unqualified

## 1. Defect found in bundle 0.3

Bundle 0.3 was not correct as an authoritative P-vs-NP primitive rendering.

The reusable transition-support predecessor PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_8.isg contained four bare, universally quantified machine-instance property blocks:

1. transition tuple typing against arbitrary Q,D;
2. terminal-state no-outgoing constraints on arbitrary D;
3. nonterminal totality against arbitrary Q,D;
4. deterministic uniqueness on arbitrary D.

Bundle 0.3 imported all four as global axioms.

The fourth block asserted for every raw transition relation D:

~~~text
D(q,a,q1,b1,m1)
AND
D(q,a,q2,b2,m2)

->
q1=q2
AND b1=b2
AND m1=m2.
~~~

The top P-vs-NP antecedent binds its nominal branching relation nD from that same raw relation carrier. Therefore bundle 0.3 forced nD to be functional before the implication was evaluated.

Since the consequent repeats the antecedent obligations and adds functional uniqueness, the antecedent witness could be reused as the consequent witness:

~~~text
dQ=nQ
dG=nG
dD=nD
dB=nB.
~~~

That trivialized the unresolved implication. Bundle 0.3 is therefore rejected as current authority.

The generic typing/totality formulas were also incorrectly scoped: one transition relation is not typed or total relative to every possible state-list parameter.

## 2. Corrective support successor

Created:

research/primitive-logic/PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_9.isg

0.9 removes exactly those four caller-specific property blocks.

It retains reusable primitive definitions for:

- raw state/symbol/movement/configuration data;
- role disjointness;
- configuration existence, field functionality and exact extensionality;
- input initialization;
- one-step tape semantics parameterized by a supplied transition relation;
- exact-n relational composition;
- bit-list recognition;
- polynomial-bound predicate expansion.

Machine-instance typing, halt closure, totality and optional functionality remain inside the truth-witness scope that owns Q/G/D.

## 3. Corrected bundle construction

Bundle 0.4 is bundle 0.3 with the four leaked transition-property blocks removed.

The top truth kernel remains exactly P_VS_NP_PRIMITIVE_TRUTH_KERNEL_0_4.isg.

Its own totality clause was already correct: it ranges over every represented read symbol a in the witness symbol list G, not only the three distinguished input/blank symbols.

## 4. Pinned dependency composition

| Layer | Blob |
|---|---|
| primitive logic kernel 0.1 | 2630336da5c4117a15a43c1dc0847536b33ed083 |
| primitive natural arithmetic 0.5 | fde4915b3a056430e0cb7a3a327e26abc1c7b09b |
| primitive finite data 0.5 | c0479ac1de1a1c8ff5737221133601618b1a56cf |
| primitive finite transition computation 0.9 | 160fa427e2bee87711f50776d04cf5b046f205cf |
| primitive truth kernel 0.4 | 14d9df85590b349be4b42b932bd317e719215ea3 |

Every semantic block from those natural/data/corrected-transition/truth layers is present in bundle 0.4. Module headers and derived-view metadata are intentionally omitted.

## 5. Fresh mechanical audit

~~~text
top-level blocks:             36
parenthesis residual:          0
scope-bracket residual:        0
negative delimiter depth:      none
free native variables:         0
DERIVED_VIEW_OF (^150020):     absent
generic machine ?Q parameter:  absent
generic D-determinism block:   absent
~~~

## 6. Branching versus functional distinction

Antecedent nD has scoped:

- transition tuple typing against nQ/nG;
- no outgoing transitions from positive/negative halt;
- at least one transition for every nonhalt state/read-symbol pair;
- no transition-output uniqueness condition.

Fresh native check:

~~~text
?nq1 occurrences: 0
?nq2 occurrences: 0
~~~

The antecedent can therefore represent genuine branching.

Consequent dD repeats those obligations and adds same-input transition-output uniqueness. The dq1/dq2 uniqueness variables occur only inside that consequent witness.

## 7. Constructive branching sanity witness

The corrected support admits the shape:

~~~text
Q = [start, positive-halt, negative-halt]
G contains blank, bit-0, bit-1

for each represented read symbol a:

    D(start,a,positive-halt,a,R)
    D(start,a,negative-halt,a,R)
~~~

The two transitions share current-state/read-symbol inputs and have distinct next states.

They meet branching typing/totality/halt conditions but violate functional uniqueness. Bundle 0.4 does not globally reject this shape.

This directly verifies that the 0.3 accidental all-D determinism is gone.

## 8. Exact truth-form reconstruction

The final native formula is:

~~~text
for every raw unary relation L:

    if there exists one fixed finite branching transition realization
    and one fixed polynomial bound witness
    whose positive terminal reachability equals L
    on every represented finite bit input
    and whose every branch halts within the bound,

    then there exists one fixed finite functional transition realization
    with a polynomial bound witness
    deciding the same L.
~~~

The same L is applied once in the antecedent input clause and once in the consequent input clause.

## 9. Quantifier-order audit

Machine/state/symbol/transition/bound witnesses are selected outside the universal input quantifier.

Polynomial exponent, coefficient and threshold witnesses are also fixed per machine witness.

The construction is therefore uniform rather than input-specific.

## 10. Finite-control and transition audit

For each witness:

- Q and G are represented finite lists;
- start/positive-halt/negative-halt are represented and pairwise distinct;
- every Q member is state-tagged;
- every G member is symbol-tagged;
- every transition tuple is typed against Q/G and one of the two movement values;
- halt states have no outgoing transition;
- every nonhalt state/read-symbol pair has at least one outgoing transition.

The one-step relation exactly implements the represented left/right tape-update cases.

Exact-n reachability is zero/successor relational composition.

## 11. Halting-bound audit

At the exact bound, every reachable configuration is positive halt or negative halt.

If any branch continued past the bound, its prefix at the bound would be nonterminal, contradicting that clause.

Early halting remains valid because halt states have no outgoing transition and therefore need not have an exact-bound continuation.

Thus the formula represents all-branch termination within the bound.

## 12. Polynomial-bound audit

Each bound graph is:

- total over the represented natural carrier;
- functional;
- eventually bounded by c*n^k.

The arithmetic operations route to primitive recursive arithmetic relations. There is no native polynomial-time label on the truth path.

## 13. Deterministic-subcase direction

A functional witness satisfies every branching-witness clause after forgetting uniqueness.

Thus the standard containment direction is structural:

~~~text
functional-polynomial realization
    ->
branching-polynomial realization.
~~~

The top implication represents only the unresolved reverse containment.

## 14. Primitive closure / NEI separation

The native bundle contains no semantic leaf for P, NP, SAT, NP-complete, algorithm, machine, decider, circuit or polynomial time.

The familiar NP subseteq P reading is derived from the primitive formula.

NEI result roles are absent. NEI remains a separately versioned identity layer.

## 15. Remaining authority boundary

This audit confirms bundle 0.4 relative to the selected finite-control tape convention and pinned primitive carrier interpretation.

It does not discharge the separate primitive bridge:

~~~text
selected primitive tape convention
    <- polynomially faithful ->
exact official P-vs-NP convention.
~~~

That remains QU_UNEXPANDED.

Permitted status:

~~~text
corrected P-vs-NP primitive IsoGraph:
    CONFIRMED at research-audit level

Core 0.20 qualification:
    NOT YET COMPLETE

official-model equivalence:
    QU / NOT YET PRIMITIVE-QUALIFIED

P = NP:
    OPEN

P != NP:
    OPEN
~~~

## 16. Disposition

~~~text
P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg:
    REJECTED AS CURRENT AUTHORITY
    preserved as historical defect evidence

P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg:
    CURRENT CORRECTED PRIMITIVE RESEARCH AUTHORITY
~~~
