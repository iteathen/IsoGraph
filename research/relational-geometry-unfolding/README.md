# Linked-interval unfolding of relational geometry

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Faithful finite geometric representation; complexity improvement and strategy preservation OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Can a multidimensional incidence geometry be represented by simpler one-dimensional interval factors with explicit equality/gluing constraints, and does that representation admit a **better** exact reasoning procedure?

## Exact source unfolding

The original standard Connect4 board has 42 physical cells and 69 distinct connect-four geometric winning intervals. Its four directions — horizontal, vertical and two diagonals — can be unfolded into 37 oriented strands. Each original cell occurs once in each directional representation, giving 168 aliases tied back to the 42 physical events by equality constraints. The documented slot representation uses 36 separators in addition to these aliases (204 positions overall).

Every original winning requirement becomes a contiguous length-four interval in a strand. This is a **faithful re-expression of geometry** only because aliases of the same original cell remain coupled and because original gravity and owner semantics are not discarded. Treating four ribbons as independent games would be false.

In the latest continuation, source surviving winning requirements remain owner-tagged; the union of gravity chains determines legal event precedence, and turn rank determines owner phase. The ribbons simplify geometry but do not independently eliminate alternating strategic control, first-win stopping or inter-strand bridges.

## Proposed abstract model

For an incidence structure $(E,\mathcal H)$, construct a family of strands $\{S_i\}$, maps $\pi_i:S_i\to E$ and interval hyperedges $\mathcal I_i$. A sound unfolding requires (1) each source requirement is exactly represented by some interval, (2) all strand aliases mapping to one event share one state/update, (3) legal source transitions map to and from admissible unfolded transitions, and (4) the target observation or strategy has an explicitly proved transport.

Study criteria for low separator width, bounded alias-degree, useful interval overlap and scalable incremental propagation. A small number of strings does **not** alone imply low treewidth or cheap optimization.

## Distinctions to retain

- Geometric expressibility versus transition equivalence versus strategy preservation.
- Equality of multiple appearances versus accidental independent duplication.
- Boundary/bridge constraints versus claimed decomposition into independent subsystems.
- Size of the representation versus complexity of inference on its coupled factor graph.
- Exact original win-incidence correspondence versus value or best-action proof.

## Independent validation plan

1. Build a generator that unfolds arbitrary small grid-window incidence systems into strands, alias maps and interval constraints.
2. Validate exact hyperedge correspondence, inverse reconstruction and event-update preservation by two independently implemented models.
3. Measure incidence width, separator/treewidth, constraint propagation work and failure modes as geometry and window length vary.
4. Construct an example whose unfolding is faithful but computationally worse, to avoid mistaking elegant form for algorithmic advantage.
5. Add partial-order scheduling and a first-terminal predicate; test which structural observations remain exact and which require additional coupling.

## Open questions

Which classes of hypergraphs admit low-width linked interval unfoldings? When does unfolding plus guarded quotienting permit direct dynamic inference? Can geometric overlaps be compiled as reusable compositional interfaces rather than a global, expensive equality constraint network?

## Frozen primary sources and evidence

- [Four-ribbon exact source representation](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-exact-four-ribbon-geometry-unfolding-and-phase-code-candidate.md) — frozen Connect4 source at 756a78493a78.
- [Original linear-word unfolding](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-exact-linear-word-unfolding-of-7x6-gravity-game.md) — frozen Connect4 source at 756a78493a78.
- [Center and left-right coupling](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-17-center-full-left-right-shuffle-xor-bridge-factorization.md) — frozen Connect4 source at 756a78493a78.
- [Owner refocus and strategy limits](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-10-18-owner-refocus-unfolded-geometry-turn-sequence-elimination-and-race-factor.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Strategy-preserving chronology elimination](../strategy-preserving-chronology/README.md)
- [Discrete difference fields and topology](../discrete-difference-geometry/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
