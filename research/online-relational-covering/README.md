# Online relational covering under precedence

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact guarded first-touch defensive theorem; multi-resource extension OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

When can a controller protect a family of dynamically activated hypergraph obligations with **one online response policy** inferred from initial incidence and precedence, without constructing an adaptive response tree?

## Exact source construction

At a nonterminal Connect4 source, let $R_p$ be the antichain of currently surviving future-cell requirements for attacker $p$. For each requirement $G\in R_p$ and column chain $c$, define its **gate** as its lowest still-unplayed required cell in that chain. Let $\mathrm{Gates}(x)$ contain all $G$ for which $x$ is one such gate, and define
$I(x)=(\bigcap_{G\in\mathrm{Gates}(x)}G)\setminus\{x\}$.

The source theorem requires a deterministic reply $y(x)\in I(x)$ at **every** nonempty gate. The reply must remain immediately legal: either the direct successor above $x$ in the same gravity chain, or an initial root frontier cell whose availability is maintained by the invariant. The strategy claims $y(x)$ after the attacker's first touch at $x$; all newly touched viable requirements are blocked at once. Induction shows that after every attacker/defender pair, no still-viable attacker requirement has an attacker-owned future cell. Hence the attacker cannot force a first win against that policy.

This is a **directed, potentially many-to-one online hitting policy**, not a disjoint perfect pairing. In one nonuniform source sample it produced 295 conditional no-forced-win certificates and, combined with separate outcome proofs, 19 newly certified Level-2 roots over the immutable earlier V4 method. These are internal source/physical controls, not universal general-game coverage.

## Abstract formulation

Take a finite event poset $(E,\prec)$, an inclusion-minimal obligation hypergraph $\mathcal H$, alternating controllers and an enabled-event function $\operatorname{Frontier}(I)$. Seek an online policy $y:E\to E$ such that every newly activated still-viable hyperedge is hit before any terminal completion, with explicit release/legal-response guards.

A richer future result might replace the one-response intersection by a **pending obligation debt** and resource-timing invariant: a single response can defer or discharge different hyperedges across later turns, as long as no obligation reaches its deadline first.

## Important falsifiers and research boundary

Canonical Connect4 prefix 44444 has 35 first-touch gates: 23 with no common residual blocker, 4 with a common cell not immediately available under the source release guards, and 8 with an immediately safe common blocker. These are obstructions **to the present theorem**, not evidence that the attacker forces a win. A selected-critical-subfamily pilot certified zero additional no-forced-win positions over the older guard on the same 5,031 sampled states; narrowing hyperedges alone is not demonstrated progress.

A historical relaxed odd pending-pair response theorem failed because cross-chain release ordering made an apparently valid mate illegal. In any other poset, local obligation coverage is insufficient without legal activation and deadline proof.

## Proposed independent studies

1. Reproduce the theorem on abstract finite chain-union hypergraphs, with an independent adversarial validator.
2. Find minimal counterexamples when (a) the common-blocker condition, (b) the frontier availability condition, or (c) the first-touch precondition is removed.
3. Study response-sharing versus injective pairing and measure classes newly certifiable with directed policies.
4. Develop a conservative resource-debt/rank potential with legal updates; check soundness before measuring additional coverage.
5. Apply to one non-game setting, such as incident-response scheduling where triggers release new permitted mitigations.

## Open questions

Is there a complete finite source criterion for a useful class of precedence-constrained online transversals? Can obligation collisions be handled by temporal debt without hiding strategy-tree search? Which resource-sharing patterns have an exact matroid, polymatroid, or flow representation?

## Frozen primary sources and evidence

- [Directed first-touch theorem and proof guards](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-source-first-touch-universal-blocker-invariant.md) — frozen Connect4 source at 756a78493a78.
- [Combined outcome and best-action theorem](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-first-touch-directed-blocker-plus-opponent-dual-or-one-nonloss-level2.md) — frozen Connect4 source at 756a78493a78.
- [Source 7x6 conditional physical control](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-17-zero-fanout-direct-invariants/STANDARD7X6_FIRST_TOUCH_DIRECTED_NONPAIRING_NO_FORCED_WIN_PHYSICAL_RESULTS_0_1.json) — frozen Connect4 source at 756a78493a78.
- [Critical-subfamily negative marginal control](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-18-first-touch-multiresource/STANDARD7X6_CRITICAL_SUBFAMILY_INITIAL_NEGATIVE_MARGINAL_CONTROL_0_1.json) — frozen Connect4 source at 756a78493a78.
- [Canonical gate 23/4/8 evidence](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/isograph/discovery/2026-10-18-first-touch-multiresource/STANDARD7X6_CANONICAL44444_FIRST_TOUCH_23_4_8_GATE_CLASSIFICATION_0_1.json) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Resource-capacity duality and inevitable outcomes](../resource-capacity-duality/README.md)
- [Composable structural proofs and dependency-closed certificates](../composable-structural-proofs/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
