# Exact Phase Algebra and High-Order Synchronization in Optimal Enzymatic Cleavage Trajectories

**Joshua Oshiro**

**Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.**

**IsoGraph Project:** https://github.com/iteathen/IsoGraph  
**Primary evidence snapshot:** `iteathen/IsoGraph@95d32275a8942e34c494296f1d8815bd1268b3a0`  
**Peer-review refinement layer:** `iteathen/IsoGraph@0431c392db23da94a93ba972c7ef613c537e82cb`  
**License:** CC BY 4.0  
© 2026 Joshua Oshiro.

The original text, analysis, diagrams, and explanatory material in this paper are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. Referenced source code, repository artifacts, third-party publications, trademarks, and externally owned materials retain their respective licenses and ownership.

---

## Abstract

We study an idealized optimization problem motivated by sequential exoglycosidase digestion of branched glycans. A finite rooted residue structure, a retained ancestor-closed target, and a closed-world enzyme/site susceptibility relation are given. One treatment selects a single enzyme and applies it exhaustively: every currently terminal, non-target, susceptible residue is removed, including residues exposed during the same treatment. The objective is to minimize the number of such treatments required to reach the target exactly.

The problem was rendered into primitive IsoGraph structure and cold-reconstructed within a frozen **internal project** verification experiment before structural discovery. The resulting analysis exposes a closed-form treatment action. If $A$ is the active non-target filter and $N_e$ is the set of non-target sites resistant to enzyme $e$, then one exhaustive treatment is exactly

$$
D_e(A)=\uparrow(A\cap N_e).
$$

Dually, treatment acts as an extensive, monotone, idempotent, meet-preserving closure on the finite lattice of removed-node ideals. Effective non-target susceptibility is a complete invariant of one-phase behavior, and susceptibility inclusion induces two-sided absorption. An **effective treatment class** is an equivalence class of raw treatments having the same effective non-target susceptibility set, equivalently the same phase transformer.

At the trajectory level, a treatment word solves exactly when it covers every maximal non-target path. In the singleton-susceptibility subclass this becomes ordinary shortest common supersequence (SCS) on run-compressed path words. With at most two effective treatment classes, every irredundant treatment word alternates, yielding an exact formula for the optimum and the universal theorem $J_2=\mathrm{OPT}$, where $J_h$ is the best lower bound obtained from subfamilies of at most $h$ maximal paths.

The binary collapse fails sharply for three treatment labels. Exact finite constructions produced critical path families of witness widths 24, 35, 54, 75, 113, and 173. The width-173 construction consists only of 173 independent singleton-susceptibility chains of length 10. No treatment word of length 20 satisfies the full family, yet deleting any one path admits a length-20 treatment word. A universal cyclic ternary supersequence bounds every length-10 path family by 21 treatments, so this construction has exact optimum 21. Thus every one of the 173 path constraints is necessary to witness the optimum. The associated private-witness incidence induces the standard example $S_{173}$ inside the ternary subsequence poset and hence a finite poset-dimension lower bound of at least 173.

These results establish substantial high-order synchronization over a fixed three-symbol treatment alphabet, but they do **not** prove that ternary witness width is unbounded. They also concern a deliberately idealized deterministic digestion model, not a complete model of laboratory enzymology.

---

## 1. Introduction

Exoglycosidases are widely used as structural probes because they remove terminal monosaccharides subject to enzyme specificity. Sequential digestion can reveal subterminal structure after terminal residues are removed [1–4]. This physical motivation naturally generates an ordering problem: a treatment may expose sites for later treatments, while branching allows one treatment to act on several exposed termini at once.

The present work isolates an exact mathematical version of that problem. The model deliberately removes kinetics, concentration, incomplete digestion, stochasticity, simultaneous enzyme cocktails, uncertain specificity, and state-dependent chemistry not already represented in the input relation. Those omissions are not claims about real laboratory behavior. They define the finite optimization problem studied here.

The central question is:

> Given a finite rooted branched structure, a retained target, and exact site susceptibility, what is the minimum number of exhaustive single-enzyme treatments required to reach the target?

The work began as an IsoGraph rendering exercise. The source problem was reduced to primitive relational logic, cold-reconstructed within the project from the primitive representation, and then subjected to alternating implicit-assertion, identity, and Discovery Protocol passes [5–10]. What emerged is not merely an implementation of a search problem. The structure admits several exact and mutually reinforcing representations:

$$
\text{microscopic deletion}
\;\longrightarrow\;
\text{phase closure}
\;\longrightarrow\;
\text{ordered ideals}
\;\longrightarrow\;
\text{path languages}
\;\longrightarrow\;
\text{word-order boundaries}.
$$

The main contributions reported here are:

1. an exact closed form for one exhaustive enzyme treatment;
2. a meet-preserving closure algebra for treatment phases;
3. an exact classification of treatment behavior by effective non-target susceptibility;
4. a dual resistant-chain certificate for treatment-word failure;
5. a finite dominance-aware basis for the complete solving language;
6. an exact SCS reduction for singleton susceptibility;
7. a universal two-treatment-class collapse, $J_2=\mathrm{OPT}$;
8. explicit three-treatment-class counterexamples to any naive $J_3$ extension;
9. exact finite ternary witness-width constructions reaching 173;
10. an induced standard-example $S_{173}$ in the ternary subsequence poset.

The external mathematics used for orientation—Higman-style subword orders, shortest common supersequence, closure/nucleus theory, well-structured transition systems, PCCSP, and poset dimension—is established prior art [11–17]. The project-specific synthesis and finite constructions are reported without a claim of external novelty beyond the exact statements proved and certified here.

