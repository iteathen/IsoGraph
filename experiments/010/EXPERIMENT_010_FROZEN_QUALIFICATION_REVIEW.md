# Experiment 010 — Frozen Qualification Review

**Frozen qualification SHA:** `8e306ce3187b363ef379deedfa06fe54bd5092a8`  
**Workflow run:** `35375149458`  
**Decoder:** `gemini-3.5-flash`  
**HTTP:** 200  
**API attempts:** 1  
**Packet SHA-256:** `702a719a84220d9ae72fb0180709651cece530b428bc9f985c398fdc72574411`  
**Report SHA-256:** `88a60b3255943eb28c4baa6bdc7671a6dc2da1b29bfbef4ef754ab7271e5743a`

## Frozen formal disposition

`DOES_NOT_QUALIFY`

This disposition remains immutable.

All packet/coverage/isolation guards passed. Cases D01-D05 and D07 passed. D06 and D08 failed the frozen scorer.

## D06 — post-freeze scorer-contract diagnosis

The frozen hidden assertion allowed only `DORMANT` or `INCOMPLETE` for a branch with surviving structural correspondence, different SIs/files/factorization depth, no concrete structural breaker, no rigid authority, and no qualified NEI DISTINCT.

The cold report returned `candidate_status = CORRESPONDENCE` and `separator_kind = NONE`, and explicitly rejected both natural-distinctness rejection and relabeling representational difference as a structural breaker.

Under the public DP 0.4 behavior, that is a legal non-rejection outcome. A branch may stop DORMANT/incomplete; it is not required to stop when a supported correspondence remains active.

Therefore D06 is classified post-freeze as a **fixture / hidden-oracle defect**, not as evidence of a Discovery Protocol semantic failure. This diagnosis does not change the frozen score.

## D08 — real cold-output omission

The decoder recovered the complete intended common topology:

- A01 <-> B01
- A02 <-> B02
- A03 <-> subgraph(B03,B04,B05)
- A04 <-> B06
- A05 <-> B07
- A06 <-> B08

It attempted one-node-to-subgraph alignment, preserved the explicit Beta bridge-construction residual, and rejected full-proof isomorphism, natural identity, and same intermediate objects.

However, the public cold prompt also explicitly required rejection of `same algorithm`. The report did not explicitly reject that concept. QRC 0.1 therefore correctly reported missing `SAME_ALGORITHM`.

This is a genuine frozen-output qualification miss, not a hidden-token or scorer-synonym defect.

## Interpretation

Experiment 010 supplies substantial positive DP evidence but does not itself qualify the cumulative module.

The correct continuation is a new focused holdout that publicly fixes the legal no-separator state set before freeze and independently tests explicit rejection of all four public overclaims on a fresh deep correspondence. That continuation is Experiment 012.

No Experiment 010 candidate, assertion, scorer, or frozen output is rewritten.
