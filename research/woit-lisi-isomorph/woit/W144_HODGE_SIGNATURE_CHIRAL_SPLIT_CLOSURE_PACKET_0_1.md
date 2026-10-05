# W-SSC-144 Hodge Signature / Chiral Split Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes restored W02 assertion W-A0-063 / W-SSC-144 with two exact source branches.

## Euclidean branch

```text
Lambda^2_R
--*^2=+1-->
self-dual (+1) + anti-self-dual (-1)
self-dual     ~= su(2)_R
anti-self-dual ~= su(2)_L
```

The Hodge eigenspaces and Lie-role maps are explicit native structures.

## Minkowski branch

```text
Lambda^2_R
--*^2=-1-->
complexification
--*-->
(+i) + (-i) eigenspaces
```

The branch uses corrected W02 Minkowski-vector revision 0.4, preserving `204145=-i`.

The two branches are intentionally separate roots. The closure does not infer that Euclidean and Minkowski chiral spaces are naturally identical, nor does it add connection/Yang-Mills dynamics.

The recursive dependency verifier requires every support file to be reachable from at least one of the two roots and reports zero unresolved project-local references.
