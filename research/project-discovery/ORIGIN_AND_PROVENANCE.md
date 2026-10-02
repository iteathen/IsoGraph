# Project Discovery Origin and Provenance

**Status:** current Project Discovery provenance record  
**Recorded on:** 2026-10-02T14:06:06-07:00 / 2026-10-02T21:06:06Z  
**Nature of record:** retrospective reconstruction from public Git history, self-dated frozen campaign artifacts, and preserved dated project conversations

## Purpose

This document records the origin and development of Project Discovery as distinct from the later formalization of its current README.

It distinguishes:

- the first Project Discovery-named campaigns currently located;
- the broader corpus-wide research-synthesis idea;
- the later grand-scale hundreds/thousands-agent mission;
- Joshua Oshiro's research direction;
- agent-assisted elaboration/formalization;
- public Git evidence versus privately preserved conversation evidence;
- and the date this retrospective chronology was itself written.

It does not claim Project Discovery was the first research program in the world to pursue AI-assisted scientific discovery, computational discovery, multi-agent science, cross-domain analogy, or large-scale automated research.

See also:

- `../../ORIGIN_AND_PROVENANCE.md`
- `../../IDEA_PROVENANCE_POLICY.md`
- `../../provenance/IDEA_PROVENANCE_LEDGER.json`

---

# 1. First currently located Project Discovery-named campaign

The earliest currently located artifact explicitly titled **Project Discovery** is:

~~~text
research/project-discovery/2026-09-25-ising-mwc-dp07/CAMPAIGN.md
title: Project Discovery — Ising / MWC DP 0.7 Campaign
artifact-declared date: 2026-09-25
~~~

The first located public preservation of that artifact on the standalone IsoGraph main history is:

~~~text
378a5170d5a51319f1d4f3cd3deb786fbd3db258
2026-09-26T15:30:54Z
~~~

This distinction is intentional:

~~~text
artifact-declared date
!= independently timestamped public preservation date
~~~

The current record therefore does **not** pretend that this retrospective provenance file existed on September 25.

The campaign's purpose was already recognizably Project Discovery-like: independently freeze two systems, render them without pair-conditioned vocabulary, and ask whether a structural common core emerges while preserving falsifying residuals.

---

# 2. Early proof-of-function campaigns

Two preserved campaign families established the first concrete Project Discovery evidence.

## 2.1 Three exact positive controls

Self-dated `2026-09-25`, the three-positive-control campaign tested whether DP 0.7 could recover exact correspondences from independently rendered systems without seeing the hidden witness:

1. Ising spin model ↔ lattice gas;
2. XOR-SAT ↔ linear equations over GF(2);
3. Newton-form harmonic oscillator ↔ Hamiltonian phase-space oscillator.

The campaign also established an important methodological requirement: source-to-native exactness must be established before blind structural discovery is treated as qualification evidence.

## 2.2 Ising / MWC partial correspondence

The Ising/MWC campaign intentionally tested something harder than a known exact equivalence.

It found a common statistical-mechanical layer while preserving a load-bearing difference in interaction topology, and it explicitly rejected whole-system isomorphism.

This supplied an early proof-of-function for both halves of Project Discovery:

~~~text
find hidden common structure
+
preserve the difference that prevents overclaim
~~~

---

# 3. Corpus-wide research-synthesis vision

A preserved dated project conversation at:

~~~text
2026-09-26T00:55:18Z
~~~

records Joshua Oshiro proposing a much broader use than hand-selected demonstrations.

The proposal was to render large bodies of mathematics, physics, computational/complexity theory, set theory, and related research into IsoGraph and then run Discovery Protocol across that corpus to search for discoveries and cross-domain structural relationships.

This is the earliest currently located evidence for the **corpus-wide Project Discovery direction**.

The original conversation was not necessarily public at the time. This statement is a retrospective provenance summary recorded on October 2, 2026.

### Attribution

- **Corpus-wide research-synthesis direction:** Joshua Oshiro.
- **Immediate elaboration into indexing, common-core/residual search, candidate isomorphs/generalizations, falsification, and validation:** AI assistant / agent-assisted formalization.

### Reasoning path

The reconstructed research path is:

