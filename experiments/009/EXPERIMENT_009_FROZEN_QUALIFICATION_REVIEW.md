# Experiment 009 — Frozen Qualification Review

**Frozen qualification SHA:** `2a30f9f4f4e55c8c95c0ea2be295d6f5de40e9b1`  
**Inspectable cold run:** OX-Alpha-Control run `35375263248`  
**Decoder:** `nvidia/nemotron-3-ultra-550b-a55b:free` via OpenRouter/Nvidia  
**HTTP:** 200, one attempt  
**Packet SHA-256:** `d7d8e8b73bc0074fdda299c832becb9d4c3a6059c3336b03cbccc79a47696139`  
**Report SHA-256:** `05de2c0627531b074256b36b79013b169941c9efaef80a6a132fe0d439994632`

## Frozen formal disposition

`DOES_NOT_QUALIFY`

The frozen score is not rewritten. Both module assessments in the cold report were `SUPPORTED`, packet/isolation guards passed, and the post-freeze diagnosis separates scorer-contract defects from one substantive NEI overreach.

## Scorer-contract defects

- **C02:** the decoder used `decision=REJECTED` to reject the proposition that three unknown representations are interchangeable. The scorer expected `SUPPORTED` to mean the module rule was supported. The public field did not define that polarity precisely.
- **C05:** the decoder used `decision=SUPPORTED` because the stated exclusion semantics are supported; the scorer expected `REJECTED` as the answer to whether the excluded realization is admissible. Same polarity ambiguity.
- **C10:** both public subresults were exactly correct (`SEMANTIC_UNRESOLVED` vs `COMPUTATION_INCOMPLETE`), but the scorer additionally required a top-level `qu_status=NOT_APPLICABLE`; the decoder summarized the first named semantic state instead.
- **C11:** both refinement/revision subresults were exactly correct, while the scorer unnecessarily required top-level `qu_status=NOT_APPLICABLE`; the decoder summarized the starting QU as `OPEN`.
- **C12:** the decoder returned `STRUCTURALLY_DISTINCT` for the non-QUI pair. The scorer required `NOT_QUI`, although both were public enum values and the structural explanation was correct.
- **C13:** the case asked what a QUI establishes about actual resolution equality or NEI SAME. The decoder correctly concluded that QUI establishes neither and did not manufacture an NEI query/profile. The scorer nevertheless required `INCOMPLETE_AUTHORITY`, `requires_nei=true`, and a particular generic decision polarity.
- **C17:** the decoder returned the correct `nei_status=INCOMPLETE_AUTHORITY` and explicitly rejected choosing a correspondence to force SAME/DISTINCT. The only mismatch was generic `decision=SUPPORTED` versus the scorer's `INCOMPLETE` expectation.

These are output-contract/oracle defects, not evidence against the candidate semantics. They remain part of the frozen formal failure.

## Substantive C18 issue

C18 correctly rejected the circular proof, preserved the original open QU, and marked `circular_evidence=true`. However it emitted `nei_status=UNKNOWN`.

Under NEI 0.1, semantic `UNKNOWN` is itself a positive qualified result requiring admissible SAME and DISTINCT models under one pinned profile/QU/evidence authority. C18 supplied no independent identity profile/law connecting carrier equality/inequality to natural SAME/DISTINCT. Therefore the stronger `UNKNOWN` field is not justified; the identity result should remain incomplete/unqualified.

This is the one substantive semantic miss exposed by Experiment 009.

## Continuation

A fresh focused follow-up must use unambiguous proposition-specific fields rather than a generic `decision` field, and must directly test that missing identity authority remains incomplete rather than becoming semantic `UNKNOWN`. The unaffected successful controls remain historical evidence and need not be replayed wholesale.
