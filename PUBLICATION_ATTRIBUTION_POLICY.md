# IsoGraph Publication Attribution Policy

**Status:** project publication requirement  
**Author name authority:** **Joshua Oshiro**  
**Spelling:** O-S-H-I-R-O

This policy applies to every public-facing IsoGraph research publication, paper, article, preprint, report intended for publication, or substantially equivalent publication artifact.

## Required authorship

Every IsoGraph publication MUST list:

**Joshua Oshiro**

as the author unless Joshua Oshiro explicitly directs otherwise for a specific publication.

Do not substitute, abbreviate, or alter the surname. In particular, the required spelling is:

~~~text
Oshiro
O-S-H-I-R-O
~~~

## Required IsoGraph attribution

Every publication MUST clearly attribute the research method/system to the **IsoGraph Project** and cite or reference the relevant IsoGraph repository artifacts used by the work.

At minimum, the publication should identify, as applicable:

- the IsoGraph Project;
- the relevant IsoGraph repository/revision or frozen research artifacts;
- the applicable Core / NEI / QU / Discovery Protocol authorities or research candidates;
- any project research record on which a substantive result depends.

References must preserve revision/provenance boundaries rather than citing "IsoGraph" generically when an exact artifact is load-bearing.

## Required agent-assistance statement

Every publication MUST contain a clear disclosure that agent assistance was used.

The disclosure MUST also state that **the IsoGraph system was designed by Joshua Oshiro**.

Preferred concise front-matter wording:

~~~text
Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.
~~~

A longer provenance/contribution note SHOULD distinguish:

- authorship by Joshua Oshiro;
- design of the IsoGraph system/methodology by Joshua Oshiro;
- research, drafting, analysis, verification, or discovery work performed with AI/agent assistance;
- external sources and third-party results credited to their respective authors.

## Idea/finding provenance is separate from authorship

Joshua Oshiro's authorship and credit as designer of IsoGraph do **not** imply that every exact formulation, module name, theorem candidate, experiment design, proof step, implementation detail, or discovered result was individually originated by Joshua.

Where a paper depends materially on a priority-sensitive project idea or finding, consult:

- `ORIGIN_AND_PROVENANCE.md`;
- `IDEA_PROVENANCE_POLICY.md`;
- `provenance/IDEA_PROVENANCE_LEDGER.json`;
- the originating research dossier's provenance record, when present.

Publications SHOULD distinguish human-originated direction/ideas, agent-originated formulations, co-developed work, agent-assisted formalization, research findings, and external antecedents when those distinctions are material to the result or a priority claim.

Do not convert the general statement `IsoGraph was designed by Joshua Oshiro` into a false sole-origin claim for a more specific idea where the project provenance record says otherwise.

## Required contribution/provenance note

For research papers, include a section such as:

~~~text
## Provenance and Contribution Note

Joshua Oshiro is the author of this paper and the designer of the IsoGraph system and methodology used in this research.

This work was produced with AI/agent assistance operating through or in conjunction with the IsoGraph research process. Agent assistance may have contributed to research, structural discovery, analysis, verification, drafting, or repository operations. Authorship and design of the IsoGraph system remain attributed to Joshua Oshiro.

External publications, formal sources, software, datasets, and prior results are attributed separately in the references.
~~~

The wording may be adapted to the actual work performed, but it MUST preserve those factual distinctions.

## References and attribution discipline

Publications MUST provide proper references for external work and for load-bearing IsoGraph artifacts.

Do not:

- present third-party theorems, code, datasets, or methods as IsoGraph-originated;
- present agent assistance as human-independent authorship;
- describe an agent as the designer of IsoGraph;
- omit the IsoGraph Project when IsoGraph materially generated, organized, verified, or exposed the published result;
- make external novelty claims without a separately supported novelty review.

When a result was discovered through IsoGraph but uses established external mathematics, both contributions must be distinguished explicitly.

## Existing publications

The current repository publications:

- `research/publications/2026-09-26/NAVIER_STOKES_UNIQUE_MINIMUM_DELETION_SPACES_0_1.md`;
- `research/publications/2026-09-26/NAVIER_STOKES_PERIODIC_PACKAGING_DEPENDENCY_0_1.md`;

already list Joshua Oshiro as author and include agent-assistance / IsoGraph-design attribution.

Future revisions must preserve that attribution.

## Publication review gate

Before publication, verify mechanically or manually that:

~~~text
author:
    Joshua Oshiro

IsoGraph attribution:
    present

agent-assistance disclosure:
    present

IsoGraph designed by Joshua Oshiro:
    present

external references/attributions:
    present and accurate

revision/provenance references:
    present where load-bearing
~~~

A publication that fails this gate is not ready for release.
