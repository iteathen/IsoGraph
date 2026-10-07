# IsoGraph Origin and Provenance

**Status:** current human-readable provenance record  
**Recorded on:** 2026-10-02T14:06:06-07:00 / 2026-10-02T21:06:06Z  
**Nature of record:** partly contemporaneous public Git evidence; partly retrospective reconstruction from preserved dated project conversations  
**Current author-name authority:** Joshua Oshiro

## Purpose

This document records the origin and development of the major ideas behind IsoGraph and the relationship between human research direction, agent-originated formulations, agent-assisted formalization, experiments, and later qualification.

It exists because ordinary file authorship is not sufficient to answer:

- who first proposed a research direction;
- who proposed a specific formulation;
- when an idea is first evidenced;
- what reasoning path produced it;
- when a later retrospective attribution was written;
- which pieces came from Joshua Oshiro, AI agents, or external prior work.

This document does **not** claim that IsoGraph was the first project in the world to pursue broad themes such as AI-assisted science, computational discovery, graph/hypergraph rewriting, automated theorem discovery, structural analogy, or multi-agent research.

Throughout this record, `earliest evidence currently located` means the oldest supporting item found in the sources examined by this audit. It is an evidence statement, not a declaration that no earlier private or external antecedent exists.

For claim-specific priority, use a separate prior-art/history review.

Machine-readable companion:

- `provenance/IDEA_PROVENANCE_LEDGER.json`

Governance:

- `IDEA_PROVENANCE_POLICY.md`

Project Discovery-specific chronology:

- `research/project-discovery/ORIGIN_AND_PROVENANCE.md`

---

# 1. Historical identity

IsoGraph began under the working name **Axiomesh / AxiomeSH** inside `iteathen/CUDA-JS`.

The migration anchor preserved by `MIGRATION.md` is:

~~~text
iteathen/CUDA-JS
275b4d28224990a2b8fbdd7fa66cb071fb867e48
2026-09-17T03:40:07Z
~~~

The standalone repository then imported the corpus in commit:

~~~text
986732d06002de3b90e9c9f7e785b65986f7cb6d
2026-09-17T04:08:56Z
~~~

and completed the IsoGraph naming migration in:

~~~text
6dc112d131369dfaba4f36c63fa23229eae28a2e
2026-09-17T04:35:37Z
~~~

Historical files using Axiomesh/AxiomeSH terminology are predecessor evidence, not a separate unrelated project.

The historical short-form credit `Josh Oshiro` and the current author-name authority `Joshua Oshiro` refer to the same project owner/designer.

---

# 2. Earliest preserved public origin record

## 2.1 Context-logic incubation

The earliest public project evidence currently located is CUDA-JS commit:

~~~text
323ce2510c6f4bcf883c506a630aa9acbd618490
2026-09-16T19:44:15Z
research/axiomesh/README.md
blob 3dec1d491fe4f14ba38de422c6d68801fe851d1a
~~~

That file explicitly states:

~~~text
Research direction: Josh Oshiro
~~~

and frames the project as a compact formal-logic/intermediate representation for agents, optimized around context-window limits, recoverable proof state, dependencies, alternatives, and inference obligations.

The central early problem was not 'invent a graph language.'

It was:

~~~text
How can an agent keep enough exact reasoning state
to continue useful synthesis without repeatedly
reconstructing a large natural-language context?
~~~

The early public record explores continuation-preserving sufficient state, including a provisional Markov-like transition-state idea, while explicitly warning that proof state carries nonlocal scope, provenance, dependency, binding, and branching information.

### Attribution

- **Research direction / problem:** Joshua Oshiro.
- **Public evidence:** commit `323ce251...`.
- **Later formal development:** agent-assisted.

## 2.2 Preserved conversation corroboration

A preserved project conversation at `2026-09-16T20:07:16Z` records Joshua stating that the language was for agents and should optimize context-window compactness and synthesis of concepts.

This conversation was not necessarily public at that time.

This statement is included now as a **retrospective conversation-provenance record**, not as a claim that this document existed on September 16.

---

# 3. Why the design moved toward relational structure

## 3.1 Problem pressure

The preserved design notes were committed at:

