# Entropy and Indistinguishability

**Current research dossier:** this README  
**Research status:** imported exploratory working notes and adjacent-literature map; no verified theorem or physical result  
**Source provenance:** user-provided separate research project, archived 2026-10-12  
**Current authority:** research-only, not qualified IsoGraph semantics

## Research question

Can two generative histories with different amounts of **source randomness** count as the same physical situation if every physically possible interaction yields indistinguishable consequences? How does this differ from merely looking random to a computationally limited observer?

The source distinguishes:

- **source entropy:** randomness in the input/generative history;
- **apparent entropy:** randomness of the resulting observable presentation relative to an observer or model;
- **total physical indistinguishability (conjectural):** no admissible physical interaction, not merely a currently feasible test, distinguishes the histories.

The note explores an operational or physical equivalence criterion; it **does not** claim that deterministic computation produces more Shannon entropy than its input.

## Current state and claims under investigation

The working note proposes that source-history distinctions that make no possible physical difference might be representational surplus rather than distinct physical states. The accompanying research map surveys cryptographic pseudorandomness, operational equivalence/noncontextuality, gauge redundancy, bisimulation, Blackwell comparison, Jaynes-style inference, and mathematical limitations from Shannon entropy, algorithmic randomness, and extraction.

These are **candidate correspondences**, not evidence that the strong ontological claim has already been proved. In particular, computational indistinguishability is not the same as information-theoretic equality, and observational indistinguishability does not automatically prove ontological identity.

## Source documents

- [Working note](evidence/source/entropy-indistinguishability-working-note.md) — initial core argument, boundaries, and questions.
- [Adjacent research map](evidence/source/adjacent-research-map.md) — literature leads, supporting and opposing approaches, and potential formalization.
- [Original project README](evidence/source/README.md) — source declaration that the project is separate from the primitive-presentation manuscript.
- [SOURCE_IMPORT.json](SOURCE_IMPORT.json) — exact original archive paths, byte counts, SHA-256 digests, and Git blob identities.

All source bytes are retained without alteration.

## Negative constraints and possible counterexamples

1. Under a deterministic map Y = f(X), Shannon entropy satisfies H(Y) ≤ H(X) for discrete variables; computational amplification of unpredictability does not violate this.
2. Equality of observations for a *bounded* class of experiments supplies only equivalence relative to that class.
3. A stronger statement about **all** possible physical interactions requires its own admissible-interaction universe and proof obligations.
4. Gauge-like equivalence is an analogy until the relevant symmetry/equivalence relation is explicitly derived.
5. Hidden generative distinctions may have physically meaningful downstream effects even when current observers cannot recover them.

## Critical terminological separation

This project studies **source entropy, appearance, and indistinguishability**. The separate [emergent-reality-foundations discussion](https://github.com/iteathen/IsoGraph/pull/74) (preserved separately in PR #74 pending incorporation into the default branch) uses *entropy* as a hypothesized **prephysical organizing back-pressure**. Neither meaning should silently be substituted for the other; a proposed correspondence between them would require independent demonstration.

## Provenance and authority

- **Research direction:** attributed to the user's supplied working note; first publicly preserved in this repository by the 2026-10-12 import. No earlier public-priority review performed.
- **Assistant role:** retrospective curation, organizational summarization, and recording unresolved logical boundaries; not independent validation.
- **External literature:** references in the source map are leads and have not all been independently checked in this archival operation.
- **IsoGraph authority:** a research dossier is not semantic promotion.

## Next questions

Define observer classes, allowed intervention histories, and a precise equivalence relation; prove the bounded-observer result first; develop counterexamples separating total interaction equivalence from mere epistemic equivalence; test whether the stronger proposed physical identification has independent motivation beyond stipulation.
