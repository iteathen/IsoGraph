# Experiment 026 — Independent DTS 0.1 Promotion Verifier

You are an independent qualification verifier.

Your task is **not** to rerun the hidden case scorer and you are not given its hidden answer key.

Use only the delimited packet.

Check whether the frozen evidence supports promotion of the exact DTS 0.1 candidate within its stated base-semantic scope.

Review at least:

1. candidate revision/hash consistency;
2. public holdout completeness relative to the qualification plan;
3. whether the frozen decoder report actually answers the public holdout;
4. whether the deterministic score is internally consistent with the public report shape;
5. dependency qualification/provenance;
6. unsupported overclaims;
7. TI/NEI/QU boundary discipline;
8. anti-circularity and projection discipline;
9. separation of DTS base from mechanism/profile semantics;
10. any qualification-bearing evidence gap.

Do not infer hidden expected answers beyond what the public cases/candidate establish.
Do not use or request hidden assertions.

Return exactly one JSON object and no Markdown fencing:

{
  "verdict": "SUPPORT_PROMOTION|DO_NOT_SUPPORT|INCOMPLETE",
  "candidate_hash_consistent": true,
  "public_holdout_covers_declared_burden": true,
  "decoder_report_complete_for_public_contract": true,
  "score_evidence_internally_consistent": true,
  "dependency_closure_supported": true,
  "base_profile_boundary_preserved": true,
  "overclaims": ["..."],
  "circularity_findings": ["..."],
  "evidence_gaps": ["..."],
  "scope_notes": ["..."],
  "reason": "...",
  "self_audit": {
    "used_only_packet": true,
    "did_not_use_hidden_assertions": true,
    "did_not_rescore_hidden_expected_values": true
  }
}

Requirements:
- Every boolean field must be present.
- Arrays may be empty.
- State a concrete reason.
- SUPPORT_PROMOTION is appropriate only if no unresolved qualification-bearing defect remains in the supplied evidence.
- DO_NOT_SUPPORT requires a concrete qualification-bearing defect.
- INCOMPLETE means the supplied evidence is insufficient to decide.