~~~text
a0a5d015c8daadd0221c4b766c2aee14f05d0c1e
2026-09-16T21:02:48Z
research/axiomesh/DESIGN_NOTES.md
blob e61f8775000dd64a9148f16599a8d67f3f0c2ff1
~~~

The design notes make the reasoning path explicit:

1. complex formal work can exceed working-state capacity;
2. agents repeatedly reconstruct identity, scope, dependencies, exclusions, unresolved branches, provenance, and long-range constraints;
3. some observed reasoning limits may therefore be representation/bookkeeping limits rather than missing local reasoning operations;
4. a persistent external structural state might provide better coordinates for latent model capability;
5. the representation should be tested by cold reconstruction and downstream reasoning, not judged by compactness alone.

## 3.2 Graph/hypergraph rewriting

A preserved conversation at `2026-09-16T20:42:38Z` records the **AI assistant** proposing graph/hypergraph rewriting as a candidate substrate and proposing the compact structure-plus-lawful-transformation formulation.

Joshua accepted the direction as worth pursuing and continued directing the project.

This attribution matters:

~~~text
Joshua-originated research problem/direction
!=
agent-originated graph/hypergraph formulation
~~~

The public design notes committed about twenty minutes later explain why graph rewriting became the leading hypothesis:

- relational rather than lexical identity;
- arbitrary arity;
- explicit composition;
- local transformation;
- recursive self-representation;
- isomorphism;
- invariant preservation;
- no compulsory translation boundary.

The project later stabilized the working hypothesis as:

~~~text
knowledge
=
scoped relational structure
+
lawful structural transformation
~~~

That concise formulation should therefore be credited as an **agent-originated formulation adopted and developed under Joshua Oshiro's research direction**, not retroactively described as solely Joshua's wording.

---

# 4. One semantic structure / native agent path

The September 16 design notes also record:

~~~text
One semantic structure. No internal translation boundary.
~~~

and:

~~~text
AxiomeSH -> agent -> AxiomeSH
~~~

which later became:

~~~text
IsoGraph -> agent -> IsoGraph
~~~

The reasoning was methodological:

~~~text
source
-> formalism A
-> translator
-> agent formalism B
~~~

would make it difficult to determine whether a result came from:

- the representation;
- the factorization;
- the mapping;
- translation artifacts;
- or the model itself.

The current evidence supports treating this architectural boundary as **co-developed under Joshua Oshiro's research direction**. It does not support clean sole attribution for the exact wording.

---

# 5. IsoGraph name

During the September 17 rename/migration discussion, a preserved conversation at `2026-09-17T03:47:03Z` records Joshua explicitly accepting the IsoGraph name.

The surviving conversation context indicates the name arose during human-agent naming discussion rather than as a previously documented sole-author invention.

Therefore current attribution is:

~~~text
IsoGraph name:
    co-developed naming discussion;
    selected/accepted by Joshua Oshiro
~~~

The standalone naming migration commit `6dc112d1...` is the first located public repository evidence completing the rename.

---

# 6. Observation before judgment

One of the strongest Joshua-originated design contributions is the rule that an apparent error/defect may be a clue.

Preserved dated conversations include:

~~~text
2026-09-18T16:27:47Z
    Joshua: a discrepancy might be a clue to look deeper.

2026-09-18T18:05:10Z
    Joshua reinforces observation before normalization/judgment.

2026-09-27T15:59:37Z
    Joshua: preserve discrepancies/errors as possible clues;
    the expected/reference authority may itself be wrong.

2026-09-27T16:03:44Z
    Joshua: examples usually express a general principle,
    not a request for a special-case rule.
~~~

The assistant/agents then formalized that governing idea into IsoGraph doctrine.

First located public Core formalization:

~~~text
73e344bf022316830b19b846b0daaf9027a6fd9f
2026-09-18T18:17:53Z
CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md
~~~

Later clue-preserving Discovery formalization:

~~~text
cb2b60048dc15300e5ab4fcc2c3777b872ddfdbe
2026-09-27T16:16:32Z
extensions/discovery/
DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md
~~~

Attribution:

- **core intuition/general rule:** Joshua Oshiro;
- **formal module/specification language:** agent-assisted formalization.

---