---

## 2. The Idealized Cleavage Model

### 2.1 Input

An instance supplies:

- a finite residue set $R$;
- a finite enzyme set $E$;
- a distinguished root;
- a parent relation $P(\text{child},\text{parent})$ forming a finite rooted tree;
- a retained target $T\subseteq R$, containing the root and closed under ancestry;
- a closed-world susceptibility relation $M(e,r)$.

The susceptibility relation is extensional input. It is intended to encode every static site distinction relevant to the frozen instance—such as terminal residue identity, linkage, anomeric character, or other local context—without requiring the optimizer to derive chemistry from a label.

### 2.2 State and terminality

A state $S$ is a subset of $R$ satisfying

$$
T\subseteq S\subseteq R.
$$

A represented residue $r\in S$ is terminal exactly when no represented child of $r$ remains in $S$.

Residue $r$ is eligible for enzyme $e$ exactly when:

1. $r$ is terminal;
2. $r\notin T$;
3. $M(e,r)$.

A microscopic cleavage removes one eligible residue and changes nothing else.

### 2.3 Exhaustive treatment

One treatment chooses a single enzyme $e$ and repeatedly removes eligible sites for $e$ until no such site remains. Sites newly exposed during that treatment are eligible to be removed during the same treatment if they also satisfy $M(e,r)$.

A treatment trajectory is a finite enzyme word

$$
w=e_1e_2\cdots e_k.
$$

The trajectory solves when exhaustive execution from the full initial state leaves exactly $T$. Its cost is $k$.

Repeated use of the same enzyme is allowed. In particular, a non-adjacent pattern such as

$$
A\,B\,A
$$

may be necessary because $B$ can expose a new $A$-susceptible site.

### 2.4 Scope boundary

This paper does not model:

- incomplete digestion;
- reaction rates;
- enzyme concentration or time;
- simultaneous cocktails;
- stochastic cleavage;
- state-dependent chemistry not represented in $M$;
- endoglycosidase internal cuts;
- synthesis;
- uncertainty in glycan structure or enzyme specificity.

The frozen model and its biological motivation are recorded in the IsoGraph source freeze [5]. A bibliographic correction overlay fixes one source-reference attribution without changing that frozen semantic blob [6]. A frozen instance is feasible exactly when every non-target node has at least one susceptible treatment. We use the convention $\mathrm{OPT}=+\infty$ for infeasible instances; every theorem asserting a finite optimum assumes feasibility.

---

## 3. IsoGraph Rendering and Verification

The source model was translated into an IsoGraph primitive rendering whose authoritative native payload contains no high-level domain labels such as “glycan,” “enzyme,” “cleavage,” “trajectory,” or “optimal” [7].

Experiment 032 tested the round trip

$$
\text{source}
\to
\text{primitive IsoGraph}
\to
\text{cold reconstruction}
\to
\text{source comparison}.
$$

The frozen result was PASS: the native parser passed; there were no free native variables or undeclared local predicates; all expected semantic predicates were reconstructed; 18 of 18 targeted source/reconstruction checks passed; and the verifier reported no missing source semantics, unsupported additions, or load-bearing unresolved structure [8].

This is **internal project verification**, not independent external validation. Experiment 032 was executed when Core 0.20 was still an unqualified research contract. Core 0.20 and DP 0.8 were subsequently qualified on fresh holdouts, and the resulting Core 0.20 + QU 0.1 + NEI 0.4 + DP 0.1–0.8 + DTS 0.1 composition was directly integration-qualified by Experiment 052 [9]. That later qualification does not retroactively convert Experiment 032 into external validation.

A later maximal-path proof contained a local support defect. The theorem survived, but its original path-local/global-$\tau$ comparison did not. The proof was repaired using a bottleneck-path induction, and that correction is mandatory support for all downstream maximal-path and SCS results [18].

The publication preflight re-audited the current assertion surface. The authoritative implicit range is

$$
G\text{-}IA001\ldots G\text{-}IA448,
$$

with no gaps or duplicate authoritative IDs through $G\text{-}IA448$. Peer-review refinements add $G\text{-}IA449\ldots G\text{-}IA459$ without rewriting the earlier derivations [19, 20]. The scoped identity range remains $G\text{-}N001\ldots G\text{-}N116$.

---

## 4. Closed-Form Phase Algebra

Let $Q=R\setminus T$ be the non-target nodes ordered descendant-before-ancestor. A valid active non-target state is an upward-closed filter $A\subseteq Q$.

For enzyme $e$, define effective non-target susceptibility

$$
S_e^*=\{q\in Q:M(e,q)\}
$$

and resistance

$$
N_e=Q\setminus S_e^*.
$$

### Theorem 1 — Resistant-frontier phase formula

One exhaustive $e$-treatment sends active filter $A$ to

$$
\boxed{
D_e(A)=\uparrow(A\cap N_e)
}
$$

where $\uparrow$ denotes upward closure in the descendant-before-ancestor order [21].

#### Proof sketch

Any active resistant node cannot be removed. Its active ancestors remain blocked by it, so $\uparrow(A\cap N_e)$ survives.

Conversely, take an active node $q$ outside that upward closure. No active descendant of $q$, including $q$, is resistant to $e$. Finiteness allows terminal susceptible descendants to be removed bottom-up until $q$ becomes terminal and is itself removed. Hence nothing outside the displayed upward closure survives.

