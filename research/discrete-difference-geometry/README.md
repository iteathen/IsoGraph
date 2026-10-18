# Discrete difference fields and topology

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact specialized binary identities; topology-sensitive dynamic generalization OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Which global structural facts are determined by local relational differences, and what residual information survives quotienting by those differences? How do topology, causality and first-occurrence constraints change the answer?

## Exact source algebra

Write $T_x,T_y$ for grid translation operators, and in the binary field $\mathbb F_2$ define $X=1+T_x$ and $Y=1+T_y$. The length-four window polynomial is $(1+T)^3=1+T+T^2+T^3$ over $\mathbb F_2$. In the *specific quotient by length-four axis incidence relations*, $X^3=Y^3=0$. Rising diagonal differences derive from the axes as $1+T_xT_y=X+Y+XY$; the descending direction follows from inverse translation in the truncated algebra. These are specialized finite-difference identities, not an assertion that arbitrary physical fields obey nilpotent derivatives.

For an actual ownership coloring $q(v)\in\mathbb F_2$, edge disagreements are $e_{uv}=q(u)+q(v)$. Every elementary plaquette has zero XOR circulation. Conversely, on a simply connected rectangular grid, a flat edge field lifts to precisely two vertex-coloring fields, differing by a global complement. A monochromatic Connect4 line corresponds to three consecutive zero-disagreement edges along that line. The owner/sign of a completed line still requires a global anchor.

A separate path-defect result identifies transfers by edge-boundaries: the quotient of $\mathbb F_2^W$ by even-parity path boundaries leaves only one global parity bit. Thus **defect position alone** cannot encode the strategic winner in that quotient. Resource, timing and first-win information had been discarded.

## General mathematical formulation

Given a graph or cell complex, study a field $q$ on vertices, its coboundary $\delta q$ on edges and the cycle/plaquette integrability conditions for reconstructing $q$. The data required for lifting depend on connectedness and topology. Independently study higher finite-difference identities in a quotient whose generating relations are explicitly specified.

The reusable research product should distinguish:
- Algebraic equality of local differential operators.
- Existence and ambiguity of global lifts.
- Dynamics of allowable defect transport.
- Additional causality, resource or terminal facts necessary for a physical interpretation.

## Corrections and non-implications

- A mathematically exact $\mathbb F_2$ coboundary identity is standard discrete algebra, not automatically a newly discovered physical field law.
- A path's trivial critical/Jacobian group cannot be transferred to a cycle or surface without rederivation.
- Plaquette flatness does not specify who may change a vertex or when an irreversible terminal event occurs.
- A zero-edge ownership predicate is not an independent proof that a winning line is realizable in the correct event order.

## Proposed independent experiments

1. Verify lift ambiguity and cycle constraints on paths, rectangles, rings, and a surface with noncontractible cycles.
2. Derive invariant dimensions symbolically for variable grid width and height; check boundary truncation without special-case enumeration.
3. Compare a vertex-field model and an edge-difference model using exact reconstruction tests.
4. Add a controlled update relation and seek precise extra hypotheses under which local transport preserves a declared global event property.
5. Compare mathematical structures with candidate physics only at the level of explicit incidence, update and composition relations; do not infer spacetime, gravity or quantum behavior from notation.

## Open questions

What low-dimensional characteristic classes survive different support topologies? Can event dependence and deadlines be represented through a graded extension of the cochain complex? Which dynamics preserve reconstruction under local quotienting?

## Frozen primary sources and evidence

- [Derived binary difference axioms](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-14-connect4-derived-difference-axioms.md) — frozen Connect4 source at 756a78493a78.
- [Z2 domain-wall/flat field model](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-14-z2-domain-wall-causal-field.md) — frozen Connect4 source at 756a78493a78.
- [Path chip-firing/defect equivalence](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-14-width-path-chip-firing-isomorphism.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [First-occurrence and competing terminal-event dynamics](../first-occurrence-dynamics/README.md)
- [Linked-interval unfolding of relational geometry](../relational-geometry-unfolding/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
