# Track W — Source-Side Formulation Map 0.1

**Status:** PROVISIONAL SOURCE-SIDE MAP — NOT PRIMITIVE-CLOSED  
**Corpus:** `SOURCE_CORPUS_FREEZE_0_2.md`

This map is built from Woit sources only. Relation labels are research bookkeeping, not Core primitives and not claims of full semantic equivalence.

## Formulation nodes

### W-F1 — Euclidean-first twistor unification
Sources: W01.

Core source posture:
- Euclidean Spin(4) is foundational;
- the two chiral SU(2) factors receive different spacetime/internal roles;
- an imaginary-time-direction field participates in recovering Lorentz signature;
- projective twistor space carries the proposed unified geometry.

### W-F2 — quaternionic / twistor-P1 representation layer
Sources: W05 plus the P1/quaternionic material already present in W01.

Core source posture:
- a Euclidean spacetime point is represented by a twistor P1;
- the P1 is presented as a geometric avatar of quaternionic structure.

This is a mathematical/expository representation layer, not a complete unification model.

### W-F3 — right-handed spinor/vector geometry
Sources: W02, W04a.

Core source posture:
- use one right-handed spinor kind to build spacetime vectors in both signatures;
- in Euclidean signature the left chiral factor is freed from its usual spacetime role and can be internal;
- a distinguished Euclidean vector can relate this asymmetric description back to the conventional symmetric one.

### W-F4 — twistor real-form / orbit / fibration geometry
Sources: W04b.

Core source posture:
- complex projective twistor space supplies the shared complex parent;
- different real forms and orbit/fibration structures recover Minkowski- and Euclidean-facing descriptions;
- Wick rotation is represented by extra geometric choice, not by identifying the real forms.

### W-F5 — Minkowski-twistor / holomorphic-first formulation
Sources: W04c, W04d.

Core source posture:
- the fundamental object is shifted toward the holomorphic twistor domain and its Minkowski boundary-value interpretation;
- Euclidean realization follows from an additional choice;
- the right/left chiral asymmetry remains structurally important.

### W-F6 — conjugation / chiral-real-structure work in progress
Sources: W04e.

Core source posture:
- start with Riemannian/twistor data plus an additional conjugation-like structure;
- the proposed structure should interchange positive/negative imaginary-time sectors and preserve the Lorentzian-chiral degrees;
- the author explicitly marks the interpretation as changing.

## Same-author relation ledger

| Relation | From | To | Current strength | Source witness | Residual / caution |
|---|---|---|---|---|---|
| W-R01 | W-F1 | W-F3 | MOTIVATED_REFACTORIZATION | W02/W04a retain the chiral split but change the vector-spinor identification. | Not proved equivalent as full theories; Higgs/twistor packaging differs. |
| W-R02 | W-F3 | W-F4 | GEOMETRIC_REALIZATION_CANDIDATE | W04a points to twistors as the chiral setting; W04b supplies the real-form/orbit geometry. | Primitive transform not yet derived. |
| W-R03 | W-F1 | W-F5 | AUTHOR_EXPLICIT_VIEWPOINT_REVISION | W04c explicitly says the author started Euclidean-first and moved to Minkowski-twistor-first. | Revision of foundational interpretation, not an equivalence theorem. |
| W-R04 | W-F4 | W-F5 | REFACTORIZATION / SPECIALIZATION | W04c/d recast Wick rotation as extra choice inside holomorphic twistor geometry. | Exact retained/lost structure not yet closed. |
| W-R05 | W-F5 | W-F6 | REVISION_IN_PROGRESS | W04e says the implications are still changing and proposes new conjugation structure. | Relation remains QU-bearing/UNKNOWN beyond the explicit overlap. |
| W-R06 | W-F1 | W-F2 | SHARED_SUBSTRUCTURE | W01 uses quaternionic twistor geometry; W05 isolates the P1/quaternionic presentation. | W-F2 is not the full W-F1 theory and cannot replace it. |
| W-R07 | W-F3 | W-F1 | PARTIAL_RECONSTRUCTION_CANDIDATE | W02 gives a distinguished-vector isomorphism relating asymmetric and symmetric spinor descriptions. | Applies to the spinor/vector sector, not automatically the complete unification package. |
| W-R08 | W-F1 | W-F2 | QUATERNIONIC_PROJECTIVE_CONVENTION_TRANSFORM | W01 uses Z=s_perp s^{-1} with infinity (0,1); W05 uses q=q2^{-1}q1 with infinity [1,0]. Componentwise quaternion conjugation plus coordinate swap maps the presentations, sending Z to KAPPA(Z). | Same HP1 geometry; noncommutativity makes the transform load-bearing, so formulas may not be mixed directly. |

## Formulation-family partition — current provisional view

A single undifferentiated Woit family would be too coarse.

Current provisional clusters:

```text
geometric-unification family:
    W-F1
    W-F3
    W-F4
    W-F5
    W-F6 (provisional edge only)

quaternionic/twistor representation subfamily:
    W-F2
    overlapping W-F1 and W-F4
```

The transition from W-F1 to W-F5 is itself likely DTS-relevant because the endpoint structures retain much content while the role of Euclidean vs Minkowski/holomorphic data changes.

## Bridgeability is not yet evaluated

No Woit formulation is selected as "best." Cross-track bridgeability waits for primitive closure and sealed same-author transforms.