The formula eliminates microscopic fixed-point iteration from the derived phase representation.

### Removed-ideal dual

Let

$$
I=Q\setminus A
$$

be the removed-node ideal. The phase action is

$$
R_e(I)
=
Q\setminus
\uparrow\big((Q\setminus I)\cap N_e\big).
$$

The action satisfies:

$$
I\subseteq R_e(I),
$$

$$
I\subseteq J
\Rightarrow
R_e(I)\subseteq R_e(J),
$$

$$
R_e(R_e(I))=R_e(I),
$$

and

$$
\boxed{
R_e(I\cap J)=R_e(I)\cap R_e(J).
}
$$

Thus each treatment acts as a meet-preserving closure operator on the finite ideal lattice [21].

This is the classical algebraic shape called a **nucleus** on a frame or distributive lattice [14]. The terminology is external; the equalities above were derived directly in the frozen model.

The stronger join law is false in general. A susceptible parent with two resistant children provides a counterexample: removing either child alone leaves the parent blocked, while removing both can expose and remove the parent during the same treatment.

---

## 5. Exact Behavioral Identity and Dominance

### Theorem 2 — Effective susceptibility classifies one-phase behavior

For enzymes $e_1,e_2$,

$$
\boxed{
S_{e_1}^*=S_{e_2}^*
\iff
R_{e_1}=R_{e_2}
}
$$

as functions on all valid states [21].

The forward direction follows immediately from the resistant-frontier formula.

For the reverse direction, if the supports differ at node $q$, choose the active filter generated by $q$. One enzyme can remove $q$; the other cannot. The phase outputs differ.

This has a useful modeling consequence: susceptibility tuples on retained target residues are source-real but irrelevant to treatment behavior in version 0.1 because target membership independently prohibits their cleavage.

### Effective treatment classes

Define raw-treatment equivalence by

$
e\sim f
\iff
S_e^*=S_f^*.
$

By Theorem 2, this is equivalent to equality of the complete one-phase transformer on every valid state. An **effective treatment class** is an equivalence class under $\sim$. The class alphabet is therefore $E/{\sim}$. Distinct raw enzymes inside one effective class remain distinct source objects unless stronger identity authority separately identifies them [20].

### Dominance

Define enzyme dominance by

$$
e_1\preceq e_2
\iff
S_{e_1}^*\subseteq S_{e_2}^*.
$$

Then $e_2$ removes at least everything $e_1$ removes from every valid state, and the phase operators satisfy two-sided absorption:

$$
\boxed{
R_{e_2}\circ R_{e_1}=R_{e_2}
}
$$

and

$$
\boxed{
R_{e_1}\circ R_{e_2}=R_{e_2}.
}
$$

Consequently adjacent comparable treatments collapse to the stronger treatment. Adjacent duplicate removal is the equality case.

---

## 6. Word Languages and Failure Certificates

The exact treatment problem can also be represented as a language over the enzyme alphabet.

### 6.1 Upward word order

Let $u\preceq_M v$ when $u$ embeds as a subsequence of $v$ and every retained symbol of $u$ is matched to an equal or susceptibility-dominating symbol of $v$.

If $u$ solves and $u\preceq_M v$, then $v$ solves. Extra treatments cannot recreate removed material, and replacing a treatment by a dominator cannot reduce progress.

The solving language is therefore an upset under this generalized subword order.

This is structurally aligned with the word embeddings studied in Higman-style well-quasi-order theory [11], although the glycan result here also uses problem-specific treatment semantics.

### 6.2 Minimal TRUE boundary in the quotient order

Because $\preceq_M$ is a preorder, define mutual word equivalence

$$
u\approx_M v
\iff
u\preceq_M v
\;\text{and}\;
v\preceq_M u.
$$

The solving upset has a unique set $\mathcal B_M$ of minimal **equivalence classes** in the quotient poset of words modulo $\approx_M$ [20, 22]. A concrete raw representative family need not be unique when distinct raw enzymes or words are mutually equivalent.

Choose any representative family $B_M^{\mathrm{rep}}$ containing representatives of all minimal classes. Then

$$
w\text{ solves}
\iff
\exists b\in B_M^{\mathrm{rep}}:\;b\preceq_M w.
$$

For representative $b=a_1\cdots a_m$, define

$$
UP(a_i)=\{e:S_{a_i}^*\subseteq S_e^*\}.
$$

The complete solving language has the finite exact form

$$
L
=
\bigcup_{b\in B_M^{\mathrm{rep}}}
\Sigma^*UP(a_1)\Sigma^*\cdots UP(a_m)\Sigma^*.
$$

Recent work on upward-closed word languages and quasi-ordered automata provides external algorithmic context for finite bases of this kind [17]. Experiments 034 and 035 exercised this connection inside the frozen project model.

### 6.3 Resistant-chain dual

There is also an exact negative certificate.

For treatment word

$$
w=e_1e_2\cdots e_k,
$$

the word fails exactly when there exists a nondecreasing chain

$$
q_1\le q_2\le\cdots\le q_k
$$

such that

$$
q_i\in N_{e_i}
$$

for every treatment position [23].

So:

$$
\boxed{
w\text{ solves}
\iff
\text{no treatment-spanning resistant chain exists}.
}
$$

Positive path coverage and negative resistant chains are complementary decision interfaces. They are not the same witness object.

---

## 7. Maximal Paths and the SCS Reduction

Write an active maximal non-target path **leaf-first** as

$$
P=[p_1,\ldots,p_m],
\qquad
p_1\le_P\cdots\le_P p_m.
$$

