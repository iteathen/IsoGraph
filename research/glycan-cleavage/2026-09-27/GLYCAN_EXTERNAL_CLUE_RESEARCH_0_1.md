# Glycan clue research — external structural correspondences and algorithm ideas 0.1

**Status:** external research / idea-generation report; prior art and candidate transfers are not IsoGraph semantic authority by themselves  
**Date:** 2026-09-27  
**Branch:** research/glycan-cleavage-primitive-20260927  
**Parent:** GLYCAN_DP07_CAMPAIGN_REPORT_0_1.md  
**Current exact internal surface:** G-IA001..G-IA303, G-N001..G-N116

## Purpose

Research external mathematical/computer-science structures that correspond to the strongest IsoGraph clues and may suggest better exact algorithms, lower bounds, state compression, or useful successor experiments.

The search deliberately distinguishes:

~~~text
external prior art
!=
proof that its theorem applies here

structural correspondence
!=
global identity

algorithmic inspiration
!=
complexity conclusion for this exact model
~~~

Where an external clue suggests a new exact theorem about the frozen glycan model, that theorem must be derived again from the represented IsoGraph support before admission.

---

# 1. Higman / generalized word embedding is an exact match to <=Msub

## External result

For a finite or otherwise well-quasi-ordered alphabet (Sigma, <=), finite words are well-quasi-ordered by generalized subword embedding:

- delete letters;
- replace retained letters by larger letters in the alphabet quasi-order.

This is Higman's lemma / generalized subword ordering.

A 2025 CALCO paper by Quentin Aristote studies exactly upward-closed word sets over a finite quasi-ordered alphabet and their finite bases / quasi-ordered automata.

Primary source:

https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.CALCO.2025.16

Useful stated results include:

- generalized subword order over a finite quasi-ordered alphabet is a WQO;
- every upward-closed language has a finite basis;
- with a suitable star-product intersection oracle, the minimal finite basis is computable;
- with suitable membership/equivalence queries, the minimal quasi-ordered automaton is learnable;
- upward-closed word languages over a finite quasi-ordered alphabet are regular.

## IsoGraph correspondence

The admitted glycan order:

~~~text
u <=Msub v
~~~

is exactly the same generalized word embedding shape:

- insertion of extra treatment symbols;
- replacement of a retained symbol by a susceptibility-dominating operator.

The alphabet quasi-order is:

~~~text
a <=M b
IFF
S*_a subseteq S*_b.
~~~

The solving language is already proved upward closed under this order.

Therefore the external WQO theory matches the internal B_M structure exactly at the order-language level.

## Ideas yielded

### Idea H1 — use WQO basis algorithms rather than length enumeration

Current internal proofs show B_M is finite using the stronger problem-specific bound:

~~~text
basis word length <= |Q_NT|.
~~~

External WQO theory suggests a different computational route:

~~~text
exact ideal-intersection oracle
->
compute B_M directly
without enumerating all words by length.
~~~

This is high priority.

### Idea H2 — learn the minimal quasi-ordered automaton

The 2025 active-learning construction suggests learning the minimal ordered recognizer for L_global rather than materializing every ideal/SIG state.

This automaton should correspond closely to the coarsest exact continuation-language quotient already represented by Q-G-SOLVE-LANGUAGE.

Potential payoff:

- smaller exact state graph;
- direct language equivalence/minimization;
- compact B_M extraction from minimal increasing accepting paths.

### Idea H3 — WQO generalization beyond finite enzyme alphabets

The current biochemical model uses finite EL.

Higman's theorem suggests the finite-basis phenomenon survives successor models with an infinite treatment alphabet whenever the treatment-dominance alphabet is itself a WQO and remains effective.

This is only a future-model clue.

---

# 2. Phase actions are classical nuclei on a finite frame

## External result

A nucleus on a frame is an inflationary, idempotent, finite-meet-preserving map.

The set of nuclei on a frame forms a frame.

Martin Escardo, "Joins in the Frame of Nuclei", Applied Categorical Structures 11(2), 2003:

https://www.cs.bham.ac.uk/~mhe/papers/hmj.pdf

Key facts relevant here:

- prenuclei are closed under composition;
- joins of nuclei are obtained through fixed-point closure / nuclear reflection;
- the join of a family can be characterized by the least common fixed-point equations;
- sets of inflationary maps on an inductive poset have least common fixed points.

## IsoGraph correspondence

A12 proves every enzyme phase action on the finite order-ideal lattice is:

~~~text
inflationary
monotone
idempotent
meet-preserving.
~~~

