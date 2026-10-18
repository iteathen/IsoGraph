# First-occurrence and competing terminal-event dynamics

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact supplied-word payoff and forced-completion precedence; adaptive extension OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

When an evolving relational system has multiple potential terminal conditions, which information about its history is needed to decide **which condition occurs first**? Separate eventual satisfaction from chronological precedence and distinguish both from what competing controllers can force.

## Fixed-history theorem extracted

For each player $p$ and each surviving requirement $G\in R_p$, let $M_{p,G}(\chi)$ assert that every cell in $G$ is eventually assigned owner $p$ by a provided complete hypothetical event word $w$. Let $F_p(\chi)=\bigvee_G M_{p,G}(\chi)$. The earliest completion time of $G$ is $\max_{e\in G} t_w(e)$, and the earliest player completion time is the minimum over its satisfied requirements.

If $\rho(w)=+1$ when P0 completes first and $-1$ when P1 completes first, with the value immaterial unless both eventually finish a requirement, the exact P0-relative payoff is

$$\mathrm{PAYOFF}(w)=F_0(\chi)-F_1(\chi)+F_0(\chi)F_1(\chi)\rho(w).$$

The proof is four-case Boolean algebra: neither completes; only P0; only P1; both complete. For a disjoint pair of requirement sets $A,B$ inside a disjoint-chain poset, $A\prec_g B$ (every $a$ has a strictly later same-chain $b$) is necessary and sufficient for $\max t(A)<\max t(B)$ under **all unrestricted legal chain interleavings**.

Therefore a supplied-word first winner can be reconstructed from eventual owner coloring together with *only* unresolved pairwise completion race bits; statically forced comparisons need no per-word timing bit. The new sufficient $U(q)=\emptyset$ guard eliminates the race interface for the fixed-word payoff.

## Evidence scope

The updated source controls found 1,194 no-unresolved-pair guard-positive observations versus 521 older no-disjoint-pair guard positives on one nonuniform 3,720-position corpus: **673 additional fixed-word chronology-independent source positions**. The physical controls found no discrepancy among 4,120 provided full-word checks; an additional isolated execution tested 180 words. Those numbers are **not** new Level-2 best moves and do not establish general completeness. At canonical prefix 44444, the interface still contains 1,266 unresolved potential cross-owner pairs and first-move selection is INCOMPLETE.

## Candidate generalization

Let each irreversible event condition be a finite requirement family in an event poset. Factor a completed trace into (a) which conditions become satisfied and (b) only those completion-order comparisons not entailed by precedence or mutually exclusive resource ownership. Study further reduction using feasibility of the shared coloring, interval geometry and controller constraints.

## Counterexamples and validation plan

- Build two traces with the same final state but distinct first terminal events; the final-state quotient must fail the first-occurrence observation.
- Test the poset forced-completion test on arbitrary finite posets, and distinguish the unrestricted-linear-extension theorem from stronger color-constrained claims.
- Test a multi-terminal asynchronous protocol with absorbing terminal states. Hypothetical post-terminal events must be explicitly labeled as bookkeeping, never physical continuation.
- Add controller-dependent choice and check whether the quotient preserves strategies. Do **not** infer this from payoff equality on supplied traces.

## Open questions

What is the smallest sufficient first-occurrence race interface for a given event structure? When are race bits dependent or infeasible? Can a fixed-word race quotient lift to a strategy-preserving quotient under useful structural restrictions?

## Frozen primary sources and evidence

- [Original exact conditional race payoff](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-owner-refocus-unfolded-geometry-turn-sequence-elimination-and-race-factor.md) — frozen Connect4 source at 756a78493a78.
- [Maxima-poset race-interface theorem](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-unfolded-winning-line-maxima-poset-temporal-quotient.md) — frozen Connect4 source at 756a78493a78.
- [Fixed-word physical falsifier results](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-18-unfolded-phase-race/STANDARD7X6_GRAVITY_POSET_MAXIMAL_RACE_673_NEW_TEMPORAL_SOURCE_GUARDS_RESULTS_0_1.json) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Strategy-preserving chronology elimination](../strategy-preserving-chronology/README.md)
- [Online relational covering under precedence](../online-relational-covering/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
