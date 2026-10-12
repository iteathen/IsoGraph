# Woit W01 representation and quotient — counterfactual models R07/R08

**Status:** isolated, source-pinned project hypotheses; no semantic authority, paper emendation, G0/G1 promotion, post-seal discovery or source-intent determination.

Frozen primary paper: Peter Woit, *Euclidean Twistor Unification*, [arXiv:2104.05099v2](https://arxiv.org/html/2104.05099v2), 14 October 2021, introduction and §4.2. The independent W-only Source Semantic Census [SSC0.70](../woit/SOURCE_SEMANTIC_CENSUS_0_70.json) must remain unchanged. [Earlier exact discrepancy observation](../../../experiments/062/W01_G0_S42_INDEPENDENT_DIMENSION_NEGATIVE_0_1.json) must remain a negative source observation, not retroactively scored as repaired.

## R07 — 12 versus 16 in W01 §4.2

The original assertions are preserved as three **different statements**:

1. `Hom(l ⊕ (C⁴/l), S_R ⊕ S_L)` with ranks `(1+3)*(2+2)=16`.
2. Printed intermediate `(C[-1] ⊗ C³[+1/3]) ⊗ (C²[0] ⊕ C[-1] ⊕ C[+1])`, which has rank `(1*3)*(2+1+1)=12`.
3. Printed final six weighted components with ranks `2,1,1,6,3,3` and third-integral weights `-3,-6,0,+1,-2,+4`, totaling 16.

**Counterfactual**, not the original text: replace *only* the first tensor symbol with a direct-sum symbol:

```text
(C[-1] ⊕ C³[+1/3]) ⊗ (C²[0] ⊕ C[-1] ⊕ C[+1])
```

It has rank `(1+3)*(2+1+1)=16`. Distribution gives, in original printed order:

```text
C²[-1], C[-2], C[0],
(C³ ⊗ C²)[+1/3], C³[-2/3], C³[+4/3]
```

All six dimensions and weights agree exactly with the source's following **formal** representation expression. The source final display uses three `⊕` separators followed by two `+` separators. Those different glyphs are not silently rewritten in the frozen source census. Equality as actual physical field representations, dynamics, global bundle isomorphism, and Woit's intended editorial correction remain unqualified.

**Negative controls:** retain the original printed 12-dimensional result; reject incorrect line dual-weight sign, quotient dual-weight sign, weak-doublet weight, omitted doublet, omitted final scalar, and erroneous quark weight. Correct finite bookkeeping does not validate a full Standard Model.

## R08 — W01 introductory stabilizer versus §4.2

The source §1 writes the simplified `SU(4)/(U(1)×SU(3))`. Section 4.2 separately writes:

```text
PT = U(4)/(U(1)×U(3))
   = SU(4)/S(U(1)×U(3))
   = SU(4)/U(3).
```

The exact point stabilizer inside `SU(4)` preserving a complex line `l` has block form:

```text
H = { diag(a, B) | a∈U(1), B∈U(3), a*det(B)=1 }
  ≅ U(3),
B ↦ diag(det(B)^(-1), B).
```

There is a **surjective threefold cover**, not an injective group identification:

```text
F: U(1)×SU(3) → H
F(z,A) = diag(z^(-3), z A)
ker F = { (ζ, ζ^(-1) I₃) | ζ³=1 } ≅ Z₃.

H ≅ (U(1)×SU(3))/Z₃.
```

Proof: `det F(z,A)=z^(-3) z³ det(A)=1`. For arbitrary `B∈U(3)`, a cube root `z³=det(B)` exists and `A=z^(-1)B∈SU(3)`. The kernel has exactly three central pairs. The naive block embedding `diag(z,A)` for arbitrary `z∈U(1),A∈SU(3)` has determinant `z`, so it does **not** lie in `SU(4)` unless `z=1`.

Thus the two statements may have **the same Lie-algebra factors** while differing in exact global group structure. Treat the introduction as *possible shorthand*, not an independently established author mathematical mistake. Its physical internal-symmetry interpretation is a separate, unproved claim.

### U(1) weight/lift caution

The source normalizes relative infinitesimal weights to `+1` on the line and `-1/3` on the quotient. A globally single-valued circle map with the **same ratio** is:

```text
z ↦ diag(z³, z⁻¹ I₃)
```

so the integral covering weights are `(3,-1,-1,-1)`. Trying to define a bare determinant character `(det B)^(-1/3)` on all `U(3)` is globally multivalued without an additional lift; one determinant winding changes the cube-root branch by a nontrivial third root. No charge quantization, real electroweak gauge-group quotient, physical Higgs normalization or global bundle identification is inferred merely from the Lie-algebra ratio.

### Exact tests and limitations

The same-source pin checks bind W-SSC-005/036/037 in the frozen W current-author SSC and the earlier W01 dimension-negative evidence. The standalone [R07/R08 verifier](verify-woit-repairs.cjs):

- recovers `16/12/16`, the proposed `16`, all six component dimensions, weights and six hostile incorrect expansions;
- enumerates all `12³=1728` diagonal stabilizer elements using 12th roots, and all `12×12²=1728` parameter pairs from a discrete diagonal `U(1)×SU(3)` sample;
- finds 576 distinct image elements, exactly three preimages each, explicit three-element kernel, 12 integer-weight lift samples and five false-global-identification controls.

The 576-element image pertains **only** to that finite 12th-root sample; it is not the cardinality of `U(3)` or the continuous map's global image. The general continuous-group quotient is justified by the algebraic construction above, not extrapolated from finite samples.

These models are **candidate transformations in the isolated layer only**. The original printed tensor, original simplified quotient and the more precise §4.2 formula are left intact and separately queryable; no W-only G0 or G1 qualification, broader geometry theorem, source seal, formal discovery equivalence, cross-author import or PR merge follows.

**Provenance:** Source author Peter Woit. Request to develop isolated correction alternatives: Joshua Oshiro, October 11, 2026. Versioned source discrepancy and current W SSC precede this new agent-assisted counterfactual model. No external validation or novelty/priority claim.
