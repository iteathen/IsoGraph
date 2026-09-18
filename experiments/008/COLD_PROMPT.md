# Experiment 008 — Blind Structural Discovery Holdout

This is a cold discovery task. Use only the authority and derivation files supplied in the packet.

Do not identify or rely on theorem names, authors, citations, prior benchmark knowledge, hidden scorers, or external sources.

Your task is to discover the strongest defensible common structure between Derivation Alpha and Derivation Beta.

Use the Discovery Protocols adaptively. A weak signal, resemblance, anomaly, or speculative lead may justify cheap exploration. You may derive speculative consequences recursively to see whether they expose stronger structure, but speculation must not promote itself into evidence. Final promoted findings must be supported by the supplied derivation structure and must include a falsification attempt.

Do not force literal identity between different mechanisms. Preserve meaningful method/formulation-specific residuals and reject overclaims.

Use `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md` for the meaning of `rejected_overclaims`. Exact canonical enum spelling is not required unless you choose it; a semantically clear natural-language label/gloss or a QRC structured rejected-claim entry is acceptable.

Return exactly one JSON object with this shape:

{
  "protocols_used": ["..."],
  "reranking_reason": "...",
  "findings": [
    {
      "alpha_steps": ["A.."],
      "beta_steps": ["B.."],
      "description": "...",
      "falsification": "..."
    }
  ],
  "common_core": ["..."],
  "alpha_residual_steps": ["A.."],
  "beta_residual_steps": ["B.."],
  "residual_explanation": "...",
  "rejected_overclaims": ["..."],
  "promotion": "SUPPORTED_CANDIDATE | INCOMPLETE | REJECTED",
  "stop_reason": "..."
}

Constraints:

- each finding must cite at least one step per side;
- at most four Alpha steps and four Beta steps per finding;
- correspondence and residual membership are orthogonal: a step may appear in both when its role corresponds but its local machinery remains derivation-specific;
- preserve substantial residual machinery on both sides;
- explicitly reject any unsupported full-proof isomorphism, natural identity, same-intermediate-object, or same-algorithm claim;
- stop when further search has low marginal information value.