So the admitted phase transformer is exactly a nucleus in the standard algebraic sense.

This does not import locale/topological meaning.

It identifies an established algebraic toolbox for the already-proved operator laws.

## Ideas yielded

### Idea N1 — collapse arbitrary-repeat enzyme sets to one common closure

For a set Gamma of allowed enzymes, define:

~~~text
J_Gamma
=
join/common closure of {R_e | e in Gamma}.
~~~

On the finite ideal lattice, J_Gamma(I) is the least ideal above I fixed by every R_e in Gamma.

Operational interpretation candidate:

~~~text
J_Gamma(I)
=
maximal progress obtainable
by any finite word over Gamma.
~~~

Because the lattice is finite, a finite sequence of allowed treatments reaches that common fixed point.

This appears directly useful for the Higman/Valk-Jantzen star-product oracle below.

### Idea N2 — macro-action hierarchy

Instead of searching only raw enzymes, precompute useful joins:

~~~text
single enzyme nuclei
pair/common nuclei
selected family nuclei.
~~~

A macro nucleus summarizes arbitrary repetition/order over its enzyme set until common saturation.

Possible uses:

- exact lower bounds;
- preprocessing;
- star-block evaluation;
- identifying enzyme sets whose closure already reaches target;
- detecting redundant enzyme subsets.

### Idea N3 — common-fixed-point landmarks

For Gamma subset EL:

~~~text
J_Gamma(bottom)=top
~~~

means some finite Gamma-only treatment sequence solves.

Minimal Gamma with this property form exact "enzyme-set landmarks" for distinct enzyme types, independent of phase multiplicity.

This may give a lower bound / preprocessing layer distinct from treatment-count optimization.

---

# 3. A star-product intersection oracle may be available almost for free

## External requirement

The generalized Valk-Jantzen result for word WQOs uses ideals called star-products.

For finite quasi-ordered Sigma, a star-product is a finite concatenation of atoms:

~~~text
sigma?
or
Gamma*
~~~

where:

- sigma? permits epsilon or one letter <= sigma;
- Gamma is a nonempty downward-closed subset of the alphabet;
- Gamma* permits arbitrary finite words over Gamma.

The 2025 CALCO paper states:

~~~text
if an oracle decides
U intersection P != empty
for every star-product ideal P,

then a minimal finite basis of
upward-closed U is computable.
~~~

## Glycan-specific candidate oracle

Let U=L_global.

For a star-product P, evaluate its atoms left to right from the current removed ideal.

### Optional atom sigma?

Use:

~~~text
I <- R_sigma(I).
~~~

Reason:

- choosing epsilon and then inserting sigma cannot hurt solvability;
- choosing a weaker sigma'<=sigma can be upgraded to sigma;
- sigma itself belongs to sigma?.

So R_sigma gives the maximal progress realizable inside the optional atom.

### Repeat block Gamma*

Use:

~~~text
I <- J_Gamma(I),
~~~

the least common fixed point of all phase nuclei in Gamma above I.

Reason:

- any Gamma-word is allowed;
- extra Gamma treatments cannot hurt;
- finite monotone closure reaches J_Gamma;
- J_Gamma is itself reachable by a finite Gamma-word on the finite lattice.

### Candidate decision rule

After all atoms:

~~~text
U intersection P != empty
IFF
the maximal-progress evaluation reaches top.
~~~

## Finite falsification

A private exhaustive sanity model checked this rule on:

~~~text
n = 1..3 non-target nodes
all acyclic edge subsets
all support assignments for two operators
all downward-closed operator subsets
two-atom star-products
star expansions through the finite stabilization bound
~~~

Cases:

~~~text
9,582
~~~

Mismatches:

~~~text
0
~~~

This is not yet an admitted IsoGraph theorem, but it is the highest-value algorithmic candidate from the external research.

## Why it matters

If admitted, the existing exact system would provide precisely the oracle required by generalized Valk-Jantzen.

That yields a principled direct route to B_M.

---

# 4. WSTS / antichain backward search matches the state geometry

## External result

Well-structured transition system theory represents upward-closed state sets by their finite minimal bases and performs exact backward coverability from a target.

Representative background:

- A. Finkel / WSTS literature;
- overview and finite-basis discussion:
  https://lsv.ens-paris-saclay.fr/Publis/PAPERS/PDF/bonnet-phd13.pdf

Core structural pattern:

~~~text
monotone transition system
+
well-quasi-order
+
upward-closed goal
->
backward sets represented by minimal antichains.
~~~

## IsoGraph correspondence

