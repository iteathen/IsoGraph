# W-SSC-134 Euclidean SU(2) Roles / Pseudoreal Spinor Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes restored W02 assertion W-A0-053 / W-SSC-134.

The frozen assertion has three clauses, all represented natively:

1. **SU(2)_L acts trivially on Euclidean spacetime.**
   - source role: 205130
   - vector action: 205122
   - action is exactly the identity on every Euclidean vector.

2. **SU(2)_R acts nontrivially on Euclidean spacetime.**
   - source role: 205131
   - vector action: 205121
   - a concrete nontrivial witness is retained.

3. **S_R and its conjugate are equivalent SU(2)_R representations.**
   - exact M2(C) action on S_R: 945100 / 945101
   - exact transported conjugate action: 945102
   - exact complex-linear pseudoreal intertwiner: 945110
   - exact action transport through the intertwiner via schema 188101.

The intertwiner basis convention is pinned to the same quaternionic left-j / epsilon convention used in the W source family:

```text
bar(e1) -> e2
bar(e2) -> -e1.
```

All group/action schemas use the corrected matrix identity `204116=I`.

No electroweak/internal physical identification, topology, or cross-track semantics are added.
