# Resource-capacity duality and inevitable outcomes

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact guarded fractional-packing certificates; adaptive deadline-resource theory OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Can a dynamic outcome be proved impossible or inevitable using inequalities over **obligations and limited resources**, without evaluating each possible schedule or competing game continuation? What dynamic assumptions are required for such capacity proofs to remain valid?

## Exact extracted inequality

Let $\mathcal H$ be the opponent's surviving family of residual winning requirements over future events $E$. Assign each requirement a nonnegative rational weight $\lambda_G$ satisfying

$$\sum_{G\ni e}\lambda_G\le 1\quad\text{for every remaining cell }e.$$

Every hitting set $B$ for all requirements then has size at least $\sum_G\lambda_G$: sum all covered requirement weights, and charge each selected blocker cell at most one. Thus if $\sum_G\lambda_G>k$, no set of at most $k$ future defending moves can block all opponent requirements.

In Connect4, if an additional **uniform legal opponent policy** prevents the current mover from winning first, then an opponent line cannot be blocked on every continuation to a full-board draw when the dual packing strictly exceeds the current mover's future blocker-turn capacity. Hence the opponent must win first under the stated policy and the current mover has a forced loss. This **requires both certificates**; packing alone is insufficient to establish outcome under competing first-win conditions.

## General formulation

For finite obligations $G_i\subseteq E$, defense resource capacity $k$, release precedence $\prec$, terminal stopping $T$, and response policy $\pi$, separate:
1. Static impossibility of a size-$k$ transversal.
2. Feasible online schedule of defensive actions.
3. Preservation of the defender/attacker safety invariant.
4. First-occurrence termination and outcome precedence.

The fractional packing is a static dual bound. To move beyond it, investigate time-indexed covering, shared reusable blockers, resource leasing and deadline-based circuits, with exact legal availability and who-controls-which-step semantics.

## Boundary and negative evidence

- Matching/covering is insufficient when a pair response is not gravity-released by the required turn; the source's rejected odd pending-pair theorem is a concrete counterexample.
- Hyperedge-cover certificates cannot be freely reused after their resource or deadline assumptions change.
- Two mandatory responses in one available turn form an obstruction only if both truly remain mandatory and no stronger intervening termination discharges them.
- Finite internal physical checks do not prove general LP or temporal-certificate completeness.

## Independent research route

1. Start with finite set systems and compare integral transversal minima with fractional packing dual lower bounds.
2. Add time-indexed release posets; construct cases where the static packing is sound but inadequate for deciding an online safety question.
3. Design a minimal certificate containing weights, policy, resource schedule and a well-founded safety/progress invariant. Mechanically check each clause separately.
4. Search for a finite class where the static dual and temporal guards jointly yield a complete decision procedure, and construct smallest examples where completeness fails.
5. Explore non-game applications: deadline-constrained incident response, job scheduling and adversarial resource defense. Do not treat analogy as direct theorem transfer.

## Open questions

Can multi-step shared response resources be represented by a tractable submodular rank or flow potential? Which resource/precedence systems have exact min-max theorems? Can an invariant over resource debt replace online policy branching in useful restricted classes?

## Frozen primary sources and evidence

- [Directed-blocker and dual overload outcome theorem](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-first-touch-directed-blocker-plus-opponent-dual-or-one-nonloss-level2.md) — frozen Connect4 source at 756a78493a78.
- [Earlier dual-packing forced loss](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-source-inevitable-loss-dual-packing-any-L2-move.md) — frozen Connect4 source at 756a78493a78.
- [Rejected unsafe odd pairing and guarded correction](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-odd-spare-gravity-cross-prefix-rejection-and-safe-restriction.md) — frozen Connect4 source at 756a78493a78.
- [Response capacity / theorem layers](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-alternating-fixed-point-calculus.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Online relational covering under precedence](../online-relational-covering/README.md)
- [Scalar-free optimal decision certificates](../scalar-free-decision-certificates/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
