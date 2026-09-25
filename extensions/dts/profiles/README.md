# DTS profiles

DTS 0.1 base semantics are intentionally mechanism-agnostic.

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

A profile may add obligations for its own claims. It may not weaken DTS, Core, or QU obligations.
