# Composable structural proofs and dependency-closed certificates

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Guarded composition prototype with exact bounded controls; general calculus OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

When may a proof established in one relational context be reused in a different context, then safely composed with another proof, **without** reconstructing a complete system history or silently importing information that the first proof never supplied?

## Exact extracted proof mechanism

Connect4 research defined claim-relative event signatures $\Sigma_\phi(X,e)$: the dependency cone sufficient for a specific conclusion $\phi$. Distinct original events can share the same exact singleton-discharge theorem although their full states and unrelated residual obligations differ. The cone must explicitly contain every premise relevant to the claim and no unrelated context merely by habit.

A guarded theorem-composition prototype represents each theorem with typed variables, preconditions, exported conclusions, frame conditions, resource/deadline conditions, terminal alternatives and provenance requirements. Composition from theorem $A$ to $B$ requires at least:
- $A$'s proven postconditions entail $B$'s preconditions after sound typed unification.
- Observed frame facts are explicitly carried and preserved.
- Resource and deadline postconditions meet the next theorem's requirements.
- Every live terminal alternative is handled; missing terminal cases do not disappear.
- Required provenance is available where provenance itself is an observation.

The source prototype passed eight designated positive/adversarial generic composition checks and a bounded physical event-chain example. This is internal scoped evidence, **not** proof that the calculus can automatically compose arbitrary mathematics.

A second cross-layer result finds the same **fixed-point and antichain representation patterns** in residual obligations, guarded implication closure and strategic proof structures. Shared algebraic patterns are not evidence that those semantic layers are interchangeable.

## Abstract proposed calculus

Let a certificate be $(P,Q,F,D,T,\Pi)$: premises, conclusions, observed frame, resources/deadlines, terminal obligations and provenance. A composition arrow $A\Rightarrow B$ exists only when typed entailment and preservation checks discharge every obligation. A claim-relative equivalence transports *that claim*, not unobserved properties of the original state.

This naturally suggests a typed proof hypergraph with explicit guards, partial orders and open obligations. Candidate normal forms include minimal generator/antichain boundaries under a **proved** entailment order and monotone least/greatest fixed-point closure, with resource and terminal guards carried through composition.

## Anti-shortcuts and falsifiers

- Two locally valid theorems need not compose if the first fails to provide a frame fact needed by the second.
- Static implication closure does not automatically implement the existential/universal predecessor semantics of adversarial control.
- Term absorption under literal subset inclusion can be sound but unhelpful: a retained 28-term source cohort had **zero** redundant terms by that criterion.
- Stronger entailment/quotienting must never silently erase deadlines, ownership, stopping or output provenance.

## Independent research experiments

1. Define a compact typed certificate language and explicit inference rules, without introducing new IsoGraph Core authority.
2. Construct a non-game workflow with event-triggered temporal obligations. Verify that composable proofs survive an exact state transition.
3. Inject missing frame, deadline, terminal and provenance facts and demand a small separating rejection certificate.
4. Compare exact dependency-cone quotienting with full-state equality, measuring only sound reuse.
5. Test small independently specified monotone closure systems and alternating reachability games; keep the inference semantics distinct.

## Open questions

Can dependency-cone generation be both automatic and minimal under useful restrictions? Which guarded theorem contracts form a compositional category under declared entailment? When can proof-antichain reduction preserve all controller dependencies and first-occurrence semantics?

## Frozen primary sources and evidence

- [Claim-relative signature theorem/reuse](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-claim-relative-event-isomorphism.md) — frozen Connect4 source at 756a78493a78.
- [Guarded theorem-composition prototype and controls](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-guarded-theorem-composition-calculus.md) — frozen Connect4 source at 756a78493a78.
- [Invariant-first cross-layer isomorphism audit](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-invariant-first-cross-layer-isomorphism.md) — frozen Connect4 source at 756a78493a78.
- [Alternating fixed-point proof calculus](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/docs/research/2026-09-13-alternating-fixed-point-calculus.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Observation-relative structural invariants](../observation-relative-invariants/README.md)
- [Scalar-free optimal decision certificates](../scalar-free-decision-certificates/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
