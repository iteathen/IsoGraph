# IsoGraph / Project Discovery Origin-Provenance Audit — 2026-10-02

**Audit recorded on:** 2026-10-02T14:06:06-07:00 / 2026-10-02T21:06:06Z  
**Repository baseline at audit start:** `main@323d0f4ea78775ca99170002efb5be0037d6b01b`  
**Nature:** retrospective provenance reconstruction with immutable-public-evidence anchors

## Why this audit was performed

Joshua Oshiro identified active external work at the Wolfram Institute that appeared strongly aligned with the philosophy and research direction of IsoGraph and Project Discovery.

Because independently developed research programs can converge on similar ideas, the project needs claim-specific provenance that can answer:

- what the project was trying to do at each stage;
- who supplied the governing idea/direction;
- who proposed a particular formulation;
- when the idea is first evidenced in surviving records;
- when a later provenance record was written;
- which evidence was public at the time;
- and which broad concepts have external antecedents.

The audit deliberately does **not** infer copying, influence, or global priority from similarity.

## Sources inspected

### Public Git / repository evidence

- `iteathen/CUDA-JS` historical Axiomesh/AxiomeSH tree;
- frozen source/migration anchor `275b4d28224990a2b8fbdd7fa66cb071fb867e48`;
- path-scoped GitHub commit history for `research/axiomesh/README.md`;
- path-scoped history for `research/axiomesh/DESIGN_NOTES.md`;
- structural discovery protocol history;
- standalone IsoGraph migration commits;
- current/historical Core 0.18–0.21 specification paths;
- DP 0.8–0.10 and EI 0.1 specification history;
- Project Discovery campaign records and path history;
- current Project Discovery mission commit `323d0f4e...`.

### Preserved project-conversation evidence

Only contribution-relevant summaries were used. These were recorded with their original timestamps but are explicitly labeled retrospective and not assumed to have been public at the event time.

### Current project policy / publications

- `PUBLICATION_ATTRIBUTION_POLICY.md`;
- `MIGRATION.md`;
- `DESIGN_NOTES.md`;
- `DESIGN_IDEALS.md`;
- root/research/Project Discovery READMEs.

### External antecedent boundary

The audit noted public Wolfram Institute material and the user-supplied YouTube URL as reasons to avoid broad/global priority claims. A full prior-art comparison to Wolfram Institute work was **not** performed as part of this audit.

## Key findings

### 1. Earliest public project seed currently located

~~~text
repository: iteathen/CUDA-JS
commit: 323ce2510c6f4bcf883c506a630aa9acbd618490
time: 2026-09-16T19:44:15Z
path: research/axiomesh/README.md
blob: 3dec1d491fe4f14ba38de422c6d68801fe851d1a
~~~

The file explicitly names `Research direction: Josh Oshiro` and frames the problem as compact/recoverable reasoning state for agents under context limits.

### 2. Public design rationale preserved minutes later

~~~text
commit: a0a5d015c8daadd0221c4b766c2aee14f05d0c1e
time: 2026-09-16T21:02:48Z
path: research/axiomesh/DESIGN_NOTES.md
blob: e61f8775000dd64a9148f16599a8d67f3f0c2ff1
~~~

The notes record the reasoning path from working-state/representation ceilings to relational structure and graph/hypergraph rewriting.

### 3. Attribution is mixed and must remain mixed

The audit found clear evidence for several different contribution modes:

- Joshua-originated research direction;
- Joshua-originated governing ideas (e.g. discrepancy-as-clue, primitive/no-evasion pressure, open-world experiment requirements);
- AI-assistant-originated formulations (notably the graph/hypergraph rewrite proposal and compact structure-plus-lawful-transformation formulation);
- co-developed concepts where sole origin is not established (e.g. original IA concept);
- agent-assisted formalization of Joshua's governing pressures into later specifications/modules;
- research findings emerging from experiments rather than being supplied by either participant in advance.

### 4. Project Discovery has multiple origin milestones

- self-dated named campaign artifact: 2026-09-25;
- located public preservation of Ising/MWC campaign: 2026-09-26T15:30:54Z;
- corpus-wide research-synthesis direction from Joshua: 2026-09-26T00:55:18Z preserved conversation;
- grand-scale hundreds/thousands-agent mission from Joshua: 2026-09-30T00:43:48Z;
- funding/talent/management requirement from Joshua: 2026-09-30T00:46:30Z;
- GitHub-verified public mature-mission formalization: 2026-09-30T00:49:49Z.

### 5. Git timestamps are necessary but not sufficient

Some research was incubated in another repository, some artifacts are self-dated and merged later, and some conceptual direction first appears in private project dialogue.

The new provenance model therefore distinguishes:

~~~text
event / conversation time
artifact-declared date
public preservation commit time
retrospective record creation time
~~~

## New durable artifacts

- `IDEA_PROVENANCE_POLICY.md`;
- `ORIGIN_AND_PROVENANCE.md`;
- `provenance/IDEA_PROVENANCE_LEDGER.json`;
- `research/project-discovery/ORIGIN_AND_PROVENANCE.md`;
- `tools/check-idea-provenance.mjs`.

## Existing docs updated

- root `README.md`;
- `MIGRATION.md`;
- `DESIGN_NOTES.md`;
- `DESIGN_IDEALS.md`;
- `STATUS.md`;
- `EVIDENCE.md`;
- `AGENTS.md`;
- `CONTRIBUTING.md`;
- `PUBLICATION_ATTRIBUTION_POLICY.md`;
- `research/README.md`;
- `research/project-discovery/README.md`;
- repository Verify workflow.

## CI rules added

`tools/check-idea-provenance.mjs` requires:

- central provenance records to exist;
- machine-readable ledger JSON to parse;
- explicit retrospective status;
- parseable recorded-on timestamps;
- unique provenance IDs;
- valid attribution categories;
- core provenance entries to remain present;
- retrospective conversation evidence to say `public_at_event_time=false`;
- exact Git commit pointers to use full 40-hex SHAs;
- current governance/publication/research docs to link the provenance system.

## Limitations / unresolved history

The audit has not proved:

- global priority of IsoGraph or Project Discovery;
- the earliest private/unrecorded thought before the first preserved evidence;
- the exact first utterance/use of the name Project Discovery;
- whether every self-dated historical artifact was publicly accessible on its internal date;
- a complete history comparison against Wolfram Institute or other external programs;
- sole origin for concepts where the surviving record supports co-development only.

## Amendment rule

If older evidence is later found, update the chronology rather than defending this audit.

The canonical phrase is:

> earliest evidence currently located

not:

> first in the world.

Git history preserves the revisions of this audit so later chronology corrections remain themselves auditable.