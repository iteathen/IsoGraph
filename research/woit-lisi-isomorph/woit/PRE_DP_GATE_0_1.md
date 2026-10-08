# Woit Pre-DP Gate 0.1

**Status:** ENFORCED  
**Scope:** independent W track  
**Date:** 2026-10-04

The W track may not enter Discovery Protocol directly after primitive closure.

The mandatory order is:

```text
primitive/schema closure
-> Core-0.21 closure-ledger qualification
-> recursive implicit assertions to a pinned operational fixed point
-> NEI
-> DTS
-> Discovery Protocol
```

## Implicit-assertion requirement

`IMPLICIT_ASSERTION_PROFILE_0_1.md` is the frozen source-local search profile.

`IMPLICIT_ASSERTIONS_WORKING_0_3.md` currently contains three working IAs:

- W-IA-BT01-001
- W-IA-BT01-002
- W-IA-W02-001

They are **not** a fixed-point claim.

After primitive/schema closure, all admitted IAs must be revalidated against the current native graph, their bodies/support/dependencies must themselves satisfy primitive closure, and the profile must be applied recursively until a deterministic no-new-IA pass is reached.

Any change to the Core-0.21 fixed-point input tuple invalidates the fixed point and requires the IA pass to run again.

## Firewall

The W IA process may not consume Lisi semantics, bridge hypotheses, or unification candidates as premises.

## DP rule

DP remains blocked until the IA fixed point, NEI, and DTS gates are complete.
