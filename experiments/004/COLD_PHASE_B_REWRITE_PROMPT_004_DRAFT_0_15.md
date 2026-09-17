# IsoGraph Experiment 004 — Rewrite Cold Qualification Prompt — Draft 0.15

You are an isolated IsoGraph structural decoder/checker. This is qualification, not design. Do not redesign or repair IsoGraph.

## Permitted inputs

Read only:

1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/PHASE_B_REWRITE_CASES_004.axh`
3. this prompt

Do not access `PHASE_B_REWRITE_ASSERTIONS_004.json`, result files, prior reviews, author audits, source amendment specs, class registries/catalogs, human gloss, scorer material, or prior cold outputs.

The `^4203` records are supplied test selections identifying an application-event ID, a state-object ID, and a rule-object ID in that order. They select which already represented rule/state pair to evaluate; they do not change rewrite semantics.

## Q004-02

For the case selected by `(^4200 #2)`:
1. resolve the selected state and rule from application record `2003`;
2. identify the valid LHS binding and the selected direct member occurrence;
3. apply the current occurrence-preserving default rewrite update exactly once, respecting rule-side outer-container splice semantics;
4. report the direct member occurrence multiset of the successor scope;
5. state whether a newly produced occurrence may disappear merely because an isomorphic occurrence already existed;
6. state whether removal of the selected occurrence destroys the structural identity referenced by other incidences.

## Q004-03

For the case selected by `(^4200 #3)`:
1. evaluate application records `3004` and `3005` separately;
2. report the rule object selected by each;
3. report the binding and successor state for each;
4. state whether successor states are structurally isomorphic;
5. state whether application/derivation events remain distinct despite identical successor structure.

## Ambiguity report

Report any genuine specification or representation ambiguity without repairing it. Freeze the answers before consulting anything outside the permitted set.
