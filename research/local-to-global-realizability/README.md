# Local-to-global relational realizability

**Research status:** Cross-domain extraction / unqualified research dossier (2026-10-18).
**Source freeze:** Connect4 repository `iteathen/Connect4`, branch `research/semantic-quotient`, reviewed commit [756a78493a78](https://github.com/iteathen/Connect4/commit/756a78493a78cac2423750fac04e4dad4ac85d8b).
**Scope boundary:** A theorem proven under Connect4 assumptions is not automatically a theorem of arbitrary systems. Generalizations here are proposals until their assumptions are restated, proved and independently checked. This work does not change qualified IsoGraph Core, modules, or Connect4 gameplay authority.
**Contribution record:** Joshua Oshiro directed the Connect4 invariant-first research and explicitly requested its cross-domain extraction; OpenAI ChatGPT organized these ten research directions and drafted these dossiers using the cited repository artifacts. Individual source findings retain their original, more specific attribution and revision history; no claim of external priority or reproduction is made.

**Specific claim state:** Exact source CSP, history, and join counterexamples; dynamic lift OPEN. Source mathematical statements below are conditional on their hypotheses; all cross-domain transfers require new proof.

## Research question

Given individually admissible local relations, when does a globally realizable object exist, and when does a local decomposition faithfully reconstruct **all and only** admissible global objects? This separates representation consistency from temporal reachability and from strategic enforceability.

## Exact extracted results

At fixed Connect4 support, each occupied cell has an owner bit. For each original winning line $\lambda$, the pair of hit bits $(h_{0,\lambda},h_{1,\lambda})$ is determined by OR-ing the owner bits and their complements over occupied cells on that line. The status $(1,1)$ imposes a not-all-equal constraint on its occupied intersection; single-owner statuses pin variables. Thus the complete realizability problem for fixed-support hit descriptions is a pinned NAE-CSP.

A three-line source witness generates binary inequalities $a\ne b$, $b\ne c$, and $c\ne a$. Every individual constraint and every pair is satisfiable, but their joint conjunction is not. Local consistency and even pairwise consistency therefore do **not** entail global realizability.

Legal colored-board history is a further condition: fixed column-owner words must admit an interleaving equal to the global alternating owner word. This is equivalently an alternating-color linear extension of the gravity poset. Correct owner counts alone are insufficient: two length-two columns both reading $10$ have balanced counts yet expose the wrong owner at every initial frontier.

Exact recombination from projections is a **lossless join** condition, not an automatic property. Static lossless joining remains weaker than preservation of legal history, exact first-win termination, or a uniform strategy under adversarial interventions.

## Abstract research framework

Separate the layers:
1. Local constraint image membership $R\subseteq\prod_i X_i$.
2. Losslessness of projections: $\Join_j\pi_{S_j}(R)=R$.
3. Event-history realizability under a precedence poset and controller word.
4. First-occurrence/terminal admissibility.
5. Adaptive controllability and resource/deadline feasibility.

For each proposed compression, specify **which layer** it preserves. Passing an earlier layer does not prove a later one.

## Generalization and candidate connections

The first two layers belong to constraint satisfaction, database join dependencies, and the mathematics of locally consistent sections. A further relation to sheaf-style gluing is a legitimate research comparison, not evidence of quantum contextuality or physical realization. For event systems, linear-extension and strategy-dependency conditions provide additional failure modes absent from static sheaf or database examples.

## Independent tests

- Construct small relational databases with cyclic join scopes and enumerate spurious tuples from locally valid projections.
- Encode the same example as a finite hypergraph CSP and identify its minimal unsatisfiable core.
- Add a partial-order schedule and prescribed alternating controller labels to exhibit static realizability without history realizability.
- Add adaptive intervention and show two histories with identical coarse projection but incompatible uniform responses.
- Determine the smallest retained compatibility/dependency object that makes each projection exactly compositional. State any width, acyclicity or locality hypotheses.

## Open questions

Can higher-order correlations be retained with bounded interface width in special source geometries? Is an efficient owner-free relation compiler possible without enumerating complete assignments? When does a lossless static gluing law lift to a controllable transition congruence?

## Frozen primary sources and evidence

- [Realizability claim ledger C4-R0060–R0063](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/canonical/CLAIMS_REALIZABILITY.md) — frozen Connect4 source at 756a78493a78.
- [Pinned NAE and alternating-history proofs](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/evidence/realizability/2026-09-16-line-hit-and-history-realizability.md) — frozen Connect4 source at 756a78493a78.
- [Uniform strategy and dependency quantifiers](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/evidence/realizability/2026-09-16-strategy-dependency-and-history-complexity.md) — frozen Connect4 source at 756a78493a78.
- [Unresolved compression/dynamic lift questions](https://github.com/iteathen/Connect4/blob/756a78493a78cac2423750fac04e4dad4ac85d8b/research/open-questions/REALIZABILITY_COMPRESSION_AND_DYNAMIC_LIFT.md) — frozen Connect4 source at 756a78493a78.

## Related IsoGraph research

- [Observation-relative structural invariants](../observation-relative-invariants/README.md)
- [Strategy-preserving chronology elimination](../strategy-preserving-chronology/README.md)

**Qualification and provenance:** Internal source proofs and separately implemented repository-controlled physical validations are not third-party reproduction, formal proof-assistant certification, or IsoGraph semantic promotion. For any future claim, freeze its semantic scope, assumptions, counterexample protocol and source revision first. This dossier was retrospectively prepared on 2026-10-18; original source findings were recorded earlier and remain in Connect4's Git history.
