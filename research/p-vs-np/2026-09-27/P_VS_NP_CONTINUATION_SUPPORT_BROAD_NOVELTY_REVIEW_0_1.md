# P versus NP continuation-support synthesis — broad external novelty review 0.1

**Status:** publication-support novelty review; no external novelty theorem established  
**Date:** 2026-09-27 America/Los_Angeles  
**Repository baseline:** main@84e2f4d2386f9cd1a7b2c533752600eee82e44bf  
**Purpose:** determine which parts of the proposed continuation-support paper are established prior art, exact project-local reformulations, or possible synthesis novelty.

## 1. Review question

The proposed paper organizes bounded existential computation around the continuation-support family of a residual prefix p:

~~~text
C_p = set of admissible suffixes that complete p to acceptance.
~~~

It then studies five support reductions/views:

~~~text
empty support        -> delete
equal support        -> merge
included support     -> dominance prune
live incomparable    -> exact factorization / sharing
objective-only need  -> exact aggregate projection
~~~

The review asks whether those mechanisms, their relationships, or the combined framework are externally novel.

## 2. Continuation equivalence is established

The relation:

~~~text
p ~ q
IFF
for every continuation s:
    p.s accepts IFF q.s accepts
~~~

is in the classical Myhill–Nerode lineage of future-language equivalence and right congruences.

The P-vs-NP campaign's Q-RESIDUAL relation is therefore not externally novel as a general mathematical idea.

Project-specific value remains in its exact scoped integration with the primitive bounded-verifier rendering, NEI scope discipline, and the other reduction relations.

## 3. Simulation, language inclusion, and antichains are established

Automata literature uses simulation preorders and antichain/subsumption techniques to avoid explicit state-space expansion during universality and language-inclusion checking.

Doyen and Raskin (2009) explicitly exploit simulation preorders inside antichain algorithms.

Holík and related work develop simulation and antichain combinations for efficient finite-automata handling.

RABIT-family workflows also combine dead-state removal, simulation-based minimization, and antichain-style inclusion procedures.

Therefore:

~~~text
sound inclusion / simulation evidence
    -> safe pruning
~~~

is established prior art.

The project should not claim novelty for continuation dominance, antichain pruning, or the use of sound incomplete simulation as such.

## 4. Dead-state / dead-support pruning is established

Automata preprocessing routinely removes states or behavior that cannot contribute to acceptance.

The P-vs-NP campaign's exact statement:

~~~text
C_child = empty
    -> child contributes nothing to existential acceptance
~~~

is mathematically elementary and externally standard in substance.

The A25 contribution should therefore be presented as a project-local formal integration:

~~~text
negative evidence
    -> dead-child certificate
    -> reduced simulation obligations
    -> dominance pruning
~~~

rather than as a new dead-state theorem.

## 5. Knowledge compilation already separates succinctness from tractable operations

Darwiche and Marquis (2002) explicitly organize knowledge-compilation languages by at least:

- succinctness;
- queries supported in polynomial time;
- transformations supported in polynomial time.

That directly overlaps the project's firewall:

~~~text
compact representation
    != cheap construction
    != cheap next operation.
~~~

This principle is established and should be credited as such.

## 6. Existential closure / forgetting is established knowledge-compilation territory

Marquis (2011) studies existential closures of propositional compilation languages and analyzes their expressiveness, succinctness, queries, and transformations.

Therefore the project's emphasis on existential projection as a representation-sensitive operation is not new in general.

The paper can use the continuation-support framework to connect this literature to residual-language/simulation terminology, but must not claim discovery of existential forgetting as a representation problem.

## 7. Width under quantification is established

Capelli and Mengel (2018) study width and quantification for OBDD and structured deterministic DNNF and show how quantification affects representation width.

This is close prior work for the project's representation-relative retained-support quantity W_i(R).

The project-specific contribution is not the statement that width can grow under quantification; it is the integration of representation-relative width with the continuation-support reduction ladder and the explicit requirement to account for the next exact operation.

## 8. Boolean functional synthesis has stronger normal-form results

Akshay et al. (FMCAD 2019) introduce SynNNF and show that it supports polynomial-time Boolean functional synthesis and polynomial-time existential quantification under an appropriate order.

Shah, Bansal, Akshay, and Chakraborty (LICS 2021) introduce SAUNF and give a normal-form characterization of efficient Boolean Skolem-function synthesis: polynomial-time synthesis is characterized through polynomial-time compilation to the representation, and polynomial-size solutions correspond to polynomial-size equivalent SAUNF representations.

These results are stronger and more specific than any current IsoGraph claim that a useful representation must be compact and operation-accessible.

The proposed paper must therefore position its factorization/accessibility condition as a **structural synthesis and research lens**, not as a newly discovered tractability characterization.

## 9. The explicit-CNF blowup example is not a general lower bound

The project family CNF-IA-011 establishes exponential materialized clause growth for one exact source-ordered elimination procedure.

CNF-IA-012 supplies a compact exact alternate factorization of the same projected function.

