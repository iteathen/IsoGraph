# Observation-relative structural invariants

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact state/observation distinctions in source; abstract minimization program open. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

What is the weakest equivalence between two relational states that preserves a **specified observation or claim** and the dynamics needed to establish that claim? Identity, structural isomorphism, equality of a scalar outcome, future-behavior equivalence and reusability of one local proof are different relations. The observation must be declared before quotienting.

## Exact source content extracted

Connect4's exact original future-state descriptor is $q=(h,R_0,R_1)$, containing gravity support and owner-tagged minimal residual win requirements. For a correctly scoped action-labelled state quotient, preserving legal action labels, mover, termination, successor quotient and the relevant rank/score is sufficient to preserve finite-horizon minimax outcomes by induction. A horizontal-reflection equivalence requires action transport rather than pretending original literal column labels are identical.

A separate complete 4×3 Connect-3 control provides a crucial negative witness: its W/D/L-preserving support/residual quotient merged classes with **different sets of original winning-line labels**; 181 value-quotient classes had more than one terminal-line-provenance output. The repair retains a provenance annotation when provenance is observable. Thus a value quotient is not automatically an output quotient. Source work also proved reuse of a singleton-discharge theorem across three distinct physical contexts whose complete successor states were not identical.

## General structural formulation

Fix a transition system $(S,A,T)$, an observation family $\mathcal O$ and a target theorem $\phi$. An abstraction $\alpha:S\to Q$ is **adequate for $\mathcal O$** only when its fibers preserve the observations and the action/transition information consumed by $\mathcal O$. A weaker claim-specific equivalence may preserve just the guarded dependency cone of $\phi$; it must NOT be promoted to whole-state bisimulation.

Candidate research object: $\Sigma_\phi(s,e)$, a canonical typed dependency cone for proving $\phi$ about event $e$ in state $s$. Investigate when isomorphism of two such cones is sufficient to transport a proof, including frame conditions, deadlines, resource constraints, control ownership and terminal alternatives.

## Established boundary and falsifiers

- Identical value does not establish identical optimal move labels, distance-sensitive value, or provenance.
- A local theorem may be reusable even where the complete transition systems are not equivalent.
- A history projection may preserve static facts but erase which opponent event a legal response must depend on. That invalidates a uniform strategy even though static projection checks pass.
- A claim-relative quotient requires proof of its own observation and dependency preservation; hash equality or sample agreement is insufficient.

## Independent research program

1. Choose small independently specified labelled transition systems with two outputs, e.g. a Boolean safety property and named terminal cause. Construct pairs equal for the first and different for the second.
2. Compute exact future-behavior, observation-specific and claim-relative partitions. Establish inclusion relations between partitions; preserve counterexamples where an asserted refinement fails.
3. Derive $\Sigma_\phi$ from a backwards guarded implication graph. Check theorem transport by a mechanically specified proof rule, not similarity of vocabulary.
4. Compare the size of the smallest adequate quotient with a complete bisimulation and with a proposed static descriptor. Report both soundness and actual reduction, not compactness alone.
5. If this transfers into IsoGraph, represent comparison scope and unresolved dependencies explicitly; do not manufacture new primitive identities.

## Open questions

Does a finite minimal $\phi$-dependency representation exist under usable closure hypotheses? Can multiple observations share one incremental quotient compiler? Which features of the original context are recoverable from the proof rather than retained as explicit state? When is a claim-relative proof adequate for **adaptive** strategies rather than a single conclusion?

## Frozen primary sources and evidence

- [Minimum-description semantic quotient](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-10-minimum-description-semantic-quotient.md) — frozen Connect4 source at 756a78493a78.
- [Claim-relative event isomorphism](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-claim-relative-event-isomorphism.md) — frozen Connect4 source at 756a78493a78.
- [Output-sensitive provenance counterexample](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-output-provenance-quotient.md) — frozen Connect4 source at 756a78493a78.
- [Uniform-strategy dependency evidence](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/evidence/realizability/2026-09-16-strategy-dependency-and-history-complexity.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Local-to-global relational realizability](../local-to-global-realizability/README.md)
- [Composable structural proofs and dependency-closed certificates](../composable-structural-proofs/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
