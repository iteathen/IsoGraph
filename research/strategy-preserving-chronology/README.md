# Strategy-preserving chronology elimination

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact partial-order and fixed-word factors; universal strategic quotient OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Which distinctions between event interleavings can be erased **without** altering causal feasibility, action ownership, interventions, first occurrence of terminal conditions, or the order of adaptive choices? This is stronger than checking whether two completed histories have the same final observation.

## Exact source content extracted

Original future Connect4 cells form a disjoint union of gravity chains. Complete hypothetical continuations are linear extensions of this event poset. A future event $e$ at continuation rank $t(e)$ is owned by player $\chi(e)=(n+t(e)-1)\bmod2$; changing an interleaving can therefore change ownership even when the same physical cells are filled.

A four-ribbon geometric unfolding preserves all 69 winning requirements as linked one-dimensional intervals. In the canonical five-center-stones prefix, the final center event acts as a movable marker: moving it across a fixed noncenter word flips the ownership phase of a contiguous interval. This is exact phase bookkeeping, **not** an algebraic perfect-play strategy.

A later source theorem identifies forced ordering between disjoint requirement sets $A,B$ in disjoint-chain event posets:
$A\prec_g B$ iff for every $a\in A$ there exists $b\in B$ later in the **same** chain. Equivalently, $\max t(A)<\max t(B)$ in **every** gravity linear extension. This theorem discards some chronological comparisons before examining any full word. Conditional comparisons still require a residual race interface; the fixed-word quotient retains ownership coloring plus only unresolved cross-owner completion-order bits.

## General structural formulation

Let $P$ be an event poset, $L(P)$ its legal linear extensions, $c_t$ the controller at time $t$, and $\tau$ the first terminal-event rank. A putative equivalence $w\sim w'$ must specify what it preserves: support, final event labeling, ordered terminal events, exact action-labelled transition behavior, or strategies.

**Research conjecture, not established:** for useful classes of adversarial event systems, one can construct a finite relational phase/race kernel $K(P,R,C,T)$ and an algebraic update/closure that selects a correct present action without evaluating multiple strategically different futures.

## Known obstructions

- Two legal event orders may reach the same support while changing event ownership under alternating control.
- The same eventual event-owner coloring can yield a different **first winner** when relative completion order changes.
- A fixed-word payoff quotient says nothing by itself about which future words each player can force; $\exists$ and $\forall$ must not be commuted.
- Center completion does not split the problem into independent left/right games because original win requirements bridge both sides.
- Recasting a full strategy tree as QBF, BDD, a set of all words, or an enormous memoized kernel does not satisfy the stated zero-strategic-branching objective.

## Research tests beyond Connect4

1. Define a small asynchronously scheduled protocol with two competing controllers, precedence edges and a first-alarm terminal condition.
2. Enumerate its histories *only in an independent validator*. Classify proved event swaps as controller-preserving, outcome-preserving, and strategy-preserving; exhibit failures of the implications.
3. Prove an analogue of the max-completion precedence theorem for arbitrary posets and characterize when it is necessary as well as sufficient.
4. Develop an abstract race-interface quotient for specified complete traces, then test separately whether it admits an exact **strategy** quotient.
5. Require explicit action-labeled counterexamples to any proposed chronology elimination that cannot preserve universal adaptive response.

## Open questions

Which trace congruences preserve alternating strategies? What finite information captures the first competing event without retaining all ranks? Can order-insensitive **proof certificates**, rather than order-insensitive histories, close the adaptive decision problem? What structural restrictions make this possible?

## Frozen primary sources and evidence

- [Owner refocus and phase/race factor](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-owner-refocus-unfolded-geometry-turn-sequence-elimination-and-race-factor.md) — frozen Connect4 source at 756a78493a78.
- [New maximal-precedence temporal quotient](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-unfolded-winning-line-maxima-poset-temporal-quotient.md) — frozen Connect4 source at 756a78493a78.
- [Physical checks and 673 additional fixed-word chronology guards](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-18-unfolded-phase-race/STANDARD7X6_GRAVITY_POSET_MAXIMAL_RACE_673_NEW_TEMPORAL_SOURCE_GUARDS_RESULTS_0_1.json) — frozen Connect4 source at 756a78493a78.
- [Colored event structure local confluence](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-colored-event-structure-and-proof-antichain-control.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [First-occurrence and competing terminal-event dynamics](../first-occurrence-dynamics/README.md)
- [Linked-interval unfolding of relational geometry](../relational-geometry-unfolding/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