The glycan removed-state lattice is finite.

Transitions are extensive:

~~~text
I subseteq R_e(I).
~~~

Goal is the top ideal.

If an ideal I can reach target within k phases, every larger ideal can as well.

Therefore:

~~~text
Win_k
=
states solvable within <=k phases
~~~

is upward closed and has a minimal antichain basis.

## New exact candidate discovered during research

Because R_e is meet-preserving on a finite lattice, it is a right adjoint.

Its left adjoint / exact principal predecessor candidate has an explicit form.

For goal threshold ideal J define:

~~~text
P_e(J)
=
downward_closure(
    J intersection N_e
).
~~~

Candidate exact law:

~~~text
J subseteq R_e(I)
IFF
P_e(J) subseteq I.
~~~

Equivalently:

~~~text
Pre_e(upward_closure(J))
=
upward_closure(P_e(J)).
~~~

Interpretation:

> To guarantee J is removed after one e phase, the only members of J that must already be removed are its e-resistant members and everything below them.

## Finite falsification

Exhaustive check:

~~~text
8,512
~~~

poset/ideal/support predecessor cases.

Mismatches:

~~~text
0
~~~

A second exhaustive check compared:

- ordinary forward shortest-path optimum;
- backward antichain recurrence using P_e.

Cases:

~~~text
16,932
~~~

Optimum mismatches:

~~~text
0
~~~

## Algorithm idea W1 — exact backward boundary DP

Initialize:

~~~text
B_0 = { top ideal }.
~~~

Iterate:

~~~text
candidates
=
B_k
union
{ P_e(J) |
  J in B_k,
  e in EL }

B_(k+1)
=
inclusion-minimal candidates.
~~~

The first k at which the bottom ideal is in the winning upset is exactly OPT.

Store predecessor/enzyme provenance to reconstruct every optimum word.

This may be dramatically smaller than forward state enumeration when the minimal backward boundary is small.

## Algorithm idea W2 — bidirectional antichain search

Run:

- forward exact ideal/SIG search;
- backward minimal winning antichain regression.

Meet in the middle using containment:

~~~text
forward I
can connect to backward threshold J
when
J subseteq I.
~~~

This could exploit the asymmetry between easy forward phase closure and simple backward regression.

---

# 5. Singleton susceptibility is exactly in the PCCSP family

## External result

The precedence-constrained class sequencing problem (PCCSP) has:

- operations;
- one fixed class per operation;
- precedence constraints;
- a class execution that performs as many currently possible operations of the selected class;
- objective: minimize class switches / class sequence length.

Bürgy, Baptiste, Hertz:
"An exact dynamic programming algorithm for the precedence-constrained class sequencing problem",
Computers & Operations Research 124 (2020), 105063.

https://doi.org/10.1016/j.cor.2020.105063

The paper explicitly describes class-sequence execution as:

~~~text
select next class
perform as many operations as possible
limited only by precedence.
~~~

It develops:

- state merging;
- lower bounds;
- precedence reasoning;
- dominance;
- immediate-selection rules;
- greedy/altruistic/critical-path heuristics;
- exact dynamic programming.

It also reports prior complexity results:

- PCCSP is NP-hard;
- with at least three classes it is strongly NP-hard even when the precedence graph is a disjoint union of paths;
- no constant-factor polynomial approximation exists unless P=NP.

## IsoGraph correspondence

The singleton-susceptibility glycan subclass has:

~~~text
one enzyme class per non-target type
descendant-before-ancestor precedence
select one enzyme
saturate every currently possible node of that class
minimize treatment phases.
~~~

This is the same class-sequence saturation shape, with objective offset only depending on whether one counts initial setup versus class-run count.

The earlier singleton-SCS theorem is consistent with the PCCSP literature, which also records non-repetitive SCS as a special case.

## Ideas yielded

### Idea P1 — port the PCCSP exact DP as a baseline

For singleton susceptibility, implement their class-sequence DP directly against the IsoGraph quotient.

This gives:

- an external exact baseline;
- benchmark cases;
- known state-merging rules;
- lower bounds;
- branching heuristics.

### Idea P2 — generalize PCCSP procedures to set-valued susceptibility

Our model is richer because one type can accept several enzymes.

Generalize:

~~~text
fixed class
->
eligible class set E_q.
~~~

The DP should branch on treatment action, saturate with A12's exact nucleus, then apply:

- dominance e1<=M e2;
- B_M boundary logic;
- path SEG / path bases;
- backward antichain bounds.

### Idea P3 — stop looking for a generic polynomial exact algorithm

