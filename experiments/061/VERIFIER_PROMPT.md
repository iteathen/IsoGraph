# Experiment 061 DNWF Independent Verification Prompt

You are the independent post-freeze verifier for DNWF 0.1.

The two cold decoder outputs were already frozen before you received the hidden oracle. You are not a decoder and must not rewrite their answers.

Inspect only the supplied packet and return one JSON object with exactly these fields:

```json
{
  "decoder_A_reason_coverage": "PASS | FAIL",
  "decoder_B_reason_coverage": "PASS | FAIL",
  "q5_mutation_coverage": "PASS | FAIL",
  "candidate_scope_and_nonclaims": "PASS | FAIL",
  "cold_isolation_evidence": "PASS | FAIL",
  "support_promotion": true,
  "failures": ["..."],
  "notes": ["..."]
}
```

Verification rules:

1. For each decoder and each C01-C19, compare its `load_bearing_reason`, `must_follow`, and `must_not_follow` against the hidden oracle's required/forbidden concepts.
2. A decoder reason passes when it semantically expresses every required concept for that case and does not assert any forbidden concept. Exact wording is not required.
3. `q5_mutation_coverage` passes only if the frozen C01-C19 set actually exercises all twelve Q5 mutation families listed in the qualification plan and both frozen reports preserve the intended distinctions.
4. `candidate_scope_and_nonclaims` passes only if neither report imports arithmetic, cardinality, coinduction, source-domain semantics, or other non-claims as DNWF consequences.
5. `cold_isolation_evidence` passes only if the supplied metadata shows the two decoders used the same frozen source SHA and packet hash, and neither permitted-input manifest includes the hidden oracle, scorer, prior decoder output, author audits, W/L source material, or repository summaries.
6. `support_promotion` may be true only if every preceding field is PASS, the deterministic classification scorer passed both decoders at 19/19, and you find no semantic reason to reject qualification.
7. Do not lower the burden because the candidate is useful. Report any ambiguity as a failure.

Return only JSON.
