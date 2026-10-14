# W02 Minkowski Hermitian Vector Source Instance 0.4

**Status:** CURRENT SOURCE-LOCAL NATIVE INSTANCE — CORRECTED AND INTERFACE-PRESERVING  
**Source:** W02 §I  
**Predecessor:** 0.3 semantically corrected but rejected as an interface-breaking successor

Revision 0.4 preserves the established public W02 native meanings required by downstream source instances:

```text
204101 = i
204141 = sigma1
204144 = sigma2
204145 = -i
204146 = sigma3
204151 = Minkowski-vector -> Hermitian-matrix injection
```

It retains the 0.3 semantic repairs:

- correct field handles ADD/MUL/NEG/INV;
- exact matrix-unit Pauli construction;
- exact Minkowski bilinear form diag(-1,+1,+1,+1);
- exact real-linear vector embedding;
- Hermitian-image constraint;
- `det(X) = - embed_R_to_C(Q_M(v))`.

Private intermediate `204147` is now `-E22`; `204152` is the real scalar `-1`.

This revision is the current W02 Minkowski-vector support for downstream Hodge, self-dual, and right-handed source instances.
