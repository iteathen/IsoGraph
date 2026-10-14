# W-SSC-052 Minkowski SU(2,2) Twistor Real-Form Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION

This packet closes W01 Appendix A.3.2 / W-SSC-052.

The source structure is reconstructed from three already-qualified W components plus one exact coordinate-convention witness:

- W014 supplies the signature-(2,2) Hermitian form, exact SU(2,2)-role projective action, and positive/negative/null projective orbit partition.
- W100 supplies the exact Minkowski conjugate-dual projective reality structure and chiral exchange.
- W128 supplies the qualified Hermitian (M_2(C)) Minkowski-vector carrier.
- `W01_MINKOWSKI_ANTIHERMITIAN_AFFINE_SOURCE_INSTANCE_0_1.isg` supplies W01's anti-Hermitian affine convention through the exact bijection
  `X -> iX`.

Thus the full W01 package is represented behaviorally:

```text
Phi of signature (2,2)
+ SU(2,2)-preserving action
+ PT+, PT-, PT0 orbit decomposition
+ null two-plane/Minkowski-point structure
+ anti-Hermitian affine Minkowski coordinates
+ conjugate-dual left/right spinor reality.
```

The Hermitian and anti-Hermitian affine conventions are related explicitly and are not silently identified.

No Euclidean real form and no Lisi/cross-track semantics are imported.
