# Continuation-Support Reductions for Bounded Existential Computation: A Structural Synthesis of Pruning, Quotienting, and Factorization

**Joshua Oshiro**

**Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.**

**IsoGraph Project research publication — revision 0.1**

**Local publication date:** 2026-09-27 (America/Los_Angeles)  
**Repository baseline for cited research artifacts:** main@84e2f4d2386f9cd1a7b2c533752600eee82e44bf  
**License:** CC BY 4.0  
© 2026 Joshua Oshiro.

The original text, analysis, diagrams, and explanatory material in this paper are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. Referenced source code, repository contents, third-party publications, trademarks, and externally owned materials retain their respective licenses and ownership.

---

## Abstract

This paper gives a structural synthesis of several established techniques for bounded existential computation by placing them over a single semantic object: the set of accepting continuations available from a residual prefix. For a fixed input and verifier, each residual \(p\) is assigned a continuation support \(C_p\) consisting of the admissible suffixes that complete \(p\) to acceptance.

On this common object, familiar reductions become directly comparable. Empty support may be deleted. Equal support may be merged. Included support may be pruned by one-way dominance. Remaining mutually live and incomparable support may still admit exact factorization or sharing. When the consumer needs only a coarser observable, the full support may be replaced by an exact aggregate sufficient for that objective.

The individual mechanisms are not presented as new. Future-language equivalence is in the Myhill–Nerode lineage; simulation, language inclusion, antichains, and dead-state removal are established automata techniques; and knowledge compilation already separates representation succinctness from the polynomial-time queries and transformations a representation supports. Boolean functional-synthesis work goes further by identifying normal forms such as SynNNF and SAUNF that support efficient synthesis under specific representation conditions.

The contribution here is primarily a synthesis and boundary analysis. We formalize a continuation-support reduction ladder, show how sound incomplete negative evidence can reduce simulation obligations without requiring exact liveness classification, and give an explicit CNF family demonstrating that perfect dead-support filtering can leave every branching choice live while one exact representation still expands exponentially. The same projected function has a compact exact alternate factorization. This establishes a methodological firewall: fixed-representation blowup is not a representation-independent lower bound, and compactness is not algorithmically useful unless construction and subsequent exact operations remain accessible.

No result in this paper resolves P versus NP. The paper instead isolates a research burden shared by several established approaches: construct and maintain an exact, polynomial-size representation of surviving existential support under repeated projection while preserving polynomial-time access to the next required operation.

---

## 1. Introduction

Many approaches to existential computation look different because they are described in different mathematical languages.

Automata theory speaks about states, simulations, language inclusion, and antichains. Knowledge compilation speaks about target representation languages, succinctness, queries, transformations, forgetting, and quantification. Boolean functional synthesis asks whether relational specifications can be converted into representations from which Skolem functions can be extracted efficiently. Search procedures speak about pruning, memoization, abstractions, and factorization.

The IsoGraph P-versus-NP research campaign reduced these descriptions to a common primitive question. For one fixed input and one polynomially bounded existential witness process, what information about the remaining accepting completions of a partial witness must be retained, and in what form, to preserve the final Boolean objective?

The resulting semantic center is simple.

For each residual prefix \(p\), associate the set \(C_p\) of admissible suffixes that complete \(p\) to acceptance.

Once that object is explicit, several familiar operations become relations on the same family:

~~~text
C_p = empty
    deadness

C_p = C_q
    future equivalence

C_p subseteq C_q
    one-way dominance

C_p union C_q
    aggregation / existential combination

compact representation of unions
    factorization / sharing

observable h(C_p)
    objective projection
~~~

The point is not that these notions are new. They are not.

The useful observation is that they can be organized as different ways of reducing or representing the same continuation support, and therefore can be evaluated under a common set of obligations:

~~~text
semantic preservation
construction cost
retained representation size
next-operation cost
progress across the bounded existential depth
~~~

This perspective blocks several tempting but invalid inferences.

A quotient with two semantic values can still be computationally difficult to classify.

An exponentially large CNF produced by one elimination strategy is not a lower bound on all equivalent representations.

A compact representation is not sufficient if the next exact projection requires expanding it.

Exact future equivalence is stronger than the one-way inclusion needed for safe pruning.

A sound incomplete certificate can be useful even when a complete semantic classifier would simply restate the original hard problem.

The paper develops these points formally, connects them to established literature, and reports one project-local CNF falsifier that sharply separates dead-support pruning from factorization.

The intended contribution is modest:

1. a common continuation-support semantics for several established reduction mechanisms;
2. exact elementary preservation lemmas clarifying which relation is sufficient for which reduction;
3. a dead-filtered simulation theorem using sound incomplete negative certificates;
4. an explicit representation-relative blowup/factorization counterexample;
5. an accessibility checklist preventing semantic compactness from being confused with an efficient algorithm.

The paper does **not** claim a new P-versus-NP theorem, lower bound, or general tractability characterization.

---

## 2. Scope and relationship to P versus NP

The motivating IsoGraph campaign starts from a primitive rendering of bounded branching computation and its functional counterpart [10–13].

At the familiar complexity-theoretic level, the unresolved direction can be summarized informally as:

~~~text
given a polynomially bounded existential witness relation
whose witness can be verified functionally in polynomial resources,

can the existential projection itself
always be realized functionally in polynomial resources?
~~~

For this paper, no stronger identification is needed.

Fix:

- an input \(x\);
- a finite choice alphabet \(A\);
- a witness depth \(m=m(|x|)\), polynomially bounded in the input size;
- a Boolean verifier \(V_x\) on complete admissible witnesses.

A padding or normalization convention may be used when the verifier accepts witnesses of length at most \(m\) rather than exactly \(m\), provided the admissible continuation domain is represented exactly.

For a prefix \(p\) of depth \(t\), let \(S_t\) denote the admissible suffixes for the remaining witness positions.

Define

\[
C_p = \{\,s\in S_t : V_x(p\cdot s)=1\,\}.
\]

Call \(C_p\) the **continuation support** or **future language** of \(p\).

Define

\[
E(p)=1 \quad\Longleftrightarrow\quad C_p\neq\varnothing.
\]

The root decision is \(E(\epsilon)\).

All reductions below preserve either the exact continuation support or a declared observable derived from it.

### 2.1 Authority boundary

The IsoGraph primitive P-versus-NP bundle used by the research campaign is confirmed at research-audit level for its selected finite-control tape convention [10].

The separate primitive bridge from that convention to the exact official formulation of P versus NP remains outside the qualified claim of the research bundle.

Accordingly, this paper uses the bounded existential formulation as its technical object and does not claim that the project has primitively qualified every model-equivalence detail of the official problem.

### 2.2 Current IsoGraph authority

At the repository baseline cited by this paper, the qualified IsoGraph family consists of Core 0.17–0.20, QU 0.1, NEI 0.4, Discovery Protocols 0.1–0.8, and DTS 0.1 [14,15].

The P-versus-NP derivations cited here were produced earlier under the then-current qualified DP 0.7 and remain historical derivation evidence [11]. Later qualification of DP 0.8 does not retroactively rewrite them.

---

## 3. Continuation support

The continuation-support definition exposes the exact future information relevant to the bounded existential objective.

Suppose \(p\) is nonterminal and one more choice \(a\) is admissible. Write \(pa\) for the child prefix.

Every accepting continuation from \(p\) is either a current acceptance, where allowed by the chosen normalization, or begins with one legal first choice followed by an accepting continuation from the corresponding child.

The important structural distinction is:

~~~text
legal transition support
    !=
acceptance-relevant support
~~~

A legal child can have empty continuation support and therefore contribute nothing to existential acceptance.

---

## 4. Established viewpoints over \(C_p\)

### 4.1 Future equivalence

Define

\[
p\sim_F q
\quad\Longleftrightarrow\quad
C_p=C_q.
\]

This is future-language equivalence.

The idea is classical. Myhill–Nerode theory characterizes automaton states through indistinguishability by future continuations and connects finite right congruences to finite-state recognition [1,2].

The present relation is scoped to a fixed input/verifier/depth context. Equality of the continuation-support value is not a claim of global natural identity between the underlying residual objects.

### 4.2 Continuation dominance

Define

\[
p\preceq_F q
\quad\Longleftrightarrow\quad
C_p\subseteq C_q.
\]

For existential truth, \(p\) becomes redundant whenever \(p\preceq_F q\) and \(q\) is retained.

Simulation preorders and language-inclusion relations have long been used for analogous purposes in automata algorithms [3–5].

### 4.3 Deadness

A residual is dead when

\[
C_p=\varnothing.
\]

Dead support contributes nothing to existential acceptance.

Removing dead behavior before more expensive equivalence or inclusion analysis is established practice in automata work [3–5].

### 4.4 Exact factorization

Even when supports are all nonempty, unequal, and pairwise incomparable, their union may admit a compact exact representation.

