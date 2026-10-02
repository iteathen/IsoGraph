# IsoGraph Idea and Research Provenance Policy

**Status:** project governance requirement  
**Effective recorded-on time:** 2026-10-02T14:06:06-07:00  
**Applies to:** IsoGraph, Project Discovery, IsoGraph-family research modules, major research findings, public papers, and material research-direction changes

## Purpose

IsoGraph research is developed through a mixture of human direction, agent-assisted reasoning, formalization, implementation, experimentation, review, and repository work.

That makes ordinary file authorship insufficient for historical attribution.

This policy requires the project to preserve, as separately as possible:

- **who originated the research direction or idea;**
- **who proposed a particular formulation, module, name, theorem candidate, experiment, or implementation;**
- **when the idea is first evidenced in the surviving record;**
- **when a retrospective provenance statement is itself created;**
- **what reasoning path led from an earlier problem to the later idea;**
- **which evidence independently identifies the event;**
- **which parts are human-originated, agent-originated, co-developed, or derived from external prior art.**

The objective is an honest, auditable chronology. It is not to retroactively assign all project output to one contributor.

## 1. Never backdate a provenance record

A provenance record created after the underlying event MUST distinguish:

~~~text
event date / earliest located evidence
!= provenance-record creation date
~~~

A retrospective record MUST say that it is retrospective.

It MUST NOT make a newly written document look as though it existed at the earlier event date.

Use fields such as:

~~~text
earliest_evidence_time
earliest_evidence_basis
recorded_on
retrospective
~~~

## 2. Prefer "earliest evidence currently located"

Unless an independent historical/prior-art investigation supports a stronger claim, use:

> earliest evidence currently located in the preserved project record

rather than:

> first invented

or:

> first in the world.

Git history can establish that a project artifact existed in the preserved history by a certain revision. It does not by itself establish global intellectual priority.

## 3. Evidence classes

Use the strongest evidence available.

### A — immutable public repository evidence

Examples:

- Git commit SHA;
- content/blob SHA;
- GitHub-signed merge commit;
- frozen experiment input/output;
- immutable release/publication revision.

Record the exact repository, path, SHA, and timestamp.

### B — frozen/self-dated project artifact

A file may contain an internal date earlier than the commit by which it was later preserved.

Record both:

~~~text
artifact-declared date
public preservation commit/date
~~~

Do not silently treat the internal date as independently timestamped public publication.

### C — preserved dated conversation record

A preserved conversation can establish that a participant proposed or directed an idea by a certain time.

For public provenance, summarize only what is needed to identify the idea and contribution. Do not publish unrelated private content.

A retrospective summary of a conversation MUST say that the original conversation was not necessarily public at that time.

### D — retrospective recollection without contemporaneous corroboration

This is useful as a lead but is weak priority evidence.

Label it explicitly:

~~~text
RETROSPECTIVE_RECOLLECTION
~~~

Do not convert recollection into a precise historical timestamp unless another source supports it.

## 4. Attribution categories

Use one or more of these categories.

### HUMAN_ORIGINATED_DIRECTION

The human investigator introduced the problem, research objective, governing intuition, or constraint.

### HUMAN_ORIGINATED_IDEA

The human investigator proposed the substantive mechanism or concept.

### AGENT_ORIGINATED_FORMULATION

An AI/agent first proposed a particular formulation, abstraction, module structure, terminology, or candidate mechanism during the project.

### AGENT_ASSISTED_FORMALIZATION

The underlying idea/direction came from the human investigator, while the agent translated it into specification text, proofs, test plans, code, or structured doctrine.

### CO_DEVELOPED

The surviving evidence does not support clean sole attribution because the idea evolved through iterative human-agent dialogue.

### RESEARCH_FINDING

A result emerged from the research process rather than being supplied as an initial idea. Record who/what generated the candidate, who verified it, and the evidence revision.

### EXTERNAL_ANTECEDENT

Relevant prior work or a pre-existing concept supplied by an external source.

These categories are contribution descriptions, not authorship rules.

