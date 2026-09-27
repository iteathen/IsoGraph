# P versus NP DP reapplication — targeted external novelty review 0.1

**Status:** targeted novelty review; no external novelty claim
**Date:** 2026-09-27
**Parent:** P_VS_NP_DP07_REAPPLY_0_1.md
**Purpose:** distinguish standard prior art from structures that are only new to the current IsoGraph campaign.

## 1. Review scope

This was intentionally narrow rather than a broad literature survey.

Queries targeted the specific post-DP claims:

- dead-state/dead-transition pruning before simulation/equivalence;
- simulation and antichain pruning for language inclusion;
- existential quantification / forgetting and representation blowup;
- compact representation versus tractability of subsequent operations;
- combinations of dead pruning, simulation, factorization, and aggregation.

## 2. Dead-support pruning is not externally novel

Prior art directly uses dead-state removal before or together with simulation/equivalence procedures.

Examples located:

- RABIT language-inclusion workflow removes dead states, minimizes using simulation, and then uses simulation/antichain heuristics.
- Skip-free GKAT work defines dead states, prunes dead subterms/transitions, and proves language-preserving normalization before bisimulation.
- Recent GKAT decision procedures similarly normalize transitions that cannot reach acceptance before equivalence checking.

Therefore the core principle:

~~~text
prove a branch/state cannot reach acceptance
    ->
remove it before simulation/equivalence
~~~

is established prior art.

A25's contribution is consequently classified as:

~~~text
STANDARD_KNOWN_PRINCIPLE
+
NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN formalization/generalization.
~~~

No external novelty is claimed for IA-345..354 as a family.

## 3. Simulation/dominance/antichain pruning is not externally novel

Automata literature has long used:

- simulation preorders;
- antichains;
- subsumption;
- language inclusion/equivalence pruning.

The campaign's continuation-dominance formulation and sound-incomplete simulation route sit in this established family.

The corrected dead/live distinction is important for internal correctness but is not sufficient evidence of external novelty.

## 4. Representation-relative support and operation closure are not externally novel

Knowledge-compilation literature explicitly evaluates representation languages along two axes:

~~~text
succinctness
and
tractability of supported queries/transformations.
~~~

Existential quantification/forgetting is a standard transformation studied in this framework.

Prior work explicitly records that:

- CNF can grow under repeated forgetting/elimination;
- other representations may be more succinct or support forgetting more efficiently;
- a representation's usefulness depends not only on compact size but on which transformations/queries remain polynomial.

Therefore A23's central firewall:

~~~text
compact representation
    !=
cheap next operation

fixed-representation blowup
    !=
representation-independent lower bound
~~~

matches established knowledge-compilation principles.

It remains useful as a P-vs-NP campaign discipline, but it is not externally novel as a general representation theorem.

## 5. CNF elimination blowup is established

Prior QBF/knowledge-compilation literature explicitly describes existential forgetting of one CNF variable by pairing positive/negative clauses and notes that repeated forgetting can lead to exponentially sized structures.

Thus the project's explicit CNF support-growth witness should be treated as an independently reconstructed standard phenomenon, not a novel lower bound.

The project's important contribution was the immediate alternate-factorization falsifier preventing overinterpretation of that blowup.

That is good research hygiene, not a new complexity theorem.

## 6. Potentially novel synthesis: continuation-support reduction ladder

The post-DP campaign combines several known mechanisms into one primitive semantic ladder:

~~~text
empty support
    -> delete

equal support
    -> merge

included support
    -> dominance prune

remaining live incomparable support
    -> exact factorization/sharing

objective-only need
    -> aggregate homomorphic image.
~~~

The targeted search did not locate this exact hierarchy as a standard named theorem/framework for bounded existential projection.

However:

- its individual levels have substantial prior art;
- adjacent combinations also have prior art;
- absence from a targeted search is not evidence of publication-level novelty.

Disposition:

~~~text
NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN
POSSIBLE_SYNTHESIS_NOVELTY
EXTERNAL_NOVELTY_UNREVIEWED.
~~~

Do not call it externally novel without a broader scholarly search and expert review.

## 7. Potentially novel campaign connector: local negative evidence feeding simulation obligations

The exact connector:

~~~text
sound rejection invariant / sound empty upper abstraction
    ->
dead-child certificate
    ->
reduced simulation obligation set
    ->
dominance pruning
~~~

has clear analogues in automata normalization, model checking, and abstract interpretation.

The targeted search found direct examples of dead-state preprocessing followed by simulation/bisimulation.

It did not establish that the project's fully generic bounded-existential/QU-safe formulation is new.

Disposition:

~~~text
PRIOR_ART_ANALOGUES_FOUND
GENERIC_ISOGRAPH_FORMULATION_NEW_TO_PROJECT
EXTERNAL_NOVELTY_UNREVIEWED.
~~~

## 8. QU/NEI integration

The specific combination of:

- fail-closed QU realization-family discipline;
- scoped NEI quotient identity;
- dead-support filtering;
- transformation-local equivalence;
- dominance/factorization accessibility

is specific to the IsoGraph framework.

That makes it new to this project by construction.

It does not automatically make the underlying mathematical mechanisms externally novel.

## 9. Novelty conclusion

### Clearly not novel externally

Treat as standard/known in substance:

~~~text
dead-state pruning before simulation/equivalence
simulation preorder pruning
antichain/subsumption pruning
CNF existential elimination by resolution
repeated forgetting causing representation growth
succinctness-versus-tractable-operation tradeoffs
compact representation not implying cheap transformation.
~~~

### New to the current IsoGraph campaign

~~~text
continuation-support reduction ladder
the explicit integration of negative evidence with local dominance obligations
the unified accessibility accounting across identity/dominance/factorization/aggregate routes
the QU/NEI fail-closed formulation of those relations.
~~~

### Externally novel

~~~text
NOT ESTABLISHED.
~~~

No publication-level novelty claim is authorized by this review.

## 10. Representative sources found

- Laurent Doyen and Jean-Francois Raskin, "Antichains for the Automata-Based Approach to Model-Checking", 2009.
- Lukáš Holík, "Simulations and Antichains for Efficient Handling of Finite Automata", 2017.
- FORQ-based language-inclusion literature documenting RABIT dead-state removal + simulation + antichain pruning.
- Skip-free Guarded Kleene Algebra work defining/pruning dead behavior before bisimulation.
- Pierre Marquis, "Existential Closures for Knowledge Compilation", IJCAI 2011.
- Florent Capelli and Stefan Mengel, "Knowledge Compilation, Width and Quantification", 2018.
- Darwiche/Marquis knowledge-compilation-map lineage on succinctness versus supported polynomial queries/transformations.
- QBF/knowledge-compilation work explicitly describing repeated CNF forgetting/elimination blowup.

## 11. Truth status

This novelty review has no effect on the theorem status:

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