For a treatment word $w=e_1\cdots e_k$, say that **$w$ covers $P$** when there is no nondecreasing resistant chain

$$
q_1\le_P\cdots\le_P q_k
$$

contained in $P$ with $q_i\in N_{e_i}$ for every treatment position [20, 23]. This definition applies directly to set-valued susceptibility.

The resistant-chain dual gives a short proof of maximal-path sufficiency. If $w$ fails globally, §6.3 supplies a nondecreasing resistant chain. Because its nodes are totally ordered in the rooted-tree order, that chain lies in some maximal active path, so $w$ fails to cover that path. Conversely, a resistant chain contained in one maximal path is also a valid global resistant chain. Hence

$$
w\text{ solves}
\iff
w\text{ covers every maximal non-target path}.
$$

The historical A8 proof and its bottleneck-path correction remain valid provenance; this shorter proof became available only after the later resistant-chain duality was derived [18].

For singleton susceptibility, each non-target node has one treatment label. Reading labels leaf-first along the path, Along a path, consecutive equal labels can be executed in the same exhaustive phase, so compress consecutive equal labels. Let $COMP(P)$ be the resulting run-compressed word.

Then a treatment word covers path $P$ exactly when $COMP(P)$ is an ordinary subsequence of that treatment word.

Therefore:

$$
\boxed{
\text{singleton-susceptibility optimum}
=
\text{SCS length of the compressed maximal-path words}.
}
$$

Moreover, the complete optimum treatment family is exactly the shortest-common-supersequence family of those words.

Shortest common supersequence is classical and computationally difficult in general [12]. The singleton glycan subclass also maps naturally to the precedence-constrained class sequencing problem (PCCSP): a path node is an operation, its unique enzyme is its class, descendant-before-ancestor order is precedence, and one class execution performs every currently possible operation of that class [13].

For general set-valued susceptibility, the problem is **not** silently one ordinary SCS instance. The exact reduction is instead a finite disjunction of ordinary common-supersequence subproblems generated by finite path-pattern bases [10].

---

## 8. The Exact Two-Enzyme Collapse

The strongest clean special case occurs when the quotient alphabet $E/{\sim}$ has at most two effective treatment classes, call them $A$ and $B$. All statements in this section are class-level statements; raw enzymes in one class may be substituted without changing phase behavior [20, 24].

### Theorem 3 — Minimum words alternate

Every minimum solution has no adjacent duplicate treatment because phase idempotence removes one duplicate without changing the state.

Over a two-symbol alphabet, every no-adjacent-repeat word is alternating. Hence every minimum solution is one of

$$
ABAB\cdots
$$

or

$$
BABA\cdots
$$

truncated at some length [24].

For each maximal path $P$, let $a(P)$ be the minimum length of an $A$-starting alternating word that covers $P$, and $b(P)$ the analogous $B$-starting length.

Define

$$
A_{\max}=\max_P a(P),
\qquad
B_{\max}=\max_P b(P).
$$

### Theorem 4 — Exact binary optimum

$$
\boxed{
\mathrm{OPT}
=
\min(A_{\max},B_{\max}).
}
$$

An $A$-starting solution must have length at least $A_{\max}$, and the alternating word of exactly that length covers every path. The argument is symmetric for $B$.

Choose a path attaining $A_{\max}$ and a path attaining $B_{\max}$. Those at most two paths already witness the global optimum. Therefore

$$
\boxed{
J_2=\mathrm{OPT}
}
$$

for every frozen version-0.1 state with at most two effective treatment classes, including set-valued susceptibility [24].

The complete optimum **effective-class-word** family has size at most two. The raw optimum-word family can be larger when an effective class contains several distinct raw enzymes, because class-equivalent representatives may be substituted position-wise [20].

This theorem explains why small binary test surfaces appear deceptively easy. It depends on the special rigidity of no-adjacent-repeat binary words.

---

## 9. Three Enzymes: Even Three-Path Reasoning Can Fail

The binary theorem does not extend by replacing 2 with the alphabet size.

Consider four independent singleton-susceptibility paths

$$
010,\qquad
012,\qquad
101,\qquad
210.
$$

Every three-path subfamily has a common supersequence of length 5, but the full four-path family requires length 6 [25].

Thus

$$
J_3=5
<
6=\mathrm{OPT}.
$$

The obstruction uses:

- only three treatment labels;
- deterministic singleton susceptibility;
- independent chains;
- no shared non-target ancestor;
- no uncertainty;
- no multi-enzyme site ambiguity.

It is pure global synchronization of treatment order.

This is the first qualitative transition:

$$
\text{two effective labels}
\Rightarrow
\text{pairwise exactness},
$$

while

$$
\text{three effective labels}
\Rightarrow
\text{higher-order synchronization can be essential}.
$$

---

## 10. Witness Width

For a maximal-path family $\mathcal P$, define

$$
J_h(\mathcal P)
=
\max_{\substack{\mathcal H\subseteq\mathcal P\\|\mathcal H|\le h}}
\mathrm{OPT}(\mathcal H).
$$

Define the **witness width**

$$
W(\mathcal P)
=
\min\{h:J_h(\mathcal P)=\mathrm{OPT}(\mathcal P)\}.
$$

Thus $W$ is the smallest number of path constraints that can already witness the full optimum value [26].

For binary instances, Theorem 4 gives

$$
W\le2.
$$

For ternary instances, the width can be much larger.

---

## 11. Critical Covers

