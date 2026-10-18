# Scalar-free optimal decision certificates

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact conditional action-order inference; general source domination remains OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Can we identify a correct optimal action through **proved qualitative ordering relations**, without computing the objective's numerical value for every alternative?

## Exact extracted decision rule

Suppose $A(q)$ is the finite set of legal current actions and $J_a(q)$ is the unknown complete-future outcome value after action $a$. For the maximizing player, proving $J_b(q)\le J_{a^*}(q)$ for **every** $b\in A(q)$ is sufficient to select $a^*$. For a minimizing player reverse the inequalities. This is an elementary extremal-order theorem; its practical value is the possibility of proving comparisons directly from current structural sources.

In Connect4, source-only cofactor inclusion, a fixed equal-height column swap, exact board reflection, and guarded owner-tagged incidence transport yielded sound weak-order edges between **original current action labels**. Transitive closure over those labels can select an extremum with no explicit scalar root W/D/L result. The source proof uses static transformations, not alternate future-game value evaluations.

The three deterministic transform union gave 101 certified best-action roots on a specific 10,083-source-position comparison corpus, **all previously certified by V4**. This is a negative *marginal coverage* result even though the comparisons are mathematically valid. At canonical 44444, reflection proves equivalence only within four classes $\{1,7\},\{2,6\},\{3,5\},\{4\}$, without ordering those classes.

## Proposed general object

A **proof-carrying partial preference relation** is $(A,\preceq_C)$ where each edge $a\preceq_C b$ has a checkable certificate guaranteeing the objective's weak ordering under all admissible futures. An output need only exhibit one element that dominates every alternative via sound derivations; the total numeric valuation of actions need not be exposed.

## Guardrails

- One comparison $J_2\le J_7$ does not prove either action globally best when another action can be stronger. The source contains an actual example where both compared actions lose while the unique best action is elsewhere.
- Symmetry equality does not establish an inequality against nonsymmetric alternatives.
- The theorem does not make the dominance relation cheap to discover or prove. Hidden full game-tree computation merely renamed as a preference certificate is not the intended method.
- A failure to find a certified extremum returns INCOMPLETE, not a claim that no optimal action exists.

## Independent research program

1. Specify a separate finite optimization task whose objective is expensive but whose constraints imply cheap pairwise dominance certificates.
2. Implement a proof checker for each claimed edge, with value computation entirely isolated as a test oracle.
3. Compute the transitive closure and select a global extremum. Identify exactly when no extremum is certified.
4. Compare coverage and certificate size against explicit objective evaluation; preserve negative marginal improvements.
5. Explore links to partial-order optimization, symbolic optimization and AI action policies while refusing to substitute heuristic scores for proofs.

## Open questions

Which structural transformation families yield useful complete weak orders? What minimal extra observation breaks incomparable action classes? Can one prove a best action from a global exclusion/robust bound without producing pairwise comparisons against every other action?

## Frozen primary sources and evidence

- [Qualitative current-action closure](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-three-deterministic-original-q-maps-WDL-order-closure.md) — frozen Connect4 source at 756a78493a78.
- [Action extremum without root scalar](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-source-WDL-extremal-one-best-action-no-scalar-value.md) — frozen Connect4 source at 756a78493a78.
- [Deterministic map negative marginal result](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-17-zero-fanout-direct-invariants/STANDARD7X6_THREE_DETERMINISTIC_MAPS_UNION_101_BEST_ZERO_NEW_V4_RESULTS_0_1.json) — frozen Connect4 source at 756a78493a78.
- [Historical full research handoff, decision levels](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-COMPLETE-zero-strategic-branching-Level2-research-handoff.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Observation-relative structural invariants](../observation-relative-invariants/README.md)
- [Composable structural proofs and dependency-closed certificates](../composable-structural-proofs/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