For a family \(P\) of residuals define

\[
U_P=\bigcup_{p\in P} C_p.
\]

A factorized representation \(R(P)\) is useful only when it denotes exactly \(U_P\) under the relevant semantics.

### 4.5 Objective projection

Sometimes the consumer does not need the full \(C_p\).

Examples include:

~~~text
nonempty(C_p)
minimum accepting suffix length
number of accepting suffixes
another exact objective-specific observable
~~~

A coarser observable may permit more merging than exact future-language identity.

But a small observable range says nothing by itself about access cost. The extreme example is \(E(p)\), which has only two values but is exactly the root decision problem.

---

## 5. The continuation-support reduction ladder

The campaign organizes the preceding mechanisms into this derived view:

~~~text
empty support
    -> delete

equal support
    -> merge

included support
    -> one-way dominance prune

remaining live incomparable support
    -> exact factorization / sharing

objective-only requirement
    -> exact aggregate projection
~~~

This is a discovery framework, not a claim that every algorithm literally executes these stages in this order.

The relations can overlap. Factorization may expose equality or inclusion that was not locally visible. Objective-specific aggregation may avoid constructing exact support altogether.

The value of the ladder is to state the semantic burden before a reduction is treated as safe.

### Proposition 1 — dead deletion

If \(C_p=\varnothing\), deleting \(p\) from any existential union preserves that union exactly.

#### Proof

For any family \(P\) containing \(p\),

\[
\bigcup_{r\in P}C_r
=
\left(\bigcup_{r\in P\setminus\{p\}}C_r\right)\cup C_p.
\]

Since \(C_p=\varnothing\), the final term contributes nothing.

### Proposition 2 — equality merge

If \(C_p=C_q\), retaining either \(p\) or \(q\) instead of both preserves the exact continuation union.

#### Proof

\[
C_p\cup C_q=C_q\cup C_q=C_q.
\]

### Proposition 3 — dominance pruning

If \(C_p\subseteq C_q\), then \(p\) may be deleted while \(q\) is retained without changing the continuation union.

#### Proof

\[
C_p\cup C_q=C_q.
\]

This is why one-way dominance can be more permissive than identity merging.

### Proposition 4 — exact factorization is representation substitution

Suppose \(F\) is a representation with

\[
\operatorname{denote}(F)=\bigcup_{p\in P}C_p.
\]

Then \(F\) may replace the explicitly materialized family \(P\) for later operations whose semantics is correctly implemented over \(F\).

The qualification is load-bearing: compactness of \(F\) is not enough if the next required exact operation forces destructive expansion.

### Proposition 5 — objective projection requires objective sufficiency

Let \(h\) be the only observable required downstream.

If a representation \(z\) determines \(h(C_p)\) exactly and all later required operations can be performed exactly on \(z\), then reconstruction of the full \(C_p\) is unnecessary for that claim.

This does not imply that \(z\) represents \(C_p\) exactly.

---

## 6. Sound incomplete negative evidence

The project-local refinement that most directly connects previously separate approaches concerns deadness and simulation.

Exact deadness classification is not assumed.

Define any sound incomplete certificate relation

\[
\widehat D(p,a).
\]

Its soundness obligation is:

\[
\widehat D(p,a)
\Longrightarrow
C_{pa}=\varnothing,
\]

for an existing child \(pa\).

The certificate may miss arbitrarily many truly dead children. Incompleteness affects pruning power, not correctness.

### 6.1 Dead-filtered simulation

Let \(R_t(p,q)\) be a relation on residuals with \(t\) positions remaining.

Require:

1. current acceptance transfers from \(p\) to \(q\);
2. \(\widehat D\) is sound;
3. every legal edge of \(p\) not certified dead is matched by the same first label at \(q\), with related children.

Schematically:

~~~text
R_t(p,q)
AND
NEXT(p,a)=p'
AND
NOT Dhat(p,a)

    ->

exists q':
    NEXT(q,a)=q'
    AND
    R_(t-1)(p',q')
~~~

### Theorem 1 — dead-filtered simulation is sound dominance evidence

If \(R_t\) satisfies these conditions, then

\[
R_t(p,q)\Longrightarrow C_p\subseteq C_q.
\]

#### Proof

Induct on remaining depth.

Take any accepting continuation from \(p\).

If it is an empty/current acceptance, current-acceptance transfer gives the corresponding acceptance at \(q\).

