# Experiment 015 — Final Integrated Module-Stack Qualification Review

**Frozen qualification SHA:** `aaa8f8ee58aaac54002fa9d0a015d0fab0a2ba9c`  
**Workflow run:** `35377399665`  
**Attempt 1:** provider failure, HTTP 503 after both allowed attempts; no semantic report.  
**Attempt 2:** successful at the same frozen SHA and byte-identical packet.  
**Decoder:** `gemini-3.5-flash`  
**Attempt-2 HTTP:** 200, one API attempt  
**Packet SHA-256:** `124d0d72c45b7a31dcfb160c2b7990bc2bb78b7444a42a8fbb75ae4aa31ea1f1`  
**Report SHA-256:** `14a84fe11a8f76d82612ad260afb0744ba763496e75751f0b48acf1639effc9e`

## Formal disposition

`QUALIFIES`

Deterministic score: zero mismatches.

## Integrated obligations discharged

The cold decoder correctly:

- mapped P0/P1a/P1b/P1c/P2 to Q0/Q1/Q2/Q3/Q4 and u to v;
- classified both QU regions `OPEN`;
- identified the open-region structural relation as `QUI`;
- held NEI at `INCOMPLETE_AUTHORITY`;
- selected `WEAK_EMBEDDING` with strong embedding false;
- preserved `Check(Q2,Q3, policy_tag)` and the Q5/Q6 branch as Beta residuals;
- preserved Alpha's atomic P1 through source-local exact-D provenance rather than pairwise residual accounting;
- declined any canonical-factorization claim;
- ignored the misleading Q5 label;
- explicitly reported all four stronger claims as not established: full/global isomorphism, natural identity, same intermediate objects, and same algorithm;
- assessed the integrated module stack as `SUPPORTED`.

## Relation to Experiment 011

Experiment 011 remains formally `DOES_NOT_QUALIFY`: its structural integration behavior was correct, but its free-text rejection list did not explicitly discharge all four public overclaim guards.

Experiment 015 is a fresh case with proposition-specific overclaim booleans and therefore supplies corrected independent integrated qualification evidence rather than rescoring Experiment 011.

## Qualification conclusion

The qualified Core 0.17 baseline, QU 0.1, cumulative NEI 0.1/0.2, and cumulative Discovery Protocols 0.1-0.4 compose successfully for the exercised integrated obligations without creating a new unsound inference path.

This is an integrated compatibility qualification, not a claim of universal discovery completeness or universal domain coverage.