The singleton subclass already intersects a strongly NP-hard scheduling family.

That makes structural exact search, parameterization, lower bounds, and quotienting more realistic targets than a universal polynomial shortcut.

A formal complexity transfer would still require writing the exact reduction carefully and citing the external hardness theorem.

---

# 6. Positive piecewise-testable / ordered-automata theory fits the language

## External result

Classical positive piecewise-testable languages are finite unions of:

~~~text
Sigma* a1 Sigma* a2 ... Sigma* ak Sigma*
~~~

and correspond to ordered automata with extensive actions.

Reference:

"On Varieties of Ordered Automata", section on extensive actions / positive piecewise-testable languages.

Recent quasi-ordered-automata work generalizes the setting to a finite alphabet equipped with a nontrivial quasi-order.

## IsoGraph correspondence

A14 already gives exactly:

~~~text
L_global
=
finite union over B_M of

Sigma*
UP(a1)
Sigma*
UP(a2)
...
Sigma*
UP(am)
Sigma*.
~~~

Its exact ideal-state recognizer has extensive transitions:

~~~text
I <= R_e(I).
~~~

This is not just a vague automata analogy.

It explains why:

- accepting language is upward closed;
- the transition graph is partially ordered;
- finite minimal positive patterns exist;
- the coarsest continuation-language automaton should be particularly natural.

## Idea A1 — minimize the exact ordered recognizer

Construct only reachable ideal states, then minimize by exact continuation language.

Compare resulting canonical residual classes against:

- Q-G-STATE;
- Q-G-SOLVE-LANGUAGE;
- SIG;
- resistance-frontier antichains.

This directly measures how much state compression remains beyond the current structural quotients.

## Idea A2 — learn instead of construct

Use exact membership queries from A13's resistance-chain recognizer.

If an equivalence/star-product oracle is implemented, use quasi-ordered active learning to discover the minimal recognizer without constructing the full state lattice.

---

# 7. Delete-free planning suggests admissible lower bounds

## External result

Delete-free planning contains only add effects.

Optimal delete-free planning is still difficult; planning research uses action landmarks and minimum hitting sets for exact/admissible lower bounds.

Representative:

Haslum, Slaney, Thiebaux,
"Minimal Landmarks for Optimal Delete-Free Planning".

Their method iteratively generates disjunctive action landmarks and solves a minimum-cost hitting-set problem.

## IsoGraph correspondence

The removed-ideal view is delete-free:

~~~text
facts = removed types
actions only add removed facts
goal = every non-target type removed.
~~~

Immediate exact landmarks include:

~~~text
for every non-target q:
    at least one treatment from E_q
    must occur in every solution.
~~~

Path/layer constraints provide stronger ordered versions.

## Ideas yielded

### Idea L1 — landmark/hitting-set lower bound

Use exact required enzyme sets E_q as disjunctive landmarks.

Minimum hitting-set size gives a lower bound on distinct treatment labels and therefore a weak lower bound on treatment count.

Strengthen with:

- path segmentation;
- resistant-chain constraints;
- PCCSP pair/class bounds.

### Idea L2 — generate violated landmarks from a failed candidate set

Given a candidate set of allowed enzymes Gamma, compute the common nucleus J_Gamma(bottom).

If target is not reached, extract surviving resistance frontier.

That frontier identifies a new exact constraint on the action set.

This resembles on-the-fly minimal landmark generation but uses the glycan-specific closure algebra.

---

# 8. Degenerate/indeterminate-string SCS is relevant to set-valued path constraints

## External result

Indeterminate/degenerate strings allow a set of symbols at one position.

Prior work develops finite-automata methods for subsequence and supersequence problems, including SCS:

Iliopoulos, Rahman, Vorácek, Vagner,
"Finite automata based algorithms on subsequences and supersequences of degenerate strings",
Journal of Discrete Algorithms 8(2), 2010.

https://doi.org/10.1016/j.jda.2008.10.004

## IsoGraph correspondence

A maximal glycan path before block compression has a set-valued treatment label E_q at each position.

This is close to an indeterminate string.

The complication is glycan same-phase cascade:

~~~text
several consecutive positions
may consume one treatment symbol
when their E_q intersection is nonempty.
~~~

A10 already resolves this by generating finite block-pattern bases.

## Idea S1 — use indeterminate-string automata before explicit basis expansion

Investigate whether automata from degenerate-string SCS can consume:

- set-valued path positions;
- run/block common-intersection collapse;

directly.

Potential payoff: avoid explicit enumeration of every path block pattern before forming the global SCS product.