Fix a treatment threshold $L$. Let $U_L$ be the complete set of run-compressed treatment words of **exactly** length $L$.

### Lemma 5 — Exact-length padding

Assume the effective treatment alphabet has at least two classes. If a word of length at most $L$ solves, first delete adjacent equivalent treatments; phase idempotence preserves the result. If the resulting run-compressed solution is shorter than $L$, append any treatment class different from the current final class until length $L$ is reached. Inserting treatments cannot recreate removed nodes, so the padded word still solves.

Therefore

$
\exists\text{ solution of length }\le L
\iff
\exists\text{ run-compressed solution of length exactly }L.
$

The ternary critical-cover constructions satisfy the two-class minimum automatically [20].

For path $P$, define the failure set

$$
D_L(P)
=
\{w\in U_L:P\not\preceq_{\text{subseq}} w\}.
$$

By Lemma 5, a selected path family $F$ has $\mathrm{OPT}(F)>L$ exactly when

$$
\bigcup_{P\in F}D_L(P)=U_L.
$$

The family is **threshold-critical** when the cover is inclusion-minimal: for every selected path $P_i$, there exists a private word $w_i\in U_L$ such that

$$
w_i\in D_L(P_i)
$$

but

$$
w_i\notin D_L(P_j)
\qquad
(j\ne i).
$$

Equivalently, $w_i$ fails exactly $P_i$ among the selected paths.

If the full family has no length-$L$ solution and every one-path deletion has a length-$L$ solution, then every selected path is necessary to witness the optimum threshold. The witness width equals the selected family cardinality [27].

This converts finite witness-width construction into a structured **Maximum Minimal Set Cover** problem over the path/threshold-word failure incidence relation.

---

## 12. Exact Ternary Constructions

A sequence of exact finite Node.js experiments constructed increasingly large ternary threshold-critical families.

| Experiment | Path length | Threshold $L$ | Witness width | Non-target nodes |
| --- | ---: | ---: | ---: | ---: |
| 042 | 5 | 10 | 24 | 120 |
| 043 | 6 | 12 | 35 | 210 |
| 044 | 7 | 14 | 54 | 378 |
| 045 | 8 | 16 | 75 | 600 |
| 046 | 9 | 18 | 113 | 1,017 |
| 047 | 10 | 20 | **173** | **1,730** |

Experiment 043 reused path length 6 and threshold 12 with a refined critical-cover search; that note is separated from the path-length column here for clarity.

The strongest current construction uses all 1,536 run-compressed ternary path candidates of length 10 as the search universe and all

$$
3\cdot2^{19}
=
1,572,864
$$

run-compressed treatment words of length 20 as the threshold universe.

### Ternary universal-supersequence ceiling

For any run-compressed ternary path word of length $\ell$, the cyclic word $012012012\cdots$ has a prefix of length $2\ell+1$ containing that path as a subsequence: the first required symbol appears within the first three positions, and because consecutive target symbols differ, each later required symbol appears within at most two additional positions [20].

Hence every family of run-compressed ternary paths of length $\ell$ satisfies

$
\mathrm{OPT}\le 2\ell+1.
$

Therefore $L=2\ell$ is the highest threshold at which a critical cover can establish failure for a family whose paths all have length $\ell$.

The repaired Experiment 047 selected 173 paths and verified:

$$
\bigcup_{i=1}^{173}D_{20}(P_i)=U_{20},
$$

with zero uncovered threshold words.

For every selected path $P_i$, it also recorded a private threshold word $w_i$ that covers the other 172 selected paths and fails $P_i$.

The critical-cover certificate gives

$
\mathrm{OPT}(F_{173})>20.
$

The universal ceiling gives $\mathrm{OPT}(F_{173})\le21$. Therefore

$
\boxed{
\mathrm{OPT}(F_{173})=21.
}
$

Moreover,

$$
\mathrm{OPT}(F_{173}\setminus\{P_i\})\le20
$$

for every $i$.

Hence

$$
\boxed{
W(F_{173})=173.
}
$$

The direct glycan realization is simply 173 independent singleton-susceptibility chains of length 10 under retained target structure: 1,730 non-target nodes [28].

Consequently:

$$
J_h(F_{173})<\mathrm{OPT}(F_{173})
\qquad
\text{for every }h\le172.
$$

Thus no universal fixed-$h$ theorem with $h\le172$ can determine the optimum even in this restricted deterministic three-enzyme chain subclass.

### What this does not prove

The finite ladder

$$
24,\;35,\;54,\;75,\;113,\;173
$$

does **not** prove unbounded ternary witness width.

It also does not prove that 173 is maximum at threshold 20. The search produced an exact inclusion-minimal cover of size 173, not a proof that no larger minimal cover exists.

---

## 13. Standard Examples in the Ternary Subsequence Poset

The private-witness structure has an additional order-theoretic interpretation.

For a threshold-critical family

$$
P_1,\ldots,P_k
$$

with private words

$$
w_1,\ldots,w_k,
$$

we have

$$
P_i\not\preceq w_i
$$

and

$$
P_i\preceq w_j
\quad\text{for }i\ne j.
$$

Because the selected paths all have the same length, they form an antichain under ordinary subsequence. The private words, also of one common length and necessarily distinct, form another antichain.

Therefore the induced poset on

$$
\{P_1,\ldots,P_k,w_1,\ldots,w_k\}
$$

has exactly the cross-relations

$$
P_i<w_j
\iff
i\ne j.
$$

This is the classical **standard example** $S_k$ from poset-dimension theory [16, 29].