# 7. Primitive logic as the authoritative bottom

Preserved conversations show Joshua repeatedly insisting that IsoGraph must not stop at convenient high-level abstractions.

Key dated directions include:

~~~text
2026-09-26T02:20:49Z
    reduce to irreducible/invariant primitives;
    high-level abstractions belong in discovery/derived views.

2026-09-27T06:51:04Z
    everything authoritative must reduce to irreducible logic;
    only fundamental logical properties belong at the bottom.
~~~

Agents formalized this requirement into the primitive-closure doctrine.

First located public Core 0.20 evidence:

~~~text
6bf6634d706793b94bae4dd7c0e89ef42b9b68fd
2026-09-27T15:51:07Z
CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md
~~~

Attribution:

- **primitive-first/no-high-level-authoritative-leaf requirement:** Joshua Oshiro;
- **exact specification mechanics and reduction language:** agent-assisted formalization.

---

# 8. Implicit Assertions

Core 0.19 made explicit assertions, implicit assertions, and their support structure first-class.

First located public Core 0.19 preservation/promotion:

~~~text
62182c03bc0f69869cc66ec31feed142ee645471
2026-09-26T09:52:17Z
CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md
~~~

The current audit does not have enough earlier speaker-attributed evidence to assign the **original IA concept** solely to Joshua or solely to an agent.

It is therefore classified **CO_DEVELOPED**.

Joshua's later contribution to the recursive operating rule is clear.

Preserved conversations:

~~~text
2026-09-27T08:36:43Z
    fill implicit assertions carefully and recursively;
    missing one may lose the opportunity to solve the problem.

2026-09-27T20:01:56Z
    Core -> IA -> NEI -> IA -> NEI ...
    repeat until finished within scoped boundaries.
~~~

That operating pressure later contributed to fixed-point and invalidation rules.

---

# 9. No-Evasion, census conservation, and Schema Closure

Core 0.21 is a good example of why contribution roles must be separated.

Joshua's repeated direction was:

- do not evade hard-to-reduce semantics;
- do not shrink scope merely to make closure succeed;
- reduce known semantics all the way down;
- continue IA work until the selected scoped procedure is finished.

The agent research process converted that pressure into a more formal machinery:

- Source Semantic Census;
- explicit closure dispositions;
- rendering conservation;
- Schema Closure;
- fixed-point invalidation;
- graph-derived closure ledgers;
- separate soundness/coverage/reconstruction/scope/authority gates.

Public qualified record:

~~~text
036f9be53b0620e8c96004ae694b20d62bb2e76b
2026-09-29T22:39:13Z
CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md
~~~

Attribution:

~~~text
governing no-evasion / complete-reduction pressure:
    Joshua Oshiro

SSC / Schema Closure / ledger formalization:
    agent-assisted formulation under that direction
~~~

---

# 10. Minimum Sufficient Support / Valuation

The provenance is mixed.

A preserved conversation at `2026-09-26T22:28:15Z` records Joshua asking for the **laziest path / shortest exact route to the same conclusion** without changing the inputs or answer.

That is a conceptual precursor.

The specific DP 0.9 formulation as **Minimum Sufficient Support / Valuation** was developed by the agent research process and should not be retroactively credited as solely Joshua's formulation.

Public module record:

~~~text
b859fe5e280378ac15f06f0c6b62e1279b701e0b
2026-09-29T18:09:15Z
extensions/discovery/
DISCOVERY_PROTOCOLS_0_9_MINIMUM_SUFFICIENT_SUPPORT_VALUATION_CANDIDATE.md
~~~

Attribution:

- broader exact-minimization pressure: Joshua Oshiro;
- MSS/Valuation module formulation: agent-originated / co-developed successor research.

---

# 11. Experimental Warrant and Experimental Inquiry

Joshua supplied two important conceptual requirements in preserved conversation:

~~~text
2026-09-29T07:37:14Z
    clues should trigger experimentation and inform
    the scope of intervention.

2026-09-29T07:52:51Z
    experiments must operate from incomplete 'Lego' models;
    pieces, dimensions, outputs, and completeness may be unknown.
~~~

The assistant/agent process formalized those requirements into:

