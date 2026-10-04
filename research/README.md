# IsoGraph research

**Research root:** `research/`  
**Current research dossier convention:** every first-level research project directory exposes its current human/agent-readable research state in that directory's `README.md`.

This directory is the single repository home for IsoGraph research.

The layout rule is intentionally simple:

~~~text
research/
    README.md

    <research-project>/
        README.md
        supporting artifacts...
        dated/frozen subdirectories...
~~~

## Governing rules

1. **One project, one directory.** New research belongs under a named first-level directory such as `research/<project>/`. Do not add loose research documents directly under `research/`.
2. **One current dossier.** `research/<project>/README.md` is the project's current consolidated research dossier and primary access surface for humans and agents.
3. **Self-contained enough to review.** The dossier should state the research question/scope, current state, strongest findings, important negative evidence/corrections, authority/evidence boundary, provenance pointers, and open questions. A reader should not need to scrape the directory merely to understand the current result.
4. **Supporting artifacts remain evidence.** Native graphs, experiments, source freezes, audits, derivation indexes, raw reports, and dated snapshots may remain separate. Link them from the dossier for deeper audit rather than copying every byte into the dossier.
5. **Current dossier != semantic authority by default.** A research README is an access/research projection. Qualified semantic authority still comes from the exact versioned specification/qualification routing that owns the claim.
6. **Historical evidence stays historical.** Dated/frozen artifacts are not cosmetically rewritten to current semantics. The project README explains their relationship to current work.
7. **Current-family continuation is explicit.** When a historical campaign predates the current IsoGraph family, its README must say so and state what a successor campaign would need to do before claiming current-family compliance.
8. **Publications are outputs, not authority routing.** `research/publications/` follows the same README/front-door rule but serves as a shared publication collection.
9. **No hidden bundle registry.** The filesystem is the registry. CI discovers first-level research directories automatically and checks that their READMEs exist and are indexed here.
10. **Keep this index current.** Adding or removing a first-level research directory requires updating this README in the same change.
11. **Preserve idea/finding provenance.** Major research ideas, methods, mission changes, and material findings intended for publication must follow `../IDEA_PROVENANCE_POLICY.md`: record originator/contributors, earliest evidence currently located, retrospective record date where applicable, reasoning/decision path, and evidence revision. Do not backdate retrospective provenance.
12. **Separate research direction from formulation.** Human direction, agent-originated formulation, agent-assisted formalization, implementation, finding, verification, and publication authorship are different contribution facts and must not be collapsed.

## Current research areas

- [Discovery-method research](discovery/README.md) — research notes supporting Discovery Protocol development; current DP authority remains under `extensions/discovery/` and qualification routing.
- [DTS research](dts/README.md) — development history and implementation research behind the Detailed Transition System.
- [Glycan cleavage](glycan-cleavage/README.md) — exact phase-algebra, path-coverage, witness-width, and algorithmic research in the frozen biochemical model.
- [Navier–Stokes proof rendering](navier-stokes-proof/README.md) — source-faithful structural rendering and reduction research over a pinned proof corpus.
- [NEI research](nei/README.md) — historical/design research surrounding Natural Entropic Identity; qualified NEI authority remains separately versioned.
- [P versus NP](p-vs-np/README.md) — primitive computation and continuation-support research; theorem status remains open.
- [Primitive logic](primitive-logic/README.md) — supporting primitive-logic/kernel research used during Core primitive-closure development.
- [Project Discovery](project-discovery/README.md) — current proof-of-function campaigns and the long-term plan for large-scale, massively parallel within-domain and cross-domain research synthesis using coordinated agents, substantial compute, independent verification, and human/domain expertise.
- [Woit–Lisi IsoGraph unification synthesis](woit-lisi-isomorph/README.md) — full independent source renderings plus constructive synthesis over a frozen quaternionic/chiral common kernel; bridge work is retained as evidence, while current research targets a minimal conservative unified formulation.
- [Research publications](publications/README.md) — publication-facing outputs and revision indexes.
- [Repository reconciliation](repository-reconciliation/README.md) — preserved research/provenance review of surviving historical branches.

## Current IsoGraph family

Repository-wide current authority is routed by:

- `qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md`;
- `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_21_2026-09-29.md`.

The current integrated family is:

~~~text
Core 0.17–0.21
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.10
+ DTS 0.1
+ EI 0.1
~~~

Research dossiers may describe older frozen campaigns. They must not silently upgrade historical evidence to this current family.

## Accessibility objective

The project README is deliberately the first document an outside reviewer or agent should need.

A reviewer should be able to start with:

~~~text
research/README.md
    -> research/<project>/README.md
    -> supporting evidence only when deeper audit is needed
~~~

This structure is intended to support future static agent-access projections without changing research authority or requiring agents to crawl GitHub's repository UI.