This is consistent with the knowledge-compilation literature and reinforces a standard warning:

~~~text
fixed-representation blowup
    !=
representation-independent complexity lower bound.
~~~

The exact family remains useful as a project-local falsifier because it prevents the campaign itself from over-interpreting an explicit-CNF explosion.

It should not be advertised as a new lower bound.

## 10. Possible synthesis novelty

The broader search did not identify the following exact organization as a standard named framework:

~~~text
one continuation-support object C_p

empty
    -> delete

equality
    -> merge

inclusion
    -> one-way dominance prune

remaining live incomparable union
    -> exact factorization / sharing

objective-only demand
    -> exact aggregate projection
~~~

with every route evaluated under separate obligations for:

~~~text
semantic soundness/exactness
construction cost
retained representation size
next-operation cost
progress/rank
and, where applicable,
sound incomplete local certificates.
~~~

However:

- every individual level has strong prior art;
- adjacent combinations have prior art;
- knowledge compilation already supplies a mature succinctness/operations perspective;
- Boolean functional synthesis already provides representation-based tractability characterizations;
- absence of the exact ladder from this search is not proof of publication-level novelty.

Disposition:

~~~text
continuation-support reduction ladder:
    POSSIBLE SYNTHESIS / EXPOSITORY NOVELTY
    NOT A NEW COMPLEXITY THEOREM

unified accessibility accounting:
    POSSIBLE METHODOLOGICAL SYNTHESIS
    SUBSTANTIAL PRIOR-ART OVERLAP

negative-evidence -> filtered-simulation connector:
    PROJECT-LOCAL FORMAL INTEGRATION
    PRIOR-ART ANALOGUES FOUND
~~~

## 11. Publication recommendation

The paper is supportable if framed as:

> a structural synthesis that places several established reductions over one exact continuation-support semantics, derives their elementary preservation relations, and uses a representation-dependent falsifier to delimit what those reductions can and cannot imply for bounded existential computation.

The paper should explicitly state:

1. it does not resolve P versus NP;
2. it does not claim a new general knowledge-compilation or synthesis theorem;
3. it does not claim novelty for Myhill–Nerode equivalence, simulation, antichains, dead-state pruning, forgetting, DNNF/OBDD ideas, SynNNF, or SAUNF;
4. its possible novelty lies in the exact combined framing and IsoGraph-specific accessibility/uncertainty discipline;
5. that possible novelty remains a synthesis claim unless independent expert review establishes more.

## 12. Representative external references

1. J. Myhill. “Finite Automata and the Representation of Events.” WADD Technical Report 57-624, pp. 112–137, 1957.
2. A. Nerode. “Linear Automaton Transformations.” Proceedings of the American Mathematical Society 9(4):541–544, 1958. DOI: 10.1090/S0002-9939-1958-0135681-9.
3. Adnan Darwiche and Pierre Marquis. “A Knowledge Compilation Map.” Journal of Artificial Intelligence Research 17:229–264, 2002. DOI: 10.1613/JAIR.989.
4. Laurent Doyen and Jean-François Raskin. “Antichains for the Automata-Based Approach to Model-Checking.” Logical Methods in Computer Science 5(1:5), 2009. DOI: 10.2168/LMCS-5(1:5)2009.
5. Pierre Marquis. “Existential Closures for Knowledge Compilation.” IJCAI 2011, pp. 996–1001. DOI: 10.5591/978-1-57735-516-8/IJCAI11-171.
6. Lukáš Holík. “Simulations and Antichains for Efficient Handling of Finite Automata.” Doctoral thesis / arXiv:1706.03208, 2017.
7. Florent Capelli and Stefan Mengel. “Knowledge Compilation, Width and Quantification.” arXiv:1807.04263, 2018.
8. S. Akshay, Jatin Arora, Supratik Chakraborty, S. Krishna, Divya Raghunathan, and Shetal Shah. “Knowledge Compilation for Boolean Functional Synthesis.” FMCAD 2019, pp. 161–169. DOI: 10.23919/FMCAD.2019.8894266.
9. Preey Shah, Aman Bansal, S. Akshay, and Supratik Chakraborty. “A Normal Form Characterization for Efficient Boolean Skolem Function Synthesis.” LICS 2021. DOI: 10.1109/LICS52264.2021.9470741.
10. FORQ-Based Language Inclusion Formal Testing, 2022, documents a RABIT workflow combining dead-state removal, simulation-based minimization, and antichain heuristics.

## 13. Final novelty disposition

~~~text
new P-vs-NP theorem:
    NO

new lower bound:
    NO

new general tractability characterization:
    NO

new individual pruning / equivalence mechanism:
    NO

potential contribution:
    unified continuation-support synthesis
    +
    exact relation among several known reduction modes
    +
    explicit representation/accessibility firewall
    +
    falsifier-driven boundary statement

external novelty strength:
    MODEST / SYNTHESIS-LEVEL / REQUIRES EXPERT REVIEW
~~~
