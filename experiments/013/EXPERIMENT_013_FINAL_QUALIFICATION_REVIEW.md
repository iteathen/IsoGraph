# Experiment 013 — Final QU / NEI Qualification Review

**Frozen qualification SHA:** `182f00c62b30c0dc7ad2848d0e05fa005c354051`  
**Workflow run:** `35376498717`  
**Decoder:** `gemini-3.5-flash`  
**HTTP:** 200, one attempt  
**Packet SHA-256:** `7b983e2537643663503c253157789113c058ced23d6960603bbada5e596db7fa`  
**Report SHA-256:** `8f902208a1d5f5c98c0e2514209101865b5952f595b3188ed8bc93ff5ae4f86c`

## Formal disposition

`QUALIFIES`

Module results:

- QU 0.1: PASS
- NEI 0.1 + 0.2 cumulative effective module: PASS
- exact case coverage: PASS
- duplicate/unexpected case guards: PASS
- cold packet self-audit: PASS
- module-assessment consistency: PASS

All F01-F08 cases passed with no mismatches.

## Evidence chain

Experiment 009 remains an immutable formal `DOES_NOT_QUALIFY` run. Its post-freeze review identified several public-output-contract defects and one substantive boundary error: the decoder emitted semantic NEI `UNKNOWN` without sufficient pinned identity authority.

Experiment 013 was frozen only after replacing ambiguous generic fields with proposition-specific public keys and introducing fresh cases. It directly retested the affected obligations, including the substantive missing-authority boundary.

The Experiment 013 decoder correctly held the F08 identity query at `INCOMPLETE_AUTHORITY`, explicitly stated that semantic NEI `UNKNOWN` was not established, rejected the circular proof, and preserved the original QU as `OPEN`.

## Qualification conclusion

The exact QU 0.1 candidate semantics and the cumulative NEI 0.1 + 0.2 candidate semantics exercised by the frozen packet satisfy their declared qualification obligations when read with their dependency boundaries.

Promotion changes qualification status/provenance only. It does not introduce new syntax, new Core primitives, a new identity law, or a new solver requirement.

Historical Experiment 009 evidence is not rewritten. The qualification conclusion relies on the fresh formally passing Experiment 013 plus the unaffected earlier controls and existing qualified Core dependencies.

## Scope

This qualification establishes the declared QU/NEI semantic contracts. It does not establish universal discovery performance, implementation performance, or that QUI implies natural identity.
