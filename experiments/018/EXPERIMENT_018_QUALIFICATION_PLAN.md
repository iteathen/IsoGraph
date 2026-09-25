# Experiment 018 — DP 0.6 Successor Qualification Plan

**Status:** frozen focused qualification design after provider-only failures of the oversized cumulative packet  
**Candidate:** extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md  
**Qualified baseline:** DP 0.1–0.4 cumulative module  
**Successor semantics under test:** DP 0.5 + DP 0.6  
**Qualified dependencies:** current Core 0.17 + Core 0.18, QU 0.1, NEI 0.4 where invoked  
**Cases:** experiments/018/DP_0_6_CASES.md  
**Cold prompt:** experiments/018/COLD_PROMPT.md

## Qualification claim

Experiment 018 does not spend external semantic capacity re-proving already-qualified DP 0.1–0.4 behavior.

It freshly tests the successor obligations introduced by DP 0.5 and 0.6:
- discrepancy is observation before defect classification;
- qualification and discovery dispositions remain independent;
- hidden distinction and scoped equivalence are preserved correctly;
- unresolved load-bearing structure remains QU-bearing;
- dependency invalidation may propagate;
- investigation is bounded and ordinary errors may close;
- natural identity conclusions route through current qualified NEI 0.4;
- NEI and QU are not artificially invoked where their semantics are not load-bearing.

Passing the focused delta on top of the pinned qualified DP 0.1–0.4 baseline qualifies the cumulative DP 0.1–0.6 module for this dependency-closed scope.

## Provider-failure history

The earlier oversized cumulative packet received only HTTP 503 responses and produced no semantic report. Those runs are retained as infrastructure evidence. The semantic candidate and holdout expectations remain unchanged.

## Isolation and scoring

Hidden assertions, scorer, author audit, previous evidence, repository map, agent guidance and expected outputs are excluded from the cold packet. All D01–D14 propositions, reasoning/provenance guards, packet self-audit and module assessment must pass exactly.
