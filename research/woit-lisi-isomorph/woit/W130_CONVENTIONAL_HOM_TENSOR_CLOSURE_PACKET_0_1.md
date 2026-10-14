# W-SSC-130 Conventional Hom / Tensor Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes restored W02 assertion W-A0-049 / W-SSC-130.

The conventional complex vector carrier is rendered simultaneously as:

```text
M2(C) = Hom(S_R^*, S_L)
```

and as the finite source tensor presentation

```text
S_L x S_R -> M2(C).
```

The dual right-spinor carrier is defined by an exact nondegenerate bilinear pairing with (S_R), so “dual” is not a name-only role.

The Hom evaluation and tensor map are both pinned on exact bases and share the same matrix carrier used by the corrected conventional action

```text
X -> g_L X g_R^{-1}.
```

Thus the chiral symmetry is represented by distinct left/right source group roles acting on the exact carrier, while the Hom/tensor presentations give the source’s two equivalent descriptions.

No canonical `S_R` canonically identified with `S_R^*`, topology, smooth structure, or right-handed replacement semantics are added.