Otherwise it begins with some label \(a\) and continues with suffix \(s\) through child \(p'\).

Because \(as\) accepts, \(C_{p'}\neq\varnothing\). Soundness therefore prevents \(\widehat D(p,a)\) from holding.

The simulation obligation supplies a \(q\)-child \(q'\) under the same first label with \(R_{t-1}(p',q')\). By induction, every accepting suffix of \(p'\) is accepted from \(q'\).

Hence \(as\in C_q\).

Therefore every member of \(C_p\) belongs to \(C_q\).

### 6.2 Endpoint cases

If \(\widehat D\) recognizes nothing, Theorem 1 reduces to an all-legal forward-simulation rule.

If \(\widehat D\) is the exact dead-child classifier, obligations are imposed only on live children.

Sound incomplete negative evidence therefore forms a continuum between all-legal simulation and exact live-child recursion.

The useful cross-mechanism connector is:

~~~text
negative invariant
or
sound upper abstraction proving emptiness

    ->

dead-child certificate

    ->

smaller simulation obligation set

    ->

sound continuation dominance
~~~

The claim is not that dead-state pruning or simulation is new. The synthesis makes explicit how evidence from one technique can reduce the proof burden of another.

### 6.3 Exact deadness is not a free oracle

At the root,

\[
C_{\epsilon}=\varnothing
\quad\Longleftrightarrow\quad
E(\epsilon)=0.
\]

A universal efficient exact deadness classifier for arbitrary roots of the represented bounded-existential family would therefore decide the existential objective.

The useful target is a sound incomplete certificate family that removes some support without classifying every case.

---

## 7. Finite sanity evidence

The IsoGraph campaign performed a finite exhaustive sanity check of the dead-filtered simulation rule [16].

It enumerated deterministic labelled transition systems with:

~~~text
2 states
2 labels
successor value = invalid / state 0 / state 1
all current-acceptance assignments
remaining horizon 2
~~~

This yields 324 systems and 1,296 ordered state-pair comparisons.

Across all tested subsets of truly dead edges used as sound incomplete certificate sets, 30,690 filtered-simulation pair admissions were checked and zero false dominance admissions were observed.

With the exact dead filter, the computed filtered relation matched exact continuation-language inclusion on all 1,296 pair comparisons.

In 78 of the 324 systems, exact dead filtering proved strictly more dominance pairs than the empty/all-legal filter.

This finite enumeration is not the proof of Theorem 1; the induction above is. Its role is falsification pressure against implementation or statement mistakes.

---

## 8. A representation-relative CNF falsifier

The most useful boundary example in the campaign is an exact CNF family [17,18].

It simultaneously exhibits:

~~~text
all relevant x-branches live

explicit source-ordered CNF elimination expands exponentially

the same projected Boolean function has a compact exact factorization
~~~

### 8.1 Family definition

Choose elimination variables

\[
x_1,\ldots,x_d.
\]

For every sign vector

\[
\sigma\in\{+,-\}^d,
\]

introduce \(k\) private variables

\[
a_{\sigma,1},\ldots,a_{\sigma,k}.
\]

For each \(\sigma\) and each \(i\in\{1,\ldots,k\}\), create

\[
L_{\sigma,1}\vee\cdots\vee L_{\sigma,d}\vee a_{\sigma,i},
\]

where \(L_{\sigma,j}\) is the \(\sigma\)-selected sign of \(x_j\).

The input has \(2^d k\) clauses.

Freeze the elimination order \(x_1,x_2,\ldots,x_d\).

### 8.2 Explicit CNF elimination growth

Eliminate one variable by exact resolution-style projection:

- retain clauses not mentioning the variable;
- pair positive and negative occurrences;
- remove the opposite variable literals;
- add each non-tautological resolvent.

After eliminating \(x_1\), only pairs whose remaining sign patterns agree survive non-tautologically. Each remaining sign group therefore has \(k^2\) clauses.

Inductively, after eliminating \(x_1,\ldots,x_r\), each remaining sign vector carries

\[
k^{2^r}
\]

clauses.

The next elimination pairs the two opposite predecessor groups and squares the count.

After all \(d\) eliminations, the explicit projected CNF contains

\[
k^{2^d}
\]

distinct non-tautological clauses.

For fixed \(k=2\),

\[
N_{\mathrm{in}}=2^{d+1},
\]

while

\[
N_{\mathrm{out}}=2^{2^d}=2^{N_{\mathrm{in}}/2}.
\]

The represented clauses are pairwise non-subsuming.

This is an exact lower bound for that materialized representation under that elimination order.

It is not a representation-independent lower bound.

### 8.3 Compact exact alternate factorization

For each sign group \(\sigma\), define

\[
A_\sigma=\{a_{\sigma,1},\ldots,a_{\sigma,k}\}.
\]

After eliminating all \(x\) variables, the large explicit CNF says:

> For every tuple selecting one private variable from each sign group, at least one selected variable is true.

This formula is false exactly when every sign group contains at least one false private variable.

Therefore it is equivalent to

\[
\bigvee_{\sigma\in\{+,-\}^d}
\left(
\bigwedge_{i=1}^{k} a_{\sigma,i}
\right).
\]

That alternate representation has size \(O(2^d k)\), proportional to the original private-variable data.

Thus the same projected Boolean function has both an exponentially large explicit CNF under the frozen elimination procedure and a compact exact alternate factorization.

### 8.4 Every x-prefix is live

Dead-support filtering does not explain the blowup.

Fix any complete assignment \(\tau\) to \(x_1,\ldots,x_d\).

Exactly one sign vector \(\sigma^*\) has all of its selected \(x\)-literals false under \(\tau\).

Every clause belonging to another sign group is already satisfied by at least one \(x\)-literal.

The remaining \(\sigma^*\) clauses reduce to

\[
a_{\sigma^*,1},\ldots,a_{\sigma^*,k}.
\]

Set all of them true.

This yields a satisfying extension.

Any partial \(x\) assignment can first be extended arbitrarily to a complete \(x\) assignment and then completed by the same construction.

Therefore every partial \(x\)-prefix is live. Even a perfect dead-child oracle removes no \(x\)-edge there.

### 8.5 Consequence

The example separates:

~~~text
deadness removal
representation choice
stable factorization under projection
~~~

It rejects the universal proposal that exact dead-support removal must keep retained support small.

It also rejects the inference that exponential growth in one exact syntax is a representation-independent semantic lower bound.

The remaining issue is whether a compact representation can be constructed and maintained through subsequent required operations at acceptable cost.

---

## 9. Representation-relative width and accessibility

The CNF family motivates writing retained support as

\[
W_i(R)
\]

rather than simply \(W_i\).

Here \(i\) is the existential/projection stage and \(R\) is the representation or factorization family.

A useful representation family for a polynomial workflow needs more than small \(W_i(R)\).

At minimum one must account for:

~~~text
1. exact target preservation
2. construction/update cost
3. retained representation size
4. next required exact-operation cost
5. number of source-ranked stages
~~~

This aligns closely with the knowledge-compilation perspective of Darwiche and Marquis, where representation languages are compared for succinctness and for the queries and transformations they support in polynomial time [6].

Marquis studies existential closures of compilation languages directly [7].

Capelli and Mengel study how quantification interacts with width in OBDD and structured deterministic DNNF [8].

The IsoGraph campaign therefore does not claim discovery of the size-versus-operation tradeoff.

Its contribution is to attach that accounting directly to continuation-support reductions and to use explicit falsifiers to prevent one representation's width from being mistaken for semantic necessity.

---

## 10. Relationship to Boolean functional synthesis

Boolean functional synthesis asks for output functions witnessing a relational specification whenever existential solutions exist.

This is closely related to the broad motivating question here: when can existentially specified behavior be converted into functionally realizable behavior without prohibitive cost?

Akshay et al. introduced SynNNF, a normal form supporting polynomial-time Boolean functional synthesis and polynomial-time existential quantification under an appropriate order [9].

Shah, Bansal, Akshay, and Chakraborty later introduced SAUNF and showed that a Boolean specification is polynomial-time synthesizable iff it can be compiled to SAUNF in polynomial time; their representation also characterizes polynomial-size functional solutions in the sense established in their LICS 2021 result [19].

Those results sharply delimit what may be claimed here.

The statement:

~~~text
find an exact representation
that remains compact
and supports cheap next operations
~~~

is not a new tractability characterization.

It is a broad structural requirement already instantiated much more precisely by existing synthesis normal forms.

The continuation-support view instead supplies a common semantic coordinate system for deadness, future equivalence, one-way inclusion, exact factorization of surviving unions, and objective-specific aggregation.

---

## 11. Why equality is often stronger than necessary

Exact future equality requires

\[
C_p=C_q.
\]

Existential pruning needs only

\[
C_p\subseteq C_q
\]

when \(q\) is retained.

Complete equality classification may therefore be unnecessary even when a sound inclusion certificate is cheap.

An implementation can search for any relation \(\widehat R\) satisfying

\[
\widehat R(p,q)\Longrightarrow C_p\subseteq C_q.
\]

It need not recognize every true inclusion.

Missed inclusions cost performance, not correctness.

This mirrors the established role of simulations and antichain subsumption in automata algorithms [3–5].

---

## 12. Semantic compactness versus computational accessibility

Several project results reinforce:

~~~text
small semantic range
    !=
cheap semantic access
~~~

### 12.1 Boolean existence

\(E(p)\) has only two values, yet computing \(E(\epsilon)\) is exactly the bounded existential decision problem.

### 12.2 Exact residual quotient

A quotient may have few equivalence classes without supplying an efficient classifier for those classes.

### 12.3 Compact factorization

The CNF family has a compact factorized projection. That fact alone says nothing about whether arbitrary instances can be compiled into a similarly useful factorization in polynomial time.

### 12.4 Cheap current operation

One elimination step can be polynomial in the current materialized support while the support has already grown exponentially relative to the original input.

Complexity accounting must therefore be referenced to the original input and the complete transformation chain.

---

## 13. What the synthesis contributes

The broad novelty review performed for this publication found substantial prior art for every individual mechanism [20].

Accordingly, this paper claims only a modest contribution.

### 13.1 One semantic center

Several reductions are treated as relations or representations of one continuation-support object \(C_p\).

This reduces vocabulary drift between automata language equivalence, simulation/inclusion, dead-state reasoning, existential projection, factorization, and objective aggregation.

### 13.2 Exact preservation boundaries

The framework distinguishes:

~~~text
deadness:
    zero contribution

equality:
    interchangeable exact contribution

inclusion:
    one-way removable contribution

factorization:
    same union in another representation

objective projection:
    less than full support,
    justified only by the declared consumer
~~~

### 13.3 Incomplete certificates are first-class

A sound incomplete relation can be useful without solving the complete semantic classification problem.

This is especially important for deadness and dominance.

### 13.4 Representation parameters are mandatory

A support-size claim should be read as \(W(R)\), not as an unqualified semantic lower bound.

### 13.5 The next operation is part of the representation claim

A compact representation is operationally useful only when subsequent required exact operations remain accessible without destructive expansion.

This principle is established in knowledge compilation; the contribution here is to make it a mandatory firewall inside the continuation-support synthesis.

### 13.6 Falsifiers accompany the framework

The all-live CNF family is deliberately retained as a negative control.

It shows that dead filtering and stable factorization address different structural problems.

---

## 14. A refined research target

The synthesis narrows:

~~~text
find compression
~~~

to a more falsifiable target.

Seek primitive structural conditions under which a representation family \(R\) is:

~~~text
exact for the required objective

polynomially constructible

polynomial in retained size

closed under the next required projection/update

polynomial in operation cost

stable for a polynomial number of source-ranked stages
~~~

Defining \(R\) semantically as “whatever representation makes the problem easy” is circular.

The useful target is an independently recognizable structural cause of stable accessibility.

Examples worth investigating include bounded interaction boundaries, decomposability, independent modules, reusable aggregate structure, and sound local dominance laws.

This paper does not establish that any such condition covers all bounded existential computation. A universal result of the required strength would reach the unresolved equality direction.

---

## 15. Relation to P versus NP

The framework may be useful for thinking about P versus NP because NP-style bounded existential computation repeatedly combines alternatives and asks whether at least one accepting completion survives.

But the present results stop far short of a resolution.

They establish neither \(P=NP\) nor \(P\neq NP\).

They establish no universal polynomial factorization theorem and no representation-independent lower bound.

What they provide is a decomposition of possible sources of tractability:

~~~text
zero support
duplicate support
dominated support
shared/factorized support
objective-specific aggregation
~~~

A successful equality-side construction would need enough efficiently discoverable structure across these or other mechanisms to keep the complete computation polynomial.

A separation proof would need a fundamentally stronger obstruction than showing that one chosen explicit representation becomes large.

The CNF falsifier in Section 8 is a concrete reminder of that boundary.

---

## 16. Limitations

### 16.1 No general novelty claim for the components

The paper does not claim novelty for Myhill–Nerode-style continuation equivalence, simulation preorders, language inclusion, antichains, dead-state removal, propositional forgetting, OBDD/DNNF knowledge compilation, SynNNF, SAUNF, or the general distinction between representation succinctness and supported operations.

### 16.2 Synthesis novelty remains modest

The continuation-support ladder and its integration with IsoGraph's scoped identity, unresolved-structure, and accessibility discipline may be a useful synthesis.

A broad literature review did not identify the exact same named organization.

That absence is not proof of strong external novelty.

The appropriate description is:

~~~text
possible synthesis / expositional novelty
with substantial prior-art overlap
~~~

### 16.3 Internal evidence is not independent external validation

The primitive renderings, assertion indexes, finite sanity checks, and project audits are internal IsoGraph research evidence.

They are not independent external validation of IsoGraph or of the framework proposed here.

### 16.4 Finite enumeration is only a sanity check

Theorem 1 is supported by direct induction.

The finite enumeration tests the implementation and statement on a small exhaustive domain; it does not establish the theorem by itself.

### 16.5 The CNF family is representation-specific

The exponential materialized-CNF result applies to the stated family and frozen elimination order.

The compact alternate factorization is precisely why the result must not be generalized into a representation-independent lower bound.

### 16.6 No complete catalog is claimed

The ladder is not asserted to exhaust every possible polynomial-time mechanism for bounded existential computation.

Other exact representations, algebraic reductions, randomized methods, proof systems, or domain-specific structures may not fit naturally into this organization.

---

## 17. Conclusion

Bounded existential computation can be viewed through one semantic object: the accepting continuation support \(C_p\) of a residual prefix.

That object exposes a useful hierarchy of safe reductions:

~~~text
empty
    -> delete

equal
    -> merge

included
    -> dominance prune

remaining live incomparable support
    -> factorize / share

coarser consumer
    -> retain only an exact sufficient aggregate
~~~

The hierarchy does not replace the established theories that instantiate its levels. It gives them a common semantic coordinate system.

Automata simulation explains cheap sufficient evidence for language inclusion. Antichains exploit subsumption without enumerating all states. Knowledge compilation explains why succinctness must be considered together with supported polynomial queries and transformations. Existential-closure work studies forgetting directly. Boolean functional-synthesis normal forms demonstrate that representation can decisively alter synthesis complexity.

The IsoGraph campaign adds two useful cautions.

First, complete semantic classification is often unnecessary. Sound incomplete certificates can safely remove support without solving the full equivalence, inclusion, or deadness problem.

Second, every complexity claim must retain its representation and accessibility qualifiers. The project CNF family shows all of the following at once:

~~~text
every existential x-prefix is live

explicit exact CNF elimination expands exponentially

the same projected function has a compact exact factorization
~~~

Therefore neither dead-state pruning nor fixed-syntax size alone captures the remaining burden.

The sharper target is:

> Find independently recognizable structural conditions under which surviving existential support admits an exact representation that remains polynomial in size and polynomially accessible under each next required operation.

That target is strongly connected to established knowledge-compilation and functional-synthesis work.

Its value here is not that it resolves P versus NP.

Its value is that it states more precisely what a successful structural explanation would have to accomplish—and which apparent shortcuts are already falsified.

---

## Provenance and Contribution Note

Joshua Oshiro is the author of this paper and the designer of the IsoGraph system and methodology used in this research.

This work was produced with AI/agent assistance operating through and in conjunction with the IsoGraph research process. Agent assistance contributed to primitive rendering, structural synthesis, proof checking, finite falsification, external literature research, novelty review, drafting, and repository operations. Authorship and design of the IsoGraph system remain attributed to Joshua Oshiro.

The project-local synthesis reported here was derived from the IsoGraph P-versus-NP primitive-logic campaign. External theories and prior methods are credited to their respective authors below. The paper intentionally treats its likely contribution as synthesis-level rather than claiming novelty for established automata, knowledge-compilation, forgetting, or Boolean-synthesis results.

---

## License

© 2026 Joshua Oshiro.

This work is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

You are free to share, copy, redistribute, remix, transform, and build upon the original material for commercial or noncommercial purposes, provided appropriate credit is given to Joshua Oshiro, the license is identified, and changes are indicated.

This license applies to the original text, analysis, diagrams, and explanatory material in this paper. Referenced source code, repository contents, third-party publications, trademarks, and other externally owned materials retain their original licenses and ownership.

---

## References

[1] John Myhill. “Finite Automata and the Representation of Events.” WADD Technical Report 57-624, pp. 112–137, 1957.

[2] Anil Nerode. “Linear Automaton Transformations.” Proceedings of the American Mathematical Society 9(4):541–544, 1958. DOI: https://doi.org/10.1090/S0002-9939-1958-0135681-9.

[3] Laurent Doyen and Jean-François Raskin. “Antichains for the Automata-Based Approach to Model-Checking.” Logical Methods in Computer Science 5(1:5), 2009. DOI: https://doi.org/10.2168/LMCS-5(1:5)2009.

[4] Lukáš Holík. Simulations and Antichains for Efficient Handling of Finite Automata. Doctoral thesis / arXiv:1706.03208, 2017. https://arxiv.org/abs/1706.03208.

[5] Yu-Fang Chen, Lukáš Holík, Tomáš Vojnar, Parosh A. Abdulla, and Richard M. Mayr. “When Simulation Meets Antichains (On Checking Language Inclusion of Nondeterministic Finite (Tree) Automata).” TACAS 2010. DOI: https://doi.org/10.1007/978-3-642-12002-2_14.

[6] Adnan Darwiche and Pierre Marquis. “A Knowledge Compilation Map.” Journal of Artificial Intelligence Research 17:229–264, 2002. DOI: https://doi.org/10.1613/JAIR.989.

[7] Pierre Marquis. “Existential Closures for Knowledge Compilation.” Proceedings of the Twenty-Second International Joint Conference on Artificial Intelligence (IJCAI 2011), pp. 996–1001. DOI: https://doi.org/10.5591/978-1-57735-516-8/IJCAI11-171.

[8] Florent Capelli and Stefan Mengel. “Knowledge Compilation, Width and Quantification.” arXiv:1807.04263, 2018. https://arxiv.org/abs/1807.04263.

[9] S. Akshay, Jatin Arora, Supratik Chakraborty, S. Krishna, Divya Raghunathan, and Shetal Shah. “Knowledge Compilation for Boolean Functional Synthesis.” Formal Methods in Computer Aided Design (FMCAD 2019), pp. 161–169. DOI: https://doi.org/10.23919/FMCAD.2019.8894266.

[10] IsoGraph Project. “P versus NP primitive bundle 0.4.” Git blob c38de5674ffa568c1297e8383b48b2ed77de7756. Repository baseline: https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-26/P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg.

[11] IsoGraph Project. “P versus NP — Discovery Protocol reapplication 0.1.” Git blob a40d07a62977526d41177d34ab5277fedc5aea0d. https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/P_VS_NP_DP07_REAPPLY_0_1.md.

[12] IsoGraph Project. “P versus NP NEI semantic scope contract 0.1.” https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md.

[13] IsoGraph Project. “P versus NP implicit assertion index 0.10.” Git blob 3c7fa34d5512b1ee8c6a3548a0bc722c3d8838ed. https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/IMPLICIT_ASSERTION_INDEX_0_10.json.

[14] IsoGraph Project. “Qualified Module Authority Manifest — 2026-09-28.” https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/qualification/QUALIFIED_MODULES_2026-09-28.md.

[15] IsoGraph Project. “Current Integrated Semantic Stack with Core 0.20 and DP 0.8 — 2026-09-28.” https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md.

[16] IsoGraph Project. “A25 dead-support filtered simulation — finite sanity check 0.1.” https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/A25_DEAD_FILTER_SANITY_0_1.md.

[17] IsoGraph Project. “CNF target implicit assertions 0.1,” especially CNF-IA-011 through CNF-IA-013. https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/target-cnf-sat/CNF_TARGET_IMPLICIT_ASSERTIONS_0_1.md.

[18] IsoGraph Project. “CNF target — dead-support filtering falsifier 0.1.” Git blob 59d1769540d4c59e5debc31f56682b7bc850e617. https://github.com/iteathen/IsoGraph/blob/84e2f4d2386f9cd1a7b2c533752600eee82e44bf/research/p-vs-np/2026-09-27/target-cnf-sat/CNF_TARGET_DEAD_SUPPORT_FALSIFIER_0_1.md.

[19] Preey Shah, Aman Bansal, S. Akshay, and Supratik Chakraborty. “A Normal Form Characterization for Efficient Boolean Skolem Function Synthesis.” 36th Annual ACM/IEEE Symposium on Logic in Computer Science (LICS 2021). DOI: https://doi.org/10.1109/LICS52264.2021.9470741.

[20] IsoGraph Project. “P versus NP continuation-support synthesis — broad external novelty review 0.1.” research/p-vs-np/2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_BROAD_NOVELTY_REVIEW_0_1.md.

---

## Citation

Oshiro, Joshua. Continuation-Support Reductions for Bounded Existential Computation: A Structural Synthesis of Pruning, Quotienting, and Factorization. IsoGraph Project research publication, revision 0.1, 2026. Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro. CC BY 4.0.
