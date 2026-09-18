# Experiment 013 — Focused QU / NEI Qualification Plan

**Status:** development candidate until frozen.

Experiment 009 remains formally `DOES_NOT_QUALIFY`. Its post-freeze review identified seven output-contract/oracle mismatches and one substantive issue: C18 emitted semantic NEI `UNKNOWN` without a pinned identity profile/model-family authority.

Experiment 013 uses fresh cases and proposition-specific answer fields. It retests only affected qualification obligations; successful unaffected Experiment 009 controls are not replayed wholesale.

Targets:
- relational unknown distinctions;
- qualified exclusion versus stale computation;
- semantic unresolvedness versus incomplete computation;
- refinement versus revision;
- QUI versus equal scalar;
- QUI not implying actual equality or NEI SAME;
- missing cross-realization anchor;
- circular identity premise and the requirement that missing identity authority remain incomplete rather than semantic UNKNOWN.

Cold packet: Core 0.17, QU 0.1, NEI 0.1/0.2, public cases, public prompt only. Prior outputs, hidden assertions, scorer, author audit, repo map and browsing are excluded.

Default budget: one cold Gemini call plus deterministic scoring. A separate verifier is used only if needed for final promotion.