A direct linear-extension argument shows that one linear extension cannot reverse two different incomparable diagonal pairs $(P_i,w_i)$. Hence the induced subposet has dimension at least $k$.

This order-theoretic consequence is reported as a **by-product**, not as a novelty claim about dimension theory for subword orders; no dedicated novelty result is asserted here.

Applying the width-173 construction:

$$
\boxed{
\text{the ternary subsequence poset contains an explicitly represented }S_{173}.
}
$$

Therefore it contains a finite induced subposet of Dushnik–Miller dimension at least 173 [16, 29].

The standard-example pattern alone is not enough to certify witness width. Threshold-universe coverage is also required: otherwise some other threshold word might cover every selected path [29].

This distinction is important. The same certificate simultaneously has:

- an optimization reading: witness width $=k$;
- an order-theoretic reading: induced $S_k$, dimension at least $k$.

Neither reading should be substituted for the other.

---

## 14. Computational Certification and Engineering

The finite width constructions were not inferred from heuristic objective values. Each accepted critical cover was checked by exact finite certification:

1. every threshold word was tested against the selected path family;
2. zero threshold words were allowed to cover all selected paths;
3. every selected path required a private threshold word;
4. the direct singleton-chain realization followed from the corrected path-language equivalence.

The active campaign used Node.js only.

At the width-75 scale, repeated structural optimization reduced the same frozen 128-trial workload from approximately 8.09 seconds to approximately 1.64 seconds on the recorded GitHub runner. A historical native implementation of the same earlier search measured approximately 2.27 seconds on its recorded runner execution step. These numbers are workload- and runner-specific and are not a general performance claim about programming languages.

At threshold 20, Experiment 047 evaluated an exact path/word surface of

$$
1,536\times1,572,864
=
2,415,919,104
$$

candidate subsequence pairs. The dense failure bit matrix used 301,989,888 bytes. The complete repaired Node run, including incidence construction, 128 deterministic deletion searches, and exact verification, completed in approximately 119.5 seconds on its recorded runner [28].

### Clue-preserving defect handling

Experiment 047 also produced a useful methodological incident.

An initial scaled run appeared to find a length-20 word containing every length-10 path. Instead of immediately normalizing the anomaly away, the observation was preserved and independently tested.

A separate direct Node verifier found:

$$
\text{universal length-19 words}=0,
$$

$$
\text{universal length-20 words}=0.
$$

Inspection then found the defect: the performance-specialized length-10 kernel manually consumed only symbols $p_0,\ldots,p_8$. The tenth symbol $p_9$ had been omitted.

The minimum repair added $p_9$, added the tenth transition, and added a fail-closed specialization guard tying the unrolled kernel to $PL=10$. The omission had effectively reduced the incidence check to length-9 paths; the ternary ceiling supplies a universal cyclic supersequence of length $2\cdot9+1=19$, so a universal word at threshold 20 is exactly what that defective kernel should permit. The repaired run then produced the width-173 certificate [20, 30].

The episode is relevant because it illustrates the IsoGraph discrepancy discipline: an anomaly is neither automatically promoted to discovery nor immediately discarded as “just a bug.” Competing structural and implementation explanations are separated and falsified.

---

## 15. Relationship to Prior Work

Several external theories illuminate different projections of the frozen model.

### Exoglycosidase analysis

Kobata describes exoglycosidases as reagents that release monosaccharides from non-reducing termini and discusses sequential digestion for structural analysis [1]. GlycoDigest formalizes enzyme specificity information for targeted exoglycosidase use [2]. Song, Aldredge, and Lebrilla use exoglycosidase sequencing in glycan structural annotation [3], while Ruhaak et al. review broader glycomic and glycoproteomic analysis methods [4].

These works motivate terminal exposure and specificity. They do not imply the exhaustive deterministic saturation assumption used here.

### Subsequence order and SCS

Higman's classical work is foundational for well-quasi-order behavior under generalized word embeddings [11]. Maier established classical hardness results for subsequence and supersequence problems [12]. The singleton-susceptibility reduction in this paper lands directly in ordinary SCS, whereas the general set-valued model requires a finite disjunction of SCS-like subproblems.

### PCCSP

Bürgy, Hertz, and Baptiste study PCCSP, where operations have classes, precedence constraints, and the objective is minimizing class switches/setups [13]. The singleton glycan chain subclass has the same “select a class, execute as much as precedence permits” shape. The set-valued susceptibility model is more general because one site may accept several treatments.

### Nuclei and fixed points

Escardó studies joins of nuclei—idempotent, inflationary, meet-preserving maps—on frames [14]. The glycan phase operators independently acquire this exact algebraic shape on the finite removed-ideal lattice.

### WSTS and finite bases

Finkel and Schnoebelen develop the well-structured transition-system framework, where monotone transitions and well-quasi-orders support finite symbolic reasoning [15]. The finite glycan ideal-state system is simpler than the general infinite-state setting but shares the useful antichain/upward-closed geometry.

Aristote gives modern algorithms for learning upward-closed word languages and computing finite bases in quasi-ordered settings [17]. The exact glycan $B_M$ boundary and star-product oracle provide a concrete project-specific interface to those ideas.

### Poset dimension

Dushnik and Miller introduced the dimension of a partially ordered set [16]. The critical-cover private-witness pattern induces the standard examples familiar from that theory. The dimension lower bound used here is also proved directly inside the project artifact [29].

---

## 16. Limitations

### 16.1 Biochemical scope