~~~text
individual IsoGraph renderings repeatedly expose useful structure
-> exact blind comparison can recover hidden correspondences
-> partial correspondence can preserve meaningful residuals
-> therefore do not wait for humans to hand-select every pair
-> render a corpus
-> retrieve plausible structural neighbors
-> run Discovery Protocol within and across domains
-> falsify aggressively
-> feed validated findings back into the corpus
~~~

This is the conceptual bridge from demonstration campaigns to Project Discovery as a research-synthesis program.

---

# 4. Why scale became part of the mission

By late September, IsoGraph had been applied to multiple unrelated research programs—among them Navier–Stokes proof structure, glycan cleavage, P versus NP, Connect4, and IsoMax/JSMinSys—and repeatedly produced structural findings, corrections, reductions, falsifiers, or research leads.

That experience motivated a scaling hypothesis:

> If useful structural findings repeatedly appear when individual works are deeply rendered and subjected to IsoGraph/Discovery analysis, then a much larger corpus and much larger research workforce may produce a correspondingly larger stream of candidate findings.

This remains a **hypothesis**, not a measured scaling law.

The current corpus is selected and small. Project Discovery documentation explicitly rejects extrapolating a universal novelty/discovery rate from it.

---

# 5. Grand-scale Project Discovery mission

A preserved dated project conversation at:

~~~text
2026-09-30T00:43:48Z
~~~

records Joshua Oshiro explicitly distinguishing the small current Project Discovery prototype from its intended mature form.

Joshua described the mature objective as:

- mass research synthesis;
- across domains and within domains;
- rapid production of new research findings;
- potentially hundreds or thousands of agents;
- and far more server/compute resources than the prototype.

A second preserved conversation at:

~~~text
2026-09-30T00:46:30Z
~~~

records Joshua emphasizing that a project at this scale would require substantial funding, talent, people, and management help because one person could not reasonably operate it alone.

### Agent-assisted formalization

At `2026-09-30T00:44:04Z`, the assistant summarized the intended mature target as a massively parallel, continuously compounding structural research-synthesis system and expanded the role specialization / verification-capacity model.

### First located public formalization

The mature mission was publicly formalized in the GitHub-verified commit:

~~~text
323d0f4ea78775ca99170002efb5be0037d6b01b
2026-09-30T00:49:49Z
research/project-discovery/README.md
~~~

That commit explicitly records:

- current stage = early prototype / proof-of-function;
- intended mature operation = large-scale research synthesis;
- possible hundreds/thousands of specialized agents;
- need for substantial compute/storage/orchestration;
- need for research and engineering staff;
- need for human/domain expertise;
- need for independent review/replication;
- need for program management and sustained funding;
- need to scale verification with discovery.

### Attribution

~~~text
grand-scale mission / need for mass synthesis:
    Joshua Oshiro

hundreds/thousands-agent scale direction:
    Joshua Oshiro

funding/talent/organizational requirement:
    Joshua Oshiro

detailed architecture / role decomposition /
verification-capacity formalization:
    agent-assisted
~~~

---

# 6. Project Discovery philosophy

Several Project Discovery principles were not invented as an isolated later program. They inherited directly from IsoGraph's earlier design:

## 6.1 Structural retrieval is not evidence

Cheap or learned systems may decide where to look, but correspondence and scientific claims require independently checkable structural/evidentiary support.

## 6.2 Residuals are discoveries too

A pair need not be wholly isomorphic to be valuable.

~~~text
large common core
+
one load-bearing residual
~~~

may be the important scientific result.

## 6.3 Discrepancies are observations before defects

Joshua-originated observation-first doctrine means unexpected outputs are preserved long enough to ask whether they expose:

- a bug;
- a hidden distinction;
- a wrong expected answer;
- a scope mismatch;
- a useful equivalence;
- or unresolved structure.

## 6.4 Negative results accumulate value

Falsified correspondences, rejected invariants, prior-art conflicts, counterexamples, and failed hypotheses become constraints on later searches rather than being discarded.

## 6.5 Discovery must not outrun verification

A large agent population that only generates candidate findings would create a false-positive factory.

