# ISOGRAPH EXPERIMENT 004 — RUN-A — STANDALONE SCORING REPORT
 
*(Fresh scoring pass against the sealed assertions for `PHASE_A_ASSERTIONS_004.json`, compared to the frozen RUN-A cold report above. The frozen report itself is not edited.)*
 
## Q004-01
 
|Assertion|Verdict|
|---|---|
|`relation_under_V0 = NON_ISOMORPHIC`|**AGREE**|
|`left_direct_member_occurrences = 2`|**AGREE**|
|`right_direct_member_occurrences = 1`|**AGREE**|
|`duplicate_member_occurrences_semantic = true`|**AGREE**|
 
No discrepancy.
 
## Q004-04
 
|Assertion|Verdict|
|---|---|
|`relation_under_V0 = NON_ISOMORPHIC`|**AGREE**|
|`left_contains_nested_scope_boundary = true`|**AGREE**|
|`right_corresponding_members_are_flat = true`|**AGREE**|
|`N0_or_N1_may_flatten = false`|**AGREE**|
 
No discrepancy.
 
## Q004-05
 
|Subcase|Assertion|Verdict|
|---|---|---|
|1|match=true, `?0=60, ?1=60`|**AGREE**|
|2|match=false, conflicting binding|**AGREE**|
|3|qualification=`INVALID_UNOWNED_OR_UNBOUND_NAC_VARIABLE`, match=null|**AGREE** — frozen report reached the same determination (unowned NAC-only `?1`, blocked/not evaluable) for the same reason. Minor terminology note, not a discrepancy: the frozen report filed this under "protocol ambiguity" in its Difficulties section rather than as a flat `INVALID_...` classification; substance matches.|
|4|match=true, `?0=60`|**AGREE**|
 
No scored discrepancy.
 
## Q004-06
 
|Assertion|Verdict|
|---|---|
|`reference_binding_semantic_after_N0 = false`|**AGREE**|
|`left_occurrences_after_resolution = 2`|**AGREE**|
|`left_occurrences_share_structural_identities = true`|**AGREE**|
|`left_vs_right_relation_under_V0 = ISOMORPHIC`|**AGREE**|
|`left_vs_extra_relation_under_V0 = NON_ISOMORPHIC`|**AGREE**|
|alpha map `70→80, 71→81`|**AGREE** — exact match|
 
No discrepancy.
 
## Q004-07
 
|Assertion|Verdict|
|---|---|
|`bare_1_same_cross_bundle_object = false`|**AGREE**|
|`numeric_^7000_same_cross_bundle_semantic_symbol = false`|**AGREE**|
|`relation_under_V0 = NON_ISOMORPHIC`|**PARTIAL**|
|`relation_under_VS_with_explicit_bijection = ISOMORPHIC`|**AGREE**|
|VS local alpha map `1_A↔1_B, 2_A↔2_B`|**AGREE**|
 
**Discrepancy classification for the PARTIAL item:**
The frozen report's V0 answer reasoned that no valid correspondence exists between `^7000_A` and `^7000_B` under V0 (rigid, namespace-qualified, no shared namespace) and concluded comparison "cannot certify isomorphism" — but phrased the terminal verdict as *"not established / no valid basis for equating"* rather than committing to the flat **NON_ISOMORPHIC** the assertion expects. The underlying structural reasoning is correct and sufficient to support NON_ISOMORPHIC outright (rigidity under V0 forecloses any label correspondence by construction here, this is not a search-incompleteness case), but the frozen wording hedged into an "inconclusive" register instead of stating the definite relation. Classified as: **decoder/search implementation error** (articulation of a correctly-reasoned result as a weaker claim than the reasoning supports) — not a specification ambiguity, since the spec text itself (§24 V0, §6.1, §6.4) fully determines the answer.
 
## Q004-08
 
|Assertion|Verdict|
|---|---|
|`compact_quantifier_kind_same = true`|**AGREE**|
|`quantified_body_shape_same = true`|**AGREE**|
|`associated_domain_generator_marker_mappable = true`|**AGREE**|
|`left_domain_member_occurrences = 1`|**AGREE**|
|`right_domain_member_occurrences = 2`|**AGREE**|
|`complete_constructions_relation_under_V0 = NON_ISOMORPHIC`|**AGREE**|
|`binder_body_alone_sufficient_for_semantic_interchangeability = false`|**AGREE**|
 
No discrepancy.
  
## Summary
 
```text
AGREE:     20 of 21 scored assertions
PARTIAL:   1  (Q004-07, relation_under_V0 — correct reasoning, hedged terminal label)
DISAGREE:  0
NOT TESTED: 0
```
 
**Discrepancy classes used:** decoder/search implementation error (×1).
 
**Ambiguity preserved, not forced to pass or fail:** Q004-05 subcase 3 — both the frozen report and the sealed assertion treat this as a blocked/null match outcome rather than manufacturing a true/false answer; no forcing occurred here.
 
**Observation (not scored as a discrepancy):** the sealed packet's `authority` field cites Drafts 0.13/0.14 by filename, while the actual `CURRENT CONSOLIDATED AUTHORITY` text supplied in this same scorer packet is the Draft 0.15 consolidated candidate — the same document the cold run used. This is internally consistent with the spec's own "historical lineage" statement (0.15 consolidates 0.13+0.14+0.15 cumulative semantics), so it did not affect any scoring decision above, but it's noted in case a later run's scorer metadata is meant to signal something different.
 
No repair to the frozen cold report or to the Core Specification is proposed from this pass — the one PARTIAL is a phrasing/confidence issue in the frozen report's output, not a specification defect.