This is an idealized mathematical model. Real enzyme behavior may depend on kinetics, concentration, incomplete digestion, steric accessibility, substrate context, competition, stochasticity, and other effects excluded here.

### 16.2 Closed-world specificity

The relation $M(e,r)$ is assumed exact and complete for the represented instance. The model does not derive susceptibility from chemistry.

### 16.3 Finite lower bound, not unboundedness

The current strongest unconditional construction gives one fixed ternary instance with

$
W=173
\qquad\text{and}\qquad
\mathrm{OPT}=21.
$

It does **not** establish

$$
\forall k\;\exists F:\;W(F)\ge k.
$$

That unboundedness question remains open in the current project record.

### 16.4 No maximum claim

The deterministic seeded deletion searches generate verified inclusion-minimal critical covers but do not solve Maximum Minimal Set Cover globally. Width 173 is therefore an achievable exact lower bound, not the proven maximum at threshold 20.

### 16.5 No general polynomial-time claim

The exact reductions and special cases shrink or reorganize the search problem. They do not establish a generic polynomial-time algorithm for the unrestricted set-valued model.

### 16.6 IsoGraph evidence status

The primitive reconstruction, internal verifiers, finite exhaustive campaigns, and GitHub workflow evidence are internal project qualification evidence. They should not be represented as independent external validation of IsoGraph itself.

### 16.7 Novelty boundary

This paper cites established structures where they were identified. It does not claim external novelty for nuclei, Higman orders, SCS, PCCSP, WSTS, minimal set covers, or standard examples. A separate literature review would be required before making broader novelty claims about the project-specific synthesis.

---

## 17. Conclusion

An idealized enzyme-treatment problem on rooted branched glycans admits a compact exact algebra.

One exhaustive treatment is simply:

$$
\text{retain resistant active sites}
\quad+\quad
\text{close upward to their blockers}.
$$

That phase operator is a meet-preserving closure. Effective susceptibility completely determines phase behavior. Treatment dominance becomes algebraic absorption. The complete solving language is upward closed under insertion and treatment dominance and has a finite exact minimal boundary.

The path view exposes a sharper transition.

With two effective treatment classes, the no-adjacent-repeat condition forces every irredundant word to alternate, and two paths always suffice to witness the global optimum:

$$
J_2=\mathrm{OPT}.
$$

With three treatment classes, that collapse disappears. Pure synchronization among independent deterministic chains can require many simultaneously load-bearing path constraints. Exact finite constructions now reach:

$
\boxed{W=173},
\qquad
\boxed{\mathrm{OPT}=21}
$

for the strongest current length-10 ternary construction.

The associated private witnesses induce:

$$
\boxed{S_{173}}
$$

inside the ternary subsequence poset and therefore a finite poset-dimension lower bound of at least 173.

The strongest current open question is whether this finite ladder can be replaced by a general construction proving unbounded witness width over a fixed three-symbol alphabet.

That question is now sharply separated from the original biochemical presentation. The remaining difficulty is not local cleavage logic. It is global synchronization in a structured subsequence-order incidence system.

---

## Provenance and Contribution Note

Joshua Oshiro is the author of this paper and the designer of the IsoGraph system and methodology used in this research.

This work was produced with AI/agent assistance operating through and in conjunction with the IsoGraph research process. Agent assistance contributed to primitive rendering work, structural discovery, proof checking, falsification, external-reference research, experiment construction, software implementation, repository operations, and drafting. Authorship and design of the IsoGraph system remain attributed to Joshua Oshiro.

The IsoGraph Project provided the structural representation, qualified Discovery Protocol, identity/unknown discipline, exact provenance records, and frozen experiment framework used to derive and verify the project-specific results reported here.

External publications, mathematical theories, biochemical sources, software ecosystems, and prior results are separately attributed below. No third-party theorem or method is presented as originating from IsoGraph.

---

## License

© 2026 Joshua Oshiro.

This work is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

You are free to share, copy, redistribute, remix, transform, and build upon the original material for commercial or noncommercial purposes, provided appropriate credit is given to Joshua Oshiro, the license is identified, and changes are indicated.

This license applies to the original text, analysis, diagrams, and explanatory material in this paper. Referenced source code, repository contents, third-party publications, trademarks, and other externally owned materials retain their original licenses and ownership.

---

## References

## References

[1] Akira Kobata. “Exo- and endoglycosidases revisited.” *Proceedings of the Japan Academy, Series B* 89(3):97–117, 2013. DOI: https://doi.org/10.2183/pjab.89.97.

[2] Lou Gotz, Jodie L. Abrahams, Julien Mariethoz, Pauline M. Rudd, Niclas G. Karlsson, Nicolle H. Packer, Matthew P. Campbell, and Frederique Lisacek. “GlycoDigest: a tool for the targeted use of exoglycosidase digestions in glycan structure determination.” *Bioinformatics* 30(21):3131–3133, 2014. DOI: https://doi.org/10.1093/bioinformatics/btu425.

[3] Ting Song, Danielle Aldredge, and Carlito B. Lebrilla. “A Method for In-Depth Structural Annotation of Human Serum Glycans That Yields Biological Variations.” *Analytical Chemistry* 87(15):7754–7762, 2015. DOI: https://doi.org/10.1021/acs.analchem.5b01340.

[4] L. Renee Ruhaak, Gege Xu, Qiongyu Li, Elisha Goonatilleke, and Carlito B. Lebrilla. “Mass Spectrometry Approaches to Glycomic and Glycoproteomic Analyses.” *Chemical Reviews* 118(17):7886–7930, 2018. DOI: https://doi.org/10.1021/acs.chemrev.7b00732.

