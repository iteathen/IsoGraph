# Contributing to IsoGraph

IsoGraph is an experimental agent-native structural knowledge representation. Contributions are welcome, but semantic changes carry a higher evidence burden than ordinary documentation or tooling changes because a small ambiguity can create false structural equivalence or hide a real correspondence.

## Start with current authority

Before substantive work, read:

1. `README.md`
2. `MIGRATION.md`
3. `AGENTS.md`
4. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`

The consolidated Draft 0.15 file is the self-contained current semantic authority for new work. Drafts 0.13, 0.14, and the non-consolidated 0.15 amendment remain historical provenance and rationale; they are not required replay material for a current decoder.

Pre-IsoGraph and earlier-draft artifacts remain evidence under the semantics recorded at their revision and must not be silently reinterpreted to appear current.

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
