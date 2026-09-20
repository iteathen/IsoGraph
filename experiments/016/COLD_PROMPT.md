# Experiment 016 — Cold NEI 0.4 Qualification Prompt

You are an isolated semantic decoder for IsoGraph Experiment 016.

Use only the delimited packet. Do not browse, inspect prior experiment outputs, infer hidden scoring keys, or redesign the specification.

Return exactly one JSON object and no Markdown fencing:

```json
{
  "cases": [
    {
      "case_id": "Q01",
      "answers": {},
      "reason": "step-grounded explanation",
      "authority_used": ["..."]
    }
  ],
  "module_assessment": {
    "nei_0_4": "SUPPORTED|NOT_SUPPORTED|INCOMPLETE"
  },
  "self_audit": {
    "used_only_packet": true,
    "notes": "..."
  }
}
```

Return Q01-Q18 exactly once and in order.

The answer keys and allowed value shapes below are public serializer requirements. Example booleans/strings show types or allowed enums, not expected truth values.

## Q01
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","profile_declares_answer":true,"derived_from_model_family":true}
```

## Q02
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","profile_declares_answer":true,"derived_from_model_family":true}
```

## Q03
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","evidence_direction":"COIDENTITY|SEPARATION|NEUTRAL|QU_DEPENDENT","exact_same_established":true,"thresholding_allowed":true}
```

## Q04
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","evidence_direction":"COIDENTITY|SEPARATION|NEUTRAL|QU_DEPENDENT","exact_distinct_established":true,"thresholding_allowed":true}
```

## Q05
```json
{"bayes_factor":"string","posterior_odds_a":"string","posterior_odds_b":"string","posterior_changes":true,"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL"}
```

## Q06
```json
{"naive_log_weight_sum_allowed":true,"joint_model_required":true,"independent_evidence_count":0}
```

## Q07
```json
{"factorization_allowed":true,"joint_bayes_factor":"string","log_additive":true}
```

## Q08
```json
{"scalar_marginal_allowed":true,"evidence_direction":"COIDENTITY|SEPARATION|NEUTRAL|QU_DEPENDENT","representation":"SCALAR|REALIZATION_CONDITIONED_OR_SET"}
```

## Q09
```json
{"robust_direction":"COIDENTITY|SEPARATION|NEUTRAL|QU_DEPENDENT","exact_same_established":true,"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL"}
```

## Q10
```json
{"marginalization_allowed":true,"marginal_likelihood_i":"string","marginal_likelihood_not_i":"string","bayes_factor":"string","nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL"}
```

## Q11
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","semantic_unknown_established":true,"missing_qu_can_be_ignored":true}
```

## Q12
```json
{"information_states_equivalent":true,"shared_referent_preserved":true,"equal_value_implies_same_referent":true}
```

## Q13
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","bayes_weight_required":true,"evidence_kind":"EXACT|PROBABILISTIC"}
```

## Q14
```json
{"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","posterior_identity_probability":"string","coexist_without_contradiction":true}
```

## Q15
```json
{"scoped_equivalence_established":true,"global_nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL","scoped_result_promotes_global_same":true}
```

## Q16
```json
{"independent_evidence_count":0,"multiply_bayes_factors":true,"lineage_must_be_preserved":true}
```

## Q17
```json
{"restriction_admissible":true,"original_qu_unchanged":true,"nei_same_established":true}
```

## Q18
```json
{"profile_contains_answer_tag":true,"derived_result_possible":true,"nei_status":"SAME|DISTINCT|UNKNOWN|INCOMPLETE_UNQUALIFIED|NO_ADMISSIBLE_MODEL"}
```

Apply the supplied specifications exactly. Keep exact identity classification separate from probabilistic evidence/confidence. QU supplies admissible unresolved structure, not an implicit probability distribution. Evidence dependence and provenance are load-bearing.