[5] IsoGraph Project. “Optimal enzymatic cleavage trajectories — source freeze 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md.

[6] IsoGraph Project. “Glycan source-reference correction 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_SOURCE_REFERENCE_CORRECTION_0_1.md.

[7] IsoGraph Project. “Glycan primitive rendering 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg.

[8] IsoGraph Project. “Experiment 032 — final verification review.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/experiments/032/FINAL_REVIEW.md.

[9] IsoGraph Project. “Qualified Module Authority Manifest — 2026-09-28” and “Current Integrated Semantic Stack with Core 0.20 and DP 0.8 — 2026-09-28.” Permanent repository snapshots: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/qualification/QUALIFIED_MODULES_2026-09-28.md and https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md.

[10] IsoGraph Project. “Glycan Discovery Protocol 0.1–0.7 campaign report 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_DP07_CAMPAIGN_REPORT_0_1.md.

[11] Graham Higman. “Ordering by Divisibility in Abstract Algebras.” *Proceedings of the London Mathematical Society* s3-2(1):326–336, 1952. DOI: https://doi.org/10.1112/plms/s3-2.1.326.

[12] David Maier. “The Complexity of Some Problems on Subsequences and Supersequences.” *Journal of the ACM* 25(2):322–336, 1978. DOI: https://doi.org/10.1145/322063.322075.

[13] Reinhard Bürgy, Alain Hertz, and Pierre Baptiste. “An exact dynamic programming algorithm for the precedence-constrained class sequencing problem.” *Computers & Operations Research* 124:105063, 2020. DOI: https://doi.org/10.1016/j.cor.2020.105063.

[14] Martín Hötzel Escardó. “Joins in the Frame of Nuclei.” *Applied Categorical Structures* 11(2):117–124, 2003. DOI: https://doi.org/10.1023/A:1023555514029.

[15] Alain Finkel and Philippe Schnoebelen. “Well-structured transition systems everywhere!” *Theoretical Computer Science* 256(1–2):63–92, 2001. DOI: https://doi.org/10.1016/S0304-3975(00)00102-X.

[16] Ben Dushnik and E. W. Miller. “Partially Ordered Sets.” *American Journal of Mathematics* 63(3):600–610, 1941. DOI: https://doi.org/10.2307/2371374.

[17] Quentin Aristote. “Active Learning of Upward-Closed Sets of Words.” In *11th Conference on Algebra and Coalgebra in Computer Science (CALCO 2025)*, LIPIcs 342, 16:1–16:12, 2025. DOI: https://doi.org/10.4230/LIPIcs.CALCO.2025.16.

[18] IsoGraph Project. “A8 maximal-path sufficiency correction 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_IMPLICIT_ASSERTIONS_A8_CORRECTION_0_1.md.

[19] IsoGraph Project. “Glycan publication preflight audit 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_PUBLICATION_PREFLIGHT_0_1.md.

[20] IsoGraph Project. “Glycan publication-review refinements A30 — path coverage, quotient uniqueness, and ternary threshold ceiling 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/0431c392db23da94a93ba972c7ef613c537e82cb/research/glycan-cleavage/2026-09-27/GLYCAN_PUBLICATION_REVIEW_REFINEMENTS_A30_0_1.md.

[21] IsoGraph Project. “DP-fed implicit admissions A12 — phase algebra and dominance-aware language.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_DP_IMPLICIT_ADMISSIONS_A12_0_1.md.

[22] IsoGraph Project. “DP-fed implicit admissions A14 — unique dominance boundary.” Historical derivation refined by [20]. Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_DP_IMPLICIT_ADMISSIONS_A14_0_1.md.

[23] IsoGraph Project. “DP-fed implicit admissions A13 — resistance-chain duality.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_DP_IMPLICIT_ADMISSIONS_A13_0_1.md.

[24] IsoGraph Project. “A19 — two-enzyme exact path collapse.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A19_TWO_ENZYME_EXACT_0_1.md.

[25] IsoGraph Project. “A20 — three-enzyme J3 boundary.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A20_THREE_ENZYME_J3_BOUNDARY_0_1.md.

[26] IsoGraph Project. “A21 — ternary witness width.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A21_TERNARY_WITNESS_WIDTH_0_1.md.

[27] IsoGraph Project. “A23 — critical cover.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A23_CRITICAL_COVER_0_1.md.

[28] IsoGraph Project. “A28 — Node-verified witness width 173” and “Experiment 047 final review.” Permanent repository snapshots: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A28_WITNESS_WIDTH_173_NODE_0_1.md and https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/experiments/047/FINAL_REVIEW.md.

[29] IsoGraph Project. “A29 — critical covers as standard examples.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/research/glycan-cleavage/2026-09-27/GLYCAN_CLUE_DERIVATIONS_A29_STANDARD_EXAMPLE_0_1.md.

[30] IsoGraph Project. “Experiment 047 discrepancy review 0.1.” Permanent repository snapshot: https://github.com/iteathen/IsoGraph/blob/95d32275a8942e34c494296f1d8815bd1268b3a0/experiments/047/DISCREPANCY_REVIEW_0_1.md.
---

## Citation

Oshiro, Joshua. *Exact Phase Algebra and High-Order Synchronization in Optimal Enzymatic Cleavage Trajectories*. IsoGraph Project research publication, revised 2026-09-28. Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro. CC BY 4.0.
