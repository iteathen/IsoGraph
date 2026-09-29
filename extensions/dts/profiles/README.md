# DTS profiles

DTS 0.1 base semantics are intentionally mechanism-agnostic and remain the current qualified transition-anatomy authority within the integrated Core 0.21 family.

This directory is reserved for separately versioned mechanism, analysis, and translation profiles that depend on DTS without redefining DTS base semantics.

Expected research families include:

- sequential / execution-trace profile;
- DPO rewrite profile;
- concurrency / partial-order profile;
- Transition Structural Signatures (TSS) profile;
- cost/accounting profile;
- optimization profile;
- external translation/adapters.

No profile in this directory is implicitly enabled by DTS 0.1.

```text
profile qualification
    != DTS base qualification
```

A profile may add obligations for its own claims. It may not weaken DTS, Core, QU, NEI, DP, or EI authority boundaries.

In particular, a profile must not use a mechanism label to bypass Core 0.21 primitive closure or Source Semantic Census coverage. Core Schema Closure may finitely close generation semantics, while DTS still owns any load-bearing transition anatomy/order distinction. Experimental profiles may generate evidence only through the applicable DP Experimental Warrant / EI boundary; profile output is not truth authority by itself.
