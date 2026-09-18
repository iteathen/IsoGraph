# Experiment 011 — Frozen Integrated Qualification Review

**Frozen qualification SHA:** `317759cbc22d65ebf4a97a0fd3ec037ad41f4b6a`  
**Workflow run:** `35377034688`  
**Decoder:** `gemini-3.5-flash`  
**HTTP:** 200 after one provider retry within the runner  
**Packet SHA-256:** `f996e8fd151570508650ef824127e659652ed60c2d8c33627394ea2ade61c003`  
**Report SHA-256:** `9bd114516ed0cee9dce29288e3ea5057345314cec960faafc7dcb8a7487daa38`

## Frozen formal disposition

`DOES_NOT_QUALIFY`

The score failed only the explicit-overclaim guard.

## Integrated obligations successfully recovered

The cold report correctly:

- mapped A0/A1a/A1b/A2/A3 to B0/B1/B2/B3/B4;
- mapped the shared open referents u/v;
- classified both QU regions `OPEN`;
- identified the unknown-region structural relation as `QUI`;
- held NEI at `INCOMPLETE_AUTHORITY`;
- selected `WEAK_EMBEDDING`, with strong embedding false;
- preserved `Guard(B2,B3, provenance_tag)` and the B5/B6 audit branch as Beta residuals;
- preserved Alpha's atomic A1 in source-local D provenance rather than pairwise residuals;
- refused a canonical-factorization claim;
- ignored the misleading B5 label;
- assessed the integrated module stack as `SUPPORTED`.

## Formal failure

The public prompt required explicit rejection of four stronger claims: full isomorphism, natural identity, same intermediate objects, and same algorithm.

The report rejected `Global Isomorphism`, `Natural Identity SAME/DISTINCT`, `Strong Embedding`, `Canonical Factorization`, and label-based mapping. QRC semantic recognition counted natural identity, but did not count `Global Isomorphism` as the public `FULL_PROOF_ISOMORPHISM` concept, and the report did not explicitly reject same intermediate objects or same algorithm.

Therefore the frozen score correctly remains `DOES_NOT_QUALIFY` under its public contract.

## Continuation

A fresh integrated holdout should preserve the same cross-module burdens but expose proposition-specific booleans for the four overclaims. This avoids requiring a free-text rejection list to carry serializer/semantic burden.

Experiment 011 is not rescored or rewritten.