Project Discovery therefore treats adversarial review, reproduction, formal/mechanical checking, domain review, and experimental replication as core scaling resources.

---

# 7. Compounding structural memory

The intended mature operation is not a set of disconnected paper-reading tasks.

It is designed to accumulate a structural research memory:

~~~text
source research
-> exact renderings
-> implicit assertions
-> discovered correspondences / residuals
-> falsifiers / counterexamples
-> evidence lineages
-> experiment outcomes
-> reviewed findings
-> new searchable structure
-> later discovery
~~~

This compounding-corpus concept is part of the September 30 public mission formalization and the preceding corpus-wide September 26 direction.

---

# 8. External parallel-work awareness

On October 2, 2026, Joshua Oshiro identified active Wolfram Institute work that appeared strongly aligned in philosophy and research direction with IsoGraph and Project Discovery.

Joshua supplied:

`https://youtu.be/oetFdMpB6v0?is=dIXKBSMUXtuy2pzF`

and directed a comprehensive provenance/priority audit.

This event is recorded at the audit-start timestamp:

~~~text
2026-10-02T14:06:06-07:00
2026-10-02T21:06:06Z
~~~

This record does **not** infer copying, influence, or priority from similarity.

It does establish when the IsoGraph project formally recognized the need for claim-specific provenance documentation in light of parallel external work.

---

# 9. External-priority boundary

Project Discovery should not make a generic priority claim over:

- AI-assisted science;
- automated science;
- computational discovery;
- multi-agent research;
- graph/hypergraph science;
- automated theorem discovery;
- cross-domain analogy.

Those ideas have external histories.

A priority-sensitive claim must instead identify the exact architecture or idea whose chronology is being compared.

For example:

~~~text
By 2026-09-26T00:55:18Z, a preserved IsoGraph
conversation records Joshua Oshiro proposing corpus-wide
IsoGraph rendering followed by Discovery Protocol search
across many scientific/mathematical domains.
~~~

is a much stronger historical statement than:

~~~text
Project Discovery invented AI science.
~~~

The latter is neither established nor appropriately scoped.

---

# 10. Evidence map

| Event | Earliest evidence currently located | Evidence type | Attribution |
| --- | --- | --- | --- |
| Named Project Discovery campaign | artifact self-date 2026-09-25; public preservation 2026-09-26T15:30:54Z | frozen artifact + public Git | co-developed research campaign |
| Corpus-wide IsoGraph research-synthesis proposal | 2026-09-26T00:55:18Z | preserved dated conversation, retrospectively summarized | Joshua Oshiro direction |
| Agent elaboration of corpus-wide machinery | 2026-09-26T00:55:34Z | preserved dated conversation, retrospectively summarized | agent-assisted formulation |
| Grand-scale mass-synthesis mission | 2026-09-30T00:43:48Z | preserved dated conversation, retrospectively summarized | Joshua Oshiro direction |
| Funding/talent/management requirement | 2026-09-30T00:46:30Z | preserved dated conversation, retrospectively summarized | Joshua Oshiro direction |
| Public mature-mission formalization | 2026-09-30T00:49:49Z | GitHub-verified commit `323d0f4e...` | agent-assisted formalization under Joshua direction |
| Parallel-work awareness / formal provenance audit | 2026-10-02T14:06:06-07:00 | audit timestamp + user-supplied source URL | Joshua Oshiro direction |

---

# 11. What remains uncertain

The current audit has not established:

- the precise first private moment the phrase `Project Discovery` was spoken or typed;
- whether an earlier unpublished/local artifact used the name;
- whether the September 25 internal campaign date corresponds to an independently public publication event;
- global novelty/priority of the broad Project Discovery concept;
- a complete comparison to Wolfram Institute or other prior/parallel research.

If older evidence is later found, this chronology must be updated.

---

# 12. Rule going forward

Every future major Project Discovery concept, architecture change, or material finding should add/update provenance in the same work cycle.

At minimum record:

~~~text
idea/finding
originator / contributors
event time or earliest evidence
recorded-on time
source commit / artifact / conversation basis
reasoning path
falsifiers/corrections
prior-art boundary
review status
~~~

Do not rely on filesystem timestamps as the sole historical record.