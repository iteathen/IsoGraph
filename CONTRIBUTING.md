# Contributing to IsoGraph

IsoGraph is an experimental agent-native structural knowledge representation. Contributions are welcome, but semantic changes carry a higher evidence burden than ordinary documentation or tooling changes because a small ambiguity can create false structural equivalence or hide a real correspondence.

## Start with current authority

Before substantive work, read:

1. `README.md`
2. `STATUS.md`
3. `AGENTS.md`
4. `qualification/QUALIFIED_MODULES_2026-09-29_CORE_0_21.md`
5. `research/README.md` when the work is research.

Current Core authority is cumulative through Core 0.21 at the exact qualified revisions routed by the current manifest. Older drafts remain historical provenance/evidence and must not be silently reinterpreted to appear current.

Pre-IsoGraph and earlier-draft artifacts remain evidence under the semantics recorded at their revision.

## Research layout

Research work belongs under `research/<project>/`, one first-level directory per research project.

The project `README.md` is the current consolidated research dossier. Supporting artifacts may remain separate for audit/provenance, but the README should be sufficient to understand and begin reviewing the current research without scraping the directory.

Do not add loose files directly under `research/`. Keep `research/README.md` updated whenever a first-level research project is added or removed.

Repository Verify enforces these layout rules.

## Evidence before extension

For a proposed semantic change:

```text
observed defect or missing distinction
-> minimal falsifier
-> attempt faithful construction from existing lower structure
-> classify the failure
-> make the smallest correction that restores exact meaning
-> qualify the correction independently
```

Do not add a primitive, structural class, relation kind, parameter slot, comparison view, or canonical factorization merely because one case is awkward.

Keep these distinctions explicit:

- surface syntax != irreducible substrate;
- source-faithful representation != comparison view;
- structural identity != occurrence;
- factorization != normalization;
- one valid factorization != canonical factorization;
- native representability != dedicated syntax;
- retrieval hint != structural evidence;
- source/D residual != pairwise residual;
- class label != class-membership evidence;
- semantic equivalence != structural isomorphism;
- rule existence != rule activation;
- NAC object existence != NAC evaluation.

## Cold qualification

Cold decoder/verifier experiments are evidence only when isolation is real.

- Give the isolated agent only the files named by the frozen prompt.
- Do not expose scorer assertions, expected mappings, prior cold outputs, registry hypotheses, author audits, external-review dispositions, or other hidden material before output freeze.
- Freeze the raw output before unblinding.
- Classify discrepancies before repair.
- Preserve failed runs and ambiguities as evidence; do not rewrite them into success.

## Markdown and math rendering

Mutable documentation must render correctly in GitHub Markdown.

- Keep general mutable documentation renderer-independent: prefer Unicode/plain text for simple mathematics and fenced `text` blocks for multi-line structural expressions.
- Do not use raw backslash-parenthesis or backslash-bracket TeX delimiters in mutable Markdown.
- When a formal research document genuinely needs mathematical typesetting, keep all TeX commands inside an explicitly supported math region and validate the math syntax before merge.
- When discussing literal TeX syntax, place it inside inline code or a fenced code block.
- Do not rewrite frozen/versioned historical evidence solely for presentation cleanup; fix current mutable routing/explanatory documents or create a new qualified revision if authoritative semantic bytes must change.
- Keep TeX commands inside a supported math delimiter or a fenced code block.
- Do not “repair” frozen raw experiment output or versioned historical specification bytes merely for presentation. Preserve those exact artifacts and record the rendering exception instead.
- Run `node tools/audit-doc-rendering.mjs --enforce-mutable` before submitting documentation changes. Repository Verify runs the same guard.

## Pull requests

Use an issue for nontrivial semantic/specification changes. Keep each pull request scoped to one coherent correction, experiment, or documentation boundary.

A pull request should identify:

- the immutable revision(s) it changes or tests;
- the structural risk addressed;
- the evidence or falsifier;
- what remains unqualified;
- any historical artifacts intentionally left unchanged.

Run `git diff --check` and ensure repository `verify` CI passes.

## Developer Certificate of Origin

The public repositories in this account use DCO-style certification. Where repository settings require it, include a `Signed-off-by:` line in commits, for example:

```text
Signed-off-by: Your Name <you@example.com>
```

Use `git commit -s` to add it automatically.

## Security and private information

Do not place credentials, private artifacts, personal data, unpublished scorer material intended to remain sealed, or sensitive security details in public issues or commits. Use GitHub's private security-advisory channel for security-sensitive reports.

## License

Unless explicitly stated otherwise, contributions are accepted under the repository's AGPL-3.0 license.
