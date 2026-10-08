# W-SSC-145 Complex Self-Dual / sl(2,C) / Sym² Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes restored W02 assertion W-A0-064 / W-SSC-145.

The exact native chain is:

```text
complex self-dual two-forms
-> exact linear bijection to traceless M2(C) endomorphisms
-> exact sl(2,C)-type Lie bracket
-> exact right-spinor representation
-> explicit three-dimensional symmetric-square carrier
-> exact intertwining linear bijection to Sym²(S_R)
```

The dependency closure uses the corrected W02 Minkowski-vector source instance 0.4, so downstream `204145=-i` has the intended meaning used by the Minkowski Hodge eigenspaces.

The recursive dependency audit resolves all additional local IDs against the already validated W027 base plus exact matrix, Hodge, dimension, bijection, and Lie schemas.

No connection, bundle, gauge-field, or analytic field-theory semantics are added by this closure.