- DP 0.10 Experimental Warrant;
- Experimental Inquiry 0.1;
- provisional/open-world experimental models;
- observation != admitted assertion;
- warrant != evidence for a hypothesis.

Public qualified integration record:

~~~text
8dc6a0f37babae61d50e9cd5889d2cd1c11220ec
2026-09-29T19:54:49Z
~~~

Attribution:

- experimentation-from-clues and incomplete-model requirement: Joshua Oshiro;
- module architecture/specification: agent-assisted formalization.

---

# 12. Project Discovery

Project Discovery has its own detailed provenance record:

- `research/project-discovery/ORIGIN_AND_PROVENANCE.md`

The most important IsoGraph-level provenance fact is that the broad corpus vision came from Joshua before the final grand-scale README existed.

A preserved conversation at `2026-09-26T00:55:18Z` records Joshua proposing that mathematics, physics, computational/complexity theory, set theory, and other papers be rendered into IsoGraph and searched with Discovery Protocol for many discoveries.

The agent then elaborated indexing, common-core/residual search, falsification, and validation machinery.

The later grand-scale vision—mass within-domain and cross-domain synthesis using hundreds or thousands of agents—was stated by Joshua on September 30 and then publicly formalized minutes later.

---

# 13. Authorship and agent assistance

Joshua Oshiro directed that public papers distinguish:

~~~text
authorship
IsoGraph system design
agent assistance
third-party prior work
~~~

Preserved conversation:

~~~text
2026-09-27T21:33:25Z
    Joshua requires Joshua Oshiro authorship,
    IsoGraph Project attribution, agent-assistance disclosure,
    and explicit credit that IsoGraph was designed by Joshua Oshiro.

2026-09-27T21:33:43Z
    surname spelling confirmed: Oshiro.
~~~

Current public rule:

- `PUBLICATION_ATTRIBUTION_POLICY.md`

This provenance audit adds an important refinement:

> Saying that Joshua Oshiro designed IsoGraph does not imply that every exact formulation, module name, experiment, proof step, or discovered result was individually originated by Joshua.

Those finer contribution distinctions belong in this ledger and project-specific provenance records.

---

# 14. External antecedents and parallel work

On October 2, 2026, Joshua identified substantial apparent philosophical/research-direction overlap with active Wolfram Institute work and directed this provenance audit.

Trigger supplied by Joshua:

- `https://youtu.be/oetFdMpB6v0?is=dIXKBSMUXtuy2pzF`

That observation is recorded as an **awareness event**, not a priority conclusion.

Broad antecedent facts matter:

- the Wolfram Institute publicly states that it was launched in October 2022;
- Stephen Wolfram publicly wrote about AI and scientific discovery in *Can AI Solve Science?* in March 2024;
- graph rewriting, hypergraphs, computational discovery, automated reasoning, and AI-assisted science all have histories outside IsoGraph.

Therefore future priority discussion must be claim-specific.

A defensible statement is:

~~~text
By date X, the preserved IsoGraph record contains formulation Y.
~~~

An indefensible shortcut is:

~~~text
Similar later/earlier work proves who invented the whole broad idea.
~~~

---

# 15. Evidence strength and limitations

## Strongest evidence

The strongest evidence in this record is exact public repository state:

- commit SHAs;
- content/blob SHAs;
- frozen experiment artifacts;
- GitHub-signed merge commits;
- migration anchors.

## Conversation evidence

Conversation timestamps are used where they materially distinguish originator from formalizer.

These are now summarized publicly, but many were not public at the original time.

Therefore they establish **project chronology** more strongly than **public-publication priority**.

## Self-dated campaign files

Project Discovery campaign files may declare `Date: 2026-09-25` while being preserved on main later.

The record preserves both dates rather than pretending they are the same evidentiary event.

## Future evidence

If older commits, issue records, local archives, emails, notebooks, or other contemporaneous sources are later found, this chronology should be corrected rather than defended.

---

# 16. Current contribution summary