## 5. Separate direction, formulation, implementation, and finding

Do not collapse:

~~~text
research direction
!= exact formulation
!= module/name
!= implementation
!= experiment design
!= empirical/computational finding
!= verification
!= publication authorship
~~~

A project can properly record, for example:

~~~text
research direction: Joshua Oshiro
specific graph/hypergraph-rewrite proposal: AI assistant
adoption and continued project direction: Joshua Oshiro
formal specification: agent-assisted
qualification campaign: agent-assisted under project governance
~~~

when that is what the evidence supports.

## 6. Record the reasoning path

For a major idea, provenance SHOULD include a short causal chain:

~~~text
observed problem
-> rejected/insufficient approach
-> new hypothesis
-> first formulation
-> test/falsifier
-> accepted/rejected/refined result
~~~

This is distinct from private chain-of-thought.

The record should preserve **research rationale and decision history**, not hidden model reasoning.

## 7. Major ideas that require a provenance entry

At minimum, add/update provenance when introducing:

- a new Core semantic principle;
- a new qualified extension/module;
- a major Project Discovery operating principle;
- a new research methodology;
- a major new class of use for IsoGraph;
- a material finding intended for publication;
- a claim of novelty or priority;
- a new experimental/discovery architecture;
- a major change in project mission.

Small bug fixes and ordinary editorial changes do not require separate idea-level provenance unless historically important.

## 8. Research-finding provenance

For a material finding, preserve:

- originating question;
- source/frozen input;
- candidate generator/proposer;
- first evidence revision;
- falsifiers attempted;
- corrections/repairs;
- independent or non-participating review;
- final supported scope;
- publication revision if any.

When a bug exposes a clue, preserve both histories:

~~~text
bug/defect history
discovery history
~~~

Repairing the defect must not erase the discovery provenance.

## 9. External-priority discipline

A project provenance record is not a novelty review.

Broad concepts such as:

- AI-assisted science;
- computational discovery;
- graph/hypergraph rewriting;
- structural analogy;
- automated theorem discovery;
- multi-agent research;
- computational exploration of scientific models

have substantial external histories.

IsoGraph/Project Discovery priority claims must therefore be **claim-specific**.

Before publishing a statement such as "we were first to X," perform and preserve a dedicated prior-art/history review of X.

If parallel external work is discovered, record:

- when the project became aware of it;
- the source;
- what appears similar;
- what appears different;
- whether an actual priority comparison has been performed.

Do not infer copying or priority merely from similarity.

## 10. Time format

For new records, use ISO 8601.

Prefer both local offset and UTC where useful:

~~~text
2026-10-02T14:06:06-07:00
2026-10-02T21:06:06Z
~~~

Historical source timestamps should be reproduced exactly from the evidence.

## 11. Immutable-evidence rule

Do not rewrite frozen historical artifacts solely to insert modern provenance language.

Instead:

1. preserve the historical bytes;
2. create/update the current provenance ledger;
3. link the historical artifact;
4. explain the relationship.

## 12. Publications

Publications remain governed by `PUBLICATION_ATTRIBUTION_POLICY.md`.

In addition, material papers SHOULD cite the relevant idea/finding provenance entry when the result depends on:

- a novel project method;
- a major new project concept;
- a priority-sensitive research finding.

Authorship and idea provenance are related but distinct.

## 13. Current canonical provenance records

Current entry points are:

- `ORIGIN_AND_PROVENANCE.md` — human-readable IsoGraph chronology and attribution;
- `provenance/IDEA_PROVENANCE_LEDGER.json` — machine-readable idea/finding ledger;
- `research/project-discovery/ORIGIN_AND_PROVENANCE.md` — Project Discovery-specific chronology.

The repository history remains the underlying evidence.

## 14. Amendment rule

If later evidence predates or contradicts an existing provenance entry:

- do not delete the old statement without explanation;
- update the entry;
- record the newly located evidence;
- state why the chronology changed;
- preserve the superseded record in Git history.

The goal is historical accuracy, not defending a previously preferred attribution.