---

# 9. Monotone Boolean / hypergraph dualization may help boundary enumeration

## External result

Minimal TRUE points of monotone Boolean functions and minimal hypergraph transversals are classic dualization objects.

Representative:

Boros et al., work on monotone dualization / minimal hypergraph transversals.

The literature develops quasi-polynomial duality tests and output-sensitive enumeration methods for several settings.

## IsoGraph correspondence

B_M is the minimal TRUE boundary, but over a word WQO rather than a Boolean subset lattice.

So direct hypergraph-transversal algorithms do not automatically apply.

However several bounded projections do become set systems:

- enzyme-set solvability via common nuclei;
- disjunctive landmarks E_q;
- one ordered layer's common susceptibility;
- fixed-length treatment-position choices.

## Idea D1 — use hypergraph dualization only on the set-valued subproblems

Do not flatten word order globally.

Instead apply transversal methods to:

- minimal enzyme subsets whose common closure solves;
- per-layer compatibility;
- landmark lower bounds.

Keep sequence order in the outer DP.

---

# 10. Prioritized experiments

## Experiment R1 — prove and implement exact backward antichain DP

Highest confidence / lowest conceptual risk.

Tasks:

1. formally admit:
   Pre_e(up J)=up down(J intersection N_e);
2. implement backward basis recurrence;
3. compare state counts and time against forward BFS;
4. retain all optimum-parent edges for complete optimum-word enumeration.

Controls:

- random small exhaustive instances;
- singleton PCCSP instances;
- A8 branch-order-conflict witness;
- nonadjacent operator-reuse witness.

## Experiment R2 — prove star-product oracle

Tasks:

1. prove optional atom sigma? collapses to R_sigma for existence;
2. prove Gamma* collapses to common nucleus J_Gamma;
3. prove atomwise maximal progress preserves existence of a solving member of the star-product;
4. compare oracle with exhaustive star-product enumeration on small instances.

Existing preliminary sanity:

~~~text
9,582 cases
0 mismatches.
~~~

## Experiment R3 — compute B_M with generalized Valk-Jantzen / active learning

After R2:

- use exact star-product intersection oracle;
- compute minimal basis B_M without breadth-first word enumeration;
- compare basis generation cost against A14 bounded enumeration;
- optionally learn the minimal quasi-ordered automaton.

## Experiment R4 — singleton PCCSP baseline

Build exact mapping and run the published PCCSP-style DP ideas:

- merging;
- lower bounds;
- precedence reasoning;
- immediate selection;
- heuristics.

Then extend each technique to set-valued susceptibility.

## Experiment R5 — backward/forward hybrid

Use:

~~~text
forward:
    exact nucleus actions

backward:
    predecessor adjoints / minimal winning antichains
~~~

Search bidirectionally and join on ideal containment.

## Experiment R6 — nucleus macro-actions

For selected Gamma subsets:

- compute J_Gamma;
- test whether macro closures improve bounds/search;
- generate minimal enzyme-set landmarks;
- test pair/group closures suggested by operator dominance or frequent co-use.

---

# 11. Current ranking

### Tier 1 — likely immediately useful

1. backward antichain DP with explicit predecessor adjoint;
2. star-product oracle + Valk-Jantzen basis computation;
3. PCCSP exact-DP transfer for singleton and generalized eligibility sets.

### Tier 2 — likely useful after Tier 1

4. minimal quasi-ordered automaton / active learning;
5. nucleus joins as macro-actions and enzyme-set landmarks;
6. planning landmark/hitting-set lower bounds.

### Tier 3 — specialized supporting ideas

7. degenerate-string SCS automata;
8. hypergraph dualization on set-only projections;
9. external formal-language classification / canonical monoid analysis.

---

# 12. External-novelty discipline

The following are established external structures and must not be called novel:

- nuclei / frame of nuclei;
- Higman generalized subword WQO;
- finite bases of upward-closed WQO sets;
- Valk-Jantzen basis computation framework;
- quasi-ordered active automata learning;
- PCCSP and its exact DP / hardness literature;
- delete-free planning landmarks;
- degenerate-string SCS algorithms;
- monotone Boolean dualization.

Potentially project-specific synthesis requiring broader novelty review:

~~~text
glycan phase nuclei
+
Higman dominance word order
+
resistance-chain membership oracle
+
nucleus-join star-product oracle
+
Valk-Jantzen B_M extraction

and

explicit principal backward predecessor:
    down(J intersection N_e)
+
antichain shortest-treatment DP.
~~~

No external novelty claim is made here.