| Area | Best-supported attribution |
| --- | --- |
| Initial agent-context / compact reasoning-state problem | Joshua Oshiro research direction |
| Graph/hypergraph rewrite substrate | AI-assistant proposal adopted under Joshua direction |
| Structure + lawful transformation compact formulation | AI-assistant-originated formulation, later project doctrine |
| One native structural semantic path | Co-developed under Joshua research direction |
| IsoGraph name | Human-agent naming discussion; selected/accepted by Joshua |
| Observation-first discrepancy-as-clue principle | Joshua-originated governing idea; agent formalization |
| Primitive-logic/no-high-level-leaf doctrine | Joshua-originated governing requirement; agent formalization |
| Original IA concept | Co-developed / sole origin not established by current evidence |
| Recursive IA fixed-point pressure | Explicitly directed by Joshua |
| DP 0.8 clue-preserving formal module | Agent-assisted formalization of Joshua discrepancy principle |
| DP 0.9 MSS/Valuation | Agent-originated/co-developed formalization with Joshua minimization precursor |
| DP 0.10 / EI open-world experimentation | Joshua-originated conceptual requirements; agent formalization |
| Core 0.21 SSC / Schema Closure machinery | Agent formalization of Joshua no-evasion/closure pressure |
| Project Discovery corpus-wide vision | Joshua-originated direction; agent elaboration |
| Project Discovery grand-scale hundreds/thousands-agent mission | Joshua-originated direction; agent formalization |
| Guess-test qualification with retained hypothesis provenance | Joshua-originated governing idea; agent-assisted formalization |
| Publications | Joshua Oshiro author under current policy; agent assistance disclosed per work |

---

# 17. Rule going forward

No major IsoGraph or Project Discovery idea should again require this much retrospective reconstruction.

For future major concepts:

~~~text
idea proposed
-> provenance entry created in the same work cycle
-> originator/contributors recorded
-> evidence SHA/timestamp recorded
-> reasoning path summarized
-> prior-art boundary noted
-> later corrections appended, not erased
~~~

See `IDEA_PROVENANCE_POLICY.md`.

---

# 18. Guess-test qualification and retained authority provenance

On 2026-10-07 Joshua clarified an important methodological point that had not been stated strongly enough in the repository specifications.

The governing idea is:

~~~text
when deduction/reduction runs out:
    a hypothesis may be generated

hypothesis
    != authority

hypothesis + successful qualification + explicit promotion
    -> usable authority within the qualified scope

promotion
    != erasure of hypothesis origin
~~~

Joshua's direction was specifically that IsoGraph should not confuse uncertainty during discovery with a prohibition on informed guessing. Guesswork is lawful as a discovery operation. A guess does not become authority merely because it is plausible, elegant, familiar, or useful.

Once the exact hypothesis is subjected to sufficiently strong testing and qualification, the promoted revision may be used as current authority within the scope actually earned by those tests. Its epistemic provenance remains visible: the system records that the result began as a hypothesis, what evidence selected it, what controls and falsifiers were used, what confirmation was fresh or independently fixed, and what scope was actually covered.

The repository may use the provenance label:

~~~text
HYPOTHESIS_QUALIFIED
~~~

for that condition. This label is not a new Core truth value, primitive, or universal ontology category.

The rule is therefore:

> **Qualification grants scoped authority; qualification does not erase provenance.**

If later work derives the same result from stronger independent authority, the current authority basis may be upgraded or superseded. The historical hypothesis-and-test lineage remains part of the provenance record.

This clarification also changes how current-authority fixed points should be read. A deterministic G5 fixed point means that the current reduction/synthesis pass has no further justified candidate. It does not establish irreducibility and does not prohibit a lawful hypothesis / falsification campaign.

Attribution:

- **governing guess-test / retained-provenance rule:** Joshua Oshiro — HUMAN_ORIGINATED_IDEA;
- **formal repository language and Graph-First Method 0.3 structure:** AI assistant — AGENT_ASSISTED_FORMALIZATION.

Earliest evidence currently located:

~~~text
2026-10-07
preserved dated project conversation
~~~

Public formalization:

- `AGENTS.md`;
- `research/README.md`;
- `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md`;
- `research/primitive-demand-qualification/README.md`;
- `research/woit-lisi-isomorph/README.md`.

The already-qualified DP 0.10 and EI 0.1 exact bytes remain immutable. This clarification composes with those qualified mechanisms and does not retroactively rewrite their qualification records.

